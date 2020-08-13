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
 * author yanyuling
 */
var AcMonopolyTurnRewardScrollItem = (function (_super) {
    __extends(AcMonopolyTurnRewardScrollItem, _super);
    function AcMonopolyTurnRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._curIdx = 0;
        _this._lastReqIdx = null;
        _this._totalVo = undefined;
        return _this;
    }
    AcMonopolyTurnRewardScrollItem.prototype.initItem = function (index, data) {
        this._totalVo = Api.acVoApi.getActivityVoByAidAndCode("monopoly");
        this._uiData = data; // this._totalVo.config.turnReward[data];
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 620;
        bg.height = 246;
        this.addChild(bg);
        var namebg = BaseBitmap.create("acchristmasview_1_red");
        namebg.x = 3;
        namebg.y = 5;
        this._taskTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._taskTxt.text = LanguageManager.getlocal("acMonopoly_turnreward_txt", ["" + this._uiData.id]);
        this._taskTxt.x = namebg.x + 10;
        this._taskTxt.name = "Txt1";
        this._taskTxt.y = namebg.y + namebg.height / 2 - this._taskTxt.height / 2;
        namebg.width = this._taskTxt.width < 139 ? 239 : this._taskTxt.width + 100;
        this.addChild(namebg);
        this.addChild(this._taskTxt);
        var rewardArr = GameData.formatRewardItem(this._uiData.getReward);
        var scroStartY = namebg.y + namebg.height + 15;
        var tmpX = 10;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 20;
                scroStartY += iconItem.height * 0.8 + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 90;
        bg.height = scroStartY + 10;
        this.height = bg.height + 5;
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 145;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height * this._collectBtn.scaleY / 2 + 20;
        this.addChild(this._collectBtn);
        this._taskValueTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._taskValueTxt.text = (this._totalVo.theturn - 1) + "/" + this._uiData.id;
        this._taskValueTxt.x = this._collectBtn.x + this._collectBtn.width / 2 - this._taskValueTxt.width / 2;
        this._taskValueTxt.y = this._collectBtn.y - 25;
        this.addChild(this._taskValueTxt);
        this.refreshBtnStatus();
    };
    AcMonopolyTurnRewardScrollItem.prototype.collectHandler = function () {
        if (!this._totalVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (!this._totalVo.isTurnRewardCollectEnable(this._uiData.id)) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acMonopoly_nettip1'));
            return;
        }
        else {
            this.doRequest();
        }
    };
    AcMonopolyTurnRewardScrollItem.prototype.doRequest = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A, this.refreshUI, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A, { activeId: this._totalVo.aidAndCode, turnId: this._uiData.id });
    };
    AcMonopolyTurnRewardScrollItem.prototype.refreshBtnStatus = function () {
        //任务进度
        var flag = this._totalVo.getTurnFlag(this._uiData.id);
        if (flag) {
            this._collectBtn.setVisible(false);
            this.createCollectFlag();
            this._taskValueTxt.text = "";
        }
        else {
            this._collectBtn.visible = true;
            if (!this._totalVo.isTurnRewardCollectEnable(this._uiData.id)) {
                App.DisplayUtil.changeToGray(this._collectBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(this._collectBtn);
            }
        }
    };
    AcMonopolyTurnRewardScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcMonopolyTurnRewardScrollItem.prototype.refreshUI = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A, this.refreshUI, this);
        if (event) {
            if (event.data && event.data.ret) {
                var data = event.data.data.data;
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                this.refreshBtnStatus();
            }
        }
    };
    AcMonopolyTurnRewardScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcMonopolyTurnRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMonopolyTurnRewardScrollItem.prototype.dispose = function () {
        this._uiData = null;
        this._collectFlag = null;
        this._collectBtn = null;
        this._curIdx = 0;
        this._lastReqIdx = null;
        this._totalVo = null;
        this._goBtn = null;
        this._taskTxt = null;
        this._taskValueTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyTurnRewardScrollItem;
}(ScrollListItem));
__reflect(AcMonopolyTurnRewardScrollItem.prototype, "AcMonopolyTurnRewardScrollItem");
