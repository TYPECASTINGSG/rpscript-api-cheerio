import cheerio from 'cheerio';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

/** Cheerio Module
 * @namespace Cheerio
*/
@RpsModule("cheerio")
export default class RPSCheerio {

  @rpsAction({verbName:'cheerio'})
  async load (ctx:RpsContext,opts:Object, htmlContent:any) : Promise<CheerioStatic>{
    return cheerio.load(htmlContent);
  }

  @rpsAction({verbName:'query-cheerio'})
  async execute (ctx:RpsContext,opts:Object, obj:any, ...chain:any[]) : Promise<string>{

    //map data structure
    let placeholder:any = [{fn:'',param:[]}];
    chain.forEach(c => {
      if(typeof c === 'symbol')placeholder.push({fn:c,param:[]});
      else placeholder[ placeholder.length -1 ].param.push(c);
    });

    //execute
    let output = obj.apply(this,placeholder[0].param);

    for(var i=1;i<placeholder.length;i++){
      let item = placeholder[i];
      let fnName = item.fn.toString();

      fnName = fnName.replace('Symbol(','');  //whatever
      fnName = fnName.replace(')','');

      output = output[fnName].apply(output,item.param);
    }
    
    return output;
  }
  
}
