/**
 * 征收api
 * @class LevyVoApi
 */
class LevyVoApi extends BaseVoApi {
    private levyVo: LevyVo;
    public redDotState:boolean = false;

    public constructor() {
        super();
    }

    public checkNpcMessage(): boolean {
        return false;
    }

	public checkRedPoint():boolean
    {   
        return this.redDotState;
    }
    public getFakersoldier():number
    {   
        return this.levyVo.pinfo.fakersoldier||0;
    }

    public checkHaveServantCanSend(itemIndex:number){
    }

    //获取征收进度条
    public getLevyProgressBar(levyIndex: number,width:number = 370): ProgressBar {

        let progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", width);
        let percent = 0;
        let st = Api.levyVoApi.getLevyItemSt(levyIndex);
        let interval = Config.LevyCfg.LevyItemList[levyIndex].interval
        if (st) {
            const _reduce = Math.max(0, GameData.serverTime - st);
            const _interval = Config.LevyCfg.LevyItemList[levyIndex].interval;
            percent = (_reduce % _interval) / _interval;
            if (_reduce >= _interval && percent == 0) {
                percent = 1;
            }
        }
        progressBar.setPercentage(percent);
        egret.Tween.get(progressBar, {
            loop: false, onChange: () => {
                let remain = Math.ceil(interval * (1 - progressBar.getPercent()));
                let remainStr = remain<10?(remain+LanguageManager.getlocal("date_second")):App.DateUtil.getFormatBySecond(remain, 8);
                progressBar.setText(LanguageManager.getlocal("levy_addremainsec", [remainStr]));
            }, onChangeObj: this
        })
            .to({ percent: 1 }, interval * (1 - percent) * 1000)
            .call(() => {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LEVY_PROGRESS_FULL,{levyIndex:levyIndex});
                progressBar.setPercentage(0);
                Api.levyVoApi.levyUpdate(levyIndex);
                egret.Tween.removeTweens(progressBar);

                egret.Tween.get(progressBar, {
                    loop: true, onChange: () => {
                        let remain = Math.ceil(interval * (1 - progressBar.getPercent()));
                        let remainStr = remain<10?(remain+LanguageManager.getlocal("date_second")):App.DateUtil.getFormatBySecond(remain, 8);
                        progressBar.setText(LanguageManager.getlocal("levy_addremainsec", [remainStr]));
                    }, onChangeObj: this
                })
                    .to({ percent: 1 }, interval * 1000)
                    .call(() => {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LEVY_PROGRESS_FULL,{levyIndex:levyIndex});
                        Api.levyVoApi.levyUpdate(levyIndex);
                        progressBar.setPercentage(0);
                    });
            });
        return progressBar

    }
    //获取征收停止的进度条
    public getLevyStopProgressBar(width?:number,type?:number): BaseTextField|ProgressBar {

        let _width =  width||370;
        if(type && type == 2){
            let progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", width);
            let percent = 0;
            progressBar.setPercentage(percent,LanguageManager.getlocal("levy_itemlaunchcondition"));
            return progressBar;
        }else{
            let condiTxt  = ComponentManager.getTextField(LanguageManager.getlocal("levy_itemlaunchcondition"),22,TextFieldConst.COLOR_BROWN_NEW);
            condiTxt.width = _width;
            condiTxt.textAlign = egret.HorizontalAlign.CENTER;
            return condiTxt
        }
    }

    /**
     * 获取需显示的征收条目
     */
    public getLevyItemList(): any[] {
        return Config.LevyCfg.LevyItemList || [];
    }
    /**
    * 获取需显示的征收条目数量
    */
    public getLevyUnlockNum(): number {
        let _len = 0;
        for (let i = 0; i < this.getLevyItemList().length; i++) {
            if (this.checkLevyItemUnlock(i)) {
                _len++;
            }
        }
        return _len;
    }

    /**
     * 检查征收条目是否已启动
     */
    public checkLevyItemIsLaunch(index: number): boolean {
        if(this.levyVo && this.levyVo.info){
            if (index == 0) return true;
            if (this.levyVo.info[index] &&this.levyVo.info[index].islaunch) return true;
        }
        return false;
    }

    /**
     * 检查征收条目是否解锁
     */
    public checkLevyItemUnlock(index: number): boolean {
        if(this.levyVo && this.levyVo.info){
            if (index == 0) return true;
            if (this.levyVo.info[index]) return true;
        }
        return false;
    }
    //获取总资源速率(格式化后)
    public getTotalAddRate(type: string): string {
        type = type.substring(0, 1);
        return App.StringUtil.changeIntToText3(Number(this.levyVo.attr[type + "rate"]) || 0) ;
    }

    public getTotalAddRateStr(type: string):string{
        type = type.substring(0, 1);
        let rate = Number(this.levyVo.attr[type + "rate"]) || 0;
        let signalParam = "";
        if(rate>=0){
            signalParam = "+";
        }
        let rateParam =  App.StringUtil.changeIntToText3(rate) ;

        return LanguageManager.getlocal("levy_addnum", [signalParam,rateParam]);
    }

    //获取总资源速率(没有格式化)
    public getTotalRawAddRate(type: string): number {
        type = type.substring(0, 1);
        return Number(this.levyVo.attr[type + "rate"]) || 0 ;
    }

    //获取条目的vo信息
    public getLevyItem(index: number): any {
        if (index == 0) {
            return this.levyVo.pinfo;
        } else {
            return this.levyVo.info[index] || {};
        }
    }

    //获取条目速率
    public getLevyItemRate(index: number): { grate: number, frate: number, srate: number } {
        if (index == 0) {
            return this.levyVo.pinfo;
        } else {
            if (this.levyVo.info[index] && this.levyVo.info[index].rate) {
                return this.levyVo.info[index].rate;
            }

        }
        return { grate: 0, frate: 0, srate: 0 };
    }

    public getLevyItemSt(index): number {
        if (this.levyVo.st[String(index)]) {
            return this.levyVo.st[String(index)];
        }
        let _st = 0;
        if (index == 0) {
            _st = this.levyVo.pinfo.st + 5;
        } else {
            if (this.levyVo.info[index] && this.levyVo.info[index].st) {
                _st = this.levyVo.info[index].st + 5;
            }
        }
        return _st;
    }

    //计算时间并判断加资源
    private levyAdd(index) {
        if (this.getLevyItemSt(index)) {
            //前端加资源会写入vo的st,后端同步时会清空vo的st
            let _st = this.getLevyItemSt(index);
            const _reduce = Math.max(0, GameData.serverTime - _st);
            const _interval = Config.LevyCfg.LevyItemList[index].interval
            if (_reduce >= _interval) {
                let _beishu = Math.floor(_reduce / _interval);
                //加资源
                Api.playerVoApi.addLevyGoods(this.getLevyItemRate(index), _beishu);
                this.levyVo.st[String(index)] = GameData.serverTime - (_reduce % _interval);
            }
        }
    }

    //获取派驻的门客
    public getLevyItemServantIds(index): any {
        let sids = this.levyVo.info[index].sids || {};
        return sids;
    }

    //根据门客id获取所在位置:"条目id_位置id"
    public getLevyItemServantPos(servantId): string {
        let sinfo = this.levyVo.sinfo || {};
        let pos = '';
        if (sinfo[servantId]) {
            let itemIndex = sinfo[servantId];
            let servantIndex = "1";
            let sids = this.getLevyItemServantIds(itemIndex);
            for (const key in sids) {
                if (sids.hasOwnProperty(key)) {
                    if (sids[key] == servantId) {
                        servantIndex = key;
                    }
                }
            }
            pos = `${itemIndex}_${servantIndex}`;
        }
        return pos;
    }



    //全局常驻定时器调用的更新器
    public levyUpdate(index?: number) {
        if (typeof (index) === "number") {
            //指定更新
            this.levyAdd(index);
        } else {
            //全部更新
            let _len = this.getLevyUnlockNum();
            for (let i = 0; i < _len; i++) {
                this.levyAdd(i)
            }
        }
    }

    //获取该位置buff配置
    public getBuffCfg(itemIndex: number, buffIndex: number): { condType: number, condNum: number | number[], levyBuffID: string[] } {
        itemIndex = Number(itemIndex);
        buffIndex = Number(buffIndex);
        let buffId = this.getBuffId(itemIndex,buffIndex);
        let buffCfg = Config.LevyCfg.buff[buffId];
        return buffCfg;
    }

    public getBuffId(itemIndex: number, buffIndex: number){
        return Config.LevyCfg.LevyItemList[itemIndex].buffGroup[buffIndex];
    }

    //获取该位置buff的vo情况
    public getBuffInfo(itemIndex: number): any {
        itemIndex = Number(itemIndex);
        if (this.levyVo.info[itemIndex] && this.levyVo.info[itemIndex].buff) {
            return this.levyVo.info[itemIndex].buff;
        }
        return null;

    }
    //获取该buff是否已满
    public getBuffIsFull(itemIndex: number, buffIndex: number): boolean {
        itemIndex = Number(itemIndex);
        buffIndex = Number(buffIndex);
        let buff = this.getBuffInfo(itemIndex);
        if (buff) {
            let buffId = this.getBuffId(itemIndex,buffIndex);
            if (buff[buffId]) {
                return true;
            }
        }
        return false;
    }

    /**获取该buff的进度 itemIndex buffIndex都从1开始*/
    public getBuffNumByPos(itemIndex: number, buffIndex: number): number {
        itemIndex = Number(itemIndex);
        buffIndex = Number(buffIndex);
        let buffCfg = this.getBuffCfg(itemIndex, buffIndex);
        if (this.getBuffIsFull(itemIndex, buffIndex)) {
            return buffCfg.condType == 3 ? buffCfg.condNum[1] : buffCfg.condNum;
        }
        let sids = this.getLevyItemServantIds(itemIndex);
        let num = 0;
        if (buffCfg.condType == 1) {
            for (const key in sids) {
                if (sids.hasOwnProperty(key)) {
                    num += Number(Api.servantVoApi.getServantObj(sids[key]).level);
                }
            }

        } else if (buffCfg.condType == 2) {
            for (const key in sids) {
                if (sids.hasOwnProperty(key)) {
                    num += Number(Api.servantVoApi.getServantObj(sids[key]).getTotalBookValue());
                }//
            }
        } else if (buffCfg.condType == 3) {
            for (const key in sids) {
                let __servant = Config.ServantCfg.getServantItemById(sids[key]);
                if (__servant.quality >= buffCfg.condNum[0]) num++;
            }
        }
        return num;
    }

    //获取buff进度字符串"100/100"
    public getBuffStateStr(itemIndex: number, buffIndex: number): string {
        itemIndex = Number(itemIndex);
        buffIndex = Number(buffIndex);
        let textColor = TextFieldConst.COLOR_WARN_RED_NEW;
        let buffCfg = this.getBuffCfg(itemIndex, buffIndex);
        let base = buffCfg.condNum;
        if (buffCfg.condType == 3) {
            base = buffCfg.condNum[1];
        }
        let num = this.getBuffNumByPos(itemIndex, buffIndex);
        if(num >= base){
            textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
        }
        return App.StringUtil.formatStringColor(num + "/" + base,textColor) ;
    }

    //获取该buff增加的资源数量
    public getBuffAddNumById(buffId): number {
        let buffInfoCfg = Config.LevyCfg.getBuffInfoCfg(buffId);
        let addRate = buffInfoCfg.rate;
        let addNum = 0;
        if (addRate >= 0) {
            addNum = Math.floor(Api.playerVoApi.getPropertyByType(buffInfoCfg.attType) * addRate);
        } else {
            addNum = 0 - Math.floor(Api.playerVoApi.getPropertyByType(buffInfoCfg.attType) * (0-addRate));
        }
        return addNum;
    }

    //获取该条目的buff星星数量
    public getBuffStarNum(itemIndex:number):number{
        let starNum = 0;
        const buffInfo = this.getBuffInfo(itemIndex);
        if(buffInfo){
            for (const key in buffInfo) {
                if (buffInfo.hasOwnProperty(key)) {
                    starNum += Number(buffInfo[key]);
                }
            }
        }
        return starNum;
    }
    
    /**根据pos获取启动条件 pos格式"征收id_位置id",返回launch:"类型_等级"*/
    public getLaunchConditionByPos(pos:string):{type:number,need:number}{
        const launch:string = Config.LevyCfg.LevyItemList[Number(pos.split("_")[0])].launch[Number(pos.split("_")[1])-1];
        const type = Number(launch.split("_")[0]);
        const need = Number(launch.split("_")[1]);
        return {type:type,need:need};
    }

    /**
     * 检查门客是否可以派遣（类型&等级）
     */
    public checkServantCanLaunch(servantId:string,pos:string):boolean{
        const launch = this.getLaunchConditionByPos(pos);
        const serSp = Config.ServantCfg.getServantItemById(servantId).speciality;
        const level = Api.servantVoApi.getServantObj(servantId).level;
        let typeCondi = false;
        if(launch.type >= 5 || (serSp.indexOf(6) != -1) || (serSp.indexOf(5) != -1) ||(serSp.indexOf(launch.type) != -1)){
            typeCondi = true
        }
        if(typeCondi && level >= launch.need){
            return true;
        }
        return false;
    }

    public getLevyUnlockList():{[levyID:string]:string}{
        return Config.PersoninfoCfg.levyUnlockPersonList;
    }

    //targetSpid:选择的目标类型 mySpId:需求类型 Mypos:位置
    public getSortServantListBySpId(targetSpid:number, mySpId:number, MyPos:string): ServantInfoVo[]{
        let servantInfoList: ServantInfoVo[] = Api.servantVoApi.getServantInfoListBySpeciality(targetSpid);
        // for (let i = 0; i < servantInfoList.length; i++) {
		// 	let servantInfo = servantInfoList[i];
		// 	let servantId = servantInfo.servantId;
		// 	let servantCfg = Config.ServantCfg.getServantItemById(servantId);

		// 	//排序需求:0在前,1在后
		// 	//该位置的门客 0:是我 1:不是我
		// 	servantInfo.levyPos = (Api.levyVoApi.getLevyItemServantPos(servantId) == MyPos?0:1);
		// 	//是否可派:0可派,1:不可
		// 	servantInfo.levyState =(Api.levyVoApi.checkServantCanLaunch(servantId, MyPos)?0:1); 
		// 	//门客特长状态:0符合要求 1:全能或者均衡
		// 	servantInfo.levySpState =((servantCfg.speciality.indexOf(mySpId) != -1)|| (servantCfg.speciality.indexOf(6) != -1) || (servantCfg.speciality.indexOf(5) != -1))?0:1; 
		// 	if(mySpId>=5){
		// 		servantInfo.levySpState = 0;
		// 	}
		// 	//门客派遣状态 0:未派 1:已派
        //     servantInfo.levyOnStage =(Api.levyVoApi.getLevyItemServantPos(servantId)=='')?0:1;
        //     //特长符合但是等级不够
        //     servantInfo.levelNotEnough = 1;
        //     if(servantInfo.levySpState == 0){
        //         if(!Api.levyVoApi.checkServantCanLaunch(servantId,MyPos)){
        //             servantInfo.levelNotEnough = 0;
        //         }
        //     }

		// }

		// /**排序
		//  * 撤回＞能否派遣＞门客类型＞未派已派＞等级＞综合资质
		//  */
		// if(mySpId && MyPos){
		// 	servantInfoList.sort((a:any,b:any)=>{
		// 		if(a.levyPos != b.levyPos){
		// 			return a.levyPos - b.levyPos;
		// 		}else{
		// 			if(a.levyState != b.levyState){
		// 				return a.levyState - b.levyState;
		// 			}else{
        //                 if(a.levelNotEnough != b.levelNotEnough){
        //                     return a.levelNotEnough - b.levelNotEnough;
        //                 }else{
		// 				    if(a.levySpState != b.levySpState){
		// 				    	return a.levySpState - b.levySpState;
		// 				    }else{
		// 				    	if(a.levyOnStage != b.levyOnStage){
		// 				    		return a.levyOnStage - b.levyOnStage;
		// 				    	}else{
        //                             if(a.level != b.level){
        //                                 return (a.level - b.level)>0?-1:1
        //                             }else{
        //                                 return (Api.servantVoApi.getServantObj(a.servantId).getTotalBookValue()  - Api.servantVoApi.getServantObj(b.servantId).getTotalBookValue())>0?-1:1;
        //                             }
		// 				    	}
                            
        //                     }
        //                 }
		// 			}
		// 		}
        //     })
        // }


        // 新的排序规则
        // 1、拥有并激活了经营技能并且是对应区域的经营技能的，排序靠前。
        // 2、同样有激活的对应区域的技能，未派遣的靠前。
        // 3、同样有激活区域的技能，派遣状态相同的，等级高的靠前。等级相同时门客id排序，大号靠前。
        // 4、未激活对应经营技能的整体靠后。
        // 5、同样未激活对应经营技能的，未派遣的靠前。
        // 6、同样未激活技能并且派遣状态相同的，等级高的靠前。等级相同是门客id排序，大号靠前。
        // 占坑的>有无激活对应技能>是否可以派遣>派遣状态>等级>id

        const levyIndex = Number(MyPos.split("_")[0]);

        servantInfoList.sort((a, b) => {
            const pos_a = this.getLevyItemServantPos(a.servantId) == MyPos ? 0 : 1;
            const pos_b = this.getLevyItemServantPos(b.servantId) == MyPos ? 0 : 1;
            if (pos_a != pos_b) {
                return pos_a - pos_b;
            }
            // 
            let skill_a = a.activeSkillLevy && a.activeSkillLevy.levyId == levyIndex ? 0 : 1;
            let skill_b = b.activeSkillLevy && b.activeSkillLevy.levyId == levyIndex ? 0 : 1;
            if (skill_a != skill_b) {
                return skill_a - skill_b;
            }
            
            const can_a = this.checkServantCanLaunch(a.servantId, MyPos)? 0 : 1;
            const can_b = this.checkServantCanLaunch(b.servantId, MyPos)? 0 : 1;
            if (can_a != can_b) {
                return can_a - can_b;
            }

            const state_a = this.getLevyItemServantPos(a.servantId) == "" ? 0 : 1;
            const state_b = this.getLevyItemServantPos(b.servantId) == "" ? 0 : 1;
            if (state_a != state_b) {
                return state_a - state_b;
            }
            
            if (a.level != b.level) {
                return b.level - a.level;
            }

            return parseInt(b.servantId) - parseInt(a.servantId);
        });

        return servantInfoList;
    }

    //红点相关新增逻辑
    /** 获取该条目所有空位置*/
    public getEmptyPosByItemIndex(itemIndex:number):string[]{
        let emptyPos = [];
        if(itemIndex != 0){
            let launch = Config.LevyCfg.LevyItemList[itemIndex].launch || [];
            let sinfo = Api.levyVoApi.getLevyItemServantIds(itemIndex);
            for (let i = 0; i < launch.length; i++) {
                if(sinfo && sinfo[i+1]){
                    continue;
                }
                emptyPos.push(`${itemIndex}_${i+1}`);
            }
        }
        return emptyPos;
    }

    // /**
    //  * 判断指定门客经营技能是否优于当前位置门客
    //  */
    // public isBetterServant(servantId: string, pos: string): boolean {
    //     let [levyIndex, posIndex] = pos.split("_");
    //     let sid = this.getLevyItemServantIds(levyIndex)[posIndex] || null;
    //     // 这个坑是空的，当然更好
    //     if (!sid) return true;
    //     // 同一个人
    //     if (sid == servantId) return false;
    //     let servant1 = Api.servantVoApi.getServantObj(servantId);
    //     let servant2 = Api.servantVoApi.getServantObj(sid);
    //     // 没有激活的技能，凭什么比人家好
    //     if (!servant1.activeSkillLevy) return false;
    //     // 占坑的没有激活技能
    //     if (!servant2.activeSkillLevy) return true;
    //     // 如果都激活了，比比谁的数值高
    //     return servant1.activeSkillLevy.addValue > servant2.activeSkillLevy.addValue;
    // }
    /**
     * 门客技能是否适合当前坑
     * （门客可以派遣，有激活技能，技能对应场景，门客不在该场景）
     */
    public isSkillLevySuitable(servantId: string, pos: string) {
        let [levyIndex, posIndex] = pos.split("_");
        let _can = this.checkServantCanLaunch(servantId, pos);
        let servant1 = Api.servantVoApi.getServantObj(servantId);
        let _pos = this.getLevyItemServantPos(servantId);
        return _can && servant1.activeSkillLevy && servant1.activeSkillLevy.levyId == Number(levyIndex) && _pos.split("_")[0] != levyIndex;
    }

    public checkPosRedPoint(pos:string):boolean{
        let itemIndex = Number(pos.split("_")[0]);
        let launch = Api.levyVoApi.getLaunchConditionByPos(pos);
        let servantInfoVoList = Api.levyVoApi.getSortServantListBySpId(launch.type, launch.type, pos);
        // if(this.getEmptyPosByItemIndex(itemIndex).indexOf(pos) != -1){
        //     for (let i = 0; i < servantInfoVoList.length; i++) {
        //         if(this.getLevyItemServantPos(servantInfoVoList[i].servantId)){
        //             continue;
        //         }
        //         if(servantInfoVoList[i].levyState == 0 && servantInfoVoList[i].levyOnStage == 0){
        //             return true;
        //         }
        //     }
        // }
        for (let i = 0; i < servantInfoVoList.length; i++) {
            let __sid = servantInfoVoList[i].servantId;
            if (this.isSkillLevySuitable(__sid, pos)) {
                return true;
            }
            if (this.getEmptyPosByItemIndex(itemIndex).indexOf(pos) == -1) continue;
            let _pos = this.getLevyItemServantPos(__sid);
            if (this.getLevyItemServantPos(__sid) == "" && this.checkServantCanLaunch(__sid, pos)) {
                return true;
            }

        }
        return false;
    }

    public checkItemRedPoint(itemIndex:number):boolean{
        if(itemIndex != 0){
            let emptyPos = this.getEmptyPosByItemIndex(itemIndex);
            if(emptyPos && emptyPos[0]){
                for (let i = 0; i < emptyPos.length; i++) {
                    const pos = emptyPos[i];
                    if(this.checkPosRedPoint(pos)){
                        return true;
                    } 
                }
            }
        }
        return false;

    }

    public checkLevyRedPoint():boolean{
        let _len = this.getLevyUnlockNum();
        for (let i = 1; i < _len; i++) {
            if(this.checkItemRedPoint(i)){
                return true;
            }
        }
        return false;
    }

    public updateLevyRedState(){
        this.redDotState = this.checkLevyRedPoint();
    }

}