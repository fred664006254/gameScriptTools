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
var VipIcon2 = /** @class */ (function (_super) {
    __extends(VipIcon2, _super);
    function VipIcon2() {
        var _this = _super.call(this) || this;
        _this._effect = null;
        _this._vipIcon = null;
        _this._vipLevel = 0;
        _this.vipscale = {
            9: [0.95, 0.85],
            10: [0.95, 0.8],
            11: [0.95, 0.9],
            12: [1, 1],
            13: [1.05, 1.05],
            14: [1.1, 1.05],
            15: [1.15, 1.1],
            16: [1.15, 1.1],
            17: [1.15, 1.1]
        };
        return _this;
    }
    VipIcon2.prototype.init = function (vipLevel) {
        if (!vipLevel) {
            vipLevel = 0;
        }
        this._vipLevel = vipLevel;
        var vipIcon = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(vipLevel).icon2);
        vipIcon.width = 152;
        vipIcon.height = 56;
        vipIcon.name = "vipIcon";
        this.addChild(vipIcon);
        this._vipIcon = vipIcon;
        this.checkAndInitEffect();
        this.width = vipIcon.width;
        this.height = vipIcon.height;
    };
    VipIcon2.prototype.checkAndInitEffect = function () {
        if (this._vipLevel >= 9) {
            if (!this._effect) {
                var effect = ComponentManager.getCustomMovieClip("vipeffect", 12, 100);
                effect.anchorOffsetX = 156 / 2;
                effect.anchorOffsetY = 92 / 2;
                effect.scaleX = this.vipscale[this._vipLevel][0];
                effect.scaleY = this.vipscale[this._vipLevel][1];
                this.addChild(effect);
                effect.setPosition(152 / 2, 56 / 2);
                this._effect = effect;
            }
            this.startPlayEffect();
        }
        else {
            this.hideEffect();
        }
    };
    VipIcon2.prototype.startPlayEffect = function () {
        if (this._effect) {
            if (this._effect.isPlaying == false) {
                this._effect.playWithTime(0);
                this._effect.goToAndPlay(1 + Math.floor(Math.random() * 12));
            }
            this._effect.visible = true;
        }
    };
    VipIcon2.prototype.hideEffect = function () {
        if (this._effect) {
            if (this._effect.isPlaying) {
                this._effect.stop();
            }
            this._effect.visible = false;
        }
    };
    VipIcon2.prototype.setVipLevel = function (vipLevel) {
        this._vipLevel = vipLevel;
        this._vipIcon.setload(Api.vipVoApi.getVipCfgByLevel(vipLevel).icon2);
        this.checkAndInitEffect();
    };
    VipIcon2.prototype.dispose = function () {
        this._effect = null;
        this._vipIcon = null;
        this._vipLevel = 0;
        _super.prototype.dispose.call(this);
    };
    return VipIcon2;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=VipIcon2.js.map