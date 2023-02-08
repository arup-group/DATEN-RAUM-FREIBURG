/**
 * @param {string} label - Label of entity
 * @param {string} value - Value of entity
 */
export interface Entity {
  label: string;
  value: string;
}

/**
 * function to reformat the WFS entity data for visualisation
 *
 * @param {Entity[]} selectedEntity - array of entity objects
 */
export const reconstructEntityResponse = (selectedEntity: Entity[]) => {
  //Capture values for reformatting
  const Kategorie = selectedEntity.find((entity: Entity) =>
    entity.label.includes("Kategorie")
  );
  const Id = selectedEntity.find((entity: Entity) =>
    entity.label.includes("Id")
  );
  const Flaeche = selectedEntity.find((entity: Entity) =>
    entity.label.includes("Flaeche")
  );

  if (Kategorie && Id && Flaeche) {
    //return reformatted, restructred information
    return [
      { label: "Gewähltes Grundstück: ", value: `Parzelle Nr. ${Id.value}` },
      { label: "Typologie: ", value: `${Kategorie.value}` },
      { label: "Grundstücksgröße: ", value: `${Flaeche.value} m²` },
    ];
  } else {
    //if any values not present in WFS response, return original data
    return selectedEntity;
  }
};
