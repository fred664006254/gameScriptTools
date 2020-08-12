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
 * 循环跑马灯
 * author dky
 * date 2017/11/23
 * @class LoopLamp
 */
var LoopLamp = (function (_super) {
    __extends(LoopLamp, _super);
    function LoopLamp(stringList, style) {
        if (style === void 0) { style = LayoutConst.horizontalCenter; }
        var _this = _super.call(this) || this;
        _this._stringList = stringList;
        _this.init(style);
        return _this;
    }
    LoopLamp.prototype.init = function (style) {
        this._speed = GameConfig.stageWidth / 6000;
        this._tfPool = new Array();
        this.loadString(style);
    };
    LoopLamp.prototype.loadString = function (style) {
        if (this._stringList.length <= 0) {
            return;
        }
        var tf;
        if (this._tfPool[0]) {
            tf = this._tfPool.shift();
        }
        else {
            tf = ComponentMgr.getTextField("", TextFieldConst.SIZE_CONTENT_COMMON);
        }
        tf.text = this._stringList[0];
        var str1 = this._stringList.shift();
        this._stringList.push(str1);
        this.addChild(tf);
        var self = this;
        //水平 从左到右
        if (style == LayoutConst.horizontalCenter) {
            tf.x = GameConfig.stageWidth;
            //第一段时间
            var time1 = (tf.width + 50) / this._speed;
            //第二段时间
            var time2 = (GameConfig.stageWidth - 50) / this._speed;
            egret.Tween.get(tf)
                .to({ x: GameConfig.stageWidth - tf.width - 50 }, time1)
                .call(function () {
                self.loadString(style);
            }, this)
                .to({ x: -(tf.width) }, time2)
                .call(function (tf) {
                egret.Tween.removeTweens(tf);
                self._tfPool.push(tf);
                if (tf.parent) {
                    tf.parent.removeChild(tf);
                }
            }, this, [tf]);
        }
        else if (style == LayoutConst.verticalCenter) {
            tf.width = GameConfig.stageWidth;
            tf.x = 0;
            // this._speed = tf.textHeight / 100;
            tf.y = tf.textHeight;
            tf.alpha = 0;
            egret.Tween.get(tf)
                .to({ y: 0, alpha: 1 }, 800).wait(2000)
                .call(function () {
                self.loadString(style);
            }, this)
                .to({ y: -tf.textHeight, alhpa: 0 }, 300)
                .call(function (tf) {
                egret.Tween.removeTweens(tf);
                self._tfPool.push(tf);
                if (tf.parent) {
                    tf.parent.removeChild(tf);
                }
            }, this, [tf]);
        }
    };
    LoopLamp.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LoopLamp;
}(BaseDisplayObjectContainer));
__reflect(LoopLamp.prototype, "LoopLamp");
//# sourceMappingURL=LoopLamp.js.map