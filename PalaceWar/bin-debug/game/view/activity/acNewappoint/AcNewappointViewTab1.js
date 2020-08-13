var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 新服庆典 tab1
 * date 2020.6.30
 * author ycg
 */
var AcNewappointViewTab1 = /** @class */ (function (_super) {
    __extends(AcNewappointViewTab1, _super);
    function AcNewappointViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._giftContainer = null;
        _this._giftList = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNewappointViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, this.getGiftRewardCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 534;
        bg.height = 472;
        bg.setPosition(53, 0);
        this.addChild(bg);
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftinfobg", this.getTypeCode()));
        infoBg.setPosition(bg.x + bg.width / 2 - infoBg.width / 2, bg.y + 5);
        this.addChild(infoBg);
        var topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width / 2 - topInfoBg.width / 2, bg.y + 10);
        this.addChild(topInfoBg);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftTop", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.setPosition(topInfoBg.x + topInfoBg.width / 2 - topInfo.width / 2, topInfoBg.y + topInfoBg.height / 2 - topInfo.height / 2);
        this.addChild(topInfo);
        var giftBottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftbottombg", this.getTypeCode()));
        giftBottomBg.setPosition(bg.x + bg.width / 2 - giftBottomBg.width / 2, topInfoBg.y + topInfoBg.height);
        this.addChild(giftBottomBg);
        var giftContainer = new BaseDisplayObjectContainer();
        this._giftContainer = giftContainer;
        var scrollView = ComponentManager.getScrollView(giftContainer, new egret.Rectangle(0, 0, giftBottomBg.width, 202)); //137 65
        this.addChild(scrollView);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        scrollView.setPosition(giftBottomBg.x, giftBottomBg.y);
        this._scrollView = scrollView;
        var weekTime = App.DateUtil.getWeeTs(this.vo.st);
        var data = this.cfg.getGiftListCfg();
        for (var i = 0; i < data.length; i++) {
            var container = new BaseDisplayObjectContainer();
            giftContainer.addChild(container);
            var giftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
            container.width = giftBg.width;
            container.height = scrollView.height;
            container.addChild(giftBg);
            giftBg.setPosition(0, 79);
            var giftImgIndex = i % 3 + 1;
            var gift = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_gift" + giftImgIndex, this.getTypeCode()));
            gift.setPosition(giftBg.x + giftBg.width / 2 - gift.width / 2, 11);
            container.addChild(gift);
            var giftName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftName" + (i + 1), this.getTypeCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            giftName.setPosition(giftBg.x + giftBg.width / 2 - giftName.width / 2, giftBg.y + 34);
            container.addChild(giftName);
            var alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.width = container.width;
            alphaBg.height = 137;
            container.addChild(alphaBg);
            container.setPosition(5 + i * (container.width + 10), 0);
            alphaBg.addTouchTap(this.giftClickHandler, this, [i]);
            //已领取
            var collectFlag = BaseBitmap.create("acnewappoint_collect");
            collectFlag.setScale(1);
            collectFlag.setPosition(container.width / 2 - collectFlag.width * collectFlag.scaleX / 2, giftBg.y + giftBg.height + 2);
            container.addChild(collectFlag);
            collectFlag.visible = false;
            //领取时间
            var timeStr = App.DateUtil.getFormatBySecond(weekTime + i * 86400, 7);
            var getTime = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftGetTime", this.getTypeCode()), ["" + timeStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            getTime.setPosition(container.width / 2 - getTime.width / 2, giftBg.y + giftBg.height + 23);
            container.addChild(getTime);
            getTime.visible = true;
            //领取按钮
            var getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.giftGetBtnClick, this, [data[i].id], null, null, TextFieldConst.COLOR_BLACK);
            getBtn.setScale(0.8);
            getBtn.setPosition(container.width / 2 - getBtn.width * getBtn.scaleX / 2, giftBg.y + giftBg.height + 10);
            container.addChild(getBtn);
            getBtn.visible = false;
            var giftItem = { giftBg: giftBg, gift: gift, container: container, collectFlag: collectFlag, getTime: getTime, getBtn: getBtn };
            this._giftList.push(giftItem);
        }
        giftContainer.width = 10 + data.length * 122 - 10;
        var giftRewadIndex = this.vo.getGiftRewardIndex();
        var offX = Math.min(Math.max(0, (giftRewadIndex - 2) * 122), giftContainer.width - scrollView.width);
        scrollView.setScrollLeft(offX);
        var line = BaseBitmap.create("acnewappoint_line");
        line.width = bg.width - 30;
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, scrollView.y + scrollView.height + 10);
        this.addChild(line);
        var bottomInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftBottomInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        bottomInfo.width = bg.width - 60;
        bottomInfo.lineSpacing = 5;
        bottomInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        bottomInfo.setPosition(bg.x + bg.width / 2 - bottomInfo.width / 2, line.y + line.height + 35);
        this.addChild(bottomInfo);
        this.refreshView();
    };
    AcNewappointViewTab1.prototype.refreshGift = function () {
        var data = this.cfg.getGiftListCfg();
        var currProcess = this.vo.getGiftProcess();
        for (var i = 0; i < data.length; i++) {
            var giftItem = this._giftList[i];
            if (this.vo.isGetGiftReward(data[i].id)) {
                giftItem.giftBg.setRes(App.CommonUtil.getResByCode("acnewappoint_giftitembg2", this.getTypeCode()));
                giftItem.collectFlag.visible = true;
                giftItem.getTime.visible = false;
                giftItem.getBtn.visible = false;
            }
            else {
                giftItem.giftBg.setRes(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
                if (currProcess >= data[i].needDay) {
                    giftItem.collectFlag.visible = false;
                    giftItem.getTime.visible = false;
                    giftItem.getBtn.visible = true;
                }
                else {
                    giftItem.collectFlag.visible = false;
                    giftItem.getTime.visible = true;
                    giftItem.getBtn.visible = false;
                }
            }
        }
    };
    AcNewappointViewTab1.prototype.giftClickHandler = function (target, index) {
        App.LogUtil.log("giftClickHandler " + index);
        var data = this.cfg.getGiftListCfg();
        var itemCfg = data[index];
        var weekTime = App.DateUtil.getWeeTs(this.vo.st);
        var timeStr = App.DateUtil.getFormatBySecond(weekTime + index * 86400, 7);
        var detailStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftGetTime", this.getTypeCode()), ["" + timeStr]);
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW, { aid: this.aid, code: this.code, rewards: itemCfg.getReward, infoStr: detailStr });
    };
    //领取礼包奖励
    AcNewappointViewTab1.prototype.giftGetBtnClick = function (id) {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        App.LogUtil.log("index " + id);
        NetManager.request(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, { activeId: this.vo.aidAndCode, rkey: id });
    };
    AcNewappointViewTab1.prototype.getGiftRewardCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcNewappointViewTab1.prototype.refreshView = function () {
        this.refreshGift();
    };
    Object.defineProperty(AcNewappointViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointViewTab1.prototype.getTypeCode = function () {
        return this.code;
    };
    AcNewappointViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD, this.getGiftRewardCallback, this);
        this._scrollView = null;
        this._giftContainer = null;
        this._giftList = [];
        _super.prototype.dispose.call(this);
    };
    return AcNewappointViewTab1;
}(AcCommonViewTab));
//# sourceMappingURL=AcNewappointViewTab1.js.map