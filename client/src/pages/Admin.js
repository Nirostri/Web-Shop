import React, { useState, useEffect } from "react";
import Axios from "axios";

import "../pages/admin.css";

import { Layout } from "../layout";

const rowLabels = [
  { field: "productTitle", label: "Product Name" },
  { field: "productDescription", label: "Product Description" },
  { field: "productPrice", label: "Product Price" },
];

const rowListLabels = [
  { field: "productTitle", label: "Title" },
  { field: "productDescription", label: "Description" },
  { field: "productPrice", label: "Price" },
];

function Admin() {
  const [productList, setProductList] = useState([]);
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({});

  const getProductList = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductList(response.data);
    });
  };

  useEffect(() => {
    getProductList();
  }, []);

  const addProduct = () => {
    Axios.post("http://localhost:3001/insert", product).then(() => {
      getProductList();
    });
  };

  const updateProductField = (e, key) => {
    const updatedProduct = product ? { ...product } : {};
    updatedProduct[key] = e.target.value;
    setProduct(updatedProduct);
  };

  const updateProduct = (product) => {
    Axios.put(`http://localhost:3001/update/${product._id}`, {
      product,
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      getProductList();
    });
  };

  const validateForm = (id) => {
    const updatedErrors = {};
    for (let i = 0; i < rowLabels.length; i++) {
      if (!product[rowLabels[i].field]) {
        updatedErrors[rowLabels[i].field] = true;
      }
    }
    setErrors(updatedErrors);
    if (Object.keys(updatedErrors).length === 0) {
      addProduct();
    }
  };

  const updateProductList = (e, key, index) => {
    const list = [...productList];
    list[index][key] = e.target.value;
    setProductList(list);
  };

  return (
    <Layout>
      <h1>This is the admin page</h1>
      <div className="App">
        <h1>Web Shop App</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "30px",
          }}
        >
          {rowLabels.map((row) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "5px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    marginRight: "30px",
                    fontWeight: "bold",
                  }}
                >
                  <label>{row.label}: </label>
                </div>
                <input
                  type="text"
                  onChange={(event) => {
                    updateProductField(event, row.field);
                  }}
                  value={product && product[row.field]}
                  style={{ marginRight: "20px", paddingLeft: "10px" }}
                />
                {errors[row.field] && (
                  <span style={{ color: "red" }}>Required field</span>
                )}
              </div>
            );
          })}
        </div>

        <button
          style={{
            width: "150px",
            height: "40px",
            margin: "10px 0px 20px 20px",
            backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            color: "white",
          }}
          onClick={validateForm}
        >
          Add Product
        </button>

        <h1
          style={{
            marginLeft: "5px",
            paddingBottom: "20px",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          Product List:
        </h1>
        {productList.map((val, i) => {
          return (
            <div key={i} className="product" style={{ marginLeft: "5px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontWeight: "bold",
                }}
              >
                {rowListLabels.map((rowLabel, j) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "15px",
                      }}
                    >
                      <h1 style={{ paddingRight: "20px" }}>
                        {rowLabel && rowLabel.label}:
                      </h1>
                      <input
                        type="text"
                        placeholder={rowLabel && `New ${rowLabel.label}...`}
                        onChange={(event) => {
                          updateProductList(event, rowLabel.field, i);
                        }}
                        value={rowLabel && val[rowLabel.field]}
                        style={{
                          paddingLeft: "10px",
                          marginRight: "20px",
                          border: "1px solid",
                        }}
                      />
                    </div>
                  );
                })}
                <button
                  style={{
                    alignSelf: "baseline",
                    width: "6%",
                    backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  onClick={() => updateProduct(val)}
                >
                  Update
                </button>
                <button
                  style={{
                    alignSelf: "baseline",
                    width: "6%",
                    marginLeft: "10px",
                    backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  onClick={() => deleteProduct(val._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Admin;
