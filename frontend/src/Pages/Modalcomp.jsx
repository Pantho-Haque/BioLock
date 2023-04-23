import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { databaseWrite } from '../lib/databse';
import { newDateAndTime } from '../lib/timestamp';

import userList from '../database/userList.json';
import serialOutput from '../database/serial.json';

export default function Modalcomp() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newUserName, setNewUserName] = useState('');
  const [newUserId, setNewUserId] = useState(Object.keys(userList).length + 1);
  useEffect(() => {
    setNewUserId(Object.keys(userList).length + 1);
  }, [userList]);


  const [serialData, setSerialData] = useState(serialOutput.output);
  useEffect(() => {
    let int=setInterval(() => {
        setSerialData(serialOutput.output);
    }, 1000);
  
    return () => {
      clearInterval(int);
    }
  }, [])
  

  console.log(serialData);

  return (
    <Flex>
      <Button variant={'outline'} onClick={onOpen}>
        Add User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="text.lighter">
          <ModalHeader>Creating an User</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexFlow="column">
            <Text>
              Your ID will be : <b>{newUserId}</b>
            </Text>
            <Text>Name : </Text>
            <Input
              type="text"
              value={newUserName}
              onChange={e => {
                setNewUserName(e.target.value);
              }}
            />
            <Button
              variant={'outline'}
              alignSelf="end"
              my={5}
              onClick={() => {
                databaseWrite('userList', {
                  ...userList,
                  [newUserId]: {
                    id: newUserId,
                    name: newUserName,
                    lastLogin: newDateAndTime(),
                  },
                });
              }}
            >
              Proceed
            </Button>
            <Textarea
              className="scrolling"
              height={60}
              rounded="none"
              padding="3"
              bg="bg.dark"
              color={'yellow.300'}
              scrollBehavior={'smooth'}
            >
              {serialData}
            </Textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant={'outline'}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
