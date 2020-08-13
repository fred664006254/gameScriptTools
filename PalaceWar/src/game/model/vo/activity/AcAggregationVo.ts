class AcAggregationVo extends AcBaseVo 
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
	/** 剧情，为1，则代表播放过 */
	public avgShow:number;

    public task:any;	 //任务
	public getNumArr:any;	 //

	public initData(data: any): void 
	{
		for (let key in data) 
		{
			this[key] = data[key];
		}
	}
	private get cfg(): Config.AcCfg.AggregationCfg {
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
		return this.isShowTaskRewardRedDot();
	}

	public get acCountDown(): string {
		let et = this.et - (this.config.extraTime || 0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acAggregation_timeEnd");
		}
		return LanguageManager.getlocal("acAggregation_timeCount", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
	}
	public get acTimeAndHour(): string {
		let et = this.et
		if (this.config && this.config.extraTime) {
			et = this.et - this.config.extraTime * 86400;
		}
		return LanguageManager.getlocal("acAggregation_time", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
	}
	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

    //任务
    public getSortTaskCfg():Config.AcCfg.AggregationTaskItem[]
	{
		let datas = this.cfg.getTaskCfg();
		for(let i = 0; i < datas.length; i++)
		{
			if(this.isRewardTaskById(datas[i].id))
			{
				datas[i].sortId = 100 + parseInt(datas[i].id);
			}else
			{
				datas[i].sortId = parseInt(datas[i].id);
			}
		}
		datas.sort((a:any,b:any)=>
		{		
			return a.sortId - b.sortId;
		});
		return datas;
    }

	public isRewardTaskById(id:string):number
	{
		if(this.task && this.task.flags && this.task.flags[id])
		{
			return this.task.flags[id];
		}
		return 0;
	}

	public getNumById(id:string):number
	{
		if(this.getNumArr && this.getNumArr[id])
		{
			return this.getNumArr[id];
		}
		return 0;
	}

	public isCanGetRewardById(id:string):boolean
	{
		if(Api.playerVoApi.getPlayerAllianceId() == 0)
		{
			return false;
		}
		if(this.isRewardTaskById(id) == 0)
		{
			if(this.cfg.getNeedById(id) <= this.getAllianceNum())
			{
				if(this.getNumById(id) < this.getAllianceMaxNum()+this.cfg.maxGet)
				{
					return true;
				}
			}
		}
		return false;
	}

	public isGetBzReward(id:string):boolean
	{
		return false;
	}

	//帮会名字
	public getAllianceName():string
	{
		if(Api.allianceVoApi.getAllianceVo())
		{
			return Api.allianceVoApi.getAllianceVo().name;
		}
		return "";
	}

	public extraTimeAllianceMn:number=0;
	//帮会人数
	public getAllianceNum():number
	{
		// if(this.checkIsInEndShowTime())
		// {
		// 	return this.extraTimeAllianceMn ? this.extraTimeAllianceMn : 0;
		// }
		if(Api.playerVoApi.getPlayerAllianceId() == 0)
		{
			return 0;
		}
		if(Api.allianceVoApi.getAllianceVo())
		{
			return Api.allianceVoApi.getAllianceVo().mn;
		}
		return 0;
	}	

	//帮会最大人数
	public getAllianceMaxNum():number
	{
		if(Api.allianceVoApi.getAllianceVo())
		{
			let level = Api.allianceVoApi.getAllianceVo().level;
			if(Config.AllianceCfg.getAllianceCfgByLv(String(level)))
			{
				return Config.AllianceCfg.getAllianceCfgByLv(String(level)).count;
			}
			return 0;
		}
		return 0;
	}	

    //是否显示任务奖励红点
    public isShowTaskRewardRedDot():boolean
	{
        let data = this.cfg.getTaskCfg();
        for (let i = 0; i < data.length; i++) 
		{
            if (this.isCanGetRewardById(data[i].id))
			{
                return true;
            }
        }
        return false;
    }		

	public getTimes():number
	{
		return this.v;
	}
	public dispose(): void {
		super.dispose();
	}
}