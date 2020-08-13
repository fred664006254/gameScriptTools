/**
 * 帮会战斗管理系统api
 * author qianjun
 */

class AllianceWarVoApi extends BaseVoApi{
	private _warLog : any[] = [];
	public id : number = 0;//帮会id
	public info : any = {};// 阵容信息
	public tinfo : any = {};// 对手的阵容 
	public num : number = 0;// 参与人数
	public tid : number = 0;//上一次匹配的对手
	public turn : number = 0;//上一次参加的轮次
	public monday : number = 0;//周一零点时间戳
	public fight : number = 0;  //— 1为参战成功，0为未参战
	public win : number = 0;   //— 1为胜利
	public getrewards : number = 0; //— 是否领取帮会奖励
	public lastday : number = 0;
	public updated_at : number = 0;
	public oinfo : any = {};

	private myalliancewar : any = {}//我的相关信息


	public constructor(){
		super();
	}

	public initAllianceWarData(data):void{
		for(let i in data){
			if(typeof this[i] != 'undefined'){
				this[i] = data[i];
			}
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCEWARFRESH);
	}

	public initMyAllianceWarData(data):void{
		this.myalliancewar = {};
		for(let i in data){
			this.myalliancewar[i] = data[i];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCEWARFRESH);
	}

	public getMyAllianceWarInfo():{getrewards : number, info : any, lastYm : number, lastday : number, servant : any, uid : number}{
		return this.myalliancewar;
	}

	/**
	 * 获取倒计时
	*/
	public getCountDown():number{
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let et = today0 + 24 * 3600;
		let period = this.getWarPeriod();
		switch(period){
			case 1:
				let weekday = this.getTodayWeek();
				if(weekday > 5){
					et = today0 + (8 - weekday) * 3600 * 24
				}
				break;
			case 2:
				et = today0 + 3600;
				break;
			case 3:
				et = today0 + 12 * 3600 + 300;
				break;
		}
		return et - GameData.serverTime;
	}
	
	/**
	 * 判断现在是星期几
	*/
	public getTodayWeek():number{
		let prepare = this.monday;
		let Today = Math.floor((GameData.serverTime - prepare) / 86400);
		return Today + 1;
	}

	/**
	 * 获取当前时间阶段 1备战期 2战斗准备期 3战斗展示期 4战斗奖励结算
	*/
	public getWarPeriod():number{
		let weekDay = this.getTodayWeek();
		let period = 0;
		if(Config.AlliancewarCfg.preWarTime.indexOf(weekDay) > -1){
			period = 1;
		}
		else{
			let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
			let sub = GameData.serverTime - today0;
			if(sub >= 0 && sub < 3600){
				period = 2;
			}
			else if(sub >= 3600 && sub < (12 * 3600 + 300)){
				period = 3;
			}
			else{
				period = 4;
			}
		}
		return period;
	}

	/**
	 * 获取本次战斗的帮会总战力
	*/
	public getMyAllianceTotalAttr():number{
		return 1000000;
	}

	/**
	 * 获取本次战斗出战门客
	*/
	public getMyWarServant():string{
		return Config.ServantCfg.getServantItemById('1002').name;
	}

	/**
	 * 获取本次战斗出战门客的战斗力
	*/
	public getMyWarServantAttr():number{
		return Api.servantVoApi.getServantObj('1002').total;
	}

	/**
	 * 获取当前帮会战斗记录最新一条
	*/
	public getLastWarLog():{winserver : number, winalliancename : string, wintotalattr : number, loseserver : number, losealliancename : string, losetotalattr : number, time : number}{
		this.getAllWarLog();
		return this._warLog[0];
	}

	/**
	 * 获取所有帮会战斗记录
	*/
	public getAllWarLog():{winserver : number, winalliancename : string, wintotalattr : number, loseserver : number, losealliancename : string, losetotalattr : number, time : number}[]{
		this._warLog = [];
		for(let i = 0; i < 5; ++ i){
			this._warLog.push({
				winserver : i + 1, 
				winalliancename : `胜利${i}`, 
				wintotalattr : 1000 * (i + 1), 
				loseserver : (i + 1) * 10, 
				losealliancename : `失败${i}`, 
				losetotalattr : 99 * i, 
				time : 1538990801 + i
			});
		}
		this._warLog.sort((a,b)=>{
			return b.wintotalattr - a.wintotalattr;
		});
		return this._warLog;
	}

