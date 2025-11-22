import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-my`,
          { withCredentials: true }
        );
        // result.data is the shop or null
        dispatch(setMyShopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, [dispatch]);

  return null;
};

export default useGetMyShop;
