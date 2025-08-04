import React from "react";
import { TileContainer, TileContainerProps } from "./components/TileContainer";
import styled from "styled-components/native";
import { Logo, LogoProps } from "@/components/Logo";
import { Text } from "react-native";

export type TileProps = {
  id: string;
  title: string;
  location?: string;
  jobType?: "remote" | "onsite" | "hybrid";
  employmentType?:
    | "full_time"
    | "part_time"
    | "contract"
    | "internship"
    | "temporary";
  experienceLevel?: "entry" | "junior" | "mid" | "senior" | "lead" | "director";
  companyName?: string;
  skills_required?: string[];
} & TileContainerProps &
  LogoProps;

const TileDescriptionSection = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const JobTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

const MetadataText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #666;
  line-height: 16px;
`;

export const Tile = ({
  id,
  title,
  location,
  jobType,
  employmentType,
  experienceLevel,
  companyName,
  skills_required,
  source,
  logoSize = 70,
  //alt,
  ...containerProps
}: TileProps) => {
  // Build metadata array with only existing values
  const metadata: string[] = [];

  if (companyName) metadata.push(companyName);
  if (location) metadata.push(location);
  if (jobType)
    metadata.push(jobType.charAt(0).toUpperCase() + jobType.slice(1));
  if (employmentType) metadata.push(employmentType.replace("_", " "));
  if (experienceLevel)
    metadata.push(
      experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)
    );

  // Join metadata with " | " separator
  const metadataString = metadata.join(" | ");

  return (
    <TileContainer {...containerProps}>
      <TileDescriptionSection>
        {/* Logo */}
        {source && (
          <Logo
            source={source}
            logoSize={logoSize}
            //alt={alt || `${companyName || title} logo`}
          />
        )}

        {/* Job Title (Bold) */}
        <JobTitle numberOfLines={2}>{title}</JobTitle>

        {/* Metadata (Not Bold, separated by |) */}
        {metadataString && (
          <MetadataText numberOfLines={3}>{metadataString}</MetadataText>
        )}
      </TileDescriptionSection>
    </TileContainer>
  );
};
