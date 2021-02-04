import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.paddingMd};
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1199px) {
    box-sizing: border-box;
  }
`;

export default Form;
