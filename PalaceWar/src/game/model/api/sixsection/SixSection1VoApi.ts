/**
 * 皇城六部
 * author ycg
 * date 2020.5.7
 * @class SixSectionVoApi
 */
class SixSection1VoApi extends BaseVoApi
{
    public sixSection1Vo:SixSection1Vo;
    public _mapInfo:any = {};
    public _titleInfo:any = {};

    private _buildCfg:any[] = [];
    private _directorCfg:any[] = [];

    private _logList:any[] = [];

	public constructor() 
	{
		super();
    }

    public get st():number{
        return this.sixSection1Vo.version;
    }

    public get realSt():number{
        return this.st + this.cfg.openTime * 3600;
    }

    public get et():number{
        return this.st + this.cfg.lastTime * 86400;
    }

    //是否在可进行时间内
    public isInPeriousTime():boolean{
        let svTime = GameData.serverTime;
        if (svTime > this.realSt && svTime < this.et){
            return true;
        }
        return false;
    }

    //是否在活动时间内
    public getTimePeriousStatus():number{
        //1 未开启 2 已结束  3 已结束
        let svTime = GameData.serverTime;
        
        if (svTime < this.realSt){
            return 1;
        }
        else if (svTime >= this.st && svTime < this.et){
            return 2;
        }
        else{
            return 3;
        }
    }

    //兵部是否处于开启状态
    public isOpenSixSection1():boolean{
        if (Api.switchVoApi.checkOpenSixSection() && Api.switchVoApi.checkOpenHouseBtnUp() && Api.switchVoApi.checkOpenSixSectionBuilding(1) && this.isCanPlayByLvlimit() && this.isInPeriousTime() && this.checkServantLimit()){
            return true;
        }
        return false;
    }

    //影响力
    public getInfluenceData():any{
        if (this.sixSection1Vo){
            return this.sixSection1Vo.influence;
        }
    }

    //当前兵部头衔
    public getCurrTitleId():number{
        if (this.sixSection1Vo){
            if (this.sixSection1Vo.director && this.sixSection1Vo.director.attackst){
                if (this.sixSection1Vo.director.fuid){
                    return null;
                }
                return this.sixSection1Vo.director.x;
            }
        }
        return null;
    }

    //某个席位的数据
    public getSeatDataByPos(floor:number, index:number):any{
        let data = this.getMapInfoByFloor(floor);
        if (data && data.length > 0){
            return data[index];
        }
        return null;
    }

    //已使用门客
    public getUseServant():any{
        if (this.sixSection1Vo){
            // return this.sixSection1Vo.info.usesid;
            let buildCfg = this.formatBuildCfg();
            let data = this.sixSection1Vo.build;
            if (!data){
                return [];
            }
            let list:any[] = [];
            for (let i=0; i < data.length; i++){
                if (data[i].fuid || data[i].et){
                }
                else{
                    let seatData = buildCfg[data[i].x - 1];
                    let endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                    if (GameData.serverTime < endTime){
                        for (let k=0; k < data[i].sids.length; k++){
                            list.push(data[i].sids[k]);
                        }
                    }
                }
            }
            return list;
        }
        return [];
    }

    //是否使用过该门客
    public isUsedServant(id:number|string):boolean{
        // if (this.sixSection1Vo && this.sixSection1Vo.info.usesid && this.sixSection1Vo.info.usesid[id]){
        //     return true;
        // }
        if (this.isInSeatServant(id)){
            return true;
        }
        return false;
    }

