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
        var bg = BaseBitmap.create("public_listbg");
        // servantId
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 130;
        leftBg.height = 117;
        leftBg.x = 6;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        // 184 × 184
        //180 × 177
        var scaleVale = 0.55; //106 / 184;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath);
        iconBgBt.width = 184;
        iconBgBt.height = 184;
        iconBgBt.setScale(scaleVale);
        iconBgBt.setPosition(bg.x + 20, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
        this.addChild(iconBgBt);
        var iconBt = BaseLoadBitmap.create(data.halfImgPath);
        iconBt.width = 180;
        iconBt.height = 177;
        iconBt.setScale(scaleVale);
        iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
        this.addChild(iconBt);
        var nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 160;
        nameBg.x = 142;
        nameBg.y = 8;
        this.addChild(nameBg);
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        servantNameTxt.x = nameBg.x + nameBg.width / 2 - servantNameTxt.width / 2; //140;
        servantNameTxt.y = nameBg.y + nameBg.height / 2 - servantNameTxt.height / 2 + 1; //30;
        this.addChild(servantNameTxt);
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        servantLevelTxt.setPosition(nameBg.x + 5, servantNameTxt.y + servantNameTxt.height + 13);
        this.addChild(servantLevelTxt);
        // servantId
        //Api.servantVoApi.getServantObj(data.servantId);
        //servantInfoObj.getTotalBookValue()
        var specialityStr = String(Api.servantVoApi.getServantForceTotalById(data.servantId));
        var servantSpecialityTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantSpeciality", [specialityStr]), 20, TextFieldConst.COLOR_BROWN);
        servantSpecialityTxt.setPosition(servantLevelTxt.x, servantLevelTxt.y + servantLevelTxt.height + 1);
        this.addChild(servantSpecialityTxt);
        var servantFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantfight", [data.fightValue]), 20, TextFieldConst.COLOR_BROWN);
        servantFightTxt.setPosition(servantLevelTxt.x, servantSpecialityTxt.y + servantSpecialityTxt.height + 1);
        this.addChild(servantFightTxt);
        this._useServantBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWarUseServantBtn", this.useServantClick, this);
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
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN_SMALL_BLUE);
                this._isUseServant = true;
            }
            else {
                this._useServantBM.setVisible(false);
                this._useServantBtn.setVisible(true);
                this._useServantBtn.setText("allianceWarUseServantBtn");
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
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
        return 5;
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
