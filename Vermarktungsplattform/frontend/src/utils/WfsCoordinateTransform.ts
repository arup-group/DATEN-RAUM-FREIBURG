import proj4 from "proj4";

//Helper function to translate EPSG 25832 GeoJSON coordinate data to EPSG:4326
//This function is needed to ingest data from the cities WFS stream into a 3D instance of Cesium
export const translateWFSCoordinateStream = (data: any) => {
  //initial centreCoord state
  let centreCoord = [0, 0, 0];
  //update the ingested data GeoJSON CRS type to EPSG:4326
  data.crs.properties.name = "EPSG:4326";

  //To translate the coordinate data, we use a geo-related package called proj4
  //It's required to specify each coordinate system definition using EPSG standards
  //The first input is the output coordinate type, the second is the input coordinate type to be converted
  proj4.defs([
    [
      "EPSG:4326",
      "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
    ],
    [
      "EPSG:25832",
      "+title=25832 +proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    ],
  ]);

  //each coordinate in the GeoJSON feature set needs converting
  data.features.forEach((feature: any) => {
    if (feature.geometry) {
      const coordinates = feature.geometry.coordinates;

      if (coordinates && coordinates.length > 0)
        coordinates.forEach((coord: any, coordIndex: number) => {
          if (coord.length > 0) {
            coord.forEach((pair: any, pairIndex: number) => {
              const source = proj4.Proj("EPSG:25832");
              const dest = proj4.Proj("EPSG:4326");
              const convertedCoords = proj4.toPoint(pair);
              const transformedPoint = proj4.transform(
                source,
                dest,
                convertedCoords
              );

              //rewrite coordinate of feature geometry
              coordinates[coordIndex][pairIndex] =
                Object.values(transformedPoint);

              //set the centre coordinate of the GeoJSON data for the Cesium camera to pinpoint
              //If time, improve this feature to find the centre of the features bounding box
              if (coordIndex === 0)
                centreCoord = Object.values(transformedPoint);
            });
          }
        });
    }
  });

  return { translatedData: data, centreCoord: centreCoord };
};
