import React from "react";
import styled, { css } from "styled-components/native";
import { Dimensions, Pressable } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GAP_SIZE = 8;

const NORMAL_TILE_WIDTH = (SCREEN_WIDTH - GAP_SIZE * 3) / 2;
const NORMAL_TILE_HEIGHT = NORMAL_TILE_WIDTH;

export type TileContainerProps = {
  type: "normal" | "long" | "wide" | "featured";
};

const TILE_DIMENSIONS: Record<
  TileContainerProps["type"],
  { width: number; height: number }
> = {
  normal: { width: NORMAL_TILE_WIDTH, height: NORMAL_TILE_HEIGHT },
  long: { width: NORMAL_TILE_WIDTH, height: NORMAL_TILE_HEIGHT * 2 },
  wide: { width: SCREEN_WIDTH - 2, height: NORMAL_TILE_HEIGHT },
  featured: { width: SCREEN_WIDTH - 2, height: NORMAL_TILE_HEIGHT * 2 },
};

// export const TileContainer = styled(Pressable)<TileContainerProps>`
//   ${({ type }) => {
//     const { width, height } = TILE_DIMENSIONS[type];
//     return css`
//       width: ${width}px;
//       height: ${height}px;
//     `;
//   }}

//   margin: 2px;
//   border-width: 2px;
//   overflow: hidden;
// `;

export const TileContainer = styled(Pressable)<TileContainerProps>`
  
  width: 50%;
  margin: 2px;
  height:200px;
  border-width: 2px;
`;
