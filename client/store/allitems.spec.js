/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchItems } from './allItems';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('allItems thunk creator', () => {
  let store;
  let mockAxios;
  const fakeItems = [
    {
      id: 2,
      name: 'Queen cup',
      description: 'A cup fit for a queen',
      imageUrl:
        'https://render.fineartamerica.com/images/rendered/default/frontright/mug/images/artworkimages/medium/2/queen-we-will-rock-you-gina-dsgn.jpg?&targetx=233&targety=0&imagewidth=333&imageheight=333&modelwidth=800&modelheight=333&backgroundcolor=FBFBFD&orientation=0&producttype=coffeemug-11',
      price: 12.45,
    },
    {
      id: 3,
      name: 'King cup',
      description: 'A cup fit for a king',
      imageUrl:
        'https://render.fineartamerica.com/images/rendered/default/frontright/mug/images/artworkimages/medium/2/queen-we-will-rock-you-gina-dsgn.jpg?&targetx=233&targety=0&imagewidth=333&imageheight=333&modelwidth=800&modelheight=333&backgroundcolor=FBFBFD&orientation=0&producttype=coffeemug-11',
      price: 33.33,
    },
  ];
  const initialState = {};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchItems', () => {
    it('sets the state to includes all items', async () => {
      mockAxios.onGet('/api/items').replyOnce(200, fakeItems);
      await store.dispatch(fetchItems());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_ITEMS');
      expect(actions[0].items).to.be.deep.equal(fakeItems);
    });
  });
});
