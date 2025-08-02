import React from "react";
import { View, Text } from "react-native";
import { Tile, TileProps } from "@/components/Tile";
import { TileLayout } from "@/layouts/TileLayout";
import { ListRenderItem } from "react-native";

// Mock data
const mockTiles: TileProps[] = [
  { type: "normal" },
   { type: "normal" },

];

const Discover = () => {
  return (
    <View>
      <TileLayout data={mockTiles} />
    </View>
  );
};

export default Discover;
