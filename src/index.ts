import cheerio from 'cheerio';
import {RpsContext,RpsModule,rpsAction,R} from 'rpscript-interface';

/** Html document traversal and manipulation with cheerio
 * @see {@link https://www.npmjs.com/package/cheerio}
 * @namespace Cheerio
 * 
 * @example
 * rps install cheerio
*/
@RpsModule("cheerio")
export default class RPSCheerio {

  /**
 * @function cheerio
 * @memberof Cheerio
 * @example
 * ; load document to cheerio
 * cheerio "<h2 class='title'>Hello <span class='wei'>wei</span> world</h2>" 'h2' | 'doc'
 * selector $doc Children First Text
 * 
 * @param {string} document Html document.
 * @param {string} context Optional context.
 * @return {Cheerio} cheerio object.
 * @summary cheerio :: (String, String?) → Cheerio
 * 
*/
  @rpsAction({verbName:'cheerio'})
  async load (ctx:RpsContext,opts:Object, doc:any, context?:any) : Promise<Cheerio>{
    if(!context) return cheerio.load(doc).root();
    else return cheerio(doc,context);
  }

/**
 * @function selector
 * @memberof Cheerio
 * @example
 * ;load document to cheerio
 * cheerio "<h2 class='title'>Hello <span class='wei'>wei</span> world</h2>" 'h2' | 'doc'
 * 
 * ;equivalent to $('h2').children().first().text() in cheerio
 * selector $doc Children First Text
 * 
 * @param {Cheerio} selector The selector to traverse/manipulate.
 * @param {...*} chains The chain to navigate. Capital word represents function in cheerio.
 * 
 * @summary selector :: Cheerio → ...* → *
 * 
 * 
*/
  @rpsAction({verbName:'selector'})
  async execute (ctx:RpsContext,opts:Object, obj:Cheerio, ...chain:any[]) : Promise<any>{

    function fn (...chain:any[]) {
      //map data structure
      let placeholder:any = [];
      chain.forEach(c => {
        if(typeof c === 'symbol')placeholder.push({fn:c,param:[]});
        else placeholder[ placeholder.length -1 ].param.push(c);
      });

      //execute
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
    
    if(chain && chain.length > 0) return R.apply(fn,chain);
    else if(obj) return fn;
  }
  
}
