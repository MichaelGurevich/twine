import React from "react";
import { View, Text } from "react-native";
import { Tile } from "@/components/Tile";

const Discover = () => {
  return (
    <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
      <Tile
        id={"1"}
        source={{uri:"https://static.dezeen.com/uploads/2021/11/meta-facebook-rebranding-name-news_dezeen_2364_col_sq.jpg"}}
        title={"Software engineer"}
        type={"normal"}
        experienceLevel={"entry"}
        employmentType={"full_time"}
        location={"Tel-Aviv"}
      />
    </View>
  );
};

export default Discover;
