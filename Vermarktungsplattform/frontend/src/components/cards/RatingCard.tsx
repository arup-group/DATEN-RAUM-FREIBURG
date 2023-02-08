import { Card, Rating, Stack, Typography } from "@mui/material";

/**
 * @param {number} ratingId - Rating category identifer
 * @param {string} ratingCategory - Rating category
 * @param {number} ratingValue - Rating value (0-5)
 * @param { (newValue: number, ratingID: number) => void} ratingCallback - onchange callback
 */

interface RatingCardProps {
  ratingId: number;
  ratingCategory: string;
  ratingValue: number;
  ratingCallback: (newValue: number | null, ratingID: number) => void;
}

/**
 * User interactable rating card to display a star rating with a category
 */
export const RatingCard = (props: RatingCardProps) => {
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
          sx={{ fontSize: 16, fontWeight: 400, flex: 1, flexGrow: 1 }}
          color="primary"
        >
          {props.ratingCategory}
        </Typography>
        <Rating
          name="simple-controlled"
          value={props.ratingValue}
          onChange={(event, newValue) => {
            props.ratingCallback(newValue, props.ratingId);
          }}
        />
      </Stack>
    </Card>
  );
};
