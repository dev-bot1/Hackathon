import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import axios from "axios";
import * as turf from "@turf/turf"; // Importing everything from Turf

const defaultPosition = [12.947504240944422, 77.64564305720091];

const JoinRide = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    startLocation: "",
    endLocation: "",
  });
  const [startCoords, setStartCoords] = useState(defaultPosition);
  const [endCoords, setEndCoords] = useState([]);
  const [savedRides, setSavedRides] = useState([]);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [bestMatchPercentage, setBestMatchPercentage] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const startAddr = await reverseGeocode(startCoords[0], startCoords[1]);
      setStartAddress(startAddr);

      if (endCoords.length > 0) {
        const endAddr = await reverseGeocode(endCoords[0], endCoords[1]);
        setEndAddress(endAddr);
      }
    };

    fetchAddresses();
  }, [startCoords, endCoords]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Error fetching location:", error);
      return `${lat}, ${lng}`;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setSavedRides([
      ...savedRides,
      { ...formData, startCoords, endCoords, startAddress, endAddress },
    ]);
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const compareRoutes = async () => {
    const rideGiverStartCoords = [12.947504240944422, 77.64564305720091];
    const rideGiverEndCoords = [12.978609565846654, 77.63857250391419];

    try {
      // Fetch the user route
      const userRouteResponse = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key: "5b3ce3597851110001cf624834d3f7d390104c81ba79a398cd0d5214", // Replace with your API key
            start: `${startCoords[1]},${startCoords[0]}`,
            end: `${endCoords[1]},${endCoords[0]}`,
          },
          headers: {
            Accept:
              "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          },
        },
      );

      const userRoute = userRouteResponse.data.features[0].geometry.coordinates;
      const userRouteLine = turf.lineString(userRoute);

      // Fetch the ride giver route
      const rideGiverRouteResponse = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key: "5b3ce3597851110001cf624834d3f7d390104c81ba79a398cd0d5214", // Replace with your API key
            start: `${rideGiverStartCoords[1]},${rideGiverStartCoords[0]}`,
            end: `${rideGiverEndCoords[1]},${rideGiverEndCoords[0]}`,
          },
          headers: {
            Accept:
              "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          },
        },
      );

      const rideGiverRoute =
        rideGiverRouteResponse.data.features[0].geometry.coordinates;
      const rideGiverRouteLine = turf.lineString(rideGiverRoute);

      // Calculate the match percentage
      const matchPercentage = calculateRouteMatchPercentage(
        userRouteLine,
        rideGiverRouteLine,
      );
      setBestMatchPercentage(matchPercentage);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const calculateRouteMatchPercentage = (userRouteLine, routeGiverLine) => {
    const distance = turf.length(userRouteLine, { units: "kilometers" });
    console.log("Distance:", distance);
    const overlapFeatureCollection = turf.lineOverlap(userRouteLine,         routeGiverLine);
    console.log("Overlap:", overlapFeatureCollection);
    if (overlapFeatureCollection.features.length === 0) {
      console.error("No overlap found");
      return null;
    }
    const overlapLineString = overlapFeatureCollection.features[0].geometry;
    const overlapLength = turf.length(overlapLineString, { units: "kilometers" });
    console.log("Overlap length:", overlapLength);
    if (isNaN(distance) || isNaN(overlapLength)) {
      console.error("Invalid distance or overlap length");
      return null;
    }
    const percentage = (overlapLength / distance) * 100;
    return Math.round(percentage);
  };

  return (
<div className="page-container">
<Header title="Join a Ride" />
<Sidebar />
<main>
<Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add me as a passenger
</Button>
<Button
          variant="contained"
          color="secondary"
          onClick={compareRoutes}
          disabled={savedRides.length === 0}
>
          Find Me a Ride
</Button>
        {bestMatchPercentage !== null && (
<div className="match-percentage">
            {bestMatchPercentage}% Match with available routes
</div>
        )}
        {savedRides.map((ride, index) => (
<div key={index} className="ride-card">
<h3>{ride.name}</h3>
<p>Mobile: {ride.mobile}</p>
<p>Start Location: {ride.startAddress}</p>
<p>End Location: {ride.endAddress}</p>
</div>
        ))}
</main>
<Footer />

      <Dialog open={open} onClose={handleClose}>
<DialogTitle>Add Passenger Details</DialogTitle>
<DialogContent>
<TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
<TextField
            margin="dense"
            name="mobile"
            label="Mobile Number"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.mobile}
            onChange={handleChange}
          />
<TextField
            margin="dense"
            name="startLocation"
            label="Start Location"
            type="text"
            fullWidth
            variant="outlined"
            value={startAddress}
            onChange={handleChange}
            disabled
          />
<TextField
            margin="dense"
            name="endLocation"
            label="End Location"
            type="text"
            fullWidth
            variant="outlined"
            value={endAddress}
            onChange={handleChange}
            disabled
          />
<div style={{ height: "300px", marginTop: "20px" }}>
<MapContainer
              center={defaultPosition}
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
                  iconUrl:
                    "https://leafletjs.com/examples/custom-icons/leaf-red.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
></Marker>
              {endCoords.length > 0 && (
<Marker
                  position={endCoords}
                  icon={L.icon({
                    iconUrl:
                      "https://leafletjs.com/examples/custom-icons/leaf-green.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
></Marker>
              )}
<LocationMarker setCoords={setEndCoords} />
</MapContainer>
</div>
</DialogContent>
<DialogActions>
<Button onClick={handleClose} color="primary">
            Cancel
</Button>
<Button onClick={handleSave} color="primary">
            Save
</Button>
</DialogActions>
</Dialog>
</div>
  );
};

export default JoinRide;