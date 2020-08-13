/**
 * 帮会api
 * author dky
 * date 2017/11/27
 * @class AllianceVoApi
 */
class AllianceVoApi extends BaseVoApi
{
	private _allianceVo:AllianceVo;
	private _myAllianceVo:MyAllianceVo;
	private _allianceMemberVo:AllianceMemberVo;

	public constructor() 
	{
		super();
	}
	public formatData(data:any)
	{

		if(this._allianceVo == null)
		{
			this._allianceVo = new AllianceVo();
		}

	
		this._allianceVo.initData(data)
		super.formatData(data)
	}
	public formatData2(data:any)
	{

		if(this._myAllianceVo == null)
		{
			this._myAllianceVo = new MyAllianceVo();
		}

		if(data.alliance_chat == 0){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,{});
		}
		if(data.alliance_chat == 1){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_BEJOIN,{});
			Api.chatVoApi.clearChat();
			NetManager.chatServerLogin(null,null);
		}
		this._myAllianceVo.initData(data)
		super.formatData(data)
	}
	public formatData3(data:any)
	{

		if(this._allianceMemberVo == null)
		{
			this._allianceMemberVo = new AllianceMemberVo();
		}


		this._allianceMemberVo.initData(data)
		super.formatData(data)
	}
	public getAllianceVo():AllianceVo
	{
		return this._allianceVo;
	}
	public getMyAllianceVo():MyAllianceVo
	{
		return this._myAllianceVo;
	}

	public getAllianceMemberVo():AllianceMemberVo
	{
		return this._allianceMemberVo;
	}

	/**获取成员列表 */
	public getAllianceMemberInfoVoList():Array<AllianceMemberInfoVo>
	{
		let arr:Array<AllianceMemberInfoVo> = new Array();
		let allianceInfoVoObj:Object = this._allianceMemberVo.memberInfoVoObj;
		for(let key in allianceInfoVoObj)
		{
			arr.push(allianceInfoVoObj[key]);
		}
		arr.sort((a:AllianceMemberInfoVo,b:AllianceMemberInfoVo)=>{

				if(a.po == b.po){
					return b.power - a.power;
				}
				return Number(a.po) - Number(b.po)  ;
				// return 0;
			});
		return arr;
	}
	/**获取转让帮主列表 */
	public getAllianceTurnVoList():Array<AllianceMemberInfoVo>
	{
		let arr:Array<AllianceMemberInfoVo> = new Array();
		let allianceInfoVoObj:Object = this._allianceMemberVo.memberInfoVoObj;
		for(let key in allianceInfoVoObj)
		{
			let lastDay =  (GameData.serverTime - allianceInfoVoObj[key].logindt)/86400
			if(allianceInfoVoObj[key].po !=1 && lastDay < 3){
				arr.push(allianceInfoVoObj[key]);
			}
			
		}
		return arr;
	}

	/**获取成员Id获取成员列表 */
	public getAllianceMemberInfoById(id:any):AllianceMemberInfoVo
	{
		let arr:AllianceMemberInfoVo;
		let allianceInfoVoObj:Object = this._allianceMemberVo.memberInfoVoObj;
		for(let key in allianceInfoVoObj)
		{	
			if(allianceInfoVoObj[key].uid == id){
				return allianceInfoVoObj[key];
			}
			
			
		}
		return null;
		
	}

	/**获取副帮主数量 */
	public getAlliancePo2Num():number
	{	
		let num = 0;
		let memList = this.getAllianceMemberInfoVoList()
		for (var index = 0; index < memList.length; index++) {
			var element = memList[index];
			if(element.po == 2){
				num ++;
			}
		}
		return num;
	}


	/**获取精英 */
	public getAlliancePo3Num():number
	{
		let num = 0;
		let memList = this.getAllianceMemberInfoVoList()
		for (var index = 0; index < memList.length; index++) {
			var element = memList[index];
			if(element.po == 3){
				num ++;
			}
		}
		return num;
	}

	public isShowNpc():boolean
	{
		let boo:boolean =false;
		if(Api.composemapVoApi.getMaxLv()>=Config.AlliancebaseCfg.unlock)
		{
			boo=true;
		}
		else
		{
			boo=false;
		}
		return  boo
	}

	public getLockedString():string
	{
		
		return LanguageManager.getlocal("composeUnlockFuncDesc",[Config.AlliancebaseCfg.unlock+""]);
	}

	public getIsDonatet():boolean
	{
		let myVo = Api.allianceVoApi.getMyAllianceVo();
		if(myVo.donate.id){
			if(myVo.donate.et > App.DateUtil.getWeeTs(GameData.serverTime))
			{
				return true;
			}
		}
		return false;
	}
	public getStr(data:any):string
	{
		let cfg = Config.AlliancebaseCfg.contributeList;
		let str ="";
		// 成功创建了 {1} 帮会
		if(data[0]==1)
		{
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[data[3]]);
			return str;

		}
		// "帮会成功升级至 {1}",
		if(data[0]==2)
		{
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[data[3]]);
			return str;
		}

		
		// "进行了 {1}，获得帮会经验{2}，帮会财富{3}，个人贡献{4}",
		if(data[3]&&data[0]==4)
		{	
			var currcfg =cfg[data[3]];
			var str1 =LanguageManager.getlocal("allianceBuildName"+data[3]);
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[str1,currcfg.exp+"",currcfg.asset+"",currcfg.contribution+""]);
			if(data[4])
			{
				str =LanguageManager.getlocal("alliancelogdes4_1",[str1,currcfg.contribution+""]);
			}
			return str;
		}

		// "花费 {1} 帮会财富，开启了 {2}，各位大人赶快前往抵御BOSS",
		if(data[0]==5)
		{
			var  bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[4]);
			// 财富  
			if(data[3]==1)
			{
			
				var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[4]);  
				str =LanguageManager.getlocal("alliancelogdes"+data[0],[bossCfg.needAsset+"",bossName]);
				return str;
			}
			else// 元宝
			{
				var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[4]);  
				str =LanguageManager.getlocal("alliancelogdes"+12,[bossCfg.needGem+"",bossName]);
				return str;
			}
		
		}

		// 将帮会改名为 {1}"
		if(data[0]==6)
		{
			// 财富  
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[data[3]]);
			return str;
		}
		// "alliancelogdes7":"击杀了 {1}，帮会经验+{2}，帮会财富+{3}，个人贡献+{4}，{5}",5是道具 一个
		if(data[0]==7)
		{
			var  bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[3]);
			var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[3]);  
			var itemvo:any = GameData.formatRewardItem(data[4]);
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[bossName,bossCfg.addExp+"",	bossCfg.addAsset+"",data[5]+"",itemvo[0]._name+"x"+itemvo[0].num+""]);
			return str;
		}
		
		//  "alliancelogdes10":"被 {1} 移出帮会",
		if(data[0]==10)
		{
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[data[3]]);
			return str;
		}

		// "alliancelogdes11":"将 {1} 职位变更为 {2}",
		if(data[0]==11)
		{
			var str2 =LanguageManager.getlocal("allianceMemberPo"+data[3])	 
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[data[4],str2]);
			return str;
		}
		// 帮主长期离线自动禅让，显示格式 【帮主名称】由于长期离线，帮主之位自动转让给【新帮主名称】”
		if(data[0]==12)
		{
			str =LanguageManager.getlocal("alliancelogdes15",[data[2],data[3]]);
			return str;
		}
		if(data[0]==51)
		{
			let timeStr = App.DateUtil.getFormatBySecond(data[1],6);
			let cost = Config.AlliancebaseCfg.infinityNeedAsset;
			let oname = LanguageManager.getlocal("allianceBoss_infinity");
			str =LanguageManager.getlocal("alliancelogdes51",[""+cost,oname]);
			return str;
		}
		str =LanguageManager.getlocal("alliancelogdes"+data[0]);
		return str;
	}

	public getBossStr(data):string
	{
		var str =LanguageManager.getlocal("alliancelogdes13",[data.name,data.dps]);	 
		return str
	}

	public openMainView()
	{
		if(Api.playerVoApi.getPlayerAllianceId() == 0){
			ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW);
		}	
		
	}

	public getServantInfoValue(k:string):number
	{	
		let v:number = this._myAllianceVo.servant[k];
		if (v == null) {
			v = 0;
		}
		return v;
	}

	public getBossHp(k:string):number
	{	
		let v:number = 0;
		if (this._allianceVo.boss && this._allianceVo.boss[k]) {
			v = this._allianceVo.boss[k];
		}
		return v;
	}	
	
	//是否隐藏帮会QQ

	public isHideQQ():boolean
	{	
		if(PlatformManager.checkIsJPSp())
		{
			return true;
		}
		return false;
	}

	public getAllianceTaskPKTimes(servantId:string)
	{
		if (this._myAllianceVo.lastday < App.DateUtil.getWeeTs(GameData.serverTime)) {
			return 0;
		}
		let taskservant =  this._myAllianceVo.info.taskservant;
		if(taskservant &&  taskservant[servantId])
		{
			return taskservant[servantId];
		}
		
		return 0;
	}
	public dispose():void
	{
		this._allianceVo = null;
		this._myAllianceVo = null;

		super.dispose();
	}
}