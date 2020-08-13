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
 * 红颜技能Item
 * author dky
 * date 2017/11/18
 * @class WifeSkillScrollItem
 */
var WifeSkillScrollItem = (function (_super) {
    __extends(WifeSkillScrollItem, _super);
    function WifeSkillScrollItem() {
        var _this = _super.call(this) || this;
        _this.newAttStr = "";
        return _this;
    }
    ;
    WifeSkillScrollItem.prototype.initItem = function (index, data) {
        // let cfg = data
        this._cfgData = data;
        this._itemIndex = index;
        this.width = 530;
        this.height = 145 + this.getSpaceY();
        var key = (index + 1).toString();
        var bottomBg = BaseBitmap.create("public_listbg3");
        bottomBg.width = this.width;
        bottomBg.height = 145;
        bottomBg.x = 0; //this.width/2 - bottomBg.width/2;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var id = WifeSkillPopupView.wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        // this._nameBg = BaseBitmap.create("public_biaoti2");
        // this._nameBg.width = 150;
        // this._nameBg.x = 10;
        // this._nameBg.y = 15;
        // this.addChild(this._nameBg);
        var skillIndex = index + 1 + "";
        var wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        var male = "";
        if (Api.switchVoApi.checkIsInBlueWife() && wifeCfg.isBule() && LanguageManager.checkHasKey("wifeSkill_" + id + "_" + skillIndex + "_male")) {
            male = "_male";
        }
        var skillNameStr = skillIndex + "." + LanguageManager.getlocal("wifeSkill_" + id + "_" + skillIndex + male);
        var nameSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        if (PlatformManager.checkIsViSp()) {
            nameSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        this._skillNameTF = ComponentManager.getTextField(skillNameStr, nameSize, TextFieldConst.COLOR_BROWN_NEW);
        this._skillNameTF.setPosition(20, 25 - this._skillNameTF.height / 2);
        this.addChild(this._skillNameTF);
        var skillLevelStr = "(Lv." + this._wifeInfoVo.skill[index] + ")";
        this._skillLevelTF = ComponentManager.getTextField(skillLevelStr, nameSize, TextFieldConst.COLOR_BROWN_NEW);
        this._skillLevelTF.setPosition(this._skillNameTF.x + this._skillNameTF.width + 20, this._skillNameTF.y);
        this.addChild(this._skillLevelTF);
        // this._nameBg.width = this._skillNameTF.width + this._skillLevelTF.width + 70;
        WifeSkillPopupView.wifeId = id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (data.att.length == 4) {
            // attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
            if (PlatformManager.checkIsViSp()) {
                attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
            else {
                attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
        }
        else {
            for (var index1 = 0; index1 < data.att.length; index1++) {
                var element = data.att[index1];
                if (index1 == 0) {
                    // if(data.att.length == 1){
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                    // }else{
                    // 	attStr = LanguageManager.getlocal("servantInfo_speciality" + element) + "、";
                    // }
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            // attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            if (PlatformManager.checkIsViSp()) {
                attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
            else {
                attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
        }
        //是否解锁
        var textColor = TextFieldConst.COLOR_BLACK;
        var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
        var add1 = "";
        if (data.condition <= this._wifeInfoVo.intimacy) {
            textColor = TextFieldConst.COLOR_BROWN_NEW;
            var addNum1 = "";
            var addNum2 = "";
            var nextIndex = index + 1;
            var nextLvAdd = 1;
            //是否满级
            if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
                nextIndex = index;
                nextLvAdd = 0;
            }
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
                addNum2 = (data.growAtt * 100 * (this._wifeInfoVo.skill[index] + nextLvAdd)) + "%";
            }
            else {
                addNum1 = (data.growAtt * this._wifeInfoVo.skill[index]).toString();
                addNum2 = (data.growAtt * (this._wifeInfoVo.skill[index] + nextLvAdd)).toString();
            }
            var needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex] - 1];
            add1 = addNum1;
            str1 = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
            str2 = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
            var str33 = App.StringUtil.changeIntToText(needExp);
            str3 = LanguageManager.getlocal("wifeSkillUpdNeed", [str33]);
            this.newAttStr = addNum1;
        }
        else {
            var addNum1 = "";
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
            }
            else {
                addNum1 = (data.growAtt * this._wifeInfoVo.skill[index]).toString();
            }
            textColor2 = TextFieldConst.COLOR_BLACK;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = "1";
            str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
            this.newAttStr = addNum1;
        }
        this._att1TF = ComponentManager.getTextField(str1, 18, textColor);
        this._att1TF.x = 20;
        this._att1TF.y = this._skillNameTF.y + this._skillNameTF.height + 5;
        this.addChild(this._att1TF);
        this._att2TF = ComponentManager.getTextField(str2, 18, textColor);
        this._att2TF.x = this._att1TF.x;
        this._att2TF.y = this._att1TF.y + this._att1TF.height + 5;
        this.addChild(this._att2TF);
        this._att3TF = ComponentManager.getTextField(str3, 18, textColor2);
        this._att3TF.x = this._att1TF.x;
        this._att3TF.y = this._att2TF.y + this._att2TF.height + 5;
        this.addChild(this._att3TF);
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
            var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            donatetDesc.x = 400;
            donatetDesc.y = this.height / 2 - donatetDesc.height / 2;
            this.addChild(donatetDesc);
        }
        else {
            this._updBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantInfoLevelup", this.updBtnClick, this);
            this._updBtn.x = 375;
            this._updBtn.y = this.height / 2 - this._updBtn.height / 2;
            this.addChild(this._updBtn);
            if (PlatformManager.checkIsTextHorizontal()) {
                this._updBtn.x = 390;
                this._updBtn.y = 5;
            }
            // this._updBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        if (data.condition > this._wifeInfoVo.intimacy) {
            this._att2TF.visible = false;
            this._updBtn.visible = false;
            this._skillLevelTF.visible = false;
        }
        //是否满级
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
            this._att2TF.visible = false;
            this._att3TF.visible = false;
        }
        // let lineSp = BaseBitmap.create("public_line1");
        // lineSp.x = this.width/2 - lineSp.width/2;
        // lineSp.y = this.height - 15;
        // this.addChild(lineSp);
        if (!data.condition) {
            this._updBtn.visible = false;
            this._att3TF.visible = false;
            this._att2TF.visible = false;
            str1 = LanguageManager.getlocal("wifeSkillCur") + attStr + this.newAttStr;
            this._att1TF.text = str1;
            this._att1TF.textColor = TextFieldConst.COLOR_BROWN_NEW;
        }
    };
    WifeSkillScrollItem.prototype.updBtnClick = function () {
        var cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeServantNotGet", [serCfg.name]));
            return;
        }
        if (this._wifeInfoVo.skill[this._itemIndex] >= Config.WifebaseCfg.wifeSkillMax) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillMax"));
            return;
        }
        var needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex] - 1];
        var hasNum = this._wifeInfoVo.exp;
        if (needExp > hasNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeExpNumNotEnough"));
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, { "index": this._itemIndex });
    };
    WifeSkillScrollItem.prototype.refreshData = function (index) {
        var id = WifeSkillPopupView.wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var skillLevelStr = "(Lv." + this._wifeInfoVo.skill[this._itemIndex] + ")";
        // let skiL
        WifeSkillPopupView.wifeId = id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (this._cfgData.att.length == 4) {
            // attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
            if (PlatformManager.checkIsViSp()) {
                attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
            else {
                attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
        }
        else {
            for (var index1 = 0; index1 < this._cfgData.att.length; index1++) {
                var element = this._cfgData.att[index1];
                if (index1 == 0) {
                    // if(this._cfgData.att.length == 1){
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                    // }else{
                    // 	attStr = LanguageManager.getlocal("servantInfo_speciality" + element) + "、";
                    // }
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            // attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            if (PlatformManager.checkIsViSp()) {
                attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
            else {
                attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
        }
        //是否解锁
        var textColor = 0xb1b1b1;
        var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
        var add1 = "";
        if (this._cfgData.condition <= this._wifeInfoVo.intimacy) {
            textColor = TextFieldConst.COLOR_WHITE;
            var addNum1 = "";
            var addNum2 = "";
            var nextIndex = index + 1;
            var nextLvAdd = 1;
            //是否满级
            if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
                nextIndex = index;
                nextLvAdd = 0;
            }
            if (this._cfgData.growAtt < 1) {
                addNum1 = (this._cfgData.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
                addNum2 = (this._cfgData.growAtt * 100 * (this._wifeInfoVo.skill[index] + nextLvAdd)) + "%";
            }
            else {
                addNum1 = (this._cfgData.growAtt * this._wifeInfoVo.skill[index]).toString();
                addNum2 = (this._cfgData.growAtt * (this._wifeInfoVo.skill[index] + nextLvAdd)).toString();
            }
            add1 = addNum1;
            str1 = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
            str2 = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
            // str3  = LanguageManager.getlocal("wifeSkillUpdNeed",[Config.WifebaseCfg["wifeSkill" + (index + 1)][nextIndex-1]]) ;
            var needExp = Config.WifebaseCfg["wifeSkill" + (this._itemIndex + 1)][this._wifeInfoVo.skill[this._itemIndex] - 1];
            var str33 = App.StringUtil.changeIntToText(needExp);
            str3 = LanguageManager.getlocal("wifeSkillUpdNeed", [str33]);
        }
        else {
            var addNum1 = "";
            if (this._cfgData.growAtt < 1) {
                addNum1 = (this._cfgData.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
            }
            else {
                addNum1 = (this._cfgData.growAtt * this._wifeInfoVo.skill[index]).toString();
            }
            textColor2 = 0xb1b1b1;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = "1";
            str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + this._cfgData.condition;
        }
        this._att1TF.text = str1;
        this._att2TF.text = str2;
        this._att3TF.text = str3;
        this._skillLevelTF.text = skillLevelStr;
        if (this._cfgData.condition > this._wifeInfoVo.intimacy) {
            this._att2TF.visible = false;
            this._updBtn.visible = false;
            this._skillLevelTF.visible = false;
        }
        //是否满级
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
            this._att2TF.visible = false;
            this._att3TF.visible = false;
        }
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.wifeSkillMax) {
            var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            donatetDesc.x = 400;
            donatetDesc.y = this.height / 2 - donatetDesc.height / 2 - 10;
            this.addChild(donatetDesc);
            this._updBtn.visible = false;
        }
        else {
        }
    };
    WifeSkillScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    WifeSkillScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    WifeSkillScrollItem.prototype.dispose = function () {
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
        this.newAttStr = null;
        this._skillNameTF = null;
        _super.prototype.dispose.call(this);
    };
    return WifeSkillScrollItem;
}(ScrollListItem));
__reflect(WifeSkillScrollItem.prototype, "WifeSkillScrollItem");
