import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  input {
    display: none;
  }

  label {
    width: 180px;
    height: 180px;
    display: flex;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }
`;
