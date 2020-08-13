/**
 * 门客新UI 神器下部3
 * 神器注魂
 * author shaoliang
 * date 2019/7/31
 * @class ServantWeaponNode3
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
var ServantWeaponNode3 = (function (_super) {
    __extends(ServantWeaponNode3, _super);
    function ServantWeaponNode3() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._weaponVo = null;
        _this._weaponCfg = null;
        _this._scrollNode = null;
        _this._skillValue = null;
        _this._skill2Value = null;
        _this._skillValueNext = null;
        _this._skill2ValueNext = null;
        _this._itemNumText = null;
        _this._lvupStatus = 0;
        _this._titleTxt = null;
        // private _nextTxt: BaseTextField = null;
        _this._scrollview = null;
        _this._auraLockTip = null;
        _this._skillArrow1 = null;
        _this._skillArrow2 = null;
        return _this;
    }
    ServantWeaponNode3.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.refreshInfoAfterUpdate, this);
        this._servantId = servantId;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(servantId);
        var nodebg = BaseBitmap.create("public_9_managebg");
        nodebg.width = 520;
        nodebg.height = bottomH - 50;
        nodebg.setPosition(95, 34);
        this.addChild(nodebg);
        // if (nodebg.height>300)
        // {
        //     nodebg.height=300;
        // }
        var titlebg = BaseBitmap.create("servant_title_bg");
        titlebg.width = 310;
        titlebg.setPosition(nodebg.x + nodebg.width / 2 - titlebg.width / 2, 20);
        this.addChild(titlebg);
        var titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt.x = titlebg.x + 40;
        titleTxt.y = titlebg.y + 8;
        titleTxt.width = titlebg.width - 80;
        titleTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(titleTxt);
        this._titleTxt = titleTxt;
        this._scrollNode = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, nodebg.width, nodebg.height - 30);
        var scrollview = ComponentManager.getScrollView(this._scrollNode, rect);
        scrollview.x = nodebg.x;
        scrollview.y = nodebg.y + 25;
        this.addChild(scrollview);
        scrollview.horizontalScrollPolicy = "off";
        this._scrollview = scrollview;
        var alphabg = BaseBitmap.create("public_alphabg");
        alphabg.width = nodebg.width;
        alphabg.height = 270;
        this._scrollNode.addChild(alphabg);
        var textbg1 = BaseBitmap.create("public_9_bg11");
        textbg1.width = 290 + 50;
        textbg1.height = 23;
        textbg1.setPosition(125, 10);
        this._scrollNode.addChild(textbg1);
        var textbg2 = BaseBitmap.create("public_9_bg11");
        textbg2.width = textbg1.width;
        textbg2.height = 23;
        textbg2.setPosition(textbg1.x, 48);
        this._scrollNode.addChild(textbg2);
        var lvbg1 = BaseBitmap.create("weapon_insertsoul_textbg");
        lvbg1.setPosition(50, 5);
        lvbg1.scaleX = 100 / lvbg1.width;
        this._scrollNode.addChild(lvbg1);
        var lvbg2 = BaseBitmap.create("weapon_insertsoul_textbg");
        lvbg2.setPosition(50, 43);
        lvbg2.scaleX = lvbg1.scaleX;
        this._scrollNode.addChild(lvbg2);
        var name1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_skill1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        name1.setPosition(lvbg1.x + 25, lvbg1.y + lvbg1.height / 2 - name1.height / 2);
        this._scrollNode.addChild(name1);
        var value1Text = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WARN_GREEN);
        value1Text.setPosition(textbg1.x + 35, textbg1.y + textbg1.height / 2 - value1Text.height / 2);
        this._scrollNode.addChild(value1Text);
        this._skillValue = value1Text;
        var name2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_skill2_lv"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        name2.setPosition(lvbg2.x + 25, lvbg2.y + lvbg2.height / 2 - name2.height / 2);
        this._scrollNode.addChild(name2);
        var value2Text = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WARN_GREEN);
        value2Text.setPosition(textbg2.x + 35, textbg2.y + textbg2.height / 2 - value2Text.height / 2);
        this._scrollNode.addChild(value2Text);
        this._skill2Value = value2Text;
        var skillArrow = BaseLoadBitmap.create("servant_arrow");
        skillArrow.width = 34;
        skillArrow.height = 22;
        skillArrow.setPosition(value1Text.x + value1Text.width, value1Text.y + value1Text.height / 2 - skillArrow.height / 2);
        this._scrollNode.addChild(skillArrow);
        this._skillArrow1 = skillArrow;
        var skillArrow2 = BaseLoadBitmap.create("servant_arrow");
        skillArrow2.width = 34;
        skillArrow2.height = 22;
        skillArrow2.setPosition(value2Text.x + value2Text.width, value2Text.y + value2Text.height / 2 - skillArrow2.height / 2);
        this._scrollNode.addChild(skillArrow2);
        this._skillArrow2 = skillArrow2;
        var value1TextNext = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WARN_GREEN);
        value1TextNext.setPosition(textbg1.x + 35, value1Text.y);
        this._scrollNode.addChild(value1TextNext);
        this._skillValueNext = value1TextNext;
        var value2TextNext = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WARN_GREEN);
        value2TextNext.setPosition(textbg2.x + 35, value2Text.y);
        this._scrollNode.addChild(value2TextNext);
        this._skill2ValueNext = value2TextNext;
        // let nextText = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WHITE);
        // nextText.setPosition(0, lvbg2.y+lvbg2.height+4);
        // nextText.width = nodebg.width;
        // nextText.textAlign = egret.HorizontalAlign.CENTER;
        // this._scrollNode.addChild(nextText);
        // this._nextTxt = nextText;
        var itemBigBg = BaseBitmap.create("weapon_insertsoul_bg");
        itemBigBg.setPosition(nodebg.width / 2 - itemBigBg.width / 2 + 10, 80 + 24);
        this._scrollNode.addChild(itemBigBg);
        var numbg = BaseBitmap.create("weapon_star_bg");
        numbg.setPosition(nodebg.width / 2 - numbg.width / 2, itemBigBg.y + 90);
        this._scrollNode.addChild(numbg);
        var numTxt = ComponentManager.getTextField("2", 18, TextFieldConst.COLOR_WHITE);
        numTxt.width = numbg.width;
        numTxt.height = numbg.height;
        numTxt.textAlign = egret.HorizontalAlign.CENTER;
        numTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        numTxt.setPosition(numbg.x, numbg.y);
        this._scrollNode.addChild(numTxt);
        this._itemNumText = numTxt;
        var isLock = false;
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var curLv = this._weaponVo.skill2;
        var offsety = 0;
        if (servantCfg.aura && this._weaponVo.skill2 < this._weaponCfg.getMaxSoulLv()) {
            var sids = servantCfg.aura["1"]["growNeed1"];
            for (var i = 0; i < sids.length; i++) {
                var sid = sids[i];
                var oneweaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(sid);
                if (!oneweaponVo || oneweaponVo.skill2 < curLv) {
                    isLock = true;
                    break;
                }
            }
            var auraIcon = servantCfg.aura["1"]["auraIcon"];
            var auraName = LanguageManager.getlocal("servant_fourPeopleaura" + auraIcon);
            var lockstr = curLv == 1 ? LanguageManager.getlocal("weapon_upskill_locked_tip1", [auraName]) : LanguageManager.getlocal("weapon_upskill_locked_tip2", [auraName, String(curLv)]);
            var auraLockTip = ComponentManager.getTextField(lockstr, 20, TextFieldConst.COLOR_WHITE);
            auraLockTip.width = 500;
            auraLockTip.lineSpacing = 4;
            auraLockTip.textAlign = egret.HorizontalAlign.CENTER;
            auraLockTip.setPosition(nodebg.width / 2 - auraLockTip.width / 2, itemBigBg.y + itemBigBg.height);
            this._scrollNode.addChild(auraLockTip);
            auraLockTip.visible = false;
            offsety = auraLockTip.height;
            this._auraLockTip = auraLockTip;
        }
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "weapon_skill_up", this.levelupBtnClickHandler, this);
        levelupBtn.x = nodebg.width / 2 - levelupBtn.width / 2;
        levelupBtn.y = itemBigBg.y + itemBigBg.height + 10 + offsety;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._scrollNode.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        if (isLock) {
            levelupBtn.setEnable(false);
            this._auraLockTip.visible = true;
        }
        // let levelupTip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("weapon_skill_up_tip"), 18, TextFieldConst.COLOR_BLACK);
        // levelupTip.width = 185;
        // levelupTip.lineSpacing = 4;
        // levelupTip.setPosition(levelupBtn.x+levelupBtn.width+10,levelupBtn.y+levelupBtn.height/2-levelupTip.height/2);
        // this._scrollNode.addChild(levelupTip);
        var itemsVo = GameData.formatRewardItem("6_" + this._weaponCfg.itemID + "_1");
        var itemicon = GameData.getItemIcon(itemsVo[0], true);
        itemicon.setScale(0.65);
        itemicon.getChildByName("numLb").visible = false;
        if (itemicon.getChildByName("numbg")) {
            itemicon.getChildByName("numbg").visible = false;
        }
        itemicon.setPosition(nodebg.width / 2 - 35, 96 + 24);
        this._scrollNode.addChild(itemicon);
        this.resetValueText();
    };
    ServantWeaponNode3.prototype.levelupBtnClickHandler = function () {
        if (this._lvupStatus > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("weapon_levelup3_tip" + this._lvupStatus));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_WEAPON_UPSKILL, { weaponId: this._weaponVo.id });
    };
    //升级之后刷新数据
    ServantWeaponNode3.prototype.refreshInfoAfterUpdate = function (p) {
        if (p.data.ret == true) {
            Api.weaponVoApi.recentUpType = 3;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_UPLEVEL2, [1, 125 - this._scrollview.scrollTop + 60, 3]);
            this.resetValueText();
        }
    };
    ServantWeaponNode3.prototype.resetValueText = function () {
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var valueNum1 = Math.floor(this._weaponCfg.skill1[this._weaponVo.skill2 - 1] * 100 + 0.5);
        var valueNum2 = Math.floor(this._weaponCfg.skill2[this._weaponVo.skill2 - 1] * 100 + 0.5);
        this._skillValue.text = LanguageManager.getlocal("weapon_skill1_desc2", [String(valueNum1)]);
        this._skill2Value.text = LanguageManager.getlocal("weapon_skill2_desc2", [String(valueNum2)]);
        this._skillArrow1.x = this._skillValue.x + this._skillValue.width;
        this._skillArrow2.x = this._skill2Value.x + this._skill2Value.width;
        var nextValue1 = "";
        var nextValue2 = "";
        if (this._weaponCfg.skill1[this._weaponVo.skill2]) {
            var nextValueNum = Math.floor(this._weaponCfg.skill1[this._weaponVo.skill2] * 100 + 0.5);
            nextValue1 = LanguageManager.getlocal("weapon_skill1_next", [String(nextValueNum)]);
        }
        else {
            nextValue1 = LanguageManager.getlocal("skinnextMax");
        }
        if (this._weaponCfg.skill2[this._weaponVo.skill2]) {
            nextValue2 = LanguageManager.getlocal("weapon_skill1_next", [String(this._weaponCfg.skill2[this._weaponVo.skill2] * 100)]);
        }
        else {
            nextValue2 = LanguageManager.getlocal("skinnextMax");
        }
        this._skillValueNext.text = nextValue1;
        this._skill2ValueNext.text = nextValue2;
        this._skillValueNext.x = this._skillArrow1.x + this._skillArrow1.width;
        this._skill2ValueNext.x = this._skillArrow2.x + this._skillArrow2.width;
        this._titleTxt.text = LanguageManager.getlocal("weapon_skill2_lv2", [String(this._weaponVo.skill2)]);
        this._lvupStatus = 0;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (this._weaponVo.skill2 >= this._weaponCfg.getMaxSoulLv()) {
            this._lvupStatus = 2;
        }
        if (this._lvupStatus > 0) {
            App.DisplayUtil.changeToGray(this._levelupBtn);
            this._itemNumText.text = LanguageManager.getlocal("wifeSkillMaxShow");
        }
        else {
            App.DisplayUtil.changeToNormal(this._levelupBtn);
            var needNum = Config.ServantweaponCfg.weaponSoul[String(this._weaponVo.skill2)].needItem;
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(this._weaponCfg.itemID);
            this._itemNumText.text = String(hasNum) + "/" + needNum;
            if (hasNum >= needNum) {
                this._itemNumText.setColor(TextFieldConst.COLOR_WHITE);
            }
            else {
                this._lvupStatus = 1;
                this._itemNumText.setColor(TextFieldConst.COLOR_WARN_RED);
            }
        }
        // if (this._lvupStatus == 2)
        // {
        //     this._nextTxt.text = "";
        // }
        // else
        // {
        //     let value = this._weaponCfg.skill2[this._weaponVo.skill2]-this._weaponCfg.skill2[this._weaponVo.skill2-1];
        //     value = Math.floor(value*100+0.5);
        //     this._nextTxt.text = LanguageManager.getlocal("weapon_skinLevelUp",[String(value)]);
        // }
        var isLock = false;
        var curLv = this._weaponVo.skill2;
        if (servantCfg.aura && this._weaponVo.skill2 < this._weaponCfg.getMaxSoulLv()) {
            var sids = servantCfg.aura["1"]["growNeed1"];
            for (var i = 0; i < sids.length; i++) {
                var sid = sids[i];
                var oneweaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(sid);
                if (!oneweaponVo || oneweaponVo.skill2 < curLv) {
                    isLock = true;
                    break;
                }
            }
            if (isLock == true) {
                var auraIcon = servantCfg.aura["1"]["auraIcon"];
                var auraName = LanguageManager.getlocal("servant_fourPeopleaura" + auraIcon);
                var lockstr = curLv == 1 ? LanguageManager.getlocal("weapon_upskill_locked_tip1", [auraName]) : LanguageManager.getlocal("weapon_upskill_locked_tip2", [auraName, String(curLv)]);
                this._levelupBtn.setEnable(false);
                this._auraLockTip.text = lockstr;
                this._auraLockTip.visible = true;
            }
        }
    };
    ServantWeaponNode3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.refreshInfoAfterUpdate, this);
        this._servantId = null;
        this._weaponVo = null;
        this._weaponCfg = null;
        this._scrollNode = null;
        this._skill2Value = null;
        this._itemNumText = null;
        this._levelupBtn = null;
        this._lvupStatus = 0;
        this._titleTxt = null;
        // this._nextTxt = null;
        this._auraLockTip = null;
        this._skillValue = null;
        this._skillValueNext = null;
        this._skill2ValueNext = null;
        this._skillArrow1 = null;
        this._skillArrow2 = null;
        _super.prototype.dispose.call(this);
    };
    return ServantWeaponNode3;
}(BaseDisplayObjectContainer));
__reflect(ServantWeaponNode3.prototype, "ServantWeaponNode3");
//# sourceMappingURL=ServantWeaponNode3.js.map