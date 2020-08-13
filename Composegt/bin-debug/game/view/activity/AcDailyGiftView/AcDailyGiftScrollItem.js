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
        _this.onlyImg = null;
        _this.emptyImg = null;
        // private limitCount: number = 0;
        _this.buyCount = 0;
        _this.curData = null;
        _this._currId = 0;
        _this.isClick = false;
        _this.curCode = null;
        return _this;
    }
    AcDailyGiftScrollItem.prototype.initItem = function (index, data) {
        this.width = 610;
        this.height = 210;
        var titleImg = "";
        var titleName = "";
        this.curData = data;
        this.curCode = this.curData.code;
        // this.limitCount = data.cfg.limit;
        // this.limitCount = data.limit;
        switch (index) {
            case 0:
                titleImg = "acdailygiftview_titlebg1";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle1");
                break;
            case 1:
                titleImg = "acdailygiftview_titlebg2";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle2");
                break;
            case 2:
                titleImg = "acdailygiftview_titlebg3";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle3");
                break;
        }
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = this.width;
        bg.height = this.height - 10;
        this.addChild(bg);
        var titleBg = BaseBitmap.create(titleImg);
        titleBg.y = 3;
        this.addChild(titleBg);
        var titleText = ComponentManager.getTextField(titleName, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.x = 30;
        titleText.y = titleBg.y + titleBg.height / 2 - titleText.height / 2;
        this.addChild(titleText);
        this.onlyImg = BaseBitmap.create("acdailygiftview_onlysell");
        this.onlyImg.x = 480;
        this.onlyImg.y = 60;
        this.addChild(this.onlyImg);
        this.emptyImg = BaseBitmap.create("acdailygiftview_empty");
        this.emptyImg.x = 480;
        this.emptyImg.y = 65;
        this.addChild(this.emptyImg);
        this.buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.buyBtnHandler, this);
        this.buyBtn.setBtnCdSecond(60);
        // this.buyBtn.setBtnCdCallback(8,this.btnCdCallback,this);
        this.buyBtn.x = this.width - 15 - this.buyBtn.width;
        this.buyBtn.y = 110;
        this.addChild(this.buyBtn);
        var cost = data.cfg.cost;
        this.buyBtn.setText(LanguageManager.getlocal("dailyGiftItemBtnText", [cost]), false);
        var reward = "1_1_" + data.cfg.gemCost + "|" + data.cfg.getReward;
        var rewardArr = GameData.formatRewardItem(reward);
        var scroStartY = 80;
        var tmpX = 18;
        var rewardBg = BaseBitmap.create("public_9v_bg06");
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.75);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 18;
                scroStartY += iconItem.height + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width + 7);
            }
            this.addChild(iconItem);
        }
        this.refreshBtnStatus();
    };
    AcDailyGiftScrollItem.prototype.buyBtnHandler = function () {
        //点击购买按钮
        // this._isClick = true;
        // PlatformManager.pay(rechargeId); 
        var rechargeId = this.curData.rechargeId;
        PlatformManager.pay(rechargeId);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,this.checkCanBuy,this);
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,{});
    };
    AcDailyGiftScrollItem.prototype.checkCanBuy = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL, this.checkCanBuy, this);
        // if(this._isClick){
        var activityInfo = event.data.data.data.activity.info;
        var k = null;
        for (var key in activityInfo) {
            if (key.indexOf("dailyGift-" + this.curCode) > -1) {
                k = key;
                break;
            }
        }
        if (k != null) {
            var info = activityInfo[k];
            var ainfo = info.ainfo;
            if (ainfo[this.curData.rechargeId] != 1) {
                //可以购买
                var rechargeId = this.curData.rechargeId;
                PlatformManager.pay(rechargeId);
            }
        }
        // }
        // this._isClick = false;
    };
    AcDailyGiftScrollItem.prototype.btnCdCallback = function () {
        //  NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,{});
        //  NetManager.request(NetRequestConst.REQUEST_SHOP_GETSHOPCFG,{});
    };
    //刷新按钮状态
    AcDailyGiftScrollItem.prototype.refreshBtnStatus = function () {
        // this._data.rechargeId;
        if (this.curData.rechargeCount == 1) {
            this.buyBtn.visible = false;
            this.onlyImg.visible = false;
            this.emptyImg.visible = true;
        }
        else {
            this.buyBtn.visible = true;
            this.onlyImg.visible = true;
            this.emptyImg.visible = false;
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
        this.buyBtn = null;
        this.onlyImg = null;
        this.emptyImg = null;
        // this.limitCount = 0;
        this.buyCount = 0;
        this.curData = null;
        this._currId = 0;
        this.curCode = null;
        this.isClick = false;
        _super.prototype.dispose.call(this);
    };
    return AcDailyGiftScrollItem;
}(ScrollListItem));
__reflect(AcDailyGiftScrollItem.prototype, "AcDailyGiftScrollItem");
