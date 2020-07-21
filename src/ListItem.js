import React from 'react';
import styled from "styled-components";
import "./ListItem.css"


const ListItemContainer = styled.div`
  display: flex;
  margin-left:43%;
  color:grey;
  align-items:center;
  text-align:center;
  &:hover {
    color: purple; // <Thing> when hovered
  }
  flex-direction: row;
`;

const ListItemName = styled.div`
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  margin-left: 5px;
`;

export default (props) => {
  return (
    <ListItemContainer>
      <input
        className ="box-size"
        input type="checkbox" 
        pattern="[0-9]*"
        size="lg"
        checked={props.checked}
        // onInput={onInput} 
        onChange={() => props.onToggleChecked(props.id)}
      />
      <ListItemName checked={props.checked}>{props.name}</ListItemName>
    </ListItemContainer>
  );
};