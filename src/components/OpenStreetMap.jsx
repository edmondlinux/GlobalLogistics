import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";

const OpenStreetMap = ({
  height = "400px",
  defaultZoom = 2,
  selectedCoordinates,
  onCoordinatesChange,
  interactive = false,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Separate effect for map initialization (runs only once)
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Check if Leaflet is already loaded
      if (window.L) {
        initializeMap();
        return;
      }

      // Load Leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Use coordinates if provided, otherwise default to world view
      const lat = selectedCoordinates ? selectedCoordinates.latitude : 20;
      const lng = selectedCoordinates ? selectedCoordinates.longitude : 0;
      const zoom = selectedCoordinates ? 12 : defaultZoom;

      // Initialize the map with appropriate interactions based on mode
      const map = window.L.map(mapRef.current, {
        dragging: true,
        touchZoom: true,
        doubleClickZoom: false,
        scrollWheelZoom: true,
        boxZoom: false,
        keyboard: interactive,
        zoomControl: true,
        tap: false,
        tapTolerance: 15,
      }).setView([lat, lng], zoom);

      // Disable specific zoom handlers that might cause issues
      map.touchZoom.disable();
      map.touchZoom.enable();

      // Set touch zoom to only work with multi-touch (pinch)
      if (map.touchZoom._enabled) {
        map.touchZoom._onTouchStart = (function (original) {
          return function (e) {
            if (e.touches && e.touches.length >= 2) {
              return original.call(this, e);
            }
          };
        })(map.touchZoom._onTouchStart);
      }

      // Add OpenStreetMap tiles
      window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add click/touch event listeners for interactive mode
      if (interactive && onCoordinatesChange) {
        // For desktop - double click
        map.on("dblclick", (e) => {
          const { lat, lng } = e.latlng;
          placeMarker(lat, lng, map);
        });

        // For mobile - long press (hold)
        let pressTimer = null;
        let startPos = null;
        let hasMoved = false;

        map.on("mousedown touchstart", (e) => {
          const originalEvent = e.originalEvent;
          startPos = { x: e.containerPoint.x, y: e.containerPoint.y };
          hasMoved = false;

          // Handle touch events (only single touch)
          if (originalEvent.touches && originalEvent.touches.length === 1) {
            pressTimer = setTimeout(() => {
              if (!hasMoved) {
                const { lat, lng } = e.latlng;
                placeMarker(lat, lng, map);
              }
            }, 700);
          }
          // Handle mouse events (excluding right clicks)
          else if (!originalEvent.touches && originalEvent.button === 0) {
            pressTimer = setTimeout(() => {
              if (!hasMoved) {
                const { lat, lng } = e.latlng;
                placeMarker(lat, lng, map);
              }
            }, 700);
          }
        });

        map.on("mousemove touchmove", (e) => {
          if (startPos) {
            const currentPos = { x: e.containerPoint.x, y: e.containerPoint.y };
            const distance = Math.sqrt(
              Math.pow(currentPos.x - startPos.x, 2) + 
              Math.pow(currentPos.y - startPos.y, 2)
            );

            if (distance > 10) {
              hasMoved = true;
              if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
              }
            }
          }
        });

        map.on("mouseup touchend", () => {
          if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
          startPos = null;
          hasMoved = false;
        });

        // Prevent context menu on long press
        map.on("contextmenu", (e) => {
          e.originalEvent.preventDefault();
          return false;
        });
      }

      mapInstanceRef.current = map;
    };

    const placeMarker = (lat, lng, map) => {
      // Custom pin icon for shipment location
      const shipmentIcon = window.L.divIcon({
        html: `<div style="position: relative;">
                 <div style="
                   width: 0; 
                   height: 0; 
                   border-left: 12px solid transparent; 
                   border-right: 12px solid transparent; 
                   border-top: 20px solid #10b981;
                   position: relative;
                   filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                 "></div>
                 <div style="
                   width: 16px; 
                   height: 16px; 
                   background-color: #10b981; 
                   border-radius: 50%; 
                   border: 2px solid white;
                   position: absolute;
                   top: -18px;
                   left: -8px;
                   box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                 "></div>
               </div>`,
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        className: "shipment-location-icon",
      });

      // Remove existing marker
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Add new marker with drag functionality
      markerRef.current = window.L.marker([lat, lng], {
        icon: shipmentIcon,
        draggable: interactive,
      }).addTo(map).bindPopup(`<strong>Selected Location</strong><br/>
                   Latitude: ${lat.toFixed(6)}<br/>
                   Longitude: ${lng.toFixed(6)}`);

      // Add drag event listeners for interactive mode
      if (interactive && onCoordinatesChange) {
        // Disable map dragging when starting to drag the marker
        markerRef.current.on("dragstart", (e) => {
          map.dragging.disable();
        });

        // Re-enable map dragging when marker drag ends
        markerRef.current.on("dragend", (e) => {
          map.dragging.enable();
          const { lat: newLat, lng: newLng } = e.target.getLatLng();
          onCoordinatesChange({
            latitude: newLat,
            longitude: newLng,
          });
          // Update popup content
          e.target.setPopupContent(`<strong>Selected Location</strong><br/>
                                  Latitude: ${newLat.toFixed(6)}<br/>
                                  Longitude: ${newLng.toFixed(6)}`);
        });

        // Optional: Handle drag event for real-time updates
        markerRef.current.on("drag", (e) => {
          // You can uncomment this if you want real-time coordinate updates while dragging
          // const { lat: newLat, lng: newLng } = e.target.getLatLng();
          // onCoordinatesChange({
          //   latitude: newLat,
          //   longitude: newLng,
          // });
        });
      }

      // Update coordinates
      if (onCoordinatesChange) {
        onCoordinatesChange({
          latitude: lat,
          longitude: lng,
        });
      }
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markerRef.current = null;
    };
  }, [defaultZoom, interactive]);

  // Separate effect to handle coordinate changes without reinitializing the map
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCoordinates) return;

    // Custom pin icon for shipment location
    const shipmentIcon = window.L.divIcon({
      html: `<div style="position: relative;">
               <div style="
                 width: 0; 
                 height: 0; 
                 border-left: 12px solid transparent; 
                 border-right: 12px solid transparent; 
                 border-top: 20px solid #10b981;
                 position: relative;
                 filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
               "></div>
               <div style="
                 width: 16px; 
                 height: 16px; 
                 background-color: #10b981; 
                 border-radius: 50%; 
                 border: 2px solid white;
                 position: absolute;
                 top: -18px;
                 left: -8px;
                 box-shadow: 0 2px 4px rgba(0,0,0,0.2);
               "></div>
             </div>`,
      iconSize: [24, 32],
      iconAnchor: [12, 32],
      className: "shipment-location-icon",
    });

    // Remove existing marker
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Add marker at new coordinates without changing zoom
    markerRef.current = window.L.marker(
      [selectedCoordinates.latitude, selectedCoordinates.longitude],
      {
        icon: shipmentIcon,
        draggable: interactive,
      },
    ).addTo(mapInstanceRef.current).bindPopup(`<strong>Shipment Location</strong><br/>
                 Latitude: ${selectedCoordinates.latitude.toFixed(6)}<br/>
                 Longitude: ${selectedCoordinates.longitude.toFixed(6)}`);

    // Add drag event listeners for interactive mode
    if (interactive && onCoordinatesChange) {
      // Disable map dragging when starting to drag the marker
      markerRef.current.on("dragstart", (e) => {
        mapInstanceRef.current.dragging.disable();
      });

      // Re-enable map dragging when marker drag ends
      markerRef.current.on("dragend", (e) => {
        mapInstanceRef.current.dragging.enable();
        const { lat, lng } = e.target.getLatLng();
        onCoordinatesChange({
          latitude: lat,
          longitude: lng,
        });
        // Update popup content
        e.target.setPopupContent(`<strong>Shipment Location</strong><br/>
                                Latitude: ${lat.toFixed(6)}<br/>
                                Longitude: ${lng.toFixed(6)}`);
      });

      // Optional: Handle drag event for real-time updates
      markerRef.current.on("drag", (e) => {
        // You can uncomment this if you want real-time coordinate updates while dragging
        // const { lat, lng } = e.target.getLatLng();
        // onCoordinatesChange({
        //   latitude: lat,
        //   longitude: lng,
        // });
      });
    }
  }, [selectedCoordinates, interactive, onCoordinatesChange]);

  return (
    <div className="space-y-2">
      {interactive && (
        <div className="text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
          <strong>Interactive Mode:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Desktop: Double-click to place pin</li>
            <li>• Mobile: Press and hold to place pin</li>
            <li>• Click and drag the pin to move it</li>
            <li>• Use mouse wheel or pinch to zoom in/out</li>
          </ul>
        </div>
      )}
      <div
        ref={mapRef}
        style={{ height: height }}
        className="w-full rounded-lg border border-gray-600 bg-gray-700"
      >
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Loading map...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap;