/**
 * DinnerView 上的桌子
 * author shaoliang
 * date 2017/11/4
 * @class DinnerDesk
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
var DinnerDesk = (function (_super) {
    __extends(DinnerDesk, _super);
    // private _zid:string = null;
    function DinnerDesk() {
        var _this = _super.call(this) || this;
        _this._uid = 0;
        _this._dtype = 0;
        _this._numText = null;
        _this._numBg = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._clickedIdx = 0;
        return _this;
    }
    DinnerDesk.prototype.init = function (info, f, o, idx) {
        if (this._dtype == 1) {
            this.width = 194;
            this.height = 193;
        }
        else {
            this.width = 204;
            this.height = 205;
        }
        this._obj = o;
        this._callbackF = f;
        this._clickedIdx = idx;
        this._dtype = info.dtype;
        this._uid = info.uid;
        // this._zid = info.zid;
        var deskStr = "dinner_desk" + this._dtype;
        var nameBgStr = "dinner_name_bg" + this._dtype;
        var totalNum = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;
        var nameBg = BaseBitmap.create(nameBgStr);
        nameBg.width = 190;
        // nameBg.height = 44;
        var desk = ComponentManager.getButton(deskStr, null, f, o, [idx], 1);
        // if (idx < 2) {
        // 	desk.setScale(130/desk.width);
        // 	// nameBg.setScale(0.8);
        // }
        // else if (idx < 2) {
        // 	desk.setScale(148/desk.width);
        // 	// nameBg.setScale(0.9);
        // }
        // else {
        // }
        if (this._dtype == 1) {
            desk.setScale(175 / desk.width);
        }
        else {
            desk.setScale(195 / desk.width);
            desk.y = -10;
        }
        desk.x = nameBg.width / 2 - desk.width / 2 * desk.scaleX + 11;
        this.addChild(desk);
        if (this._dtype == 1) {
            nameBg.y = desk.height * desk.scaleY - nameBg.height * nameBg.scaleY;
        }
        else {
            nameBg.y = desk.y + desk.height * desk.scaleY - nameBg.height * nameBg.scaleY;
        }
        this.addChild(nameBg);
        var showName = info.name;
        //是否显示服务器
        if (Api.switchVoApi.checkCrossDinner() && !Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(this._uid), ServerCfg.selectServer.zid)) {
            showName = showName + "(" + Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.mergeServerVoApi.getTrueZid(this._uid)) + ")";
        }
        var nameText = ComponentManager.getTextField(showName, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameText.setPosition(nameBg.width / 2 - nameText.width / 2, nameBg.y + nameBg.height / 2 - nameText.height / 2);
        this.addChild(nameText);
        if (this._dtype == 1) {
            nameText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        else {
            nameText.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        this._numBg = BaseBitmap.create("rank_display_namebg"); //rank_display_namebg public_itemtipbg2  36 * 30
        this._numBg.scaleX = 0.4;
        this._numBg.scaleY = 0.7;
        this._numBg.setPosition(nameBg.width / 2 - this._numBg.width * this._numBg.scaleX / 2, nameBg.y - this._numBg.height * this._numBg.scaleY);
        this.addChild(this._numBg);
        this._numText = ComponentManager.getTextField(info.num + "/" + totalNum, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._numText.x = this._numBg.x + this._numBg.width * this._numBg.scaleX / 2 - this._numText.width / 2;
        this._numText.y = this._numBg.y + this._numBg.height * this._numBg.scaleY / 2 - this._numText.height / 2;
        this.addChild(this._numText);
        //自己的桌子
        if (this._uid == Api.playerVoApi.getPlayerID()) {
            var myTip = BaseBitmap.create("dinner_mytip");
            myTip.x = nameBg.width / 2 - myTip.width / 2;
            myTip.y = desk.y - myTip.height + 30;
            this.addChild(myTip);
            var myText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerMyDesk"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            myText.x = myTip.x + myTip.width / 2 - myText.width / 2;
            myText.y = myTip.y + 10;
            this.addChild(myText);
        }
    };
    DinnerDesk.prototype.setCurNum = function (num) {
        var totalNum = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;
        this._numText.text = num + "/" + totalNum;
        this._numText.x = this._numBg.x + this._numBg.width * this._numBg.scaleX / 2 - this._numText.width / 2;
    };
    Object.defineProperty(DinnerDesk.prototype, "uid", {
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DinnerDesk.prototype, "dtype", {
        get: function () {
            return this._dtype;
        },
        enumerable: true,
        configurable: true
    });
    DinnerDesk.prototype.dispose = function () {
        this._uid = 0;
        this._dtype = 0;
        this._numText = null;
        this._numBg = null;
        this._callbackF = null;
        this._obj = null;
        this._clickedIdx = 0;
        // this._zid = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerDesk;
}(BaseDisplayObjectContainer));
__reflect(DinnerDesk.prototype, "DinnerDesk");
