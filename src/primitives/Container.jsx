/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: ${props => props.theme.height};
  padding: 1rem;
  overflow: hidden;
`;

export default Container;
