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
var TabBarChatGroup = (function (_super) {
    __extends(TabBarChatGroup, _super);
    function TabBarChatGroup() {
        return _super.call(this) || this;
    }
    TabBarChatGroup.prototype.init = function (buttonName, textArr, callback, handler, param, aligh) {
        _super.prototype.init.call(this, buttonName, textArr, callback, handler, null, null, 110);
        // for (let i:number = 0; i<=this._tbArr.length; i++)
        // {
        // }
    };
    return TabBarChatGroup;
}(TabBarGroup));
__reflect(TabBarChatGroup.prototype, "TabBarChatGroup");
//# sourceMappingURL=TabBarChatGroup.js.map