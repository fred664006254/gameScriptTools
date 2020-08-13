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
 * light item
 * author ycg
 * date 2020.6.3
 * @class AcMouseComeLight
 */
var AcMouseComeLight = (function (_super) {
    __extends(AcMouseComeLight, _super);
    function AcMouseComeLight(param) {
        var _this = _super.call(this) || this;
        _this.iconSpace = 10;
        _this.iconWidth = 62;
        _this.startX = 21;
        _this.roundWidth = (62 + 10) * 2;
        _this.baseWidth = 62 + 10;
        if (param && param.aid) {
            _this._aid = param.aid;
            _this._code = param.code;
        }
        _this.createLight();
        return _this;
    }
    AcMouseComeLight.prototype.getTypeCode = function () {
        if (this._code == "2") {
            return "1";
        }
        return this._code;
    };
    AcMouseComeLight.prototype.createLight = function () {
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_light", this.getTypeCode()));
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;
        var container = new BaseDisplayObjectContainer();
        container.width = this.width;
        container.height = this.height;
        this.addChild(container);
        var mask = new egret.Rectangle(21, 49, 62, 58);
        container.mask = mask;
        var lightNode = new BaseDisplayObjectContainer();
        lightNode.width = this.width;
        lightNode.height = this.height;
        container.addChild(lightNode);
        // lightNode.setPosition(21, 49);
        this._lightNode = lightNode;
        var icon0 = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighticon1", this.getTypeCode()));
        icon0.x = this.startX;
        icon0.y = 49;
        lightNode.addChild(icon0);
        var icon1 = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighticon2", this.getTypeCode()));
        icon1.x = this.startX + this.iconSpace + this.iconWidth;
        icon1.y = 49;
        lightNode.addChild(icon1);
        this._icon0 = icon0;
        this._icon1 = icon1;
        this._light = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighteff", this.getTypeCode()));
        this._light.visible = false;
        this._light.x = bg.x + bg.width / 2 - this._light.width / 2;
        this._light.y = bg.y + bg.height / 2 - this._light.height / 2 + 15;
        this._light.blendMode = egret.BlendMode.ADD;
        this.addChild(this._light);
    };
    AcMouseComeLight.prototype.showLight = function () {
        this._light.alpha = 0;
        this._light.visible = true;
        egret.Tween.get(this._light, { loop: false })
            .to({ alpha: 1 }, 150)
            .to({ alpha: 0 }, 150)
            .to({ alpha: 1 }, 150);
    };
    AcMouseComeLight.prototype.playAnim = function (result, playNum, time) {
        var _this = this;
        var roundNum = playNum + Math.floor((Math.random() * 2));
        var animTime = time + Math.floor((Math.random() * 700));
        egret.Tween.get(this._lightNode, { onChange: function () {
                if (_this._lightNode.x + _this._icon0.x + _this.baseWidth < 0) {
                    _this._icon0.x += _this.roundWidth;
                }
                if (_this._lightNode.x + _this._icon1.x + _this.baseWidth < 0) {
                    _this._icon1.x += _this.roundWidth;
                }
            }, onChangeObj: this })
            .to({ x: -(this.roundWidth * roundNum) - result * this.baseWidth }, animTime, egret.Ease.cubicOut);
    };
    AcMouseComeLight.prototype.resetLight = function () {
        egret.Tween.removeTweens(this._lightNode);
        this._icon0.x = this.startX;
        this._icon1.x = this.startX + this.iconSpace + this.iconWidth;
        this._lightNode.x = 0;
        egret.Tween.removeTweens(this._light);
        this._light.alpha = 0;
        this._light.visible = false;
    };
    AcMouseComeLight.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._icon0 = null;
        this._icon1 = null;
        egret.Tween.removeTweens(this._lightNode);
        this._lightNode = null;
        egret.Tween.removeTweens(this._light);
        this._light = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeLight;
}(BaseDisplayObjectContainer));
__reflect(AcMouseComeLight.prototype, "AcMouseComeLight");
//# sourceMappingURL=AcMouseComeLight.js.map