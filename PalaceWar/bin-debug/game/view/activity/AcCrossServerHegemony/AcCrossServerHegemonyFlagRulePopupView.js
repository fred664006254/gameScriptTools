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
var AcCrossServerHegemonyFlagRulePopupView = (function (_super) {
    __extends(AcCrossServerHegemonyFlagRulePopupView, _super);
    function AcCrossServerHegemonyFlagRulePopupView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._bgHeight = 0;
        _this._callback = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagRulePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagRulePopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    // 打开该面板时，需要传参数msg
    AcCrossServerHegemonyFlagRulePopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 520;
        bg.height = 560;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15;
        this.addChildToContainer(bg);
        this._bgHeight = bg.height;
        var msgNode = new BaseDisplayObjectContainer();
        msgNode.width = 460;
        var rect = new egret.Rectangle(0, 0, 460, this._bgHeight - 40);
        var scrollView = ComponentManager.getScrollView(msgNode, rect);
        scrollView.x = this.viewBg.width / 2 - scrollView.width / 2;
        scrollView.y = bg.y + bg.height / 2 - scrollView.height / 2; //msgTF1.y + msgTF1.height + 20;
        this.addChildToContainer(scrollView);
        var messageStr = this.param.data.msg;
        var msgTF1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule1"), 20, TextFieldConst.COLOR_BROWN);
        msgTF1.width = 460;
        msgTF1.lineSpacing = 7;
        msgTF1.x = msgNode.width / 2 - msgTF1.width / 2;
        msgTF1.y = 5;
        msgNode.addChild(msgTF1);
        var scoreRebate = this.cfg.flagScoreRebate;
        var startY = msgTF1.y + msgTF1.height + 20;
        for (var i = scoreRebate.length - 1; i >= 0; i--) {
            var rebateCfg = scoreRebate[i];
            if (rebateCfg.multiplying <= 0) {
                continue;
            }
            var msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule2", [String(rebateCfg.rank[0]), String(rebateCfg.rank[1]), String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
            if (rebateCfg.rank[0] == rebateCfg.rank[1] && rebateCfg.rank[1] == 1) {
                msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule5", [String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
            }
            var msgTF = ComponentManager.getTextField(msgStr, 20, TextFieldConst.COLOR_BROWN);
            msgTF.width = 460;
            msgTF.x = 0;
            msgTF.y = startY;
            startY += msgTF.height + 7;
            msgNode.addChild(msgTF);
        }
        // msgNode.height = startY;
        var line = BaseBitmap.create("public_line1");
        line.width = 460;
        line.x = msgNode.width / 2 - line.width / 2;
        line.y = startY + 10;
        msgNode.addChild(line);
        // let msgTF2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule2"),20,TextFieldConst.COLOR_BROWN_NEW);
        // msgTF2.width = 460;
        // msgTF2.lineSpacing = 7;
        // msgTF2.x = this.viewBg.x + this.viewBg.width/2 - msgTF2.width/2;
        // msgTF2.y = msgTF1.y + msgTF1.height + 35;
        // this.addChildToContainer(msgTF2);
        var msgTF3 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule3"), 22, TextFieldConst.COLOR_BROWN);
        msgTF3.width = 460;
        msgTF3.lineSpacing = 5;
        msgTF3.x = msgNode.width / 2 - msgTF3.width / 2;
        msgTF3.y = line.y + line.height + 20;
        msgNode.addChild(msgTF3);
        var msgTF4 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule4"), 20, TextFieldConst.COLOR_BROWN);
        msgTF4.width = 460;
        msgTF4.lineSpacing = 7;
        msgTF4.x = msgNode.width / 2 - msgTF4.width / 2;
        msgTF4.y = line.y + line.height + 55;
        msgNode.addChild(msgTF4);
        msgNode.height = msgTF4.y + msgTF4.height + 5;
        var touchPanel = BaseBitmap.create("public_alphabg");
        touchPanel.width = msgNode.width;
        touchPanel.height = msgNode.height;
        msgNode.addChild(touchPanel);
    };
    AcCrossServerHegemonyFlagRulePopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    AcCrossServerHegemonyFlagRulePopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    AcCrossServerHegemonyFlagRulePopupView.prototype.hide = function () {
        // if(this.param.data.callback){
        // 	this.param.data.callback.apply();
        // }
        _super.prototype.hide.call(this);
    };
    // protected getParent():egret.DisplayObjectContainer
    // {
    // 	if (this.param.data.inLayer) {
    // 		return this.param.data.inLayer;
    // 	} else {
    // 		return super.getParent();
    // 	}
    // }
    AcCrossServerHegemonyFlagRulePopupView.prototype.dispose = function () {
        this._callback = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagRulePopupView;
}(PopupView));
__reflect(AcCrossServerHegemonyFlagRulePopupView.prototype, "AcCrossServerHegemonyFlagRulePopupView");
//# sourceMappingURL=AcCrossServerHegemonyFlagRulePopupView.js.map