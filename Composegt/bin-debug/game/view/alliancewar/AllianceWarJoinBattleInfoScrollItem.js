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
 * 参加门客的信息
 * author 张朝阳
 * date 2018/10/15
 * @class AllianceWarJoinBattleInfoScrollItem
 */
var AllianceWarJoinBattleInfoScrollItem = (function (_super) {
    __extends(AllianceWarJoinBattleInfoScrollItem, _super);
    function AllianceWarJoinBattleInfoScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWarJoinBattleInfoScrollItem.prototype.initItem = function (index, data) {
        this.width = 514;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("public_up3");
        titleBg.width = bg.width - 5;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 5);
        this.addChild(titleBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPo" + data.po), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        // leftLine.anchorOffsetX = leftLine.width / 2;
        leftLine.anchorOffsetY = leftLine.height / 2;
        leftLine.setPosition(titleBg.x + titleBg.width / 2 - leftLine.width - 70, titleTxt.y + titleTxt.height / 2);
        this.addChild(leftLine);
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.anchorOffsetX = rightLine.width / 2;
        rightLine.anchorOffsetY = rightLine.height / 2;
        rightLine.rotation = 180;
        rightLine.setPosition(titleBg.x + titleBg.width / 2 + rightLine.width / 2 + 70, leftLine.y);
        this.addChild(rightLine);
        var addInfo = Config.AlliancewarCfg.getAddition(data.po);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoAdditionPo" + data.po, [String(addInfo.level), addInfo.addition]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        tipTxt.setPosition(titleBg.x + titleBg.width / 2 - tipTxt.width / 2, titleBg.x + titleBg.height + 12);
        this.addChild(tipTxt);
        var offsetHeight = 70;
        for (var i = 0; i < data.poList.length; i++) {
            var line = BaseBitmap.create("public_line1");
            line.setPosition(bg.x + bg.width / 2 - line.width / 2, i * offsetHeight + tipTxt.y + tipTxt.height + 5);
            this.addChild(line);
            var playerNameTxt = ComponentManager.getTextField(data.poList[i].name, 20, TextFieldConst.COLOR_BROWN);
            playerNameTxt.setPosition(bg.x + 45, line.y + line.height + 10);
            this.addChild(playerNameTxt);
            if (data.poList[i].stra) {
                var straTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarPlanType" + data.poList[i].stra), 20);
                straTxt.setPosition(playerNameTxt.x + playerNameTxt.width + 10, playerNameTxt.y);
                this.addChild(straTxt);
            }
            var servantNamrStr = Config.ServantCfg.getServantItemById(data.poList[i].servant).name;
            var servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", [servantNamrStr]), 20, TextFieldConst.COLOR_BROWN);
            servantNameTxt.setPosition(playerNameTxt.x, playerNameTxt.y + playerNameTxt.height + 10);
            this.addChild(servantNameTxt);
            var fightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight"), 20, TextFieldConst.COLOR_BROWN);
            fightTxt.setPosition(bg.x + bg.width - fightTxt.width - 150, servantNameTxt.y);
            this.addChild(fightTxt);
            var fightTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight2", [App.StringUtil.changeIntToText(Math.floor(data.poList[i].dps))]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            fightTxt2.setPosition(fightTxt.x + fightTxt.width, servantNameTxt.y);
            this.addChild(fightTxt2);
            if (String(Api.playerVoApi.getPlayerID()) == data.poList[i].id) {
                playerNameTxt.setColor(0xa87e00);
                servantNameTxt.setColor(0xa87e00);
                fightTxt.setColor(0xa87e00);
                fightTxt2.setColor(0xa87e00);
            }
            var titleAdd = Api.allianceWarVoApi.getAddTitle(data.poList[i].id);
            if (titleAdd) {
                var titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarTitleAdd", [String(titleAdd)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
                titelTxt.setPosition(fightTxt.x, playerNameTxt.y);
                this.addChild(titelTxt);
            }
        }
        bg.height += offsetHeight * data.poList.length + 30;
        this.height = bg.height;
    };
    AllianceWarJoinBattleInfoScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceWarJoinBattleInfoScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWarJoinBattleInfoScrollItem;
}(ScrollListItem));
__reflect(AllianceWarJoinBattleInfoScrollItem.prototype, "AllianceWarJoinBattleInfoScrollItem");