	/**
	 * 获取此次帮会对阵信息 1 自己帮会的信息 2敌方帮会的
	*/
	public getThisWarLog(index : number):{server : number, allianceName : string, attendLog : any[], totalattr : number, allilevel : number}{
		let arr = [];
		let isMy = index == 1;
		let sourceObj = isMy ? this.info : this.tinfo.info;
		let obj : any = {};
		let myAllianceVo =  Api.allianceVoApi.getAllianceVo();
		obj['server'] = isMy ? Api.mergeServerVoApi.getTrueZid() : (this.tinfo.zid ? this.tinfo.zid : 0);
		obj['allianceName'] = isMy ? Api.playerVoApi.getPlayerAllianceName() : (this.tinfo.name ? this.tinfo.name : LanguageManager.getlocal('nothing'));
		obj['attendLog'] = this.getWarVsLog(index);
		obj['totalattr'] = isMy ? this._allMyTotalAttr : this._allOtherTotalAttr;
		obj['allilevel'] = isMy ? myAllianceVo.level : (this.tinfo.level ? this.tinfo.level : 0);
		return obj;
		// for(let i = 1; i < 3; ++ i){
		// 	let log = [];
		// 	for(let j = 1; j < 8; ++j){
		// 		log.push({
		// 			name : `随便${j}`,
		// 			allipos : Math.min(j,4),
		// 			zid : i == 1 ? Api.mergeServerVoApi.getTrueZid() : 100,
		// 			time : 1,
		// 			uid : 1000 + j,
		// 			alliname : `天下会`
		// 		});
		// 	}
		// 	log.sort((a,b)=>{
		// 		if(a.allipos == b.allipos){
		// 			if(a.time == b.time){
		// 				return a.uid - b.uid;
		// 			}
		// 			else{
		// 				return a.time - b.time;
		// 			}
		// 		}
		// 		else{
		// 			return a.allipos - b.allipos;
		// 		}
		// 	});

		// 	arr.push({
		// 		server : i, 
		// 		allianceName : `第${i}帮会`, 
		// 		attendLog : log, 
		// 		totalattr : 99999,
		// 		allilevel :  i == 1 ? Api.allianceVoApi.getAllianceVo().level : 2
		// 	});
		//}
		//return arr[index];
	}
	/**
	 * 获取当前阵容信息 1己方 2敌方
	*/
	private _allMyTotalAttr = 0;
	private _allOtherTotalAttr = 0;

	public getWarVsLog(type : number):{}[]{
		let sourceObj = type == 1 ? this.info : this.tinfo.info;
		let arr = [];
		let total = 0;
		for(let i in sourceObj){
			let unit = sourceObj[i];
			total += unit.dps;
			let level = type == 1 ? Api.allianceVoApi.getAllianceVo().level : this.tinfo.level;
			let extra = 0;//this.getAlliancePosAdd(level, unit.po);
			arr.push({
				servantId : unit.servant,
				plan : unit.stra,
				attr : unit.dps * (1 + extra),
				name : unit.name,
				uid : i,
				curHp : unit.dps * (1 + extra),
				allipos : unit.po,
				alliname : type == 1 ? Api.playerVoApi.getPlayerAllianceName() : this.tinfo.name,
				zid : type == 1 ? Api.mergeServerVoApi.getTrueZid() : this.tinfo.zid,
				time : unit.st,
			});

			// if(unit.stra == 1 && unit.servant2){
			// 	total += unit.dps2;
			// 	arr.push({
			// 		servantId : unit.servant2,
			// 		plan : 1,
			// 		attr : unit.dps2 * (1 + extra),
			// 		name : unit.name,
			// 		uid : i,
			// 		curHp : unit.dps2 * (1 + extra),
			// 		allipos : unit.po,
			// 		alliname : type == 1 ? Api.playerVoApi.getPlayerAllianceName() : this.tinfo.name,
			// 		zid : type == 1 ? Api.mergeServerVoApi.getTrueZid() : this.tinfo.zid,
			// 		time : unit.st,
			// 	});
			// }
		}
		if(type == 1){
			this._allMyTotalAttr = total;
		}
		else{
			this._allOtherTotalAttr = total;
		}

		arr.sort((a,b)=>{
			if(a.allipos == b.allipos){
				if(a.time == b.time){
					return a.uid - b.uid;
				}
				else{
					return a.time - b.time;
				}
			}
			else{
				return a.allipos - b.allipos;
			}
		});
		return arr;
	}

