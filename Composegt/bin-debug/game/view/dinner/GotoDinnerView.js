/**
 *  前往宴会途中
 * date 2017/11/6
 * @class GotoDinnerView
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
var GotoDinnerView = (function (_super) {
    __extends(GotoDinnerView, _super);
    function GotoDinnerView() {
        var _this = _super.call(this) || this;
        _this._netInfo = null;
        _this._isWaiting = false;
        _this._isDinnerEnd = false;
        return _this;
    }
    GotoDinnerView.prototype.getResourceList = function () {
        return ["goto_dinner_bg", "dinner_jz_01"];
    };
    GotoDinnerView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    GotoDinnerView.prototype.getTitleBgName = function () {
        return null;
    };
    GotoDinnerView.prototype.getTitleStr = function () {
        return null;
    };
    GotoDinnerView.prototype.getCloseBtnName = function () {
        return null;
    };
    GotoDinnerView.prototype.initView = function () {
        ViewController.getInstance().hideView(ViewConst.COMMON.DINNERDETAILVIEW);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback, this);
        var gotoBg = BaseBitmap.create("goto_dinner_bg");
        this.addChildToContainer(gotoBg);
        var nameBg = BaseBitmap.create("dinner_jz_01");
        // nameBg.width = 422;
        // nameBg.height = 85;
        nameBg.x = this.viewBg.width / 2 - nameBg.width / 2;
        nameBg.y = this.viewBg.height / 2 - nameBg.height / 2;
        this.addChildToContainer(nameBg);
        var info = this.param.data.info;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("gotoDinner", [info.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameText.setPosition(nameBg.x + nameBg.width / 2 - nameText.width / 2, nameBg.y + nameBg.height / 2 - nameText.height / 2);
        this.addChildToContainer(nameText);
        this._isWaiting = true;
        NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": Number(info.uid) });
        this.container.alpha = 0;
        egret.Tween.get(this.container).to({ alpha: 1 }, 300).wait(500).call(this.showView, this);
    };
    GotoDinnerView.prototype.showView = function () {
        this._isWaiting = false;
        if (this._isDinnerEnd == true) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
            this.hide();
        }
        else if (this._netInfo) {
            egret.Tween.get(this.container).to({ alpha: 1 }, 300).call(this.realShowView, this);
        }
    };
    GotoDinnerView.prototype.realShowView = function () {
        var info = this.param.data.info;
        ViewController.getInstance().openView(ViewConst.COMMON.DINNERDETAILVIEW, { "info": this._netInfo, "uid": info.uid, "zid": this.param.data.info.zid });
        this.hide();
    };
    GotoDinnerView.prototype.requiestCallback = function (p) {
        var checkChatTime = this.param.data.info.checkChatTime;
        if (p.data.ret == true && (p.data.data.data.dinnerdetail.dtype > 0) && ((!checkChatTime) || p.data.data.data.dinnerdetail.end_time - Config.DinnerCfg.getFeastItemCfg(p.data.data.data.dinnerdetail.dtype).lastTime <= checkChatTime)) {
            this._netInfo = p.data.data.data;
            if (this._isWaiting == false) {
                this.showView();
            }
        }
        else {
            this._isDinnerEnd = true;
            if (this._isWaiting == false) {
                this.showView();
            }
        }
    };
    GotoDinnerView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback, this);
        this._netInfo = null;
        this._isWaiting = false;
        this._isDinnerEnd = false;
        _super.prototype.dispose.call(this);
    };
    return GotoDinnerView;
}(CommonView));
__reflect(GotoDinnerView.prototype, "GotoDinnerView");
