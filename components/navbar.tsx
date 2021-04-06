import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Paper from "@material-ui/core/Paper";

import {
  createStyles,
  fade,
  Theme,
  makeStyles
} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import DirectionsIcon from "@material-ui/icons/Directions";
import { grey } from "@material-ui/core/colors";

import clsx from "clsx";
import {
  chakra,
  HTMLChakraProps,
  Text,
  Box,
  Stack,
  useColorModeValue,
  HStack
} from "@chakra-ui/react";

import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const aaaa = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      color: theme.palette.common.white,
      alignItems: "center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },

    searchIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "primary"
    },
    inputRoot: {
      width: "100%",
      color: "inherit"
    },
    inputInput: {
      // padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch"
        }
      },
      marginLeft: theme.spacing(1),
      flex: 1
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
}

interface AdvancedProps extends Props {
  children: React.ReactElement;
}

function HideOnScroll(props: AdvancedProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type Anchor = "top" | "left" | "bottom" | "right";

export default function SearchAppBar(props: Props) {
  const classes = useStyles();
  const router = useRouter();

  const aaa = aaaa();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(aaa.list, {
        [aaa.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List Surah" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Surah" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Verse" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <Box as="section">
        <Stack
          direction={{ base: "column", sm: "row" }}
          py="3"
          px={{ base: "3", md: "6", lg: "8" }}
          color="white"
          bg={useColorModeValue("blue.600", "blue.400")}
          justifyContent="center"
          alignItems="center"
        >
          <HStack direction="row" spacing="3">
            <Box as={InfoIcon} fontSize="2xl" h="10" />
            <Text fontWeight="medium" marginEnd="2">
              This is open source webapp project. Open to everyone!
            </Text>
          </HStack>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=aldhanekaa&repo=Quran&type=star&count=true"
            scrolling="0"
            width="150"
            height="20"
            title="GitHub"
          ></iframe>
        </Stack>
      </Box>

      <AppBar position="sticky" style={{ top: "0px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">Quran</Link>
          </Typography>
          <Paper component="form" elevation={0} className={classes.root}>
            <IconButton className={classes.searchIcon} aria-label="menu">
              <SearchIcon style={{ color: grey[50] }} />
            </IconButton>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              placeholder="Search Surah"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" aria-label="directions">
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </Fragment>
  );
}

function ActionLink(props: HTMLChakraProps<"a">) {
  return (
    <chakra.a
      {...props}
      href="#"
      px="4"
      py="1.5"
      textAlign="center"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      fontWeight="medium"
      rounded="base"
      _hover={{ bg: "whiteAlpha.200" }}
    />
  );
}
