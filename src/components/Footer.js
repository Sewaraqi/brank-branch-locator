import React from 'react'
import { Box, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
export default function Footer() {
  const { t} = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        backgroundColor: "background.default",
        color: "white",
      }}
    >
      <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "customBlue.dark" }} 
              >{t("footer_text")}</Typography>
    </Box>
  );
}
