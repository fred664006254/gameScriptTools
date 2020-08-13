
class AcBeTheKingVo extends AcBaseVo
{
	// private ainfo:any;

    private tflag:number;
    private pflag:number;
    private ainfo: {rewardinfo:{},lastday: 1575734400,task: {string:number}[]};						//task任务 --rewardinfo奖励
    private info: {buff:number,v: number,cbacknum: number ,cnum: number,voteinfo: {},powv: number}; //v皇权值 buff人望 cnum人气票 cbacknum返人气票 voteinfo投票
	
	private _rankList:any;
	public zidgroup:any ;
	public mepoint: number
	public merank: number =999999;
	public constructor() 
	{
		super();
	}
    private  get cfg ():Config.AcCfg.BeTheKingCfg
    {
		let cfg = <Config.AcCfg.BeTheKingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg;
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BEKING_TASK);
	}

	public get kingPower() //皇权值
	{
		return this.info.v;
	}

	public get buff() //人望
	{
		return this.info.buff;
	}

	public get cnum() //人气票
	{
		return this.info.cnum;
	}

	public get cbacknum() //返人气票
	{
		return this.info.cbacknum;
	}

	public isDuringPreview()
	{
		let presecs = GameData.serverTime - this.st;
		if( this.st < GameData.serverTime &&  presecs <= 86400  )
		{
			return true
		}
		return false ;
	}
	//如果return 0 ，则表示过了预告期
	public getPreTimeStr():string
	{
		let presecs = this.st + 86400 - GameData.serverTime ;
		if(presecs >= 0 )
		{
			return App.DateUtil.getFormatBySecond(presecs  ,1);
		}
		return "0" ;
	}
	
	public getBattleTimeStr()
	{
		let presecs = GameData.serverTime - this.st;
		let est = this.st - GameData.serverTime;
		if(presecs > 86400  && est >= 86400)
		{
			return App.DateUtil.getFormatBySecond(est - 86400,2);
		}
	}

	// public isTaskUnLocked(tid:string)
	// {

	// }

	public isVoteEnable(uid:string)
	{
		let voteinfo = this.info.voteinfo;
		let len = Object.keys(voteinfo).length;
		if(len >= 3 && !voteinfo[uid]){
			return false;
		}
		return true;
	}

	public getVoteNum(uid:string)
	{
		let num = this.info.voteinfo[uid] || 0;
		return num;
	}

	public getTaskInfo()
	{
		return this.ainfo.task;
	}

	public getTaskValueByReuestType(queType:string)
	{
		return this.ainfo.task[queType] || 0 ;	
	}
	public isgetTaskReward(stageId:string):boolean
	{
		return this.ainfo.rewardinfo[stageId] ? true : false;
	}
	//返回最大的解锁任务id
	public getMaxTaskId()
	{
		let keys = Object.keys(this.ainfo.task);
		return keys[keys.length-1];
	}

	public setRankInfos(ranks)
	{
		this._rankList = ranks;
	}
	
	public getRankInfos():{uid: number, name: string, cheer_num: number, "zid": number,"v": number}[]
	{
		return this._rankList;
	}

	public getCdTxtStr()
	{
		if(this.isDuringPreview()){
			//  this.st + 86400*3 - GameData.serverTime
			return LanguageManager.getlocal("betheKing_iconTxt1",[this.getPreTimeStr()]);
		}else if(this.et - GameData.serverTime >86400){
			let str  = App.DateUtil.getFormatBySecond(this.et - GameData.serverTime -86400 ,1);
			return LanguageManager.getlocal("betheKing_iconTxt2",[str]); 
		}else{
			return LanguageManager.getlocal("acRank_acCDEnd"); 
		}
	}


	public getPowerAddValue()
	{
		let gem = this.buff;
		let cost = this.config.cost;
		let v1 = this.config.prestigeRate1;
		let v2 = this.config.prestigeRate2;
		let v3 = this.config.prestigeRate3;

		let plus = gem == 0 ? 0 : (gem / (gem * v1 + v2) + v3);     //0.25;
		let plusStr = Math.round(plus * 10000) / 100 + "";
		return plusStr;
	}

	public getConvertStatus()
	{
		let servantExchange = this.cfg.servantExchange["1"];
		let servantID = servantExchange.servantID;
		if(Api.servantVoApi.getServantObj(servantID)){
			return 2;
		}else{
			let needItem = servantExchange.needItem;
			let iconTab = needItem.split("_");
			let needN = Number(iconTab[2]);
			let owdn = Api.itemVoApi.getItemNumInfoVoById(iconTab[1]);
			if (owdn >= needN ) {
				return 1;
			}
		}
		return 0;
	}
    public dispose():void 
	{ 
		this.zidgroup = null;
		super.dispose();
	}
}