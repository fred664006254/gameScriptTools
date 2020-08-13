/**
 * 八王称帝api
 * author shaoliang
 * date 2018/5/9
 * @class EmperorwarVoApi
 */

class EmperorwarVoApi extends BaseVoApi
{	
	public emperorwarVo:EmperorwarVo = null;
	public emperorwarActiveVo:EmperorwarActiveVo = null;
	private _countDownTime : number = 0;
	private _type : number = 0;
	private _getEmpBmData : any[] = [];

	public constructor() {
		super();
	}

	public isInShow():boolean{
		let flag = false;
		let desc = GameData.serverTime - this.emperorwarActiveVo.version;
		if(desc >= 0 - 24 * 3600 && desc < 24 * 3600 * 3){
			flag = true;
		}
		return flag;
	}

	public formatData(data:any):void
	{
		this.setActiveInfo(data);
		//this.setDataInfo(data);
	}

	public setActiveInfo(info:any):void
	{
		if (!this.emperorwarActiveVo)
		{
			this.emperorwarActiveVo = new EmperorwarActiveVo();
		}
		this.emperorwarActiveVo.initData(info);
	}

	public setDataInfo(info:any):void
	{
		if (!this.emperorwarVo)
		{
			this.emperorwarVo = new EmperorwarVo();
		}
		this.emperorwarVo.initData(info);
	}

	public getCountDownTime():number{
		this.getTimeCD();
		return this._countDownTime;
	}

	public setCountDownTime(time){
		this._countDownTime = time;
	}

	public isNotEmptyData(str : string){
		let arr = str.split('_');
		for(let unit of arr){
			let data = this.getBmDataByKV('numb',unit);
			if(data && data.uid){
				return true;
			}
		}
		return false;
	}

	public isInCalSignTime() : boolean{
		let zhuweistart = this.emperorwarActiveVo.getPeriod(1);
		let signEnd = zhuweistart - 300;
		if(GameData.serverTime >= signEnd && GameData.serverTime < zhuweistart){
			return true;
		}
		return false;
	}

	public get type():number{
		return this._type;
	}
	//时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束回放阶段
	public freshFight = false;
	public getRoundFightMsg():void{
		let fightstart1 = this.emperorwarActiveVo.getPeriod(2);
		let fightstart2 = this.emperorwarActiveVo.getPeriod(3);
		let fightstart3 = this.emperorwarActiveVo.getPeriod(4);
		let arr = [this.emperorwarActiveVo.getPeriod(2),this.emperorwarActiveVo.getPeriod(3),this.emperorwarActiveVo.getPeriod(4)];
		for(let time of arr){
			if(GameData.serverTime > time && GameData.serverTime == (time + 1199)){
				if(!this.freshFight){
					this.freshFight = true;
					NetManager.request(NetRequestConst.REQUEST_EMPEROR_BMLIST, {
						version : this.emperorwarActiveVo.version,
						sort : 2// 1报名时间排序 2消耗人望币排序
					});
					break;
				}
			}
		}
	}

	public isShowFightFu():boolean{
		let fightstart1 = this.emperorwarActiveVo.getPeriod(2);
		let fightstart2 = this.emperorwarActiveVo.getPeriod(3);
		let fightstart3 = this.emperorwarActiveVo.getPeriod(4);
		let arr = [this.emperorwarActiveVo.getPeriod(2),this.emperorwarActiveVo.getPeriod(3),this.emperorwarActiveVo.getPeriod(4)];
		for(let time of arr){
			if(GameData.serverTime >= (time + 840) && GameData.serverTime < (time + 1199)){
				return true;
			}
		}
		return false;
	}

	public getEmperorEndCD():any{
		let view = this;
		let cd = null;
		view.judge_time();
		if(view._type > 1 && view._type < 5){
			let end = this.emperorwarActiveVo.getPeriod(5);//battlestart + 3 * cfg.battlelastTime;
			cd = App.DateUtil.getFormatBySecond(end - GameData.serverTime,1);
		}
		return cd;
	}

