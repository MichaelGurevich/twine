import React from "react";
import { ImageProps } from "react-native";
import styled from "styled-components/native";

export const DEFAULT_LOGO_SIZE = 80;

export type LogoProps = {
  logoSize?: number;
} & Pick<ImageProps, "source" | "accessibilityLabel">;

const LogoWrapper = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: white;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 10px;

  /* Android elevation */
  elevation: 2;

  /* iOS shadow */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

const LogoImage = styled.Image.attrs({
  resizeMode: "cover",
})`
  width: 100%;
  height: 100%;
`;

export const Logo = ({ logoSize = DEFAULT_LOGO_SIZE, ...rest }: LogoProps) => (
  <LogoWrapper size={logoSize}>
    <LogoImage {...rest} />
  </LogoWrapper>
);
