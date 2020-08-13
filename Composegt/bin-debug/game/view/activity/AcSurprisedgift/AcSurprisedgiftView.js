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
 * 惊喜礼包
 * jiangliuyang 2018/12/11
 */
var AcSurprisedgiftView = (function (_super) {
    __extends(AcSurprisedgiftView, _super);
    function AcSurprisedgiftView() {
        var _this = _super.call(this) || this;
        //标头
        _this.titleImg = null;
        //货币数量
        _this.coinText = null;
        //描述
        _this.descText = null;
        //消耗数量
        _this.costText = null;
        //可抽取的数量
        _this.countText = null;
        //抽取button
        _this.goButton = null;
        //剩余时间
        _this.timeText = null;
        _this.coinBg = null;
        _this.giftList = null;
        _this.isPlayAnim = false;
        _this.selectImg = null;
        _this.aid = null;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    Object.defineProperty(AcSurprisedgiftView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSurprisedgiftView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSurprisedgiftView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    AcSurprisedgiftView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACSURPRISEDGIFT_REFRESHVO, this.refreshView, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSURPRISEDGIFTREWARD), this.buyBtnHandlerCaller, this);
        // 上面的背景
        this.titleImg = BaseBitmap.create("surprisedGiftTitle_" + this.code);
        this.titleImg.x = this.viewBg.x + this.viewBg.width / 2 - this.titleImg.width / 2;
        this.titleImg.y = this.viewBg.y - 10;
        this.addChild(this.titleImg);
        // 描述1
        this.descText = ComponentManager.getTextField(LanguageManager.getlocal("acSurprisedGiftViewDesc_" + this.code, [this.cfg.getLimit().toString(), this.cfg.getRatio().toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.descText.x = this.viewBg.width / 2 - this.descText.width / 2;
        this.descText.y = this.viewBg.y + 173;
        this.descText.lineSpacing = 5;
        this.descText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.descText);
        this.coinBg = BaseBitmap.create("public_itemtipbg2");
        this.coinBg.x = this.viewBg.x + 410;
        this.coinBg.y = this.viewBg.y + 125;
        this.addChild(this.coinBg);
        var coin = BaseBitmap.create("surprisedGiftCoin_" + this.code);
        coin.x = this.coinBg.x - coin.width / 2 - 15;
        coin.y = this.coinBg.y + this.coinBg.height / 2 - coin.height / 2;
        this.addChild(coin);
        this.coinText = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.coinText.x = this.coinBg.x + this.coinBg.width / 2 - this.coinText.width / 2;
        this.coinText.y = this.coinBg.y + this.coinBg.height / 2 - this.coinText.height / 2;
        this.addChild(this.coinText);
        //奖励列表
        this.giftList = [];
        var giftData = this.cfg.getGiftList();
        var item = null;
        var itemData = null;
        var rewardData = null;
        var spaceX = 30;
        var spaceY = 1;
        var scale = 0.75 + 0.08;
        var baseWidth = 106 + 13;
        var baseHeight = 106 + 13;
        var startX = this.viewBg.width / 2 - (baseWidth * scale * 3 + spaceX * 2) / 2 + 6;
        var startY = this.viewBg.y + this.viewBg.height / 2 - (baseHeight * scale * 3 + spaceY * 2) / 2 + 39 + 8;
        for (var i = 0; i < giftData.length; i++) {
            itemData = giftData[i];
            rewardData = GameData.formatRewardItem(itemData[0])[0];
            if (itemData[2] == 1) {
                item = GameData.getItemIcon(rewardData, true, true);
            }
            else {
                item = GameData.getItemIcon(rewardData, true, false);
            }
            item.setScale(scale);
            var iconBg = item.getChildByName("iconBg");
            iconBg.texture = ResourceManager.getRes("surprisedGiftItemBg");
            item.x = startX + (i % 3) * (baseWidth * scale + spaceX);
            item.y = startY + Math.floor(i / 3) * (baseHeight * scale + spaceY);
            this.giftList.push(item);
            this.addChild(item);
            if (this.vo.checkHave(i)) {
                var itemMask = BaseBitmap.create("surprisedGiftMark_1");
                itemMask.x = item.x - 2.5;
                itemMask.y = item.y - 2.5;
                this.addChild(itemMask);
                var getItemText = ComponentManager.getTextField(LanguageManager.getlocal("acSurprisedGiftViewGet"), 18, 0x3cff00);
                getItemText.x = itemMask.x + itemMask.width / 2 - getItemText.width / 2;
                getItemText.y = itemMask.y + itemMask.height / 2 - getItemText.height / 2 + 20;
                this.addChild(getItemText);
            }
        }
        this.goButton = ComponentManager.getButton("firstchargebutton01", "acSurprisedGiftViewBtn", this.confirmHandler, this);
        this.goButton.setColor(TextFieldConst.COLOR_BROWN);
        this.goButton.x = this.viewBg.width / 2 - this.goButton.width / 2;
        this.goButton.y = this.viewBg.y + this.viewBg.height - 70 - this.goButton.height;
        this.addChild(this.goButton);
        var dayCoin = BaseBitmap.create("surprisedGiftCoin_" + this.code);
        dayCoin.setScale(0.8);
        dayCoin.x = this.goButton.x + 50;
        dayCoin.y = this.goButton.y - 5 - dayCoin.height * dayCoin.scaleY;
        this.addChild(dayCoin);
        this.costText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.costText.x = dayCoin.x + dayCoin.width + 10;
        this.costText.y = dayCoin.y + dayCoin.height / 2 - this.costText.height / 2 - 2;
        this.addChild(this.costText);
        this.countText = ComponentManager.getTextField(LanguageManager.getlocal("acSurprisedGiftViewCount", [this.vo.getResidueCount().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countText.x = this.viewBg.width / 2 - this.countText.width / 2;
        this.countText.y = this.goButton.y + this.goButton.height + 5;
        this.addChild(this.countText);
        // 时间
        var t = this.vo.et - GameData.serverTime;
        if (t < 0) {
            t = 0;
        }
        var timeTxt = App.DateUtil.getFormatBySecond(t, 8);
        this.timeText = ComponentManager.getTextField(LanguageManager.getlocal("acSurprisedGiftViewTime", [timeTxt]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.timeText.x = this.viewBg.width / 2 - this.timeText.width / 2;
        this.timeText.y = this.viewBg.y + this.viewBg.height + 20;
        this.addChild(this.timeText);
        this.refreshView();
    };
    AcSurprisedgiftView.prototype.refreshView = function () {
        this.coinText.text = this.vo.getScoreNum().toString();
        this.coinText.x = this.coinBg.x + this.coinBg.width / 2 - this.coinText.width / 2;
        this.coinText.y = this.coinBg.y + this.coinBg.height / 2 - this.coinText.height / 2;
        this.costText.text = this.vo.getCurCost().toString();
        if (this.vo.getRewardCount() <= this.vo.curCount()) {
            // 已经抽取完了
            this.countText.text = LanguageManager.getlocal("acSurprisedGiftViewCountOver");
        }
        else {
            //当日还可以抽取次数
            var residueCount = this.vo.getResidueCount();
            this.countText.text = LanguageManager.getlocal("acSurprisedGiftViewCount", [residueCount.toString()]);
        }
    };
    AcSurprisedgiftView.prototype.tick = function () {
        var t = this.vo.getResidueTime();
        if (t < 0) {
            // t = 0;
            TickManager.removeTick(this.tick, this);
            this.timeText.text = LanguageManager.getlocal("acChristmasActiveOver");
            this.timeText.x = this.viewBg.width / 2 - this.timeText.width / 2;
            this.timeText.y = this.viewBg.y + this.viewBg.height + 20;
            // this.hide();
        }
        else {
            var timeTxt = App.DateUtil.getFormatBySecond(t, 8);
            this.timeText.text = LanguageManager.getlocal("acSurprisedGiftViewTime", [timeTxt]);
        }
    };
    AcSurprisedgiftView.prototype.hide = function () {
        if (this.isPlayAnim) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcSurprisedgiftView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("surprisedGiftBg_" + this.code);
        this.viewBg.width = 634;
        this.viewBg.height = 773;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    AcSurprisedgiftView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    AcSurprisedgiftView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width - 40, this.viewBg.y + 50);
        this.closeBtn.setScale(0.8);
    };
    // protected getBgName():string
    // {
    // 	return "acchargereturngem_bg"
    // }
    AcSurprisedgiftView.prototype.getTitleStr = function () {
        return null;
    };
    AcSurprisedgiftView.prototype.buyBtnHandlerCaller = function (event) {
        var _this = this;
        if (event.data.data.ret == 0) {
            this.goButton.setEnable(false);
            this.closeBtn.setEnable(false);
            var rewards_1 = event.data.data.data.rewards;
            var rewardpos_1 = event.data.data.data.rewardpos;
            this.isPlayAnim = true;
            if (this.selectImg == null) {
                this.selectImg = BaseBitmap.create("surprisedGiftSelect");
                this.selectImg.setScale(0.75 + 0.08);
                this.addChild(this.selectImg);
            }
            this.selectImg.x = this.giftList[0].x;
            this.selectImg.y = this.giftList[0].y;
            this.selectImg.visible = true;
            var turnTime = 1000 + Math.floor(Math.random() * 1000);
            var turnIndex = rewardpos_1 - 1 + (Math.floor(Math.random() * 3) + 3) * 9;
            var tempObj_1 = { x: 0 };
            var offX_1 = 108 * 0.75 / 2 - 124 * 0.75 / 2;
            var offY_1 = 108 * 0.75 / 2 - 124 * 0.75 / 2;
            egret.Tween.get(tempObj_1, {
                onChange: function () {
                    var curIndex = Math.floor(tempObj_1.x);
                    _this.selectImg.x = _this.giftList[curIndex % 9].x + offX_1;
                    _this.selectImg.y = _this.giftList[curIndex % 9].y + offY_1;
                }
            })
                .to({ x: turnIndex }, turnTime, egret.Ease.quadInOut);
            egret.Tween.get(this.selectImg)
                .wait(turnTime + 300)
                .to({ alpha: 0 }, 50)
                .wait(50)
                .to({ alpha: 1 }, 50)
                .wait(50)
                .to({ alpha: 0 }, 50)
                .wait(50)
                .to({ alpha: 1 }, 50)
                .wait(50)
                .to({ alpha: 0 }, 50)
                .wait(50)
                .to({ alpha: 1 }, 50)
                .wait(50)
                .to({ alpha: 0 }, 50)
                .wait(50)
                .to({ alpha: 1 }, 50)
                .wait(500)
                .call(function () {
                var item = _this.giftList[rewardpos_1 - 1];
                var mask = BaseBitmap.create("surprisedGiftMark_1");
                mask.width = mask.height = 94;
                mask.x = item.x - 2;
                mask.y = item.y - 2;
                _this.addChild(mask);
                var getItemText = ComponentManager.getTextField(LanguageManager.getlocal("acSurprisedGiftViewGet"), 18, 0x3cff00);
                getItemText.x = mask.x + mask.width / 2 - getItemText.width / 2;
                getItemText.y = mask.y + mask.height / 2 - getItemText.height / 2 + 20;
                _this.addChild(getItemText);
                _this.isPlayAnim = false;
                _this.goButton.setEnable(true);
                _this.closeBtn.setEnable(true);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "otherRewards": null, "isPlayAni": true });
            }, this);
        }
    };
    AcSurprisedgiftView.prototype.confirmHandler = function () {
        if (this.isPlayAnim) {
            return;
        }
        if (this.vo.getResidueTime() < 0) {
            //活动时间结束了
            App.CommonUtil.showTip(LanguageManager.getlocal("acSurprisedGiftViewTimeNotEnough"));
            return;
        }
        if (this.vo.getScoreNum() < this.vo.getCurCost()) {
            //没有分数了
            var message = LanguageManager.getlocal("acSurprisedGiftViewScoreNotEnoughNew");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        if (this.vo.getRewardCount() <= this.vo.curCount()) {
            // 已经抽取完了
            App.CommonUtil.showTip(LanguageManager.getlocal("acSurprisedGiftViewAllCountNotEnough"));
            return;
        }
        if (this.vo.getResidueCount() <= 0) {
            //当天没有次数了
            App.CommonUtil.showTip(LanguageManager.getlocal("acSurprisedGiftViewDayCountNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETSURPRISEDGIFTREWARD, { activeId: this.aid + "-" + this.code });
        // this.hide();
    };
    AcSurprisedgiftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01"
        ]);
    };
    AcSurprisedgiftView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACSURPRISEDGIFT_REFRESHVO, this.refreshView, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSURPRISEDGIFTREWARD), this.buyBtnHandlerCaller, this);
        TickManager.removeTick(this.tick, this);
        //标头
        this.titleImg = null;
        //货币数量
        this.coinText = null;
        //描述
        this.descText = null;
        //消耗数量
        this.costText = null;
        //
        this.countText = null;
        //抽取button
        this.goButton = null;
        //剩余时间
        this.timeText = null;
        this.coinBg = null;
        this.isPlayAnim = false;
        this.selectImg = null;
        _super.prototype.dispose.call(this);
    };
    return AcSurprisedgiftView;
}(PopupView));
__reflect(AcSurprisedgiftView.prototype, "AcSurprisedgiftView");
