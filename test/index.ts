import {expect} from 'chai';
import m from 'mocha';

import RPSCheerio from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Cheerio', () => {

  m.it('should load content', async function () {
    let c = new RPSCheerio;

    let output:any = await c.load(new RpsContext,{},'h2','<h2 class="title">Hello <span class="wei">wei</span> world</h2>');
    
    expect(output.text()).to.be.equals('Hello wei world');

    let chain = await c.execute(new RpsContext,{},output, Symbol('text'));
    let chain2 = await c.execute(new RpsContext,{},output,Symbol('children'),Symbol('first'),Symbol('text'));

    expect(chain).to.be.equals('Hello wei world');
    expect(chain2).to.be.equals('wei');

  }).timeout(0);

})
