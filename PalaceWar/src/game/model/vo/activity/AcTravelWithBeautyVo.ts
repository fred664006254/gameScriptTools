/**
 * 携美同游
 * date 2019.11.4
 * author ycg
 * @class AcTravelWithBeautyVo
 */
class AcTravelWithBeautyVo extends AcBaseVo{
    //进度奖励
    public rewards:any; 
    //充值
    public rinfo:any;
    //是否免费
    public isfree:any;
    //成就进度
    public num:any;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
            return true;
        }
        return false;
    }

    //当前进度
    public getScore():number{
        if (this.num){
            return this.num;
        }
        return 0;
    }

    //当前道具数量
    public getToolNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //充值元宝数
    public getChargeNum():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
    }

    //是否领取进度奖励
    public isGetAchievementById(id:string|number):boolean{
        if (this.rewards && this.rewards[id]){
            return true;
        }
        return false;
    }

    //是否领取充值奖励
    public isGetRechargeById(id:string|number):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    public isShowAchievementRewardRedDot():boolean{
        let data = this.cfg.getAchievementList();
        let currScore = this.getScore();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].needNum){
                return true;
            }
        }
        return false;
    }

    public getAchieveRewardId():string{
        let data = this.cfg.getAchievementList();
        let currScore = this.getScore();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].needNum){
                return data[i].id;
            }
        }
        return null;
    }

    public isShowRechargeRedDot():boolean{
        let data = this.cfg.getRechargeList();
        let currNum = this.getChargeNum();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetRechargeById(data[i].id) && currNum >= data[i].needGem){
                return true;
            }
        }
        return false;
    }

    public isCanPlayRedDot():boolean{
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
    }

    public get isShowRedDot():boolean
	{
		return this.isShowAchievementRewardRedDot() || this.isShowRechargeRedDot() || this.isCanPlayRedDot();
	}

    public getSeprateIndex():number{
        if (this.code == 3 || this.code == 4){
            return 5;
        }
        return 0;
    }
    
    //分阶段显示
    public getSeprateProNum():number{
        let data = this.cfg.getAchievementList();
        let index = data.length;
        let sepIndex = this.getSeprateIndex();
        if (sepIndex > 0){
            index = sepIndex;
        }
        return data[index-1].needNum; 
    }

    //是否为第二轮
    public isSecond():boolean{
        if (this.getSeprateIndex() > 0){
            if (this.getScore() >= this.getSeprateProNum()){
                return true;
            }
        }
        return false;
    }

    //获取当前最大进度
    public getCurrMaxProNum():number{
        if (this.isSecond()){
            let data = this.cfg.getAchievementList();
            return data[data.length - 1].needNum;
        }
        return this.getSeprateProNum();
    }

    //进度奖励 排序
    public getSortAchievementCfg():Config.AcCfg.TravelWithBeautyAchievementItem[]{
        let achieveData = this.cfg.getAchievementList();
        let count = achieveData.length;
        let sepIndex = this.getSeprateIndex();
        if (sepIndex > 0 && !this.isSecond()){
            count = sepIndex;
        }
        let data:Config.AcCfg.TravelWithBeautyAchievementItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchievementById(achieveData[i].id)){
                achieveData[i].sortId = Number(achieveData[i].id) + achieveData.length;
            }
            else if (this.getScore() >= achieveData[i].needNum){
                achieveData[i].sortId = Number(achieveData[i].id) - achieveData.length;
            }
            else{
                achieveData[i].sortId = Number(achieveData[i].id);
            }
            data.push(achieveData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

    public getAchievementCfg():Config.AcCfg.TravelWithBeautyAchievementItem[]{
        let achieveData = this.cfg.getAchievementList();
        let data:Config.AcCfg.TravelWithBeautyAchievementItem[] = [];
        let sepIndex = this.getSeprateIndex();
        if (sepIndex > 0){
            if (!this.isSecond()){
                for (let i=0; i < sepIndex; i++){
                    data.push(achieveData[i]);
                }
            }
            else{
                for (let i=sepIndex; i < achieveData.length; i++){
                    data.push(achieveData[i]);
                }
            }
        }
        else{
            data = achieveData;
        }
        return data;
    }

    //充值奖励 排序
    public getSortRechargeCfg():Config.AcCfg.TravelWithBeautyRecharageItem[]{
        let rechargeData = this.cfg.getRechargeList();
        for (let i = 0; i < rechargeData.length; i++){
            if (this.isGetRechargeById(rechargeData[i].id)){
                rechargeData[i].sortId = Number(rechargeData[i].id) + rechargeData.length;
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem){
                rechargeData[i].sortId = Number(rechargeData[i].id) - rechargeData.length;
            }
            else{
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return rechargeData;
    }

    //展示的佳人
    public getShowWifeSkinId():string{
        let data = this.cfg.getAchievementList();
        if (this.code == 3 || this.code == 4){
            data = this.cfg.getRechargeList();
        }
        for (let i = 0; i < data.length; i++){
            let rewards = (data[i].getReward).split("|");
            for (let k = 0; k < rewards.length; k++){
                let strArr = (rewards[k]).split("_");
                if (strArr[0] == "16"){
                    return strArr[1];
                }
            }
        }
        return "";
    }

    public getShowWifeSkinNeedGem():number{
        if (this.code == 3 || this.code == 4){
            let data = this.cfg.getRechargeList();
            for (let i = 0; i < data.length; i++){
                let rewards = (data[i].getReward).split("|");
                for (let k = 0; k < rewards.length; k++){
                    let strArr = (rewards[k]).split("_");
                    if (strArr[0] == "16"){
                        return data[i].needGem;
                    }
                }
            }
        }
        return 0;
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

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

}