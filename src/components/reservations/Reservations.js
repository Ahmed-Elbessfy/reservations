import { useEffect, useState } from "react";
import FilterReservations from "./FilterReservations";
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

  // Search Methods //
  const searchReservations = (name) => {
    let searchResults = [...reserveList].filter(
      (reserve) =>
        reserve.customer.firstName.toLowerCase().includes(name.toLowerCase()) ||
        reserve.customer.lastName.toLowerCase().includes(name.toLowerCase())
    );
    setReserveList(searchResults);
  };

  // Filter Methods //
  // Helpers
  // format dates : reformat dates to be available for comparison
  const formatDate = (date) => {
    let formatedDate = date.split(".");
    // swap since date in the date base are (month, day,year) and Date method accepts (day, month, year)
    [formatedDate[1], formatedDate[0]] = [formatedDate[0], formatedDate[1]];
    return formatedDate;
  };

  const filterByArea = (area) =>
    [...reserveList].filter((reserve) => {
      return reserve.area.toLowerCase().replace(/\s/g, "-") === area;
    });

  const filterByShift = (shift) =>
    [...reserveList].filter((reserve) => reserve.shift.toLowerCase() === shift);

  const filterByStatus = (status) =>
    [...reserveList].filter(
      (reserve) => reserve.status.toLowerCase().replace(/\s/g, "-") === status
    );

  const filterByDate = (date) =>
    // sort depending on date field: future or past
    // if future return all dates are today or after
    // if past return all dates are before today
    [...reserveList].filter((reserve) => {
      let testedDate = formatDate(reserve.businessDate);
      return date === "future"
        ? new Date(testedDate) > new Date()
        : new Date(testedDate) <= new Date();
    });

  // Main Filter
  // assume availability of multiple filters
  const filterReservations = (filters) => {
    let filteredList = [...reserveList];
    for (let filter in filters) {
      if (filter === "date" && filters[filter].length > 0)
        filteredList = filterByDate(filters[filter]);
      if (filter === "status" && filters[filter].length > 0)
        filteredList = filterByStatus(filters[filter]);
      if (filter === "shift" && filters[filter].length > 0)
        filteredList = filterByShift(filters[filter]);
      if (filter === "area" && filters[filter].length > 0)
        filteredList = filterByArea(filters[filter]);
    }

    setReserveList(filteredList);
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
      <FilterReservations
        searchReservations={searchReservations}
        filterReservations={filterReservations}
      />
      <ReservationsList
        reservationsList={reserveList}
        sortReservations={sortReservations}
      />
    </section>
  );
};

export default Reservations;
