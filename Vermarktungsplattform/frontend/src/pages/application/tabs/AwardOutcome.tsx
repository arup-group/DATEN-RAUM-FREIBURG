import { Box, Stack } from "@mui/material";
import { AwardCard } from "../../../components/cards/AwardCard";
import { RatingCardReadOnly } from "../../../components/cards/RatingCardReadOnly";
import { Section } from "../../../components/Section";
import { AwardCriteriaEvaluationProp } from "./AwardEvaluation";

/**
 * @param {AwardCriteriaEvaluationProp[]} awardOutcomeEvaluation - Award evaluation object array
 * @param {string} awardStatus - Award status
 */
export interface AwardOutcomeProps {
  awardOutcomeEvaluation: AwardCriteriaEvaluationProp[];
  awardStatus: string;
}

/**
 * Displays the award outcome of an application
 */
export const AwardOutcome = (props: AwardOutcomeProps) => {
  const { awardStatus, awardOutcomeEvaluation } = props;

  return (
    <Box
      sx={{
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Section title={"Vergabeergebnis"} />
      <AwardCard ratingCategory="Vergabestatus" ratingStatus={awardStatus} />
      <Box
        sx={{
          marginTop: "35px",
        }}
      >
        <Section title={"Beurteilung der Vergabekriterien"} />
        <Stack direction="column" rowGap={3}>
          {awardOutcomeEvaluation.map((award) => (
            <RatingCardReadOnly
              ratingCategory={award.criteria}
              ratingValue={award.rating}
              key={award.id}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
