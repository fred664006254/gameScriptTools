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
 * desc : 端午活动 节日任务itemrender
 */
var PlayerReturnViewTab2ScrollItem = (function (_super) {
    __extends(PlayerReturnViewTab2ScrollItem, _super);
    function PlayerReturnViewTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._lqBtn = null;
        _this._lqImg = null;
        _this._goBtn = null;
        _this._needTxt = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(PlayerReturnViewTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnViewTab2ScrollItem.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnViewTab2ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 608;
        view.height = 180 + 10;
        view._data = data;
        view._curIdx = index;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var wordsBg = BaseBitmap.create("activity_db_01");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 10;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, view);
        view.addChild(wordsBg);
        // let topbg : BaseBitmap = BaseBitmap.create("acmidautumnview_titlebg");  
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, wordsBg, [0,5]);
        // view.addChild(topbg); 
        var line = BaseBitmap.create("activity_charge_red");
        line.width = 384;
        line.y = 3;
        this.addChild(line);
        var datTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.questType == 1) {
            datTxt.text = LanguageManager.getlocal("acSpringceleBrationLand1", [data.value + ""]);
        }
        else if (data.questType == 2) {
            datTxt.text = LanguageManager.getlocal("acSpringceleBrationquestType2", [data.value + ""]);
        }
        else {
            datTxt.text = LanguageManager.getlocal("acSpringceleBrationquestType" + data.questType, [data.value + ""]);
        }
        view.setLayoutPosition(LayoutConst.leftverticalCenter, datTxt, line, [20, 0]);
        view.addChild(datTxt);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem("" + data.getReward);
        var scroStartY = 45;
        var tmpX = 15;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, false);
            iconItem.setScale(0.8);
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
        scroStartY += (108 * 0.8);
        wordsBg.height = scroStartY + 20;
        view.height = wordsBg.height;
        //当前进度（0／1）
        var jinduTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        jinduTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
        if (data.questType == 1) {
            jinduTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);
        }
        view.setLayoutPosition(LayoutConst.righttop, jinduTxt, view, [80, 40]);
        view.addChild(jinduTxt);
        view._needTxt = jinduTxt;
        //领取
        var lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.collectHandler, view);
        view.setLayoutPosition(LayoutConst.righttop, lqBtn, view, [10, 70]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        var lqimg = BaseBitmap.create("collectflag");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
        view.addChild(lqimg);
        view._lqImg = lqimg;
        //前往
        view._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskGoBtn", view.collectHandler, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._goBtn, lqBtn);
        view._goBtn.visible = false;
        view.addChild(view._goBtn);
        view.update();
        if (!view.api.isInActTime()) {
            lqBtn.setEnable(false);
            view._goBtn.setEnable(false);
        }
    };
    PlayerReturnViewTab2ScrollItem.prototype.collectHandler = function (evt) {
        var view = this;
        var api = view.api;
        if (!api) {
            return;
        }
        var taskNum = api.getTask(view._data.questType);
        // if(vo.isStart==false)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        // 	return;
        // }   
        if (view.api.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (taskNum >= view._data.value) {
            view.api.setClickIdx(view._curIdx);
            NetManager.request(NetRequestConst.REBACK_GETTASKREWARD, {
                "keyid": view._data.key
            });
            // PlayerReturnViewTab2ScrollItem._lastReqIdx = this._curIdx;
            // PlayerReturnViewTab2ScrollItem._lastPos = this._needTxt.localToGlobal(this._needTxt.width, 20);
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBTASK,{"activeId":this.acTivityId, "taskId":""+this._data.key});
        }
        else {
            if (view._data.questType == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                return;
            }
            if (!view._data.openType) {
                return;
            }
            var openType = this._data.openType;
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "") {
                PlayerBottomUI.getInstance().show();
            }
            else {
                if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                    if (!isShowNpc) {
                        var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                        App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                        return;
                    }
                }
                if (egret.getDefinitionByName(viewName + "View")) {
                    ViewController.getInstance().openView(viewName + "View");
                }
                else if (egret.getDefinitionByName(viewName + "PopupView")) {
                    ViewController.getInstance().openView(viewName + "PopupView");
                }
                else {
                    if (openType == "recharge") {
                        ViewController.getInstance().openView(viewName + "Vip" + "View");
                    }
                }
            }
        }
    };
    PlayerReturnViewTab2ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        // let rData = event.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
        // if ( PlayerReturnViewTab2ScrollItem._lastReqIdx != this._curIdx)
        // {
        //     return;
        // }
        // PlayerReturnViewTab2ScrollItem._lastReqIdx = null;
        // this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos = PlayerReturnViewTab2ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
    };
    PlayerReturnViewTab2ScrollItem.prototype.update = function () {
        var view = this;
        var api = view.api;
        if (!api) {
            return;
        }
        var taskNum = api.getTask(view._data.questType);
        if (view._needTxt) {
            if (taskNum >= view._data.value) {
                view._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [taskNum + "", view._data.value + ""]);
            }
            else {
                view._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [taskNum + "", view._data.value + ""]);
            }
            view.setLayoutPosition(LayoutConst.righttop, view._needTxt, view, [70, 50]);
        }
        if (view._lqBtn) {
            if (taskNum >= view._data.value) {
                view._lqImg.visible = view.api.isGetTaskReward(view._data.key);
                view._goBtn.visible = false;
                view._lqBtn.visible = view._needTxt.visible = !view._lqImg.visible;
            }
            else {
                view._needTxt.visible = true;
                view._lqImg.visible = false;
                view._lqBtn.visible = view._data.questType == 1;
                view._goBtn.visible = !view._lqBtn.visible;
                view._lqBtn.setGray(true);
            }
        }
    };
    PlayerReturnViewTab2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    PlayerReturnViewTab2ScrollItem.prototype.dispose = function () {
        var view = this;
        view._lqBtn = null;
        view._lqImg = null;
        view._goBtn = null;
        view._needTxt = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBTASK),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnViewTab2ScrollItem;
}(ScrollListItem));
__reflect(PlayerReturnViewTab2ScrollItem.prototype, "PlayerReturnViewTab2ScrollItem");
