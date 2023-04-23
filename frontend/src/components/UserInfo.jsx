import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// datat imports
import userdata from '../Storage/user.json';
import phoneNumber from '../Storage/phone.json';

export default function UserInfo() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState(userdata);

  const [newUserId, setNewUserId] = useState(userdata.length + 1);
  const [newUserName, setNewUserName] = useState('');
  useEffect(() => {
    setUserData(userdata);
    setNewUserId(userdata.length + 1);
  }, [userdata]);

  const [newPhone, setNewPhone] = useState(phoneNumber.number.slice(4));
  const [updatingNumber, setUpdatingNumber] = useState(false);
  useEffect(() => {
    setNewPhone(phoneNumber.number.slice(4));
  }, [phoneNumber]);

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
      <Flex w="full" justifyContent={'end'} pb={5}>
        <Button variant={'outline'} onClick={onOpen}>
          Add User
        </Button>
      </Flex>
      <Flex flexFlow={'column'}>
        <SimpleGrid
          columns={3}
          minChildWidth="32%"
          spacing="2%"
          textAlign={'left'}
          pl={5}
        >
          <Text fontWeight={'semibold'} py={3}>
            ID
          </Text>
          <Text fontWeight={'semibold'} py={3}>
            Name
          </Text>
          <Text fontWeight={'semibold'} py={3}>
            Last Login
          </Text>
        </SimpleGrid>
        <Flex flexFlow={'column'} w="full" h="500px" className="scrolling">
          {userData.map((el, i) => {
            return (
              <SimpleGrid
                columns={3}
                minChildWidth="31%"
                spacing="2%"
                textAlign={'left'}
                pl={5}
                bg={el.id % 2 === 1 ? 'bg.dark' : ''}
              >
                <Text fontWeight={'semibold'} py={3}>
                  {el.id}
                </Text>
                <Text fontWeight={'semibold'} py={3}>
                  {el.name}
                </Text>
                <Text fontWeight={'semibold'} py={3}>
                  {el.lastLogin.split('|')[0]} <br />{' '}
                  {el.lastLogin.split('|')[1]}
                </Text>
              </SimpleGrid>
            );
          })}
        </Flex>
        <Flex>
          <Button
            onClick={() => {
              fetch('http://localhost:4000/clearuser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
              });
            }}
          >
            Clear All User
          </Button>
        </Flex>
      </Flex>
      <Flex w="full" justifyContent={'space-between'} pt={10}>
        <Text pl={5} fontWeight={'semibold'} fontSize="large" className="anek">
          Owners Phone number
        </Text>
        <InputGroup w="400px">
          <InputLeftAddon
            children="+880"
            rounded={'none'}
            bg="transparent"
            color={'text.mid'}
          />
          <Input
            type="tel"
            placeholder="phone number"
            rounded={'none'}
            value={newPhone}
            onChange={e => {
              setNewPhone(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Flex w="full" justifyContent={'end'} pt={5}>
        <Button
          isLoading={updatingNumber}
          variant={'outline'}
          onClick={() => {
            setUpdatingNumber(true);
            fetch('http://localhost:4000/newphone', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                number: newPhone,
              }),
            }).then(res => {
              setUpdatingNumber(false);
              toast({
                title: 'Phone Number updated!',
                description: 'Alert messages will be send here from now on',
                status: 'success',
                duration: 4000,
                isClosable: true,
              });
            });
          }}
        >
          Update
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent color="text.lighter" bg="bg.dark" p={5}>
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
              rounded={'none'}
              mt={3}
              onChange={e => {
                setNewUserName(e.target.value);
              }}
            />
            <Button
              variant={'outline'}
              alignSelf="end"
              my={5}
              onClick={() => {
                fetch('http://localhost:4000/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: newUserId,
                    name: newUserName,
                  }),
                });
                onClose();
                setNewUserName('');
              }}
            >
              Proceed
            </Button>
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
