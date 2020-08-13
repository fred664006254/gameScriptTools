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
 * 提升才艺
 * author jiangliuyang
 */
var WifeTalentUpPopupView = (function (_super) {
    __extends(WifeTalentUpPopupView, _super);
    function WifeTalentUpPopupView() {
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
        return _this;
    }
    WifeTalentUpPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    WifeTalentUpPopupView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    WifeTalentUpPopupView.prototype.getTabbarGroupY = function () {
        return 110;
    };
    WifeTalentUpPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USE_ITEM, this.useCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_AWARD, this.useWifeCallback, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.useWifeCallback,this);
        this._data = this.param.data;
        // let bg = BaseBitmap.create("public_tc_bg12");
        // bg.width = 540
        // bg.height = 500;
        // bg.x = this.viewBg.width / 2 - bg.width/2;
        // bg.y = 10;
        // this.addChildToContainer(bg);
        var innerBg = BaseBitmap.create("public_9v_bg12");
        innerBg.width = 530;
        innerBg.height = 560;
        innerBg.x = this.viewBg.width / 2 - innerBg.width / 2; //bg.x + bg.width/2 - innerBg.width/2;
        innerBg.y = 10; //bg.y + bg.height/2 - innerBg.height/2;
        this.addChildToContainer(innerBg);
        var bookBg = BaseBitmap.create("public_line4");
        bookBg.width = 487;
        // bookBg.height = 245;
        bookBg.x = this.viewBg.width / 2 - bookBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        bookBg.y = innerBg.y + 240;
        this.addChildToContainer(bookBg);
        // let nameBg = BaseBitmap.create("public_tc_bg05");
        // nameBg.width = 525;
        // nameBg.height = 35;
        // nameBg.x = innerBg.x + innerBg.width/2 - nameBg.width/2;
        // nameBg.y = innerBg.y
        // this.addChildToContainer(nameBg);
        // let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
        // nameText.x = innerBg.x + innerBg.width / 2 - nameText.width/2;
        // nameText.y = nameBg.y + nameBg.height/2 - nameText.height/2;
        // this.addChildToContainer(nameText);
        var icon = this.getWifestatusIcon(this._data.wid);
        icon.x = this.viewBg.width / 2 - icon.width / 2; //innerBg.x + 80 - 50;
        icon.y = innerBg.y + 20;
        this.addChildToContainer(icon);
        var caiyi = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi", [String(caiyi)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        // this._caiyi.x = innerBg.x + 195;
        // this._caiyi.y = innerBg.y + 88;
        this.addChildToContainer(this._caiyi);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum ? this._data.taddnum : 0;
        var cqStr = caiqingp > 0 ? caiqing + "<font color=0x2b8729>(+" + caiqingp + ")</font>" : caiqing + "";
        this._caiqing = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1", [String(cqStr)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        // this._caiqing.x = innerBg.x + 195;
        // this._caiqing.y = innerBg.y + 140;
        this.addChildToContainer(this._caiqing);
        var startX = this.viewBg.width / 2 - this._caiyi.width / 2;
        if (this._caiyi.width < this._caiqing.width) {
            startX = this.viewBg.width / 2 - this._caiqing.width / 2;
        }
        this._caiyi.x = startX;
        this._caiqing.x = startX;
        this._caiyi.y = innerBg.y + 180;
        this._caiqing.y = this._caiyi.y + this._caiyi.height + 5;
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewUseItem"), 22, TextFieldConst.COLOR_BROWN_NEW);
        tip.x = bookBg.x + bookBg.width / 2 - tip.width / 2;
        tip.y = bookBg.y + 20;
        this.addChildToContainer(tip);
        var itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        var itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        var itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1363");
        var itemCfg1 = Config.ItemCfg.getItemCfgById("1355");
        var itemCfg2 = Config.ItemCfg.getItemCfgById("1356");
        var itemCfg3 = Config.ItemCfg.getItemCfgById("1363");
        var itemBg1 = ComponentManager.getButton(itemCfg1.iconBg, null, this.upClick, this, [1], 3);
        itemBg1.x = bookBg.x + 50;
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
        itemBg2.x = bookBg.x + 186;
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
        itemBg3.x = bookBg.x + 325;
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
        var itemDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem1"), 18, TextFieldConst.COLOR_BROWN_NEW);
        itemDesc1.x = itemBg1.x + itemBg1.width / 2 - itemDesc1.width / 2;
        itemDesc1.y = itemBg1.y + itemBg1.height + 10;
        this.addChildToContainer(itemDesc1);
        var itemDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem2"), 18, TextFieldConst.COLOR_BROWN_NEW);
        itemDesc2.x = itemBg2.x + itemBg2.width / 2 - itemDesc2.width / 2;
        itemDesc2.y = itemBg2.y + itemBg2.height + 10;
        this.addChildToContainer(itemDesc2);
        var itemDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem3"), 18, TextFieldConst.COLOR_BROWN_NEW);
        itemDesc3.textAlign = egret.HorizontalAlign.CENTER;
        itemDesc3.x = itemBg3.x + itemBg3.width / 2 - itemDesc3.width / 2;
        itemDesc3.y = itemBg3.y + itemBg3.height + 10;
        this.addChildToContainer(itemDesc3);
    };
    WifeTalentUpPopupView.prototype.refreshUI = function () {
        var caiyi = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi", [String(caiyi)]);
        var arr = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
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
        var cqStr = caiqingp > 0 ? caiqing + "<font color=0x2b8729>(+" + caiqingp + ")</font>" : caiqing + "";
        this._caiqing.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1", [String(cqStr)]);
        var itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        var itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        var itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1363");
        this._numTF1.text = String(itemInfoVo1 ? itemInfoVo1.num : 0);
        this._numTF2.text = String(itemInfoVo2 ? itemInfoVo2.num : 0);
        this._numTF3.text = String(itemInfoVo3 ? itemInfoVo3.num : 0);
    };
    WifeTalentUpPopupView.prototype.upClick = function (type) {
        this.chooseBtnClick(type);
    };
    WifeTalentUpPopupView.prototype.getWifestatusIcon = function (wifeId) {
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
        nameBg.visible = false;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var nameTF = ComponentManager.getTextField(wifeCfg.name, 18, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2 + 3;
        iconContainer.addChild(nameTF);
        return iconContainer;
    };
    WifeTalentUpPopupView.prototype.chooseBtnClick = function (type) {
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
            itemId = 1363;
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
                    NetManager.request(NetRequestConst.REQUEST_USE_ITEM, { itemNum: 1, itemId: 1363 });
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
    WifeTalentUpPopupView.prototype.useItem = function (itemNum, itemId) {
        // let num = itemNum;
        this._lastUseNum = itemNum;
        var data = { "itemNum": itemNum, "itemId": itemId };
        if (this._key == 0) {
            NetManager.request(NetRequestConst.REQUEST_USE_ITEM, { itemNum: itemNum, itemId: 1363 });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this._data.wid.toString(), key: String(this._key), rnum: itemNum });
        }
    };
    WifeTalentUpPopupView.prototype.useWifeCallback = function (event) {
        var rdata = event.data.data.data;
        if (rdata && rdata.rewards) {
            var rewards = GameData.formatRewardItem(rdata.rewards);
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL, {});
        }
    };
    // 刷新道具数量
    WifeTalentUpPopupView.prototype.useCallback = function (event) {
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
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById("1363");
        ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW, [rdata.wifeArr, this._lastUseNum, itemInfoVo]);
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL, {});
    };
    WifeTalentUpPopupView.prototype.hide = function () {
        // if(this._callback && this._target){
        //     this._callback.apply(this._target);
        // }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFEBATTLE_REFRESH);
        _super.prototype.hide.call(this);
    };
    // protected getShowHeight():number{
    // 	return 630;
    // }
    WifeTalentUpPopupView.prototype.getAcVo = function () {
        var modelList = Api.acVoApi.getActivityVoListByAid("wifeBattleRank");
        if (modelList && modelList.length > 0) {
            return modelList[0];
        }
        else {
            return null;
        }
    };
    WifeTalentUpPopupView.prototype.tick = function () {
        if (!this._acVo) {
            this._acVo = this.getAcVo();
        }
        if (!this._acVo) {
            return;
        }
        var t = this._acVo.et - GameData.serverTime - 86400 * 1;
        var isHaveBuff = false;
        if (t > 0) {
            isHaveBuff = true;
        }
        else {
            isHaveBuff = false;
        }
        if (this._isHaveBuff != null && isHaveBuff != this._isHaveBuff) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
            // this.hide();
        }
        this._isHaveBuff = isHaveBuff;
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
    WifeTalentUpPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL, this.refreshUI, this);
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
    return WifeTalentUpPopupView;
}(PopupView));
__reflect(WifeTalentUpPopupView.prototype, "WifeTalentUpPopupView");
