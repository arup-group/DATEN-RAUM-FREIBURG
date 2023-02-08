import { Card, Stack, Typography } from "@mui/material";

/**
 * @param {string} ratingCategory - Title category for award
 * @param {string} ratingStatus - Award status value
 */

interface AwardCardProps {
  ratingCategory: string;
  ratingStatus: string;
}

/**
 * Card with award rating label / value displayed in a row
 */
export const AwardCard = (props: AwardCardProps) => {
  const { ratingCategory, ratingStatus } = props;
  return (
    <Card
      sx={{
        padding: 2,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
      }}
    >
      <Stack direction="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            flex: 1,
            flexGrow: 4,
          }}
          color="primary"
        >
          {ratingCategory}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
            width: "120px",
          }}
          color="primary"
        >
          {ratingStatus}
        </Typography>
      </Stack>
    </Card>
  );
};
