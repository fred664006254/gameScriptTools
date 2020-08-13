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
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
var ItemInfoExtendPopupView = (function (_super) {
    __extends(ItemInfoExtendPopupView, _super);
    function ItemInfoExtendPopupView() {
        var _this = _super.call(this) || this;
        _this.itemTxt = null;
        return _this;
    }
    Object.defineProperty(ItemInfoExtendPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ItemInfoExtendPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ItemInfoExtendPopupView.prototype.initView = function () {
        var moveY = 0;
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = 520;
        bg.height = 565;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 55;
        this.addChildToContainer(bg);
        // 随机获得的物品
        var itemId = 0;
        var _id = Number(this.param.data);
        var _id2 = Number(this.param.data.id);
        itemId = _id2;
        if (!_id2) {
            itemId = _id;
        }
        this.itemTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.addChildToContainer(this.itemTxt);
        this.itemTxt.visible = false;
        this.itemTxt.textColor = TextFieldConst.COLOR_BROWN;
        var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        this.titleTF.text = itemCfg.name;
        var reward = "";
        if (itemCfg.dropId && itemCfg.dropId[0]) {
            var itemDropid = itemCfg.dropId[0];
            var cfg = Config.ItemdropCfg.getItemCfgById(itemDropid);
            for (var key in cfg) {
                if (Number(key) >= 0) {
                    if (cfg[key] && cfg[key][0]) {
                        var rewar1 = cfg[key][0];
                        // rewar1 = rewar1.substring(0,rewar1.length-1);
                        // var preward = rewar1+cfg[key][1];
                        reward = reward.concat(rewar1 + "|");
                    }
                }
            }
            reward = reward.substring(0, reward.length - 1);
            this.itemTxt.visible = true;
            moveY = 20;
        }
        else if (itemCfg.getRewards) {
            reward = itemCfg.getRewards;
            this.itemTxt.visible = false;
            moveY = 20;
            bg.y = 53;
        }
        else if (itemCfg.chooseRewards) {
            reward = itemCfg.chooseRewards;
            this.itemTxt.visible = true;
            moveY = 20;
            bg.y = 53;
        }
        var rewardVoArr = GameData.formatRewardItem(reward);
        this.itemTxt.text = LanguageManager.getlocal(itemCfg.chooseRewards ? "itemchoose" : "itemprobability", [itemCfg.chooseRewards ? rewardVoArr[0].itemType : LanguageManager.getlocal("itemType6")]);
        if (itemCfg.chooseRewards && rewardVoArr[0].itemType != rewardVoArr[1].itemType) {
            this.itemTxt.text = LanguageManager.getlocal(itemCfg.chooseRewards ? "itemchoose" : "itemprobability", [LanguageManager.getlocal("itemType6")]);
        }
        this.itemTxt.x = bg.x + (bg.width - this.itemTxt.textWidth) * 0.5;
        this.itemTxt.y = 22;
        // this.itemTxt.x = bg.x;
        var itemContainer = new BaseDisplayObjectContainer();
        var l = rewardVoArr.length;
        var scaleNum = 0.85;
        var newnum = 0;
        for (var i = 0; i < l; i++) {
            var icon = GameData.getItemIcon(rewardVoArr[i], false, false, false);
            var num = i % 5;
            icon.setPosition((icon.width - 12) * num, (icon.height - 5) * Math.floor(i / 5));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            itemContainer.addChild(icon);
        }
        itemContainer.setPosition(bg.x + (bg.width - itemContainer.width) / 2, 60 + moveY);
        this.addChildToContainer(itemContainer);
        bg.height = itemContainer.y + itemContainer.height + 6 - 35;
    };
    ItemInfoExtendPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ItemInfoExtendPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ItemInfoExtendPopupView.prototype.dispose = function () {
        this.itemTxt = null;
        _super.prototype.dispose.call(this);
    };
    return ItemInfoExtendPopupView;
}(PopupView));
__reflect(ItemInfoExtendPopupView.prototype, "ItemInfoExtendPopupView");
//# sourceMappingURL=ItemInfoExtendPopupView.js.map