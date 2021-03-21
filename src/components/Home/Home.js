import React, { useEffect, useState } from "react";
import "./Home.css";
import data from "../../data.json";
import TicketsDetail from "../TicketsDetail/TicketsDetail";

function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(data);
  }, []);
  return (
    <div className="home-container">
      {tickets.map((ticket) => (
        <TicketsDetail ticket={ticket} />
      ))}
    </div>
  );
}

export default Home;
