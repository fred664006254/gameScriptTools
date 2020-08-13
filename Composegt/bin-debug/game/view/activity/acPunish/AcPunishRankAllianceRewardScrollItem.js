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
 * @class AcPunishRankAllianceRewardScrollItem
 */
var AcPunishRankAllianceRewardScrollItem = (function (_super) {
    __extends(AcPunishRankAllianceRewardScrollItem, _super);
    function AcPunishRankAllianceRewardScrollItem() {
        return _super.call(this) || this;
    }
    AcPunishRankAllianceRewardScrollItem.prototype.initItem = function (index, data) {
        // let cfg = data
        this._cfgData = data;
        this._itemIndex = index;
        this.width = 520;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        bg.height = 142;
        this.addChild(bg);
        // this.height = 106 + this.getSpaceY();
        var itemBg2 = BaseBitmap.create("public_up3");
        itemBg2.width = this.width - 10;
        itemBg2.height = 30;
        itemBg2.x = 5;
        itemBg2.y = 4;
        // itemBg2.height = 218;
        this.addChild(itemBg2);
        // let line1 = BaseBitmap.create("public_line3");
        // line1.width = 480;
        // line1.x = this.width/2 - line1.width/2;
        // line1.y = 10;
        // this.addChild(line1);
        var key = data.rank[0];
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        if (Number(key) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + key);
        }
        else {
            txt.text = txt.text = LanguageManager.getlocal("acRank_rank5", [String(data.rank[0]), String(data.rank[1])]);
        }
        txt.x = this.width / 2 - txt.width / 2;
        txt.y = 7;
        this.addChild(txt);
        var rank1TF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_masterget1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rank1TF.x = 10;
        rank1TF.y = 80;
        this.addChild(rank1TF);
        var rewardList = GameData.formatRewardItem(data.reward1);
        // let rewardList = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");
        var container = new BaseDisplayObjectContainer();
        if (rewardList) {
            var temX = 0;
            var temScale = 0.85;
            for (var i = 0; i < rewardList.length; i++) {
                var icon = GameData.getItemIcon(rewardList[i], true, true);
                var num = i % 4;
                icon.x = 110 + 7 * (num + 1) + icon.width * temScale * num;
                icon.y = (icon.height + 5) * (Math.floor((i) / 4));
                icon.scaleX = icon.scaleY = temScale;
                container.addChild(icon);
            }
        }
        this.addChild(container);
        container.y = 50;
        container.height = container.height * 0.85;
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.x = this.width / 2 - lineSp.width / 2;
        lineSp.y = container.y + container.height + 5;
        this.addChild(lineSp);
        var rank2TF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_memberget"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rank2TF.x = 10;
        rank2TF.y = container.y + container.height + 60;
        this.addChild(rank2TF);
        var rewardList2 = GameData.formatRewardItem(data.reward2);
        // let rewardList2 = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");
        var container2 = new BaseDisplayObjectContainer();
        if (rewardList2) {
            var temX = 0;
            var temScale = 0.85;
            for (var i = 0; i < rewardList2.length; i++) {
                var icon = GameData.getItemIcon(rewardList2[i], true, true);
                var num = i % 4;
                icon.x = 110 + 7 * (num + 1) + icon.width * temScale * num;
                icon.y = (icon.height + 5) * (Math.floor((i) / 4));
                icon.scaleX = icon.scaleY = temScale;
                container2.addChild(icon);
            }
        }
        this.addChild(container2);
        container2.y = lineSp.y + lineSp.height + 10;
        container2.height = container2.height * 0.85;
        bg.height = this.height + 30;
    };
    AcPunishRankAllianceRewardScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcPunishRankAllianceRewardScrollItem.prototype.dispose = function () {
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
    return AcPunishRankAllianceRewardScrollItem;
}(ScrollListItem));
__reflect(AcPunishRankAllianceRewardScrollItem.prototype, "AcPunishRankAllianceRewardScrollItem");
