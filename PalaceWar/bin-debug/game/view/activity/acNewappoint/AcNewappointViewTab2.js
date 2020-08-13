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
 * 新服庆典 tab2
 * date 2020.6.30
 * author ycg
 */
var AcNewappointViewTab2 = /** @class */ (function (_super) {
    __extends(AcNewappointViewTab2, _super);
    function AcNewappointViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scoreInfo = null;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNewappointViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, this.exchangeCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 534;
        bg.height = 472;
        bg.setPosition(53, 0);
        this.addChild(bg);
        var topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width / 2 - topInfoBg.width / 2, bg.y + 10);
        this.addChild(topInfoBg);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointScoreInfo", this.getTypeCode()), ["" + this.vo.getScore()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.anchorOffsetX = topInfo.width / 2;
        topInfo.setPosition(topInfoBg.x + topInfoBg.width / 2, topInfoBg.y + topInfoBg.height / 2 - topInfo.height / 2);
        this.addChild(topInfo);
        this._scoreInfo = topInfo;
        var dataList = this.cfg.getShopListCfg();
        var scrollList = ComponentManager.getScrollList(AcNewappointShopScrollItem, dataList, new egret.Rectangle(0, 0, 526, 417), { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x + 4, topInfoBg.y + topInfoBg.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcNewappointViewTab2.prototype.exchangeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcNewappointViewTab2.prototype.refreshView = function () {
        this._scoreInfo.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointScoreInfo", this.getTypeCode()), ["" + this.vo.getScore()]);
        this._scoreInfo.anchorOffsetX = this._scoreInfo.width / 2;
        var dataList = this.cfg.getShopListCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcNewappointViewTab2.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcNewappointViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, this.exchangeCallback, this);
        this._scoreInfo = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointViewTab2;
}(AcCommonViewTab));
//# sourceMappingURL=AcNewappointViewTab2.js.map