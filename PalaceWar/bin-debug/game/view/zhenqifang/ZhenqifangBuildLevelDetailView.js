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
 * 建筑详情
 * author 钱竣
 * date 2017/9/28
 * @class ZhenqifangSelectServantView
 */
var ZhenqifangBuildLevelDetailView = (function (_super) {
    __extends(ZhenqifangBuildLevelDetailView, _super);
    function ZhenqifangBuildLevelDetailView() {
        return _super.call(this) || this;
    }
    ZhenqifangBuildLevelDetailView.prototype.getTitleStr = function () {
        return "zhengqifangleveldetail";
    };
    ZhenqifangBuildLevelDetailView.prototype.getResourceList = function () {
        var resArr = ["zqffinished", "rankactivenamebg", "battlepassline-1", "zqffinished2", "zqfselected"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    ZhenqifangBuildLevelDetailView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 670;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15;
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        var arr = [];
        for (var i in Config.ZhenqifangCfg.taskHouse) {
            arr.push(Config.ZhenqifangCfg.taskHouse[i]);
        }
        rect.setTo(0, 0, bg.width - 10, bg.height - 20);
        var list = null;
        list = ComponentManager.getScrollList(ZhenqifangBuildLevelItem, arr, rect);
        list.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(list);
        var level = Api.zhenqifangVoApi.ZhenqifangLevel;
        if (level) {
            list.setScrollTopByIndex(level - 1);
        }
    };
    ZhenqifangBuildLevelDetailView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    ZhenqifangBuildLevelDetailView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangBuildLevelDetailView;
}(PopupView));
__reflect(ZhenqifangBuildLevelDetailView.prototype, "ZhenqifangBuildLevelDetailView");
//# sourceMappingURL=ZhenqifangBuildLevelDetailView.js.map