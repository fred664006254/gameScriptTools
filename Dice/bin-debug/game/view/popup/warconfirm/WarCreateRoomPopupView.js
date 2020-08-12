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
 * 创建房间
 * author qianjun
 *
 */
var WarCreateRoomPopupView = (function (_super) {
    __extends(WarCreateRoomPopupView, _super);
    function WarCreateRoomPopupView() {
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
    WarCreateRoomPopupView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.BATTLE_FINDFRIEND
        ];
    };
    WarCreateRoomPopupView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.BATTLE_FINDFRIEND:
                view.findResult(evt);
                break;
        }
    };
    // 打开该面板时，需要传参数msg
    WarCreateRoomPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
    };
    WarCreateRoomPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        if (this._iswait) {
            NetManager.request(NetConst.BATTLE_CANCELFINDFRIEND, {
                findType: param.data.type,
            });
        }
        this.hide();
    };
    WarCreateRoomPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    WarCreateRoomPopupView.prototype.getTitleStr = function () {
        var param = this.param.data;
        return LangMger.getlocal("warwaitng2");
    };
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    WarCreateRoomPopupView.prototype.closeHandler = function () {
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        if (this._iswait) {
            NetManager.request(NetConst.BATTLE_CANCELFINDFRIEND, {
                findType: param.data.type,
            });
        }
        _super.prototype.closeHandler.call(this);
    };
    // protected getShowWidth():number{
    // 	return 552;
    // }
    WarCreateRoomPopupView.prototype.getShowHeight = function () {
        return 365;
    };
    WarCreateRoomPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WarCreateRoomPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "joinwarinputbg", "joinwarcopy"
        ]);
    };
    WarCreateRoomPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    WarCreateRoomPopupView.prototype.resetBgSize = function () {
        var view = this;
        view._end = false;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
        // let titlebg = BaseBitmap.create(`public_poptittle${type == 1 ? `red` : `purple`}`);
        // view.addChildAt(titlebg, view.getChildIndex(view.titleTF));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.viewBg);
        // view.closeBtn.x = PlatMgr.hasSpcialCloseBtn()? 0 : (view.viewBg.x + view.viewBg.width - view.closeBtn.width-17);
        // view.closeBtn.y = this.viewBg.y+10;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.titleTF, titlebg);
        // if(view._line){
        //     view._line.visible = false;
        // }
        var inputbg = BaseBitmap.create("joinwarinputbg");
        // let inputTextfield = ComponentMgr.getInputTextField(,);
        inputbg.width = 420;
        inputbg.height = 50;
        view.addChildToContainer(inputbg);
        inputbg.x = (view.viewBg.width - inputbg.width) / 2;
        inputbg.y = 15;
        view._inputbg = inputbg;
        var roomTxt = ComponentMgr.getTextField("1", TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.white);
        view.addChildToContainer(roomTxt);
        roomTxt.bold = true;
        roomTxt.stroke = 1.5;
        roomTxt.strokeColor = ColorEnums.black;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roomTxt, inputbg);
        view._roomTxt = roomTxt;
        roomTxt.visible = false;
        var copyBtn = ComponentMgr.getButton("joinwarcopy", "", function () {
            //拷贝
            if (PlatMgr.checkIsUseSDK()) {
                RSDK.copyToClipboard(roomTxt.text);
            }
            else {
                var input = document.createElement("input");
                input.value = roomTxt.text;
                input.readOnly = true;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                    document.execCommand('Copy');
                document.body.removeChild(input);
                App.CommonUtil.showTip(LangMger.getlocal("invitefriendTip9"));
            }
        }, view);
        view.addChildToContainer(copyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, copyBtn, inputbg), [0, 0];
        //ios原生环境隐藏复制按钮
        if (App.DeviceUtil.isRuntime2() || App.DeviceUtil.isWXgame()) {
            copyBtn.visible = false;
        }
        var reloadImg = BaseBitmap.create("reloading");
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2;
        reloadImg.y = 40;
        egret.Tween.get(reloadImg, { loop: true }).to({ rotation: -360 }, 1500);
        view._showLoading = reloadImg;
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("warcreateroomtip1"), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.fight_color_1);
        view.addChildToContainer(tipTxt);
        tipTxt.bold = true;
        tipTxt.stroke = 1.5;
        tipTxt.strokeColor = ColorEnums.fight_strokeColor_1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, inputbg, [0, inputbg.height + 20]);
        view._tipTxt = tipTxt;
        //取消
        var cancelbtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal("canelStr"), view.clickCancelHandler, view, null, null, 28);
        view.addChildToContainer(cancelbtn);
        // cancelbtn.setTextPos(null,25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cancelbtn, tipTxt, [0, tipTxt.height + 75]);
        // egret.Tween.get(view).wait(1000).call(()=>{
        // 	egret.Tween.removeTweens(view);
        // 	view.find();
        // },view);  
        view.find();
    };
    Object.defineProperty(WarCreateRoomPopupView.prototype, "isWave", {
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
    WarCreateRoomPopupView.prototype.find = function () {
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
            isCreate: 1,
            passCode: 0
        });
        this._findNum++;
    };
    // protected getTitleBgName():string{
    //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
    // }
    WarCreateRoomPopupView.prototype.freshView = function (roomid) {
        var view = this;
        view._showLoading.visible = false;
        view._showLoading.y = 140;
        view._roomTxt.visible = true;
        view._roomTxt.text = roomid.toString();
        view._tipTxt.text = LangMger.getlocal("warcreateroomtip2");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._roomTxt, view._inputbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipTxt, view._inputbg, [0, view._inputbg.height + 20]);
        view._showLoading.visible = true;
    };
    WarCreateRoomPopupView.prototype.findResult = function (e) {
        var isSuccess = false;
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        var rdata = e.data;
        if (rdata.ret) {
            if (this._iswait) {
                var result = rdata.data.data.matchFlag;
                if (result) {
                    isSuccess = true;
                    if (result == 1) {
                        if (rdata.data.data.randSeed) {
                            BattleStatus.randSeed = rdata.data.data.randSeed;
                        }
                        Api.BattleVoApi.startBattle(type);
                    }
                    else if (result == 2) {
                        App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip8"));
                    }
                    else {
                        App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip7"));
                    }
                    if (param.findcallback) {
                        param.findcallback.apply(param.handler, [this]);
                    }
                    this.hide();
                }
            }
            else {
                var roomid = rdata.data.data.showRoomId;
                if (roomid > 0) {
                    this.freshView(rdata.data.data.showRoomId);
                    this._iswait = true;
                }
            }
        }
        if (!isSuccess) {
            var t = egret.getTimer() - this._findTime;
            if (t >= 980) {
                this.find();
            }
            else {
                this._findTimeCount = egret.setTimeout(this.find, this, 1000 - t);
            }
        }
    };
    WarCreateRoomPopupView.prototype.dispose = function () {
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
    return WarCreateRoomPopupView;
}(PopupView));
__reflect(WarCreateRoomPopupView.prototype, "WarCreateRoomPopupView");
//# sourceMappingURL=WarCreateRoomPopupView.js.map