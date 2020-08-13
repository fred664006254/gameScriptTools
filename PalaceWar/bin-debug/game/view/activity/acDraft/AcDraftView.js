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
 * author:qianjun
 * desc:港台美女冲榜活动
*/
var AcDraftView = (function (_super) {
    __extends(AcDraftView, _super);
    function AcDraftView() {
        var _this = _super.call(this) || this;
        _this._enterBtn = null;
        return _this;
    }
    Object.defineProperty(AcDraftView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcDraftView.AID, AcDraftView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDraftView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcDraftView.AID, AcDraftView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcDraftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "draftenterbg",
            "crossserverinti_enterin-1", "crossserverinti_enterin-1_down",
            "public_9_wordbg2",
        ]);
    };
    AcDraftView.prototype.getBgName = function () {
        return "draftenterbg";
    };
    // protected getCloseBtnName():string
    // {
    // 	return ButtonConst.POPUP_CLOSE_BTN_1;
    // }
    AcDraftView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            // 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
        }
    };
    AcDraftView.prototype.initView = function () {
        var view = this;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.viewBg, view.titleBg, [0, this.titleBg.height]);
        // AcDraftView.AID = view.aid;
        // AcDraftView.CODE = view.code; 
        //底部
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 179;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        //bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        view.addChild(bottomBg);
        view._enterBtn = ComponentManager.getButton("crossserverinti_enterin-1", '', view.enterInHandler, this);
        //进入按钮
        //view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 5);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._enterBtn, bottomBg, [0, bottomBg.height + 10]);
        view.addChild(this._enterBtn);
        //活动时间
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", ['']), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 10;
        timeDesc.y = bottomBg.y + 20;
        view.addChild(timeDesc);
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal("draftRule-1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc.width = GameConfig.stageWidth - 100;
        ruleDesc.lineSpacing = 6;
        ruleDesc.x = timeDesc.x;
        ruleDesc.y = timeDesc.y + timeDesc.textHeight + 5;
        view.addChild(ruleDesc);
    };
    AcDraftView.prototype.getTitleStr = function () {
        return 'AcDraftViewTitle';
    };
    AcDraftView.prototype.enterInHandler = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.COMMON.ACDRAFTVOTEVIEW);
        // else{
        // 	App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
        // }
    };
    AcDraftView.prototype.dispose = function () {
        var view = this;
        view._enterBtn.removeTouchTap();
        view._enterBtn = null;
        _super.prototype.dispose.call(this);
    };
    AcDraftView.AID = null;
    AcDraftView.CODE = null;
    return AcDraftView;
}(CommonView));
__reflect(AcDraftView.prototype, "AcDraftView");
//# sourceMappingURL=AcDraftView.js.map