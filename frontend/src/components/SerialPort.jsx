import { Flex, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

// datat imports
import serialoutput from '../Storage/serialoutput.json';

export default function SerialPort() {
  const [serial, setSerial] = useState(serialoutput);
  useEffect(() => {
    setSerial(serialoutput);
  }, [serialoutput]);

  // scroll down in textarea
  const chatTextArea = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the textarea whenever the content changes
    chatTextArea.current.scrollTop = chatTextArea.current.scrollHeight;
  }, [chatTextArea.current?.value]);

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
      <Textarea
        className="scrolling"
        height={'full'}
        rounded="none"
        padding="3"
        color={'yellow.300'}
        scrollBehavior={'smooth'}
        resize={'none'}
        border={'none'}
        // isDisabled={true}
        userSelect={"none"}
        // draggable={false}
        readOnly={true}
        value={serial.output}
        ref={chatTextArea}
      />
    </Flex>
  );
}
