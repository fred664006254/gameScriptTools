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
 * @author hyd
 * @date 2019/8/8
 * @class AtkraceServantAvoidScrollItem
 */
var AtkraceServantAvoidScrollItem = (function (_super) {
    __extends(AtkraceServantAvoidScrollItem, _super);
    function AtkraceServantAvoidScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = '';
        _this._servantName = '';
        _this._lastReqServantId = '';
        _this._cfgId = '';
        _this._avoidState = 0;
        _this._avoidBarInImg = null;
        _this._avoidBarInTxt = null;
        _this._servantList = [];
        return _this;
    }
    AtkraceServantAvoidScrollItem.prototype.initItem = function (index, data, itemParam) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateHander, this);
        this._cfgId = itemParam.cfgId;
        this._servantId = data.servantId;
        this._servantList = itemParam.servantList;
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
        this._servantName = data.servantName;
        if (data.avoidState) {
            //已拥有的
            var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 15);
            this.addChild(servantNameTxt);
            var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
            servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 13);
            this.addChild(servantLevelTxt);
            var servantTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servantAvoid_total", [data.totalValue]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
            servantTotalTxt.setPosition(servantNameTxt.x, servantLevelTxt.y + servantLevelTxt.height + 13);
            this.addChild(servantTotalTxt);
            var switchAvoidContainer = this.getAvoidSwitchBar();
            this.addChild(switchAvoidContainer);
            switchAvoidContainer.x = this.x + this.width - switchAvoidContainer.width - 35;
            switchAvoidContainer.y = this.y + this.height / 2 - switchAvoidContainer.height / 2 - 5;
            this.refreashItem();
        }
        else {
            //未拥有的
            var servantNameTxt = ComponentManager.getTextField(data.servantName + LanguageManager.getlocal('atkrace_servantAvoid_notOwned'), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 30);
            this.addChild(servantNameTxt);
            var servantNotOwnedTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantAvoidSource_" + this._servantId), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            servantNotOwnedTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 20);
            this.addChild(servantNotOwnedTxt);
        }
    };
    //to do 本地化 
    AtkraceServantAvoidScrollItem.prototype.refreashItem = function () {
        this._avoidState = Api.servantVoApi.getServantObj(this._servantId).avoid;
        var stateStr = '';
        this._avoidState = this._avoidState || 1;
        if (this._avoidState == 2) {
            stateStr = LanguageManager.getlocal('atkrace_servantAvoid_inAvoid');
            this._avoidBarInImg.x = 3;
            this._avoidBarInTxt.x = 73;
        }
        else {
            stateStr = LanguageManager.getlocal('atkrace_servantAvoid_inBattle');
            this._avoidBarInImg.x = 62;
            this._avoidBarInTxt.x = 5;
        }
        this._avoidBarInTxt.text = stateStr;
    };
    AtkraceServantAvoidScrollItem.prototype.getAvoidSwitchBar = function () {
        var switchBarContainer = new BaseDisplayObjectContainer;
        var barBg = BaseBitmap.create('atkraceservantavoid_switchbar_bg');
        switchBarContainer.addChild(barBg);
        this._avoidBarInImg = BaseBitmap.create('atkraceservantavoid_switchbar');
        switchBarContainer.addChild(this._avoidBarInImg);
        this._avoidBarInImg.y = barBg.y + barBg.height / 2 - this._avoidBarInImg.height / 2;
        this._avoidBarInTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servantAvoid_inBattle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        switchBarContainer.addChild(this._avoidBarInTxt);
        this._avoidBarInTxt.y = barBg.y + barBg.height / 2 - this._avoidBarInTxt.height / 2;
        switchBarContainer.addTouchTap(this.clickStateHander, this);
        return switchBarContainer;
    };
    AtkraceServantAvoidScrollItem.prototype.getAvoidNum = function () {
        if (!this._servantList || this._servantList.length <= 0) {
            return 0;
        }
        var list = this._servantList;
        var servantId;
        var count = 0;
        for (var i = 0; i < list.length; i++) {
            servantId = list[i].servantId;
            if (Api.servantVoApi.getServantObj(servantId) && Api.servantVoApi.getServantObj(list[i].servantId).avoid == 2) {
                count++;
            }
        }
        return count;
    };
    AtkraceServantAvoidScrollItem.prototype.showTip = function () {
        var tipStr = '';
        if (this._avoidState == 2) {
            tipStr = LanguageManager.getlocal("atkrace_servantAvoid_switchToAvoidTip", [this._servantName]);
        }
        else {
            tipStr = LanguageManager.getlocal("atkrace_servantAvoid_switchToBattleTip", [this._servantName]);
        }
        App.CommonUtil.showTip(tipStr);
    };
    AtkraceServantAvoidScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AtkraceServantAvoidScrollItem.prototype.clickStateHander = function (param) {
        var currAvoidNum = this.getAvoidNum();
        var maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
        if (this._avoidState != 2 && currAvoidNum >= maxNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantAvoidMaxTip"));
            return;
        }
        var voidState = 3 - this._avoidState;
        this._lastReqServantId = this._servantId;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_AVOID, {
            servantId: this._servantId,
            avoid: voidState,
        });
    };
    AtkraceServantAvoidScrollItem.prototype.onAvoidStateHander = function (param) {
        if (this._lastReqServantId === this._servantId) {
            this._lastReqServantId = '';
            this.refreashItem();
            this.showTip();
        }
    };
    AtkraceServantAvoidScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateHander, this);
        this._servantId = '';
        this._servantName = '';
        this._lastReqServantId = '';
        this._cfgId = '';
        this._avoidState = 0;
        this._avoidBarInImg = null;
        this._avoidBarInTxt = null;
        this._servantList = [];
        _super.prototype.dispose.call(this);
    };
    return AtkraceServantAvoidScrollItem;
}(ScrollListItem));
__reflect(AtkraceServantAvoidScrollItem.prototype, "AtkraceServantAvoidScrollItem");
//# sourceMappingURL=AtkraceServantAvoidScrollItem.js.map