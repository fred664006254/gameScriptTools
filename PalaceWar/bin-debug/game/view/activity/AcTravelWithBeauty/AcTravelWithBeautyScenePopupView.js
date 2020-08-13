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
 * 携美同游 场景剧情
 * author ycg
 * date 2019.11.4
 * @class AcTravelWithBeautyScenePopupView
 */
var AcTravelWithBeautyScenePopupView = (function (_super) {
    __extends(AcTravelWithBeautyScenePopupView, _super);
    function AcTravelWithBeautyScenePopupView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._obj = null;
        return _this;
    }
    AcTravelWithBeautyScenePopupView.prototype.initView = function () {
        var _this = this;
        var bgName = this.param.data.bgName;
        var msgKey = this.param.data.msgKey;
        this._callback = this.param.data.callback;
        this._obj = this.param.data.obj;
        var bgStr = ResourceManager.hasRes(bgName) ? bgName : "actravelwithbeauty_scenebg-1";
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 548;
        bg.height = 375;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var skinId = vo.getShowWifeSkinId();
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var wife = BaseLoadBitmap.create(skinCfg.body);
        wife.width = 640;
        wife.height = 840;
        wife.setScale(0.4);
        wife.anchorOffsetY = wife.height;
        wife.anchorOffsetX = wife.width / 2;
        wife.x = bg.x + bg.width / 2;
        wife.y = bg.y + bg.height;
        this.addChildToContainer(wife);
        var taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
        taoxinFullParticle.x = -200;
        taoxinFullParticle.y = -20;
        taoxinFullParticle.scaleX = 0.7;
        taoxinFullParticle.scaleY = 0.7;
        taoxinFullParticle.start();
        this.addChildToContainer(taoxinFullParticle);
        var bottomTxt = ComponentManager.getTextField(LanguageManager.getlocal(msgKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        bottomTxt.width = bg.width - 40;
        bottomTxt.lineSpacing = 5;
        bottomTxt.setPosition(bg.x + bg.width / 2 - bottomTxt.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(bottomTxt);
        this.closeBtn.setEnable(false);
        egret.Tween.get(this.closeBtn).wait(1000).
            call(function () {
            _this.closeBtn.setEnable(true);
        }).
            wait(5000).
            call(function () {
            _this.hide();
        });
    };
    AcTravelWithBeautyScenePopupView.prototype.getTypeCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    };
    AcTravelWithBeautyScenePopupView.prototype.getTitleStr = function () {
        return "acTravelWithBeautyFavorTitle-" + this.getTypeCode();
    };
    AcTravelWithBeautyScenePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "taoxin", "taoxin_json",
        ]);
    };
    AcTravelWithBeautyScenePopupView.prototype.dispose = function () {
        if (this._callback) {
            this._callback.apply(this._obj);
        }
        this._callback = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyScenePopupView;
}(PopupView));
__reflect(AcTravelWithBeautyScenePopupView.prototype, "AcTravelWithBeautyScenePopupView");
//# sourceMappingURL=AcTravelWithBeautyScenePopupView.js.map