import moment from "moment";
import { useState, useEffect } from "react";
import {
  BsCloudSun,
  BsCloudy,
  BsCloudRain,
  BsCloudSnow,
  BsSun,
} from "react-icons/bs";
import { API_URL, API_KEY } from "./api/api";
import style from "./App.module.scss";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState(<BsSun />);
  const [query, setQuery] = useState("Long Thành");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${API_URL}?q=${query}&appid=${API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setTemp(Math.round(Math.round(result.main.temp) / 10));
          setWeather(result.weather[0].main);
          setHumidity(result.main.humidity);
          setSpeed(result.wind.speed);
          setSunrise(
            new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN")
          );
          setSunset(
            new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN")
          );
          setCity("");
        });
    };
    fetchData();

    switch (weather) {
      case "Clear":
        setIcon(BsSun);
        break;
      case "Clouds":
        setIcon(BsCloudy);
        break;
      case "CloudSun":
        setIcon(BsCloudSun);
        break;
      case "Rain":
        setIcon(BsCloudRain);
        break;
      case "Snow":
        setIcon(BsCloudSnow);
        break;
      default:
        setIcon(BsCloudSun);
    }
  }, [query, weather]);

  const enterPress = (evn) => {
    if (evn.key === "Enter") {
      setQuery(city);
    }
  };

  return (
    <div className={style.app}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <input
            placeholder="Search Your City..."
            onChange={(value) => setCity(value.target.value)}
            value={city}
            onKeyPress={enterPress}
            className={style.inputBox}
          />
          <div className={style.headerBody}>
            <div className={style.headerLeft}>
              <h1 className={style.temp}>{temp}&#8451;</h1>
              <h2 className={style.weatherIcon}>{icon}</h2>
              <h2 className={style.weather}>{weather}</h2>
              <p>{moment().format("dddd, MMMM Do YYYY")}</p>
            </div>
          </div>
          <div className={style.headerRight}>
            <h1 className={style.city}>
              {data.name ? data.name : "Your city is undefined"}
            </h1>
          </div>
        </div>
        <div className={style.footer}>
          <div>
            <p className={style.footerItem}>Humidity: {humidity} %</p>
            <p>Wind: {speed}Km/h</p>
          </div>
          <div>
            <p className={style.footerItem}>
              Sunrise:
              {sunrise}
            </p>
            <p>
              Sunset:
              {sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
