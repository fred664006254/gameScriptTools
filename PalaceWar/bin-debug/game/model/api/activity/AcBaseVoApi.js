var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBaseVoApi = /** @class */ (function (_super) {
    __extends(AcBaseVoApi, _super);
    function AcBaseVoApi() {
        var _this = _super.call(this) || this;
        _this._acVoList = {};
        _this._newAcVoList = {};
        _this._notShowAcVoList = {};
        _this._dailyChargeCode = 0;
        //活动是否激活了某些激活条件 可用于活动解锁红颜
        _this._activeUnlockMap = {}; //{[key: string]:number;};
        /**
         * 活动组的列表
         */
        _this._acGroupList = {};
        _this.needAloneGetCfgList = [];
        _this.isHandled_BI = false;
        _this.isHandled_LRP = false;
        _this.isHandled_ILI = false;
        return _this;
    }
    AcBaseVoApi.prototype.formatData = function (data, checkCfg) {
        this.isHandled_BI = false;
        this.isHandled_LRP = false;
        this.isHandled_ILI = false;
        var needGetCfgAidArr = [];
        if (data.info) {
            var info = data.info;
            var groupIconArr = [];
            for (var key in info) {
                var aidAndVersionArr = key.split("-");
                var aid = aidAndVersionArr[0];
                if (this.checkShowAcIconByCfg(aid) == false) {
                    continue;
                }
                if (Api.switchVoApi.checkNewDailyBoss() && aid == "limitedReward" && info[key].atype == 21) {
                    continue;
                }
                var v = aidAndVersionArr[1];
                var acList = this._acVoList[aid];
                var newAcList = this._newAcVoList[aid];
                //v 指的就是code，最原始的时候写的。。
                if (Config.IconorderCfg.checkAcInGroup(aid, v)) {
                    var icon = Config.IconorderCfg.getIconNameByName(aid, v);
                    if (groupIconArr.indexOf(icon) < 0) {
                        groupIconArr.push(icon);
                    }
                }
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
                        var isShow = acVo.isShowIcon;
                        if (!isShow && acVo.isStart) {
                            var notShowList = this._notShowAcVoList[aid];
                            if (this._notShowAcVoList[aid] == null) {
                                notShowList = {};
                                this._notShowAcVoList[aid] = notShowList;
                            }
                            notShowList[v] = acVo;
                        }
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
                    else {
                        if (!acList[v].isShowIcon && acList[v].isStart) {
                            var notShowList = this._notShowAcVoList[aid];
                            if (this._notShowAcVoList[aid] == null) {
                                notShowList = {};
                                this._notShowAcVoList[aid] = notShowList;
                            }
                            notShowList[v] = acList[v];
                        }
                    }
                }
                if (acList[v] && !acList[v].config) {
                    needGetCfgAidArr.push(key);
                    if (Config.AcCfg.getIfAloneNeedGetCfg(aid)) {
                        if (this.needAloneGetCfgList.indexOf(key) == -1) {
                            this.needAloneGetCfgList.push(key);
                        }
                    }
                }
            }
            var iconL = groupIconArr.length;
            for (var i = 0; i < iconL; i++) {
                var icon = groupIconArr[i];
                if (!this._acGroupList[icon]) {
                    var voClassName = App.StringUtil.firstCharToUper(icon);
                    var voClass = egret.getDefinitionByName("AcGroup" + voClassName + "Vo");
                    if (voClass) {
                        var acVo = new voClass();
                        acVo.initData({ aid: icon });
                        this._acGroupList[icon] = acVo;
                    }
                }
                else {
                    this._acGroupList[icon].initData({ aid: icon });
                }
            }
        }
        if (Config.AcCfg.isGetAll && needGetCfgAidArr && needGetCfgAidArr.length > 0) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, { activeArr: needGetCfgAidArr });
            return false;
        }
        return true;
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
            var config = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
            if (config && vo && vo.isStart && vo.isShowRedDot == true) {
                return true;
            }
        }
        else {
            var voDic = this._acVoList[aid];
            var voList = [];
            if (voDic) {
                for (var code_1 in voDic) {
                    var vo = voDic[code_1];
                    var config = Config.AcCfg.getCfgByActivityIdAndCode(aid, code_1);
                    if ((config || aid == "limitedReward") && vo && vo.isStart && vo.isShowRedDot == true) {
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
    AcBaseVoApi.prototype.getRanActives = function () {
        var actives = [];
        for (var aid in this._acVoList) {
            var voDic = this._acVoList[aid];
            if (voDic) {
                for (var code in voDic) {
                    var vo = voDic[code];
                    if (vo && vo.isStart) {
                        if (aid == "rankActive" && vo.atype != "11") {
                            //冲榜 结束时间 - 展示期时间 < 当前时间
                            if (vo.et && vo.config.extraTime && vo.et - vo.config.extraTime * 86400 < GameData.serverTime) {
                                vo['sortId'] = 1;
                            }
                            else {
                                vo['sortId'] = -1;
                            }
                            actives.push(vo);
                        }
                    }
                }
            }
        }
        return actives;
    };
    AcBaseVoApi.prototype.getAllActivityIcons = function () {
        var icons = [];
        var iconKeyDic = {};
        var bigicon = Config.BigiconCfg.getBigIcon();
        for (var aid in this._newAcVoList) {
            if (aid == "dailyCharge") {
                var voList = Api.acVoApi.getActivityVoListByAid(aid);
                for (var i in voList) {
                    var vo = voList[i];
                    if (vo.code > this._dailyChargeCode) {
                        this._dailyChargeCode = vo.code;
                    }
                }
                break;
            }
        }
        for (var aid in this._newAcVoList) {
            var big = false;
            if (aid == "battlePass") {
                var voList = Api.acVoApi.getActivityVoListByAid(aid);
                big = true;
                for (var i in voList) {
                    var vo = voList[i];
                    if (Number(vo.code) == 4 || Number(vo.code) == 7) {
                        big = false;
                        break;
                    }
                }
            }
            else {
                for (var i in bigicon) {
                    if (bigicon[i].activity == aid && bigicon[i].type == "" && !bigicon[i].showSmall) {
                        big = true;
                        break;
                    }
                }
            }
            if (aid == "limitGift") {
                big = true;
                var __icons = this.getAcIconListByAid(aid);
                __icons.sort(function (a, b) {
                    var _a = a.name.split("-"), aid_a = _a[0], code_a = _a[1];
                    var voa = Api.acVoApi.getActivityVoByAidAndCode(aid_a, code_a);
                    var _b = b.name.split("-"), aid_b = _b[0], code_b = _b[1];
                    var vob = Api.acVoApi.getActivityVoByAidAndCode(aid_b, code_b);
                    return vob.et - voa.et;
                });
                icons.push(__icons[0]);
            }
            if (!big) {
                this.getAcIconListByAid(aid, icons, iconKeyDic);
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
    /**
     * 根据aid获取活动icon，可能会是多个，是个数组，正常情况只使用第一个参数
     * @param aid 活动id，正常只需要使用第一个参数
     * @param icons 用于缓存去重，mainui用，第二个参数和第三个参数必须同时存在或者同时不存在
     * @param iconKeyDic 用于缓存去重，mainui用，第二个参数和第三个参数必须同时存在或者同时不存在
     *
     */
    AcBaseVoApi.prototype.getAcIconListByAid = function (aid, icons, iconKeyDic, bigIcon) {
        if (PlatformManager.checkIsThSp() && PlatformManager.getAppid() == "17027003" && aid == AcConst.AID_DAILYACTIVITY) {
            return icons;
        }
        if (!icons) {
            icons = [];
        }
        var tmpVoList = iconKeyDic ? this._newAcVoList : this._acVoList;
        var iconUrl;
        var iconNameStr;
        if (bigIcon) {
            var acid = bigIcon.aid;
            var actype = bigIcon.type;
            var vo = Api.acVoApi.getActivityVoByAidAndCode(acid);
            var code = vo && vo.code ? vo.code : 1;
            if (acid == "battlePass") {
                var volist = Api.acVoApi.getActivityVoListByAid(acid);
                for (var i in volist) {
                    var unit = volist[i];
                    if (unit.code != 4 && unit.code != 7) {
                        code = unit.code;
                        break;
                    }
                }
            }
            var iconContainer = this.createActivityicon(acid, Number(code), actype, true);
            icons.push(iconContainer);
        }
        else {
            var iconCfgName = Config.IconorderCfg.getIconNameByName(aid);
            var isHasChildCfg = Config.IconorderCfg.checkHasChildCfgNameByName(aid);
            if (iconCfgName || isHasChildCfg) {
                if (this.checkActivityStartByAid(aid)) {
                    if (isHasChildCfg) {
                        var voDic = tmpVoList[aid];
                        if (voDic) {
                            for (var code in voDic) {
                                if (Number(code) != 4 && Number(code) != 7 && aid == "battlePass") {
                                    continue;
                                }
                                var vo = voDic[code];
                                //IconorderCfg中activeName字段是否有code
                                var cfgCode = iconCfgName && Config.IconorderCfg.checkHasChildCodeCfgNameByName(aid, code) == null ? null : Config.IconorderCfg.checkHasChildCodeCfgNameByName(aid, code);
                                var atype = Config.IconorderCfg.checkHasChildAtypeCfgNameByName(aid, vo.atype); //优化
                                if (vo && vo.isStart && (atype || cfgCode)) {
                                    var iconCfg = Config.IconorderCfg.getIconCfgByAidAndType(aid, atype, cfgCode);
                                    if (iconCfg) {
                                        if (iconCfg.icon) {
                                            if (iconKeyDic) { //mainui检测用到
                                                if (!iconKeyDic[iconCfg.icon]) {
                                                    // icons.push(this.createActivityicon(iconCfg.icon,null,atype));
                                                    icons.push(this.createActivityicon(iconCfg.icon, Number(cfgCode), atype));
                                                    iconKeyDic[iconCfg.icon] = iconCfg.icon;
                                                }
                                            }
                                            else {
                                                //单独调用生成icon
                                                // icons.push(this.createActivityicon(iconCfg.icon,null,atype));
                                                icons.push(this.createActivityicon(iconCfg.icon, Number(cfgCode), atype));
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
                                            if (iconKeyDic) {
                                                if (!iconKeyDic[iconCfgName]) {
                                                    icons.push(this.createActivityicon(iconCfgName, null));
                                                    iconKeyDic[iconCfgName] = iconCfgName;
                                                }
                                            }
                                            else {
                                                icons.push(this.createActivityicon(iconCfgName, null));
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (iconCfgName) {
                                        if (iconKeyDic) {
                                            if (!iconKeyDic[iconCfgName]) {
                                                icons.push(this.createActivityicon(iconCfgName, null));
                                                iconKeyDic[iconCfgName] = iconCfgName;
                                            }
                                        }
                                        else {
                                            icons.push(this.createActivityicon(iconCfgName, null));
                                        }
                                    }
                                    else {
                                        //都不满足上述条件的时候
                                        icons.push(this.createActivityicon(aid, Number(code)));
                                    }
                                }
                            }
                        }
                    }
                    else if (iconCfgName) {
                        if (iconKeyDic) {
                            if (!iconKeyDic[iconCfgName]) {
                                icons.push(this.createActivityicon(iconCfgName, null));
                                iconKeyDic[iconCfgName] = iconCfgName;
                            }
                        }
                        else {
                            icons.push(this.createActivityicon(iconCfgName, null));
                        }
                    }
                }
            }
            else {
                var voDic = tmpVoList[aid];
                if (voDic) {
                    for (var code in voDic) {
                        if (Number(code) != 4 && Number(code) != 7 && aid == "battlePass") {
                            continue;
                        }
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
        return icons;
    };
    AcBaseVoApi.prototype.createActivityicon = function (aid, code, type, bigicon) {
        var atype = type;
        var nameCode = code;
        if (Config.IconorderCfg.checkHasIconLengthGreater1ThanByCfg(aid)) {
            nameCode = null;
            type = null;
            code = null;
        }
        if (!type) {
            type = code;
            // nameCode = null;
        }
        var isShow = false;
        //这里禁止再加if else 处理
        if (aid == "recharge"
            || aid == "firstrecharge"
            || aid == "discount") {
            isShow = true;
        }
        else if (aid == "wishTree") {
            //红颜许愿套系不区分入口
            type = "1";
        }
        else if (aid == "mayDay") {
            //关羽活动不区分入口
            if (type == "5") {
                type = "3";
            }
            //张飞活动不区分入口
            if (type == "6") {
                type = "4";
            }
        }
        else if (aid == "newYear") {
            //合服庆典活动不区分入口
            if (type == "6") {
                type = "4";
            }
            isShow = Config.IconorderCfg.getisFlickByName(aid, atype);
        }
        else if (aid == "punish") {
            //惩戒活动code5和code7不区分入口
            if (type == "7") {
                type = "5";
            }
        }
        else {
            isShow = Config.IconorderCfg.getisFlickByName(aid, atype);
        }
        var iconCfgBgValue = Config.IconorderCfg.getIconBgByAidAndType(aid, atype);
        var lowerAid = aid.toLowerCase();
        var typeIconKey = "ac_" + lowerAid + "-" + type;
        var iconKey = ResourceManager.hasRes(typeIconKey + "_icon") ? typeIconKey + "_icon" : "ac_" + lowerAid + "-1" + "_icon";
        var iconUrl = code ? iconKey : "ac_" + lowerAid + "_icon";
        if (aid == "rankActive" && Number(atype) == 11) {
            iconUrl = code ? typeIconKey + "_icon" : "ac_" + lowerAid + "_icon";
            iconUrl += "_" + code;
        }
        var nameKey = ResourceManager.hasRes(typeIconKey + "_name") ? typeIconKey + "_name" : "ac_" + lowerAid + "-1" + "_name";
        var iconNameStr = code ? nameKey : "ac_" + lowerAid + "_name";
        //判断是否是奸臣冲榜 或者是谋士冲榜
        if (aid == "rankActive" && Number(atype) == 11 && (code == 28 || code == 29 || code == 87 || code == 88 || (code >= 107 && code <= 111))) {
            iconUrl = "ac_rankactive-" + type + "_" + code + "_icon";
            iconNameStr = "ac_rankactive-" + type + "_" + code + "_name";
        }
        //判断试炼
        if (aid == "destroySame" && (code >= 4 && code <= 13)) {
            iconUrl = "ac_destroysame-" + Math.floor(Number(code) / 2) * 2 + "_icon";
            iconNameStr = "ac_destroysame-4_name";
        }
        //判断每日充值
        if (aid == "recharge" && this._dailyChargeCode > 0) {
            iconUrl = "ac_" + lowerAid + "_icon";
            iconNameStr = "ac_" + lowerAid + "_name";
            if (this._dailyChargeCode > 200) {
                iconUrl = "ac_" + lowerAid + "-201_icon";
                iconNameStr = "ac_" + lowerAid + "-201_name";
            }
            else if (this._dailyChargeCode > 100) {
                iconUrl = "ac_" + lowerAid + "-101_icon";
                iconNameStr = "ac_" + lowerAid + "-101_name";
            }
        }
        //跨服
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
        if (vo && vo.zids && vo.isCrossFengYun()) {
            iconNameStr += "_fengyun";
        }
        if (bigicon) {
            var acid = lowerAid;
            var actype = type;
            var vo_1 = Api.acVoApi.getActivityVoByAidAndCode(aid);
            var iconContainer_1 = new BaseDisplayObjectContainer();
            iconContainer_1.width = 129;
            iconContainer_1.height = 130;
            iconContainer_1.anchorOffsetX = iconContainer_1.width / 2;
            iconContainer_1.anchorOffsetY = iconContainer_1.height / 2;
            iconContainer_1.name = iconNameStr;
            var iconbg = BaseBitmap.create("public_lefticon_bg");
            iconContainer_1.addChild(iconbg);
            var iconame = "";
            var num = 5;
            if (aid == "rankActive") {
                iconame = "left_" + acid + "-" + actype + "_";
            }
            else if (aid == "threeKingdoms") {
                var vo_2 = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, "1");
                iconame = vo_2.getTodayWeek() > 5 ? "left_threekingdoms2_" : "left_threekingdoms1_";
                num = 10;
            }
            else {
                iconame = "left_" + acid + "_";
                if (RES.hasRes("left_" + acid + code + "_1")) {
                    iconame = "left_" + acid + code + "_";
                }
            }
            var iconAni = ComponentManager.getCustomMovieClip("left_iconbg_", 5, 100);
            iconAni.playWithTime(-1);
            iconContainer_1.addChild(iconAni);
            iconAni.width = 129;
            iconAni.height = 130;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);
            if (vo_1 && vo_1.zids && vo_1.isCrossFengYun() && vo_1.aid == "crossServerIntimacy") {
                iconame += "fengyun_";
            }
            var icon = ComponentManager.getCustomMovieClip(iconame, num, 100);
            icon.playWithTime(-1);
            iconContainer_1.addChild(icon);
            icon.width = 129;
            icon.height = 130;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);
            if (aid == "threeKingdoms") {
                var vo_3 = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, "1");
                if (1) { //
                    var tag = BaseLoadBitmap.create("left_threekingdoms2txt");
                    iconContainer_1.addChild(tag);
                    tag.x = 10;
                    tag.y = 30;
                }
            }
            if (vo_1 && vo_1.zids && (vo_1.isCrossLeague() || vo_1.isCrossFengYun())) {
                var tagImg = "left_crossleaguetxt";
                if (vo_1.isCrossFengYun()) {
                    tagImg = "left_crossfengyuntxt";
                    if (vo_1.aid == "crossServerIntimacy") {
                        tagImg = "left_crosstianjiaotxt";
                    }
                }
                var tag = BaseLoadBitmap.create(tagImg);
                iconContainer_1.addChild(tag);
                tag.x = 10;
                tag.y = 30;
            }
            var icontextstr = "";
            if (aid == "rankActive") {
                icontextstr = "left_" + acid + "-" + actype + "_text";
            }
            else {
                icontextstr = "left_" + acid + "_txt_" + code;
                if (vo_1 && vo_1.zids && vo_1.isCrossFengYun()) {
                    icontextstr = "left_" + acid + "_txt_fengyun";
                }
                if (!ResourceManager.hasRes(icontextstr)) {
                    icontextstr = "left_" + acid + "_txt";
                }
            }
            //加载完图片重新设置尺寸
            var iconName_1 = BaseLoadBitmap.create(icontextstr, null, { callback: function (container) {
                    if (container) {
                        var defaultW = 105;
                        if (PlatformManager.checkIsEnLang()) {
                            defaultW = 110;
                        }
                        iconName_1.setPosition(container.width / 2 - (iconName_1.width ? iconName_1.width : defaultW) / 2, 90);
                    }
                }, callbackThisObj: this, callbackParams: [iconContainer_1] });
            iconContainer_1.addChild(iconName_1);
            iconContainer_1.addTouchTap(function (event, aid, code, atype) {
                //引导过程种不响应
                if (Api.rookieVoApi.isGuiding) {
                    return;
                }
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        iconContainer_1.setScale(0.95);
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        iconContainer_1.setScale(1);
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        iconContainer_1.setScale(1);
                        break;
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
                if (Config.IconorderCfg.getAcNameListByIcon(aid).length > 1 && egret.hasDefinition(viewClassName) == false) {
                    viewClassName = "AcGroup" + App.StringUtil.firstCharToUper(aid) + "View";
                }
                if (aid == "crossServerWifeBattle") {
                    viewClassName = "AcCrossServerWifeBattleEnterView";
                }
                StatisticsHelper.reportAcLog(aid, code, "clickicon");
                ViewController.getInstance().openView(viewClassName, code);
            }, this, [aid, code, atype]);
            return iconContainer_1;
        }
        else {
            var iconContainer = App.CommonUtil.createMainUIIcon(iconUrl, iconNameStr, isShow, iconCfgBgValue, false, "", aid);
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
                if (Config.IconorderCfg.getAcNameListByIcon(aid).length > 1 && egret.hasDefinition(viewClassName) == false) {
                    viewClassName = "AcGroup" + App.StringUtil.firstCharToUper(aid) + "View";
                }
                if (aid == "crossServerWifeBattle") {
                    viewClassName = "AcCrossServerWifeBattleEnterView";
                }
                StatisticsHelper.reportAcLog(aid, code, "clickicon");
                ViewController.getInstance().openView(viewClassName, code);
            }, this, [aid, code, atype]);
            return iconContainer;
        }
    };
    AcBaseVoApi.prototype.openActivityViewByAid = function (aid, code, atype) {
        var iconCfgName;
        if (Config.IconorderCfg.getIconNameByName(aid)) {
            iconCfgName = App.StringUtil.firstCharToUper(Config.IconorderCfg.getIconNameByName(aid));
        }
        else {
            iconCfgName = App.StringUtil.firstCharToUper(aid);
        }
        var viewClassName = "Ac" + iconCfgName + "View";
        if (aid == "crossServerAtkRace") {
            viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
        }
        if (aid == "rankActive" && Number(atype) != 11) {
            if (egret.getDefinitionByName(viewClassName.replace("Ac", ""))) {
                viewClassName = App.StringUtil.firstCharToUper(viewClassName.replace("Ac", ""));
            }
        }
        if (Config.IconorderCfg.getAcNameListByIcon(aid).length > 1 && egret.hasDefinition(viewClassName) == false) {
            viewClassName = "AcGroup" + App.StringUtil.firstCharToUper(aid) + "View";
        }
        if (aid == "crossServerWifeBattle") {
            viewClassName = "AcCrossServerWifeBattleEnterView";
        }
        ViewController.getInstance().openView(viewClassName, code);
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
    AcBaseVoApi.prototype.checkIsHasNewAc = function () {
        return Object.keys(this._newAcVoList).length > 0;
    };
    /**
     * 检测是否开启终生卡打折活动
     */
    AcBaseVoApi.prototype.checkIsYearCardDiscount = function () {
        var vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "2");
        var vo2 = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "3");
        if (vo && vo.isStart) {
            return vo;
        }
        else if (vo2 && vo2.isStart) {
            return vo2;
        }
        else {
            return null;
        }
    };
    /**
     * 检测是否开启Vip打折活动
     */
    AcBaseVoApi.prototype.checkIsVipDiscount = function () {
        var vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "1");
        var vo2 = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "4");
        if (vo && vo.isStart) {
            return vo;
        }
        else if (vo2 && vo2.isStart) {
            return vo2;
        }
        return null;
    };
    /**
     * 检测是否开启月卡打折活动
     */
    AcBaseVoApi.prototype.checkIsMonthDiscount = function () {
        var vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "5");
        if (vo && vo.isStart) {
            return vo;
        }
        return null;
    };
    /**
     * 根据icon也就相当于活动id来获取活动组的数据
     * @param icon 从IconOrderCfg取到
     */
    AcBaseVoApi.prototype.getGroupAcVo = function (icon) {
        return this._acGroupList[icon];
    };
    AcBaseVoApi.prototype.checkShowePopupView = function () {
        var popInfo = Api.acVoApi.getAcPopInfo();
        if (popInfo.length > 0 || Api.otherInfoVoApi.checkHasNewYear()) {
            //ViewController.getInstance().openView(ViewConst.POPUP.ACTIVITYPOPVIEW,{info:popInfo});
            Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.ACTIVITYPOPVIEW, { info: popInfo });
        }
    };
    /**
     * 活动公告信息
     */
    AcBaseVoApi.prototype.getAcPopInfo = function () {
        var infos = []; // pic  sortId et extraTime label iscross
        var allAnnouncements = Config.AnnouncementCfg.getAnnouncements();
        var maxNum = Config.AnnouncementCfg.getMaxNum();
        for (var i = 0; i < allAnnouncements.length; i++) {
            var a = allAnnouncements[i];
            if (a.activityType == "firstcharge") {
                if (Api.switchVoApi.checkClosePay()) {
                    continue;
                }
                if (Api.shopVoApi.getPayFlag() != 2) {
                    var info = {
                        sortId: i,
                        label: a.label,
                        vo: { aid: a.activityType },
                        p: "acpopicon_firstcharge",
                        cross: false
                    };
                    infos.push(info);
                }
            }
            else if (a.activityType == "emperorWar") {
                if (Api.switchVoApi.checkEmperorOpen() == true) {
                    var api = Api.emperorwarVoApi;
                    if (api.getVersion() > 0 && api.isInShow() && GameData.serverTime < api.getet()) {
                        var info = { sortId: i, label: a.label, vo: { aid: a.activityType, et: api.getet() }, p: "acpopicon_emperorwar", cross: false };
                        infos.push(info);
                    }
                }
            }
            else if (a.activityType == "exam") {
                if (Api.switchVoApi.checkExamOpen() == true) {
                    var api = Api.examVoApi;
                    if (api.isInPeriod() == true && api.isInVersion() == true) {
                        var info = { sortId: i, label: a.label, vo: { aid: a.activityType, et: api.getExamEndTime() }, p: "acpopicon_exam", cross: false };
                        infos.push(info);
                    }
                }
            }
            else if (a.activityType == "sevenDaysSignUp") {
                if (PlatformManager.checkIsRuSp()) {
                    var res = "acpopicon_sevendaysignup";
                    if (Api.sevenDaysSignupLoginVoApi.checkUserIsNewer() && Api.sevenDaysSignupLoginVoApi.checkNewUserLoginThanSeven() && Api.switchVoApi.checkOpenSevenDay()) {
                        var totalSignDay = Api.sevenDaysSignupLoginVoApi.nowDay();
                        if (totalSignDay <= 7) {
                            if (totalSignDay == 1) {
                                res += "1_ru";
                            }
                            else if (totalSignDay <= 2) {
                                res += "2_ru";
                            }
                            else if (totalSignDay <= 7) {
                                res += "7_ru";
                            }
                            else {
                                continue;
                            }
                            var info = {
                                sortId: i,
                                label: a.label,
                                vo: { aid: a.activityType },
                                p: res,
                                cross: false,
                                showhead: a.head
                            };
                            infos.push(info);
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
            //活动-组
            else if (Config.IconorderCfg.getAcNameListByIcon(a.activityType).length > 1) {
                var groupVo = Api.acVoApi.getGroupAcVo(a.activityType);
                if (groupVo && groupVo.isStart) {
                    var info = { sortId: i, label: a.label, vo: groupVo, p: "acpopicon_" + a.activityType, cross: false, showhead: a.head };
                    infos.push(info);
                }
            }
            else {
                for (var aid in this._acVoList) {
                    if (aid == a.activityType) {
                        var voObject = this._acVoList[aid];
                        for (var code in voObject) {
                            if (a.codeNum && GameData.isInArray(Number(code), a.codeNum)) {
                                continue;
                            }
                            var oneVo = null;
                            var title = false;
                            if (aid == "rankActive") {
                                var tempVo = voObject[code];
                                if (GameData.isInArray(tempVo.atype, a.type)) {
                                    oneVo = tempVo;
                                }
                            }
                            else {
                                oneVo = voObject[code];
                            }
                            if (oneVo && oneVo.isShowBanner == true) {
                                var pic = "acpopicon_" + oneVo.aid;
                                pic = pic.toLowerCase();
                                var crossType = 1;
                                if (aid == "rankActive") {
                                    var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(oneVo.aid, String(oneVo.code));
                                    if (!rankcfg) {
                                        continue;
                                    }
                                    if (rankcfg.title) {
                                        title = true;
                                    }
                                    if (ResourceManager.hasRes(pic + oneVo.code)) {
                                        pic += oneVo.code;
                                    }
                                    else if (rankcfg.isCross == 0) {
                                        pic += oneVo.atype + "_1";
                                    }
                                    else if (rankcfg.isCross == 2) {
                                        var voo = oneVo;
                                        var naid = voo.getCrossActivityAid();
                                        if (naid !== '') {
                                            pic += oneVo.atype + "_2_" + naid.toLowerCase();
                                        }
                                        else {
                                            pic += oneVo.atype + "_2";
                                        }
                                        crossType = 2;
                                    }
                                    else {
                                        pic += oneVo.atype + "_2";
                                        crossType = 2;
                                    }
                                }
                                else if (a.activityType == "destroySame" && (Number(oneVo.code) >= 4 && Number(oneVo.code) <= 13)) {
                                    pic += "" + Math.floor(Number(code) / 2) * 2;
                                }
                                else {
                                    if (ResourceManager.hasRes(pic + oneVo.code)) {
                                        pic += oneVo.code;
                                    }
                                }
                                if (Api.switchVoApi.checkIsInBlueWife() && ResourceManager.hasRes(pic + "_blueType")) {
                                    pic = pic + "_blueType";
                                }
                                if (!ResourceManager.hasRes(pic) && !PlatformManager.checkIsLocal()) {
                                    continue;
                                }
                                //冲榜活动只能有一个，展示期活动优先级低于非展示期
                                if (i <= 4) {
                                    if (infos.length > 0) //说明有个在展示期的活动
                                     {
                                        if (oneVo.checkIsInEndShowTime()) {
                                            continue;
                                        }
                                        else {
                                            infos.length = 0;
                                            // if (i<=3)
                                            // {
                                            // 	i = 4;
                                            // }
                                        }
                                    }
                                    else {
                                        if (!oneVo.checkIsInEndShowTime()) {
                                            // if (i<=3)
                                            // {
                                            // 	i = 4;
                                            // }
                                        }
                                    }
                                }
                                var info = { sortId: i, label: a.label, vo: oneVo, p: pic, cross: crossType, showhead: title || a.head };
                                infos.push(info);
                                if (!oneVo.checkIsInEndShowTime() && aid == "rankActive") {
                                    break;
                                }
                            }
                            if (infos.length >= maxNum) {
                                break;
                            }
                        }
                    }
                }
            }
            if (infos.length >= maxNum) {
                break;
            }
        }
        return infos;
    };
    /**通过aid 获得活动集合中列表
     * 返回 如果是集市类活动 。会返回 。aid-code 集合
     * 否则会返回 aid 集合
    */
    AcBaseVoApi.prototype.getAcListForAid = function (aid) {
        var cfgName = Config.IconorderCfg.getAidListByCfgName(aid);
        var newCfgName = [];
        if (Config.IconorderCfg.checkHasIconLengthGreater1ThanByCfg(aid)) {
            for (var i = 0; i < cfgName.length; i++) {
                var codeTmp = cfgName[i].split("-")[1];
                if (codeTmp) {
                    newCfgName.push(cfgName[i]);
                }
                else {
                    var voList = Api.acVoApi.getActivityVoListByAid(cfgName[i]);
                    for (var i_1 = 0; i_1 < voList.length; i_1++) {
                        var vo = voList[i_1];
                        if (Config.IconorderCfg.getIconNameByName(vo.aid, String(vo.code)) == aid) {
                            newCfgName.push(vo.aidAndCode);
                        }
                    }
                }
            }
        }
        else {
            newCfgName = cfgName;
        }
        return newCfgName;
    };
    AcBaseVoApi.prototype.getAcLocalName = function (aid, code) {
        var defaultKey = "ac" + App.StringUtil.firstCharToUper(aid + "-" + code) + "_Title";
        var key = "ac" + App.StringUtil.firstCharToUper(aid) + "_Title";
        if (LanguageManager.checkHasKey(defaultKey) == false && LanguageManager.checkHasKey(key)) {
            defaultKey = key;
        }
        return LanguageManager.getlocal(defaultKey);
    };
    /**
     * 特殊用
     * @param aid
     */
    AcBaseVoApi.prototype.checkShowAcIconByCfg = function (aid) {
        var notShowAidDic = {};
        if (PlatformManager.getAppid() == "17004007" || PlatformManager.getAppid() == "17004003" || PlatformManager.getAppid() == "17004008") {
            notShowAidDic = {
                "rechargeBox": "1",
                "chargeReturnGem": "1",
                "bankBox": "1",
                "battlePass": "1"
            };
        }
        return Boolean(notShowAidDic[aid]) == false;
    };
    /**
     * 达到条件显示的活动 刷新使用
     */
    AcBaseVoApi.prototype.checkLimitShowAc = function () {
        var len = Object.keys(this._notShowAcVoList).length;
        if (len > 0) {
            var data = this._notShowAcVoList;
            for (var aid in data) {
                var acList = data[aid];
                var newAcList = {};
                for (var code in acList) {
                    if (acList[code] && acList[code].isShowIcon && acList[code].isStart) {
                        newAcList[code] = acList[code];
                        acList[code] = null;
                    }
                }
                if (Object.keys(newAcList).length > 0) {
                    this._newAcVoList[aid] = newAcList;
                }
            }
        }
    };
    AcBaseVoApi.prototype.dispose = function () {
        this.isHandled_BI = false;
        this.isHandled_LRP = false;
        this.isHandled_ILI = false;
        this._acVoList = {};
        this._newAcVoList = {};
        this._notShowAcVoList = {};
        this._dailyChargeCode = 0;
        if (this._acGroupList) {
            for (var key in this._acGroupList) {
                var groupVo = this._acGroupList[key];
                if (groupVo) {
                    groupVo.dispose();
                }
            }
        }
        this._acGroupList = {};
        this.needAloneGetCfgList.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBaseVoApi;
}(BaseVoApi));
//# sourceMappingURL=AcBaseVoApi.js.map