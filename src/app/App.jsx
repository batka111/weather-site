"use client";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SearchInput } from "./SearchInput";

const API_KEY = "a9bd50909a544a9c84172455241312";

export default function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Darhan");
  const [dayTemp, setDayTemp] = useState("..");
  const [nightTemp, setNightTemp] = useState("..");
  const [conditions, setConditions] = useState("");
  const [dayPic, setDayPic] = useState(null);
  const [nightPic, setNightPic] = useState(null);
  const [todayDate, setTodayDate] = useState(null);

  const onChangeText = (event) => {
    setSearch(event.target.value);
  };

  const onPressEnter = (e) => {
    if (e.code === "Enter") {
      setCity(search);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    ).then((response) => {
      response.json().then((data) => {
        const dayData = data?.forecast?.forecastday[0]?.day;
        setDayTemp(dayData?.maxtemp_c);
        setNightTemp(dayData?.mintemp_c);
        setConditions(dayData?.condition?.text);
        setTodayDate(data?.forecast?.forecastday[0]?.date);

        const condition = dayData?.condition?.text.toLowerCase();

        if (condition?.includes("sun")) {
          setDayPic("Sun.png");
          setNightPic("night.png");
        } else if (
          condition.includes("cloud") ||
          condition.includes("overcast") ||
          condition.includes("mist")
        ) {
          setDayPic("SunClouds.png");
          setNightPic("MoonCloud.png");
        } else if (
          condition?.includes("snow") ||
          condition?.includes("freezing")
        ) {
          setDayPic("SunSnow.png");
          setNightPic("MoonSnow.png");
        } else if (condition.includes("rain")) {
          setDayPic("sunRain.png");
          setNightPic("moonRain.png");
        } else {
          setDayPic("Sun.png");
          setNightPic("night.png");
        }
      });
    });
  }, [city]);

  return (
    <div className="w-full h-[1454px] bg-[#404040] flex items-center justify-center">
      <div className="w-[800px] h-[1200px] bg-[#F3F4F6] flex items-center justify-center rounded-l-3xl flex-col">
        <SearchInput
          search={search}
          onChangeText={onChangeText}
          onPressEnter={onPressEnter}
        />

        <Card
          value="day"
          cityName={city}
          temperature={dayTemp}
          condition={conditions}
          img={dayPic}
          todayDate={todayDate}
        />
        <img
          className="w-[200px] h-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full bg-[#F3F4F6]"
          src="middle.png"
          alt="Logo"
        />
      </div>
      <div className="w-[800px] h-[1200px] bg-[#0F141E] flex items-center justify-center rounded-r-3xl">
        <Card
          value="night"
          cityName={city}
          temperature={nightTemp}
          condition={conditions}
          img={nightPic}
          todayDate={todayDate}
        />
      </div>
    </div>
  );
}

function Card({ value, cityName, temperature, condition, img, todayDate }) {
  const isDay = value === "day";
  const nightcolors = isDay ? "bg-[#FFFFFFBF]" : "bg-[#111827BF]";
  const cityNameColor = isDay ? "text-[#111827]" : "text-[#FFFFFF]";
  const temperatureStyle = isDay
    ? "from-[#111827] to-[#6B7280]"
    : "from-[#F9FAFB] to-[#F9FAFB00]";

  const nightIcons = isDay
    ? "text-[black] opacity-50"
    : "text-[white] opacity-50";
  const nightConditions = isDay ? "text-[#FF8E27]" : "text-[#777CCE]";

  return (
    <div
      className={`w-[414px] h-[828px] ${nightcolors} rounded-[3rem] flex flex-col justify-between p-6`}
    >
      <div
        className={`flex flex-row items-center place-content-between mt-[32px] ${cityNameColor}`}
      >
        <div className="flex flex-col ml-[48px]">
          <p className="text-[18px] font-medium text-[#9CA3AF]">{todayDate}</p>
          <p className="text-[48px] font-extrabold leading-[58px]">
            {cityName}
          </p>
        </div>
        <i className="fa-solid fa-location-dot text-[32px] mr-[24px]"></i>
      </div>
      <div className="ml-auto mr-auto mt-[60px]">
        <img
          className="w-[262.11px] h-[262.11px] object-cover rounded-lg drop-shadow-[0_5px_25px_rgba(255,255,255,0.5)]"
          src={img}
          alt={condition}
        />
      </div>
      <div className="flex flex-col font-extrabold mt-[45px] ml-[48px]">
        <div
          className={`text-[104px] leading-[160px] text-transparent bg-clip-text bg-gradient-to-b ${temperatureStyle}`}
        >
          {temperature}°
        </div>
        <p className={`text-[24px] ${nightConditions}`}>{condition}</p>
      </div>
      <div
        className={`flex justify-around items-center mt-auto text-[32px] space-x-4 ${nightIcons}`}
      >
        <i className="fa-solid fa-house"></i>
        <i className="fa-solid fa-location-dot"></i>
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-user"></i>
      </div>
    </div>
  );
}
