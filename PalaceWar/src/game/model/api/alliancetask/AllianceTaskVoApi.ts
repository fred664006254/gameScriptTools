/**
 * 军团建设系统vo
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskVo
 */
class AllianceTaskVoApi extends BaseVoApi
{
	private allianceTaskVo:AllianceTaskVo;
	private _curSelectedTaskSerId:string = "";
	public constructor() 
	{
		super();
	}

	public getCurrentBuffId()
	{
		if(this.allianceTaskVo.buff)
		{
			return this.allianceTaskVo.buff.id;
		}
		return null;
	}

	public getBuffBuyTimes(buffid:string)
	{
		if(this.allianceTaskVo.buff && this.allianceTaskVo.buff.id == buffid)
		{
			return this.allianceTaskVo.buff.bnum;
		}
		return 0;
	}

	public getAllianceTaskInfo(taskId:string)
	{
		var date: Date = App.DateUtil.getServerDate();
		var year:number = date.getFullYear();
		var month:number = date.getMonth() + 1;
		let ymstr = year+""+month;
		if(month < 10)
		{
			ymstr = year+"0"+month;
		}
		// App.LogUtil.log("getAllianceTaskInfo "+ymstr);
		if(this.allianceTaskVo && this.allianceTaskVo.tinfo && this.allianceTaskVo.tinfo[ymstr]){
			return this.allianceTaskVo.tinfo[ymstr][taskId];
		}
		return null;
	}
	public setAllianceTaskSelectedServantId(id:string)
	{
		this._curSelectedTaskSerId = id;
	}


	public getAllianceTaskSelectedServantId()
	{
		return this._curSelectedTaskSerId;
	}

	public isAllianceTaskLVEnable()
	{
		if(Api.allianceVoApi.getAllianceVo().level < Config.AlliancetaskCfg.getAllianceTaskNeedLv())
		{
			return false;
		}
		return true;
	}
	public isShowRedForEntrance()
	{
		if(!Api.switchVoApi.checkOpenAllianceTask())
		{
			return false;
		}
		if(!this.isAllianceTaskLVEnable())
		{
			return false;
		}
		if(this.getAllTaskFinished()){
			return false
		}

		if (this.isInLastTime()){
			return false;
		}

		let myAlliance = Api.allianceVoApi.getMyAllianceVo();
		let taskservant = myAlliance.info.taskservant;
		if(!taskservant)
		{
			return true;
		}
		let servantIdList = Object.keys( Api.servantVoApi.getServantInfoList() ) ;
		for (var index = 0; index < servantIdList.length; index++) {
			let tmpSerid = servantIdList[index];
			if(tmpSerid && !taskservant[tmpSerid] )
			{
				return true;
			}
		}
		return false;
	}

	public isShowRewardRed()
	{
		if(!Api.switchVoApi.checkOpenAllianceTask())
		{
			return false;
		}
		if(!this.isAllianceTaskLVEnable())
		{
			return false;
		}
		if(this.getAllTaskFinished()){
			return false
		}

		if (!(Api.allianceVoApi.getMyAllianceVo().po < 3))
		{
			return false;
		}

		if (this.isInNotGetTime()){
			return false;
		}

		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		for (let k in list)
		{
			let taskId = list[k];

			let cfgData = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
			let taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(taskId);

			if(taskinfo){
				let flag = taskinfo.flag;
				 if(flag == 1)
				 {
					 return true;
				 }
			}
		}

		
		
		return false;
	}

	public getAllianceTaskServantList(taskId:string)
	{
		let myAlliance = Api.allianceVoApi.getMyAllianceVo();
		let taskservant = myAlliance.info.taskservant;
		if(!taskservant){
			taskservant = [];
		}
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
		let serIdList = Api.servantVoApi.getServantInfoIdListByProperty(taskcfg.type);
		let limitlessTaskId = this.getLimitlessTaskId();
		if (limitlessTaskId && taskId == limitlessTaskId){
			serIdList = Api.servantVoApi.getServantInfoIdListByProperty(0);
		}
		
		let list1 = [];
		let list2 = [];
		let list3 = [];
		for (var index = 0; index < serIdList.length; index++) {
			let serId = serIdList[index];
			if(!taskservant[serId])
			{
				list1.push(serId);
			}else{
				if(taskservant[serId] == 1)
				{
					list2.push(serId);
				}else{
					list3.push(serId);
				}
			}
		}

		let resultList = list1.concat(list2).concat(list3);
		return resultList;
	}
	public getAllianceTaskFlag(taskid:string)
	{
		let taskvo = this.getAllianceTaskInfo(taskid);
		if(!taskvo)
		{
			return 0;
		}
		return taskvo.flag ;
	}

	public getAllTaskFinished():boolean{
		let flag = true;
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		for(let i in list){
			if(!this.getAllianceTaskFlag(list[i])){
				flag = false;
				break;
			}
		}
		return flag;
	}

	//无限任务id
	public getLimitlessTaskId():string{
		let cfg = Config.AlliancetaskCfg.getAllianceTaskIdList();
		for (let i in cfg){
			let data = Config.AlliancetaskCfg.getAllianceTaskById(cfg[i]);
			if (data.infinite){
				return cfg[i];
			}
		}
		return null;
	}

	/**是否开启无限任务 */
	public isOpenLimitlessTask():boolean{
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		let limitlessId = this.getLimitlessTaskId();
		for (let i in list){
			if (limitlessId != list[i]){
				if (!this.getAllianceTaskFlag(list[i])){
					return false;
				}
			}
		}
		return true;
	}

	/**获取任务列表 开启无限任务放首位 */
	public getAllTaskList():any[]{
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		let limitlessId = this.getLimitlessTaskId();
		App.LogUtil.log("getAllTaskList: "+limitlessId);
		let data = [];
		for (let i=0;i < list.length; i++){
			if (list[i] == limitlessId ){
				if (this.isOpenLimitlessTask()){
					data.unshift(list[i]);
				}
			}
			else 
			{
				data.push(list[i]);
			}
		}
		return data;
	}

	/**获取任务列表 不包括无限任务 */
	public getNormalTaskList():any[]{
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		let limitlessId = this.getLimitlessTaskId();
		let data = [];
		for (let i=0;i < list.length; i++){
			if (list[i] != limitlessId){
				data.push(list[i]);
			}
		}
		return data;
	}

	/**是否参加过本月任务 */
	public isJoinedAllianceTask():boolean{
		let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
		for (let key in list){
			let taskInfo = this.getAllianceTaskInfo(list[key]);
			if (taskInfo && taskInfo.uids && taskInfo.uids[Api.playerVoApi.getPlayerID()]){
				return true;
			}
		}
		return false;
	}

	/**本月前3天时间 */
	public isInNotGetTime():boolean{
		let realserverTime = GameData.serverTime-App.DateUtil.getDiffLocalAndSvrTimeZone()*3600;
		let date = new Date(realserverTime * 1000);
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds();
		if (day < 4){
			let mon0time = GameData.serverTime - ((day - 1) * 86400 + hour * 3600 + min * 60 + sec);
			if (mon0time + 3 * 86400 > GameData.serverTime){
				return true;
			}
		}
		return false;
	}

	//11：30之后
	public isInLastTime():boolean{
		let tws = App.DateUtil.getWeeTs(GameData.serverTime);
		if(GameData.serverTime + 1800 >= tws + 86400 )
		{
			return true;
		}
		return false;
	}

	public dispose():void
	{
		this.allianceTaskVo = null;
		super.dispose();
	}
	
}