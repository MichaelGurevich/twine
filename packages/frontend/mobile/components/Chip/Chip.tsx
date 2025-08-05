import React from "react";
import styled from "styled-components/native";

export type ChipVariant = 'default' | 'matched' | 'skill' | 'active';
export type ChipSize = 'small' | 'medium' | 'large';

export type ChipProps = {
  name: string;
  isActive?: boolean;
  variant?: ChipVariant;
  size?: ChipSize;
  onPress?: () => void;
};

const getChipStyles = (variant: ChipVariant, isActive: boolean, theme: any) => {
  switch (variant) {
    case 'matched':
      return {
        backgroundColor: '#f8f9fa',
        borderColor: '#40e0d0',
        borderWidth: 1,
        textColor: '#1a1a1a'
      };
    case 'skill':
      return {
        backgroundColor: '#f8f9fa',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textColor: '#9ca3af'
      };
    case 'active':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary[600],
        borderWidth: 2,
        textColor: theme.palette.neutral[900]
      };
    default:
      return {
        backgroundColor: 'transparent',
        borderColor: isActive ? theme.palette.primary[600] : theme.palette.neutral[300],
        borderWidth: 2,
        textColor: isActive ? theme.palette.neutral[900] : theme.palette.neutral[700]
      };
  }
};

const getSizeStyles = (size: ChipSize) => {
  switch (size) {
    case 'small':
      return {
        padding: '2px 6px',
        height: 24,
        fontSize: 11,
        borderRadius: 12
      };
    case 'large':
      return {
        padding: '6px 12px',
        height: 36,
        fontSize: 16,
        borderRadius: 18
      };
    default: // medium
      return {
        padding: '4px 8px',
        height: 30,
        fontSize: 14,
        borderRadius: 15
      };
  }
};

const TagContainer = styled.Pressable<{ 
  variant: ChipVariant; 
  isActive: boolean; 
  size: ChipSize;
  onPress?: () => void;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px;
  ${({ variant, isActive, size, theme }) => {
    const chipStyles = getChipStyles(variant, isActive, theme);
    const sizeStyles = getSizeStyles(size);
    return `
      background-color: ${chipStyles.backgroundColor};
      border-color: ${chipStyles.borderColor};
      border-width: ${chipStyles.borderWidth}px;
      padding: ${sizeStyles.padding};
      height: ${sizeStyles.height}px;
      border-radius: ${sizeStyles.borderRadius}px;
    `;
  }}
`;

const TagText = styled.Text<{ 
  variant: ChipVariant; 
  isActive: boolean; 
  size: ChipSize;
}>`
  ${({ variant, isActive, size, theme }) => {
    const chipStyles = getChipStyles(variant, isActive, theme);
    const sizeStyles = getSizeStyles(size);
    return `
      color: ${chipStyles.textColor};
      font-size: ${sizeStyles.fontSize}px;
      font-weight: ${isActive || variant === 'matched' ? 500 : 400};
    `;
  }}
`;

export const Chip = ({ 
  isActive = false, 
  name, 
  variant = 'default', 
  size = 'medium',
  onPress 
}: ChipProps) => (
  <TagContainer 
    isActive={isActive} 
    variant={variant} 
    size={size}
    onPress={onPress}
    disabled={!onPress}
  >
    <TagText isActive={isActive} variant={variant} size={size}>
      {name}
    </TagText>
  </TagContainer>
);
