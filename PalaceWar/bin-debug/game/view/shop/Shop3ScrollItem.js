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
 * 商店滑动item
 * author yanyuling
 * date 2017/12/09
 * @class Shop3ScrollItem
 */
var Shop3ScrollItem = /** @class */ (function (_super) {
    __extends(Shop3ScrollItem, _super);
    function Shop3ScrollItem() {
        var _this = _super.call(this) || this;
        //商品id
        _this._shopid = 0;
        _this._selectedIndex = 0;
        _this._isRequesting = false;
        _this.itemList = [];
        _this._buyItemNum = 1;
        return _this;
    }
    Shop3ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        var temW = 600;
        var temH = 178;
        this._shopid = data.id;
        this._selectedIndex = index;
        var shopItemCfg = Api.shopVoApi.getShopItemCfgById(this._shopid);
        if (!shopItemCfg) {
            shopItemCfg = data;
        }
        this._shopItemCfg = shopItemCfg;
        // 显示道具列表
        var contentList = shopItemCfg.contentList;
        // 购买价格
        var buyCost = shopItemCfg.buyCost;
        // 限制类型
        var limitDesc = "";
        // 限制购买数量
        var limitNum = Api.shopVoApi.getCanBuyNumById(shopItemCfg.id);
        if (limitNum >= 0) {
            limitDesc = LanguageManager.getlocal("shopLimitBuy2", [limitNum.toString()]);
        }
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.width = temW;
        bg.height = temH;
        this.addChild(bg);
        var charge_redBg = BaseBitmap.create("shopview_itemtitle");
        ;
        // if (data.id == 4001)
        // {
        // 	charge_redBg= BaseBitmap.create("shopview_greenbar");
        // }
        // else
        // {
        // 	charge_redBg= BaseBitmap.create("common_titlebg");
        // }
        charge_redBg.y = 5;
        charge_redBg.width = 250;
        this.addChild(charge_redBg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = shopItemCfg.name;
        Txt1.x = charge_redBg.x + 20;
        Txt1.name = shopItemCfg.name;
        Txt1.y = charge_redBg.y + 7;
        this.addChild(Txt1);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = 425;
        rewardBg.height = 107;
        rewardBg.x = bg.x + 15;
        rewardBg.y = charge_redBg.y + charge_redBg.height + 5;
        this.addChild(rewardBg);
        var reward = "";
        var scroStartY = rewardBg.y + 5;
        var tmpX = rewardBg.x + 8;
        var deltaS = 0.88;
        for (var index = 0; index < contentList.length; index++) {
            var tmpData = contentList[index];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > rewardBg.x + rewardBg.width - 5) {
                tmpX = rewardBg.x + 8;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 7);
            }
            this.addChild(iconItem);
            this.itemList.push(iconItem);
        }
        scroStartY += 100;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        rewardBg.width -= 5;
        bg.height = rewardBg.y + rewardBg.height + 40;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyHandler, this);
        buyBtn.setText(shopItemCfg.buyCost.toString(), false);
        buyBtn.addTextIcon("public_icon1");
        buyBtn.x = bg.x + bg.width - buyBtn.width - 20;
        buyBtn.y = rewardBg.y + (rewardBg.height - buyBtn.height) / 2;
        buyBtn.name = "buyBtn";
        this.addChild(buyBtn);
        if (limitDesc != "") {
            this._limitNumTF = ComponentManager.getTextField(limitDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
            // this._limitNumTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,0xA67D1A);
            this.update();
            this._limitNumTF.x = buyBtn.x + buyBtn.width / 2 - this._limitNumTF.width / 2;
            this._limitNumTF.y = buyBtn.y + buyBtn.height + 5;
            this.addChild(this._limitNumTF);
        }
        var originalPriceTF = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle") + ":", 18, TextFieldConst.COLOR_BLACK);
        originalPriceTF.y = buyBtn.y - originalPriceTF.textHeight;
        if (PlatformManager.checkIsEnLang()) {
            originalPriceTF.text = "";
            originalPriceTF.x = buyBtn.x + 20;
        }
        this.addChild(originalPriceTF);
        var goldIcon1 = BaseBitmap.create("public_icon1");
        goldIcon1.scaleX = 30 / goldIcon1.width;
        goldIcon1.scaleY = 30 / goldIcon1.height;
        goldIcon1.y = buyBtn.y - 25;
        this.addChild(goldIcon1);
        var oldPriceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        oldPriceTxt.text = String(shopItemCfg.preCost);
        oldPriceTxt.y = originalPriceTF.y;
        this.addChild(oldPriceTxt);
        var discountSp = BaseBitmap.create("shopview_line");
        discountSp.y = oldPriceTxt.y + 7;
        this.addChild(discountSp);
        var tmpx = (buyBtn.width - originalPriceTF.textWidth - 30 - oldPriceTxt.textWidth) / 2;
        originalPriceTF.x = buyBtn.x + tmpx;
        goldIcon1.x = originalPriceTF.x + originalPriceTF.textWidth;
        oldPriceTxt.x = goldIcon1.x + 35;
        discountSp.x = originalPriceTF.x;
        // if (PlatformManager.checkIsEnLang())
        // {
        discountSp.scaleX = (originalPriceTF.textWidth + 35 + oldPriceTxt.width) / discountSp.width;
        // }
        if (shopItemCfg.needVip > 0) {
            var limitbg = BaseBitmap.create("public_9_probiginnerbg");
            limitbg.width = 140;
            // limitbg.height = 40;
            limitbg.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitbg, buyBtn, [0, -limitbg.height * 0.8 - 23]);
            this.addChild(limitbg);
            var vipLimit_img = BaseBitmap.create("vipLimit_img");
            this.addChild(vipLimit_img);
            vipLimit_img.setScale(0.8);
            vipLimit_img.x = limitbg.x + limitbg.width * limitbg.scaleX - vipLimit_img.width * vipLimit_img.scaleX - 10;
            vipLimit_img.y = limitbg.y + limitbg.height * limitbg.scaleY / 2 - vipLimit_img.height * vipLimit_img.scaleY / 2;
            var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(shopItemCfg.needVip).icon);
            vipImg.width = 77;
            vipImg.height = 29;
            vipImg.setScale(0.8);
            this.addChild(vipImg);
            vipImg.x = vipLimit_img.x - vipImg.width * vipImg.scaleX + 2;
            vipImg.y = vipLimit_img.y;
        }
        if (data.id == 4001 || data.id == 6101) {
            var limitbg = BaseBitmap.create("public_9_probiginnerbg");
            limitbg.width = 140;
            // limitbg.height = 40;
            this.addChild(limitbg);
            limitbg.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitbg, buyBtn, [0, -limitbg.height * 0.8 - 23]);
            var vipLimit_img = BaseBitmap.create("shopview_limited");
            vipLimit_img.x = limitbg.x + limitbg.width / 2 - vipLimit_img.width / 2;
            vipLimit_img.y = limitbg.y + limitbg.height / 2 - vipLimit_img.height / 2;
            this.addChild(vipLimit_img);
            vipLimit_img.setScale(0.8);
        }
        if (Api.rookieVoApi.curGuideKey == "shop" && data.id == 4001) {
            var light = BaseBitmap.create("public_9_bg63");
            light.width = 640;
            light.height = this.height + 20;
            light.setPosition(-12, -12);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
            // this._light = light;
        }
    };
    Shop3ScrollItem.prototype.update = function () {
        if (this._limitNumTF) {
            var limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
            if (this._shopItemCfg.id == 4001) {
                this._limitNumTF.text = LanguageManager.getlocal("shopLimitBuy4", [limitNum.toString()]);
            }
            else if (this._shopItemCfg.id == 6101) {
                this._limitNumTF.text = LanguageManager.getlocal("shopLimitBuy5", [limitNum.toString()]);
            }
            else {
                this._limitNumTF.text = LanguageManager.getlocal("shopLimitBuy", [limitNum.toString()]);
            }
        }
    };
    Shop3ScrollItem.prototype.playSuccessAction = function () {
        if (this._shopItemCfg) {
            var contentList = this._shopItemCfg.contentList;
            var len = contentList.length;
            for (var index = contentList.length - 1; index >= 0; index--) {
                var rewardItemVo = contentList[index];
                rewardItemVo.num *= this._buyItemNum;
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
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                this.update();
                this.playSuccessAction();
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOP_BUY + 3,{"index":this._selectedIndex,"shopId":this._shopid});
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
            }
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
        //发送购买请求
        NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "2" });
    };
    /**
     * 新的发送消息
     */
    Shop3ScrollItem.prototype.confirmCallbackHandlerNew = function (data) {
        //判断元宝数是否足够
        if (this._shopItemCfg.buyCost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isRequesting = true;
        this._buyItemNum = data;
        //发送购买请求
        NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "2", "buyitemnum": data });
    };
    //检查是否需要弹出消费提示框
    Shop3ScrollItem.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var costNum = this._shopItemCfg.buyCost;
        //获取该商品的最大购买数量
        var maxlimitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
        //检查价格是否超过购买警告阈值
        if (costNum >= Config.ShopCfg.buyItemCheckVal || maxlimitNum >= Config.ShopCfg.buyItemNum) {
            var playerNum = Api.playerVoApi.getPlayerGem();
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW, {
                "confirmCallback": this.confirmCallbackHandlerNew,
                "maxNum": maxlimitNum,
                "shopItemCost": this._shopItemCfg.buyCost,
                "shopItemName": this._shopItemCfg.name,
                "handler": this,
                "playerNum": playerNum,
                "id": 1
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
        var limitNum = Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
        if (limitNum == 0) {
            if (this._shopItemCfg.id == 4001) {
                App.CommonUtil.showTip(LanguageManager.getlocal("shopNumNotEnoughNextWeek"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("shopNumNotEnough"));
            }
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
        this._buyItemNum = 1;
        _super.prototype.dispose.call(this);
    };
    return Shop3ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=Shop3ScrollItem.js.map