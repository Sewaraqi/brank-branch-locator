import { useState } from "react";
import { fetchBranchesByCity } from "../api/bankApi";
import { isHebrew } from "../utils/locale";
import Divider from "@mui/material/Divider";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  TableContainer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const { t } = useTranslation();
  const [cityInput, setCityInput] = useState("");
  const [branches, setBranches] = useState([]);
  const theme = useTheme();

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    try {
      const results = await fetchBranchesByCity();
      const filtered = results.filter(
        (branch) =>
          branch.City &&
          branch.City.toLowerCase() === cityInput.trim().toLowerCase()
      );
      setBranches(filtered);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

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
        <Typography variant="h5" sx={{ mb: 3 }}>
          {" "}
          {t("search_bank_branches_by_city")}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <TextField
                fullWidth
                variant="outlined"
                label={t("city_label")}
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon sx={{ fontSize: 20 }} />}
                sx={{
                  bgcolor: "customBlue.main",
                  "&:hover": { bgcolor: "customBlue.dark" },
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: 2,
                  height: "100%",
                }}
                onClick={handleSearch}
              >
                {t("search")}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {branches.length > 0 && (
          <>
            <Divider sx={{ my: 2, borderColor: "customBlue.dark" }} />

            <Card
              sx={{
                border: "1px solid",
                borderColor: "customBlue.dark",
                boxShadow: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  sx={{
                    maxHeight: 400,
                    height: "100%",
                    overflowY: "auto",
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ "& th, & td": { textAlign: "right" } }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          background: `linear-gradient(to right, ${theme.palette.customBlue.light}, ${theme.palette.background.paper})`,
                          "& th, & td": {
                            color: "customBlue.dark",
                            fontWeight: "bold",
                            cursor: "default",
                            borderBottom: `1px solid ${theme.palette.customBlue.dark}`,
                          },
                        }}
                      >
                        <TableCell>{t("access_col_name")}</TableCell>
                        <TableCell>{t("telephone_col_title")}</TableCell>
                        <TableCell>{t("address_col_title")}</TableCell>
                        <TableCell>{t("city_col_title")}</TableCell>
                        <TableCell>{t("branch_name_col_title")}</TableCell>
                        <TableCell>{t("bank_name_col_title")}</TableCell>
                        <TableCell>{t("code_col_title")}</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {branches.map((branch, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            backgroundColor:
                              idx % 2 === 0
                                ? "white"
                                : "rgba(239, 246, 255, 0.5)",
                            "&:hover": {
                              backgroundColor: "rgba(219, 234, 254, 0.5)",
                            },
                          }}
                        >
                          <TableCell>{branch.Handicap_Access}</TableCell>
                          <TableCell>{branch.Telephone}</TableCell>
                          <TableCell>{branch.Branch_Address}</TableCell>
                          <TableCell>{branch.City}</TableCell>
                          <TableCell>{branch.Branch_Name}</TableCell>
                          <TableCell>{branch.Bank_Name}</TableCell>
                          <TableCell>{branch.Bank_Code}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}
