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
 * 金鼠闹春
 * @author 钱竣
 * @class AcGroupSpring2020View
 */
var AcGroupSpring2020View = (function (_super) {
    __extends(AcGroupSpring2020View, _super);
    function AcGroupSpring2020View() {
        var _this = _super.call(this) || this;
        _this.acList = null;
        _this._group = null;
        _this.newYearActivityCfg = {};
        return _this;
    }
    // private ThposhuijieCfg = [
    //     { buildId: "christmas", buildPos: { x: 407, y: 820 }, buildScale: 4, brandPos: { x: 401, y: 809 } },
    //     { buildId: "courier", buildPos: { x: 298, y: 355 }, buildScale: 4, brandPos: { x: 365, y: 339 } },
    //     { buildId: "marry", buildPos: { x: 0, y: 400 }, buildScale: 4, brandPos: { x: 44, y: 367 } },
    // ];
    AcGroupSpring2020View.prototype.getAidCode = function (aid) {
        var code = '3';
        var list = Api.acVoApi.getActivityVoListByAid(aid);
        if (list && list.length) {
            code = list[0].code.toString();
        }
        return code;
    };
    AcGroupSpring2020View.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    //背景图名称
    AcGroupSpring2020View.prototype.getBgName = function () {
        return null;
    };
    AcGroupSpring2020View.prototype.getTitleBgName = function () {
        return null;
    };
    AcGroupSpring2020View.prototype.getTitleStr = function () {
        return null;
    };
    AcGroupSpring2020View.prototype.getContainerY = function () {
        return 0;
    };
    AcGroupSpring2020View.prototype.initActCfg = function () {
        var key = "smashEgg-" + this.getAidCode("smashEgg");
        var key2 = "newYearRed-" + this.getAidCode("newYearRed");
        this.newYearActivityCfg = {
            "newYearSignUp-2": { index: 1, view: ViewConst.COMMON.ACNEWYEARSIGNUPVIEW },
            "newYearSevenDays-1": { index: 3, view: ViewConst.COMMON.ACNEWYEARSEVENDAYSVIEW },
            "rechargeBoxSP-2": { index: 4, view: ViewConst.COMMON.ACRECHARGEBOXSPVIEW },
            "costGemRank-1": { index: 5, view: ViewConst.COMMON.ACCOSTGEMRANKVIEW },
        };
        this.newYearActivityCfg[key2] = { index: 2, view: ViewConst.COMMON.ACNEWYEARREDVIEW };
        this.newYearActivityCfg[key] = { index: 6, view: ViewConst.COMMON.ACSMASHEGGVIEW };
    };
    AcGroupSpring2020View.prototype.initView = function () {
        var _this = this;
        var view = this;
        this.initActCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;
        //top背景图
        var topbg = BaseBitmap.create("spring2020top");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0, 0], true);
        var midbg = BaseBitmap.create("spring2020bottombg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0, topbg.height - 50]);
        view.addChildToContainer(midbg);
        view.addChildToContainer(topbg);
        var eff = ComponentManager.getCustomMovieClip("newsingledaytitleeff", 12);
        eff.width = 430;
        eff.height = 250;
        eff.blendMode = egret.BlendMode.ADD;
        eff.playWithTime(-1);
        eff.setPosition(101, 120);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eff, topbg, [101,120]);
        view.addChildToContainer(eff);
        var bottombg = BaseBitmap.create("spring2020zshi");
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, 0], true);
        var selectbg = BaseBitmap.create("spring2020select");
        var scrollgroup = new BaseDisplayObjectContainer();
        view._group = scrollgroup;
        scrollgroup.width = GameConfig.stageWidth;
        view.addChildToContainer(scrollgroup);
        var _loop_1 = function (key) {
            var aidcode = key;
            var unit = this_1.newYearActivityCfg[key];
            var index = unit.index;
            var aid = aidcode.split("-")[0];
            var code_1 = aidcode.split("-")[1];
            var group = new BaseDisplayObjectContainer();
            group.width = 337;
            group.height = 142;
            scrollgroup.addChild(group);
            group.setScale(0.9);
            group.x = index & 1 ? 7 : 320;
            group.y = 10 + (index - 1) * 85;
            group.name = "group" + aid;
            if (index == 1) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
            }
            var btn = ComponentManager.getButton("spring2020sorticon" + index, "", function () {
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
                        ViewController.getInstance().openView(unit.view, code_1);
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
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
            }, view);
            group.addChild(btn);
            btn.name = "btn" + aid;
            var txt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(txt);
            txt.name = "txt" + aid;
            var str = "";
            this_1.acList = this_1.acVo.getAcVoList();
            var vo = this_1.acList[aid];
            if (vo) {
                if (GameData.serverTime >= vo.et) {
                    str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                }
                else {
                    if (key == "rechargeBoxSP-2") {
                        if (GameData.serverTime < vo.et) {
                            str = App.DateUtil.getOpenLocalTime(vo.st, vo.et, false);
                        }
                        else {
                            str = LanguageManager.getlocal("acPunishEnd");
                        }
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
            }
            else {
                str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.DisplayUtil.changeToGray(group);
            }
            txt.text = str;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, btn, [index & 1 ? 40 : -40, 25]);
            var eff_1 = ComponentManager.getCustomMovieClip(index & 1 ? "newsingledaybtnlefteff" : "newsingledaybtnrighteff", 12);
            eff_1.width = index & 1 ? 400 : 420;
            eff_1.height = index & 1 ? 200 : 300;
            eff_1.anchorOffsetX = eff_1.width / 2;
            eff_1.anchorOffsetY = eff_1.height / 2;
            eff_1.blendMode = egret.BlendMode.ADD;
            eff_1.playWithTime(-1);
            eff_1.scaleX = 1.15;
            eff_1.scaleY = 1.2;
            eff_1.x = index & 1 ? 160 : 165;
            eff_1.y = index & 1 ? 66 : 77;
            group.addChild(eff_1);
        };
        var this_1 = this;
        for (var key in this.newYearActivityCfg) {
            _loop_1(key);
        }
        scrollgroup.addChild(selectbg);
        scrollgroup.height = 560;
        var scrollview = ComponentManager.getScrollView(scrollgroup, new egret.Rectangle(0, 0, scrollgroup.width, (GameConfig.stageHeigth - this.container.y - topbg.height - 20)));
        this.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topbg, [0, topbg.height + 10]);
        this.refreshHandle();
    };
    /**
     * 刷新红点相关
     */
    AcGroupSpring2020View.prototype.refreshRedDot = function () {
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
    AcGroupSpring2020View.prototype.refreshBrand = function () {
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
    AcGroupSpring2020View.prototype.refreshHandle = function () {
        this.refreshRedDot();
        this.refreshBrand();
    };
    AcGroupSpring2020View.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acspring2020view",
        ]);
    };
    AcGroupSpring2020View.prototype.tick = function () {
        for (var key in this.newYearActivityCfg) {
            var str = "";
            var aidcode = key;
            var unit = this.newYearActivityCfg[key];
            var index = unit.index;
            var aid = aidcode.split("-")[0];
            var code = aidcode.split("-")[1];
            var group = this._group.getChildByName("group" + aid);
            var txt = group.getChildByName("txt" + aid);
            var btn = group.getChildByName("btn" + aid);
            this.acList = this.acVo.getAcVoList();
            var vo = this.acList[aid];
            if (group) {
                if (vo) {
                    // if(GameData.serverTime < vo.st){
                    //     str = LanguageManager.getlocal(`acPunishNotOpen`);
                    // }
                    // else 
                    if (GameData.serverTime >= vo.et) {
                        str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    }
                    else {
                        if (key == "rechargeBoxSP-2") {
                            if (GameData.serverTime < vo.et) {
                                str = App.DateUtil.getOpenLocalTime(vo.st, vo.et, false);
                            }
                            else {
                                str = LanguageManager.getlocal("acPunishEnd");
                            }
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
                    if (key == "rechargeBoxSP-2") {
                        if (GameData.serverTime >= vo.et) {
                            this.refreshHandle();
                        }
                    }
                    else {
                        if (GameData.serverTime >= (vo.et - 1 * 86400)) {
                            this.refreshHandle();
                        }
                    }
                }
                else {
                    str = LanguageManager.getlocal("acGroupCentralmarketEndDes");
                }
                txt.text = str;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, btn, [index & 1 ? 40 : -40]);
            }
        }
    };
    AcGroupSpring2020View.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);
        this.acList = null;
        this.newYearActivityCfg = null;
        this._group = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupSpring2020View;
}(AcGroupCommonView));
__reflect(AcGroupSpring2020View.prototype, "AcGroupSpring2020View");
//# sourceMappingURL=AcGroupSpring2020View.js.map