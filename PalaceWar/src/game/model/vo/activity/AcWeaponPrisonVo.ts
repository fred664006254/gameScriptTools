class AcWeaponPrisonVo extends AcBaseVo
{
    public isfree : number = 0;
    public ainfo : any = null;
    public rtype:number= 0; //奖池类型
    public rstage:number= 0; 
    public score:number= 0; 
    public num:number= 0; 
    public map:number[] = null;
    public isTouchPool:boolean = false;
    public rankData:any = null;
    //有没有领奖
    public preward:number = 0;
    public myrank:number = 0;
    public hasReg:boolean = false;

    public constructor() 
	{
		super();
    }

    public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
        }
        
        if (this.isInActivity() && this.hasReg ==false)
        {   
            let time = this.et - 86400 - GameData.serverTime;
            TimerManager.doTimer(time*1000+100,1,this.refreshReward,this);
        }
    }
    
    private refreshReward():void
    {
        NetManager.request(NetRequestConst.REQUEST_WEAPONPRISON_CHECKREDPOINT, { activeId: this.aidAndCode}); 
    }
    
    private get cfg() : Config.AcCfg.WeaponPrisonCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanGetRankReward();
    }
    
    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
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

    public getCountDown():string{
        let et = this.et - this.cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public isCanGetRankReward():boolean
    {   
        if (this.checkIsInEndShowTime() && this.preward == 0 && this.myrank>0 && this.myrank<=100)
        {
            return true;
        }
        return false;
    }
    
    public isHasRankReward():boolean
    {   
        if (this.myrank>0 && this.myrank<=100)
        {
            return true;
        }
        return false;
    }


    public isGetRankReward():boolean
	{
		return this.preward == 1;
	}

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.achievementOne;
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
            let neednum = this.cfg.achievementOne[id-1].needNum;
            if (this.ainfo.v >= neednum){
                type = 2;
            }
        }
        return type;
    }

	public getSortAchievementCfg():Config.AcCfg.WeaponPrisonAchievementItem[]{
        let achieveData = this.cfg.achievementOne;
        let count = achieveData.length;
        let data:Config.AcCfg.WeaponPrisonAchievementItem[] = [];
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

    //再充值x可获得一次游戏次数
	public getNextTimeNeedRecharge():number
	{
		let v = this.cfg.needGem - this.v%this.cfg.needGem;
		if (v == 0)
		{
			v = this.cfg.needGem;
		}
		return v;
	}

    public getPoolRewardId():number{
        
        return this.rtype;
    }

     //当前分数
    public getScore():number{
        return this.score;
    }

     public getCoreShowNeed():number{
        let data = this.cfg.achievementOne;
        for (let i=0; i < data.length; i++){
            let rewardArr = GameData.formatRewardItem(data[i].getReward);
            for (let k=0; k < rewardArr.length; k++){
                if (rewardArr[k].id == Number(this.cfg.coreReward)){
                    return data[i].needNum;
                }
            }
        }
        return 0;
    }

    public dispose():void 
	{   
        if (this.hasReg)
        {
            TimerManager.remove(this.refreshReward,this);
            this.hasReg = false;
        }
        this.ainfo = null;
        this.isfree = 0;
        this.rtype = 0;
        this.rstage = 0;
        this.score = null;
        this.num = null;
        this.map = null;
        this.rankData = null;
        this.isTouchPool = false;
        this.myrank = 0;
        this.preward = 0;

		super.dispose();
	}
}