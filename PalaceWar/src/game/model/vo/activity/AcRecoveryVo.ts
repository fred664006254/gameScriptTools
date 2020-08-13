/**
 * 万物复苏
 * date 2020.2.26
 * author ycg
 * @class AcRecoveryVo
 */
class AcRecoveryVo extends AcBaseVo{
    public isfree:number;
    public lottery:any; //进度
    public charge:any; //充值
    public coin:number; //道具数量
    public gap:number; //

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
        if (this.coin){
            return this.coin;
        }
        return 0;
    }

    /**充值 */
    public getCurrRecharge():number{
        if (this.charge && this.charge.v){
            return this.charge.v;
        }
        return 0;
    }

    /**是否已领取充值奖励 */
    public isGetChargeRewardById(id:string|number):boolean{
        if (this.charge && this.charge.flags && this.charge.flags[id]){
            return true;
        }
        return false;
    }

    public getSortRechargeCfg():Config.AcCfg.RecoveryRechargeItem[]{
        let rechargeData = this.cfg.getRechargeCfg();
        let count = rechargeData.length;
        let data:Config.AcCfg.RecoveryRechargeItem[] = [];
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
        if (this.lottery && this.lottery.v){
            return this.lottery.v;
        }
        return 0;
    }

    /**分阶段显示 */
    public getProSeprateIndex():number{
        return 5;
    }

    public getCurrMaxProNum():number{
        let currIndex = this.getCurrProIndex();
        let sepIndex = this.getProSeprateIndex();
        let data = this.cfg.getAchieveCfg();
        if (!currIndex && currIndex != 0){
            return data[data.length -1].needNum;
        }
        else if (currIndex + 1 <= sepIndex){
            return data[sepIndex-1].needNum;
        }
        else{
            return data[currIndex].needNum;
        }
    }

    /**当前进度 index */
    public getCurrProIndex():number{
        let data = this.cfg.getAchieveCfg();
        let currScore = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (currScore < data[i].needNum){
                return i;
            }
        }
        return null;
    }

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.lottery && this.lottery.flags && this.lottery.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.RecoveryAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        // let currIndex = this.getCurrProIndex();
        // let sepIndex = this.getProSeprateIndex();
        let count = achieveData.length;
        // if (currIndex || currIndex == 0){
        //     if (currIndex < sepIndex){
        //         count = sepIndex;
        //     }
        //     else{
        //         count = currIndex + 1;
        //     }
        // }
        let data:Config.AcCfg.RecoveryAchieveItem[] = [];
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
                        return {needNum: data[i].needNum, index: i, skinId: itemCfg.servantSkinID};
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
                if (this.getProcessNum() >= data[i].needNum){
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
        if (this.isInActivity() && this.isFree()){
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

    public get cfg():Config.AcCfg.RecoveryCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    //拉霸机 随机数组
    public getRandGameRewardByType(type:number):any{
        let count = 10;
        let rewardArr:any[] = [];
        //三个皮肤
        if (type == 1 || type == 2){
            let sp = App.MathUtil.getRandom(2, 4);
            if (type == 1){
                sp = 1;
            }
            for (let i=0; i < 3; i++){
                let arr:number[] = [];
                for (let k=0; k < count-1; k++){
                    let randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                arr.push(sp);
                rewardArr.push(arr);
            }
        }
        else if (type == 3){
            //两个相同
            let spArr = this.getDiffRandNum(2);
            let spIndex = App.MathUtil.getRandom(0, 2);
            for (let i=0; i < 3; i++){
                let arr:number[] = [];
                for (let k=0; k < count-1; k++){
                    let randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                if (i < 2){
                    arr.push(spArr[i]);
                }
                else{
                    arr.push(spArr[spIndex]);
                }
                rewardArr.push(arr);
            }
        }
        else if (type == 4){
            //三个不相同
            let spArr = this.getDiffRandNum(3);
            for (let i=0; i < 3; i++){
                let arr:number[] = [];
                for (let k=0; k < count-1; k++){
                    let randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                arr.push(spArr[i]);
                rewardArr.push(arr);
            }
        }

        return rewardArr;
    }
    
    public getDiffRandNum(count:number):number[]{
        let rand = App.MathUtil.getRandom(1, 4);
        let arr:number[] =[];
        arr.push(rand);
        while (arr.length < count){
            rand = App.MathUtil.getRandom(1, 4);
            if (!GameData.isInArray(rand, arr)){
                arr.push(rand);
            }
        }
        return arr;
    }
}