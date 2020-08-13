class AcBaseVo extends BaseVo
{
	/**
	 * 活动开始时间
	 */
	public st:number;

	/**
	 * 活动结束时间
	 */
	public et:number;

	/**
	 * 活动id
	 */
	public aid:string;
	
	/**
	 * 活动版本号
	 */
	public code:number;

	/**
	 * 活动的值，不同活动意思不一样
	 */
	public v:number;

	public atype:string;


	// public get aType():string
	// {
	// 	return "";
	// }



	public get aidAndCode():string
	{
		return this.aid+"-"+this.code;
	}
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

	public get config()
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
	}

	/**
	 * 活动开始结束时间，格式：x月x日-x月x日
	 */
	public get acTime():string
	{
		return App.DateUtil.getOpenLocalTime(this.st,this.et,false);
	}

	/**
	 * 活动开始结束时间，格式：x月x日-x月x日
	 */
	public get acTimeAndHour():string
	{	
		let et = this.et
		if(this.config && this.config.extraTime){
			et = this.et - this.config.extraTime*86400;
		}
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	/**
	 * 活动展示期
	 */
	public checkIsInEndShowTime():boolean
	{	
		let v:boolean = false;
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		// extraTime = 10;
		if(extraTime && (GameData.serverTime > (this.et - extraTime*86400)))
		{
			v = true;
		}
		return v;
	}

	public getShowTime():number
	{	
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		let v:number = GameData.serverTime - (this.et - extraTime*86400);
		return v;
	}

	/**
	 * 活动开始结束时间，显示：活动日期：x月x日-x月x日
	 */
	public getAcLocalTime(showHour?:boolean, color?:string):string
	{
		if (color) {
			return LanguageManager.getlocal("acLocalTime",["<font color=" + color + ">" + (showHour?this.acTimeAndHour:this.acTime) + "</font>"]);
		} else {
			return LanguageManager.getlocal("acLocalTime",[showHour?this.acTimeAndHour:this.acTime]);
		}
	}

	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown():string
	{
		return App.DateUtil.getFormatBySecond(Math.max(0,(this.et - GameData.serverTime)),1);
	}
	/**
	 * 活动结束倒计时，显示：活动结束倒计时00：00：00
	 */
	public get acLocalCountDown():string
	{
		return LanguageManager.getlocal("acLocalCountDown",[this.acCountDown]);
	}

	/**
	 * 是否在活动开始期间，true：在期间，false:已结束或者未开始
	 */
	public get isStart():boolean
	{
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime))
		{
			return true;
		}
		return false;
	}
	/**
	 * 是否显示活动icon，设置后自动显示或者隐藏活动
	 */
	public get isShowIcon():boolean
	{
		return true;
	}

	/**
	 * 检测活动是否显示红点，true：显示
	 */
	public get isShowRedDot():boolean
	{
		return false;
	}
	/**
	 * 获取天数显示奖励  num＝1 累天充值
	 */
	public getShowNum(num:number=0):number
	{
		if(this.atype=="7"||num==1)
		{
			var endTime = App.DateUtil.getWeeTs(this.et);
			var starTime = App.DateUtil.getWeeTs(this.st);
			var tNum:number = Math.ceil((endTime-starTime)/86400);
			if(this.et==endTime)
			{
				return	tNum;	
			}
			else
			{
				return tNum+1;	
			}
		
		}
	}

	/**
	 * 当前活动是否已经结束
	 */
	public get isEnd():boolean
	{
		return GameData.serverTime>this.et;
	}
 

	public dispose():void
	{
		
	}
}