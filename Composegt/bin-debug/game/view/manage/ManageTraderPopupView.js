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
var ManageTraderPopupView = (function (_super) {
    __extends(ManageTraderPopupView, _super);
    function ManageTraderPopupView() {
        var _this = _super.call(this) || this;
        _this._buyBtnList = [];
        return _this;
    }
    ManageTraderPopupView.prototype.initView = function () {
        var getCrit = Config.ManageCfg.getCrit;
        var supplyManNum = Config.ManageCfg.supplyManNum;
        var supplyManBase = Config.ManageCfg.supplyManBase;
        var supplyMan = Config.ManageCfg.supplyMan;
        var bg = BaseBitmap.create("manage_traderbg");
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 5;
        this.addChildToContainer(bg);
        var resIcons = [
            "public_icon2",
            "public_icon3",
            "public_icon4"
        ];
        var manageNUms = [
            supplyManBase + Api.manageVoApi.getReapGold() * supplyManNum,
            supplyManBase + Api.manageVoApi.getReapFood() * supplyManNum,
            supplyManBase + Api.manageVoApi.getReapSoldier() * supplyManNum,
        ];
        var posX = [
            bg.x + 80, bg.x + bg.width / 2, bg.x + bg.width - 80
        ];
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("manageTrader_todayget"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, bg.y + 440);
        this.addChildToContainer(tipTxt);
        var buyinfo = Api.manageVoApi.getBuyInfo();
        var keys = Object.keys(supplyMan).sort();
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            var element = supplyMan[key];
            var resbg = BaseBitmap.create("public_hb_bg01");
            resbg.x = posX[index] - resbg.width / 2;
            resbg.y = bg.y + 480;
            this.addChildToContainer(resbg);
            var resIcon = BaseBitmap.create(resIcons[index]);
            resIcon.x = resbg.x - 3;
            resIcon.y = resbg.y + resbg.height / 2 - resIcon.height / 2;
            this.addChildToContainer(resIcon);
            var numTxt = ComponentManager.getTextField("" + manageNUms[index], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            numTxt.setPosition(resbg.x + 45, resbg.y + (resbg.height - numTxt.height) / 2);
            this.addChildToContainer(numTxt);
            var goldIcon = BaseBitmap.create("public_icon1");
            goldIcon.x = posX[index] - goldIcon.width / 2 - 30;
            goldIcon.y = bg.y + bg.height + 10;
            goldIcon.setScale(0.7);
            this.addChildToContainer(goldIcon);
            var goldnumTxt = ComponentManager.getTextField("" + element.needGem, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            goldnumTxt.x = goldIcon.x + goldIcon.width - 5;
            goldnumTxt.y = goldIcon.y + 10;
            this.addChildToContainer(goldnumTxt);
            var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "manageTrader_buyBtn" + index, this.buyHandler, this, [index]);
            buyBtn.x = posX[index] - buyBtn.width / 2;
            buyBtn.y = goldIcon.y + goldIcon.height - 9;
            buyBtn.name = "buyBtn" + index;
            this.addChildToContainer(buyBtn);
            this._buyBtnList.push(buyBtn);
            var buyTipTxt = ComponentManager.getTextField("", 17, TextFieldConst.COLOR_BROWN);
            buyTipTxt.text = LanguageManager.getlocal("manageTrader_buyTip", ["" + (element.effect * 100)]);
            buyTipTxt.x = posX[index] - buyTipTxt.width / 2;
            buyTipTxt.y = buyBtn.y + buyBtn.height + 7;
            this.addChildToContainer(buyTipTxt);
        }
        this.refreshBtnStatus();
        var tipbg = BaseBitmap.create("public_tc_bg02");
        tipbg.x = this.viewBg.x + this.viewBg.width / 2 - tipbg.width / 2;
        tipbg.y = this.getShowHeight() - 135;
        this.addChildToContainer(tipbg);
        var tipTxt2 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal("manageTrader_Tip");
        tipTxt2.x = tipbg.x + tipbg.width / 2 - tipTxt2.width / 2;
        tipTxt2.y = tipbg.y + tipbg.height / 2 - tipTxt2.height / 2;
        this.addChildToContainer(tipTxt2);
    };
    ManageTraderPopupView.prototype.refreshBtnStatus = function () {
        var buyinfo = Api.manageVoApi.getBuyInfo();
        var supplyMan = Config.ManageCfg.supplyMan;
        var keys = Object.keys(supplyMan).sort();
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            var element = supplyMan[key];
            var buyBtn = this._buyBtnList[index];
            var sidx = String(index + 1);
            var bnum = buyinfo[sidx];
            var limit = element.limit;
            if (bnum && bnum >= limit) {
                App.DisplayUtil.changeToGray(buyBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(buyBtn);
            }
        }
    };
    ManageTraderPopupView.prototype.buyHandler = function (param) {
        var buyinfo = Api.manageVoApi.getBuyInfo();
        var bnum = buyinfo["" + param];
        var supplyMan = Config.ManageCfg.supplyMan["" + param];
        var limit = supplyMan.limit;
        if ((bnum && bnum >= limit) || !Api.manageVoApi.isShowTraderRed()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_timesTip"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < supplyMan.needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE), this.buyCallback, this);
        NetManager.request(NetRequestConst.REQUEST_MANAGE_BUYFINANCE, { supplyid: param + 1 });
    };
    ManageTraderPopupView.prototype.buyCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE), this.buyCallback, this);
        var ret = event.data.data.ret;
        if (ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_success"));
            this.refreshBtnStatus();
            var rList = GameData.formatRewardItem(event.data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_fail"));
        }
        // this.hide();
    };
    ManageTraderPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "manage_traderbg",
        ]);
    };
    ManageTraderPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    ManageTraderPopupView.prototype.dispose = function () {
        this._buyBtnList = [];
        _super.prototype.dispose.call(this);
    };
    return ManageTraderPopupView;
}(PopupView));
__reflect(ManageTraderPopupView.prototype, "ManageTraderPopupView");
