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
var AcSingleDayBottomNode = (function (_super) {
    __extends(AcSingleDayBottomNode, _super);
    function AcSingleDayBottomNode(data) {
        var _this = _super.call(this) || this;
        _this._selectIdx = data.selectIdx || 1;
        _this._switchCallback = data.switchCallback;
        _this._callbackOgj = data.callbackOgj;
        _this.show();
        return _this;
    }
    AcSingleDayBottomNode.prototype.getParent = function () {
        return null;
    };
    AcSingleDayBottomNode.prototype.init = function () {
        this.initBottomBg();
    };
    AcSingleDayBottomNode.prototype.initBottomBg = function () {
        var tWitdh = GameConfig.stageWidth;
        var tHeight = GameConfig.stageHeigth;
        this.width = tWitdh;
        this.height = tHeight;
        var bottombg = BaseBitmap.create("wifeskin_barbg");
        // bottombg.height = 114;
        bottombg.x = tWitdh / 2 - bottombg.width / 2;
        bottombg.y = tHeight - bottombg.height;
        this.addChild(bottombg);
        for (var index = 1; index <= 3; index++) {
            var tarRes = "acsingleday_bottomIcon" + index;
            if (this._selectIdx == index) {
                tarRes = "acsingleday_bottomIcon" + index + "_2";
            }
            var bottomBtn = BaseBitmap.create(tarRes);
            bottomBtn.addTouchTap(this.bottomBtnHandler, this, [index]);
            bottomBtn.x = GameConfig.stageWidth / 2 - bottomBtn.width / 2 * bottomBtn.scaleX + 170 * (index - 2);
            bottomBtn.y = bottombg.y + bottombg.height / 2 - bottomBtn.height / 2;
            this.addChild(bottomBtn);
            // let nameImg = BaseBitmap.create("acsingleday_bottomname"+index);
            // nameImg.setScale(bottomBtn.scaleX);
            // nameImg.x = bottomBtn.x + bottomBtn.width/2 * bottomBtn.scaleX - nameImg.width/2 * bottomBtn.scaleX;
            // nameImg.y = bottomBtn.y + bottomBtn.height * bottomBtn.scaleX - nameImg.height * bottomBtn.scaleX - 8;
            // this.addChild(nameImg);
        }
    };
    AcSingleDayBottomNode.prototype.bottomBtnHandler = function (event, index) {
        if (this._selectIdx == index || !this._callbackOgj || !this._switchCallback) {
            return;
        }
        this._switchCallback.apply(this._callbackOgj, [index]);
    };
    AcSingleDayBottomNode.prototype.getResourceList = function () {
        return [];
    };
    AcSingleDayBottomNode.prototype.dispose = function () {
        this._selectIdx = null;
        this._switchCallback = null;
        this._callbackOgj = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBottomNode;
}(BaseLoadDisplayObjectContiner));
__reflect(AcSingleDayBottomNode.prototype, "AcSingleDayBottomNode");
//# sourceMappingURL=AcSingleDayBottomNode.js.map