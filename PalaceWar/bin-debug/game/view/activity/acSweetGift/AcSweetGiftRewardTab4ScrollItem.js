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
  * 月夜仙缘充值奖励item
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab4ScrollItem
  */
var AcSweetGiftRewardTab4ScrollItem = (function (_super) {
    __extends(AcSweetGiftRewardTab4ScrollItem, _super);
    function AcSweetGiftRewardTab4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcSweetGiftRewardTab4ScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("countrywarrewardview_itembg");
        titleBg.width = itembg.width;
        titleBg.y = 6;
        titleBg.x = 0;
        this.addChild(titleBg);
        var itemName = LanguageManager.getlocal("itemName_" + data.itemID);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftCakeRewardTitle-" + this._aidAndCode.code + "_" + (index + 1), [itemName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = vo.getMoonCakeRewardsByItemId(data.itemID);
        App.LogUtil.log("AcSweetGiftRewardTab4ScrollItem rewards: " + rewards);
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 5;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH - 20;
        this.height = itembg.height;
    };
    AcSweetGiftRewardTab4ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSweetGiftRewardTab4ScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardTab4ScrollItem;
}(ScrollListItem));
__reflect(AcSweetGiftRewardTab4ScrollItem.prototype, "AcSweetGiftRewardTab4ScrollItem");
//# sourceMappingURL=AcSweetGiftRewardTab4ScrollItem.js.map