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
 * 惩戒女囚Item
 * author dky
 * date 2017/11/22
 * @class AcPunishRankRewardScrollItem
 */
var AcPunishRankRewardScrollItem = (function (_super) {
    __extends(AcPunishRankRewardScrollItem, _super);
    function AcPunishRankRewardScrollItem() {
        return _super.call(this) || this;
    }
    AcPunishRankRewardScrollItem.prototype.initItem = function (index, data) {
        // let cfg = data
        this._cfgData = data;
        this._itemIndex = index;
        this.width = 508;
        // this.height = 106 + this.getSpaceY();
        var key = data.rank[0];
        var rewardList = GameData.formatRewardItem(data.reward);
        if (rewardList) {
            var temX = 0;
            var temScale = 0.85;
            for (var i = 0; i < rewardList.length; i++) {
                var icon = GameData.getItemIcon(rewardList[i], true, true);
                // icon.x = 110 + 7*(i + 1) + icon.width*temScale*i;
                var num = i % 4;
                icon.x = 110 + 7 * (num + 1) + icon.width * temScale * num;
                // icon.y = this.height/2 - icon.height/2;
                icon.y = (icon.height + 5) * (Math.floor((i) / 4)) + 15;
                if (rewardList.length <= 4) {
                    icon.y = (icon.height + 5) * (Math.floor((i) / 4)) + 25;
                }
                icon.scaleX = icon.scaleY = temScale;
                this.addChild(icon);
            }
        }
        this.height = this.height * 0.85;
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (Number(key) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + key);
        }
        else {
            txt.text = txt.text = LanguageManager.getlocal("acRank_rank5", [String(data.rank[0]), String(data.rank[1])]);
        }
        txt.x = 20;
        if (PlatformManager.checkIsTextHorizontal()) {
            txt.x = 0;
        }
        txt.y = this.height / 2 - txt.height / 2 - 7;
        if (rewardList.length <= 4) {
            txt.y = txt.y + 10;
        }
        this.addChild(txt);
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.x = this.width / 2 - lineSp.width / 2;
        lineSp.y = this.height + 0;
        this.addChild(lineSp);
    };
    AcPunishRankRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcPunishRankRewardScrollItem.prototype.dispose = function () {
        // this._numTF = null;
        this._itemIndex = null;
        this._key = null;
        this._wifeInfoVo = null;
        //属性1
        this._att1TF = null;
        //属性2
        this._att2TF = null;
        //属性3
        this._att3TF = null;
        this._skillLevelTF = null;
        this._updBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishRankRewardScrollItem;
}(ScrollListItem));
__reflect(AcPunishRankRewardScrollItem.prototype, "AcPunishRankRewardScrollItem");
//# sourceMappingURL=AcPunishRankRewardScrollItem.js.map