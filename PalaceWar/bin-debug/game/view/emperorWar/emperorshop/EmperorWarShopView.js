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
 * 称帝战商城
 * author qianjun
 */
var EmperorWarShopView = (function (_super) {
    __extends(EmperorWarShopView, _super);
    function EmperorWarShopView() {
        var _this = _super.call(this) || this;
        _this.gemTF = null;
        return _this;
    }
    EmperorWarShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "empshopbg", "empshop_tag", "empshopscenebg", "empshopman", "empshopscenebg"
        ]);
    };
    Object.defineProperty(EmperorWarShopView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmperorWarShopView.prototype, "cfg", {
        get: function () {
            return Config.EmperorwarCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarShopView.prototype.getBgName = function () {
        return "empshopscenebg";
    };
    EmperorWarShopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.useCallback, this);
        var temW = 38;
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.scaleX = temW / gemIcon.width;
        gemIcon.scaleY = temW / gemIcon.height;
        gemIcon.x = PlatformManager.hasSpcialCloseBtn() ? 430 : 5;
        gemIcon.y = PlatformManager.hasSpcialCloseBtn() ? 320 : 44;
        this.addChild(gemIcon);
        this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.gemTF.x = gemIcon.x + temW + 5;
        this.gemTF.y = gemIcon.y + 9;
        this.addChild(this.gemTF);
        var goToRechargeBtn = ComponentManager.getButton("mainui_btn1", "", this.goToRechargeHandler, this);
        // goToRechargeBtn.scaleX = temW/goToRechargeBtn.width;
        // goToRechargeBtn.scaleY = temW/goToRechargeBtn.height;
        goToRechargeBtn.setScale(0.85);
        goToRechargeBtn.x = gemIcon.x + 118;
        goToRechargeBtn.y = gemIcon.y + 4;
        this.addChild(goToRechargeBtn);
        var topbg = BaseBitmap.create("public_9_bg25");
        topbg.width = 387;
        topbg.height = 84;
        view.setLayoutPosition(LayoutConst.righttop, topbg, view, [20, view.titleBg.height + 10]);
        view.addChild(topbg);
        var topTxt = ComponentManager.getTextField(LanguageManager.getlocal('emperorWarShopViewDesc'), 22, TextFieldConst.COLOR_BLACK);
        topTxt.width = 347;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, topTxt, topbg);
        view.addChild(topTxt);
        var listbg = BaseBitmap.create("empshopbg");
        listbg.width = 405;
        listbg.height = GameConfig.stageHeigth - topbg.y - topbg.height - 60;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, topbg, [0, topbg.height + 10]);
        view.addChild(listbg);
        //
        var man = BaseBitmap.create("empshopman");
        view.setLayoutPosition(LayoutConst.lefttop, man, view, [-10, 120]);
        view.addChild(man);
        //商品列表 
        var arr = [];
        var shopData = view.cfg.shop;
        for (var i in shopData) {
            var unit = shopData[i];
            arr.push(unit);
        }
        var scrollList = ComponentManager.getScrollList(EmperorWarShopScrollItem, arr, new egret.Rectangle(listbg.x, listbg.y, listbg.width - 63, listbg.height - 50));
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, listbg, [0, 10]);
        view.addChild(scrollList);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BM),this.bmCallBack,this);
    };
    EmperorWarShopView.prototype.goToRechargeHandler = function () {
        // App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    EmperorWarShopView.prototype.useCallback = function () {
        this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
    };
    // 背景图名称
    // protected getBgName():string{
    // 	return "empbmcbg";
    // }
    EmperorWarShopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.useCallback, this);
        _super.prototype.dispose.call(this);
    };
    return EmperorWarShopView;
}(CommonView));
__reflect(EmperorWarShopView.prototype, "EmperorWarShopView");
//# sourceMappingURL=EmperorWarShopView.js.map