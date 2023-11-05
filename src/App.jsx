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

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

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
    </div>
  )
}

export default App