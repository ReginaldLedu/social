import "./App.css";
import { useState, useEffect } from "react";

export const App = () => {
  const [table, setTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    console.log(currentPage);
    console.log(fetching);
    async function FetchCurrencies() {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        setTable([...table, ...json]);
        console.log(json);
        setCurrentPage((prevState) => prevState + 1);
      } else {
        console.log(response.status);
      }
    }
    if (fetching) {
      FetchCurrencies();
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${currentPage}`;

  return (
    <section className="table">
      <div className="table__line">
        <div className="table__id">ID</div>
        <div className="table__symbol">Symbol</div>
        <div className="table__name">Name</div>
      </div>
      {table.length > 0
        ? table.map((item) => {
            const ind = table.indexOf(item);
            if (item.symbol === "usdt") {
              <div key={table.indexOf(item)} className="table__lineBlue">
                <div className="table__id">{item.id}</div>
                {item.symbol === "usdt" ? (
                  <div className="table__symbolGreen">{item.symbol}</div>
                ) : (
                  <div className="table__symbol">{item.symbol}</div>
                )}
                <div className="table__name">{item.name}</div>
              </div>;
            } else if (ind <= 5) {
              return (
                <div key={table.indexOf(item)} className="table__lineBlue">
                  <div className="table__id">{item.id}</div>
                  {item.symbol === "usdt" ? (
                    <div className="table__symbolGreen">{item.symbol}</div>
                  ) : (
                    <div className="table__symbol">{item.symbol}</div>
                  )}
                  <div className="table__name">{item.name}</div>
                </div>
              );
            } else {
              return (
                <div key={table.indexOf(item)} className="table__line">
                  <div className="table__id">{item.id}</div>
                  {item.symbol === "usdt" ? (
                    <div className="table__symbolGreen">{item.symbol}</div>
                  ) : (
                    <div className="table__symbol">{item.symbol}</div>
                  )}
                  <div className="table__name">{item.name}</div>
                </div>
              );
            }
          })
        : " "}
    </section>
  );
};
