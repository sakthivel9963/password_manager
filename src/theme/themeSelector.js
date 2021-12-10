import React from 'react';
import { ColorModeScript, useColorMode, Button } from '@chakra-ui/react';
import theme from './theme';

export const ThemeSelector = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  );
};

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  );
};
