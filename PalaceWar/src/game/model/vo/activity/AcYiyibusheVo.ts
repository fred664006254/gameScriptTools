/**
 * 女优活动3 依依不舍
 * author ycg
 * date 2019.10.14
 */
class AcYiyibusheVo extends AcBaseVo{
    /**是否免费 */
    public isfree:number;
    public rewards:any;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    //倒计时
    public getCountDown():string{
        let et = this.et - this.cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    //活动日期时间显示
    public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
            return true;
        }
        return false;
    }

    //当前分数、
    public getScore():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //是否已领取进度奖励
    public isGetAchievementById(id:string):boolean{
        if (this.rewards && this.rewards[id]){
            return true;
        }
        return false;
    }

    //当前进度领取奖励状态 0 不可领取  1 可领取  2 已领取
    public getAchievementStatusById(id:string):number{
        if (this.isGetAchievementById(id)){
            return 2;
        }
        else{
            let data = this.cfg.getAchievementList();
            for (let i = 0; i < data.length; i++){
                if (data[i].id == id){
                    if (data[i].needNum <= this.getScore()){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                }
            }
        }
        return 0;
    }

    //进度奖励
	public getSortAchievementCfg():Config.AcCfg.YiyibusheAchievementItem[] {
        let data = this.getAchievementCfg();
        if (!this.isSecond()){
            data = this.getCurrAchievementCfg();
        }
		for (let i = 0; i < data.length; i++) {
			if (this.isGetAchievementById(data[i].id)) {
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getScore() >= data[i].needNum) {
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else {
				data[i].sortId = Number(data[i].id);
			}
        }
		return data;
    }

    //获取阶段进度奖励
    public getCurrAchievementCfg():Config.AcCfg.YiyibusheAchievementItem[] {
        let list:Config.AcCfg.YiyibusheAchievementItem[] = [];
        let data = this.cfg.getAchievementList();
        let stIndex = 0;
        let endIndex = 5;
        App.LogUtil.log("data.le:"+data.length);
        if (this.isSecond()){
            stIndex = 4;
            endIndex = data.length;
        }
        for (let i = stIndex; i < endIndex; i++){
            list.push(data[i]);
        }
        return list;
    }

    //进度配置
    public getAchievementCfg():Config.AcCfg.YiyibusheAchievementItem[]{
        let list:Config.AcCfg.YiyibusheAchievementItem[] = [];
        let data = this.cfg.getAchievementList();
        for (let i=0; i < data.length; i++){
            list.push(data[i]);
        }
        return list;
    }

    //分阶段显示
    public getSeprateProNum():number{
        let data = this.cfg.getAchievementList();
        let index = 4;
        App.LogUtil.log("data"+data.length);
        if (data.length > index){
            App.LogUtil.log("data.needNum: "+data[index].needNum);
            return data[index].needNum;
        }
       return 0;
    }

    //获取当前最大进度
    public getCurrMaxProNum():number{
        if (this.isSecond()){
            let data = this.cfg.getAchievementList();
            return data[data.length - 1].needNum;
        }
        return this.getSeprateProNum();
    }

    //是否为第二轮
    public isSecond():boolean{
        if (this.getScore() >= this.getSeprateProNum()){
            return true;
        }
        return false;
    }

    //是否显示进度奖励红点
    public isShowAchievementRewardRedDot():boolean{
        let data = this.cfg.getAchievementList();
        for (let i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id) == false && this.getScore() >= data[i].needNum){
                return true;
            }
        }
        return false;
    }

    //可玩的时候显示小红点
    public isCanPlayRedDot():boolean{
        if (this.isInActivity() && (this.isfree > 0)){
            return true;
        }
        return false;
    }

    //衣装充值数据
    public getShowSkinData():any{
        let data = this.cfg.getAchievementList();
        let showId = this.cfg.show;
        for (let i = 0; i < data.length; i++) {
            let getRewards = (data[i].getReward).split("|");
            for (let k = 0; k < getRewards.length; k++){
                let strArr = getRewards[k].split("_");
                if (strArr[1] && strArr[1] == String(showId)){
                    return data[i];
                }
            }
        }
        return null;
    }

    public get isShowRedDot():boolean{
        return this.isShowAchievementRewardRedDot() || this.isCanPlayRedDot();
    }

    public get cfg():Config.AcCfg.YiyibusheCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        this.isfree = null;
        this.rewards = null;
        super.dispose();
    }

}