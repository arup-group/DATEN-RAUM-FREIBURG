import { Card, Stack, Typography } from "@mui/material";
import { TitleValueProps } from "./props/TitleValueProps";

/**
 * @param {string} title - Optional title of card
 * @param { TitleValueProps[]} titleValueArray - Sections with a title and description/value
 */
export interface DetailsCardProps {
  title?: string;
  titleValueArray: TitleValueProps[];
}

/**
 * Details Card component, with optional title, and required title/value array section
 */
export const DetailsCard = (props: DetailsCardProps) => {
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
        {props.titleValueArray.map((titleValue, index) => (
          <Stack direction="column" rowGap={1} key={index}>
            <Typography
              sx={{ fontSize: 12, fontWeight: 400, maxWidth: "80px" }}
              color="primary"
            >
              {titleValue.label}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }} color="primary">
              {titleValue.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};