	private getTimeCD():void{
		let start = this.emperorwarActiveVo.getPeriod(0);//this.emperorwarActiveVo.version;
		let zhuweistart = this.emperorwarActiveVo.getPeriod(1);//start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
		let battlestart = this.emperorwarActiveVo.getPeriod(2);//zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
		let end = this.emperorwarActiveVo.getPeriod(5);//battlestart + 3 * cfg.battlelastTime;
		let type = 0;
		if(GameData.serverTime < start){
			type = 1;
		}
		if(GameData.serverTime >= start && GameData.serverTime < zhuweistart){
			type = 2;
		}
		if(GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart){
			type = 3;
		}
		if(GameData.serverTime >= battlestart && GameData.serverTime < end){
			type = 4;
		}
		if(GameData.serverTime >= end){
			type = 5;
		}
		switch(type){
			case 1:
				this._countDownTime = start - GameData.serverTime;
				break;
			case 2:
				this._countDownTime = zhuweistart - GameData.serverTime - (this.isInCalSignTime() ? 0 : 300);
				break;
			case 3:
				this._countDownTime = battlestart - GameData.serverTime;
				break;
			case 4:
				let fightperiod = this.getFightPeriod2();
				let nexfightstart = this.emperorwarActiveVo.getPeriod(fightperiod+2);
				this._countDownTime = nexfightstart - GameData.serverTime;
				break;
			case 5:
				this._countDownTime = 0;
				break;
		}
		this._type = type;
	}

	public judge_time():number{
		//起始时间
		let cfg = Config.EmperorwarCfg;
		if(this.emperorwarActiveVo.periods.length > 0){
			this.getTimeCD()
		}
		else{
			this._type = 5;
			this._countDownTime = 0;
		}
		return this._type;
	}

	//战争时间段
	public getFightPeriod():number{
		let bmstart = this.emperorwarActiveVo.getPeriod(0);
		let zhuweistart = this.emperorwarActiveVo.getPeriod(1);
		let fightstart1 = this.emperorwarActiveVo.getPeriod(2);
		let fightstart2 = this.emperorwarActiveVo.getPeriod(3);
		let fightstart3 = this.emperorwarActiveVo.getPeriod(4);
		let fightend = this.emperorwarActiveVo.getPeriod(5);
		let nowtime = GameData.serverTime;
		let period = -1;
		if(nowtime >= bmstart && nowtime < fightstart1 + 1199){
			period = 0;
		}
		else if(nowtime >= fightstart1 + 1199 && nowtime < fightstart2 + 1199){
			period = 1;
		}
		else if(nowtime >= fightstart2 + 1199 && nowtime < fightstart3 + 1199){
			period = 2;
		}
		else if(nowtime >= fightstart3 + 1199 && nowtime < fightend){
			period = 3;
		}
		return period;
	}

	public getFightPeriod2():number{
		let fightstart1 = this.emperorwarActiveVo.getPeriod(2);
		let fightstart2 = this.emperorwarActiveVo.getPeriod(3);
		let fightstart3 = this.emperorwarActiveVo.getPeriod(4);
		let fightend = this.emperorwarActiveVo.getPeriod(5);
		let nowtime = GameData.serverTime;
		let period = -1;
		if(nowtime >= fightstart1 && nowtime < fightstart2){
			period = 1;
		}
		else if(nowtime >= fightstart2 && nowtime < fightstart3){
			period = 2;
		}
		else if(nowtime >= fightstart3 && nowtime < fightend){
			period = 3;
		}
		return period;
	}
	//时间转格式
	public getCountTimeStr(num):string
	{	
		let time:number = num;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	//是否已经报名
	public isSignForWar():boolean{
		if(this._type > 1 && this._type < 5){
			return this.emperorwarVo.bmst > 0; 
		}
		else{
			return false
		}
	}

	//是否已经报名
	public getSelfNumb():number{
		return this.emperorwarVo.numb; 
	}

	//是否已经获得资格
	public isCanJoinWar():boolean{
		if(this._type > 1 && this._type < 5){
			return this.emperorwarVo.numb > 0; 
		}
		else{
			return false
		}
	}

	//当前人气值
	public get curCheer():number{
		return this.emperorwarVo.getcheer
	}

	//设置报名数据
	public setBmListData(data):void{
		let view = this;
		if(data.length){
			view._getEmpBmData = [...data];
		}else{
			view._getEmpBmData = [];
		}
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPEROR_FRESHPLAYERDATA);
	}
	//获取数据
	public getBmlistData(type?):any[]{
		let arr = [];
		for(let unit of this._getEmpBmData){
			let condition = type ? (type == 'up' ? (unit.numb > 0) : (unit.numb <= 0)) : true;
			if(condition){
				arr.push(unit);
			}
		}
		return arr;
	}
	//是否助威过
	public isHaveZhuWei():boolean{
		return this.emperorwarVo.cheerid > 0;
	}
	//获取当前助威次数
	public getZhuweiNum():number{
		return Number(this.emperorwarVo.cheernum);
	}
	//获取当前助威的uid
	public getZhuweiID():number{
		return Number(this.emperorwarVo.cheerid);
	}
	//根据key－value查找对应数据
	public getBmDataByKV(key,value):any{
		let obj = null;
		for(let unit of this._getEmpBmData){
			if(unit[key] == value){
				obj = unit;
				break;
			}
		}
		return obj;
	}
	//门客布阵信息
	public getServantInfo():any{
		let info : any = this.emperorwarVo.info;
		return info.sinfo;
	}
	//设置门客布阵信息
	public set_emperorWarBuzhen(buzhen){
		let view = this;
		let info : any = view.emperorwarVo.info;
		info.sinfo = {};
		info.sinfo = buzhen;
	}
	//是否需要自动选择
	public isCanAutoSelect(info):boolean{
		for(let i in info){
			if(info[i] == ''){
				return true;
			}
		}
		return false;
	}

