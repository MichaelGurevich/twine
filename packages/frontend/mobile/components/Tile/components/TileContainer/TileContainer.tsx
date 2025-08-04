import React from "react";
import styled, { css } from "styled-components/native";
import { Pressable, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const NORMAL_WIDTH = SCREEN_WIDTH / 2;
export const NORMAL_TILE_HEIGHT = NORMAL_WIDTH;

export type TileContainerProps = {
  type: "normal";
};

const TILE_CONFIG = {
  normal: {
    height: `${NORMAL_TILE_HEIGHT}px`,
    width: `${NORMAL_WIDTH}px`,
  },
};


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
