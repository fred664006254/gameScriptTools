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
 * 小额礼包
 * author jiang
 * date 2018.8.28
 * @class AcDailyGiftScrollItem
 */
var AcDailyGiftScrollItem = (function (_super) {
    __extends(AcDailyGiftScrollItem, _super);
    function AcDailyGiftScrollItem() {
        var _this = _super.call(this) || this;
        _this.buyBtn = null;
        _this.limitCount = 0;
        _this.buyCount = 0;
        _this._data = null;
        return _this;
    }
    AcDailyGiftScrollItem.prototype.initItem = function (index, data, code) {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.refreshBtnStatus,this); 
        this.width = 608;
        this.height = 171;
        this._data = data;
        this.limitCount = data.limit ? data.limit : 1;
        var titleImg = App.CommonUtil.getResByCode("acdailygiftview_titlebg" + (index + 1), code);
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);
        var titleBg = BaseBitmap.create(titleImg);
        titleBg.y = 6;
        titleBg.x = 3;
        this.addChild(titleBg);
        var innerBg = BaseBitmap.create("public_9_managebg");
        innerBg.width = 455;
        innerBg.height = 100;
        innerBg.x = bg.x + 10;
        innerBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(innerBg);
        var rechargeCount = 0;
        if (this._data.rechargeCount) {
            rechargeCount = this._data.rechargeCount;
        }
        var buynum = Math.max(0, this.limitCount - rechargeCount);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(buynum == 0 ? "acDailyActivity_buyTips" : "acDailyActivity_buyTimes", [buynum + "/" + this.limitCount]), 22, 0x3e1f0f);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, limitTxt, bg, [20, 20]);
        this.addChild(limitTxt);
        var acdailygift_costbg = BaseBitmap.create("acdailygift_costbg");
        acdailygift_costbg.x = this.width - acdailygift_costbg.width - 20;
        acdailygift_costbg.y = bg.y + 60;
        this.addChild(acdailygift_costbg);
        var acdailygift_costflag = BaseBitmap.create("acdailygift_costflag");
        acdailygift_costflag.x = acdailygift_costbg.x + 53;
        acdailygift_costflag.y = acdailygift_costbg.y + 3;
        this.addChild(acdailygift_costflag);
        var cost = data.cfg ? data.cfg.cost : 0;
        var costTxt = ComponentManager.getBitmapText("" + cost, "tip_fnt");
        costTxt.setScale(0.75);
        costTxt.name = "lvTxt";
        costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width + 1;
        costTxt.y = acdailygift_costflag.y + 3;
        this.addChild(costTxt);
        if (PlatformManager.checkIsEnLang()) {
            var offestWidth = (acdailygift_costbg.width - acdailygift_costflag.width - costTxt.width * 0.75) / 2;
            acdailygift_costflag.x = acdailygift_costbg.x + offestWidth;
            costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width;
        }
        if (PlatformManager.checkIsThSp()) {
            acdailygift_costflag.setVisible(false);
            costTxt.y = acdailygift_costflag.y + 6;
            costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width + 5;
        }
        this.buyBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyBtnHandler, this);
        this.buyBtn.setBtnCdSecond(30);
        this.buyBtn.x = 464;
        this.buyBtn.y = 100;
        this.addChild(this.buyBtn);
        var reward = "1_1_" + (data.cfg ? data.cfg.gemCost : 0) + "|" + (data.cfg ? data.cfg.getReward : '');
        var rewardArr = GameData.formatRewardItem(reward);
        var scroStartY = innerBg.y + 10;
        var tmpX = innerBg.x + 10;
        // for (var index = 0; index < rewardArr.length;index ++){
        //     let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
        //     iconItem.setScale(0.75);
        //     iconItem.x = tmpX;
        //     iconItem.y = scroStartY;
        //     tmpX += (iconItem.width * iconItem.scaleX + 7);
        //     if(tmpX > bg.width - 8){
        //         tmpX = 18;
        //         scroStartY += iconItem.height + 10;
        //         iconItem.x = tmpX;
        //         iconItem.y = scroStartY;
        //         tmpX += (iconItem.width+7);
        //     }
        //     this.addChild(iconItem);
        // }
        var scale = 0.75;
        var iconItemHeight = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            var iconItem = GameData.getItemIcon(rewardArr[i], true, true);
            iconItem.setScale(scale);
            iconItem.setPosition(innerBg.x + 7 + ((iconItem.width * scale + 9) * (i % 5)), innerBg.y + 7 + ((iconItem.height * scale + 12) * Math.floor(i / 5)));
            this.addChild(iconItem);
            iconItemHeight = iconItem.height * scale;
        }
        if ((rewardArr.length / 5) > 1) {
            var addLineNumber = 0;
            if (rewardArr.length % 5 == 0) {
                addLineNumber = (rewardArr.length - 5) / 5;
            }
            else {
                addLineNumber = Math.floor((rewardArr.length - 5) / 5) + 1;
            }
            var offestValue = addLineNumber * iconItemHeight;
            this.height += offestValue;
            bg.height = this.height;
            innerBg.height += offestValue;
            acdailygift_costbg.y += offestValue;
            acdailygift_costflag.y += offestValue;
            costTxt.y += offestValue;
            this.buyBtn.y += offestValue;
        }
        this.refreshBtnStatus();
    };
    AcDailyGiftScrollItem.prototype.buyBtnHandler = function () {
        if (Number(this._data.code) > 4) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this._data.aid, this._data.code);
            if (vo.checkAcEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }
        var rechargeCount = 0;
        if (this._data.rechargeCount) {
            rechargeCount = this._data.rechargeCount;
        }
        var buynum = Math.max(0, this.limitCount - rechargeCount);
        if (buynum <= 0) {
            return;
        }
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        //点击购买按钮
        var rechargeId = this._data.rechargeId;
        PlatformManager.checkPay(rechargeId);
    };
    //刷新按钮状态
    AcDailyGiftScrollItem.prototype.refreshBtnStatus = function () {
        var rechargeCount = 0;
        if (this._data.rechargeCount) {
            rechargeCount = this._data.rechargeCount;
        }
        var buynum = Math.max(0, this.limitCount - rechargeCount);
        if (buynum <= 0) {
            this.buyBtn.setText("atkrace_buy_already");
            //   App.DisplayUtil.changeToGray(this.buyBtn);
            this.buyBtn.setEnable(false);
        }
        else {
            this.buyBtn.setText("acPunishBuyItemBuy");
            //  App.DisplayUtil.changeToNormal(this.buyBtn);
            this.buyBtn.setEnable(true);
        }
    };
    AcDailyGiftScrollItem.prototype.getSpaceX = function () {
        return 5;
    };
    /**
     * 不同格子Y间距
     */
    AcDailyGiftScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDailyGiftScrollItem.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.refreshBtnStatus,this); 
        this.buyBtn = null;
        this.limitCount = 0;
        this.buyCount = 0;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcDailyGiftScrollItem;
}(ScrollListItem));
__reflect(AcDailyGiftScrollItem.prototype, "AcDailyGiftScrollItem");
//# sourceMappingURL=AcDailyGiftScrollItem.js.map