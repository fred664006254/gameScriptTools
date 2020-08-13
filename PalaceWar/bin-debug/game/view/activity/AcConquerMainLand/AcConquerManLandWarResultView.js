/**
 * 战斗结果展示
 * author qianjun
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
var AcConquerManLandWarResultView = (function (_super) {
    __extends(AcConquerManLandWarResultView, _super);
    function AcConquerManLandWarResultView() {
        var _this = _super.call(this) || this;
        _this._type = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerManLandWarResultView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerManLandWarResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "battle_win_word",
            "battle_win_light",
            "battle_fail_word"
        ]);
    };
    AcConquerManLandWarResultView.prototype.getTitleBgName = function () {
        return null;
    };
    AcConquerManLandWarResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcConquerManLandWarResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcConquerManLandWarResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcConquerManLandWarResultView.prototype.initView = function () {
    };
    AcConquerManLandWarResultView.prototype.init = function () {
        var view = this;
        _super.prototype.init.call(this);
        NetLoading.hide();
        view.viewBg.addTouchTap(view.hide, view);
        var resultInfo = view.param.data;
        var isWin = resultInfo.type == 'win';
        var winBg = BaseBitmap.create("public_rule_bg");
        winBg.setPosition(GameConfig.stageWidth / 2 - winBg.width, GameConfig.stageHeigth - 568 - winBg.height / 2);
        this.addChildToContainer(winBg);
        var winBg2 = BaseBitmap.create("public_rule_bg");
        winBg2.scaleX = -1;
        winBg2.setPosition(GameConfig.stageWidth / 2 + winBg2.width - 1, GameConfig.stageHeigth - 568 - winBg2.height / 2);
        this.addChildToContainer(winBg2);
        if (!isWin) {
            App.DisplayUtil.changeToGray(winBg);
            App.DisplayUtil.changeToGray(winBg2);
        }
        var winText = BaseBitmap.create(isWin ? "battle_win_word" : "battle_fail_word");
        winText.setPosition(GameConfig.stageWidth / 2 - winText.width / 2, GameConfig.stageHeigth - 568 - winBg.height / 2 - 35);
        view.addChildToContainer(winText);
        var battleFail = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var str = LanguageManager.getlocal("acConquerMainLandTip" + (isWin ? 30 : 31) + "-" + view.getUiCode(), [resultInfo.cityName]);
        if (typeof view.param.data.attackwin != undefined && view.param.data.attackwin === false) {
            str = LanguageManager.getlocal("acConquerMainLandTip" + 34 + "-" + view.getUiCode(), [resultInfo.cityName]);
        }
        battleFail.lineSpacing = 15;
        battleFail.text = str;
        battleFail.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, battleFail, winText, [0, winText.height + 45]);
        view.addChildToContainer(battleFail);
        //SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
        this.container.anchorOffsetX = GameConfig.stageWidth / 2;
        this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
        this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        var showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'sysConfirm', view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20, 60]);
        showBtn.x = GameConfig.stageWidth / 2 - showBtn.width / 2;
        view.addChildToContainer(showBtn);
        // let showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarPlayBack', view.showAntiClick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20,60]);
        // view.addChildToContainer(showBtn);
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceWarDamageRankViewTitle', view.showDamageRankClick, view);
        // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankBtn, winBg2, [-20,60]);
        // view.addChildToContainer(rankBtn);
        this.container.scaleX = 0.1;
        this.container.scaleY = 1;
        egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 120); //.to({scaleX:1.1,scaleY:1.1},100) 
    };
    AcConquerManLandWarResultView.prototype.showAntiClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW, {
            aid: view.aid,
            code: view.code,
            wardata: view.param.data.wardata,
            result: view.param.data.type,
            cityName: view.param.data.cityName2,
        });
        view.hide();
    };
    AcConquerManLandWarResultView.prototype.showDamageRankClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARDAMAGERANKVIEW, view.param.data);
    };
    AcConquerManLandWarResultView.prototype.dispose = function () {
        var view = this;
        view.viewBg.removeTouchTap();
        this._type = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerManLandWarResultView;
}(BaseView));
__reflect(AcConquerManLandWarResultView.prototype, "AcConquerManLandWarResultView");
//# sourceMappingURL=AcConquerManLandWarResultView.js.map