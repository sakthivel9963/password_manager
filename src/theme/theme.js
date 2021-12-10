import { extendTheme } from '@chakra-ui/react';
import React from 'react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
