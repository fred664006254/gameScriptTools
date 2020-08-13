class AcConquerMainLandVo extends AcBaseVo {
    public selIdx: number = 0;
    private info: any = null;
    private servant: any = null;
    private mapInfo: any = null;
    private myarmyinfo: any = [];
    private maxCity: number = 0;
    private teamspecialNum: any = {};
    private dontnotice = [];
    private prankinfo = null;
    private zrankinfo = null;
    private warlog: any = null;
    private myscore: number = 0;
    private lastteam: any = {};
    public extraAttr:any = {};
    public firstflag:number = 0;
    private attrSum:number = 0;
    private buff:number = 0;
    private team:any = {};

    public constructor() {
        super();
    }

    public initData(data: any): void {
        super.initData(data);
        for (let key in data) {
            this[key] = data[key];
        }
    }

    public getCountDown(): number {
        let num = 0;
        let period = this.getCurPeriod();
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    }

    public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
    }
    public isLastPeriod():boolean{
        let day = this.getNowDay();
        if(day == 3){
            let st = this.st + 2 * 3600;
            let et = this.et - 86400 * this.cfg.extraTime;
            let unit = this.cfg.timeAndBuff[day - 1];
            let startTime = st + Number(day - 1) * 86400 + unit[unit.length-1].startTime;
            let endTime = st + Number(day - 1) * 86400 + unit[unit.length-1].endTime;
            if(unit[unit.length-1].buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime){
                return true;
            }
        }
        return false;

    }
    //判断当前活动阶段 1尚未开启 2活动开启  3特殊阶段休战 4当前活动已经结束
    public getCurPeriod(): number {
        let period = 1;
        let st = this.st + 2 * 3600;
        let et = this.et - 86400 * this.cfg.extraTime;
        if (GameData.serverTime < st) {
            period = 1;
        }
        else if (GameData.serverTime >= st && GameData.serverTime < et) {
            period = 2;
            let day = this.getNowDay();
            for (let i in this.cfg.timeAndBuff[day - 1]) {
                let unit = this.cfg.timeAndBuff[day - 1][i];
                let startTime = st + Number(day - 1) * 86400 + unit.startTime;
                let endTime = st + Number(day - 1) * 86400 + unit.endTime;
                if (unit.buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime) {
                    period = 3;
                    break;
                }
            }
        }
        else if (GameData.serverTime >= et) {
            period = 4;
        }
        return period;
    }
    //交战阶段 1正常 2激战
    public getFightPeriod(): number {
        let day = this.getNowDay();
        let st = this.st + 2 * 3600;
        let et = this.et - 86400 * this.cfg.extraTime;
        let period = 1;
        let cfg = this.cfg.timeAndBuff[day - 1];
        let specialbuff = 1;
        //大于每天第一次交战期的buff(一般是1)为激战
        if (cfg && cfg[1] && cfg[1].buff) {
            specialbuff = cfg[1].buff;
            for (let i in cfg) {
                let unit = cfg[i];
                let startTime = st + Number(day - 1) * 86400 + unit.startTime;
                let endTime = st + Number(day - 1) * 86400 + unit.endTime;
                if (unit.buff > specialbuff && GameData.serverTime >= startTime && GameData.serverTime < endTime) {
                    period = 2;
                    break;
                }
            }
        }
        return period;
    }
    //获取最终胜利区服
    public getWinServer(): number {
        let zid = 0;
        let rank = this.getZrankList();
        if(rank[0] && rank[0].zid){
            zid = Number(rank[0].zid);
        }
        return zid;
    }

    public getNowDay(): number {
        let day = 0;
        let count = 0;
        count = Math.ceil((GameData.serverTime - this.st - 2 * 3600) / 86400);
        let st = this.st + 2 * 3600;
        let et = this.et - 86400 * this.cfg.extraTime;
        if (GameData.serverTime < st) {
            day = 0;
        }
        else if (GameData.serverTime >= et) {
            day = 4;
        }
        else {
            day = count % 3 == 0 ? 3 : (count % 3)
        }

        return Math.max(0, day);
    }

    public getPeriodTime(): number {
        let period = this.getCurPeriod();
        let time = 0;
        let today0 = this.st + 2 * 3600;
        let day = this.getNowDay();
        switch (period) {
            case 1:
                time = this.st + 2 * 3600;
                break;
            case 3:
                for (let i in this.cfg.timeAndBuff[day - 1]) {
                    let unit = this.cfg.timeAndBuff[day - 1][i];
                    let startTime = today0 + Number(day - 1) * 86400 + unit.startTime;
                    let endTime = today0 + Number(day - 1) * 86400 + unit.endTime;
                    if (unit.buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime) {
                        if (Number(i) == 0) {
                            time = endTime;
                        }
                        else {
                            time = endTime + 32400;
                        }
                        break;
                    }
                }
                break;
        }
        return Math.max(0, time - GameData.serverTime);
    }

    //参赛资格
    public isCanJoin(): boolean {
        let flag = false;
        if (this.info && this.info.iscanjoin) {
            flag = true;
        }
        return flag;
    }

    private get cfg(): Config.AcCfg.ConquerMainLandCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }


    public getLastTeamInfo(armyid) {
        let team = [];
        if (this.lastteam && this.lastteam[armyid]) {
            for (let i in this.lastteam[armyid]) {
                let unit = this.lastteam[armyid][i];
                let sid = unit;
                let attend = this.getServantAttend(sid);
                if (attend == 0) {
                    team.push({
                        army: armyid,
                        data: Api.servantVoApi.getServantObj(sid),
                        isAttend: false
                    });
                }
            }
            team.sort((a, b) => {
                return b.data.total - a.data.total;
            });
        }
        return team;
    }

    public getIdleTeamIndex():number{
        for (let i = 0; i < 3; i++) {
            if(!this.isArmySend(i+1)){
                return i
            }
        }
        return 0;

    }


    public get isShowRedDot(): boolean {
        if(this.isCanJoin()&&this.isInActivity()&& this.getCurPeriod() == 2){
            if(Object.keys(this.team).length < 3){
                return true;
            }
        }
        return false;
    }

    public get acTimeAndHour(): string {
        let et = this.et - 86400 * this.cfg.extraTime;
        return App.DateUtil.getOpenLocalTime(this.st + 2 * 3600, et, true);
    }

    public isInActivity(): boolean {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    }

    //个人排名
    public getMyPrank(): number {
        let rank = 0;
        if (this.prankinfo && this.prankinfo.myrank && this.prankinfo.myrank.myrank) {
            rank = this.prankinfo.myrank.myrank;
        }
        return rank;
    }
    //个人分数
    public getMyPScore(): number {
        let score = 0;
        if (this.prankinfo && this.prankinfo.myrank && this.prankinfo.myrank.value) {
            score = this.prankinfo.myrank.value;
        }
        return score;
    }

    //个人分数
    public getMyScore(): number {
        let score = this.myscore;
        return score;
    }

    public getPrankList(): any[] {
        let arr = [];
        if (this.prankinfo && this.prankinfo.rankList) {
            arr = this.prankinfo.rankList;
        }
        return arr;
    }
    //区服排名
    public getMyServerRank(): number {
        let rank = 0;
        let list = this.getZrankList();
        for (let i in list) {
            if (Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(), Number(list[i].zid))) {
                rank = Number(i) + 1;
                break;
            }
        }
        return rank;
    }
    //区服分数
    public getMyServerScore(): number {
        let score = 0;
        let list = this.getZrankList();
        for (let i in list) {
            if (Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(), Number(list[i].zid))) {
                score = list[i].zscore;
                break;
            }
        }
        return score;
    }
    public getMyCity():{mainland:string, building:string}[]{
        let arr = [];
        let info = this.myarmyinfo;
        for (let i = 0; i < info.length; i++) {
            const item = info[i]; 
            let ispush = true;
            for (let j = 0; j < arr.length; j++) {
                const jtem = arr[j];
                if(item.mainland == jtem.mainland && item.building == jtem.building){
                    ispush = false;
                }  
            }
            if(ispush){
                arr.push({mainland:item.mainland,building:item.building})
            }
        }
        return arr;

    }
    public getZrankList(): any[] {
        let arr = [{ zid: 1 }];
        if (this.zrankinfo && this.zrankinfo.rankList) {
            arr = this.zrankinfo.rankList;
        }
        return arr;
    }




    public getMyRecord(data: any): any[] {
        //战斗开启 打斗记录 战斗结束
        let nowday = this.getNowDay();
        let tmp = this.cfg.timeAndBuff[nowday - 1];
        let st = this.st + 2 * 3600;
        let obj: any = {};
        for (let i in tmp) {
            let unit = tmp[i];
            let startTime = st + Number(nowday - 1) * 86400 + unit.startTime;
            let endTime = st + Number(nowday - 1) * 86400 + unit.endTime;
            if (GameData.serverTime >= startTime) {
                if (unit.buff == 0 && Number(i) == 0 && GameData.serverTime >= endTime) {
                    //开战提示
                    obj.start = {
                        time: endTime,
                        type: 1,//1 开战提示 2倍率变动 3今日战斗结束 4正常战斗记录
                        army: nowday,
                    };
                }
                if (this.getFightPeriod() == 2 && GameData.serverTime < endTime) {
                    //激战期内倍率变动
                    obj.fight = {
                        time: startTime,
                        type: 2,//1 开战提示 2倍率变动 3今日战斗结束 4正常战斗记录
                        buff: unit.buff,
                    };
                }
                //结束期
                if (unit.buff == 0 && Number(i) > 0 && GameData.serverTime < endTime) {
                    //今日结束
                    obj.end = {
                        time: startTime,
                        type: 3,//1 开战提示 2倍率变动 3今日战斗结束 4正常战斗记录
                        army: nowday,
                    };
                }
            }
        }
        let record = [];
        let max = data.length;
        if (obj.start) {
            record.push(obj.start);
        }

        for (let i = 0; i < max; ++i) {
            let unit = data[i];
            let citylevel = unit.mainland;
            let cityNum = unit.building;
            let cityIdx = unit.segment;
            record.push({
                time: unit.st,
                type: unit.conquerStat,//1 开战提示 2倍率变动 3今日战斗结束 4我方成功占领 5敌方攻占 6我方撤出 7npc战斗
                cityId: `${citylevel}_${cityNum}`,
                army: unit.teamnum,
                lasttime: unit.scorestat ? (unit.st - unit.scorestat.st) : 0,
                score: unit.scorestat ? App.StringUtil.changeIntToText(unit.scorestat.getScore) : 0,
                fightteam: unit.fightteam,
                uid: unit.uid,
                name: Api.playerVoApi.getPlayerName(),
                title: Api.playerVoApi.getTitleid(),//getTitleid(),
                fuid: unit.fuid,
                fname: unit.fname,
                ftitle: unit.ftitle,
                citylevel: citylevel,
                cityNum: cityNum,
                cityIdx: cityIdx
            });
        }
        record.sort((a, b) => {
            return a.time - b.time;
        })
        if (obj.end) {
            record.push(obj.end);
        }
        if (obj.fight) {
            record.push(obj.fight);
        }
        record.reverse();
        return record;
    }

    //获取每分钟收益
    public getMyScorePerMin(): number {
        let per = 0;
        for (let i in this.myarmyinfo) {
            let unit = this.myarmyinfo[i];
            let citylevel = unit.mainland;
            let cityNum = unit.building;
            let cityIdx = unit.segment;

            let num = 0;
            if (citylevel == 7) {
                num = this.cfg.mainLand[citylevel - 1].getScore[0][0];
            }
            else {
                num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
            }
            per += num;
        }
        return per * this.getTimeBuff();
    }

    public getTimeBuff(): number {
        let buff = 1;
        let day = this.getNowDay();
        let tmp = this.cfg.timeAndBuff[day - 1];
        let st = this.st + 2 * 3600;
        for (let i in tmp) {
            let unit = tmp[i];
            let startTime = st + Number(day - 1) * 86400 + unit.startTime;
            let endTime = st + Number(day - 1) * 86400 + unit.endTime;
            if (GameData.serverTime >= startTime && GameData.serverTime < endTime) {
                buff = unit.buff;
                break;
            }
        }
        return buff;

    }
    //军团信息
    public isArmySend(id: number): boolean {
        let flag = false;
        for (let i in this.myarmyinfo) {
            let unit = this.myarmyinfo[i];
            if (Number(unit.teamnum) == id) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    //获取出战军团的门客信息
    public getArmyServant(id: number): any[] {
        let obj = {};
        if (this.isArmySend(id)) {
            for (let i in this.myarmyinfo) {
                let unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == id) {
                    obj = unit.team;
                    break;
                }
            }
        }

        let arr = [];
        for (let i in obj) {
            let sid = obj[i].sid;
            let attend = this.getServantAttend(obj[i].servantId);
            arr.push({
                army: id,
                data: Api.servantVoApi.getServantObj(sid),
                isAttend: false
            });
        }
        arr.sort((a, b) => {
            return b.data.total - a.data.total;
        });
        return arr;
    }

    public zidarr = [];
    public setZidInfo(data): void {
        this.zidarr = [];
        this.zidarr = data;
    }
    public setBuff(data){
        this.buff = 0;
        this.buff = data;
    }

    public getArmyInfo(armyid: number): any {
        let obj: any = {};
        let citylevel = 0;
        let cityNum = 0;//
        let cityIdx = 0;
        let total = 0;
        if (this.isArmySend(armyid)) {
            for (let i in this.myarmyinfo) {
                let unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == armyid) {
                    citylevel = unit.mainland;
                    cityNum = unit.building;
                    cityIdx = unit.segment;
                    for (let i in unit.team) {
                        total += (unit.team[i].dps);
                    }
                    let num = 0;
                    if (citylevel == 7) {
                        num = this.cfg.mainLand[citylevel - 1].getScore[0][0];
                    }
                    else {
                        num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
                    }
                    obj = {
                        cityId: `${citylevel}_${cityNum}`,
                        scoreper: num * this.getTimeBuff(),
                        totalnum: total,
                        citylevel: unit.mainland,
                        cityNum: unit.building,
                        cityIdx: unit.segment,
                    }
                    break;
                }
            }
        }
        return obj
    }

    public clearArmyInfo(armyid: number): any {
        if (this.isArmySend(armyid)) {
            for (let i in this.myarmyinfo) {
                let unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == armyid) {
                    this.myarmyinfo.splice(Number(i), 1);
                    break;
                }
            }
        }
    }



    public getCityName(cityId: string): string {
        let cityArr = cityId.split(`_`);
        let cityLevel = Number(cityArr[0]);
        let cityNum = Number(cityArr[1]);
        let cityIdx = Number(cityArr[2]);
        let cityName = '';
        let code = this.code;
        if (Number(code) == 2) {
            code = 1;
        }
        if (cityNum > this.cfg.mainLand[cityLevel - 1].buildingNum) {
            cityName = LanguageManager.getlocal(`acmainlandcity${cityLevel}_${cityNum % 24 == 0 ? 24 : (cityNum % 24)}-${code}`) + LanguageManager.getlocal(`acmainlandcityPos${(cityNum - 24) % 8 == 0 ? (8) : ((cityNum - 24) % 8)}-${code}`);
        }
        else {
            cityName = LanguageManager.getlocal(`acmainlandcity${cityLevel}_${cityNum}-${code}`);
        }
        if (cityIdx) {
            let nameStr = '';
            if (cityLevel > 3) {
                nameStr = LanguageManager.getlocal(`acConquerMainLandWarBuild4-${code}`, [cityIdx.toString()]);
            }
            else {
                nameStr = LanguageManager.getlocal(`acConquerMainLandWarBuild${cityLevel}_${cityNum}_${cityIdx}-${code}`, [cityIdx.toString()]);
            }
            if(PlatformManager.checkIsViSp()){
                cityName = cityName + " " +nameStr;
            }else{
                cityName += nameStr;
            }

        }

        return cityName;
    }

    //获取对应城市被占领的据点
    public getCityObserveNum(cityLevel: number, cityNum: number): number {
        let num = 0;
        for (let i in this.mapInfo) {
            let unit = this.mapInfo[i];
            if (Number(unit.mainland) == cityLevel && Number(unit.building) == cityNum) {
                num = unit.num;
                break;
            }
        }
        return num;
    }

    //战斗记录
    public getWarLog(): any[] {
        let log = this.warlog;
        let arr = [];
        /**
         * "segment":1,
                "p2":2,
                "uid":2000258,
                "building":1,
                "fuid":2000160,
                "p1":2,
                "name":"密藏今",
                "p3":2
                mainland:1
         */
        for (let i in log) {
            let unit = log[i];
            let citylevel = unit.mainland;
            let winId = unit.p1 == 2 ? unit.fuid : unit.uid;
            let loseId = unit.p1 == 2 ? unit.uid : unit.fuid;
            let obj = {
                callback: unit.p1 == 3,
                title: {
                    type: unit.p1,
                },
                report: {
                    type: unit.p1 == 2 ? 5 : unit.p2,
                    rid: unit.p2,
                },
                win: {
                    type: (unit.p3 >= 3 ? (unit.p1 == 1 ? 2 : 1) : 0),
                    num: unit.p3,
                },
                time: unit.st,
                winId: winId,
                loseId: loseId,
                winzid: Api.mergeServerVoApi.getTrueZid(winId),
                losezid: Api.mergeServerVoApi.getTrueZid(loseId),
                winName: unit.p1 == 2 ? unit.fname : unit.name,
                loseName: unit.p1 == 2 ? unit.name : unit.fname,
                winTitle: unit.p1 == 2 ? unit.ftitle : unit.title,
                loseTitle: unit.p1 == 2 ? unit.title : unit.ftitle,
                zid: Api.mergeServerVoApi.getTrueZid(winId),
                fzid: Api.mergeServerVoApi.getTrueZid(loseId),
                citylevel: citylevel,
                cityNum: unit.building,
                cityIdx: unit.segment,
                fightteam: unit.fightteam,
                winteam: unit.p1 == 2 ? unit.fightteam.fteam : unit.fightteam.mteam,
                loseteam: unit.p1 == 2 ? unit.fightteam.mteam : unit.fightteam.fteam,
            };
            arr.push(obj);
        }
        return arr;
    }

    public setWarLog(data: any): any {
        this.warlog = data;
    }

    //最近一条记录
    public getLastChargeLog(): any {
        let log = this.getWarLog();
        let obj = null;
        if (log && log[0]) {
            obj = log[0];
        }
        return obj;
    }

    //填充数目的最低级城市数目 一定是4的倍数
    public getCityMax(): number {
        let num = this.maxCity;
        return num;
    }



    //门客出战费用 0就是免费
    public getServantCost(sid: string | number): { cost: number, freeNum: number } {
        let todayhave = 0;
        if (this.servant && this.servant[sid]) {
            todayhave = this.servant[sid];
        }
        let num = this.cfg.teamInfo.warTime - todayhave;
        let cost = 0;
        if (num <= 0) {
            cost = this.cfg.teamInfo.buyTime[Math.min(-num, this.cfg.teamInfo.buyTime.length - 1)]
        }
        return {
            cost: cost,
            freeNum: num
        }
    }

    //门客出战军团
    public getServantAttend(sid: string | number): number {
        let attend = 0;//App.MathUtil.getRandom(0,4);
        for (let i in this.myarmyinfo) {
            let unit = this.myarmyinfo[i];
            for (let k in unit.team) {
                if (Number(unit.team[k].sid) == Number(sid)) {
                    attend = unit.teamnum;
                    return attend;
                }
            }
        }
        return attend;
    }

    public isTip(type: number): boolean {
        return true;
    }

    //大地图信息 占领人数
    public setMapInfo(data: any): void {
        this.mapInfo = data;
    }

    //补充城市数目
    public setMaxCity(num: number): void {
        this.maxCity = num;
    }

    //补充城市数目
    public setMyScore(num: number): void {
        if (num) {
            this.myscore = Number(num);
        }
    }

    //我的军团信息
    public setMyTeamInfo(data: any): void {
        /*--mid
        --uid
        --team
        --teamnum
        --specialNum
        --mainland
        --building
        --segment
        --st
        --npc
        --group
        --version*/
        this.myarmyinfo = data;
    }

    public setPrankinfo(data: any): void {
        this.prankinfo = {
            rankList: data.rankList,
            myrank: data.myrank
        };
    }

    public setZrankinfo(data: any): void {
        this.zrankinfo = data;
        this.zrankinfo = {
            rankList: data.zidrankList,
            myrank: data.myrank
        };
    }

    public isInJudge(): boolean {
        let flag = false;
        if (this.getCurPeriod() > 1) {
            let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
            let st = today0 + 22 * 3600;
            let et = today0 + 22 * 3600 + 10 * 60;
            if (GameData.serverTime >= st && GameData.serverTime < et) {
                flag = true;
            }
        }
        return flag;
    }

        //得到区服排名第一名的服务器名称
        public getFirstServerName():string{
            let serverText = "";
            let serverrankList = this.zrankinfo.zidrankarr;//[];//]//this._rankInfo.serverrankList;
            if(serverrankList.length > 0){
                let first = serverrankList[0];
                if(this.getQuByZid(first.zid) > 0){
                    // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                    serverText = LanguageManager.getlocal("mergeServerOnlyqu",[String(this.getQuByZid(first.zid))]);
                } else {
                   
                    serverText = LanguageManager.getlocal("ranserver2",[String(first.zid)]);
                }
            }
            return serverText;
        }
        public getQuByZid(zid:number|string):number{
            let zidObj = null;
            for(let i =0;i< this.zidarr.length;i++){
                zidObj = this.zidarr[i];
                if(Number(zidObj.zid) == Number(zid)){
                    return zidObj.qu;
                }
            }
            return 0;
        }

        public getPowerAddBuff(level?:number):number{

            return Math.round(this.buff * this.getBuffMultiple(level));
        }

        public getBuffLevel(): number {
            const servantAttBuff = this.cfg.servantAttBuff;
            const totalAddAttr = this.attrSum;
            for (let index = 0; index < servantAttBuff.length; index++) {
                const element = servantAttBuff[index];
                let lower = element.attIncrease[0];
                let upper = element.attIncrease[1];
                if(totalAddAttr>=lower && totalAddAttr<=upper){
                    return index+1;
                }  
            }
            return 1;
        }

        public getNextAddNeedNum():number{
            //因为数组从零开始 用"当前等级"去取配置直接能取下一级的
            let nextIndex = this.getBuffLevel()> (this.cfg.maxBuffLevel-1) ?(this.cfg.maxBuffLevel-1):this.getBuffLevel();
            return this.cfg.servantAttBuff[nextIndex].attIncrease[1];
        }

        public getNextAddCurNum():number{
            return this.attrSum;
        }

        public getServantAcPower(servantId:any):number{
            servantId = String(servantId);
            let servantInfo = Api.servantVoApi.getServantObj(servantId);
            let total = Number(servantInfo.total) ;
            let extra = Number((this.extraAttr[servantId] || 0) * this.getPowerAddBuff()) ;
            let acPower = total + extra;
            return acPower;
        }
        private getBuffMultiple(level?):number{
            const servantAttBuff = this.cfg.servantAttBuff;
            level = level || this.getBuffLevel();
            if(level){
                level = level> this.cfg.maxBuffLevel ?this.cfg.maxBuffLevel:level;

                return servantAttBuff[level-1].rankBuff;
            }  
            return 1;
				
        }
    public dispose(): void {
        this.selIdx = 0;
        this.info = null;
        this.servant = null;
        this.mapInfo = null;
        this.myarmyinfo = [];
        this.maxCity = 0;
        this.teamspecialNum = null;
        this.dontnotice = [];
        this.prankinfo = null;
        this.zrankinfo = null;
        this.warlog = null;
        this.zidarr = [];
        this.lastteam = null;;
        this.extraAttr = {};
        this.firstflag = 0;
        this.attrSum = 0;
        this.buff = 0;
        this.team = {};
        super.dispose();
    }
}