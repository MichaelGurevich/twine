import React from "react";
import styled, { css } from "styled-components/native";
import { Pressable, Dimensions } from "react-native";
import { Feather } from "phosphor-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const NORMAL_WIDTH = SCREEN_WIDTH / 2;
const NORMAL_HEIGHT = NORMAL_WIDTH;

export type TileContainerProps = {
  type: "normal" | "long" | "wide" | "featured";
};

const TILE_FLEX_CONFIG: Record<
  TileContainerProps["type"],
  {
    flexBasis: string;
    aspectRatio: number;
    minHeight?: number;
    flexGrow?: number;
  }
> = {
  // Takes ~50% of container width, square aspect ratio
  normal: {
    flexBasis: "48%",
    aspectRatio: 1,
    minHeight: 120,
  },
  // Takes ~50% of container width, 2:1 aspect ratio (taller)
  long: {
    flexBasis: "48%",
    aspectRatio: 0.5,
    minHeight: 240,
  },
  // Takes full width, square aspect ratio
  wide: {
    flexBasis: "100%",
    aspectRatio: 3,
    minHeight: 120,
    flexGrow: 1,
  },
  // Takes full width, 2:1 aspect ratio (taller)
  featured: {
    flexBasis: "100%",
    aspectRatio: 1.5,
    minHeight: 200,
    flexGrow: 1,
  },
};

const TILE_CONFIG = {
  normal: {
    height: `${NORMAL_HEIGHT}px`,
    width: `${NORMAL_WIDTH}px`,
  },
  long: {
    height: `${2*NORMAL_HEIGHT}px`,
    width: `${NORMAL_WIDTH}px`,
  },
  wide: {
    height: `${NORMAL_WIDTH}px`,
    width: `${2*NORMAL_HEIGHT}px`,
  },
  featured: {
    height: `${2*NORMAL_HEIGHT}px`,
    width: `${2*NORMAL_WIDTH}px`,
  },
};

export const TileContainer1 = styled(Pressable)<TileContainerProps>`
  ${({ type }) => {
    const config = TILE_FLEX_CONFIG[type];
    return css`
      flex-basis: ${config.flexBasis};
      aspect-ratio: ${config.aspectRatio};
      min-height: ${config.minHeight}px;
      ${config.flexGrow ? `flex-grow: ${config.flexGrow};` : ""}
      flex-shrink: 0;
    `;
  }}
  margin: 4px;
  border-width: 2px;
  overflow: hidden;
`;

export const TileContainer = styled(Pressable)<TileContainerProps>`
  ${({ type }) => {
    const config = TILE_CONFIG[type];
    return css`
      width: ${config.width};
      height: ${config.height};
    `;
  }}
  border-width: 1px;
`;
