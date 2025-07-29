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

export const TileContainer = styled(Pressable)<TileContainerProps>`
  ${({ type }) => {
    let tileWidth = NORMAL_TILE_WIDTH;
    let tileHeight = NORMAL_TILE_HEIGHT;

    switch (type) {
      case "long":
        tileHeight = NORMAL_TILE_HEIGHT * 2; // 2 × 1
        break;

      case "wide":
        tileWidth = SCREEN_WIDTH - 2; // any custom width
        break;

      case "featured":
        tileWidth = SCREEN_WIDTH - 2;
        tileHeight = NORMAL_TILE_HEIGHT * 2

      // 'normal' falls through with defaults
    }

    return css`
      width: ${tileWidth}px;
      height: ${tileHeight}px;
    `;
  }}

  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  border-width: 2px;
  overflow: hidden;
`;
