var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 新服预约 登录界面显示
 * author ycg
 * date 2020.6.29
 * @class AcNewappointPreviewView
 */
var AcNewappointPreviewView = /** @class */ (function (_super) {
    __extends(AcNewappointPreviewView, _super);
    function AcNewappointPreviewView() {
        var _this = _super.call(this) || this;
        _this._aid = "newappoint";
        return _this;
    }
    AcNewappointPreviewView.prototype.getBgName = function () {
        return null;
    };
    AcNewappointPreviewView.prototype.getTitleBgName = function () {
        return null;
    };
    AcNewappointPreviewView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewappointPreviewView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNewappointPreviewView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcNewappointPreviewView.prototype.getCloseBtnName = function () {
        return null;
    };
    Object.defineProperty(AcNewappointPreviewView.prototype, "code", {
        get: function () {
            return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewView.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewView.prototype.getUiCode = function () {
        return this.code;
    };
    Object.defineProperty(AcNewappointPreviewView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_bg", this.getUiCode()));
        bg.height = 760;
        this.addChildToContainer(bg);
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        var titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_previewtitlebg", this.getUiCode()));
        this.addChildToContainer(titleBg);
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y - titleBg.height + 45);
        var closeBtn = ComponentManager.getButton(ButtonConst.POPUP_CLOSE_BTN_2, "", this.hide, this);
        closeBtn.x = bg.x + bg.width - closeBtn.width;
        closeBtn.y = bg.y - closeBtn.height / 2 + 10;
        this.addChildToContainer(closeBtn);
        var hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
        hudieClip.x = closeBtn.x - 45;
        hudieClip.y = closeBtn.y - 45;
        hudieClip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(hudieClip);
        hudieClip.playWithTime();
        var topBgImg = "acnewappoint_previewopentopbg";
        if (Api.acnewappointApi.isInActivity()) {
            topBgImg = "acnewappoint_previewtopbg";
        }
        var topBg = BaseBitmap.create(App.CommonUtil.getResByCode(topBgImg, this.getUiCode()));
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y + 43);
        this.addChildToContainer(topBg);
        var serverInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewServer", this.getUiCode()), ["" + Api.acnewappointApi.getNewServer()]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        serverInfo.setPosition(topBg.x + 297 + 60 / 2 - serverInfo.width / 2, topBg.y + 46 + 36 / 2 - serverInfo.height / 2);
        this.addChildToContainer(serverInfo);
        //tabbar
        var tabbarName = [App.CommonUtil.getCnByCode("acNewappointPreviewTab1", this.getUiCode()), App.CommonUtil.getCnByCode("acNewappointPreviewTab2", this.getUiCode())];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, tabbarName, this.clickTabbarHandler, this);
        tabbarGroup.setSpace(0);
        tabbarGroup.setPosition(bg.x + 65, topBg.y + topBg.height - 13);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.changeTab();
        this.refreshTabbar();
        this.refreshView();
    };
    AcNewappointPreviewView.prototype.refreshTabbar = function () {
        var tab = this.tabbarGroup.getTabBar(1);
        if (!Api.acnewappointApi.isJoin()) {
            App.DisplayUtil.changeToGray(tab);
        }
        else {
            App.DisplayUtil.changeToNormal(tab);
        }
    };
    AcNewappointPreviewView.prototype.refreshView = function () {
        if (Api.acnewappointApi.isInActivity()) {
            if (!Api.acnewappointApi.isJoin()) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
            if (Api.acnewappointApi.isJoin() && Api.acnewappointApi.checkTaskRed()) {
                this.tabbarGroup.addRedPoint(1);
            }
            else {
                this.tabbarGroup.removeRedPoint(1);
            }
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
            this.tabbarGroup.removeRedPoint(1);
        }
        this.refreshTabbar();
    };
    AcNewappointPreviewView.prototype.checkTabCondition = function (index) {
        if (index == 1) {
            var tab = this.tabbarGroup.getTabBar(index);
            if (!Api.acnewappointApi.isJoin()) {
                App.DisplayUtil.changeToGray(tab);
                if (Api.acnewappointApi.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip1", this.getUiCode())));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getUiCode())));
                }
                return false;
            }
            App.DisplayUtil.changeToNormal(tab);
        }
        return true;
    };
    AcNewappointPreviewView.prototype.getTabbarGroupY = function () {
        var offY = this.tabbarGroup.y + this.tabbarGroup.height - 2;
        return offY;
    };
    AcNewappointPreviewView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "itembg_0", "itembg_1", "itembg_2", "itembg_3", "itembg_4", "itembg_5", "itembg_6", "itembg_7", "itembg_8", "public_popupscrollitembg", "shopview_itemtitle", "public", "public_9_bg93", "button2", "collectflag", "btn2_small_yellow",
            "acnewappoint_bg-1", "acnewappoint_gift1-1", "acnewappoint_gift2-1", "acnewappoint_gift3-1", "acnewappoint_giftbottombg-1", "acnewappoint_giftitembg1-1", "acnewappoint_giftitembg2-1", "acnewappoint_previewtitlebg-1", "acnewappoint_previewtopbg-1", "acnewappoint_scoreitemicon-1", "acnewappoint_toptxtbg-1", "acnewappoint_previewopentopbg-1",
            "acnewappoint_bg-" + this.getUiCode(), "acnewappoint_gift1-" + this.getUiCode(), "acnewappoint_gift2-" + this.getUiCode(), "acnewappoint_gift3-" + this.getUiCode(), "acnewappoint_giftbottombg-" + this.getUiCode(), "acnewappoint_giftitembg1-" + this.getUiCode(), "acnewappoint_giftitembg2-" + this.getUiCode(), "acnewappoint_previewtitlebg-" + this.getUiCode(), "acnewappoint_previewtopbg-" + this.getUiCode(), "acnewappoint_scoreitemicon-" + this.getUiCode(), "acnewappoint_toptxtbg-" + this.getUiCode(), "acnewappoint_previewopentopbg-" + this.getUiCode(),
        ]).concat(list);
    };
    AcNewappointPreviewView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        this._aid = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointPreviewView;
}(CommonView));
//# sourceMappingURL=AcNewappointPreviewView.js.map