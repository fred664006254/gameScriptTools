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
        _this._topbg3 = null;
        return _this;
    }
    AcDailyActivityView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.cfgObj = Config.AcCfg.DailyActivityCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this._acVo.isShowRedDot) {
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED, { activeId: this.aid + "-" + this.code });
        }
        var resBar = ComponentManager.getResBar(1, true, 145);
        resBar.setPosition(10, 32);
        this.addChild(resBar);
        if (PlatformManager.hasSpcialCloseBtn()) {
            resBar.setPosition(100, 32);
        }
        var topbg = BaseBitmap.create("public_9v_bg02");
        topbg.width = GameConfig.stageWidth;
        topbg.height = GameConfig.stageHeigth - this.container.y;
        topbg.x = GameConfig.stageWidth / 2 - topbg.width / 2;
        topbg.y = -10;
        this.addChildToContainer(topbg);
        var topbg1 = BaseBitmap.create("acdailyactivity_topbg1");
        topbg1.width = 626;
        topbg1.height = 130;
        topbg1.x = GameConfig.stageWidth / 2 - topbg1.width / 2;
        // topbg1.y = -10;
        topbg1.y = 70;
        this.addChildToContainer(topbg1);
        var bottombg = BaseBitmap.create("adult_lowbg");
        bottombg.height = 80;
        bottombg.x = GameConfig.stageWidth / 2 - bottombg.width / 2;
        bottombg.y = GameConfig.stageHeigth - this.container.y - bottombg.height;
        this.addChildToContainer(bottombg);
        // this.buyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acPunishBuyItemBuy",this.buyBtnHandler,this);
        // this.buyBtn.setBtnCdSecond(10);
        // this.buyBtn.setScale(0.8);
        // this.buyBtn.x = bottombg.x + bottombg.width/2 - this.buyBtn.width/2 * this.buyBtn.scaleX ;
        // this.buyBtn.y = bottombg.y + bottombg.height/2 - this.buyBtn.height/2 * this.buyBtn.scaleY ;
        // this.addChildToContainer(this.buyBtn);
        var topbg3 = BaseLoadBitmap.create("acdailyactivity_topbg3-" + this.code);
        topbg3.width = 624;
        topbg3.height = 233;
        topbg3.x = GameConfig.stageWidth / 2 - topbg3.width / 2;
        topbg3.y = topbg1.y + topbg1.height + 2;
        this.addChildToContainer(topbg3);
        this._topbg3 = topbg3;
        if (PlatformManager.checkIsViSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            this._boxNameTxt = ComponentManager.getTextField("", 20);
        }
        else {
            this._boxNameTxt = ComponentManager.getTextField("", 26);
        }
        this._boxNameTxt.x = GameConfig.stageWidth / 2;
        //目前只有日文较长,
        if (PlatformManager.checkIsJPSp()) {
            this._boxNameTxt.x = GameConfig.stageWidth / 2 - 20;
        }
        this._boxNameTxt.y = this._topbg3.y + 40; // + 26 - this._boxNameTxt.height;
        this.addChildToContainer(this._boxNameTxt);
        this._boxDesceTxt = ComponentManager.getTextField("", 18);
        this._boxDesceTxt.x = this._boxNameTxt.x;
        this._boxDesceTxt.y = this._topbg3.y + 40 + 40;
        this._boxDesceTxt.multiline = true;
        this._boxDesceTxt.lineSpacing = 4;
        // this._boxDesceTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._boxDesceTxt);
        var vipTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"), 18, 0x00eb55);
        vipTipTxt.x = this._boxDesceTxt.x;
        vipTipTxt.y = this._boxDesceTxt.y + 50;
        this.addChildToContainer(vipTipTxt);
        this._buyTimesText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._buyTimesText.x = this._boxNameTxt.x;
        this._buyTimesText.y = vipTipTxt.y + 30;
        this.addChildToContainer(this._buyTimesText);
        this._cdText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdText.x = this._boxNameTxt.x;
        this._cdText.y = this._buyTimesText.y + 24;
        this.addChildToContainer(this._cdText);
        var _worthimg = BaseBitmap.create("acdailyactivity_discountbg");
        _worthimg.x = topbg3.x + topbg3.width - _worthimg.width - 20;
        _worthimg.y = topbg3.y + 5;
        this.addChildToContainer(_worthimg);
        // this._worthTxt = ComponentManager.getTextField("100", 22, TextFieldConst.COLOR_WHITE);
        this._worthTxt = ComponentManager.getBitmapText("100", "recharge2_fnt");
        this._worthTxt.setScale(0.78);
        this._worthTxt.x = _worthimg.x + _worthimg.width / 2 - 2;
        this._worthTxt.y = _worthimg.y + 40;
        this.addChildToContainer(this._worthTxt);
        var rewatdbg = BaseBitmap.create("atkracecross_rewatdbg1");
        rewatdbg.x = GameConfig.stageWidth / 2 - topbg3.width / 2;
        rewatdbg.y = topbg3.y + topbg3.height + 2;
        this.addChildToContainer(rewatdbg);
        var line = BaseBitmap.create("atkracecross_rewatdbg1_1");
        line.width = 460;
        line.x = GameConfig.stageWidth / 2 - line.width / 2;
        line.y = rewatdbg.y + rewatdbg.height / 2 - line.height / 2;
        this.addChildToContainer(line);
        var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDailyActivity_rewardtxt"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardTxt.x = GameConfig.stageWidth / 2 - rewardTxt.width / 2;
        rewardTxt.y = rewatdbg.y + rewatdbg.height / 2 - rewardTxt.height / 2;
        this.addChildToContainer(rewardTxt);
        var list = this.cfgObj.getList();
        var keys = Object.keys(list);
        keys.sort();
        this._curgid = keys[0];
        var topListNode = new BaseDisplayObjectContainer();
        topListNode.height = topbg1.height;
        var fntSize = 18;
        var offY = 0;
        var nameOff = 0;
        if (PlatformManager.checkIsViSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            fntSize = 16;
            offY = 10;
            nameOff = 3;
        }
        var index = 0;
        if (!Api.switchVoApi.checkOpenDailyActivity1RmbTap()) {
            // index = 1;
            keys.splice(0, 1);
        }
        for (index; index < keys.length; index++) {
            var tmpKey = keys[index];
            var boxres = this.getBoxImgPre(index);
            var box = ComponentManager.getButton("acdailyactivity_boxbtn", "", this.boxBtnHandler2, this, [tmpKey]);
            // if(Api.switchVoApi.checkOpenDailyActivity1RmbTap())
            // {
            //     box.x = 10 + (box.width+10) * (index-1)
            // }else{
            box.x = 10 + (box.width + 10) * index;
            // }
            box.y = topListNode.height - box.height + offY;
            topListNode.addChild(box);
            box.name = "BoxBtn" + tmpKey;
            // if(index == 0||Api.switchVoApi.checkOpenDailyActivity1RmbTap()&&index == 1)
            if (index == 0) {
                this._lastBoxBtn = box;
                this._lastBoxBtn.updateButtonImage(BaseButton.BTN_STATE2);
                this._curgid = tmpKey;
            }
            this._boxList[tmpKey] = box;
            var cost = this.cfgObj.getRechargeItemById(tmpKey).cost;
            var boxName = ComponentManager.getTextField("", fntSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxName.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
            boxName.x = box.x + box.width / 2 - boxName.width / 2;
            boxName.y = 108 - nameOff; //box.y + box.height - boxName.height - 4 - nameOff;
            topListNode.addChild(boxName);
            var boxImg = BaseLoadBitmap.create("acdailyactivity_box" + (index + 1));
            boxImg.width = 98;
            boxImg.height = 96;
            boxImg.x = box.x + box.width / 2 - boxImg.width / 2;
            boxImg.y = boxName.y - boxImg.height - 2 + nameOff;
            topListNode.addChild(boxImg);
            boxImg.addTouchTap(this.boxBtnHandler, this, [tmpKey]);
            var rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(cost);
            var btnTxt = LanguageManager.getlocal("anyMoney", ["" + rechargecfgObj.cost]);
            var buyBtnTmp = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "", this.buyBtnHandler, this);
            buyBtnTmp.setText(btnTxt, false);
            buyBtnTmp.setBtnCdSecond(60);
            buyBtnTmp.setScale(0.8);
            buyBtnTmp.x = bottombg.x + bottombg.width / 2 - buyBtnTmp.width / 2 * buyBtnTmp.scaleX;
            buyBtnTmp.y = bottombg.y + bottombg.height / 2 - buyBtnTmp.height / 2 * buyBtnTmp.scaleY;
            this.addChildToContainer(buyBtnTmp);
            this._btnList.push(buyBtnTmp);
        }
        topListNode.width += 20;
        var rect = new egret.Rectangle(0, 0, 620, topbg1.height + 10);
        var scrolView = ComponentManager.getScrollView(topListNode, rect);
        scrolView.verticalScrollPolicy = "off";
        scrolView.bounces = false;
        scrolView.x = 10;
        scrolView.y = topbg1.y + 2;
        this.addChildToContainer(scrolView);
        this._topScrolView = scrolView;
        var innerHeight = bottombg.y - rewatdbg.y - rewatdbg.height - 10;
        var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth - 20, innerHeight);
        this._getList = ComponentManager.getScrollList(AcDailyActivityScrollItem, [], rect2);
        this._getList.x = GameConfig.stageWidth / 2 - this._getList.width / 2;
        this._getList.y = rewatdbg.y + rewatdbg.height + 5;
        this.addChildToContainer(this._getList);
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - this.container.y;
        border.anchorOffsetY = border.height;
        border.y = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(border);
        this.refreshRewardItems();
        this.showBtn(0);
    };
    AcDailyActivityView.prototype.refreshFromNotify = function () {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this.refreshbuyTimes();
    };
    AcDailyActivityView.prototype.buyBtnHandler = function () {
        if (!this._acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var cost = boxCfg.cost;
        if (this._acVo.getBuyTimes(cost) >= boxCfg.limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acDailyActivity_buyTips"));
            return;
        }
        PlatformManager.pay(cost);
    };
    /**
  * 显示btn按钮
  */
    AcDailyActivityView.prototype.showBtn = function (index) {
        if (!Api.switchVoApi.checkOpenDailyActivity1RmbTap()) {
            // index = 1;
            index = index - 1;
        }
        if (index < 0) {
            index = 0;
        }
        for (var i = 0; i < this._btnList.length; i++) {
            if (index == i) {
                this._btnList[i].setVisible(true);
            }
            else {
                this._btnList[i].setVisible(false);
            }
        }
    };
    AcDailyActivityView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            this.showBuyRewards();
            this.refreshbuyTimes();
            if (data.data.data.payment) {
                var itemid = data.data.data.payment.itemId;
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
    AcDailyActivityView.prototype.boxBtnHandler2 = function (param) {
        this.boxBtnHandler(null, param);
    };
    AcDailyActivityView.prototype.boxBtnHandler = function (obj, param) {
        if (param == this._curgid) {
            return;
        }
        this._curgid = param;
        this._lastBoxBtn.updateButtonImage(BaseButton.BTN_STATE1);
        var btn = this._boxList[param];
        btn.updateButtonImage(BaseButton.BTN_STATE2);
        this._lastBoxBtn = btn;
        this.refreshUIInfo();
        this.showBtn(Number(param));
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
        var rewards = "1_1_" + rechargecfgObj.gemCost + "|" + rechargecfgObj.getReward;
        this._getList.refreshData(GameData.formatRewardItem(rewards));
        this._boxNameTxt.text = LanguageManager.getlocal("acDailyActivity_boxname_" + cost);
        this._boxNameTxt.y = this._topbg3.y + 40 + 26 - this._boxNameTxt.height;
        this._boxDesceTxt.text = LanguageManager.getlocal("acDailyActivity_boxDesc_" + cost);
        this._worthTxt.text = boxCfg.show * 100 + "%";
        this._worthTxt.anchorOffsetX = this._worthTxt.width / 2 * this._worthTxt.scaleX;
        this.refreshbuyTimes();
    };
    AcDailyActivityView.prototype.refreshbuyTimes = function () {
        var boxCfg = this.cfgObj.getRechargeItemById(this._curgid);
        var times = this._acVo.getBuyTimes(boxCfg.cost);
        var limt = boxCfg.limit;
        var str = (limt - times) + "/" + limt;
        this._buyTimesText.text = LanguageManager.getlocal("acDailyActivity_buyTimes", [str]);
    };
    AcDailyActivityView.prototype.tick = function () {
        if (this._acVo.isStart) {
            this._cdText.text = LanguageManager.getlocal("acDailyActivity_acCD", [this._acVo.acCountDown]);
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
    };
    AcDailyActivityView.prototype.getTitleStr = function () {
        return "acDailyActivityViewTitle";
    };
    AcDailyActivityView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    AcDailyActivityView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acdailyactivity_boxbtn_down", "acdailyactivity_boxbtn",
            "acdailyactivity_discountbg", "acdailyactivity_topbg1", "adult_lowbg",
            "atkracecross_rewatdbg1", "atkracecross_rewatdbg1_1", "commonview_db_04",
            "recharge2_fnt",
        ]);
    };
    AcDailyActivityView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH, this.refreshFromNotify, this);
        this.buyBtn = null;
        this._getList = null;
        this._curgid = null;
        this._cdText = null;
        this._buyTimesText = null;
        this._acVo = null;
        this._boxNameTxt = null;
        this._boxDesceTxt = null;
        this._boxList = [];
        this._lastBoxBtn = null;
        this.cfgObj = null;
        this._topScrolView = null;
        this._worthTxt = null;
        this._btnList = [];
        this._topbg3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcDailyActivityView;
}(AcCommonView));
__reflect(AcDailyActivityView.prototype, "AcDailyActivityView");
