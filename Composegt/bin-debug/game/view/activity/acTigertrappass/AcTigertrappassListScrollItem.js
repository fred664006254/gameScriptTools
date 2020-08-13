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
 * author : qianjun
 * date : 2018.4.14
 * desc : 七夕活动充值奖励itemrender
 */
var AcTigertrappassListScrollItem = (function (_super) {
    __extends(AcTigertrappassListScrollItem, _super);
    function AcTigertrappassListScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTigertrappassListScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassListScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassListScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcTigertrappassView.AID + "-" + AcTigertrappassView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassListScrollItem.prototype, "skinHave", {
        get: function () {
            return Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange));
        },
        enumerable: true,
        configurable: true
    });
    AcTigertrappassListScrollItem.prototype.initItem = function (index, data) {
        this.index = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 518;
        bg.height = 137;
        this.addChild(bg);
        var name = "";
        var desc = "";
        var needCount = 1;
        if (index === 0) {
            name = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinName();
            desc = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinDesc();
            needCount = this.cfg.needChipNum;
            var bgItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).iconBg);
            bgItem.x = 17;
            bgItem.y = 12;
            this.addChild(bgItem);
            var iconItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).icon);
            iconItem.x = bgItem.x + 2;
            iconItem.y = bgItem.y + 2;
            iconItem.setScale(0.57);
            this.addChild(iconItem);
        }
        else if (index === 1) {
            var rewardInfoVo = new RewardItemVo();
            rewardInfoVo.initData(this.cfg.chipExchangeitem);
            name = rewardInfoVo.name;
            desc = rewardInfoVo.desc;
            needCount = 1;
            var iconItem = GameData.getItemIcon(rewardInfoVo);
            iconItem.x = 17;
            iconItem.y = 12;
            this.addChild(iconItem);
            // iconItem.setScale(84/108);
        }
        //名称
        var nameTxtBg = BaseBitmap.create("public_biaoti2");
        nameTxtBg.width = 185;
        nameTxtBg.x = 227 - nameTxtBg.width / 2;
        nameTxtBg.y = 33 - nameTxtBg.height / 2;
        this.addChild(nameTxtBg);
        var nameTxt = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTxt.x = nameTxtBg.x + nameTxtBg.width / 2 - nameTxt.width / 2;
        nameTxt.y = nameTxtBg.y + nameTxtBg.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        // 描述
        var descTxt = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.x = 130;
        descTxt.y = 60;
        descTxt.width = 220;
        this.addChild(descTxt);
        var costItemId = this.cfg.needChipid;
        var costItemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        if (index === 1 || !this.skinHave) {
            // 吕布皮肤碎片
            var ownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_own_item_count", [costItemCfg.name, String(costItemInfo ? costItemInfo.num : 0), String(needCount)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON - 2, TextFieldConst.COLOR_BROWN);
            ownTxt.x = Math.min(435 - ownTxt.width / 2, 506 - ownTxt.width);
            ownTxt.y = 25 - ownTxt.height / 2;
            this.addChild(ownTxt);
        }
        if (index === 0 && this.skinHave) {
            // 已兑换
            var skinHaveSign = BaseBitmap.create("tigertrappass_exchanged");
            skinHaveSign.x = 435 - skinHaveSign.width / 2;
            ;
            skinHaveSign.y = 70 - skinHaveSign.height / 2;
            this.addChild(skinHaveSign);
        }
        if (index === 1 || !this.skinHave) {
            // 兑换按钮
            var exchangeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.exchangeClick, this);
            exchangeButton.x = 435 - exchangeButton.width / 2;
            exchangeButton.y = 70 - exchangeButton.height / 2;
            this.addChild(exchangeButton);
        }
        if (index === 1 && !this.skinHave) {
            // 需要先兑换皮肤才行
            var skinFirstTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_need_exchange_skin_first2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED);
            skinFirstTxt.x = 435 - skinFirstTxt.width / 2;
            skinFirstTxt.y = 112 - skinFirstTxt.height / 2;
            this.addChild(skinFirstTxt);
        }
    };
    AcTigertrappassListScrollItem.prototype.exchangeClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.index === 0) {
            var costItemId = this.cfg.needChipid;
            var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            if (!costItemInfo || costItemInfo.num < this.cfg.needChipNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
            if (!Api.servantVoApi.getServantObj(String(Math.floor(Number(this.cfg.skinExchange) / 10)))) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_need_has_lvbu"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN, { activeId: this.acTivityId, rtype: 1 });
        }
        else if (this.index === 1) {
            if (!this.skinHave) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_need_exchange_skin_first1"));
                return;
            }
            var costItemId = this.cfg.needChipid;
            var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            if (!costItemInfo || costItemInfo.num < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN, { activeId: this.acTivityId, rtype: 2 });
        }
    };
    /**
     * 不同格子X间距
     */
    AcTigertrappassListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcTigertrappassListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcTigertrappassListScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTigertrappassListScrollItem;
}(ScrollListItem));
__reflect(AcTigertrappassListScrollItem.prototype, "AcTigertrappassListScrollItem");