    //门客是否在席位中
    public isInSeatServant(id:number|string):boolean{
        if (!this.sixSection1Vo){
            return false;
        }
        let buildCfg = this.formatBuildCfg();
        let data = this.sixSection1Vo.build;
        for (let i=0; i < data.length; i++){
            if (data[i].fuid || data[i].et){
            }
            else{
                let seatData = buildCfg[data[i].x - 1];
                let endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                if (GameData.serverTime < endTime){
                    for (let k=0; k < data[i].sids.length; k++){
                        if (Number(id) == Number(data[i].sids[k])){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    //查看过的阵容
    public getLookedZhenRong(line:number, index:number):any{
        if (this.sixSection1Vo && this.sixSection1Vo.info.investigate){
            let mapInfo = this.getSeatDataByPos(line, index);
            if (mapInfo){
                let data = this.sixSection1Vo.info.investigate;
                for (let i=0; i < data.length; i++){
                    if (mapInfo.attackst == data[i].attackst && line == data[i].x && index+1 == data[i].y){
                        return data[i];
                    }
                }
            }
        }
        return null;
    }

    //格式化建筑数据 每行是一个item
    public formatBuildCfg():any[]{
        if (this._buildCfg.length > 0){
            return this._buildCfg;
        }
        let data:any[] = [];
        // let baseData = this.sixSectionVo.formatBuildCfg();
        let baseData = this.cfg.getBuildList();
        let lineNum = 1;
        for (let i=0; i < baseData.length; i++){
            let baseCfg = baseData[i];
            let rowNum = Math.ceil(baseCfg.seatNumber/baseCfg.perMaxSeat);
            let seatIndex = 0;
            for (let k=0; k < rowNum; k++){
                let isFirst = false;
                let isLast = false;
                let seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber%baseCfg.perMaxSeat >0){
                    seatNum = baseCfg.seatNumber%baseCfg.perMaxSeat;
                }
                if (k == 0){
                    isFirst = true;
                }
                else if (k == rowNum - 1){
                    isLast = true;
                }
                seatIndex = k * baseCfg.perMaxSeat;
                let cfg = {lineNum: lineNum, seatNum:seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast:isLast};
                lineNum += 1;
                data.push(cfg);
                this._buildCfg.push(cfg);
            }
        }
        // console.log("buildCfg ", data);
        return this._buildCfg;
    }

    public getBuildCfgByLine(line:number):any{
        let buildCfg = this.formatBuildCfg();
        if (buildCfg && buildCfg[line-1]){
            return buildCfg[line-1];
        }
        return null;
    }

    public setMapInfo(data:any){
        if (data){
            for (let k in data){
                let row = Number(k) * 10 + 1;
                for (let i=0; i < data[k].length; i++){
                    let num = row + i;
                    if (!this._mapInfo[num]){
                        this._mapInfo[num] = {};
                    }
                    this._mapInfo[num] = data[k][i];
                } 
            }
        }
        // console.log("setMapinfo ",this._mapInfo);
    }

    public getMapInfoByFloor(floor:number):any{
        if (this._mapInfo && this._mapInfo[floor]){
            return this._mapInfo[floor];
        }
        return null;
    }

    public clearBuildMapInfo():void{
        this._mapInfo = {};
    }

    //格式化头衔数据 每行是一个item
    public formatTitleCfg():any[]{
        if (this._directorCfg.length > 0){
            return this._directorCfg;
        }
        // let baseData = this.sixSectionVo.formatBuildCfg();
        let baseData = this.cfg.getDirectorList();
        // console.log("formatTitleCfg ", baseData);
        let lineNum = 1;
        for (let i=0; i < baseData.length; i++){
            let baseCfg = baseData[i];
            let rowNum = Math.ceil(baseCfg.seatNumber/baseCfg.perMaxSeat);
            for (let k=0; k < rowNum; k++){
                let isFirst = false;
                let isLast = false;
                let seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber%baseCfg.perMaxSeat >0){
                    seatNum = baseCfg.seatNumber%baseCfg.perMaxSeat;
                }
                if (k == 0){
                    isFirst = true;
                }
                if (k == rowNum - 1){
                    isLast = true;
                }
                let seatIndex = k * baseCfg.perMaxSeat;
                let cfg = {lineNum: lineNum, seatNum:seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast:isLast};
                lineNum += 1;
                // data.push(cfg);
                this._directorCfg.push(cfg);
            }
        }
        // console.log("formatTitleCfg ", this._directorCfg);
        return this._directorCfg;
    }

    public getTitleCfgByLine(line:number):any{
        let data = this.formatTitleCfg();
        if (data && data[line-1]){
            return data[line-1];
        }
        return null;
    }

    public setTitleInfo(data:any){
        if (data){
            for (let k in data){
                let row = Number(k) * 10 + 1;
                for (let i=0; i < data[k].length; i++){
                    let num = row + i;
                    if (!this._titleInfo[num]){
                        this._titleInfo[num] = {};
                    }
                    this._titleInfo[num] = data[k][i];
                } 
            }
        }
    }

    public setClearTitleInfo(floor:number):void{
		if (this._titleInfo && this._titleInfo[floor]){
			this._titleInfo[floor] = null;
		}
	}

    public getTitleInfoByFloor(floor:number):any{
        if (this._titleInfo && this._titleInfo[floor]){
            return this._titleInfo[floor];
        }
        return null;
    }

    public clearTitleMapInfo():void{
        this._titleInfo = {};
    }

    //返回经过排序后的id  属性 >资质 > 等级
	public getServantInfoIdListWithSort()
	{
		//排序数据，刷新列表
		let servantListObj= Api.servantVoApi.getServantInfoList();
		let keys:string[] = Object.keys(servantListObj);
		//总属性排序
        keys.sort((a:string,b:string)=>{
            let servantA = servantListObj[a];
            let servantB = servantListObj[b];
            // if (Api.switchVoApi.checkOpenExile()) {
                
            // 	if (servantA.banishSt && (!servantB.banishSt)) {
            // 		return 1;
            // 	}
            // 	else if (servantA.banishSt && servantB.banishSt) {
            // 		if (servantA.total == servantB.total) {
            // 			return Number(b) - Number(a);
            // 		} else {
            // 			if (Number(servantB.total) == Number(servantA.total)) {
            // 				return Number(b) - Number(a);
            // 			}
            // 			return Number(servantB.total) - Number(servantA.total);
            // 		}

            // 	}
            // 	else if ((!servantA.banishSt) && servantB.banishSt) {
            // 		return -1;
            // 	}
            // 	else if ((!servantA.banishSt) && (!servantB.banishSt)) {
            // 		if (servantA.total == servantB.total) {
            // 			return Number(b) - Number(a);
            // 		} else {
            // 			if (Number(servantB.total) == Number(servantA.total)) {
            // 				return Number(b) - Number(a);
            // 			}
            // 			return Number(servantB.total) - Number(servantA.total);
            // 		}
            // 	}

            // }
            // else {
                if (servantA.total == servantB.total) {
                    let bookAv =servantA.getTotalBookValue();
                    let bookBv =servantB.getTotalBookValue(); 
                    if (Number(bookAv) == Number(bookBv)){
                        if (servantA.level == servantB.level){
                            return Number(b) - Number(a);
                        }
                        else{
                            return servantB.level - servantA.level;
                        }
                    }
                    else{
                        return Number(bookBv) - Number(bookAv);
                    }
                } else{
                    return Number(servantB.total) - Number(servantA.total);
                }
            // }
        });
		return keys;
    }
    
    //获取玩家最高级称号，相同按sortiD取，没有显示官品
    public getPlayerMaxTitleStr():string{
        let titleInfo = Api.itemVoApi.getTitleInfo()
        if (!titleInfo){
            return Api.playerVoApi.getPlayerOffice();
        }
        let id = this.getMaxTitle(titleInfo);
        if (!id){
            return Api.playerVoApi.getPlayerOffice();
        }
        return LanguageManager.getlocal("palace_titleName"+id);
    }

    public getMaxTitle(data:any):number{
        if (!data){
            return null;
        }
        let v = -1;
        let sortId = 0;
        let id = 0;
        for (let k in data){
            let cfg = Config.TitleCfg.getTitleCfgById(k);
            if (cfg){
                if (cfg.isTitle == 1)
                {
                    // let titleType = cfg.titleType;
                    // if (cfg.titleType == 7){
                    //     titleType = 0;
                    // }
                    // if (v == -1)
                    // {
                    //     v = titleType;
                    //     id = Number(k);
                    //     sortId = cfg.sortId;
                    // }
                    // else if (v == titleType){
                    //     if (sortId > cfg.sortId){
                    //         sortId = cfg.sortId;
                    //         id = Number(k);
                    //     }
                    // }
                    // else if (v > titleType)
                    // {
                    //     v = titleType;
                    //     sortId = cfg.sortId;
                    //     id = Number(k);
                    // }
                    if (sortId == 0){
                        sortId = cfg.sortId;
                        id = Number(k);
                    }
                    else if (cfg.sortId < sortId){
                        sortId = cfg.sortId;
                        id = Number(k);
                    }
                    
                }
            }
        }
        if (id){
            let cfg = Config.TitleCfg.getTitleCfgById(id);
            if (cfg.titleType == 3 || cfg.titleType == 4){
                return null;
            }
        }
        return id;
    }

    //0 可以抢夺 1 对方称号较高 2对方官品较高
    public getCanHoldStatus(holdTitleId:number, officeLv:number):number{
        let titleInfo = Api.itemVoApi.getTitleInfo();
        let pTitle = this.getMaxTitle(titleInfo);
        if (pTitle && holdTitleId){
            let pCfg = Config.TitleCfg.getTitleCfgById(pTitle);
            let pType = pCfg.titleType;

            let hCfg = Config.TitleCfg.getTitleCfgById(holdTitleId);
            let hType = hCfg.titleType;
            let pLv = Api.playerVoApi.getPlayerLevel();
            if(pType == hType){
                if (pLv >= officeLv){
                    return 0;
                }
                else if (pLv < officeLv){
                    return 2;
                }
            }
            else{
                if(pType == 7){
                    return 0;
                }
                else if(hType == 7){
                    return 1;
                }
                if ((pType == 3 || pType == 4) && (hType == 3 || hType == 4)){
                    if (pLv >= officeLv){
                        return 0;
                    }
                    else if (pLv < officeLv){
                        return 2;
                    }
                }
                if((pType <= 4 && hType <= 4) || (pType >= 5 && hType >= 5)){
                    if (pType < hType){
                        return 0;
                    }
                }
                else if(pType >= 5 && hType < 5){
                    if (hType > 2){
                        return 0;
                    }
                }
                else if(hType >= 5 && pType < 5){
                    if (pType < 3){
                        return 0;
                    }
                }
                return 1;
            }
        }
        else if (pTitle && !holdTitleId){
            let pCfg = Config.TitleCfg.getTitleCfgById(pTitle);
            let pType = pCfg.titleType;
            if (pType != 4 && pType!= 3){
                return 0;
            }
            else{
                let pLv = Api.playerVoApi.getPlayerLevel();
                if (pLv >= officeLv){
                    return 0;
                }
                else{
                    return 2;
                }
            }
        }
        else if (!pTitle && holdTitleId){
            let hCfg = Config.TitleCfg.getTitleCfgById(holdTitleId);
            let hType = hCfg.titleType;
            if (hType != 4 && hType!= 3){
                return 1;
            }
            else{
                let pLv = Api.playerVoApi.getPlayerLevel();
                if (pLv >= officeLv){
                    return 0;
                }
                else{
                    return 2;
                }
            }
        }
        else{
            let pLv = Api.playerVoApi.getPlayerLevel();
            if (pLv >= officeLv){
                return 0;
            }
            else{
                return 2;
            }
        }
    }

    //我的据点
    public getSortMyBuildData():any{
        if (!this.sixSection1Vo){
            return null;
        }
        let buildCfg = this.formatBuildCfg();
        let data = this.sixSection1Vo.build;
        let buildData:any[] = [];
        for (let i=0; i < data.length; i++){
            let seatData = buildCfg[data[i].x - 1];
            //不可采集
            let status = 1;
            //被抢夺 或已结束
            if (data[i].fuid || data[i].et){
                status = 2;
            }
            else{
                let endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                if (GameData.serverTime >= endTime){
                    //已结算
                    status = 2;
                }
                else{
                    let collSt = data[i].st;
                    if (data[i].collectSt){
                        collSt = data[i].collectSt;
                    }
                    let getTime = collSt + seatData.baseCfg.minGetTime * 60;
                    let getInfoNum = Math.floor((GameData.serverTime - collSt) * seatData.baseCfg.shujijingyanSpeed / 3600);
                    if (GameData.serverTime > getTime && getInfoNum >= 1){
                        //可采集
                        status = 0;
                    }
                    else{
                        status = 1;
                    }
                }
            }
            buildData[i] = {data: data[i], status: status, baseCfg: seatData};
        }
        buildData.sort((a, b)=>{
            if (a.status == b.status){
                return b.data.attackst - a.data.attackst;
            }
            return a.status - b.status;
        });
        return buildData;
    }

    //结算的据点
    public getResultSeat():any{
        if (!this.sixSection1Vo){
            return null;
        }

        let directorList:any[] = [];
        let dirData = this.sixSection1Vo.director;
        if (dirData && dirData.show && dirData.show == 1){
            let data = {data: dirData, type: "director"}
            directorList.push(data);
        }

        let data = this.sixSection1Vo.build;
        let list:any[] = [];
        for (let i=0; i < data.length; i++){
            if (data[i].show == 1){
                let status = 0;
                if (data[i].fname || data[i].fres){
                    status = 1;
                }
                list.push({data: data[i], status: status, type: "build"});
            }
        }
        if (list.length > 1){
            list.sort((a, b)=>{
                if (a.status == b.status){
                    return a.data.et - b.data.et;
                }
                else{
                    return b.status - a.status;
                }
            })
        }
        if (directorList.length > 0){
            let data = directorList.concat(list);
            return data;
        }
        return list;
    }

    //抢夺记录
    public setLogList(data:any){
        this._logList = data;
    }

    public getLogList():any{
        return this._logList;
    }

    //头衔抢夺次数
    public getHoldTitleFreeNum():number{
        if (this.sixSection1Vo && this.sixSection1Vo.info.dFreeTime){
            return this.sixSection1Vo.info.dFreeTime;
        }
        return 0;
    }

    //编号查询的数据
    public getSearchInfo():any{
        if (this.sixSection1Vo && this.sixSection1Vo.info.search){
            return this.sixSection1Vo.info.search;
        }
        return null;
    }

    /**充值相关 */
    public getSortRechargeCfg():any[]{
        let dataCfg = this.cfg.getRechargeList();
        let cfgLen = dataCfg.length;
        let currRecharge = this.getRechargeNum();
        let data:any[] = [];
        for (let i=0; i < cfgLen; i++){
            if (this.isGetRechargeById(dataCfg[i].id)){
                dataCfg[i].sortId = dataCfg[i].id;
            } 
            else{
                if (currRecharge >= dataCfg[i].needGem){
                    dataCfg[i].sortId = dataCfg[i].id - cfgLen - 1;
                }
                else{
                    dataCfg[i].sortId = dataCfg[i].id + cfgLen;
                }
            }
            data[i] = dataCfg[i];
        }
        return data.sort((a, b)=>{return a.sortId - b.sortId});
    }

    //是否已领取
    public isGetRechargeById(id:number|string):boolean{
        if (this.sixSection1Vo && this.sixSection1Vo.info.rinfo && this.sixSection1Vo.info.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    //是否可领取
    public getRechargeNum():number{
        if (this.sixSection1Vo && this.sixSection1Vo.info.rinfo && this.sixSection1Vo.info.rinfo.v){
            return this.sixSection1Vo.info.rinfo.v;
        }
        return 0;
    }

    //可派遣对大队伍数量
    public getHoldTeamMaxNum():number{
        return Config.Sixsection1Cfg.maxTeamNum;
    }

    //当前已派遣的次数
    public getHoldTeamNum():number{
        let count = 0;
        if (this.sixSection1Vo && this.sixSection1Vo.build){
            let data = this.sixSection1Vo.build;
            let buildCfg = this.formatBuildCfg();
            for (let i=0; i < data.length; i++){
                if (data[i].fuid || data[i].et){
                }
                else{
                    let seatData = buildCfg[data[i].x - 1];
                    let endTime = data[i].st + data[i].remain * 3600 / seatData.baseCfg.shujijingyanSpeed;
                    if (GameData.serverTime < endTime){
                        count ++;
                    }
                }
            }
        }
        return count;
    }

    public checkHoldTeamLimit():boolean{
        if (this.getHoldTeamNum() >= this.getHoldTeamMaxNum()){
            return true;
        }
        return false;
    }

    //兵部门客数量是否大于30
    public getServantLimit():number{
        return Config.Sixsection1Cfg.maxServantNum;
    }

    public checkServantLimit():boolean{
        if (Api.servantVoApi){
            let servantCount = Api.servantVoApi.getServantCount();
            if (servantCount >= this.getServantLimit()){
                return true;
            }
        }
        return false;
    }

    //武力前30门客
    public getServantList():any[]{
        if (this.sixSection1Vo && this.sixSection1Vo.info.sids){
            return this.sixSection1Vo.info.sids;
        }
        return [];
    }

    public getSortServantList():any[]{
        let list = this.getServantList();
        if (list && list.length >= this.getServantLimit()){
            list.sort((a, b)=>{
                let aVo = Api.servantVoApi.getServantObj(a);
                let bVo = Api.servantVoApi.getServantObj(b);
                let bookLv1 = aVo.getTotalBookValue(1);
                let bookLv2 = bVo.getTotalBookValue(1);
                if (bookLv1 == bookLv2){
                    if (aVo.level == bVo.level){
                        return Number(b) - Number(a);
                    }
                    else{
                        return bVo.level - aVo.level;
                    }
                }
                return bookLv2 - bookLv1;
            })
            return list;
        }
        return [];
    }

    public getBuffBookValueCount(bv:number):number
	{	
		let v = 0;
        let allSids = Api.servantVoApi.getServantInfoIdListWithSort(0);
        let selSids = this.getServantList();
		for (let i = 0; i< allSids.length; i++)
		{
			let oneid = allSids[i];
			if (GameData.isInArray(oneid, selSids) == false)
			{
				let servantObj = Api.servantVoApi.getServantObj(oneid);
				if (servantObj.getTotalBookValue() >= bv)
				{
					v++;
				}
			}
		}
		return v;
    }
    
    //加成 总值
    public getBaseBuff():number[]
    {	
        let buffAtk:number = 0;
        let buffCrit:number = 0;
        let baseBuff = Config.Sixsection1Cfg.baseBuff;
        for (let k in baseBuff)
        {
            let onebuff = baseBuff[k];
            let needv = onebuff["1"].needAbility;
            let servantCount = this.getBuffBookValueCount(needv);
            let oneValue1 = 0;
            let oneValue2 = 0;
            for (let j in onebuff)
            {
                let threebuff = onebuff[j];
                if (servantCount >= threebuff.servantNum)
                {	
                    if (threebuff.addAtk)
                    {
                        oneValue1 =  threebuff.addAtk;
                    }
                    if (threebuff.addCrit)
                    {
                        oneValue2 =  threebuff.addCrit;
                    }
                    
                }
                else 
                {
                    break;
                }
            }
            buffAtk += oneValue1;
            buffCrit += oneValue2;
        }
        return [buffAtk, buffCrit];
    }

    //
    public getBaseBuffListById(k:number):any[]
    {
        let v = [];
        let baseBuff = Config.Sixsection1Cfg.baseBuff;
        let onebuff = baseBuff[k];
        for (let j in onebuff)
        {
            let threebuff = onebuff[j];
            v.push(threebuff);
        }
        return v;
    }

    public getBaseBuffList():any[]
    {	
        let v = [];
        let baseBuff = Config.Sixsection1Cfg.baseBuff;
        for (let k in baseBuff)
        {
            let onebuff = baseBuff[k];
            let needv = onebuff["1"].needAbility;
            let servantCount = this.getBuffBookValueCount(needv);
            let oneValue1 = 0;
            let oneValue2 = 0;
            let level = 0;
            let onetype = onebuff["1"].addAtk > 0 ? 1:2;
            for (let j in onebuff)
            {
                let threebuff = onebuff[j];
                if (servantCount >= threebuff.servantNum)
                {	
                    if (threebuff.addAtk)
                    {
                        oneValue1 =  threebuff.addAtk;
                    }
                    else if (threebuff.addCrit)
                    {
                        oneValue2 =  threebuff.addCrit;
                    }
                    level = Number(j);
                }
                else 
                {
                    break;
                }
            }
            let onev = {id:k, needv: needv, lv :level , type : onetype, v1:oneValue1, v2 : oneValue2, maxLv : Object.keys(onebuff).length, sc:servantCount}
            v.push(onev);
        }
        return v;
    }

    //充值红点
    // public isCanGetRechargeReward():boolean{
    //     let data = this.cfg.getRechargeList();
    //     let currRecharge = this.getRechargeNum();
    //     for (let i=0; i < data.length; i++){
    //         if (!this.isGetRechargeById(data[i].id) && currRecharge >= data[i].needGem){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    //官品限制条件
    public isCanPlayByLvlimit():boolean{
        let needLv = Config.Sixsection1Cfg.needLv;
        let pLv = Api.playerVoApi.getPlayerLevel();
        if (needLv <= pLv){
            return true;
        }
        return false;
    }

    /**红点相关 */
    //结算红点
    public checkSeatResultRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        let list = this.getResultSeat();
        if (list && list.length > 0){
            return true;
        }
        return false;
    }

    //充值可领取红点
    public checkRechargeRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        let data = this.cfg.getRechargeList();
        let currRecharge = this.getRechargeNum();
        for (let i=0; i < data.length; i++){
            if (!this.isGetRechargeById(data[i].id) && currRecharge >= data[i].needGem){
                return true;
            }
        }
        return false;
    }

    //可采集红点
    public checkMySeatRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        let data = this.getSortMyBuildData();
        for (let i=0; i < data.length; i++){
            if (data[i].status == 0){
                return true;
            }
        }
        return false;
    }

    //防守红点
    public checkSeatDefenRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        if (this.sixSection1Vo && this.sixSection1Vo.info.dinfoRP){
            return true;
        }
        return false;
    }

    //仇人红点
    public checkSeatEnemyRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        if (this.sixSection1Vo && this.sixSection1Vo.info.einfoRP){
            return true;
        }
        return false;
    }

    //席位信息红点
    public checkSeatInfoRed():boolean{
        return this.checkMySeatRed() || this.checkSeatDefenRed() || this.checkSeatEnemyRed();
    }

    //无头衔显示红点
    public checkTitleRed():boolean{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            return false;
        }
        let titleId = this.getCurrTitleId();
        if (titleId){
            return false;
        }
        return true;
    }

    //红点
    public checkRedPoint():boolean{
        if (this.sixSection1Vo){
            return this.isCanPlayByLvlimit() && this.checkServantLimit() && (this.checkSeatInfoRed() || this.checkTitleRed() || this.checkRechargeRed());
        }
        return false;
    }   

    public get cfg(){
        return Config.Sixsection1Cfg;
    }

    public dispose():void
	{
        this._mapInfo = {};
        this._buildCfg = [];
        this._directorCfg = [];
        this._logList = [];

		super.dispose();
	}
}