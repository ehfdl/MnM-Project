import React from "react";
import styled from "@emotion/native";

const Rating = styled.Text`
  color: gray;
  margin-bottom: 5px;
`;
const RatingStar = styled.Text`
  color: red;
  position: absolute;
`;

export default function Vote({ vote_average }) {
  let star = "★".repeat(vote_average);

  return (
    <>
      <Rating>★★★★★</Rating>
      <RatingStar>{star}</RatingStar>
    </>
  );
}
