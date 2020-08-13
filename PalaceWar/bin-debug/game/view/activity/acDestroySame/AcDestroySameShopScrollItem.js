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
  * 商店item
  * author 张朝阳
  * date 2019/7/16
  * @class AcMotherDayActivityRewardShopScrollItem
  */
var AcDestroySameShopScrollItem = (function (_super) {
    __extends(AcDestroySameShopScrollItem, _super);
    function AcDestroySameShopScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcDestroySameShopScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        this.width = 172;
        this.height = 287;
        var itembg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        if (index == 0) {
            itembg.setload("acmotherdayview_common_itemredbg");
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
        var limitNum = this._itemData.limit - vo.getShopValue(this._itemData.id);
        var limitTF = ComponentManager.getTextField(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemLimit-3", [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        limitTF.setPosition(itembg.x + itembg.width / 2 - limitTF.width / 2, itembg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        var needPartVo = GameData.formatRewardItem(this._itemData.cost)[0];
        var needIconScale = 0.35;
        var needIcon = BaseLoadBitmap.create("itemicon" + needPartVo.id);
        needIcon.width = 100;
        needIcon.height = 100;
        needIcon.setScale(needIconScale);
        this.addChild(needIcon);
        var needTF = ComponentManager.getTextField(String(needPartVo.num), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        var offestWidth = itembg.width - needIcon.width * needIconScale - needTF.width;
        needIcon.setPosition(itembg.x + offestWidth / 2, itembg.y + 202 - needIcon.height / 2 * needIconScale);
        needTF.setPosition(needIcon.x + needIcon.width * needIconScale, needIcon.y + needIcon.height / 2 * needIconScale - needTF.height / 2);
        var shopBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acMotherDayActivityRewardShopScrollItemshop-3", function () {
            if ((!vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var limitNum = _this._itemData.limit - vo.getShopValue(_this._itemData.id);
            if (limitNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
                return;
            }
            if (needPartVo.type == 1) {
                if (Api.playerVoApi.getPlayerGem() < needPartVo.num) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                    return;
                }
            }
            else {
                if (Api.itemVoApi.getItemNumInfoVoById(needPartVo.id) < needPartVo.num) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemNotEnoughItem-3"));
                    return;
                }
            }
            vo.lastpos = shopBtn.localToGlobal(shopBtn.width / 2 + 50, 20);
            NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_SHOPBUY, {
                activeId: vo.aidAndCode,
                rkey: Number(data.id)
            });
        }, this);
        shopBtn.setPosition(itembg.x + itembg.width / 2 - shopBtn.width / 2, itembg.y + itembg.height - 23 - shopBtn.height);
        this.addChild(shopBtn);
        if (limitNum <= 0) {
            shopBtn.setGray(true);
        }
    };
    AcDestroySameShopScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDestroySameShopScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameShopScrollItem;
}(ScrollListItem));
__reflect(AcDestroySameShopScrollItem.prototype, "AcDestroySameShopScrollItem");
//# sourceMappingURL=AcDestroySameShopScrollItem.js.map