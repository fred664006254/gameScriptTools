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
 * 称帝战商店item
 * author qianjun
 * @class EmperorWarRewardScrollItem
 */
var EmperorWarShopScrollItem = (function (_super) {
    __extends(EmperorWarShopScrollItem, _super);
    function EmperorWarShopScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._limitTxt = null;
        return _this;
    }
    Object.defineProperty(EmperorWarShopScrollItem.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarShopScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 161 + this.getSpaceX();
        view.height = 224;
        var rIcons = data.rewardIcons;
        var length = rIcons.length;
        var xbg = BaseBitmap.create("public_9_bg4");
        xbg.width = 161;
        xbg.height = 224;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, xbg, view);
        view.addChild(xbg);
        var bg = BaseBitmap.create("public_9_bg_35");
        bg.width = 161;
        bg.height = view.height;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, view);
        view.addChild(bg);
        var topBg = BaseBitmap.create("public_9_cell_title");
        topBg.width = 161;
        topBg.height = 20;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, bg);
        view.addChild(topBg);
        /*
        --sortId  显示顺序
        --limit  限购次数  活动期间总次数  只有能参战的8人可购买
        --preCost  道具原价
        --buyCost  实际购买的价格
        --discount  折扣
        --content  内容和数量*/
        var item = rIcons[0];
        var bindData = item.bindData;
        var nameTxt = ComponentManager.getTextField(bindData.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, topBg);
        view.addChild(nameTxt);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, item, topBg, [0, topBg.height + 10]);
        view.addChild(item);
        //折扣
        if (data.discount) {
            var tag = BaseBitmap.create('empshop_tag');
            view.setLayoutPosition(LayoutConst.lefttop, tag, item);
            view.addChild(tag);
            var tagTxtStr = "";
            if (PlatformManager.checkIsTextHorizontal()) {
                var tagNumber = 100 - Number(data.discount) * 100;
                tagTxtStr = LanguageManager.getlocal('discountTitle', [String(tagNumber)]);
            }
            else {
                tagTxtStr = LanguageManager.getlocal('discountTitle', [(data.discount * 10).toString()]);
            }
            var tagTxt = ComponentManager.getTextField(tagTxtStr, 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10, 5]);
            if (PlatformManager.checkIsThSp()) {
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10, 15]);
            }
            if (PlatformManager.checkIsEnSp()) {
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10, 11]);
            }
            view.addChild(tagTxt);
        }
        //限购
        if (data.limit) {
            var curNum = data.limit - view.api.getBuyLimitnum(data.sortId);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('shopLimitBuy3', [curNum.toString()]), 20, TextFieldConst.COLOR_WHITE);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, item, [0, item.height]);
            view.addChild(limitTxt);
            view._limitTxt = limitTxt;
        }
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, '', view.buyItem, view, [data.sortId]);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view, [0, 10]);
        view.addChild(buyBtn);
        var ybao = GameData.getRewardItemVoByIdAndType(1);
        var itemicon = BaseLoadBitmap.create(ybao.icon);
        itemicon.setScale(0.4);
        var costTxt = ComponentManager.getTextField(data.buyCost.toString(), 20, TextFieldConst.COLOR_BLACK);
        var space = (buyBtn.width - 40 - costTxt.textWidth) / 2;
        view.setLayoutPosition(LayoutConst.lefttop, itemicon, buyBtn, [space, 3], true);
        buyBtn.addChild(itemicon);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, buyBtn, [itemicon.x + 40, 0], true);
        buyBtn.addChild(costTxt);
    };
    EmperorWarShopScrollItem.prototype.buyItem = function (shopId) {
        var view = this;
        if (!view.api.isCanJoinWar()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarShopNot"));
            return;
        }
        var curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < view._data.buyCost) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY), view.buyCallBack, view);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_BUY, {
            version: view.api.emperorwarActiveVo.version,
            shopId: shopId
        });
    };
    EmperorWarShopScrollItem.prototype.buyCallBack = function (evt) {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY), view.buyCallBack, view);
        if (evt.data.ret) {
            var data = evt.data;
            if (data.data.ret < 0) {
                return;
            }
            if (data.data.data.myemperor) {
                Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
            }
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            var pos = view._limitTxt.localToGlobal(view._limitTxt.textWidth + 20, 20);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            var curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
            view._limitTxt.text = LanguageManager.getlocal('shopLimitBuy3', [curNum.toString()]);
        }
    };
    EmperorWarShopScrollItem.prototype.getSpaceX = function () {
        return 20;
    };
    /**
     * 不同格子Y间距
     */
    EmperorWarShopScrollItem.prototype.getSpaceY = function () {
        return 15;
    };
    EmperorWarShopScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY), this.buyCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return EmperorWarShopScrollItem;
}(ScrollListItem));
__reflect(EmperorWarShopScrollItem.prototype, "EmperorWarShopScrollItem");
//# sourceMappingURL=EmperorWarShopScrollItem.js.map