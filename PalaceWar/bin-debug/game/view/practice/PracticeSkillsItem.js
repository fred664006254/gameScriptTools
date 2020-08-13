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
 * 门客详情 修身技能信息部分
 
 */
var PracticeSkillsItem = (function (_super) {
    __extends(PracticeSkillsItem, _super);
    function PracticeSkillsItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._txtList = [];
        _this._upTipStr = "";
        _this._lv1TipStr = "";
        _this._lv2TipStr = "";
        return _this;
    }
    PracticeSkillsItem.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP), this.refreshUIInfo, this);
        // this._servantId = servantId;
        this._nodeContainer = new BaseDisplayObjectContainer();
        if (this._skillExpTxt) {
            this.refreshUIInfo();
            return;
        }
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 460;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 75;
        this.addChild(line1);
        this._skillExpTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._skillExpTxt.textColor = TextFieldConst.COLOR_BROWN;
        this._skillExpTxt.y = line1.y;
        this.addChild(this._skillExpTxt);
        // skillExp
        var skillCfg = {};
        var startY = 0;
        // this._nodeContainer.y = 130;
        for (var index = 0; index < 2; index++) {
            var bottomBg = BaseBitmap.create("public_9_managebg");
            bottomBg.width = 592;
            bottomBg.height = 138;
            bottomBg.x = 24;
            bottomBg.y = startY;
            this._nodeContainer.addChild(bottomBg);
            var skillIcon = BaseLoadBitmap.create("practice_skill_" + (index + 1));
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
            skillName.textColor = TextFieldConst.COLOR_BLACK;
            this._nodeContainer.addChild(skillName);
            this._txtList.push(skillName);
            var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            curValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt1", ["100"]);
            curValueTxt.x = skillName.x;
            curValueTxt.y = skillName.y + 25;
            curValueTxt.textColor = TextFieldConst.COLOR_BLACK;
            this._nodeContainer.addChild(curValueTxt);
            this._txtList.push(curValueTxt);
            var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nextValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt2", ["100"]);
            nextValueTxt.x = skillName.x;
            nextValueTxt.y = curValueTxt.y + 25;
            nextValueTxt.textColor = TextFieldConst.COLOR_BLACK;
            this._nodeContainer.addChild(nextValueTxt);
            this._txtList.push(nextValueTxt);
            var costValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            costValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt3", ["100"]);
            costValueTxt.x = skillName.x;
            costValueTxt.y = nextValueTxt.y + 25;
            costValueTxt.textColor = TextFieldConst.COLOR_BLACK;
            this._nodeContainer.addChild(costValueTxt);
            this._txtList.push(costValueTxt);
            var upgradeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantInfoLevelup", this.servantSkillLevelupHandler, this, [index]);
            upgradeBtn.x = bottomBg.x + bottomBg.width - 140;
            upgradeBtn.y = bottomBg.y + bottomBg.height / 2 - upgradeBtn.height / 2 - 10;
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
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 150);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 105;
        this.addChild(scrollView);
        this.refreshUIInfo();
        var downTxt = ComponentManager.getTextField(LanguageManager.getlocal("praceticedownDes"), 18, TextFieldConst.COLOR_BROWN);
        downTxt.x = GameConfig.stageWidth / 2 - downTxt.width / 2;
        downTxt.y = scrollView.y + scrollView.height + 10;
        this.addChild(downTxt);
    };
    PracticeSkillsItem.prototype.refreshUIInfo = function (event) {
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
        var practiceSkill = GameConfig.config.practicebaseCfg.practiceSkill;
        // let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        // if(servantObj == null){
        // 	egret.log(event.data.data.data);
        // 	return;
        // }
        var upgradeBtn1 = this._nodeContainer.getChildByName("upgradeBtn1");
        var upgradeBtn2 = this._nodeContainer.getChildByName("upgradeBtn2");
        App.DisplayUtil.changeToNormal(upgradeBtn1);
        App.DisplayUtil.changeToNormal(upgradeBtn2);
        this._upTipStr = "";
        this._lv1TipStr = "";
        this._lv2TipStr = "";
        var skillExp = Api.practiceVoApi.getExp;
        this._skillExpTxt.text = LanguageManager.getlocal("practice_skilllExp", [skillExp + ""]);
        this._skillExpTxt.x = GameConfig.stageWidth / 2 - this._skillExpTxt.width / 2;
        var txt4 = LanguageManager.getlocal("practice_skilllevelupTxt4");
        var txt5 = LanguageManager.getlocal("practice_skilllevelupTxt5");
        //升级消耗
        var expFNeed = GameConfig.config.practicebaseCfg.expFNeed;
        var expSNeed = GameConfig.config.practicebaseCfg.expSNeed;
        //修身技能等级
        var skill = Api.practiceVoApi.curSkill;
        var lv1 = skill[0];
        var lv2 = skill[1];
        var practiceSkill = GameConfig.config.practicebaseCfg.practiceSkill;
        //基础加成
        var intial1 = practiceSkill.skillF.intial * 100;
        var intial2 = practiceSkill.skillS.intial * 100;
        // 每次增加
        var skillValue1 = practiceSkill.skillF.addValue;
        var skillValue2 = practiceSkill.skillS.addValue;
        // 上限
        var maxLv1 = practiceSkill.skillF.peak;
        var maxLv2 = practiceSkill.skillS.peak;
        if (lv1 == maxLv1) {
            upgradeBtn1.visible = false;
            this._nodeContainer.getChildByName("topLvTxt1").visible = true;
            App.DisplayUtil.changeToGray(upgradeBtn1);
            this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
            this._txtList[3].visible = false;
            this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [LanguageManager.getlocal("servant_skilllLvTop"), ""]);
        }
        else {
            this._txtList[3].text = LanguageManager.getlocal("practice_skilllevelupTxt3", [String(expFNeed[lv1 - 1]), txt4]);
            this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [(skillValue1 * ((lv1 + 1) * 100 + intial1)).toFixed(2) + "%", txt4]);
        }
        if (lv2 == maxLv2) {
            upgradeBtn2.visible = false;
            this._nodeContainer.getChildByName("topLvTxt2").visible = true;
            App.DisplayUtil.changeToGray(upgradeBtn2);
            this._lv2TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
            this._txtList[7].visible = false;
            this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [LanguageManager.getlocal("servant_skilllLvTop"), ""]);
        }
        else {
            this._txtList[7].text = LanguageManager.getlocal("practice_skilllevelupTxt3", [String(expSNeed[lv2 - 1]), txt5]);
            this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2", [(skillValue2 * (lv2 + 1) * 100 + intial2).toFixed(0) + "%", txt5]);
        }
        this._txtList[0].text = LanguageManager.getlocal("practice_skillname1") + " Lv: " + String(lv1);
        this._txtList[1].text = LanguageManager.getlocal("servant_skilllevelupTxt1", [(skillValue1 * lv1 * 100 + intial1).toFixed(2) + "%", txt4]);
        this._txtList[4].text = LanguageManager.getlocal("practice_skillname2") + " Lv: " + String(lv2);
        this._txtList[5].text = LanguageManager.getlocal("servant_skilllevelupTxt1", [(skillValue2 * lv2 * 100 + intial2).toFixed(0) + "%", txt5]);
        if (skillExp < expFNeed[lv1 - 1] && this._lv1TipStr == "") {
            App.DisplayUtil.changeToGray(upgradeBtn1);
            this._lv1TipStr = LanguageManager.getlocal("practice_skilllevelupTip1");
        }
        if (skillExp < expSNeed[lv2 - 1] && this._lv2TipStr == "") {
            App.DisplayUtil.changeToGray(upgradeBtn2);
            this._lv2TipStr = LanguageManager.getlocal("practice_skilllevelupTip1");
        }
    };
    PracticeSkillsItem.prototype.servantSkillLevelupHandler = function (params) {
        if (this._lv1TipStr != "" && params == 0) {
            App.CommonUtil.showTip(this._lv1TipStr);
            return;
        }
        if (this._lv2TipStr != "" && params == 1) {
            App.CommonUtil.showTip(this._lv2TipStr);
            return;
        }
        var skill = params + 1;
        NetManager.request(NetRequestConst.PRACTICE_UPSKILLEXP, { skillType: skill + "" });
    };
    PracticeSkillsItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP), this.refreshUIInfo, this);
        this._txtList = [];
        this._servantId = null;
        this._upTipStr = "";
        this._lv1TipStr = null;
        this._lv2TipStr = null;
        this._skillExpTxt = null;
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeSkillsItem;
}(BaseDisplayObjectContainer));
__reflect(PracticeSkillsItem.prototype, "PracticeSkillsItem");
//# sourceMappingURL=PracticeSkillsItem.js.map