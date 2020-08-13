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
/*
author : qinajun
date : 2018.4.14
desc : 珍器坊 好友差事
*/
var ZhenqifangViewTab2 = (function (_super) {
    __extends(ZhenqifangViewTab2, _super);
    function ZhenqifangViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._allbtn = null;
        _this._alltipTxt = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(ZhenqifangViewTab2.prototype, "cfg", {
        get: function () {
            return Config.ZhenqifangCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangViewTab2.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangViewTab2.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT, { clear: true, friend: 1 });
        Api.zhenqifangVoApi.friendsendList = [];
        Api.zhenqifangVoApi.friendobj = {};
        // let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
        // if(historylist){
        // 	for(let i in historylist){
        // 		let unit = historylist[i];
        // 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
        // 			data : unit,
        // 			index : i
        // 		});
        // 	}
        // }
    };
    ZhenqifangViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD), view.rewardCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHFTASK), view.update, view);
        var baseview = ViewController.getInstance().getView('ZhenqifangView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        // let freeTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeTxt, view, [55, 20], true);
        // view.addChild(freeTxt)
        // view._freeTxt = freeTxt;
        var freshTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip3", [App.DateUtil.formatSvrHourByLocalTimeZone(0).hour + '']), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freshTxt, view, [0, 20], true);
        view.addChild(freshTxt);
        var listbg = BaseBitmap.create("public_9_bg43");
        listbg.width = 600;
        listbg.height = view.height - 190;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0, 50], true);
        view.addChild(listbg);
        // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip4`), 20, TextFieldConst.COLOR_BLACK);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 10]);
        // view.addChild(tipTxt)
        var arr = view.api.getCurFTaskarr();
        var tmpRect = new egret.Rectangle(0, 0, 600, listbg.height - 18);
        var scrollList = ComponentManager.getScrollList(ZhenqifangViewTab1ScrollItem, arr, tmpRect);
        view._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 8]);
        view.addChild(scrollList);
        //按钮
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ZhenqifangShopAllSelect", function () {
            if (btn.getIsGray()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip16"));
                return;
            }
            if (view.api.canGetTakReward(2)) {
                //一键领取
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                    idx: 0,
                    taskType: 2,
                    cts: 0,
                    isBatch: 1
                });
            }
            else {
                var allsend = 0;
                var list = view._scrollList;
                var servantobj = {};
                for (var i in list._scrollListItemArr) {
                    var unit = list._scrollListItemArr[i];
                    if (unit.canSend()) {
                        ++allsend;
                        var arr_1 = [];
                        arr_1 = unit.getServantArr();
                        servantobj[Number(i) + 1] = [];
                        servantobj[Number(i) + 1] = arr_1;
                    }
                }
                if (allsend > 0) {
                    Api.zhenqifangVoApi.freshlist = true;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_BATCHFTASK, {
                        sarr: servantobj
                    });
                }
                else {
                    //自动填充
                    var historylist = Api.zhenqifangVoApi.getFriendHistoryList();
                    if (historylist) {
                        for (var i in historylist) {
                            var unit = historylist[i];
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
                                data: unit,
                                index: i
                            });
                        }
                    }
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0, 20], true);
        view.addChild(btn);
        view._allbtn = btn;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip26"), 20);
        view._alltipTxt = tipTxt;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, btn);
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    ZhenqifangViewTab2.prototype.update = function () {
        var view = this;
        //免费次数
        // let freenum = Math.max(Config.ZhenqifangCfg.friend.freeFresh[0] - view.api.curFreeNum, 0);
        // view._freeTxt.text = LanguageManager.getlocal(`zhenqifangfreenum`, [freenum.toString()]);
        var arr = view.api.getCurFTaskarr();
        view._scrollList.refreshData(arr);
        Api.zhenqifangVoApi.friendsendList = [];
    };
    ZhenqifangViewTab2.prototype.sendCallback = function (evt) {
        if (evt.data.ret) {
            var view = this;
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip18"));
                var item = view._scrollList.getItemByIndex(view.api.selIdx);
                var info = view.api.getTaskData(true, view.api.selIdx);
                item.refreshAfterSend(info);
                view.api.selIdx = -1;
            }
            else {
                //App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
            }
        }
    };
    ZhenqifangViewTab2.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 2) {
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                var arr = view.api.getCurFTaskarr();
                view._scrollList.refreshData(arr);
                // Api.zhenqifangVoApi.friendsendList = [];
                // Api.zhenqifangVoApi.friendobj = {};
                // let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
                // if(historylist){
                // 	for(let i in historylist){
                // 		let unit = historylist[i];
                // 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
                // 			data : unit,
                // 			index : i
                // 		});
                // 	}
                // }
            }
        }
    };
    ZhenqifangViewTab2.prototype.refreshTaskCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
                var item = view._scrollList.getItemByIndex(view.api.selIdx);
                var info = view.api.getTaskData(true, view.api.selIdx);
                item.refreshAfterFresh(info);
                view.api.selIdx = -1;
            }
        }
    };
    ZhenqifangViewTab2.prototype.getServantNumByUid = function (uid) {
        var view = this;
        var count = 0;
        var list = view._scrollList;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            var arr = unit.getServantArr();
            for (var j in arr) {
                if (arr[j].uid == uid) {
                    ++count;
                }
            }
        }
        return count;
    };
    ZhenqifangViewTab2.prototype.tick = function () {
        var view = this;
        var allsend = 0;
        var canSend = 0;
        var history = 0;
        var list = view._scrollList;
        var obj = view.api.getFriendHistoryList();
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (unit.canSend()) {
                ++allsend;
            }
            if (unit.isInState()) {
                ++canSend;
            }
            if (unit.isInState() && obj && obj[unit._data.index]) {
                ++history;
            }
        }
        if (view.api.canGetTakReward(2)) {
            view._allbtn.visible = true;
            view._alltipTxt.visible = false;
            view._allbtn.setText("zhenqifangallget");
            view._allbtn.setGray(false);
        }
        else {
            view._allbtn.setText(allsend > 0 ? "ZhenqifangShopAllSend" : "ZhenqifangShopAllSelect");
            if (allsend > 0) {
                view._allbtn.visible = true;
                view._alltipTxt.visible = false;
            }
            else {
                if (canSend == 0) {
                    view._allbtn.visible = true;
                    view._alltipTxt.visible = false;
                    view._allbtn.setGray(true);
                }
                else {
                    view._allbtn.setGray(false);
                    if (history > 0) {
                        view._allbtn.visible = true;
                        view._alltipTxt.visible = false;
                    }
                    else {
                        view._allbtn.visible = false;
                        view._alltipTxt.visible = true;
                    }
                }
            }
        }
    };
    ZhenqifangViewTab2.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD), view.rewardCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHFTASK), view.update, view);
        view._scrollList = null;
        view._allbtn = null;
        view._alltipTxt = null;
        Api.zhenqifangVoApi.friendobj = {};
        // view._freeTxt = null;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangViewTab2;
}(AcCommonViewTab));
__reflect(ZhenqifangViewTab2.prototype, "ZhenqifangViewTab2");
//# sourceMappingURL=ZhenqifangViewTab2.js.map