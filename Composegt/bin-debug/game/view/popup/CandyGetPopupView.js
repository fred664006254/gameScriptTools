/**
 * 领取糖果
 * author dukunyang
 * date 2018/1/08
 * @class CandyGetPopupView
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
var CandyGetPopupView = (function (_super) {
    __extends(CandyGetPopupView, _super);
    function CandyGetPopupView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._bgHeight = 0;
        _this._candyList = ["100", "100", "100", "150", "150", "150", "200"];
        return _this;
    }
    // 打开该面板时，需要传参数msg
    CandyGetPopupView.prototype.initView = function () {
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("candyGetTitleTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        tipTF.textColor = TextFieldConst.COLOR_BROWN;
        this.addChildToContainer(tipTF);
        tipTF.x = 30;
        tipTF.y = 15;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 300;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 47;
        this.addChildToContainer(bg);
        this._bgHeight = bg.height;
        var line = BaseBitmap.create("candyline");
        line.width = 450;
        line.x = 60;
        line.y = 130;
        this.addChildToContainer(line);
        for (var index = 0; index < 7; index++) {
            var numBg = BaseBitmap.create("candynumbg");
            numBg.x = (numBg.width + 3) * index + 33;
            numBg.y = bg.y + 20;
            this.addChildToContainer(numBg);
            var candyIcon = BaseBitmap.create("candyicon2");
            candyIcon.x = numBg.x + 5;
            candyIcon.y = numBg.y + 3;
            this.addChildToContainer(candyIcon);
            var numTF = ComponentManager.getTextField(this._candyList[index], 18);
            this.addChildToContainer(numTF);
            numTF.x = numBg.x + 31;
            numTF.y = numBg.y + 7;
            var boxBg = BaseBitmap.create("candybg");
            boxBg.x = numBg.x + 12;
            boxBg.y = numBg.y + 45;
            this.addChildToContainer(boxBg);
            var dayTF = ComponentManager.getTextField((index + 1).toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            dayTF.textColor = TextFieldConst.COLOR_BLACK;
            this.addChildToContainer(dayTF);
            dayTF.x = numBg.x + 31;
            dayTF.y = numBg.y + 100;
        }
        this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.clickConHandler, this);
        // this._getBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._getBtn.x = this.getShowWidth() / 2 - this._getBtn.width / 2;
        this._getBtn.y = bg.y + bg.height - 120;
        this.addChildToContainer(this._getBtn);
        var getData = Api.otherInfoVoApi.getCandyGetInfo();
        // let day = getData.get;
        if (getData.today == App.DateUtil.getWeeTs(GameData.serverTime)) {
            this._getBtn.setEnable(false);
            this._getBtn.setText("candyGetAlready");
        }
        var msgTF = ComponentManager.getTextField(LanguageManager.getlocal("candyGetTitleMsg"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.textColor = TextFieldConst.COLOR_WARN_RED;
        this.addChildToContainer(msgTF);
        msgTF.x = bg.x + bg.width / 2 - msgTF.width / 2;
        msgTF.y = this._getBtn.y + this._getBtn.height + 20;
        this.setState();
    };
    CandyGetPopupView.prototype.setState = function () {
        if (this._stateContanier) {
            this.removeChildFromContainer(this._stateContanier);
            this._stateContanier = null;
        }
        this._stateContanier = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._stateContanier);
        var getData = Api.otherInfoVoApi.getCandyGetInfo();
        var day = getData.get;
        for (var index = 0; index < 7; index++) {
            var img = "candybox";
            if (index < day) {
                img = "candycheck";
            }
            else {
            }
            var candyIcon = BaseBitmap.create(img);
            candyIcon.x = (72) * index + 46;
            candyIcon.y = 117;
            this._stateContanier.addChild(candyIcon);
        }
        // let getData = Api.otherInfoVoApi.getCandyGetInfo();
        // let day = getData.get;
        if (getData.today == App.DateUtil.getWeeTs(GameData.serverTime)) {
            this._getBtn.setEnable(false);
            this._getBtn.setText("candyGetAlready");
        }
    };
    //请求回调
    CandyGetPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD) {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip"));
            this.setState();
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    CandyGetPopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    CandyGetPopupView.prototype.clickConHandler = function (data) {
        var getData = Api.otherInfoVoApi.getCandyGetInfo();
        var day = getData.get;
        if (day >= 7) {
            return;
        }
        var num = this._candyList[day];
        PlatformManager.sendCandy(num, this.sendCallback, this);
        // this.request(NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD, null);
    };
    CandyGetPopupView.prototype.sendCallback = function (code) {
        if (String(code) == "0") {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD, null);
        }
        else if (String(code) == "-2") {
            //取消
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip1"));
        }
        else {
            //失败
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
        }
    };
    CandyGetPopupView.prototype.clickCancelHandler = function (data) {
        // if(this.param.data.callback){
        // 	this.param.data.callback.apply(this.param.data.handler,null);
        // }
        this.hide();
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "sysConfirm";
    // }
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    CandyGetPopupView.prototype.getTitleStr = function () {
        return "candyGetTitle";
    };
    // protected getCloseBtnName():string
    // {
    // 	return  null;
    // }
    CandyGetPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    CandyGetPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "candybg", "candybox", "candycheck",
            "candyicon2", "candyline", "candynumbg",
        ]);
    };
    CandyGetPopupView.prototype.dispose = function () {
        this._bgHeight = 0;
        this._stateContanier = null;
        _super.prototype.dispose.call(this);
    };
    return CandyGetPopupView;
}(PopupView));
__reflect(CandyGetPopupView.prototype, "CandyGetPopupView");
