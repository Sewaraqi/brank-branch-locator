import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Alert,
  Box,
  Link,
  Stack,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from "react-i18next";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function About() {
  const { t } = useTranslation();
  const contactDetails = [
    {
      label: t("contact_email"),
      value: "sewaraqi99@gmail.com",
      href: "mailto:sewaraqi99@gmail.com",
      icon: MailIcon,
    },
    {
      label: t("contact_linkedin"),
      value: "linkedin.com/in/sewariraqi",
      href: "https://linkedin.com/in/sewariraqi",
      icon: LinkedInIcon,
    },
  ];
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <Alert
        severity="info"
        icon={<InfoIcon fontSize="small" />}
        sx={{
          backgroundColor: "customBlue.extraLight",
          border: "1px solid customBlue.extraLight",
          color: "customBlue.dark",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {t("note_title")}
        </Typography>
        <Typography variant="body2">{t("note_content")}</Typography>
      </Alert>
      <Divider />
      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
        }}
      >
        <CardHeader
          title={
            <Box direction="row" display="flex" alignItems="center" justifyContent="flex-end">
            
              <Typography variant="h6" color="customBlue.dark" fontWeight={600}>
                {t("contact_title")}
              </Typography>
              <MailIcon sx={{ color: "customBlue.dark", ml: 1 }} />
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {contactDetails.map((detail, i) => {
              const Icon = detail.icon;
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Icon sx={{ color: "customBlue.dark" }} />
                    <Typography variant="body1" fontWeight={500}>
                      {detail.label}
                    </Typography>
                  </Stack>
                  <Link
                    href={detail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      fontWeight: 600,
                      color: "customBlue.dark",
                      "&:hover": { color: "customBlue.light" },
                    }}
                  >
                    {detail.value}
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
      <Divider />
      <Typography
        variant="body1"
        color="customBlue.dark"
        align="center"
        sx={{ fontWeight: 500 }}
      >
        {t("thanks")}
      </Typography>
    </Box>
  );
}
