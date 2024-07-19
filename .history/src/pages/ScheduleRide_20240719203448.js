import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./ScheduleRide.css"; // Import CSS for styling

const ScheduleRide = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rideType, setRideType] = useState('');

  const handleScheduleRide = (e) => {
    e.preventDefault();
    // Handle the form submission, including the rideType
    console.log('Scheduling ride to:', rideType);
    setIsFormOpen(false);
  };
  

  return (
    <div className="page-container">
      <main>
        <h1>Schedule a Ride</h1>
        <button 
          className="modern-button" 
          onClick={() => setIsPopupOpen(true)}
        >
          Add A Ride
        </button>
  
        {isPopupOpen && (
          <div className="popup">
            <button onClick={() => {
              setRideType('home');
              setIsFormOpen(true);
              setIsPopupOpen(false);
            }}>Ride to Home</button>
            <button onClick={() => {
              setRideType('office');
              setIsFormOpen(true);
              setIsPopupOpen(false);
            }}>Ride to Office</button>
          </div>
        )}
  
        {isFormOpen && (
          <form className="ride-form" onSubmit={handleScheduleRide}>
            <label>Pickup Location:</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Enter pickup location"
            />
            <label>Dropoff Location:</label>
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Enter dropoff location"
            />
            <label>Ride Date:</label>
            <input
              type="date"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
            />
            <label>Ride Time:</label>
            <input
              type="time"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
            />
            <label>Vehicle Type:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select a vehicle type</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
            <button type="submit">Schedule Ride</button>
          </form>
        )}
  
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
  
        <div className="ride-summary">
          {/* Ride summary content can be added here */}
        </div>
      </main>
    </div>
  );  
};

export default ScheduleRide;