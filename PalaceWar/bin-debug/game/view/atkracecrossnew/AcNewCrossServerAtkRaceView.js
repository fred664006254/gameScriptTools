/**
 * author shaoliang
 * date 2020/6/12
 * @class AcNewCrossServerAtkRaceView
 * 新跨服擂台入口
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcNewCrossServerAtkRaceView = /** @class */ (function (_super) {
    __extends(AcNewCrossServerAtkRaceView, _super);
    function AcNewCrossServerAtkRaceView() {
        var _this = _super.call(this) || this;
        _this._enterBtn = null;
        //活动倒计时
        _this._countDownTime = 0;
        _this._countDownText = null;
        _this._openNode = null;
        _this._cdTimeDesc = null;
        _this._cdType = 1; //倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时
        //派遣门客倒计时
        _this._dispatchServantNode = null;
        _this._dispatchTime = 0;
        _this._dispatchTimeText = null;
        _this._dispatchTimeBg = null;
        _this._isCanJoin = null; // 0 没资格  1 有资格
        _this._cornertip = null;
        _this._openDesc = null;
        _this._dispathBtn = null;
        return _this;
    }
    AcNewCrossServerAtkRaceView.prototype.getBgName = function () {
        return "newcrossatkrace_bg";
    };
    AcNewCrossServerAtkRaceView.prototype.getTitleBgName = function () {
        return null;
    };
    AcNewCrossServerAtkRaceView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    AcNewCrossServerAtkRaceView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    Object.defineProperty(AcNewCrossServerAtkRaceView.prototype, "crossVo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.code);
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    AcNewCrossServerAtkRaceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newcrossatkrace_bg", "newcrossatkrace_title", "newcrossatkrace_cornertip",
            "dispatch_servant_btn", "dispatch_servant_btn_down", "acredlotuswarrior_bottom",
            "btn_enter_race", "crossserverintidaizi-7", "newcrossatkrace_zhenrongbtn", "newcrossatkrace_zhenrongbtn_down",
        ]);
    };
    // 初始化背景
    AcNewCrossServerAtkRaceView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AcNewCrossServerAtkRaceView.prototype.refreshInfo = function () {
        this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETACTIVITYATK, {});
    };
    AcNewCrossServerAtkRaceView.prototype.receiveData = function (data) {
        if (this.crossVo.info && this.crossVo.info.iscanjoin == 1) {
            this._cornertip.visible = true;
            if (this._dispatchServantNode) {
                this._dispatchServantNode.visible = true;
            }
            this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc2", this.crossVo.isCrossLeague()));
        }
        else {
            this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc3", this.crossVo.isCrossLeague()));
        }
        this._openNode.visible = true;
    };
    AcNewCrossServerAtkRaceView.prototype.initView = function () {
        Api.atkracecrossVoApi.newcrossCode = "1"; //this.code;
        var titlePic = BaseBitmap.create(App.CommonUtil.getCrossLeagueRes("newcrossatkrace_title", this.crossVo.isCrossLeague()));
        titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width / 2, 20);
        this.addChildToContainer(titlePic);
        var cornertip = BaseBitmap.create("newcrossatkrace_cornertip");
        cornertip.setPosition(0, 0);
        this.addChildToContainer(cornertip);
        this._cornertip = cornertip;
        cornertip.visible = false;
        //人物形象
        var titleId = "3000";
        var tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        var resPath = "palace_db_" + titleId;
        var playerDragon = null;
        if (titleId && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath + "_ske")) {
            var loadIdx = 0;
            var myHair = null;
            playerDragon = new BaseDisplayObjectContainer();
            playerDragon.x = GameConfig.stageWidth / 2;
            playerDragon.y = GameConfig.stageHeigth - 800;
            this.addChildToContainer(playerDragon);
            var level = 1;
            var role = App.CommonUtil.getPlayerDragonRole(titleId, Api.playerVoApi.getPlayePicId(), level);
            role.name = "role";
            playerDragon.addChild(role);
            role.setPosition(0, 40);
        }
        else {
            var level = 1;
            playerDragon = Api.playerVoApi.getPlayerPortrait(Number(titleId), Api.playerVoApi.getPlayePicId(), 0, false, null, null, level);
            playerDragon.x = GameConfig.stageWidth / 2 - playerDragon.width * playerDragon.scaleX / 2;
            playerDragon.y = GameConfig.stageHeigth - 800;
            this.addChildToContainer(playerDragon);
        }
        this._openNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._openNode);
        this._openNode.visible = false;
        var firebg = BaseBitmap.create("acredlotuswarrior_bottom");
        firebg.setPosition(0, GameConfig.stageHeigth - 160 - firebg.height);
        this._openNode.addChild(firebg);
        var redflag = BaseBitmap.create("crossserverintidaizi-7");
        redflag.setPosition(0, GameConfig.stageHeigth - 160 - redflag.height);
        this._openNode.addChild(redflag);
        //进入擂台按钮
        this._enterBtn = ComponentManager.getButton("btn_enter_race", null, this.enterRackHandler, this, null, 0);
        this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, GameConfig.stageHeigth - 550);
        this.addChildToContainer(this._enterBtn);
        var crossVo = this.crossVo;
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        App.LogUtil.log("GameData.serverTime " + GameData.serverTime + "  et " + crossVo.et);
        if (crossVo.st > GameData.serverTime - timeNumber) {
            this._enterBtn.visible = false;
            this._cdType = 1;
            this._countDownTime = timeNumber - GameData.serverTime + crossVo.st;
        }
        else if (crossVo.et > GameData.serverTime + timeNumber2) {
            this._cdType = 2;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else {
            this._cdType = 4;
            this._countDownTime = crossVo.et - GameData.serverTime;
        }
        //派遣
        this._dispatchTime = this.crossVo.st + 7200 - GameData.serverTime;
        // if (this._dispatchTime > 0)
        // {
        this._dispatchServantNode = new BaseDisplayObjectContainer();
        this._dispatchServantNode.y = GameConfig.stageHeigth - 266;
        this._openNode.addChild(this._dispatchServantNode);
        this._dispatchServantNode.visible = false;
        var dispatchBtnImg = "newcrossatkrace_zhenrongbtn";
        if (this._dispatchTime > 0) {
            dispatchBtnImg = "dispatch_servant_btn";
        }
        var dispathBtn = ComponentManager.getButton(dispatchBtnImg, null, this.dispathServantHandler, this, null, 0);
        dispathBtn.setPosition(GameConfig.stageWidth / 2 - dispathBtn.width / 2, 100 - dispathBtn.height);
        this._dispatchServantNode.addChild(dispathBtn);
        this._dispathBtn = dispathBtn;
        if (this.crossVo.dispatchServantRed()) {
            App.CommonUtil.addIconToBDOC(dispathBtn);
            var reddot = dispathBtn.getChildByName("reddot");
            reddot.y = 18;
        }
        var timebg = BaseBitmap.create("public_9_bg15");
        timebg.width = 278;
        timebg.height = 40;
        timebg.x = GameConfig.stageWidth / 2 - timebg.width / 2;
        this._dispatchServantNode.addChild(timebg);
        this._dispatchTimeBg = timebg;
        var dispathTimeText = ComponentManager.getTextField(this.getDispachTimeStr(), 30, TextFieldConst.COLOR_WARN_GREEN3);
        dispathTimeText.width = timebg.width;
        dispathTimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dispathTimeText, timebg);
        this._dispatchServantNode.addChild(dispathTimeText);
        this._dispatchTimeText = dispathTimeText;
        // }
        if (this._dispatchTime <= 0) {
            timebg.visible = false;
            dispathTimeText.visible = false;
        }
        //底部
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 168;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 24;
        timeDesc.y = bottomBg.y + 20;
        this.addChildToContainer(timeDesc);
        //倒计时
        this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime" + this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTimeDesc.x = timeDesc.x;
        this._cdTimeDesc.y = timeDesc.y + 30;
        this.addChildToContainer(this._cdTimeDesc);
        this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe50404);
        this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width, this._cdTimeDesc.y);
        this.addChildToContainer(this._countDownText);
        var qualification = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qualification.x = timeDesc.x;
        qualification.y = this._countDownText.y + 30;
        qualification.width = GameConfig.stageWidth - qualification.x * 2;
        qualification.lineSpacing = 6;
        this.addChildToContainer(qualification);
        this._openDesc = qualification;
        if (crossVo.st > GameData.serverTime - 300) {
            this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc1", crossVo.isCrossLeague()));
            TimerManager.doTimer(crossVo.st - GameData.serverTime + 300, 1, this.refreshInfo, this);
        }
        else {
            this.refreshInfo();
        }
        this.tick();
    };
    AcNewCrossServerAtkRaceView.prototype.enterRackHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSVIEW, {
            code: this.code
        });
    };
    AcNewCrossServerAtkRaceView.prototype.dispathServantHandler = function () {
        if (!this.crossVo.getSids() || this.crossVo.getSids().length == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceServantLess30Tip"));
            return;
        }
        this.crossVo.setDispatchServantRed();
        App.CommonUtil.removeIconFromBDOC(this._dispathBtn);
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSNEWDISPACHVIEW, {
            code: this.code
        });
    };
    AcNewCrossServerAtkRaceView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcNewCrossServerAtkRaceView.prototype.getDispachTimeStr = function () {
        var time = this._dispatchTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcNewCrossServerAtkRaceView.prototype.tick = function () {
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this._cdType += 1;
                this.refreshEnterBtn();
            }
        }
        if (this._dispatchTime >= 0) {
            this._dispatchTime--;
            if (this._dispatchTime < 0) {
                this._dispatchTimeText.visible = false;
                this._dispatchTimeBg.visible = false;
                // this._dispatchServantNode.dispose();
                // this._dispatchServantNode = null;
                this._dispathBtn.setBtnBitMap("newcrossatkrace_zhenrongbtn");
                this.refreshEnterBtn();
            }
            else {
                this._dispatchTimeText.visible = true;
                this._dispatchTimeBg.visible = true;
                this._dispatchTimeText.text = this.getDispachTimeStr();
            }
        }
    };
    AcNewCrossServerAtkRaceView.prototype.refreshEnterBtn = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.code);
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (this._cdType == 2) {
            this._enterBtn.visible = true;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else if (this._cdType == 3) {
            this._countDownTime = crossVo.et - GameData.serverTime;
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
        }
        else if (this._cdType >= 4) {
            ViewController.getInstance().hideAllView();
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkracecrossEndTip", crossVo.isCrossLeague())));
            Api.acVoApi.isHandled_BI = false;
            Api.acVoApi.isHandled_LRP = false;
            Api.acVoApi.isHandled_ILI = false;
            return;
        }
        this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime" + this._cdType);
        this._countDownText.text = this.getCountTimeStr();
        if (this._cdType == 3) {
            this._countDownText.x = this._cdTimeDesc.x + this._cdTimeDesc.width;
        }
    };
    AcNewCrossServerAtkRaceView.prototype.dispose = function () {
        this._enterBtn = null;
        this._countDownTime = 0;
        this._countDownText = null;
        this._dispatchServantNode = null;
        this._cdTimeDesc = null;
        this._openNode = null;
        this._dispatchTime = 0;
        this._dispatchTimeText = null;
        this._dispatchTimeBg = null;
        this._cornertip = null;
        this._openDesc = null;
        this._cdType = 0;
        this._dispathBtn = null;
        Api.acVoApi.isHandled_LRP = false;
        _super.prototype.dispose.call(this);
    };
    return AcNewCrossServerAtkRaceView;
}(AcCommonView));
//# sourceMappingURL=AcNewCrossServerAtkRaceView.js.map