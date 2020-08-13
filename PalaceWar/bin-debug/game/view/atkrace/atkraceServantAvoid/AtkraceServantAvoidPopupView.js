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
 * 门客选择界面
 * @author hyd
 * @date 2019/8/8
 * @class AtkraceServantAvoidPopupView
 */
var AtkraceServantAvoidPopupView = (function (_super) {
    __extends(AtkraceServantAvoidPopupView, _super);
    function AtkraceServantAvoidPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._servantList = [];
        _this._cfgId = null;
        _this._avoidNum = null;
        return _this;
    }
    AtkraceServantAvoidPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateCallback, this);
        this._servantList = this.param.data.servantList;
        this._cfgId = this.param.data.cfgId;
        //门客免战介绍
        var introBg = BaseBitmap.create('atkraceservantavoid_intro_bg');
        introBg.width = 544;
        introBg.height = 143;
        this.addChildToContainer(introBg);
        introBg.x = this.viewBg.x + this.viewBg.width / 2 - introBg.width / 2;
        introBg.y = this.viewBg.y + 2;
        var introTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkrace_servantAvoid_intro'), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.addChildToContainer(introTxt);
        introTxt.width = introBg.width - 16;
        introTxt.height = introBg.height - 16;
        // introTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        introTxt.x = introBg.x + introBg.width / 2 - introTxt.width / 2;
        introTxt.y = introBg.y + 15;
        var currAvoidNum = this.getAvoidNum();
        var maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
        App.LogUtil.log("maxNum: " + maxNum);
        var avoidNum = ComponentManager.getTextField(LanguageManager.getlocal("servantAvoidTotalNum", ["" + currAvoidNum, "" + maxNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        avoidNum.setPosition(introBg.x + introBg.width / 2 - avoidNum.width / 2, introBg.y + introBg.height - 32);
        this.addChildToContainer(avoidNum);
        this._avoidNum = avoidNum;
        avoidNum.setColor(currAvoidNum >= maxNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 550;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, introBg.y + introBg.height + 5); //5
        this.addChildToContainer(bg);
        // let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AtkraceServantAvoidScrollItem, this._servantList, rect, { cfgId: this._cfgId, servantList: this._servantList });
        this._scrollList.setPosition(bg.x + 8, bg.y + 10);
        this.addChildToContainer(this._scrollList);
    };
    AtkraceServantAvoidPopupView.prototype.getAvoidNum = function () {
        if (!this._servantList || this._servantList.length <= 0) {
            return 0;
        }
        var list = this._servantList;
        var servantId;
        var count = 0;
        for (var i = 0; i < list.length; i++) {
            servantId = list[i].servantId;
            if (Api.servantVoApi.getServantObj(servantId) && Api.servantVoApi.getServantObj(list[i].servantId).avoid == 2) {
                count++;
            }
        }
        return count;
    };
    AtkraceServantAvoidPopupView.prototype.onAvoidStateCallback = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var currAvoidNum = this.getAvoidNum();
            var maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
            this._avoidNum.text = LanguageManager.getlocal("servantAvoidTotalNum", ["" + currAvoidNum, "" + maxNum]);
            this._avoidNum.setColor(currAvoidNum >= maxNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);
        }
    };
    AtkraceServantAvoidPopupView.prototype.tick = function () {
    };
    AtkraceServantAvoidPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'atkraceservantavoid_switchbar_bg', 'atkraceservantavoid_switchbar', 'atkraceservantavoid_intro_bg'
        ]);
    };
    AtkraceServantAvoidPopupView.prototype.getTitleStr = function () {
        return "atkrace_servantAvoid_title";
    };
    AtkraceServantAvoidPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateCallback, this);
        this._scrollList = null;
        this._servantList = [];
        this._cfgId = null;
        this._avoidNum = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceServantAvoidPopupView;
}(PopupView));
__reflect(AtkraceServantAvoidPopupView.prototype, "AtkraceServantAvoidPopupView");
//# sourceMappingURL=AtkraceServantAvoidPopupView.js.map