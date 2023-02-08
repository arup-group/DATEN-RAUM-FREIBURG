/**
 * @param {string} label - Label for GEOJSON selected entity property key
 * @param {string} value - Value for GEOJSON selected entity property value
 */
export interface SelectedEntityCallBackProps {
  label: string;
  value: string;
}

/**
 * @param {any} polygon - GEOJSON Entity Polygon
 */
export interface EntityProps {
  polygon: any;
}
