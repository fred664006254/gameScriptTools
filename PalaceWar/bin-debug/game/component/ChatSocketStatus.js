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
var ChatSocketStatus = (function (_super) {
    __extends(ChatSocketStatus, _super);
    function ChatSocketStatus(bgSize) {
        var _this = _super.call(this) || this;
        _this._txt = null;
        _this._bg = null;
        _this._bgSize = null;
        _this._bgSize = bgSize;
        _this.init();
        return _this;
    }
    ChatSocketStatus.prototype.init = function () {
        var bigBg = null;
        if (this._bgSize) {
            bigBg = BaseBitmap.create("public_9_viewmask");
            bigBg.width = this._bgSize.w;
            bigBg.height = this._bgSize.h;
            this.addChild(bigBg);
        }
        var bg = new BaseShape();
        bg.graphics.beginFill(0, 0.8);
        bg.graphics.drawRoundRect(0, 0, GameConfig.stageWidth - 50, 35, 5, 5);
        bg.graphics.endFill();
        this.addChild(bg);
        this._bg = bg;
        if (bigBg) {
            bg.setPosition(bigBg.x + (bigBg.width - bg.width) / 2, bigBg.y + (bigBg.height - bg.height) / 2);
        }
        this._txt = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._txt.textAlign = egret.HorizontalAlign.CENTER;
        this._txt.width = bg.width;
        this.setText("1");
        this.addChild(this._txt);
        this.checkShowReConnectStatus(NetManager.chat.getSocketStatus());
        NetManager.chat.addStatusCallback(this.checkShowReConnectStatus, this);
        this.addTouchTap(function () {
            NetManager.chat.checkAndReConnect();
        }, this);
    };
    ChatSocketStatus.prototype.checkShowReConnectStatus = function (status) {
        switch (status) {
            case SocketStateEnum.STATE_RECONNECTING:
                this.setText(LanguageManager.getlocal("chatWsReconnecting"));
                this.visible = true;
                break;
            case SocketStateEnum.STATE_RECONNECTED:
                // App.CommonUtil.showTip(LanguageManager.getlocal("chatWsReconnectSuccess"));
                this.visible = false;
                break;
            case SocketStateEnum.STATE_NOCONNECT:
                var textFlow = new Array({ text: LanguageManager.getlocal("chatWsReconnecFail"), style: { "underline": true, "textColor": TextFieldConst.COLOR_WARN_YELLOW } });
                this.setText(textFlow);
                this.visible = true;
                break;
            default:
                this.visible = false;
                break;
        }
    };
    ChatSocketStatus.prototype.setText = function (text) {
        if (this._txt) {
            if (typeof (text) == "string") {
                this._txt.text = text;
            }
            else {
                this._txt.textFlow = text;
            }
            this._txt.setPosition(this._bg.x + (this._bg.width - this._txt.width) / 2, this._bg.y + (this._bg.height - this._txt.height) / 2);
        }
    };
    ChatSocketStatus.prototype.dispose = function () {
        NetManager.chat.removeStatusCallback(this.checkShowReConnectStatus, this);
        this._txt = null;
        this._bg = null;
        this._bgSize = null;
        _super.prototype.dispose.call(this);
    };
    return ChatSocketStatus;
}(BaseDisplayObjectContainer));
__reflect(ChatSocketStatus.prototype, "ChatSocketStatus");
//# sourceMappingURL=ChatSocketStatus.js.map