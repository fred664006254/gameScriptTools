/**
 * 商店itemvo
 * author dmj
 * date 2017/10/28
 * @class ShopInfoVo
 */
class ShopInfoVo  extends BaseVo
{
	/**商品id */
	public id:number = 0;
	public buyNum:number = 0;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data.num != null)
		{
			this.buyNum = Number(data.num);
		}
		if(data.id != null)
		{
			this.id = Number(data.id);
		}
	}

	public dispose():void
	{
		this.id = 0;
		this.buyNum = 0;
	}
}