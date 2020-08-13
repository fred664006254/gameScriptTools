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
var GrowGoldScrollItem = (function (_super) {
    __extends(GrowGoldScrollItem, _super);
    function GrowGoldScrollItem() {
        return _super.call(this) || this;
    }
    GrowGoldScrollItem.prototype.initItem = function (index, data) {
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.scaleX = 483 / 510;
        this.addChild(bg);
        var bottom2 = BaseBitmap.create("shopview_itemtitle");
        bottom2.x = bg.x;
        bottom2.y = 5;
        this.addChild(bottom2);
        var taskstr = LanguageManager.getlocal("growGold_leve_needlv", [LanguageManager.getlocal("officialTitle" + data.needLv)]);
        var taskTxt = ComponentManager.getTextField(taskstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.x = bottom2.x + 10;
        taskTxt.y = bottom2.y + bottom2.height / 2 - taskTxt.height / 2;
        this.addChild(taskTxt);
        bottom2.width = taskTxt.width + 55;
        var str = data.getReward;
        var iconList = GameData.getRewardItemIcons(str, true);
        var line = Math.ceil((iconList.length - 1) / 4);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = 453;
        rewardBg.height = 100;
        rewardBg.x = bg.x + 15;
        rewardBg.y = 45;
        this.addChild(rewardBg);
        for (var i = 0; i < iconList.length; i++) {
            var icon = iconList[i];
            icon.setScale(0.73);
            icon.setPosition(25 + i * (icon.width * icon.scaleX + 9), rewardBg.y + 8 + Math.floor(i / 5) * 79);
            this.addChild(icon);
        }
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.width = 240;
        nameBg.x = 5;
        nameBg.y = rewardBg.y + rewardBg.height + 16;
        this.addChild(nameBg);
        bg.height = nameBg.y + 53;
        var needstr = LanguageManager.getlocal("growGold_leve_need", [Api.playerVoApi.getPlayerOffice(), LanguageManager.getlocal("officialTitle" + data.needLv)]);
        var nameTF = ComponentManager.getTextField(needstr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.x = nameBg.x + 15;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2 + 1;
        this.addChild(nameTF);
        nameBg.width = nameTF.width + 55;
        if (Api.shopVoApi.ifBuyGrowGold()) {
            if (Api.shopVoApi.isGotGrowGoldReward(data.id)) {
                var collectFlag = BaseBitmap.create("collectflag");
                collectFlag.setScale(0.7);
                collectFlag.setPosition(345, rewardBg.y + rewardBg.height - 20);
                this.addChild(collectFlag);
            }
            else {
                var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    NetManager.request(NetRequestConst.REQUEST_SHOP_GETGROWGOLD, { rkey: data.id });
                }, this);
                btn.setPosition(322, rewardBg.y + rewardBg.height + 7);
                this.addChild(btn);
                if (Api.playerVoApi.getPlayerLevel() < data.needLv) {
                    btn.setEnable(false);
                }
            }
        }
        else {
            var needstr_1 = LanguageManager.getlocal("growGold_notbuy");
            var notbuytext = ComponentManager.getTextField(needstr_1, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
            notbuytext.setPosition(460 - notbuytext.width, rewardBg.y + rewardBg.height + 20);
            this.addChild(notbuytext);
        }
    };
    return GrowGoldScrollItem;
}(ScrollListItem));
__reflect(GrowGoldScrollItem.prototype, "GrowGoldScrollItem");
//# sourceMappingURL=GrowGoldScrollItem.js.map