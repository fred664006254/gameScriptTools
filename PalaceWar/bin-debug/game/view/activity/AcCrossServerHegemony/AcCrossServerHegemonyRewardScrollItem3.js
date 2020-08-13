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
var AcCrossServerHegemonyRewardScrollItem3 = (function (_super) {
    __extends(AcCrossServerHegemonyRewardScrollItem3, _super);
    function AcCrossServerHegemonyRewardScrollItem3() {
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
    Object.defineProperty(AcCrossServerHegemonyRewardScrollItem3.prototype, "api", {
        get: function () {
            return Api.crossServerHegemonyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRewardScrollItem3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRewardScrollItem3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRewardScrollItem3.prototype.initItem = function (index, data, itemparam) {
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
        var wordsBg = BaseBitmap.create("accshegemony_shopitembg"); // accshegemony_shopitembg 
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
        var buyNum = this.vo.getShopPointBuyItemNum(data.id);
        var curNum = data.limitNum - buyNum;
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossServerHegemonyRewardFightScoreTip', [String(curNum), String(TextFieldConst.COLOR_WARN_GREEN)]), 22, TextFieldConst.COLOR_WHITE);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 7]);
        limitTxt.x = this.width / 2 - limitTxt.width / 2;
        limitTxt.y = 193;
        this.addChild(limitTxt);
        this._limitTxt = limitTxt;
        if (data.limitNum == 0) {
            this._limitTxt.visible = false;
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", this.buyHandler, this, null, null, null, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0, 20]);
        // let cost = data.cost[buyNum];
        var cost = this._data.cost.length <= buyNum ? this._data.cost[this._data.cost.length - 1] : this._data.cost[buyNum];
        if (this._data.limitNum > 0) {
            if (buyNum >= this._data.limitNum) {
                cost = this._data.cost.length > this._data.limitNum ? this._data.cost[this._data.limitNum - 1] : this._data.cost[this._data.cost.length - 1];
            }
        }
        btn.setText(LanguageManager.getlocal("acCrossServerHegemonyRewardFightScoreBtn", [cost]), false);
        this.addChild(btn);
        this._buyBtn = btn;
        // if(!this.vo.isCanJoin()){
        // 	btn.setEnable(false);
        // }
        if (!this.vo.isInActivity() || (this._data.limitNum > 0 && curNum <= 0) || this.vo.getResultScore() < cost) {
            btn.setGray(true);
        }
    };
    AcCrossServerHegemonyRewardScrollItem3.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // let view = this;
        if (this._data.limitNum > 0) {
            var curNum = this._data.limitNum - this.vo.getShopPointBuyItemNum(this._data.id);
            if (curNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
                return;
            }
        }
        var buyNum = this.vo.getShopPointBuyItemNum(this._data.id);
        // let cost = this._data.cost[buyNum];
        var cost = this._data.cost.length <= buyNum ? this._data.cost[this._data.cost.length - 1] : this._data.cost[buyNum];
        if (this.vo.getResultScore() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishShopTip2'));
            return;
        }
        // this.api.setScoreClickIdx('b', this._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP, {
            activeId: this.vo.aidAndCode,
            itemKey: this._data.id,
            enum: 1,
        });
    };
    //弹出消费提示框显示确认
    AcCrossServerHegemonyRewardScrollItem3.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.id
        });
    };
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
    //     let curNum = this._data.limitNum - this.vo.getShopPointBuyItemNum(this._data.id);
    // 	this._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]);
    // 	if(curNum <= 0){
    // 		if(this._buyBtn){
    // 			this._buyBtn.setEnable(false);
    // 		}
    // 	}
    //     this.setLayoutPosition(LayoutConst.horizontalCentertop, this._limitTxt, this._buyBtn, [0, this._buyBtn.height + 5]);
    // }
    AcCrossServerHegemonyRewardScrollItem3.prototype.getSpaceX = function () {
        return 0;
    };
    AcCrossServerHegemonyRewardScrollItem3.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossServerHegemonyRewardScrollItem3.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._icon = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRewardScrollItem3;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyRewardScrollItem3.prototype, "AcCrossServerHegemonyRewardScrollItem3");
//# sourceMappingURL=AcCrossServerHegemonyRewardScrollItem3.js.map