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
 * date 2019/2/20
 * @class ServantExileSelectServantScrollItem
 */
var ServantExileSelectServantScrollItem = (function (_super) {
    __extends(ServantExileSelectServantScrollItem, _super);
    function ServantExileSelectServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfo = null;
        _this._isUseServant = false;
        _this._servantIndex = 0;
        _this._days = 0;
        _this._posId = 0;
        _this._data = null;
        return _this;
    }
    ServantExileSelectServantScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._data = data;
        this._servantId = data.servantId;
        this._servantInfo = data;
        this._posId = itemParam.posId;
        this._days = itemParam.days;
        this.width = 518;
        this.height = 130;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        // 184 × 184
        //180 × 177
        var scaleVale = 108 / 184;
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
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 20);
        this.addChild(servantNameTxt);
        if (Config.ServantCfg.checkCanAvoidAtkrace(this._servantId)) {
            var servantAvoidTxt = ComponentManager.getTextField(LanguageManager.getlocal("exile_servant_tip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_RED);
            servantAvoidTxt.setPosition(servantNameTxt.x + servantNameTxt.width, servantNameTxt.y);
            this.addChild(servantAvoidTxt);
        }
        // 
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 15);
        this.addChild(servantLevelTxt);
        var servantPowerTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantPower", [App.StringUtil.changeIntToText(Math.floor(data.total))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantPowerTxt.setPosition(servantLevelTxt.x, servantLevelTxt.y + servantLevelTxt.height + 15);
        this.addChild(servantPowerTxt);
        var useServantBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "servantExileSelectServantPopupViewServantExile", this.useServantClickPre, this);
        useServantBtn.setPosition(bg.x + bg.width - useServantBtn.width - 20, bg.y + bg.height / 2 - useServantBtn.height / 2);
        this.addChild(useServantBtn);
        var useServantBM = BaseBitmap.create("servantexileview_servantexile");
        useServantBM.anchorOffsetX = useServantBM.width / 2;
        useServantBM.anchorOffsetY = useServantBM.height / 2;
        useServantBM.setPosition(useServantBtn.x + useServantBtn.width / 2, useServantBtn.y + useServantBtn.height / 2);
        this.addChild(useServantBM);
        if (Api.servantExileVoApi.getServantExileInfoForServantId(this._servantId)) {
            useServantBtn.setVisible(false);
            useServantBM.setVisible(true);
        }
        else {
            useServantBtn.setVisible(true);
            useServantBM.setVisible(false);
        }
    };
    ServantExileSelectServantScrollItem.prototype.useServantClickPre = function () {
        if (Config.ServantCfg.checkCanAvoidAtkrace(this._servantId)) {
            var rewardStr = LanguageManager.getlocal("exile_servant_tip_desc", [this._data.servantName]);
            var currAvoidNum = Api.servantVoApi.getAvoidNum();
            var maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
            if (currAvoidNum >= maxNum) {
                rewardStr = LanguageManager.getlocal("exile_servant_tip_desc2", [this._data.servantName]);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "exile_servant_tip2",
                msg: rewardStr,
                callback: this.useServantClick,
                handler: this,
                needCancel: true
            });
        }
        else {
            this.useServantClick();
        }
    };
    /**
     * 	派遣事件
     */
    ServantExileSelectServantScrollItem.prototype.useServantClick = function () {
        if (Config.ExileCfg.numNeed >= (Api.servantVoApi.getServantCount() - Api.servantExileVoApi.getUseSeatNumber())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip", [String(Config.ExileCfg.numNeed)]));
            return;
        }
        var titleKey = "servantExileServantGoOutPopupViewTitle";
        var days = Config.ExileCfg.exileTime;
        if (this._days > 0) {
            days = this._days;
        }
        var topMessage = LanguageManager.getlocal("servantExileServantGoOutPopupViewTopMessage", [this._data.servantName]);
        var buttomMessage = LanguageManager.getlocal("servantExileServantGoOutPopupViewButtomMessage", [String(days), String(Config.ExileCfg.unitGem)]);
        var buttomMessage2 = null;
        if (Api.servantVoApi.getServantCountLevel60PlusNotExile() == 1 && this._servantInfo.level >= 60) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip3"));
            return;
        }
        if (this._posId > 100 && this._posId < 1000) {
            var seatinfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            if (seatinfo && seatinfo.lastet && seatinfo.lastet < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTGOOUTPOPUPVIEW, {
            titleKey: titleKey,
            topMessage: topMessage,
            buttomMessage: buttomMessage,
            buttomMessage2: buttomMessage2,
            confirmCallback: this.servantExileClick,
            handle: this,
        });
    };
    ServantExileSelectServantScrollItem.prototype.servantExileClick = function () {
        if (this._posId > 100 && this._posId < 1000) {
            var seatinfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
            if (seatinfo && seatinfo.lastet && seatinfo.lastet < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
                return;
            }
        }
        NetManager.request(NetRequestConst.REQUEST_SERVANT_BANISH, { servantId: this._servantId, pos: this._posId });
        StatisticsHelper.reportGameLog("spid:'" + PlatformManager.getSpid() + "',cmd:'" + NetRequestConst.REQUEST_SERVANT_BANISH + "',servantId:'" + this._servantId + "',pos:'" + this._posId + "'");
    };
    ServantExileSelectServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ServantExileSelectServantScrollItem.prototype.dispose = function () {
        this._servantId = null;
        this._isUseServant = false;
        this._servantInfo = null;
        this._servantIndex = 0;
        this._data = null;
        this._posId = 0;
        this._days = 0;
        _super.prototype.dispose.call(this);
    };
    return ServantExileSelectServantScrollItem;
}(ScrollListItem));
__reflect(ServantExileSelectServantScrollItem.prototype, "ServantExileSelectServantScrollItem");
//# sourceMappingURL=ServantExileSelectServantScrollItem.js.map