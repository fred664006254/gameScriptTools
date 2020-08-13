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
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameRewardScrollItem
  */
var AcArcadeGameRewardScrollItem = (function (_super) {
    __extends(AcArcadeGameRewardScrollItem, _super);
    function AcArcadeGameRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcArcadeGameRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 520;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 520;
        titleBg.height = 33;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
        this.addChild(titleBg);
        var tilteTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardScrollItemTitle" + this._itemData.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tilteTF.setPosition(titleBg.x + titleBg.width / 2 - tilteTF.width / 2, titleBg.y + titleBg.height / 2 - tilteTF.height / 2);
        this.addChild(tilteTF);
        var rewards = this._itemData.rewardPoolList();
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 1;
        var itemHeight = 0;
        var num = 4;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(titleBg.x + (i % num) * (rewardDB.width * rewardScale + 20) + 15, titleBg.y + titleBg.height + Math.floor(i / num) * (rewardDB.height * rewardScale + 20) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % num == 0 ? rewardVoList.length / num : Math.floor(rewardVoList.length / num) + 1) * itemHeight;
        this.height = titleBg.height + offsetH + 15 + 5;
        bg.height = this.height;
    };
    AcArcadeGameRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcadeGameRewardScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameRewardScrollItem;
}(ScrollListItem));
__reflect(AcArcadeGameRewardScrollItem.prototype, "AcArcadeGameRewardScrollItem");
//# sourceMappingURL=AcArcadeGameRewardScrollItem.js.map