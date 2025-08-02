import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Tile, TileProps } from "@/components/Tile";
import { TilesChunk, TilesChunkProps } from "./components/TilesChunk";



export function createMockTiles(): { data: number[] }[] {
  const makeRandomLengthArray = (chunkIndex: number) => {
    const len = Math.floor(Math.random() * 4) + 1;   // 1 – 4
    // Use the chunkIndex to keep the numbers easy to trace in logs:
    return Array.from({ length: len }, (_, i) => i + 1 + chunkIndex * 100);
  };

  return [0, 1, 2].map(chunkIdx => ({ data: makeRandomLengthArray(chunkIdx) }));
}


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


const [chunks, setChunks] = useState<TilesChunkProps[]>([]);
  const [loading, setLoading] = useState(false);

  /* fetch 3 chunks, append to state */
  const fetchMore = useCallback(() => {
    if (loading) return;                    // debounce
    setLoading(true);

    //  synchronous mock; replace with await api.fetch() for real calls
    const newChunks = createMockTiles();
    setChunks(prev => [...prev, ...newChunks]);

    setLoading(false);
  }, [loading]);

  /* initial load */
  useEffect(() => {
    fetchMore();
  }, [fetchMore]);


  return (
    <FlatList
      data={chunks}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      numColumns={1}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.9}
    />
  );
};
