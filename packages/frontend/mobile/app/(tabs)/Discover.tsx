import React from "react";
import { View, Text } from "react-native";
import { Tile, TileProps } from "@/components/Tile";
import {
  TilesChunk,
  TilesChunkProps,
} from "@/layouts/TileLayout/components/TilesChunk";
import { TileLayout } from "@/layouts/TileLayout";

// Mock data

const mockTiles = [
  { data: [1, 2, 3, 4] },
  { data: [1, 2, 3] },
  { data: [1, 2] },
  { data: [1] },
  { data: [1, 2, 3] },
  { data: [1, 2] },
  { data: [1, 2, 3, 4] },
  { data: [1] },
   { data: [1, 2, 3, 4] },
  { data: [1, 2, 3] },
  { data: [1, 2] },
  { data: [1] },
];

const Discover = () => {
  return (
    <View>
      <TileLayout data={mockTiles} />
    </View>
  );
};

export default Discover;
