import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Section } from "../../../components/Section";

/**
 * @param {string} developmentArea - proposed application development area
 * @param {string} supportingInfo - additional text field for application proposal
 */
export interface InfoProps {
  developmentArea: string;
  supportingInfo: string;
}

/**
 * @param {InfoProps} additionalInfo - additional info object
 * @param {(info: InfoProps) => void;} updateAdditionalInfo - onchange callback to update additional input
 */
export interface AdditionalInformationProps {
  additionalInfo: InfoProps;
  updateAdditionalInfo: (info: InfoProps) => void;
}

/**
 * displays an applications additional information input
 */
export const AdditionalInformation = (props: AdditionalInformationProps) => {
  //additional information application state
  const [developmentArea, setDevelopmentArea] = useState("");
  const [supportingInformation, setSupportingInformation] = useState("");

  //inherited additional information from parent component
  const { additionalInfo, updateAdditionalInfo } = props;

  useEffect(() => {
    if (additionalInfo.developmentArea !== "")
      setDevelopmentArea(additionalInfo.developmentArea);

    if (additionalInfo.supportingInfo !== "")
      setSupportingInformation(additionalInfo.supportingInfo);
  }, []);

  //handler for proposed area text input
  const handleAreaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevelopmentArea(event.target.value);
    updateAdditionalInfo({
      developmentArea: event.target.value,
      supportingInfo: supportingInformation,
    });
  };

  //handler for additional input field
  const handleAdditionalInfoInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupportingInformation(event.target.value);
    updateAdditionalInfo({
      developmentArea: developmentArea,
      supportingInfo: event.target.value,
    });
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Stack rowGap={2}>
        <Section title={"Zusatzinformationen"} />

        <TextField
          id="development-area"
          label="Vorgeschlagene Grundstücksgröße (m²)"
          variant="outlined"
          value={developmentArea}
          onChange={handleAreaInput}
          inputProps={{
            style: { fontSize: 13, fontWeight: 400, color: "primary" },
          }}
          InputLabelProps={{
            style: { fontSize: 13, fontWeight: 400, color: "primary" },
          }}
        />

        <TextField
          id="supporting-info"
          label="Weitere Informationen"
          variant="outlined"
          multiline
          value={supportingInformation}
          onChange={handleAdditionalInfoInput}
          inputProps={{
            style: { fontSize: 13, fontWeight: 400, color: "primary" },
          }}
          InputLabelProps={{
            style: { fontSize: 13, fontWeight: 400, color: "primary" },
          }}
          rows={3}
        />
      </Stack>
    </Box>
  );
};
