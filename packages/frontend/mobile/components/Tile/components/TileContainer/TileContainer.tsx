import React from "react";
import styled, { css } from "styled-components/native";
import { Pressable, Dimensions } from "react-native";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const NORMAL_TILE_WIDTH = SCREEN_WIDTH * 0.5;
export const NORMAL_TILE_HEIGHT = NORMAL_TILE_WIDTH;

export type TileContainerProps = {
  type: "normal";
};

const TILE_CONFIG = {
  normal: {
    height: `${NORMAL_TILE_HEIGHT}px`,
    width: `${NORMAL_TILE_WIDTH}px`,
  },
};


export const TileContainer = styled(Pressable)<TileContainerProps>`
  ${({ type }) => {
    const config = TILE_CONFIG[type];
    return css`
      height: ${config.height};
      width: ${config.width};
    `;
  }}
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  
  /* Android elevation */
  elevation: 3;
  
  /* iOS shadow */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  
  /* Hover/Press effect */
  opacity: 1;
`;