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
 * 修身资质UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeAbilityScrollItem
 */
var PracticeAbilityScrollItem = (function (_super) {
    __extends(PracticeAbilityScrollItem, _super);
    function PracticeAbilityScrollItem() {
        var _this = _super.call(this) || this;
        _this._expProgress = null;
        _this._isBtnEnable = false;
        _this._goTrick = false;
        _this._reqing = false;
        return _this;
    }
    PracticeAbilityScrollItem.prototype.initItem = function (index, data) {
        this._curCfg = data;
        var servantId = this._curCfg.servantId;
        var wifeId = this._curCfg.wifeId;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.unlockCallBackHandler, this);
        this.width = 600;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 148;
        bgBg.touchEnabled = true;
        this.addChild(bgBg);
        bgBg.addTouchTap(this.showDetails, this);
        var iconBg = BaseBitmap.create("itembg_3");
        var detalS = 1.0;
        iconBg.setScale(detalS);
        // iconBg.height *= 1.2; 
        iconBg.x = 10;
        iconBg.y = bgBg.y + bgBg.height / 2 - iconBg.height / 2;
        this.addChild(iconBg);
        var iconPath = "";
        if (this._curCfg.servantId) {
            iconPath = "servant_half_" + this._curCfg.servantId;
        }
        else if (this._curCfg.wifeId) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(this._curCfg.wifeId);
            iconPath = wifecfg.icon;
        }
        var iconImg = BaseLoadBitmap.create(iconPath);
        iconImg.width = 100;
        iconImg.height = 100;
        // iconImg.setScale(0.5);
        iconImg.x = iconBg.x + iconBg.width / 2 * detalS - iconImg.width / 2;
        iconImg.y = iconBg.y + iconBg.height / 2 * detalS - iconImg.height / 2 - 2;
        this.addChild(iconImg);
        iconImg.addTouchTap(this.showWifeOrServantInfo, this);
        this._conditionTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._conditionTxt.x = iconBg.x + iconBg.width * detalS + 10;
        this._conditionTxt.y = 20;
        this.addChild(this._conditionTxt);
        // this._detailVTxt = ComponentManager.getTextField("1234",20,0x21eb39); //0xc2a846
        // this._detailVTxt = ComponentManager.getTextField("1234",20,0xc2a846); //
        this._detailVTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN2);
        this._detailVTxt.x = 0;
        this._detailVTxt.y = 20;
        this.addChild(this._detailVTxt);
        var attrTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        attrTxt.x = this._conditionTxt.x;
        attrTxt.y = this._conditionTxt.y + 27;
        this.addChild(attrTxt);
        this._attrTxt = attrTxt;
        var attrAddTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        attrAddTxt.x = attrTxt.x;
        attrAddTxt.y = attrTxt.y + 27;
        this.addChild(attrAddTxt);
        this._attrAddTxt = attrAddTxt;
        this._expProgress = ComponentManager.getProgressBar("progress5", "progress3_bg", 280);
        this._expProgress.setPosition(this._attrAddTxt.x, attrAddTxt.y + 30);
        this._expProgress.setTextSize(TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.addChild(this._expProgress);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "practice_upgrateBtn", this.btnHandler, this);
        btn.x = this.width - btn.width - 15;
        btn.y = this.height / 2 - btn.height / 2;
        btn.name = "btn";
        btn.visible = false;
        this.addChild(btn);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "practice_goBtnTxt", this.goBtnHandler, this);
        goBtn.x = this.width - btn.width - 15;
        goBtn.y = this.height / 2 - btn.height / 2;
        goBtn.name = "goBtn";
        goBtn.visible = false;
        this.addChild(goBtn);
        this.refreshUI();
    };
    /**
     * 门客或红颜属性发生变化后，刷新进度
     */
    PracticeAbilityScrollItem.prototype.refreshProInfo = function () {
    };
    PracticeAbilityScrollItem.prototype.goBtnHandler = function () {
        if (this._curCfg.servantId) {
            if (!Api.servantVoApi.getServantObj(this._curCfg.servantId)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_noServantTip"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, this._curCfg.servantId);
        }
        else {
            var wifeId = this._curCfg.wifeId;
            if (!Api.wifeVoApi.getWifeInfoVoById(wifeId)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_noWifeTip"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: wifeId, handler: null });
        }
        this._goTrick = true;
    };
    PracticeAbilityScrollItem.prototype.refreshUI = function () {
        this._isBtnEnable = false;
        var ptaskVo = Api.practiceVoApi.getPracticeTaskInfo(this._curCfg.id);
        var taskSinfo = Api.practiceVoApi.getPracticeTaskAccumulation(ptaskVo);
        var condition = this._curCfg.getConditionList()[ptaskVo.stage];
        var conditionV = taskSinfo.conditionV;
        var attrType = this._curCfg.type;
        if (taskSinfo.isComp) {
            this._conditionTxt.text = LanguageManager.getlocal("practice_compTxt");
            this._attrAddTxt.text = "";
            var curStr = LanguageManager.getlocal("servantInfo_attrTxt" + attrType + "_1") + "+" + String(taskSinfo.curV);
            this._attrTxt.text = LanguageManager.getlocal("practice_curV", [curStr]);
            this._detailVTxt.text = "";
            this._expProgress.visible = false;
            this.getChildByName("btn").visible = false;
            this.getChildByName("goBtn").visible = false;
            if (!this.getChildByName("compFlag")) {
                var compFlag = BaseBitmap.create("practice_comp_flag");
                compFlag.x = this.width - compFlag.width - 20;
                compFlag.y = 30;
                compFlag.name = "compFlag";
                this.addChild(compFlag);
            }
        }
        else {
            if (conditionV >= taskSinfo.conditionNeed) {
                conditionV = taskSinfo.conditionNeed;
                this._isBtnEnable = true;
            }
            var tarname = "";
            if (this._curCfg.servantId) {
                tarname = LanguageManager.getlocal("servant_name" + this._curCfg.servantId);
            }
            else if (this._curCfg.wifeId) {
                var wifecfg = Config.WifeCfg.getWifeCfgById(this._curCfg.wifeId);
                tarname = wifecfg.name;
            }
            if (ptaskVo.stage == 1) {
                if (this._curCfg.servantId) {
                    this._conditionTxt.text = LanguageManager.getlocal("practice_contionType1_1", [""]);
                    this._detailVTxt.text = tarname;
                }
                else if (this._curCfg.wifeId) {
                    this._conditionTxt.text = LanguageManager.getlocal("practice_contionType1_2", [""]);
                    this._detailVTxt.text = tarname;
                }
            }
            else {
                this._conditionTxt.text = LanguageManager.getlocal("practice_contionType" + condition.conditionType, [tarname]);
                this._detailVTxt.text = "" + taskSinfo.conditionNeed;
            }
            this._detailVTxt.x = this._conditionTxt.x + this._conditionTxt.width + 5;
            var addStr = LanguageManager.getlocal("servantInfo_attrTxt" + attrType + "_1") + "+" + String(condition.effect);
            this._attrAddTxt.text = LanguageManager.getlocal("practice_addV", [addStr]);
            this._expProgress.setPercentage(conditionV / taskSinfo.conditionNeed);
            this._expProgress.setText(conditionV + "/" + taskSinfo.conditionNeed);
            var curStr = LanguageManager.getlocal("servantInfo_attrTxt" + attrType + "_1") + "+" + String(taskSinfo.curV);
            this._attrTxt.text = LanguageManager.getlocal("practice_curV", [curStr]);
            if (this._isBtnEnable) {
                this.getChildByName("btn").visible = true;
                this.getChildByName("goBtn").visible = false;
            }
            else {
                this.getChildByName("btn").visible = false;
                this.getChildByName("goBtn").visible = false;
                if (ptaskVo.stage > 1) {
                    if (Api.servantVoApi.getServantObj(this._curCfg.servantId) || Api.wifeVoApi.getWifeInfoVoById(this._curCfg.wifeId)) {
                        this.getChildByName("goBtn").visible = true;
                    }
                }
            }
        }
    };
    PracticeAbilityScrollItem.prototype.unlockCallBackHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0 || this._reqing == false) {
            return;
        }
        // this.refreshUI();
        this._reqing = false;
        var addValue = rdata.data.addAttrValue;
        var str = LanguageManager.getlocal("servantInfo_attrTxt" + this._curCfg.type + "_1") + "+" + addValue;
        var strList = [{ tipMessage: str }];
        App.CommonUtil.playRewardFlyAction(strList);
    };
    PracticeAbilityScrollItem.prototype.btnHandler = function () {
        if (this._isBtnEnable == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_collectTip"));
            return;
        }
        this._reqing = true;
        NetManager.request(NetRequestConst.REQUEST_REQUEST_UNLOCK, { taskId: this._curCfg.id });
        this._goTrick = false;
    };
    PracticeAbilityScrollItem.prototype.showDetails = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEABILITYDETAILSPOPUPVIEW, { taskId: this._curCfg.id });
    };
    PracticeAbilityScrollItem.prototype.showWifeOrServantInfo = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEORSERVANTINFOPOPUPVIEW, { wifeId: this._curCfg.wifeId, servantId: this._curCfg.servantId });
    };
    PracticeAbilityScrollItem.prototype.getSpaceX = function () {
        return 5;
    };
    /**
     * 不同格子Y间距
     */
    PracticeAbilityScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    PracticeAbilityScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.unlockCallBackHandler, this);
        this._nodeContainer = null;
        this._expProgress = null;
        this._attrAddTxt = null;
        this._attrTxt = null;
        this._curCfg = null;
        this._conditionTxt = null;
        this._isBtnEnable = false;
        this._reqing = false;
        this._goTrick = false;
        this._detailVTxt = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeAbilityScrollItem;
}(ScrollListItem));
__reflect(PracticeAbilityScrollItem.prototype, "PracticeAbilityScrollItem");
//# sourceMappingURL=PracticeAbilityScrollItem.js.map