/**
 * 创建宴会，选择宴会类型
 * date 2017/10/31
 * @class HoldDinnerPopupView
 */
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
var HoldDinnerPopupView = (function (_super) {
    __extends(HoldDinnerPopupView, _super);
    function HoldDinnerPopupView() {
        var _this = _super.call(this) || this;
        //家宴是否公开
        _this._isOpen = false;
        _this._nikeIcon = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._clickedIdx = 0;
        return _this;
    }
    HoldDinnerPopupView.prototype.getResourceList = function () {
        var picArray = ["hold_dinner_bg1",
            "hold_dinner_bg2",
            "hold_dinner_box",
            "hold_dinner_check",
        ];
        return _super.prototype.getResourceList.call(this).concat(picArray);
    };
    HoldDinnerPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CREATDINNER), this.requiestCallback, this);
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 10;
        this.addChildToContainer(txtBg);
        var goldBg = BaseBitmap.create("public_hb_bg01");
        goldBg.x = this.viewBg.width / 2 - goldBg.width / 2;
        goldBg.y = txtBg.y + txtBg.height / 2 - goldBg.height / 2;
        this.addChildToContainer(goldBg);
        var goldIcon = BaseBitmap.create("public_icon1");
        goldIcon.x = goldBg.x - 5;
        goldIcon.y = goldBg.y + goldBg.height / 2 - goldIcon.height / 2;
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        goldText.setPosition(goldBg.x + 50, goldBg.y + goldBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        // goldBg.width = goldText.width + 70;
        var grayBg = BaseBitmap.create("public_tc_bg01");
        grayBg.width = 540;
        // grayBg.height = 540;
        grayBg.height = 285 * 2 + 20 + 5;
        grayBg.setPosition(this.viewBg.width / 2 - grayBg.width / 2, 20 + txtBg.height);
        this.addChildToContainer(grayBg);
        var holdDinnerInfoContainer1 = this.getHoldDinnerInfoContainer(1);
        holdDinnerInfoContainer1.x = this.viewBg.width / 2 - holdDinnerInfoContainer1.width / 2;
        holdDinnerInfoContainer1.y = grayBg.y + 10;
        // holdDinnerInfoContainer1.setPosition(this.viewBg.width/2 - holdDinnerInfoContainer1.width/2 , 80);
        this.addChildToContainer(holdDinnerInfoContainer1);
        var holdDinnerInfoContainer2 = this.getHoldDinnerInfoContainer(2);
        // holdDinnerInfoContainer2.setPosition(holdDinnerInfoContainer1.x , 70 + holdDinnerInfoContainer1.height + 10);
        holdDinnerInfoContainer2.x = this.viewBg.width / 2 - holdDinnerInfoContainer2.width / 2;
        holdDinnerInfoContainer2.y = holdDinnerInfoContainer1.y + holdDinnerInfoContainer1.height + 5;
        this.addChildToContainer(holdDinnerInfoContainer2);
    };
    HoldDinnerPopupView.prototype.getHoldDinnerInfoContainer = function (idx) {
        var bgContainer = new BaseDisplayObjectContainer();
        //public_listbg
        bgContainer.width = 522;
        bgContainer.height = 285;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 522;
        bg.height = 285;
        bg.x = bgContainer.width / 2 - bg.width / 2;
        bgContainer.addChild(bg);
        var holdBg = BaseBitmap.create("hold_dinner_bg" + idx);
        holdBg.x = bgContainer.width / 2 - holdBg.width / 2;
        holdBg.y = 60;
        bgContainer.addChild(holdBg);
        var holdTitle = BaseBitmap.create("public_biaoti2");
        var feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);
        var holdTitleText = ComponentManager.getTextField(LanguageManager.getlocal("holdDinnerTitle", [LanguageManager.getlocal("dinnerTitle" + idx), feastCfg.contain.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        holdTitle.width = holdTitleText.width + 60;
        holdTitle.x = bgContainer.width / 2 - holdTitle.width / 2;
        holdTitle.y = 15;
        bgContainer.addChild(holdTitle);
        holdTitleText.x = holdTitle.x + holdTitle.width / 2 - holdTitleText.width / 2;
        holdTitleText.y = holdTitle.y + holdTitle.height / 2 - holdTitleText.height / 2;
        bgContainer.addChild(holdTitleText);
        var gemBg = BaseBitmap.create("public_hb_bg01");
        // gemBg.setPosition(372, 8);
        gemBg.x = holdBg.x + holdBg.width - gemBg.width - 20;
        gemBg.y = holdBg.y + 20;
        bgContainer.addChild(gemBg);
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.setScale(0.8);
        gemIcon.setPosition(gemBg.x + 5, gemBg.y + gemBg.height / 2 - gemIcon.height / 2);
        bgContainer.addChild(gemIcon);
        var gemText = ComponentManager.getTextField(feastCfg.needGem.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // gemText.setPosition(gemIcon.x +gemIcon.width+5, gemBg.y+gemBg.height/2 - gemText.height/2);
        gemText.x = gemIcon.x + gemIcon.width + 15;
        gemText.y = gemBg.y + gemBg.height / 2 - gemText.height / 2;
        bgContainer.addChild(gemText);
        var holdConditionText = ComponentManager.getTextField(LanguageManager.getlocal("holdDinnerCondition"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        holdConditionText.setPosition(holdBg.x + 30, holdBg.y + 50);
        bgContainer.addChild(holdConditionText);
        var holdBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "holdDinner", this.holdDinner, this, [idx]);
        holdBtn.setPosition(370, holdBg.y + holdBg.height - holdBtn.height - 20);
        bgContainer.addChild(holdBtn);
        //材料
        var xPos = holdConditionText.x;
        for (var k in feastCfg.needItem) {
            var icon = GameData.getItemIcon(Config.ItemCfg.getItemCfgById(Number(k)), true);
            icon.setPosition(xPos, holdConditionText.y + holdConditionText.height + 8);
            icon.setScale(75 / icon.width);
            bgContainer.addChild(icon);
            var needNum = feastCfg.needItem[k];
            var numLb = ComponentManager.getTextField(needNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            numLb.setPosition(icon.width - 3 - numLb.width, icon.height - 3 - numLb.height);
            icon.addChild(numLb);
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(k));
            var hasNumText = ComponentManager.getTextField("(" + hasNum + "/" + needNum + ")", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            hasNumText.setPosition(xPos + 75 / 2 - hasNumText.width / 2, icon.y + 78);
            if (needNum > hasNum) {
                hasNumText.textColor = TextFieldConst.COLOR_WARN_RED3;
            }
            else {
                hasNumText.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            }
            bgContainer.addChild(hasNumText);
            xPos += 85;
        }
        //公开宴会
        if (idx == 1) {
            var openBg = BaseBitmap.create("dinner_open_bg");
            openBg.setPosition(210, 210);
            bgContainer.addChild(openBg);
            var openText = ComponentManager.getTextField(LanguageManager.getlocal("openDinner"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            openText.setPosition(openBg.x + 45, openBg.y + openBg.height / 2 - openText.height / 2 - 3);
            bgContainer.addChild(openText);
            var openBtn = ComponentManager.getButton("hold_dinner_box", null, this.openDinnerClick, this, null, 3);
            openBtn.setPosition(openBg.x + 5, openBg.y + openBg.height / 2 - openBtn.height / 2 - 5);
            bgContainer.addChild(openBtn);
            this._nikeIcon = BaseBitmap.create("hold_dinner_check");
            this._nikeIcon.setPosition(openBtn.x, openBtn.y);
            bgContainer.addChild(this._nikeIcon);
            this.openDinnerClick();
        }
        return bgContainer;
    };
    HoldDinnerPopupView.prototype.openDinnerClick = function () {
        this._isOpen = !this._isOpen;
        this._nikeIcon.visible = this._isOpen;
    };
    HoldDinnerPopupView.prototype.holdDinner = function (idx) {
        var feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);
        if (feastCfg.needGem > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        for (var k in feastCfg.needItem) {
            var needNum = feastCfg.needItem[k];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(k));
            if (needNum > hasNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("goodsNotEnough"));
                return;
            }
        }
        this._clickedIdx = idx;
        NetManager.request(NetRequestConst.REQUEST_DINNER_CREATDINNER, { "dtype": idx, "isopen": this._isOpen ? 1 : 0 });
    };
    HoldDinnerPopupView.prototype.requiestCallback = function (p) {
        if (p.data.ret == true) {
            if (this._obj && this._callbackF) {
                this._callbackF.apply(this._obj, [this._clickedIdx]);
            }
            this.hide();
        }
    };
    HoldDinnerPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CREATDINNER), this.requiestCallback, this);
        this._nikeIcon = null;
        this._isOpen = false;
        this._callbackF = null;
        this._obj = null;
        this._clickedIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return HoldDinnerPopupView;
}(PopupView));
__reflect(HoldDinnerPopupView.prototype, "HoldDinnerPopupView");
