import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Tile, TileProps } from "@/components/Tile";

export function createMockTiles(): number[] {
  const batchSize = 20;
  const startId = Math.floor(Math.random() * 1000);
  return Array.from({ length: batchSize }, (_, i) => startId + i);
}

export type TileLayoutProps = {
  data?: number[];
  onEndReached?: () => void;
  renderItem?: ListRenderItem<number>;
};

export const TileLayout = ({
  data,
  renderItem = ({ item }) => <Tile type="normal" />,
}: TileLayoutProps) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(() => {
    if (loading) return;
    setLoading(true);

    const newTiles = createMockTiles();
    setTiles(prev => [...prev, ...newTiles]);

    setLoading(false);
  }, [loading]);

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <FlatList
      data={tiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      numColumns={2}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.9}
    />
  );
};
