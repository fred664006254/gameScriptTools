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
 * 滑动进度条
 * author 陈可
 * date 2017/9/26
 * @class DragProgressBar
 */
var DragProgressBar = (function (_super) {
    __extends(DragProgressBar, _super);
    function DragProgressBar() {
        var _this = _super.call(this) || this;
        _this._maxNum = 1;
        _this._curNum = 1;
        _this._minNum = 1;
        return _this;
    }
    DragProgressBar.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this._dragIcon = BaseBitmap.create("btn_hd");
        this._dragIcon.addTouch(this.dragTouchHandler, this);
        this._dragIcon.setPosition(this.progressBar.x - this._dragIcon.width / 2, this.progressBar.y + (this.progressBar.height - this._dragIcon.height) / 2);
        this.addChild(this._dragIcon);
        this._reduceBtn = ComponentManager.getButton("btn_jian", "", this.checkBtnHandler, this, [0]);
        this._reduceBtn.setPosition(-this._reduceBtn.width * this._reduceBtn.scaleX - 25, this._progressBarBg.y + (this._progressBarBg.height - this._reduceBtn.height * this._reduceBtn.scaleY) / 2);
        this.addChild(this._reduceBtn);
        this._addBtn = ComponentManager.getButton("btn_jia", "", this.checkBtnHandler, this, [1]);
        this._addBtn.setPosition(this._progressBarBg.width + 25, this._progressBarBg.y + (this._progressBarBg.height - this._addBtn.height * this._addBtn.scaleY) / 2);
        this.addChild(this._addBtn);
    };
    DragProgressBar.prototype.getReduceX = function () {
        return -this._reduceBtn.width - 12;
    };
    DragProgressBar.prototype.checkBtnHandler = function (value) {
        var num;
        if (value) {
            num = Math.min(this._maxNum, this._curNum + 1);
        }
        else {
            num = Math.max(this._minNum, this._curNum - 1);
        }
        this.setDragPercent(num, this._maxNum);
    };
    DragProgressBar.prototype.dragTouchHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (!this._startPoint) {
                    this._startPoint = egret.Point.create(event.stageX, event.stageY);
                }
                else {
                    this._startPoint.setTo(event.stageX, event.stageY);
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                var offX = event.stageX - this._startPoint.x;
                var readX = this.getDragCenterX() + offX;
                if (readX < this.progressBar.x + this._minNum * this.getEverSpace()) {
                    readX = this.progressBar.x + this._minNum * this.getEverSpace();
                }
                if (readX > this.progressBar.x + this.progressBar.width) {
                    readX = this.progressBar.x + this.progressBar.width;
                }
                this._startPoint.x += readX - this.getDragCenterX();
                var per = (readX - this.progressBar.x) / this.progressBar.width;
                this.setDragPercent(per * this._maxNum, this._maxNum, this._minNum);
                break;
            default:
                egret.Point.release(this._startPoint);
                this._startPoint = null;
                break;
        }
    };
    DragProgressBar.prototype.getEverSpace = function () {
        return this.progressBar.width / this._maxNum;
    };
    DragProgressBar.prototype.getDragCenterX = function () {
        return this._dragIcon.x + this._dragIcon.width / 2;
    };
    DragProgressBar.prototype.setDragPercent = function (curNumber, maxNum, minNum) {
        if (minNum === void 0) { minNum = 1; }
        this._minNum = minNum;
        this._maxNum = maxNum;
        var per = curNumber / maxNum;
        if (maxNum <= 0) {
            per = 0;
        }
        this.setPercentage(per, null, null);
        this._dragIcon.setPosition(this.progressBar.x + this.progressBar.width * (per) - this._dragIcon.width / 2, this._dragIcon.y);
        curNumber = Math.floor(curNumber);
        if (curNumber >= 0 && curNumber <= maxNum) {
            if (curNumber != this._curNum) {
                this._curNum = curNumber;
                if (this._callback) {
                    var params = [this._curNum];
                    if (this._callbackParams) {
                        params = params.concat(this._callbackParams);
                    }
                    this._callback.apply(this._callbackThisObj, params);
                }
            }
        }
    };
    DragProgressBar.prototype.setCallBack = function (callback, callbackThsObj, callbackParams) {
        this._callback = callback;
        this._callbackThisObj = callbackThsObj;
        this._callbackParams = callbackParams;
    };
    DragProgressBar.prototype.setBtnVisible = function (flag) {
        this._reduceBtn.visible = this._addBtn.visible = this._progressBarBg.visible = flag;
    };
    DragProgressBar.prototype.dispose = function () {
        this._dragIcon = null;
        this._callback = null;
        this._callbackThisObj = null;
        this._callbackParams = null;
        this._curNum = undefined;
        this._maxNum = undefined;
        _super.prototype.dispose.call(this);
    };
    return DragProgressBar;
}(ProgressBar));
__reflect(DragProgressBar.prototype, "DragProgressBar");
