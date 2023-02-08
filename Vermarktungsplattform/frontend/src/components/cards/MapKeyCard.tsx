import { Card, Stack, Typography } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";

/**
 * @param {string} cat - Key Category
 * @param {string} value - CSS Color value
 */
interface KeyDataProps {
  cat: string;
  value: string;
}

/**
 * @param {KeyDataProps[]} keyData - Array of key data objects
 */
interface MapKeyProps {
  keyData: KeyDataProps[];
}

/**
 *  Card to display map entity categories with key and colour value pair array
 */
export const MapKeyCard = (props: MapKeyProps) => {
  const { keyData } = props;

  const KeyColumn = (props: KeyDataProps) => {
    const { cat, value } = props;

    return (
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyItems: "center" }}
      >
        <Brightness1Icon style={{ color: `${value}`, marginRight: "12px" }} />
        <Typography
          component="span"
          sx={{ fontSize: 12, fontWeight: 400 }}
          color="primary"
        >
          {cat}
        </Typography>
      </Stack>
    );
  };

  return (
    <Card
      title="Legende"
      sx={{
        padding: 2,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
        mt: "5px",
      }}
    >
      <Stack direction="row">
        <Stack rowGap={2} direction="column" sx={{ flex: 1 }}>
          {keyData.map((renderData, i) =>
            i % 2 === 0 ? (
              <KeyColumn cat={renderData.cat} value={renderData.value} />
            ) : (
              <></>
            )
          )}
        </Stack>
        <Stack rowGap={2} direction="column" sx={{ flex: 1 }}>
          {keyData.map((renderData, i) =>
            i % 2 === 1 ? (
              <KeyColumn cat={renderData.cat} value={renderData.value} />
            ) : (
              <></>
            )
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
