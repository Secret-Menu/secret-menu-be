const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
require('../db/data-helpers');

describe('polls routes', () => {
  it('creates a poll', () => {
    return request(app)
      .post('/api/v1/polls')
      .send({
        name: 'Friday Night BBQ',
        end: new Date('2020-05-31T16:00:00Z'),
        status: 'open',
        restaurant: new mongoose.Types.ObjectId(),
        offering1Name: 'Baby Back Ribs',
        offering1Votes: 0,
        offering1ImageUrl: 'https://www.simplyrecipes.com/wp-content/uploads/2019/10/IP-Baby-Back-Ribs-Lead-2.jpg',
        offering1Description: 'Full rack of smokey baby back ribs, with an accompaniment of cornbread muffins, spinach salad, and bbq baked beans',
        offering2Name: 'Pulled Pork Slider Sammies',
        offering2Votes: 0,
        offering2ImageUrl: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2016/6/10/0/CCKHWSP2H_Pulled-Pork-Sliders_s4x3.jpg.rend.hgtvcom.616.462.suffix/1465587520182.jpeg',
        offering2Description: 'Build your own pulled pork slider sammies - comes with coleslaw and potato salad'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Friday Night BBQ',
          end: '2020-05-31T16:00:00.000Z',
          status: 'open',
          restaurant: expect.any(String),
          offering1Name: 'Baby Back Ribs',
          offering1Votes: 0,
          offering1ImageUrl: 'https://www.simplyrecipes.com/wp-content/uploads/2019/10/IP-Baby-Back-Ribs-Lead-2.jpg',
          offering1Description: 'Full rack of smokey baby back ribs, with an accompaniment of cornbread muffins, spinach salad, and bbq baked beans',
          offering2Name: 'Pulled Pork Slider Sammies',
          offering2Votes: 0,
          offering2ImageUrl: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2016/6/10/0/CCKHWSP2H_Pulled-Pork-Sliders_s4x3.jpg.rend.hgtvcom.616.462.suffix/1465587520182.jpeg',
          offering2Description: 'Build your own pulled pork slider sammies - comes with coleslaw and potato salad'
        });
      });
  });
});