/* ======================= UI ======================= */

import Grid from "@material-ui/core/Grid";

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useClipboard,
  Flex,
  Input,
  useToast
} from "@chakra-ui/react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
/* ======================= END UI ======================= */

import { ChapterContext } from "../../pages/[chapter]/index";
import styled from "@emotion/styled";

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 680px) {
    width: 100%;
  }
`;

interface ModalShareProps {
  verse: string;
}

export default function ModalShare({ verse }: ModalShareProps) {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(verse);

  return (
    <ChapterContext.Consumer>
      {({ modalShare: { closeModalShare, isModalShareOpen } }) => (
        <Modal
          onClose={closeModalShare}
          isOpen={isModalShareOpen}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share This Ayah</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mb={2}>
                <Input
                  fontSize={20}
                  value={verse}
                  isReadOnly
                  placeholder="Welcome"
                />
                <Button
                  onClick={() => {
                    !hasCopied &&
                      toast({
                        title: `Copied To Clipboard`,
                        status: "success",
                        isClosable: true,
                        position: "bottom-right"
                      });
                    onCopy();
                  }}
                  ml={2}
                >
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </Flex>
              {/* @ts-ignore */}
              <Grid
                container
                marginTop={10}
                spacing={2}
                style={{
                  marginTop: "10px"
                }}
                alignContent="stretch"
              >
                <ButtonGridItem item>
                  <Button colorScheme="facebook">
                    <FacebookIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="twitter">
                    <TwitterIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="orange">
                    <RedditIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="linkedin">
                    <LinkedInIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="telegram">
                    <TelegramIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="whatsapp">
                    <WhatsAppIcon />
                  </Button>
                </ButtonGridItem>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeModalShare}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ChapterContext.Consumer>
  );
}
