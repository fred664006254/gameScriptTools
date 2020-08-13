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
var ThanksgivingView = (function (_super) {
    __extends(ThanksgivingView, _super);
    function ThanksgivingView() {
        var _this = _super.call(this) || this;
        _this.bottomBg = null;
        return _this;
    }
    ThanksgivingView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "thanksgivingview_bg",
            "thanksgivingview_top",
            "thanksgivingview_bg_font",
            "common_9_bg",
            "recharge2_fnt",
        ]);
    };
    ThanksgivingView.prototype.initView = function () {
        var myContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(myContainer);
        myContainer.y = -10;
        var thanksgbg = BaseBitmap.create("thanksgivingview_bg");
        myContainer.addChild(thanksgbg);
        this.bottomBg = BaseBitmap.create("common_9_bg");
        this.bottomBg.y = thanksgbg.height;
        this.bottomBg.height = GameConfig.stageHeigth - 89 - thanksgbg.height;
        this.bottomBg.width = 640;
        myContainer.addChild(this.bottomBg);
        var bitmapFont = BaseBitmap.create("thanksgivingview_bg_font");
        bitmapFont.x = 25;
        bitmapFont.y = this.bottomBg.y + 20;
        myContainer.addChild(bitmapFont);
        var rewaredContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(rewaredContainer);
        myContainer.addChild(rewaredContainer);
        var rechargeArr2 = Config.RechargeCfg.getNormalRechargeCfg();
        var rechargeArr = [];
        for (var i = 0; i < rechargeArr2.length; i++) {
            var _id = rechargeArr2[i].id;
            var boo = Config.FirstchargeCfg.getneedRecharge(_id);
            if (boo) {
                rechargeArr.push(rechargeArr2[i]);
            }
        }
        rechargeArr = rechargeArr.reverse();
        for (var i = 0; i < rechargeArr.length; i++) {
            var currBitmap = BaseBitmap.create("public_9_managebg");
            currBitmap.width = 141;
            currBitmap.height = 277;
            currBitmap.x = (currBitmap.width + 10) * i;
            currBitmap.y = this.bottomBg.y + 70;
            rewaredContainer.addChild(currBitmap);
            //top2
            var top2Bitmap = BaseBitmap.create("thanksgivingview_top");
            top2Bitmap.width = currBitmap.width;
            top2Bitmap.height = 40;
            top2Bitmap.x = currBitmap.x;
            top2Bitmap.y = currBitmap.y;
            rewaredContainer.addChild(top2Bitmap);
            var costStr = LanguageManager.getlocal("thanksgivingRecharge1", [rechargeArr[i].cost + ""]);
            var topTxt = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            topTxt.x = top2Bitmap.x; //+20;
            topTxt.y = top2Bitmap.y + 8;
            topTxt.width = top2Bitmap.width;
            topTxt.textAlign = "center";
            rewaredContainer.addChild(topTxt);
            var givestr = LanguageManager.getlocal("rechargegivedes"); //送//rechargegivedes;
            var giveImg = ComponentManager.getBitmapText(givestr, "recharge2_fnt");
            giveImg.x = topTxt.x + 50;
            giveImg.y = topTxt.y + 45;
            rewaredContainer.addChild(giveImg);
            var extraClient = 3; //Config.FirstchargeCfg.getextra();
            var acerNum = rechargeArr[i].gemCost * extraClient;
            var acerStr = LanguageManager.getlocal("thanksgivingAcer", [acerNum + ""]);
            var acerTxt = ComponentManager.getTextField(acerStr, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
            acerTxt.x = topTxt.x;
            acerTxt.y = giveImg.y + 60;
            acerTxt.width = topTxt.width;
            acerTxt.textAlign = "center";
            rewaredContainer.addChild(acerTxt);
            var rechIcon = BaseLoadBitmap.create("recharge_new_itemicon" + rechargeArr[i].sortId);
            rewaredContainer.addChild(rechIcon);
            rechIcon.x = currBitmap.x + 13;
            rechIcon.y = currBitmap.y + 150;
        }
        rewaredContainer.setPosition((this.bottomBg.width - rewaredContainer.width) / 2, rewaredContainer.y);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "gotocharge", this.clickBtnHandler, this);
        getBtn.x = 230;
        getBtn.y = GameConfig.stageHeigth - 80;
        this.addChild(getBtn);
    };
    ThanksgivingView.prototype.clickBtnHandler = function (evt) {
        ViewController.getInstance().hideView(ViewConst.COMMON.THANKSGIVINGVIEW);
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    ThanksgivingView.prototype.dispose = function () {
        this.bottomBg = null;
        _super.prototype.dispose.call(this);
    };
    return ThanksgivingView;
}(CommonView));
__reflect(ThanksgivingView.prototype, "ThanksgivingView");
