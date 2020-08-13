/**
 * 成就vo
 * author dky
 * date 2017/11/4
 * @class AchievementInfoVo
 */
class AchievementInfoVo extends BaseVo
{
	// id
	public id:string ;
	// 成就阶段
	public stage:number = 0;
	// 成就达成的值
	public v:number = 0;

	// "成就领取情况0未完成 1已完成 2已领取",
	public f:number = 0;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.stage != null)
			{
				this.stage = Number(data.stage);
			}
			if(data.v != null)
			{
				this.v = Number(data.v);
			}
			if(data.f != null)
			{
				this.f = Number(data.f);
			}
			
		}
	}
	/**成就名称 */
	public get name():string
	{
		return this.cfg.name;
	}

	/**成就icon */
	public get icon():string
	{
		return this.cfg.acIcon;
	}
	/**成就Nameicon */
	public get nameIcon():string
	{
		return this.cfg.nameIcon;
	}

	public get cfg()
	{

		return Config.AchievementCfg.getAchievementCfgById(this.id.toString());
	}

	public dispose():void
	{
		this.id  = null;
		this.stage = 0;
		this.v = 0;
		this.f = 0;
	}
}