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
  * 锦鲤奖励item
  * author 张朝阳
  * date 2019/2/12
  * @class AcLuckyCarpRewardScrollItem
  */
var AcLuckyCarpRewardScrollItem = (function (_super) {
    __extends(AcLuckyCarpRewardScrollItem, _super);
    function AcLuckyCarpRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._itemParm = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcLuckyCarpRewardScrollItem.prototype.initItem = function (index, data, itemParm) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 610;
        bg.height = 215;
        this.addChild(bg);
        if (index == 0 || (index + 1) == cfg.flag) {
            var titlebg = BaseLoadBitmap.create("acluckycarpitemtitilebg");
            titlebg.height = 49;
            titlebg.width = 612;
            this.addChild(titlebg);
            var titleStr = null;
            if (index == 0) {
                titleStr = LanguageManager.getlocal("acLuckyCarpViewItemTitle1-" + itemParm.code);
            }
            else {
                titleStr = LanguageManager.getlocal("acLuckyCarpViewItemTitle2-" + itemParm.code);
            }
            var titleTF = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            titleTF.setPosition(titlebg.x + titlebg.width / 2 - titleTF.width / 2, titlebg.y - titleTF.height / 2 + 22);
            this.addChild(titleTF);
            bg.setPosition(1, 48);
        }
        else {
            bg.setPosition(1, 0);
        }
        var titlebg2 = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titlebg2.width = 600;
        titlebg2.height = 35;
        titlebg2.setPosition(bg.x + bg.width / 2 - titlebg2.width / 2, bg.y + 7);
        this.addChild(titlebg2);
        var titleTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewItemTitleDesc" + String(index + 1) + "-" + +itemParm.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF2.setPosition(titlebg2.x + titlebg2.width / 2 - titleTF2.width / 2, titlebg2.y + titlebg2.height / 2 - titleTF2.height / 2);
        this.addChild(titleTF2);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF2.width;
        itemTopLine.setPosition(titlebg2.x + titlebg2.width / 2 - itemTopLine.width / 2, titlebg2.y + titlebg2.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var npcBg = BaseBitmap.create("acluckycarpitembg");
        npcBg.setPosition(bg.x + 15, titlebg2.y + titlebg2.height + 5);
        this.addChild(npcBg);
        var npc = BaseLoadBitmap.create(data.picShowoff);
        var scale = 0;
        if (data.type == 1 || data.type == 3) {
            scale = 0.75;
            npc.width = 205;
            npc.height = 196;
        }
        else if (data.type == 2) {
            scale = 0.8;
            npc.width = 180;
            npc.height = 177;
        }
        npc.setScale(scale);
        npc.setPosition(npcBg.x + npcBg.width / 2 - npc.width * scale / 2, npcBg.y + npcBg.height - npc.height * scale);
        this.addChild(npc);
        var tipBM = BaseBitmap.create("acluckycarpitemreach");
        tipBM.setPosition(npcBg.x, npcBg.y - 2);
        this.addChild(tipBM);
        var rewardVo = GameData.formatRewardItem(data.getReward);
        for (var i = 0; i < rewardVo.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
            rewardDB.setScale(0.85);
            rewardDB.setPosition(npcBg.x + npcBg.width + 10 + i * (rewardDB.width * 0.85 + 10), npcBg.y + npcBg.height / 2 - rewardDB.height / 2);
            this.addChild(rewardDB);
        }
        if (data.unlockValue > 0) {
            bg.height = 245;
            var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 580);
            progress.setPosition(bg.x + bg.width / 2 - progress.width / 2, npcBg.y + npcBg.height + 2);
            this.addChild(progress);
            progress.setTextSize(17);
            progress.setText(LanguageManager.getlocal("acLuckyCarpViewItemProgress-" + itemParm.code, [String(itemParm.handleDate.totalCharge), String(data.unlockValue)]));
            progress.setPercentage(itemParm.handleDate.totalCharge / data.unlockValue);
            if (itemParm.handleDate.totalCharge < data.unlockValue) {
                tipBM.setRes("acluckycarpitemunreach");
                titlebg2.setload("acluckycarpview_titlebg");
            }
        }
        if (index == (cfg.flag - 2)) {
            this.height += 25;
        }
    };
    AcLuckyCarpRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLuckyCarpRewardScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._itemParm = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyCarpRewardScrollItem;
}(ScrollListItem));
__reflect(AcLuckyCarpRewardScrollItem.prototype, "AcLuckyCarpRewardScrollItem");
//# sourceMappingURL=AcLuckyCarpRewardScrollItem.js.map