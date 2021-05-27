import { Text, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledBismillahTextComponent = styled(Text)`
  font-size: 70px;

  @media screen and (max-width: 556px) {
    font-size: 40px;
  }
`;
const BismillahTextComponent = () => (
  <StyledBismillahTextComponent
    marginTop={10}
    className="arabic"
    align="center"
    id="bismillah"
  >
    ﷽
  </StyledBismillahTextComponent>
);

export default BismillahTextComponent;
