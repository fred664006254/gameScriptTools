class AcChessVo extends AcBaseVo 
{
	/** 活跃点 */
	public point: number;
	/** 今日可用次数 */
	public num: number;
	/** 今日已用次数 */
	public anum: number;
	/** 总积分 */
	public score: number;
	/** 每日第一次打开的标记，为1，则代表今日打开过 */
	public firstOpen:number;
	/** 剧情，为1，acche则代表播放过 */
	public avgShow:number;
	/** 地图信息{} */
	arr/** 本关地图数组{pos:x,pos:x,...} */
	public map:any= {
		arr: null,
	};

	public rankInfo:{merank:number,mepoint:number,rank:any} = {merank:0,mepoint:0,rank:{}};

    public rinfo:any;    //充值
	public ainfo:any;    //进度
    public task:any;	 //任务
	public isfree:any = 0;
    public rewards:any;   //进度奖励
	public checkerboard:number=1;
	public slimit:number=0;

	public initData(data: any): void 
	{
		for (let key in data) 
		{
			if(key == "map")
			{
				this.map.arr = data[key];
				continue;
			}
			this[key] = data[key];
			if(key == "ainfo")
			{
				this.rewards = data[key]["flags"];
			}
		}
		App.MessageHelper.dispatchEvent("1234567");
	}
	private get cfg(): Config.AcCfg.ChessCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot(): boolean {
		// if (this.checkIsInEndShowTime()) {
		// 	return false; // 到展示期了
		// } else if (this.firstOpen != 1) { // 今日还没有打开过活动
		// 	return true;
		// } else if (this.inGaming()) { // 正在进行游戏中
		// 	return true;
		// } else if (this.anum < this.cfg.playtime && this.point >= this.getCurGameIndex() * this.cfg.livenessNeed){ // 有次数且活跃够
		// 	return true;
		// }
		// return false;
		if(this.isCangetChargeReward() || this.isCangetAchieveReward() || this.isShowTaskRewardRedDot())
		{
			return true;
		}
		if(this.isfree > 0 && !this.checkIsInEndShowTime())
		{
			return true;
		}
		if(this.showExchangeDot())
		{
			return true;
		}
		return false;
	}
	public showExchangeDot():boolean
	{
        let str:string = this.cfg.change.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
		let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
		let need = parseInt(str.split("_")[2]);	
		return have >= need;	
	}
	public get acCountDown(): string {
		let et = this.et - (this.config.extraTime || 0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acChess_timeEnd");
		}
		return LanguageManager.getlocal("acChess_timeCount", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
	}
	public get acTimeAndHour(): string {
		let et = this.et
		if (this.config && this.config.extraTime) {
			et = this.et - this.config.extraTime * 86400;
		}
		return LanguageManager.getlocal("acChess_time", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
	}
	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

    //任务
    public getSortTaskCfg():Config.AcCfg.ChessTaskItem[]
	{
        let data = this.cfg.getTaskCfg();
		let obj = {};
		for (let i = 0; i < data.length; i++) 
		{
			if(obj[data[i].fid])
			{
				if (this.isGetTaskById(obj[data[i].fid].fid,obj[data[i].fid].sid)) 
				{
					obj[data[i].fid] = data[i];
				}
			}else
			{
				obj[data[i].fid] = data[i];
			}
			if (this.isGetTaskById(data[i].fid,data[i].sid)) 
			{
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getTaskNumByType(data[i].fid,data[i].sid) >= data[i].value) 
			{
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else 
			{
				data[i].sortId = Number(data[i].id);
			}
        }
		let arr = [];
		for(let item in obj)
		{
			if (this.isGetTaskById(obj[item].fid,obj[item].sid)) 
			{
				obj[item].sordId = 2;
			}
			else if (this.getTaskNumByType(obj[item].fid,obj[item].sid) >= obj[item].value) 
			{
				obj[item].sortId = 1;
			}
			else
			{
				obj[item].sortId = 0;
			}
			arr.push(obj[item]);
		}
        arr.sort((a, b) => 
		{ 
			if(a.sortId != b.sortId)
			{
				return b.sortId - a.sortId 
			}else
			{
				return b.id - a.id;
			}
		});
		return arr;
    }
    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.ChessRechargeItem[] {
		let rechargeData = this.cfg.getRechargeCfg();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRechargeById(String(rechargeData[i].id))) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
			}
			else if (this.getChargeNum() >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
			}
        }
        rechargeData.sort((a, b) => { return a.sortId - b.sortId });
		return rechargeData;
    }
    //进度奖励
	public getSortAchievementCfg(sort:boolean=true):Config.AcCfg.ChessAchieveItem[] {
		let data = this.cfg.getAchieveCfg();
		for (let i = 0; i < data.length; i++) {
			if (this.isGetAchievementById(String(data[i].id))) {
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getProcess() >= data[i].needNum) {
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else {
				data[i].sortId = Number(data[i].id);
			}
        }
		if(sort)
		{
			data.sort((a, b) => { return a.sortId - b.sortId });
		}else
		{
			data.sort((a, b) => { return a.needNum - b.needNum });
		}
		return data;
    }

    //任务是否已完成
    public isGetTaskById(fid:string,sid:string):boolean
	{
        // if (this.task && this.task.flags && this.task.flags[id])
		// {
        //     return true;
        // }
		if(this.task && this.task[fid] && this.task[fid][sid] && this.task[fid][sid]["f"])
		{
			return true;
		}
        return false;
    }
    //任务完成数量
    public getTaskNumByType(fid:string,sid:string):number{
        // if (this.task && this.task.v && this.task.v[type]){
        //     return this.task.v[type];
        // }
        // return 0;
		if(this.task && this.task[fid] && this.task[fid][sid])
		{
			return this.task[fid][sid]["v"];
		}
        return 0;		
    }
	public getFNum(fid:string):number
	{
		let data = this.cfg.getTaskCfg();
		let count = 0;
		for (let i = 0; i < data.length; i++)
		{
			if(data[i].fid == fid)
			{
				count++;
			}
		}
		return count;
	}
    //是否显示任务奖励红点
    public isShowTaskRewardRedDot():boolean{
        let data = this.cfg.getTaskCfg();
        for (let i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].fid,data[i].sid) == false && this.getTaskNumByType(data[i].fid,data[i].sid) >= data[i].value){
                return true;
            }
        }
        return false;
    }		
    //是否有可领取充值奖励
    public isCangetChargeReward():boolean{
        let data = this.cfg.getRechargeCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeById(String(data[i].id))){
                if (this.getChargeNum() >= data[i].needGem){
                    return true;
                }
            }
        }
        return false;
    }

	//是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchievementById(String(data[i].id))){
                if (this.getProcess() >= data[i].needNum){
                    return true;
                }
            }
        }
        return false;
    }

    //是否已领取充值奖励
    public isGetRechargeById(id:string):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }
    //是否已领取进度奖励
    public isGetAchievementById(id:string):boolean{
        if (this.rewards && this.rewards[id]){
            return true;
        }
        return false;
    }
    //充值元宝数
    public getChargeNum():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
    }	
    //当前分数
    public getProcess():number{
        return this.ainfo.v;
    }
	public getTimes():number
	{
		return this.v;
	}
	public getFree():number
	{
		return this.isfree;
	}
    public getNeedMoney2():number
	{
        let dataList = this.getSortRechargeCfg();
		for(let i = 0; i < dataList.length; i++)
		{
			let strArr:string[] = dataList[i].getReward.split("|");
			for(let j = 0; j < strArr.length; j++)
			{
				if(strArr[j].split("_")[1] == String(this.cfg.show2))
				{
					return dataList[i].needGem;
				}
			}
		}        
        return 0;
    }	
	public dispose(): void {
		super.dispose();
	}
}