/**
 * author shaoliang
 * date 2017/9/28
 * @class BattleDotBar
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
var BattleDotBar = (function (_super) {
    __extends(BattleDotBar, _super);
    function BattleDotBar() {
        var _this = _super.call(this) || this;
        _this._allDots = [];
        return _this;
    }
    BattleDotBar.prototype.init = function (m) {
        this._totalNum = 8;
        var bg = BaseBitmap.create("public_bg6");
        this.addChild(bg);
        var barWidth = 460;
        var perX = 120;
        var sectionName = ComponentManager.getTextField(LanguageManager.getlocal("challengeSectionName" + Api.challengeVoApi.getCurMiddleChannelId()), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        sectionName.setPosition(30, bg.height / 2 - sectionName.height / 2);
        sectionName.textColor = TextFieldConst.COLOR_BLACK;
        this.addChild(sectionName);
        for (var i = 0; i < this._totalNum; i++) {
            var dot1 = BaseBitmap.create("battle_dot_none");
            dot1.setPosition(perX + (barWidth / this._totalNum) * (0.5 + i) - dot1.width / 2, bg.height / 2 - dot1.height / 2);
            this.addChild(dot1);
            var dot2 = BaseBitmap.create("battle_dot_full");
            dot2.setPosition(perX + (barWidth / this._totalNum) * (0.5 + i) - dot2.width / 2, bg.height / 2 - dot2.height / 2);
            this.addChild(dot2);
            // 关卡版本2
            // if (i == this._totalNum - 1) {
            // 	let dot3:BaseBitmap = BaseBitmap.create("battle_dot_boss");
            // 	dot3.setPosition( perX +  (barWidth / this._totalNum) * (0.5+ i) - dot3.width /2, bg.height/2 - dot3.height /2 );
            // 	this.addChild(dot3);
            // }
            this._allDots.push(dot2);
        }
    };
    Object.defineProperty(BattleDotBar.prototype, "curNum", {
        get: function () {
            return this._curNum;
        },
        set: function (n) {
            this._curNum = n;
            for (var i = 0; i < this._totalNum; i++) {
                if (n > i) {
                    if (this._allDots[i].visible == false) {
                        this._allDots[i].visible = true;
                    }
                }
                else {
                    if (this._allDots[i].visible == true) {
                        this._allDots[i].visible = false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    BattleDotBar.prototype.setNumEff = function (n) {
        var _this = this;
        this._curNum = n;
        var eff = ComponentManager.getCustomMovieClip("fastbattleprogress_", 10, 50);
        eff.anchorOffsetX = 80;
        eff.anchorOffsetY = 80;
        eff.x = this._allDots[n - 1].x + this._allDots[n - 1].width / 2;
        eff.y = this._allDots[n - 1].y + this._allDots[n - 1].height / 2;
        this.addChild(eff);
        eff.playWithTime(1);
        eff.setScale(3);
        eff.alpha = 0;
        egret.Tween.get(eff).to({ scaleX: 2, scaleY: 2, alpha: 1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.removeTweens(eff);
        }, this);
        eff.setEndCallBack(function () {
            eff.dispose();
            eff = null;
            for (var i = 0; i < _this._totalNum; i++) {
                if (n > i) {
                    if (_this._allDots[i].visible == false) {
                        _this._allDots[i].visible = true;
                    }
                }
                else {
                    if (_this._allDots[i].visible == true) {
                        _this._allDots[i].visible = false;
                    }
                }
            }
        }, this);
    };
    BattleDotBar.prototype.dispose = function () {
        this._totalNum = null;
        this._curNum = null;
        this._allDots.length = 0;
        _super.prototype.dispose.call(this);
    };
    return BattleDotBar;
}(BaseDisplayObjectContainer));
__reflect(BattleDotBar.prototype, "BattleDotBar");
//# sourceMappingURL=BattleDotBar.js.map