class SearchVo extends BaseVo
{
	/**
	 * 玩家体力信息 num玩家体力值 st上次寻访时间
	 */
	public strength:{num:number,st:number};

	/**
	 * 红颜id和红颜进度值{id:值}
	 */
	public info:any={};

	public lucky:{st:number,num:number,vipfree:number,buynum:number,foodopen:number,goldopen:number,autoset:number}=<any>{};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data)
		{
			this.reset();
			if(data.strength)
			{
				this.strength=data.strength;
			}
			if(data.info)
			{
				for(let key in data.info)
				{
					let item:SearchInfoItemVo=<SearchInfoItemVo>this.info[key];
					if(!item)
					{
						item=new SearchInfoItemVo();
						this.info[key]=item;
					}
					item.initData(data.info[key]);
					item.personId=Number(key);
				}
				let dataKeys:string[]=Object.keys(data.info);
				for(let key in this.info)
				{
					if(dataKeys.indexOf(key)<0)
					{
						delete this.info[key];
					}
				}
			}
			if(data.lucky)
			{
				this.lucky=data.lucky;
			}
		}
	}

	public get maxSearchNum():number
	{
		return Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).maxStrength;
	}

	public get searchNum():number
	{
		let num:number = Math.floor((GameData.serverTime-this.strength.st)/Config.SearchbaseCfg.needTime)+this.strength.num;
		return Math.max(Math.min(num,this.maxSearchNum),0);
	}

	public get leftTime():number
	{
		let leftnum:number=0;
		let num:number = Math.floor((GameData.serverTime-this.strength.st)/Config.SearchbaseCfg.needTime)+this.strength.num;
		if(num>=this.maxSearchNum)
		{
			leftnum=0;
		}
		else
		{
			num=Config.SearchbaseCfg.needTime-(GameData.serverTime-this.strength.st)%Config.SearchbaseCfg.needTime;
		}
		return num;
	}

	private reset():void
	{
		this.strength=null;
		this.lucky=<any>{};
		// if(this.info)
		// {
		// 	for(let key in this.info)
		// 	{
		// 		delete this.info[key];
		// 	}
		// }
	}

	public dispose():void
	{

	}
}

class SearchInfoItemVo extends BaseVo
{
	public personId:number;
	public progress:number;
	public constructor()
	{
		super();
	}
	public initData(data:any):void
	{
		this.progress=Number(data);
	}
	public dispose():void
	{

	}
}