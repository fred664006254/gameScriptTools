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
 * 确认取消弹板
 * author qianjun
 */
var AcSingleDayBuyConfirmPopupView = (function (_super) {
    __extends(AcSingleDayBuyConfirmPopupView, _super);
    function AcSingleDayBuyConfirmPopupView() {
        var _this = _super.call(this) || this;
        _this._desctext1 = null;
        _this._desctext2 = null;
        _this._bg = null;
        _this._bg2 = null;
        _this._selectData = null;
        _this._selectedBg = null;
        _this._selectedIndex = 0;
        return _this;
    }
    AcSingleDayBuyConfirmPopupView.prototype.initView = function () {
        var view = this;
        var data = this.param.data;
        view._selectedIndex = 0;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        // bg.height = 350;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        view.addChildToContainer(bg);
        view._bg = bg;
        var itemid = data.itemid.split('_')[1];
        var type = data.itemid.split('_')[0];
        var itemcfg = null;
        if (Number(type) == 16) {
            itemcfg = Config.WifeskinCfg.getWifeCfgById(itemid);
        }
        else if (Number(type) == 11) {
            itemcfg = Config.TitleCfg.getTitleCfgById(itemid);
        }
        else {
            itemcfg = Config.ItemCfg.getItemCfgById(itemid);
        }
        var descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price).toString(), itemcfg.name]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, bg, [0, 10]);
        view.addChildToContainer(descTxt1);
        view._desctext1 = descTxt1;
        // let iconPic:string = data.icon;
        // let iconBg:string = data.iconBg;
        // let msg:string = data.msg;
        // let num = data.num;
        // let useNum = data.useNum || 0;
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 515;
        bg2.height = 150;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, descTxt1, [0, descTxt1.textHeight + 10]);
        view.addChildToContainer(bg2);
        view._bg2 = bg2;
        var descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip2'), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt2, bg2, [40, 10]);
        view.addChildToContainer(descTxt2);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        cor1.x = bg2.x;
        cor1.y = bg2.y;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = bg2.x + bg2.width - cor2.width;
        cor2.y = bg2.y;
        this.addChildToContainer(cor2);
        var coupon = view.param.data.coupon;
        if (coupon.length) {
            var reward = '';
            coupon.push({
                id: 0,
                num: 0,
                value: 0
            });
            coupon.sort(function (a, b) {
                return b.value - a.value;
            });
            for (var i in coupon) {
                reward += ("25_" + coupon[i].id + "_" + coupon[i].num + "_" + coupon[i].value + "|");
            }
            reward = reward.substring(0, reward.length - 1);
            var Icons = GameData.getRewardItemIcons(reward);
            if (Icons.length) {
                var width = 106;
                var scale = 80 / 106;
                var selectedBg = BaseBitmap.create("itembg_selected");
                selectedBg.setScale(scale);
                view.addChildToContainer(selectedBg);
                view._selectedIndex = 0;
                view._selectData = coupon[0];
                view._selectedBg = selectedBg;
                var distance = (bg2.width - 5 * width * scale - 4 * 15) / 2;
                for (var i = 1; i <= Icons.length; ++i) {
                    var icon = Icons[i - 1];
                    icon.name = "icon" + i;
                    icon.setScale(scale);
                    var mod = i % 5;
                    icon.x = distance + bg2.x + ((mod == 0 ? i : mod) - 1) * (width * scale + 10);
                    icon.y = descTxt2.y + descTxt2.textHeight + 10 + (width * scale + 15) * (Math.ceil(i / 5) - 1);
                    view.addChildToContainer(icon);
                    icon.addTouchTap(view.clickCoupon, view, [i]);
                    if (i == 1) {
                        selectedBg.x = icon.x - 6;
                        selectedBg.y = icon.y - 6;
                    }
                }
                bg2.height += (Icons.length > 5 ? (25 + width * scale) : 0);
            }
        }
        else {
            view._selectData = null;
            var emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetTip2'), 18, TextFieldConst.COLOR_BROWN);
            emptyTxt.width = bg2.width - 50;
            emptyTxt.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg2);
            view.addChildToContainer(emptyTxt);
        }
        bg.height = bg2.height + 200;
        var descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip3', ['']), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt3, bg2, [40, bg2.height + 10]);
        view.addChildToContainer(descTxt3);
        descTxt3.visible = coupon.length > 0;
        view._desctext2 = descTxt3;
        var descTxt4 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip4', [Api.playerVoApi.getPlayerGemStr()]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt4, bg2, [0, bg2.height + 10 + descTxt3.textHeight + 10]);
        view.addChildToContainer(descTxt4);
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2 + 20;
        this._cancelBtn.y = bg.y + bg.height + 15;
        // this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
        var descTxt5 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip5', ['50']), 18, TextFieldConst.COLOR_QUALITY_RED);
        descTxt5.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt5, bg, [0, bg.height + 40]);
        view.addChildToContainer(descTxt5);
        view.freshText();
    };
    AcSingleDayBuyConfirmPopupView.prototype.clickCoupon = function (obj, index) {
        var view = this;
        if (this._selectedIndex == index) {
            // if(this._selectedBg){
            // 	if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)){
            // 		this._curItemScrollItem.addChild(this._selectedBg);
            // 	}
            // }
            return;
        }
        var coupon = view.param.data.coupon;
        view._selectData = coupon[index - 1];
        view._selectedIndex = index;
        var icon = view.container.getChildByName("icon" + index);
        view._selectedBg.x = icon.x - 6;
        view._selectedBg.y = icon.y - 6;
        view.freshText();
    };
    AcSingleDayBuyConfirmPopupView.prototype.freshText = function () {
        var view = this;
        if (!view._selectData) {
            return;
        }
        var data = view.param.data;
        var itemid = data.itemid.split('_')[1];
        var type = data.itemid.split('_')[0];
        var itemcfg = null;
        if (Number(type) == 16) {
            itemcfg = Config.WifeskinCfg.getWifeCfgById(itemid);
        }
        else if (Number(type) == 11) {
            itemcfg = Config.TitleCfg.getTitleCfgById(itemid);
        }
        else {
            itemcfg = Config.ItemCfg.getItemCfgById(itemid);
        }
        if (view._selectData) {
            view._desctext1.text = LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price - view._selectData.value).toString(), itemcfg.name]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._desctext1, view._bg, [0, 10]);
            view._desctext2.text = LanguageManager.getlocal('acSingleDayCouponUseTip3', [view._selectData.value]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._desctext2, view._bg2, [40, view._bg2.height + 10]);
        }
        else {
            view._desctext1.text = LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price - view._selectData.value).toString(), itemcfg.name]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._desctext1, view._bg, [0, 10]);
            view._desctext2.alpha = 0;
        }
    };
    AcSingleDayBuyConfirmPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        view.setLayoutPosition(LayoutConst.leftbottom, view._cancelBtn, view._bg, [65, 10]);
        view.setLayoutPosition(LayoutConst.rightbottom, view._confirmBtn, view._bg, [65, 10]);
        //this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
    };
    AcSingleDayBuyConfirmPopupView.prototype.clickConfirmHandler = function (data) {
        var view = this;
        // if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
        // {
        var cost = 0;
        var param = view.param.data;
        var itemid = param.id;
        var itemcfg = Config.ItemCfg.getItemCfgById(param.itemid);
        var sub = view._selectData ? view._selectData.value : 0;
        cost = Api.playerVoApi.getPlayerGem() - Math.ceil(param.price - sub);
        if (cost < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        // 	else{
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
        // 	}
        // 	this.hide();
        // 	return;
        // }
        // App.LogUtil.log("clickConfirmHandler");
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, [view._selectData ? view._selectData.id : 0]);
        }
        this.hide();
    };
    AcSingleDayBuyConfirmPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AcSingleDayBuyConfirmPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    AcSingleDayBuyConfirmPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsingleday_coupon_itemIcon", "itembg_selected"
        ]);
    };
    AcSingleDayBuyConfirmPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    AcSingleDayBuyConfirmPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuyConfirmPopupView;
}(PopupView));
__reflect(AcSingleDayBuyConfirmPopupView.prototype, "AcSingleDayBuyConfirmPopupView");
