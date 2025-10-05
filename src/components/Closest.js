import { useEffect, useState } from "react";
import { fetchBranchesByCity } from "../api/bankApi";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import UseGeoLocation from "../location/UseGeoLocation";
import { HaversineDistance } from "../utils/distance";
import MapSection from "../components/MapSection";
import BranchInfo from "../components/BranchInfo";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useJsApiLoader } from "@react-google-maps/api";

export default function Closest() {
  const { t } = useTranslation();
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [nearestBranches, setNearestBranches] = useState([]);
  const location = UseGeoLocation();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPOUXdjhTxTUeb4hetC86XAs0vyZH2DSQ",
  });
  useEffect(() => {
    const loadAll = async () => {
      try {
        const branches = await fetchBranchesByCity();
        setBranches(branches);
        const uniqueBanks = [
          ...new Set(branches.map((b) => b.Bank_Name).filter(Boolean)),
        ].sort();
        setBanks(uniqueBanks);
      } catch (err) {
        console.error("Failed to fetch branches:", err);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    if (location.lat && selectedBank && branches.length > 0) {
      const selectedBranches = branches.filter(
        (b) => b.Bank_Name === selectedBank
      );
      const withDistance = selectedBranches.map((b) => {
        const lon = parseFloat(b.Y_Coordinate);
        const lat = parseFloat(b.X_Coordinate);
        const distance = HaversineDistance(
          location.lat,
          location.lng,
          lat,
          lon
        );
        return { ...b, distance };
      });
      const validDistances = withDistance.filter(
        (b) => typeof b.distance === "number" && !isNaN(b.distance)
      );
      const sorted = validDistances.sort((a, b) => a.distance - b.distance);
      setNearestBranches(sorted.slice(0, 3));
    }
  }, [location, selectedBank, branches]);

  return (
    <Card
      sx={{
        maxWidth: 1000,
        width: "100%",
        mx: "auto",
        my: 2,
        bgcolor: "background.default",
        boxShadow: 6,
        p: 2,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">{t("find_nearest_title")} </Typography>
          <LocationPinIcon sx={{ color: "customBlue.dark", ml: 1 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            width: "100%",
            mt: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1, justifyContent: "flex-end" }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: "customBlue.dark" }}
            >
              {t("select_bank_label")}
            </Typography>
            <AccountBalanceIcon sx={{ color: "customBlue.dark" }} />
          </Stack>
          <TextField
            select
            sx={{ width: "50%", backgroundColor: "background.paper" }}
            variant="outlined"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: 400,
                    overflowY: "auto",
                    borderRadius: 2,
                    mt: 1,
                  },
                },
              },
            }}
          >
            {banks.map((bank) => (
              <MenuItem key={bank} value={bank}>
                {bank}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Divider sx={{ my: 2, borderColor: "customBlue.dark" }} />
        {selectedBank && !location.lat && location.error && (
          <Box
            sx={{
              p: "10px 12px",
              borderRadius: "8px",
              backgroundColor: "rgb(255, 243, 205)",
              border: "1px solid rgb(255, 238, 186)",
              color: "rgb(133, 100, 4)",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {t("location_error_message")}
          </Box>
        )}
        {selectedBank && location.lat && nearestBranches.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {nearestBranches.map((branch, idx) => (
              <Card
                key={idx}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <BranchInfo branch={branch} />
              </Card>
            ))}
          </Box>
        )}
        <MapSection
          isLoaded={isLoaded}
          location={location}
          nearestBranches={nearestBranches}
        />
      </CardContent>
    </Card>
  );
}
