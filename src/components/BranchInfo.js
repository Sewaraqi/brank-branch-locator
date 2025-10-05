import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BranchInfo({ branch, compact = false }) {
  const { t } = useTranslation();

  if (!branch) return null;

  return (
    <Box sx={{ maxWidth: 250 }}>
      <Typography
        variant={compact ? "subtitle2" : "subtitle1"}
        sx={{ fontWeight: 600, color: "customBlue.dark" }}
      >
        {branch.Bank_Name} — {branch.City}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {branch.Branch_Address}, {branch.City}
      </Typography>

      {branch.distance !== undefined && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          {t("distance_label")}: {branch.distance.toFixed(2)} {t("distance_unit")}
        </Typography>
      )}

      {branch.Phone && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {t("phone_label")}: {branch.Phone}
        </Typography>
      )}
    </Box>
  );
}