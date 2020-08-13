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
 * 已迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeViewTab1
 */
var WifeViewTab1 = (function (_super) {
    __extends(WifeViewTab1, _super);
    function WifeViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    WifeViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        this._wifVoApi = Api.wifeVoApi;
        this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
        if (this._wifeInfoVoList.length <= 0) {
            return;
        }
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - 230;
        bottomBg.x = 5;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 245);
        this._scrollList = ComponentManager.getScrollList(WifeScrollItem1, this._wifeInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(7, 7);
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        var vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        vigorTF.x = 20;
        vigorTF.y = this._scrollList.y + this._scrollList.height + 37;
        this.addChild(vigorTF);
        this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
        this._vigorNumTF.y = vigorTF.y;
        this.addChild(this._vigorNumTF);
        var vipTipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        vipTipTxt.x = vigorTF.x + 170;
        vipTipTxt.y = vigorTF.y;
        this.addChild(vipTipTxt);
        var needVip = GameConfig.config.wifebaseCfg.needVip;
        if (Api.playerVoApi.getPlayerVipLevel() >= needVip) {
            vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
            var checkbox = ComponentManager.getCheckBox();
            checkbox.x = vipTipTxt.x + vipTipTxt.width + 5;
            checkbox.y = vipTipTxt.y + vipTipTxt.height / 2 - checkbox.height / 2;
            this.addChild(checkbox);
            this._checkBox = checkbox;
            this._checkBox.addTouchTap(this.selectHandler, this);
        }
        else {
            vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt", [needVip]);
        }
        this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "callBtn", this.clickCallBtn, this);
        this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 60;
        this._callBtn.y = vigorTF.y - 14;
        this.addChild(this._callBtn);
        this._callBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "recoverVigor", this.clickCallBtn, this);
        this._recoverBtn.x = GameConfig.stageWidth - this._recoverBtn.width - 60;
        this._recoverBtn.y = this._callBtn.y;
        this.addChild(this._recoverBtn);
        this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._recoverBtn.visible = false;
        this.tick();
    };
    WifeViewTab1.prototype.selectHandler = function () {
        if (this._checkBox.checkSelected()) {
            this._callBtn.setText("wifeBatchTxt2");
        }
        else {
            this._callBtn.setText("callBtn");
        }
    };
    WifeViewTab1.prototype.clickCallBtn = function (param) {
        Api.rookieVoApi.checkNextStep();
        // todo随机传唤
        if (this._wifVoApi.getEnergyNum() > 0) {
            var batchV = false;
            if (this._checkBox && this._checkBox.checkSelected()) {
                batchV = true;
            }
            NetManager.request(NetRequestConst.REQUEST_WIFE_CALL, { autoFlag: batchV });
        }
        else {
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
            if (itemInfoVo && itemInfoVo.num > 0) {
                var message = LanguageManager.getlocal("useItemMsg", [itemInfoVo.name + "x1", LanguageManager.getlocal("vigorDesc")]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: itemInfoVo.icon, iconBg: itemInfoVo.iconBg, num: itemInfoVo.num, msg: message, id: Number(GameConfig.config.wifebaseCfg.needItem), useNum: 1 });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
            }
        }
    };
    WifeViewTab1.prototype.confirmCallbackHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY, null);
    };
    WifeViewTab1.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        var wifeInfoVo = this._wifeInfoVoList[index];
        var id = wifeInfoVo.id;
        // todo打开宠幸妻妾界面
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: id, handler: this });
        SoundManager.stopEffect(SoundConst.EFFECT_WIFE);
        this._selectWifeId = id;
    };
    // 随机传唤后端返回数据后
    WifeViewTab1.prototype.callWifeCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data.data;
        this._loveData = rdata;
        this.tick();
        if (this._checkBox && this._checkBox.checkSelected()) {
            var autoCallWife = rdata.autoCallWife;
            // ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo.name])
            ViewController.getInstance().openView(ViewConst.BASE.WIFECALLBATCHSUCCESSVIEW, [autoCallWife]);
            return;
        }
        if (rdata.lucky) {
            TimerManager.doTimer(2000, 1, this.showLucky, this);
        }
        var id = this._loveData.callWife[0];
        this._scrollList.addEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        this.touchChildren = false;
        var index = Api.wifeVoApi.getWifeIndexVoById(id);
        this._scrollIndex = index;
        this._scrollList.setScrollTopByIndex(index, 500);
        var wideItem = this._scrollList.getItemByIndex(index);
        wideItem.refreshData(id);
        if (rdata.rewards) {
            this._rewardData = rdata.rewards;
            // let rewards= GameData.formatRewardItem(rdata.rewards);
            // if(rewards&&rewards.length>0)
            // {
            // 	App.CommonUtil.playRewardFlyAction(rewards);
            // }
        }
    };
    WifeViewTab1.prototype.refreshItem = function (p) {
        if (!p.data.ret) {
            return;
        }
        if (p.data.ret == true && p.data.data.data.lucky) {
            this.showLucky();
        }
        var index = Api.wifeVoApi.getWifeIndexVoById(this._selectWifeId);
        var wideItem = this._scrollList.getItemByIndex(index);
        wideItem.refreshData(this._selectWifeId);
    };
    // 列表滑动结束后
    WifeViewTab1.prototype.moveComplete = function (event) {
        this.touchChildren = true;
        this._scrollList.removeEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        var posX = this._scrollList.getItemByIndex(this._scrollIndex).x;
        var posY = this._scrollList.getItemByIndex(this._scrollIndex).y;
        var targetPoint = this._scrollList.getItemByIndex(this._scrollIndex).localToGlobal(0, 0);
        // 播放召唤动画，更新数据
        var index = Number(event.data);
        var wifeInfoVo = this._wifeInfoVoList[index];
        var id = this._loveData.callWife[0];
        var childData = null;
        if (this._loveData.childArr.length > 0) {
            childData = this._loveData.childArr[0];
        }
        // if(this._rewardData)
        // {
        // 	let rewards= GameData.formatRewardItem(this._rewardData);
        // 	if(rewards&&rewards.length>0)
        // 	{
        // 		App.CommonUtil.playRewardFlyAction(rewards);
        // 	}
        // }
        ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW, { id: id, type: 1, x: targetPoint.x, y: targetPoint.y, childData: childData, rewards: this._rewardData });
    };
    WifeViewTab1.prototype.showLucky = function () {
        App.CommonUtil.showGodbless("wife");
    };
    // 使用精力丹后端返回数据后
    WifeViewTab1.prototype.recoverEnergyCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data.data;
        this.tick();
    };
    WifeViewTab1.prototype.tick = function () {
        if (this._vigorNumTF == null) {
            return;
        }
        if (this._wifVoApi.getEnergyNum() > 0) {
            this._callBtn.visible = true;
            this._recoverBtn.visible = false;
            this._vigorNumTF.text = this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum();
        }
        else {
            this._callBtn.visible = false;
            this._recoverBtn.visible = true;
            this._vigorNumTF.text = App.DateUtil.getFormatBySecond(this._wifVoApi.getRecoverEnergyTime(), 1);
        }
    };
    WifeViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        if (this._scrollList) {
            this._scrollList = null;
        }
        if (this._wifeInfoVoList) {
            this._wifeInfoVoList = null;
        }
        if (this._vigorNumTF) {
            this._vigorNumTF = null;
        }
        if (this._wifVoApi) {
            this._wifVoApi = null;
        }
        this._loveData = null;
        this._selectWifeId = null;
        this._rewardData = null;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return WifeViewTab1;
}(CommonViewTab));
__reflect(WifeViewTab1.prototype, "WifeViewTab1");
//# sourceMappingURL=WifeViewTab1.js.map