import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRef, useState } from "react";
import {
  Viewer as CesiumViewer,
  Cartesian3,
  WebMapServiceImageryProvider,
  Matrix4,
  Cesium3DTileStyle,
} from "cesium";

import {
  Viewer,
  GeoJsonDataSource,
  CameraFlyTo,
  CesiumComponentRef,
  ImageryLayer,
  Cesium3DTileset,
} from "resium";

import {
  entPolyBackground,
  entPolyBorder,
  randomRGBA,
} from "../../utils/EntityColors";
import { Section } from "../Section";
import { MapKeyCard } from "../cards/MapKeyCard";

/**
 * @param {(params: any) => any;} onSelectedEntityChange - onSelectedEntityChange callback
 * @param {any} wfsData - WFS GeoJSON data
 * @param { number[]} focusCoordinate - GeoJSON coordinate in degrees
 * @param {number} zoomOutFactor - Custom z-value zoom factor for Cesium Camera
 * @param { (params: any) => void} onLoadCallback - GeoJSON Resium on load call back
 * @param { randomColor} randomColor - Determines if polyline geometry background displays with multiple colors
 */
export interface MapInstanceProps {
  onSelectedEntityChange?: (params: any) => void;
  wfsData: any;
  focusCoordinate: number[];
  zoomOutFactor?: number;
  onLoadCallback?: (params: any) => void;
  randomColor?: boolean;
}

/**
 * @param {any} cat - WFS category
 * @param {any} value - WFS category value
 */
export interface ColorCatCombi {
  cat: any;
  value: any;
}

//base URL for city WMS services
const baseURL =
  "https://geoportal.freiburg.de/wms/verma_dietenbach/verma_dietenbach?";

//Custom Web Map imagery provider sourced from cities WMS service (placed outside of component to prevent re-render)
const provider = new WebMapServiceImageryProvider({
  url: baseURL,
  layers: "rahmenplan",
});

//Dummy container to remove Cesium ION logo banner (we don't use ION products, so we can remove logo under free use license)
const dummyContainer = document.createElement("div");

//Resium map instance component to display GeoJSON on a Resium wrapped Cesiumn instance
const MapInstance = (props: MapInstanceProps) => {
  //binding reference for cesium component
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  //category state
  let [allCatColors, setAllCatColors] = useState<ColorCatCombi[] | []>([]);
  const [modelViewChecked, setModelViewChecked] = useState(false);

  const {
    onSelectedEntityChange,
    wfsData,
    focusCoordinate,
    zoomOutFactor,
    onLoadCallback,
    randomColor,
  } = props;

  //handler to display 3D model
  const handleModelViewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelViewChecked(event.target.checked);
  };

  //Adjust a tileset's height from the globe's surface.
  const heightOffset = -238;

  //map surface coordinates
  const surface = Cartesian3.fromRadians(
    0.13599970306065431,
    0.8379091755288712,
    0.0
  );

  //map surface hard offset
  const offset = Cartesian3.fromRadians(
    0.13599970306065431,
    0.8379091755288712,
    heightOffset
  );

  //calculate translation matrix
  const translation = Cartesian3.subtract(offset, surface, new Cartesian3());
  let modelMatrix = Matrix4.fromTranslation(translation);

  //load event handler for cesium map instance
  const handleLoadEvent = (loadData: any) => {
    if (loadData && loadData.entities) {
      //extract categories from loadData entities
      const categories = Array.from(
        new Set(
          loadData.entities._entities._array.map(
            (entity: any) => entity.properties.kategorie._value
          )
        )
      );

      //map categories to random RGBA value
      const catColors = categories.map((category) => {
        return { cat: category, value: randomRGBA() };
      });

      // makes a CSS colour out of colour obj
      let catCSSColors = categories.map((category) => {
        return { cat: category, value: randomRGBA().toCssColorString() };
      });

      //update colour state
      setAllCatColors(catCSSColors);

      //set new category colours to the map entity instances
      loadData.entities._entities._array.forEach((entity: any) => {
        const colorPair = catColors.find(
          (catColor) => catColor.cat === entity.properties.kategorie._value
        );
        entity.polygon.material = randomColor
          ? colorPair?.value
          : entPolyBackground;
        entity.polygon._outlineColor._value = entPolyBorder;
      });
    }
    if (onLoadCallback) onLoadCallback(loadData);
  };

  return (
    <Box
      sx={{
        background: "white",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={modelViewChecked}
            onChange={handleModelViewChange}
            name="modelview"
          />
        }
        label="3D Modell Anzeigen"
      />

      <Viewer
        geocoder={false}
        animation={false}
        homeButton={false}
        timeline={false}
        ref={ref}
        baseLayerPicker={false}
        onSelectedEntityChange={() => {
          if (onSelectedEntityChange) onSelectedEntityChange(ref);
        }}
        creditContainer={dummyContainer}
        infoBox={false}
        selectionIndicator={false}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <ImageryLayer imageryProvider={provider} />
        <GeoJsonDataSource data={wfsData} onLoading={handleLoadEvent} />
        {modelViewChecked && (
          <Cesium3DTileset
            style={
              new Cesium3DTileStyle({
                color: "color('#FFFFFF', 0.7)", //white, alpha = 0.7
                show: true,
              })
            }
            url={"/models/default_tiles/tileset.json"}
            modelMatrix={modelMatrix}
          />
        )}
        <CameraFlyTo
          destination={Cartesian3.fromDegrees(
            focusCoordinate[0],
            focusCoordinate[1],
            focusCoordinate[2] + (zoomOutFactor ?? 1500) //zoom out on the z axis to capture the whole site plan
          )}
          once={true}
          duration={0}
        />
      </Viewer>
      {randomColor && (
        <Box sx={{ marginBottom: "25px", marginTop: "25px" }}>
          <Section title="Legende: Farbcodes der Grundstücke" />
          <MapKeyCard keyData={allCatColors} />
        </Box>
      )}
    </Box>
  );
};

export default MapInstance;
