import { Alert, AlertTitle } from "@mui/material";

/**
 * @param {string} title - Optional instructions title
 * @param {string} description - Description of instruction
 */
export interface InstructionCardProps {
  title?: string;
  description: string;
}

/**
 * Card with alert icon and instruction title/description
 */
export const InstructionCard = (props: InstructionCardProps) => {
  return (
    <Alert severity="info" sx={{ background: "#F8F9FB" }}>
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.description}
    </Alert>
  );
};
