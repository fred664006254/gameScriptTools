class AcSeaWomanVo extends AcBaseVo
{   
    /*
    flags: {}
    v: 0
    */
    public ainfo : any = null;

    // 1  
    public isfree : number = 0;
    //1: {icon: 1} isflop 是我翻过的牌子，但是合上了。onlyshow 是唯一显示的
    public map : any = null;
	//剩余次数
    public num : number = 0;

    // public tnum : number = 0;

	//充值数
    public v : number = 0;

    public constructor() 
	{
		super();
	}

    private get cfg() : Config.AcCfg.SeaWomanCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getMapInfo(id:number):number{
		return this.map[String(id)];
	}

    public getShakeId(id:number):number
    {
        let sid = 0;
        let icon = this.map[String(id)].icon;
        for (let k in this.map)
		{
			let oneinfo = this.map[k];
            if (k!=String(id) && oneinfo.icon == icon && oneinfo.isflop)
            {
                sid = Number(k);
                break;
            }
		}
        return sid;
    }

	public getShowId():number{
		let id = 0;
		for (let k in this.map)
		{
			let oneinfo = this.map[k];
			if (oneinfo.onlyshow)
			{
				id = Number(k);
				break;
			}
		}
		return id;
	}

    public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	public getCountDownTime():string
	{	
		if (this.isInActivity())
		{
			return LanguageManager.getlocal("acFourPeople_acCD",[this.acCountDownNoExtra]);
		}
		else
		{
			return LanguageManager.getlocal("acPunishEnd");
		}
		
	}

    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	//再充值x可获得一次游戏次数
	public getNextTimeNeedRecharge():number
	{
		let v = this.cfg.cost - this.v%this.cfg.cost;
		if (v == 0)
		{
			v = this.cfg.cost;
		}
		return v;
	}

	//红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
    }

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.chessNum;
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.ainfo.v >= data[i].needNum){
                    return true;
                }
            }
        }
        return false;
    }

	/**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
            return true;
        }
        return false;
    }

	//是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.num > 0)){
            return true;
        }
        return false;
    }

	 /**当前进度 */
    public getProcessNum():number{
        if (this.ainfo && this.ainfo.v){
            return this.ainfo.v;
        }
        return 0;
    }

	//是否免费
    public isFree():boolean{
        if (this.isfree > 0){
            return true;
        }
        return false;
    }

    public isCanExchange():boolean{
        let str = this.cfg.change["needItem"];
        let itemVo = GameData.formatRewardItem(str)[0];
        let itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        let currNum = 0;
        if (itemData){
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num){
            return true;
        }
        return false;
    }

    // 1, 2,可领，3,已领
    public getAchievementType(id:number):number
    {   
        let type = 1;
        if (this.isGetAchieveRewardById(id))
        {
            type = 3;
        }
        else
        {
            let neednum = this.cfg.chessNum[id-1].needNum;
            if (this.ainfo.v >= neednum){
                type = 2;
            }
        }
        return type;
    }

	public getSortAchievementCfg():Config.AcCfg.NightSkyAchieveItem[]{
        let achieveData = this.cfg.chessNum;
        let count = achieveData.length;
        let data:Config.AcCfg.NightSkyAchieveItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo.num >= achieveData[i].needNum){
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else{
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

    public getShowSkinData():RewardItemVo{
        let data = this.cfg.change;
        let itemVo = GameData.formatRewardItem(data["needItem"])[0];
        return itemVo;
    }

    public dispose():void 
	{ 
        this.ainfo = null;
		this.isfree = 0;
		this.map = null;
		this.num = 0;
		this.v = 0;

		super.dispose();
	}
}