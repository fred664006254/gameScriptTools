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
var LevySelectServantItem = (function (_super) {
    __extends(LevySelectServantItem, _super);
    // 属性文本
    function LevySelectServantItem() {
        var _this = _super.call(this) || this;
        //是否是自己所在位置点出来的弹板
        _this._isSelf = false;
        _this._isOtherUse = false;
        _this._otherPosName = '';
        _this._serLevelTxt = null;
        return _this;
    }
    LevySelectServantItem.prototype.dispose = function () {
        this._isSelf = false;
        this._isOtherUse = false;
        this._otherPosName = '';
        this._serLevelTxt = null;
        _super.prototype.dispose.call(this);
    };
    LevySelectServantItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 530;
        this.height = 120;
        this._selectedIndex = index;
        this._data = data;
        var servantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        this._servantInfoVo = servantInfoVo;
        var levyIndex = Number(itemParam.pos.split("_")[0]);
        this.levyIndex = levyIndex;
        var myPos = Api.levyVoApi.getLevyItemServantPos(data.servantId);
        this._isSelf = false;
        this._isOtherUse = false;
        if (myPos != '') {
            if (myPos == itemParam.pos) {
                this._isSelf = true;
            }
            else {
                this._isOtherUse = true;
                this._otherPosName = LanguageManager.getlocal("levy_levyitem_title" + myPos.split("_")[0]);
            }
        }
        var bg = BaseBitmap.create("public_listbg3");
        bg.width = 530;
        bg.height = 120;
        this.addChild(bg);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        var useBtn = ComponentManager.getButton(this.getBtnRes(), this.getBtnLocalName(), this.clickBtnHandler, this);
        useBtn.x = bg.width - useBtn.width - 20;
        useBtn.y = bg.height / 2 - useBtn.height / 2;
        this.addChild(useBtn);
        if (!Api.levyVoApi.checkServantCanLaunch(data.servantId, itemParam.pos)) {
            useBtn.visible = false;
            var notStr = LanguageManager.getlocal("levy_selectservant_notenouph_1");
            var launch = Api.levyVoApi.getLaunchConditionByPos(itemParam.pos);
            var serSp = Config.ServantCfg.getServantItemById(data.servantId).speciality;
            if (launch.type >= 5 || (serSp.indexOf(6) != -1) || (serSp.indexOf(5) != -1) || (serSp.indexOf(launch.type) != -1)) {
                notStr = LanguageManager.getlocal("levy_selectservant_notenouph_1");
                if (this._serLevelTxt) {
                    this._serLevelTxt.setColor(TextFieldConst.COLOR_WARN_RED);
                }
            }
            else {
                notStr = LanguageManager.getlocal("levy_selectservant_notenouph_2");
            }
            var notTxt = ComponentManager.getTextField(notStr, 22, TextFieldConst.COLOR_WARN_RED);
            notTxt.lineSpacing = 5;
            this.addChild(notTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, notTxt, useBtn);
            if (notStr == LanguageManager.getlocal("levy_selectservant_notenouph_1")) {
                notTxt.y -= 15;
                var goBtn = ComponentManager.getButton("levy_uplevelbtn", '', function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, data.servantId);
                }, this);
                this.addChild(goBtn);
                goBtn.setPosition(notTxt.x + notTxt.width / 2 - goBtn.width / 2, notTxt.y + notTxt.height);
            }
        }
        else {
            if (this._isOtherUse) {
                useBtn.y += 5;
                var otherTip = ComponentManager.getTextField(LanguageManager.getlocal("levy_selectservant_otheruse", [this._otherPosName]), 18, TextFieldConst.COLOR_BROWN_NEW);
                otherTip.textAlign = egret.HorizontalAlign.RIGHT;
                otherTip.setPosition(this.width - otherTip.width - 12, useBtn.y - otherTip.height - 2);
                this.addChild(otherTip);
            }
            else {
                if (Api.levyVoApi.getEmptyPosByItemIndex(levyIndex).indexOf(itemParam.pos) != -1) {
                    App.CommonUtil.addIconToBDOC(useBtn);
                }
            }
            if (Api.levyVoApi.isSkillLevySuitable(this._servantInfoVo.servantId, itemParam.pos)) {
                App.CommonUtil.addIconToBDOC(useBtn);
            }
        }
    };
    LevySelectServantItem.prototype.initServantIcon = function (servantInfoVo) {
        var temW = 95;
        var iconBgBt = BaseLoadBitmap.create(this._data.support ? "servant_cardbg_0" : servantInfoVo.qualityBoxImgPath); //
        iconBgBt.x = 10;
        iconBgBt.y = 9;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 184;
        iconBgBt.scaleY = temW / 184;
        var iconBt = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 6;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 11) / 180;
        iconBt.scaleY = (temW - 11) / 177;
    };
    /**重写该方法 */
    LevySelectServantItem.prototype.initServantInfo = function () {
        var startX = 110;
        var scale = 0.6;
        var spaceX = 5;
        var serAb = Config.ServantCfg.getServantItemById(this._servantInfoVo.servantId).speciality;
        var endX = 0;
        for (var i = 0; i < serAb.length; i++) {
            var element = serAb[i];
            var typeIcon = BaseBitmap.create("servant_speciality" + element);
            typeIcon.setScale(scale);
            typeIcon.setPosition(startX + i * (typeIcon.width * scale + spaceX), 12);
            this.addChild(typeIcon);
            endX = typeIcon.x + typeIcon.width * scale;
        }
        var nameTF = ComponentManager.getTextField(this._servantInfoVo.servantName, 22, TextFieldConst.COLOR_BROWN_NEW);
        nameTF.x = endX + spaceX;
        nameTF.y = 18;
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + '：' + this._servantInfoVo.level, 18, TextFieldConst.COLOR_BROWN_NEW);
        levelTF.x = startX;
        levelTF.y = 45;
        this.addChild(levelTF);
        this._serLevelTxt = levelTF;
        var attrTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_info_tab1") + '：' + App.StringUtil.changeIntToText(Api.servantVoApi.getServantObj(this._servantInfoVo.servantId).getTotalBookValue()), 18, TextFieldConst.COLOR_BROWN_NEW);
        attrTF.x = startX;
        attrTF.y = 64;
        this.addChild(attrTF);
        nameTF.y = 20;
        levelTF.y = 50;
        attrTF.y = 80;
        this.initServantSkill();
    };
    LevySelectServantItem.prototype.initServantSkill = function () {
        var posX = 270;
        var __skill = this._servantInfoVo.activeSkillLevy;
        if (!__skill)
            return;
        var skillIcon = ComponentManager.getSkillIcon({
            skillid: __skill.skillId,
            icon: __skill.skillIconKey,
            skillname: __skill.skillName,
            des: __skill.skillDes,
            type: ServantSkillBarTypes.Levy
        }, true, __skill.levyId == this.levyIndex);
        this.addChild(skillIcon);
        skillIcon.Size = 78;
        skillIcon.setPosition(posX, 22);
        skillIcon.Gray = __skill.levyId != this.levyIndex;
    };
    Object.defineProperty(LevySelectServantItem.prototype, "api", {
        get: function () {
            return Api.levyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    LevySelectServantItem.prototype.getAttrStr = function () {
        return this._data.text;
    };
    /**按钮文字 */
    LevySelectServantItem.prototype.getBtnLocalName = function () {
        var localName = "levy_selectservant_send";
        if (this._isOtherUse) {
            localName = "levy_selectservant_change";
        }
        if (this._isSelf) {
            localName = "levy_selectservant_back";
        }
        return localName;
    };
    LevySelectServantItem.prototype.getBtnRes = function () {
        if (this._isSelf) {
            return ButtonConst.BTN_SMALL_BLUE;
        }
        else if (this._isOtherUse) {
            return ButtonConst.BTN_SMALL_ORANGE;
        }
        else {
            return ButtonConst.BTN_SMALL_YELLOW;
        }
    };
    /**
     * 不同格子X间距
     */
    LevySelectServantItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    LevySelectServantItem.prototype.getSpaceY = function () {
        return 5;
    };
    LevySelectServantItem.prototype.clickBtnHandler = function (param) {
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        var data = this._data;
        if (this._isOtherUse) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "levy_selectservant_confirmtitle",
                msg: LanguageManager.getlocal("levy_selectservant_confirmtip", [this._servantInfoVo.servantName, this._otherPosName]),
                callback: function () {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT, {
                        servantId: data.servantId,
                        isSelf: _this._isSelf
                    });
                },
                handler: this,
                needCancel: true
            });
        }
        else {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT, {
                servantId: data.servantId,
                isSelf: this._isSelf
            });
        }
    };
    return LevySelectServantItem;
}(ServantSelectedScrollItem));
__reflect(LevySelectServantItem.prototype, "LevySelectServantItem");
