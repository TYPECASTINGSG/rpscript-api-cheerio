/**
 * @module Cheerio
 */

import cheerio from 'cheerio';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

@RpsModule("cheerio")
export default class RPSCheerio {

  @rpsAction({verbName:'load'})
  async load (ctx:RpsContext,opts:Object, htmlContent:any) : Promise<any>{
    return cheerio.load(htmlContent);
  }
  
}
