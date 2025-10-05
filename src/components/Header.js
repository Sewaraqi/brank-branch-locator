import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LanguageSwitcher from "./LanguageSwitcher";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navButtons = [
  { label: t("nav_search"), to: ROUTES.SEARCH_BY_CITY },
  { label: t("nav_closest"), to: ROUTES.CLOSEST },
    { label: t("about_us"), to: ROUTES.ABOUT_US }];
  const btns = navButtons.map((btn) => (
      <Button
        key={btn.to}
        variant="contained"
        component={RouterLink}
        to={btn.to}
        sx={{
          bgcolor: "customBlue.main",
          "&:hover": { bgcolor: "customBlue.dark" },
          textTransform: "none",
          borderRadius: 2,
          boxShadow: 2,
      }}> {btn.label} </Button> ))
   return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.default",
        boxShadow: 10,
        zIndex: 50,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: `linear-gradient(to bottom right, ${theme.palette.customBlue.main}, ${theme.palette.customBlue.dark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
              }}
            >
              <AssuredWorkloadIcon sx={{ color: "background.default", fontSize: 30 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "customBlue.dark" }} 
              >
                {t("app_title")}
              </Typography>
              <Typography variant="body2" sx={{ color: "customBlue.main" }}>
                {t("subtitle")}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            {btns}
             <LanguageSwitcher/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}