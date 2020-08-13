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
 * 门客详情 技能信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoWifeItem
 */
var ServantInfoWifeItem = (function (_super) {
    __extends(ServantInfoWifeItem, _super);
    function ServantInfoWifeItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._wifeId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoWifeItem.prototype.init = function (servantId, bottomH) {
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        this._wifeId = servantcfg.wifeId;
        if (!this._wifeId) {
            return;
        }
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var wifeSkill = wifecfg.wifeSkill;
        // let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
        // public_biaoti.width =610;
        // public_biaoti.height =33;
        // if(PlatformManager.checkIsViSp()){
        // 	public_biaoti.width =650;
        // }
        // public_biaoti.x = GameConfig.stageWidth/2 - public_biaoti.width/2;
        // public_biaoti.y = 70;
        // this.addChild(public_biaoti);
        var baseY = 87;
        var jiaren = BaseBitmap.create("servant_jiaren");
        // this.setLayoutPosition(LayoutConst.leftverticalCenter,jiaren,public_biaoti,[100,jiaren.y])
        jiaren.x = GameConfig.stageWidth / 2 - jiaren.width / 2 - 100;
        jiaren.y = baseY - jiaren.height / 2;
        this.addChild(jiaren);
        var wifeTip = ComponentManager.getTextField("", 26);
        var str2 = "";
        var yingqu = null;
        //已迎娶
        if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)) {
            yingqu = BaseBitmap.create("servant_yiyinqu");
            this.addChild(yingqu);
        }
        else {
            yingqu = BaseBitmap.create("servant_weiyinqu");
            this.addChild(yingqu);
        }
        wifeTip.text = wifecfg.name;
        this.addChild(wifeTip);
        // this.setLayoutPosition(LayoutConst.verticalCenter,wifeTip,public_biaoti);
        wifeTip.y = baseY - wifeTip.height / 2;
        if (PlatformManager.checkIsViSp()) {
            wifeTip.x = jiaren.x + jiaren.width + 5;
        }
        else {
            wifeTip.x = jiaren.x + jiaren.width + 20;
        }
        // this.setLayoutPosition(LayoutConst.rightverticalCenter,yingqu,public_biaoti);
        yingqu.x = wifeTip.x + wifeTip.width;
        yingqu.y = baseY - yingqu.height / 2;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 145 - 25);
        ServantInfoWifeItemScrollItem.servantId = this._servantId;
        var newList = [];
        if ((PlatformManager.checkIsWxCfg()) && Api.switchVoApi.checkopenNewWifeskillFixup()) {
            newList = list;
        }
        else {
            for (var i = 0; i < list.length; i++) {
                if (list[i].condition) {
                    newList.push(list[i]);
                }
            }
        }
        var scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem, newList, rect);
        scrollView.y = 120;
        // scrollView.x = 16;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantInfoWifeItem.prototype.servantWifeLevelupHandler = function () {
    };
    ServantInfoWifeItem.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoWifeItem;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoWifeItem.prototype, "ServantInfoWifeItem");
