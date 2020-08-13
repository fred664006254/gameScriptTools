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
 * author shaoliang
 * date 2017/9/12
 * @class ProgressBar
 */
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        return _super.call(this) || this;
    }
    /**
     * 获取ProgressBar组件
     * @param barName     	进度条图片名称
     * @param barBgName     进度条背景图片名称
     * @param barWidth      进度条宽度
     * @param barHeight     进度条高度
     */
    ProgressBar.prototype.init = function (progressBar, progressBarBg, barWidth, barHeight) {
        this._barWidth = barWidth;
        this._barHeight = barHeight;
        this._progressBarBgResName = progressBarBg;
        this.progressBarResName = progressBar;
        this.initUI();
    };
    ProgressBar.prototype.initUI = function () {
        this._progressBarBg = BaseBitmap.create(this._progressBarBgResName);
        this.addChild(this._progressBarBg);
        this.progressBar = BaseBitmap.create(this.progressBarResName);
        this.checkScale9Rect();
        this.progressBar.x = this._progressBarBg.x + (this._progressBarBg.width - this.progressBar.width) * 0.5;
        this.progressBar.y = this._progressBarBg.y + (this._progressBarBg.height - this.progressBar.height) * 0.5;
        this.addChild(this.progressBar);
        this._textLb = ComponentManager.getTextField("0/0", TextFieldConst.FONTSIZE_CONTENT_SMALL - 2); //new BaseTextField();
        this._textLb.width = this._barWidth - 20;
        this._textLb.textAlign = egret.HorizontalAlign.CENTER;
        this._textLb.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.setTextPos();
        this.addChild(this._textLb);
        this._textLb.text = "";
        if (RES.hasRes(this.progressBarResName + "_light")) {
            this.progressBarLight = BaseBitmap.create(this.progressBarResName + "_light");
            this.progressBarLight.setPosition(this.progressBar.x - this.progressBarLight.width / 2, this.progressBar.y + (this.progressBar.height - this.progressBarLight.height) / 2);
            this.addChild(this.progressBarLight);
        }
    };
    //设置增加效果
    ProgressBar.prototype.setPlusEffect = function (plusBarResName, effectResName) {
        this._plusBarResName = plusBarResName;
        this._plusEffectResName = effectResName;
        //增加bar
        if (this._plusBarResName != null) {
            this._plusBar = BaseBitmap.create(this._plusBarResName);
            this._plusBar.y = this._progressBarBg.y + (this._progressBarBg.height - this._plusBar.height) * 0.5;
            this._plusBar.visible = false;
            var textIndex = this.getChildIndex(this._textLb);
            this.addChildAt(this._plusBar, textIndex - 1);
        }
        //增加光特效
        if (this._plusEffectResName != null) {
            this._plusEffect = BaseBitmap.create(this._plusEffectResName);
            this._plusEffect.y = this._progressBarBg.y + (this._progressBarBg.height - this._plusEffect.height) * 0.5;
            this._plusEffect.visible = false;
            var textIndex = this.getChildIndex(this._textLb);
            this.addChildAt(this._plusEffect, textIndex - 1);
        }
    };
    ProgressBar.prototype.setPlusValue = function (percentFrom, percentTo) {
        if (percentFrom < percentTo) {
            this._plusBar.width = this.progressBar.width * (percentTo - percentFrom);
            // this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
        }
    };
    ProgressBar.prototype.getType = function () {
        try {
            if (this._progressBarBgResName) {
                return String(this._progressBarBgResName.split("_")[1].substr(4));
            }
        }
        catch (e) {
            return "";
        }
    };
    ProgressBar.prototype.checkScale9Rect = function () {
        if (this.getType() == "1") {
            this.progressBar.width = this._barWidth - 18 * 2;
            this._progressBarBg.width = this._barWidth;
        }
        else if (this.getType() == "3") {
            this.progressBar.width = this._barWidth - 18;
            this._progressBarBg.width = this._barWidth;
        }
        else {
            var offX = this._progressBarBg.width - this.progressBar.width;
            var offY = this._progressBarBg.height - this.progressBar.height;
            if (offX < 0) {
                offX = 4;
            }
            if (offY < 0) {
                offY = 4;
            }
            if (this._barWidth < this._progressBarBg.width) {
                this._barWidth = this._progressBarBg.width;
            }
            if (this._barHeight < this._progressBarBg.height) {
                this._barHeight = this._progressBarBg.height;
            }
            if (!this._barWidth) {
                this._barWidth = this._progressBarBg.width;
            }
            if (!this._barHeight) {
                this._barHeight = this._progressBarBg.height;
            }
            this._progressBarBg.width = this._barWidth;
            this._progressBarBg.height = this._progressBarBg.height;
            this.progressBar.width = this._barWidth - offX;
            this.progressBar.height = this._barHeight - offY;
        }
    };
    ProgressBar.prototype.setTextPos = function () {
        if (this._textLb) {
            if (this.getType() == "1") {
                this._textLb.setPosition((this._progressBarBg.width - this._textLb.width) * 0.5, 3);
            }
            else {
                this._textLb.setPosition((this._progressBarBg.width - this._textLb.width) * 0.5, (this._progressBarBg.height - this._textLb.height) * 0.5);
            }
        }
    };
    /**
     * 设置进度
     * @param percent 	进度 0～1
     * @param textStr 	文字
     * @param textColor 文字颜色
     * @param plusPercent 进度显示增加 0～1
     */
    ProgressBar.prototype.setPercentage = function (percent, textStr, textColor, plusPercent) {
        var _this = this;
        this.percents = percent;
        this.plusPercent = plusPercent;
        //当前进度大于等于1  重置进度增加值和进度
        if (plusPercent != null && percent >= 1) {
            var oldV = percent - plusPercent;
            plusPercent = oldV >= 1 ? 0 : 1 - oldV;
            percent = 1;
        }
        //如果有增加bar的时候 
        if (plusPercent != null && this._plusBar != null && plusPercent > 0) {
            if (this._mask == null) {
                this._mask = new egret.Rectangle(0, 0, this.progressBar.width * (percent - plusPercent), this.progressBar.height);
            }
            else {
                this._mask.setTo(0, 0, this.progressBar.width * (percent - plusPercent), this.progressBar.height);
            }
            this.progressBar.mask = this._mask;
            this._plusBar.x = this.progressBar.x + this._mask.x + this._mask.width - 1;
            this._plusBar.width = 0;
            this._plusBar.visible = true;
            if (this._plusEffect != null) {
                this._plusEffect.visible = true;
                this._plusEffect.x = this._plusBar.x + this._plusBar.width - this._plusEffect.width + 6;
            }
            //增长 并显示光
            egret.Tween.get(this._plusBar, { loop: false, onChange: function () {
                    if (_this._plusEffect != null) {
                        _this._plusEffect.x = _this._plusBar.x + _this._plusBar.width - _this._plusEffect.width + 6;
                    }
                } })
                .wait(100)
                .to({ width: this.progressBar.width * plusPercent + 1 }, 200)
                .wait(200)
                .call(function () {
                if (_this._mask == null) {
                    _this._mask = new egret.Rectangle(0, 0, _this.progressBar.width * _this.percents, _this.progressBar.height);
                }
                else {
                    _this._mask.setTo(0, 0, _this.progressBar.width * _this.percents, _this.progressBar.height);
                }
                _this.progressBar.mask = _this._mask;
            })
                .to({ alpha: 0 }, 100)
                .call(function () {
                _this._plusBar.visible = false;
                if (_this._plusEffect != null) {
                    _this._plusEffect.visible = false;
                }
            });
        }
        else {
            if (this._mask == null) {
                this._mask = new egret.Rectangle(0, 0, this.progressBar.width * percent, this.progressBar.height);
            }
            else {
                this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
            }
            this.progressBar.mask = this._mask;
        }
        if (this.progressBarLight) {
            if (this._mask.width <= this.progressBarLight.width) {
                //进度为0的时候，光效的位置，需要保证在起点右侧 20190429
                this.progressBarLight.x = 0;
            }
            else {
                this.progressBarLight.x = this.progressBar.x + this._mask.width - this.progressBarLight.width / 2;
            }
        }
        if (this._textLb) {
            if (textStr != null) {
                this.setText(textStr);
            }
            if (textColor) {
                this.setTextColor(textColor);
            }
        }
        if (this._dragIcon) {
            this._dragIcon.setPosition(this.progressBar.x + this.progressBar.width * percent - this._dragIcon.width / 2, this._dragIcon.y);
        }
    };
    ProgressBar.prototype.resetIconPosition = function (xPosition) {
        this._dragIcon.x = xPosition;
    };
    ProgressBar.prototype.setIconVisible = function (flag) {
        this._dragIcon.visible = flag;
    };
    ProgressBar.prototype.setDragIcon = function (resstr) {
        this._dragIcon = BaseBitmap.create(resstr);
        this._dragIcon.setPosition(this.progressBar.x - this._dragIcon.width / 2, this.progressBar.y + (this.progressBar.height - this._dragIcon.height) / 2 - 10);
        this.addChild(this._dragIcon);
        this.height = this.progressBar.height;
    };
    ProgressBar.prototype.getBgWidth = function () {
        return this._progressBarBg ? this._progressBarBg.width : 0;
    };
    ProgressBar.prototype.getBgHeight = function () {
        return this._progressBarBg ? this._progressBarBg.height : 0;
    };
    Object.defineProperty(ProgressBar.prototype, "percent", {
        get: function () {
            return this.percents;
        },
        set: function (percent) {
            this.setPercentage(percent);
        },
        enumerable: true,
        configurable: true
    });
    ProgressBar.prototype.getPercent = function () {
        return this.percents;
    };
    /**
     * 设置文字大小
     * @param s 文字大小
     */
    ProgressBar.prototype.setTextSize = function (s) {
        if (s != null && this._textLb) {
            this._textLb.size = s;
            if (this._textLb.text == "") {
                this._textLb.text = "0/0";
                this.setTextPos();
                this._textLb.text = "";
            }
            else {
                this.setTextPos();
            }
        }
    };
    /**
     * 设置文字
     * @param textStr 	文字
     */
    ProgressBar.prototype.setText = function (textStr) {
        if (textStr != null && this._textLb) {
            try {
                this._textLb.text = textStr;
                this._textLb.x = (this._progressBarBg.width - this._textLb.width) * 0.5;
            }
            catch (e) {
                App.LogUtil.log(e);
            }
        }
    };
    /**
     * 设置文字颜色
     * @param textColor 文字颜色
     */
    ProgressBar.prototype.setTextColor = function (textColor) {
        if (textColor && this._textLb) {
            this._textLb.textColor = textColor;
        }
    };
    /**
     * 进度条添加动画
     */
    ProgressBar.prototype.TweenTxt = function (time) {
        var self = this;
        egret.Tween.get(self._textLb).to({ scaleX: 1.3, scaleY: 1.3 }, time).to({ scaleX: 0.8, scaleY: 0.8 }, time).to({ scaleX: 1, scaleY: 1 }, time);
    };
    /**
     * 进度条添加动画
     * @param endPercent 结束进度
     * @param time 一整次从0到1播放的时间毫秒
     * @param stepNum 播放几个整次，适用于升级时候传差值，不传只播放一次动画
     * @param callback完成回调
     * @param callbackThisObj 回调拥有对象
     * @param type -> 1 可以进行缩小进度条动画
     */
    ProgressBar.prototype.tweenTo = function (endPercent, time, stepNum, callback, callbackThisObj, type) {
        if (stepNum) {
            var ths_1 = this;
            egret.Tween.get(this).to({ percent: 1 }, (1 - this.percent) * time).call(function (stepNum) {
                egret.Tween.removeTweens(ths_1);
                ths_1.tweenNext(time, endPercent, stepNum, callback, callbackThisObj);
            }, this, [stepNum - 1]);
        }
        else {
            var nextTime = endPercent - this.percent;
            if (nextTime < 0) {
                if (type == 1) {
                    nextTime = Math.abs(nextTime);
                }
                else {
                    nextTime = 0;
                }
            }
            egret.Tween.get(this).to({ percent: endPercent }, nextTime * time).call(function () {
                if (callback) {
                    callback.apply(callbackThisObj);
                }
            }, this);
        }
    };
    ProgressBar.prototype.tweenNext = function (time, endPercent, stepNum, callback, callbackThisObj) {
        var ths = this;
        egret.Tween.removeTweens(this);
        this._tweenTo = null;
        if (!this._tweenTo) {
            this._tweenTo = egret.Tween.get(this);
        }
        this.percent = 0;
        if (stepNum > 0) {
            this._tweenTo.to({ percent: 1 }, time).call(this.tweenNext, this, [time, endPercent, stepNum - 1, callback, callbackThisObj]);
        }
        else {
            this._tweenTo.to({ percent: endPercent }, time * endPercent).call(function () {
                egret.Tween.removeTweens(ths);
                ths._tweenTo = null;
                if (callback) {
                    callback.apply(callbackThisObj);
                }
            }, this);
        }
    };
    ProgressBar.prototype.dispose = function () {
        BaseBitmap.release(this._progressBarBg);
        this._progressBarBg = null;
        BaseBitmap.release(this.progressBar);
        this.progressBar = null;
        this.progressBarResName = null;
        this._progressBarBgResName = null;
        this._barWidth = null;
        this._barHeight = null;
        this._textLb.dispose();
        this._textLb = null;
        this.percents = null;
        this._mask = null;
        this._tweenTo = null;
        this.progressBarLight = null;
        if (this._plusBar != null) {
            egret.Tween.removeTweens(this._plusBar);
        }
        /** 进度条增加资源名*/
        this._plusBarResName = null;
        /** 进度条增加图片资源*/
        this._plusBar = null;
        /** 进度条增加特效 */
        this._plusEffectResName = null;
        /** 进度条增加特效 */
        this._plusEffect = null;
        _super.prototype.dispose.call(this);
    };
    return ProgressBar;
}(BaseDisplayObjectContainer));
__reflect(ProgressBar.prototype, "ProgressBar");
