//Convert time displayed as float (eg 9.3 for 09:30) into ms to be displayed as a unified javascript date
export function convertToMs(timefloat) {
  // Get the minutes portion
  let remainder = timefloat % 1;

  // Convert into ms
  let minutes = remainder * 100 * 60 * 1000;

  // Get the number of hours and convert to ms, corrected by one hour as date takes UTC time and local time is given in CET +1
  let hours = (timefloat - 1 - remainder) * 60 * 60 * 1000;

  return minutes + hours;
}

var lineStyle = {
  opacity: 0.85,
};

// Sets the color for INRIX segments and Telraam segments
export function setTrafficStyle(feature) {
  let response = {};
  if (feature.properties.uptime_telraam != 0) {
    response = { weight: 10 };
    //For Telraam segments
    switch (feature.properties.congestion_level_car_telraam) {
      case "very congested":
        return Object.assign(response, { color: "#7d0901", ...lineStyle });
      case "very congestion":
        return Object.assign(response, { color: "#7d0901", ...lineStyle });
      case "congested":
        return Object.assign(response, { color: "#D21404", ...lineStyle });
      case "slightly congested":
        return Object.assign(response, { color: "#FF6D0A", ...lineStyle });
      case "no congestion":
        return Object.assign(response, { color: "#03AC13", ...lineStyle });
      case "no data":
        return Object.assign(response, { color: "#192ecf", ...lineStyle });
    }
  }
  //For INRIX segments
  switch (feature.properties.congestion_level_speed_inrix) {
    case "very congested":
      return Object.assign(response, { color: "#7d0901", ...lineStyle });
    case "very congestion":
      return Object.assign(response, { color: "#7d0901", ...lineStyle });
    case "congested":
      return Object.assign(response, { color: "#D21404", ...lineStyle });
    case "slightly congested":
      return Object.assign(response, { color: "#FF6D0A", ...lineStyle });
    case "no congestion":
      return Object.assign(response, { color: "#03AC13", ...lineStyle });
    case "no data":
      return Object.assign(response, { color: "#192ecf", ...lineStyle });
  }
}

//Sets the color for the dashboard elements according to traffic status
export function getCongestionBackgroundColor(props, congestion_parameter) {
  if (props.dataset["properties"][congestion_parameter] === "very congested") {
    return "#7d0901";
  } else if (props.dataset["properties"][congestion_parameter] === "very congestion") {
    return "#7d0901";
  } else if (props.dataset["properties"][congestion_parameter] === "congested") {
    return "error.main";
  } else if (props.dataset["properties"][congestion_parameter] === "slightly congested") {
    return "warning.main";
  } else if (props.dataset["properties"][congestion_parameter] === "no congestion") {
    return "success.main";
  } else {
    return "info.main";
  }
}
