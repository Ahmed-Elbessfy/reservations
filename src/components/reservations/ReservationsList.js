import React from "react";

const ReservationsList = ({ reservationsList }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Business Date</th>
          <th scope="col">Status</th>
          <th scope="col">Shift</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Quantity</th>
          <th scope="col">Customer</th>
          <th scope="col">Area</th>
          <th scope="col">Guest Notes</th>
        </tr>
      </thead>
      <tbody>
        {reservationsList.map((reservation) => {
          return <div>reserve</div>;
        })}
      </tbody>
    </table>
  );
};

export default ReservationsList;
