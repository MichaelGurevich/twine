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
  background-color: #f8f9fa;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #e9ecef;

  /* Android elevation */
  elevation: 1;

  /* iOS shadow */
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 3px;
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
