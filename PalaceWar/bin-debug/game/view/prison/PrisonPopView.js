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
var PrisonPopView = (function (_super) {
    __extends(PrisonPopView, _super);
    function PrisonPopView() {
        var _this = _super.call(this) || this;
        //囚犯主图
        _this.prisonerDescribe = null;
        _this.currContainer = null;
        _this._bg = null;
        _this._mainTaskHandKey = null;
        return _this;
    }
    PrisonPopView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        this.touchEnabled = false;
        var bg = BaseBitmap.create("prisonview_small_bg");
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = -2;
        this.addChildToContainer(bg);
        this._bg = bg;
        // this.currContainer.addChild(bg);
        //人物大头像  story_npc_
        var currNum = Api.prisonVoApi.getCurrPrisonId() + 20;
        var prisonHead = BaseLoadBitmap.create("story_npc_" + currNum);
        prisonHead.x = this.viewBg.width / 2 - prisonHead.width / 2 - 150;
        prisonHead.y += 15;
        prisonHead.scaleX = 0.8;
        prisonHead.scaleY = 0.8;
        this.addChildToContainer(prisonHead);
        // this.currContainer.addChild(prisonHead);
        var bg2 = BaseBitmap.create("prisonview_itembg");
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = -2;
        this.addChildToContainer(bg2);
        //人物描述
        this.prisonerDescribe = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription" + Api.prisonVoApi.getCurrPrisonId());
        this.prisonerDescribe.width = bg.width - 30;
        this.prisonerDescribe.setPosition(this.viewBg.width / 2 - this.prisonerDescribe.width / 2, bg2.y + bg2.height - 62);
        this.prisonerDescribe.lineSpacing = 4;
        this.addChildToContainer(this.prisonerDescribe);
        // this.currContainer.addChild(this.prisonerDescribe);
        this.y = -200;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1, y: 0 }, 800).call(this.remove, this);
    };
    PrisonPopView.prototype.hide = function () {
        if (this.touchEnabled == true) {
            _super.prototype.hide.call(this);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_BLACKPANEL);
        }
    };
    PrisonPopView.prototype.isShowMask = function () {
        return false;
    };
    PrisonPopView.prototype.remove = function () {
        //  this.drawblackMask();
        this.touchEnabled = true;
        this.addTouchTap(this.hide, this);
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, this._bg.x + this._bg.width / 2 - 10, this._bg.y + this._bg.height / 2 + 10, [this], 116, true, function () {
            return true;
        }, this);
    };
    PrisonPopView.prototype.getShowHeight = function () {
        return 510 + 8;
    };
    PrisonPopView.prototype.getTitleStr = function () {
        return Api.prisonVoApi.getPrisonTitleStr();
    };
    //是否展示弹窗动效
    PrisonPopView.prototype.isShowOpenAni = function () {
        return false;
    };
    PrisonPopView.prototype.dispose = function () {
        this.prisonerDescribe = null;
        this.currContainer = null;
        this._bg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return PrisonPopView;
}(PopupView));
__reflect(PrisonPopView.prototype, "PrisonPopView");
//# sourceMappingURL=PrisonPopView.js.map