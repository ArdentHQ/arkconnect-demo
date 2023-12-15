import React from "react";

export interface InputIconProperties extends React.HTMLProps<HTMLDivElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  position?: "left" | "right";
}

export interface InputIconContextType {
  iconPosition?: "left" | "right";
}
