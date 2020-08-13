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
* 进度奖励
* date 2020.7.21
* author ycg
* @name AcGoodMatchDetailPopupViewTab3
*/
var AcGoodMatchDetailPopupViewTab3 = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailPopupViewTab3, _super);
    function AcGoodMatchDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGoodMatchDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailPopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_SELECTPOOL, this.requestCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var topBg = BaseBitmap.create("acgoodmatch_topbg");
        topBg.width = 520;
        topBg.height = 60;
        this.addChild(topBg);
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y + 9);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTopInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.width = 480;
        topInfo.lineSpacing = 5;
        topInfo.setPosition(topBg.x + 20, topBg.y + topBg.height / 2 - topInfo.height / 2);
        this.addChild(topInfo);
        var dataList = this.cfg.getPoolRewards();
        var rect = new egret.Rectangle(0, 0, 530, 615);
        var scrollList = ComponentManager.getScrollList(AcGoodMatchDetailTab3ScrollItem, dataList, rect, { aid: this.aid, code: this.code, id: this.param.data.id });
        scrollList.setPosition(bg.x, topBg.y + topBg.height + 6);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcGoodMatchDetailPopupViewTab3.prototype.requestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTip2", this.getTypeCode())));
    };
    AcGoodMatchDetailPopupViewTab3.prototype.refreshView = function () {
        var dataList = this.cfg.getPoolRewards();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcGoodMatchDetailPopupViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_SELECTPOOL, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailPopupViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcGoodMatchDetailPopupViewTab3.js.map