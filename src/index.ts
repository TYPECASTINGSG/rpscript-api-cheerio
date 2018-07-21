import cheerio from 'cheerio';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

/** Cheerio Module
 * @namespace Cheerio
*/
@RpsModule("cheerio")
export default class RPSCheerio {

  @rpsAction({verbName:'load-cheerio'})
  async load (ctx:RpsContext,opts:Object, ...params:any[]) : Promise<CheerioStatic|Cheerio>{
    if(params.length === 1)
      return cheerio.load(params[0]);
    else if(params.length === 2)
      return cheerio(params[0],params[1]);
    else if(params.length === 3)
      return cheerio(params[0],params[1],params[2]);

    else throw new Error('Invalid number of arguments');
  }

  @rpsAction({verbName:'cheerio'})
  async cheerio (ctx:RpsContext,opts:Object) : Promise<CheerioAPI>{
    return cheerio;
  }

  @rpsAction({verbName:'convert-to-cheerio'})
  async convertCheerio (ctx:RpsContext,opts:Object, obj:any) : Promise<Cheerio>{
    return cheerio(obj);
  }

  @rpsAction({verbName:'query-cheerio'})
  async execute (ctx:RpsContext,opts:Object, obj:Cheerio, ...chain:any[]) : Promise<any>{

    //map data structure
    // let placeholder:any = [{fn:'',param:[]}];
    let placeholder:any = [];
    chain.forEach(c => {
      if(typeof c === 'symbol')placeholder.push({fn:c,param:[]});
      else placeholder[ placeholder.length -1 ].param.push(c);
    });

    //execute
    // let output = obj.apply(this,placeholder[0].param);
    let output:any = obj;

    for(var i=0;i<placeholder.length;i++){
      let item = placeholder[i];
      let fnName = item.fn.toString();

      fnName = fnName.replace('Symbol(','');  //whatever
      fnName = fnName.replace(')','');

      output = output[fnName].apply(output,item.param);
    }
    
    return output;
  }
  
}
