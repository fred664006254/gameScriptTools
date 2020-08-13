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
 * 奖励item
 * author qianjun
 * date 2017/11/22
 * @class AcPunishRankRewardScrollItem
 */
var AcMayDayRankRewardScrollItem = (function (_super) {
    __extends(AcMayDayRankRewardScrollItem, _super);
    function AcMayDayRankRewardScrollItem() {
        return _super.call(this) || this;
    }
    AcMayDayRankRewardScrollItem.prototype.initItem = function (index, data) {
        // let cfg = data
        this._cfgData = data;
        this._itemIndex = index;
        this.width = 520;
        // this.height = 106 + this.getSpaceY();
        var key = data.rank[0];
        var rewardList = GameData.formatRewardItem(data.getReward);
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        this.addChild(bg);
        if (rewardList) {
            var temX = 0;
            var temScale = 0.85;
            for (var i = 0; i < rewardList.length; i++) {
                var icon = GameData.getItemIcon(rewardList[i], true, true);
                // icon.x = 110 + 7*(i + 1) + icon.width*temScale*i;
                var num = i % 4;
                icon.x = 110 + 7 * (num + 1) + icon.width * temScale * num;
                // icon.y = this.height/2 - icon.height/2;
                icon.y = (icon.height) * (Math.floor((i) / 4)) + 15;
                if (rewardList.length <= 4) {
                    icon.y = (icon.height) * (Math.floor((i) / 4)) + 15;
                }
                icon.scaleX = icon.scaleY = temScale;
                this.addChild(icon);
            }
        }
        bg.height = this.height + 5;
        this.height = this.height - 5;
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        if (Number(key) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + key);
        }
        else {
            txt.text = txt.text = LanguageManager.getlocal("acRank_rank5", [String(data.rank[0]), String(data.rank[1])]);
        }
        txt.x = 20;
        txt.y = this.height / 2 - txt.height / 2 - 7;
        if (rewardList.length <= 4) {
            txt.y = txt.y + 10;
        }
        this.addChild(txt);
        // let lineSp = BaseBitmap.create("public_line1");
        // lineSp.x = this.width/2 - lineSp.width/2;
        // lineSp.y = this.height + 0;
        // this.addChild(lineSp);
    };
    AcMayDayRankRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMayDayRankRewardScrollItem.prototype.dispose = function () {
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
    return AcMayDayRankRewardScrollItem;
}(ScrollListItem));
__reflect(AcMayDayRankRewardScrollItem.prototype, "AcMayDayRankRewardScrollItem");
