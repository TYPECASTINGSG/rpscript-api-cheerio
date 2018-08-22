import {expect} from 'chai';
import m from 'mocha';

import RPSCheerio from '../src/index';
import { RpsContext,R } from 'rpscript-interface';

m.describe('Cheerio', () => {

  m.it('should load content', async function () {
    let c = new RPSCheerio;

    let output2:any = await c.load(new RpsContext,{},'<h2 class="title">Hello <span class="wei">wei</span> world</h2>');

    let outputH2text = await c.execute(new RpsContext,{},output2,'h2',Symbol('text'));
    expect(outputH2text).to.be.equals('Hello wei world');

    let chainSpan = await c.execute(new RpsContext,{},output2,'span', Symbol('text'));
    expect(chainSpan).to.be.equals('wei');

    // @ts-ignore
    let cheerio = await c.execute(new RpsContext,{},output2);
    expect(cheerio('span',Symbol('text'))).to.be.equals('wei');

  }).timeout(0);

})
