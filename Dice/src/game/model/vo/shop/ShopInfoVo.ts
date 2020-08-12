/**
 * 商店itemvo
 * author dmj
 * date 2017/10/28
 * @class ShopInfoVo
 */
class ShopInfoVo  extends BaseVo{
	/**商品id */

	public uid : number = 0;
	public dailyshop : Object = {};
	public gift : any = {};
	public dailyshopFlag : number = 0;
	public emoticonFlag = 0;//{1:1,2:}
	public lastday : number = 0;
	public expression : any = {};

	public constructor() {
		super();
	}

	public initData(data:any):void{
		if(data){
			for(let key in data){
				this[key]=data[key];
			}
		}
	}

	public dispose():void{
		this.uid = 0;
		this.dailyshop = {};
		this.gift = {};
		this.dailyshopFlag = 0;
		this.emoticonFlag = 0;//{1:1,2:}
		this.lastday = 0;
		this.expression = {};
	}
}