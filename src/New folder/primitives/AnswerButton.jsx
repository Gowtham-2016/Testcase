/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerButton = styled.button`
  display: inline-block;
  border: 1px solid #2ea7cc;
  padding: .5rem 1rem;
  color: #fff;
  font-weight:300;
  background: none;
  border-radius: 1.5rem;
  transition: background 100ms;
  cursor: pointer;
  margin-right: .5rem;
  margin-bottom: 1rem;

  &:focus,
  &:hover {
    outline: 0;
    background: ${props => props.theme.userBlobColor};
    color: #fff;
  }
`;

export default AnswerButton;
