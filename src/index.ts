import cheerio from 'cheerio';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

/** Cheerio Module
 * @namespace Cheerio
*/
@RpsModule("cheerio")
export default class RPSCheerio {

  @rpsAction({verbName:'load'})
  async load (ctx:RpsContext,opts:Object, htmlContent:any) : Promise<any>{
    return cheerio.load(htmlContent);
  }

  // @rpsAction({verbName:'$'})
  // async load (ctx:RpsContext,opts:Object, htmlContent:any) : Promise<any>{
  //   return cheerio.load(htmlContent);
  // }
  
}
