import React, { useState, useEffect, useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Tile, TileProps } from "@/components/Tile";
import { NORMAL_TILE_HEIGHT } from "@/components/Tile/components/TileContainer";

// API endpoint placeholder - replace with actual endpoint
const DEFAULT_ENDPOINT = "SOMETHINGS"; // TODO: Replace with actual API endpoint

// Threshold for triggering pagination when user scrolls near bottom
// 0.1 means trigger when user is 10% away from the bottom
const ON_END_REACHED_THRESHOLD = 0.1;
const NUM_COLUMNS = 2;
export const GAP = 4; // Gap between tiles, if needed

// Type definition for pagination data returned by API
type ResponsePagesData = {
  page: number; // Current page number
  total_pages: number; // Total number of pages available
};

export const TileLayout = () => {
  // State to store the array of tile data
  const [tilesData, setTilesData] = useState<TileProps[]>([]);

  // Loading state to prevent multiple simultaneous API calls
  const [isLoading, setIsLoading] = useState(false);

  // State to track current page and total pages for pagination
  const [pagesData, setPagesData] = useState<ResponsePagesData>({
    page: 0,
    total_pages: 0,
  });

  /**
   * Fetches tile data from the API
   * @param api_endpoint - The API endpoint URL to fetch from
   */
  const fetchTilesData = async (api_endpoint: string) => {
    // Prevent multiple simultaneous API calls
    if (isLoading) return;

    // Set loading state to true
    setIsLoading(true);

    try {
      // Make API request
      const response = await fetch(api_endpoint);

      // Check if HTTP request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Update pagination information from API response
      setPagesData({ page: data.page, total_pages: data.total_pages });

      // TODO: Add validation for API response structure (data.jobs, data.page, data.total_pages)
      // Update tiles data
      setTilesData((prevTilesData) => {
        // For initial load (page 1), replace existing data
        // For subsequent pages, append new data to existing data
        if (data.page === 1) {
          return data.jobs || []; // Replace with new data, fallback to empty array
        }
        return [...prevTilesData, ...(data.jobs || [])];
      });
    } catch (error) {
      console.error("Error fetching tiles data:", error);
      // TODO: Consider adding user-facing error handling here (toast, error state, retry button)
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads the next page of data when user reaches end of list
   * Called by FlatList's onEndReached prop
   */
  const loadNextPage = () => {
    // Calculate next page number
    const nextPage = pagesData.page + 1;

    // Don't fetch if we've reached the last page or if already loading
    if (nextPage > pagesData.total_pages || isLoading) return;

    // Fetch next page with page parameter
    fetchTilesData(`${DEFAULT_ENDPOINT}?page=${nextPage}`);
  };

  // Effect hook to fetch initial data when component mounts
  useEffect(() => {
    // Explicitly start with page 1 for initial load
    fetchTilesData(`${DEFAULT_ENDPOINT}?page=1`);
  }, []); // Empty dependency array means this runs once on mount

  // TODO: Consider adding pull-to-refresh functionality
  // TODO: Add loading state for initial load vs pagination loading

  const renderItem = useCallback(
    ({ item }: { item: TileProps }) => <Tile {...item} />,
    []
  );

 const keyExtractor = useCallback(
  (item: TileProps, index: number) =>
    item.id?.toString() || index.toString(),
  []
);

  return (
    <FlatList
      data={tilesData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadNextPage}
      onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
      // TODO: Consider adding empty state, error state, or "no more data" indicator
      ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={{gap: GAP}} // gap between lines
      columnWrapperStyle={{gap: GAP}} // gap between columns
      getItemLayout={(data, index) => ({
        length: NORMAL_TILE_HEIGHT,
        offset: NORMAL_TILE_HEIGHT * index,
        index,
      })}
    />
  );
};
