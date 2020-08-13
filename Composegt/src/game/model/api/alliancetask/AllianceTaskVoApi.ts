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
		// var date:Date = new Date(GameData.serverTime *1000);
		var year:number = App.DateUtil.getServerYear();
		var month:number = App.DateUtil.getServerMonth() + 1;
		let ymstr = year+""+month;
		if(month < 10)
		{
			ymstr = year+"0"+month;
		}
		if(this.allianceTaskVo.tinfo[ymstr]){
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

	public getAllianceTaskServantList(taskId:string)
	{
		let myAlliance = Api.allianceVoApi.getMyAllianceVo();
		let taskservant = myAlliance.info.taskservant;
		if(!taskservant){
			taskservant = [];
		}
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
		let serIdList = Api.servantVoApi.getServantInfoIdListByProperty(taskcfg.type);

		let list1 = [];
		let list2 = [];
		let list3 = [];
		for (var index = 0; index < serIdList.length; index++) {
			let serId = serIdList[index];
			let nums = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
			if(nums == 0)
			{
				list1.push(serId);
			}else{
				if(nums == 1)
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

	public getAllianceMonTaskOverNum()
	{
		let overNum = this.allianceTaskVo.overNum;
		if(!overNum)
		{
			return 0;
		}
		return overNum;
	}

	public dispose():void
	{
		this.allianceTaskVo = null;
		super.dispose();
	}
	
}