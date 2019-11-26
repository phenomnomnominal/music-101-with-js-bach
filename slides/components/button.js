import styled from 'styled-components';

export const Button = styled.button`
  outline: none;
  border: none;
  background: none;
  color: gold;
  border-radius: 50%;
  line-height: 4rem;
  font-size: 2rem;
  text-align: center;

  &:hover {
    font-weight: 700 !important;
    text-shadow: -1px -1px white;
    color: gold;
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
    text-shadow: -1px -1px white;
    color: gold;
    filter: darken(10);
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 4rem;
`;
