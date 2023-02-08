import { Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";

/**
 * @param {string} title - Section title
 * @param {string} content - Section text content
 * @param {string} image - Image source for section image
 */
interface SectionProps {
  title?: string;
  content?: string;
  image?: string;
}

//Flexible component to show a title, with some text content and an image
export const Section = (props: SectionProps) => {
  return (
    <Stack direction="column" rowGap={2} sx={{ marginBottom: "16px" }}>
      {props.title && (
        <Typography
          component="span"
          sx={{
            fontSize: 18,
            fontWeight: 500,
          }}
          color="primary"
        >
          {props.title}
        </Typography>
      )}
      {props.content && (
        <Typography
          component="span"
          sx={{ fontSize: 12, fontWeight: 400 }}
          color="primary"
        >
          {props.content}
        </Typography>
      )}

      {props.image && (
        <Box component="img" alt="Section Image" src={props.image} />
      )}
    </Stack>
  );
};
