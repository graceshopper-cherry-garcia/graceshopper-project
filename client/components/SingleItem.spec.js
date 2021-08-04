/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SingleItem } from './SingleItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Single Item', () => {
  let singleItem
  let propsItem = {id: 2, name: 'Queen cup', description: 'A cup fit for a queen', imageUrl: 'https://render.fineartamerica.com/images/rendered/default/frontright/mug/images/artworkimages/medium/2/queen-we-will-rock-you-gina-dsgn.jpg?&targetx=233&targety=0&imagewidth=333&imageheight=333&modelwidth=800&modelheight=333&backgroundcolor=FBFBFD&orientation=0&producttype=coffeemug-11', price: 12.45}
  let propsUser = {username: 'cody', email:'cody@cody.com', password: '1234', isAdmin: true}
  const fetchItem = (id) => {
    return propsItem
  }
  beforeEach(() => {
    singleItem = shallow(<SingleItem item={propsItem} user={propsUser} match={{params: {id: propsItem.id}}} fetchItem={fetchItem} />)
  })

  it('render item name in h1', () => {
    expect(singleItem.find('h1').text()).to.be.equal(propsItem.name)
  })
  it('render item price in p', () => {
    expect(singleItem.find('p').at(0).text()).to.be.equal(String(propsItem.price))
  })
  it('render item description in p', () => {
    expect(singleItem.find('p').at(1).text()).to.be.equal(String(propsItem.description))
  })
  it('If user is admin, edit and delete buttons appear', () => {
    expect(singleItem.find('div.admin-buttons').children()).to.have.lengthOf(2)
  })
})
