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
var FirstchargeMultipleView = (function (_super) {
    __extends(FirstchargeMultipleView, _super);
    // private  _payId:string = "";
    function FirstchargeMultipleView() {
        var _this = _super.call(this) || this;
        _this.bottomBg = null;
        return _this;
    }
    FirstchargeMultipleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "multiple_bg",
            "recharge4",
            "multiple_font",
            "common_9_bg",
            "recharge2_fnt",
        ]);
    };
    FirstchargeMultipleView.prototype.initView = function () {
        var myContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(myContainer);
        myContainer.y = -10;
        var thanksgbg = BaseBitmap.create("multiple_bg");
        myContainer.addChild(thanksgbg);
        this.bottomBg = BaseBitmap.create("common_9_bg");
        this.bottomBg.y = thanksgbg.height;
        this.bottomBg.height = GameConfig.stageHeigth - 89 - thanksgbg.height;
        this.bottomBg.width = 640;
        myContainer.addChild(this.bottomBg);
        var bitmapFont = BaseBitmap.create("multiple_font");
        bitmapFont.x = 25;
        bitmapFont.y = this.bottomBg.y + 20;
        myContainer.addChild(bitmapFont);
        var rewaredContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(rewaredContainer);
        myContainer.addChild(rewaredContainer);
        var rechargeArr2 = Config.ExtraRechargeCfg.getNormalRechargeCfg();
        for (var i = 0; i < rechargeArr2.length; i++) {
            var currBitmap = BaseBitmap.create("public_9_managebg");
            currBitmap.width = 141;
            currBitmap.height = 198;
            currBitmap.x = (currBitmap.width + 10) * i;
            currBitmap.y = this.bottomBg.y + 70;
            rewaredContainer.addChild(currBitmap);
            var recharge4 = BaseLoadBitmap.create("recharge4");
            rewaredContainer.addChild(recharge4);
            recharge4.x = currBitmap.x;
            recharge4.y = currBitmap.y;
            var num = i + 1;
            var rechIcon = BaseLoadBitmap.create("recharge_new_itemicon" + num);
            rechIcon.width = 116;
            rechIcon.height = 116;
            rewaredContainer.addChild(rechIcon);
            rechIcon.x = currBitmap.x + 13;
            rechIcon.y = currBitmap.y + 25;
            //top2
            var top2Bitmap = BaseBitmap.create("public_9_bg33_down");
            top2Bitmap.width = currBitmap.width - 2;
            top2Bitmap.height = 40;
            top2Bitmap.x = currBitmap.x + 2;
            top2Bitmap.y = currBitmap.y + 150 + 7;
            rewaredContainer.addChild(top2Bitmap);
            // let extraClient:number = 3;
            var acerNum = rechargeArr2[i].gemCost; //*extraClient;
            var acerStr = LanguageManager.getlocal("thanksgivingAcer", [acerNum + ""]);
            var topTxt = ComponentManager.getTextField(acerStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            topTxt.x = top2Bitmap.x;
            topTxt.y = top2Bitmap.y + 8;
            topTxt.width = top2Bitmap.width;
            topTxt.textAlign = "center";
            rewaredContainer.addChild(topTxt);
        }
        rewaredContainer.setPosition((this.bottomBg.width - rewaredContainer.width) / 2, rewaredContainer.y);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "gotocharge", this.clickBtnHandler, this);
        getBtn.x = (GameConfig.stageWidth - getBtn.width) / 2 - 20;
        getBtn.y = this.bottomBg.y + 300;
        rewaredContainer.addChild(getBtn);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, getBtn.y + 150); //getBtn.y+getBtn.height+30);
        rewaredContainer.addChild(lineSp);
        var desTxt = ComponentManager.getTextField(LanguageManager.getlocal("thaiThirdPartyFirstRechargeDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        desTxt.x = 20;
        desTxt.y = lineSp.y + 20;
        desTxt.width = 550;
        desTxt.lineSpacing = 6;
        desTxt.textAlign = "center";
        rewaredContainer.addChild(desTxt);
    };
    FirstchargeMultipleView.prototype.clickBtnHandler = function (evt) {
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        PlatformManager.pay("g1");
        ViewController.getInstance().hideView(ViewConst.COMMON.THANKSGIVINGVIEW);
    };
    FirstchargeMultipleView.prototype.dispose = function () {
        this.bottomBg = null;
        // this._payId =null;
        _super.prototype.dispose.call(this);
    };
    return FirstchargeMultipleView;
}(CommonView));
__reflect(FirstchargeMultipleView.prototype, "FirstchargeMultipleView");
//# sourceMappingURL=FirstchargeMultipleView.js.map