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
 * 选择门客的item
 * author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectServantScrollItem
 */
var AllianceWarSelectServantScrollItem = (function (_super) {
    __extends(AllianceWarSelectServantScrollItem, _super);
    function AllianceWarSelectServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._useServantBtn = null;
        _this._useServantBM = null;
        _this._servantId = null;
        _this._isUseServant = false;
        _this._cfgId = null;
        return _this;
    }
    AllianceWarSelectServantScrollItem.prototype.initItem = function (index, data, itemParam) {
        //监听 model事件
        App.MessageHelper.addNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        this._cfgId = itemParam.cfgId;
        this._servantId = data.servantId;
        this.width = 510;
        var bg = BaseBitmap.create("public_9_bg44");
        // servantId
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        // 184 × 184
        //180 × 177
        var scaleVale = 106 / 184;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath);
        iconBgBt.width = 184;
        iconBgBt.height = 184;
        iconBgBt.setScale(scaleVale);
        iconBgBt.setPosition(bg.x + 10, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
        this.addChild(iconBgBt);
        var iconBt = BaseLoadBitmap.create(data.halfImgPath);
        iconBt.width = 180;
        iconBt.height = 177;
        iconBt.setScale(scaleVale);
        iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
        this.addChild(iconBt);
        if (Api.switchVoApi.checkOpenExile()) {
            if (data.banishSt) {
                var exileBM = BaseBitmap.create("public_servantexilelogo");
                exileBM.setScale(scaleVale);
                exileBM.setPosition(iconBgBt.x + iconBgBt.width * scaleVale - exileBM.width * scaleVale, iconBgBt.y);
                this.addChild(exileBM);
            }
        }
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 10);
        this.addChild(servantNameTxt);
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
        servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 13);
        this.addChild(servantLevelTxt);
        // servantId
        //Api.servantVoApi.getServantObj(data.servantId);
        //servantInfoObj.getTotalBookValue()
        var specialityStr = String(Api.servantVoApi.getServantForceTotalById(data.servantId));
        var servantSpecialityTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantSpeciality", [specialityStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
        servantSpecialityTxt.setPosition(servantNameTxt.x, servantLevelTxt.y + servantLevelTxt.height + 3);
        this.addChild(servantSpecialityTxt);
        var servantFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantfight", [data.fightValue]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
        servantFightTxt.setPosition(servantNameTxt.x, servantSpecialityTxt.y + servantSpecialityTxt.height + 2);
        this.addChild(servantFightTxt);
        this._useServantBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarUseServantBtn", this.useServantClick, this);
        this._useServantBtn.setPosition(bg.x + bg.width - this._useServantBtn.width - 15, bg.y + bg.height / 2 - this._useServantBtn.height / 2);
        this.addChild(this._useServantBtn);
        this._useServantBM = BaseBitmap.create("awservantstate1");
        this._useServantBM.anchorOffsetX = this._useServantBM.width / 2;
        this._useServantBM.anchorOffsetY = this._useServantBM.height / 2;
        this._useServantBM.setPosition(this._useServantBtn.x + this._useServantBtn.width / 2, this._useServantBtn.y + this._useServantBtn.height / 2);
        this.addChild(this._useServantBM);
        this.refreashView();
    };
    AllianceWarSelectServantScrollItem.prototype.refreashView = function () {
        var servantState = Api.allianceWarVoApi.getServantState(this._servantId);
        var myInfo = Api.allianceWarVoApi.getMyInfo();
        if (myInfo && myInfo.servant2 && myInfo.servant2 == this._servantId) {
            this._useServantBM.setRes("awservantstate2");
            this._useServantBM.setVisible(true);
            this._useServantBtn.setVisible(false);
        }
        else if (servantState && (myInfo && myInfo.servant != this._servantId || (!myInfo))) {
            if (servantState == 1) {
                this._useServantBM.setRes("awservantstate1");
                this._useServantBM.setVisible(true);
                this._useServantBtn.setVisible(false);
            }
        }
        else {
            if (myInfo && myInfo.servant == this._servantId) {
                this._useServantBM.setVisible(false);
                this._useServantBtn.setVisible(true);
                this._useServantBtn.setText("allianceWarUseServantBtn2");
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN_NORMAL_RED);
                this._isUseServant = true;
            }
            else {
                this._useServantBM.setVisible(false);
                this._useServantBtn.setVisible(true);
                this._useServantBtn.setText("allianceWarUseServantBtn");
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN_NORMAL_YELLOW);
                this._isUseServant = false;
            }
        }
    };
    AllianceWarSelectServantScrollItem.prototype.allianceWarModelHandle = function () {
        this.refreashView();
    };
    /**
     * 	派遣事件
     */
    AllianceWarSelectServantScrollItem.prototype.useServantClick = function () {
        if (this._cfgId) {
            NetManager.request(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, { straId: this._cfgId, sid: this._servantId });
            return;
        }
        if (this._isUseServant) {
            var myInfo = Api.allianceWarVoApi.getMyInfo();
            if (myInfo && myInfo.stra) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectTip"));
                return;
            }
            NetManager.request(NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT, { sid: this._servantId });
        }
        else {
            NetManager.request(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT, { sid: this._servantId });
        }
    };
    AllianceWarSelectServantScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceWarSelectServantScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        this._useServantBtn = null;
        this._useServantBM = null;
        this._servantId = null;
        this._isUseServant = false;
        this._cfgId = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarSelectServantScrollItem;
}(ScrollListItem));
__reflect(AllianceWarSelectServantScrollItem.prototype, "AllianceWarSelectServantScrollItem");
//# sourceMappingURL=AllianceWarSelectServantScrollItem.js.map