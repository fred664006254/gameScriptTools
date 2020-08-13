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
var AcDuanWuTab4Item = (function (_super) {
    __extends(AcDuanWuTab4Item, _super);
    function AcDuanWuTab4Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curIdx = 0;
        _this._buyBtn = null;
        _this._code = '';
        _this._uicode = '';
        return _this;
    }
    Object.defineProperty(AcDuanWuTab4Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab4Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab4Item.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab4Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_DUANWU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab4Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab4Item.prototype, "uicode", {
        get: function () {
            return this._uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuTab4Item.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam[0];
        view._uicode = itemparam[1];
        view.width = 174;
        view.height = 237;
        this._data = data;
        this._curIdx = Number(data.id);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height;
        wordsBg.alpha = 0.4;
        this.addChild(wordsBg);
        var topbg = BaseBitmap.create("fourpeople_bottom");
        topbg.width = view.width - 20;
        topbg.height = 30;
        topbg.setPosition(10, 10);
        this.addChild(topbg);
        var rewardVo = GameData.formatRewardItem(this._data.item)[0];
        var rewardName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, rewardVo.nameColor);
        rewardName.setPosition(view.width / 2 - rewardName.width / 2, topbg.y + topbg.height / 2 - rewardName.height / 2);
        this.addChild(rewardName);
        var icon = this._data.rewardIcons;
        icon.setPosition(35, 47);
        this.addChild(icon);
        icon.getChildByName("numLb").visible = false;
        if (icon.getChildByName("numbg")) {
            icon.getChildByName("numbg").visible = false;
        }
        var tag = BaseBitmap.create('shopview_corner');
        view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
        view.addChild(tag);
        var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(this._data.rebate * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
        var tagnum = 10 - this._data.rebate * 10;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
            tagTxt.text = LanguageManager.getlocal('discountTitle', [(tagnum * 10).toString()]);
        }
        tagTxt.width = 70;
        tagTxt.height = 20;
        tagTxt.textAlign = egret.HorizontalAlign.CENTER;
        tagTxt.anchorOffsetX = tagTxt.width / 2;
        tagTxt.anchorOffsetY = tagTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
        tagTxt.rotation = -45;
        view.addChild(tagTxt);
        var curNum = view._data.limit - view.vo.getShop(view._data.id);
        var buystr;
        if (curNum > 0) {
            buystr = LanguageManager.getlocal("acDuanWuBuyTimes", [String(curNum)]);
        }
        else {
            buystr = LanguageManager.getlocal("acDuanWuBuyTimes2", [String(curNum)]);
        }
        var buyTims = ComponentManager.getTextField(buystr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buyTims.setPosition(view.width / 2 - buyTims.width / 2, icon.y + icon.height + 5);
        this.addChild(buyTims);
        var realPrice = data.price * data.rebate;
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "nothing", this.buyHandler, this);
        var str = String(realPrice);
        btn.setText(str, false);
        btn.addTextIcon("public_icon1", 1);
        btn.setPosition(view.width / 2 - btn.width / 2, 179);
        view.addChild(btn);
        view._buyBtn = btn;
        if (curNum <= 0) {
            btn.setEnable(false);
        }
        if (!view.vo.isInActivity()) {
            App.DisplayUtil.changeToGray(btn);
        }
    };
    AcDuanWuTab4Item.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getShop(view._data.id);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        var num = view._data.price * view._data.rebate;
        if (Api.playerVoApi.getPlayerGem() < num) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        view.checkNeedWarnPopup();
    };
    //检查是否需要弹出消费提示框
    AcDuanWuTab4Item.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var view = this;
        var num = view._data.price * view._data.rebate;
        //检查价格是否超过购买警告阈值
        if (num >= Config.ShopCfg.buyItemCheckVal) {
            var contentList = GameData.formatRewardItem(this._data.item);
            var rewardItemVo = contentList[0];
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem2", [num.toString(), rewardItemVo.name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                goods: this._data.item,
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
    //弹出消费提示框显示确认
    AcDuanWuTab4Item.prototype.confirmCallbackHandler = function () {
        var view = this;
        view.vo.lastidx = this._curIdx;
        this.vo.lastpos = this._buyBtn.localToGlobal(this._buyBtn.width / 2 + 50, 20);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP, {
            activeId: view.acTivityId,
            shopId: view._data.id
        });
    };
    AcDuanWuTab4Item.prototype.getSpaceY = function () {
        return 5;
    };
    AcDuanWuTab4Item.prototype.dispose = function () {
        this._data = null;
        this._curIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuTab4Item;
}(ScrollListItem));
__reflect(AcDuanWuTab4Item.prototype, "AcDuanWuTab4Item");
//# sourceMappingURL=AcDuanWuTab4Item.js.map