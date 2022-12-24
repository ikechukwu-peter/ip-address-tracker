import { useCallback } from "react";
import { IPDATA } from "../@types/map";

export const useIP = () => {
  const getIPData = useCallback(async (ip?: string): Promise<IPDATA | void> => {
    try {
      //first api
      const url = ip
        ? `https://geo.ipify.org/api/v2/country?apiKey=${
            import.meta.env.VITE_IPIFY_API_KEY
          }&ipAddress=${ip}`
        : `https://geo.ipify.org/api/v2/country?apiKey=${
            import.meta.env.VITE_IPIFY_API_KEY
          }`;

      //usually done like this
      // const response = await fetch(url)
      // const result = await response.json()

      const response = await (await fetch(url)).json();

      //second api

      const geolocationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${
        import.meta.env.VITE_IPGEO_API_KEY
      }&ip=${response?.ip}`;

      const geoResponse = await (await fetch(geolocationUrl)).json();

      const responseObj = {
        longitude: geoResponse?.longitude,
        latitude: geoResponse?.latitude,
        isp: response?.isp,
        timezone: response?.location?.timezone,
        ip: response?.ip,
        region: response?.location?.region,
        country: response?.location?.country,
      };

      return responseObj;
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  return { getIPData };
};
