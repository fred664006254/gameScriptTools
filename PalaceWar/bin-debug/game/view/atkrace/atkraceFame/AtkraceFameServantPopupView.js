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
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusWifePopupView
 */
var AtkraceFameServantPopupView = (function (_super) {
    __extends(AtkraceFameServantPopupView, _super);
    function AtkraceFameServantPopupView() {
        return _super.call(this) || this;
    }
    AtkraceFameServantPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.onUpFameRevHandle, this);
        var bgBB = BaseBitmap.create("atkracefameservantpopupview_bg");
        bgBB.x = 20 + GameData.popupviewOffsetX;
        bgBB.y = 10;
        this.addChildToContainer(bgBB);
        var servantId = this.param.data.servantId;
        this._servantId = servantId;
        this._servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        var maxFameLevel = Config.AtkraceCfg.getMaxFamelevel();
        var serImg = this._servantInfoObj.fullImgPath;
        var wear = Api.servantVoApi.getservantSkinIdInWear(servantId);
        this._servantIcon = BaseLoadBitmap.create(serImg);
        this._servantIcon.width = 405;
        this._servantIcon.height = 467;
        this._servantIcon.x = 85 + GameData.popupviewOffsetX;
        this._servantIcon.y = 50;
        this.addChildToContainer(this._servantIcon);
        var skincfg = null;
        if (!Api.switchVoApi.checkCloseBone()) {
            var boneName = undefined;
            var dagonBonesName = null;
            if (wear && wear != "") {
                skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
                serImg = skincfg.body;
                if (skincfg && skincfg.bone) {
                    boneName = skincfg.bone + "_ske";
                    dagonBonesName = skincfg.bone;
                }
            }
            else {
                dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
                boneName = dagonBonesName + "_ske";
            }
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                if (this._servantIcon) {
                    this._servantIcon.visible = false;
                }
                if (this._droServantIcon) {
                    this._droServantIcon.stop();
                    this._droServantIcon.dispose();
                    this._droServantIcon = null;
                }
                this._droServantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                this._droServantIcon.visible = true;
                this._droServantIcon.x = this._servantIcon.x + 200;
                this._droServantIcon.y = this._servantIcon.y + 450;
                this.addChildToContainer(this._droServantIcon);
                if (servantId == "1063") {
                    if (this._droServantIcon) {
                        this._droServantIcon.setScale(0.9);
                        this._droServantIcon.y = this._servantIcon.y + 460;
                    }
                }
                var mask = egret.Rectangle.create();
                var offX = Math.abs(bgBB.x - this._droServantIcon.x);
                mask.setTo(bgBB.x - this._droServantIcon.x, bgBB.y - this._droServantIcon.y, bgBB.width, bgBB.height);
                this._servantIcon.visible = false;
                this._droServantIcon.mask = mask;
            }
            else {
                if (this._droServantIcon) {
                    this._droServantIcon.stop();
                    this._droServantIcon.dispose();
                    this._droServantIcon = null;
                }
                this._servantIcon.setload(serImg); //0611
                this._servantIcon.visible = true;
            }
        }
        else {
            if (this._droServantIcon) {
                this._droServantIcon.stop();
                this._droServantIcon.dispose();
                this._droServantIcon = null;
            }
            this._servantIcon.setload(serImg); //0611
            this._servantIcon.visible = true;
        }
        //红颜名字背景
        var namebg = BaseBitmap.create("skin_detail_namebg");
        namebg.setPosition(bgBB.x, bgBB.y + 20);
        namebg.setScale(0.9);
        this.addChildToContainer(namebg);
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            namebg.scaleX = 1.5;
            namebg.setPosition(bgBB.x + bgBB.width / 2 - namebg.width / 2 * namebg.scaleX, bgBB.y + bgBB.height - namebg.height * namebg.scaleY);
        }
        var nameTitleStr = LanguageManager.getlocal('servant');
        if (skincfg != null) {
            nameTitleStr = skincfg.getSkinName();
        }
        var nameTitle = ComponentManager.getTextField(nameTitleStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTitle.textAlign = egret.HorizontalAlign.CENTER;
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            nameTitle.setPosition(namebg.x + namebg.width / 2 * namebg.scaleX - nameTitle.width / 2, namebg.y + 30);
        }
        else {
            nameTitle.width = 120;
            nameTitle.setPosition(namebg.x + 45, namebg.y + 30);
        }
        this.addChildToContainer(nameTitle);
        var nameTxt = ComponentManager.getTextField(this._servantInfoObj.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            nameTxt.setPosition(namebg.x + namebg.width / 2 * namebg.scaleX - nameTxt.width / 2, namebg.y + 52);
        }
        else {
            nameTxt.width = 120;
            nameTxt.setPosition(namebg.x + 45, namebg.y + 52);
        }
        this.addChildToContainer(nameTxt);
        var fameTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkraceFame2'), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fameTxt.setPosition(bgBB.x + 30, bgBB.y + bgBB.height + 35);
        this.addChildToContainer(fameTxt);
        this._progressBar1 = ComponentManager.getProgressBar("progress3", "progress3_bg", 400);
        this._progressBar1.x = fameTxt.x + fameTxt.width + 20;
        this._progressBar1.y = fameTxt.y - 3;
        this.addChildToContainer(this._progressBar1);
        //提升品阶按钮
        if (this._servantInfoObj.fameLv < maxFameLevel) {
            this._upFameBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameBtnUpFame", this.onClickUpFameBtn, this);
            this._upFameBtn.x = bgBB.x + bgBB.width / 2 - this._upFameBtn.width / 2;
            this._upFameBtn.y = fameTxt.y + 50;
            this.addChildToContainer(this._upFameBtn);
            this._upFameBtn.setGray(true);
            App.CommonUtil.addIconToBDOC(this._upFameBtn);
        }
        //刷新进度条和红点
        this.refreshView();
    };
    AtkraceFameServantPopupView.prototype.refreshView = function () {
        this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        //刷新标题
        if (this.titleTF) {
            this.titleTF.text = LanguageManager.getlocal("atkraceFameLevel" + this._servantInfoObj.fameLv);
            this.titleTF.x = this.viewBg.x + this.viewBg.width / 2 - this.titleTF.width / 2;
            // this.titleTF.y = this.viewBg.y + 15;
        }
        //刷新进度条
        var percent = this._servantInfoObj.fame / Config.AtkraceCfg.getNeedFameBylevel(this._servantInfoObj.fameLv);
        var percentStr = this._servantInfoObj.fame + "/" + Config.AtkraceCfg.getNeedFameBylevel(this._servantInfoObj.fameLv);
        this._progressBar1.setPercentage(percent, percentStr);
        //刷新红点
        if (this._upFameBtn) {
            if (Api.atkraceVoApi.checkServantCanUpFame(this._servantId)) {
                App.CommonUtil.addIconToBDOC(this._upFameBtn);
                this._upFameBtn.setGray(false);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._upFameBtn);
                this._upFameBtn.setGray(true);
            }
        }
    };
    AtkraceFameServantPopupView.prototype.onClickUpFameBtn = function () {
        if (this._upFameBtn.getIsGray()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('atkraceFameUpFameFailTip'));
            return;
        }
        this.request(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, { servantId: this._servantId });
    };
    AtkraceFameServantPopupView.prototype.onUpFameRevHandle = function () {
        this.refreshView();
    };
    AtkraceFameServantPopupView.prototype.getTitleStr = function () {
        return "atkraceFameLevel" + Api.servantVoApi.getServantObj(this.param.data.servantId).fameLv;
    };
    AtkraceFameServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.onUpFameRevHandle, this);
        this._servantId = '';
        this._servantIcon = null;
        this._droServantIcon = null;
        this._progressBar1 = null;
        this._upFameBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceFameServantPopupView;
}(PopupView));
__reflect(AtkraceFameServantPopupView.prototype, "AtkraceFameServantPopupView");
//# sourceMappingURL=AtkraceFameServantPopupView.js.map