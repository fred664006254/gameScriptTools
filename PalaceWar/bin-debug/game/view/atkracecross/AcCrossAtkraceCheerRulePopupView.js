var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//规则
var AcCrossAtkraceCheerRulePopupView = /** @class */ (function (_super) {
    __extends(AcCrossAtkraceCheerRulePopupView, _super);
    function AcCrossAtkraceCheerRulePopupView() {
        var _this = _super.call(this) || this;
        _this._bgHeight = 0;
        return _this;
    }
    Object.defineProperty(AcCrossAtkraceCheerRulePopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossAtkraceCheerRulePopupView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossAtkraceCheerRulePopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerRulePopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerRulePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // 打开该面板时，需要传参数msg
    AcCrossAtkraceCheerRulePopupView.prototype.initView = function () {
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
        var msgTF1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkraceFlagRule1", this.getUiCode())), 20, TextFieldConst.COLOR_BROWN);
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
            var msgStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkraceFlagRule2", this.getUiCode()), [String(rebateCfg.rank[0]), String(rebateCfg.rank[1]), String(rebateCfg.multiplying * this.cfg.flagScoreNum1)]);
            if (rebateCfg.rank[0] == rebateCfg.rank[1] && rebateCfg.rank[1] == 1) {
                msgStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkraceFlagRule3", this.getUiCode()), [String(rebateCfg.multiplying * this.cfg.flagScoreNum1)]);
            }
            var msgTF = ComponentManager.getTextField(msgStr, 20, TextFieldConst.COLOR_BROWN);
            msgTF.width = 460;
            msgTF.x = 0;
            msgTF.y = startY;
            startY += msgTF.height + 7;
            msgNode.addChild(msgTF);
        }
        // let line = BaseBitmap.create("public_line1");
        // line.width = 460;
        // line.x = msgNode.width/2 - line.width/2;
        // line.y = startY + 10;
        // msgNode.addChild(line);
        // let msgTF3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule3"),22,TextFieldConst.COLOR_BROWN);
        // msgTF3.width = 460;
        // msgTF3.lineSpacing = 5;
        // msgTF3.x = msgNode.width/2 - msgTF3.width/2;
        // msgTF3.y = line.y + line.height + 20;
        // msgNode.addChild(msgTF3);
        // let msgTF4:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule4"),20,TextFieldConst.COLOR_BROWN);
        // msgTF4.width = 460;
        // msgTF4.lineSpacing = 7;
        // msgTF4.x = msgNode.width/2 - msgTF4.width/2;
        // msgTF4.y = line.y + line.height + 55;
        // msgNode.addChild(msgTF4);
        // msgNode.height = msgTF4.y + msgTF4.height + 5;
        msgNode.height = startY + 10;
        var touchPanel = BaseBitmap.create("public_alphabg");
        touchPanel.width = msgNode.width;
        touchPanel.height = msgNode.height;
        msgNode.addChild(touchPanel);
    };
    AcCrossAtkraceCheerRulePopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    AcCrossAtkraceCheerRulePopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acCrossserverPowerCheerRuleTitle", this.getUiCode());
    };
    AcCrossAtkraceCheerRulePopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    AcCrossAtkraceCheerRulePopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcCrossAtkraceCheerRulePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossAtkraceCheerRulePopupView;
}(PopupView));
//# sourceMappingURL=AcCrossAtkraceCheerRulePopupView.js.map