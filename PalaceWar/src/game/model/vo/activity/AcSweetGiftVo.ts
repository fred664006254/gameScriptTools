/**
 * 月夜仙缘
 * date 2019.8.19
 * author yangchengguo
 * @class AcSweetGiftVo
 */
class AcSweetGiftVo extends AcBaseVo{
    //进度奖励
    public rewards:any; 
    //充值
    public rinfo:any;
    //任务
    public task:any;
    //商店
    public shop:any;
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
            if (data[Number(id)-1].needNum <= this.v){
                return 1;
            }
        }
        return 0;
    }

    //当前最大进度
    public getMaxAchieveId():number{
        let data = this.cfg.getAchievementList();
        for (let key in data){
            if (data[key].needNum > this.v){
                return Number(key) - 1;
            }
            else if (data[key].needNum == this.v){
                return Number(key);
            }
        }
        let len = data.length;
        if (data[len-1].needNum <= this.v){
            return len - 1;
        }
        return -1;
    }

    //任务是否已完成
    public isGetTaskById(id:string):boolean{
        if (this.task && this.task.flags && this.task.flags[id]){
            return true;
        }
        return false;
    }

    //当前分数
    public getScore():number{
        return this.v;
    }

    //月饼分数
    public getCakeDataById(id:string):any{
        let data = this.cfg.getMoonCakeList();
        for (let key in data){
            if (data[key].itemID == id){
                return data[key];
            }
        }
        return data[String(id)];
    }

    //任务完成数量
    public getTaskNumByType(type:number):number{
        if (this.task && this.task.v && this.task.v[type]){
            return this.task.v[type];
        }
        return 0;
    }

    /**商品购买的数量 */
	public getShopValue(id:string) {
		return this.shop && this.shop[id] ? this.shop[id] : 0;
	}

    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.SweerGiftRecharageItem[] {
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

    //入场消耗次数的进度奖励
	public getSortAchievementCfg():Config.AcCfg.SweerGiftAchievementItem[] {
		let data = this.cfg.getAchievementList();
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
        data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
    }

    //任务
    public getSortTaskCfg():Config.AcCfg.SweerGiftTaskItem[]{
        let data = this.cfg.getTaskList();
		for (let i = 0; i < data.length; i++) {
			if (this.isGetTaskById(data[i].id)) {
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getTaskNumByType(data[i].questType) >= data[i].value) {
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else {
				data[i].sortId = Number(data[i].id);
			}
        }
        data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
    }

    //商店
    public getSortShopCfg():Config.AcCfg.SweerGiftExchangeItem[]{
        let data = this.cfg.getExchangeList();
        data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
    }

    //月饼奖励
    public getSortMoonCakeCfg():any[]{
        let data = this.cfg.getMoonCakeList();
        data.sort((a, b) => {return a.itemId - b.itemId});
        return data;
    }

    //月饼奖励列表
    public getMoonCakeRewardsByItemId(id:number|string):string{
        let itemConfig = Config.ItemCfg.getItemCfgById(id);
        let drops = Config.ItemdropCfg.getItemCfgById(itemConfig.dropId);
        let str = "";
        // let keys:any[] = Object.keys(drops);
        for (let key in drops){
            if (drops[key] && drops[key][0]){
                str += drops[key][0] + "|";
            }
            else{
                break;
            }
        }
        return str.substring(0, str.length - 1);
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
            if (this.isGetAchievementById(data[i].id) == false && this.v >= data[i].needNum){
                return true;
            }
        }
        return false;
    }

    //是否显示任务奖励红点
    public isShowTaskRewardRedDot():boolean{
        let data = this.cfg.getTaskList();
        for (let i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].id) == false && this.getTaskNumByType(data[i].questType) >= data[i].value){
                return true;
            }
        }
        return false;
    }

    //是否显示兑换商店奖励红点
    public isShowExchangeRedDot():boolean{
        // let data = this.cfg.getExchangeList();
        // let playerGem = Api.playerVoApi.getPlayerGem();
        // for (let i = 0; i < data.length; i++) {
        //     if (this.getShopValue(data[i].id) < data[i].limit && playerGem >= data[i].needGem){
        //         return true;
        //     }
        // }
        return false;
    }

    //有元宝可制作的时候显示小红点
    public isCanMakeRedDot():boolean{
        // let playerGem = Api.playerVoApi.getPlayerGem();
        if (this.isInActivity() && (this.isfree > 0 )){
            return true;
        }
        return false;
    }

    //获取红艳皮肤需要充值的元宝数
    public getWifeNeedMoney():number{
        let rechargeData = this.cfg.getRechargeList();
        if (rechargeData && rechargeData.length > 0){
            for (let i=0; i < rechargeData.length; i++){
                let rewards = rechargeData[i].getReward.split("|");
                for (let key in rewards){
                    let id = rewards[key].split("_")[1];
                    if (id == String(this.cfg.show2)){
                        return rechargeData[i].needGem;
                    }
                }
            }
        }
        return 0;
    }
    
    public get isShowRedDot():boolean{
        return this.isShowRewardsRedDot() || this.isCanMakeRedDot() || this.isShowAchievementRewardRedDot();
    }

    public isShowRewardsRedDot():boolean{
        return this.isShowChargeRewardRedDot() || this.isShowExchangeRedDot() || this.isShowTaskRewardRedDot();
    }

    public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}