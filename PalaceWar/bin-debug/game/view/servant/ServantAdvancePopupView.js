/**
 * 门客资质升级
 * author yanyuling
 * date 2017/11/22
 * @class ServantAdvancePopupView
 */
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
var ServantAdvancePopupView = (function (_super) {
    __extends(ServantAdvancePopupView, _super);
    function ServantAdvancePopupView() {
        var _this = _super.call(this) || this;
        _this._tipStr = "";
        return _this;
    }
    ServantAdvancePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.clvBtntHandlerCallback, this);
        this._servantId = this.param.data;
        var servantObj = Api.servantVoApi.getServantObj(this._servantId);
        var servantLvList = Config.ServantBaseCfg.getServantLvList();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 478;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        var innerbg1 = BaseBitmap.create("public_9_probiginnerbg");
        innerbg1.width = 236;
        innerbg1.height = 268;
        innerbg1.x = bg.x + 21;
        innerbg1.y = bg.y + 15;
        this._nodeContainer.addChild(innerbg1);
        var innerbg2 = BaseBitmap.create("public_9_probiginnerbg");
        innerbg2.width = innerbg1.width;
        innerbg2.height = innerbg1.height;
        innerbg2.x = innerbg1.x + 242;
        innerbg2.y = innerbg1.y;
        this._nodeContainer.addChild(innerbg2);
        var innerbg3 = BaseBitmap.create("public_9_probiginnerbg");
        innerbg3.width = 496;
        innerbg3.height = 168;
        innerbg3.x = bg.x + 12;
        innerbg3.y = innerbg1.y + innerbg1.height + 10;
        this._nodeContainer.addChild(innerbg3);
        var servant_arrow = BaseLoadBitmap.create("servant_arrow");
        servant_arrow.width = 34;
        servant_arrow.height = 22;
        servant_arrow.x = this.viewBg.width / 2 - servant_arrow.width / 2;
        servant_arrow.y = innerbg2.y + innerbg2.height / 2 - servant_arrow.height / 2;
        this._nodeContainer.addChild(servant_arrow);
        var serImg = servantObj.halfImgPath;
        var wear = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
        if (wear && wear != "") {
            serImg = Config.ServantskinCfg.getServantSkinItemById(wear).icon;
        }
        for (var index = 1; index <= 2; index++) {
            var tmpClv = servantObj.clv + index - 1;
            var tmpcfg = servantLvList[String(tmpClv)];
            var tmpNode = innerbg1;
            if (index == 2) {
                tmpNode = innerbg2;
            }
            var qualityBg = BaseLoadBitmap.create("servant_cardbg_" + tmpClv);
            qualityBg.width = 194;
            qualityBg.height = 192;
            qualityBg.x = tmpNode.x + tmpNode.width / 2 - qualityBg.width / 2;
            qualityBg.y = tmpNode.y + 15;
            this._nodeContainer.addChild(qualityBg);
            var headIcon = BaseLoadBitmap.create(serImg);
            headIcon.width = 180;
            headIcon.height = 177;
            headIcon.x = qualityBg.x + qualityBg.width / 2 - headIcon.width / 2;
            headIcon.y = qualityBg.y + qualityBg.height - headIcon.height - 10;
            this._nodeContainer.addChild(headIcon);
            if (tmpClv > 0) {
                var clvIcon = BaseLoadBitmap.create("servant_adv_icon" + tmpClv);
                clvIcon.x = qualityBg.x;
                clvIcon.y = qualityBg.y;
                this._nodeContainer.addChild(clvIcon);
            }
            var clvTxt = ComponentManager.getTextField("", 20);
            var clvStr = LanguageManager.getlocal("servant_clvStr" + tmpClv);
            var clvColorStr = LanguageManager.getlocal("servant_clvColorTxt" + tmpClv, [clvStr]);
            clvTxt.text = LanguageManager.getlocal("servant_clvTxt1", [clvColorStr]);
            clvTxt.x = qualityBg.x + qualityBg.width / 2 - clvTxt.width / 2;
            clvTxt.y = qualityBg.y + qualityBg.height + 5;
            this._nodeContainer.addChild(clvTxt);
            var lvTopTxt = ComponentManager.getTextField("", 20);
            var clvColorStr2 = LanguageManager.getlocal("servant_clvColorTxt" + tmpClv, [String(tmpcfg.upLv)]);
            lvTopTxt.text = LanguageManager.getlocal("servant_clvTxt2", [clvColorStr2]);
            lvTopTxt.x = clvTxt.x;
            lvTopTxt.y = clvTxt.y + clvTxt.height + 5;
            this._nodeContainer.addChild(lvTopTxt);
        }
        var needItem = servantLvList[String(servantObj.clv + 1)].needItem;
        if (needItem) {
            var idx = 1;
            for (var key in needItem) {
                var itemcfg = Config.ItemCfg.getItemCfgById(Number(key));
                var itembg = BaseBitmap.create(itemcfg.iconBg);
                itembg.width = 108;
                itembg.height = 106;
                itembg.x = this.viewBg.x + this.viewBg.width / 2 - itembg.width / 2 + (idx - 2) * 150;
                itembg.y = innerbg3.y + 10;
                this._nodeContainer.addChild(itembg);
                var itemIcon = BaseLoadBitmap.create(itemcfg.icon);
                itemIcon.width = itemIcon.height = 100;
                itemIcon.x = itembg.x + itembg.width / 2 - itemIcon.width / 2;
                itemIcon.y = itembg.y + itembg.height / 2 - itemIcon.height / 2;
                this._nodeContainer.addChild(itemIcon);
                var numBg = BaseBitmap.create("public_numbg");
                numBg.width = 136;
                numBg.height = 41;
                numBg.x = itembg.x + itembg.width / 2 - numBg.width / 2;
                numBg.y = itembg.y + itembg.height + 5;
                this._nodeContainer.addChild(numBg);
                var numTxt = ComponentManager.getTextField("", 20);
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(Number(key));
                if (ownNum >= needItem[key]) {
                    numTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                }
                else {
                    numTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
                }
                numTxt.text = ownNum + "/" + needItem[key];
                numTxt.x = numBg.x + numBg.width / 2 - numTxt.width / 2;
                numTxt.y = numBg.y + numBg.height / 2 - numTxt.height / 2;
                this._nodeContainer.addChild(numTxt);
                if (this._tipStr == "" && ownNum < needItem[key]) {
                    this._tipStr = LanguageManager.getlocal("servant_clvTipStr");
                    // LanguageManager.getlocal("servant_clvTipStr",[itemcfg.name])
                }
                idx++;
            }
        }
        var clvBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servant_clvUpBtn", this.clvBtntHandler, this);
        clvBtn.x = bg.x + bg.width / 2 - clvBtn.width / 2;
        clvBtn.y = bg.y + bg.height + 20;
        this._nodeContainer.addChild(clvBtn);
    };
    ServantAdvancePopupView.prototype.clvBtntHandlerCallback = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTADVANCEVIEW, this._servantId);
            this.hide();
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("servant_advfailedTip"));
        }
    };
    ServantAdvancePopupView.prototype.clvBtntHandler = function () {
        if (this._tipStr != "") {
            App.CommonUtil.showTip(this._tipStr);
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SERVANT_CHANGE, { servantId: this._servantId });
    };
    ServantAdvancePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.clvBtntHandlerCallback, this);
        this._nodeContainer = null;
        this._servantId = null;
        this._tipStr = "";
        _super.prototype.dispose.call(this);
    };
    return ServantAdvancePopupView;
}(PopupView));
__reflect(ServantAdvancePopupView.prototype, "ServantAdvancePopupView");
//# sourceMappingURL=ServantAdvancePopupView.js.map