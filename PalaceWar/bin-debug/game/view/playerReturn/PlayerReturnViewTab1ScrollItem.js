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
 * desc : 回归签到itemrender
 */
var PlayerReturnViewTab1ScrollItem = (function (_super) {
    __extends(PlayerReturnViewTab1ScrollItem, _super);
    function PlayerReturnViewTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._lqBtn = null;
        _this._lqImg = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(PlayerReturnViewTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnViewTab1ScrollItem.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnViewTab1ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 608;
        view.height = 165 + 10;
        view._data = data;
        view._curIdx = index;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
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
        var datTxt = ComponentManager.getTextField(LanguageManager.getlocal("PlayerReturnSignDay", [data.days]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datTxt, line);
        view.addChild(datTxt);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem(data.getReward + "|" + data.getRewardVIP);
        var scroStartY = 45;
        var tmpX = 15;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, false);
            var signGet = BaseBitmap.create('playersign');
            // tmpX =  20+ index * (iconItem.width+10);
            if (index >= (rewardArr.length - data.getRewardVIP.split('|').length)) {
                var vipbg = BaseBitmap.create("playerreturnvipbg");
                iconItem.setLayoutPosition(LayoutConst.horizontalCentertop, vipbg, iconItem, [0, 0], true);
                iconItem.addChild(vipbg);
                var vipTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnVipCondition', [view.cfg.needVip.toString()]), 16, TextFieldConst.COLOR_QUALITY_YELLOW);
                iconItem.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, vipTxt, vipbg);
                iconItem.addChild(vipTxt);
                signGet.visible = view.api.isGetSignAllReward(view._data.key);
            }
            else {
                signGet.visible = view.api.isGetSignOdReward(view._data.key) || view.api.isGetSignAllReward(view._data.key);
            }
            iconItem.setScale(0.9);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            if (signGet.visible) {
                App.DisplayUtil.changeToGray(iconItem);
            }
            tmpX += (iconItem.width * iconItem.scaleX + 10);
            if (tmpX > (15 + 4 * 108 * iconItem.scaleX + 4 * 10)) {
                tmpX = 15;
                scroStartY += (iconItem.height * iconItem.scaleY + 10);
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 10);
            }
            view.addChild(iconItem);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, signGet, iconItem, [0, 0]);
            view.addChild(signGet);
        }
        scroStartY += (108 * 0.9);
        wordsBg.height = scroStartY + 10;
        view.height = wordsBg.height;
        //进度
        var curDay = view.api.getSignDay();
        var jinduTxt = ComponentManager.getTextField(curDay + "/" + data.days, 24, (curDay >= data.days ? 0x3e9b00 : TextFieldConst.COLOR_BLACK));
        view.setLayoutPosition(LayoutConst.righttop, jinduTxt, view, [70, 50]);
        view.addChild(jinduTxt);
        var lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.lqBtnClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, lqBtn, jinduTxt, [0, jinduTxt.textHeight + 10]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        var lqimg = BaseBitmap.create("signin_had_get");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
        view.addChild(lqimg);
        view._lqImg = lqimg;
        if (view.api.isGetSignAllReward(data.key)) {
            view._lqImg.visible = true;
            view._lqBtn.visible = false;
        }
        else {
            view._lqImg.visible = false;
            view._lqBtn.visible = true;
            if (view.api.isGetSignOdReward(data.key)) {
                lqBtn.setGray(Api.playerVoApi.getPlayerVipLevel() < view.cfg.needVip);
            }
            else {
                lqBtn.setGray(curDay < view._data.days);
            }
        }
        if (!view.api.isInActTime()) {
            lqBtn.setGray(true);
        }
        view._lqImg.visible = view.api.isGetSignAllReward(data.key);
        view._lqBtn.visible = !view._lqImg.visible;
    };
    PlayerReturnViewTab1ScrollItem.prototype.lqBtnClick = function (evt) {
        var view = this;
        if (view.api.isInActTime()) {
            if (Api.playerVoApi.getPlayerLevel() >= view.cfg.playerStatusneed) {
                var curDay = view.api.getSignDay();
                if (curDay >= view._data.days) {
                    if (view._lqBtn.getIsGray()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip4", [view.cfg.needVip.toString()]));
                    }
                    else {
                        view.api.setClickIdx(view._curIdx);
                        NetManager.request(NetRequestConst.REBACK_GETSIGNREWARD, {
                            "keyid": view._data.key
                        });
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip5"));
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip3", [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.playerStatusneed)]));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            view._lqBtn.setGray(true);
        }
    };
    PlayerReturnViewTab1ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (PlayerReturnViewTab1ScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        PlayerReturnViewTab1ScrollItem._lastReqIdx = null;
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        var data = event.data;
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var pos = view._lqBtn.localToGlobal(view._lqBtn.width / 2, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    PlayerReturnViewTab1ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    PlayerReturnViewTab1ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._lqBtn = null;
        view._lqImg = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    PlayerReturnViewTab1ScrollItem._lastReqIdx = null;
    PlayerReturnViewTab1ScrollItem._lastPos = null;
    return PlayerReturnViewTab1ScrollItem;
}(ScrollListItem));
__reflect(PlayerReturnViewTab1ScrollItem.prototype, "PlayerReturnViewTab1ScrollItem");
//# sourceMappingURL=PlayerReturnViewTab1ScrollItem.js.map