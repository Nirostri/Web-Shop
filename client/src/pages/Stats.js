import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Layout } from "../layout";

function Stats() {
  const [topSellers, setTopSellers] = useState([]);
  const [uniqueTopSellers, setUniqueTopSellers] = useState([]);
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/topSellers").then((result) => {
      setTopSellers(result.data);
      console.log(result.data);
    });
    Axios.get("http://localhost:3001/uniqueTopSellers").then((resultUnique) => {
      setUniqueTopSellers(resultUnique.data);
      console.log(resultUnique.data);
    });
    Axios.get("http://localhost:3001/dailySales").then((resultDailySales) => {
      setDailySales(resultDailySales.data);
      console.log(resultDailySales.data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "green",
            marginLeft: "10px",
          }}
        >
          5 Top Sellers:
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "inset",
            height: "140px",
            width: "200px",
            backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
            borderRadius: "6px",
            padding: "5px 5px 5px 5px",
            borderColor: "grey",
            margin: "10px",
          }}
        >
          {topSellers.length > 0 &&
            topSellers.map((product, i) => {
              return (
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {i + 1}. {product.productTitle}
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "25px",
            fontWeight: "bold",
            color: "green",
            alignItems: "center",
            marginLeft: "200px",
            marginBottom: "10px",
          }}
        >
          5 Top Unique Sellers:
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "inset",
            height: "140px",
            width: "200px",
            backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
            borderRadius: "6px",
            padding: "5px 5px 5px 5px",
            borderColor: "grey",
            marginLeft: "200px",
          }}
        >
          {uniqueTopSellers.length > 0 &&
            uniqueTopSellers.map((product, i) => {
              return (
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {i + 1}. {product}
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "25px",
            fontWeight: "bold",
            color: "green",
            alignItems: "center",
            marginLeft: "200px",
            marginBottom: "10px",
          }}
        >
          5 Top Sellers in last 5 days:
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "inset",
            height: "140px",
            width: "200px",
            backgroundColor: "rgba(128,90,213,var(--bg-opacity))",
            borderRadius: "6px",
            padding: "5px 5px 5px 5px",
            borderColor: "grey",
            marginLeft: "200px",
          }}
        >
          {dailySales.length > 0 &&
            dailySales.map((product, i) => {
              return (
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {i + 1}. {product.purchasePrice}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Stats;
