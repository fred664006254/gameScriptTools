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
        _this.affTxt = null;
        _this.nameArr = [];
        return _this;
    }
    AffairWordRewardPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 528;
        bg.height = 303;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        //处理了多少次公务
        this.affTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this.affTxt.x = 70;
        this.affTxt.y = 35;
        this.affTxt.text = LanguageManager.getlocal("affairWordRewardDes", [this.param.data.affNum]);
        this.addChildToContainer(this.affTxt);
        var rewards = this.param.data.rewards;
        var rewardsArr = GameData.formatRewardItem(rewards);
        for (var i = 0; i < rewardsArr.length; i++) {
            var currVo = rewardsArr[i];
            var str = currVo.name + "+" + currVo.num;
            this.dropTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this.dropTxt.width = 200;
            this.dropTxt.text = str;
            this.dropTxt.setPosition(this.affTxt.x, 45 + this.dropTxt.y + this.dropTxt.height + 30 * i);
            this.addChildToContainer(this.dropTxt);
        }
        //奖励文字  
        var confirmButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "skinLvupOkBtn", this.hide, this);
        confirmButton.x = bg.x + bg.width / 2 - confirmButton.width / 2;
        confirmButton.y = bg.y + bg.height + 15;
        confirmButton.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(confirmButton);
    };
    AffairWordRewardPopupView.prototype.dispose = function () {
        this.affTxt = null;
        this.nameArr = [];
        this.dropTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AffairWordRewardPopupView;
}(PopupView));
__reflect(AffairWordRewardPopupView.prototype, "AffairWordRewardPopupView");
