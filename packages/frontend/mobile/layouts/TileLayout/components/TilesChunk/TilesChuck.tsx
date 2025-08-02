import React from "react";
import { View } from "react-native";
import { Tile, TileProps } from "@/components/Tile"; // Adjust the import path as necessary
import styled from "styled-components/native";

type ChunkType =
  | "featured"
  | "wide-stacked"
  | "long-side-by-side"
  | "wide-top-plus-2"
  | "wide-bottom-plus-2"
  | "long-right-plus-2"
  | "long-left-plus-2"
  | "four-normal";

type Style = {
  [key: number]: ChunkType[];
};

const STYLES: Style = {
  1: ["featured"],
  2: ["wide-stacked", "long-side-by-side"],
  3: [
    "wide-top-plus-2",
    "wide-bottom-plus-2",
    "long-right-plus-2",
    "long-left-plus-2",
  ],
  4: ["four-normal"],
};

const Row = styled(View)`
  flex-direction: row;
`;

const Col = styled(View)`
  flex-direction: column;
`;

export type TilesChunkProps = {
    data: any[],
};


const getChuckType = (itemsCount: number) => {
  const arr = STYLES[itemsCount];
  return arr[Math.floor(Math.random() * arr.length)];
};

export const TilesChunk = ( { data }:TilesChunkProps) => {
  if (!data || data.length === 0) {
    return <View />;
  }
  const chunkType = getChuckType(data.length);
  

  switch (chunkType) {
    case "long-side-by-side":
      return (
        <Row>
          <Tile type="long" />
          <Tile type="long" />
        </Row>
      );
    case "long-left-plus-2":
      return (
        <Row>
          <Tile type="long" />
          <Col style={{ flex: 1 }}>
            <Tile type="normal" />
            <Tile type="normal" />
          </Col>
        </Row>
      );
    case "long-right-plus-2":
      return (
        <Row>
          <Col style={{ flex: 1 }}>
            <Tile type="normal" />
            <Tile type="normal" />
          </Col>
          <Tile type="long" />
        </Row>
      );
    case "wide-top-plus-2":
      return (
        <Col>
          <Tile type="wide" />
          <Row style={{ flex: 1 }}>
            <Tile type="normal" />
            <Tile type="normal" />
          </Row>
        </Col>
      );
    case "wide-bottom-plus-2":
      return (
        <Col>
          <Row style={{ flex: 1 }}>
            <Tile type="normal" />
            <Tile type="normal" />
          </Row>
          <Tile type="wide" />
        </Col>
      );
    case "wide-stacked":
      return (
        <Col>
          <Tile type="wide" />
          <Tile type="wide" />
        </Col>
      );
    case "four-normal":
      return (
        <Col>
          <Row>
            <Tile type="normal" />
            <Tile type="normal" />
          </Row>
          <Row>
            <Tile type="normal" />
            <Tile type="normal" />
          </Row>
        </Col>
      );
    case "featured":
        return (
            <Row>
            <Tile type="featured" />
            </Row>
        );

    default:
      return <View />;
  }
};
