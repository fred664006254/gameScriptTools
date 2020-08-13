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
var AcDailyActivityView = (function (_super) {
    __extends(AcDailyActivityView, _super);
    function AcDailyActivityView() {
        var _this = _super.call(this) || this;
        _this.buyBtn = undefined;
        _this._getList = undefined;
        _this._curgid = undefined;
        _this._acVo = undefined;
        _this._boxList = [];
        _this.cfgObj = undefined;
        _this._worthTxt = undefined;
        _this._btnList = [];
        return _this;
    }
    AcDailyActivityView.prototype.initView = function () {
        if (PlatformManager.checkNeedCheckPurchase()) {
            PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
        }
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshFromNotify, this);
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.cfgObj = Config.AcCfg.DailyActivityCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this._acVo.isShowRedDot) {
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED, { activeId: this.aid + "-" + this.code });
        }
        var topbg1 = BaseBitmap.create("acdailyactivity_topbg1");
        topbg1.x = GameConfig.stageWidth / 2 - topbg1.width / 2;
        topbg1.y = -15;
        this.addChildToContainer(topbg1);
        var topbg2 = BaseBitmap.create("acdailyactivity_topbg2");
        topbg2.x = GameConfig.stageWidth / 2 - topbg2.width / 2;
        topbg2.y = topbg1.y;
        this.addChildToContainer(topbg2);
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.anchorOffsetX = arrow_leftBtn.width / 2;
        arrow_leftBtn.scaleX = arrow_leftBtn.scaleY = 0.75;
        arrow_leftBtn.x = 25;
        arrow_leftBtn.y = topbg2.y + topbg2.height / 2 - arrow_leftBtn.height / 2 - 5;
        this.addChildToContainer(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1 * 0.75;
        arrow_rightBtn.scaleY = 0.75;
        var tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x;
        arrow_rightBtn.x = tarRightPosX;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChildToContainer(arrow_rightBtn);
        var bottombg = BaseBitmap.create("arena_bottom");
        bottombg.x = GameConfig.stageWidth / 2 - bottombg.width / 2;
        bottombg.y = GameConfig.stageHeigth - this.container.y - bottombg.height;
        this.addChildToContainer(bottombg);
        // this.buyBtn = ComponentManager.getButton("recharge_bigbtn","acPunishBuyItemBuy",this.buyBtnHandler,this);
        // this.buyBtn.setBtnCdSecond(10);
        // this.buyBtn.x = bottombg.x + bottombg.width/2 - this.buyBtn.width/2;
        // this.buyBtn.y = bottombg.y + bottombg.height/2 - this.buyBtn.height/2+3;
        // this.addChildToContainer(this.buyBtn);
        var midbg = BaseBitmap.create("public_9_bg22");
        midbg.x = GameConfig.stageWidth / 2 - midbg.width / 2;
        midbg.y = topbg2.y + topbg2.height - 10;
        midbg.height = bottombg.y - midbg.y;
        this.addChildToContainer(midbg);
        var topbg3 = BaseLoadBitmap.create("acdailyactivity_topbg3-" + this.code);
        topbg3.width = 600;
        topbg3.height = 254;
        topbg3.x = GameConfig.stageWidth / 2 - topbg3.width / 2;
        topbg3.y = midbg.y + 18;
        this.addChildToContainer(topbg3);
        var line = BaseBitmap.create("public_line3");
        line.width = 460;
        line.x = GameConfig.stageWidth / 2 - line.width / 2;
        line.y = topbg3.y + 10;
        this.addChildToContainer(line);
        this._boxNameTxt = ComponentManager.getTextField("", 26, TextFieldConst.COLOR_WARN_YELLOW);
        this._boxNameTxt.x = GameConfig.stageWidth / 2;
        // this._boxNameTxt.y = line.y + line.height / 2 - 13;
        this._boxNameTxt.y = topbg3.y + 6;
        this.addChildToContainer(this._boxNameTxt);
        this._cdText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._cdText.x = topbg3.x + 10;
        this._cdText.y = topbg3.y + topbg3.height - 27;
        this.addChildToContainer(this._cdText);
        this._buyTimesText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._buyTimesText.x = topbg3.x + topbg3.width - 12;
        this._buyTimesText.y = this._cdText.y;
        this.addChildToContainer(this._buyTimesText);
        var descbg = BaseBitmap.create("acdailyactivity_descbg");
        descbg.height = 120;
        descbg.x = topbg3.x;
        descbg.y = topbg3.y + topbg3.height / 2 - descbg.height / 2;
        this.addChildToContainer(descbg);
        this._boxDesceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._boxDesceTxt.x = descbg.x + descbg.width / 2 - this._boxDesceTxt.width / 2;
        this._boxDesceTxt.y = descbg.y + 12;
        this._boxDesceTxt.multiline = true;
        this._boxDesceTxt.lineSpacing = 4;
        this._boxDesceTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._boxDesceTxt);
        var _worthimg = BaseBitmap.create("acdailyactivity_worth");
        _worthimg.x = descbg.x + descbg.width / 2 - _worthimg.width - 30;
        _worthimg.y = descbg.y + descbg.height - _worthimg.height - 3;
        if (PlatformManager.checkIsThSp()) {
            _worthimg.x = descbg.x + descbg.width / 2 - _worthimg.width + 25;
        }
        this.addChildToContainer(_worthimg);
        this._worthTxt = ComponentManager.getBitmapText("", "dailyactivity_fnt", TextFieldConst.COLOR_LIGHT_YELLOW);
        this._worthTxt.x = _worthimg.x + _worthimg.width;
        this._worthTxt.y = _worthimg.y + 2;
        if (PlatformManager.checkIsThSp()) {
            this._worthTxt.y = _worthimg.y + 6;
        }
        this.addChildToContainer(this._worthTxt);
        var innerbg = BaseBitmap.create("public_9_managebg");
        innerbg.width = GameConfig.stageWidth - 40;
        innerbg.height = midbg.height - topbg3.height - 50 - 30;
        innerbg.x = GameConfig.stageWidth / 2 - innerbg.width / 2;
        innerbg.y = topbg3.y + topbg3.height + 5;
        this.addChildToContainer(innerbg);
        if (PlatformManager.checkIsEnSp()) {
            innerbg.height = midbg.height - topbg3.height - 50 - 50;
        }
        var list = this.cfgObj.getList();
        var keys = Object.keys(list);
        keys.sort();
        this._curgid = keys[0];
        var topListNode = new BaseDisplayObjectContainer();
        for (var index = 0; index < keys.length; index++) {
            var tmpKey = keys[index];
            var boxres = this.getBoxImgPre(index);
            var box = BaseBitmap.create(boxres);
            box.addTouchTap(this.boxBtnHandler, this, [tmpKey]);
            box.x = 10 + (box.width + 10) * index;
            box.y = 7;
            topListNode.addChild(box);
            if (index == 0) {
                box.texture = ResourceManager.getRes(boxres + "_down");
                this._lastBox = box;
            }
            var cost = this.cfgObj.getRechargeItemById(tmpKey).cost;
            var boxName = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxName.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
            boxName.x = box.x + box.width / 2 - boxName.width / 2;
            boxName.y = boxName.y + 110;
            topListNode.addChild(boxName);
            var buyBtnTmp = ComponentManager.getButton("recharge_bigbtn", "acPunishBuyItemBuy", this.buyBtnHandler, this);
            if (PlatformManager.checkIsXlySp() && Api.playerVoApi.getPlayerVipLevel() < 1) {
                buyBtnTmp.setBtnCdSecond(0);
            }
            else {
                buyBtnTmp.setBtnCdSecond(30);
            }
            buyBtnTmp.x = bottombg.x + bottombg.width / 2 - buyBtnTmp.width / 2;
            buyBtnTmp.y = bottombg.y + bottombg.height / 2 - buyBtnTmp.height / 2 + 3;
            this.addChildToContainer(buyBtnTmp);
            var rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
            var params = [];
            if (PlatformManager.checkisLocalPrice() && rechargecfgObj.platFullPrice) {
                params.push(rechargecfgObj.platFullPrice);
                params.push("");
            }
            else {
                params.push("" + rechargecfgObj.cost);
            }
            var btnTxt = LanguageManager.getlocal("anyMoney", params);
            buyBtnTmp.setText(btnTxt, false);
            this._btnList.push(buyBtnTmp);
        }
        var rect = new egret.Rectangle(0, 0, 520, topbg1.height);
        var scrolView = ComponentManager.getScrollView(topListNode, rect);
        scrolView.verticalScrollPolicy = "off";
        scrolView.bounces = false;
        scrolView.x = 60;
        scrolView.y = topbg1.y;
        this.addChildToContainer(scrolView);
        this._topScrolView = scrolView;
        var rect2 = new egret.Rectangle(0, 0, innerbg.width, innerbg.height - 10);
        this._getList = ComponentManager.getScrollList(AcDailyActivityScrollItem, [], rect2);
        this._getList.x = innerbg.x + 2;
        this._getList.y = innerbg.y + 5;
        this.addChildToContainer(this._getList);
        this.refreshRewardItems();
        var vipTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        vipTipTxt.setPosition(innerbg.x + innerbg.width / 2 - vipTipTxt.width / 2, innerbg.y + innerbg.height + 10);
        this.addChildToContainer(vipTipTxt);
        if (PlatformManager.checkIsEnSp()) {
            var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
            var timeZoneDes = ComponentManager.getTextField(LanguageManager.getlocal("actimeZoneTip", [zoneStr + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            timeZoneDes.y = vipTipTxt.y + vipTipTxt.height + 5;
            timeZoneDes.x = vipTipTxt.x + vipTipTxt.width / 2 - timeZoneDes.width / 2;
            this.addChildToContainer(timeZoneDes);
        }
    };
    AcDailyActivityView.prototype.refreshFromNotify = function () {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.refreshbuyTimes();
    };
    AcDailyActivityView.prototype.buyBtnHandler = function () {
        if (PlatformManager.checkIsXlySp()) {
            if (Api.playerVoApi.getPlayerVipLevel() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acdailyBuyDes"));
                return;
            }
        }
        if (!this._acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var cost = boxCfg.cost;
        if (this._acVo.getBuyTimes(cost) >= boxCfg.limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acDailyActivity_buyTips"));
            this.refreshFromNotify();
            return;
        }
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        PlatformManager.checkPay(cost);
    };
    AcDailyActivityView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            this.showBuyRewards();
            this.refreshbuyTimes();
            if (data.data.data.payment) {
                var itemid = data.data.data.payment.itemId;
                PlatformManager.analyticsPay(itemid, data.data.data.payment.orderId);
            }
        }
    };
    AcDailyActivityView.prototype.showBuyRewards = function () {
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.cost);
        var getReward = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        var rewObj = GameData.formatRewardItem(getReward);
        App.CommonUtil.playRewardFlyAction(rewObj);
    };
    AcDailyActivityView.prototype.boxBtnHandler = function (obj, param) {
        if (param == this._curgid) {
            return;
        }
        if (obj.target) {
            var resStr = this.getBoxImgPre(this._curgid);
            var resStr2 = this.getBoxImgPre(param);
            this._lastBox.texture = ResourceManager.getRes(resStr);
            var target = obj.target;
            target.texture = ResourceManager.getRes(resStr2 + "_down");
            this._lastBox = target;
        }
        this._curgid = param;
        this.refreshUIInfo();
        this.showBtn(Number(param));
    };
    /**
     * 显示btn按钮
     */
    AcDailyActivityView.prototype.showBtn = function (index) {
        for (var i = 0; i < this._btnList.length; i++) {
            if (index == i) {
                this._btnList[i].setVisible(true);
                if (PlatformManager.checkIsEnLang()) {
                    var boxCfg = this.cfgObj.getRechargeItemById(String(index));
                    var times = this._acVo.getBuyTimes(boxCfg.cost);
                    var limt = boxCfg.limit;
                    var rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.cost);
                    if (Number(times) == Number(limt)) {
                        // TickManager.removeTick(this._btnList[i].tick, this._btnList[i]);
                        // this._btnList[i].setText(LanguageManager.getlocal("anyMoney", [String(rechargecfgObj.cost)]), false)
                        this._btnList[i].clearBtnTick();
                        this._btnList[i].setEnable(false);
                    }
                }
            }
            else {
                this._btnList[i].setVisible(false);
            }
        }
    };
    AcDailyActivityView.prototype.getBoxImgPre = function (idx) {
        idx = Number(idx);
        var resStr = "acdailyactivity_box";
        if (idx <= 1) {
            return resStr += 1;
        }
        else if (idx >= 5) {
            return resStr += 3;
        }
        else {
            return resStr += 2;
        }
    };
    AcDailyActivityView.prototype.refreshUIInfo = function () {
        this.refreshRewardItems();
    };
    AcDailyActivityView.prototype.refreshRewardItems = function () {
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var cost = boxCfg.cost;
        var rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
        // let btnTxt = LanguageManager.getlocal("anyMoney",[""+rechargecfgObj.cost]);
        // this.buyBtn.setText(btnTxt,false);
        var rewards = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        this._getList.refreshData(GameData.formatRewardItem(rewards));
        this._boxNameTxt.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
        this._boxNameTxt.anchorOffsetX = this._boxNameTxt.width / 2;
        this._boxDesceTxt.text = LanguageManager.getlocal("acDailyActivity_boxDesc_" + cost);
        this._boxDesceTxt.anchorOffsetX = this._boxDesceTxt.width / 2;
        this._worthTxt.text = boxCfg.show * 100 + "%";
        this.refreshbuyTimes();
        this.showBtn(0);
    };
    AcDailyActivityView.prototype.refreshbuyTimes = function () {
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var times = this._acVo.getBuyTimes(boxCfg.cost);
        var limt = boxCfg.limit;
        var str = (limt - times) + "/" + limt;
        this._buyTimesText.text = LanguageManager.getlocal("acDailyActivity_buyTimes", [str]);
        this._buyTimesText.anchorOffsetX = this._buyTimesText.width;
        if (limt <= times) {
            // this.buyBtn.setEnable(false);
        }
        else {
            // this.buyBtn.setEnable(true);
        }
        if (PlatformManager.checkIsEnLang()) {
            this.showBtn(Number(this._curgid));
        }
    };
    AcDailyActivityView.prototype.tick = function () {
        if (this._acVo.isStart) {
            this._cdText.text = LanguageManager.getlocal("acFourPeople_acCD", [this._acVo.acCountDown]);
        }
        else {
            this._cdText.text = "";
        }
    };
    AcDailyActivityView.prototype.switchHandler = function (param) {
        var changeW = 505;
        var scroL = this._topScrolView.scrollLeft;
        if (param == "right") {
            if (scroL + changeW > this._topScrolView.getMaxScrollLeft()) {
                scroL = this._topScrolView.getMaxScrollLeft();
            }
            else {
                scroL += changeW;
            }
        }
        if (param == "left") {
            if (scroL - changeW < 0) {
                scroL = 0;
            }
            else {
                scroL -= changeW;
            }
        }
        this._topScrolView.setScrollPosition(0, scroL);
        // this.refreshUIInfo();
    };
    AcDailyActivityView.prototype.getTitleStr = function () {
        return "acDailyActivityViewTitle";
    };
    AcDailyActivityView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acdailyactivity_box1_down", "acdailyactivity_box1", "acdailyactivity_box2_down", "dailyactivity_fnt", "acdailyactivity_worth",
            "acdailyactivity_box2", "acdailyactivity_box3_down",
            "acdailyactivity_box3", "acdailyactivity_topbg1", "acdailyactivity_topbg2", "acdailyactivity_descbg",
            "arena_bottom", "recharge_bigbtn_down", "recharge_bigbtn",
        ]);
    };
    AcDailyActivityView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshFromNotify, this);
        this.buyBtn = null;
        this._getList = null;
        this._curgid = null;
        this._cdText = null;
        this._buyTimesText = null;
        this._acVo = null;
        this._boxNameTxt = null;
        this._boxDesceTxt = null;
        this._boxList = null;
        this._lastBox = null;
        this.cfgObj = null;
        this._btnList = [];
        _super.prototype.dispose.call(this);
    };
    return AcDailyActivityView;
}(AcCommonView));
__reflect(AcDailyActivityView.prototype, "AcDailyActivityView");
//# sourceMappingURL=AcDailyActivityView.js.map