	/**
	 * 获得Npc提示的类型
	 */
	public getNpcTalkType():number
	{
		let periodTper =  this.getWarPeriod();
		switch(periodTper)
		{
			case 1:
				if(!this.isSuccessJoin())
				{
					return 1;
				}
				else if(this.isSuccessJoin()&&this.info[Api.playerVoApi.getPlayerID()] == null && this.isJoin())
				{
					return 2;
				}
				else if(this.isSuccessJoin()&&(this.info[Api.playerVoApi.getPlayerID()] || this.isJoin() == false))
				{
					return 3;
				}
				break;
			case 2:
				if(this.fight == 0)
				{
					return 8;
				}
				return 9;
			case 3:
				if(this.fight == 1 && Object.keys(this.tinfo).length > 0)
				{
					return 4;
				}
				else if(this.fight == 1 && Object.keys(this.tinfo).length == 0)
				{
					return 5;
				}
				else if(this.fight == 0)
				{
					return 8;
				}
				break;
			case 4:
				if(this.win > 0 && this.fight == 1)
				{
					return 6;
				}
				else if(this.win == 0 && this.fight == 1)
				{
					return 7;
				}
				else if(this.fight == 0)
				{
					return 8;
				}
				break;
		}
	}
	/**
	 * 本帮有没有参见帮会站的门客？
	 */
	public isJoin():boolean
	{
		let servantList = Api.servantVoApi.getServantInfoList();
		if((this.myalliancewar&&this.myalliancewar['servant'] == null) ||(this.myalliancewar&&this.myalliancewar['servant']&&this.myalliancewar['servant'].length >= Object.keys(servantList).length))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 * 获得对战的信息
	 */
	public getOtherInfo()
	{
		if(this.tinfo)
		{
			return this.tinfo
		}
		return null;

	}
	/**
	 * 获得自己帮派相关的信息
	 */
	public getMyAllianceInfoList():{po:number,poList:{servant:string,stra:number,st:number,po:number,name:string,dps:number}[]}[]
	{
		//帮主
		let po1List:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[] = [];
		//副帮主
		let po2List:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[] = [];
		//精英
		let po3List:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[] = [];
		//普通成员
		let po4List:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[] = [];
		
		let allPolist:{po:number,poList:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[]}[] = [];
		if(this.info)
		{
			for(let key in this.info)
			{
				let po = {id:key,servant:this.info[key].servant,stra:this.info[key].stra,st:this.info[key].st,po:this.info[key].po,name:this.info[key].name,dps:this.info[key].dps};
				switch(this.info[key].po)
				{
					case 1:
						po1List.push(po)
						continue;
					case 2:
						po2List.push(po)
						continue;
					case 3:
						po3List.push(po)
						continue;
					case 4:
						po4List.push(po)
						continue;
				}
			}
			po1List.sort((a,b)=>{
				return a.st - b.st;
			})
			po2List.sort((a,b)=>{
				return a.st - b.st;
			})
			po3List.sort((a,b)=>{
				return a.st - b.st;
			})
			po4List.sort((a,b)=>{
				return a.st - b.st;
			})
			let allPo1 = {po:1,poList:po1List};
			let allPo2 = {po:2,poList:po2List};
			let allPo3 = {po:3,poList:po3List};
			let allPo4 = {po:4,poList:po4List};
			if(po1List.length > 0)
			{
				allPolist.push(allPo1)
			}
			if(po2List.length > 0)
			{
				allPolist.push(allPo2)
			}
			if(po3List.length > 0)
			{
				allPolist.push(allPo3)
			}
			if(po4List.length > 0)
			{
				allPolist.push(allPo4)
			}
			return allPolist;
		}
		return null;

	}
	/**
	 * 获得总战斗力
	 */
	public getAllFight():number
	{
		let fightValue = 0
		if(this.info)
		{
			for(let i = 0; i < Object.keys(this.info).length;i++)
			{
				let addInfo = Config.AlliancewarCfg.getAddition(this.info[Object.keys(this.info)[i]].po);
				fightValue += Math.floor(this.info[Object.keys(this.info)[i]].dps);
			}
		}
		return fightValue;
	}
	/**
	 * 获得自己派遣门客的名字
	 */
	public getMyServantName():string
	{
		if(this.info)
		{
			if(this.info[Api.playerVoApi.getPlayerID()])
			{
				return Config.ServantCfg.getServantItemById(this.info[Api.playerVoApi.getPlayerID()].servant).name;
			}
		}
		return LanguageManager.getlocal("allianceWarNotServent");
	}
	/**
	 * 获得自己战斗力
	 */
	public getMyFight():number
	{
		if(this.info)
		{
			if(this.info[Api.playerVoApi.getPlayerID()])
			{
				return this.info[Api.playerVoApi.getPlayerID()].dps;
			}
		}
		return 0;
	}
	/**
	 * 	获得自己帮会战的info
	 */
	public getMyInfo()
	{
		if(this.info)
		{
			if(this.info[Api.playerVoApi.getPlayerID()])
			{
				return this.info[Api.playerVoApi.getPlayerID()];
			}
			else
			{
				return null;
			}
		}
		return null;
	}
	/**
	 * 获得参战的人数
	 */
	public getJoinNum():number
	{
		if(this.info)
		{
			return Object.keys(this.info).length;
		}
		return 0;
	}
	/**
	 *  是否胜利
	 */
	public isWin():boolean
	{
		if(this.win == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 *  是否领取帮会奖励
	 */
	public isReceiveAllianceReward():boolean
	{
		if(this.getrewards == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 *  是否领取帮会奖励
	 */
	public isReceiveMyReward():boolean
	{
		if(this.myalliancewar.getrewards == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 * 门客的状态
	 */
	public getServantState(servantId):number
	{
		return this.myalliancewar.servant[servantId];
	}

	public getAlliancePosAdd(level : number, pos : number):number{
		let cfg = Config.AlliancewarCfg.getAllianceOfficer();
		let obj = cfg[level - 1];
		let param = '';
		switch(pos){
			case 1:
				param = 'leader_add';
				break;
			case 2:
				param = 'associate_add';
				break;
			case 3:
				param = 'elite_add';
				break;
			case 4:
				param = 'member_add';
				break;
		}
		return obj[param];
	}
	/**
	 * 是否成功参战(人数够了)
	 */
	public isSuccessJoin():boolean
	{
		
		return this.num >= Config.AlliancewarCfg.servantNum?true:false; 
	}

	public isFight():boolean
	{
		if(this.fight == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 * 上次有没有参加帮会站 可否领取奖励
	 */
	public getOldInfo()
	{
		if(this.oinfo.lastinfo&&Object.keys(this.oinfo.lastinfo).length > 0)
		{
			if(this.oinfo.lastinfo[Api.playerVoApi.getPlayerID()])
			{
				return true;
			}
			else
			{
				return false;
			}


		}
		return false;
	}
	/**
	 * 	领取人
	 */
	public getReceiveRewardName():string
	{
		return this.oinfo.getrewardsname;
	}
	/**
	 * 	称号加成
	 */
	public getAddTitle(id:string):number
	{
		if(this.info[id]&&this.info[id].atkEffect != 0) 
		{
			return Math.round(this.info[id].atkEffect * 100);
		}
		return null;
	}
	public dispose():void{
		this._warLog = [];
		this.info = {};// 阵容信息
		this.tinfo = {};// 对手的阵容 
		this.myalliancewar = {}//我的相关信息
		super.dispose();
	}
	
}