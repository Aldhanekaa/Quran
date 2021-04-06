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

import { NextRouter } from "next/router";
import { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button
} from "@chakra-ui/react";
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

interface SpeedDialProps {
  router: NextRouter;
}
function ScrollToTop(props: SpeedDialProps) {
  const {
    isOpen: isDialogShareOnOpen,
    onOpen: openShareDialog,
    onClose: closeShareDialog
  } = useDisclosure();

  // @ts-ignore
  console.log("heyyy router! ", props.router.components);
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
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            exercitationem architecto natus itaque doloremque. Itaque sint
            ducimus velit, corrupti blanditiis dolorem. Nesciunt quam natus
            voluptate ratione eligendi pariatur similique exercitationem?
          </ModalBody>
        </ModalContent>
      </Modal>
      <ScrollTop {...props}>
        <OpenIconSpeedDial openShareDialog={openShareDialog} />
      </ScrollTop>
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
          <SpeedDialAction icon={<SettingsIcon />} tooltipTitle="Settings" />
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
