import React, { useState, useEffect } from "react";
import Axios from "axios";

const rowListLabels = [
  { field: "productTitle", label: "Title" },
  { field: "productDescription", label: "Description" },
  { field: "productPrice", label: "Price" },
];

function Home() {
  const [productList, setProductList] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [isShowCart, setIsShowCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const getProductList = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductList(response.data);
    });
  };

  useEffect(() => {
    getProductList();
  }, []);

  const addProductToCart = (index) => {
    const updatedList = [...productList];
    updatedList[index].addedToCart = true;
    if (!updatedList[index].cartValue) {
      updatedList[index].cartValue = 1;
    } else {
      updatedList[index].cartValue = updatedList[index].cartValue + 1;
    }
    setProductList(updatedList);
    setCartCounter(cartCounter + 1);
    setTotalPrice(totalPrice + parseInt(updatedList[index].productPrice));
  };

  const toggleCartClicked = () => {
    setIsShowCart(!isShowCart);
  };

  const payForProducts = () => {
    const listToSend = productList.filter((prod) => prod.cartValue);
    Axios.put("http://localhost:3001/updateList", {
      products: listToSend,
    }).then(() => {
      const updatedList = [...productList];
      updatedList.map((product) => {
        product.addedToCart = false;
        product.cartValue = 0;
      });
      setCartCounter(0);
      setTotalPrice(0);
      setProductList(updatedList);
    });
    Axios.post("http://localhost:3001/insertDailySales", {
      purchase: totalPrice,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        {productList &&
          productList.map((val, i) => {
            return (
              <div key={i} className="product" style={{ marginLeft: "5px" }}>
                <h1
                  style={{
                    color: "purple",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  product no.{i + 1}
                </h1>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  {rowListLabels.map((rowLabel, j) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        <h1 style={{ paddingRight: "20px" }}>
                          {rowLabel && rowLabel.label}:
                        </h1>
                        <input
                          type="text"
                          disabled
                          value={rowLabel && val[rowLabel.field]}
                          style={{
                            paddingLeft: "10px",
                            marginRight: "20px",
                            border: "1px solid",
                            borderRadius: "6px",
                          }}
                        />
                      </div>
                    );
                  })}
                  <button
                    style={{
                      alignSelf: "baseline",
                      width: "120px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    onClick={() => addProductToCart(i)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: "20px 30px 0px 0px",
        }}
      >
        <button
          style={{
            width: "150px",
            height: "40px",
            fontWeight: "bold",
            backgroundColor: "green",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={toggleCartClicked}
        >
          {cartCounter !== 0 ? `Cart (${cartCounter})` : "Cart"}
        </button>
        {isShowCart && (
          <div
            style={{
              display: "flex",
              height: "auto",
              maxHeight: "400px",
              width: "280px",
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "10px",
              marginTop: "10px",
              border: "1px solid",
              borderColor: "grey",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflow: "auto",
                paddingBottom: "20px",
              }}
            >
              {productList &&
                productList.map((prod) => {
                  return (
                    prod.addedToCart && (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "10px 0px",
                            height: "40px",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span>
                              {prod.productTitle} X {prod.cartValue}
                            </span>
                          </div>
                          <span>{prod.productPrice * prod.cartValue}$</span>
                        </div>
                        <div
                          style={{ height: "1px", backgroundColor: "grey" }}
                        />
                      </div>
                    )
                  );
                })}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "15px",
              }}
            >
              {totalPrice > 0 && `Total ${totalPrice}$`}
              {totalPrice > 0 && (
                <button
                  style={{
                    marginTop: "5px",
                    paddingTop: "4px",
                    width: "50px",
                    borderRadius: "4px",
                    backgroundColor: "green",
                  }}
                  onClick={payForProducts}
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
