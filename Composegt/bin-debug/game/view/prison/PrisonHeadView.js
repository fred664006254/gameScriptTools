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
var PrisonHeadView = (function (_super) {
    __extends(PrisonHeadView, _super);
    function PrisonHeadView() {
        var _this = _super.call(this) || this;
        //囚犯头像
        _this.prisonHeadImage = null;
        _this.redCrossImage = null;
        _this.id = 0;
        _this.headIcon = null;
        return _this;
    }
    PrisonHeadView.prototype.initView = function () {
    };
    PrisonHeadView.prototype.showHead = function (index, prisonNum) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (prisonNum === void 0) { prisonNum = 0; }
        //头像背景
        var headend = BaseLoadBitmap.create("mainui_bottombtnbg");
        headend.anchorOffsetX = headend.width / 2;
        headend.anchorOffsetY = headend.height / 2;
        headend.x = headend.x - 35;
        headend.y = headend.y - 30;
        this.headIcon = headend;
        this.addChild(headend);
        //人物头像
        var iconNum = index + 21;
        this.prisonHeadImage = BaseLoadBitmap.create("prison_icon" + iconNum);
        this.prisonHeadImage.anchorOffsetX = 60;
        this.prisonHeadImage.anchorOffsetY = 60;
        this.prisonHeadImage.scaleX = 0.6;
        this.prisonHeadImage.scaleY = 0.6;
        this.prisonHeadImage.x = 3;
        this.prisonHeadImage.y += 16; //10
        var num = 0;
        num = Api.prisonVoApi.getCurrPrisonId() + 20;
        if (iconNum == num) {
            var moveCall_1 = function () {
                egret.Tween.get(_this.prisonHeadImage).to({ scaleX: 0.7, scaleY: 0.7, }, 1000).to({ scaleX: 0.6, scaleY: 0.6, }, 1000).call(moveCall_1, _this);
            };
            moveCall_1();
        }
        this.addChild(this.prisonHeadImage);
        this.prisonHeadImage.name = iconNum + "";
        this.prisonHeadImage.addTouchTap(this.touchPrisonHandler, this);
        //红叉
        this.redCrossImage = BaseBitmap.create("prisonview_redx");
        this.redCrossImage.width = 63;
        this.redCrossImage.anchorOffsetX = this.redCrossImage.width / 2;
        this.redCrossImage.anchorOffsetY = this.redCrossImage.height / 2;
        this.redCrossImage.x = 5;
        this.redCrossImage.y = this.prisonHeadImage.y; //+10;
        this.addChild(this.redCrossImage);
        if (prisonNum == 0) {
            App.DisplayUtil.changeToGray(this.prisonHeadImage);
            App.DisplayUtil.changeToGray(this.headIcon);
        }
        else {
            this.redCrossImage.visible = false;
        }
    };
    PrisonHeadView.prototype.touchPrisonHandler = function (evt) {
        var index = Number(evt.currentTarget.name);
        ViewController.getInstance().openView(ViewConst.POPUP.PRISONDETAILSPOPUPVIEW, index);
    };
    PrisonHeadView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.prisonHeadImage = null;
        this.redCrossImage = null;
        this.id = 0;
        this.headIcon = null;
    };
    return PrisonHeadView;
}(CommonView));
__reflect(PrisonHeadView.prototype, "PrisonHeadView");
