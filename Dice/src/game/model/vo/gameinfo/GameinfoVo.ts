class GameinfoVo extends BaseVo
{
	public jvip = 0;//是否购买协同模式
	public svip = 0;//是否购买高级通行证
	public royalPass : any = null;
	public jnum = 0; // 当前使用的协同次数
	public buynum = 0; // 当天购买协同次数  
	public gnum = 0; // 今日已经领取协同宝箱次数
	public stepGuild : any = {};
	public newerGuild = 0;//步骤id
	public stepId=0;
	public regdt:number;
	public zengfu:number = 0;

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
		this.jvip = 0;
		this.svip = 0;
		this.stepId = 0;
		this.royalPass = null;
		this.stepGuild = {};
		this.newerGuild = 0;
		this.regdt = 0;
	}
}