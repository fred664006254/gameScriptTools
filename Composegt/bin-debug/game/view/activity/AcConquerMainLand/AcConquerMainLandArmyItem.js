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
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcConquerMainLandArmyItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = GameConfig.stageWidth;
        view._data = data;
        var code = view.getUiCode();
        var isSend = view.vo.isArmySend(data);
        var servantObj = view.vo.getArmyServant(data);
        if (servantObj.length) {
            for (var i = 0; i < 10; i++) {
                var element = servantObj[i];
                if (!element) {
                    servantObj.push({ empty: true });
                }
            }
            view.height = 200 + 200 + 50;
        }
        else {
            view.height = 200;
        }
        var bg = BaseBitmap.create("mainland_detailtab1_itemround");
        bg.width = view.width - 20;
        bg.height = view.height;
        bg.setPosition(10, 0);
        view.addChild(bg);
        //绳子
        var shengzi1 = BaseBitmap.create("mainland_detail_shengzi");
        shengzi1.setPosition(bg.x - 10, bg.y + bg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi1);
        var shengzi2 = BaseBitmap.create("mainland_detail_shengzi");
        shengzi2.scaleX = -1;
        shengzi2.setPosition(bg.x + bg.width + 10, bg.y + bg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi2);
        var topbg = BaseBitmap.create('mainland_recorditem_timebg1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [5, 7]);
        view.addChild(topbg);
        var armyname = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainArmyTitle" + data + "-" + code), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, armyname, topbg, [-7, 0]);
        view.addChild(armyname);
        if (servantObj.length) {
            var topLine = BaseBitmap.create("public_line4");
            var bottomLine = BaseBitmap.create("public_line4");
            topLine.width = bottomLine.width = bg.width - 80;
            topLine.x = bottomLine.x = bg.x + bg.width / 2 - topLine.width / 2;
            topLine.y = bg.y + 100;
            bottomLine.y = bg.y + 350;
            this.addChild(topLine);
            this.addChild(bottomLine);
            var tmpRect = new egret.Rectangle(0, 0, this.width - 70, bottomLine.y - topLine.y - 20);
            var scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, servantObj, tmpRect, view.code);
            scrollList.setPosition(37, topLine.y + 20);
            view.addChild(scrollList);
            scrollList.bounces = false;
            scrollList.verticalScrollPolicy = 'off';
            view._list = scrollList;
        }
        if (isSend) {
            var info = view.vo.getArmyInfo(data);
            //正在占领
            var cityName = view.vo.getCityName(info.citylevel + "_" + info.cityNum + "_" + info.cityIdx);
            var cityInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip6-" + code, [App.StringUtil.formatStringColor(cityName, 0x3e9b00)]), 20, TextFieldConst.COLOR_BROWN_NEW);
            cityInfoTxt.setPosition(this.x + 80, this.y + 48);
            view.addChild(cityInfoTxt);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip7-" + code, [info.scoreper]), 20, TextFieldConst.COLOR_BLACK);
            tipTxt.setPosition(this.x + 360, cityInfoTxt.y);
            view.addChild(tipTxt);
            var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip8-" + code, [App.StringUtil.changeIntToText(info.totalnum)]), 20, TextFieldConst.COLOR_BROWN_NEW);
            tip2Txt.setPosition(cityInfoTxt.x, cityInfoTxt.y + 32);
            view.addChild(tip2Txt);
            view._totalNumTxt = tip2Txt;
            if (PlatformManager.checkIsViSp()) {
                cityInfoTxt.setPosition(this.x + 60, this.y + 48);
                tip2Txt.setPosition(cityInfoTxt.x, cityInfoTxt.y + 32);
                tipTxt.setPosition(this.x + 370, tip2Txt.y);
            }
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
                if (!view.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                //撤回
                var info = view.vo.getArmyInfo(data);
                //正在占领
                var cityName = view.vo.getCityName(info.citylevel + "_" + info.cityNum + "_" + info.cityIdx);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acConquerMainLandTip21-" + code, [LanguageManager.getlocal("acmainlandarmy" + data + "-" + code), cityName]),
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
            var btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, "acConquerMainLandCollect-" + code, function () {
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
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn2, bg, [100, 10]);
            view.addChild(btn2);
            view._sendBtn2 = btn2;
        }
        else {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip4-" + code), 20, TextFieldConst.COLOR_QUALITY_GREEN_NEW);
            tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, this.y + 53);
            view.addChild(tipTxt);
            var line = BaseBitmap.create("public_line4");
            line.width = bg.width - 80;
            line.x = bg.x + bg.width / 2 - line.width / 2;
            line.y = tipTxt.y + tipTxt.height + 10;
            this.addChild(line);
            var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip5-" + code), 20, TextFieldConst.COLOR_BROWN_NEW);
            tip2Txt.setPosition(bg.x + bg.width / 2 - tip2Txt.width / 2, line.y + line.height + 10);
            view.addChild(tip2Txt);
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acConquerMainLandCollect-" + code, function () {
                if (view.vo.getCurPeriod() == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                    return;
                }
                //征兵
                if (!view.vo.isCanJoin()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                    return;
                }
                if (!view.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
            view.addChild(btn);
            view._sendBtn = btn;
        }
        view.height += 20;
    };
    AcConquerMainLandArmyItem.prototype.refresh = function () {
        var view = this;
        var code = view.getUiCode();
        ;
        var info = view.vo.getArmyInfo(view._data);
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
