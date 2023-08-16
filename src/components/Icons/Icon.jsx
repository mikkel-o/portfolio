import React from "react";
import { ReactComponent as LayoutFullSolid } from './layout-full-solid.svg';
import { ReactComponent as LayoutOneSolid } from './layout-one-solid.svg';
import { ReactComponent as LayoutTwoSolid } from './layout-two-solid.svg';
import { ReactComponent as LayoutThreeSolid } from './layout-three-solid.svg';


const Icon = ({ name, color, size }) => (
  name === "layout-full-solid" ? 
    <LayoutFullSolid stroke={color} fill={"transparent"} width={size} height={size}/> 
  : 
    name === "layout-one-solid" ? 
      <LayoutOneSolid fill={color} width={size} height={size}/> 
    : 
      name === "layout-two-solid" ? 
        <LayoutTwoSolid fill={color} width={size} height={size}/> 
      : name === "layout-three-solid" ? 
          <LayoutThreeSolid fill={color} width={size} height={size}/> 
        : 
          null
    
);



export default Icon;
