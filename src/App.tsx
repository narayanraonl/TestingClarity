import React, { useEffect } from 'react';
import {NavBasicExample} from './components/SideNav'
import { clarity } from 'react-microsoft-clarity';
import './App.css';

export const App: React.FunctionComponent = () => {
  useEffect(() => {
    clarity.init('mie9m7he5y');
  }, []);
  return (
    
    <>
      <NavBasicExample />
    </>
  );
};
