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
        _this._isMiaosha = false;
        _this._aniDelay = 0;
        return _this;
    }
    BattleDotBar.prototype.init = function (m) {
        this._totalNum = m;
        var bg = BaseBitmap.create("public_9v_bg10");
        bg.width = 640;
        bg.height = 80;
        bg.y = -10;
        this.addChild(bg);
        var barWidth = 460;
        var perX = 120;
        var sectionName = ComponentManager.getTextField(LanguageManager.getlocal("challengeSectionName" + Api.challengeVoApi.getCurMiddleChannelId()), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        sectionName.setPosition(30, bg.height / 2 - sectionName.height / 2);
        sectionName.textColor = TextFieldConst.COLOR_WHITE;
        this.addChild(sectionName);
        for (var i = 0; i < this._totalNum; i++) {
            var dot1 = BaseBitmap.create("battle_dot_none");
            dot1.setPosition(perX + (barWidth / 8) * (0.5 + i) - dot1.width / 2, bg.height / 2 - dot1.height / 2);
            this.addChild(dot1);
            var dot2 = BaseBitmap.create("battle_dot_full");
            dot2.setPosition(perX + (barWidth / 8) * (0.5 + i) - dot2.width / 2, bg.height / 2 - dot2.height / 2);
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
        set: function (n) {
            var _this = this;
            this._curNum = n;
            if (this._isMiaosha) {
                this._aniDelay = 500;
                var _loop_1 = function (i) {
                    if (n > i) {
                        if (this_1._allDots[i].visible == false) {
                            this_1._aniDelay += 200;
                            var delay = this_1._aniDelay + 1;
                            setTimeout(function () {
                                _this._allDots[i].visible = true;
                                var dotClip = ComponentManager.getCustomMovieClip('miaosha_dotani_', 7);
                                dotClip.setPosition(_this._allDots[i].x + 43 / 2 - 93 / 2, 20 + 42 / 2 - 93 / 2);
                                _this.addChild(dotClip);
                                dotClip.playWithTime(1);
                                dotClip.setEndCallBack(function () {
                                    dotClip.dispose();
                                    dotClip = null;
                                    if (i == n - 1) {
                                        _this.isMiaosha = false;
                                    }
                                }, _this);
                            }, delay);
                        }
                    }
                    else {
                        if (this_1._allDots[i].visible == true) {
                            this_1._allDots[i].visible = false;
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < this._totalNum; i++) {
                    _loop_1(i);
                }
            }
            else {
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
            }
        },
        enumerable: true,
        configurable: true
    });
    BattleDotBar.prototype.miaoshaSetNum = function (n, addCid) {
        var isFull = n === 0 && addCid > 0;
        if (isFull) {
            this.curNum = this._totalNum;
        }
        else {
            this.curNum = n;
        }
    };
    Object.defineProperty(BattleDotBar.prototype, "isMiaosha", {
        set: function (isMiaosha) {
            this._isMiaosha = isMiaosha;
        },
        enumerable: true,
        configurable: true
    });
    BattleDotBar.prototype.dispose = function () {
        this._totalNum = null;
        this._curNum = null;
        this._allDots.length = 0;
        this._isMiaosha = false;
        this._aniDelay = 0;
        _super.prototype.dispose.call(this);
    };
    return BattleDotBar;
}(BaseDisplayObjectContainer));
__reflect(BattleDotBar.prototype, "BattleDotBar");
