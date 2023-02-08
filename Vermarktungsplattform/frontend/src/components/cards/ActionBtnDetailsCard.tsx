import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { TitleValueProps } from "./props/TitleValueProps";
import { ButtonProps } from "@mui/material";

/**
 * @param {string} title - Title of card
 * @param {TitleValueProps[]} titleValueArray - Sections with a title and description/value
 * @param {string} actionLabel - Label for the card action button
 * @param actionCallback - Event callback for action button event
 * @param actionColor - Action button background color - optional
 */
export interface ActionBtnDetailsCardProps {
  title?: string;
  titleValueArray: TitleValueProps[];
  actionLabel: string;
  actionCallback: (params: React.MouseEvent<HTMLElement>) => void;
  actionColor?: ButtonProps["color"];
}
/**
 * Card component, with optional title, required title/value array section, and action button at bottom with event callback
 */
export const ActionBtnDetailsCard = (props: ActionBtnDetailsCardProps) => {
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

        {props.titleValueArray.map(
          (titleValue, index) =>
            titleValue.value && (
              <Stack direction="column" rowGap={1} key={index}>
                <Typography
                  sx={{ fontSize: 12, fontWeight: 400 }}
                  color="primary"
                >
                  {titleValue.label}
                </Typography>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 500 }}
                  color="primary"
                >
                  {titleValue.value}
                </Typography>
              </Stack>
            )
        )}
        <Divider />
        <Box
          sx={{
            margin: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            color={props.actionColor ? props.actionColor : "secondary"}
            sx={{
              textAlign: "center",
              boxShadow: 0,
              borderRadius: 1,
              textTransform: "none",
            }}
            onClick={props.actionCallback}
            fullWidth
          >
            {props.actionLabel}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};
