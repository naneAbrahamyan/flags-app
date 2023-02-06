import React, { useContext, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAPI } from "../hooks";
import { ThemeContext } from "../context/ThemeProvider";
import "../assets/countryPage.css";
import { BsArrowLeft } from "react-icons/bs";
import { DataContext } from "../context/DataProvider";

function CountryPage() {
  const navigate = useNavigate();
  const { country } = useParams();
  const { countries } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [borders, setBorders] = useState([]);
  const { data, loading } = useAPI(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const calcBorders = useCallback(() => {
    let border = {};
    const names = [];
    countries.map((value) => (border[value.cca3] = value.name.common));
    data[0].borders.map((value) => names.push(border[value]));
    setBorders(names);
  }, [data, countries]);

  useEffect(() => {
    if (data && countries) {
      calcBorders();
    }
  }, [countries, data]);
  return (
    <div
      className={`${theme}-theme country-container`}
      style={{ height: "100vh" }}
    >
      {loading ? (
        <div>'Loading...'</div>
      ) : (
        <div>
          <div className="top-conatiner">
            <div className="img-button">
              <button
                className={`${theme}-theme-component back-button`}
                onClick={() => navigate(-1)}
              >
                <BsArrowLeft size={24} />
                <p> Go Back</p>
              </button>
              <img src={data[0].flags.png} alt="Flag" className="country-img" />
            </div>
            <div>
              <div className="info-country">
                <div>
                  <p className="bold"> {data[0].name.common}</p>
                  <p style={{ fontWeight: "600" }}>
                    Native Name:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {Object.values(data[0].name.nativeName)[0].official}
                    </span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Population:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {data[0].population}
                    </span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Region:
                    <span style={{ fontWeight: "400" }}> {data[0].region}</span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Sub Region:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {data[0].subregion}
                    </span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Capital:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {data[0].capital[0]}
                    </span>
                  </p>
                </div>

                <div>
                  <p style={{ fontWeight: "600", marginTop: "40px" }}>
                    Top Level Domain:
                    <span style={{ fontWeight: "400" }}> {data[0].tld[0]}</span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Currencires:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {Object.values(data[0].currencies).map((cur) => (
                        <span> {cur.name}</span>
                      ))}
                    </span>
                  </p>
                  <p style={{ fontWeight: "600" }}>
                    Languages:
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {Object.values(data[0].languages)[0]}
                    </span>
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "600" }}>Border Countries:</p>

                <p
                  style={{
                    fontWeight: "400",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {borders.map((border) => (
                    <Link
                      to={{
                        pathname: `/countries/${border}`,
                      }}
                      className={`${theme}-theme-component`}
                      style={{
                        textDecoration: "none",
                        margin: "10px",
                        padding: "10px",
                      }}
                    >
                      {border}
                    </Link>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryPage;
