import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Tile, TileProps } from "@/components/Tile";
import { TilesChunk, TilesChunkProps } from "./components/TilesChunk";

export type TileLayoutProps = {
  data: TilesChunkProps[];
  onEndReached?: () => void;
  renderItem?: ListRenderItem<TilesChunkProps>;
};

export const TileLayout = ({
  data,
  onEndReached,
  renderItem = ({ item }) => <TilesChunk {...item} />,
}: TileLayoutProps) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      numColumns={1}
      onEndReached={onEndReached}
    />
  );
};
