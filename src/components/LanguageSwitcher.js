import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "@mui/material/styles";
/*
explantion for the developer What happens inside i18next:
It updates i18n.language → "en".
It notifies all React components that use useTranslation.
Because of React’s binding, those components re-render automatically with the new language. 
This is possible because react-i18next internally uses a React context provider (I18nextProvider).
The context listens to i18n events like "languageChanged".
When the event fires, it forces all subscribed components to update.
You don’t need to manually re-render.
When i18n.changeLanguage("en") is called:
An event is triggered: "languageChanged".
react-i18next catches it and makes all components using useTranslation() re-evaluate their t() calls.
The React virtual DOM updates only the changed text nodes efficiently.
*/
export default function LanguageSwitcher() {
    const {i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleLangChange = (lang) => {
    if (lang) i18n.changeLanguage(lang);
    setAnchorEl(null);
  };
      return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <LanguageIcon  sx={{
                color: "customBlue.main", fontSize: 30 ,
              }}/>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleLangChange()}>
        <MenuItem onClick={() => handleLangChange("he")}>עברית</MenuItem>
        <MenuItem onClick={() => handleLangChange("en")}>English</MenuItem>
      </Menu>
    </>
  );
}
