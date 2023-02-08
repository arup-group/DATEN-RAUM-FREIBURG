import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";

import { TitleValueProps } from "./props/TitleValueProps";

/**
 * @param {string} title - Title of card
 * @param {string} description - Text description section of card
 * @param {TitleValueProps[]} titleValueArray - Sections with a title and description/value
 * @param {string} actionLabel - Label for the card action button
 * @param actionCallback - Event callback for action button event
 * @param {boolean} checkedState - Selected state of input checkbox
 */

export interface ActionCheckDetailsCardProps {
  title?: string;
  description?: string;
  titleValueArray?: TitleValueProps[];
  actionLabel: string;
  actionCallback: (params: any) => any;
  checkedState: boolean;
}

/**
 * Card with optional title/description, title value section, and checkbox action
 */
export const ActionCheckDetailsCard = (props: ActionCheckDetailsCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "left",
      }}
    >
      <Stack spacing={2} direction="column" sx={{ maxWidth: "200px" }}>
        {props.title && (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }} color="primary">
            {props.title}
          </Typography>
        )}
        {props.description && (
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            {props.description}
          </Typography>
        )}
        {props.titleValueArray &&
          props.titleValueArray.map((titleValue, index) => (
            <Stack direction="row" spacing={2} key={index}>
              <Typography
                sx={{ fontSize: 12, fontWeight: 600 }}
                color="primary"
              >
                {titleValue.label}
              </Typography>
              <Typography
                sx={{ fontSize: 12, fontWeight: 400 }}
                color="primary"
              >
                {titleValue.value}
              </Typography>
            </Stack>
          ))}

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={props.actionCallback}
                color="primary"
                checked={props.checkedState}
              />
            }
            label={
              <Typography
                sx={{ fontSize: 12, fontWeight: 400 }}
                color="primary"
              >
                {props.actionLabel}
              </Typography>
            }
          />
        </FormGroup>
      </Stack>
    </Card>
  );
};
