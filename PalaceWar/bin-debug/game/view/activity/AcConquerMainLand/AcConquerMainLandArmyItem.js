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
/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 军队item
 */
var AcConquerMainLandArmyItem = (function (_super) {
    __extends(AcConquerMainLandArmyItem, _super);
    function AcConquerMainLandArmyItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._sendBtn = null;
        _this._sendBtn2 = null;
        _this._cancelBtn = null;
        _this._solderAddTxt = null;
        _this._totalNumTxt = null;
        _this._list = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandArmyItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandArmyItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandArmyItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandArmyItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandArmyItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandArmyItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandArmyItem.prototype.getScorePer = function (data, jizhan) {
        if (jizhan === void 0) { jizhan = true; }
        var info = this.vo.getArmyInfo(data);
        var num = info.scoreper;
        if (jizhan) {
            return num;
        }
        var timebuff = this.vo.getTimeBuff();
        if (timebuff) {
            return Math.floor(num / this.vo.getTimeBuff());
        }
        return num;
    };
    AcConquerMainLandArmyItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        view.width = 606;
        view._data = data;
        var code = view.getUiCode();
        var isSend = view.vo.isArmySend(data);
        var servantObj = view.vo.getArmyServant(data);
        var row = Math.ceil(servantObj.length / 5);
        view.height = isSend ? (5 + 7 + 40 + 60 + (row * 108 + (row - 1) * 5) + 14 + 60) : 180;
        var army = data;
        var res = '';
        var armynameres = '';
        switch (army) {
            case 1:
                res = "public_9_bg66";
                armynameres = "alliance_taskAttrbg1";
                break;
            case 2:
                res = "public_9_bg68";
                armynameres = "alliance_taskAttrbg2";
                break;
            case 3:
                res = "public_9_bg69";
                armynameres = "alliance_taskAttrbg5";
                break;
        }
        var bg = BaseBitmap.create(res);
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var diwen = BaseBitmap.create("mainlandarmybg" + data + "-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, diwen, bg);
        view.addChild(diwen);
        var topbg = BaseBitmap.create(armynameres);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [5, 7]);
        view.addChild(topbg);
        var armyicon = BaseBitmap.create("mainlandarmyicon" + data + "-" + code);
        armyicon.setScale(0.45);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armyicon, topbg, [20, -2]);
        view.addChild(armyicon);
        var armyname = BaseBitmap.create("mainlandarmytitle" + data + "-" + code);
        armyname.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyname, topbg, [65, 0]);
        view.addChild(armyname);
        if (isSend) {
            var info = view.vo.getArmyInfo(data);
            //正在占领
            var cityName = view.vo.getCityName(info.citylevel + "_" + info.cityNum + "_" + info.cityIdx);
            var cityInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip6-" + code, [cityName]), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityInfoTxt, topbg, [15, topbg.height + 10]);
            view.addChild(cityInfoTxt);
            if (!this.vo.checkIsJJL) {
                var solderAddTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip3-" + code, [App.StringUtil.changeIntToText(info.addPower)]), 20, TextFieldConst.COLOR_BLACK);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, solderAddTxt, cityInfoTxt, [0, cityInfoTxt.height + 5]);
                view.addChild(solderAddTxt);
                view._solderAddTxt = solderAddTxt;
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip7-" + code, [info.scoreper]), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [365, topbg.height + 10]);
            view.addChild(tipTxt);
            var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip8-" + code, [App.StringUtil.changeIntToText(info.totalnum)]), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, tipTxt, [0, tipTxt.textHeight + 5]);
            view.addChild(tip2Txt);
            view._totalNumTxt = tip2Txt;
            if (this.vo.checkIsJJL) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, cityInfoTxt, [0, cityInfoTxt.textHeight + 5]);
            }
            var roundbg = BaseBitmap.create("public_9_managebg");
            roundbg.width = 585;
            roundbg.height = (row * 108 + (row - 1) * 5) + 14;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roundbg, bg, [0, 105]);
            view.addChild(roundbg);
            var tmpRect = new egret.Rectangle(0, 0, roundbg.width - 15, roundbg.height - 10);
            var scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, servantObj, tmpRect, view.code);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, roundbg, [0, 5]);
            view.addChild(scrollList);
            scrollList.bounces = false;
            scrollList.verticalScrollPolicy = 'off';
            view._list = scrollList;
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWarUseServantBtn2", function () {
                if (view.vo.getCurPeriod() == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                    return;
                }
                //打开商店
                if (!view.vo.isCanJoin()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                    return;
                }
                //撤回
                var info = view.vo.getArmyInfo(data);
                //正在占领
                var cityName = view.vo.getCityName(info.citylevel + "_" + info.cityNum + "_" + info.cityIdx);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal(_this.vo.getThisCn("acConquerMainLandTip21"), [LanguageManager.getlocal("acmainlandarmy" + data + "-" + code), cityName]),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                            return;
                        }
                        if (view.vo.getCurPeriod() == 3) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip40-" + code));
                            //关闭到预热
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
                            return;
                        }
                        //发撤回消息
                        NetManager.request(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT, {
                            activeId: view.acTivityId,
                            teamnum: data
                        });
                    },
                    handle: view,
                    needClose: 1,
                    needCancel: true,
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, btn, bg, [100, 10]);
            view.addChild(btn);
            var btn2 = void 0;
            if (this.vo.checkIsJJL) {
                btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandJiaJiang-" + code, function () {
                    if (view.vo.getCurPeriod() == 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                        return;
                    }
                    //嘉奖
                    if (!view.vo.isCanJoin()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                        return;
                    }
                    if (view.vo.getCurPeriod() == 3) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip48"));
                        return;
                    }
                    if (view.vo.getItemNum() == 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                        army: data,
                        scoreper: _this.getScorePer(data, false)
                    });
                }, view);
            }
            else {
                btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandCollect-" + code, function () {
                    if (view.vo.getCurPeriod() == 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                        return;
                    }
                    //征兵
                    if (!view.vo.isCanJoin()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                        return;
                    }
                    if (view.vo.getItemNum() == 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                        army: data
                    });
                }, view);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn2, bg, [100, 10]);
            view.addChild(btn2);
            view._sendBtn2 = btn2;
            if (view.vo.getpublicRedhot2()) {
                App.CommonUtil.addIconToBDOC(btn2);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(btn2);
            }
        }
        else {
            // let solderAddTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip3-${code}`, [App.StringUtil.changeIntToText(view.vo.getAddpower(data))]), 20, TextFieldConst.COLOR_BLACK);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, solderAddTxt, topbg, [15, topbg.height + 7]);
            // view.addChild(solderAddTxt);
            // view._solderAddTxt = solderAddTxt;
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip4-" + code), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [15, topbg.height + 7]);
            view.addChild(tipTxt);
            var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip5-" + code), 20, TextFieldConst.COLOR_WARN_RED2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, bg, [0, 85]);
            view.addChild(tip2Txt);
            var btn = void 0;
            if (this.vo.checkIsJJL) {
                btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandJiaJiang-" + code, function () {
                    if (view.vo.getCurPeriod() == 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                        return;
                    }
                    if (!view.vo.isCanJoin()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                        return;
                    }
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip44-" + view.getUiCode()));
                }, view);
            }
            else {
                btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandCollect-" + code, function () {
                    if (view.vo.getCurPeriod() == 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                        return;
                    }
                    //征兵
                    if (!view.vo.isCanJoin()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                        return;
                    }
                    if (view.vo.getItemNum() == 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
                        return;
                    }
                    // App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip44-${view.getUiCode()}`));
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                        army: data
                    });
                }, view);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [100, 10]);
            //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
            view.addChild(btn);
            btn.setGray(true);
            view._sendBtn = btn;
            // if(view.vo.getpublicRedhot2()){
            // 	App.CommonUtil.addIconToBDOC(btn);
            // }
            // else{
            // 	App.CommonUtil.removeIconFromBDOC(btn);
            // }
            var gobackBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "gotowar", function () {
                if (view.vo.getCurPeriod() == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                    return;
                }
                if (!view.vo.isCanJoin()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                    return;
                }
                if (view.vo.getCurPeriod() == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip42-1"));
                    return;
                }
                var mapview = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW);
                if ((!mapview || (mapview && !mapview.isShow())) && view.vo.getCurPeriod() == 2) {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW, {
                        aid: view.aid,
                        code: view.code
                    });
                }
                var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILVIEW);
                baseview.hide();
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, gobackBtn, bg, [100, 10]);
            view.addChild(gobackBtn);
        }
        var kuangbg = BaseBitmap.create("public_9_bg67");
        kuangbg.width = view.width;
        kuangbg.height = view.height;
        view.addChild(kuangbg);
    };
    AcConquerMainLandArmyItem.prototype.refresh = function () {
        var view = this;
        var code = view.getUiCode();
        ;
        if (!view.vo) {
            return;
        }
        var info = view.vo.getArmyInfo(view._data);
        // view._solderAddTxt.text = LanguageManager.getlocal(`acConquerMainLandTip3-${code}`, [App.StringUtil.changeIntToText(info.addPower)]);
        if (view._totalNumTxt) {
            view._totalNumTxt.text = LanguageManager.getlocal("acConquerMainLandTip8-" + code, [App.StringUtil.changeIntToText(info.totalnum)]);
        }
        if (view._list) {
            //兵力刷新
            var list = view._list;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                unit.refresh();
            }
        }
        // if(view._sendBtn){
        // 	if(view.vo.getpublicRedhot2()){
        // 		App.CommonUtil.addIconToBDOC(view._sendBtn);
        // 	}
        // 	else{
        // 		App.CommonUtil.removeIconFromBDOC(view._sendBtn);
        // 	}
        // }
        if (view._sendBtn2) {
            if (view.vo.getpublicRedhot2()) {
                App.CommonUtil.addIconToBDOC(view._sendBtn2);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._sendBtn2);
            }
        }
    };
    AcConquerMainLandArmyItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandArmyItem.prototype.dispose = function () {
        var view = this;
        view._sendBtn = null;
        view._cancelBtn = null;
        view._data = null;
        view._solderAddTxt = null;
        view._totalNumTxt = null;
        view._list = null;
        view._sendBtn2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandArmyItem;
}(ScrollListItem));
__reflect(AcConquerMainLandArmyItem.prototype, "AcConquerMainLandArmyItem");
//# sourceMappingURL=AcConquerMainLandArmyItem.js.map