import React, { SourceHTMLAttributes, useMemo } from "react";
import { TileContainer, TileContainerProps } from "./components/TileContainer";
import styled from "styled-components/native";
import { Logo, LogoProps } from "@/components/Logo";
import { Text } from "react-native";
import { Chip } from "@/components/Chip";

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
  userSkills?: string[];
  maxSkillsToShow?: number; // New prop with default value
} & TileContainerProps & Pick<LogoProps, "source" | "accessibilityLabel">

const COMPANY_LOGO_SIZE = 60; // Default logo size

const TileDescriptionSection = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const CompanySection = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CompanyName = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #6b7280;
  font-family: system;
`;

const JobInfoSection = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
`;

const JobTitle = styled.Text`
  flex: 1;
  font-weight: 500;
  font-size: 15px;
  color: #374151;
  line-height: 20px;
  text-align: center;
`;

const MetadataText = styled.Text`

  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  
`;

const SkillsSection = styled.View`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 8px;
  padding-horizontal: 8px;
`;

const HeaderContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SkillsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

// Constants
const DEFAULT_MAX_SKILLS_TO_SHOW = 4;

// Helper functions
const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatEmploymentType = (type: string): string =>
  capitalizeFirst(type.replace("_", " "));

const isSkillMatched = (skill: string, userSkills: string[]): boolean =>
  userSkills.some(
    (userSkill) => userSkill.toLowerCase().trim() === skill.toLowerCase().trim()
  );

const buildMetadataString = (
  location?: string,
  jobType?: string,
  employmentType?: string,
  experienceLevel?: string
): string => {
  const metadata: string[] = [];

  if (location) metadata.push(location);
  if (jobType) metadata.push(capitalizeFirst(jobType));
  if (employmentType) metadata.push(formatEmploymentType(employmentType));
  if (experienceLevel) metadata.push(capitalizeFirst(experienceLevel));

  return metadata.join(" | ");
};

export const Tile = ({
  id,
  title,
  location,
  jobType,
  employmentType,
  experienceLevel,
  companyName,
  skills_required,
  userSkills = [],
  source,
  maxSkillsToShow = DEFAULT_MAX_SKILLS_TO_SHOW,

  ...containerProps
}: TileProps) => {
  // Build metadata string
  const metadataString = useMemo(
    () =>
      buildMetadataString(location, jobType, employmentType, experienceLevel),
    [location, jobType, employmentType, experienceLevel]
  );

  // Sort skills to prioritize matched ones first
  const sortedSkills = useMemo(() => {
    if (!skills_required) return [];

    return [...skills_required].sort((a, b) => {
      const aMatched = isSkillMatched(a, userSkills);
      const bMatched = isSkillMatched(b, userSkills);

      // Matched skills come first
      if (aMatched && !bMatched) return -1;
      if (!aMatched && bMatched) return 1;
      return 0;
    });
  }, [skills_required, userSkills]);

  // Calculate the actual number of skills to display
  const skillsToDisplay = Math.min(sortedSkills.length, maxSkillsToShow);
  const remainingSkillsCount = sortedSkills.length - skillsToDisplay;

  return (
    <TileContainer {...containerProps}>
      <HeaderContainer>
        <CompanySection>
          {source && (
            <Logo
              source={source}
              logoSize={COMPANY_LOGO_SIZE}
            />
          )}
          {companyName && (
            <CompanyName numberOfLines={1}>{companyName}</CompanyName>
          )}
        </CompanySection>
        <JobTitle numberOfLines={2}>{title}</JobTitle>
      </HeaderContainer>

      <TileDescriptionSection>

        {/* Job Title and Metadata - Centered Below Company */}
        <JobInfoSection>
          {metadataString && (
            <MetadataText numberOfLines={2}>{metadataString}</MetadataText>
          )}
        </JobInfoSection>

      </TileDescriptionSection>
    </TileContainer>
  );
};
