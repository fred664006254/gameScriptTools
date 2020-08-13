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
 * desc : 积分兑换itemrender
 */
var AcCrossServerHegemonyFlagScrollList4 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagScrollList4, _super);
    function AcCrossServerHegemonyFlagScrollList4() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._icon = null;
        _this._curIdx = 0;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList4.prototype, "api", {
        get: function () {
            return Api.crossServerHegemonyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagScrollList4.prototype.initItem = function (index, data, itemparam) {
        // let view = this;
        this._aid = itemparam.aid;
        this._code = itemparam.code;
        // this.width = 200 + this.getSpaceX();
        // this.height = 272 + this.getSpaceY();
        this._data = data;
        this._curIdx = index;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var item;
        item = GameData.formatRewardItem(data.sell)[0];
        var wordsBg = BaseBitmap.create("accshegemony_shopitembg"); // acsingledayitembg  zqfshopitembg
        wordsBg.width = 204;
        wordsBg.height = 287;
        this.width = wordsBg.width;
        this.height = wordsBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordsBg, this);
        this.addChild(wordsBg);
        // let itemBg2:BaseBitmap = BaseBitmap.create("public_up3");
        // itemBg2.width = 153;
        // itemBg2.height = 30
        // itemBg2.x = 5;
        // itemBg2.y = 5;
        // this.addChild(itemBg2);
        var itemNameTF = ComponentManager.getTextField(item.name, 22, item.nameColor);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTF, wordsBg, [0, 32]);
        this.addChild(itemNameTF);
        var icon = GameData.getItemIcon(item, true);
        icon.width = icon.height = 106;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, itemNameTF, [0,itemNameTF.textHeight + 10]);
        icon.x = this.width / 2 - icon.width / 2;
        icon.y = 60;
        this.addChild(icon);
        this._icon = icon;
        // let line = BaseBitmap.create("accshegemony_shopitemline");
        // line.x = this.width/2 - line.width/2;
        // line.y = 172 - line.height/2;
        // this.addChild(line);
        //限购
        var buyNum = this.vo.getFlagShopPointBuyItemNum(data.id);
        var curNum = data.limitNum - buyNum;
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossServerHegemonyRewardFightScoreTip', [String(curNum), String(TextFieldConst.COLOR_WARN_GREEN)]), 22, TextFieldConst.COLOR_WHITE);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 7]);
        limitTxt.x = this.width / 2 - limitTxt.width / 2;
        limitTxt.y = 193;
        this.addChild(limitTxt);
        this._limitTxt = limitTxt;
        if (data.limitType == 0) {
            this._limitTxt.visible = false;
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", this.buyHandler, this, null, null, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0, 20]);
        var cost = 0;
        if (data.limitType == 0) {
            cost = data.cost[0];
        }
        else {
            cost = (this._data.cost.length <= buyNum ? this._data.cost[this._data.cost.length - 1] : this._data.cost[buyNum]);
            if (this._data.limitNum > 0) {
                if (buyNum >= this._data.limitNum) {
                    cost = this._data.cost.length > this._data.limitNum ? this._data.cost[this._data.limitNum - 1] : this._data.cost[this._data.cost.length - 1];
                }
            }
        }
        btn.setText(LanguageManager.getlocal("acCrossServerHegemonyFlagFightScoreBtn", ["" + cost]), false);
        // if(!this.vo.isCanJoin()){
        // 	btn.setEnable(false);
        // } 
        this.addChild(btn);
        this._buyBtn = btn;
        if (!this.vo.isInActivity() || (data.limitType != 0 && this._data.limitNum > 0 && curNum <= 0) || this.vo.getScore() < cost) {
            btn.setGray(true);
        }
    };
    AcCrossServerHegemonyFlagScrollList4.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // let view = this;
        if (this._data.limitType != 0 && this._data.limitNum > 0) {
            var curNum = this._data.limitNum - this.vo.getFlagShopPointBuyItemNum(this._data.id);
            if (curNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
                return;
            }
        }
        var buyNum = this.vo.getFlagShopPointBuyItemNum(this._data.id);
        var cost = this._data.cost.length <= buyNum ? this._data.cost[this._data.cost.length - 1] : this._data.cost[buyNum];
        if (this._data.limitType == 0) {
            cost = this._data.cost[0];
        }
        if (this.vo.getScore() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acCrossServerHegemonyFlagNotEnough'));
            return;
        }
        // if(this.vo.getActPoints() < this._data.costScore){
        //     App.CommonUtil.showTip(LanguageManager.getlocal('acPunishShopTip2'));
        //     return;
        // }
        // this.api.setScoreClickIdx('b', this._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP, {
            activeId: this.vo.aidAndCode,
            itemKey: this._data.id,
            enum: 1,
        });
    };
    //弹出消费提示框显示确认
    // private confirmCallbackHandler(): void
    // {
    // 	let view = this;
    //     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
    //         // activeId : view.acTivityId,
    //         shopId : view._data.id
    //     });	
    // }
    // protected eventCollectHandlerCallBack(event:egret.Event)
    // {
    // 	// let view = this;
    // 	let rData = event.data.data.data;
    // 	if(!rData){
    //         App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
    //         return;
    //     }
    //     // //this.update();
    //     // let rewards = rData.rewards
    //     // let rewardList =  GameData.formatRewardItem(rewards);
    //     // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
    // 	// App.CommonUtil.playRewardFlyAction(rewardList,pos);
    // 	let data = event.data;
    // 	let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //     let pos = this._buyBtn.localToGlobal(this._buyBtn.width/2, 20);
    //     App.CommonUtil.playRewardFlyAction(rewardList, pos);
    //     let curNum = this._data.limit - this.vo.getShopPointBuyItemNum(this._data.id);
    // 	this._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]);
    // 	if(curNum <= 0){
    // 		if(this._buyBtn){
    // 			this._buyBtn.setEnable(false);
    // 		}
    // 	}
    //     this.setLayoutPosition(LayoutConst.horizontalCentertop, this._limitTxt, this._buyBtn, [0, this._buyBtn.height + 5]);
    // }
    AcCrossServerHegemonyFlagScrollList4.prototype.getSpaceX = function () {
        return 0;
    };
    AcCrossServerHegemonyFlagScrollList4.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossServerHegemonyFlagScrollList4.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._icon = null;
        this._curIdx = 0;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagScrollList4;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyFlagScrollList4.prototype, "AcCrossServerHegemonyFlagScrollList4");
//# sourceMappingURL=AcCrossServerHegemonyFlagScrollList4.js.map