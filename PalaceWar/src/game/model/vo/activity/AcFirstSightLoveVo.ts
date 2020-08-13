/**
 * 女优活动1 依见钟情
 * author ycg
 * date 2019.10.14
 */
class AcFirstSightLoveVo extends AcBaseVo{
    public ainfo:any;
    public rewards:any;
    public bm:any;
    public totalLove:number = 0;
    public mychooseFlag:any;
    public resultFlag:any;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    /**个人倾心值 */
    public getCurrLove():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    /**总倾心值 */
    public getTotalLove():number{
        return this.totalLove;
    }

    /**进度次数 */
    public getAchieveNumById(id:string|number):number{
        let achieveList = this.cfg.festivalList1;
        let currId = ""+id;
        for (let i=0; i < achieveList.length; i++){
            if (String(id) == achieveList[i].id){
                if (achieveList[i].cost){
                    currId = achieveList[i].cost;
                    break;
                }
            }
        }
        if (this.ainfo && this.ainfo[currId]){
            return this.ainfo[currId];
        }
        return 0;
    }

    /**进度条两端数据 */
    public getTotalLoveNumBlock():{min:number, max:number}{
        let dataList = this.cfg.festivalList2;
        // App.LogUtil.log("totallove: "+this.totalLove);
        for (let i=0; i < dataList.length; i++){
            let data = dataList[i];
            // App.LogUtil.log("data.nedlve: "+data.needFavor);
            if (dataList[i+1]){
                if (this.totalLove >= data.needFavor){
                    if (this.totalLove < dataList[i+1].needFavor){
                        return {min:data.needFavor, max:dataList[i+1].needFavor};
                    }
                }
                else{
                    return {min:0, max:data.needFavor};
                }
            }
            else{
                return {min:dataList[i-1].needFavor, max:data.needFavor};
            }
        }
    }

    public getCurrRewardId():number{
        let data = this.cfg.festivalList2;
        for (let i = 0; i < data.length; i++ ){
            if (!this.getAchieveRewardById(data[i].id) && this.totalLove >= data[i].needFavor && this.v >= data[i].needFavor1){
                return i;
            }
        }
        return 0;
    }

    /**奖励领取情况 */
    public getAchieveRewardById(id:string|number):boolean{
        if (this.rewards && this.rewards[id]){
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
        App.LogUtil.log("acTicout do=wn: "+et);
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
    }

    public isShowRewardRedDot():boolean{
        let data = this.cfg.festivalList2;
        for (let i = 0; i < data.length; i++ ){
            if (!this.getAchieveRewardById(data[i].id) && this.totalLove >= data[i].needFavor && this.v >= data[i].needFavor1){
                return true;
            }
        }
        return false;
    }

    public isShowBmRedDot():boolean{
        if (this.isInActivity() &&  this.getCurrLove() >= this.cfg.favorNeed && !this.bm){
            return true;
        }
        return false;
    }
    
    public get isShowRedDot():boolean{
        return this.isShowRewardRedDot() || this.isShowBmRedDot();
    }

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{

        super.dispose();
    }
}