import React from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const GAP_SIZE = 8 // Gap between tiles

// Base tile width is exactly 50% of screen width minus gap padding
const BASE_TILE_WIDTH = (SCREEN_WIDTH - (GAP_SIZE * 3)) / 2 // Account for outer padding and middle gap
// Using a 3:2 aspect ratio for visually pleasing rectangular tiles
const BASE_TILE_HEIGHT = BASE_TILE_WIDTH * (4/3)

type TileSize = 'regular' | 'long' | 'featured'

export type TileProps = {
  size: TileSize
  //children: ReactNode
}

const getDimensions = (size: TileSize) => {
  switch (size) {
    case 'regular':
      return { width: BASE_TILE_WIDTH, height: BASE_TILE_HEIGHT }
    case 'long':
      return { width: BASE_TILE_WIDTH, height: BASE_TILE_HEIGHT * 2 }
    case 'featured':
      return { width: BASE_TILE_WIDTH * 2, height: BASE_TILE_HEIGHT }
  }
}

export const TileContainer = styled.View<{ size: TileSize }>`
  width: ${props => getDimensions(props.size).width}px;
  height: ${props => getDimensions(props.size).height}px;
  border: 1px solid black;
  border-radius: 8px;
  overflow: hidden;
  margin-left: ${GAP_SIZE}px;
  margin-right: ${GAP_SIZE}px;
  margin-bottom: ${GAP_SIZE}px;
  background-color: #ffffff;
`;

