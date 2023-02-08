import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { RatingCard } from "../../../components/cards/RatingCard";
import { Section } from "../../../components/Section";

/**
 * @param {number} id - Id for award criteria
 * @param {string} criteria - Criteria designation
 * @param {number} rating - Applies rating value to criteria
 */
export interface AwardCriteriaEvaluationProp {
  id: number;
  criteria: string;
  rating: number;
}

/**
 * @param {AwardCriteriaEvaluationProp[]} awardEvaluation - Award evaluation array for all criteria
 * @param {() => void} updateAwardCriteriaEvaluation - Callback to set award criteria evaluation
 * @param {string} awardStatus - Current award status of application
 * @param {(status: string) => void} updateAwardStatus - Callback to set award status
 */
export interface AwardEvalutationProps {
  awardEvaluation: AwardCriteriaEvaluationProp[];
  updateAwardCriteriaEvaluation: (
    evaluation: AwardCriteriaEvaluationProp[]
  ) => void;
  awardStatus: string;
  updateAwardStatus: (status: string) => void;
}

/**
 * Component to set the award evaluation of an application
 */
export const AwardEvalutation = (props: AwardEvalutationProps) => {
  const {
    awardEvaluation,
    updateAwardCriteriaEvaluation,
    awardStatus,
    updateAwardStatus,
  } = props;

  //updates award status on select
  const updateAwardStatusSelect = (event: SelectChangeEvent) => {
    updateAwardStatus(event.target.value);
  };

  //handler to update award evaluation when star rating changes
  const updateAwardEvaluation = (newValue: number | null, ratingId: number) => {
    if (awardEvaluation && newValue) {
      const updatedList = awardEvaluation.map((item) => {
        if (item.id === ratingId) {
          const updatedItem = {
            ...item,
            rating: newValue,
          };

          return updatedItem;
        }

        return item;
      });

      updateAwardCriteriaEvaluation(updatedList);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Section title={"Vergabeergebnis"} />

      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 400, marginRight: "20px" }}
          color="primary"
        >
          Vergabestatus:
        </Typography>

        <Select
          id="award-status-select"
          value={awardStatus}
          onChange={updateAwardStatusSelect}
        >
          <MenuItem value={"Frei"}>Frei</MenuItem>
          <MenuItem value={"Verplant"}>Verplant</MenuItem>
          <MenuItem value={"Vergeben"}>Vergeben</MenuItem>
        </Select>
      </Stack>

      <Box
        sx={{
          marginTop: "35px",
        }}
      >
        <Section title={"Vergabekriterien"} />
        <Stack direction="column" rowGap={3}>
          {awardEvaluation &&
            awardEvaluation.map((award) => (
              <RatingCard
                ratingId={award.id}
                ratingCategory={award.criteria}
                ratingValue={award.rating}
                key={award.id}
                ratingCallback={updateAwardEvaluation}
              />
            ))}
        </Stack>
      </Box>
    </Box>
  );
};
