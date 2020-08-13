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
 * 排行榜基类
 * author 陈可
 * date 2017/11/28
 * @class RankPopupView
 */
var RankPopupView = (function (_super) {
    __extends(RankPopupView, _super);
    function RankPopupView() {
        var _this = _super.call(this) || this;
        /**
         * 滑动列表
         */
        _this.tabList = {};
        _this._scrollListBgRect = egret.Rectangle.create();
        _this._scrollListBgRect.setTo(0, 0, 518, 541);
        return _this;
    }
    RankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao"
        ]);
    };
    RankPopupView.prototype.initView = function () {
        this.initListBg();
    };
    RankPopupView.prototype.changeTab = function () {
        if (!this.tabList[this._selectedTabIndex]) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, this._scrollListBgRect.width - 10, this._scrollListBgRect.height - 60);
            var scrollList = ComponentManager.getScrollList(this.getListItemClass(), this.getScrollDataList(), rect);
            this.addChildToContainer(scrollList);
            scrollList.setPosition(this._scrollListBgRect.x + 5, this._scrollListBgRect.y + 50);
            scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
            this.tabList[this._selectedTabIndex] = scrollList;
        }
        else {
            var scrollList = this.tabList[this._selectedTabIndex];
            if (scrollList) {
                this.addChildToContainer(scrollList);
            }
        }
        if (this._curShowTab) {
            if (this._curShowTab.parent) {
                this._curShowTab.parent.removeChild(this._curShowTab);
            }
            this._curShowTab = null;
        }
        this._curShowTab = this.tabList[this._selectedTabIndex];
        if (this._title2Txt) {
            this._title2Txt.text = this.getTitleValueStr2();
        }
        if (this._title3Txt) {
            this._title3Txt.text = this.getTitleValueStr();
        }
        if (this.buttomContainer) {
            App.DisplayUtil.destory(this.buttomContainer);
            this.initButtomInfo();
        }
    };
    RankPopupView.prototype.initListBg = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = this._scrollListBgRect.width + 20; //538
        bg.height = this._scrollListBgRect.height + 20 + 96 + 9; //666
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 55;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = this._scrollListBgRect.width;
        bg1.height = this._scrollListBgRect.height;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 65;
        this._scrollListBgRect.x = bg1.x;
        this._scrollListBgRect.y = bg1.y;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("rank_biao");
        bg2.width = bg1.width - 30;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg1.y + 14;
        this.addChildToContainer(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(this.getTitleValueStr(), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = bg2.x + 175;
        titleTxt2.y = titleTxt1.y;
        this._title2Txt = titleTxt2;
        this.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(this.getTitleValueStr(), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.textAlign = egret.HorizontalAlign.CENTER;
        titleTxt3.width = 200;
        titleTxt3.x = bg2.x + bg2.width - titleTxt3.width;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);
        this._title3Txt = titleTxt3;
        var bg3 = BaseBitmap.create("public_tc_bg03");
        bg3.name = "buttomBg";
        bg3.width = bg1.width;
        bg3.height = 96;
        bg3.setPosition(bg1.x, bg1.y + bg1.height + 9);
        this.addChildToContainer(bg3);
        if (!this.buttomContainer) {
            this.buttomContainer = new BaseDisplayObjectContainer();
            this.buttomContainer.width = bg3.width;
            this.buttomContainer.height = bg3.height;
            this.buttomContainer.setPosition(bg3.x, bg3.y);
            this.addChildToContainer(this.buttomContainer);
        }
    };
    RankPopupView.prototype.getTitleValueStr2 = function () {
        return LanguageManager.getlocal("acRankPop_title2");
    };
    RankPopupView.prototype.getTitleValueStr = function () {
        return LanguageManager.getlocal("pointNumber");
    };
    RankPopupView.prototype.getScrollDataList = function () {
        return [];
    };
    RankPopupView.prototype.getListItemClass = function () {
        return RankPopupListItem;
    };
    RankPopupView.prototype.initButtomInfo = function () {
    };
    RankPopupView.prototype.getTitleStr = function () {
        return "dinnerRankPopupViewTitle";
    };
    RankPopupView.prototype.dispose = function () {
        this._title2Txt = null;
        this._title3Txt = null;
        this.buttomContainer = null;
        this._curShowTab = null;
        this.tabList = {};
        _super.prototype.dispose.call(this);
    };
    return RankPopupView;
}(PopupView));
__reflect(RankPopupView.prototype, "RankPopupView");
