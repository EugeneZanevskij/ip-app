import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GoGlobe } from "react-icons/go";
import {
	FaClock,
	FaMoneyBillAlt,
	FaPhoneAlt,
	FaRegCalendar,
} from "react-icons/fa";
import dayjs from 'dayjs';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const currentDate = dayjs().format("D MMM YYYY");
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm"));

  useEffect(() => {
    async function getIpAddress() {
      try {
        const responseIp = await axios.get(
          `https://api.ipdata.co?api-key=${import.meta.env.VITE_API_KEY}`
        );
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
    getIpAddress();
  }, []);

  useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(dayjs().format("HH:mm"));
		}, 60000);

		return () => clearInterval(interval);
	}, []);
  
  return (
    <div className="App">
      <MapContainer key={`${location.lat}-${location.lng}`} center={[location.lat, location.lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
        <Marker position={[location.lat, location.lng]}>
        <Popup>
							<div className="popup-line">
								<span>National flag:</span>
								<img src={data?.flag} alt="flag" />
							</div>
							<div className="popup-line">
								<FaPhoneAlt className="icon" />
								<span>Int. country calling code:</span>
								<span>+{data?.callingCode}</span>
							</div>
							<div className="popup-line">
								<FaMoneyBillAlt className="icon" />
								<span>Currencies:</span>
								<span>
									{data?.currency.name} - {data?.currency.symbol}
								</span>
							</div>
						</Popup>
        </Marker>
      </MapContainer>
      <div className="info">
        <p className="ip">Your IP address: {data?.ip}</p>
        <div className="info-line">
          <GoGlobe className="icon" />
          <span>Location:</span>
          <span className='location'>
            {data?.city}, {data?.country}
          </span>
        </div>
        <div className="info-line">
          <FaRegCalendar className="icon" />  
          <span>Today is:</span>
          <span>{currentDate}</span>
        </div>
        <div className="info-line">
          <FaClock className="icon" />
          <span>Time:</span>
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  )
}

export default App