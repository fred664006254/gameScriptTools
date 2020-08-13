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
 * 金蛋赠礼活动详情tab2Item
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab2ScrollItem
 */
var AcSmashEggDetailPopupViewTab2ScrollItem = (function (_super) {
    __extends(AcSmashEggDetailPopupViewTab2ScrollItem, _super);
    function AcSmashEggDetailPopupViewTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcSmashEggDetailPopupViewTab2ScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._aidAndCode = itemParam;
        var rewards = data;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("countrywarrewardview_itembg");
        titleBg.width = itembg.width;
        titleBg.height = 38;
        titleBg.y = 8;
        titleBg.x = 0;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggRewardTitle" + (index + 1) + '-' + this._aidAndCode.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var titleTipTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggRewardTitleTip" + (index + 1) + '-' + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTipTF.setPosition(titleBg.x + titleBg.width / 2 - titleTipTF.width / 2, titleBg.y + titleBg.height + titleTipTF.height / 2);
        this.addChild(titleTipTF);
        App.LogUtil.log("AcSweetGiftRewardTab4ScrollItem rewards: " + rewards);
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleTipTF.y + titleTipTF.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH;
        this.height = itembg.height;
    };
    AcSmashEggDetailPopupViewTab2ScrollItem.prototype.getSpaceY = function () {
        return 30;
    };
    AcSmashEggDetailPopupViewTab2ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupViewTab2ScrollItem;
}(ScrollListItem));
__reflect(AcSmashEggDetailPopupViewTab2ScrollItem.prototype, "AcSmashEggDetailPopupViewTab2ScrollItem");
//# sourceMappingURL=AcSmashEggDetailPopupViewTab2ScrollItem.js.map