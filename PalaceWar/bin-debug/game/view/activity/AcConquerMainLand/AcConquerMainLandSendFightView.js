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
        _this._enermyTxtBg = null;
        return _this;
    }
    AcConquerMainLandSendFightView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
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
            "mainlangcity" + code, "atkracecross_rewatdbg3", "aobaidescnamebg", "servant_namebg", "awservantstate1", "alliance_taskwotdbg1", "arena_bottom",
        ]);
    };
    AcConquerMainLandSendFightView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acBattlePassTab1-" + code,
            "acBattlePassTab2-" + code,
            "acBattlePassTab3-" + code,
        ];
    };
    AcConquerMainLandSendFightView.prototype.getRuleInfo = function () {
        return this.vo.getThisCn("AcConquerMainLandRule");
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
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, null, null, true);
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
                }
            }
            // this.changeTab();
        }
    };
    // 页签图名称
    AcConquerMainLandSendFightView.prototype.getTabbarName = function () {
        return "mlcitytab-" + this.getUiCode();
    };
    AcConquerMainLandSendFightView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0, view.titleBg.height + 65]);
        }
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
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var titlebg = BaseBitmap.create('atkracecross_rewatdbg3');
        titlebg.height = 65;
        titlebg.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(titlebg);
        var enermyTxtBg = BaseBitmap.create('aobaidescnamebg');
        view.addChild(enermyTxtBg);
        view._enermyTxtBg = enermyTxtBg;
        var enermyinfo = view.param.data.data;
        var enermyTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandEnermyScore-" + code, [App.StringUtil.changeIntToText(enermyinfo.score)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(enermyTxt);
        view._enermyTxt = enermyTxt;
        enermyTxtBg.width = enermyTxt.textWidth + 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enermyTxtBg, titlebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enermyTxt, titlebg);
        var line = BaseBitmap.create('public_line3');
        line.width = 570;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, titlebg);
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
        if (evt.data.ret && data) {
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
                    view._enermyTxtBg.width = view._enermyTxt.textWidth + 140;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._enermyTxtBg, view);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._enermyTxt, view._enermyTxtBg);
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
        if (evt.data.ret && evt.data.data.data) {
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
        view._enermyTxtBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandSendFightView;
}(CommonView));
__reflect(AcConquerMainLandSendFightView.prototype, "AcConquerMainLandSendFightView");
//# sourceMappingURL=AcConquerMainLandSendFightView.js.map