import { useEffect, useState } from "react";
import ReservationsList from "./ReservationsList";

const Reservations = () => {
  // ************* Component State *************** //
  const [reserveList, setReserveList] = useState([]);

  // ************* Component Methods *************** //

  // Sorting Methods //
  // helpers
  const sortById = (unsortedList) => unsortedList.sort((a, b) => a.id - b.id);
  const sortByName = (unsortedList) => {
    return unsortedList.sort((a, b) => {
      let aName = a.customer.firstName + " " + a.customer.lastName,
        bName = b.customer.firstName + " " + b.customer.lastName;
      if (aName > bName) return 1;
      else return -1;
    });
  };

  // Main sorting
  // implemented this considering adding more sort fields in the future if needed
  const sortReservations = (sortField) => {
    let sortedList = [...reserveList];
    // if sort field is the ID
    if (sortField === "id") sortedList = sortById(sortedList);
    // if sort field is the Customer Name
    if (sortField === "customer") sortedList = sortByName(sortedList);

    setReserveList(sortedList);
  };

  // fetching reservations data
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
      <ReservationsList
        reservationsList={reserveList}
        sortReservations={sortReservations}
      />
    </section>
  );
};

export default Reservations;
