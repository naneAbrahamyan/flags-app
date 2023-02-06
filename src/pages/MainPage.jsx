import React, { useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { BsSearch } from "react-icons/bs";
import "../assets/mainPage.css";
import { DataContext } from "../context/DataProvider";

const options = ["Africa", "America", "Asia", "Europe", "Oceania"];
function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const { countries } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [timeoutId, setTimeoutId] = useState(null);
  const handleInputChange = useCallback((event) => {
    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      setValue(event.target.value);
    }, 500);

    setTimeoutId(newTimeoutId);
  }, []);
  const handleFilterClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    const value = isOpen;
    setIsOpen(!value);
  };

  return (
    <div className={`${theme}-theme main-page-conatiner`}>
      {countries === null ? (
        "Loading..."
      ) : (
        <>
          <div className={`${theme}-theme filters-conatiner`}>
            <div
              className={`${theme}-theme-component search-input`}
              style={{ display: "flex" }}
            >
              <BsSearch className={"search-icon"} />
              <input
                type="text"
                name={value}
                onChange={(e) => handleInputChange(e)}
                placeholder="Search"
                style={{
                  color: "inherit",
                  background: "inherit",
                  border: "inherit",
                  paddingLeft: "25px",
                }}
                className="input-field"
              />
            </div>

            <div className="region-filter">
              {" "}
              <button
                type="button"
                aria-haspopup="listbox"
                className={`${theme}-theme-component dropDown-button`}
                onClick={(e) => handleFilterClick(e)}
              >
                {" "}
                Filter By Region
              </button>
              <div className={`dropDown ${!isOpen && "hide"}`}>
                <ul>
                  {options.map((region) => (
                    <li style={{ listStyleType: "none" }}>
                      <button
                        className={`${theme}-theme-component dropDown-button`}
                      >
                        {" "}
                        {region}{" "}
                      </button>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flags-box">
            {countries.map((country, index) => (
              <div
                className={`${
                  !country.name.common
                    .toLowerCase()
                    .includes(value.toLowerCase(), 0) && "hide"
                }`}
              >
                <Link
                  to={{
                    pathname: `/countries/${country.name.common}`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    id={index}
                    className={`${theme}-theme-component flag-box`}
                  >
                    <div style={{ height: "250px" }}>
                      <img src={country.flags.png} alt="flag" />
                    </div>
                    <div className="flag-box-text">
                      <p className="bold"> {country.name.common}</p>
                      <p style={{ fontWeight: "600" }}>
                        Population:
                        <span style={{ fontWeight: "400" }}>
                          {" "}
                          {country.population}{" "}
                        </span>
                      </p>
                      <p style={{ fontWeight: "600" }}>
                        Region:
                        <span style={{ fontWeight: "400" }}>
                          {" "}
                          {country.region}{" "}
                        </span>
                      </p>
                      <p style={{ fontWeight: "600" }}>
                        Capital:
                        <span style={{ fontWeight: "400" }}>
                          {" "}
                          {country.capital
                            ? country.capital[0]
                            : "No Capital"}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
