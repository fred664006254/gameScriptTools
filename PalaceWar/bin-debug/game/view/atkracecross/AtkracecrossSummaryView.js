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
var AtkracecrossSummaryView = /** @class */ (function (_super) {
    __extends(AtkracecrossSummaryView, _super);
    function AtkracecrossSummaryView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = 0;
        _this._countDownText = null;
        _this._enterBtn = null;
        _this._cdTimeDesc = null;
        _this._cdType = 1; //倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时
        _this._openDesc = null;
        _this._isCanJoin = null; // 0 没资格  1 有资格
        return _this;
    }
    AtkracecrossSummaryView.prototype.getRequestData = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        return { requestType: NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK, requestData: { activeId: crossVo.aidAndCode } };
    };
    AtkracecrossSummaryView.prototype.refreshInfo = function () {
        this.request(NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK, {});
    };
    AtkracecrossSummaryView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK) {
            if (data.data.data.iscanjoin == 0) {
                this._isCanJoin = 0;
            }
            else {
                this._isCanJoin = 1;
            }
            // return;
        }
        if (this._openDesc) {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
            if (crossVo.info && crossVo.info.iscanjoin == 1) {
                this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkraceCrossOpenDesc2", crossVo.isCrossLeague()));
                if (this.vo.checkIsFengyun()) {
                    this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2_fengyun");
                }
            }
            else {
                this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkraceCrossOpenDesc3", crossVo.isCrossLeague()));
                if (this.vo.checkIsFengyun()) {
                    this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3_fengyun");
                }
            }
        }
    };
    AtkracecrossSummaryView.prototype.getResourceList = function () {
        var arr = [];
        if (this.vo.checkIsFengyun()) {
            arr = ["crossserverintidaizi-7", "atkracecross_title_fengyun", "atkracecross_bgfengyun", "btn_enter_race_fengyun",
                "atkracecross_zhalan_fengyun", "acwealthcarpview_servantskintxt", "acatkracecrossjoin_fengyun"];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_bg", "atkracecross_title", "btn_enter_race", "atkracecross_timebg", "atkracecross_title_multicross", 'acatkracecrossjoin', 'acatkracecrossjoin_multicross'
        ]).concat(arr);
    };
    AtkracecrossSummaryView.prototype.getBgName = function () {
        if (this.vo.checkIsFengyun()) {
            return "atkracecross_bgfengyun";
        }
        return "atkracecross_bg";
    };
    AtkracecrossSummaryView.prototype.getTitleBgName = function () {
        return null;
    };
    AtkracecrossSummaryView.prototype.getTitleStr = function () {
        return null;
    };
    // 初始化背景
    AtkracecrossSummaryView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AtkracecrossSummaryView.prototype.initView = function () {
        var _this = this;
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var titleResStr = App.CommonUtil.getCrossLeagueRes("atkracecross_title", crossVo.isCrossLeague());
        if (this.vo.checkIsFengyun()) {
            titleResStr = "atkracecross_title_fengyun";
        }
        var titlePic = BaseBitmap.create(titleResStr);
        titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width / 2, 10);
        this.addChildToContainer(titlePic);
        if (this.vo.info && this.vo.info.iscanjoin == 1) {
            var joinStr = "acatkracecrossjoin";
            if (crossVo.isCrossLeague()) {
                joinStr += "_multicross";
            }
            if (crossVo.isCrossFengYun()) {
                joinStr += "_fengyun";
            }
            var joinBg = BaseBitmap.create(joinStr);
            joinBg.setPosition(0, 0);
            this.addChild(joinBg);
        }
        //底部
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 168;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        if (this.vo.checkIsFengyun()) {
            bottomBg.height = 135;
            bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
            var zhalan = BaseBitmap.create("atkracecross_zhalan_fengyun");
            zhalan.y = GameConfig.stageHeigth - zhalan.height;
            this.addChildToContainer(zhalan);
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(216, zhalan.y - 100);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChild(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(function () {
                if (_this.vo.isStart) {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSATKRACECHEERVIEW, { aid: "crossServerAtkRace", code: _this.vo.code });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                }
            }, this);
            var daizi = BaseBitmap.create("crossserverintidaizi-7");
            daizi.y = GameConfig.stageHeigth - bottomBg.height - daizi.height;
            this.addChildToContainer(daizi);
        }
        this.addChildToContainer(bottomBg);
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 24;
        timeDesc.y = bottomBg.y + 30;
        this.addChildToContainer(timeDesc);
        var qualification = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkracecrossQualification", crossVo.isCrossLeague())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qualification.x = timeDesc.x;
        qualification.y = timeDesc.y + 35;
        qualification.width = GameConfig.stageWidth - qualification.x * 2;
        qualification.lineSpacing = 6;
        this.addChildToContainer(qualification);
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (crossVo.st > GameData.serverTime - timeNumber) {
            this._cdType = 1;
            this._countDownTime = timeNumber - GameData.serverTime + crossVo.st;
        }
        else if (crossVo.et > GameData.serverTime + timeNumber2) {
            this._cdType = 2;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else {
            this._cdType = 3;
            this._countDownTime = crossVo.et - GameData.serverTime;
        }
        //test code 
        // this._cdType = 2;
        // this._countDownTime = 10;
        //顶部
        var topBg = BaseBitmap.create("atkracecross_timebg");
        topBg.height = 128;
        topBg.setPosition(GameConfig.stageWidth / 2 - topBg.width / 2, 152);
        this.addChildToContainer(topBg);
        this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime" + this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTimeDesc.y = topBg.y + 10;
        this.addChildToContainer(this._cdTimeDesc);
        //倒计时
        this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe50404);
        this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2 - this._countDownText.width / 2;
        this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width, this._cdTimeDesc.y);
        this.addChildToContainer(this._countDownText);
        if (this._cdType == 3) {
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        }
        if (this.vo.checkIsFengyun()) {
            topBg.visible = false;
            timeDesc.x = 15;
            timeDesc.y = bottomBg.y + 15;
            timeDesc.size = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            this._cdTimeDesc.x = timeDesc.x;
            this._cdTimeDesc.y = timeDesc.y + 30;
            this._cdTimeDesc.size = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width, this._cdTimeDesc.y);
            this._countDownText.size = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            qualification.x = timeDesc.x;
            qualification.y = this._cdTimeDesc.y + 30;
            qualification.text = LanguageManager.getlocal("atkracecrossQualification_fengyun");
            qualification.size = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            this._enterBtn = ComponentManager.getButton("btn_enter_race_fengyun", null, this.enterRackHandler, this, null, 0);
            this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, bottomBg.y - this._enterBtn.height + 5);
            this.addChildToContainer(this._enterBtn);
            return;
        }
        //进入擂台按钮
        this._enterBtn = ComponentManager.getButton("btn_enter_race", null, this.enterRackHandler, this, null, 0);
        this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, 420);
        this.addChildToContainer(this._enterBtn);
        this._openDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        this._openDesc.width = 360;
        this._openDesc.setPosition(GameConfig.stageWidth / 2 - this._openDesc.width / 2, this._countDownText.y + 50);
        this._openDesc.lineSpacing = 6;
        this._openDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._openDesc);
        if (crossVo.st > GameData.serverTime - timeNumber) {
            this._enterBtn.setEnable(false);
        }
        if (crossVo.st > GameData.serverTime - 300) {
            this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkraceCrossOpenDesc1", crossVo.isCrossLeague()));
            if (this.vo.checkIsFengyun()) {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1_fengyun");
            }
            TimerManager.doTimer(crossVo.st - GameData.serverTime + 300, 1, this.refreshInfo, this);
        }
        else {
            this.refreshInfo();
        }
        if (this.vo.checkIsFengyun()) {
            this._openDesc.visible = false;
        }
    };
    AtkracecrossSummaryView.prototype.enterRackHandler = function () {
        if (this.vo && this.vo.isStart) {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVIEW, {
                aid: "crossServerAtkRace",
                code: this.code
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        }
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSDETAILPOPUPVIEW);
    };
    AtkracecrossSummaryView.prototype.tick = function () {
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this.refreshEnterBtn();
            }
        }
    };
    AtkracecrossSummaryView.prototype.refreshEnterBtn = function () {
        this._cdType += 1;
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (this._cdType == 2) {
            this._enterBtn.setEnable(true);
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else if (this._cdType == 3) {
            this._countDownTime = crossVo.et - GameData.serverTime;
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
        }
        else if (this._cdType == 4) {
            ViewController.getInstance().hideAllView();
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("atkracecrossEndTip", crossVo.isCrossLeague())));
            Api.acVoApi.isHandled_BI = false;
            Api.acVoApi.isHandled_LRP = false;
            Api.acVoApi.isHandled_ILI = false;
            return;
        }
        this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime" + this._cdType);
        this._countDownText.text = this.getCountTimeStr();
        if (this._cdType == 3) {
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
            if (this.vo.checkIsFengyun()) {
                this._cdTimeDesc.x = 15;
            }
        }
    };
    AtkracecrossSummaryView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    Object.defineProperty(AtkracecrossSummaryView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkracecrossSummaryView.prototype, "uiType", {
        get: function () {
            if (this.vo.checkIsFengyun()) {
                return "2";
            }
        },
        enumerable: true,
        configurable: true
    });
    AtkracecrossSummaryView.prototype.dispose = function () {
        Api.acVoApi.isHandled_LRP = false;
        TimerManager.remove(this.refreshInfo, this);
        this._countDownTime = 0;
        this._countDownText = null;
        this._enterBtn = null;
        this._cdTimeDesc = null;
        this._openDesc = null;
        this._isCanJoin = null;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossSummaryView;
}(AcCommonView));
//# sourceMappingURL=AtkracecrossSummaryView.js.map