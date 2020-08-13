/**
 * 财神祝福
 * date 2020.2.13
 * author yangchengguo
 * @class AcBlessingOfMammonVo
 */
class AcBlessingOfMammonVo extends AcBaseVo{
    public flags:any; //充值

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    /**充值 */
    public getCurrRecharge():number{
        if (this.v ){
            return this.v;
        }
        return 0;
    }

    /**是否已领取奖励 */
    public isGetChargeRewardById(id:string|number):boolean{
        if (this.flags && this.flags[id]){
            return true;
        }
        return false;
    }

    /**是否有可领取的奖励 */
    public isShowRewardRedDot():boolean{
        let data = this.cfg.getBoxListCfg();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetChargeRewardById(data[i].id) && this.v >= Number(data[i].needGem)){
                return true;
            }
        }
        return false;
    }

    //当前进度
    public getCurrProcessIndex():{index:number, needGem:number}{
        let currCharge = this.getCurrRecharge();
        let data = this.cfg.getBoxListCfg();
        for (let i = 0; i < data.length; i++){
            if (currCharge < Number(data[i].needGem)){
                return {index: i, needGem: Number(data[i].needGem) - currCharge};
            }
        }
        return {index: null, needGem:null};
    }

    //可领取的奖励index
    public getCurrRewardIndex():number{
        let currCharge = this.getCurrRecharge();
        let data = this.cfg.getBoxListCfg();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetChargeRewardById(data[i].id) && currCharge >= Number(data[i].needGem)){
                return i;
            }
        }
        return null;
    }

    //核心奖励
    public getSpecialRewardNeed():{needNum:string, index:number, skinId:number}{
        let data = this.cfg.getBoxListCfg();
        for (let i = 0; i < data.length; i++){
            let rewardsArr = data[i].getReward.split("|");
            for (let k = 0; k < rewardsArr.length; k++){
                let itemId = rewardsArr[k].split("_")[1];
                let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (this.code == 3 || this.code == 4 || this.code == 5 || this.code == 6 || this.code == 7 || this.code == 8 || this.code == 9|| this.code == 10){
                    if (itemCfg && itemCfg.servantSkinID){
                        return {needNum: data[i].needGem, index: i, skinId: itemCfg.servantSkinID};
                    }
                }
            }
        }
        return {needNum: null, index: null, skinId:null};
    }

    //额外获得的区间
    public getExtraRewardNum(id:string|number):{min:number, max:number}{
        let data = this.cfg.getBoxListCfg();
        let dropArr:number[] = [];
        for (let i=0; i < data.length; i++){
            if (data[i].id == Number(id)){
                for (let k in data[i].gemDrop){
                    let dropData = data[i].gemDrop[k][0].split("_");
                    if (dropData[0] == "1"){
                        dropArr.push(Number(dropData[2]));
                    }
                }
                break;
            }
        }
        dropArr.sort((a, b)=>{return a - b});
        return {min: dropArr[0], max: dropArr[dropArr.length -1]};
    }

    //最高额外奖励
    public getMaxExtraReward():number{
        let data = this.cfg.getBoxListCfg();
        let maxNum = 0;
        for (let i=0; i < data.length; i++){
            let dropArr = this.getExtraRewardNum(data[i].id);
            maxNum += dropArr.max;
        }
        return maxNum;
    }

    //
    public getFormatRewards(str:string):{rewards:string, others:string}{
        if (str){
            let others = "";
            let rewards = "";
            let data = str.split("|");
            for (let i=0; i < data.length; i++){
                let arr = data[i].split("_");
                if (arr[0] == "1" && arr[1] == "1"){
                    others = data[i];
                }
                else{
                    rewards += data[i] + "|";
                }
            }
            let s = rewards.substring(0, rewards.length - 1);
            return {rewards: s, others: others};
        }
        return {rewards: str, others:null};
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isShowRewardRedDot();
    }

    //倒计时
    public getCountDown():string{
        let et = this.et - 86400 * this.cfg.extraTime;
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

    public get cfg():Config.AcCfg.BlessingOfMammonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}