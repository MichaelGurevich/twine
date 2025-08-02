import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Tile, TileProps } from "@/components/Tile";

export type TileLayoutProps = {
  data: TileProps[];
  onEndReached?: () => void;
  renderItem?: ListRenderItem<TileProps>;
};

export const TileLayout = ({
  data,
  onEndReached,
  renderItem = ({ item }) => <Tile {...item} />,
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
