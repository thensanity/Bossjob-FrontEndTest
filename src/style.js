import WithDirection from "./shared/components/Settings/withDirection";
import styled from "styled-components";

const tableCustom = styled.div`
  width: 100%;
  .container {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn-filter {
      margin-right: 10px;
    }
  }
`;
export default WithDirection(tableCustom);
