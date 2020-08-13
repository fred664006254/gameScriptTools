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
var AcPowerFullDetailTab1ScrollItem = /** @class */ (function (_super) {
    __extends(AcPowerFullDetailTab1ScrollItem, _super);
    function AcPowerFullDetailTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcPowerFullDetailTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailTab1ScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailTab1ScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullDetailTab1ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullDetailTab1ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;
        var bg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        bg.width = 172;
        bg.height = 287;
        this.addChild(bg);
        this.width = bg.width + this.getSpaceX();
        var itemRewardVo = GameData.formatRewardItem(data.getReward)[0];
        var itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
        itemName.setPosition(bg.x + bg.width / 2 - itemName.width / 2, bg.y + 42 - itemName.height / 2);
        this.addChild(itemName);
        var itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
        itemContainer.setPosition(bg.x + bg.width / 2 - itemContainer.width / 2, bg.y + 58);
        this.addChild(itemContainer);
        var limitNum = data.limitTime - this.vo.getShopBuyNum(data.id);
        if (limitNum < 0) {
            limitNum = 0;
        }
        var limitTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailShopLimit", this.getTypeCode()), [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        limitTF.setPosition(bg.x + bg.width / 2 - limitTF.width / 2, bg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        if (data.discount) {
            var tag = BaseBitmap.create('shopview_corner');
            tag.setPosition(itemContainer.x, itemContainer.y);
            this.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acPowerFullDetailShopDiscount', this.getTypeCode()), [String(data.discount)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                var tagnum = Math.floor(10 - data.discount);
                tagTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode('acPowerFullDetailShopDiscount', this.getTypeCode()), [String(tagnum * 10)]);
            }
            tagTxt.width = 70;
            tagTxt.height = 20;
            tagTxt.textAlign = egret.HorizontalAlign.CENTER;
            tagTxt.anchorOffsetX = tagTxt.width / 2;
            tagTxt.anchorOffsetY = tagTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
            tagTxt.rotation = -45;
            this.addChild(tagTxt);
        }
        //积分icon
        var iconScale = 0.8;
        var needIcon = BaseBitmap.create("public_icon1");
        needIcon.setScale(iconScale);
        this.addChild(needIcon);
        //消耗积分
        var needTF = ComponentManager.getTextField(String(data.costMoney), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        var offestWidth = bg.width - needIcon.width * iconScale - needTF.width;
        needIcon.setPosition(bg.x + offestWidth / 2, bg.y + 202 - needIcon.height / 2 * iconScale);
        needTF.setPosition(needIcon.x + needIcon.width * iconScale, needIcon.y + needIcon.height / 2 * iconScale - needTF.height / 2);
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acPowerFullDetailShopBuy", this.getTypeCode()), function () {
            if (!_this.vo.isStart) {
                _this.vo.showAcEndTip();
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < data.costMoney) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailMoneyNotEnough", _this.getTypeCode())));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, { activeId: _this.vo.aidAndCode, shopId: data.id });
        }, this, null, null, null, TextFieldConst.COLOR_BLACK);
        shopBtn.setPosition(bg.x + bg.width / 2 - shopBtn.width / 2, bg.y + bg.height - 20 - shopBtn.height);
        this.addChild(shopBtn);
        if (limitNum <= 0) {
            shopBtn.setEnable(false);
        }
    };
    AcPowerFullDetailTab1ScrollItem.prototype.getSpaceX = function () {
        return 4;
    };
    AcPowerFullDetailTab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcPowerFullDetailTab1ScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullDetailTab1ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcPowerFullDetailTab1ScrollItem.js.map