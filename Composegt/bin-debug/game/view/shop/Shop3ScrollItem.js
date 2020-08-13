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
 * 商店滑动item
 * author yanyuling
 * date 2017/12/09
 * @class Shop3ScrollItem
 */
var Shop3ScrollItem = (function (_super) {
    __extends(Shop3ScrollItem, _super);
    function Shop3ScrollItem() {
        var _this = _super.call(this) || this;
        //商品id
        _this._shopid = 0;
        _this._selectedIndex = 0;
        _this._isRequesting = false;
        _this.itemList = [];
        _this._isSpecial = false;
        return _this;
    }
    Shop3ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        var temW = 598;
        var temH = 161;
        this._shopid = data.id;
        this._selectedIndex = index;
        this._isSpecial = data.isSpecial;
        var shopItemCfg = null;
        if (this._isSpecial) {
            shopItemCfg = Api.shopVoApi.getSpecialShopItemCfgById(this._shopid);
        }
        else {
            shopItemCfg = Api.shopVoApi.getShopItemCfgById(this._shopid);
        }
        this._shopItemCfg = shopItemCfg;
        // 显示道具列表
        var contentList = shopItemCfg.contentList;
        // 购买价格
        var buyCost = shopItemCfg.buyCost;
        // 限制类型
        var limitDesc = "";
        // 限制购买数量
        var limitNum = null;
        // 限制购买类型
        var limitType = null;
        if (this._isSpecial) {
            limitNum = Api.shopVoApi.getSpecialCanBuyNumById(shopItemCfg.id);
            limitType = Api.shopVoApi.getSpecialShopItemCfgById(shopItemCfg.id).limitType;
        }
        else {
            limitNum = Api.shopVoApi.getCanBuyNumById(shopItemCfg.id);
        }
        if (limitNum >= 0) {
            if (limitType == 2) {
                limitDesc = LanguageManager.getlocal("shopNumPerWeek", [limitNum.toString()]);
            }
            else {
                limitDesc = LanguageManager.getlocal("shopNumPerDay", [limitNum.toString()]);
            }
        }
        var bg = BaseBitmap.create("shopview_itembg");
        // bg.width = temW;
        // bg.height= temH
        this.addChild(bg);
        var charge_redBg = BaseBitmap.create("shopview_redbg");
        // charge_redBg.width = 384
        charge_redBg.y = 8;
        this.addChild(charge_redBg);
        // if(shopItemCfg.needVip > 0)
        // {
        // 	let limitbg = BaseBitmap.create("public_9_probiginnerbg");
        // 	limitbg.width = 140;
        // 	// limitbg.height = 40;
        // 	limitbg.x = bg.x + bg.width - limitbg.width - 15;
        // 	limitbg.y = bg.y + 2 ;
        // 	this.addChild(limitbg);
        // 	let vipLimit_img =  BaseBitmap.create("vipLimit_img");
        // 	vipLimit_img.x = limitbg.x + limitbg.width / 2 - (77 + vipLimit_img.width) / 2 + 77; 
        // 	vipLimit_img.y = limitbg.y + limitbg.height/2 - vipLimit_img.height/2 ;
        // 	this.addChild(vipLimit_img);
        // 	vipLimit_img.visible = false;
        // 	let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(shopItemCfg.needVip).icon);
        // 	vipImg.width = 77;
        // 	vipImg.height = 29;
        // 	vipImg.x = limitbg.x + limitbg.width / 2 - (vipImg.width + vipLimit_img.width) / 2;
        // 	vipImg.y = limitbg.y + limitbg.height / 2 - vipImg.height / 2;
        // 	this.addChild(vipImg);
        // }
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        Txt1.text = shopItemCfg.name;
        Txt1.x = charge_redBg.x + 30;
        Txt1.name = shopItemCfg.name;
        Txt1.y = charge_redBg.y + 10 - 5;
        this.addChild(Txt1);
        var rewardBg = BaseBitmap.create("shopview_rewardbg");
        rewardBg.width = 407;
        rewardBg.height = 97;
        rewardBg.x = bg.x + 15;
        rewardBg.y = charge_redBg.y + charge_redBg.height + 10;
        this.addChild(rewardBg);
        var reward = "";
        var scroStartY = rewardBg.y + 5;
        var tmpX = rewardBg.x + 4;
        var deltaS = 0.88;
        for (var index = 0; index < contentList.length; index++) {
            var tmpData = contentList[index];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > rewardBg.x + rewardBg.width) {
                tmpX = rewardBg.x + 4;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 7);
            }
            this.addChild(iconItem);
            this.itemList.push(iconItem);
        }
        scroStartY += 100;
        rewardBg.height = scroStartY - rewardBg.y;
        rewardBg.width -= 5;
        bg.height = rewardBg.y + rewardBg.height + 23;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyHandler, this);
        buyBtn.setText(shopItemCfg.buyCost.toString(), false);
        buyBtn.addTextIcon("public_icon1");
        buyBtn.x = bg.x + bg.width - buyBtn.width - 20;
        buyBtn.y = rewardBg.y + rewardBg.height / 2 - buyBtn.height / 2;
        buyBtn.name = "buyBtn";
        this.addChild(buyBtn);
        if (limitDesc != "") {
            this._limitNumTF = ComponentManager.getTextField(limitDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED_NEW);
            // this._limitNumTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,0xA67D1A);
            this.update();
            this._limitNumTF.x = buyBtn.x + buyBtn.width / 2 - this._limitNumTF.width / 2;
            this._limitNumTF.y = rewardBg.y + rewardBg.height / 2 - this._limitNumTF.height + 60;
            this.addChild(this._limitNumTF);
        }
        var originalPriceTF = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle") + ":", 18, TextFieldConst.COLOR_BLACK);
        originalPriceTF.x = buyBtn.x;
        originalPriceTF.y = buyBtn.y - 25;
        this.addChild(originalPriceTF);
        var goldIcon1 = BaseBitmap.create("public_icon1");
        goldIcon1.scaleX = 30 / goldIcon1.width;
        goldIcon1.scaleY = 30 / goldIcon1.height;
        goldIcon1.x = originalPriceTF.x + originalPriceTF.width;
        goldIcon1.y = buyBtn.y - 30;
        this.addChild(goldIcon1);
        var oldPriceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        oldPriceTxt.text = String(shopItemCfg.preCost);
        oldPriceTxt.x = goldIcon1.x + 35;
        oldPriceTxt.y = originalPriceTF.y;
        this.addChild(oldPriceTxt);
        var discountSp = BaseBitmap.create("shopview_line");
        discountSp.x = originalPriceTF.x;
        discountSp.y = oldPriceTxt.y + 7;
        this.addChild(discountSp);
        if (shopItemCfg.needVip > 0) {
            var limitbg = BaseBitmap.create("public_9_probiginnerbg");
            limitbg.width = 140;
            // limitbg.height = 40;
            // limitbg.x = bg.x + bg.width - limitbg.width - 15;
            // limitbg.y = bg.y + 2 ;
            limitbg.x = buyBtn.x + buyBtn.width / 2 - limitbg.width / 2;
            limitbg.y = oldPriceTxt.y - limitbg.height;
            limitbg.visible = false;
            this.addChild(limitbg);
            var vipLimit_img = BaseBitmap.create("vipLimit_img");
            vipLimit_img.x = limitbg.x + limitbg.width / 2 - (77 + vipLimit_img.width) / 2 + 77;
            vipLimit_img.y = limitbg.y + limitbg.height / 2 - vipLimit_img.height / 2;
            this.addChild(vipLimit_img);
            // vipLimit_img.visible = false;
            var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(shopItemCfg.needVip).icon);
            vipImg.width = 77;
            vipImg.height = 29;
            vipImg.x = limitbg.x + limitbg.width / 2 - (vipImg.width + vipLimit_img.width) / 2;
            vipImg.y = limitbg.y + limitbg.height / 2 - vipImg.height / 2;
            this.addChild(vipImg);
        }
    };
    Shop3ScrollItem.prototype.update = function () {
        if (this._limitNumTF) {
            // let limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
            var limitNum = null;
            var limitType = null;
            if (this._isSpecial) {
                limitType = Api.shopVoApi.getSpecialShopItemCfgById(this._shopItemCfg.id).limitType;
                limitNum = Api.shopVoApi.getSpecialCanBuyNumById(this._shopItemCfg.id);
            }
            else {
                limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
            }
            if (limitType == 2) {
                this._limitNumTF.text = LanguageManager.getlocal("shopNumPerWeek", [limitNum.toString()]);
            }
            else {
                this._limitNumTF.text = LanguageManager.getlocal("shopNumPerDay", [limitNum.toString()]);
            }
            if (limitNum > 0) {
                this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW; // 0x00ff00;
            }
            else {
                this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED_NEW;
            }
        }
    };
    Shop3ScrollItem.prototype.playSuccessAction = function () {
        if (this._shopItemCfg) {
            var contentList = this._shopItemCfg.contentList;
            var len = contentList.length;
            for (var index = contentList.length - 1; index >= 0; index--) {
                var rewardItemVo = contentList[index];
                var icon = GameData.getItemIcon(rewardItemVo, true);
                var tmpNode = this.itemList[index];
                icon.setScale(tmpNode.scaleX);
                var p = tmpNode.localToGlobal();
                var x1 = p.x;
                var y1 = p.y;
                icon.x = p.x;
                icon.y = p.y;
                var x2 = GameConfig.stageWidth / 2 + icon.width / 2;
                var y2 = GameConfig.stageHeigth - 10;
                LayerManager.panelLayer.addChild(icon);
                egret.Tween.get(icon).wait(200 * index).to({ x: x2, y: y2 }, 500).call(this.onComplete, this, [icon]);
            }
        }
    };
    Shop3ScrollItem.prototype.onComplete = function (icon) {
        if (icon) {
            icon.dispose();
        }
    };
    Shop3ScrollItem.prototype.buyHandlerCallback = function (event) {
        if (this._isRequesting == false) {
            return;
        }
        this._isRequesting = false;
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            this.update();
            this.playSuccessAction();
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOP_BUY + 3,{"index":this._selectedIndex,"shopId":this._shopid});
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
        }
    };
    //弹出消费提示框显示确认
    Shop3ScrollItem.prototype.confirmCallbackHandler = function () {
        //判断元宝数是否足够
        if (this._shopItemCfg.buyCost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isRequesting = true;
        if (this._isSpecial) {
            //发送购买请求
            NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "3" });
        }
        else {
            //发送购买请求
            NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "2" });
        }
    };
    //检查是否需要弹出消费提示框
    Shop3ScrollItem.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var costNum = this._shopItemCfg.buyCost;
        //检查价格是否超过购买警告阈值
        if (costNum >= Config.ShopCfg.buyItemCheckVal) {
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem", [costNum.toString(), this._shopItemCfg.name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            //显示弹出框
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                useNum: costNum,
                confirmCallback: this.confirmCallbackHandler,
                handler: this,
                num: playerGem,
                msg: message,
                id: 1 //消耗物品id  1->元宝
            });
        }
        else {
            //没有超过阈值，直接调用购买代码
            this.confirmCallbackHandler();
        }
    };
    Shop3ScrollItem.prototype.buyHandler = function (param) {
        if (this._shopItemCfg.needVip > Api.playerVoApi.getPlayerVipLevel()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("vipLvNotEnough"));
            return;
        }
        // let limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
        var limitNum = null;
        if (this._isSpecial) {
            limitNum = Api.shopVoApi.getSpecialCanBuyNumById(this._shopItemCfg.id);
        }
        else {
            limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
        }
        if (limitNum == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("shopNumNotEnough"));
            return;
        }
        //检查是否需要弹出消费提示框
        this.checkNeedWarnPopup();
    };
    Shop3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    Shop3ScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        this._shopid = 0;
        this._limitNumTF = null;
        this._buyBtn = null;
        this._limitDescTF = null;
        this._selectedIndex = 0;
        this._shopItemCfg = null;
        this.itemList = [];
        this._isRequesting = false;
        this._isSpecial = false;
        _super.prototype.dispose.call(this);
    };
    return Shop3ScrollItem;
}(ScrollListItem));
__reflect(Shop3ScrollItem.prototype, "Shop3ScrollItem");
