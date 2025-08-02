import React from "react";
import styled, { css } from "styled-components/native";
import {  Pressable } from "react-native";




export type TileContainerProps = {
  type: "normal" | "long" | "wide" | "featured";
};


export const TileContainer = styled(Pressable)<TileContainerProps>`
  
  width: 50%;
  margin: 2px;
  height:200px;
  border-width: 2px;
`;
