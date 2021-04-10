import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SettingsIcon from "@material-ui/icons/Settings";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  useClipboard,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Stack,
  Input,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  HStack,
  Select,
  Textarea,
  DrawerFooter,
  Button,
  DrawerContent
} from "@chakra-ui/react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

interface SpeedDialProps {
  url: string;
}
function ScrollToTop(props: SpeedDialProps) {
  const {
    isOpen: isSettingsOpen,
    onOpen: setSettingsToOpen,
    onClose: setSettingsToClose
  } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(props.url);

  const {
    isOpen: isDialogShareOnOpen,
    onOpen: openShareDialog,
    onClose: closeShareDialog
  } = useDisclosure();

  // @ts-ignore
  // console.log("heyyy router! ", props.router.components);
  return (
    <>
      <Modal
        onClose={closeShareDialog}
        isOpen={isDialogShareOnOpen}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share This WebApp</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={9}>
            Share this WebApp to your friends and family!
            <Flex mb={2} mt={4}>
              <Input value={props.url} isReadOnly placeholder="Welcome" />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
            {/* @ts-ignore */}
            <Grid
              container
              spacing={2}
              style={{
                marginTop: "10px",
                padding: "10px"
              }}
              alignContent="stretch"
            >
              <Button
                marginBottom={2}
                marginRight={2}
                colorScheme="facebook"
                leftIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
              <Button
                marginBottom={2}
                marginRight={2}
                colorScheme="twitter"
                leftIcon={<TwitterIcon />}
              >
                Twitter
              </Button>
              <Button
                marginBottom={2}
                marginRight={2}
                colorScheme="orange"
                leftIcon={<RedditIcon />}
              >
                Reddit
              </Button>
              <Button
                marginBottom={2}
                marginRight={2}
                colorScheme="linkedin"
                leftIcon={<LinkedInIcon />}
              >
                LinkedIn
              </Button>
              <Button
                marginBottom={2}
                marginRight={2}
                colorScheme="telegram"
                leftIcon={<TelegramIcon />}
              >
                Telegram
              </Button>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ScrollTop {...props}>
        <OpenIconSpeedDial
          setSettingsToOpen={setSettingsToOpen}
          openShareDialog={openShareDialog}
        />
      </ScrollTop>
      <Drawer
        size="md"
        isOpen={isSettingsOpen}
        placement="right"
        onClose={setSettingsToClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Settings</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input id="username" placeholder="Please enter user name" />
                </Box>

                <Box>
                  <FormLabel htmlFor="owner">Select Owner</FormLabel>
                  <Select id="owner" defaultValue="segun">
                    <option value="segun">Segun Adebayo</option>
                    <option value="kola">Kola Tioluwani</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea id="desc" />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={setSettingsToClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

const SpeedDialStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 0
    },
    radioGroup: {
      margin: theme.spacing(1, 0)
    },
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2)
      }
    }
  })
);

const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" }
];

interface OpenIconSpeedDialProps {
  openShareDialog: () => void;
  setSettingsToOpen: () => void;
}
function OpenIconSpeedDial(props: OpenIconSpeedDialProps) {
  const classes = SpeedDialStyles();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {/* @ts-ignore */}
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          <SpeedDialAction
            icon={<SettingsIcon />}
            onClick={props.setSettingsToOpen}
            tooltipTitle="Settings"
          />
          <SpeedDialAction
            icon={<ShareIcon />}
            onClick={props.openShareDialog}
            tooltipTitle="Share"
          />
        </SpeedDial>
      </Box>
    </>
  );
}

export default ScrollToTop;

function ScrollTop(props: Props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: -1
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
