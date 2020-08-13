var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AcBaseVoApi = (function (_super) {
    __extends(AcBaseVoApi, _super);
    function AcBaseVoApi() {
        var _this = _super.call(this) || this;
        _this._acVoList = {};
        _this._newAcVoList = {};
        //活动是否激活了某些激活条件 可用于活动解锁红颜
        _this._activeUnlockMap = {}; //{[key: string]:number;};
        return _this;
    }
    AcBaseVoApi.prototype.formatData = function (data, checkCfg) {
        var needGetCfgAidArr = [];
        if (data.info) {
            var info = data.info;
            for (var key in info) {
                var aidAndVersionArr = key.split("-");
                var aid = aidAndVersionArr[0];
                if (Api.playerVoApi.getPlayerBuyGem() <= 0 && Api.switchVoApi.checkOpenHideRechargeIcon()) {
                    if (aid == "dailyCharge" ||
                        aid == "totalRecharge" ||
                        aid == "totalDayRecharge") {
                        continue;
                    }
                }
                if (Api.switchVoApi.checkClosePay()) {
                    if (aid == "dailyCharge" ||
                        aid == "totalRecharge" ||
                        aid == "totalDayRecharge" ||
                        aid == "rechargeRebate" ||
                        aid == "discount" ||
                        aid == "dailyGift" ||
                        aid == "tigertrappass" ||
                        aid == "jade" ||
                        aid == "dailyActivity" ||
                        aid == "icebreakingGift" ||
                        aid == "surprisedgift" ||
                        aid == "chargeReturnGem") {
                        continue;
                    }
                    // if((Number(aidAndVersionArr[1])>18 &&aid=="rankActive" ) )
                    // {
                    // 	continue;
                    // }
                }
                //屏蔽微信ICON
                if (PlatformManager.checkHideIconByIP()) {
                    // if(aid=="rankActive"||aid=="fourPeople"||aid=="limitedReward"||aid=="crossServerAtkRace"
                    // ||aid=="crossServerIntimacy"||aid=="crossServerPower"||aid=="punish"||aid=="mayDay"||aid=="dragonBoatDay"
                    // ||aid=="tailor"||aid=="springCelebrate"||aid=="midAutumn"||aid=="lottery"||aid=="beTheKing"||aid=="wipeBoss"
                    // ||aid=="battleGround"||aid=="wifeBattleRank"||
                    // 	aid=="oneYearOverview"
                    // 	||aid == "rechargeBoxSP"
                    // 	||aid == "ransackTraitorSP"
                    // 	||aid == "lantern"
                    // 	||aid == "oneYearRank"
                    // 	||aid == "examAnswer"
                    // 	||aid == "oneYearPack"
                    // 	||aid == "arcade"
                    // 	||aid == "newYear"
                    // 	||aid == "stargazer"
                    // 	||aid == "oneYearSign"
                    // )
                    if (Config.WxactiveshowCfg.isActivityInCfg(aid)) {
                    }
                    else {
                        continue;
                    }
                }
                var v = aidAndVersionArr[1];
                var acList = this._acVoList[aid];
                var newAcList = this._newAcVoList[aid];
                if (this._acVoList[aid] == null) {
                    acList = {};
                    this._acVoList[aid] = acList;
                }
                if (acList[v] == null) {
                    var voClassName = App.StringUtil.firstCharToUper(aid);
                    var voClass = egret.getDefinitionByName("Ac" + voClassName + "Vo");
                    if (voClass) {
                        var acVo = new voClass();
                        acVo.initData(info[key]);
                        acList[v] = acVo;
                        if (this._newAcVoList[aid] == null) {
                            newAcList = {};
                            this._newAcVoList[aid] = newAcList;
                        }
                        newAcList[v] = acVo;
                    }
                }
                else {
                    var isShow = acList[v].isShowIcon;
                    acList[v].initData(info[key]);
                    if (isShow == false && acList[v].isShowIcon) {
                        if (this._newAcVoList[aid] == null) {
                            newAcList = {};
                            this._newAcVoList[aid] = newAcList;
                        }
                        newAcList[v] = acList[v];
                    }
                }
                if (acList[v] && !acList[v].config) {
                    needGetCfgAidArr.push(key);
                }
            }
        }
        if (Config.AcCfg.isGetAll && needGetCfgAidArr && needGetCfgAidArr.length > 0) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, { activeArr: needGetCfgAidArr });
            return false;
        }
        return true;
    };
    AcBaseVoApi.prototype.formatDataStep2 = function () {
    };
    //设置活动激活条件
    AcBaseVoApi.prototype.setActiveUnlock = function (key) {
        this._activeUnlockMap["needActive_" + key] = key;
    };
    //判断某个活动是否激活某些需要活动激活的条件
    AcBaseVoApi.prototype.checkActiveIsUnlock = function (key) {
        if (this._activeUnlockMap["needActive_" + key]) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 根据活动aid判断该类活动是否需要显示红点
     * @param aid
     */
    AcBaseVoApi.prototype.checkShowRedDotByAid = function (aid, code) {
        if (code) {
            var vo = this.getActivityVoByAidAndCode(aid, code);
            if (vo && vo.isStart && vo.isShowRedDot == true) {
                return true;
            }
        }
        else {
            var voDic = this._acVoList[aid];
            var voList = [];
            if (voDic) {
                for (var code_1 in voDic) {
                    var vo = voDic[code_1];
                    if (vo && vo.isStart && vo.isShowRedDot == true) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AcBaseVoApi.prototype.checkActivityStartByAid = function (aid, code) {
        var result = false;
        if (code) {
            var vo = this.getActivityVoByAidAndCode(aid, code);
            result = vo ? vo.isStart : false;
        }
        else {
            var voList = this.getActivityVoListByAid(aid);
            if (voList) {
                var l = voList.length;
                for (var i = 0; i < l; i++) {
                    if (voList[i] && voList[i].isStart) {
                        result = true;
                        break;
                    }
                }
            }
        }
        return result;
    };
    AcBaseVoApi.prototype.getRanActives = function () {
        var actives = [];
        for (var aid in this._acVoList) {
            var voDic = this._acVoList[aid];
            if (voDic) {
                for (var code in voDic) {
                    var vo = voDic[code];
                    if (vo && vo.isStart) {
                        if (aid == "rankActive" && vo.atype != "11") {
                            actives.push(vo);
                        }
                    }
                }
            }
        }
        return actives;
    };
    //得到帮派活动icon
    AcBaseVoApi.prototype.getAllianceActivityIcons = function () {
        var icons = [];
        var allianceIconList = {
            allianceRecharge: true
        };
        var iconKeyDic = {};
        /*
                    {
                        let voDic:Object=this._acVoList[aid];
                        if(voDic)
                        {
                            for(let code in voDic)
                            {
                                let vo:AcBaseVo=voDic[code];
                                if(vo&&vo.isStart)
                                {
                                    let lowerAid:string=aid.toLowerCase();
        
        
                                    if(vo.atype){
                                        icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
                                    }
                                    else{
                                        icons.push(this.createActivityicon(aid,Number(code)));
                                    }
                                    
                                }
                            }
                        }
                    }
        */
        for (var aid in this._acVoList) {
            if (!allianceIconList[aid]) {
                continue;
            }
            var iconUrl = void 0;
            var iconNameStr = void 0;
            var voDic = this._acVoList[aid];
            if (voDic && this.checkActivityStartByAid(aid)) {
                for (var code in voDic) {
                    var vo = voDic[code];
                    if (vo && vo.isStart) {
                        var lowerAid = aid.toLowerCase();
                        icons.push(this.createActivityicon(aid, Number(code)));
                    }
                }
            }
        }
        /*

        let iconCfgName: string = Config.IconorderCfg.getIconNameByName(aid);
        let isHasChildCfg:boolean=Config.IconorderCfg.checkHasChildCfgNameByName(aid);
        if(iconCfgName||isHasChildCfg)
        {
            if(this.checkActivityStartByAid(aid))
            {
                if(isHasChildCfg)
                {
                    let voDic:Object=this._acVoList[aid];
                    if(voDic)
                    {
                        for(let code in voDic)
                        {
                            let vo:AcBaseVo=voDic[code];
                            if(vo&&vo.isStart&&vo.atype)
                            {
                                let iconCfg:Config.IconOrderItemCfg=Config.IconorderCfg.getIconCfgByAidAndType(aid,vo.atype);
                                if(iconCfg)
                                {
                                    if(iconCfg.icon)
                                    {
                                        if(!iconKeyDic[iconCfg.icon])
                                        {
                                            icons.push(this.createActivityicon(iconCfg.icon,null,vo.atype));
                                            iconKeyDic[iconCfg.icon]=iconCfg.icon;
                                        }
                                    }
                                    else
                                    {
                                        if(vo.atype){
                                            icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
                                        }
                                        else{
                                            icons.push(this.createActivityicon(aid,Number(code)));
                                        }
                                    }
                                }
                                else
                                {
                                    if(iconCfgName)
                                    {
                                        if(!iconKeyDic[iconCfgName])
                                        {
                                            icons.push(this.createActivityicon(iconCfgName,null));
                                            iconKeyDic[iconCfgName]=iconCfgName;
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if(iconCfgName)
                                {
                                    if(!iconKeyDic[iconCfgName])
                                    {
                                        icons.push(this.createActivityicon(iconCfgName,null));
                                        iconKeyDic[iconCfgName]=iconCfgName;
                                    }
                                }
                            }
                        }
                    }
                }
                else if(iconCfgName)
                {
                    if(!iconKeyDic[iconCfgName])
                    {
                        icons.push(this.createActivityicon(iconCfgName,null));
                        iconKeyDic[iconCfgName]=iconCfgName;
                    }
                }
            }
        }
    }
    */
        icons.sort(function (a, b) {
            var sortIdA = Config.IconorderCfg.getIconSortIdByCfgName(a.name);
            var sortIdB = Config.IconorderCfg.getIconSortIdByCfgName(b.name);
            return sortIdA - sortIdB;
        });
        return icons;
    };
    //判断是否双十一元宝狂欢
    AcBaseVoApi.prototype.isSingleDayOverviewActivity = function (aid, code) {
        var vo = this.getActivityVoByAidAndCode("singleDayOverview");
        if (!vo) {
            return false;
        }
        var Overview = vo.config.Overview;
        for (var index = 0; index < Overview.length; index++) {
            var element = Overview[index];
            if (element.aid == aid && "" + element.code == "" + code) {
                return true;
            }
        }
        return false;
    };
    //判断是否赚速冲榜屏蔽小icon活动,rankactive本身在mainUi.ts里面checkIsLeftIcon方法屏蔽
    AcBaseVoApi.prototype.isRankActive90ShieldIconActivity = function (aid, code) {
        if (aid == "fourPeople") {
            var rankActiveList = this._acVoList[AcConst.AID_RANKACTIVE];
            if (rankActiveList) {
                for (var racode in rankActiveList) {
                    if (rankActiveList.hasOwnProperty(racode)) {
                        var vo = rankActiveList[racode];
                        if (vo && vo.atype == "90") {
                            if ((vo.st <= GameData.serverTime) && (vo.et > (GameData.serverTime - 86400))) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    //判断是否是周年庆活动
    AcBaseVoApi.prototype.isOneYearActivity = function (aid, code) {
        var vo = this.getActivityVoByAidAndCode("oneYearOverview");
        if (!vo) {
            return false;
        }
        var Overview = vo.config.Overview;
        for (var index = 0; index < Overview.length; index++) {
            var element = Overview[index];
            if (element.aid == aid && "" + element.code == "" + code) {
                return true;
            }
        }
        return false;
    };
    //判断是否是没有icon的活动
    AcBaseVoApi.prototype.isNoIconActivity = function (aid, code) {
        var vo = this.getActivityVoByAidAndCode("dailyChargeExtra");
        if (!vo) {
            return false;
        }
        if (aid == "dailyChargeExtra") {
            return true;
        }
        return false;
    };
    AcBaseVoApi.prototype.getAllActivityIcons = function () {
        var icons = [];
        var rechargerewardicon = null;
        //疯狂系列活动的图标
        var carnivalRewardIcon = null;
        var iconKeyDic = {};
        for (var aid in this._newAcVoList) {
            var iconUrl = void 0;
            var iconNameStr = void 0;
            var iconCfgName = Config.IconorderCfg.getIconNameByName(aid);
            var isHasChildCfg = Config.IconorderCfg.checkHasChildCfgNameByName(aid);
            if (iconCfgName || isHasChildCfg) {
                if (this.checkActivityStartByAid(aid)) {
                    if (isHasChildCfg) {
                        var voDic = this._acVoList[aid];
                        if (voDic) {
                            for (var code in voDic) {
                                var vo = voDic[code];
                                if (this.isOneYearActivity(aid, code)) {
                                    continue;
                                }
                                if (this.isSingleDayOverviewActivity(aid, code)) {
                                    continue;
                                }
                                if (this.isNoIconActivity(aid, code)) {
                                    continue;
                                }
                                // if(this.isRankActive90ShieldIconActivity(aid,code)){
                                // 	continue;
                                // }
                                if (vo && vo.isStart && vo.atype) {
                                    var iconCfg = Config.IconorderCfg.getIconCfgByAidAndType(aid, vo.atype);
                                    if (iconCfg) {
                                        if (iconCfg.icon) {
                                            if (!iconKeyDic[iconCfg.icon]) {
                                                icons.push(this.createActivityicon(iconCfg.icon, null, vo.atype));
                                                iconKeyDic[iconCfg.icon] = iconCfg.icon;
                                            }
                                        }
                                        else {
                                            if (vo.atype) {
                                                icons.push(this.createActivityicon(aid, Number(code), Number(vo.atype)));
                                            }
                                            else {
                                                icons.push(this.createActivityicon(aid, Number(code)));
                                            }
                                        }
                                    }
                                    else {
                                        if (iconCfgName) {
                                            if (!iconKeyDic[iconCfgName]) {
                                                icons.push(this.createActivityicon(iconCfgName, null));
                                                iconKeyDic[iconCfgName] = iconCfgName;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (iconCfgName) {
                                        if (!iconKeyDic[iconCfgName]) {
                                            icons.push(this.createActivityicon(iconCfgName, null));
                                            iconKeyDic[iconCfgName] = iconCfgName;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (iconCfgName) {
                        if (!iconKeyDic[iconCfgName]) {
                            icons.push(this.createActivityicon(iconCfgName, null));
                            iconKeyDic[iconCfgName] = iconCfgName;
                        }
                    }
                }
            }
            else {
                var voDic = this._acVoList[aid];
                if (voDic) {
                    for (var code in voDic) {
                        if (this.isOneYearActivity(aid, code)) {
                            continue;
                        }
                        if (this.isNoIconActivity(aid, code)) {
                            continue;
                        }
                        if (this.isSingleDayOverviewActivity(aid, code)) {
                            continue;
                        }
                        // if(this.isRankActive90ShieldIconActivity(aid,code)){
                        // 	continue;
                        // }
                        var vo = voDic[code];
                        if (vo && vo.isStart) {
                            var lowerAid = aid.toLowerCase();
                            // if(aid=="rankActive"&&vo.atype != "11")
                            // {
                            // 	continue;
                            // }
                            if (vo.atype) {
                                icons.push(this.createActivityicon(aid, Number(code), Number(vo.atype)));
                            }
                            else {
                                icons.push(this.createActivityicon(aid, Number(code)));
                            }
                        }
                    }
                }
            }
        }
        this._newAcVoList = {};
        icons.sort(function (a, b) {
            // let names:string[]=[a.name,b.name];
            // names.sort();
            // if(a.name==names[0])
            // {
            // 	return -1;
            // }
            // else
            // {
            // 	return 1;
            // }
            var sortIdA = Config.IconorderCfg.getIconSortIdByCfgName(a.name);
            var sortIdB = Config.IconorderCfg.getIconSortIdByCfgName(b.name);
            return sortIdA - sortIdB;
        });
        return icons;
    };
    AcBaseVoApi.prototype.createActivityicon = function (aid, code, type) {
        var atype = type;
        var nameCode = code;
        if (!type) {
            type = code;
        }
        var isShow = false;
        if (aid == "recharge"
            || aid == "firstrecharge"
            || aid == "discount") {
            isShow = true;
        }
        else {
            isShow = Config.IconorderCfg.getisFlickByName(aid, atype);
        }
        var iconCfgBgValue = Config.IconorderCfg.getIconBgByAidAndType(aid, atype);
        var lowerAid = aid.toLowerCase();
        var typeIconKey = "ac_" + lowerAid + "-" + type;
        var iconKey = ResourceManager.hasRes(typeIconKey + "_icon") ? typeIconKey + "_icon" : "ac_" + lowerAid + "-1" + "_icon";
        var iconUrl = code ? iconKey : "ac_" + lowerAid + "_icon";
        var nameKey = ResourceManager.hasRes(typeIconKey + "_name") ? typeIconKey + "_name" : "ac_" + lowerAid + "-1" + "_name";
        var iconNameStr = code ? nameKey : "ac_" + lowerAid + "_name";
        //特殊处理  奸臣冲榜
        if (type == 11 && code == 28 || code == 29) {
            iconUrl = "ac_rankactive-" + type + "_" + code + "_icon";
            iconNameStr = "ac_rankactive-" + type + "_" + code + "_name";
        }
        var iconContainer = App.CommonUtil.createMainUIIcon(iconUrl, iconNameStr, isShow, iconCfgBgValue);
        iconContainer.name = nameCode ? aid + "-" + nameCode : aid;
        iconContainer.bindData = { aid: aid, code: code };
        iconContainer.addTouchTap(function (event, aid, code, atype) {
            //引导过程种不响应
            if (Api.rookieVoApi.isGuiding) {
                return;
            }
            var viewClassName = "Ac" + App.StringUtil.firstCharToUper(aid) + "View";
            if (aid == "crossServerAtkRace") {
                viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
            }
            if (aid == "rankActive" && Number(atype) != 11) {
                if (egret.getDefinitionByName(viewClassName.replace("Ac", ""))) {
                    viewClassName = App.StringUtil.firstCharToUper(viewClassName.replace("Ac", ""));
                }
            }
            ViewController.getInstance().openView(viewClassName, code);
        }, this, [aid, code, atype]);
        return iconContainer;
    };
    AcBaseVoApi.prototype.getActivityVoListByAid = function (aid) {
        var voDic = this._acVoList[aid];
        var voList = [];
        if (voDic) {
            for (var code in voDic) {
                voList.push(voDic[code]);
            }
        }
        return voList;
    };
    AcBaseVoApi.prototype.getActivityVoByAidAndCode = function (aid, code) {
        var voDic = this._acVoList[aid];
        if (!voDic) {
            return null;
        }
        if (aid.indexOf("-") > -1) {
            if (!code) {
                code = aid.split("-")[1];
            }
            aid = aid.split("-")[0];
        }
        var vo;
        if (code) {
            vo = voDic[code];
        }
        else {
            for (var code_2 in voDic) {
                vo = voDic[code_2];
            }
        }
        return vo;
    };
    /**
     * 检测是否开启终生卡打折活动
     */
    AcBaseVoApi.prototype.checkIsYearCardDiscount = function () {
        var vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "2");
        if (vo && vo.isStart) {
            return vo;
        }
        else {
            return null;
        }
    };
    /**
     * 检测是否开启月卡打折活动
     */
    AcBaseVoApi.prototype.checkIsMonthCardDiscount = function () {
        var vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "3");
        if (vo && vo.isStart) {
            return vo;
        }
        else {
            return null;
        }
    };
    AcBaseVoApi.prototype.checkIsHasNewAc = function () {
        return Object.keys(this._newAcVoList).length > 0;
    };
    /**
     * 是否存在这个类型的活动 返回一个vo 。处理展示期
     */
    AcBaseVoApi.prototype.checkActivityStartByAidAndType = function (aid, type) {
        var voList = this.getActivityVoListByAid(aid);
        if (voList) {
            var l = voList.length;
            for (var i = 0; i < l; i++) {
                if (voList[i] && voList[i].isStart && voList[i].atype == type) {
                    return voList[i];
                }
            }
        }
        return null;
    };
    AcBaseVoApi.prototype.dispose = function () {
        this._acVoList = {};
        this._newAcVoList = {};
        _super.prototype.dispose.call(this);
    };
    return AcBaseVoApi;
}(BaseVoApi));
__reflect(AcBaseVoApi.prototype, "AcBaseVoApi");
