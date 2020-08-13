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
var BetheKingExScrollItem = (function (_super) {
    __extends(BetheKingExScrollItem, _super);
    function BetheKingExScrollItem() {
        var _this = _super.call(this) || this;
        _this._taskId = "";
        _this._lastRequestTaskId = null;
        _this._requsting = false;
        _this._uiData = undefined;
        return _this;
    }
    BetheKingExScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_EXCHANGE, this.voteCallBackHandler, this);
        this._uiData = data;
        var getReward = this._uiData.getReward;
        this._taskId = this._uiData.id;
        this._aid = BetheKingExScrollItem._ACVO.aid;
        this._code = "" + BetheKingExScrollItem._ACVO.code;
        var taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 145;
        this._nodeContainer.addChild(bg);
        this.height = bg.height + this.getSpaceY();
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 130;
        leftBg.height = 126;
        leftBg.x = 5;
        leftBg.y = 5.5;
        this._nodeContainer.addChild(leftBg);
        var rewardVos = GameData.formatRewardItem(getReward)[0];
        var rewardIcon = GameData.getItemIcon(rewardVos, true);
        rewardIcon.x = bg.x + 15;
        rewardIcon.y = 16;
        this._nodeContainer.addChild(rewardIcon);
        var itemNameBg = BaseBitmap.create("public_biaoti2");
        itemNameBg.x = leftBg.x + leftBg.width + 10;
        itemNameBg.y = leftBg.y + 8;
        itemNameBg.width = 200;
        this._nodeContainer.addChild(itemNameBg);
        var itemNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        itemNameTxt.text = rewardVos.name;
        itemNameTxt.x = itemNameBg.x + itemNameBg.width / 2 - itemNameTxt.width / 2;
        itemNameTxt.y = itemNameBg.y + itemNameBg.height / 2 - itemNameTxt.height / 2 + 2;
        this._nodeContainer.addChild(itemNameTxt);
        var descTxt = ComponentManager.getTextField(rewardVos.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.width = 220;
        descTxt.multiline = true;
        descTxt.lineSpacing = 3;
        descTxt.x = itemNameBg.x + 10;
        descTxt.y = itemNameBg.y + itemNameBg.height + 16;
        this._nodeContainer.addChild(descTxt);
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "betheking_exbtntxt", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 140;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height / 2 + 20;
        this._nodeContainer.addChild(this._collectBtn);
        var presecs = BetheKingExScrollItem._ACVO.et - 86400 - GameData.serverTime;
        if (presecs > 0) {
            App.DisplayUtil.changeToGray(this._collectBtn);
        }
        this._exchangeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._exchangeTxt.text = LanguageManager.getlocal("betheking_ex_popularity", [BetheKingExScrollItem._ACVO.cnum + "/" + this._uiData.voteNum]);
        this._exchangeTxt.x = this._collectBtn.x + this._collectBtn.width / 2 - this._exchangeTxt.width / 2;
        this._exchangeTxt.y = this._collectBtn.y - 35;
        this._nodeContainer.addChild(this._exchangeTxt);
        /**
         * 0未完成 1已完成 2已领取
         */
        // this.refreshUI();    
    };
    BetheKingExScrollItem.prototype.voteCallBackHandler = function (event) {
        this._requsting = false;
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            this._exchangeTxt.text = LanguageManager.getlocal("betheking_ex_popularity", [BetheKingExScrollItem._ACVO.cnum + "/" + this._uiData.voteNum]);
            if (!this._requsting) {
                return;
            }
            var rdata = data.data.data;
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            var pos = this._collectBtn.localToGlobal(this._collectBtn.width / 2, this._collectBtn.height / 2);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
    };
    BetheKingExScrollItem.prototype.collectHandler = function () {
        var presecs = BetheKingExScrollItem._ACVO.et - 86400 - GameData.serverTime;
        if (presecs > 0) {
            var secStr = App.DateUtil.getFormatBySecond(presecs, 8);
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_excdTxt1", [secStr]));
            return;
        }
        if (BetheKingExScrollItem._ACVO.cnum < this._uiData.voteNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheking_extip_txt"));
            return;
        }
        if (!BetheKingExScrollItem._ACVO.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        this._requsting = true;
        NetManager.request(NetRequestConst.REQUEST_KINGS_EXCHANGE, { activeId: BetheKingExScrollItem._ACVO.aidAndCode, exchangeId: this._uiData.id });
    };
    BetheKingExScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this._nodeContainer.addChild(this._collectFlag);
        }
    };
    BetheKingExScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    BetheKingExScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BetheKingExScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_EXCHANGE, this.voteCallBackHandler, this);
        this._nodeContainer = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._taskId = null;
        this._lastRequestTaskId = null;
        this._taskId = null;
        this._aid = null;
        this._code = null;
        this._requsting = false;
        _super.prototype.dispose.call(this);
    };
    return BetheKingExScrollItem;
}(ScrollListItem));
__reflect(BetheKingExScrollItem.prototype, "BetheKingExScrollItem");
