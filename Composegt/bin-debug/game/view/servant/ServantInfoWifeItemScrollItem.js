/**
 * 门客信息，妻妾技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoWifeItemScrollItem
 */
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
var ServantInfoWifeItemScrollItem = (function (_super) {
    __extends(ServantInfoWifeItemScrollItem, _super);
    function ServantInfoWifeItemScrollItem() {
        var _this = _super.call(this) || this;
        _this._wifeindex = 0;
        _this.servantNameBg = null;
        _this.newAttStr = "";
        return _this;
    }
    ServantInfoWifeItemScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshAfterLv, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshAfterLv, this);
        this._wifeindex = index;
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var skillItem = data;
        var bottomBg = BaseBitmap.create("public_listbg3");
        bottomBg.width = 599;
        bottomBg.height = 138;
        // bottomBg.x = 10; 
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        // let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        // servantNameBg.x=bottomBg.x + 35;
        // servantNameBg.y=bottomBg.y+12;
        // this.servantNameBg =servantNameBg;
        var skillName = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN_NEW);
        // skillName.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        skillName.x = bottomBg.x + 60;
        skillName.y = bottomBg.y + 13;
        skillName.name = "skillName";
        this.addChild(skillName);
        // this.addChild(servantNameBg); 
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 40;
        curValueTxt.name = "curValueTxt";
        this.addChild(curValueTxt);
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 35;
        nextValueTxt.name = "nextValueTxt";
        this.addChild(nextValueTxt);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantWife_goBtn", this.goBtnHandler, this);
        goBtn.x = bottomBg.x + bottomBg.width - 140;
        goBtn.y = bottomBg.y + bottomBg.height / 2 - goBtn.height / 2;
        goBtn.name = "goBtn";
        goBtn.visible = false;
        this.addChild(goBtn);
        this._topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
        this._topLvTxt.x = goBtn.x + goBtn.width / 2 - this._topLvTxt.width / 2;
        this._topLvTxt.y = goBtn.y + goBtn.height / 2 - this._topLvTxt.height / 2;
        this._topLvTxt.visible = false;
        this.addChild(this._topLvTxt);
        this.refreshAfterLv();
    };
    ServantInfoWifeItemScrollItem.prototype.refreshAfterLv = function () {
        var servantId = ServantInfoWifeItemScrollItem.servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        this._wifeId = servantcfg.wifeId;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var skillLv = 1;
        if (wifeVo) {
            skillLv = wifeVo.skill[this._wifeindex];
        }
        var wifeSkill = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
        var data = wifeSkill[this._wifeindex];
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (data.att.length == 4) {
            if (PlatformManager.checkIsViSp()) {
                attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
            else {
                attStr = servantcfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
            }
        }
        else {
            for (var index1 = 0; index1 < data.att.length; index1++) {
                var element = data.att[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            if (PlatformManager.checkIsViSp()) {
                attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
            else {
                attStr = servantcfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
            }
        }
        //是否解锁
        var textColor = 0xb1b1b1;
        var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
        var add1 = "";
        var isOpen = false;
        var goEnable = "";
        var isTopLv = false;
        if (wifeVo && data.condition <= wifeVo.intimacy) {
            isOpen = true;
            textColor = TextFieldConst.COLOR_WHITE;
            var addNum1 = "";
            var addNum2 = "";
            var nextIndex = this._wifeindex + 1;
            var nextLvAdd = 1;
            //是否满级
            if (skillLv >= Config.WifebaseCfg.wifeSkillMax) {
                nextIndex = this._wifeindex;
                nextLvAdd = 0;
                isTopLv = true;
            }
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * skillLv) + "%";
                addNum2 = (data.growAtt * 100 * (skillLv + nextLvAdd)) + "%";
            }
            else {
                addNum1 = (data.growAtt * skillLv).toString();
                addNum2 = (data.growAtt * (skillLv + nextLvAdd)).toString();
            }
            var needExp = Config.WifebaseCfg["wifeSkill" + (this._wifeindex + 1)][skillLv - 1];
            if (needExp <= wifeVo.exp) {
                goEnable = LanguageManager.getlocal("servantWife_goBtnEnable");
            }
            add1 = addNum1;
            this.newAttStr = addNum1;
            str1 = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
            str2 = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
        }
        else {
            isOpen = false;
            var addNum1 = "";
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * skillLv) + "%";
            }
            else {
                addNum1 = (data.growAtt * skillLv).toString();
            }
            textColor2 = 0xb1b1b1;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
            this.newAttStr = addNum1;
        }
        var goBtn = this.getChildByName("goBtn");
        var skillName = this.getChildByName("skillName");
        var curValueTxt = this.getChildByName("curValueTxt");
        var nextValueTxt = this.getChildByName("nextValueTxt");
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var maleStr = "wifeSkill_" + this._wifeId + "_" + (this._wifeindex + 1);
        if (Api.switchVoApi.checkIsInBlueWife() && wifeCfg.isBule()) {
            maleStr = maleStr + "_male";
        }
        var nameStr = LanguageManager.getlocal(maleStr);
        skillName.text = LanguageManager.getlocal("servant_wifeSkillName", [nameStr, String(skillLv), goEnable]);
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        // this.servantNameBg.width = skillName.textWidth+40;
        if (isOpen) {
            goBtn.visible = true;
            skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            if (isTopLv) {
                this._topLvTxt.visible = true;
                goBtn.visible = false;
            }
            else {
                this._topLvTxt.visible = false;
                goBtn.visible = true;
            }
        }
        else {
            goBtn.visible = false;
            skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
        }
        if (!data.condition) {
            goBtn.visible = false;
            nextValueTxt.visible = false;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            curValueTxt.text = LanguageManager.getlocal("wifeSkillCur") + attStr + this.newAttStr;
        }
    };
    ServantInfoWifeItemScrollItem.prototype.goBtnHandler = function () {
        var tmpWifeId = this._wifeId;
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: tmpWifeId, handler: this });
    };
    ServantInfoWifeItemScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshAfterLv, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshAfterLv, this);
        this.servantNameBg = null;
        this._wifeindex = 0;
        this._wifeId = null;
        this.newAttStr = null;
        _super.prototype.dispose.call(this);
    };
    ServantInfoWifeItemScrollItem.servantId = "";
    return ServantInfoWifeItemScrollItem;
}(ScrollListItem));
__reflect(ServantInfoWifeItemScrollItem.prototype, "ServantInfoWifeItemScrollItem");
