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
var ConquestWinPopupView = (function (_super) {
    __extends(ConquestWinPopupView, _super);
    function ConquestWinPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    ConquestWinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battle_win_word",
            "battle_win_light",
            "fire_flake_json",
            "fire_flake"
        ]);
    };
    ConquestWinPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.addTouchTap(this.hide, this);
        // let title:BaseBitmap=BaseBitmap.create("battle_win_word");
        // title.setPosition((this.viewBg.width-title.width)/2,-65);
        // this.addChildToContainer(title);
        var info = this.param.data.info;
        var titleStr = LanguageManager.getlocal("conquestInfoWin", [String(info.cid)]);
        var titleTxt = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        titleTxt.textAlign = egret.HorizontalAlign.CENTER;
        titleTxt.width = 480;
        titleTxt.lineSpacing = 6;
        titleTxt.setPosition((this.viewBg.width - titleTxt.width) / 2, 58);
        this.addChildToContainer(titleTxt);
        var conquestConfig = Config.ConquestCfg.getConquestCfgById(info.cid);
        var rewardVoAll = GameData.formatRewardItem(this.param.data.award);
        var rewardVo = [];
        var stringTab = [];
        stringTab.push(LanguageManager.getlocal("conquestpointsdes", [String(conquestConfig.score)]));
        // stringTab.push(LanguageManager.getlocal("affairtxt2")+"+"+conquestConfig.reward);
        for (var i = 0; i < rewardVoAll.length; i++) {
            var vo = rewardVoAll[i];
            if (vo.type == 6) {
                rewardVo.push(vo);
            }
            else {
                // stringTab.push(vo.name + "+" + vo.num);
                //红颜
                if (vo.type == 12) {
                    var wifeCfg = Config.WifeCfg.getWifeCfgById(vo.id);
                    stringTab.push(wifeCfg.name + vo.tipMessage);
                }
                else if (vo.type == 14 || vo.type == 15) {
                    var servantCfg = Config.ServantCfg.getServantItemById(vo.id);
                    stringTab.push(servantCfg.name + vo.message);
                }
                else {
                    stringTab.push(vo.name + vo.tipMessage);
                }
            }
        }
        for (var i = 0; i < stringTab.length; i++) {
            var str = stringTab[i];
            var descTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            descTxt.setPosition(70 + i % 2 * 270, titleTxt.y + titleTxt.height + 18 + Math.floor(i / 2) * 30);
            this.addChildToContainer(descTxt);
        }
        var iconHeight = 130 + Math.ceil(stringTab.length / 2) * 30;
        for (var k = 0; k < rewardVo.length; k++) {
            var v = rewardVo[k];
            var awardIcon = GameData.getItemIcon(v);
            awardIcon.setPosition(GameConfig.stageWidth / 2 + 19 + (rewardVo.length / 2 - k - 1) * (awardIcon.width + 38), iconHeight);
            this.addChildToContainer(awardIcon);
        }
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y = 10 - this._fire_lizi.height / 2;
        this.addChildToContainer(this._fire_lizi);
        this.showWordAnim();
    };
    ConquestWinPopupView.prototype.showWordAnim = function () {
        var bgHeight = 0;
        var winLight = BaseBitmap.create("battle_win_light");
        winLight.scaleY = 0.5;
        winLight.setPosition(GameConfig.stageWidth / 2 - winLight.width / 2 * winLight.scaleX, bgHeight - winLight.height / 4 - 5);
        this.addChildToContainer(winLight);
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this.addChildToContainer(this._fire_lizi);
        var winText = BaseBitmap.create("battle_win_word");
        var scale1 = 2.5;
        var scale2 = 0.9;
        var tempsPos1 = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2 * scale1, bgHeight - winText.height / 2 * scale1 + 30);
        var tempsPos2 = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2 * scale2, bgHeight - winText.height / 2 * scale2);
        var realPos = egret.Point.create(GameConfig.stageWidth / 2 - winText.width / 2, bgHeight - winText.height / 2);
        winText.setScale(scale1);
        winText.setPosition(tempsPos1.x, tempsPos1.y);
        this.addChildToContainer(winText);
        egret.Tween.get(winText).to({ x: tempsPos2.x, y: tempsPos2.y, scaleX: scale2, scaleY: scale2 }, 120).to({ x: realPos.x, y: realPos.y, scaleX: 1, scaleY: 1 }, 50);
        winLight.alpha = 0;
        egret.Tween.get(winLight).wait(100).to({ alpha: 1 }, 100).wait(90).to({ alpha: 0 }, 10);
    };
    ConquestWinPopupView.prototype.showAnim = function () {
        this._fire_lizi.start();
        var tmpthis = this;
        egret.Tween.get(this._fire_lizi, { loop: false }).wait(500).to({ alpha: 0 }, 200).call(function () {
            if (this._fire_lizi) {
                tmpthis.removeChildFromContainer(this._fire_lizi);
                this._fire_lizi = null;
            }
        });
    };
    ConquestWinPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ConquestWinPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ConquestWinPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ConquestWinPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ConquestWinPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    ConquestWinPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    ConquestWinPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._fire_lizi = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestWinPopupView;
}(PopupView));
__reflect(ConquestWinPopupView.prototype, "ConquestWinPopupView");
//# sourceMappingURL=ConquestWinPopupView.js.map