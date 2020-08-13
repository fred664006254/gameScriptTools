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
var ActrackMoreItem = (function (_super) {
    __extends(ActrackMoreItem, _super);
    function ActrackMoreItem() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ActrackMoreItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        _super.prototype.initItem.call(this, index, data);
        var challengeBtn = this.challengeBtn;
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(challengeBtn, challengeBtn.width / 2, challengeBtn.height / 2, [challengeBtn], 603, true, function () {
                if (challengeBtn.visible && !Api.atkraceVoApi.inithand) {
                    this.parent.setChildIndex(this, 100);
                    Api.atkraceVoApi.setInitHand(true);
                    return true;
                }
                else {
                    return false;
                }
            }, _this);
        }, this);
    };
    //挑战
    ActrackMoreItem.prototype.challengBtnHandler = function (evt) {
        var data = [];
        data.type = 1; //挑战
        data.uid = this.data.uid;
        AtkraceChallengeItem.data = data;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
    };
    ActrackMoreItem.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        Api.atkraceVoApi.setInitHand(false);
        _super.prototype.dispose.call(this);
    };
    return ActrackMoreItem;
}(AtkLogScrollItem));
__reflect(ActrackMoreItem.prototype, "ActrackMoreItem");
//# sourceMappingURL=ActrackMoreItem.js.map