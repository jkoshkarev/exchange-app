import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import React from 'react';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.React = React;
