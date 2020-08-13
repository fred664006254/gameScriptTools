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
  * 月夜仙缘 商店
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab3ScrollItem
  */
var AcSweetGiftRewardTab3ScrollItem = (function (_super) {
    __extends(AcSweetGiftRewardTab3ScrollItem, _super);
    function AcSweetGiftRewardTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcSweetGiftRewardTab3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 172;
        this.height = 287;
        var itembg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        if (index < 3) {
            itembg.setload("ac_sweetgift_exchange_bg-1");
        }
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);
        var itemRewardVo = GameData.formatRewardItem(this._itemData.getReward)[0];
        var itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
        itemName.setPosition(itembg.x + itembg.width / 2 - itemName.width / 2, itembg.y + 42 - itemName.height / 2);
        this.addChild(itemName);
        var itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
        itemContainer.setPosition(itembg.x + itembg.width / 2 - itemContainer.width / 2, itembg.y + 58);
        this.addChild(itemContainer);
        if (this._itemData.discount) {
            var tag = BaseBitmap.create('shopview_corner');
            tag.setPosition(itemContainer.x, itemContainer.y);
            this.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('sweetgiftShopDiscount-' + this._aidAndCode.code, [String(this._itemData.discount * 10)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            var tagnum = 10 - this._itemData.discount * 10;
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                tagTxt.text = LanguageManager.getlocal('sweetgiftShopDiscount-' + this._aidAndCode.code, [(tagnum * 10).toString()]);
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
        var limitNum = this._itemData.limit - vo.getShopValue(this._itemData.id);
        if (limitNum < 0) {
            limitNum = 0;
        }
        var limitTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftExchangeNum", [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        limitTF.setPosition(itembg.x + itembg.width / 2 - limitTF.width / 2, itembg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        var needIconScale = 0.35;
        var needIcon = BaseLoadBitmap.create("itemicon1");
        needIcon.width = 100;
        needIcon.height = 100;
        needIcon.setScale(needIconScale);
        this.addChild(needIcon);
        var needTF = ComponentManager.getTextField(String(this._itemData.needGem), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        var offestWidth = itembg.width - needIcon.width * needIconScale - needTF.width;
        needIcon.setPosition(itembg.x + offestWidth / 2, itembg.y + 202 - needIcon.height / 2 * needIconScale);
        needTF.setPosition(needIcon.x + needIcon.width * needIconScale, needIcon.y + needIcon.height / 2 * needIconScale - needTF.height / 2);
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sweetgiftExchangeBtnName", function () {
            if (!vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("sweetgiftShopNotBuy"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < _this._itemData.needGem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            //判断是否有后羿
            var reward = "";
            if (data.getReward) {
                var rewardArr = data.getReward.split("_");
                if (rewardArr && rewardArr.length > 0) {
                    reward = rewardArr[1];
                }
            }
            if (reward && reward == "1052") {
                //弹提示框
                var servantData = Config.ServantCfg.getServantItemById(reward);
                var itemVo = GameData.formatRewardItem(servantData.exchange)[0];
                var msgStr = LanguageManager.getlocal("sweetgiftShopTipMsg-" + _this._aidAndCode.code, [servantData.name, itemVo.name, String(itemVo.num)]);
                if (Api.servantVoApi.getServantObj(reward) != null) {
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        title: "sweetgiftShopTipTitle-" + _this._aidAndCode.code,
                        msg: msgStr,
                        callback: function () {
                            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id) });
                        },
                        handler: _this,
                        needCancel: true,
                    });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id) });
                }
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id) });
            }
        }, this);
        shopBtn.setPosition(itembg.x + itembg.width / 2 - shopBtn.width / 2, itembg.y + itembg.height - 23 - shopBtn.height);
        this.addChild(shopBtn);
        if (limitNum <= 0) {
            shopBtn.setEnable(false);
        }
    };
    AcSweetGiftRewardTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSweetGiftRewardTab3ScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardTab3ScrollItem;
}(ScrollListItem));
__reflect(AcSweetGiftRewardTab3ScrollItem.prototype, "AcSweetGiftRewardTab3ScrollItem");
//# sourceMappingURL=AcSweetGiftRewardTab3ScrollItem.js.map