import { useState } from "react";

const FilterReservations = ({
  resetReservations,
  searchAndFilterReservations,
}) => {
  // ************* Component State *************** //
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [shift, setShift] = useState("");
  const [area, setArea] = useState("");

  // ************* Component Methods *************** //
  // Search method
  const handleSearch = (e) => setSearch(e.target.value);

  // Filter method
  const handleFilter = (e) => {
    switch (e.target.name) {
      case "date":
        setDate(e.target.value);
        break;
      case "status":
        setStatus(e.target.value);
        break;
      case "shift":
        setShift(e.target.value);
        break;
      // area
      default:
        setArea(e.target.value);
    }
  };

  // handle submit should pass up search & filter inputs
  const handleSubmit = (e) => {
    // tp prevent default behavior of reload
    e.preventDefault();

    // empty search field
    setSearch("");
    // pass filters && search
    searchAndFilterReservations({
      search,
      filters: {
        date: date,
        status: status,
        shift: shift,
        area: area,
      },
    });
  };

  // Reset reservations list by calling fetchData
  const handleReset = () => {
    // empty fields
    setSearch("");
    setDate("");
    setStatus("");
    setShift("");
    setArea("");
    // call fetchData
    resetReservations();
  };

  return (
    <>
      <form className="py-3" onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* search form  */}
          <div className="col-12">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            ></input>
          </div>
          {/* date filter  */}
          <div className="col-lg-3">
            <select
              value={date}
              name="date"
              className="form-select"
              onChange={handleFilter}
            >
              <option disabled value="">
                Date
              </option>
              <option value="past">Past Dates</option>
              <option value="future">Future Dates</option>
            </select>
          </div>
          {/* status filter  */}
          <div className="col-lg-3">
            <select
              value={status}
              name="status"
              className="form-select"
              onChange={handleFilter}
            >
              <option disabled value="">
                Status
              </option>
              <option value="confirmed">Confirmed</option>
              <option value="not-confirmed">Not Confirmed</option>
              <option value="seated">Seated</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>
          {/* date filter  */}
          <div className="col-lg-3">
            <select
              value={shift}
              name="shift"
              className="form-select"
              onChange={handleFilter}
            >
              <option disabled value="">
                Shift
              </option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          {/* Area filter  */}
          <div className="col-lg-3">
            <select
              value={area}
              name="area"
              className="form-select"
              onChange={handleFilter}
            >
              <option disabled value="">
                Area
              </option>
              <option value="bar">Bar</option>
              <option value="main-room">Main Room</option>
            </select>
          </div>
          {/* submit search and filter */}
          <div className="col-lg-6 offset-lg-6 d-flex justify-content-end">
            <input
              type="submit"
              value="Apply"
              className="btn btn-dark w-25 ml-auto"
            />
          </div>
        </div>
      </form>
      {/* reset button to retrieve the initial state of the list */}
      <div className="row">
        <div className="col-lg-6 offset-lg-6 d-flex justify-content-end">
          <button className="btn btn-dark w-25 ml-auto" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterReservations;
