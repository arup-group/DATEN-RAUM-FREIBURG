import { Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

/**
 * @param {string} title - Title of navigation card
 * @param {string} description - Description of navigation card
 * @param {string} btnTitle - Label of button for navigation
 * @param {string} linkURL - React Router navigation string "/someplace"
 */

export interface NavigationCardProps {
  title: string;
  description?: string;
  btnTitle: string;
  linkURL: string;
}

/**
 * React Router link - compatible navigation card with title/description and a button to navigate somewhere
 */
export const NavigationCard = (props: NavigationCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "500px",
        padding: 4,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={0.8}>
          <Typography
            sx={{ fontSize: 18, fontWeight: 600 }}
            color="primary"
            variant="h1"
          >
            {props.title}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 300 }}
            color="primary"
            variant="subtitle1"
          >
            {props.description}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          sx={{
            textAlign: "center",
            boxShadow: 0,
            borderRadius: 1,
            textTransform: "none",
          }}
          component={Link}
          to={props.linkURL}
        >
          {props.btnTitle}
        </Button>
      </Box>
    </Card>
  );
};
