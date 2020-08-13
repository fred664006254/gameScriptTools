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
        return _this;
    }
    PrisonPopView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        var public_tc_bg01 = BaseBitmap.create("public_tc_bg01");
        this.addChildToContainer(public_tc_bg01);
        public_tc_bg01.width = 537;
        public_tc_bg01.height = 387;
        // public_tc_bg01.x =42;
        public_tc_bg01.x = this.viewBg.width / 2 - public_tc_bg01.width / 2;
        public_tc_bg01.y = 5;
        this.touchEnabled = false;
        var bg = BaseBitmap.create("prisonview_small_bg");
        bg.x = 47;
        bg.y = 10;
        this.addChildToContainer(bg);
        //人物大头像  story_npc_
        var currNum = Api.prisonVoApi.getCurrPrisonId() + 20;
        var prisonHead = BaseLoadBitmap.create("story_npc_" + currNum);
        prisonHead.x = 140;
        prisonHead.y = 15;
        prisonHead.scaleX = 0.8;
        prisonHead.scaleY = 0.8;
        this.addChildToContainer(prisonHead);
        var bg2 = BaseBitmap.create("prisonview_itembg");
        bg2.x = bg.x;
        bg2.y = 10;
        this.addChildToContainer(bg2);
        var nameBottom = BaseBitmap.create("public_tc_hd01");
        nameBottom.width = 525;
        nameBottom.height = 76;
        nameBottom.x = 50;
        nameBottom.y = 315;
        this.addChildToContainer(nameBottom);
        //人物描述
        this.prisonerDescribe = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription" + Api.prisonVoApi.getCurrPrisonId());
        this.prisonerDescribe.setPosition(55, 330);
        this.prisonerDescribe.lineSpacing = 8;
        this.prisonerDescribe.width = bg.width - 20;
        this.addChildToContainer(this.prisonerDescribe);
        this.y = -200;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1, y: 0 }, 800).call(this.remove, this);
    };
    PrisonPopView.prototype.isShowOpenAni = function () {
        return false;
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
        this.touchEnabled = true;
        this.addTouchTap(this.hide, this);
    };
    PrisonPopView.prototype.getShowHeight = function () {
        return 500;
    };
    PrisonPopView.prototype.getTitleStr = function () {
        return Api.prisonVoApi.getPrisonTitleStr();
    };
    PrisonPopView.prototype.dispose = function () {
        this.prisonerDescribe = null;
        this.currContainer = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return PrisonPopView;
}(PopupView));
__reflect(PrisonPopView.prototype, "PrisonPopView");
