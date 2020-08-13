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
 * 碎片兑换
 * author qianjun
 * date 2018/08/13
 * @class SkinScrollItem
 */
var SkinExchangeScrollItem = (function (_super) {
    __extends(SkinExchangeScrollItem, _super);
    function SkinExchangeScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._isGray = false;
        _this._nodeContainer = undefined;
        return _this;
    }
    SkinExchangeScrollItem.prototype.initItem = function (index, data) {
        var _this = this;
        this._uiData = data;
        this.height = 393;
        var serSkincfg = undefined;
        var wifeSkincfg = undefined;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("skin_boxbg");
        // bg.anchorOffsetX = bg.width/2;
        bg.x = 1;
        this._nodeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 405, 440);
        var tarScale = 0.61;
        var tarY = bg.y;
        var skinImgPath = "";
        var skinNameStr = "";
        var ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        var isGray = true;
        var uiType = data["uiType"];
        uiType = uiType ? uiType : 0;
        if (data.wifeId) {
            bg.texture = ResourceManager.getRes("skin_boxbg2");
            wifeSkincfg = data;
            if (uiType == 2) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkincfg.id)) {
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }
                else {
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            skinImgPath = wifeSkincfg.body;
            skinNameStr = wifeSkincfg.name + " " + LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
            tarScale = 0.45;
            tarY = bg.y + 15;
            rect.width = 640;
            rect.height = 550;
        }
        else if (data.servantId) {
            serSkincfg = data;
            if (uiType == 1) {
                // let sLv = Api.servantVoApi.getServantSkinLV(data.id);
                // if(sLv){
                if (!serSkincfg.canExchangeItem()) {
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }
                else {
                    ownerNameStr = LanguageManager.getlocal("skin_notOwnTip");
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            skinImgPath = serSkincfg.body;
            skinNameStr = serSkincfg.getSkinName() + " " + serCfg.name;
        }
        var skinImg = BaseLoadBitmap.create(skinImgPath);
        skinImg.mask = rect;
        skinImg.setScale(tarScale);
        skinImg.x = bg.x + bg.width / 2 - rect.width * tarScale / 2;
        skinImg.y = tarY;
        this._nodeContainer.addChild(skinImg);
        var namebg = BaseBitmap.create("skin_bottombg");
        namebg.x = bg.x + bg.width / 2 - namebg.width / 2;
        namebg.y = bg.y + bg.height - namebg.height - 18;
        this._nodeContainer.addChild(namebg);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.x = namebg.x + namebg.width / 2 - skinNameTxt.width / 2;
        skinNameTxt.y = namebg.y + 7;
        this._nodeContainer.addChild(skinNameTxt);
        var cfg = null;
        var exchange = '';
        if (data.servantId) {
            exchange = data.exchangeItem;
        }
        else {
            exchange = data.claim;
        }
        var itemvo = GameData.formatRewardItem(exchange);
        var needNum = itemvo[0].num;
        var have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
        if (!isGray) {
            //已有
            var ownerNameTxt = ComponentManager.getTextField(ownerNameStr, 20, TextFieldConst.COLOR_QUALITY_GRAY);
            ownerNameTxt.x = namebg.x + namebg.width / 2 - ownerNameTxt.width / 2;
            ownerNameTxt.y = skinNameTxt.y + 25;
            this._nodeContainer.addChild(ownerNameTxt);
        }
        else {
            //
            var icon = BaseLoadBitmap.create(itemvo[0].icon);
            icon.setScale(0.25);
            this._nodeContainer.addChild(icon);
            var text = ComponentManager.getTextField(have + "/" + needNum, 20, have < needNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);
            var tmpX = (skinNameTxt.textWidth - text.textWidth - 5 - 25) / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, skinNameTxt, [tmpX, skinNameTxt.textHeight + 2]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, text, skinNameTxt, [tmpX + 25 + 5, skinNameTxt.textHeight + 5]);
            this._nodeContainer.addChild(text);
        }
        this._isGray = isGray;
        this._nodeContainer.addTouch(this.touchHandler, this, null, true);
        var bottomBg = BaseBitmap.create("skin_exchange" + (data.servantId ? 1 : 2));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this, [0, 0], true);
        this._nodeContainer.addChild(bottomBg);
        var flag = false;
        if (data.servantId) {
            flag = Api.servantVoApi.getServantObj(data.servantId) ? true : false;
        }
        else {
            flag = Api.wifeVoApi.getWifeInfoVoById(data.wifeId) ? true : false;
        }
        if (!flag) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_tip" + (data.servantId ? 1 : 2)), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg, [0, -10]);
            this._nodeContainer.addChild(tipTxt);
        }
        else {
            var makeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "skinViewMake", function () {
                //制作消息
                var exchange = '';
                if (data.servantId) {
                    exchange = data.exchangeItem;
                }
                else {
                    exchange = data.claim;
                }
                var itemvo = GameData.formatRewardItem(exchange);
                var needNum = itemvo[0].num;
                var have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
                if (!_this._isGray) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("skin_myOwn1"));
                    return;
                }
                if (needNum > have) {
                    var str = '';
                    if (data.servantId) {
                        str = "skin_tip4";
                    }
                    else if (itemvo[0].id == 1562) {
                        str = "skin_tip6";
                    }
                    else {
                        str = "skin_tip5";
                    }
                    App.CommonUtil.showTip(LanguageManager.getlocal(str));
                    return;
                }
                var itemid = itemvo[0].id;
                var itemUseCount = itemvo[0].num;
                var itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
                var itemCfg = Config.ItemCfg.getItemCfgById(itemid);
                var message = LanguageManager.getlocal("skinViewMakeTip", [itemCfg.name + "x" + itemUseCount, skinNameStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
                    confirmCallback: function () {
                        //消息
                        NetManager.request(NetRequestConst.REQUEST_SKIN_MAKE, {
                            skinId: data.id,
                            skinType: data.servantId ? 2 : 1
                        });
                        // ViewController.getInstance().openView(ViewConst.POPUP.SKINGETVIEW, {
                        //     rewards : data,
                        // })
                    },
                    handler: _this,
                    icon: itemCfg.icon,
                    iconBg: itemCfg.iconBg,
                    num: itemCount,
                    useNum: itemUseCount,
                    msg: message,
                    id: itemid
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, makeBtn, bottomBg, [0, -4]);
            this.addChild(makeBtn);
            if (!this._isGray) {
                App.DisplayUtil.changeToGray(makeBtn);
                makeBtn.visible = false;
            }
            else {
                if (needNum > have) {
                    App.DisplayUtil.changeToGray(makeBtn);
                }
                else {
                    App.DisplayUtil.changeToNormal(makeBtn);
                    App.CommonUtil.addIconToBDOC(makeBtn);
                }
            }
        }
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width / 2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height / 2;
        this._nodeContainer.x = this._nodeContainer.width / 2;
        this._nodeContainer.y = this._nodeContainer.height / 2;
        //
        if (Api.rookieVoApi.curGuideKey == "skin" && data.id == "2211") {
            var light = BaseBitmap.create("public_9_bg63");
            light.width = this.width;
            light.height = this.height;
            light.setPosition(0, 0);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
    };
    SkinExchangeScrollItem.prototype.touchHandler = function (event) {
        var scalV = 0.97;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._nodeContainer.setScale(scalV);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._nodeContainer.setScale(1.0);
                break;
            case egret.TouchEvent.TOUCH_END:
                this._nodeContainer.setScale(1.0);
                ViewController.getInstance().openView(ViewConst.COMMON.SKINDETAILVIEW, this._uiData);
                break;
        }
    };
    SkinExchangeScrollItem.prototype.getSpaceX = function () {
        return 3;
    };
    SkinExchangeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SkinExchangeScrollItem.prototype.dispose = function () {
        this._nodeContainer.removeTouchTap();
        this._nodeContainer = null;
        this._uiData = null;
        this._isGray = false;
        _super.prototype.dispose.call(this);
    };
    return SkinExchangeScrollItem;
}(ScrollListItem));
__reflect(SkinExchangeScrollItem.prototype, "SkinExchangeScrollItem");
//# sourceMappingURL=SkinExchangeScrollItem.js.map