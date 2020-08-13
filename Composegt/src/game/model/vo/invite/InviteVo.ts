class InviteVo extends BaseVo
{
	public info:{} = {};
	public rinfo:{invite:{},power:{}, recharge:{}} = {invite:{},power:{}, recharge:{}};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data)
		{
			for(let key in data)
			{
				this[key]=data[key];
			}
		}
	}
	public dispose():void
	{
	}
}