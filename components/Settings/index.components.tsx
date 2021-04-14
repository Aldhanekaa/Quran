import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Stack,
  FormLabel,
  IconButton,
  Switch,
  FormControl,
  DrawerFooter,
  Button,
  DrawerContent,
  Box,
  Heading,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function Feature({ title, desc, ...rest }: { title: string; desc?: string }) {
  return (
    <Box
      _hover={{ borderColor: "green", cursor: "pointer" }}
      p={5}
      shadow="none"
      borderWidth="1px"
      {...rest}
    >
      <Heading display="flex" justifyContent="space-between" fontSize="xl">
        {title} <NavigateNextIcon />
      </Heading>

      {desc && <Text mt={4}>{desc}</Text>}
    </Box>
  );
}

interface SettingsDrawerProps {
  setSettingsToOpen: () => void;
  isSettingsOpen: boolean;
  setSettingsToClose: () => void;
}

export default function SettingsDrawer({
  setSettingsToOpen,
  isSettingsOpen,
  setSettingsToClose
}: SettingsDrawerProps) {
  return (
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
              <FormControl
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormLabel htmlFor="Dark-mode" mb="0">
                  Dark Mode (enable)
                </FormLabel>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<Brightness4Icon />}
                />
              </FormControl>

              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Read</Tab>
                  <Tab>Two</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Stack spacing="24px">
                      <Stack marginTop={3} spacing={8}>
                        <Feature title="Select Font" />
                      </Stack>

                      <FormControl display="flex" alignItems="center">
                        <Switch id="Transliteration" />

                        <FormLabel
                          htmlFor="Transliteration"
                          marginLeft={3}
                          mb="0"
                        >
                          Transliteration (enable)
                        </FormLabel>
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <Switch id="Translation" />

                        <FormLabel htmlFor="Translation" marginLeft={3} mb="0">
                          Translation (enable)
                        </FormLabel>
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <Switch id="paginationOnEachChapter" />

                        <FormLabel
                          htmlFor="paginationOnEachChapter"
                          marginLeft={3}
                          mb="0"
                        >
                          Verse Pagination (enable)
                        </FormLabel>
                      </FormControl>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={setSettingsToClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
