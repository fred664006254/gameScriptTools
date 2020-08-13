class ManageVo extends BaseVo
{
	public gold:ManageItemVo;
	public food:ManageItemVo;
	public soldier:ManageItemVo;
	public itemsVo:ManageItemVo[]=[];
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data&&data.finfo)
		{
			for(var key in data.finfo)
			{
				if(!this[key])
				{
					this[key]=new ManageItemVo();
				}
				let itemVo:ManageItemVo=this[key];
				itemVo.initData(data.finfo[key]);
				itemVo.type=key;
			}
		}
		this.itemsVo.length=0;
		this.itemsVo=[this.gold,this.food,this.soldier];
	}

	public dispose():void
	{
		if(this.gold)
		{
			this.gold.dispose();
			this.gold=null;
		}
		if(this.food)
		{
			this.food.dispose();
			this.food=null;
		}
		if(this.soldier)
		{
			this.soldier.dispose();
			this.soldier=null;
		}
		if(this.itemsVo)
		{
			this.itemsVo.length=0;
		}
	}
}
class ManageItemVo extends BaseVo
{
	/**
	 * 当前可用次数
	 * */
	public num:number=0;
	/**
	 * 计时时间
	 * */
	public st:number=0;

	/**
	 *需要时间
	 */
	public need_time:number=0;
	/**
	 * 类型
	 */
	public type:string=null;

	public get needRefresh():boolean
	{
		return this.num>0||GameData.serverTime-this.need_time-this.st>0;
	}
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.num!=null)
			{
				this.num=Number(data.num);
			}
			if(data.st!=null)
			{
				this.st=Number(data.st);
			}
			if(data.need_time!=null)
			{
				this.need_time=Number(data.need_time);
			}
		}
	}

	public get maxNum():number
	{
		let level:string=String(Api.playerVoApi.getPlayerLevel());
		return Config.LevelCfg.getCfgByLevel(level)[this.type];
	}

	public dispose():void
	{
		this.num=0;
		this.st=0;
		this.type=null;
	}
}