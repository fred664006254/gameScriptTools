
class AcSurprisedgiftVo extends AcBaseVo {
    private ainfo = null;


    public constructor() {
        super();
    }
    private get cfg(): Config.AcCfg.SurprisedgiftCfg {

        let cfg = <Config.AcCfg.SurprisedgiftCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return cfg;
    }
    //获得当前分数
    public getScoreNum(): number {
        return this.ainfo.scorenum;
    }
    //获得当日已经抽奖的次数
    public getDayRandNum(): number {
        return this.ainfo.dayrandnum;
    }
    public getSumRandNum(): number {
        return Object.keys(this.ainfo.rewardinfo).length || 0;
    }
    //检查某个奖品是否已经获得
    public checkHave(index): boolean {
        let reward = this.ainfo.rewardinfo;
        if (reward[(index + 1).toString()]) {
            return true;
        }
        return false;
    }
    //当前已经抽奖的次数
    public curCount(): number {
        let reward = this.ainfo.rewardinfo;
        let count = 0;
        for (let c in reward) {
            count++;
        }
        return count;
    }
    //获得奖励列表数量
    public getRewardCount(): number {
        if (!this.cfg) {
            return 0;
        }
        return this.cfg.getGiftList().length;
    }
    //获得当日剩余次数
    public getResidueCount(): number {
        if (!this.cfg) {
            return 0 - this.getDayRandNum();
        }
        let limit = Math.min((this.getDayNum() * this.cfg.getLimit()), this.cfg.totlelimited);
        return limit - this.getSumRandNum();
    }
    //获得当前消耗分数
    public getCurCost(): number {
        let costList = [];
        if (this.cfg) {
            costList = this.cfg.getCost();
        }


        let curCount = this.curCount();
        if (curCount < costList.length) {
            return costList[curCount];
        } else {
            return 0;
        }
    }
    //获得剩余时间
    public getResidueTime(): number {
        let t = this.et - GameData.serverTime;

        return t;

    }
    //获取当前第几天
    public getDayNum(): number {
        return App.DateUtil.getActivityDay(GameData.serverTime, this.st);
    }
    /**
	 * 红点显示
	 */
    public get isShowRedDot(): boolean {

        return this.getResidueCount() > 0
            && this.getScoreNum() >= this.getCurCost()
            && this.getResidueTime() >= 0
            && this.getRewardCount() > this.curCount();
    }
    public initData(data: any): void {

        for (let key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACSURPRISEDGIFT_REFRESHVO);
    }

    public dispose(): void {
        super.dispose();
    }
}