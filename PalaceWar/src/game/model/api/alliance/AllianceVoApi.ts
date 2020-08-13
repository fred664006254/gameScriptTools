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
		if(Api.playerVoApi.getPlayerLevel()>=Config.AlliancebaseCfg.unlock)
		{
			boo=true;
		}
		else
		{
			boo=false;
		}
		return  boo
	}

	/**
	 * 当前是否可以打开 帮会view， 如果已开启可以打开
	 */
	public getOpenViewMessage():string
	{
		if (!this.isShowNpc()) {
			return this.getLockedString();
		}
		else{
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.isInNeedShowEffect("alliance")){
					return this.getLockedString();
				}
			}
		}
		return null;
	}

	public checkNpcMessage():boolean
	{
		if (this.isShowNpc()) {
			let vo = this.getAllianceVo();
			let myAllianceVo = this.getMyAllianceVo();
			if( myAllianceVo && myAllianceVo.po <= 2 && vo && vo.apply && vo.apply[0] || (Api.allianceWeekVoApi && Api.allianceWeekVoApi.checkInBattleRedDot()) || this.checkDonateRed())
			{
				return true;
			}
		}
		return false;
	}

	//每日建设红点
	public checkDonateRed():boolean{
		let mgid = Api.playerVoApi.getPlayerAllianceId();
		if (!mgid){
			return false;
		}
		if (Api.switchVoApi.checkOpenMonthcardDonate()){
			if (Api.shopVoApi.ifBuyMonthCard()){
				if (!Api.allianceVoApi.getIsMonthcardDonatet()){
					return true;
				}
			}
			else{
				if (!this.getIsDonatet()){
					return true;
				}
			}
		}
		else{
			if (!this.getIsDonatet()){
				return true;
			}
		}
		return false;
	}

	public isShowFreeBuidRed():boolean
	{
		if (Api.switchVoApi.checkOpenMonthcardDonate() && Api.shopVoApi.ifBuyMonthCard() && !Api.allianceVoApi.getIsMonthcardDonatet())
		{
			return true;
		}

		return false;
	}

	public getLockedString():string
	{
		
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.AlliancebaseCfg.unlock)]);
	}

	public getIsDonatet():boolean
	{
		let myVo = Api.allianceVoApi.getMyAllianceVo();
		if(myVo && myVo.donate.id){
			if(myVo.donate.et >= App.DateUtil.getWeeTs(GameData.serverTime))
			{
				return true;
			}
		}
		return false;
	}

	public getIsMonthcardDonatet():boolean
	{
		let myVo = Api.allianceVoApi.getMyAllianceVo();
		if(myVo && myVo.donate.monthcardDonate){
			if(myVo.donate.monthcardEt >= App.DateUtil.getWeeTs(GameData.serverTime))
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
			let needAsset = null;
			let needGem = null;
			if(String(data[4]).indexOf("e") < 0)
			{
				let bossCfg =  Config.AlliancebossCfg.getAllianceCfgByLv(data[4]);
				needAsset = bossCfg.needAsset;
				needGem = bossCfg.needGem;
			}
			else
			{
				let bossCfg =  Config.AllianceelitebossCfg.getAllianceCfgByLv(data[4]);
				needAsset = bossCfg.eliteNeedAsset;
				needGem = bossCfg.eliteNeedGem;
			}


			// 财富  
			if(data[3]==1)
			{
			
				var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[4]);  
				str =LanguageManager.getlocal("alliancelogdes"+data[0],[needAsset+"",bossName]);
				return str;
			}
			else// 元宝
			{
				var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[4]);  
				str =LanguageManager.getlocal("alliancelogdes"+12,[needGem+"",bossName]);
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
	
			var bossName =LanguageManager.getlocal("allianceBoss_monsterName"+data[3]);  
			var itemvo:any = GameData.formatRewardItem(data[4]);
			var  bossCfg =null;	
			if(String(data[3]).indexOf("e") >= 0 )
			{
				bossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(data[3]);
				str =LanguageManager.getlocal("alliancelogdes"+data[0],[bossName,"0","0",String(data[5]),itemvo[0]._name+"x"+itemvo[0].num+""]);
			}
			else
			{
				bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[3]);
				str =LanguageManager.getlocal("alliancelogdes"+data[0],[bossName,bossCfg.addExp+"",	bossCfg.addAsset+"",data[5]+"",itemvo[0]._name+"x"+itemvo[0].num+""]);

			}
			
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
		if (data[0] == 16) {
			str = LanguageManager.getlocal("alliancelogdes16", [data[2], LanguageManager.getlocal("allianceWeekEndViewNpcName" + data[3])]);
			return str;
		}
		//花费 {1} 帮会财富，购买了帮会策略 {2}，今日帮会任务{3}加成 {4}
		if (data[0] == 17){
			let buffId = data[3];
			let buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(""+buffId);
			// let bnum = Api.allianceTaskVoApi.getBuffBuyTimes(buffId);
			let bnum = Number(data[4]);
			let costV = data[5];
			let addV = (buffcfg.value * 100); //(addV).toFixed(1)
			if(bnum > 0)
			{
				addV *= bnum;
			}
			let addStr = "";
			if(buffcfg.type.length == 1)
			{
				addStr = LanguageManager.getlocal("servantInfo_speciality" + buffcfg.type[0]);
			}else{
				addStr = LanguageManager.getlocal("servantInfo_speciality7");
			}
	    
			// if(bnum < buffcfg.costAsset.length){
			// 	costV = buffcfg.costAsset[bnum -1];
			// }else{
			// 	costV = buffcfg.costAsset[buffcfg.costAsset.length -1];
			// }
			let buffName = LanguageManager.getlocal("allianceTaskBuffName"+buffId);
			str =LanguageManager.getlocal("alliancelogdes"+data[0],[costV+"", buffName, addStr, ""+((addV).toFixed(1))]);
			return str;
		}
		if (data[0] == 18){
			//领取了帮会任务 {1} 完成奖励，帮会财富增加 {2}
			let taskData = Config.AlliancetaskCfg.getAllianceTaskById(""+data[3]);
			let taskName = LanguageManager.getlocal("allianceTaskName" + data[3]);
			str = LanguageManager.getlocal("alliancelogdes"+data[0], [taskName, ""+taskData.completeAsset]);
			return str;
		}
		if (data[0] == 19){
			//花费 {1} 帮会财富，购买了帮会加成，今日勤王除恶战斗加成提升至{3}
			let addV = Math.round(Number(data[3]) * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
			str = LanguageManager.getlocal("alliancelogdes"+data[0], [data[4], ""+addV]);
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
		if (this.getOpenViewMessage()){
			App.CommonUtil.showTip(this.getOpenViewMessage());
			return;
		}
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
	/** 获取加入帮会时间 */
	public getJoinTime():number
	{
		if (this._myAllianceVo && this._myAllianceVo.joint) {
			return this._myAllianceVo.joint;
		}
		return 0;
	}
	/** 今日帮会踢人次数 */
	public getKickCount():number
	{
		if (this._allianceVo && this._allianceVo.info && this._allianceVo.info.kickNum) {
			return this._allianceVo.info.kickNum;
		}
		return 0;
	}
	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("alliance",10);
	}

	public getExpLog():any[]
	{
		return this._allianceVo.explog;
	}

	public getAllianceTaskPKTimes(servantId:string)
	{
		let taskservant =  this._myAllianceVo.info.taskservant;
		if(taskservant &&  taskservant[servantId])
		{
			return taskservant[servantId];
		}
		
		return 0;
	}

	public isShowConfirmWhenJoin()
	{
		let regdt = Api.gameinfoVoApi.getRegdt();
		if(GameData.serverTime - regdt >= 60*60*24*7)
		{
			return true;
		}
		return false
	}
	/**帮会累计充值 跳转到正在进行的活动 */
	public getInProgressRechargeTotal(arr:BaseDisplayObjectContainer[]){
		for (let i in arr){
			let vo = <AcAllianceRechargeTotalVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGETOTAL, arr[i].bindData.code);
			if (vo.isActivityPeriod()){
				return arr[i];
			}
		}
		return arr[0];
	}
	/**帮会充值 跳转到正在进行的活动 */
	public getInProgressRechargeCount(arr:BaseDisplayObjectContainer[]){
		for (let i in arr){
			let vo = <AcAllianceRechargeCountVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGECOUNT, arr[i].bindData.code);
			if (vo.isActivityPeriod()){
				return arr[i];
			}
		}
		return arr[0];
	}

	/**boss是否能开启精英 */
	public checkBossCanOpenElite(bossId:string){
		let eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
		let alliVo = this._allianceVo;
		let eliteBossId = 'e'+bossId;
		let maxEliteBossLv = Config.AllianceelitebossCfg.getMaxLength();
		if(alliVo.level >= eliteNeedLv
			&& alliVo.boss.clear
			&& Number(bossId)<= maxEliteBossLv 
			&& alliVo.boss[eliteBossId] == null)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**获取无限boss开启等级 */
	public getLimitlessBossOpenLevel():number{
		let data = Config.AlliancebossCfg.getAllainceCfgIdList();
		for (let key in data){
			let cfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[key]);
			if (cfg.attribution1){
				return cfg.needAllianceLv;
			}
		}
		return 0;
	}

	/**获取无限boss id */
	public getLimitlessBossId():string{
		let data = Config.AlliancebossCfg.getAllainceCfgIdList();
		for (let key in data){
			let cfg = Config.AlliancebossCfg.getAllianceCfgByLv(data[key]);
			if (cfg.attribution1){
				return data[key];
			}
		}
		return null;
	}

	/**是否能开启无限boss */
	public checkOpenLimitlessBoss():boolean{
		let needLv = this.getLimitlessBossOpenLevel();
		let alliVo = this._allianceVo;
		if (needLv > 0 && alliVo && alliVo.level >= needLv && alliVo.boss.eliteClear){
			return true;
		}
		return false;
	}

	/**当日无限boss是否结束 */
	public checkLimitlessBossIsEnd():boolean{
		let nextDay = App.DateUtil.getWeeTs(GameData.serverTime) + 86400; 
		let et = nextDay - 30 * 60;
		if (GameData.serverTime >= et && GameData.serverTime < nextDay){
			return true;
		}
		return false;
	}
	
	public dispose():void
	{
		this._allianceVo = null;
		this._myAllianceVo = null;

		super.dispose();
	}
	
}