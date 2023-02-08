import { Card, Rating, Stack, Typography } from "@mui/material";


/**
 * @param {string} ratingCategory - Rating category
 * @param {number} ratingValue - Rating value
 */
interface RatingCardReadOnlyProps {
  ratingCategory: string;
  ratingValue: number | 0;
}

/**
 * Read only rating card to display a star rating with a category
 */
export const RatingCardReadOnly = (props: RatingCardReadOnlyProps) => {
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
        <Rating name="read-only" value={props.ratingValue} readOnly />
      </Stack>
    </Card>
  );
};
