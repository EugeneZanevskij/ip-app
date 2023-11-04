import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

  async function getIpAddress() {
    try {
      const responseIp = await axios.get(
        `https://api.ipdata.co?api-key=${import.meta.env.VITE_API_KEY}`
      );
      // console.log("ip from new api", responseIp.data);
      setData({
        ip: responseIp.data.ip,
        city: responseIp.data.city,
        country: responseIp.data.country_name,
        flag: responseIp.data.flag,
        currency: responseIp.data.currency,
        callingCode: responseIp.data.calling_code,
      });
      setLocation({
        lat: responseIp.data.latitude,
        lng: responseIp.data.longitude,
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIpAddress();
  }, []);
  
  return (
    <div>{data?.ip}</div>
  )
}

export default App