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
 * 新服预约 tab1
 * date 2020.6.29
 * author ycg
 */
var AcNewappointPreviewViewTab2 = /** @class */ (function (_super) {
    __extends(AcNewappointPreviewViewTab2, _super);
    function AcNewappointPreviewViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scoreInfo = null;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNewappointPreviewViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 540;
        bg.height = 450;
        bg.setPosition(50, 0);
        this.addChild(bg);
        var topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width / 2 - topInfoBg.width / 2, bg.y + 10);
        this.addChild(topInfoBg);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTotalScore", this.getTypeCode()), ["" + Api.acnewappointApi.getScore()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.anchorOffsetX = topInfo.width / 2;
        topInfo.setPosition(topInfoBg.x + topInfoBg.width / 2, topInfoBg.y + topInfoBg.height / 2 - topInfo.height / 2);
        this.addChild(topInfo);
        this._scoreInfo = topInfo;
        var dataList = Api.acnewappointApi.getSortTaskCfg();
        var scrollList = ComponentManager.getScrollList(AcNewappointPreviewTaskScrollItem, dataList, new egret.Rectangle(0, 0, 530, 395), { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x + 5, topInfoBg.y + topInfoBg.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcNewappointPreviewViewTab2.prototype.refreshView = function () {
        this._scoreInfo.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTotalScore", this.getTypeCode()), ["" + Api.acnewappointApi.getScore()]);
        this._scoreInfo.anchorOffsetX = this._scoreInfo.width / 2;
        var dataList = Api.acnewappointApi.getSortTaskCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcNewappointPreviewViewTab2.prototype, "code", {
        get: function () {
            return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewViewTab2.prototype, "aid", {
        get: function () {
            return "newappoint";
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewViewTab2.prototype.getTypeCode = function () {
        return this.code;
    };
    AcNewappointPreviewViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH, this.refreshView, this);
        this._scoreInfo = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointPreviewViewTab2;
}(CommonViewTab));
//# sourceMappingURL=AcNewappointPreviewViewTab2.js.map