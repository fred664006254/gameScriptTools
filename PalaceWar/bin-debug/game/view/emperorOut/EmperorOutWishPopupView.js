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
 * 请安列表
 * date 2019.12.10
 * author ycg
 * @class EmperorTourWishPopupView
 */
var EmperorOutWishPopupView = (function (_super) {
    __extends(EmperorOutWishPopupView, _super);
    function EmperorOutWishPopupView() {
        var _this = _super.call(this) || this;
        _this._rewardNumTip = null;
        _this._scrollList = null;
        _this._data = [];
        return _this;
    }
    EmperorOutWishPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.freshList, this);
        this._data = Api.emperorAchieveVoApi.sortWishListData(this.param.data.data);
        var viewBg = BaseBitmap.create("decree_popbg");
        viewBg.height = this.getShowHeight();
        viewBg.setPosition(GameConfig.stageWidth / 2 - viewBg.width / 2, GameConfig.stageHeigth / 2 - viewBg.height / 2);
        this.addChildToContainer(viewBg);
        this.closeBtn.y = viewBg.y - 10;
        this.closeBtn.x = viewBg.x + viewBg.width - 80;
        var title = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(viewBg.x + viewBg.width / 2 - title.width / 2, viewBg.y + 20);
        this.addChildToContainer(title);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishTopMsg", ["" + Config.EmperoroutingCfg.bonusTimes, "" + Config.EmperoroutingCfg.popularity]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.width = 520;
        topInfo.lineSpacing = 5;
        topInfo.setPosition(viewBg.x + viewBg.width / 2 - topInfo.width / 2, viewBg.y + 70);
        this.addChildToContainer(topInfo);
        var bonusData = Api.emperorAchieveVoApi.getBonusData();
        var num = Config.EmperoroutingCfg.bonusTimes;
        if (bonusData) {
            var rNum = Object.keys(bonusData).length;
            num = num - rNum;
        }
        var rewardNumTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishRewardTip", ["" + num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rewardNumTip.setPosition(topInfo.x, topInfo.y + topInfo.height + 5);
        this.addChildToContainer(rewardNumTip);
        this._rewardNumTip = rewardNumTip;
        var bg = BaseBitmap.create("public_9_bg36");
        bg.width = viewBg.width - 88;
        bg.height = this.getShowHeight() - 190;
        bg.setPosition(viewBg.x + viewBg.width / 2 - bg.width / 2, rewardNumTip.y + rewardNumTip.height + 10);
        this.addChildToContainer(bg);
        var topBg = BaseBitmap.create("public_9_bg37");
        topBg.width = bg.width;
        topBg.height = 28;
        topBg.setPosition(bg.x, bg.y);
        this.addChildToContainer(topBg);
        var roleName = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        roleName.anchorOffsetX = roleName.width / 2;
        roleName.setPosition(topBg.x + 100, topBg.y + 5);
        this.addChildToContainer(roleName);
        var roleLevel = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        roleLevel.anchorOffsetX = roleLevel.width / 2;
        roleLevel.setPosition(topBg.x + topBg.width / 2 - 20, topBg.y + 5);
        this.addChildToContainer(roleLevel);
        var wishNumTitle = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListWishNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        wishNumTitle.anchorOffsetX = roleLevel.width / 2;
        wishNumTitle.setPosition(topBg.x + topBg.width / 2 + 90, topBg.y + 5);
        this.addChildToContainer(wishNumTitle);
        var data = this._data;
        var rect = new egret.Rectangle(0, 0, 532, 550);
        var list = ComponentManager.getScrollList(EmperorOutWishScrollItem, data, rect, { uid: this.param.data.uid });
        list.setPosition(topBg.x, topBg.y + topBg.height + 6);
        this.addChildToContainer(list);
        this._scrollList = list;
    };
    EmperorOutWishPopupView.prototype.freshList = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutWishListSuccess"));
            var bonusData = Api.emperorAchieveVoApi.getBonusData();
            var num = Config.EmperoroutingCfg.bonusTimes;
            if (bonusData) {
                var rNum = Object.keys(bonusData).length;
                num = num - rNum;
            }
            this._rewardNumTip.text = LanguageManager.getlocal("emperorOutWishRewardTip", ["" + num]);
            this._scrollList.refreshData(this._data, { uid: this.param.data.uid });
        }
    };
    EmperorOutWishPopupView.prototype.getShowHeight = function () {
        return 780;
    };
    EmperorOutWishPopupView.prototype.getBgName = function () {
        return null;
    };
    EmperorOutWishPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorOutWishPopupView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorOutWishPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_popbg", "emperorout_allianceflag", "emperorout_rewardbtn", "emperorout_rewardbtn_down", "emperorout_rewardflag"
        ]);
    };
    EmperorOutWishPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.freshList, this);
        this._rewardNumTip = null;
        this._scrollList = null;
        this._data = [];
        _super.prototype.dispose.call(this);
    };
    return EmperorOutWishPopupView;
}(PopupView));
__reflect(EmperorOutWishPopupView.prototype, "EmperorOutWishPopupView");
//# sourceMappingURL=EmperorOutWishPopupView.js.map