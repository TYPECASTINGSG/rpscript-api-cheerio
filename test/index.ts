import {expect} from 'chai';
import m from 'mocha';

import RPSCheerio from '../src/index';
import { RpsContext,R } from 'rpscript-interface';

m.describe('Cheerio', () => {

  m.it('should load content', async function () {
    let c = new RPSCheerio;

    let output:any = await c.load(new RpsContext,{},'<h2 class="title">Hello <span class="wei">wei</span> world</h2>','h2');
    let output2:any = await c.load(new RpsContext,{},'<h2 class="title">Hello <span class="wei">wei</span> world</h2>');

    let outputH2 = await c.execute(new RpsContext,{},output2,Symbol('find'),'h2');

    expect(output.text()).to.be.equals('Hello wei world');
    expect(outputH2.text()).to.be.equals('Hello wei world');

    let outputFn = await c.execute(new RpsContext,{},output);
    let chain = R.call(outputFn, Symbol('text'));
    let chain2 = R.call(outputFn, Symbol('children'),Symbol('first'),Symbol('text'));

    let chainH2 = await c.execute(new RpsContext,{},outputH2, Symbol('text'));
    let chainH22 = await c.execute(new RpsContext,{},outputH2,Symbol('children'),Symbol('first'),Symbol('text'));

    expect(chain).to.be.equals('Hello wei world');
    expect(chain2).to.be.equals('wei');

    expect(chainH2).to.be.equals('Hello wei world');
    expect(chainH22).to.be.equals('wei');

    let chain3 = await c.execute(new RpsContext,{},output2,Symbol('children'),Symbol('first'),Symbol('text'));
    expect(chain3).to.be.equals('Hello wei world');


  }).timeout(0);

})
