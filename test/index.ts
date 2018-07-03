import {expect} from 'chai';
import m from 'mocha';

import RPSCheerio from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Cheerio', () => {

  m.it('should load content', async function () {
    let c = new RPSCheerio;

    let output = await c.load(new RpsContext,{},'<h2 class="title">Hello world</h2>');
    
    expect(output('h2.title').text()).to.be.equals('Hello world');

  }).timeout(0);

})
