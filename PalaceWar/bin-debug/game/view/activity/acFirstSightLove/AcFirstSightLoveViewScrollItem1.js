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
 * 倾心礼包item
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewScrollItem1
 */
var AcFirstSightLoveViewScrollItem1 = (function (_super) {
    __extends(AcFirstSightLoveViewScrollItem1, _super);
    function AcFirstSightLoveViewScrollItem1() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._vo = null;
        return _this;
    }
    AcFirstSightLoveViewScrollItem1.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        var id = itemParam.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        var itemBgStr = ResourceManager.hasRes("ac_firstsightlove_loveitembg-" + this.getTypeCode()) ? "ac_firstsightlove_loveitembg-" + this.getTypeCode() : "ac_firstsightlove_loveitembg-1";
        var itemBg = BaseBitmap.create(itemBgStr);
        // itemBg.width = 600;
        this.addChild(itemBg);
        this.width = itemBg.width;
        this.height = itemBg.height;
        var titleBg = BaseBitmap.create("alliance_taskAttrbg1");
        // titleBg.width = itemBg.width;
        // titleBg.height = 35;
        titleBg.setPosition(itemBg.x + itemBg.width / 2 - itemBg.width / 2, itemBg.y + 5);
        this.addChild(titleBg);
        //标题
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLoveGiftTittle_" + (index + 1) + "-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        //限购数
        var currNum = vo.getAchieveNumById(data.id);
        var buyLimit = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLoveBuyLimit", [String(data.limit - currNum), String(data.limit)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        buyLimit.setPosition(itemBg.x + itemBg.width - 24 - buyLimit.width, itemBg.y + 15);
        this.addChild(buyLimit);
        //礼包
        var giftId = index + 1;
        if (giftId <= 2) {
            giftId = 4;
        }
        else if (giftId >= 3 && giftId <= 5) {
            giftId = 3;
        }
        else if (giftId >= 6 && giftId <= 8) {
            giftId = 2;
        }
        else {
            giftId = 1;
        }
        var giftBgStr = ResourceManager.hasRes("ac_firstsightlove_lovespecial_itembg0-" + this.getTypeCode()) ? "ac_firstsightlove_lovespecial_itembg0-" + this.getTypeCode() : "ac_firstsightlove_lovespecial_itembg0-1";
        var giftBg = BaseBitmap.create(giftBgStr);
        giftBg.setPosition(itemBg.x + 5, titleBg.x + titleBg.height + 7);
        this.addChild(giftBg);
        var giftStr = ResourceManager.hasRes("ac_firstsightlove_box" + giftId + "-" + this.getTypeCode()) ? "ac_firstsightlove_box" + giftId + "-" + this.getTypeCode() : "ac_firstsightlove_box" + giftId + "-1";
        var gift = BaseBitmap.create(giftStr);
        gift.setPosition(giftBg.x + giftBg.width / 2 - gift.width / 2, giftBg.y + giftBg.height / 2 - gift.height / 2);
        this.addChild(gift);
        var heartNumBgStr = ResourceManager.hasRes("ac_firstsightlove_love_numbg-" + this.getTypeCode()) ? "ac_firstsightlove_love_numbg-" + this.getTypeCode() : "ac_firstsightlove_love_numbg-1";
        var heartNumBg = BaseBitmap.create(heartNumBgStr);
        heartNumBg.setPosition(giftBg.x + giftBg.width + 7, giftBg.y + giftBg.height - heartNumBg.height + 5);
        this.addChild(heartNumBg);
        var heartNum = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLoveHeartNum-" + this.getTypeCode(), [String(data.addFavor)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        heartNum.setPosition(heartNumBg.x + 62, heartNumBg.y + heartNumBg.height / 2 - heartNum.height / 2 + 2);
        this.addChild(heartNum);
        heartNumBg.width = heartNum.width + 140;
        //超值
        var superBg = BaseBitmap.create("ac_firstsightlove_superflag");
        superBg.setPosition(giftBg.x, giftBg.y);
        //超值特效
        var superEffect = ComponentManager.getCustomMovieClip("acfirstsightlove_flageffect", 8, 70);
        superEffect.setPosition(superBg.x - 20, superBg.y - 28);
        superEffect.playWithTime(0);
        superEffect.setScale(1);
        this.addChild(superBg);
        this.addChild(superEffect);
        // this.addChild(superBg);
        var superNum = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSuperNum", [String(data.originalCost * 100)]), 16, TextFieldConst.COLOR_LIGHT_YELLOW); //TextFieldConst.FONTSIZE_ACTIVITY_COMMON
        superNum.setPosition(superBg.x + 10, superBg.y + 4);
        this.addChild(superNum);
        var superTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveSuperTxt"), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        superTxt.setPosition(superBg.x + 10, superNum.y + superNum.height + 1);
        this.addChild(superTxt);
        //奖励背景
        var rewardBg = BaseBitmap.create("public_9_bg21");
        rewardBg.width = itemBg.width - giftBg.x - giftBg.width - 25;
        rewardBg.height = 100;
        rewardBg.setPosition(giftBg.x + giftBg.width + 5, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);
        var rewardNode = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, rewardBg.width - 10, rewardBg.height - 10);
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.x = rewardBg.x + 5;
        scrollView.y = rewardBg.y + 5;
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        this.addChild(scrollView);
        scrollView.bounces = true;
        var rewards = "";
        if (data.cost) {
            var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.cost);
            rewards = "1_1_" + rechargeCfg.gemCost + "|" + rechargeCfg.getReward;
            // rewards = "1_1_"+ rechargeCfg.gemCost+ "|" + data.getReward; 
        }
        else {
            rewards = data.getReward;
        }
        App.LogUtil.log(index + " daaa: " + data.cost + " rewards: " + rewards);
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.76;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, false);
            rewardDB.setScale(rewardScale);
            // rewardDB.setPosition(rewardNode.x + i * (rewardDB.width * rewardScale + 15), rewardNode.y + 2);
            rewardDB.setPosition(rewardNode.x + i * (rewardDB.width * rewardScale + 10), rewardNode.y + 4);
            rewardNode.addChild(rewardDB);
        }
        //按钮
        var btnContainer = new BaseDisplayObjectContainer();
        this.addChild(btnContainer);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", function () {
            if (!vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            //判断次数
            // let currNum = vo.getAchieveNumById(data.id);
            if (currNum >= data.limit) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acFirstSightLoveLoveLimitTip"));
                return;
            }
            if (data.cost) {
                PlatformManager.checkPay(data.cost);
            }
            else {
                //消耗元宝
                if (data.needGem <= Api.playerVoApi.getPlayerGem()) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY, { activeId: vo.aidAndCode, rkey: data.id });
                }
                else {
                    _this.showRechargeTipView();
                    return;
                }
            }
        }, this);
        buyBtn.setPosition(0, 0);
        btnContainer.addChild(buyBtn);
        btnContainer.width = buyBtn.width;
        btnContainer.height = buyBtn.height;
        btnContainer.setPosition(itemBg.x + itemBg.width - btnContainer.width - 20, itemBg.y + itemBg.height - btnContainer.height - 10);
        if (currNum >= data.limit) {
            buyBtn.setGray(true);
        }
        else {
            buyBtn.setGray(false);
        }
        // //原价
        // let originalCost = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLovePrice-"+this.getTypeCode(), [String(data.originalCost)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        // originalCost.anchorOffsetX = originalCost.width/2;
        // originalCost.setPosition(btnContainer.x + btnContainer.width/2, btnContainer.y + 3);
        // this.addChild(originalCost);
        // //红线
        // let line = BaseBitmap.create("shopview_line");
        // line.width = originalCost.width + 15;
        // line.anchorOffsetX = line.width/2;
        // line.setPosition(btnContainer.x + btnContainer.width/2, originalCost.y + originalCost.height/2 - line.height/2);
        // this.addChild(line);
        //按钮文字
        var curCostStr = "";
        if (data.cost) {
            var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.cost);
            curCostStr = LanguageManager.getlocal("acFirstSightLoveLovePrice-" + this.getTypeCode(), [String(rechargeCfg.cost)]);
        }
        else {
            curCostStr = String(data.needGem);
        }
        var curCost = ComponentManager.getTextField(curCostStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        // curCost.anchorOffsetX = originalCost.width/2;
        curCost.setPosition(btnContainer.x + btnContainer.width / 2 - curCost.width / 2, btnContainer.y + btnContainer.height / 2 - curCost.height / 2);
        this.addChild(curCost);
        if (data.needGem) {
            var moneyIcon = BaseBitmap.create("public_icon1");
            moneyIcon.setScale(0.6);
            var totalWidth = moneyIcon.width * moneyIcon.scaleX + curCost.width;
            moneyIcon.x = btnContainer.x + btnContainer.width / 2 - totalWidth / 2;
            moneyIcon.y = btnContainer.y + btnContainer.height / 2 - moneyIcon.height * moneyIcon.scaleY / 2;
            this.addChild(moneyIcon);
            curCost.x = moneyIcon.x + moneyIcon.width * moneyIcon.scaleX;
        }
    };
    AcFirstSightLoveViewScrollItem1.prototype.showRechargeTipView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "sweetgiftTipTitle",
            msg: LanguageManager.getlocal("sweetgiftTipMsg"),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler: this,
            needCancel: true,
        });
    };
    AcFirstSightLoveViewScrollItem1.prototype.getTypeCode = function () {
        return this._code;
    };
    AcFirstSightLoveViewScrollItem1.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveViewScrollItem1;
}(ScrollListItem));
__reflect(AcFirstSightLoveViewScrollItem1.prototype, "AcFirstSightLoveViewScrollItem1");
//# sourceMappingURL=AcFirstSightLoveViewScrollItem1.js.map