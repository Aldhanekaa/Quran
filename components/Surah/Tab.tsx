import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import styled from "@emotion/styled";

const SurahInfoTab = styled(Container)`
  ol,
  ul {
    padding-left: 30px;
    margin-top: 20px;
  }

  h2 {
    margin-top: 30px;
    font-size: 25px;
    font-weight: 500;
  }

  p {
    margin-top: 10px;
  }
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const TabsStyled = styled(Tabs)`
  justify-content: center !important;
`;

interface thisIsProps {
  Translations?: JSX.Element | JSX.Element[];
  SurahInfo?: string;
}

export default function ScrollableTabsButtonPrevent(props: thisIsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <TabsStyled
          value={value}
          onChange={handleChange}
          scrollButtons="off"
          centered
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="Translation" aria-label="phone" {...a11yProps(0)} />
          <Tab label="Read" aria-label="favorite" {...a11yProps(1)} />
          <Tab label="Surah Info" aria-label="person" {...a11yProps(2)} />
        </TabsStyled>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.Translations}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SurahInfoTab>
          <div
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: props.SurahInfo
            }}
          ></div>
        </SurahInfoTab>
      </TabPanel>
    </div>
  );
}
