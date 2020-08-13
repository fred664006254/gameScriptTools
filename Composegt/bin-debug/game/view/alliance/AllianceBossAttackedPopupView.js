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
var AllianceBossAttackedPopupView = (function (_super) {
    __extends(AllianceBossAttackedPopupView, _super);
    function AllianceBossAttackedPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AllianceBossAttackedPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            //"dailybosslastattackpopupview",
            "dailybosslastattacktitle",
            "allianceboss_fight_text"
        ]);
    };
    AllianceBossAttackedPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    AllianceBossAttackedPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.addTouchTap(this.hide, this);
        //type 1 最后一击   2 战斗  3 被别人击杀
        var dataInfo = this.param.data;
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossHasKill"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            descTxt_1.setPosition((this.viewBg.width - descTxt_1.width) / 2, 38);
            this.addChildToContainer(descTxt_1);
            return;
        }
        var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + dataInfo.index);
        if (!dataInfo || !dataInfo.index) {
            bossName = LanguageManager.getlocal("allianceBoss_infinity");
        }
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
        var downTitleLine = BaseBitmap.create("public_huawen_bg");
        downTitleLine.setPosition(this.width / 2 - downTitleLine.width / 2, title.y + title.height + 10);
        this.addChildToContainer(downTitleLine);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.width = 480;
        descTxt.lineSpacing = 6;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, downTitleLine.y + downTitleLine.height + 10);
        this.addChildToContainer(descTxt);
        var offY = 0;
        if (dataInfo.type == 1) {
            var rewardVo = GameData.formatRewardItem(dataInfo.rewards)[0];
            var rewardIcon = GameData.getItemIcon(rewardVo);
            rewardIcon.setPosition((this.viewBg.width - rewardIcon.width) / 2, descTxt.y + descTxt.height + 16);
            this.addChildToContainer(rewardIcon);
            offY = 105;
        }
        var rightScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceBuildGet3") + App.StringUtil.formatStringColor("+" + dataInfo.exp, TextFieldConst.COLOR_WARN_GREEN2), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        rightScoreTxt.setPosition((this.viewBg.width - rightScoreTxt.width) / 2, descTxt.y + descTxt.height + offY + 30);
        this.addChildToContainer(rightScoreTxt);
        if (this.param.data && this.param.data.autoclose == 1) {
            egret.Tween.get(this).wait(1000).call(this.hide, this);
        }
    };
    AllianceBossAttackedPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceBossAttackedPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AllianceBossAttackedPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AllianceBossAttackedPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AllianceBossAttackedPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AllianceBossAttackedPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AllianceBossAttackedPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossAttackedPopupView;
}(PopupView));
__reflect(AllianceBossAttackedPopupView.prototype, "AllianceBossAttackedPopupView");
