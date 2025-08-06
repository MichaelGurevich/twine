import React from "react";
import { View } from "react-native";
import {Text} from "react-native";
import {Tile, TileProps} from "@/components/Tile";
import {mockJobsResponse} from "@/mocks/jobs";

const mockJob: TileProps = mockJobsResponse.data.jobs[0];

export default function HomeScreen() {
  return (
    
      <View>
          <Tile
          {...mockJob}/>
      </View>
    
  );
}
