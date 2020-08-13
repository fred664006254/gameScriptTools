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
        return _this;
    }
    ShopScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM), this.buyHandlerCallback, this);
        var temW = 600;
        var temH = 156;
        this.width = temW;
        this.height = temH + 5;
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
        //购买物品vip等级限制显示
        var vipUnlockDesc = "";
        if (data.isLimit) {
            //当前vip达到解锁要求
            if (currVip >= data.needVip) {
                //已经解锁了 显示当前vip 还可以购买的数量/当前vip可以购买的总数
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopNumPerDay", [currNum.toString()]);
                this._buyNum = currNum;
            }
            else {
                //没有解锁 显示解锁vip等级
                vipUnlockDesc = LanguageManager.getlocal("shopLimitVip", [data.needVip.toString()]);
            }
        }
        /**
        if(data.isLimit==1)
        {
            if(currVip>=data.needVip&&currVip!=0)
            {
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVip,currNum+""]);
                this._buyNum = currNum;
                
                if(currVip!=Api.playerVoApi.getPlayerMaxVip())
                {
                    var nextNum:number = this.getNextVipNum(nextVip);
                    if(nextNum == this.getVipNum())
                    {
                        //如果一样反回下一个等级
                        let num1 = this.lookupNextVipNum(nextNum);
                        if(num1!=null)
                        {
                            let currVipNum = num1;
                            let nextNum2 = data.buyNum[num1]-this.getIdBynum();
                            this._nextNum2 = currVipNum;
                            nextVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVipNum,nextNum2+""]);
                        }
                    }else
                    {
                        nextVipDesc = LanguageManager.getlocal("shopvipDes1",[""+nextVip,nextNum+""]);
                        this._nextNum2 = nextVip;
                    }
                }
                
            }
            else if(currVip==0&&data.needVip==0)
            {
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+currVip,currNum+""]);
                this._buyNum = currNum;
            }
            else
            {
                //低于当前限制等级
                var buyNum = this._data.buyNum[data.needVip];
                currVipDesc = LanguageManager.getlocal("shopvipDes1",[""+data.needVip,buyNum+""])
                this._buyNum = currNum;
            }
        }
    */
        // 商品名称
        var shopName = shopItemCfg.name;
        // vip限制描述
        var needVipDesc = this.needVipDesc; // shopItemCfg.needVipDesc;
        var bg = BaseBitmap.create("rechargevie_itembg");
        // bg.width = temW;
        // bg.height=145
        this.addChild(bg);
        if (contentList.length > 1) {
            // todo特惠礼包 
        }
        else {
            // 单个物品
            for (var i = 0; i < contentList.length; i++) {
                var rewardItemVo = contentList[i];
                var iconBg = BaseBitmap.create("shopview_rewardbg");
                // iconBg.x = 15 + 25 - iconBg.width/2;
                // iconBg.y = 24 + 25 - iconBg.height/2;
                iconBg.width = 106 + 8;
                iconBg.height = 106 + 8;
                iconBg.x = 30;
                iconBg.y = bg.y + bg.height / 2 - iconBg.height / 2;
                this.addChild(iconBg);
                var icon = GameData.getItemIcon(rewardItemVo, true);
                icon.x = 34;
                icon.y = iconBg.y + iconBg.height / 2 - icon.height / 2;
                this.addChild(icon);
                this.itemList.push(icon);
                // let itemNameBg:BaseBitmap = BaseBitmap.create("public_biaoti2");
                // itemNameBg.x = icon.x + 155;
                // itemNameBg.y = 20;//icon.y;
                // itemNameBg.width = 212;
                // this.addChild(itemNameBg);
                var itemNameTF = ComponentManager.getTextField(rewardItemVo.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN_NEW);
                itemNameTF.x = icon.x + 115;
                itemNameTF.y = 30;
                this.addChild(itemNameTF);
                var itemDescTF = ComponentManager.getTextField(rewardItemVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
                itemDescTF.x = itemNameTF.x;
                itemDescTF.y = itemNameTF.y + itemNameTF.height + 7;
                itemDescTF.width = 280;
                this.addChild(itemDescTF);
                this._buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "nothing", this.buyHandler, this);
                var str = "";
                str = this.getBuyCost().toString();
                this._buyBtn.setText(str, false);
                this._buyBtn.addTextIcon("public_icon1", 1);
                this._buyBtn.x = this.width - this._buyBtn.width - 30;
                this._buyBtn.y = bg.y + bg.height / 2 - this._buyBtn.height / 2;
                this.addChild(this._buyBtn);
                if (needVipDesc != "") {
                    var vipLimitTF = ComponentManager.getTextField(needVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
                    vipLimitTF.x = itemNameTF.x;
                    vipLimitTF.y = itemDescTF.y + itemDescTF.height + 7;
                    this.addChild(vipLimitTF);
                }
                if (currVipDesc != "") {
                    this._limitNumTF = ComponentManager.getTextField(currVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                    this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width / 2 - this._limitNumTF.width / 2;
                    this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 10;
                    // var buyNum = this._data.buyNum[data.needVip];
                    if (this._buyNum > 0) {
                        this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW; // 0x00ff00;
                    }
                    else {
                        this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED_NEW;
                    }
                    this.addChild(this._limitNumTF);
                }
                if (vipUnlockDesc != "") {
                    this._limitNumTF = ComponentManager.getTextField(vipUnlockDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                    this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width / 2 - this._limitNumTF.width / 2;
                    this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 15;
                    this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED_NEW;
                    this.addChild(this._limitNumTF);
                }
                if (nextVipDesc != "") {
                    this._nextViptxt = ComponentManager.getTextField(nextVipDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED_NEW);
                    this._nextViptxt.x = this._buyBtn.x + this._buyBtn.width / 2 - this._nextViptxt.width / 2;
                    this._nextViptxt.y = this._buyBtn.y - 27;
                    this.addChild(this._nextViptxt);
                }
                if (shopItemCfg.discount > 0) {
                    var cornerSp = BaseBitmap.create("activity_dazhe_01");
                    cornerSp.x = 3;
                    cornerSp.y = 14;
                    this.addChild(cornerSp);
                    var discountTF = ComponentManager.getTextField(shopItemCfg.discountDesc, 18, TextFieldConst.COLOR_WARN_YELLOW_NEW);
                    discountTF.x = 9;
                    discountTF.y = 25;
                    discountTF.width = 20;
                    // discountTF.rotation = -40;
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
                    originalPriceTF.x = itemNameTF.x;
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
        }
    };
    ShopScrollItem.prototype.update = function () {
        var nextVip = Api.playerVoApi.getPlayerNextVipLevel();
        if (this._limitNumTF) {
            // let limitNum = this.getVipNum();
            // let currVip =Api.playerVoApi.getPlayerVipLevel();  
            // this._limitNumTF.text = LanguageManager.getlocal("shopvipDes1",[currVip+"",limitNum.toString()]);
            // if(limitNum==0)
            // {
            //  	this._limitNumTF.textColor =TextFieldConst.COLOR_WARN_RED2;
            // }
            var currVipDesc = "";
            var vipUnlockDesc = "";
            var currVip = Api.playerVoApi.getPlayerVipLevel();
            //当前vip达到解锁要求
            if (currVip >= this._data.needVip) {
                //已经解锁了 显示当前vip 还可以购买的数量/当前vip可以购买的总数
                var currNum = this.getVipNum();
                currVipDesc = LanguageManager.getlocal("shopNumPerDay", [currNum.toString()]);
                this._buyNum = currNum;
                this._limitNumTF.text = currVipDesc;
                if (currNum == 0) {
                    this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED;
                }
                else {
                    this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_GREEN;
                }
            }
        }
        if (this._data.isLimit == 1) {
            if (this._nextViptxt) {
                var nextNum2 = this.getNextVipNum(this._nextNum2);
                this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1", ["" + this._nextNum2, nextNum2 + ""]);
            }
            var nextNum = this.getNextVipNum(this._nextNum2);
            if (this._nextViptxt && this.getVipNum() == nextNum) {
                var newNextNum = this.lookupNextVipNum(nextNum) + 1;
                var nextNum2 = this._data.buyNum[newNextNum - 1] - this.getIdBynum();
                this._nextViptxt.text = LanguageManager.getlocal("shopvipDes1", ["" + newNextNum, nextNum2 + ""]);
            }
        }
        // let currVip =Api.playerVoApi.getPlayerVipLevel();  
        // if(data.isLimit)
        // {
        // 	//当前vip达到解锁要求
        // 	if (currVip >= data.needVip){
        // 		//已经解锁了 显示当前vip 还可以购买的数量/当前vip可以购买的总数
        // 		var currNum = this.getVipNum();
        // 		currVipDesc = LanguageManager.getlocal("shopNumPerDay",[currNum.toString(),this._data.buyNum[currVip].toString()]);
        // 		this._buyNum = currNum;
        // 	} else {
        // 		//没有解锁 显示解锁vip等级
        // 		vipUnlockDesc = LanguageManager.getlocal("shopLimitVip",[data.needVip.toString()]);
        // 	}
        // }
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
            var icon = GameData.getItemIcon(GameData.formatRewardItem(this._shopItemCfg.content)[0], true);
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
        var num = this.getBuyCost();
        //检查价格是否超过购买警告阈值
        if (num >= Config.ShopCfg.buyItemCheckVal) {
            var contentList = GameData.formatRewardItem(this._data.content); //shopItemCfg.contentList;
            var rewardItemVo = contentList[0];
            //let icon = GameData.getItemIcon(rewardItemVo,true);
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem", [num.toString(), rewardItemVo.name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            //ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                useNum: rewardItemVo.num,
                confirmCallback: this.confirmCallbackHandler,
                handler: this,
                num: playerGem,
                msg: message,
                id: 1 //消耗物品id  1->元宝
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
            var sureNum = this._data.buyNum[nextVip];
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
        _super.prototype.dispose.call(this);
    };
    return ShopScrollItem;
}(ScrollListItem));
__reflect(ShopScrollItem.prototype, "ShopScrollItem");
