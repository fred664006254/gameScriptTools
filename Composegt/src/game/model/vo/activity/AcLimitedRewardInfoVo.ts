class AcLimitedRewardInfoVo  extends BaseVo
{
	/**
	 * 类型
	 */
	public type:number = 0;
	/**
	 * 档位
	 */
	public id:number = 0;
	/**
	 * 该档位需要的条件
	 */
	public condition:number = 0;

	/**
	 * 每一档对应奖励
	 */
	public reward:string = "";

	public aid:string = "";
	public code:number = 0;
	public level:any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{

	}

	/**
	 * 活动名称
	 */
	public get getTitleStr():string
	{
		return LanguageManager.getlocal("ac"+App.StringUtil.firstCharToUper(this.aid+"-"+this.type)+"_Title");
	}

	public dispose():void
	{
		this.type = 0;
		this.id = 0;
		this.condition = 0;
		this.reward = "";
		this.aid = "";
		this.code = 0;
		this.level = null;
	}
}