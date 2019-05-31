import React from "react";
import { FontAwesome, MaterialIcons, Ionicons } from "react-web-vector-icons";
import { Icon } from "antd";
import iconPaths from "../fonts/selection.json";
import Color from "../Color";

const getPath = iconName => {
  const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);

  if (icon) {
    return icon.icon.paths.join(" ");
  } else {
    return "";
  }
};

/* 
  props.type = custom (optional)
  props.name
  props.size
  props.color
  props.style
*/
const CustomIcon = props => {
  switch (props.type) {
    case "font-awesome":
      return <FontAwesome {...props} />;
    case "material":
      return <MaterialIcons {...props} />;
    case "antd":
      return <ANTDIcon {...props} />;
    case "custom":
      return <CustomFontIcon {...props} />;
    default:
      return <Ionicons {...props} />;
  }
};

const ANTDIcon = props => (
  <Icon
    {...props}
    type={props.name}
    style={{
      fontSize: props.size ? props.size : 12,
      color: props.color ? props.color : Color.dustyGrey
    }}
  />
);

const CustomFontIcon = props => (
  <svg
    width={props.size !== undefined ? props.size : 20}
    height={props.size !== undefined ? props.size : 20}
    fill={props.color !== undefined ? props.color : Color.nobel}
    viewBox="0 0 1024 1024"
    style={{ ...props.style }}
  >
    <path d={getPath(props.name)} />
  </svg>
);

export default CustomIcon;
