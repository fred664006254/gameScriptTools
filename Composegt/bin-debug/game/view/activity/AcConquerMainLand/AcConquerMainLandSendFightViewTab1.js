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
/*
author : qinajun
*/
var AcConquerMainLandSendFightViewTab1 = (function (_super) {
    __extends(AcConquerMainLandSendFightViewTab1, _super);
    function AcConquerMainLandSendFightViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._fightList = null;
        _this._costIcon = null;
        _this._costTxt = null;
        _this._costButton = null;
        _this._servantList = null;
        _this._mask = null;
        _this._flag = null;
        _this._servantSelect = {};
        _this._army = 1;
        _this._allSelectbtn = null;
        _this._collectbtn = null;
        _this._alphaMask = null;
        _this._callback = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSendFightViewTab1.prototype.initView = function () {
        var view = this;
        var army = view._army;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.uiCode;
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        this._callback = view.param.data.callback;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var Bg = BaseBitmap.create("public_9_bg11");
        Bg.width = view.width;
        Bg.height = view.height;
        view.addChild(Bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view);
        var topBg = BaseBitmap.create("mainland_sendfight_itembg");
        topBg.height = 280;
        topBg.width = view.width;
        view.addChild(topBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, Bg);
        var bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBg.width = 620;
        bottomBg.height = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 45]);
        view.addChild(bottomBg);
        var line = BaseBitmap.create('commonview_border3');
        line.width = 620;
        line.setPosition(bottomBg.x, bottomBg.y - 5);
        view.addChild(line);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = bottomBg.width - 20;
        innerKuang.height = bottomBg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(bottomBg.x + 10, bottomBg.y + 5);
        var listbg = BaseBitmap.create("mainland_sendfight_itembg");
        listbg.width = view.width;
        listbg.height = bottomBg.y - topBg.y - topBg.height - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, topBg, [0, topBg.height + 10]);
        view.addChild(listbg);
        var servantObj = [];
        if (view.vo.isArmySend(army)) {
            servantObj = view.vo.getArmyServant(army);
        }
        else {
            servantObj = view.vo.getLastTeamInfo(army);
        }
        view._servantSelect = {};
        var tmp = [];
        for (var i in servantObj) {
            view._servantSelect[servantObj[i].data.servantId] = 1;
        }
        for (var i = 0; i < 10; ++i) {
            if (servantObj[i]) {
                tmp.push(servantObj[i]);
            }
            else {
                tmp.push({
                    empty: true
                });
            }
        }
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 15, listbg.height - 50);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, tmp, tmpRect, view.code);
        scrollList.setPosition(topBg.x + 38, topBg.y + 28);
        view.addChild(scrollList);
        scrollList.bounces = false;
        scrollList.verticalScrollPolicy = 'off';
        view._fightList = scrollList;
        this.checkTeamAllFightNum(servantObj);
        var obj = Api.servantVoApi.getServantInfoList();
        var arr = [];
        for (var i in obj) {
            var attend = view.vo.getServantAttend(obj[i].servantId);
            arr.push({
                army: army,
                data: obj[i],
                isAttend: attend > 0 && attend != army
            });
        }
        arr.sort(function (a, b) {
            if (a.isAttend && b.isAttend) {
                return b.data.total - a.data.total;
            }
            else if (a.isAttend) {
                return 1;
            }
            else if (b.isAttend) {
                return -1;
            }
            else {
                return b.data.total - a.data.total;
            }
        });
        //一键上阵
        var allSelectbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, "acConquerMainLandAllselect-" + code, function () {
            //
            var flag = true;
            for (var i in arr) {
                var attend = view.vo.getServantAttend(arr[i].data.servantId);
                if (attend == 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip15-" + code));
                return;
            }
            if (!view.vo.isArmySend(army)) {
                view._servantSelect = {};
                var count = 0;
                for (var i = 0; i < arr.length; ++i) {
                    var attend = view.vo.getServantAttend(arr[i].data.servantId);
                    if (attend == 0) {
                        view._servantSelect[arr[i].data.servantId] = 1;
                        ++count;
                        if (count == view.cfg.teamInfo.main) {
                            break;
                        }
                    }
                }
                view.freshServant();
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, allSelectbtn, bottomBg, [50, 15]);
        view.addChild(allSelectbtn);
        allSelectbtn.setEnable(!view.vo.isArmySend(army));
        view._allSelectbtn = allSelectbtn;
        //强化战力
        var collectbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, "acConquerMainLandCollect-" + code, function () {
            if (view.vo.getCurPeriod() == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                return;
            }
            if (!view.vo.isCanJoin()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, collectbtn, bottomBg, [50, 15]);
        view.addChild(collectbtn);
        view._collectbtn = collectbtn;
        //出战
        var fightbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, view.vo.isArmySend(army) ? "allianceWarUseServantBtn2" : "acConquerMainLandFight-" + code, function () {
            //
            if (view.vo.isArmySend(army)) {
                var info = view.vo.getArmyInfo(army);
                var level_1 = info.citylevel;
                var num_1 = info.cityNum;
                var pos_1 = info.cityIdx;
                //撤回
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acConquerMainLandTip21-" + code, [LanguageManager.getlocal("acmainlandarmy" + view._army + "-" + view.uiCode), view.vo.getCityName(level_1 + "_" + num_1 + "_" + pos_1)]),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                            return;
                        }
                        if (view.vo.getCurPeriod() == 3) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                            //关闭到预热
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
                            return;
                        }
                        //发撤回消息
                        NetManager.request(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT, {
                            activeId: view.acTivityId,
                            teamnum: army
                        });
                    },
                    handle: view,
                    needClose: 1,
                    needCancel: true,
                });
            }
            else {
                if (Object.keys(view._servantSelect).length == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip16-" + code));
                    return;
                }
                var enermyinfo = view.param.data.data;
                var totalnum = view.getTotalNum();
                if (enermyinfo.isNpc && enermyinfo.score > totalnum) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip17-" + code));
                    return;
                }
                if (Number(Api.playerVoApi.getPlayerID()) == Number(view.param.data.uid)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip33-" + code));
                    return;
                }
                if (Api.playerVoApi.getPlayerGem() >= Number(view._costTxt.text)) {
                    if (Object.keys(view._servantSelect).length < view.cfg.teamInfo.main) {
                        view.servantnumConfirm();
                    }
                    else {
                        if (Number(view._costTxt.text) == 0) {
                            //出战
                            var tmp_1 = [];
                            var serlist = [];
                            for (var i in view._servantSelect) {
                                var obj_1 = Api.servantVoApi.getServantObj(i);
                                serlist.push({
                                    id: obj_1.servantId,
                                    total: obj_1.total
                                });
                            }
                            serlist.sort(function (a, b) {
                                return a.total - b.total;
                            });
                            for (var i in serlist) {
                                tmp_1.push(serlist[i].id);
                            }
                            NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT, {
                                activeId: view.acTivityId,
                                mainland: level,
                                building: num,
                                segment: pos,
                                fuid: view.param.data.uid || 0,
                                teamnum: view._army,
                                sids: tmp_1
                            });
                        }
                        else {
                            view.costConfirm();
                        }
                    }
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: LanguageManager.getlocal("acConquerMainLandTip19-" + code, [view._costTxt.text]),
                        title: "itemUseConstPopupViewTitle",
                        touchMaskClose: true,
                        callback: function () {
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                                return;
                            }
                            //充值
                            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                        },
                        handle: view,
                        needClose: 1,
                        needCancel: true,
                        confirmTxt: "gotocharge"
                    });
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, fightbtn, bottomBg, [0, 15]);
        view.addChild(fightbtn);
        view._costButton = fightbtn;
        var icon2 = BaseLoadBitmap.create("itemicon1");
        icon2.width = icon2.height = 50;
        view.addChild(icon2);
        view._costIcon = icon2;
        var costTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_GREEN_NEW);
        view.addChild(costTxt);
        view._costTxt = costTxt;
        view.checkCost();
        //选择门客
        var tmpRect2 = new egret.Rectangle(0, 0, listbg.width - 15, listbg.height - 60);
        var servantlist = ComponentManager.getScrollList(AcConquerMainLandSearvantSelectItem, arr, tmpRect2, view.code);
        servantlist.setPosition(listbg.x + 38, listbg.y + 28);
        view.addChild(servantlist);
        servantlist.bounces = false;
        view._servantList = servantlist;
        var alphaMask = BaseBitmap.create('public_alphabg');
        alphaMask.width = listbg.width;
        alphaMask.height = listbg.height;
        alphaMask.setPosition(listbg.x, listbg.y);
        view.addChild(alphaMask);
        view._alphaMask = alphaMask;
        var mask = BaseBitmap.create("public_9_black");
        mask.alpha = 0.8;
        mask.width = topBg.width - 30;
        mask.height = topBg.height - 5;
        mask.setPosition(topBg.x + 15, topBg.y);
        view.addChild(mask);
        view._mask = mask;
        var flag = BaseBitmap.create("mlservantinfight-" + code);
        view.addChild(flag);
        view._flag = flag;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, mask);
        mask.visible = flag.visible = alphaMask.visible = view.vo.isArmySend(army);
        if (Object.keys(view._servantSelect).length > 0) {
            view.freshServant();
        }
        view.update();
    };
    AcConquerMainLandSendFightViewTab1.prototype.checkTeamAllFightNum = function (servantList) {
        var totalNum = 0;
        for (var i = 0; i < servantList.length; i++) {
            if (servantList[i].data && servantList[i].data.servantId) {
                totalNum += this.vo.getServantAcPower(servantList[i].data.servantId);
            }
        }
        if (this._callback) {
            this._callback(App.StringUtil.changeIntToText3(totalNum));
        }
    };
    //消耗元宝提示
    AcConquerMainLandSendFightViewTab1.prototype.costConfirm = function () {
        var view = this;
        var istip = view.vo.isTip(1);
        var code = view.uiCode;
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        //出战
        var tmp = [];
        var serlist = [];
        for (var i in view._servantSelect) {
            var obj = Api.servantVoApi.getServantObj(i);
            serlist.push({
                id: obj.servantId,
                total: obj.total
            });
        }
        serlist.sort(function (a, b) {
            return a.total - b.total;
        });
        for (var i in serlist) {
            tmp.push(serlist[i].id);
        }
        if (istip) {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                useNum: view._costTxt.text,
                confirmCallback: function () {
                    if (!view.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
                        return;
                    }
                    if (view.vo.getCurPeriod() == 3) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                        //关闭到预热
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
                        return;
                    }
                    //出战
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT, {
                        activeId: view.acTivityId,
                        mainland: level,
                        building: num,
                        segment: pos,
                        fuid: view.param.data.uid || 0,
                        teamnum: view._army,
                        sids: tmp
                    });
                },
                handler: this,
                icon: "itemicon1",
                iconBg: "itembg_1",
                num: Api.playerVoApi.getPlayerGem(),
                msg: LanguageManager.getlocal("acConquerMainLandTip18-" + code, [view._costTxt.text]),
                id: 1
            });
        }
        else {
            //出战
            NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT, {
                activeId: view.acTivityId,
                mainland: level,
                building: num,
                segment: pos,
                fuid: view.param.data.uid || 0,
                teamnum: view._army,
                sids: tmp
            });
        }
    };
    //门客数提示
    AcConquerMainLandSendFightViewTab1.prototype.servantnumConfirm = function () {
        var view = this;
        var code = view.uiCode;
        var istip2 = view.vo.isTip(2);
        if (istip2) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("acConquerMainLandTip20-" + code),
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    if (!view.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                        return;
                    }
                    if (Number(view._costTxt.text) == 0) {
                        //出战
                        var code_1 = view.uiCode;
                        var level = view.param.data.level;
                        var num = view.param.data.num;
                        var pos = view.param.data.pos;
                        //出战
                        var tmp = [];
                        var serlist = [];
                        for (var i in view._servantSelect) {
                            var obj = Api.servantVoApi.getServantObj(i);
                            serlist.push({
                                id: obj.servantId,
                                total: obj.total
                            });
                        }
                        serlist.sort(function (a, b) {
                            return a.total - b.total;
                        });
                        for (var i in serlist) {
                            tmp.push(serlist[i].id);
                        }
                        //出战
                        NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT, {
                            activeId: view.acTivityId,
                            mainland: level,
                            building: num,
                            segment: pos,
                            fuid: view.param.data.uid || 0,
                            teamnum: view._army,
                            sids: tmp
                        });
                    }
                    else {
                        view.costConfirm();
                    }
                },
                handle: view,
                needClose: 1,
                needCancel: true,
                needCheck: true,
                height: 200,
            });
        }
        else {
            view.costConfirm();
        }
    };
    AcConquerMainLandSendFightViewTab1.prototype.checkBuzhen = function (event) {
        var data = event.data;
        var view = this;
        if (!data || view.vo.isArmySend(view._army)) {
            return;
        }
        var type = data.type;
        if (type == "add") {
            if (Object.keys(view._servantSelect).length == 10) {
                return;
            }
            view._servantSelect[data.servantId] = 1;
        }
        else if (type == "delete") {
            delete view._servantSelect[data.servantId];
        }
        view.freshServant();
    };
    AcConquerMainLandSendFightViewTab1.prototype.freshServant = function () {
        var view = this;
        var arr = [];
        var list = view._servantList;
        for (var i in view._servantSelect) {
            var obj = Api.servantVoApi.getServantObj(i);
            arr.push({
                army: view._army,
                data: obj
            });
        }
        arr.sort(function (a, b) {
            return b.data.total - a.data.total;
        });
        if (arr.length < 10) {
            for (var i = arr.length; i < 10; ++i) {
                arr.push({
                    empty: true
                });
            }
        }
        view._fightList.refreshData(arr, view.code);
        this.checkTeamAllFightNum(arr);
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (view._servantSelect[unit._servantInfoVo.servantId]) {
                unit.checkSelect(1);
            }
            else {
                unit.checkSelect(2);
            }
        }
        // view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyScore-${view.uiCode}`, [LanguageManager.getlocal(`acmainlandarmy${view._army}-${view.uiCode}`), App.StringUtil.changeIntToText(num)]);
        view.update();
    };
    AcConquerMainLandSendFightViewTab1.prototype.getTotalNum = function () {
        var view = this;
        var num = 0;
        for (var i in view._servantSelect) {
            num += view.vo.getServantAcPower(i);
        }
        return num;
    };
    AcConquerMainLandSendFightViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        var servantObj = [];
        if (view.vo.isArmySend(view._army)) {
            servantObj = view.vo.getArmyServant(view._army);
        }
        else {
            servantObj = view.vo.getLastTeamInfo(view._army);
        }
        var tmp = [];
        for (var i = 0; i < 10; ++i) {
            if (servantObj[i]) {
                tmp.push(servantObj[i]);
            }
            else {
                tmp.push({
                    empty: true
                });
            }
        }
        view._fightList.refreshData(tmp, view.code);
        this.checkTeamAllFightNum(tmp);
        view._servantSelect = {};
        for (var i in servantObj) {
            view._servantSelect[servantObj[i].data.servantId] = 1;
        }
        view.freshServant();
    };
    AcConquerMainLandSendFightViewTab1.prototype.update = function () {
        var view = this;
        var code = view.uiCode;
        var army = view._army;
        //开战消耗
        view.checkCost();
        //出战情况
        view._mask.visible = view._flag.visible = view._alphaMask.visible = view.vo.isArmySend(army);
        view._costButton.setText(view._mask.visible ? "allianceWarUseServantBtn2" : "acConquerMainLandFight-" + code);
        //免费次数
        var list = view._servantList;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (view._servantSelect[unit._servantInfoVo.servantId]) {
                unit.refreshData();
            }
        }
        //兵力刷新
        list = view._fightList;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            unit.refresh();
        }
    };
    //出战花费
    AcConquerMainLandSendFightViewTab1.prototype.checkCost = function () {
        var view = this;
        var code = view.uiCode;
        var num = 0;
        for (var i in view._servantSelect) {
            var tmp = view.vo.getServantCost(i);
            num += tmp.cost;
        }
        view._costTxt.text = "" + num;
        var tmpx = (view._costButton.width - view._costIcon.width - 3 - view._costTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._costIcon, view._costButton, [tmpx, -view._costIcon.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._costTxt, view._costIcon, [view._costIcon.width + 3, 0]);
        view._costIcon.visible = view._costTxt.visible = !view.vo.isArmySend(view._army);
    };
    AcConquerMainLandSendFightViewTab1.prototype.sendCallBack = function (evt) {
        var view = this;
        if (!view.param) {
            return;
        }
        var data = evt.data.data.data;
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        var code = view.uiCode;
        var enermyinfo = view.param.data.data;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
        if (data) {
            //7 占领了npc，4打败玩家成功占领，8失败
            switch (data.conquerStat) {
                case 3:
                    //关闭到预热
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
                    return;
                case 7:
                case 9:
                case 10:
                    baseview.hide();
                    return;
            }
            var info = view.param.data.info;
            //刷新界面
            var wardata = {
                info: {
                    team: data.fightteam.mteam,
                    //有问题 原来是getTitleInfo
                    titleId: Api.playerVoApi.getTitleid(),
                    zid: Api.mergeServerVoApi.getTrueZid(),
                    name: Api.playerVoApi.getPlayerName(),
                },
                tinfo: {
                    team: data.fightteam.fteam,
                    titleId: info.titleId,
                    zid: info.zid,
                    name: info.name,
                },
            };
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW, {
                aid: this.aid,
                code: this.code,
                wardata: wardata,
                result: data.conquerStat == 8 ? "fail" : "win",
                callback: function () {
                    baseview.hide();
                },
                callobj: view,
                cityName: view.vo.getCityName(level + "_" + num),
                cityName2: view.vo.getCityName(level + "_" + num + "_" + pos),
                info: view.param.data.info,
            });
        }
    };
    AcConquerMainLandSendFightViewTab1.prototype.useItemCallback = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            view.update();
        }
    };
    AcConquerMainLandSendFightViewTab1.prototype.cancelCallBack = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.data.data) {
            if (evt.data.data.data.teamnum != view._army) {
                return;
            }
            switch (evt.data.data.data.conquerStat) {
                case 6:
                case 9:
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
                    //view._servantSelect = {};
                    view.vo.clearArmyInfo(view._army);
                    view.freshServant();
                    view._allSelectbtn.setEnable(!view.vo.isArmySend(view._army));
                    break;
            }
        }
    };
    AcConquerMainLandSendFightViewTab1.prototype.dispose = function () {
        var view = this;
        view._fightList = null;
        view._costIcon = null;
        view._costTxt = null;
        view._costButton = null;
        view._servantList = null;
        view._mask = null;
        view._flag = null;
        view._servantSelect = {};
        view._allSelectbtn = null;
        view._collectbtn = null;
        view._alphaMask = null;
        view._callback = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSendFightViewTab1;
}(CommonViewTab));
__reflect(AcConquerMainLandSendFightViewTab1.prototype, "AcConquerMainLandSendFightViewTab1");