	public curBuzhen:any=null;
	//是否已上阵
	public haveInBuzhen(servantId):boolean{
		let view = this;
		let info : any = view.curBuzhen;
		for(let i in info){
			let id = info[i];
			if(Number(id) == Number(servantId)){
				return true;
			}
		}
		return false;
	}
	//是否已上阵
	public buzhewnIsChange(buzhen):boolean{
		let view = this;
		let info : any = view.emperorwarVo.info;
		for(let i in info.sinfo){
			let id = info.sinfo[i];
			if(id !== buzhen[i]){
				return true;
			}
		}
		return false;
	}

	public cannotSetBuzhen() : boolean{
		let arr = [2,3,4]; 
		let period = this.getFightPeriod2() + 1;
		if(period == 0){
			return false;
		}
		let fightstart = this.emperorwarActiveVo.getPeriod(period);
		if(GameData.serverTime >= (fightstart + 840)){
			return true;
		}
		return false;
	}

	public getVersion():number{
		return this.emperorwarActiveVo.version;
	}

	public getet():number{
		return this.emperorwarActiveVo.et;
	}

	public getThisRoundIn(numb : number, period : number):boolean{
		let data = this.getBmDataByKV('numb', numb);
		let std = 0;
		if(!data){
			return false;
		}
		//status 1报名 2入选 3胜一场 4胜二场 5冠军
		switch(period){
			case 0:
				std = 2;
				break;
			case 1:
				std = 3;
				break;
			case 2:
				std = 4;
				break;
			case 3:
				std = 5;
				break;
		}
		return data.status >= std;
	}

	//获取对阵信息
	public getVsinfo(period : number):any{
		let vs = {1:[1,8],2:[4,5],3:[2,7],4:[3,6]};
		let vsarr : any;
		switch(period){
			case 0:
			case 1:
				vsarr = {};
				vsarr = vs;
				break;
			case 2:
				vsarr = {};
				for(let i = 1; i <= 4; ++ i){
					let winner = this.compareFightInfo(vs[i]);
					if(i < 3){
						if(!vsarr[1]){
							vsarr[1] = [];
						}
						vsarr[1].push(winner);
					}
					else{
						if(!vsarr[2]){
							vsarr[2] = [];
						}
						vsarr[2].push(winner);
					}
				}
				break;
			case 3:
				vsarr = {};
				vsarr[1] = [];
				let round3 = this.getVsinfo(2);
				for(let i = 1; i <= 2; ++ i){
					vsarr[1].push(this.compareFightInfo(round3[i]));
				}
				break;
		}
		return vsarr;
	}

