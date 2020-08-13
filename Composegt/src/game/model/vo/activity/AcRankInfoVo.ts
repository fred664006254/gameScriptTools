class AcRankInfoVo extends BaseVo
{
	public activeId:string = "";
	public myrank:any = null;
	public rankList:Array<any> = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data.activeId)
		{
			this.activeId = data.activeId;
		}
		if(data.myrank)
		{
			this.myrank = data.myrank;
		}
		if(data.rankList)
		{
			this.rankList = data.rankList;
		}
	}

	/**
	 * 排行榜面板标题
	 */
	public getTitleStr():string
	{
		if(this.activeId.indexOf("limitedreward"))
		{
			return "userProgressTitle";
		}
		return "";
	}

	/**
	 * 活动进度标题
	 */
	public getProgressTitle():string
	{
		if(this.activeId.indexOf("limitedreward"))
		{
			return LanguageManager.getlocal("limitedTitle",[this.getProgressDesc()]);
		}
		return "";
	}

	/**
	 * 活动进度描述
	 */
	public getProgressDesc():string
	{
		if(this.activeId.indexOf("limitedreward"))
		{
			return LanguageManager.getlocal("ac"+App.StringUtil.firstCharToUper(this.activeId)+"_Title");
		}
		return "";
	}

	public dispose():void
	{
		this.activeId = "";
		this.myrank = null;
		this.rankList = null;
	}
}