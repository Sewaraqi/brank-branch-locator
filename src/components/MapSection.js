import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import BranchInfo from "../components/BranchInfo";

export default function MapSection({ isLoaded, location, nearestBranches }) {
  const { t } = useTranslation();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 500,
        boxShadow: 1,
        borderRadius: 1,
        mt: 2,
      }}
    >
      <CardHeader
        sx={{
          background: "linear-gradient(to right, #ffffff, #e3f2fd)",
          py: 1,
        }}
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Typography
              variant="h6"
              sx={{ color: "customBlue.dark", fontWeight: 600 }}>
              {t("branch_map_title")}
            </Typography>
            <MapIcon sx={{ color: "customBlue.dark", ml: 1 }} />
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ height: 500, width: "100%" }}>
          {isLoaded && (
            <GoogleMap
              center={
                location.lat && location.lng
                  ? { lat: location.lat, lng: location.lng }
                  : { lat: 31.7683, lng: 35.2137 }
              }
              zoom={12}
              mapContainerStyle={{
                height: "100%",
                width: "100%",
              }}
            >
              {location.lat && (
                <Marker
                  position={{ lat: location.lat, lng: location.lng }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  onClick={() => setUserInfoOpen(true)}
                />
              )}

              {userInfoOpen && location.lat && (
                <InfoWindow
                  position={{ lat: location.lat, lng: location.lng }}
                  onCloseClick={() => setUserInfoOpen(false)}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "customBlue.dark",
                      }}
                    >
                      📍 {t("your_location_title")}
                    </Typography>
                    <Typography sx={{ color: "customBlue.dark" }}>
                      {t("you_are_here")}
                    </Typography>
                  </Box>
                </InfoWindow>
              )}
              {nearestBranches.map((branch, idx) => {
                const lng = parseFloat(branch.Y_Coordinate);
                const lat = parseFloat(branch.X_Coordinate);
                return (
                  <Marker
                    key={idx}
                    position={{ lat, lng }}
                    onClick={() => setSelectedMarker(branch)}
                  />
                );
              })}
              {selectedMarker && (
                <InfoWindow
                  position={{
                    lng: parseFloat(selectedMarker.Y_Coordinate),
                    lat: parseFloat(selectedMarker.X_Coordinate),
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <Box sx={{ maxWidth: 220 }}>
                    <BranchInfo branch={selectedMarker} />
                  </Box>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
