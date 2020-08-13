/**
 * 鼠来如意
 * date 2020.6.1
 * author ycg
 * @class AcMouseComeVo
 */
class AcMouseComeVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public num:number;//道具数量

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
        if (this.v){
            return this.v;
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
        if (this.num){
            return this.num;
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

    public getSortAchievementCfg():Config.AcCfg.MouseComeAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        let count = achieveData.length;
        let data:Config.AcCfg.MouseComeAchieveItem[] = [];
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

    //当前进度id
    public getCurrProIndex():number{
        let data = this.cfg.getAchieveCfg();
        let currNum = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (currNum < data[i].needNum){
                return i;
            }
        }
        if (currNum >= this.getMaxProNum()){
            return -1;
        }
        return 0;
    }

    //可领奖励id
    public getAchieveRewardId():number{
        let data = this.cfg.getAchieveCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (this.getProcessNum() >= data[i].needNum){
                    return data[i].id;
                }
            }
        }
        return 0;
    }

    //获取展示对应的数据
    // public getShowSkinData():{needNum:number, index:number}{
        // let data = this.cfg.getAchieveCfg();
        // for (let i = 0; i < data.length; i++){
        //     let rewardsArr = data[i].getReward.split("|");
        //     for (let k = 0; k < rewardsArr.length; k++){
        //         let itemId = rewardsArr[k].split("_")[1];
        //         if (Number(itemId) == this.cfg.show){
        //             return {needNum: data[i].needNum, index: i};
        //         }
        //     }
        // }
        // return {needNum:null, index:null};
    // }
    public getShowSkinData():RewardItemVo{
        let data = this.cfg.exchange;
        let itemVo = GameData.formatRewardItem(data.needParts)[0];
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
        let str = this.cfg.exchange.needParts;
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

    public get cfg():Config.AcCfg.MouseComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}