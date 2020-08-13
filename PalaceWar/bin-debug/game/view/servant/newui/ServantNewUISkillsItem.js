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
 * 门客详情new 技能部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUISkillsItem
 */
var ServantNewUISkillsItem = (function (_super) {
    __extends(ServantNewUISkillsItem, _super);
    function ServantNewUISkillsItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._txtList = [];
        _this._upTipStr = "";
        _this._lv1TipStr = "";
        _this._lv2TipStr = "";
        _this._mainTaskHandKey = null;
        return _this;
    }
    ServantNewUISkillsItem.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshUIInfo, this);
        this._servantId = servantId;
        this._nodeContainer = new BaseDisplayObjectContainer();
        if (this._skillExpTxt) {
            this.refreshUIInfo();
            return;
        }
        var line1 = BaseBitmap.create("servant_title_bg");
        line1.width = 440;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 20;
        this.addChild(line1);
        this._skillExpTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._skillExpTxt.textColor = TextFieldConst.COLOR_WHITE;
        this._skillExpTxt.y = line1.y + 8;
        this.addChild(this._skillExpTxt);
        // skillExp
        var skillCfg = {};
        var startY = 0;
        for (var index = 0; index < 2; index++) {
            var bottomBg = BaseBitmap.create("public_9_managebg");
            bottomBg.width = 592;
            bottomBg.height = 114;
            bottomBg.x = 24;
            bottomBg.y = startY;
            this._nodeContainer.addChild(bottomBg);
            var skillIcon = BaseLoadBitmap.create("servant_skill_icon" + (index + 1));
            skillIcon.width = 108;
            skillIcon.height = 109;
            skillIcon.x = bottomBg.x + 10;
            skillIcon.y = bottomBg.y + bottomBg.height / 2 - skillIcon.height / 2;
            this._nodeContainer.addChild(skillIcon);
            var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            skillName.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
            skillName.text = LanguageManager.getlocal("servant_skillname" + (index + 1));
            skillName.x = skillIcon.x + skillIcon.width + 10;
            skillName.y = skillIcon.y + 5;
            skillName.textColor = TextFieldConst.COLOR_BROWN;
            this._nodeContainer.addChild(skillName);
            this._txtList.push(skillName);
            var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            curValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt1", ["100"]);
            curValueTxt.x = skillName.x;
            curValueTxt.y = skillName.y + 25;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN;
            this._nodeContainer.addChild(curValueTxt);
            this._txtList.push(curValueTxt);
            var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nextValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt2", ["100"]);
            nextValueTxt.x = skillName.x;
            nextValueTxt.y = curValueTxt.y + 25;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN;
            this._nodeContainer.addChild(nextValueTxt);
            this._txtList.push(nextValueTxt);
            var costValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            costValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt3", ["100"]);
            costValueTxt.x = skillName.x;
            costValueTxt.y = nextValueTxt.y + 25;
            costValueTxt.textColor = TextFieldConst.COLOR_BROWN;
            this._nodeContainer.addChild(costValueTxt);
            this._txtList.push(costValueTxt);
            var upgradeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantInfoLevelup", this.servantSkillLevelupHandler, this, [index]);
            upgradeBtn.x = bottomBg.x + bottomBg.width - 140;
            upgradeBtn.y = bottomBg.y + bottomBg.height / 2 - upgradeBtn.height / 2;
            this._nodeContainer.addChild(upgradeBtn);
            upgradeBtn.name = "upgradeBtn" + (index + 1);
            startY += bottomBg.height + 5;
            var topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            topLvTxt.x = upgradeBtn.x + upgradeBtn.width / 2 - topLvTxt.width / 2;
            topLvTxt.y = upgradeBtn.y + upgradeBtn.height / 2 - topLvTxt.height / 2;
            topLvTxt.visible = false;
            topLvTxt.name = "topLvTxt" + (index + 1);
            this._nodeContainer.addChild(topLvTxt);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 70);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 60;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        this.refreshUIInfo();
        if (!Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding) {
            var needSerId = Api.servantVoApi.getMainTaskNeedServant(205);
            if (needSerId && needSerId == this._servantId) {
                var baseCfg = GameConfig.config.servantbaseCfg;
                var maxLv = baseCfg.skillLvLimit;
                var skill = Api.servantVoApi.getServantObj(this._servantId).skill;
                if (skill && skill.length > 1 && (skill[0] < maxLv || skill[1] < maxLv)) {
                    var btn = this._nodeContainer.getChildByName("upgradeBtn1");
                    if (skill[0] >= maxLv) {
                        btn = this._nodeContainer.getChildByName("upgradeBtn2");
                    }
                    this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._nodeContainer, btn.x + btn.width / 2 - 10, btn.y + 10, [btn], 205, true, function () {
                        return true;
                    }, this);
                }
            }
        }
    };
    ServantNewUISkillsItem.prototype.refreshUIInfo = function (event) {
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
        var servantObj = Api.servantVoApi.getServantObj(this._servantId);
        if (servantObj == null) {
            egret.log(event.data.data.data);
            return;
        }
        var upgradeBtn1 = this._nodeContainer.getChildByName("upgradeBtn1");
        var upgradeBtn2 = this._nodeContainer.getChildByName("upgradeBtn2");
        App.DisplayUtil.changeToNormal(upgradeBtn1);
        App.DisplayUtil.changeToNormal(upgradeBtn2);
        this._upTipStr = "";
        this._lv1TipStr = "";
        this._lv2TipStr = "";
        var baseCfg = GameConfig.config.servantbaseCfg;
        var skillUpgradeExp = baseCfg.skillUpgradeExp;
        var maxLv = baseCfg.skillLvLimit;
        // baseCfg.servantLvList[String(servantObj.clv)].upLv
        this._skillExpTxt.text = LanguageManager.getlocal("servant_skilllExp", [String(servantObj.skillExp)]);
        this._skillExpTxt.x = GameConfig.stageWidth / 2 - this._skillExpTxt.width / 2;
        var txt4 = LanguageManager.getlocal("servant_skilllevelupTxt4");
        var txt5 = LanguageManager.getlocal("servant_skilllevelupTxt5");
        var skill = Api.servantVoApi.getServantObj(this._servantId).skill;
        var lv1 = skill[0];
        var lv2 = skill[1];
        var skillValue1 = GameConfig.config.servantbaseCfg.skillValue1 * 100;
        var skillValue2 = GameConfig.config.servantbaseCfg.skillValue2 * 100;
        if (lv1 == maxLv) {
            upgradeBtn1.visible = false;
            this._nodeContainer.getChildByName("topLvTxt1").visible = true;
            App.DisplayUtil.changeToGray(upgradeBtn1);
            this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
            this._txtList[3].visible = false;
            this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [LanguageManager.getlocal("servant_skilllLvTop"), ""]);
        }
        else {
            this._txtList[3].text = LanguageManager.getlocal("servant_skilllevelupTxt3", [String(skillUpgradeExp[lv1 - 1]), txt4]);
            this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [(skillValue1 * (lv1 + 1)).toFixed(2) + "%", txt4]);
        }
        if (lv2 == maxLv) {
            upgradeBtn2.visible = false;
            this._nodeContainer.getChildByName("topLvTxt2").visible = true;
            App.DisplayUtil.changeToGray(upgradeBtn2);
            this._lv2TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
            this._txtList[7].visible = false;
            this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [LanguageManager.getlocal("servant_skilllLvTop"), ""]);
        }
        else {
            this._txtList[7].text = LanguageManager.getlocal("servant_skilllevelupTxt3", [String(skillUpgradeExp[lv2 - 1]), txt5]);
            this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [(skillValue2 * (lv2 + 1) + 100).toFixed(0) + "%", txt5]);
        }
        this._txtList[0].text = LanguageManager.getlocal("servant_skillname1") + " Lv: " + String(lv1);
        this._txtList[1].text = LanguageManager.getlocal("servant_skilllevelupTxt1", [(skillValue1 * lv1).toFixed(2) + "%", txt4]);
        this._txtList[4].text = LanguageManager.getlocal("servant_skillname2") + " Lv: " + String(lv2);
        this._txtList[5].text = LanguageManager.getlocal("servant_skilllevelupTxt1", [(skillValue2 * lv2 + 100).toFixed(0) + "%", txt5]);
        var skillExp = servantObj.skillExp;
        if (skillExp < skillUpgradeExp[lv1 - 1] && this._lv1TipStr == "") {
            App.DisplayUtil.changeToGray(upgradeBtn1);
            this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip1");
        }
        if (skillExp < skillUpgradeExp[lv2 - 1] && this._lv2TipStr == "") {
            App.DisplayUtil.changeToGray(upgradeBtn2);
            this._lv2TipStr = LanguageManager.getlocal("servant_skilllevelupTip1");
        }
    };
    ServantNewUISkillsItem.prototype.servantSkillLevelupHandler = function (params) {
        if (this._lv1TipStr != "" && params == 0) {
            App.CommonUtil.showTip(this._lv1TipStr);
            return;
        }
        if (this._lv2TipStr != "" && params == 1) {
            App.CommonUtil.showTip(this._lv2TipStr);
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SERVANT_UPSKILL, { servantId: this._servantId, pos: params });
    };
    ServantNewUISkillsItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshUIInfo, this);
        this._txtList = [];
        this._servantId = null;
        this._upTipStr = "";
        this._lv1TipStr = null;
        this._lv2TipStr = null;
        this._skillExpTxt = null;
        this._nodeContainer = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewUISkillsItem;
}(BaseDisplayObjectContainer));
__reflect(ServantNewUISkillsItem.prototype, "ServantNewUISkillsItem");
//# sourceMappingURL=ServantNewUISkillsItem.js.map