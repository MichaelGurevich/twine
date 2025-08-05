import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Tile } from "@/components/Tile";

const Discover = () => {
  // Mock user skills for demonstration
  const userSkills = ["React", "TypeScript", "Node.js", "Python", "AWS"];

  return (
    <ScrollView style={{ flex: 1}}>

      <View style={{ 
        flexDirection: "row", 
        flexWrap: "wrap"
      }}>
        {/* High Match Tile */}
        <Tile
          id={"1"}
          source={{uri:"https://static.dezeen.com/uploads/2021/11/meta-facebook-rebranding-name-news_dezeen_2364_col_sq.jpg"}}
          title={"Senior Frontend Developer"}
          companyName={"Meta"}
          type={"normal"}
          experienceLevel={"senior"}
          employmentType={"full_time"}
          jobType={"remote"}
          location={"Tel-Aviv"}
          skills_required={["React", "TypeScript", "JavaScript", "CSS", "HTML"]}
          userSkills={userSkills}
        />

        {/* Partial Match Tile */}
        <Tile
          id={"2"}
          source={{uri:"https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"}}
          title={"Full Stack Engineer"}
          companyName={"Google"}
          type={"normal"}
          experienceLevel={"mid"}
          employmentType={"full_time"}
          jobType={"hybrid"}
          location={"New York"}
          skills_required={["Python", "Go", "Kubernetes", "Docker", "GCP", "MongoDB"]}
          userSkills={userSkills}
        />

        {/* Low Match Tile */}
        <Tile
          id={"3"}
          source={{uri:"https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg"}}
          title={"DevOps Engineer"}
          companyName={"Amazon"}
          type={"normal"}
          experienceLevel={"senior"}
          employmentType={"contract"}
          jobType={"onsite"}
          location={"Seattle"}
          skills_required={["Terraform", "Jenkins", "Ansible", "Linux", "Bash", "Docker"]}
          userSkills={userSkills}
        />
      </View>
    </ScrollView>
  );
};

export default Discover;
