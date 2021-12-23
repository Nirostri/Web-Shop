const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");

const app = express();

const ProductModel = require("./models/Product");
const PurchaseModel = require("./models/Purchase");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log("something wrong", error);
  });

app.post("/insert", async (req, res) => {
  const productName = req.body.productTitle;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.productPrice;

  const product = new ProductModel({
    productTitle: productName,
    productDescription: productDescription,
    productPrice: productPrice,
  });

  try {
    await product.save();
    res.send("insert data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.put("/update/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body.product;

  try {
    await ProductModel.updateOne(
      { _id: productId },
      {
        $set: updatedProduct,
      }
    ).exec();
    res.send("update");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await ProductModel.deleteOne({
      _id: productId,
    }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});

app.put("/updateList", async (req, res) => {
  const products = req.body.products;

  try {
    for (let i = 0; i < products.length; i++) {
      await ProductModel.updateOne(
        {
          _id: products[i]._id,
        },
        {
          $inc: { numberOfPurchases: products[i].cartValue },
        }
      ).exec();
    }
    res.send("delete");
  } catch (err) {
    console.log(err);
  }
});

app.get("/topSellers", async (req, res) => {
  try {
    const topSellers = await ProductModel.find()
      .sort({ numberOfPurchases: -1 })
      .limit(5)
      .exec();
    //console.log(topSellers);
    res.send(topSellers);
  } catch (err) {
    console.log(err);
  }
});

app.get("/uniqueTopSellers", async (req, res) => {
  try {
    const uniqueProducts = [];
    const uniqueTopSellers = await ProductModel.find()
      .sort({ numberOfPurchases: -1 })
      .exec();
    for (let i = 0; i < uniqueTopSellers.length; i++) {
      if (
        !uniqueProducts.includes(uniqueTopSellers[i].productTitle) &&
        uniqueProducts.length < 5
      )
        uniqueProducts.push(uniqueTopSellers[i].productTitle);
    }
    //console.log(uniqueProducts);
    res.send(uniqueProducts);
  } catch (err) {
    console.log(err);
  }
});

app.post("/insertDailySales", async (req, res) => {
  const purchasePrice = req.body.purchase;

  const purchase = new PurchaseModel({
    purchasePrice: purchasePrice,
  });

  try {
    await purchase.save();
    res.send("insert data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/dailySales", async (req, res) => {
  try {
    const end = moment().subtract(5, "days");
    var dailySales = await PurchaseModel.find({
      createdAt: { $gte: end },
    }).exec();

    // for (let i = 0; i < 5; i++) {
    //   const checkDay = moment().subtract(i, "days").format("L");
    //   for (let j = 0; j < dailySales.length; j++) {
    //     if (dailySales[j].created == checkDay) {
    //       console.log(dailySales[j].created);
    //     }
    //   }
    // }
    console.log(dailySales[0].created);
    console.log(dailySales);
    res.send(dailySales);
  } catch (err) {
    console.log(err);
  }
});
