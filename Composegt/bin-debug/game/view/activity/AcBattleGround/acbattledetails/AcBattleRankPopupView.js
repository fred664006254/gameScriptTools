/**
 * 风云擂台战，排行榜
 * author 赵占涛
 */
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
var AcBattleRankPopupView = (function (_super) {
    __extends(AcBattleRankPopupView, _super);
    function AcBattleRankPopupView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._period = 1;
        _this._curTabIdx = 0;
        // private _acData :any;
        // private _myNameTxt : BaseTextField = null;
        // private _myRankTxt : BaseTextField = null;
        // private _myScoreTxt : BaseTextField = null;
        // private _titleTxt : BaseTextField = null;
        // private _titleTxt3 : BaseTextField = null;
        _this.bottomBg = null;
        _this._playerName = null;
        _this._allName = null;
        _this._playerRank = null;
        _this._playerScore = null;
        _this._allRank = null;
        _this._allPlayerNum = null;
        _this._topRank = null;
        _this._topPlayerName = null;
        _this._topPlayerAlliName = null;
        _this._topPlayerScore = null;
        _this._topAlliName = null;
        _this._topAlliZid = null;
        _this._topAlliLiv = null;
        _this._bg2 = null;
        _this._cdText = null;
        _this._servantTipTxt = null;
        _this._waiting = 0;
        _this.code = null;
        _this.aid = null;
        _this._x = 0;
        return _this;
    }
    Object.defineProperty(AcBattleRankPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleRankPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleRankPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acBattleGroundRankViewTab1",
            "acBattleGroundRankViewTab2",
        ];
    };
    AcBattleRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao"
        ]);
    };
    AcBattleRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcBattleRankPopupView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcBattleRankPopupView.prototype.initView = function () {
        this.tabbarGroup.setSpace(10);
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 518, 541);
        var view = this;
        var contentBg = BaseBitmap.create("public_tc_bg01");
        contentBg.width = scrollListBgRect.width + 20; //538
        contentBg.height = scrollListBgRect.height + 20 + 80 + 9; //666
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = 55;
        view.addChildToContainer(contentBg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = scrollListBgRect.width;
        bg1.height = scrollListBgRect.height;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 65;
        scrollListBgRect.x = bg1.x;
        scrollListBgRect.y = bg1.y;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("rank_biao");
        bg2.width = bg1.width - 30;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg1.y + 14;
        this._bg2 = bg2;
        this.addChildToContainer(bg2);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = bg1.width;
        ;
        bottomBg.height = 80;
        bottomBg.setPosition(bg1.x, bg1.y + bg1.height + 9);
        view.bottomBg = bottomBg;
        this.addChildToContainer(bottomBg);
        this.refreshBottomData(0);
        // //倒计时 
        // let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // tipTxt.lineSpacing = 5; 
        // tipTxt.textAlign = egret.HorizontalAlign.CENTER;   
        // tipTxt.height = 50;
        // this._servantTipTxt = tipTxt; 
        // this.addChildToContainer(tipTxt);  
        //倒计时
        var tipTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.height = 50;
        this._cdText = tipTxt;
        this.addChildToContainer(tipTxt);
    };
    AcBattleRankPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_BATTLEGROUND_GETANK, requestData: {
                activeId: view.vo.aidAndCode,
                test: 1
            } };
    };
    AcBattleRankPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rankData = data.data.data;
            this.vo.setRankData(rankData);
        }
    };
    AcBattleRankPopupView.prototype.refreshBottomData = function (index) {
        // _topRank                         rankorder
        // this._topPlayerName = null;      ranknickName
        // this._topPlayerAlliName = null;  acBattleGroundRankViewTab2
        // this._topPlayerScore = null;     acBattlerank4
        // this._topAlliName = null;        acBattleGroundRankViewTab2
        // this._topAlliZid = null;         rankServer
        // this._topAlliLiv = null;         acBattlerank5
        if (!this._topRank) {
            this._topRank = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._topRank.x = this._bg2.x + 35;
            this._topRank.y = this._bg2.y + this._bg2.height / 2 - this._topRank.height / 2;
            this.addChildToContainer(this._topRank);
        }
        if (!this._playerName) {
            this._playerName = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewPlayerName", [Api.playerVoApi.getPlayerName()]), 20, TextFieldConst.COLOR_BROWN);
            this.addChildToContainer(this._playerName);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._playerName, this.bottomBg, [20, 15]);
        }
        if (!this._allName) {
            this._allName = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewAllName", [Api.playerVoApi.getPlayerAllianceName() ? Api.playerVoApi.getPlayerAllianceName() : LanguageManager.getlocal("nothing")]), 20, TextFieldConst.COLOR_BROWN);
            this.addChildToContainer(this._allName);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._allName, this.bottomBg, [300, 15]);
        }
        switch (index) {
            case 0:
                if (!this._topPlayerName) {
                    this._topPlayerName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topPlayerName.x = this._bg2.x + 130;
                    this._topPlayerName.y = this._bg2.y + this._bg2.height / 2 - this._topPlayerName.height / 2;
                    this.addChildToContainer(this._topPlayerName);
                }
                if (!this._topPlayerAlliName) {
                    this._topPlayerAlliName = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundRankViewTab2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topPlayerAlliName.x = this._bg2.x + 290;
                    this._topPlayerAlliName.y = this._bg2.y + this._bg2.height / 2 - this._topPlayerAlliName.height / 2;
                    this.addChildToContainer(this._topPlayerAlliName);
                }
                if (!this._topPlayerScore) {
                    this._topPlayerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topPlayerScore.x = this._bg2.x + 400;
                    this._topPlayerScore.y = this._bg2.y + this._bg2.height / 2 - this._topPlayerScore.height / 2;
                    this.addChildToContainer(this._topPlayerScore);
                }
                if (!this._playerRank) {
                    this._playerRank = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewPlayerRank", [this.vo.getRankPlayerRank() == 0 ? LanguageManager.getlocal('atkracedes4') : String(this.vo.getRankPlayerRank())]), 20, TextFieldConst.COLOR_BROWN);
                    this._playerRank.x = this._playerName.x;
                    this._playerRank.y = this._playerName.y + this._playerName.height + 5;
                    this.addChildToContainer(this._playerRank);
                }
                if (!this._playerScore) {
                    if (this.vo.getRankPlayerScore() == null || this.vo.getRankPlayerScore() == undefined) {
                        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewPlayerScore", [LanguageManager.getlocal("acBattleRankPopupOut")]), 20, TextFieldConst.COLOR_BROWN);
                    }
                    else {
                        this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewPlayerScore", [String(this.vo.getRankPlayerScore())]), 20, TextFieldConst.COLOR_BROWN);
                    }
                    this._playerScore.x = this._allName.x;
                    this._playerScore.y = this._allName.y + this._allName.height + 5;
                    this.addChildToContainer(this._playerScore);
                }
                if (!this.vo.getAttendQuality()) {
                    this._playerRank.text = LanguageManager.getlocal("acBattleRankPopupViewPlayerRank", [LanguageManager.getlocal("crossImacyNoAccess")]);
                    this._playerScore.text = LanguageManager.getlocal("acBattleRankPopupViewPlayerScore", [LanguageManager.getlocal("crossImacyNoAccess")]);
                }
                if (this._topPlayerName) {
                    this._topPlayerName.visible = true;
                }
                if (this._topPlayerAlliName) {
                    this._topPlayerAlliName.visible = true;
                }
                if (this._topPlayerScore) {
                    this._topPlayerScore.visible = true;
                }
                if (this._topAlliName) {
                    this._topAlliName.visible = false;
                }
                if (this._topAlliZid) {
                    this._topAlliZid.visible = false;
                }
                if (this._topAlliLiv) {
                    this._topAlliLiv.visible = false;
                }
                if (this._allRank) {
                    this._allRank.visible = false;
                }
                if (this._allPlayerNum) {
                    this._allPlayerNum.visible = false;
                }
                if (this._playerRank) {
                    this._playerRank.visible = true;
                }
                if (this._playerScore) {
                    this._playerScore.visible = true;
                }
                break;
            case 1:
                // this._topAlliName = null;        acBattleGroundRankViewTab2
                // this._topAlliZid = null;         rankServer
                // this._topAlliLiv = null;         acBattlerank5
                if (!this._topAlliName) {
                    this._topAlliName = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundRankViewTab2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topAlliName.x = this._bg2.x + 145;
                    this._topAlliName.y = this._bg2.y + this._bg2.height / 2 - this._topAlliName.height / 2;
                    this.addChildToContainer(this._topAlliName);
                }
                if (!this._topAlliZid) {
                    this._topAlliZid = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topAlliZid.x = this._bg2.x + 280;
                    this._topAlliZid.y = this._bg2.y + this._bg2.height / 2 - this._topAlliZid.height / 2;
                    this.addChildToContainer(this._topAlliZid);
                }
                if (!this._topAlliLiv) {
                    this._topAlliLiv = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank5"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._topAlliLiv.x = this._bg2.x + 380;
                    this._topAlliLiv.y = this._bg2.y + this._bg2.height / 2 - this._topAlliLiv.height / 2;
                    this.addChildToContainer(this._topAlliLiv);
                }
                if (!this._allRank) {
                    this._allRank = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewAllRank", [String(this.vo.getRankAllRank())]), 20, TextFieldConst.COLOR_BROWN);
                    this._allRank.x = this._playerName.x;
                    this._allRank.y = this._playerName.y + this._playerName.height + 5;
                    this.addChildToContainer(this._allRank);
                }
                if (!this._allPlayerNum) {
                    this._allPlayerNum = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewAllPlayerNum", [String(this.vo.getRankAllPlayerNum())]), 20, TextFieldConst.COLOR_BROWN);
                    this._allPlayerNum.x = this._allName.x;
                    this._allPlayerNum.y = this._allName.y + this._allName.height + 5;
                    this.addChildToContainer(this._allPlayerNum);
                }
                if (!this.vo.getAttendQuality()) {
                    this._allRank.text = LanguageManager.getlocal("acBattleRankPopupViewAllRank", [LanguageManager.getlocal("crossImacyNoAccess")]);
                    this._allPlayerNum.text = LanguageManager.getlocal("acBattleRankPopupViewAllPlayerNum", [LanguageManager.getlocal("crossImacyNoAccess")]);
                }
                if (this._topPlayerName) {
                    this._topPlayerName.visible = false;
                }
                if (this._topPlayerAlliName) {
                    this._topPlayerAlliName.visible = false;
                }
                if (this._topPlayerScore) {
                    this._topPlayerScore.visible = false;
                }
                if (this._topAlliName) {
                    this._topAlliName.visible = true;
                }
                if (this._topAlliZid) {
                    this._topAlliZid.visible = true;
                }
                if (this._topAlliLiv) {
                    this._topAlliLiv.visible = true;
                }
                if (this._allRank) {
                    this._allRank.visible = true;
                }
                if (this._allPlayerNum) {
                    this._allPlayerNum.visible = true;
                }
                if (this._playerRank) {
                    this._playerRank.visible = false;
                }
                if (this._playerScore) {
                    this._playerScore.visible = false;
                }
                break;
        }
    };
    AcBattleRankPopupView.prototype.clickTabbarHandler = function (params) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, params);
        view._curTabIdx = params.index;
        this.refreshBottomData(params.index);
    };
    AcBattleRankPopupView.prototype.tick = function () {
        var curPeriod = this.vo.getCurperiod();
        var code = this.param.data.code;
        this.freshText();
        this._period = curPeriod;
    };
    AcBattleRankPopupView.prototype.initTabbarGroup = function () {
        this.selectedTabIndex = this.param.data.index;
        _super.prototype.initTabbarGroup.call(this);
    };
    AcBattleRankPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleRankPopupView.prototype.freshText = function () {
        var view = this;
        this.code = this.param.data.code;
        var period = view.vo.getCurperiod();
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = this.getDefaultCn("acBattleRoundCDTxt" + period); //`acBattleRoundCDTxt${view._period}-${code}`;
        var param = [];
        var myRank = view.vo.getMyRank();
        switch (period) {
            case 1:
                param.push(cd);
                break;
            case 2:
                param.push(cd);
                var need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
                // this.need  = need;
                if (period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()) {
                    //最后一轮
                    str = this.getDefaultCn("acBattleRoundCDTxt4"); //`acBattleRoundCDTxt4-${code}`;
                }
                else {
                    param.push(need);
                }
                if (view.vo.getAttendQuality()) {
                    //没被淘汰
                    if (view.vo.getJoinIn()) {
                        param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [myRank.toString()]));
                        if (this._waiting == 1) {
                            param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [LanguageManager.getlocal("acBattleWaiting")]));
                        }
                    }
                    else {
                        param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt5")));
                    }
                }
                else {
                    param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
                }
                break;
            case 3:
            case 4:
                str = this.getDefaultCn("acBattleRoundCDTxt3");
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
                param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt" + tyle)));
                break;
        }
        if (view._cdText) {
            view._cdText.text = LanguageManager.getlocal(str, param);
            view._cdText.x = GameConfig.stageWidth / 2 - view._cdText.width / 2;
            view._cdText.y = this.bottomBg.y + this.bottomBg.height + 20; //GameConfig.stageHeigth - view._cdText.height-110;  
        }
    };
    AcBattleRankPopupView.prototype.getShowHeight = function () {
        return 855;
    };
    AcBattleRankPopupView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcBattleRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcBattleRankPopupView.prototype.dispose = function () {
        var view = this;
        this._period = 1;
        view.bottomBg = null;
        this._playerName = null;
        this._allName = null;
        this._playerRank = null;
        this._playerScore = null;
        this._allRank = null;
        this._allPlayerNum = null;
        this._topRank = null;
        this._topPlayerName = null;
        this._topPlayerAlliName = null;
        this._topPlayerScore = null;
        this._topAlliName = null;
        this._topAlliZid = null;
        this._topAlliLiv = null;
        this._bg2 = null;
        this._cdText = null;
        this._servantTipTxt = null;
        this._waiting = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattleRankPopupView;
}(PopupView));
__reflect(AcBattleRankPopupView.prototype, "AcBattleRankPopupView");
