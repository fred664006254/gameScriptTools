/**
 * 巾帼英雄
 * date 2019.11.11
 * author ycg
 */
class AcHeroineVo extends AcBaseVo{
    //进度奖励
    public process:any; 
    //充值
    public rinfo:any;
    //是否免费
    public isfree:any;

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
        if (this.process && this.process.v){
            return this.process.v * this.cfg.attackHP;
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
        if (this.process && this.process.flags && this.process.flags[id]){
            return true;
        }
        return false;
    }

    public getMaxAchieveNeedNum():number{
        let data = this.cfg.getAchievementList();
        return data[data.length - 1].ratetime;
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
        let currScore = this.getScore() * 100 / this.cfg.totalHP;
        for (let i = 0; i < data.length; i++){
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].ratetime){
                return true;
            }
        }
        return false;
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

    //进度奖励 排序
    public getSortAchievementCfg():Config.AcCfg.HeroineAchievementItem[]{
        let achieveData = this.cfg.getAchievementList();
        let data:Config.AcCfg.HeroineAchievementItem[] = [];
        let currNum = this.getScore() * 100 / this.cfg.totalHp;
        for (let i = 0; i < achieveData.length; i++){
            if (this.isGetAchievementById(achieveData[i].id)){
                achieveData[i].sortId = Number(achieveData[i].id) + achieveData.length;
            }
            else if (currNum >= achieveData[i].ratetime){
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

    //充值奖励 排序
    public getSortRechargeCfg():Config.AcCfg.HeroineAchievementItem[]{
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