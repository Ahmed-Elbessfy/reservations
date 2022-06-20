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
  // Search locally in the function and return result to allow both search & filters in the same time
  const searchReservations = (name, reservations) => {
    return reservations.filter(
      (reserve) =>
        reserve.customer.firstName.toLowerCase().includes(name.toLowerCase()) ||
        reserve.customer.lastName.toLowerCase().includes(name.toLowerCase())
    );
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

  const filterByArea = (area, reservations) =>
    reservations.filter((reserve) => {
      return reserve.area.toLowerCase().replace(/\s/g, "-") === area;
    });

  const filterByShift = (shift, reservations) =>
    reservations.filter((reserve) => reserve.shift.toLowerCase() === shift);

  const filterByStatus = (status, reservations) =>
    reservations.filter(
      (reserve) => reserve.status.toLowerCase().replace(/\s/g, "-") === status
    );

  const filterByDate = (date, reservations) =>
    // sort depending on date field: future or past
    // if future return all dates are today or after
    // if past return all dates are before today
    reservations.filter((reserve) => {
      let testedDate = formatDate(reserve.businessDate);
      return date === "future"
        ? new Date(testedDate) > new Date()
        : new Date(testedDate) <= new Date();
    });

  // Main Filter
  // assume availability of multiple filters
  // Filter locally in the function and return result to allow both search & filters in the same time
  const filterReservations = (filters, reservations) => {
    for (let filter in filters) {
      if (filter === "date" && filters[filter].length > 0)
        reservations = filterByDate(filters[filter], reservations);
      if (filter === "status" && filters[filter].length > 0)
        reservations = filterByStatus(filters[filter], reservations);
      if (filter === "shift" && filters[filter].length > 0)
        reservations = filterByShift(filters[filter], reservations);
      if (filter === "area" && filters[filter].length > 0)
        reservations = filterByArea(filters[filter], reservations);
    }
    return reservations;
  };

  // perform both filter and search in the same time
  const searchAndFilterReservations = async (inputs) => {
    // get new copy of the reservations list to apply filter and search on and update reservations
    let modifiedReservations = await fetchData();
    // apply filters only if there are any
    if (inputs["filters"] !== {})
      modifiedReservations = filterReservations(
        inputs["filters"],
        modifiedReservations
      );
    // apply search only if user input
    if (inputs["search"].length > 0)
      modifiedReservations = searchReservations(
        inputs["search"],
        modifiedReservations
      );
    // set reservations to the modified reservations after searching anf filter them
    setReserveList(modifiedReservations);
  };

  // fetching reservations data
  const fetchData = async () => {
    const data = await fetch("./assets/data.json");
    const result = await data.json();
    return result.reservations;
    // setReserveList(result.reservations);
  };

  // fetching data
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setReserveList(data);
    };
    getData();
  }, []);

  return (
    <section>
      <FilterReservations
        resetReservations={fetchData}
        searchAndFilterReservations={searchAndFilterReservations}
      />
      <ReservationsList
        reservationsList={reserveList}
        sortReservations={sortReservations}
      />
    </section>
  );
};

export default Reservations;
