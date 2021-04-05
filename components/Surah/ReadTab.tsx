import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ChapterContext } from "@/pages/[chapter]/index";
import { readVerseComponent as ReadVerseComponent } from "@/components/Surah/verse";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {/* @ts-ignore */}

          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        </>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

interface ReadTabProps {
  playWordVerseSound: (url: string) => void;
  stopWordVerseSound: () => void;
}

export default function BasicTabs({
  playWordVerseSound,
  stopWordVerseSound
}: ReadTabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChapterContext.Consumer>
      {({
        surahVerses,
        surah,
        modalShare: {
          closeModalShare,
          isModalShareOpen,
          shareModalData: { verse, translation },
          handleShareModal
        }
      }) => (
        <React.Fragment>
          {/* @ts-ignore */}
          <Box sx={{ width: "100%" }} style={{ marginTop: "50px" }}>
            {/* @ts-ignore */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                //   @ts-ignore
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Normal" {...a11yProps(0)} />
                <Tab label="Tajweed" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box
                marginTop={5}
                className="arabic"
                alignContent="center"
                textAlign="center"
              >
                {surahVerses &&
                  surahVerses.verses.map((verse) => {
                    return (
                      <ReadVerseComponent
                        playWordVerseSound={playWordVerseSound}
                        stopWordVerseSound={stopWordVerseSound}
                        {...verse}
                      />
                    );
                  })}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </React.Fragment>
      )}
    </ChapterContext.Consumer>
  );
}
