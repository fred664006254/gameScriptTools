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
 * author dmj
 * date 2017/10/28
 * @class ShopScrollItem
 */
var ShopScrollItem = (function (_super) {
    __extends(ShopScrollItem, _super);
    function ShopScrollItem() {
        var _this = _super.call(this) || this;
        //商品id
        _this._shopid = 0;
        _this._selectedIndex = 0;
        _this.itemList = [];
        _this._isRequesting = false;
        _this._data = null;
        _this._buyNum = 0;
        _this._nextNum2 = 0;
        _this._buyItemNum = 1;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ShopScrollItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        var temW = 600;
        var temH = 160;
        this.width = temW;
        this.height = temH;
        this._shopid = data.sortId;
        this._selectedIndex = index;
        this._data = data;
        var shopItemCfg = Config.ShopnewCfg.getnewShopItemCfgById(this._shopid); //Config.ShopnewCfg.getnewShopItemCfgById(this._shopid);// Api.shopVoApi.getShopItemCfgById(this._shopid);
        this._shopItemCfg = shopItemCfg;
        // 显示道具列表
        var contentList = GameData.formatRewardItem(data.content); //shopItemCfg.contentList;
        // 购买价格
        var buyCost = shopItemCfg.buyCost;
        // 限制类型
        var currVipDesc = "";
        var currVip = Api.playerVoApi.getPlayerVipLevel();
        var nextVip = Api.playerVoApi.getPlayerNextVipLevel();
        var nextVipDesc = "";
        if (data.isLimit == 1) {
            if (currVip >= data.needVip && currVip != 0) {
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + currVip, currNum + ""]);
                this._buyNum = currNum;
                if (currVip != Api.playerVoApi.getPlayerMaxVip()) {
                    var nextNum = this.getNextVipNum(nextVip);
                    if (nextNum == this.getVipNum()) {
                        //如果一样反回下一个等级
                        var num1 = this.lookupNextVipNum(nextNum);
                        if (num1 != null) {
                            var currVipNum = num1;
                            var nextNum2 = data.buyNum[num1] - this.getIdBynum();
                            this._nextNum2 = currVipNum;
                            nextVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + currVipNum, nextNum2 + ""]);
                        }
                        else {
                            nextVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + nextVip, nextNum + ""]);
                            this._nextNum2 = nextVip;
                        }
                    }
                    else {
                        nextVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + nextVip, nextNum + ""]);
                        this._nextNum2 = nextVip;
                    }
                }
            }
            else if (currVip == 0 && data.needVip == 0) {
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + currVip, currNum + ""]);
                this._buyNum = currNum;
            }
            else {
                //低于当前限制等级
                var buyNum = this._data.buyNum[data.needVip];
                currVipDesc = LanguageManager.getlocal("shopvipDes1", ["" + data.needVip, buyNum + ""]);
                this._buyNum = currNum;
            }
        }
        // 商品名称
        var shopName = shopItemCfg.name;
        // vip限制描述
        var needVipDesc = this.needVipDesc; // shopItemCfg.needVipDesc;
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.width = temW;
        bg.height = 150;
        this.addChild(bg);
        if (contentList.length > 1) {
            // todo特惠礼包 
        }
        else {
            // 单个物品
            for (var i = 0; i < contentList.length; i++) {
                var rewardItemVo = contentList[i];
                var icon = GameData.getItemIcon(rewardItemVo, true);
                icon.x = 15;
                icon.y = 24;
                this.addChild(icon);
                this.itemList.push(icon);
                var itemNameBg = BaseBitmap.create("public_titlebg");
                itemNameBg.x = icon.x + 115;
                itemNameBg.y = icon.y;
                var itemNameBgWidth = 240;
                // if(PlatformManager.checkIsPtLang()){
                // 	itemNameBgWidth = 220 ;
                // }
                itemNameBg.width = itemNameBgWidth;
                this.addChild(itemNameBg);
                var itemNameTF = ComponentManager.getTextField(rewardItemVo.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW); //rewardItemVo.nameColor
                itemNameTF.x = itemNameBg.x + 15; //itemNameBg.width/2 - itemNameTF.width/2;
                itemNameTF.y = itemNameBg.y + itemNameBg.height / 2 - itemNameTF.height / 2;
                this.addChild(itemNameTF);
                if (PlatformManager.checkIsEnLang()) {
                    // itemNameBg.width = itemNameTF.width + 52;
                    itemNameTF.x = itemNameBg.x + 15; //itemNameBg.x + itemNameBg.width/2 - itemNameTF.width/2;
                }
                var itemDescTF = ComponentManager.getTextField(rewardItemVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                itemDescTF.x = itemNameBg.x;
                itemDescTF.y = itemNameBg.y + itemNameBg.height + 7;
                itemDescTF.width = 280;
                this.addChild(itemDescTF);
                this._buyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "nothing", this.buyHandler, this);
                var str = "";
                str = this.getBuyCost().toString();
                this._buyBtn.setText(str, false);
                this._buyBtn.addTextIcon("public_icon1", 1);
                this._buyBtn.x = this.width - this._buyBtn.width - 20;
                this._buyBtn.y = this.height / 2 - this._buyBtn.height / 2;
                this.addChild(this._buyBtn);
                if (needVipDesc != "") {
                    var vipLimitTF = ComponentManager.getTextField(needVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
                    vipLimitTF.x = itemNameBg.x;
                    vipLimitTF.y = itemDescTF.y + itemDescTF.height + 7;
                    this.addChild(vipLimitTF);
                }
                if (currVipDesc != "") {
                    this._limitNumTF = ComponentManager.getTextField(currVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                    this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width / 2 - this._limitNumTF.width / 2;
                    this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 7;
                    // var buyNum = this._data.buyNum[data.needVip];
                    if (this._buyNum > 0) {
                        this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_GREEN2; // 0x00ff00;
                    }
                    else {
                        this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED;
                    }
                    this.addChild(this._limitNumTF);
                }
                if (nextVipDesc != "") {
                    this._nextViptxt = ComponentManager.getTextField(nextVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                    this._nextViptxt.x = this._buyBtn.x + this._buyBtn.width / 2 - this._nextViptxt.width / 2;
                    this._nextViptxt.y = this._buyBtn.y - 27;
                    this.addChild(this._nextViptxt);
                }
                if (shopItemCfg.discount > 0) {
                    var cornerSp = BaseBitmap.create("shopview_corner");
                    cornerSp.x = 3;
                    cornerSp.y = 1;
                    this.addChild(cornerSp);
                    var discountTF = ComponentManager.getTextField(shopItemCfg.discountDesc, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    discountTF.x = 9;
                    discountTF.y = 25;
                    discountTF.rotation = -40;
                    this.addChild(discountTF);
                    var gemIconW = 30;
                    var originalTF = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle") + ":", 18, TextFieldConst.COLOR_BLACK);
                    originalTF.y = this._buyBtn.y - originalTF.height / 2 - 13;
                    this.addChild(originalTF);
                    var gemIcon = BaseBitmap.create("public_icon1");
                    gemIcon.scaleX = gemIconW / gemIcon.width;
                    gemIcon.scaleY = gemIconW / gemIcon.height;
                    gemIcon.y = this._buyBtn.y - gemIconW / 2 - 13;
                    this.addChild(gemIcon);
                    var originalPriceTF = ComponentManager.getTextField(shopItemCfg.preCost.toString(), 18, TextFieldConst.COLOR_BLACK);
                    originalPriceTF.x = itemNameBg.x;
                    originalPriceTF.y = originalTF.y;
                    this.addChild(originalPriceTF);
                    var newW = originalTF.width + gemIconW + originalPriceTF.width;
                    originalTF.x = this._buyBtn.x + this._buyBtn.width / 2 - newW / 2;
                    gemIcon.x = originalTF.x + originalTF.width;
                    originalPriceTF.x = gemIcon.x + gemIconW;
                    var discountSp = BaseBitmap.create("shopview_line");
                    discountSp.x = this._buyBtn.x + this._buyBtn.width / 2 - discountSp.width / 2;
                    discountSp.y = this._buyBtn.y - discountSp.height / 2 - 13;
                    this.addChild(discountSp);
                }
            }
            if (this._shopid == 1001 && param && param && param.isMainTask) {
                egret.callLater(function () {
                    _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, bg.x + bg.width - 110, bg.y + bg.height / 2 - 30, [_this._buyBtn], 121, true, function () {
                        this.parent.setChildIndex(this, 100);
                        return true;
                    }, _this);
                }, this, null);
            }
        }
    };
    ShopScrollItem.prototype.update = function () {
        var nextVip = Api.playerVoApi.getPlayerNextVipLevel();
        if (this._limitNumTF) {
            var limitNum = this.getVipNum();
            var currVip = Api.playerVoApi.getPlayerVipLevel();
            this._limitNumTF.text = LanguageManager.getlocal("shopvipDes1", [currVip + "", limitNum.toString()]);
            if (limitNum == 0) {
                this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED2;
            }
        }
        if (this._data.isLimit == 1) {
            if (this._nextViptxt) {
                var nextNum2 = this.getNextVipNum(this._nextNum2);
                this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1", ["" + this._nextNum2, nextNum2 + ""]);
            }
            var nextNum = this.getNextVipNum(this._nextNum2);
            if (this._nextViptxt && this.getVipNum() == nextNum) {
                var nextLookNum = this.lookupNextVipNum(nextNum);
                if (nextLookNum) {
                    var newNextNum = nextLookNum + 1;
                    var nextNum2 = this._data.buyNum[newNextNum - 1] - this.getIdBynum();
                    this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1", ["" + newNextNum, nextNum2 + ""]);
                }
            }
        }
        if (this._buyBtn) {
            var str = this.getBuyCost().toString();
            this._buyBtn.setText(str, false);
            this._buyBtn.removeTextIcon();
            this._buyBtn.addTextIcon("public_icon1", 1);
        }
    };
    ShopScrollItem.prototype.lookupNextVipNum = function (index) {
        if (index === void 0) { index = 0; }
        var currVip = Api.playerVoApi.getPlayerVipLevel();
        for (var i = 0; i < this._data.buyNum.length; i++) {
            var cfgNum = this._data.buyNum[i];
            var newNum = cfgNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
            if (index < newNum && i >= currVip) {
                return i;
            }
        }
        return null;
    };
    ShopScrollItem.prototype.playSuccessAction = function () {
        if (this._shopItemCfg) {
            var rewardVo = GameData.formatRewardItem(this._shopItemCfg.content)[0];
            rewardVo.num *= this._buyItemNum;
            var icon = GameData.getItemIcon(rewardVo, true);
            var tmpNode = this.itemList[0];
            icon.setScale(tmpNode.scaleX);
            var p = tmpNode.localToGlobal();
            var x1 = p.x;
            var y1 = p.y;
            icon.x = p.x;
            icon.y = p.y;
            var x2 = GameConfig.stageWidth / 2 + icon.width / 2;
            var y2 = GameConfig.stageHeigth - 10;
            LayerManager.panelLayer.addChild(icon);
            egret.Tween.get(icon).wait(200 * 1).to({ x: x2, y: y2 }, 500).call(this.onComplete, this, [icon]);
            // let contentList:Array<RewardItemVo> = this._shopItemCfg.contentList;
            // for (var index = contentList.length-1; index >= 0 ; index--) {
            // 	let rewardItemVo = this._shopItemCfg.content; //contentList[index];
            // }
        }
    };
    ShopScrollItem.prototype.onComplete = function (icon) {
        if (icon) {
            icon.dispose();
        }
    };
    ShopScrollItem.prototype.buyHandlerCallback = function (event) {
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
                //App.CommonUtil.showTip("购买失败");
                App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
            }
        }
    };
    /**
     * 新的弹板
     */
    ShopScrollItem.prototype.confirmCallbackHandlerNew = function (data) {
        //判断元宝数是否足够
        if (this.getBuyCost() > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isRequesting = true;
        this._buyItemNum = data;
        //发送购买请求
        NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "1", "buyitemnum": data });
    };
    //弹出消费提示框显示确认
    ShopScrollItem.prototype.confirmCallbackHandler = function () {
        //判断元宝数是否足够
        if (this.getBuyCost() > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isRequesting = true;
        //发送购买请求
        NetManager.request(NetRequestConst.REQUEST_SHOP_BUY_ITEM, { "shopId": this._shopid, version: Api.shopVoApi.getVersion(), "dtype": "1" });
    };
    //检查是否需要弹出消费提示框
    ShopScrollItem.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var shopCost = this.getBuyCost();
        //最大购买数量
        var maxlimitNum = 0;
        if (this._data.isLimit == 1) {
            maxlimitNum = this.getVipNum();
        }
        //检查价格是否超过购买警告阈值
        if (shopCost >= Config.ShopCfg.buyItemCheckVal || maxlimitNum >= Config.ShopCfg.buyItemNum) {
            var playerNum = Api.playerVoApi.getPlayerGem();
            var shopName = GameData.formatRewardItem(this._data.content)[0].name;
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW, {
                "data": this._data,
                "confirmCallback": this.confirmCallbackHandlerNew,
                "maxNum": maxlimitNum,
                "shopItemCost": shopCost,
                "shopItemName": shopName,
                "handler": this,
                "playerNum": playerNum,
                "id": 1,
            });
        }
        else {
            this.confirmCallbackHandler();
        }
    };
    ShopScrollItem.prototype.buyHandler = function (param) {
        if (this._shopItemCfg.needVip > Api.playerVoApi.getPlayerVipLevel()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("vipLvNotEnough"));
            return;
        }
        //当前vip可以购买的次数
        var limitNum = this.getVipNum(); //this._shopItemCfg.limitNum; //Api.shopVoApi.getCanBuyNumById(this._shopItemCfg.id);
        if (limitNum == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newshopNumNotEnough"));
            return;
        }
        //检查是否需要弹出消费提示框
        this.checkNeedWarnPopup();
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
    };
    ShopScrollItem.prototype.getBuyCost = function () {
        var num = Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
        var buyNum = 0;
        if (num && this._data.isLimit == 1) {
            if (num >= this._data.buyCost.length) {
                buyNum = this._data.buyCost[this._data.buyCost.length - 1];
                return buyNum;
            }
            buyNum = this._data.buyCost[num];
        }
        else {
            buyNum = this._data.buyCost[0];
        }
        return buyNum;
    };
    //当前vip剩余可以购买的次数
    ShopScrollItem.prototype.getVipNum = function () {
        if (this._data.isLimit == 1) {
            var currVip = Api.playerVoApi.getPlayerVipLevel();
            if (currVip >= this._data.buyNum.length) {
                currVip = this._data.buyNum.length - 1;
            }
            var sureNum = this._data.buyNum[currVip];
            var currNum = sureNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
            return currNum;
        }
    };
    //当前vip下一等级剩余可以购买的次数
    ShopScrollItem.prototype.getNextVipNum = function (nextVip) {
        if (nextVip === void 0) { nextVip = 0; }
        if (this._data.isLimit == 1) {
            // let nextVip = Api.playerVoApi.getPlayerNextVipLevel();
            if (nextVip >= this._data.buyNum.length) {
                nextVip = this._data.buyNum.length;
            }
            var sureNum = this._data.buyNum[Math.min(nextVip, this._data.buyNum.length - 1)];
            var currNum = sureNum - Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
            return currNum;
        }
    };
    //获取已经购买过的次数
    ShopScrollItem.prototype.getIdBynum = function () {
        return Api.shopVoApi.getNewShopBuyNumById(this._data.sortId);
    };
    Object.defineProperty(ShopScrollItem.prototype, "needVipDesc", {
        get: function () {
            if (this._shopItemCfg.needVip && this._shopItemCfg.needVip > 0) {
                return LanguageManager.getlocal("shopVipLimit", [this._shopItemCfg.needVip.toString()]);
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    ShopScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ShopScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        this._shopid = 0;
        this._limitNumTF = null;
        this._buyBtn = null;
        this._limitDescTF = null;
        this._selectedIndex = 0;
        this._shopItemCfg = null;
        this.itemList = [];
        this._isRequesting = false;
        this._buyNum = 0;
        this._buyItemNum = 1;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ShopScrollItem;
}(ScrollListItem));
__reflect(ShopScrollItem.prototype, "ShopScrollItem");
//# sourceMappingURL=ShopScrollItem.js.map