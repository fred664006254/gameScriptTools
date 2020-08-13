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
 * 一键公务奖励面板
 */
var AffairWordRewardPopupView = (function (_super) {
    __extends(AffairWordRewardPopupView, _super);
    function AffairWordRewardPopupView() {
        var _this = _super.call(this) || this;
        _this.dropTxt = null;
        _this.dropNumTxt = null;
        _this.affTxt = null;
        _this.nameArr = [];
        return _this;
    }
    AffairWordRewardPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 263;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 39 + 30;
        this.addChildToContainer(bg);
        //处理了多少次公务
        // console.log(this.param.data.affNum); 
        this.affTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.affTxt.x = 150 + GameData.popupviewOffsetX;
        this.affTxt.y = 12 + 30;
        this.affTxt.text = LanguageManager.getlocal("affairWordRewardDes", [this.param.data.affNum]);
        this.addChildToContainer(this.affTxt);
        var restr = this.param.data.rewards;
        var rewards = this.param.data.rewards;
        var rewardsArr = GameData.formatRewardItem(rewards);
        var lastY = 0;
        for (var i = 0; i < rewardsArr.length; i++) {
            var currVo = rewardsArr[i];
            var str = currVo.name;
            var str2 = "+" + currVo.num;
            this.dropTxt = ComponentManager.getTextField(LanguageManager.getlocal("affairtxtdes", [str, str2]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            this.dropTxt.width = 200;
            this.dropTxt.setPosition(222 + GameData.popupviewOffsetX, 40 + this.dropTxt.y + this.dropTxt.height + 30 * i + 30);
            this.addChildToContainer(this.dropTxt);
            lastY = this.dropTxt.y;
        }
        bg.height = lastY + 9 - 30;
        //奖励文字  
        var confirmButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "skinLvupOkBtn", this.hide, this);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, confirmButton, bg, [0, 22]);
        this.addChildToContainer(confirmButton);
        confirmButton.y = bg.height + confirmButton.height - 5 + 30;
    };
    AffairWordRewardPopupView.prototype.getBgExtraHeight = function () {
        return 35;
    };
    AffairWordRewardPopupView.prototype.dispose = function () {
        this.affTxt = null;
        this.nameArr = [];
        this.dropTxt = null;
        this.dropNumTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AffairWordRewardPopupView;
}(PopupView));
__reflect(AffairWordRewardPopupView.prototype, "AffairWordRewardPopupView");
//# sourceMappingURL=AffairWordRewardPopupView.js.map