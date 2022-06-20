import { useEffect, useState } from "react";
import ReservationsList from "./ReservationsList";

const Reservations = () => {
  // ************* Component State *************** //
  const [reserveList, setReserveList] = useState([]);
  // ************* Component Methods *************** //
  const fetchData = async () => {
    const data = await fetch("./assets/data.json");
    const result = await data.json();
    setReserveList(result.reservations);
  };

  // fetching data
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <ReservationsList reservationsList={reserveList} />
    </section>
  );
};

export default Reservations;
