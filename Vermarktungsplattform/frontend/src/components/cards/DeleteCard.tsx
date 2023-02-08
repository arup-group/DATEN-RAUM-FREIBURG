import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ButtonProps } from "@mui/material";

/**
 * @param {string} title - Title for delete card
 * @param {string} actionLabel - Label for delete button text
 * @param {(params: React.MouseEvent<HTMLElement>) => void} deleteCallback - Callback to action delete on click
 * @param {ButtonProps["color"]} actionColor - Optional color for action button
 */
export interface DeleteCardProps {
  title?: string;
  actionLabel: string;
  deleteCallback: (params: React.MouseEvent<HTMLElement>) => void;
  actionColor?: ButtonProps["color"];
}

/**
 * Card with text and a delete button (with onClick callback)
 */
export const DeleteCard = (props: DeleteCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
        justifyContent: "center",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Stack rowGap={2} direction="column" sx={{ flex: 1 }}>
        {props.title && (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }} color="primary">
            {props.title}
          </Typography>
        )}
        <Box
          sx={{
            margin: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            size="medium"
            color={props.actionColor ? props.actionColor : "secondary"}
            sx={{
              textAlign: "center",
              boxShadow: 0,
              borderRadius: 1,
              textTransform: "none",
            }}
            onClick={props.deleteCallback}
            fullWidth
          >
            {props.actionLabel}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};
