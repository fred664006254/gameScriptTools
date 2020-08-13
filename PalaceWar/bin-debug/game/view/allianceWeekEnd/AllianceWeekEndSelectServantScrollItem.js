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
  * 勤王除恶选择门客Item
  * @author 张朝阳
  * date 2019/4/17
 * @class AllianceWeekEndSelectServantScrollItem
 */
var AllianceWeekEndSelectServantScrollItem = (function (_super) {
    __extends(AllianceWeekEndSelectServantScrollItem, _super);
    function AllianceWeekEndSelectServantScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWeekEndSelectServantScrollItem.prototype.initItem = function (index, data) {
        var _this = this;
        var servantInfoVo = data.servantInfoVo;
        var bg = BaseBitmap.create("public_9_bg1");
        bg.width = 500;
        bg.height = 120;
        this.addChild(bg);
        var temW = 100;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
        iconBgBt.x = 10;
        iconBgBt.y = 10;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        if (servantInfoVo.isServantExile()) {
            var exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setScale(iconBgBt.scaleX);
            exileBM.setPosition(iconBgBt.x + 194 * iconBgBt.scaleX - exileBM.width * iconBgBt.scaleX, iconBgBt.y);
            this.addChild(exileBM);
        }
        var nameTF = ComponentManager.getTextField(servantInfoVo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        nameTF.x = 120;
        nameTF.y = 20;
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndSelectServantItemLevel", [String(servantInfoVo.level)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        levelTF.x = 120;
        levelTF.y = 50;
        this.addChild(levelTF);
        var attrTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndSelectServantItemCombat", [data.servantCombat]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        attrTF.x = 120;
        attrTF.y = 80;
        this.addChild(attrTF);
        if (Api.myAllianceWeekVoApi.checkServantState(servantInfoVo.servantId)) {
            if (Api.myAllianceWeekVoApi.checkServantRecover(servantInfoVo.servantId)) {
                var recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "allianceWeekEndSelectServantItemRecover", function () {
                    var itemId = Config.AllianceweekendCfg.needItem;
                    var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
                    var itemUseCount = 1;
                    var itemCount = hasNum;
                    var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
                    var message = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" + itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                        confirmCallback: function () {
                            NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, { servantId: servantInfoVo.servantId });
                        }, handler: _this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: itemUseCount, msg: message, id: itemId
                    });
                }, this);
                recoverBtn.setPosition(bg.x + bg.width - recoverBtn.width - 10, bg.y + bg.height / 2 - recoverBtn.height / 2);
                this.addChild(recoverBtn);
            }
            else {
                var battleBM = BaseBitmap.create("boss_gotowar");
                battleBM.setPosition(bg.x + bg.width - 85 - battleBM.width / 2, bg.y + bg.height / 2 - battleBM.height / 2);
                this.addChild(battleBM);
            }
        }
        else {
            var goFightBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWeekEndSelectServantItemGoFight", function () {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, { servantId: servantInfoVo.servantId });
            }, this);
            goFightBtn.setPosition(bg.x + bg.width - goFightBtn.width - 10, bg.y + bg.height / 2 - goFightBtn.height / 2);
            this.addChild(goFightBtn);
        }
    };
    AllianceWeekEndSelectServantScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndSelectServantScrollItem;
}(ScrollListItem));
__reflect(AllianceWeekEndSelectServantScrollItem.prototype, "AllianceWeekEndSelectServantScrollItem");
//# sourceMappingURL=AllianceWeekEndSelectServantScrollItem.js.map