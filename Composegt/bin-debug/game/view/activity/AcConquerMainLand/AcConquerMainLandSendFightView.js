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
var AcConquerMainLandSendFightView = (function (_super) {
    __extends(AcConquerMainLandSendFightView, _super);
    function AcConquerMainLandSendFightView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        _this._enermyTxt = null;
        _this._meTxt = null;
        return _this;
    }
    AcConquerMainLandSendFightView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSendFightView.prototype.getTitleStr = function () {
        return "acConquerMainLandSendFightView-" + this.getUiCode() + "_Title";
    };
    AcConquerMainLandSendFightView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "mainland_sendfight_topbg", "mainland_sendfight_itembg", "commonview_border2",
            "commonview_bottom", "commonview_border1", "commonview_woodbg", "mainland_servantitem_numbg",
            "servant_cardbg_0", "mainland_sendfight_tabbar1-" + code + "_down", "mainland_sendfight_tabbar1-" + code,
            "mainland_sendfight_tabbar2-" + code + "_down", "mainland_sendfight_tabbar2-" + code,
            "mainland_sendfight_tabbar3-" + code + "_down", "mainland_sendfight_tabbar3-" + code,
            "mlservant_selectitem_inselect-" + code, "mainlangcity" + code, "atkracecross_rewatdbg3", "awservantstate1",
            "mainland_sendfight_yournum", "mainland_sendfight_mynum", "recharge2_fnt"
        ]);
    };
    AcConquerMainLandSendFightView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acBattlePassTab1-" + code,
            "acBattlePassTab2-" + code,
            "acBattlePassTab3-" + code,
        ];
    };
    // 页签图名称
    AcConquerMainLandSendFightView.prototype.getTabbarName = function () {
        var arr = [];
        for (var i = 1; i < 4; ++i) {
            arr.push("mainland_sendfight_tabbar" + i + "-" + this.getUiCode());
        }
        return arr;
    };
    AcConquerMainLandSendFightView.prototype.getRuleInfo = function () {
        return "AcConquerMainLandRule-" + this.getUiCode();
    };
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandSendFightView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandSendFightView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandSendFightView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setMyTeamInfo(data.data.data.allteam);
            var score = 0;
            if (data.data.data.myscore && data.data.data.myscore.score) {
                score = data.data.data.myscore.score;
            }
            this.vo.setMyScore(score);
        }
    };
    // 初始化tabbarGroup
    AcConquerMainLandSendFightView.prototype.initTabbarGroup = function () {
        var border = BaseBitmap.create("commonview_border1");
        var bottom = BaseBitmap.create("commonview_bottom");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69;
        border.x = 0;
        border.y = GameConfig.stageHeigth - border.height;
        this.addChild(border);
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, true);
            this.tabbarGroup.setSpace(0);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = 215;
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            var tab = this.tabbarGroup;
            for (var i = 1; i < 4; ++i) {
                tab._tbArr[i - 1].addTextIcon("mainlandarmytitle" + i + "-" + this.getUiCode(), 0, 108);
                if (this.vo.isArmySend(i)) {
                    this.tabbarGroup.showStatusIcon(i - 1, "mlinfight-" + this.getUiCode(), true);
                    var red = tab._tbArr[i - 1].getChildByName("reddot");
                    red.x = 6;
                    red.y = 6;
                }
            }
            // this.changeTab();
        }
    };
    AcConquerMainLandSendFightView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0, view.titleBg.height + 80]);
        }
    };
    AcConquerMainLandSendFightView.prototype.getBgName = function () {
        return "commonview_woodbg";
    };
    AcConquerMainLandSendFightView.prototype.changeMyNum = function (str) {
        this._meTxt.text = str;
    };
    AcConquerMainLandSendFightView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        var code = view.getUiCode();
        this.selectedTabIndex = this.vo.getIdleTeamIndex();
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        view.param.data.callback = this.changeMyNum.bind(view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var titlebg = BaseBitmap.create('mainland_sendfight_topbg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(titlebg);
        var titlekuang = BaseBitmap.create("commonview_border2");
        titlekuang.width = view.width - 10;
        titlekuang.x = this.x + 5;
        titlekuang.y = titlebg.y + titlebg.height - 23;
        this.addChild(titlekuang);
        var enermyTxtBg = BaseBitmap.create('mainland_sendfight_yournum');
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, enermyTxtBg, titlebg, [-10, 6]);
        view.addChild(enermyTxtBg);
        var enermyinfo = view.param.data.data;
        var enermyTxt = ComponentManager.getBitmapText(App.StringUtil.changeIntToText3(enermyinfo.score), "recharge2_fnt");
        enermyTxt.textAlign = egret.HorizontalAlign.RIGHT;
        enermyTxt.anchorOffsetX = enermyTxt.width;
        enermyTxt.setPosition(enermyTxtBg.x + 10, enermyTxtBg.y + enermyTxtBg.height / 2 - enermyTxt.height / 2);
        view.addChild(enermyTxt);
        view._enermyTxt = enermyTxt;
        var meTxtBg = BaseBitmap.create('mainland_sendfight_mynum');
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, meTxtBg, titlebg, [-10, 6]);
        view.addChild(meTxtBg);
        var meTxt = ComponentManager.getBitmapText(0 + '', "recharge2_fnt");
        meTxt.textAlign = egret.HorizontalAlign.LEFT;
        meTxt.setPosition(meTxtBg.x + meTxtBg.width - 30, meTxtBg.y + meTxtBg.height / 2 - meTxt.height / 2);
        view.addChild(meTxt);
        view._meTxt = meTxt;
        if (PlatformManager.checkIsViSp()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, enermyTxtBg, titlebg, [-10, 0]);
            enermyTxt.setPosition(enermyTxtBg.x + enermyTxtBg.width - 32, enermyTxtBg.y + enermyTxtBg.height);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, meTxtBg, titlebg, [-10, 0]);
            meTxt.setPosition(meTxtBg.x + 35, meTxtBg.y + meTxtBg.height);
        }
        view._tabHeight = view.height - view.tabbarGroup.y - view.tabbarGroup.height + 12;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcConquerMainLandSendFightView.prototype.sendCallBack = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        var code = view.getUiCode();
        var enermyinfo = view.param.data.data;
        if (data) {
            //7 占领了npc，4打败玩家成功占领，8失败 9\10已被他人占领
            switch (data.conquerStat) {
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                    break;
                case 9:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip39-" + view.getUiCode()));
                    return;
                case 10:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip24-" + view.getUiCode()));
                    view._enermyTxt.text = LanguageManager.getlocal("acConquerMainLandEnermyScore-" + view.getUiCode(), [App.StringUtil.changeIntToText(enermyinfo.score)]);
                    return;
                case 7:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip26-" + code));
                case 4:
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, {
                        activeId: view.acTivityId,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO, {
                        activeId: view.acTivityId,
                        mainland: level,
                        building: num,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO, {
                        activeId: view.acTivityId,
                    });
                    var tab = this.tabbarGroup;
                    for (var i = 1; i < 4; ++i) {
                        if (this.vo.isArmySend(i)) {
                            this.tabbarGroup.showStatusIcon(i - 1, "mlinfight-" + this.getUiCode(), true);
                        }
                        else {
                            this.tabbarGroup.removeStatusIcon(i - 1);
                        }
                    }
                    break;
            }
        }
    };
    AcConquerMainLandSendFightView.prototype.cancelCallBack = function (evt) {
        var view = this;
        var code = view.getUiCode();
        var level = view.param.data.level;
        var num = view.param.data.num;
        var pos = view.param.data.pos;
        if (evt.data.data.data) {
            switch (evt.data.data.data.conquerStat) {
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                    break;
                case 6:
                case 9:
                    view.vo.clearArmyInfo(evt.data.data.data.teamnum);
                    var tab = this.tabbarGroup;
                    for (var i = 1; i < 4; ++i) {
                        if (this.vo.isArmySend(i)) {
                            this.tabbarGroup.showStatusIcon(i - 1, "mlinfight-" + this.getUiCode(), true);
                        }
                        else {
                            this.tabbarGroup.removeStatusIcon(i - 1);
                        }
                    }
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, {
                        activeId: view.acTivityId,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO, {
                        activeId: view.acTivityId,
                        mainland: level,
                        building: num,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO, {
                        activeId: view.acTivityId,
                    });
                    break;
            }
        }
    };
    AcConquerMainLandSendFightView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT), this.sendCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        view._tabHeight = 0;
        view._enermyTxt = null;
        view._meTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSendFightView;
}(CommonView));
__reflect(AcConquerMainLandSendFightView.prototype, "AcConquerMainLandSendFightView");
