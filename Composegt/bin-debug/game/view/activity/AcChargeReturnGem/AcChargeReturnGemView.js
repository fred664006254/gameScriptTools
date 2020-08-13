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
var AcChargeReturnGemView = (function (_super) {
    __extends(AcChargeReturnGemView, _super);
    function AcChargeReturnGemView() {
        var _this = _super.call(this) || this;
        _this.numImg = null;
        _this.timeText = null;
        _this.desc1 = null;
        _this.desc2 = null;
        _this.goButton = null;
        _this.aid = null;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    Object.defineProperty(AcChargeReturnGemView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChargeReturnGemView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    AcChargeReturnGemView.prototype.initView = function () {
        // let vo: AcChargeReturnGemVo = <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        // 上面的背景
        this.numImg = BaseBitmap.create("acchargereturngemview_dis_" + this.code);
        this.numImg.x = this.viewBg.x + 107;
        this.numImg.y = this.viewBg.y - 40 + 228;
        this.addChildToContainer(this.numImg);
        var stTxt = App.DateUtil.getFormatBySecond(this.vo.st, 9);
        var etTxt = App.DateUtil.getFormatBySecond(this.vo.et, 9);
        // 时间
        this.timeText = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewTime", [stTxt, etTxt]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.timeText.x = this.viewBg.width / 2 - this.timeText.width / 2;
        this.timeText.y = this.viewBg.y - 40 + 404;
        this.addChildToContainer(this.timeText);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // 描述1
        this.desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewDesc1", [String(Math.floor(cfg.rebateRate * 100))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x5f0707);
        this.desc1.x = this.viewBg.width / 2 - this.desc1.width / 2;
        this.desc1.y = this.viewBg.y - 40 + 603;
        this.addChildToContainer(this.desc1);
        // 描述2
        this.desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewDesc2"), 16, 0xd0491e);
        this.desc2.x = this.viewBg.width / 2 - this.desc2.width / 2;
        this.desc2.y = this.viewBg.y - 40 + 710;
        this.addChildToContainer(this.desc2);
        // 前往充值
        this.goButton = ComponentManager.getButton("firstchargebutton02", "acChargeReturnGemViewBtn", this.confirmHandler, this);
        this.goButton.x = this.viewBg.width / 2 - this.goButton.width / 2;
        this.goButton.y = this.viewBg.y - 40 + 760;
        this.addChildToContainer(this.goButton);
        if (this.vo.isShowRedDot) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_READACTIVE, { activename: this.aid + "-" + this.code });
        }
    };
    AcChargeReturnGemView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("acchargereturngemview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 885;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    AcChargeReturnGemView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    AcChargeReturnGemView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width - 50, this.viewBg.y + 50);
    };
    AcChargeReturnGemView.prototype.getBgName = function () {
        return "acchargereturngem_bg";
    };
    AcChargeReturnGemView.prototype.getTitleStr = function () {
        return null;
    };
    AcChargeReturnGemView.prototype.confirmHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        this.hide();
    };
    AcChargeReturnGemView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "acchargereturngem_bg","acchargereturngem_title","sharepopupview_closebtn_down","sharepopupview_closebtn","acchargereturngem_bg2"
            "firstchargebutton02"
        ]);
    };
    AcChargeReturnGemView.prototype.dispose = function () {
        this.numImg = null;
        this.timeText = null;
        this.desc1 = null;
        this.desc2 = null;
        this.goButton = null;
        _super.prototype.dispose.call(this);
    };
    return AcChargeReturnGemView;
}(PopupView));
__reflect(AcChargeReturnGemView.prototype, "AcChargeReturnGemView");
