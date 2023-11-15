import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const apiKey = "b8309b670233249d3b41641be9652c7a";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">WEATHER APP</h1>
        <div className="d-grid gap-4 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {Object.keys(data).length > 0 && (
          <div className="col-md-12 text-center mt-5">
            <div className="shadow rounded weatherResultbox">
              <img
                className="weatherIcon"
                src="https://cdn.iconscout.com/icon/free/png-512/free-weather-2844887-2365236.png?f=webp&w=512"
                alt="#"
              />
              <h5 className="wthrCity">{data?.name}</h5>
              <h6 className="wthrTemp">
                {(data?.main?.temp - 273.15).toFixed(1)}°C
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
