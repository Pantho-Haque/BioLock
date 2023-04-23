import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// datat imports
import history from '../Storage/history.json';

export default function History() {
  const [historyData, setHistoryData] = useState(history);
  useEffect(() => {
    setHistoryData(history);
  }, [history]);

  return (
    <Flex
      w="30vw"
      h="full"
      flexFlow={'column'}
      bg="bg.darker"
      p={10}
      className="scrolling"
      borderLeft={'1px solid'}
      borderRight={'1px solid'}
      borderColor={'highlighter.500'}
    >
      <Text
        fontWeight={'semibold'}
        fontSize="xl"
        w="full"
        pl={5}
        pb={2}
        borderBottom={'2px solid'}
        borderColor="highlighter.500"
      >
        History
      </Text>
      <Flex pl={5} pr={2} flexFlow={'column'} h={'full'} className="scrolling">
        {historyData.slice().reverse().map((el, i) => {
          return (
            <Flex
              w="100%"
              mx="auto"
              pt={5}
              pr={3}
              justifyContent={'space-between'}
              borderBottom="1px solid"
              borderColor={'highlighter.900'}
            >
              <Text>{el.date.replace("|"," ")}</Text>
              <Text fontWeight={'semibold'}>{el.name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
