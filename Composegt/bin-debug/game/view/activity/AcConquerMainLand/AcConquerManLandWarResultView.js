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
    Object.defineProperty(AcConquerManLandWarResultView.prototype, "uiCode", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    AcConquerManLandWarResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "wifebattlewin_txt",
            "wifebattlefail_txt",
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
        var winText = BaseBitmap.create(isWin ? "wifebattlewin_txt" : "wifebattlefail_txt");
        winText.setScale(0.5);
        winText.setPosition(GameConfig.stageWidth / 2 - winText.width * winText.scaleX / 2, winBg.y - winText.height * winText.scaleY / 2 + 30);
        view.addChildToContainer(winText);
        var txtBg = BaseBitmap.create("public_9v_bg05");
        txtBg.width = GameConfig.stageWidth - 80;
        txtBg.height = 140;
        txtBg.setPosition(GameConfig.stageWidth / 2 - txtBg.width / 2, winBg.y + winText.height / 2 + 5);
        view.addChildToContainer(txtBg);
        var textColor = isWin ? TextFieldConst.COLOR_WARN_YELLOW_NEW : TextFieldConst.COLOR_WHITE;
        var battleFail = ComponentManager.getTextField('', 26, textColor);
        var str = LanguageManager.getlocal("acConquerMainLandWarResult" + (isWin ? 1 : 2) + "-" + view.uiCode, [resultInfo.cityName]);
        if (typeof view.param.data.attackwin != undefined && view.param.data.attackwin === false) {
            str = LanguageManager.getlocal("acConquerMainLandTip" + 34 + "-" + view.uiCode, [resultInfo.cityName]);
        }
        battleFail.lineSpacing = 20;
        battleFail.text = str;
        battleFail.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, battleFail, txtBg, [0, 33]);
        view.addChildToContainer(battleFail);
        //SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
        this.container.anchorOffsetX = GameConfig.stageWidth / 2;
        this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
        this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        var showBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'sysConfirm', view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, showBtn, winBg, [20, 60]);
        showBtn.x = GameConfig.stageWidth / 2 - showBtn.width / 2;
        view.addChildToContainer(showBtn);
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
