import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import axios from "axios";
import "./ScheduleRide.css";

const ScheduleRide = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rideType, setRideType] = useState('');
  const [startCoords, setStartCoords] = useState([12.947504240944422, 77.64564305720091]);
  const [endCoords, setEndCoords] = useState([]);

  const handleScheduleRide = (e) => {
    e.preventDefault();
    console.log('Scheduling ride to:', rideType);
    setIsFormOpen(false);
  };

  const LocationMarker = ({ setCoords }) => {
    const map = useMapEvents({
      click(e) {
        setCoords([e.latlng.lat, e.latlng.lng]);
      },
    });

    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      showMarker: false,
      autoClose: true,
      searchLabel: "End Location",
      retainZoomLevel: true,
    });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", (result) => {
      setCoords([result.location.y, result.location.x]);
    });

    return null;
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
          <div className="popup-content">
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
            <div style={{ height: "300px", marginTop: "20px" }}>
              <MapContainer
                center={startCoords}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={startCoords}
                  icon={L.icon({
                    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
                ></Marker>
                {endCoords.length > 0 && (
                  <Marker
                    position={endCoords}
                    icon={L.icon({
                      iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })}
                  ></Marker>
                )}
                <LocationMarker setCoords={setEndCoords} />
              </MapContainer>
            </div>
            <button type="submit">Schedule Ride</button>
          </form>
        )}

        <div className="ride-summary">
          {/* Ride summary content can be added here */}
        </div>
      </main>
    </div>
  );
};

export default ScheduleRide;
