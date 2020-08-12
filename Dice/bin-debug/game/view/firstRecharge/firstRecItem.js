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
 * 首冲--奖励物品icon
 */
var firstRectItem = (function (_super) {
    __extends(firstRectItem, _super);
    function firstRectItem(rewData) {
        var _this = _super.call(this) || this;
        _this.rewData = rewData;
        _this.initView();
        return _this;
    }
    firstRectItem.prototype.initView = function () {
        var _bg = BaseLoadBitmap.create("firstrec_rewardBg");
        this.addChild(_bg);
        _bg.width = 133;
        _bg.height = 135;
        var _icon = GameData.getItemIcon(this.rewData, this.rewData.num, false);
        this.addChild(_icon);
        _icon.x = (_bg.width - _icon.width) / 2;
        var numTxt = _icon.getChildByName("numTxt");
        numTxt.size = 22;
        numTxt.y -= 10;
        numTxt.stroke = 2;
        numTxt.strokeColor = 0xb7410f;
        this.initLightEffect();
        _bg.addTouchTap(this.showDetails, this);
    };
    /**
     * 光圈动画
     */
    firstRectItem.prototype.initLightEffect = function () {
        var _pre = this.rewData.type == 100 ? "firstrec_effect1_" : "firstrec_effect2_";
        this._effect = ComponentMgr.getCustomMovieClip(_pre, 8, 120);
        if (this.rewData.type != 100) {
            this._effect.scaleX = this._effect.scaleY = 1.4;
        }
        this._effect.blendMode = egret.BlendMode.ADD;
        this.addChild(this._effect);
        this._effect.playWithTime(0);
        this._effect.x -= 67;
        this._effect.y -= 67;
    };
    firstRectItem.prototype.showDetails = function () {
        if (this.rewData.type == 100) {
            var diceInfo = Config.DiceCfg.getCfgById(this.rewData.id);
            ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
                title: diceInfo.name,
                handler: null,
                needCancel: false,
                needClose: 1,
                id: "100_" + diceInfo.id + "_" + this.rewData.num,
                costnum: LangMger.getlocal("sysconfirm"),
                // costIcon : `ab_mainui_gem`
                touchMaskClose: true,
            });
        }
        else if (this.rewData.type == 1 || this.rewData.type == 2) {
            ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                title: this.rewData.name,
                handler: null,
                needCancel: false,
                needClose: 1,
                param: this.rewData,
                costnum: LangMger.getlocal("sysconfirm"),
            });
        }
    };
    firstRectItem.prototype.dispose = function () {
        this.removeTouchTap();
        this.rewData = null;
        this.itemId = null;
        this._effect = null;
        _super.prototype.dispose.call(this);
    };
    return firstRectItem;
}(BaseDisplayObjectContainer));
__reflect(firstRectItem.prototype, "firstRectItem");
//# sourceMappingURL=firstRecItem.js.map