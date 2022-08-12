import {
  Facebook,
  Instagram,
  LinkedIn,
  Telegram,
  Twitter,
} from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import React from "react";

function SocialIcon(props: { socialName: string }) {
  const { socialName } = props;
  switch (socialName) {
    case "تویتر":
      return <Twitter color="primary" sx={{ marginRight: 1 }} />;
    case "اینستاگرام":
      return <Instagram color="primary" sx={{ marginRight: 1 }} />;
    case "فیس بوک":
      return <Facebook color="primary" sx={{ marginRight: 1 }} />;
    case "تلگرام":
      return <Telegram color="primary" sx={{ marginRight: 1 }} />;
    case "لینکدین":
      return <LinkedIn color="primary" sx={{ marginRight: 1 }} />;
    case "وب سایت":
      return <PublicIcon color="primary" sx={{ marginRight: 1 }} />;
    default:
      break;
  }
}

export default SocialIcon;
