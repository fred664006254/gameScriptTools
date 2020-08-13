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
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItems
 */
var ServantInfoFourItems = (function (_super) {
    __extends(ServantInfoFourItems, _super);
    function ServantInfoFourItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoFourItems.prototype.init = function (servantId, bottomH) {
        // let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
        // public_biaoti.x = 25;
        // public_biaoti.y = 70;
        // public_biaoti.width =550;
        // this.addChild(public_biaoti);
        var baseY = 87;
        var jineng = BaseBitmap.create("servant_tupo");
        jineng.x = 250;
        jineng.y = baseY - jineng.height / 2; //public_biaoti.y;
        this.addChild(jineng);
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var serObj = Api.servantVoApi.getServantObj(this._servantId);
        // let istshotbg = BaseBitmap.create("public_listshotbg");
        // istshotbg.width = 600;
        // istshotbg.height =bottomH-185;
        // istshotbg.y = 130;
        // istshotbg.x =20;
        // this.addChild(istshotbg); 
        var auraList = [];
        var tmpList = servantcfg.aura || [];
        for (var key in tmpList) {
            if (tmpList.hasOwnProperty(key)) {
                if (serObj.aura[key] != null) {
                    auraList[key] = tmpList[key];
                }
            }
        }
        var skin_auraList = Api.servantVoApi.getServantObj(this._servantId).getAllSkinAuraList();
        var keysList = Object.keys(auraList).concat(Object.keys(skin_auraList));
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 145 - 25);
        ServantInfoFourItemScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem, keysList, rect);
        // scrollView.x = 24;
        // scrollView.y = 111;
        scrollView.y = 120;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantInfoFourItems.prototype.servantWifeLevelupHandler = function () {
    };
    ServantInfoFourItems.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoFourItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoFourItems.prototype, "ServantInfoFourItems");
