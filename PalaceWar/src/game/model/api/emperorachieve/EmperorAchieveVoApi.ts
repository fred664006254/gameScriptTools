/**
 * 帝王成就api
 */
class EmperorAchieveVoApi extends BaseVoApi{
    public emperorAchieveVo:EmperorAchieveVo = null;
    public isShowAni:boolean = true;

    public constructor(){
        super();
    }

    /**帝王成就 */
    //是否领取帝王成就
    public isGetKingAchieveByType(id:number|string, type:number){
        let data = this.emperorAchieveVo.achieveKing1;
        if (type == 2){
            data = this.emperorAchieveVo.achieveKing2;
        }
        if (data.flags && data.flags[id]){
            return true;
        }
        return false;
    }

    //是否有可领取的成就奖励
    public isCanGetKingAchieveByType(id:number|string, type:number):boolean{
        let data = this.kingAchieveCfg.getKing1CfgList();
        let currNum = this.getKingAchieveNum(type);
        if (type == 2){
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (let i = 0; i < data.length; i++){
            if (data[i].id == String(id) && data[i].needNum <= currNum){
                return true;
            }
        }
        return false;
    }

    //帝王成就当前进度
    public getKingAchieveNum(type:number):number{
        let data = this.emperorAchieveVo.achieveKing1;
        if (type == 2){
            data = this.emperorAchieveVo.achieveKing2;
        }
        if (data.v){
            return data.v;
        }
        return 0;
    }

    //帝王成就当前就行的id
    public getCurrKingAchieveId(type:number){
        let data = this.kingAchieveCfg.getKing1CfgList();
        let currNum = this.getKingAchieveNum(type);
        if (type == 2){
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (let i = 0; i < data.length; i++){
            if (data[i].needNum > currNum){
                return i;
            }
        }
        return data.length - 1;
    }

    //成就红点
    public isShowKingAchieveRedDotByType(type:number):boolean{
        let data = this.kingAchieveCfg.getKing1CfgList();
        let currNum = this.getKingAchieveNum(type);
        if (type == 2){
            data = this.kingAchieveCfg.getKing2CfgList();
        }
        for (let i = 0; i < data.length; i++){
            if (!this.isGetKingAchieveByType(data[i].id, type) && currNum >= data[i].needNum){
                return true;
            }
        }
        return false;
    }

    //是否可以出巡
    public isShowAchieveOutRedDot():boolean{
        let playerUid = Api.playerVoApi.getPlayerID();
        if (this.isUnlockOutFunc() && this.emperorAchieveVo.outingst == 0 && this.isInOutTime() || this.isShowOutRedDotByUid(playerUid)){
            return true;
        }
        return false;
    }

    public isShowKingAchieveRedDot():boolean{
        return this.isShowKingAchieveRedDotByType(1) || this.isShowKingAchieveRedDotByType(2) || this.isShowAchieveOutRedDot();
    }

    //是否已解锁出巡功能
    public isUnlockOutFunc():boolean{
        let data = this.kingAchieveCfg.getKing1CfgList();
        let type = 1;
        let id = null;
        for (let i = 0; i < data.length; i++){
            if (data[i].unlock == 1){
                id = data[i].id;
                break;
            }
        }
        if (id){
            if (this.isGetKingAchieveByType(id, type)){
                return true;
            }
        }
        else{
            let data = this.kingAchieveCfg.getKing2CfgList();
            type = 2;
            for (let i = 0; i < data.length; i++){
                if (data[i].unlock == 1){
                    id = data[i].id;
                    break;
                }
            }
            if (id){
                if (this.isGetKingAchieveByType(id, type)){
                    return true;
                }
            }
        }
        return false;
    }

    //帝王成就配置
    public get kingAchieveCfg():any{
      return Config.EmperorachieveCfg;
    }
    /**end ******************/

    /**帝王出巡 */
    //是否可以点击出巡
    public isInOutTime():boolean{
        let time0Day = App.DateUtil.getWeeTs(GameData.serverTime);
        if (time0Day + this.emperorOutCfg.phrase[0] * 3600 <= GameData.serverTime && time0Day + this.emperorOutCfg.phrase[1] * 3600 > GameData.serverTime){
            return true;
        }
        return false;
    }

    //是否在出巡时间内
    public isInOuting(outSt:number):boolean{
        let et = outSt + this.emperorOutCfg.lastTime;
        if (GameData.serverTime < et && GameData.serverTime >= outSt){
            return true;
        }
        return false;
    }

    //本地化出巡时间
    public localOutTime():{st:number, et:number}{
        let stHour = App.DateUtil.formatSvrHourByLocalTimeZone(this.emperorOutCfg.phrase[0]).hour;
        let etHour = App.DateUtil.formatSvrHourByLocalTimeZone(this.emperorOutCfg.phrase[1]).hour;
        return {st:stHour, et:etHour};
    }

    //是否显示出巡按钮
    public isShowEmperorOutIcon():boolean{
        if (this.emperorAchieveVo.outingList.length > 0 ){
            let data = this.emperorAchieveVo.outingList;
            for (let i=0; i < data.length; i++){
                if (this.isInOuting(data[i].st)){
                    return true;
                }
            }
        }
        return false;
    }

    public setShowAni(isShow:boolean):void{
        this.isShowAni = isShow;
    }

    //是否显示出巡动画
    public isShowEmpOutAni():boolean{
        let playerLv = Api.playerVoApi.getPlayerLevel();
        if (!this.emperorAchieveVo.shownotice && this.isShowEmperorOutIcon() && this.isShowAni && playerLv >= this.emperorOutCfg.lvNeed2){
            return true;
        }
        return false;
    }

    //是否显示巡游红点
    public isShowEmpOutRedDot():boolean{
        if (this.isShowEmperorOutIcon() && this.isShowOutRedDot()){
            return true;
        }
        return false;
    }

    public isShowOutRedDot():boolean{
        let data = this.getOutList();
        let playerId = Api.playerVoApi.getPlayerID();
        for (let i=0; i < data.length; i++){
            if (this.isInOuting(data[i].st)){
                if (this.isShowSendWordRedDot(data[i].uid)){
                    return true;
                }
                else{
                    let isAuthor = false;
                    if (data[i].uid == playerId){
                        isAuthor = true;
                    }
                    if (this.isHavePopularRewardByuid(data[i].uid, isAuthor) && !this.isFirstSendWordByUid(data[i].uid)){
                        return true;
                    }
                }
            }
        }
        if (this.isHaveBonusReward()){
            return true;
        }
        return false;
    }

    //是否显示出巡红点by uid
    public isShowOutRedDotByUid(uid:number):boolean{
        let data = this.getOutList();
        let playerId = Api.playerVoApi.getPlayerID();
        for (let i=0; i < data.length; i++){
            if (data[i].uid == uid && this.isInOuting(data[i].st)){
                if (this.isInOuting(data[i].st)){
                    let isAuthor = false;
                    if (data[i].uid == playerId){
                        isAuthor = true;
                    }
                    if (this.isShowSendWordRedDot(data[i].uid) || this.isHavePopularRewardByuid(data[i].uid, isAuthor) || (!isAuthor && this.isCanGetBonusReward(data[i].uid))){
                        return true;
                    }
                }
                break;
            }
        }
        return false;
    }

    //出巡列表
    public getOutList():any[]{
        return this.emperorAchieveVo.outingList;
    }

    //获取某个人的出巡信息
    public getOutDataByuid(uid:number):any{
        let data = this.getOutList();
        for (let i = 0; i < data.length; i++){
            if (data[i].uid == uid){
                return data[i];
            }
        }
        return null;
    }

    //出巡倒计时
    public getOutTimeCountDown(st:number):{timeStr:string, time:number}{
        // let time0Day = App.DateUtil.getWeeTs(GameData.serverTime);
        let et = st + this.emperorOutCfg.lastTime;
        let time = et - GameData.serverTime;
        if (time <= 0){
            time = 0;
        }
        return {timeStr:App.DateUtil.getFormatBySecond(time, 1), time:time};
    }

    //人气值
    public getCurrPopularByuid(uid:number):number{
        return this.emperorAchieveVo.getPopularScoreByUid(uid);
    }

    //是否未发过言
    public isFirstSendWordByUid(uid:number):boolean{
        let data = this.emperorAchieveVo.barrage;
        if (data && data[uid] && data[uid] > 0){
            return false;
        }
        return true;
    }

    //发言红点
    public isShowSendWordRedDot(uid:number):boolean{
        let playerLevel = Api.playerVoApi.getPlayerLevel();
        let pUid = Api.playerVoApi.getPlayerID();
        let needLevel = this.emperorOutCfg.lvNeed;
        if (uid == pUid){
            return this.isFirstSendWordByUid(uid);
        }
        else{
            if (needLevel <= playerLevel && this.isFirstSendWordByUid(uid)){
                return true;
            }
        }
        return false;
    }

    //发言列表
    public getRandBarragePool():number[]{
        let data = this.emperorAchieveVo.barragePool;
        data.sort((a,b)=>{return a-b;});
        return data;
    }

    //获取当前最大弹幕数量
    public getMaxBarrageNumByUid(uid:number):number{
        let curScore = this.getCurrPopularByuid(uid);
        let data = this.emperorOutCfg.barrage
        let rangeArr = null;
        for (let i= 0; i < data.length; i++){
            rangeArr = data[i].popularityRange;
            if (curScore >= rangeArr[0] && curScore <= rangeArr[1]){
                return data[i].barrageNum;
            }
        }
        return data[data.length - 1].barrageNum;
    }

    //人气奖励相关
    public isGetPopularReward(uid:number, id:string):boolean{
        let info = this.emperorAchieveVo.getPopularityRwd;
        if (info && info[uid] && info[uid][id]){
            return true;
        }
        return false;
    }
    
    //是否有可领取奖励
    public isHavePopularRewardByuid(uid:number, isAuthor:boolean):boolean{
        let dataCfg = this.emperorOutCfg.getAchievement1CfgList();
        if (isAuthor){
            dataCfg = this.emperorOutCfg.getAchievement2CfgList();
        }
        let score = this.getCurrPopularByuid(uid);
        for (let i = 0; i < dataCfg.length; i++){
            if (!this.isGetPopularReward(uid, dataCfg[i].id) && score >= dataCfg[i].needPopularity){
                return true;
            }
        }
        return false;
    }

    //排序后的人气
    public getSortOutAchieveCfg(uid:number, data:any):any{
        let _data:any[] =[];
        for (let i = 0; i < data.length; i++){
            _data.push(data[i]);
        }
        let curScore = this.getCurrPopularByuid(uid);
        for (let i = 0; i < _data.length; i++){
            if (this.isGetPopularReward(uid, _data[i].id)){
                _data[i].sortId = _data.length + Number(_data[i].id);
            }
            else if (curScore >= _data[i].needPopularity){
                _data[i].sortId = Number(_data[i].id) - _data.length;
            }
            else{
                _data[i].sortId = Number(_data[i].id);
            }
        }
        _data.sort((a, b)=>{ return a.sortId - b.sortId});
        return _data;
    }

    

    //请安列表
    public sortWishListData(data:any):any[]{
        // let allianceVo = Api.allianceVoApi.getAllianceVo();
        let myAllianceId = Api.playerVoApi.getPlayerAllianceId();
        if (!myAllianceId){
            myAllianceId = 0;
        }
        App.LogUtil.log("sortWishListData: "+myAllianceId);
        let list:any[] = [];
        for (let i = 0; i < data.length; i++){
            let isSame = 0;
            if (data[i].mygid != 0 && data[i].mygid == myAllianceId){
                isSame = 1;
            }
            let _data:any = {isSame: isSame, data:data[i]};
            list.push(_data);
        }
        list.sort((a, b)=>{
            if (a.data.value == b.data.value){
                if (a.isSame == b.isSame){
                    if (a.data.level == b.data.level){
                        return a.data.uid - b.data.uid;
                    }
                    else{
                        return b.data.level - a.data.level;
                    }
                }
                else{
                    return b.isSame - a.isSame;
                }
            }
            else{
                return b.data.value - a.data.value;
            }
        });

        return list;
    }

    //获取赏赐数据
    public getBonusData():any{
        return this.emperorAchieveVo.bonus;
    }

    //是否可领取赏赐奖励
    public isCanGetBonusReward(uid:number):boolean{
        if (this.emperorAchieveVo.getBonus && this.emperorAchieveVo.getBonus[uid] == 1){
            return true;
        }
        return false;
    }

    //是否有赏赐奖励可领取
    public isHaveBonusReward():boolean{
        let data = this.getOutList();
        let playerUid = Api.playerVoApi.getPlayerID();
        for (let i = 0; i < data.length; i++){
            if (data[i].uid != playerUid && this.isCanGetBonusReward(data[i].uid)){
                return true;
            }
        }
        return false;
    }

    //当前已发言数量
    public getBarrageNumByUid(uid:number):number{
        if (this.emperorAchieveVo.barrageNum && this.emperorAchieveVo.barrageNum[uid]){
            return this.emperorAchieveVo.barrageNum[uid];
        }
        return 0;
    }

    //是否已达最大发言数量
    public isMaxBarrageNum(uid:number):boolean{
        let curNum = this.getBarrageNumByUid(uid);
        if (curNum >= this.emperorOutCfg.barrageTimes){
            return true;
        }
        return false;
    }

    //被赏赐的数据
    public getBonusTextDataByUid(uid:number):any[]{
        let data = this.getOutDataByuid(uid);
        let _data:any [] = [];
        let bonus = data.data.bonus;
        if (!bonus){
            return null;
        }
        for (let key in bonus){
            _data.push(bonus[key]);
        }
        return _data;
    }

    //出巡配置
    public get emperorOutCfg():any{
        return Config.EmperoroutingCfg;
    }
    
    public dispose(){
        this.isShowAni = true;

        super.dispose();
    }

}