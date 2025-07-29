import React from "react";
import { TileContainer, TileContainerProps } from "./components/TileContainer";

export type TileProps = {} & TileContainerProps;

export const Tile = ({ type }: TileContainerProps) => {
  return <TileContainer type={type} />;
};
