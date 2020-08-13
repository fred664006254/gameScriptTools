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
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 35 + GameData.popupviewOffsetX;
        tabbarGroup.y = 15;
        view.addChildToContainer(tabbarGroup);
        var contentBg = BaseBitmap.create("public_9_probiginnerbg");
        contentBg.width = 518;
        contentBg.height = 522;
        contentBg.x = this.viewBg.x + this.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 60;
        view.addChildToContainer(contentBg);
        var bg2 = BaseBitmap.create("public_9_bg37");
        bg2.width = contentBg.width;
        bg2.height = 40;
        bg2.x = contentBg.x;
        bg2.y = contentBg.y;
        this.addChildToContainer(bg2);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 518;
        bottomBg.height = 85;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 5;
        view.addChildToContainer(bottomBg);
        var leftWin = view.param.data.type == 'win';
        var coutrywar = view.param.data.wartype == 'countrywar';
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(coutrywar ? 'CountryWarWinAlliTip' : 'allianceWarWinAlliTip', [view.param.data.winanme]), 24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
        view.addChildToContainer(tipTxt);
        var winData = view.param.data.damageLog[leftWin ? LayoutConst.left : LayoutConst.right];
        var dataList = [];
        for (var i in winData) {
            var unit = winData[i];
            var num = 0;
            if (typeof unit.win == "number") {
                num = unit.win;
            }
            else if (typeof unit.win == "object") {
                for (var k in unit.win) {
                    num = unit.win[k];
                    break;
                }
            }
            dataList.push({
                uid: i,
                name: unit.name,
                damage: unit.damage,
                win: num
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
        titleTxt1.y = contentBg.y + 8;
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
            var num = 0;
            if (typeof unit.win == "number") {
                num = unit.win;
            }
            else if (typeof unit.win == "object") {
                for (var k in unit.win) {
                    num = unit.win[k];
                    break;
                }
            }
            rankList.push({
                uid: i,
                name: unit.name,
                damage: unit.damage,
                win: num
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
//# sourceMappingURL=AllianceWarDamageRankView.js.map