import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
  const getColor = (d) => {
    return d === "Sehr Langsamer Verkehr"
      ? "#7d0901"
      : d === "Langsamer Verkehr"
      ? "#D21404"
      : d === "Mittlerer Verkehr"
      ? "#FF6D0A"
      : d === "Fließender Verkehr"
      ? "#03AC13"
      : d === "Keine Daten"
      ? "#192ecf"
      : "#FFEDA0";
  };

  //Display a color legend for the map
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const grades = [
          "Keine Daten",
          "Fließender Verkehr",
          "Mittlerer Verkehr",
          "Langsamer Verkehr",
          "Sehr Langsamer Verkehr",
        ];
        let labels = [];

        const div = L.DomUtil.create("div", "info legend");
        for (let i = 0; i < grades.length; i++) {
          labels.push('<i style="background:' + getColor(grades[i]) + '"></i> ' + grades[i]);
        }
        div.innerHTML = labels.join("<br>");
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
