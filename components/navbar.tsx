/* ============================================= UI ============================================= */

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  fade,
  Theme,
  makeStyles
} from "@material-ui/core/styles";
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
import { grey } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Text, Box, Stack, useColorModeValue, HStack } from "@chakra-ui/react";
/* ============================================= UI ============================================= */

import clsx from "clsx";

import React, { Fragment, useState } from "react";
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
      cursor: "pointer",
      display: "flex",
      color: theme.palette.common.white,
      alignItems: "center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1)
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "block"
    },

    searchIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "primary"
    },
    inputRoot: {
      cursor: "pointer",

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
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    searchInput: {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "400px"
      }
    },
    formControl: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    filterControl: {
      minWidth: 120
    }
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

export default function SearchAppBar() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<string | number>("");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchChapter, setSearchChapter] = useState<string>("");
  const classes = useStyles();

  const [searchBarOpen, setSearchBarOpen] = React.useState(false);

  const handleClickOpen = () => {
    setSearchBarOpen(true);
  };

  const handleClose = () => {
    setSearchBarOpen(false);
  };

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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as number);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  function list(anchor: Anchor) {
    return (
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
  }

  return (
    <Fragment>
      <CssBaseline />

      <Dialog
        open={searchBarOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          What are you looking for?
        </DialogTitle>
        <DialogContent style={{ paddingBottom: 40 }}>
          <FormControl className={classes.formControl} fullWidth>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted!");
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Search Anything"
                itemType="submit"
                className={classes.searchInput}
              />
            </form>

            <FormControl className={classes.filterControl}>
              <InputLabel>Filter</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={filterOpen}
                onClose={handleCloseFilter}
                onOpen={handleOpenFilter}
                value={filter}
                onChange={handleChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="verse">Verse</MenuItem>
                <MenuItem value="surah">Surah</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
        </DialogContent>
      </Dialog>

      {/* Banner */}
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
      {/* Banner */}

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
            <Link href="/">Quran Hub</Link>
          </Typography>
          <Paper
            component="form"
            elevation={0}
            className={classes.root}
            onClick={() => {
              handleClickOpen();
            }}
          >
            <IconButton className={classes.searchIcon} aria-label="menu">
              <SearchIcon style={{ color: grey[50] }} />
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
