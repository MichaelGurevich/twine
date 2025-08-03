import React from "react";
import { TileContainer, TileContainerProps } from "./components/TileContainer";

export type TileProps = {
  id:string;
  image?: string;
  alt?: string;
  title: string;
  description?: string;
} & TileContainerProps;

export const Tile = ({ type }: TileProps) => {
  return <TileContainer type={type} />;
};
