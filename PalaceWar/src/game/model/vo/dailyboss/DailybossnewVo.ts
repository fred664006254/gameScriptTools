class DailybossnewVo extends BaseVo
{
	/**
	 * 副本商店积分
	 */
	public score:number;


	/**
	 * 门客是否攻击过具体信息{'1001':1} 1已经攻击过 可以恢复 2已经攻击过且不能恢复
	 */
	public servant:Object = {};

	/**
	 * 每日商店购买信息购买key及数量
	 */
	public shop:Object;

	/**
     * info = {
          rewardVersion = 0,  
          rewardFlag = 0 --是否领取昨日奖励
        },--杂项信息
	 */
	public info:any;

	public constructor()
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	public dispose():void
	{	
		this.score = 0;
		this.info = null;
		this.shop = null;
		this.servant = {};
	}
}