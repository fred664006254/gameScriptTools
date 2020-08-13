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
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBuffScrollItem
 */
var AllianceTaskBuffScrollItem = (function (_super) {
    __extends(AllianceTaskBuffScrollItem, _super);
    function AllianceTaskBuffScrollItem() {
        var _this = _super.call(this) || this;
        _this._requsting = false;
        _this._curCostV = 0;
        return _this;
    }
    AllianceTaskBuffScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF), this.buyCallBack, this);
        this._buffId = data;
        var buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 125;
        // bg.x = 3;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 106;
        leftBg.height = 106;
        leftBg.x = bg.x + 7;
        leftBg.y = bg.y + 5.5;
        this.addChild(leftBg);
        var taskIcon = BaseBitmap.create("alliance_taskIcon" + this._buffId);
        taskIcon.width = 88;
        taskIcon.height = 88;
        taskIcon.x = bg.x + 12;
        taskIcon.y = bg.y + bg.height / 2 - taskIcon.height / 2;
        this.addChild(taskIcon);
        var taskNameBg = BaseBitmap.create("public_biaoti2");
        taskNameBg.x = leftBg.x + leftBg.width + 10;
        taskNameBg.y = taskIcon.y - 8;
        this.addChild(taskNameBg);
        var taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        taskNameTxt.text = LanguageManager.getlocal("allianceTaskBuffName" + this._buffId);
        taskNameTxt.y = taskNameBg.y + taskNameBg.height / 2 - taskNameTxt.height / 2;
        this.addChild(taskNameTxt);
        this._taskNameTxt = taskNameTxt;
        taskNameBg.width = taskNameTxt.width + 100;
        taskNameTxt.x = taskNameBg.x + taskNameBg.width / 2;
        this._taskNameTxt.anchorOffsetX = this._taskNameTxt.width / 2;
        var taskDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._taskDescTxt = taskDescTxt;
        taskDescTxt.x = taskNameBg.x;
        taskDescTxt.y = taskNameTxt.y + 30;
        this.addChild(taskDescTxt);
        var taskCostTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._taskCostTxt = taskCostTxt;
        taskCostTxt.x = taskDescTxt.x;
        taskCostTxt.y = taskDescTxt.y + 30;
        this.addChild(taskCostTxt);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnBuy", this.buyBtnHandler, this);
        buyBtn.x = bg.x + bg.width - 138;
        buyBtn.y = bg.y + bg.height / 2 - buyBtn.height / 2;
        this._buyBtn = buyBtn;
        this.addChild(buyBtn);
        this.refreshBtnStatus();
    };
    AllianceTaskBuffScrollItem.prototype.refreshBtnStatus = function () {
        var buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
        var bnum = Api.allianceTaskVoApi.getBuffBuyTimes(this._buffId);
        var costV = 0;
        var addV = (buffcfg.value * 100);
        if (bnum > 0) {
            addV *= bnum;
            this._taskNameTxt.text = LanguageManager.getlocal("allianceTaskBuffName" + this._buffId) + LanguageManager.getlocal("allianceTask_buffLV", ["" + bnum]);
            this._taskNameTxt.anchorOffsetX = this._taskNameTxt.width / 2;
        }
        var addStr = "";
        if (buffcfg.type.length == 1) {
            addStr = LanguageManager.getlocal("servantInfo_speciality" + buffcfg.type[0]);
        }
        else {
            addStr = LanguageManager.getlocal("servantInfo_speciality7");
        }
        if (bnum < buffcfg.costAsset.length) {
            costV = buffcfg.costAsset[bnum];
            this._taskDescTxt.text = LanguageManager.getlocal("allianceTaskBuffDesc", [addStr, (addV).toFixed(1)]);
            this._taskCostTxt.text = LanguageManager.getlocal("allianceTaskBuffCost", ["" + costV]);
        }
        else {
            costV = buffcfg.costAsset[buffcfg.costAsset.length - 1];
            // this._taskDescTxt.text = LanguageManager.getlocal("allianceTask_buffTopLv");
            this._taskDescTxt.text = LanguageManager.getlocal("allianceTaskBuffDesc", [addStr, (addV).toFixed(1)]);
            this._taskCostTxt.text = LanguageManager.getlocal("allianceTaskBuffCost2");
        }
        this._curCostV = costV;
        var curId = Api.allianceTaskVoApi.getCurrentBuffId();
        var po = Api.allianceVoApi.getMyAllianceVo().po;
        if (po > 2 || (curId && curId != this._buffId)) {
            App.DisplayUtil.changeToGray(this._buyBtn);
            // this._buyBtn.setEnable(false);
        }
        else {
            App.DisplayUtil.changeToNormal(this._buyBtn);
            // this._buyBtn.setEnable(true);
        }
    };
    AllianceTaskBuffScrollItem.prototype.buyCallBack = function (event) {
        var ret = event.data.data.ret;
        if (this._requsting) {
            if (ret == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskBuffBuyTip2"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
            }
        }
        this.refreshBtnStatus();
        this._requsting = false;
    };
    AllianceTaskBuffScrollItem.prototype.buyBtnHandler = function () {
        if (Api.allianceVoApi.getMyAllianceVo().po > 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskBuffBuyTip"));
            return;
        }
        var curId = Api.allianceTaskVoApi.getCurrentBuffId();
        if (curId && curId != this._buffId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_buyBuffTip2"));
            return;
        }
        if (this._curCostV > Api.allianceVoApi.getAllianceVo().wealth) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnTip1"));
            return;
        }
        var tws = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime + 1800 >= tws + 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
            return;
        }
        var buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
        var bnum = Api.allianceTaskVoApi.getBuffBuyTimes(this._buffId);
        if (bnum >= buffcfg.costAsset.length) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_buyBuffTip1"));
            return;
        }
        this._requsting = true;
        NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_BUFF, { buffid: this._buffId });
    };
    AllianceTaskBuffScrollItem.prototype.getSpaceY = function () {
        return 2;
    };
    AllianceTaskBuffScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF), this.buyCallBack, this);
        this._buffId = null;
        this._requsting = false;
        this._buyBtn = null;
        this._curCostV = null;
        this._taskCostTxt = null;
        this._taskNameTxt = null;
        this._taskDescTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskBuffScrollItem;
}(ScrollListItem));
__reflect(AllianceTaskBuffScrollItem.prototype, "AllianceTaskBuffScrollItem");
