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
 * 伤害排名
 * author qianjun
 */
var AllianceWarDamageRankView = (function (_super) {
    __extends(AllianceWarDamageRankView, _super);
    function AllianceWarDamageRankView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        return _this;
    }
    Object.defineProperty(AllianceWarDamageRankView.prototype, "api", {
        get: function () {
            return Api.allianceWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AllianceWarDamageRankView.prototype.initView = function () {
        var view = this;
        var tabName = ["allianceWarDamageTab1", "allianceWarDamageTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = this.viewBg.x + 43;
        tabbarGroup.y = this.viewBg.y + 10;
        tabbarGroup.setSpace(15);
        view.addChildToContainer(tabbarGroup);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 685;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 53;
        this.addChildToContainer(bg1);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = bg1.width - 20;
        bottomBg.height = 110;
        bottomBg.x = bg1.x + 10;
        bottomBg.y = bg1.y + bg1.height - 125;
        this.addChildToContainer(bottomBg);
        var contentBg = BaseBitmap.create("public_tc_bg03");
        contentBg.width = bg1.width - 20;
        contentBg.height = bg1.height - 35 - bottomBg.height;
        contentBg.x = bg1.x + 10;
        contentBg.y = bg1.y + 10;
        this.addChildToContainer(contentBg);
        var bg2 = BaseBitmap.create("public_ts_bg01");
        bg2.width = contentBg.width - 10;
        bg2.height = 32;
        bg2.x = contentBg.x + 5;
        bg2.y = contentBg.y + 10;
        this.addChildToContainer(bg2);
        var leftWin = view.param.data.type == 'win';
        var coutrywar = view.param.data.wartype == 'countrywar';
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(coutrywar ? 'CountryWarWinAlliTip' : 'allianceWarWinAlliTip', [view.param.data.winanme]), 24, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
        view.addChildToContainer(tipTxt);
        var winData = view.param.data.damageLog[leftWin ? LayoutConst.left : LayoutConst.right];
        var dataList = [];
        for (var i in winData) {
            var unit = winData[i];
            dataList.push({
                uid: i,
                name: unit.name,
                damage: unit.damage,
                win: unit.win
            });
        }
        dataList.sort(function (a, b) {
            return b.damage - a.damage;
        });
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 508, contentBg.height - 60);
        this._scrollList = ComponentManager.getScrollList(AllianceWarDamageRankItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(contentBg.x + 5, contentBg.y + 50);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        //个人榜单	
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = bg2.y + bg2.height / 2 - titleTxt1.height / 2;
        view.addChildToContainer(titleTxt1);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.x = contentBg.x + 135;
        titleTF.y = titleTxt1.y;
        view.addChildToContainer(titleTF);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarWinLastNum"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = contentBg.x + 280;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarDamageNum"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = contentBg.x + 400;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        var loseData = view.param.data.damageLog[leftWin ? LayoutConst.right : LayoutConst.left];
        var rankList = [];
        for (var i in loseData) {
            var unit = loseData[i];
            rankList.push({
                uid: i,
                name: unit.name,
                damage: unit.damage,
                win: unit.win
            });
        }
        rankList.sort(function (a, b) {
            return b.damage - a.damage;
        });
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, contentBg.height - 60);
        this._scrollList2 = ComponentManager.getScrollList(AllianceWarDamageRankItem, rankList, rect2);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.setPosition(contentBg.x + 5, contentBg.y + 50);
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList2.visible = false;
    };
    AllianceWarDamageRankView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AllianceWarDamageRankView.prototype.refreshRankList = function () {
        var view = this;
        var leftWin = view.param.data.type == 'win';
        this._scrollList.visible = view._curTabIdx == 0;
        this._scrollList2.visible = !this._scrollList.visible;
    };
    AllianceWarDamageRankView.prototype.dispose = function () {
        var view = this;
        // 未婚滑动列表
        view._scrollList = null;
        view._scrollList2 = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarDamageRankView;
}(PopupView));
__reflect(AllianceWarDamageRankView.prototype, "AllianceWarDamageRankView");
