import styled from "styled-components";

export const AboutContainer = styled.div`
  padding-inline: 250px;
  margin: 0 auto;
  overflow: auto;
  position: relative;
  z-index: 0;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

export const SectionContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FeatureItem = styled.li`
  font-size: 18px;
  margin-bottom: 10px;

  &::before {
    content: "✓";
    margin-right: 10px;
  }
`;

export const CallToAction = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
