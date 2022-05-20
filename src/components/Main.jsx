import React, { useEffect, useState } from "react";
import { AiFillRightCircle, AiOutlineLoading } from "react-icons/ai";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import HeaderImg from "../assets/images/pattern-bg.png";
import useGeolocation from "../utils/useGeolocation";

const Main = () => {
  const location = useGeolocation();
  const { lat, lng } = location;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const newLat = parseFloat(lat);
  const newLng = parseFloat(lng);
  const apiKey = process.env.REACT_APP_API_KEY;
  const myIP = process.env.REACT_APP_API_IP;
  const [userInput, setUserInput] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ip: "",
    country: "",
    region: "",
    timezone: "",
    isp: "",
  });
  const { ip, country, region, timezone, isp } = data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`
          )
          .then((res) => {
            setData({
              ip: res.data.ip,
              country: res.data.location.country,
              region: res.data.location.region,
              timezone: res.data.location.timezone,
              isp: res.data.isp,
            });
          });
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [apiKey, myIP]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${userInput}`
        )
        .then((res) => {
          setData({
            ip: res.data.ip,
            country: res.data.location.country,
            region: res.data.location.region,
            timezone: res.data.location.timezone,
            isp: res.data.isp,
          });
        });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="text-center mb-10">
            <img
              className="w-full h-[250px] z-[-1] absolute lg:h-auto "
              src={HeaderImg}
              alt=""
            />
            <h1 className="text-white text-2xl py-5 ">IP Address Track</h1>
            <form onSubmit={handleSubmit} className="flex justify-center">
              <div className="bg-white w-[80%] py-2 rounded-2xl flex lg:w-[40%]">
                <input
                  className="bg-transparent w-[90%] text-lg indent-2  "
                  type="text"
                  placeholder="Enter Ip Address"
                  onChange={handleSearch}
                />
                {error ? <h1>{error}</h1> : ""}
                <button type="submit">
                  <AiFillRightCircle className="text-purple-800 text-2xl" />
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white left-0 right-0 mx-auto rounded-xl items-center text-center z-10 absolute w-[80%] lg:flex justify-evenly lg:p-4 ">
            <div className="mb-3 font-bold pt-4">
              <p className=" text-xs text-gray-500  ">IP ADDRESS</p>
              <p>{ip ? ip : "N/A"}</p>
            </div>
            <div className="lg:bg-gray-800 lg:w-[1px] lg:h-10 rounded-3xl opacity-50 "></div>
            <div className="mb-3 font-bold">
              <p className=" text-xs text-gray-500  ">Location</p>
              <p>{ip ? `${region}, ${country}` : "N/A"}</p>
            </div>
            <div className="lg:bg-gray-800 lg:w-[1px] lg:h-10 rounded-3xl opacity-50 "></div>
            <div className="mb-3 font-bold">
              <p className=" text-xs text-gray-500  ">Timezone</p>
              <p>{ip ? `UTC ${timezone}` : "N/A"}</p>
            </div>
            <div className="lg:bg-gray-800 lg:w-[1px] lg:h-10 rounded-3xl opacity-50 "></div>
            <div className="pb-4 font-bold">
              <p className=" text-xs text-gray-500  ">ISP</p>
              <p>{ip ? isp : "N/A"}</p>
            </div>
          </div>
          <div>
            {newLat ? (
              <GoogleMap
                zoom={10}
                center={{ lat: newLat, lng: newLng }}
                mapContainerClassName="map-container"
                options={{ disableDefaultUI: true }}
              >
                <Marker position={{ lat: newLat, lng: newLng }} />
              </GoogleMap>
            ) : (
              <h1 className="flex justify-center mt-[45vh] text-6xl text-purple-700  ">
                <AiOutlineLoading className="animate-spin" />
              </h1>
            )}
          </div>
        </>
      ) : (
        <h1 className="flex justify-center mt-[45vh] text-6xl text-purple-700  ">
          <AiOutlineLoading className="animate-spin" />
        </h1>
      )}
    </>
  );
};

export default Main;
