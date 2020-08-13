var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 红颜技能Item
 * author dky
 * date 2017/11/18
 * @class WifeSkillScrollItem
 */
var WifeSkillScrollItem = /** @class */ (function (_super) {
    __extends(WifeSkillScrollItem, _super);
    function WifeSkillScrollItem() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    WifeSkillScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        // let cfg = data
        this._cfgData = data;
        this._itemIndex = index;
        this._itemParam = itemParam;
        this.width = 525;
        this.height = 126 + this.getSpaceY();
        var key = (index + 1).toString();
        // let id = WifeSkillPopupView.wifeId
        this._wifeId = itemParam.id;
        var id = itemParam.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var skillIndex = index + 1;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        var male = "";
        if (Api.switchVoApi.checkIsInBlueWife() && wifeCfg.isBule() && LanguageManager.checkHasKey("wifeSkill_" + id + "_" + skillIndex + "_male")) {
            male = "_male";
        }
        var skillNameStr = skillIndex + "." + LanguageManager.getlocal("wifeSkill_" + id + "_" + skillIndex + male);
        var skillNameTF = ComponentManager.getTextField(skillNameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        skillNameTF.setPosition(10, 10);
        this.addChild(skillNameTF);
        var skillLevelStr = "(Lv." + this._wifeInfoVo.skill[index] + ")";
        this._skillLevelTF = ComponentManager.getTextField(skillLevelStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._skillLevelTF.setPosition(skillNameTF.x + skillNameTF.width + 10, skillNameTF.y);
        this.addChild(this._skillLevelTF);
        // WifeSkillPopupView.wifeId = id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        var serName = LanguageManager.getlocal("wifeMultiSkillNoServantName");
        if (cfg.servantId) {
            var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
            serName = serCfg.name;
        }
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (data.att.length == 4) {
            attStr = serName + LanguageManager.getlocal("wifeSkillAllAttAdd");
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
            attStr = serName + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        //是否解锁
        var textColor = 0x787878;
        var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
        var add1 = "";
        if (data.condition <= this._wifeInfoVo.intimacy) {
            textColor = TextFieldConst.COLOR_WHITE;
            var addNum1 = "";
            var addNum2 = "";
            var nextIndex = index + 1;
            var nextLvAdd = 1;
            //是否满级
            if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
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
            str3 = LanguageManager.getlocal("wifeSkillUpdNeed", [needExp]);
        }
        else {
            var addNum1 = "";
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
            }
            else {
                addNum1 = (data.growAtt * this._wifeInfoVo.skill[index]).toString();
            }
            textColor2 = 0x787878;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = "1";
            str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
        }
        this._att1TF = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_CONTENT_SMALL, textColor);
        if (PlatformManager.checkIsThSp()) {
            this._att1TF.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        if (PlatformManager.checkIsEnLang()) {
            this._att1TF.width = 370;
        }
        this._att1TF.x = skillNameTF.x;
        this._att1TF.y = skillNameTF.y + skillNameTF.height + 10;
        this.addChild(this._att1TF);
        this._att2TF = ComponentManager.getTextField(str2, TextFieldConst.FONTSIZE_CONTENT_SMALL, textColor);
        if (PlatformManager.checkIsThSp()) {
            this._att2TF.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        if (PlatformManager.checkIsEnLang()) {
            this._att2TF.width = 370;
        }
        this._att2TF.x = skillNameTF.x;
        this._att2TF.y = this._att1TF.y + this._att1TF.height + 5;
        this.addChild(this._att2TF);
        this._att3TF = ComponentManager.getTextField(str3, TextFieldConst.FONTSIZE_CONTENT_SMALL, textColor2);
        if (PlatformManager.checkIsEnLang()) {
            this._att3TF.width = 370;
        }
        this._att3TF.x = skillNameTF.x;
        this._att3TF.y = this._att2TF.y + this._att2TF.height + 5;
        this.addChild(this._att3TF);
        if (PlatformManager.checkIsEnLang()) {
            this.height = this._att3TF.y + this._att3TF.height + 65;
        }
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
            var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            donatetDesc.x = 358;
            donatetDesc.y = this.height / 2 - donatetDesc.height / 2 - 10;
            this.addChild(donatetDesc);
        }
        else {
            this._updBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "servantInfoLevelup", this.updBtnClick, this);
            this._updBtn.scaleX = 0.95;
            this._updBtn.x = 365;
            this._updBtn.y = this.height / 2 - this._updBtn.height / 2 - 7;
            this.addChild(this._updBtn);
            this._updBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        if (data.condition > this._wifeInfoVo.intimacy) {
            this._att2TF.visible = false;
            this._updBtn.visible = false;
            this._skillLevelTF.visible = false;
        }
        //是否满级
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
            this._att2TF.visible = false;
            this._att3TF.visible = false;
        }
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.x = this.width / 2 - lineSp.width / 2;
        lineSp.y = this.height - 15;
        this.addChild(lineSp);
        var handIndex = this.getMainTaskHandIndex();
        App.LogUtil.log("handindex " + handIndex);
        if (handIndex != -1 && index == handIndex) {
            egret.callLater(function () {
                _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, 420, _this.height / 2 - 20, [_this._updBtn], 305, true, function () {
                    this.parent.setChildIndex(this, 100);
                    return true;
                }, _this);
            }, this);
        }
    };
    WifeSkillScrollItem.prototype.updBtnClick = function () {
        // let cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
        var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var serName = LanguageManager.getlocal("wifeMultiSkillNoServantName");
        if (cfg.servantId) {
            var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
            serName = serCfg.name;
        }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeServantNotGet", [serName]));
            return;
        }
        if (this._wifeInfoVo.skill[this._itemIndex] >= Config.WifebaseCfg.getWifeSkillMax()) {
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
    WifeSkillScrollItem.prototype.refreshData = function (index, id) {
        // let id = WifeSkillPopupView.wifeId
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var skillLevelStr = "(Lv." + this._wifeInfoVo.skill[this._itemIndex] + ")";
        // let skiL
        // WifeSkillPopupView.wifeId = id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        var serName = LanguageManager.getlocal("wifeMultiSkillNoServantName");
        if (cfg.servantId) {
            var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
            serName = serCfg.name;
        }
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (this._cfgData.att.length == 4) {
            attStr = serName + LanguageManager.getlocal("wifeSkillAllAttAdd");
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
            attStr = serName + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        //是否解锁
        var textColor = 0x787878;
        var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
        var add1 = "";
        if (this._cfgData.condition <= this._wifeInfoVo.intimacy) {
            textColor = TextFieldConst.COLOR_WHITE;
            var addNum1 = "";
            var addNum2 = "";
            var nextIndex = index + 1;
            var nextLvAdd = 1;
            //是否满级
            if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
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
            str3 = LanguageManager.getlocal("wifeSkillUpdNeed", [needExp]);
        }
        else {
            var addNum1 = "";
            if (this._cfgData.growAtt < 1) {
                addNum1 = (this._cfgData.growAtt * 100 * this._wifeInfoVo.skill[index]) + "%";
            }
            else {
                addNum1 = (this._cfgData.growAtt * this._wifeInfoVo.skill[index]).toString();
            }
            textColor2 = 0x787878;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = "1";
            str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + this._cfgData.condition;
        }
        this._att1TF.text = str1;
        this._att2TF.text = str2;
        this._att3TF.text = str3;
        this._att2TF.y = this._att1TF.y + this._att1TF.height + 5;
        this._att3TF.y = this._att2TF.y + this._att2TF.height + 5;
        this._skillLevelTF.text = skillLevelStr;
        if (this._cfgData.condition > this._wifeInfoVo.intimacy) {
            this._att2TF.visible = false;
            this._updBtn.visible = false;
            this._skillLevelTF.visible = false;
        }
        //是否满级
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
            this._att2TF.visible = false;
            this._att3TF.visible = false;
        }
        if (this._wifeInfoVo.skill[index] >= Config.WifebaseCfg.getWifeSkillMax()) {
            var donatetDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            donatetDesc.x = 358;
            donatetDesc.y = this.height / 2 - donatetDesc.height / 2 - 10;
            this.addChild(donatetDesc);
            this._updBtn.visible = false;
        }
        else {
        }
    };
    //获取未满级最靠上的item index
    WifeSkillScrollItem.prototype.getMainTaskHandIndex = function () {
        var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        // if (cfg.servantId && (!Api.servantVoApi.getServantObj(cfg.servantId))){
        // 	return -1;
        // }
        var dataList = cfg.wifeSkill;
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].condition <= this._wifeInfoVo.intimacy && this._wifeInfoVo.skill && this._wifeInfoVo.skill[i] < Config.WifebaseCfg.getWifeSkillMax()) {
                return i;
            }
        }
        return -1;
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
        this._wifeId = null;
        this._itemParam = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return WifeSkillScrollItem;
}(ScrollListItem));
//# sourceMappingURL=WifeSkillScrollItem.js.map