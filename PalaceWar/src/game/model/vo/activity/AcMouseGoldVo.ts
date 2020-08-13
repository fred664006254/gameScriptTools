/**
 * 鼠来招财
 * date 2020.6.30
 * author wxz
 * @class AcMouseGoldVo
 */
class AcMouseGoldVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public num:number;//道具数量
    public v:number;
    public map:any;
    public tempMap:any;

    public layer:number = 0;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    public getMapDataById(id:number):any
    {
        if(this.map && this.map[String(id)])
        {
            return this.map[String(id)];
        }else
        {
            return null;
        }
    }

    public getTempMapDataById(id:number):any
    {
        if(this.tempMap && this.tempMap[String(id)])
        {
            let obj = this.tempMap[String(id)];
            obj.flag = 1;
            if(obj.itemid)
            {
                obj.isget = 1;
            }
            return obj;
        }else
        {
            return null;
        }
    }    

    public getMapItems():any
    {
        let retObj = {};
        for(let i = 0; i < this.cfg.special.length; i++)
        {
            retObj[this.cfg.special[i]] = 0;
        }
        for(let key in this.map)
        {
            if(this.map[key].itemid)
            {
                if(!this.map[key].isget)
                {
                    if(retObj[this.map[key].itemid] >= 0)
                    {
                        retObj[this.map[key].itemid]++;
                    }
                }
            }
        }
        return retObj;
    }

    public checkCanClick(index:number):boolean
    {
        let indexX = index%4;
        let indexY = Math.floor(index/4);
        for(let key in this.map)
        {
            if(this.map[key].flag)
            {
                let num = parseInt(key)-1;
                let numX = num%4;
                let numY = Math.floor(num/4);
                if(Math.abs(numX - indexX) + Math.abs(numY - indexY) < 2)
                {
                    return true;
                }
            }
        }
        return false;
    }

    public isShowMapDot():boolean
    {
        for(let key in this.map)
        {
            if(this.map[key].itemid && !this.map[key].isget && this.map[key].flag)
            {
                return true;
            }
        }
        return false;
    }

    public getAllCost():number
    {
        let count = 0;
        for(let key in this.map)
        {
            if(!this.map[key].flag)
            {
                count++;
            }
        }
        return count;
    }

    public getDoorPos():number
    {
        let pos = 1;
        for(let key in this.map)
        {
            if(this.map[key].door)
            {
                pos = parseInt(key);
                break;
            }
        }
        return pos;
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

    public getSortAchievementCfg():Config.AcCfg.MouseGoldAchieveItem[]{
        let achieveData = this.cfg.getAchieveCfg();
        let count = achieveData.length;
        let data:Config.AcCfg.MouseGoldAchieveItem[] = [];
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum){
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
        return data[data.length - 1].specialnum;
    }

    //当前进度id
    public getCurrProIndex():number{
        let data = this.cfg.getAchieveCfg();
        let currNum = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (currNum < data[i].specialnum){
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
                if (this.getProcessNum() >= data[i].specialnum){
                    return data[i].id;
                }
            }
        }
        return 0;
    }

    public getShowSkinData():RewardItemVo{
        let data = this.cfg.exchange;
        let itemVo = GameData.formatRewardItem(data.needParts)[0];
        return itemVo;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange() || this.isShowMapDot();
    }

    //是否有可领取进度奖励
    public isCangetAchieveReward():boolean{
        let data = this.cfg.getAchieveCfg();
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
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
    }

    //是否可以兑换
    public isCanExchange():boolean{
        let str = this.cfg.exchange.needItem;
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

    public get cfg():Config.AcCfg.MouseGoldCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}