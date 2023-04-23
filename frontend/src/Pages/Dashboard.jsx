import {
  Button,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NavLayout from './Layouts/NavLayout';

// datat imports

import userdata from '../Storage/user.json';
import UserInfo from '../components/UserInfo';
import History from '../components/History';
import SerialPort from '../components/SerialPort';

export default function Dashboard() {
  

  return (
    <NavLayout>
      <Flex h="100%" w="100vw" justifyContent={'space-around'}>
        <UserInfo />
        <History />
        <SerialPort />
      </Flex>
    </NavLayout>
  );
}

/*




*/
