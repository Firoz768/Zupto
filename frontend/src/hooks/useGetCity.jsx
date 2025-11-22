import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentAddress, setCurrentCity, setCurrentState } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPI_KEY;

  useEffect(() => {
    if (!apikey) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
          );

          const loc = res?.data?.results?.[0] || {};

          const cityName =
            loc.city ||
            loc.town ||
            loc.village ||
            loc.municipality ||
            loc.suburb ||
            loc.district ||
            loc.county ||
            "";

          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(loc.state || ""));
          dispatch(setCurrentAddress(loc.address_line1 ||loc.address_line2 ));
        } catch (e) {
          console.error(e);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }, [apikey, dispatch, userData?._id]);
};

export default useGetCity;
