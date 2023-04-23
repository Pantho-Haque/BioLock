import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import ColorModeSwitcher from '../../ColorModeSwitcher.js';
import logo from '../../assets/filedriveNavicon.svg';

export default function NavLayout({ children }) {
  return (
    <Flex
      w={'95vw'}
      mx="auto"
      h="100vh"
      flexFlow={'column'}
      // border="2px solid"
      // borderColor={'highlighter.500'}
    >
      <Flex
        w="100%"
        h="8%"
        justifyContent={'space-between'}
        alignItems="center"
        boxShadow="lg"
      >
        <Text
          fontWeight={'semibold'}
          fontSize="xx-large"
          pl={5}
          color="text.lighter"
        >
          BioLock
        </Text>
      </Flex>
      <Flex w="full" h="92%">
        {children}
      </Flex>
    </Flex>
  );
}
