/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListSingleItem from './ListSingleItem';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('ListSingleItem', () => {
  let listSingleItem;
  let propsItem = {
    id: 2,
    name: 'Queen cup',
    description: 'A cup fit for a queen',
    imageUrl:
      'https://render.fineartamerica.com/images/rendered/default/frontright/mug/images/artworkimages/medium/2/queen-we-will-rock-you-gina-dsgn.jpg?&targetx=233&targety=0&imagewidth=333&imageheight=333&modelwidth=800&modelheight=333&backgroundcolor=FBFBFD&orientation=0&producttype=coffeemug-11',
    price: 12.45,
  };
  beforeEach(() => {
    listSingleItem = shallow(<ListSingleItem item={propsItem} />);
  });

  it('renders item name in li', () => {
    expect(listSingleItem.find('li').at(0).text()).to.be.equal(propsItem.name);
  });
  it('renders item price in li', () => {
    expect(listSingleItem.find('li').at(1).text()).to.be.equal(
      String(`$${propsItem.price}`)
    );
  });
  it('renders item description in li', () => {
    expect(listSingleItem.find('li').at(2).text()).to.be.equal(
      propsItem.description
    );
  });
});
