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
var AcBattleGroundAgreePopupDialog = (function (_super) {
    __extends(AcBattleGroundAgreePopupDialog, _super);
    function AcBattleGroundAgreePopupDialog() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        return _this;
    }
    AcBattleGroundAgreePopupDialog.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["battlegroundpopbg-" + this.getUiCode()]);
    };
    AcBattleGroundAgreePopupDialog.prototype.getTitleStr = function () {
        return "atkraceViewTitle";
    };
    AcBattleGroundAgreePopupDialog.prototype.getBgExtraHeight = function () {
        return 0;
    };
    Object.defineProperty(AcBattleGroundAgreePopupDialog.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAgreePopupDialog.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAgreePopupDialog.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAgreePopupDialog.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundAgreePopupDialog.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundAgreePopupDialog.prototype.initView = function () {
        //底部
        var agreeBg = BaseBitmap.create("battlegroundpopbg-" + this.getUiCode());
        agreeBg.setPosition(this.viewBg.width / 2 - agreeBg.width / 2, 0);
        this.addChildToContainer(agreeBg);
        this._type = this.param.data.type;
        var sid = this.param.data.sid;
        //
        // Api.servantVoApi.getFullImgPathWithId(sid);
        // equip
        var fullimage = "";
        var ishelp = this.param.data.ishelp;
        if (ishelp) {
            fullimage = Config.ServantCfg.getServantItemById(sid).fullIcon;
            if (this.param.data.equip && this.param.data.equip != "") {
                fullimage = "skin_full_" + this.param.data.equip;
            }
        }
        else {
            fullimage = Api.servantVoApi.getFullImgPathWithId(this.param.data.sid);
        }
        var servantFullImg = BaseLoadBitmap.create(fullimage);
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        ;
        servantFullImg.x = this.viewBg.width / 2 - servantFullImg.width / 2;
        servantFullImg.y = agreeBg.height - servantFullImg.height;
        this.addChildToContainer(servantFullImg);
        var str = LanguageManager.getlocal("acBattileGroundDialog" + this._type, [this.param.data.name]);
        var descText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descText.width = 500;
        descText.lineSpacing = 5;
        var descBg = BaseBitmap.create("public_9_bg11");
        descBg.width = agreeBg.width;
        descBg.height = descText.height + 40;
        descBg.setPosition(this.viewBg.width / 2 - descBg.width / 2, agreeBg.height - descBg.height);
        this.addChildToContainer(descBg);
        descText.setPosition(this.viewBg.width / 2 - descText.width / 2, agreeBg.height - descText.height - 20);
        this.addChildToContainer(descText);
        var btnArray = [];
        if (this._type == 1) {
            btnArray.push("atkraceAgreeAnswer0");
        }
        btnArray.push("atkraceAgreeAnswer" + this._type);
        for (var i = 0; i < btnArray.length; i++) {
            var btnBg = BaseBitmap.create("public_9_bg28");
            btnBg.width = 556;
            btnBg.height = 55;
            btnBg.setPosition(GameConfig.stageWidth / 2 - btnBg.width / 2, GameConfig.stageHeigth / 2 + 260 + i * 65);
            this.addChild(btnBg);
            btnBg.addTouchTap(this.btnClick, this, [i]);
            var btnText = ComponentManager.getTextField(LanguageManager.getlocal(btnArray[i]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height / 2 - btnText.height / 2);
            this.addChild(btnText);
        }
        if (!Api.rookieVoApi.isGuiding) {
            this.touchEnabled = false;
            this.y = -200;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1, y: 0 }, 500).call(this.remove, this);
        }
    };
    AcBattleGroundAgreePopupDialog.prototype.remove = function () {
        this.drawblackMask();
        this.touchEnabled = true;
    };
    AcBattleGroundAgreePopupDialog.prototype.isShowMask = function () {
        return false;
    };
    AcBattleGroundAgreePopupDialog.prototype.drawblackMask = function () {
        var _maskBmp = BaseBitmap.create("public_9_viewmask");
        _maskBmp.width = GameConfig.stageWidth;
        _maskBmp.height = GameConfig.stageHeigth;
        _maskBmp.touchEnabled = true;
        this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp, 0);
    };
    AcBattleGroundAgreePopupDialog.prototype.btnClick = function (event, idx) {
        if (this._type == 1 && idx == 0) {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE, { handle: 1 });
        }
        this.hide();
    };
    AcBattleGroundAgreePopupDialog.prototype.isShowOpenAni = function () {
        return false;
    };
    AcBattleGroundAgreePopupDialog.prototype.dispose = function () {
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAgreePopupDialog;
}(PopupView));
__reflect(AcBattleGroundAgreePopupDialog.prototype, "AcBattleGroundAgreePopupDialog");
//# sourceMappingURL=AcBattleGroundAgreePopupDialog.js.map