/**
 * 投石破敌
 * date 2019.8.27
 * author yangchengguo
 * @class AcThrowStoneVo
 */
class AcThrowStoneVo extends AcBaseVo{
    //进度奖励
    public score:any; 
    //充值
    public rinfo:any;
    public isfree:any;

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
        App.LogUtil.log("this. extratiem:"+this.cfg.extraTime);
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

    //充值元宝数
    public getChargeNum():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
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
        if (this.score && this.score.flags && this.score.flags[id]){
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
                    if (data[i].needNum <= this.score.v){
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

    //当前石头数量
    public getStoneNum():number{
        return this.v;
    }

    //当前分数
    public getScore():number{
        if (this.score && this.score.v){
            return this.score.v;
        }
        return 0;
    }

    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.ThrowStoneRecharageItem[] {
		let rechargeData = this.cfg.getRechargeList();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRechargeById(rechargeData[i].id)) {
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
	public getSortAchievementCfg():Config.AcCfg.ThrowStoneAchievementItem[] {
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
        // data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
    }

    //获取阶段进度奖励
    public getCurrAchievementCfg():Config.AcCfg.ThrowStoneAchievementItem[] {
        let list:Config.AcCfg.ThrowStoneAchievementItem[] = [];
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

    //获取
    public getAchievementCfg():Config.AcCfg.ThrowStoneAchievementItem[]{
        let list:Config.AcCfg.ThrowStoneAchievementItem[] = [];
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

    //是否显示充值奖励红点
    public isShowChargeRewardRedDot():boolean{
        let rechargeData = this.cfg.getRechargeList();
        for (let i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id) == false && this.getChargeNum() >= rechargeData[i].needGem){
                return true;
            }
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

    //可投石的时候显示小红点
    public isCanThrowRedDot():boolean{
        if (this.isInActivity() && (this.isfree > 0)){
            return true;
        }
        return false;
    }

    public get isShowRedDot():boolean{
        return this.isShowAchievementRewardRedDot() || this.isCanThrowRedDot() || this.isShowChargeRewardRedDot();
    }

    //获取门客对应的数据
    public getServantData():any{
        let data = this.cfg.getAchievementList();
        for (let i = 0; i < data.length; i++){
            let rewardArr = data[i].getReward.split("|");
            for (let j = 0; j < rewardArr.length; j++){
                let id = rewardArr[j].split("_")[1];
                if (id == String(this.cfg.show2)){
                    return {needNum: data[i].needNum, index: i+1};
                }
            }
        }
        return {needNum:0, index: 1};
    }

    //获取佳人对应的数据
    public getWifeData():any{
        let data = this.cfg.getRechargeList();
        for (let i = 0; i < data.length; i++){
            let rewardArr = data[i].getReward.split("|");
            for (let j = 0; j < rewardArr.length; j++){
                let id = rewardArr[j].split("_")[1];
                if (id == String(this.cfg.show1)){
                    return {needNum: data[i].needGem, index: i+1};
                }
            }
        }
        return {needNum:0, index: 1};
    }

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}