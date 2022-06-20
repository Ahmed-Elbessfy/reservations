import React from "react";
import ReservationItem from "./ReservationItem";

const ReservationsList = ({ reservationsList, sortReservations }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th
            scope="col"
            onClick={() => sortReservations("id")}
            className="cursor-pointer"
          >
            id
          </th>
          <th scope="col">Business Date</th>
          <th scope="col">Status</th>
          <th scope="col">Shift</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Quantity</th>
          <th
            scope="col"
            onClick={() => sortReservations("customer")}
            className="cursor-pointer"
          >
            Customer
          </th>
          <th scope="col">Area</th>
          <th scope="col">Guest Notes</th>
        </tr>
      </thead>
      <tbody>
        {reservationsList.map((reservation) => {
          return (
            <ReservationItem key={reservation.id} reservation={reservation} />
          );
        })}
      </tbody>
    </table>
  );
};

export default ReservationsList;