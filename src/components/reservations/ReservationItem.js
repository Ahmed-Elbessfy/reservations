const ReservationItem = ({ reservation }) => {
  return (
    <tr>
      <th scope="row">{reservation.id}</th>
      <td>{reservation.businessDate}</td>
      <td>{reservation.status}</td>
      <td>{reservation.shift}</td>
      <td>{reservation.start}</td>
      <td>{reservation.end}</td>
      <td>{reservation.quantity}</td>
      <td>
        {reservation.customer.firstName + " " + reservation.customer.lastName}
      </td>
      <td>{reservation.area}</td>
      <td>{reservation.guestNotes}</td>
    </tr>
  );
};
export default ReservationItem;
