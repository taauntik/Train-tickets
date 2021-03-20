import React from "react";
import { Link } from "react-router-dom";
import "./TicketsDetail.css";

function TicketsDetail({ ticket }) {
  console.log(ticket);
  let { Name, price } = ticket;
  return (
    <div className="destinaiton">
      <div className="ticket">
        <h1>{Name}</h1>
        <Link to="/destination">
          <button className="btn btn-primary">Book Now</button>
        </Link>
        <h1>${price}</h1>
      </div>
      <div>
        <h1>Map</h1>
      </div>
    </div>
  );
}

export default TicketsDetail;
