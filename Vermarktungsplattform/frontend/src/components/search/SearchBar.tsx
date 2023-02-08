import { Box, IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void;} requestCallback - On change search input text callback
 * @param {string} searchPlaholder - Text placehodler
 */

export interface SeachBarProps {
  requestCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaholder?: string;
}

//Search bar component with text placeholder and onchange callback function
export const SearchBar = (props: SeachBarProps) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        marginTop: "12px",
        marginBottom: "12px",
        alignItems: "right",
        marginLeft: "24px",
        marginRight: "24px",
      }}
    >
      <Stack direction="row" rowGap={2}>
        <form>
          <TextField
            id="search-bar"
            className="text"
            onChange={props.requestCallback}
            label={"Suche"}
            variant="outlined"
            placeholder={props.searchPlaholder}
            size="small"
            InputProps={{
              endAdornment: <SearchIcon style={{ fill: "primary" }} />,
            }}
          />
        </form>
      </Stack>
    </Box>
  );
};
