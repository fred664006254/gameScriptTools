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
var DailybossAttackedPopupView = (function (_super) {
    __extends(DailybossAttackedPopupView, _super);
    function DailybossAttackedPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    DailybossAttackedPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            //"dailybosslastattackpopupview",
            "dailybosslastattacktitle",
            "allianceboss_fight_text"
        ]);
    };
    DailybossAttackedPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.addTouchTap(this.hide, this);
        //type 1 最后一击   2 战斗  3 被别人击杀 4 新蛮王攻击
        var dataInfo = this.param.data;
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("dailybossHasKill"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            descTxt_1.setPosition((this.viewBg.width - descTxt_1.width) / 2, 38);
            this.addChildToContainer(descTxt_1);
            return;
        }
        var bossName = LanguageManager.getlocal("dailybossNameType2");
        var titlePic;
        var descStr;
        if (dataInfo.type == 1) {
            titlePic = "dailybosslastattacktitle";
            descStr = LanguageManager.getlocal("alliancebossattacked1", [bossName, bossName, String(dataInfo.damage)]);
        }
        else {
            titlePic = "allianceboss_fight_text";
            descStr = LanguageManager.getlocal("alliancebossattacked2", [bossName, String(dataInfo.damage)]);
        }
        var title = BaseBitmap.create(titlePic);
        title.setPosition((this.viewBg.width - title.width) / 2, 10);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.width = 480;
        descTxt.lineSpacing = 6;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 18);
        this.addChildToContainer(descTxt);
        var offY = 0;
        if (dataInfo.type == 1) {
            var rewardVo = GameData.formatRewardItem(dataInfo.rewards)[0];
            var rewardIcon = GameData.getItemIcon(rewardVo);
            rewardIcon.setPosition((this.viewBg.width - rewardIcon.width) / 2, descTxt.y + descTxt.height + 16);
            this.addChildToContainer(rewardIcon);
            offY = 105;
        }
        var leftScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc") + App.StringUtil.formatStringColor("+" + dataInfo.exp, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        leftScoreTxt.setPosition(GameConfig.stageWidth / 2 - 50 - leftScoreTxt.width, descTxt.y + descTxt.height + offY + 30);
        this.addChildToContainer(leftScoreTxt);
        var rightScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossPoint") + App.StringUtil.formatStringColor("+" + dataInfo.exp, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rightScoreTxt.setPosition(GameConfig.stageWidth / 2 + 50, leftScoreTxt.y);
        this.addChildToContainer(rightScoreTxt);
        if (dataInfo.type == 4) {
            rightScoreTxt.visible = false;
            leftScoreTxt.text = LanguageManager.getlocal("dailybossnewScore") + App.StringUtil.formatStringColor("+" + dataInfo.exp, TextFieldConst.COLOR_WARN_GREEN);
            leftScoreTxt.x = GameConfig.stageWidth / 2 - leftScoreTxt.width / 2;
        }
        if (this.param.data && this.param.data.autoclose == 1) {
            egret.Tween.get(this).wait(1000).call(this.hide, this);
        }
    };
    DailybossAttackedPopupView.prototype.getTitleStr = function () {
        return null;
    };
    DailybossAttackedPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    DailybossAttackedPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    DailybossAttackedPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    DailybossAttackedPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    DailybossAttackedPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    DailybossAttackedPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    DailybossAttackedPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossAttackedPopupView;
}(PopupView));
__reflect(DailybossAttackedPopupView.prototype, "DailybossAttackedPopupView");
//# sourceMappingURL=DailybossAttackedPopupView.js.map