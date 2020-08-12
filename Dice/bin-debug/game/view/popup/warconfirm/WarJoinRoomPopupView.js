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
 * 加入房间
 * author qianjun
 *
 */
var WarJoinRoomPopupView = (function (_super) {
    __extends(WarJoinRoomPopupView, _super);
    function WarJoinRoomPopupView() {
        var _this = _super.call(this) || this;
        _this._end = false;
        _this._roomTxt = null;
        _this._tipTxt = null;
        _this._showLoading = null;
        _this._inputbg = null;
        _this._iswait = false;
        _this._findTime = 0;
        _this._findTimeCount = -1;
        _this._findNum = 1;
        return _this;
    }
    WarJoinRoomPopupView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.BATTLE_FINDFRIEND
        ];
    };
    WarJoinRoomPopupView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.BATTLE_FINDFRIEND:
                view.findResult(evt);
                break;
        }
    };
    // 打开该面板时，需要传参数msg
    WarJoinRoomPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
    };
    WarJoinRoomPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    WarJoinRoomPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    WarJoinRoomPopupView.prototype.getTitleStr = function () {
        var param = this.param.data;
        return LangMger.getlocal("warwaitng2");
    };
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    WarJoinRoomPopupView.prototype.closeHandler = function () {
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    // protected getShowWidth():number{
    // 	return 552;
    // }
    WarJoinRoomPopupView.prototype.getShowHeight = function () {
        return 350;
    };
    WarJoinRoomPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WarJoinRoomPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "joinwarinputbg", "joinwarpaste"
        ]);
    };
    WarJoinRoomPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    WarJoinRoomPopupView.prototype.resetBgSize = function () {
        var _this = this;
        var view = this;
        view._end = false;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
        var inputbg = BaseBitmap.create("joinwarinputbg");
        // let inputTextfield = ComponentMgr.getInputTextField(,);
        inputbg.width = 420;
        inputbg.height = 50;
        view.addChildToContainer(inputbg);
        inputbg.x = (view.viewBg.width - inputbg.width) / 2;
        inputbg.y = 15;
        view._inputbg = inputbg;
        var inputTxt = ComponentMgr.getInputTextField(ColorEnums.green, TextFieldConst.SIZE_CONTENT_SMALL_POPUP, inputbg.width, inputbg.height, "", LangMger.getlocal("warcreateroomtip4"), ColorEnums.black);
        view.addChildToContainer(inputTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, inputTxt, inputbg);
        var roomTxt = inputTxt.getChildByName("textField");
        view._roomTxt = roomTxt;
        roomTxt.textColor = ColorEnums.white;
        roomTxt.bold = true;
        roomTxt.stroke = 1.5;
        roomTxt.strokeColor = ColorEnums.black;
        roomTxt.inputType = egret.TextFieldInputType.TEL;
        roomTxt.restrict = "/0-9/";
        // let pasteBtn = ComponentMgr.getButton(`joinwarpaste`, ``, ()=>{
        // 	//拷贝
        // 	let pasteEvent = new ClipboardEvent('paste', {dataType: 'text/plain', data: 'My string' } );
        // 	document.dispatchEvent(pasteEvent);
        // 	let input = document.createElement("input");
        // 	input.value = roomTxt.text;
        // 	document.body.appendChild(input);
        // 	input.select();
        // 	input.setSelectionRange(0, input.value.length),
        // 	document.execCommand('Paste');
        // 	document.body.removeChild(input);
        // 	App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip3"));
        // }, view);
        // view.addChildToContainer(pasteBtn);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, pasteBtn, inputbg), [0,0];
        var reloadImg = BaseBitmap.create("reloading");
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2;
        reloadImg.y = 120;
        egret.Tween.get(reloadImg, { loop: true }).to({ rotation: -360 }, 1500);
        view._showLoading = reloadImg;
        reloadImg.visible = false;
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("warcreateroomtip5"), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.warnred);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, inputbg, [0, inputbg.height + 20]);
        view._tipTxt = tipTxt;
        tipTxt.visible = false;
        //确认
        var confirmBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("confirmBtn"), function () {
            if (_this._roomTxt.text == "" || _this._roomTxt.text == LangMger.getlocal("warcreateroomtip4")) {
                App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip4"));
                return;
            }
            // if(typeof Number(roomTxt.text) != `number`){
            // 	App.CommonUtil.showTip(LangMger.getlocal(`warcreateroomtip6`));
            // 	return;
            // }
            tipTxt.visible = false;
            reloadImg.visible = true;
            view.find();
        }, view, null, null, 28);
        view.addChildToContainer(confirmBtn);
        // confirmBtn.setTextPos(null,25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, confirmBtn, tipTxt, [0, tipTxt.height + 60]);
    };
    WarJoinRoomPopupView.prototype.find = function () {
        if (this._end) {
            if (this._findTimeCount != -1) {
                egret.clearTimeout(this._findTimeCount);
                this._findTimeCount = -1;
            }
            return;
        }
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        if (this._findTimeCount != -1) {
            egret.clearTimeout(this._findTimeCount);
            this._findTimeCount = -1;
        }
        this._findTime = egret.getTimer();
        NetManager.request(NetConst.BATTLE_FINDFRIEND, {
            findType: type,
            findNum: this._findNum,
            isCreate: 0,
            passCode: Number(this._roomTxt.text)
        });
        this._findNum++;
    };
    Object.defineProperty(WarJoinRoomPopupView.prototype, "isWave", {
        // protected getTitleBgName():string{
        //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
        // }
        get: function () {
            var view = this;
            var param = view.param.data;
            //type 1对战 2协同
            var type = param.type;
            return type == 2;
        },
        enumerable: true,
        configurable: true
    });
    WarJoinRoomPopupView.prototype.findResult = function (e) {
        var isSuccess = false;
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        var rdata = e.data;
        if (rdata.ret) {
            var result = rdata.data.data.matchFlag;
            if (result) {
                isSuccess = true;
                if (result == 1) {
                    if (rdata.data.data.randSeed) {
                        BattleStatus.randSeed = rdata.data.data.randSeed;
                    }
                    Api.BattleVoApi.startBattle(type);
                    if (param.findcallback) {
                        param.findcallback.apply(param.handler, [this]);
                    }
                    this.hide();
                }
                else if (result == 2) {
                    App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip8"));
                }
            }
            if (rdata.data.data.noThisRoom) {
                isSuccess = true;
                App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip6"));
                this._tipTxt.visible = true;
            }
        }
        if (!isSuccess) {
            this._showLoading.visible = true;
            var t = egret.getTimer() - this._findTime;
            if (t >= 980) {
                this.find();
            }
            else {
                this._findTimeCount = egret.setTimeout(this.find, this, 1000 - t);
            }
        }
        else {
            this._showLoading.visible = false;
        }
    };
    WarJoinRoomPopupView.prototype.dispose = function () {
        var view = this;
        view._findTime = 0;
        if (view._findTimeCount != -1) {
            egret.clearTimeout(view._findTimeCount);
            view._findTimeCount = -1;
        }
        view._findNum = 1;
        view._roomTxt = null;
        view._tipTxt = null;
        view._showLoading = null;
        view._iswait = false;
        _super.prototype.dispose.call(this);
    };
    return WarJoinRoomPopupView;
}(PopupView));
__reflect(WarJoinRoomPopupView.prototype, "WarJoinRoomPopupView");
//# sourceMappingURL=WarJoinRoomPopupView.js.map