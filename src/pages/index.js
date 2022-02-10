import { CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ThemeSelector } from 'theme/themeSelector';
import { alphabets, numbers, specialCharacters } from './constants';

const Home = () => {
  const [passwordLength, setPasswordLength] = useState(16);
  const [passwordCharacter, setPasswordCharacter] = useState([
    'number',
    'upperCase',
    'lowerCase',
    'specialCharacter',
  ]);
  const [password, setPassword] = useState('');
  const { hasCopied, onCopy } = useClipboard(password);

  const passwordGenerator = async () => {
    const number = numbers.split(',');
    const lowerCase = alphabets.toLowerCase().split(',');
    const upperCase = alphabets.toUpperCase().split(',');
    const specialCharacter = specialCharacters.split('');
    let passwordArray = [];
    passwordCharacter.map((value) => {
      switch (value) {
        case 'number':
          passwordArray.push(number);
          break;
        case 'lowerCase':
          passwordArray.push(lowerCase);
          break;
        case 'upperCase':
          passwordArray.push(upperCase);
          break;
        case 'specialCharacter':
          passwordArray.push(specialCharacter);
          break;
      }
    });
    passwordArray = passwordArray.flat();
    // should show error message on the screen
    if (!!!passwordArray.length) setPassword('');

    let newPassword = '';
    for (let index = 0; index < passwordLength; index++) {
      // generate random index from the array list
      let randomNumber = Math.floor(Math.random() * passwordArray.length);
      newPassword += passwordArray[randomNumber];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    passwordGenerator();
  }, []);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, passwordCharacter]);

  const getInputValue = (value) => {
    const valueLength = value.split('').length;
    if (value < 18 || value > 128) return;
    setPasswordLength(value);
  };

  return (
    <React.Fragment>
      <ThemeSelector />
      <Center w="100%">
        <Heading>Password Generator</Heading>
      </Center>
      <Center mt="10px">
        <form>
          <FormControl>
            <Flex mb={2}>
              <FormLabel htmlFor="passwordText">{password}</FormLabel>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<CopyIcon />}
                onClick={onCopy}
              />
            </Flex>
          </FormControl>
          <FormControl my="10px">
            <CheckboxGroup
              colorScheme="green"
              defaultValue={passwordCharacter}
              onChange={(value) => setPasswordCharacter(value)}
            >
              <VStack w="100%">
                <Checkbox value="number">Numbers</Checkbox>
                <Checkbox value="lowerCase">Lower Case</Checkbox>
                <Checkbox value="upperCase">Upper Case</Checkbox>
                <Checkbox value="specialCharacter">Special Character</Checkbox>
              </VStack>
            </CheckboxGroup>
          </FormControl>
          <FormControl id="amount">
            <FormLabel>Password Length</FormLabel>
            <NumberInput
              max={128}
              min={8}
              defaultValue={passwordLength}
              onChange={(value) => getInputValue(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button m="10px" onClick={passwordGenerator}>
            Generate Password
          </Button>
        </form>
      </Center>
    </React.Fragment>
  );
};
export default Home;
