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
 * 	投壶活动奖励展示item
 * author 张朝阳
 * date 2019/4/4
 * @class AcThrowArrowRewardScrollItem
 */
var AcThrowArrowRewardScrollItem = (function (_super) {
    __extends(AcThrowArrowRewardScrollItem, _super);
    function AcThrowArrowRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this.rkey = null;
        _this.rankList = null;
        _this._data = null;
        _this._isRequest = false;
        return _this;
    }
    AcThrowArrowRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this.width = 520;
        this.height = 260;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        itembg.height = 260;
        this.addChild(itembg);
        var titleBg = BaseLoadBitmap.create("acwealthcarpview_common_txtbg");
        titleBg.width = 358;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + 165, itembg.y + 15);
        this.addChild(titleBg);
        var uiCode = itemParam.code;
        if (itemParam.code == "2") {
            uiCode = "1";
        }
        else if (itemParam.code == "4") {
            uiCode = "3";
        }
        if (uiCode == "3") {
            var namekey = "acThrowArrow_awardname_" + (itemParam.length - data.id + 1) + "-" + uiCode;
            var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(namekey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTF, titleBg);
            this.addChild(titleTF);
            var itemTopLine = BaseBitmap.create("acwealthcarpview_common_line");
            itemTopLine.width += titleTF.width;
            itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
            this.addChild(itemTopLine);
        }
        else {
            var title_1 = BaseLoadBitmap.create("acthrowarrowview_itemtitle_" + data.id + "-" + uiCode, null, {
                callback: function () {
                    var scale = 0.55;
                    title_1.anchorOffsetX = title_1.width / 2;
                    title_1.anchorOffsetY = title_1.height / 2;
                    title_1.setScale(scale);
                    title_1.setPosition(titleBg.x + titleBg.width / 2, titleBg.y + titleBg.height / 2);
                    var itemTopLine = BaseBitmap.create("acwealthcarpview_common_line");
                    itemTopLine.width += title_1.width * scale;
                    itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
                    _this.addChild(itemTopLine);
                }, callbackThisObj: this, callbackParams: null
            });
            this.addChild(title_1);
        }
        var bgname;
        if (uiCode == "3") {
            bgname = "acthrowarrowview_itembg_rewardbg";
        }
        else {
            bgname = "acthrowarrowview_itembg_rewardbg_" + data.id + "-" + uiCode;
        }
        var leftbg = BaseLoadBitmap.create(bgname);
        leftbg.width = 178;
        leftbg.height = 232;
        leftbg.setPosition(itembg.x + 10, itembg.y + itembg.height / 2 - leftbg.height / 2);
        this.addChild(leftbg);
        if (uiCode == "3") {
            var heartname = "acthrowarrow_redheart" + (itemParam.length - data.id + 1) + "-" + uiCode;
            var heart = BaseBitmap.create(heartname);
            heart.setScale(0.685);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, heart, leftbg);
            this.addChild(heart);
        }
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 300;
        rewardbg.height = 190;
        rewardbg.setPosition(leftbg.x + leftbg.width + 13, titleBg.y + titleBg.height + 5);
        this.addChild(rewardbg);
        var rewards = "";
        for (var key in data.prizePool) {
            rewards += data.prizePool[key][0] + "|";
        }
        var rewardVoList = GameData.formatRewardItem(rewards.substring(0, rewards.length - 1));
        var rewardScale = 0.8;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardbg.x + (i % 3) * (rewardDB.width * rewardScale + 10) + 12, rewardbg.y + Math.floor(i / 3) * (rewardDB.height * rewardScale + 5) + 5);
            this.addChild(rewardDB);
        }
    };
    AcThrowArrowRewardScrollItem.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this.rkey = null;
        this.rankList = null;
        this._data = null;
        this._isRequest = false;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRewardScrollItem;
}(ScrollListItem));
__reflect(AcThrowArrowRewardScrollItem.prototype, "AcThrowArrowRewardScrollItem");
//# sourceMappingURL=AcThrowArrowRewardScrollItem.js.map