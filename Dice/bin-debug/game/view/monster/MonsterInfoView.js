/*
 *@description: boss 详情的列表信息
 *@author: hwc
 *@date: 2020-04-21 13:06:23
 *@version 1.0.0
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
var MonsterInfoView = (function (_super) {
    __extends(MonsterInfoView, _super);
    function MonsterInfoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonsterInfoView.prototype.initView = function () {
        var bossData = Config.MonsterCfg.getBossKeys();
        var h = this.getShowHeight() - this._titleBg.height;
        var bosslist = ComponentMgr.getScrollList(MonsterItem, bossData, new egret.Rectangle(0, 0, 504, h));
        this.addChildToContainer(bosslist);
        bosslist.x = 9;
        bosslist.y = 0;
    };
    MonsterInfoView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        this.viewBg.width = this.getShowWidth();
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    MonsterInfoView.prototype.getShowHeight = function () {
        return 841;
    };
    // protected getTitleStr(){
    //     return "经典战场";
    // }
    // 背景图名称
    MonsterInfoView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
    MonsterInfoView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return MonsterInfoView;
}(PopupView));
__reflect(MonsterInfoView.prototype, "MonsterInfoView");
//# sourceMappingURL=MonsterInfoView.js.map