import {
  useColorModeValue,
  Flex,
  Icon,
  Box,
  chakra,
  Stack,
  Badge
} from "@chakra-ui/react";

interface ChapterHeroProps {
  surah_name: string;
  desc: string;
  revelation_place: string;
  verses_count: number;
}
function ChapterHero(props: ChapterHeroProps) {
  return (
    <Box px={4} paddingTop={10} paddingBottom={100} mx="auto">
      <Box
        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: "left", md: "center" }}
        mx="auto"
      >
        <chakra.h1
          mb={3}
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color={useColorModeValue("gray.900", "gray.100")}
          lineHeight="shorter"
        >
          {props.surah_name}
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          {props.desc}
        </chakra.p>

        <Stack
          display="flex"
          justifyContent={{ base: "start", md: "center" }}
          direction="row"
          mb={3}
          spacing={{ base: 2, md: 3 }}
          fontSize="xs"
          color="gray.600"
        >
          <Badge variant="outline" colorScheme="green">
            {props.revelation_place}
          </Badge>
          <Badge variant="outline" colorScheme="green">
            {props.verses_count} Verses
          </Badge>
        </Stack>
      </Box>
    </Box>
  );
}

export default ChapterHero;
