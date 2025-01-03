import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './App.css'; //home.js files styles are done inside the main css file(App.css)
import homeIcon from './icons/home.png';
import userIcon from './icons/user.png';
import myLocationIcon from './icons/my_location.png';
import directionIcon from './icons/direction.png';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhbmFrYTA1MzAiLCJhIjoiY20xdWExbDVkMGJ1YTJsc2J6bjFmaTVkNyJ9.H4sWjz4eIt0e6jeScvR5-g'; 

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Ref to store the map instance
  const [directionMarker, setDirectionMarker] = useState(null); // State to hold the direction marker
  const [startLocation, setStartLocation] = useState(null); // State to hold the user's starting location

  useEffect(() => {
    // Initialize the map, but don't center it yet
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Choose your map style
      center: [-74.006, 40.7128], // Default to New York City initially
      zoom: 12,
    });

    const token = localStorage.getItem('token');
    console.log('Token on loginHome:', token);

    mapRef.current = map;

    // Add navigation controls
    const navControl = new mapboxgl.NavigationControl();
    map.addControl(navControl, 'bottom-right');

    // Use geolocation to set the initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Create a marker for the user's location
        new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);

        // Center the map on the user's location
        mapRef.current.setCenter([longitude, latitude]);
        mapRef.current.setZoom(14); // Adjust the zoom level

        setStartLocation([longitude, latitude]); // Set start location for routing
      },
      (error) => {
        console.error('Error getting current location: ', error);
      }
    );

    // Handle map click event
    map.on('click', (event) => {
      const { lng, lat } = event.lngLat;

      // Remove previous direction marker if it exists
      if (directionMarker) directionMarker.remove();

      // Create a new marker at the clicked position
      const newDirectionMarker = new mapboxgl.Marker({ element: createDirectionIcon() })
        .setLngLat([lng, lat])
        .addTo(map);

      // Set the new direction marker and clicked location
      setDirectionMarker(newDirectionMarker);
    }); 

    // Clean up the map on unmount
    return () => map.remove();
  }, [directionMarker]);

  // Function to create the direction icon element
  const createDirectionIcon = () => {
    const directionBtn = document.createElement('button');
    const img = document.createElement('img');
    img.src = directionIcon;
    img.style.width = '30px';
    img.style.height = '30px';
    directionBtn.appendChild(img);

    // Event listener for the direction button
    directionBtn.onclick = () => {
      if (startLocation) {
        getRoute(startLocation);
      }
    };

    return directionBtn;
  };

  // Function to get the route from the user's current location to the clicked location
  const getRoute = (startLocation) => {
    const endLocation = directionMarker.getLngLat(); // Get the end location from the marker
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation[0]},${startLocation[1]};${endLocation.lng},${endLocation.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry.coordinates;

        // Remove any existing route layer
        if (mapRef.current.getLayer('route')) {
          mapRef.current.removeLayer('route');
          mapRef.current.removeSource('route');
        }

        // Add the new route to the map
        mapRef.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          },
        });

        mapRef.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });
      })
      .catch((error) => console.error('Error fetching directions:', error));
  };

  // Function to show the user's current location
const showCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        // Create a marker for the user's current location
        new mapboxgl.Marker({ color: '#FF0000' }) // Red marker for user's location
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
  
        // Center the map on the user's location
        mapRef.current.setCenter([longitude, latitude]);
        mapRef.current.setZoom(14); // Adjust zoom level as needed
  
        // Update start location for routing
        setStartLocation([longitude, latitude]);
      },
      (error) => {
        console.error('Error getting current location: ', error);
      }
    );
  };
  

  return (
    <div className="homepage">
      <div className="sidebar">
        <div className="sidebar-icon">
          <img src={userIcon} alt="User Icon" className="user-icon" onClick={() => navigate('/userAccount')}/>
          <img src={homeIcon} alt="Home Icon" />
          <button className="login-button" onClick={() => navigate('/login')}>
            Log Out
          </button>
        </div>
      </div>

      <div className="main-content">
        <div ref={mapContainerRef} className="map-background"></div>

        <div className="top-bar">
          <div className="vehicle-type-container">
            <select className="vehicle-type">
              <option>Vehicle Type</option>
              <option>Car</option>
              <option>Motorcycle</option>
            </select>
          </div>
        </div>

        <div id="geocoder" className="geocoder"></div>

        <button className="my-location-button" onClick={showCurrentLocation}>
          <img src={myLocationIcon} alt="My Location" className="my-location-icon" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
