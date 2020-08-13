/**
 * 酒神诗仙
 * date 2020.2.18
 * author yangchengguo
 * @class AcSkinOfLibaiVo
 */
class AcSkinOfLibaiVo extends AcBaseVo{
    public isfree:number;
    public process:any; //进度
    public rinfo:any; //充值

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

    //道具数量
    public getToolNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    /**充值 */
    public getCurrRecharge():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
    }

    /**是否已领取充值奖励 */
    public isGetChargeRewardById(id:string|number):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortRechargeCfg():Config.AcCfg.SkinOfLibaiRechargeItem[]{
        let rechargeData = this.cfg.getRechargeCfg();
        let count = rechargeData.length;
        let data:Config.AcCfg.SkinOfLibaiRechargeItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetChargeRewardById(rechargeData[i].id)){
                rechargeData[i].sortId = rechargeData[i].id + count;
            }
            else if (this.getCurrRecharge() >= rechargeData[i].needGem){
                rechargeData[i].sortId = rechargeData[i].id - count;
            }
            else{
                rechargeData[i].sortId = rechargeData[i].id;
            }
            data.push(rechargeData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

    /**当前进度 */
    public getProcessNum():number{
        if (this.process && this.process.v){
            return this.process.v;
        }
        return 0;
    }

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.process && this.process.flags && this.process.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.SkinOfLibaiAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        let count = achieveData.length;
        let sepIndex = this.getSeprateIndex();
        if (sepIndex > 0 && !this.isSecond()){
            count = sepIndex;
        }
        let data:Config.AcCfg.SkinOfLibaiAchieveItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum){
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

    public getAchievementCfg():Config.AcCfg.SkinOfLibaiAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        let data:Config.AcCfg.SkinOfLibaiAchieveItem[] = [];
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

    public getSeprateIndex():number{
        return 5;
    }
    
    //分阶段显示
    public getSeprateProNum():number{
        let data = this.cfg.getAchieveCfg();
        let index = data.length;
        let sepIndex = this.getSeprateIndex();
        if (sepIndex > 0){
            index = sepIndex;
        }
        return data[index-1].specialnum; 
    }

    //是否为第二轮
    public isSecond():boolean{
        if (this.getSeprateIndex() > 0){
            if (this.getProcessNum() >= this.getSeprateProNum()){
                return true;
            }
        }
        return false;
    }

    //获取当前最大进度
    public getCurrMaxProNum():number{
        if (this.isSecond()){
            let data = this.cfg.getAchieveCfg();
            return data[data.length - 1].specialnum;
        }
        return this.getSeprateProNum();
    }

    //可领奖励id
    public getAchieveRewardId():number{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].specialnum){
                    return data[i].id;
                }
            }
        }
        return 0;
    }

    //获取展示对应的数据
    public getShowSkinData():{needNum:number, index:number, skinId:number}{
        let data = this.cfg.getAchieveCfg();
        for (let i = 0; i < data.length; i++){
            let rewardsArr = data[i].getReward.split("|");
            for (let k = 0; k < rewardsArr.length; k++){
                let itemId = rewardsArr[k].split("_")[1];
                let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (this.code == 1 || this.code == 2){
                    if (itemCfg.servantSkinID){
                        return {needNum: data[i].specialnum, index: i, skinId: itemCfg.servantSkinID};
                    }
                }
            }
        }
        return {needNum:null, index:null, skinId:null};
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCangetChargeReward() || this.isCanPlay();
    }

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].specialnum){
                    return true;
                }
            }
        }
        return false;
    }

    //是否有可领取充值奖励
    public isCangetChargeReward():boolean{
        let data = this.cfg.getRechargeCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetChargeRewardById(data[i].id)){
                if (this.getCurrRecharge() >= data[i].needGem){
                    return true;
                }
            }
        }
        return false;
    }

    //是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
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

    public get cfg():Config.AcCfg.SkinOfLibaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}