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

	/**
	 * 是否在展示期排序过
	 */
	public isShowed:boolean = false;

	/**
	 * 
	*/
	public zids:number =0;

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
	 * 活动倒计时，格式：活动倒计时: 49:55:55
	 */	
	public getAcCountDown(timeType:number=1,str1:string="acComm_timeEnd",str2:string="acComm_timeCount"): string {
		let et = this.et - (this.config.extraTime || 0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal(str1);
		}
		return LanguageManager.getlocal(str2, [App.DateUtil.getFormatBySecond((et - GameData.serverTime), timeType)]);
	}
	/**
	 * 活动开始结束时间，格式：活动日期: x月x日-x月x日
	 */
	public getAcTimeAndHour(str:string="acComm_time"):string
	{	
		let et = this.et
		if (this.config && this.config.extraTime) {
			et = this.et - this.config.extraTime * 86400;
		}
		return LanguageManager.getlocal(str, [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
	}	

	/**
	 * 活动展示期
	 */
	public checkIsInEndShowTime():boolean
	{	
		let v:boolean = false;
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		// extraTime = 10;
		if(extraTime && (GameData.serverTime >= (this.et - extraTime*86400)))
		{
			v = true;
		}
		return v;
	}

	/**
	 * 活动在进入展示期那一秒
	 */
	public checkIsAtEndShowTime():boolean
	{	
		let v:boolean = false;
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		if(this.isShowed==false && extraTime && (GameData.serverTime >= (this.et - extraTime*86400)))
		{	
			this.isShowed = true;
			v = true;
		}
		return v;
	}

	/**
	 * 活动展示期 剩余时间
	 */
	public getShowTime():number
	{	
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		let v:number = GameData.serverTime - (this.et - extraTime*86400);
		return v;
	}

	/**
	 * 活动剩余时间 (不含展示期)
	 */
	public getAcResidueTime():number
	{	
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		let v:number = this.et - GameData.serverTime -  extraTime*86400;
		return v;
	}

	/**
	 * 活动是否有展示期
	 */
	public checkIsHasExtraTime():boolean
	{	
		let extraTime:number = Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code);
		return extraTime>0;
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
		return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime),1);
	}

	/**
	 * 活动结束倒计时剔除展示期，格式：00：00：00
	 */
	public get acCountDownNoExtra():string
	{	
		let et = this.et
		if(Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code)){
			et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code)*86400;
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime),1);
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
	 *
	 *是否显示活动banner，默认读取icon状态，如果有活动单独显示banner重写此方法
	 */
	public get isShowBanner():boolean
	{
		return this.isShowIcon;
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
	 * 检测是否活动是否在预告期间
	 */
	public get isPreview():boolean
	{
		let result:boolean=false;
		let tempSt:number=this.st;
		if(Config.IconorderCfg.checkAcInGroup(this.aid))
		{
			let icon:string=Config.IconorderCfg.getIconNameByName(this.aid,String(this.code));
			let gAcVo:AcGroupBaseVo = Api.acVoApi.getGroupAcVo(icon);
			if(gAcVo&&gAcVo.isStart)
			{
				if(this.st>GameData.serverTime&&this.st<gAcVo.et)
				{
					result=true;
				}
			}
		}
		else
		{
			result = (this.st&&GameData.serverTime)?this.st>GameData.serverTime:false;
		}
		return result;
	}

	/**
	 * 获取活动预告时间倒计时，格式为 00:00:00
	 */
	public getPreviewTime():string
	{
		return App.DateUtil.getFormatBySecond((this.st - GameData.serverTime),5);
	}

	/**
	 * 当前活动是否已经结束
	 */
	public get isEnd():boolean
	{
		return GameData.serverTime>this.et;
	}

	/**活动结束通用tip */
	public showAcEndTip():void{
		App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
	}

	/**
	 * 获取活动名称
	 */
	public getlocalName():string
	{
		return Api.acVoApi.getAcLocalName(this.aid,this.code);
	}

	//是否是跨服联赛
	public isCrossLeague():boolean{
		let flag = false;
		let arr = [AcConst.AID_NEWACCROSSSERVERATKRACE,AcConst.AID_ACCROSSSERVERATKRACE, AcConst.AID_ACCROSSSERVERINTIMACY, AcConst.AID_ACCROSSSERVERPOWER, AcConst.AID_ACCROSSSERVERWIFEBATTLE];
		if(arr.indexOf(this.aid) > -1){
			flag = this.zids && this.zids >= 6 && this.zids < 11;
		}
		return flag;
	}

	//是否跨服风云联赛
	public isCrossFengYun():boolean{
		let flag = false;
		let arr = [AcConst.AID_ACCROSSSERVERPOWER, AcConst.AID_ACCROSSSERVERINTIMACY, AcConst.AID_ACCROSSSERVERATKRACE];
		if(arr.indexOf(this.aid) > -1){
			flag = this.zids && this.zids >= 11;
		}
		return flag;
	}

	public dispose():void
	{
		this.isShowed = false;
		this.zids = 0;
	}
}