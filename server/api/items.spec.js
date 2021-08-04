/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Item } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Single Item routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/items/', () => {

    it('GET /api/items/1', async () => {
      const res = await request(app)
        .get('/api/items/1')
        .expect(200)

      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(1);
    })
  }) // end describe('/api/items/1')
}) // end describe('Single Item routes')
