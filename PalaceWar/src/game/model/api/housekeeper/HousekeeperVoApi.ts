class HousekeeperVoApi extends BaseVoApi
{	
	public rechargeId:string = "g165";
    public constructor() 
	{
		super();
    }

	public getList():string[]
	{
		let list = [];

		list.push("manage");
		if (Api.switchVoApi.checkOpenOfficialbusiness())
		{
			list.push("affair");
		}
		list.push("wife");
		list.push("child");
		list.push("search");
		list.push("bookroom");
		list.push("prison");

		if (Api.switchVoApi.checkOpenConquest())
		{
			list.push("conquest");
		}
		if (Api.switchVoApi.checkOpenTrade())
		{
			list.push("trade");
		}
		if (Api.switchVoApi.checkZhenQiFangOpen())
		{
			list.push("zhenqifang");
		}
		return list;
	}

	/**
	 * 是否勾选了自动打理
	 */
	public getIsCheckByType(type:string):boolean
	{	
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+type;
		let storage = LocalStorageManager.get(key);
		if (storage == "0" || Api.housekeeperVoApi.getIsLocked(type)>0)
		{
			return false;
		}
		return true;
	}	

	/**
	 * 保存勾选信息
	 */
	public setCheckType(type:string,value:string):void
	{
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+type;
		LocalStorageManager.set(key,value);
	}

	/**
	 * 保存勾选信息参数
	 */
	public setCheckParms(type:string,value:string):void
	{
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER_PARMS+Api.playerVoApi.getPlayerID()+type;
		LocalStorageManager.set(key,value);
	}

	/**
	 * 获取勾选信息参数
	 */
	public getCheckParms(type:string,resetData:boolean=false):string
	{
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER_PARMS+Api.playerVoApi.getPlayerID()+type;
		let value = LocalStorageManager.get(key);

		if (resetData)
		{
			value = "";
		}

		if (!value || value == "")
		{
			if (type == "affair")
			{
				value = "1";
			}
			else if (type == "wife")
			{
				value = "1";
			}
			else if (type == "child")
			{
				value = "1|1|1";
			}
			else if (type == "bookroom")
			{	
				let idList= Api.servantVoApi.getServantInfoIdListWithSort(2);
				let lastData = Api.bookroomVoApi.getLastSelectServant2(idList);
				let value2 = "";
				let seatNum = Api.bookroomVoApi.getMaxleng();
				let l = Math.min(lastData.length,seatNum);

				for (let i=0; i<l; i++)
				{	
					if (value2!="")
					{
						value2 += "|";
					}
					value2 += lastData[i];
				}
				Api.housekeeperVoApi.setCheckParms(type,value2);
				value = value2;
			}
			else if (type == "conquest")
			{
				value = "1";
			}
			else if (type == "trade")
			{
				value = "1";
			}
			else if (type == "zhenqifang")
			{
				value = "1|1";
			}
		}

		return value;
	}

	/**
	 * 获取书院可派遣门客id
	 */
	public getBookroomServantIds():string[]
	{
		let sids:string[] = [];
		let maxNum =  Api.bookroomVoApi.getMaxleng();
		let studyNum = Api.bookroomVoApi.getInStudyServantNum();
		let canuseNum = maxNum-studyNum;

		let parmsstr = Api.housekeeperVoApi.getCheckParms("bookroom");
		let localIds = parmsstr.split("|");
        
		for (let i=0 ; i<localIds.length; i++)
		{

			if (sids.length >= canuseNum)
			{
				break;
			}

			let oneid = localIds[i];
			if (Api.bookroomVoApi.isStudying(oneid) || !oneid || oneid=="")
			{
				continue;
			}
			else
			{	
				sids.push(oneid);
			}

			
		}

		return sids;
	}


	//跨周小红点 
	public isHasRedot():boolean
	{
		let has = false;
		let week1 =  Math.ceil((GameData.serverTime-316800) / (7 * 86400));

		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+"Red";
		let week2 = 0;
		let storage = LocalStorageManager.get(key);
		if (storage && storage != "")
		{
			week2 = Number(storage);
		}

		return week1 > week2;
	}


	/**
	 * 保存勾选信息参数
	 */
	public setSaveWeekTime():void
	{	
		let week =  Math.ceil((GameData.serverTime-316800) / (7 * 86400));
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+"Red";
		LocalStorageManager.set(key,String(week));
	}

	public setSaveCDTime():void
	{	
		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+"CDTime";
		LocalStorageManager.set(key,String(GameData.serverTime));
	}

	public getCdTime():number
	{
		let cdtime = 0;

		let key = LocalStorageConst.LOCAL_HOUSEKEEPER+Api.playerVoApi.getPlayerID()+"CDTime";
		let oldtime = 0;
		let storage = LocalStorageManager.get(key);
		if (storage && storage != "")
		{
			oldtime = Number(storage);
			cdtime = Config.MasterCfg.turnTime + oldtime - GameData.serverTime;
		}
		return cdtime;
	}

	public getIsLocked(type:string):number
	{
		let b = 0;

		if (type == "manage")
        {
            if(Api.playerVoApi.getPlayerLevel()< Config.ManageCfg.autoNeedLv)
            {
                b = 1;
            }
        }
        else if (type == "search")
        {
            if (!Api.searchVoApi.isShowNpc())
            {
                b = 1;
            }
        }
        else if (type == "prison")
        {
            if (!Api.prisonVoApi.isShowNpc())
            {   
                b = 1;
            }
        }
        else if (type == "conquest")
        {
            if (!Api.conquestVoApi.isShowNpc())
            {   
                b = 1;
            }
            else
            {
                let data = Api.conquestVoApi.getConquestVo();

                if(data.tnum < 50 )
                {
                    b = 2;
                }
            }
        }
        else if (type == "trade")
        {
            if (!Api.tradeVoApi.isShowNpc())
            {   
                b = 1;
            }
			else
			{
				if(!Api.tradeVoApi.isBatchEnable())
                {
                     b = 2;
                }
			}

			
        }
        else if (type == "zhenqifang")
        {
            if (!Api.zhenqifangVoApi.isShowNpc())
            {   
                b = 1;
            }
        }
        else if (type == "child")
        {
            if (!Api.childVoApi.isShowNpc())
            {
               b = 1;
            }
        }
		return b;
	}


    public dispose():void
	{   

		super.dispose();
	}
}