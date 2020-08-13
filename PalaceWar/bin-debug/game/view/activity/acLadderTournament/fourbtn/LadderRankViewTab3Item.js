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
var LadderRankViewTab3Item = (function (_super) {
    __extends(LadderRankViewTab3Item, _super);
    function LadderRankViewTab3Item() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._itemCfg = null;
        _this._flag = null;
        _this.vo = null;
        return _this;
    }
    LadderRankViewTab3Item.prototype.initItem = function (index, cfg, itemparam) {
        var view = this;
        view.width = 205;
        this._itemCfg = cfg;
        var itemCfg = cfg;
        this.vo = itemparam;
        var bg = BaseBitmap.create("acsingledayitembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rewardvo = GameData.formatRewardItem(itemCfg.item)[0];
        var nameTxt = ComponentManager.getTextField(rewardvo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x + (bg.width - nameTxt.width) / 2, bg.y + 30);
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);
        var icon = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nameTxt.y + nameTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        var limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_task_timesdesc" + itemCfg.limitType, [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        limitTxt.width = 170;
        limitTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
        view._limitTxt = limitTxt;
        var rectd = new egret.Rectangle(0, 0, 40, 38);
        var costicon = BaseLoadBitmap.create("ladder_training_small", rectd);
        costicon.setPosition(70, 186);
        view.addChild(costicon);
        //原价
        var needNum = String(itemCfg.price);
        var originPriceTxt = ComponentManager.getTextField(needNum, 20, TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        originPriceTxt.setPosition(costicon.x + costicon.width, 195);
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;
        var flag = BaseBitmap.create("battlepasscollect3-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;
        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;
        this.tick();
    };
    LadderRankViewTab3Item.prototype.refreshItem = function (rewards) {
        var view = this;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text = LanguageManager.getlocal("acLadder_task_timesdesc" + itemCfg.limitType, [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;
        }
        if (rewards) {
            var rewardList = GameData.formatRewardItem(rewards);
            var pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
        this.tick();
    };
    LadderRankViewTab3Item.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._itemCfg;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var limitNum = itemcfg.limit - view.vo.getShopNum(itemcfg.id);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        var hasNum = Api.laddertournamentVoApi.getShopscore();
        var needNum = String(this._itemCfg.price);
        var cost = hasNum - Number(needNum);
        if (cost < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_Point_less"));
            return;
        }
        view.vo.selIdx = view._index;
        NetManager.request(NetRequestConst.REQUEST_LT_SHOPBUY, {
            activeId: view.vo.aidAndCode,
            rkey: itemcfg.id,
        });
    };
    /**
     * 不同格子Y间距
     */
    LadderRankViewTab3Item.prototype.getSpaceY = function () {
        return 5;
    };
    LadderRankViewTab3Item.prototype.tick = function () {
        var view = this;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text = LanguageManager.getlocal("acLadder_task_timesdesc" + itemCfg.limitType, [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;
            if (limitNum <= 0) {
                if (itemCfg.limitType == 1) {
                    if (Api.laddertournamentVoApi.isTodayFinalDay() == false) {
                        var lessTime = Api.laddertournamentVoApi.getTodayLessTime();
                        view._limitTxt.text = LanguageManager.getlocal("acLadder_refresh_time", [App.DateUtil.getFormatBySecond(lessTime, 5)]);
                    }
                }
                else if (itemCfg.limitType == 2) {
                    if (Api.laddertournamentVoApi.getNowturn() < 4) {
                        var lessTime = Api.laddertournamentVoApi.getNowturnLessTime();
                        view._limitTxt.text = LanguageManager.getlocal("acLadder_refresh_time", [App.DateUtil.getFormatBySecond(lessTime, 5)]);
                    }
                }
            }
        }
    };
    LadderRankViewTab3Item.prototype.dispose = function () {
        this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        this.vo = null;
        _super.prototype.dispose.call(this);
    };
    return LadderRankViewTab3Item;
}(ScrollListItem));
__reflect(LadderRankViewTab3Item.prototype, "LadderRankViewTab3Item");
//# sourceMappingURL=LadderRankViewTab3Item.js.map