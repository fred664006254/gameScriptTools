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
var DailybossPao = (function (_super) {
    __extends(DailybossPao, _super);
    function DailybossPao() {
        var _this = _super.call(this) || this;
        _this.posArr = [{ x: 75, y: 79 }, { x: 53, y: 0 }, { x: 0, y: 81 }];
        return _this;
    }
    DailybossPao.prototype.init = function (isnew) {
        if (isnew === void 0) { isnew = false; }
        var keystr = "dailybossbattle_pao";
        if (isnew) {
            keystr = "dailybossbattlenew_pao";
        }
        for (var i = 1; i < 4; i++) {
            var bmp = BaseBitmap.create(keystr + i);
            bmp.setPosition(this.posArr[i - 1].x, this.posArr[i - 1].y);
            if (i == 2) {
                this._paotong = bmp;
                this._angle = Math.atan2(this._paotong.height, this._paotong.width);
                var distance = 100;
                var x = Math.cos(this._angle) * distance;
                var y = Math.sin(this._angle) * distance;
                this._moveData = { distance: distance, x: x, y: y };
            }
            this.addChild(bmp);
        }
    };
    DailybossPao.prototype.getAngle = function () {
        return this._angle;
    };
    DailybossPao.prototype.kaiPao = function (callBack, callBackThisObj) {
        var ths = this;
        var paoguanPos = this.posArr[1];
        egret.Tween.get(this._paotong).to({ x: paoguanPos.x + this._moveData.x, y: paoguanPos.y + this._moveData.y, scaleX: 1.02, scaleY: 1.02 }, 50).call(function () {
            var kaipaoEffect = ComponentManager.getCustomMovieClip("dailyboss_kaopao_", 8);
            kaipaoEffect.setPosition(-74, -127);
            kaipaoEffect.setEndCallBack(function (kaipaoEffect) {
                if (kaipaoEffect) {
                    kaipaoEffect.dispose();
                }
            }.bind(ths, kaipaoEffect, ths), ths);
            kaipaoEffect.playWithTime(1);
            ths.addChildAt(kaipaoEffect, 0);
        }, this).to({ x: paoguanPos.x, y: paoguanPos.y, scaleX: 1, scaleY: 1 }, 100).call(function (paoguan) {
            if (paoguan) {
                egret.Tween.removeTweens(paoguan);
                // ths.kaiPao();
            }
        }, this, [this._paotong]);
    };
    DailybossPao.prototype.dispose = function () {
        this._paotong = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossPao;
}(BaseDisplayObjectContainer));
__reflect(DailybossPao.prototype, "DailybossPao");
//# sourceMappingURL=DailybossPao.js.map