/**
 * 夜观天象
 * date 2020.6.15
 * author ycg
 * @class AcNightSkyVo
 */
class AcNightSkyVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public buyGem:number; 
    public specialNum:number;//特殊道具数量
    public specialCount:number;//获得次数
    public rtype:number; //奖池类型

    public isTouchPool:boolean = false;

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

    public getRechargeNum():number{
        if (this.buyGem){
            return this.buyGem;
        }
        return 0;
    }

    public getNeedRecharge():number{
        let num = this.getRechargeNum();
        let needNum = this.cfg.needGem - num % this.cfg.needGem;
        return needNum;
    }

    //道具数量
    public getToolNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //兑换物品总获得数
    public getSpecialTotalNum():number{
        if (this.specialNum){
            return this.specialNum;
        }
        return 0;
    }

    //兑换物品次数
    public getSpecialNum():number{
        if (this.specialCount){
            return this.specialCount;
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

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.NightSkyAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        let count = achieveData.length;
        let data:Config.AcCfg.NightSkyAchieveItem[] = [];
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
    public getMaxProNum():number{
        let data = this.cfg.getAchieveCfg();
        return data[data.length - 1].needNum;
    }

    public getShowSkinData():RewardItemVo{
        let data = this.cfg.change;
        let itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
    }

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].needNum){
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

    //是否可以兑换
    public isCanExchange():boolean{
        let str = this.cfg.change.needItem;
        let itemVo = GameData.formatRewardItem(str)[0];
        let itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        let currNum = 0;
        if (itemData){
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num){
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

    public get cfg():Config.AcCfg.NightSkyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

      //奖池id
    public getPoolRewardId():number{
        let currNum = 0;//this.getProcessNum();
        let id = this.rtype;
        if (id == 0){
            if (currNum == 0){
                id = 0;
            }
            else{
                id = 1;
            }
        }
        return id;
    }

}