	public getRoundWinner(period):any[]{
		let winarr = [];
		let vs = {1:[1,8],2:[4,5],3:[2,7],4:[3,6]};
		switch(period){
			case 1:
				for(let i = 1; i <= 4; ++ i){
					let winner = this.compareFightInfo(vs[i]);
					if(winner){
						winarr.push(winner);
					}	
				}
				break;
			case 2:
				let lastround = this.getVsinfo(2);
				for(let i in lastround){
					let winner = this.compareFightInfo(lastround[i]);
					if(winner){
						winarr.push(winner);
					}	
				}
				break;
			case 3:
				let data = this.getBmlistData();
				if(data.length){
					data.sort((a,b)=>{
						return b.status - a.status;
					});
					winarr.push(data[0].numb);
				}
				break;
		}
		return winarr;
	}

	public getWinnerEmpData():any{
		let data = this.getBmlistData();
		data.sort((a,b)=>{
			return b.status - a.status;
		});
		return data[0];
	}

	//比对战斗信息 status 1报名 2入选 3胜一场 4胜二场 5冠军
	public compareFightInfo(twoPlayer:number[]):any{
		let player1 = this.getBmDataByKV('numb', twoPlayer[0]);
		let player2 = this.getBmDataByKV('numb', twoPlayer[1]);
		let winnumb = 0;
		if(player1 && player2){
			if(player1.status == player2.status){
				winnumb = 0;
			}
			else{
				winnumb = player1.status > player2.status ? twoPlayer[0] : twoPlayer[1];
			}
		}
		else if(player1){
			winnumb = twoPlayer[0];
		}
		else if(player2){
			winnumb = twoPlayer[1];
		}
		return winnumb
	}

	//获取限购物品次数
	public getBuyLimitnum(id):number{
		let info : any = this.emperorwarVo.info;
		let binfo = info.buyinfo;
		let buyNum = 0;
		if(binfo && binfo[id]){
			buyNum += binfo[id];
		}
		return buyNum;
	}

	//判断类型 控制入口
	public openEmpView():void{
		let start = this.emperorwarActiveVo.getPeriod(0);//this.emperorwarActiveVo.version;
		let zhuweistart = this.emperorwarActiveVo.getPeriod(1);//start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
		let battlestart = this.emperorwarActiveVo.getPeriod(2);//zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
		let end = this.emperorwarActiveVo.getPeriod(5);//battlestart + 3 * cfg.battlelastTime;
		let type = 0;
		if(GameData.serverTime < start){
			type = 1;
		}
		if(GameData.serverTime >= start && GameData.serverTime < zhuweistart){
			type = 2;
		}
		if(GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart){
			type = 3;
		}
		if(GameData.serverTime >= battlestart && GameData.serverTime < end){
			type = 4;
		}
		if(GameData.serverTime >= end){
			type = 5;
		}
		if(type == 5){
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENTERVIEW);
		}
	}

	public judgeType():number{
		let start = this.emperorwarActiveVo.getPeriod(0);//this.emperorwarActiveVo.version;
		let zhuweistart = this.emperorwarActiveVo.getPeriod(1);//start + (24 + (cfg.cheerTime - cfg.auctionTime)) * 3600;
		let battlestart = this.emperorwarActiveVo.getPeriod(2);//zhuweistart + (24 + (cfg.battleTime - cfg.cheerTime)) * 3600;
		let end = this.emperorwarActiveVo.getPeriod(5);//battlestart + 3 * cfg.battlelastTime;
		let type = 0;
		if(GameData.serverTime < start){
			type = 1;
		}
		if(GameData.serverTime >= start && GameData.serverTime < zhuweistart){
			type = 2;
		}
		if(GameData.serverTime >= zhuweistart && GameData.serverTime < battlestart){
			type = 3;
		}
		if(GameData.serverTime >= battlestart && GameData.serverTime < end){
			type = 4;
		}
		if(GameData.serverTime >= end){
			type = 5;
		}
		return type;
	}

	//获取此次报名消耗的人望币
	public getCurSignRWB():number{
		return this.emperorwarVo.pemcost;
	}

	public get version()
	{
		return this.emperorwarActiveVo.version;
	}
	public dispose():void
	{	
		if (this.emperorwarVo)
		{
			this.emperorwarVo.dispose();
			this.emperorwarVo=null;
		}
		if (this.emperorwarActiveVo)
		{
			this.emperorwarActiveVo.dispose();
			this.emperorwarActiveVo=null;
		}
		super.dispose();
	}
}