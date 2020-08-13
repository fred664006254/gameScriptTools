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
/*
desc : 黑市
*/
var AcBlackMarketView = (function (_super) {
    __extends(AcBlackMarketView, _super);
    function AcBlackMarketView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.gemTF = null;
        _this._cfg = null;
        _this._vo = null;
        _this._acCDTxt = null;
        return _this;
    }
    AcBlackMarketView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BLACKMARKET_REFRESH, this.refreshList, this);
        var topBg = BaseLoadBitmap.create("blackmarket_titlebg");
        topBg.width = 640;
        topBg.height = 245;
        topBg.y = -13;
        this.addChildToContainer(topBg);
        // this.aid = this.param.data.aid;
        // this.code =this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._cfg = cfg;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._vo = vo;
        var actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        actimeTF.width = 365;
        actimeTF.setPosition(250, 130);
        this.addChildToContainer(actimeTF);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBlackDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height + 5);
        acDesc.width = 365;
        this.addChildToContainer(acDesc);
        var acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        acCDTxt.x = acDesc.x;
        acCDTxt.y = acDesc.y + acDesc.height + 5;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        this.tick();
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET), view.buyShopCallback, view);
        view.width = GameConfig.stageWidth;
        var bg1 = BaseBitmap.create("public_9_bg22");
        bg1.width = GameConfig.stageWidth;
        bg1.height = GameConfig.stageHeigth - 111 - view.titleBg.y - view.titleBg.height - topBg.height + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.titleBg, [0, view.titleBg.height + topBg.height]);
        view.addChild(bg1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 630, bg1.height - 35);
        var arr = this._cfg.getBlackMarketArr();
        var scrollList = ComponentManager.getScrollList(BlackBuildItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg1, [0, 10]);
        view.addChild(scrollList);
        view._list = scrollList;
        view.initBottom();
    };
    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    AcBlackMarketView.prototype.initBottom = function () {
        var bottombg = BaseBitmap.create("wifeskin_barbg");
        bottombg.x = GameConfig.stageWidth / 2 - bottombg.width / 2;
        bottombg.y = GameConfig.stageHeigth - bottombg.height + 30;
        this.addChild(bottombg);
        var servantNumBg = BaseBitmap.create("servant_topresbg");
        servantNumBg.width = 200;
        servantNumBg.x = bottombg.width / 2 - servantNumBg.width / 2;
        ;
        servantNumBg.y = bottombg.y + bottombg.height / 2 - servantNumBg.height / 2 - 15;
        this.addChild(servantNumBg);
        //金币显示
        var temW = 38;
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.scaleX = temW / gemIcon.width;
        gemIcon.scaleY = temW / gemIcon.height;
        gemIcon.x = servantNumBg.x; //servantNumBg.width/2-gemIcon.width/2;
        gemIcon.y = bottombg.y + bottombg.height / 2 - gemIcon.height / 2 + 3 - 15;
        this.addChild(gemIcon);
        this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_TITLE_SMALL);
        this.gemTF.x = gemIcon.x + temW + 5;
        this.gemTF.y = gemIcon.y + 8;
        servantNumBg.width = this.gemTF.width + 60;
        this.addChild(this.gemTF);
        servantNumBg.x = bottombg.width / 2 - servantNumBg.width / 2;
        gemIcon.x = servantNumBg.x;
        this.gemTF.x = gemIcon.x + temW + 5;
    };
    AcBlackMarketView.prototype.buyShopCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        var rewards = data.rewards;
        var idx = 0;
        for (var i in view._cfg.blackMarketListCfg) {
            var unit = view._cfg.blackMarketListCfg[i];
            if (unit.item === rewards) {
                idx = Number(i);
                break;
            }
        }
        var item = view._list.getItemByIndex(idx);
        item.refreshItem();
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
    };
    AcBlackMarketView.prototype.tick = function () {
        var deltaT = this._vo.getAcResidueTime();
        if (this._acCDTxt) {
            if (deltaT > 0) {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
            }
        }
    };
    AcBlackMarketView.prototype.refreshList = function () {
        var arr = this._cfg.getBlackMarketArr();
        this._list.refreshData(arr, this.code);
    };
    AcBlackMarketView.prototype.getRuleInfo = function () {
        return "blackMarketRuleInfo";
    };
    AcBlackMarketView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shopview_line", "acsingledayitembg", "shopview_corner", "wifeskin_barbg",
            "servant_topresbg"
        ]);
    };
    AcBlackMarketView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    };
    AcBlackMarketView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET), view.buyShopCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BLACKMARKET_REFRESH, this.refreshList, this);
        this.gemTF = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcBlackMarketView;
}(AcCommonView));
__reflect(AcBlackMarketView.prototype, "AcBlackMarketView");
//# sourceMappingURL=AcBlackMarketView.js.map