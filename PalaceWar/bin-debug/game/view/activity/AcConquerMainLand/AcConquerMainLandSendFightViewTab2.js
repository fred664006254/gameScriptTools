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
var AcConquerMainLandSendFightViewTab2 = (function (_super) {
    __extends(AcConquerMainLandSendFightViewTab2, _super);
    function AcConquerMainLandSendFightViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._totalNumTxt = null;
        _this._totalBg = null;
        _this._armyicon = null;
        _this._tipTxt = null;
        _this._fightList = null;
        _this._haveTxt = null;
        _this._costIcon = null;
        _this._costTxt = null;
        _this._costButton = null;
        _this._servantList = null;
        _this._mask = null;
        _this._flag = null;
        _this._servantSelect = {};
        _this._army = 2;
        _this._allSelectbtn = null;
        _this._tipBg = null;
        _this._collectbtn = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightViewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSendFightViewTab2.prototype.initView = function () {
        var _this = this;
        var view = this;
        var army = view._army;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.uiCode;
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM), this.useItemCallback, this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var Bg = BaseBitmap.create("public_9_bg11");
        Bg.width = view.width;
        Bg.height = view.height;
        view.addChild(Bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view);
        var topBg = BaseBitmap.create("mlservantbg-" + code);
        if (!this.vo.checkIsJJL) {
            topBg.height = 361;
        }
        view.addChild(topBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, Bg);
        var kuangbg = BaseBitmap.create("public_9_bg67");
        kuangbg.width = topBg.width;
        kuangbg.height = topBg.height;
        view.addChild(topBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuangbg, topBg);
        var scoreTxtBg = BaseBitmap.create("countrywarrewardview_itembg");
        view.addChild(scoreTxtBg);
        view._totalBg = scoreTxtBg;
        var armyicon = BaseBitmap.create("mainlandarmyicon" + army + "-" + code);
        armyicon.setScale(0.45);
        view.addChild(armyicon);
        view._armyicon = armyicon;
        var totalnum = view.getTotalNum();
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandArmyScore-" + code, [LanguageManager.getlocal("acmainlandarmy" + army + "-" + code), App.StringUtil.changeIntToText(totalnum)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(scoreTxt);
        view._totalNumTxt = scoreTxt;
        scoreTxtBg.width = scoreTxt.textWidth + 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreTxtBg, Bg, [0, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyicon, scoreTxtBg, [-25, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreTxtBg);
        if (!this.vo.checkIsJJL) {
            var tipBg = BaseBitmap.create("alliance_taskwotdbg1");
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandArmyEffect-" + code, [LanguageManager.getlocal("acmainlandarmy" + army + "-" + code), App.StringUtil.changeIntToText(view.vo.getAddpower(view._army))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(tipBg);
            view._tipBg = tipBg;
            tipBg.width = tipTxt.width + 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, scoreTxtBg, [0, scoreTxtBg.height + 7]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg);
            view.addChild(tipTxt);
            view._tipTxt = tipTxt;
        }
        var listbg = BaseBitmap.create("mlservantlistbg-" + code);
        listbg.width = 589;
        listbg.height = 250;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, scoreTxtBg, [0, scoreTxtBg.height + 15]);
        view.addChild(listbg);
        if (!view.vo.checkIsJJL) {
            listbg.y += 30;
        }
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
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 15, listbg.height - 30);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, tmp, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [5, 15]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        scrollList.verticalScrollPolicy = 'off';
        view._fightList = scrollList;
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 120;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
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
        var allSelectbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acConquerMainLandAllselect-" + code, function () {
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
        if (this.vo.checkIsJJL) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, allSelectbtn, bottomBg, [90, 15]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, allSelectbtn, bottomBg, [25, 15]);
        }
        view.addChild(allSelectbtn);
        allSelectbtn.setEnable(!view.vo.isArmySend(army));
        view._allSelectbtn = allSelectbtn;
        //募兵
        var collectbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acConquerMainLandCollect-" + code, function () {
            //
            if (view.vo.getItemNum() == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW, {
                aid: _this.aid,
                code: _this.code,
                army: _this._army
            });
        }, view);
        if (!this.vo.checkIsJJL) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, collectbtn, bottomBg, [0, 15]);
            view.addChild(collectbtn);
            collectbtn.setGray(view.vo.getItemNum() == 0);
            view._collectbtn = collectbtn;
            var icon = BaseBitmap.create("mainlangdicon2-" + code);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, collectbtn, [30, -icon.height + 4]);
            view.addChild(icon);
            var itemHaveTxt = ComponentManager.getTextField("1/" + view.vo.getItemNum(), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemHaveTxt, icon, [icon.width + 3, 0]);
            view.addChild(itemHaveTxt);
            view._haveTxt = itemHaveTxt;
        }
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
                    msg: LanguageManager.getlocal(_this.vo.getThisCn("acConquerMainLandTip21"), [LanguageManager.getlocal("acmainlandarmy" + view._army + "-" + view.uiCode), view.vo.getCityName(level_1 + "_" + num_1 + "_" + pos_1)]),
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
                var totalnum_1 = view.getTotalNum();
                if (enermyinfo.isNpc && enermyinfo.score > totalnum_1) {
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
                                sids: tmp_1,
                                teamnum: view._army,
                                mainland: level,
                                building: num,
                                segment: pos,
                                fuid: view.param.data.uid
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
        if (this.vo.checkIsJJL) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, fightbtn, bottomBg, [90, 15]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, fightbtn, bottomBg, [25, 15]);
        }
        view.addChild(fightbtn);
        view._costButton = fightbtn;
        var icon2 = BaseLoadBitmap.create("itemicon1");
        icon2.width = icon2.height = 33;
        view.addChild(icon2);
        view._costIcon = icon2;
        var costTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(costTxt);
        view._costTxt = costTxt;
        view.checkCost();
        //选择门客
        var tmpRect2 = new egret.Rectangle(0, 0, 600, bottomBg.y - kuangbg.y - kuangbg.height - 10);
        var servantlist = ComponentManager.getScrollList(AcConquerMainLandSearvantSelectItem, arr, tmpRect2, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, servantlist, kuangbg, [5, kuangbg.height + 10]);
        view.addChild(servantlist);
        servantlist.bounces = false;
        view._servantList = servantlist;
        var mask = BaseBitmap.create("mlservantmask-" + code);
        mask.width = listbg.width;
        mask.height = listbg.height;
        view.addChild(mask);
        view._mask = mask;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, mask, listbg);
        var flag = BaseBitmap.create("mlservantinfight-" + code);
        view.addChild(flag);
        view._flag = flag;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, mask);
        mask.visible = flag.visible = view.vo.isArmySend(army);
        view.update();
        // let tmpRect =  new egret.Rectangle(0,0,listbg.width - 10,listbg.height - 10);
        // let scrollList = ComponentManager.getScrollList(AcConquerMainLandTimebuffItem, view.cfg.timeAndBuff, tmpRect, view.code);
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        // view.addChild(scrollList); 
        // scrollList.bounces = false;
    };
    //消耗元宝提示
    AcConquerMainLandSendFightViewTab2.prototype.costConfirm = function () {
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
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("acConquerMainLandTip18-" + code, [view._costTxt.text]),
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
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
                        sids: tmp,
                        teamnum: view._army,
                        mainland: level,
                        building: num,
                        segment: pos,
                        fuid: view.param.data.uid
                    });
                },
                handle: view,
                needClose: 1,
                needCancel: true,
                needCheck: true,
                checkcallback: function () {
                    //发送提示消息
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_DONOTICE, {
                        activeId: view.acTivityId,
                        noticetype: 1
                    });
                },
                height: 180
            });
        }
        else {
            //出战
            NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT, {
                activeId: view.acTivityId,
                sids: tmp,
                teamnum: view._army,
                mainland: level,
                building: num,
                segment: pos,
                fuid: view.param.data.uid
            });
        }
    };
    //门客数提示
    AcConquerMainLandSendFightViewTab2.prototype.servantnumConfirm = function () {
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
                            sids: tmp,
                            teamnum: view._army,
                            mainland: level,
                            building: num,
                            segment: pos,
                            fuid: view.param.data.uid
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
                checkcallback: function () {
                    //发送提示消息
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_DONOTICE, {
                        activeId: view.acTivityId,
                        noticetype: 2
                    });
                },
            });
        }
        else {
            view.costConfirm();
        }
    };
    AcConquerMainLandSendFightViewTab2.prototype.checkBuzhen = function (event) {
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
    AcConquerMainLandSendFightViewTab2.prototype.freshServant = function () {
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
    AcConquerMainLandSendFightViewTab2.prototype.getTotalNum = function () {
        var view = this;
        var num = 0;
        for (var i in view._servantSelect) {
            var obj = Api.servantVoApi.getServantObj(i);
            num += (view.vo.getAddpower(view._army) + obj.total);
        }
        return num;
    };
    AcConquerMainLandSendFightViewTab2.prototype.refreshWhenSwitchBack = function () {
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
        view._servantSelect = {};
        for (var i in servantObj) {
            view._servantSelect[servantObj[i].data.servantId] = 1;
        }
        view.freshServant();
    };
    AcConquerMainLandSendFightViewTab2.prototype.update = function () {
        var view = this;
        var code = view.uiCode;
        var army = view._army;
        var info = view.vo.getArmyInfo(army);
        var addPower = 0;
        var totalnum = 0;
        if (view.vo.isArmySend(army)) {
            addPower = info.addPower;
            totalnum = info.totalnum;
        }
        else {
            addPower = view.vo.getAddpower(view._army);
            totalnum = view.getTotalNum();
        }
        if (!this.vo.checkIsJJL) {
            //募兵加成
            view._tipTxt.text = LanguageManager.getlocal("acConquerMainLandArmyEffect-" + code, [LanguageManager.getlocal("acmainlandarmy" + army + "-" + code), App.StringUtil.changeIntToText(addPower)]);
            view._tipBg.width = view._tipTxt.textWidth + 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._tipBg, view, [0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);
        }
        //总兵力
        view._totalNumTxt.text = LanguageManager.getlocal("acConquerMainLandArmyScore-" + code, [LanguageManager.getlocal("acmainlandarmy" + army + "-" + code), App.StringUtil.changeIntToText(totalnum)]);
        view._totalBg.width = view._totalNumTxt.textWidth + 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._totalBg, view, [0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._armyicon, view._totalBg, [-25, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._totalNumTxt, view._totalBg);
        if (!this.vo.checkIsJJL) {
            //募兵道具
            view._haveTxt.text = "1/" + view.vo.getItemNum();
            if (view.vo.getpublicRedhot2()) {
                App.CommonUtil.addIconToBDOC(view._collectbtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._collectbtn);
            }
        }
        //开战消耗
        view.checkCost();
        //出战情况
        view._mask.visible = view._flag.visible = view.vo.isArmySend(army);
        view._costButton.setText(view._mask.visible ? "allianceWarUseServantBtn2" : "acConquerMainLandFight-" + code);
        //免费次数
        var list = view._servantList;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (view._servantSelect[unit._servantInfoVo.servantId]) {
                unit.refreshData();
                unit.checkSelect(1);
            }
            else {
                unit.checkSelect(2);
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
    AcConquerMainLandSendFightViewTab2.prototype.checkCost = function () {
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
    AcConquerMainLandSendFightViewTab2.prototype.sendCallBack = function (evt) {
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
        if (evt.data.ret && data) {
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
                    titleId: Api.playerVoApi.getTitleInfo(),
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
    AcConquerMainLandSendFightViewTab2.prototype.useItemCallback = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.data.data.allteam) {
            this.vo.setMyTeamInfo(evt.data.data.data.allteam);
        }
        if (evt.data.ret && evt.data.data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            view.update();
        }
    };
    AcConquerMainLandSendFightViewTab2.prototype.cancelCallBack = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.ret && evt.data.data.data) {
            if (evt.data.data.data.teamnum != view._army) {
                return;
            }
            switch (evt.data.data.data.conquerStat) {
                case 6:
                case 9:
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
                    view._servantSelect = {};
                    view.vo.clearArmyInfo(view._army);
                    view.freshServant();
                    view._allSelectbtn.setEnable(!view.vo.isArmySend(view._army));
                    break;
            }
        }
    };
    AcConquerMainLandSendFightViewTab2.prototype.dispose = function () {
        var view = this;
        view._totalNumTxt = null;
        view._tipTxt = null;
        view._fightList = null;
        view._haveTxt = null;
        view._costIcon = null;
        view._costTxt = null;
        view._costButton = null;
        view._servantList = null;
        view._mask = null;
        view._flag = null;
        view._servantSelect = {};
        view._totalBg = null;
        view._armyicon = null;
        view._allSelectbtn = null;
        view._tipBg = null;
        view._collectbtn = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM), this.useItemCallback, this); // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSendFightViewTab2;
}(CommonViewTab));
__reflect(AcConquerMainLandSendFightViewTab2.prototype, "AcConquerMainLandSendFightViewTab2");
//# sourceMappingURL=AcConquerMainLandSendFightViewTab2.js.map