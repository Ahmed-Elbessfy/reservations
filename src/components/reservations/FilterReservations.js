import { useState } from "react";

const FilterReservations = ({ searchReservations }) => {
  // ************* Component State *************** //
  const [search, setSearch] = useState("");

  // ************* Component Methods *************** //
  // Search method
  const handleSearch = (e) => setSearch(e.target.value);

  // handle submit should pass up search & filter inputs
  const handleSubmit = (e) => {
    // tp prevent default behavior of reload
    e.preventDefault();

    // pass search value
    searchReservations(search);
    // empty search field
    setSearch("");
  };

  return (
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
  );
};

export default FilterReservations;
