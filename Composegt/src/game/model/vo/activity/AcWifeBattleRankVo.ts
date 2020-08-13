class AcWifeBattleRankVo extends AcBaseVo
{
	public constructor() 
	{
		super();
	}
	/**
	 * 活动开始结束时间，显示：活动日期：x月x日-x月x日
	 */
	// public getAcLocalTime(showHour?:boolean, color?:string):string
	// {
	// 	if (color) {
	// 		return LanguageManager.getlocal("acLocalTime",["<font color=" + color + ">" + (showHour?this.acTimeAndHour:this.acTime) + "</font>"]);
	// 	} else {
	// 		return LanguageManager.getlocal("acLocalTime",[showHour?this.acTimeAndHour:this.acTime]);
	// 	}
	// }
	/**
	 * 活动开始结束时间，格式：x月x日-x月x日
	 */
	public get acTime():string
	{
		return App.DateUtil.getOpenLocalTime(this.st,this.et-86400,false);
	}
}