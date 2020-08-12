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
 * 页签按钮组
 * author dmj
 * date 2017/9/12
 * @class TabBarScrollGroup
 */
var TabBarScrollBtnGroup = (function (_super) {
    __extends(TabBarScrollBtnGroup, _super);
    function TabBarScrollBtnGroup() {
        return _super.call(this) || this;
    }
    TabBarScrollBtnGroup.prototype.switchHandler = function (param) {
        if (param == "right") {
            var lineCount = this._maxnum;
            if (this._curLine < lineCount) {
                this._curLine++;
                this.scrollView.setScrollLeft(Math.min(129 * (this._curLine - 1), 260), 100);
                if (this.getChildByName("reddot")) {
                    this.getChildByName("reddot").visible = false;
                }
            }
        }
        else if (param == "left") {
            if (this._curLine > 1) {
                this._curLine--;
                this.scrollView.setScrollLeft(Math.max(-129 * (this._curLine - 1), 0), 100);
            }
            if (this.getChildByName("reddot")) {
                this.getChildByName("reddot").visible = false;
            }
        }
        if (this._leftBtn) {
            this._leftBtn.visible = this._curLine > 1;
        }
        if (this._rightBtn) {
            this._rightBtn.visible = this._curLine < this._maxnum;
        }
        this.clickButtonHandler(this._tbArr[this._curLine - 1]);
    };
    TabBarScrollBtnGroup.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return TabBarScrollBtnGroup;
}(TabBarScrollGroup));
__reflect(TabBarScrollBtnGroup.prototype, "TabBarScrollBtnGroup");
//# sourceMappingURL=TabBarScrollBtnGroup.js.map