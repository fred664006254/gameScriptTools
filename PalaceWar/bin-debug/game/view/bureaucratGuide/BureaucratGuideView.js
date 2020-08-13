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
var BureaucratGuideView = (function (_super) {
    __extends(BureaucratGuideView, _super);
    function BureaucratGuideView() {
        return _super.call(this) || this;
    }
    BureaucratGuideView.prototype.getTitleStr = function () {
        return App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
    };
    BureaucratGuideView.prototype.initView = function () {
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.y = -15;
        bottomBg.height = GameConfig.stageHeigth - this.getTitleButtomY() - 5;
        this.addChildToContainer(bottomBg);
        var pic = BaseBitmap.create("bureaucrat_guide_pic");
        pic.x = 20;
        pic.y = 109;
        this.addChild(pic);
        //列表
        var item1 = { index: ("bureaucratGuide_step1"), des: ("bureaucratGuide_step1_des"), url: "https://dwz.cn/GTvdFGly" };
        var item2 = { index: ("bureaucratGuide_step2"), des: ("bureaucratGuide_step2_des"), bg: "bureaucrat_guide_pic1" };
        var item3 = { index: ("bureaucratGuide_step3"), des: ("bureaucratGuide_step3_des"), bg: "bureaucrat_guide_pic2" };
        var item4 = { index: ("bureaucratGuide_step4"), des: ("bureaucratGuide_step4_des"), bg: "bureaucrat_guide_pic3" };
        var item5 = { index: ("bureaucratGuide_step5"), des: ("bureaucratGuide_step5_des"), bg: "bureaucrat_guide_pic4" };
        var item6 = { index: ("bureaucratGuide_step6"), des: ("bureaucratGuide_step6_des"), bg: "bureaucrat_guide_pic5" };
        var list = [item1, item2, item3, item4, item5, item6];
        var _scroRect = new egret.Rectangle(20, 256, 600, 680);
        this._scrollList = ComponentManager.getScrollList(BureauceratGuideItem, list, _scroRect);
        this._scrollList.x = 20;
        this._scrollList.y = 256;
        this.addChild(this._scrollList);
    };
    BureaucratGuideView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "bureaucrat_guide_pic", "bureaucrat_guide_pic1", "bureaucrat_guide_pic2", "bureaucrat_guide_pic3",
            "bureaucrat_guide_pic4", "bureaucrat_guide_pic5", "common_titlebg", "public_9_bg20"
        ]);
    };
    BureaucratGuideView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._scrollList = null;
    };
    return BureaucratGuideView;
}(CommonView));
__reflect(BureaucratGuideView.prototype, "BureaucratGuideView");
//# sourceMappingURL=BureaucratGuideView.js.map