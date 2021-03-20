import React, { useEffect, useState } from "react";
import "./Destination.css";
import Maps from "../Maps/Maps";
import Data from "../../data.json";

function Destination() {
  const [data, setData] = useState({});
  const [destination, setDestination] = useState({
    from: "",
    to: "",
  });
  console.log(destination);

  useEffect(() => {
    setData(Data);
  }, []);

  const handleingBlur = (e) => {
    const newDestination = { ...destination };
    newDestination[e.target.name] = e.target.value;
    setDestination(newDestination);
    console.log(destination);
  };
  return (
    <div className="container destination">
      <div className="container des-form">
        <label htmlFor="from">From</label>
        <br />
        <input
          className="form-control"
          name="from"
          type="text"
          onBlur={handleingBlur}
          placeholder="From"
          required
        />
        <br />
        <label htmlFor="to">To</label>
        <br />
        <input
          className="form-control"
          name="to"
          type="text"
          onBlur={handleingBlur}
          placeholder="To"
          required
        />
        <button className="btn btn-primary mt-3 btn-block">Search</button>
        <div>
          <p>
            From: {destination.from} to: {destination.to}
          </p>
          {destination.from &&
            destination.to &&
            data.map((data) => (
              <div className="d-flex align-items-center justify-content-around">
                <img style={{ width: "60px" }} src={data.icon} alt="" />
                <p>${data.price}</p>
              </div>
            ))}
        </div>
      </div>
      <Maps />
    </div>
  );
}

export default Destination;
