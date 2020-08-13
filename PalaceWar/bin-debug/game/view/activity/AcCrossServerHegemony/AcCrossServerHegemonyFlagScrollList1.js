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
var AcCrossServerHegemonyFlagScrollList1 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagScrollList1, _super);
    function AcCrossServerHegemonyFlagScrollList1() {
        var _this = _super.call(this) || this;
        _this._itemParam = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        _this._titleBg = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "aid", {
        get: function () {
            return this._itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "code", {
        get: function () {
            return this._itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "uiCode", {
        get: function () {
            return this._itemParam.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "specialIconId", {
        get: function () {
            return this._itemParam.specialIconId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList1.prototype, "requestEvent", {
        get: function () {
            return this._itemParam.requestEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcCrossServerHegemonyFlagScrollList1.prototype.initItem = function (index, data, itemParam) {
        this.width = 620;
        // this.height = 170;
        this._itemData = data;
        this._itemParam = itemParam;
        var bg = BaseBitmap.create("public_scrollitembg"); //public_9_bg14
        bg.width = this.width - 20;
        bg.x = this.width / 2 - bg.width / 2;
        // bg.height = 220;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeGiftName" + data.id + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += (titleTF.width + 40);
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var reward = data.getReward;
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 108;
        var spaceX = 8;
        var scale = 0.8;
        // rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(rewardBg);
        // let rewardContainer = new BaseDisplayObjectContainer();
        // rewardContainer.width = 380;
        // rewardContainer.setPosition(startX,startY);
        // this.addChild(rewardContainer);
        // let rewardStx = (rewardContainer.width - (rewardArr.length * (baseWidth*scale) + (rewardArr.length + 1)*spaceX))/2;
        //new
        var stX = (rewardBg.width - (6 * (baseWidth * scale + spaceX) - spaceX)) / 2 + rewardBg.x;
        var rowNum = Math.ceil(rewardArr.length / 6);
        // let endX = 0;
        // let len = rewardArr.length % 6;
        // let lastIndex = (rowNum-1) * 6;
        // if (rewardArr.length < 6){
        // 	stX = (rewardBg.width - (rewardArr.length * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
        // }
        // else{
        // 	if (len > 0){
        // 		endX = (rewardBg.width - (len * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
        // 	}
        // }
        rewardBg.height = rowNum * (baseWidth * scale + 10) + 10;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            // if (len > 0 && rowNum > 1 && lastIndex == i){
            // 	itemicon.x = endX + (itemicon.width * scale + spaceX) * (i%6);
            // }
            // else{
            // 	itemicon.x = stX + (itemicon.width * scale + spaceX)*(i % 6);
            // }
            itemicon.x = stX + (itemicon.width * scale + spaceX) * (i % 6);
            itemicon.y = rewardBg.y + 10 + Math.floor(i / 6) * (itemicon.height * scale + 10);
            this.addChild(itemicon);
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        //锁
        var lock = BaseBitmap.create("accshegemony_alliancecharge_lock");
        lock.setPosition(bg.x + bg.width / 2 - lock.width / 2, bg.y + 15);
        this.addChild(lock);
        //板子
        var blackBg = BaseBitmap.create("accshegemony_alliancecharge_infobg");
        blackBg.setPosition(bg.x + bg.width / 2 - blackBg.width / 2, rewardBg.y + rewardBg.height + 10);
        this.addChild(blackBg);
        bg.height = blackBg.y + blackBg.height;
        //帮会充值
        var allianceRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTotalRecharge", ["" + vo.getAllianceTotalRecharge(), "" + data.totalValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        allianceRecharge.setPosition(blackBg.x + 20, blackBg.y + 20);
        this.addChild(allianceRecharge);
        //个人充值
        var personalRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyPersonalRecharge", ["" + vo.getAlliancePersonalRecharge(), "" + data.individualValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        personalRecharge.setPosition(allianceRecharge.x, allianceRecharge.y + allianceRecharge.height + 10);
        this.addChild(personalRecharge);
        if (vo.getAllianceTotalRecharge() >= data.totalValue) {
            lock.visible = false;
            allianceRecharge.visible = false;
            personalRecharge.y = blackBg.y + blackBg.height / 2 - personalRecharge.height / 2;
            if (vo.getAlliancePersonalRecharge() >= data.individualValue) {
                // blackBg.visible = false;
                personalRecharge.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }
        else {
            if (vo.getAlliancePersonalRecharge() >= data.individualValue) {
                personalRecharge.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }
        if (vo.isGetAllianceChargeRewardById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getAlliancePersonalRecharge() >= data.individualValue && vo.getAllianceTotalRecharge() >= data.totalValue) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW, { activeId: vo.aidAndCode, rkey: data.id });
                }, this, null, null, null, TextFieldConst.COLOR_BLACK);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 10, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", function () {
                    if (!vo.isInMatchActicityTime()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this, null, null, null, TextFieldConst.COLOR_BLACK);
                chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 10, bg.y + bg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                if (!vo.isInMatchActicityTime()) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcCrossServerHegemonyFlagScrollList1.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyFlagScrollList1.prototype.dispose = function () {
        this._itemData = null;
        this._itemParam = null;
        this._countText = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagScrollList1;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyFlagScrollList1.prototype, "AcCrossServerHegemonyFlagScrollList1");
//# sourceMappingURL=AcCrossServerHegemonyFlagScrollList1.js.map