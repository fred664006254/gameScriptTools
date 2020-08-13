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
        var bottombg = BaseBitmap.create("acsingleday_bottombg");
        bottombg.height = tHeight;
        bottombg.x = tWitdh / 2 - bottombg.width / 2;
        bottombg.y = 0;
        this.addChild(bottombg);
        for (var index = 1; index <= 3; index++) {
            var bottomBtn = BaseBitmap.create("acsingleday_bottomIcon" + index);
            bottomBtn.addTouchTap(this.bottomBtnHandler, this, [index]);
            if (this._selectIdx == index) {
                bottomBtn.setScale(1.0);
            }
            else {
                bottomBtn.setScale(0.85);
            }
            bottomBtn.x = GameConfig.stageWidth / 2 - bottomBtn.width / 2 * bottomBtn.scaleX + 170 * (index - 2);
            bottomBtn.y = bottombg.y + bottombg.height - bottomBtn.height * bottomBtn.scaleX - 10;
            this.addChild(bottomBtn);
            var nameImg = BaseBitmap.create("acsingleday_bottomname" + index);
            nameImg.setScale(bottomBtn.scaleX);
            nameImg.x = bottomBtn.x + bottomBtn.width / 2 * bottomBtn.scaleX - nameImg.width / 2 * bottomBtn.scaleX;
            nameImg.y = bottomBtn.y + bottomBtn.height * bottomBtn.scaleX - nameImg.height * bottomBtn.scaleX - 8;
            this.addChild(nameImg);
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
