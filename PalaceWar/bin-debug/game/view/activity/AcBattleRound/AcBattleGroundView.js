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
author : qianjun
desc : 帮会争顶活动预热界面
*/
var AcBattleGroundView = (function (_super) {
    __extends(AcBattleGroundView, _super);
    function AcBattleGroundView() {
        var _this = _super.call(this) || this;
        _this._midBtn = null;
        _this._period = 1;
        _this._cdBg = null;
        _this._cdText = null;
        _this._needFresh = false;
        _this._attendText = null;
        _this._curRound = 1;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcBattleGroundView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcBattleGroundView.prototype, "acTivityId", {
        //REQUST_ACTIVITY_BATTLEGROUND
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundView.prototype.getTitleStr = function () {
        return "acBattleRoundViewTitle-" + this.getUiCode();
    };
    AcBattleGroundView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        ret = ret.concat([
            "crosspowerenterbg-1",
        ]);
        return ret;
    };
    // 背景图名称
    AcBattleGroundView.prototype.getBgName = function () {
        return "crosspowerenterbg-1";
    };
    AcBattleGroundView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        if (Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' && Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            return "acBattleRoundRule-1_newRule_withOpenRefusal";
        }
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? ("acBattleRoundRule-" + code + "_newRule") : ("acBattleRoundRule-" + code);
    };
    AcBattleGroundView.prototype.getRuleInfoParam = function () {
        var tmp = [];
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    };
    AcBattleGroundView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcBattleGroundView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data) {
            if (data.data.data.waiting) {
                view.vo.setWaiting(data.data.data.waiting);
            }
            else {
                view.vo.setWaiting(0);
            }
            view.vo.setRaceInfo(data.data.data.battleground);
            if (data.data.data.myrankArr) {
                view.vo.setRank(data.data.data.myrankArr);
            }
            if (data.data.data.alive) {
                view.vo.setAlive(data.data.data.alive);
            }
            else {
                view.vo.setAlive(0);
            }
            if (data.data.data.map) {
                view.vo.setMap(data.data.data.map);
            }
            if (view._needFresh) {
                view._needFresh = false;
            }
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcBattleGroundView.prototype.initBg = function () {
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = 0 - Math.floor((1136 - GameConfig.stageHeigth) / 2);
        }
    };
    AcBattleGroundView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._curRound = view.vo.getCurRound();
        view.vo.init = false;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY),view.playBoxCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = this.getUiCode();
        view._period = view.vo.getCurperiod();
        //顶部
        var topBg = BaseBitmap.create("battlegroundtop-" + code);
        view.addChild(topBg);
        var timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeCdTxt);
        var attendTxt = ComponentManager.getTextField(LanguageManager.getlocal((view.vo.getAttendQuality() ? "acBattleRoundQuality" : "acBattleRoundNoQuality") + "-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(attendTxt);
        view._attendText = attendTxt;
        if (view.vo.isWaiting()) {
            attendTxt.text = LanguageManager.getlocal("acBattleRoundCDTxt10-" + code);
        }
        if (this.vo.getCurperiod() == 1) {
            attendTxt.text = LanguageManager.getlocal("acbattlenobegun2");
        }
        topBg.height = timeCdTxt.textHeight + attendTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeCdTxt, topBg, [10, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, attendTxt, timeCdTxt, [0, timeCdTxt.textHeight + 5]);
        //顶部提示
        view.initTopTip();
        //底部
        var bottomBg = BaseBitmap.create("battlegroundbottombg-" + code);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        //活动详情
        var detailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'atkracecrossDetailTitle', function () {
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code
                });
                //活动详情界面
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, detailBtn, bottomBg, [85, 0]);
        view.addChild(detailBtn);
        //排行榜
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acDragonBoatDayRankViewTitle', function () {
            //排行榜界面
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                aid: view.aid,
                code: view.code,
                type: "rank"
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [85, 0]);
        view.addChild(rankBtn);
        //中部按钮
        var midBtn = ComponentManager.getButton("battlegroundbtn" + Math.min(view.vo.getCurperiod(), 3) + "-" + code, '', function () {
            var str = '';
            switch (view.vo.getCurperiod()) {
                case 1:
                    str = "acBattleRoundNotStart-" + code;
                    break;
                case 2:
                case 3:
                    ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDMAPVIEW, {
                        aid: view.aid,
                        code: view.code
                    });
                    return;
                case 4:
                    str = 'date_error';
                    break;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(str));
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, midBtn, view);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        view.setChildIndex(view.closeBtn, 9999);
    };
    AcBattleGroundView.prototype.tick = function () {
        var view = this;
        var curPeriod = view.vo.getCurperiod();
        var code = this.getUiCode();
        // if(curPeriod == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundCDTxt5-${code}`));
        //     view.hide();
        //     return;
        // }
        if (curPeriod !== view._period) {
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        }
        //view._midBtn.setBtnBitMap(`battlegroundbtn${Math.min(3,view.vo.getCurperiod())}-${view.code}`);
        view.freshText();
        view._period = curPeriod;
        view._midBtn.setBtnBitMap("battlegroundbtn" + Math.min(view.vo.getCurperiod(), 3) + "-" + code);
        if (view.vo.isWaiting()) {
            view._attendText.text = LanguageManager.getlocal("acBattleRoundCDTxt10-" + code);
        }
        else {
            view._attendText.text = LanguageManager.getlocal((view.vo.getAttendQuality() ? "acBattleRoundQuality" : "acBattleRoundNoQuality") + "-" + code);
        }
        if (this.vo.getCurperiod() == 1) {
            view._attendText.text = LanguageManager.getlocal("acbattlenobegun2");
        }
        var curround = view.vo.getCurRound();
        if (curround != view._curRound) {
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        }
        view._curRound = curround;
    };
    AcBattleGroundView.prototype.initTopTip = function () {
        var view = this;
        var code = this.getUiCode();
        var tipBg = BaseBitmap.create("battlegrounddescbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view, [0, 153]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                aid: view.aid,
                code: view.code,
                type: "rank"
            });
        }, view);
        var tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;
        view.freshText();
    };
    AcBattleGroundView.prototype.freshText = function () {
        var view = this;
        var code = this.getUiCode();
        var period = view.vo.getCurperiod();
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = "acBattleRoundCDTxt" + view._period + "-" + code;
        var param = [];
        var myRank = view.vo.getMyRank();
        if (view.vo.isWaiting()) {
            view._cdText.text = LanguageManager.getlocal("acBattleGroundTip8-" + code);
        }
        else {
            switch (period) {
                case 1:
                    param.push(cd);
                    break;
                case 2:
                    param.push(cd);
                    var need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
                    if (period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()) {
                        //最后一轮
                        str = "acBattleRoundCDTxt4-" + code;
                    }
                    else {
                        param.push(need);
                    }
                    if (view.vo.getAttendQuality()) {
                        //没被淘汰
                        if (view.vo.getJoinIn()) {
                            param.push(LanguageManager.getlocal("acBattleRoundRank-" + code, [String(myRank <= need ? 0x21eb39 : 0xff3c3c), myRank.toString()]));
                        }
                        else {
                            param.push(LanguageManager.getlocal("acBattleRoundCDTxt5-" + code));
                        }
                    }
                    else {
                        if (view.vo.getCurRound() == 1) {
                            param.push(LanguageManager.getlocal("acBattleRoundCDTxt11-" + code));
                        }
                        else {
                            if (view.vo.getCheerALlianceOut()) {
                                param.push(LanguageManager.getlocal("acBattleRoundCDTxt13-" + code));
                            }
                            else {
                                param.push(LanguageManager.getlocal("acBattleRoundCDTxt12-" + code));
                            }
                            // param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        // param.push(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                    }
                    break;
                case 3:
                case 4:
                    str = "acBattleRoundCDTxt3-" + code;
                    param.push(view.vo.getWinnerAlliance().name);
                    var tyle = 1;
                    if (view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())) {
                        tyle = 9;
                    }
                    else if (view.vo.getAttendQuality()) {
                        tyle = 7;
                    }
                    else {
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal("acBattleRoundCDTxt" + tyle + "-" + code));
                    break;
            }
            if (this._needFresh) {
                view._cdText.text = LanguageManager.getlocal("acBattleGroundTip8-" + code);
            }
            else {
                view._cdText.text = LanguageManager.getlocal(str, param);
            }
        }
        view._cdBg.width = view._cdText.textWidth + 30;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view, [0, 153]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0, -5]);
    };
    AcBattleGroundView.prototype.getSoundBgName = function () {
        return "music_atkrace";
    };
    AcBattleGroundView.prototype.dispose = function () {
        var view = this;
        view._midBtn = null;
        view._period = 1;
        view._cdBg.removeTouchTap();
        view._cdBg = null;
        view._cdText = null;
        view._needFresh = false;
        view._curRound = 1;
        Api.chatVoApi.clearAcCrossChatList();
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundView;
}(AcCommonView));
__reflect(AcBattleGroundView.prototype, "AcBattleGroundView");
//# sourceMappingURL=AcBattleGroundView.js.map