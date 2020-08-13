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
 * @class ServantInfoAmuletItems
 */
var ServantInfoAmuletItems = (function (_super) {
    __extends(ServantInfoAmuletItems, _super);
    function ServantInfoAmuletItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoAmuletItems.prototype.init = function (servantId, bottomH) {
        var public_biaoti = BaseBitmap.create("servant_biaotinew");
        public_biaoti.x = 15;
        public_biaoti.y = 70;
        public_biaoti.width = 610;
        this.addChild(public_biaoti);
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var amuletList = Api.servantVoApi.getServantObj(this._servantId).getAmuletAuraList();
        var amuletKeys = Object.keys(amuletList);
        var ownNUm = Api.amuletVoApi.getAmuletNum(this._servantId);
        var numTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTxt.text = LanguageManager.getlocal("servant_amuletAura_num") + ownNUm;
        numTxt.x = public_biaoti.x + 110;
        numTxt.y = public_biaoti.y + public_biaoti.height / 2 - numTxt.height / 2 + 1;
        numTxt.name = "numTxt";
        this.addChild(numTxt);
        var isShowList = true;
        var amucfg = Config.AmuletCfg.getAmucfgIndex(amuletKeys[0]);
        if (!amucfg) {
            isShowList = false;
            amucfg = Config.AmuletCfg.getAmucfgBySerId(this._servantId);
        }
        var attStr = "";
        var amuletEffect = amucfg.amuletEffect;
        if (amuletEffect.att.length == 4) {
            attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < amuletEffect.att.length; index1++) {
                var element = amuletEffect.att[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        var proTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        proTxt.text = attStr + amucfg.amuletEffect.attNum * ownNUm;
        proTxt.x = public_biaoti.x + public_biaoti.width - proTxt.width - 110;
        proTxt.y = numTxt.y;
        proTxt.name = "proTxt";
        this.addChild(proTxt);
        if (!isShowList) {
            var _emptyTip = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_emulateEmpty"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            _emptyTip.x = GameConfig.stageWidth / 2 - _emptyTip.width / 2;
            _emptyTip.y = bottomH / 2;
            // _emptyTip.visible = false;
            this.addChild(_emptyTip);
            return;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 145);
        ServantInfoFourItemScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoAmuletScrollItem, amuletKeys, rect);
        scrollView.x = 24;
        scrollView.y = 115;
        this._scrollView = scrollView;
        this.addChild(scrollView);
    };
    ServantInfoAmuletItems.prototype.servantWifeLevelupHandler = function () {
    };
    ServantInfoAmuletItems.prototype.dispose = function () {
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoAmuletItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoAmuletItems.prototype, "ServantInfoAmuletItems");
