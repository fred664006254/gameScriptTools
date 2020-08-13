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
 * 门客详情new 红颜部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIWifeItem
 */
var ServantNewUIWifeItem = (function (_super) {
    __extends(ServantNewUIWifeItem, _super);
    function ServantNewUIWifeItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._wifeId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantNewUIWifeItem.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.refreshItem, this);
        this._servantId = servantId;
        ServantInfoWifeItemScrollItem.servantId = this._servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        this._wifeId = servantcfg.wifeId;
        if (!this._wifeId) {
            return;
        }
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var wifeSkill = wifecfg.wifeSkill;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
        var str2 = "";
        if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)) {
            str2 = LanguageManager.getlocal("servant_wife_own");
        }
        else {
            str2 = LanguageManager.getlocal("servant_wife_not_own");
        }
        if (this._scrollView) {
            this._scrollView.refreshData(list);
            var wifeTip_1 = this.getChildByName('wifeTip');
            wifeTip_1.text = LanguageManager.getlocal("servant_wifeTip", [wifecfg.name, str2]);
            return;
        }
        var line1 = BaseBitmap.create("servant_title_bg");
        line1.width = 440;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 20;
        this.addChild(line1);
        var wifeTip = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // wifeTip.textColor = TextFieldConst.COLOR_BROWN;
        wifeTip.name = "wifeTip";
        wifeTip.text = LanguageManager.getlocal("servant_wifeTip", [wifecfg.name, str2]);
        wifeTip.x = GameConfig.stageWidth / 2 - wifeTip.width / 2;
        wifeTip.y = line1.y + 8;
        this.addChild(wifeTip);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 70);
        var scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem, list, rect);
        scrollView.y = 60;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantNewUIWifeItem.prototype.refreshItem = function () {
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var str2 = "";
        if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)) {
            str2 = LanguageManager.getlocal("servant_wife_own");
        }
        else {
            str2 = LanguageManager.getlocal("servant_wife_not_own");
        }
        var wifeTip = this.getChildByName("wifeTip");
        wifeTip.text = LanguageManager.getlocal("servant_wifeTip", [wifecfg.name, str2]);
        wifeTip.x = GameConfig.stageWidth / 2 - wifeTip.width / 2;
    };
    ServantNewUIWifeItem.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.refreshItem, this);
        _super.prototype.dispose.call(this);
    };
    return ServantNewUIWifeItem;
}(BaseDisplayObjectContainer));
__reflect(ServantNewUIWifeItem.prototype, "ServantNewUIWifeItem");
//# sourceMappingURL=ServantNewUIWifeItem.js.map