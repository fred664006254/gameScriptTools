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
 * 提升才艺
 * author jiangliuyang---wxz
 */
var AcGroupWifeBattleTalentUpPopupView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleTalentUpPopupView, _super);
    function AcGroupWifeBattleTalentUpPopupView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._data = null;
        _this._caiyi = null;
        _this._caiqing = null;
        _this._key = 0;
        _this._lastUseNum = 0;
        _this._numTF1 = null;
        _this._numTF2 = null;
        _this._numTF3 = null;
        _this._callback = null;
        _this._target = null;
        _this._acVo = null;
        _this._isHaveBuff = null;
        _this.aid = null;
        _this.code = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleTalentUpPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleTalentUpPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleTalentUpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifestatus_namebg", "countrywarrewardview_itembg", "servant_fl",
        ]);
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.getTabbarGroupY = function () {
        return 110;
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.initView = function () {
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL,this.refreshUI,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USE_ITEM, this.useCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_AWARD, this.useWifeCallback, this);
        this._data = this.param.data.d;
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var innerBg = BaseBitmap.create("public_9_bg14");
        innerBg.width = 530; //bg.width - 15;
        innerBg.height = 155; //bg.height - 15;
        innerBg.x = this.viewBg.width / 2 - innerBg.width / 2;
        innerBg.y = 10;
        this.addChildToContainer(innerBg);
        var bookBg = BaseBitmap.create("public_9_bg44");
        bookBg.width = 530;
        bookBg.height = 255;
        bookBg.x = this.viewBg.width / 2 - bookBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        bookBg.y = innerBg.y + innerBg.height + 10;
        this.addChildToContainer(bookBg);
        // let nameBg = BaseBitmap.create("wifestatus_namebg");
        // nameBg.x = innerBg.x + innerBg.width/2 - nameBg.width/2;
        // nameBg.y = innerBg.y
        // this.addChildToContainer(nameBg);
        var icon = this.getWifestatusIcon(this._data.wid);
        icon.x = innerBg.x + 35;
        icon.y = innerBg.y + 10;
        this.addChildToContainer(icon);
        var caiyi = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi", [String(caiyi)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._caiyi.x = innerBg.x + 200;
        this._caiyi.y = innerBg.y + 25;
        this.addChildToContainer(this._caiyi);
        var flag1 = BaseBitmap.create("servant_fl");
        flag1.x = this._caiyi.x - flag1.width - 8;
        flag1.y = this._caiyi.y + (this._caiyi.height - flag1.height) / 2;
        this.addChildToContainer(flag1);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum ? this._data.taddnum : 0;
        var cqStr = this.checkHaveBuff() ? caiqing + ("\n(" + LanguageManager.getlocal("wifeTalentUpPopupViewExtraCaiqing", ["<font color=0x3e9b00>" + caiqingp + "</font>"]) + ")") : caiqing + "";
        this._caiqing = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1", [String(cqStr)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._caiqing.lineSpacing = 5;
        this._caiqing.x = innerBg.x + 200;
        this._caiqing.y = innerBg.y + 85;
        this.addChildToContainer(this._caiqing);
        var flag2 = BaseBitmap.create("servant_fl");
        flag2.x = this._caiqing.x - flag2.width - 8;
        flag2.y = this._caiqing.y + 3;
        this.addChildToContainer(flag2);
        var tipbg = BaseBitmap.create("countrywarrewardview_itembg");
        tipbg.x = bookBg.x + (bookBg.width - tipbg.width) / 2;
        tipbg.y = bookBg.y + 17;
        this.addChildToContainer(tipbg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewUseItem"), 20);
        tip.x = tipbg.x + tipbg.width / 2 - tip.width / 2;
        tip.y = tipbg.y + tipbg.height / 2 - tip.height / 2;
        ;
        this.addChildToContainer(tip);
        var itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        var itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        var itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1360");
        var itemCfg1 = Config.ItemCfg.getItemCfgById("1355");
        var itemCfg2 = Config.ItemCfg.getItemCfgById("1356");
        var itemCfg3 = Config.ItemCfg.getItemCfgById("1360");
        var itemBg1 = ComponentManager.getButton(itemCfg1.iconBg, null, this.upClick, this, [1], 3);
        itemBg1.x = bookBg.x + 60;
        itemBg1.y = bookBg.y + 68;
        this.addChildToContainer(itemBg1);
        var item1 = BaseLoadBitmap.create(itemCfg1.icon);
        item1.x = itemBg1.x + itemBg1.width / 2 - 100 / 2;
        item1.y = itemBg1.y + itemBg1.height / 2 - 100 / 2;
        this.addChildToContainer(item1);
        this._numTF1 = ComponentManager.getTextField(String(itemInfoVo1 ? itemInfoVo1.num : 0), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTF1.x = itemBg1.x + itemBg1.width - this._numTF1.width - 5;
        this._numTF1.y = itemBg1.y + itemBg1.height - this._numTF1.height - 5;
        this.addChildToContainer(this._numTF1);
        var itemBg2 = ComponentManager.getButton(itemCfg2.iconBg, null, this.upClick, this, [2], 3);
        itemBg2.x = bookBg.x + 210;
        itemBg2.y = bookBg.y + 68;
        this.addChildToContainer(itemBg2);
        var item2 = BaseLoadBitmap.create(itemCfg2.icon);
        item2.x = itemBg2.x + itemBg2.width / 2 - 100 / 2;
        item2.y = itemBg2.y + itemBg2.height / 2 - 100 / 2;
        this.addChildToContainer(item2);
        this._numTF2 = ComponentManager.getTextField(String(itemInfoVo2 ? itemInfoVo2.num : 0), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTF2.x = itemBg2.x + itemBg2.width - this._numTF2.width - 5;
        this._numTF2.y = itemBg2.y + itemBg2.height - this._numTF2.height - 5;
        this.addChildToContainer(this._numTF2);
        var itemBg3 = ComponentManager.getButton(itemCfg3.iconBg, null, this.upClick, this, [3], 3);
        itemBg3.x = bookBg.x + 360;
        itemBg3.y = bookBg.y + 68;
        this.addChildToContainer(itemBg3);
        var item3 = BaseLoadBitmap.create(itemCfg3.icon);
        item3.x = itemBg3.x + itemBg3.width / 2 - 100 / 2;
        item3.y = itemBg3.y + itemBg3.height / 2 - 100 / 2;
        this.addChildToContainer(item3);
        this._numTF3 = ComponentManager.getTextField(String(itemInfoVo3 ? itemInfoVo3.num : 0), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTF3.x = itemBg3.x + itemBg3.width - this._numTF3.width - 5;
        this._numTF3.y = itemBg3.y + itemBg3.height - this._numTF3.height - 5;
        this.addChildToContainer(this._numTF3);
        var itemDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem1"), 18);
        itemDesc1.x = itemBg1.x + itemBg1.width / 2 - itemDesc1.width / 2;
        itemDesc1.y = itemBg1.y + itemBg1.height + 10;
        this.addChildToContainer(itemDesc1);
        var itemDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem2"), 18);
        itemDesc2.x = itemBg2.x + itemBg2.width / 2 - itemDesc2.width / 2;
        itemDesc2.y = itemBg2.y + itemBg2.height + 10;
        this.addChildToContainer(itemDesc2);
        var itemDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem3"), 18);
        itemDesc3.textAlign = egret.HorizontalAlign.CENTER;
        itemDesc3.x = itemBg3.x + itemBg3.width / 2 - itemDesc3.width / 2;
        itemDesc3.y = itemBg3.y + itemBg3.height + 10;
        this.addChildToContainer(itemDesc3);
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.checkHaveBuff = function () {
        return true;
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.refreshUI = function (event) {
        if (event.data.ret && event.data.data.ret == 0) {
            if (event && event.data.data.data.wifebattlecross) {
                this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
            }
        }
        var caiyi = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi", [String(caiyi)]);
        var arr = this.vo.wifebattlecross.info.tmpattr.wifeadd_arr; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        arr = arr ? arr : [];
        var data = null;
        for (var i = 0; i < arr.length; i++) {
            var d = arr[i];
            if (d.wid == this._data.wid) {
                data = d;
                break;
            }
        }
        var caiqing = data.talentadd;
        var caiqingp = data.taddnum ? data.taddnum : 0;
        var cqStr = this.checkHaveBuff() ? caiqing + ("\n(" + LanguageManager.getlocal("wifeTalentUpPopupViewExtraCaiqing", ["<font color=0x3e9b00>" + caiqingp + "</font>"]) + ")") : caiqing + "";
        this._caiqing.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1", [String(cqStr)]);
        var itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        var itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        var itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1360");
        this._numTF1.text = String(itemInfoVo1 ? itemInfoVo1.num : 0);
        this._numTF2.text = String(itemInfoVo2 ? itemInfoVo2.num : 0);
        this._numTF3.text = String(itemInfoVo3 ? itemInfoVo3.num : 0);
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.upClick = function (type) {
        this.chooseBtnClick(type);
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.getWifestatusIcon = function (wifeId) {
        var iconContainer = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create("wifestatus_headbg");
        iconBg.name = "bg2";
        iconContainer.addChild(iconBg);
        var iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setPosition(10, 8);
        icon.setScale(0.52);
        iconContainer.cacheAsBitmap = true;
        iconContainer.addChild(icon);
        // iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);
        var nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.setPosition(iconContainer.width / 2 - nameBg.width / 2, 105);
        iconContainer.addChild(nameBg);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var nameTF = ComponentManager.getTextField(wifeCfg.name, 18);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        iconContainer.addChild(nameTF);
        return iconContainer;
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.chooseBtnClick = function (type) {
        var itemId = null;
        var key = 0;
        if (type == 1) {
            itemId = 1355;
            key = 5;
        }
        else if (type == 2) {
            itemId = 1356;
            key = 6;
        }
        else if (type == 3) {
            itemId = 1360;
        }
        var cfg = Config.WifebaseCfg.wifeGift;
        this._key = key;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        if (hasNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        else {
            if (hasNum < 5) {
                if (this._key == 0) {
                    this._lastUseNum = 1;
                    NetManager.request(NetRequestConst.REQUEST_USE_ITEM, { itemNum: 1, itemId: 1360 });
                }
                else {
                    // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,{"key":key,"num":1});
                    NetManager.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this._data.wid.toString(), key: String(key), rnum: 1 });
                }
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: itemId, maxNum: null, callback: this.useItem, handler: this });
            }
        }
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.useItem = function (itemNum, itemId) {
        // let num = itemNum;
        this._lastUseNum = itemNum;
        var data = { "itemNum": itemNum, "itemId": itemId };
        WifeView.wifeId = this._data.wid;
        if (this._key == 0) {
            NetManager.request(NetRequestConst.REQUEST_USE_ITEM, { itemNum: itemNum, itemId: 1360 });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this._data.wid.toString(), key: String(this._key), rnum: itemNum });
        }
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.useWifeCallback = function (event) {
        var rdata = event.data.data.data;
        if (rdata && rdata.rewards) {
            var rewards = GameData.formatRewardItem(rdata.rewards);
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, { activeId: this.aid + "-" + this.code });
        }
    };
    // 刷新道具数量
    AcGroupWifeBattleTalentUpPopupView.prototype.useCallback = function (event) {
        var rdata = event.data.data.data;
        var ifRefresh = false;
        var isGetItem = false;
        if (rdata && rdata.rewards) {
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            // let list = [];
            for (var i = 0; i < rewardList.length; i++) {
                var rewardItemVo = rewardList[i];
                if (rewardItemVo.type == 6) {
                    isGetItem = true;
                    break;
                }
            }
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById("1360");
        ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW, [rdata.wifeArr, this._lastUseNum, itemInfoVo]);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, { activeId: this.aid + "-" + this.code });
    };
    AcGroupWifeBattleTalentUpPopupView.prototype.hide = function () {
        // if(this._callback && this._target){
        //     this._callback.apply(this._target);
        // }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFEBATTLE_REFRESH);
        _super.prototype.hide.call(this);
    };
    // private tick(){
    //     // if(!this._acVo){
    //     //     this._acVo = this.getAcVo();
    //     // }
    //     // let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     // if(t<0){
    //     //     //  App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //     //      this.hide();
    //     // } 
    // }
    AcGroupWifeBattleTalentUpPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USE_ITEM, this.useCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_AWARD, this.useWifeCallback, this);
        this._data = null;
        this._caiyi = null;
        this._caiqing = null;
        this._key = 0;
        this._lastUseNum = 0;
        this._numTF1 = null;
        this._numTF2 = null;
        this._numTF3 = null;
        this._callback = null;
        this._target = null;
        this._acVo = null;
        this._isHaveBuff = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleTalentUpPopupView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleTalentUpPopupView.js.map