/**
 * 三国活动
 * date 2019.8.27
 * author yangchengguo
 * @class AcThreekingdomsRechargeVo
 */
class AcThreekingdomsRechargeVo extends AcBaseVo{
    public tnum:number; //总共转换的马蹄数
    public isfree:number;
    public num:number; //当前马蹄个数
    public process:number; //进度
    public flags:any; //进度领取信息

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

    /**当前马蹄数 */
    public getCurrNum():number{
        if (this.num){
            return this.num;
        }
        return 0;
    }

    /**当前进度 */
    public getProcessNum():number{
        if (this.process){
            return this.process;
        }
        return 0;
    }

    //再充值元宝数
    public getRechargeNeed():number{
        let num = 0;
        if (this.v){
            num = this.cfg.cost - this.v % this.cfg.cost;
        }
        if (num > 0){
            return num;
        }
        return this.cfg.cost;
    }

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.flags && this.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.ThreekingdomsAchievementItem[]{
        let achieveData = this.cfg.getAchieveData();
        let count = achieveData.length;
        let data:Config.AcCfg.ThreekingdomsAchievementItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = Number(achieveData[i].id) + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum){
                achieveData[i].sortId = Number(achieveData[i].id) - count;
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

    //进度条相关
    public getProgressPer():number{
        let currNum = this.getProcessNum();
        let data = this.cfg.getAchieveData();
        let len = data.length;
        let maxNum = data[len - 1].specialnum;
        let index = 0;
        for (let i = 0; i < data.length; i++){
            if (currNum >= maxNum){
                return 1;
            }
            else if (data[i].specialnum == currNum){
                return (i+1)/len;
            }
            else if (data[i].specialnum > currNum){
                index = i;
                break;
            }
        }
        let per = 0;
        if (index == 0){
            per = currNum / data[index].specialnum / len;
        }
        else{
            let lastNum = data[index-1].specialnum;
            per = index/ len + (currNum - lastNum)/(data[index].specialnum - lastNum)/len;
        }
        return per;
    }

    //当前进行到第几关
    public getCurrGuanqiaId():number{
        let data = this.cfg.getAchieveData();
        let currNum = this.getProcessNum();
        for (let i = 0; i < data.length; i++){
            if (data[i].specialnum == currNum){
                if (i == data.length -1){
                    return -1;
                }
                else{
                    return i+1;
                }
            }
            else if (data[i].specialnum > currNum){
                return i;
            }
        }
        return -1; // -1通关
    }

    //距离下次进度数
    public getNextGuanqiaNeedNum():number{
        let guanqiaId = this.getCurrGuanqiaId();
        let data = this.cfg.getAchieveData();
        let currNum = this.getProcessNum();
        if (guanqiaId != -1){
            return data[guanqiaId].specialnum - currNum;
        }
        return 0;
    }

    //是否触发武将战斗
    public openBossBattleIndex(lastProcess:number):number[]{
        let data = this.cfg.getAchieveData();
        let currNum = this.getProcessNum();
        let ids:number[] =[];
        for (let i = 0; i < data.length; i++){
            if (data[i].specialnum > lastProcess && currNum >= data[i].specialnum){
                ids.push(i);
            }
        }
        return ids;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isShowQingyuanRedDot();
    }

    //是否有可领取奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveData();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].specialnum){
                    return true;
                }
            }
        }
        return false;
    }

    //是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.getCurrNum() > 0)){
            return true;
        }
        return false;
    }

    //是否有情缘红点
    public isShowQingyuanRedDot():boolean{
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("fiveTigeHeroes")) {
            if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                if (Api.encounterVoApi.isShowNpc()){
                    return true;
                }
            }
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

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}