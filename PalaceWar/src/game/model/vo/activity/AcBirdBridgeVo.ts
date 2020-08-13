class AcBirdBridgeVo extends AcBaseVo
{   
    public isfree : number = 0;
    public ainfo : any[] = null;
    public rinfo : any = null;
    public winfo : any = null;

    public constructor() 
	{
		super();
	}
    
    private get cfg() : Config.AcCfg.BirdBridgeCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

     public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
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

    public getItemNum():number{
        let itemId = this.cfg.needItem.split("_")[1];
        return Api.itemVoApi.getItemNumInfoVoById(itemId);
    }

    //红点
    public get isShowRedDot():boolean{
        return  this.isCangetAchievementOneReward() || this.isCangetAchievementAllReward() ||this.isCangetRechargeReward() 
        || this.isCanPlay() || this.isCanGetCurWish();
    }

    public get isShowDetailRedDot():boolean{
        return  this.isCangetAchievementOneReward() || this.isCangetAchievementAllReward() ||this.isCangetRechargeReward() ;
    }

    //是否有可领取充值奖励
    public isCangetRechargeReward():boolean{
        let data = this.cfg.teaRecharge;
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeRewardById(data[i].id)){
                if (this.rinfo.v >= data[i].needGem){
                    return true;
                }
            }
        }
        return false;
    }

	/**当前充值奖励是否领取 */
    public isGetRechargeRewardById(id:string|number):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortRechargeCfg():Config.AcCfg.BirdBridgeRechargeItem[]{
        let achieveData = this.cfg.teaRecharge;
        let count = achieveData.length;
        let data:Config.AcCfg.BirdBridgeRechargeItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetRechargeRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.rinfo.v >= achieveData[i].needGem){
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

     public getSortAchievementOneCfg():Config.AcCfg.BirdBridgeAchievementOneItem[]{
        let achieveData = this.cfg.achievementOne;
        let count = achieveData.length;
        let data:Config.AcCfg.BirdBridgeAchievementOneItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchievementOneRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo[0].v >= achieveData[i].needNum){
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

    //全服奖励的个人奖励限制
    public isCanGetAchievementAllWithAchievementOneById(id:number):boolean
    {   
        let allcfg = this.cfg.achievementAll[id-1];
        // let onecfg = this.cfg.achievementOne[allcfg.needNum1-1];
        if (this.ainfo[0].v >= allcfg.needNum1)
        {
            return true;
        }
        return false;
    }

     //全服奖励的个人奖励限制
    public getAchievementAllNeedAchievementOneTimesById(id:number):number
    {   
        let allcfg = this.cfg.achievementAll[id-1];
        // let onecfg = this.cfg.achievementOne[allcfg.needNum1-1];
        
        return allcfg.needNum1;
    }

     public getSortAchievementAllCfg():Config.AcCfg.BirdBridgeAchievementAllItem[]{
        let achieveData = this.cfg.achievementAll;
        let count = achieveData.length;
        let data:Config.AcCfg.BirdBridgeAchievementAllItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchievementAllRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo[1].isCanGetAchievementAllWithAchievementOneById >= achieveData[i].needNum2 && this.isCanGetAchievementAllWithAchievementOneById( achieveData[i].id)){
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


     //是否有可领取进度奖励
    public isCangetAchievementOneReward():boolean{
        let data = this.cfg.achievementOne;
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchievementOneRewardById(data[i].id)){
                if (this.ainfo[0].v >= data[i].needNum){
                    return true;
                }
            }
        }
        return false;
    }

	/**当前进度奖励是否领取 */
    public isGetAchievementAllRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo[1].flags && this.ainfo[1].flags[id]){
            return true;
        }
        return false;
    }

     //是否有可领取进度奖励
    public isCangetAchievementAllReward():boolean{
        let data = this.cfg.achievementAll;
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchievementAllRewardById(data[i].id)){
                if (this.ainfo[1].v >= data[i].needNum2 && this.isCanGetAchievementAllWithAchievementOneById(data[i].id)){
                    return true;
                }
            }
        }
        return false;
    }

	/**当前进度奖励是否领取 */
    public isGetAchievementOneRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo[0].flags && this.ainfo[0].flags[id]){
            return true;
        }
        return false;
    }

    // 1, 2,可领，3,已领
    public getAchievementOneType(id:number):number
    {   
        let type = 1;
        if (this.isGetAchievementOneRewardById(id))
        {
            type = 3;
        }
        else
        {
            let neednum = this.cfg.achievementOne[id-1].needNum;
            if (this.ainfo[0].v >= neednum){
                type = 2;
            }
        }
        return type;
    }

    public getWishValueById(id:number):number{
        let v = 0;
        if (this.winfo && this.winfo.v && this.winfo.v[String(id)])
        {   
            let cfg= this.cfg.getWishCfg(id);
            v = this.winfo.v[String(id)]-this.getWishGotTimesById(id)*cfg.needTime;
        }
        return v;
    }

    public getWishGotTimesById(id:number):number{
        let v = 0;
        if (this.winfo && this.winfo.flags && this.winfo.flags[String(id)])
        {
            v = this.winfo.flags[String(id)]
        }
        return v;
    }

    public isWishMax():boolean{
        let data = this.cfg.wish;
        for (let i=0; i < data.length; i++){
            if (data[i].limitTime > this.getWishGotTimesById(data[i].id)){
                return false;
            }
        }
        return true;
    }

    public isWishMaxById(id:number):boolean{
        let data = this.cfg.getWishCfg(id);
        if (data.limitTime > this.getWishGotTimesById(data.id))
        {
                return false;
        }
        return true;
    }

    public isCanGetCurWish():boolean{
        let idx = this.winfo.idx;

        if (idx && this.isWishMaxById(idx) == false)
        {   
            let cfg= this.cfg.getWishCfg(idx);
            if (this.getWishValueById(idx) >= cfg.needTime)
            {
                return true;
            }
        }
        return false;
    }

     public getCurCanWishMaxNum():number{
        let idx = this.winfo.idx;
        let num = 0;
        if (idx && this.isWishMaxById(idx) == false)
        {   
            let cfg= this.cfg.getWishCfg(idx);
            if (cfg.needTime > this.getWishValueById(idx))
            {
                num = Math.min(this.getItemNum(), (cfg.needTime-this.getWishValueById(idx)));
            }
        }
        return num;
    }

    //是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || (this.getItemNum() > 0  && this.isWishMax()==false))){
            return true;
        }
        return false;
    }

    public getAchievementAllLevel():number
    {
        let lv = 0;
        let data = this.cfg.achievementAll;
        for (let i=0; i < data.length; i++){
            if (this.ainfo[1].v >= data[i].needNum2){
                lv = data[i].id;
            }
            else
            {
                break;
            }
        }
        return lv;
    }

    public dispose():void 
	{ 
		this.isfree = 0;
		this.ainfo = null;
        this.rinfo = null;
        this.winfo = null;

		super.dispose();
	}
}