import { FeaturedCard } from "@/components/FeaturedCard";
import { Section } from "@/components/FeaturedCard";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

/**
 * Text blocks for description and qualification
 */
export type JobText = {
  description: string;
  qualification: string;
};

// TODO: Move out to shared types (IF NEEDED)
export type Jobs = {
  jobId: string;
  publishedDate: string;
  companyLogo: ImageSourcePropType;
  title: string;
  companyName: string;
  location: string;
  workLoad: string;
  workMode: string;
  jobText: JobText;
  skills: { skill: string; matched: boolean }[];
};

export type FeaturedTileLayoutProp = {
  jobList: Jobs[];
};

//TODO Consider Virtulaziation/Pagination
export const FeaturedTileLayout = ({ jobList }: FeaturedTileLayoutProp) => {
  return (
    <>
      {jobList.map((j) => {
        const jobDescription = [
          j.location,
          j.workLoad,
          j.workMode,
          j.companyName,
        ];

        const sections: Section[] = Object.entries(j.jobText).map(
          ([title, content]) => ({
            title,
            content,
            numberOfLines: 3,
          })
        );

        return (
          <FeaturedCard
            Header={
              <FeaturedCard.Header
                jobTitle={j.title}
                compoanyLogo={{ source: j.companyLogo }}
                jobDescription={jobDescription}
              />
            }
            Sections={<FeaturedCard.Sections sections={sections} />}
            Footer={
              <FeaturedCard.Footer
                skills={j.skills.map(({ matched, skill }) => ({
                  isActive: matched,
                  name: skill,
                }))}
              />
            }
          />
        );
      })}
    </>
  );
};
