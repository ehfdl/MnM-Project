import React from "react";
import styled from "@emotion/native";

const Rating = styled.Text`
  color: ${(props) => props.theme.text};
  margin-bottom: 5px;
`;

export default function Vote({ vote_average }) {
  return <Rating>⭐️{vote_average}/5</Rating>;
}
