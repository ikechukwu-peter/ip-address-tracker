import React, { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import customMarker from "../assets/icon-location.svg";

import { IMAP } from "../@types/map";

import "leaflet/dist/leaflet.css";

const Map: FC<IMAP> = ({ data }) => {
  //custom icon
  const customIcon = new L.Icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  //change map view since map container is immutable
  const ChangeMapView = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  return (
    <MapContainer
      center={[data?.latitude, data?.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 8,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[data?.latitude, data?.longitude]} icon={customIcon}>
        <Popup>{data?.region}</Popup>
      </Marker>
      <ChangeMapView coords={[data?.latitude, data?.longitude]} />
    </MapContainer>
  );
};

export default Map;
