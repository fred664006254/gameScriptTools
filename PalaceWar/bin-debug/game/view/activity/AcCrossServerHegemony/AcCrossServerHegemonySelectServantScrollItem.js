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
 * author jiangly
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectServantScrollItem
 */
var AcCrossServerHegemonySelectServantScrollItem = (function (_super) {
    __extends(AcCrossServerHegemonySelectServantScrollItem, _super);
    function AcCrossServerHegemonySelectServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._useServantBtn = null;
        _this._useServantBM = null;
        _this._servantId = null;
        _this._isUseServant = false;
        _this._cfgId = null;
        _this._aid = "";
        _this._code = "";
        _this._matchId = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonySelectServantScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonySelectServantScrollItem.prototype.initItem = function (index, data, itemParam) {
        //监听 model事件
        App.MessageHelper.addNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        this._cfgId = itemParam.cfgId;
        this._servantId = data.servantId;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._matchId = itemParam.matchId;
        // console.log(data,itemParam);
        this.width = 510;
        var bg = BaseBitmap.create("public_9_bg94");
        // servantId
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        // 184 × 184
        //180 × 177
        var scaleVale = 0.55; //106 / 184;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath);
        iconBgBt.width = 194;
        iconBgBt.height = 192;
        iconBgBt.setScale(scaleVale);
        iconBgBt.setPosition(bg.x + 15, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
        this.addChild(iconBgBt);
        var iconBt = BaseLoadBitmap.create(data.halfImgPath);
        iconBt.width = 180;
        iconBt.height = 177;
        iconBt.setScale(scaleVale);
        iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
        this.addChild(iconBt);
        var nameBg = BaseBitmap.create("public_titlebg");
        // nameBg.width = 160;
        nameBg.x = 132;
        nameBg.y = 15;
        this.addChild(nameBg);
        var nameColor = ServantScrollItem.getQualityColor(data.clv);
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, nameColor);
        servantNameTxt.x = nameBg.x + 13; //140;
        servantNameTxt.y = nameBg.y + nameBg.height / 2 - servantNameTxt.height / 2 + 1; //30;
        this.addChild(servantNameTxt);
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantLevelTxt.setPosition(nameBg.x + 9, servantNameTxt.y + servantNameTxt.height + 11);
        this.addChild(servantLevelTxt);
        // servantId
        //Api.servantVoApi.getServantObj(data.servantId);
        //servantInfoObj.getTotalBookValue()
        var specialityStr = String(Api.servantVoApi.getServantForceTotalById(data.servantId));
        var servantSpecialityTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyServantSpeciality", [specialityStr]), 20, TextFieldConst.COLOR_BROWN);
        servantSpecialityTxt.setPosition(servantLevelTxt.x, servantLevelTxt.y + servantLevelTxt.height + 4);
        this.addChild(servantSpecialityTxt);
        var servantFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyServantfight", [data.fightValue]), 20, TextFieldConst.COLOR_BROWN);
        servantFightTxt.setPosition(servantLevelTxt.x, servantSpecialityTxt.y + servantSpecialityTxt.height + 4);
        this.addChild(servantFightTxt);
        this._useServantBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "allianceWarUseServantBtn", this.useServantClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._useServantBtn.setPosition(bg.x + bg.width - this._useServantBtn.width - 15, bg.y + bg.height / 2 - this._useServantBtn.height / 2);
        this.addChild(this._useServantBtn);
        this._useServantBM = BaseBitmap.create("awservantstate1");
        this._useServantBM.anchorOffsetX = this._useServantBM.width / 2;
        this._useServantBM.anchorOffsetY = this._useServantBM.height / 2;
        this._useServantBM.setPosition(this._useServantBtn.x + this._useServantBtn.width / 2, this._useServantBtn.y + this._useServantBtn.height / 2);
        this.addChild(this._useServantBM);
        this.refreashView();
    };
    AcCrossServerHegemonySelectServantScrollItem.prototype.refreashView = function () {
        // let servantState = Api.allianceWarVoApi.getServantState(this._servantId);
        // let myInfo = Api.allianceWarVoApi.getMyInfo();
        //null;//Api.allianceWarVoApi.getServantState(this._servantId);
        var myInfo = Api.crossServerHegemonyVoApi.getMyInfo(); //Api.allianceWarVoApi.getMyInfo();
        var servantState = this.vo.sinfo[this._servantId];
        // if(myInfo){
        // 	servantState = myInfo[this._servantId];
        // }
        // console.log("myInfo",myInfo);
        // console.log("servantState",servantState);
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
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN2_SMALL_RED);
                this._isUseServant = true;
            }
            else {
                this._useServantBM.setVisible(false);
                this._useServantBtn.setVisible(true);
                this._useServantBtn.setText("allianceWarUseServantBtn");
                this._useServantBtn.setBtnBitMap(ButtonConst.BTN2_SMALL_YELLOW);
                this._isUseServant = false;
            }
        }
    };
    AcCrossServerHegemonySelectServantScrollItem.prototype.allianceWarModelHandle = function () {
        this.refreashView();
    };
    /**
     * 	派遣事件
     */
    AcCrossServerHegemonySelectServantScrollItem.prototype.useServantClick = function () {
        if (this._cfgId) {
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, { rid: this._matchId, activeId: this._aid + "-" + this._code, straId: this._cfgId, sid: this._servantId });
            return;
        }
        if (this._isUseServant) {
            // let myInfo = Api.allianceWarVoApi.getMyInfo();
            var myInfo = Api.crossServerHegemonyVoApi.getMyInfo();
            if (myInfo && myInfo.stra) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectTip"));
                return;
            }
            // REQYEST_ALLIANCEWAR_CANCELSERVANT
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT, { activeId: this._aid + "-" + this._code, rid: this._matchId });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT, { activeId: this._aid + "-" + this._code, sid: this._servantId, rid: this._matchId });
        }
    };
    AcCrossServerHegemonySelectServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonySelectServantScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        this._useServantBtn = null;
        this._useServantBM = null;
        this._servantId = null;
        this._isUseServant = false;
        this._cfgId = null;
        this._aid = "";
        this._code = "";
        this._matchId = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonySelectServantScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerHegemonySelectServantScrollItem.prototype, "AcCrossServerHegemonySelectServantScrollItem");
//# sourceMappingURL=AcCrossServerHegemonySelectServantScrollItem.js.map