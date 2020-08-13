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
 * desc : 端午活动 累计充值itemrender
 */
var PlayerReturnViewTab3ScrollItem = (function (_super) {
    __extends(PlayerReturnViewTab3ScrollItem, _super);
    function PlayerReturnViewTab3ScrollItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        _this._lqBtn = null;
        _this._lqImg = null;
        _this._goBtn = null;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(PlayerReturnViewTab3ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnViewTab3ScrollItem.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnViewTab3ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        view.width = 608;
        view.height = 188 + 10;
        this._itemData = data.key - 1;
        this._curIdx = index;
        this._rechargeItem = data;
        // let objList = view.api.getArr(`recharge`);
        // this._rechargeItem = view.cfg.recharge[this._itemData]//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 10;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, view);
        view.addChild(wordsBg);
        var topbg = BaseBitmap.create("acmidautumnview_titlebg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, wordsBg, [0, 5]);
        view.addChild(topbg);
        var line = BaseBitmap.create("public_line3");
        line.width = 466;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, topbg);
        view.addChild(line);
        var datTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayTotal_recharge", [String(view._rechargeItem.needGem)]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datTxt, line);
        view.addChild(datTxt);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem("" + data.getReward);
        var scroStartY = 45;
        var tmpX = 15;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, false);
            iconItem.setScale(0.9);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > (15 + 4 * 108 * iconItem.scaleX + 4 * 10)) {
                tmpX = 15;
                scroStartY += iconItem.height * iconItem.scaleY + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 10);
            }
            view.addChild(iconItem);
        }
        scroStartY += (108 * 0.9);
        wordsBg.height = scroStartY + 45;
        view.height = wordsBg.height;
        //进度条
        view._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 570);
        view.addChild(this._progress);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._progress, wordsBg, [0, 10]);
        //领取
        var lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.eventCollectHandler, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, lqBtn, wordsBg, [7, 0]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        var lqimg = BaseBitmap.create("signin_had_get");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
        view.addChild(lqimg);
        view._lqImg = lqimg;
        //前往
        view._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acRechargeBoxPopupViewGoRecharge", view.goRechargeHandler, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._goBtn, lqBtn);
        view._goBtn.visible = false;
        view.addChild(view._goBtn);
        view.refreshBtnStatus();
        if (!view.api.isInActTime()) {
            lqBtn.setEnable(false);
            view._goBtn.setEnable(false);
        }
    };
    //刷新按钮状态
    PlayerReturnViewTab3ScrollItem.prototype.refreshBtnStatus = function () {
        var view = this;
        var tmpVo = view.api;
        if (!tmpVo) {
            return;
        }
        var chargeTotal = tmpVo.getChargeNum();
        view._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(chargeTotal), this._rechargeItem.needGem]));
        view._progress.setPercentage(chargeTotal / view._rechargeItem.needGem);
        if (chargeTotal >= view._rechargeItem.needGem) {
            view._lqImg.visible = view.api.isGetRecharge(view._rechargeItem.key);
            view._goBtn.visible = false;
            view._lqBtn.visible = !view._lqImg.visible;
        }
        else {
            view._lqImg.visible = view._lqBtn.visible = false;
            view._goBtn.visible = true;
            view._lqBtn.setGray(true);
        }
    };
    // protected eventCollectHandlerCallBack(event:egret.Event)
    // {
    //     let rData = event.data.data.data;
    //     if(!rData){
    //         App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
    //         return;
    //     }
    //     if(PlayerReturnViewTab3ScrollItem._lastReqIdx != this._curIdx)
    //     {
    //         return;
    //     }
    //     PlayerReturnViewTab3ScrollItem._lastReqIdx = null;
    //     this.refreshUI();
    //     let rewards = rData.rewards
    //     let rewardList =  GameData.formatRewardItem(rewards);
    //     let pos = PlayerReturnViewTab3ScrollItem._lastPos;
    //     App.CommonUtil.playRewardFlyAction(rewardList,pos);
    // }
    PlayerReturnViewTab3ScrollItem.prototype.eventCollectHandler = function (event) {
        var view = this;
        if (view.api.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        view.api.setClickIdx(view._curIdx);
        NetManager.request(NetRequestConst.REBACK_GETRECHARGEREWARD, {
            "keyid": view._rechargeItem.key
        });
        // PlayerReturnViewTab3ScrollItem._lastReqIdx = this._curIdx;
        // PlayerReturnViewTab3ScrollItem._lastPos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE,{activeId:this.acTivityId,rechargeId:this._itemData + 1})
    };
    PlayerReturnViewTab3ScrollItem.prototype.goRechargeHandler = function (event) {
        var view = this;
        if (view.api.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    PlayerReturnViewTab3ScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    PlayerReturnViewTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    PlayerReturnViewTab3ScrollItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        var view = this;
        view._itemData = null;
        view._progress = null;
        view._curIdx = 0;
        view._rechargeItem = null;
        view._lqBtn = null;
        view._lqImg = null;
        view._goBtn = null;
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnViewTab3ScrollItem;
}(ScrollListItem));
__reflect(PlayerReturnViewTab3ScrollItem.prototype, "PlayerReturnViewTab3ScrollItem");
//# sourceMappingURL=PlayerReturnViewTab3ScrollItem.js.map