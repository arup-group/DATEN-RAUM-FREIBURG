import { Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", margin: 4, padding: 4 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 400, color: "black" }}>
        Prototype application developed by [LEGAL ENTITY NAME] for Freiburg im
        Breisgau. [LEGAL ENTITY Address Street, Address City, Postal Code, Country]. [LEGAL REGISTRATION NUMBER] <br />
        For further information,{" "}
        <Link href="https://www.arup.com/our-firm/legal">
          please view our terms of use.
        </Link>
        This application is strictly a demonstration prototype only. It does not
        represent a production application and is not for commercial use.
      </Typography>
    </Box>
  );
};
