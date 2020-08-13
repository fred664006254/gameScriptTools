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
var AcSpringOutingLuckUpPopupView = (function (_super) {
    __extends(AcSpringOutingLuckUpPopupView, _super);
    function AcSpringOutingLuckUpPopupView() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._callback = null;
        _this._target = null;
        return _this;
    }
    AcSpringOutingLuckUpPopupView.prototype.getTitleStr = function () {
        if (LanguageManager.checkHasKey("acSpringOutingLuckUpPopupViewTitle-" + AcSpringOutingView.CODE)) {
            return "acSpringOutingLuckUpPopupViewTitle-" + AcSpringOutingView.CODE;
        }
        else {
            return "acSpringOutingLuckUpPopupViewTitle-1";
        }
    };
    AcSpringOutingLuckUpPopupView.prototype.getShowHeight = function () {
        return 510;
    };
    AcSpringOutingLuckUpPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AcSpringOutingLuckUpPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    Object.defineProperty(AcSpringOutingLuckUpPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcSpringOutingView.AID, AcSpringOutingView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcSpringOutingLuckUpPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcSpringOutingLuckUpPopupView.prototype.initView = function () {
        var d = this.param.data;
        this._data = d.data;
        this._callback = d.callback;
        this._target = d.target;
        var curId = this.vo.getCurBgId();
        if (curId == 0) {
            curId = 1;
        }
        var bg = null;
        if (ResourceManager.hasRes("acspringouting_winbg_" + curId + "-" + AcSpringOutingView.CODE)) {
            bg = BaseLoadBitmap.create("acspringouting_winbg_" + curId + "-" + AcSpringOutingView.CODE);
        }
        else {
            bg = BaseLoadBitmap.create("acspringouting_winbg_" + curId + "-1");
        }
        bg.width = 537;
        bg.height = 388;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15;
        this.addChildToContainer(bg);
        var scaleNum = 0.4;
        var wifeBM = null; // BaseLoadBitmap.create("wife_skin_1071");
        if (AcSpringOutingView.CODE == "3") {
            wifeBM = BaseLoadBitmap.create("wife_skin_2201");
        }
        else {
            wifeBM = BaseLoadBitmap.create("wife_skin_1071");
        }
        // wifeBM =  BaseLoadBitmap.create("wife_skin_1071");
        wifeBM.width = 640;
        wifeBM.height = 840;
        wifeBM.setScale(scaleNum);
        wifeBM.x = this.viewBg.x + this.viewBg.width / 2 - wifeBM.width * scaleNum / 2;
        wifeBM.y = bg.y + bg.height - 3 - wifeBM.height * scaleNum;
        this.addChildToContainer(wifeBM);
        var txtBg = BaseBitmap.create("public_tc_hd01");
        txtBg.width = bg.width - 6;
        this.addChildToContainer(txtBg);
        var txtkey = "";
        if (LanguageManager.checkHasKey("acSprintOutingLuckUpText_" + curId + "-" + AcSpringOutingView.CODE)) {
            txtkey = LanguageManager.getlocal("acSprintOutingLuckUpText_" + curId + "-" + AcSpringOutingView.CODE);
        }
        else {
            txtkey = LanguageManager.getlocal("acSprintOutingLuckUpText_" + curId + "-1");
        }
        //脱衣后桃心
        var taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
        taoxinFullParticle.x = GameConfig.stageWidth / 2;
        taoxinFullParticle.y = GameConfig.stageHeigth / 2;
        taoxinFullParticle.start();
        taoxinFullParticle.scaleX = 0.8;
        taoxinFullParticle.scaleY = 0.8;
        this.addChild(taoxinFullParticle);
        //文字描述1
        var speadkDes = ComponentManager.getTextField(txtkey, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        speadkDes.width = 490;
        speadkDes.lineSpacing = 5;
        txtBg.height = speadkDes.height + 30;
        txtBg.x = bg.x + bg.width / 2 - txtBg.width / 2;
        txtBg.y = bg.y + bg.height - 3 - txtBg.height;
        speadkDes.x = txtBg.x + txtBg.width / 2 - speadkDes.width / 2;
        speadkDes.y = txtBg.y + txtBg.height / 2 - speadkDes.height / 2;
        ;
        this.addChildToContainer(speadkDes);
    };
    AcSpringOutingLuckUpPopupView.prototype.hide = function () {
        if (this._callback && this._target) {
            this._callback.apply(this._target, [this._data]);
        }
        _super.prototype.hide.call(this);
    };
    // protected resetBgSize():void
    // {
    //     super.resetBgSize();
    //     this.viewBg.height=450;
    //     // this.viewBg.y=this.viewBg.y-100;
    //     // this.closeBtn.y =this.viewBg.y-50;
    //     // this.closeBtn.x =this.closeBtn.x-10;
    // }
    AcSpringOutingLuckUpPopupView.prototype.touchHandler = function () {
        ViewController.getInstance().hideView(ViewConst.POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW);
    };
    AcSpringOutingLuckUpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcSpringOutingLuckUpPopupView.prototype.dispose = function () {
        this._data = null;
        this._callback = null;
        this._target = null;
        _super.prototype.dispose.call(this);
    };
    return AcSpringOutingLuckUpPopupView;
}(PopupView));
__reflect(AcSpringOutingLuckUpPopupView.prototype, "AcSpringOutingLuckUpPopupView");
