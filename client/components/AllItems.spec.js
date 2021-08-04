import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllItems from './AllItems';
import store from '../store';
import { Provider } from 'react-redux';
import { fetchItems } from '../store/allitems';

const adapter = new Adapter();
enzyme.configure({ adapter });
