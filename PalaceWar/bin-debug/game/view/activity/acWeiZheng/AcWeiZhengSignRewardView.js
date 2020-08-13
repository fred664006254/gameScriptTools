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
var AcWeiZhengSignRewardView = (function (_super) {
    __extends(AcWeiZhengSignRewardView, _super);
    function AcWeiZhengSignRewardView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    Object.defineProperty(AcWeiZhengSignRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengSignRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengSignRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengSignRewardView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengSignRewardView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengSignRewardView.prototype.getShowHeight = function () {
        return 255;
    };
    AcWeiZhengSignRewardView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcWeiZhengSignRewardView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            //"dailybosslastattackpopupview",
            "weizhengrewardtitle-" + code
        ]);
    };
    AcWeiZhengSignRewardView.prototype.initView = function () {
        var _this = this;
        var view = this;
        var code = view.getUiCode();
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        //type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
        var height = 255;
        this.viewBg.height = height;
        this.viewBg.y = (GameConfig.stageHeigth - height) / 2;
        var title = BaseBitmap.create("weizhengrewardtitle-" + code);
        title.setPosition((this.viewBg.width - title.width) / 2, (-title.height) / 2);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengTip7-" + code, [view.vo.getBqCost().toString()]), 24, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 10;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 15);
        this.addChildToContainer(descTxt);
        var haveTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengTip8-" + code, [String(Api.playerVoApi.getPlayerGem() < view.vo.getBqCost() ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN), Api.playerVoApi.getPlayerGemStr()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        haveTxt.setPosition((this.viewBg.width - haveTxt.width) / 2, descTxt.y + descTxt.height + 25);
        this.addChildToContainer(haveTxt);
        var cancelbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "cancelBtn", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelbtn, view, [145, haveTxt.y + haveTxt.textHeight + 25]);
        this.addChildToContainer(cancelbtn);
        var confirmbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "confirmBtn", function () {
            if (Api.playerVoApi.getPlayerGem() < view.vo.getBqCost()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                return;
            }
            if (_this._obj && _this._callbackF) {
                _this._callbackF.apply(_this._obj);
                view.hide();
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, confirmbtn, view, [145, cancelbtn.y]);
        this.addChildToContainer(confirmbtn);
    };
    AcWeiZhengSignRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcWeiZhengSignRewardView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcWeiZhengSignRewardView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcWeiZhengSignRewardView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcWeiZhengSignRewardView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengSignRewardView;
}(PopupView));
__reflect(AcWeiZhengSignRewardView.prototype, "AcWeiZhengSignRewardView");
//# sourceMappingURL=AcWeiZhengSignRewardView.js.map