import { useEffect } from 'react';
import { Tool } from 'pages';
import { Navbar } from 'components';
import { ColorScheme } from 'shared/utils';

import { AppProvider } from './AppProvider';

import './index.scss';

export const App = () => {
  useEffect(ColorScheme.init, []);

  return (
    <AppProvider>
      <Navbar />
      <Tool />
    </AppProvider>
  );
};