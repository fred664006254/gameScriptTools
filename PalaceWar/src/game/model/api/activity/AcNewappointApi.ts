/**
 * 新服预约 
 * author ycg
 * date 202i=0.6.29
 * @class AcNewappointApi
 */
class AcNewappointApi extends BaseVoApi
{
	private _acData:any = null;
	private _intervalZinfo:any = null;
	private _et:number = 0;
	public constructor() 
	{
		super();
	}

	//活动数据
	public setAcData(data:any)
	{
		if (data && data.aid){
			this._acData = data;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH);
		}
	}
    
    public getAcData():any{
        return this._acData;
	}

	//服务器区间数据
	public setZidInfo(data:any){
		this._intervalZinfo = data;
	}

	public getZidInfo():any{
		return this._intervalZinfo;
	}

	//是否有数据
	public isHasData():boolean{
		if (this._acData && this._acData.aid){
			return true;
		}
		return false;
	}

	//是否是活动服务器
	public isInAcServer():boolean{
		let zid = ServerCfg.selectServer && ServerCfg.selectServer.zid ? ServerCfg.selectServer.zid : "";
		if (!zid){
			return true;
		}
		let zidArr = this.getZidInfo();
		let selZid = Number(zid);
		if (zidArr && zidArr.length > 0){
			for (let i=0; i < zidArr.length; i++){
				let data = zidArr[i];
				if (Number(data[0]) <= selZid && Number(data[1]) >= selZid){
					return true;
				}
			}
		}
		return false;
	}

	public get aid():string{
		if (this.isHasData()){
			return this._acData.aid;
		}
		return "newappoint";
	}

	public get code():string{
		if (this.isHasData()){
			return this._acData.code;
		}
		return "1";
	}

	//是否已预约
	public isJoin():boolean{
		if (this.isHasData()){
			if (this._acData.isjoin){
				return true;
			}
		}
		return false;
	}

	//新服
	public getNewServer():string{
		if (this.isHasData()){
			return this._acData.newzid;
		}
		return "";
	}

	//新服数据
	public getNewServerInfo():any{
		if (this.isHasData && this._acData.newServerinfo){
			return this._acData.newServerinfo;
		}
		return null;
	}

	//任务进度
	public getTaskNum():number{
		if (this.isHasData()){
			return this._acData.diff;
		}
		return 0;
	}

	public getMaxTaskNum():number{
		if (this.cfg){
			let cfgList = this.cfg.getTaskListCfg();
			return cfgList[cfgList.length-1].taskValue;
		}
		return 0;
	}

	//是否领取任务奖励
	public isGetTaskReward(id:string|number):boolean{
		if (this.isHasData()){
			if (this._acData.taskinfo && this._acData.taskinfo[id]){
				return true;
			}
		}
		return false;
	}

	public getSortTaskCfg():Config.AcCfg.NewappoinTaskItem[]{
		if (!this.cfg){
			return null;
		}
		let cfgList = this.cfg.getTaskListCfg();
		let data:Config.AcCfg.NewappoinTaskItem[] = [];
		let taskNum = this.getTaskNum();
		for (let i=0; i < cfgList.length; i++){
			if (this.isGetTaskReward(cfgList[i].id)){
				cfgList[i].sortId = cfgList.length + cfgList[i].id;
			}
			else{
				if (cfgList[i].taskType == 1){
					if (this.isJoin()){
						cfgList[i].sortId = cfgList[i].id - cfgList.length - 1;
					}
					else{
						cfgList[i].sortId = cfgList[i].id;
					}
				}
				else{
					if (taskNum >= cfgList[i].taskValue){
						cfgList[i].sortId = cfgList[i].id - cfgList.length - 1;
					}
					else{
						cfgList[i].sortId = cfgList[i].id;
					}
				}
			}
			data.push(cfgList[i]);
		}
		data.sort((a, b)=>{return a.sortId - b.sortId});
		return data;
	}

	//积分
	public getScore():number{
		if (this.isHasData()){
			return this._acData.score;
		}
		return 0;
	}

	//结束时间
	public get et():number{
		if (this.isHasData()){
			if (this.cfg && this.cfg.extraTime){
				return Number(this._acData.aet) - this.cfg.extraTime * 86400;
			}
			return Number(this._acData.aet);
		}
		return 0;
	}

	//是否显示icon
	public isShowNpc():boolean{
		if (this.isHasData() && this.isInAcServer()){
			if (Number(this._acData.ast) == 0){
				return true;
			}
			let svTime = GameData.serverTime;
			if (this.isJoin()){
				if (Number(this._acData.yrst) < svTime && this.et > svTime){
					return true;
				}
			}
			else{
				if (Number(this._acData.yrst) < svTime && Number(this._acData.ast) > svTime){
					return true;
				}
			}
		}
		return false;
	}

	//是否在活动期间内
    public isInActivity():boolean{
		if (this.isShowNpc()){
			if (Number(this._acData.ast) == 0){
				return true;
			}
			let svTime = GameData.serverTime;
			if (Number(this._acData.yrst) < svTime && Number(this._acData.ast) > svTime){
				return true;
			}
		}
        return false;
	}

	//是否在开服时间之前
	public isBeforeServerOpenTime():boolean{
		if (this.isShowNpc()){
			let newServerInfo = this.getNewServerInfo();
			if (newServerInfo && newServerInfo.open_time){
				let svTime = GameData.serverTime;
				if (Number(this._acData.yrst) < svTime && Number(newServerInfo.open_time) > svTime){
					return true;
				}
			}
		}
		return false;
	}
	
	//是否在展示期
	public isStart():boolean{
		if (this.isShowNpc()){
			if (Number(this._acData.ast) == 0){
				return true;
			}
			let svTime = GameData.serverTime;
			if (Number(this._acData.yrst) <= svTime && this.et > svTime){
				return true;
			}
		}
		return false;
	}

	//活动开始时间
	public getStartTime():string{
		if (this.isHasData()){
			return App.DateUtil.getFormatBySecond(Number(this._acData.yrst), 10);
		}
	}

	public get cfg():Config.AcCfg.NewappointCfg{
		if (this.isHasData()){
			return Config.AcCfg.getCfgByActivityIdAndCode(this._acData.aid, this._acData.code);
		}
		return null;
	}
	//任务红点
	public checkTaskRed():boolean{
		if (!this.cfg){
			return false;
		}
		let cfgList = this.cfg.getTaskListCfg();
		let taskNum = this.getTaskNum();
		for (let i=0; i < cfgList.length; i++){
			if (!this.isGetTaskReward(cfgList[i].id)){
				if (cfgList[i].taskType == 1){
					if (this.isJoin()){
						return true;
					}
				}
				else{
					if (taskNum >= cfgList[i].taskValue){
						return true;
					}
				}
			}
		}
		return false;
	}

    public checkRedPoint():boolean{
		if (this.isShowNpc()){
			if (this.isInActivity() && (!this.isJoin() || (this.checkTaskRed() && this.isJoin()))){
				return true;
			}
		}
        return false;
    }
    
	public dispose():void
	{
		this._acData = null;
		this._intervalZinfo = null;
		super.dispose();
	}
}