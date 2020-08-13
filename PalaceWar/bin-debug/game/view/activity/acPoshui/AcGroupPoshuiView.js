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
 * 泰国泼水节
 * date 2020.3.3
 * @author ycg
 * @class AcGroupPoshuiView
 */
var AcGroupPoshuiView = (function (_super) {
    __extends(AcGroupPoshuiView, _super);
    function AcGroupPoshuiView() {
        var _this = _super.call(this) || this;
        _this.acList = null;
        _this._group = null;
        _this._poshuiAcCfg = {};
        return _this;
    }
    AcGroupPoshuiView.prototype.getAidCode = function (aid) {
        var code = '3';
        var list = Api.acVoApi.getActivityVoListByAid(aid);
        if (list && list.length) {
            code = list[0].code.toString();
        }
        return code;
    };
    AcGroupPoshuiView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    //背景图名称
    AcGroupPoshuiView.prototype.getBgName = function () {
        return null;
    };
    AcGroupPoshuiView.prototype.getTitleBgName = function () {
        return null;
    };
    AcGroupPoshuiView.prototype.getTitleStr = function () {
        return null;
    };
    AcGroupPoshuiView.prototype.getContainerY = function () {
        return 0;
    };
    AcGroupPoshuiView.prototype.initActCfg = function () {
        // let key = `smashEgg-${this.getAidCode(`smashEgg`)}`;
        // let key2 = `newYearRed-${this.getAidCode(`newYearRed`)}`;
        this._poshuiAcCfg = {
            "newYearSevenDays-2": { index: 1, view: ViewConst.COMMON.ACNEWYEARSEVENDAYSVIEW },
            "blessingOfMammon-5": { index: 2, view: ViewConst.COMMON.ACBLESSINGOFMAMMONVIEW },
            "costGemRank-2": { index: 3, view: ViewConst.COMMON.ACCOSTGEMRANKVIEW },
            "newYearRed-2": { index: 4, view: ViewConst.COMMON.ACNEWYEARREDVIEW },
        };
        // this._poshuiAcCfg[key2] = {index : 2, view : ViewConst.COMMON.ACNEWYEARREDVIEW};
        // this._poshuiAcCfg[key] = {index : 6, view : ViewConst.COMMON.ACSMASHEGGVIEW};
    };
    AcGroupPoshuiView.prototype.initView = function () {
        var _this = this;
        var view = this;
        this.initActCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;
        //bg
        var bg = BaseBitmap.create("acposhui_bg");
        bg.setPosition(0, 0);
        view.addChildToContainer(bg);
        //top背景图
        var topBg = BaseBitmap.create("acposhui_topbg");
        // view.addChildToContainer(topBg);
        var scrollgroup = new BaseDisplayObjectContainer();
        view._group = scrollgroup;
        scrollgroup.width = GameConfig.stageWidth;
        var _loop_1 = function (key) {
            var aidcode = key;
            var unit = this_1._poshuiAcCfg[key];
            var index = unit.index;
            var aid = aidcode.split("-")[0];
            var code = aidcode.split("-")[1];
            var group = new BaseDisplayObjectContainer();
            group.width = 308;
            group.height = 300;
            scrollgroup.addChild(group);
            // group.setScale(0.95);
            group.x = index % 2 ? 0 : 320;
            group.y = (Math.ceil(index / 2) - 1) * (group.height + 2) + 0;
            group.name = "group" + aid;
            var btn = ComponentManager.getButton("acposhui_btnitem" + index, "", function () {
                _this.acList = _this.acVo.getAcVoList();
                var currentVo = _this.acList[aid];
                var tipstr = "";
                if (currentVo) {
                    if (GameData.serverTime < currentVo.st) {
                        tipstr = LanguageManager.getlocal("acPunishNotOpen");
                    }
                    else if (GameData.serverTime >= currentVo.et) {
                        tipstr = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    }
                    else {
                        if (GameData.serverTime < (currentVo.et - 1 * 86400)) {
                            // tipstr = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                        }
                        else {
                            tipstr = LanguageManager.getlocal("acPunishEnd");
                        }
                    }
                }
                else {
                    tipstr = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                }
                if (currentVo && currentVo.isStart) {
                    if (unit.view) {
                        ViewController.getInstance().openView(unit.view, code);
                    }
                    else {
                        var str_1 = LanguageManager.getlocal("acPunishNotOpen");
                        App.CommonUtil.showTip(str_1);
                        return;
                    }
                }
                else {
                    App.CommonUtil.showTip(tipstr);
                    return;
                }
            }, view);
            btn.setScale(1);
            btn.setPosition(0, 0);
            group.addChild(btn);
            btn.name = "btn" + aid;
            var str = "";
            this_1.acList = this_1.acVo.getAcVoList();
            var vo = this_1.acList[aid];
            if (vo) {
                if (GameData.serverTime >= vo.et) {
                    str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                }
                else {
                    if (GameData.serverTime < (vo.et - 1 * 86400)) {
                        str = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                    }
                    else {
                        str = LanguageManager.getlocal("acPunishEnd");
                    }
                }
            }
            else {
                str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.DisplayUtil.changeToGray(group);
            }
            var timeBg = BaseBitmap.create("acposhui_timebg");
            group.addChild(timeBg);
            timeBg.name = "timebg" + aid;
            timeBg.x = group.width / 2 - timeBg.width / 2;
            timeBg.y = group.height - timeBg.height;
            App.LogUtil.log("this.timeBg.y " + timeBg.y);
            var txt = ComponentManager.getTextField(str, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(txt);
            txt.name = "txt" + aid;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, timeBg, [0, 0]);
        };
        var this_1 = this;
        // view.addChildToContainer(scrollgroup);
        for (var key in this._poshuiAcCfg) {
            _loop_1(key);
        }
        App.LogUtil.log("this.container.y " + this.container.y);
        scrollgroup.height = 602;
        var scrollview = ComponentManager.getScrollView(scrollgroup, new egret.Rectangle(0, 0, scrollgroup.width, (GameConfig.stageHeigth - this.container.y - topBg.height + 25)));
        view.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topBg, [0, topBg.height - 25]);
        view.addChildToContainer(topBg);
        this.refreshHandle();
    };
    /**
     * 刷新红点相关
     */
    AcGroupPoshuiView.prototype.refreshRedDot = function () {
        var acVoList = this.acVo.getAcVoList();
        var btnname = 1;
        for (var key in acVoList) {
            var group = this._group.getChildByName("group" + key);
            if (group) {
                var btn = group.getChildByName("btn" + key);
                if (btn) {
                    var acVo = acVoList[key];
                    if (acVo.isShowRedDot == true && acVo.isStart) {
                        App.CommonUtil.addIconToBDOC(btn);
                        var redDot = btn.getChildByName("reddot");
                        redDot.setPosition(btn.width - 60, 55);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(btn);
                    }
                }
            }
            ++btnname;
        }
    };
    /**刷新牌子的状态 */
    AcGroupPoshuiView.prototype.refreshBrand = function () {
        var acVoList = this.acVo.getAcVoList();
        var btnname = 1;
        for (var key in acVoList) {
            var group = this._group.getChildByName("group" + key);
            if (group) {
                var btn = group.getChildByName("btn" + key);
                if (btn) {
                    var acVo = acVoList[key];
                    if (acVo && acVo.isStart) {
                        App.DisplayUtil.changeToNormal(group);
                    }
                    else {
                        App.DisplayUtil.changeToGray(group);
                    }
                }
            }
            ++btnname;
        }
    };
    /**
     * 刷新返回消息
     */
    AcGroupPoshuiView.prototype.refreshHandle = function () {
        this.refreshRedDot();
        this.refreshBrand();
    };
    AcGroupPoshuiView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acposhuiview",
        ]);
    };
    AcGroupPoshuiView.prototype.tick = function () {
        for (var key in this._poshuiAcCfg) {
            var str = "";
            var aidcode = key;
            var unit = this._poshuiAcCfg[key];
            var index = unit.index;
            var aid = aidcode.split("-")[0];
            var code = aidcode.split("-")[1];
            var group = this._group.getChildByName("group" + aid);
            var txt = group.getChildByName("txt" + aid);
            var timeBg = group.getChildByName("timebg" + aid);
            this.acList = this.acVo.getAcVoList();
            var vo = this.acList[aid];
            if (group) {
                if (vo) {
                    if (GameData.serverTime >= vo.et) {
                        str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    }
                    else {
                        if (GameData.serverTime < (vo.et - 1 * 86400)) {
                            str = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                        }
                        else {
                            str = LanguageManager.getlocal("acPunishEnd");
                        }
                    }
                    if (GameData.serverTime >= (vo.et - 1 * 86400)) {
                        this.refreshHandle();
                    }
                }
                else {
                    str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                }
                txt.text = str;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, timeBg, [0, 0]);
            }
        }
    };
    AcGroupPoshuiView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        this.acList = null;
        this._poshuiAcCfg = null;
        this._group = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupPoshuiView;
}(AcGroupCommonView));
__reflect(AcGroupPoshuiView.prototype, "AcGroupPoshuiView");
//# sourceMappingURL=AcGroupPoshuiView.js.map