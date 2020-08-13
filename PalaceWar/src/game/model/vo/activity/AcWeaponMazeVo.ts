/**
 * 神器迷宫
 * date 2020.4.23
 * author ycg
 * @class AcWeaponMazeVo
 */
class AcWeaponMazeVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public box:any; //宝箱状态
    public rinfo:any;//充值进度

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

    //充值数量
    public getRechargeNum():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
    }

    /**当前进度 */
    public getProcessNum():number{
        if (this.ainfo && this.ainfo.v){
            return this.ainfo.v;
        }
        return 0;
    }

    //迷宫类型
    public getMapType():number[]{
        let currNum = this.getProcessNum();
        let num = Math.floor(currNum/10) % 2 ? -1 : 1;
        if (num == 1){
            return [1, -1, 1];
        }
        return [-1, 1, -1];
    }

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.WeaponMazeAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfgList();
        let count = achieveData.length;
        let data:Config.AcCfg.WeaponMazeAchieveItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].needNum){
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

    //获取当前最大进度
    public getCurrMaxProNum():number{
        let data = this.cfg.getAchieveCfgList();
        return data[data.length - 1].needNum;
    }

    //可领奖励id
    public getAchieveRewardId():number{
        let data = this.cfg.getAchieveCfgList();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].needNum){
                    return data[i].id;
                }
            }
        }
        return 0;
    }

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveCfgList();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].needNum){
                    return true;
                }
            }
        }
        return false;
    }

    //是否已充值奖励可领取
    public isGetRechargeRewardById(id:number|string):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortRechargeCfg():Config.AcCfg.WeaponMazeRechargeItem[]{
        let rechargeData = this.cfg.getRechargeCfgList();
        let count = rechargeData.length;
        let data:Config.AcCfg.WeaponMazeRechargeItem[] = [];
        let currGem = this.getRechargeNum();
        for (let i = 0; i < count; i++){
            if (this.isGetRechargeRewardById(rechargeData[i].id)){
                rechargeData[i].sortId = rechargeData[i].id + count;
            }
            else if (currGem >= rechargeData[i].needGem){
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

    //可令充值奖励id
    public getRechargeRewardId():number{
        let data = this.cfg.getRechargeCfgList();
        let currNum = this.getRechargeNum();
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeRewardById(data[i].id) && currNum >= data[i].needGem){
                return data[i].id;
            }
        }
        return 1;
    }

    //可令充值奖励id
    public isCanGetRechargeReward():boolean{
        let data = this.cfg.getRechargeCfgList();
        let currNum = this.getRechargeNum();
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeRewardById(data[i].id) && currNum >= data[i].needGem){
                return true;
            }
        }
        return false;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanGetRechargeReward() || this.isCanPlay();
    }

    //是否有次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
    }

    private getTypeCode():number{
        if (this.code == 2){
            return 1;
        }
        else if (this.code == 4){
            return 3;
        }
        return this.code;
    }

    public getCoreShowNeed():number{
        let data = this.cfg.getRechargeCfgList();
        if (this.getTypeCode() == 1){
            for (let i=0; i < data.length; i++){
                let rewardArr = GameData.formatRewardItem(data[i].getReward);
                for (let k=0; k < rewardArr.length; k++){
                    let itemCfg = Config.ItemCfg.getItemCfgById(rewardArr[k].id);
                    if (itemCfg && itemCfg.getRewards){
                        let rItem = GameData.formatRewardItem(itemCfg.getRewards);
                        for (let j=0; j < rItem.length; j++){
                            if (rItem[j].id == Number(this.cfg.coreReward)){
                                return data[i].needGem;
                            }
                        }
                    }
                }
            }
        }
        else if (this.getTypeCode() == 3){
            for (let i=0; i < data.length; i++){
                let rewardArr = GameData.formatRewardItem(data[i].getReward);
                for (let k=0; k < rewardArr.length; k++){
                    if (rewardArr[k].id == Number(this.cfg.coreReward)){
                        return data[i].needGem;
                    }
                }
            }
        }
        return 0;
    }

    //
    public getSepIndex():number{
        return 4;
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

    public get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{

        super.dispose();
    }
}