import { Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * @param {string} description - Description of navigation card
 * @param {string} btnTitle - Label of button for navigation
 */

export interface ApplicationFileCardProps {
  description: string;
  btnTitle: string;
}

/**
 * React Router link - compatible navigation card with title/description and a button to navigate somewhere
 */
export const ApplicationFileCard = (props: ApplicationFileCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 1,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          flexGrow: 1,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            flex: 1,
          }}
        >
          <Typography
            sx={{ fontSize: 14, fontWeight: 500, flexGrow: 1 }}
            color="primary"
            variant="subtitle1"
          >
            {props.description}
          </Typography>
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
            size="small"
            color="secondary"
            sx={{
              textAlign: "center",
              boxShadow: 0,
              borderRadius: 1,
              textTransform: "none",
              minWidth: "125px",
            }}
          >
            {props.btnTitle}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};
