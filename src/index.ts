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
 * cheerio "<h2 class='title'>Hello <span class='wei'>wei</span> world</h2>"| 'doc'
 * selector $doc 'h2' First Text
 * 
 * @param {string} document Html document.
 * @return {Cheerio} cheerio object.
 * @summary cheerio :: String → CheerioStatic
 * 
*/
  @rpsAction({verbName:'cheerio'})
  async load (ctx:RpsContext,opts:Object, doc:any) : Promise<CheerioStatic>{
    // if(!context) return cheerio.load(doc).root();
    // else return cheerio(doc,context);
    return cheerio.load(doc);
  }

/**
 * @function selector
 * @memberof Cheerio
 * @example
 * ;load document to cheerio
 * cheerio "<h2 class='title'>Hello <span class='wei'>wei</span> world</h2>" | 'doc'
 * 
 * ;equivalent to $('h2').children().first().text() in cheerio
 * selector $doc 'h2' Children First Text
 * 
 * @param {CheerioStatic} selector The selector to traverse/manipulate.
 * @param {String|Cheerio} context context of the document. 
 * @param {...*} chains The chain to navigate. Capital word represents function in cheerio.
 * 
 * @summary selector :: CheerioStatic → String|Cheerio → ...* → *
 * 
 * 
*/
  @rpsAction({verbName:'selector'})
  async execute (ctx:RpsContext,opts:{}, obj:CheerioStatic, context:any, ...chain:any[]) : Promise<any>{

    function fn (ctx, ...chain:any[]) {

      //map data structure
      let placeholder:any = [];
      chain.forEach(c => {
        if(typeof c === 'symbol')placeholder.push({fn:c,param:[]});
        else placeholder[ placeholder.length -1 ].param.push(c);
      });

      //execute
      let output:any = R.call(obj,ctx);

      for(var i=0;i<placeholder.length;i++){
        let item = placeholder[i];
        let fnName = item.fn.toString();

        fnName = fnName.replace('Symbol(','');  //whatever
        fnName = fnName.replace(')','');

        output = output[fnName].apply(output,item.param);
      }

      return output;
    }

    if(!context) return (ctx , ...chain:any[]) => R.apply(fn,R.prepend(ctx,chain));
    else if(chain && chain.length > 0) return R.apply(fn,R.prepend(context,chain));
    else return fn;
  }
  
}
