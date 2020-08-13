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
 * shop item
 */
var AcNewappointShopScrollItem = /** @class */ (function (_super) {
    __extends(AcNewappointShopScrollItem, _super);
    function AcNewappointShopScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._data = null;
        return _this;
    }
    AcNewappointShopScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;
        var bg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        bg.width = 172;
        bg.height = 287;
        this.addChild(bg);
        var itemRewardVo = GameData.formatRewardItem(data.getReward)[0];
        var itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
        itemName.setPosition(bg.x + bg.width / 2 - itemName.width / 2, bg.y + 42 - itemName.height / 2);
        this.addChild(itemName);
        var itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
        itemContainer.setPosition(bg.x + bg.width / 2 - itemContainer.width / 2, bg.y + 58);
        this.addChild(itemContainer);
        var limitNum = data.limitTime - this.vo.getExchangeNum(data.id);
        if (limitNum < 0) {
            limitNum = 0;
        }
        var limitTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointChangeNum", this.getTypeCode()), [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        limitTF.setPosition(bg.x + bg.width / 2 - limitTF.width / 2, bg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        //积分icon
        var iconScale = 0.35;
        var needIcon = BaseLoadBitmap.create(App.CommonUtil.getResByCode("acnewappoint_scoreitemicon", this.getTypeCode()));
        needIcon.width = 100;
        needIcon.height = 100;
        needIcon.setScale(iconScale);
        this.addChild(needIcon);
        //消耗积分
        var needTF = ComponentManager.getTextField(String(data.costScore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        var offestWidth = bg.width - needIcon.width * iconScale - needTF.width;
        needIcon.setPosition(bg.x + offestWidth / 2, bg.y + 202 - needIcon.height / 2 * iconScale);
        needTF.setPosition(needIcon.x + needIcon.width * iconScale, needIcon.y + needIcon.height / 2 * iconScale - needTF.height / 2);
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acNewappointChangeBtnName", this.getTypeCode()), function () {
            if (!_this.vo.isStart) {
                _this.vo.showAcEndTip();
                return;
            }
            if (_this.vo.getScore() < data.costScore) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointChangeTip", _this.getTypeCode())));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, { activeId: _this.vo.aidAndCode, shopId: data.id });
        }, this, null, null, null, TextFieldConst.COLOR_BLACK);
        shopBtn.setPosition(bg.x + bg.width / 2 - shopBtn.width / 2, bg.y + bg.height - 20 - shopBtn.height);
        this.addChild(shopBtn);
        if (limitNum <= 0) {
            shopBtn.setEnable(false);
        }
    };
    Object.defineProperty(AcNewappointShopScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointShopScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointShopScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointShopScrollItem.prototype.getTypeCode = function () {
        return this.code;
    };
    AcNewappointShopScrollItem.prototype.getSpaceX = function () {
        return 5;
    };
    AcNewappointShopScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcNewappointShopScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointShopScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcNewappointShopScrollItem.js.map