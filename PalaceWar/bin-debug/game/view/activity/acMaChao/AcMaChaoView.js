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
  * 马超活动
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoView
  */
var AcMaChaoView = (function (_super) {
    __extends(AcMaChaoView, _super);
    function AcMaChaoView() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._lingBg = null;
        return _this;
    }
    AcMaChaoView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
        var bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 75;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY();
        this.addChildToContainer(bottomBg);
        this._bg = BaseLoadBitmap.create("acmachaoview_bg-" + this.getUiCode());
        this._bg.width = 680;
        this._bg.height = 1136;
        this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, GameConfig.stageHeigth - this._bg.height - 120);
        this.addChildToContainer(this._bg);
        this._lingBg = BaseLoadBitmap.create("dragonboattarbg");
        this._lingBg.y = -70;
        this.addChildToContainer(this._lingBg);
        this.refreshView();
    };
    AcMaChaoView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isFree()) {
            this.addRedPoint(0);
        }
        else {
            this.removeRedPoint(0);
        }
        if (vo.isHaveTaskRedDot()) {
            this.addRedPoint(1);
        }
        else {
            this.removeRedPoint(1);
        }
        if (vo.isHaveRechargeRedDot()) {
            this.addRedPoint(2);
        }
        else {
            this.removeRedPoint(2);
        }
    };
    /**_bg 动画 */
    AcMaChaoView.prototype.playBgAni = function (event) {
        var _this = this;
        var type = event.data.type;
        egret.Tween.removeTweens(this._bg);
        this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, GameConfig.stageHeigth - this._bg.height - 120);
        var posX = this._bg.x;
        var posY = this._bg.y;
        var value = 0;
        var offest = 0;
        if (type == 1) {
            value = 3;
        }
        else if (type == 2) {
            value = 6;
        }
        else if (type == 3) {
            value = 3;
        }
        else if (type == 4) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, { offest: offest, type: type });
            return;
        }
        egret.Tween.get(this._bg, { loop: true }).call(function () {
            var random = value * Math.random();
            var op = Math.random() > 0.5 ? -1 : 1;
            offest = random * op;
            _this._bg.setPosition(posX + offest, posY + offest);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, { offest: offest, type: type });
        }, this).wait(5);
    };
    /**
     * tabbar 的监听事件
     */
    AcMaChaoView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        if (data.index == 0) {
            this._bg.setVisible(true);
        }
        else {
            this._bg.setVisible(false);
        }
    };
    /**
     * 设置tabbar 的文本
     */
    AcMaChaoView.prototype.getTabbarTextArr = function () {
        return [
            "acMaChaoViewTab1-" + this.code,
            "acMaChaoViewTab2-" + this.code,
            "acMaChaoViewTab3-" + this.code,
        ];
    };
    // protected getSoundBgName():string
    // {
    // 	return SoundConst.MUSIC_CHALLENGE;
    // }
    AcMaChaoView.prototype.getTitleStr = function () {
        return "acMaChaoViewTitle-" + this.code;
    };
    AcMaChaoView.prototype.getRuleInfo = function () {
        return "acMaChaoViewRule-" + this.code;
    };
    AcMaChaoView.prototype.getProbablyInfo = function () {
        return "acMaChaoViewProbablyInfo-" + this.code;
    };
    AcMaChaoView.prototype.getUiCode = function () {
        if (this.code == "1" || this.code == "2" || this.code == "3" || this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7" || this.code == "8"
            || this.code == "9" || this.code == "10") {
            return "1";
        }
        return this.code;
    };
    AcMaChaoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["servant_bottombg", "activity_charge_red", "accarnivalview_tab_red", "progress5", "progress3_bg",
            "acmachaoview-" + this.getUiCode(), "dragonboatrank_down", "dragonboatrank", "acmachaoviewidle", "acmachaohurteffect", "acmachaoassaulteffect",
            "critmyflash1", "critmyflash2", "critmyflash3", "critmyspeed1", "critmyspeed2", "critmyspeed3", "critmyspeed4", "critmyspeed5", "acmazeview_textbg", "acmachaoview_common_text"
        ]);
    };
    AcMaChaoView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
        egret.Tween.removeTweens(this._bg);
        this._bg = null;
        this._lingBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoView;
}(AcCommonView));
__reflect(AcMaChaoView.prototype, "AcMaChaoView");
//# sourceMappingURL=AcMaChaoView.js.map