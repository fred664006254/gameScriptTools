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
 * 新服预约礼包详情
 * author ycg
 * date 2020.6.29
 * @class AcNewappointPreviewGiftDetailPopupView
 */
var AcNewappointPreviewGiftDetailPopupView = /** @class */ (function (_super) {
    __extends(AcNewappointPreviewGiftDetailPopupView, _super);
    function AcNewappointPreviewGiftDetailPopupView() {
        return _super.call(this) || this;
    }
    AcNewappointPreviewGiftDetailPopupView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acnewappoint_giftdetailbg", this.getUiCode());
    };
    AcNewappointPreviewGiftDetailPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewappointPreviewGiftDetailPopupView.prototype.initView = function () {
        var titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftdetailtitle", this.getUiCode()));
        titleBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - titleBg.width / 2, this.viewBg.y + 10);
        this.addChildToContainer(titleBg);
        var rewards = this.param ? this.param.data.rewards : "";
        var rewardArr = GameData.getRewardItemIcons(rewards, true, true);
        var itemW = 108;
        var itemH = 108;
        var itemScale = 0.7;
        var itemSpceX = 10;
        // let stX = 65 + (428 - rewardArr.length * (itemW * itemScale + itemSpceX) + itemSpceX)/2;
        var stX = this.viewBg.x + this.viewBg.width / 2 - (rewardArr.length * (itemW * itemScale + itemSpceX) + itemSpceX) / 2 + 10;
        for (var i = 0; i < rewardArr.length; i++) {
            var item = rewardArr[i];
            item.setScale(itemScale);
            item.setPosition(stX + i * (itemW * itemScale + itemSpceX), this.viewBg.y + 240);
            this.addChildToContainer(item);
        }
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getUiCode()));
        infoBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - infoBg.width / 2, this.viewBg.y + 360);
        this.addChildToContainer(infoBg);
        var infoStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftDetailInfo", this.getUiCode()));
        if (this.param && this.param.data.infoStr) {
            infoStr = this.param.data.infoStr;
        }
        var info = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        info.setPosition(infoBg.x + infoBg.width / 2 - info.width / 2, infoBg.y + infoBg.height / 2 - info.height / 2);
        this.addChildToContainer(info);
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "confirmBtn", this.hide, this, null, null, null, TextFieldConst.COLOR_BLACK);
        enterBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - enterBtn.width / 2, this.viewBg.y + this.viewBg.height - enterBtn.height - 5);
        this.addChildToContainer(enterBtn);
    };
    AcNewappointPreviewGiftDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width - 20;
        this.closeBtn.y = this.viewBg.y + 65;
        if (this._hudieClip) {
            this._hudieClip.x = this.closeBtn.x - 45;
            this._hudieClip.y = this.closeBtn.y - 45;
        }
    };
    Object.defineProperty(AcNewappointPreviewGiftDetailPopupView.prototype, "code", {
        get: function () {
            return this.param ? this.param.data.code : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewGiftDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param ? this.param.data.aid : "";
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewGiftDetailPopupView.prototype.getUiCode = function () {
        return this.code;
    };
    AcNewappointPreviewGiftDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acnewappoint_giftdetailbg-1", "acnewappoint_giftdetailtitle-1",
            "acnewappoint_giftdetailbg-" + this.getUiCode(), "acnewappoint_giftdetailtitle-" + this.getUiCode(),
        ]);
    };
    AcNewappointPreviewGiftDetailPopupView.prototype.dipose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNewappointPreviewGiftDetailPopupView;
}(PopupView));
//# sourceMappingURL=AcNewappointPreviewGiftDetailPopupView.js.map