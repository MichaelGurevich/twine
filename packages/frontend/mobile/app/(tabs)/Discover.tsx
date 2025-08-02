import React from "react";
import { View } from "react-native";
import { TileLayout } from "@/layouts/TileLayout";

// Mock data

const mockTiles = [
  { data: [1, 2, 3, 4] },
  { data: [1, 2, 3] },
  { data: [1, 2, 3] },
];

const Discover = () => {
  return (
    <View>
      <TileLayout data={mockTiles} />
    </View>
  );
};

export default Discover;
