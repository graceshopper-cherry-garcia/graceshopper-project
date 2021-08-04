/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import { fetchItem } from './singleItem'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios
  let fakeItem = {id: 2, name: 'Queen cup', description: 'A cup fit for a queen', imageUrl: 'https://render.fineartamerica.com/images/rendered/default/frontright/mug/images/artworkimages/medium/2/queen-we-will-rock-you-gina-dsgn.jpg?&targetx=233&targety=0&imagewidth=333&imageheight=333&modelwidth=800&modelheight=333&backgroundcolor=FBFBFD&orientation=0&producttype=coffeemug-11', price: 12.45}

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchItem', () => {
    describe('dispatches an action', () => {
      it('eventually dispatches the SET_ITEM action', async () => {
        let itemId = fakeItem.id
        mockAxios.onGet(`/api/items/${itemId}`).replyOnce(200, fakeItem)
        await store.dispatch(fetchItem(itemId))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('SET_ITEM')
        expect(actions[0].item).to.be.deep.equal(fakeItem)
      })
    })
  })
})
