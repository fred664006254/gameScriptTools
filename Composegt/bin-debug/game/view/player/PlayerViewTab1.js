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
var PlayerViewTab1 = (function (_super) {
    __extends(PlayerViewTab1, _super);
    function PlayerViewTab1() {
        return _super.call(this) || this;
    }
    PlayerViewTab1.prototype.initView = function () {
        var str1 = "hello world";
        var str2 = "Jack 1";
        var textTF = new BaseTextField();
        textTF.text = App.StringUtil.firstCharToUper(str1);
        textTF.x = 10;
        textTF.y = 20;
        this.addChild(textTF);
        var textTF2 = new BaseTextField();
        textTF2.text = App.StringUtil.firstCharToLower(str2);
        textTF2.x = 10;
        textTF2.y = 120;
        this.addChild(textTF2);
    };
    PlayerViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PlayerViewTab1;
}(CommonViewTab));
__reflect(PlayerViewTab1.prototype, "PlayerViewTab1");
