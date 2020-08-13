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
 * 金蛋赠礼活动详情tab1
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab1
 */
var AcSmashEggDetailPopupViewTab1 = (function (_super) {
    __extends(AcSmashEggDetailPopupViewTab1, _super);
    //滑动列表
    function AcSmashEggDetailPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this._oneBtn = null;
        _this._isPlay = false;
        _this._isPlayTen = false;
        _this._curItem = null;
        _this._curMoney = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcSmashEggDetailPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggDetailPopupViewTab1.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 3:
            case 4:
                code = "3";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcSmashEggDetailPopupViewTab1.prototype.initView = function () {
        var code = this.getUiCode();
        this.height = 620;
        this.width = 545;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY, this.buyHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.refreshView, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        this.addChild(Bg);
        var vo = this.vo;
        var shopBg = BaseBitmap.create('smashegg_shopbg-' + this.getUiCode());
        shopBg.setPosition(Bg.x + 5, Bg.y + 5);
        shopBg.width = Bg.width - 10;
        this.addChild(shopBg);
        var itemNameBg = BaseBitmap.create("fourpeople_bottom");
        itemNameBg.setPosition(shopBg.x + shopBg.width / 2 - itemNameBg.width / 2, shopBg.y + 20);
        this.addChild(itemNameBg);
        var itemName = ComponentManager.getTextField(LanguageManager.getlocal('itemName_' + this.cfg.useItem), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        itemName.setPosition(itemNameBg.x + itemNameBg.width / 2 - itemName.width / 2, itemNameBg.y + itemNameBg.height / 2 - itemName.height / 2);
        this.addChild(itemName);
        var icon = "smashegg_hammer-" + code;
        if (Number(this.getUiCode()) == 3) {
            icon = "smashegg_hammer2-3";
        }
        var hammerIcon = BaseBitmap.create(icon);
        this.addChild(hammerIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, hammerIcon, shopBg, [5, -10]);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.useItem);
        this._curItem = ComponentManager.getTextField(LanguageManager.getlocal('acSmashEggCurItemNum', [String(hasNum) || '0']), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._curItem.setPosition(shopBg.x + shopBg.width / 2 - this._curItem.width / 2, shopBg.y + shopBg.height - this._curItem.height / 2 - 25);
        this.addChild(this._curItem);
        var bottomBg = BaseBitmap.create("public_9_bg14");
        bottomBg.width = shopBg.width - 10;
        bottomBg.height = shopBg.height + 20;
        bottomBg.setPosition(shopBg.x + shopBg.width / 2 - bottomBg.width / 2, shopBg.y + shopBg.height + 5);
        this.addChild(bottomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = bottomBg.width - 30;
        descBg.setPosition(bottomBg.x + bottomBg.width / 2 - descBg.width / 2, bottomBg.y + 15);
        this.addChild(descBg);
        var effStr = LanguageManager.getlocal("effectTitle") + LanguageManager.getlocal("itemDesc_" + this.cfg.useItem);
        var descEff = ComponentManager.getTextField(effStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.addChild(descEff);
        descEff.width = descBg.width - 40;
        descEff.setPosition(descBg.x + descBg.width / 2 - descEff.width / 2, descBg.y + 15);
        var sourceStr = LanguageManager.getlocal('dropTitle') + LanguageManager.getlocal("itemDropDesc_" + this.cfg.useItem);
        var descSource = ComponentManager.getTextField(sourceStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.addChild(descSource);
        descSource.width = descBg.width - 40;
        descSource.setPosition(descBg.x + descBg.width / 2 - descSource.width / 2, descEff.y + descEff.height + 15);
        descBg.height = descSource.y + descSource.height - descBg.y + 15;
        //一次相关
        //按钮
        this._oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSmashEggOneBtn-" + this.code, this.oneBtnBuy, this, [1]);
        this._oneBtn.setPosition(bottomBg.x + 60, bottomBg.y + bottomBg.height - this._oneBtn.height - 80);
        this.addChild(this._oneBtn);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 36;
        oneGemBM.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - oneGemBM.width, this._oneBtn.y - oneGemBM.height);
        this.addChild(oneGemBM);
        var costOne = GameData.formatRewardItem(this.cfg.buy1.cost)[0].num;
        var oneNeedNumTF = ComponentManager.getTextField(String(costOne), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - oneNeedNumTF.height / 2);
        this.addChild(oneNeedNumTF);
        //十次相关
        //按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSmashEggTenBtn-" + this.code, this.oneBtnBuy, this, [2]);
        tenBtn.setPosition(bottomBg.x + bottomBg.width - tenBtn.width - 60, bottomBg.y + bottomBg.height - this._oneBtn.height - 80);
        this.addChild(tenBtn);
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 36;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height);
        this.addChild(tenGemBM);
        var costTen = GameData.formatRewardItem(this.cfg.buy2.cost)[0].num;
        var tenNeedGemTF = ComponentManager.getTextField(String(costTen), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
        this.addChild(tenNeedGemTF);
        var moneyBg = BaseBitmap.create("public_9_mainicontimebg");
        moneyBg.width = bottomBg.width / 3 + 40;
        moneyBg.height = 30;
        moneyBg.setPosition(bottomBg.x + bottomBg.width / 2 - moneyBg.width / 2 + 10, tenBtn.y + tenBtn.height + 25);
        this.addChild(moneyBg);
        var gemBM = BaseBitmap.create("public_icon1");
        gemBM.width = 50;
        gemBM.height = 46;
        gemBM.setPosition(moneyBg.x - gemBM.width + 15, moneyBg.y - 10);
        this.addChild(gemBM);
        var moneyStr = LanguageManager.getlocal("acSmashEggCurMoneyNum", [String(Api.playerVoApi.getPlayerGem())]);
        this._curMoney = ComponentManager.getTextField(moneyStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._curMoney.setPosition(moneyBg.x + moneyBg.width / 2 - this._curMoney.width / 2 + 5, moneyBg.y + moneyBg.height / 2 - this._curMoney.height / 2);
        this.addChild(this._curMoney);
        // let mustTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_Must-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // mustTF.setPosition(tenBtn.x + tenBtn.width / 2 - mustTF.width / 2, tenBtn.y - mustTF.height - 5);
        // this.addChild(mustTF);
    };
    /**一次抽奖 */
    AcSmashEggDetailPopupViewTab1.prototype.oneBtnBuy = function (buyType) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var type = Number(buyType);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            var cost = cfg.getCost(type);
            if (Api.playerVoApi.getPlayerGem() < cost) {
                this.showRechargeTipView();
                this._isPlay = false;
                return;
            }
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY, { activeId: vo.aidAndCode, buyType: type });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    AcSmashEggDetailPopupViewTab1.prototype.buyHandler = function (event) {
        this._isPlay = false;
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            this.refreshView();
        }
        //刷新锤子数量
    };
    AcSmashEggDetailPopupViewTab1.prototype.refreshView = function () {
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.useItem);
        this._curItem.text = LanguageManager.getlocal('acSmashEggCurItemNum', [String(hasNum) || '0']);
        this._curMoney.text = LanguageManager.getlocal("acSmashEggCurMoneyNum", [String(Api.playerVoApi.getPlayerGem())]);
    };
    AcSmashEggDetailPopupViewTab1.prototype.showRechargeTipView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "sweetgiftTipTitle",
            msg: LanguageManager.getlocal("sweetgiftTipMsg"),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler: this,
            needCancel: true,
        });
    };
    AcSmashEggDetailPopupViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY, this.buyHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.refreshView, this);
        this._curItem = null;
        this._curMoney = null;
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcSmashEggDetailPopupViewTab1.prototype, "AcSmashEggDetailPopupViewTab1");
//# sourceMappingURL=AcSmashEggDetailPopupViewTab1.js.map