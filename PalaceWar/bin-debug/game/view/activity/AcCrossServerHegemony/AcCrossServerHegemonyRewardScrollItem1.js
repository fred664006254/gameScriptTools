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
 *
 * author jiangly
 * date 2020/1/8
 * @class AcCrossServerHegemonyRewardScrollItem
 */
var AcCrossServerHegemonyRewardScrollItem1 = (function (_super) {
    __extends(AcCrossServerHegemonyRewardScrollItem1, _super);
    function AcCrossServerHegemonyRewardScrollItem1() {
        return _super.call(this) || this;
    }
    AcCrossServerHegemonyRewardScrollItem1.prototype.initItem = function (index, data) {
        this.width = 610;
        var master = data.master;
        var member = data.member;
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.width = 600;
        // bg.height = 170;
        bg.x = 5;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        //第几名
        var titleTF = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (index < 3) {
            titleTF.text = LanguageManager.getlocal("acCrossServerHegemonyRewardJJRank" + (index + 1));
        }
        else if (master.rank[0] == master.rank[1]) {
            titleTF.text = LanguageManager.getlocal("acCrossServerHegemonyRewardJJRank6", [String(master.rank[0])]);
        }
        else {
            titleTF.text = LanguageManager.getlocal("acCrossServerHegemonyRewardJJRank4", [String(master.rank[0]), String(master.rank[1])]);
        }
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2 + 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += (titleTF.width + 40);
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var masterBg = BaseBitmap.create("public_9_bg95");
        masterBg.width = 300;
        masterBg.x = this.width / 2 - masterBg.width / 2;
        masterBg.y = 73 - masterBg.height / 2 + 7;
        this.addChild(masterBg);
        var masterTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardMasterGet"), 24, TextFieldConst.COLOR_BROWN);
        masterTxt.x = masterBg.x + masterBg.width / 2 - masterTxt.width / 2;
        masterTxt.y = masterBg.y + masterBg.height / 2 - masterTxt.height / 2;
        this.addChild(masterTxt);
        ///帮助奖励
        var startY1 = masterBg.y + masterBg.height + 17;
        var spaceW = 10;
        var spaceH = 10;
        var startX = this.width / 2 - (106 * 5 + spaceW * 4) / 2;
        var rewardStr = master.getReward;
        if (master.assetReward) {
            rewardStr = master.getReward + "|" + "1048_0_" + master.assetReward + "_1";
        }
        var masterRewardIcons = GameData.getRewardItemIcons(rewardStr, true, true); //master.getReward
        var masterRewardBg = BaseBitmap.create("public_scrolllistbg");
        masterRewardBg.width = bg.width - 20;
        this.addChild(masterRewardBg);
        masterRewardBg.height = Math.ceil(masterRewardIcons.length / 5) * (106 + spaceH) + 6;
        masterRewardBg.setPosition(bg.x + bg.width / 2 - masterRewardBg.width / 2, startY1 - 8);
        var lastY = 0;
        for (var i = 0; i < masterRewardIcons.length; i++) {
            var icon = masterRewardIcons[i];
            icon.x = startX + (106 + spaceW) * (i % 5);
            icon.y = startY1 + (106 + spaceH) * Math.floor(i / 5);
            this.addChild(icon);
            lastY = icon.y + 106;
        }
        var memberBg = BaseBitmap.create("public_9_bg95");
        memberBg.width = 300;
        memberBg.x = this.width / 2 - memberBg.width / 2;
        memberBg.y = lastY + 17;
        this.addChild(memberBg);
        var memberTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardMemberGet"), 24, TextFieldConst.COLOR_BROWN);
        memberTxt.x = memberBg.x + memberBg.width / 2 - memberTxt.width / 2;
        memberTxt.y = memberBg.y + memberBg.height / 2 - memberTxt.height / 2;
        this.addChild(memberTxt);
        var startY2 = memberBg.y + memberBg.height + 17;
        var memberRewardIcons = GameData.getRewardItemIcons(member.getReward, true, true); //master.getReward
        var memberRewardBg = BaseBitmap.create("public_scrolllistbg");
        memberRewardBg.width = bg.width - 20;
        this.addChild(memberRewardBg);
        memberRewardBg.height = Math.ceil(memberRewardIcons.length / 5) * (106 + spaceH) + 6;
        memberRewardBg.setPosition(bg.x + bg.width / 2 - memberRewardBg.width / 2, startY2 - 8);
        for (var i = 0; i < memberRewardIcons.length; i++) {
            var icon = memberRewardIcons[i];
            icon.x = startX + (106 + spaceW) * (i % 5);
            icon.y = startY2 + (106 + spaceH) * Math.floor(i / 5);
            this.addChild(icon);
            lastY = icon.y + 106;
        }
        bg.height = lastY + 20; //15
    };
    AcCrossServerHegemonyRewardScrollItem1.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerHegemonyRewardScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyRewardScrollItem1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRewardScrollItem1;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyRewardScrollItem1.prototype, "AcCrossServerHegemonyRewardScrollItem1");
//# sourceMappingURL=AcCrossServerHegemonyRewardScrollItem1.js.map