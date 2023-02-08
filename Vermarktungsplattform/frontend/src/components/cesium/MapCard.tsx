import { Stack } from "@mui/material";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ActionBtnDetailsCard } from "../cards/ActionBtnDetailsCard";
import { Entity, reconstructEntityResponse } from "./utils/EntityResponse";

/**
 * @param {Entity[]} selectedEntity - Selected Cesium GEOJSON Entity
 */
export interface HomeProps {
  selectedEntity: Entity[];
}

/**
 * Card to display a selected map entity detail
 *
 * @param {HomeProps} props - Home props with selected entity array
 */
export const MapCard = (props: HomeProps) => {
  let navigate = useNavigate();

  const viewDetailsActionCallBack = (event: SyntheticEvent) => {
    const fid = props.selectedEntity.find((entity: any) => {
      return entity.label === "Fid: ";
    });

    if (fid) navigate("/plotdetails", { state: { plotFID: fid.value } });
  };

  return (
    <Stack direction="column" spacing={2}>
      <ActionBtnDetailsCard
        titleValueArray={reconstructEntityResponse(props.selectedEntity)}
        actionLabel={"Details anzeigen"}
        actionColor="primary"
        actionCallback={viewDetailsActionCallBack}
      />
    </Stack>
  );
};
