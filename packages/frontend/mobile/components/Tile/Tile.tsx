import React, { useMemo } from "react";
import { TileContainer, TileContainerProps } from "./components/TileContainer";
import styled from "styled-components/native";
import { Logo, LogoProps } from "@/components/Logo";
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
} & TileContainerProps &
  LogoProps;

const TileDescriptionSection = styled.View`
  flex: 1;
  width: 100%;
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const LogoSection = styled.View`
  align-items: center;
  margin-left: 12px;
`;

const JobInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

const CompanyName = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 8px;
  font-family: system;
`;

const JobTitle = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: #374151;
  line-height: 20px;
  margin-bottom: 4px;
`;

const MetadataText = styled.Text`
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  line-height: 16px;
`;

const SkillsSection = styled.View`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const SkillsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

// Constants
const DEFAULT_MAX_SKILLS_TO_SHOW = 4;

// Helper functions
const capitalizeFirst = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

const formatEmploymentType = (type: string): string => 
  capitalizeFirst(type.replace("_", " "));

const isSkillMatched = (skill: string, userSkills: string[]): boolean =>
  userSkills.some(userSkill => 
    userSkill.toLowerCase().trim() === skill.toLowerCase().trim()
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

  id:string;
  image?: string;
  alt?: string;
  title: string;
  description?: string;
} & TileContainerProps;

export const Tile = ({ type }: TileProps) => {
  return <TileContainer type={type} />;

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
  logoSize = 50,
  maxSkillsToShow = DEFAULT_MAX_SKILLS_TO_SHOW,
  //alt,
  ...containerProps
}: TileProps) => {
  // Build metadata string
  const metadataString = useMemo(
    () => buildMetadataString(location, jobType, employmentType, experienceLevel),
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
      <TileDescriptionSection>
        <>
          {/* Header with Job Info and Logo */}
          <HeaderSection>
            <JobInfo>
              <JobTitle numberOfLines={2}>{title}</JobTitle>
              {/* Metadata Text right under job title */}
              {metadataString && (
                <MetadataText numberOfLines={2}>{metadataString}</MetadataText>
              )}
            </JobInfo>
            <LogoSection>
              {source && (
                <Logo
                  source={source}
                  logoSize={logoSize}
                  //alt={alt || `${companyName || title} logo`}
                />
              )}
              {companyName && (
                <CompanyName numberOfLines={1}>{companyName}</CompanyName>
              )}
            </LogoSection>
          </HeaderSection>

          {/* Skills Section */}
          {sortedSkills.length > 0 && (
            <SkillsSection>
              <SkillsContainer>
                {sortedSkills.slice(0, skillsToDisplay).map((skill, index) => {
                  const isMatched = isSkillMatched(skill, userSkills);
                  return (
                    <Chip 
                      key={`${id}-skill-${index}`} 
                      name={skill}
                      variant={isMatched ? 'matched' : 'skill'}
                      size="small"
                    />
                  );
                })}
                {remainingSkillsCount > 0 && (
                  <Chip 
                    name={`+${remainingSkillsCount}`}
                    variant="skill"
                    size="small"
                  />
                )}
              </SkillsContainer>
            </SkillsSection>
          )}
        </>
      </TileDescriptionSection>
    </TileContainer>
  );
};