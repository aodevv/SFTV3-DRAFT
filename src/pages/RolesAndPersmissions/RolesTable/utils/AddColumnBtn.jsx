import ReactDom from 'react-dom';
import styled from 'styled-components';

import { AiFillPlusCircle } from 'react-icons/ai';

import './styles.scss';

const StyledDiv = styled.div`
  &:after {
    height: ${(props) => props.height - 11}px;
  }
`;

const AddColumnBtn = ({ x, y, tableHeight, addColumn }) => {
  return ReactDom.createPortal(
    <StyledDiv
      height={tableHeight}
      style={{ left: x, top: y }}
      className="add-column"
    >
      <i
        onClick={() => {
          addColumn();
        }}
      >
        <AiFillPlusCircle />
      </i>
    </StyledDiv>,
    document.getElementById('add-column')
  );
};

export default AddColumnBtn;
