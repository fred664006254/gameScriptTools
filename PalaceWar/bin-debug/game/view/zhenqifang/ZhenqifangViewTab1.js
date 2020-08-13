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
desc : 珍器坊 工坊差事
*/
var ZhenqifangViewTab1 = (function (_super) {
    __extends(ZhenqifangViewTab1, _super);
    function ZhenqifangViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._freeTxt = null;
        _this._scrollList = null;
        _this._allbtn = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(ZhenqifangViewTab1.prototype, "cfg", {
        get: function () {
            return Config.ZhenqifangCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhenqifangViewTab1.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT, { clear: true, friend: 0 });
        Api.zhenqifangVoApi.sendList = [];
    };
    ZhenqifangViewTab1.prototype.initView = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO, {});
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD), view.rewardCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETITASK), view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHITASK), view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO), view.saduncallback, view);
        NetManager.request(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO, {});
        var baseview = ViewController.getInstance().getView('ZhenqifangView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var freeTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeTxt, view, [55, 20], true);
        view.addChild(freeTxt);
        view._freeTxt = freeTxt;
        var freshTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip5", [App.DateUtil.formatSvrHourByLocalTimeZone(0).hour + '']), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, freshTxt, view, [55, 20], true);
        view.addChild(freshTxt);
        var listbg = BaseBitmap.create("public_9_bg43");
        listbg.width = 600;
        listbg.height = view.height - 190;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0, 50], true);
        view.addChild(listbg);
        // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip4`), 20, TextFieldConst.COLOR_BLACK);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 10]);
        // view.addChild(tipTxt)
        var arr = view.api.getCurTaskarr();
        var tmpRect = new egret.Rectangle(0, 0, 600, listbg.height - 18);
        var scrollList = ComponentManager.getScrollList(ZhenqifangViewTab1ScrollItem, arr, tmpRect);
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 8]);
        view.addChild(scrollList);
        // scrollList.bindMoveCompleteCallback(()=>{
        // 	let level = Math.ceil(scrollList.scrollTop / 90 + ((listbg.height - 195) / 90));
        // 	//当前滑动到的等级
        // 	view.freshBottomSpecialReward(level);
        // }, view);
        // let listmask = BaseBitmap.create(`battlepassscrollmask`);
        // listmask.width = listbg.width;
        // listmask.height = listbg.height - 185;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listmask, listbg, [0,85]);
        // view.addChild(listmask);
        //按钮
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ZhenqifangShopAllSelect", function () {
            if (btn.getIsGray()) {
                var allsend = 0;
                var canSend = 0;
                var list = view._scrollList;
                var canselectservant = [];
                var haveservant = [];
                for (var i in list._scrollListItemArr) {
                    var unit = list._scrollListItemArr[i];
                    if (unit.canSend()) {
                        ++allsend;
                    }
                    if (unit.isInState()) {
                        ++canSend;
                    }
                    if (unit.isSend()) {
                        var arr_1 = unit.getServantArr();
                        for (var k in arr_1) {
                            haveservant.push(Number(arr_1[k].sid));
                        }
                    }
                }
                if (canSend == 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip16"));
                }
                else if (canSend * 5 > canselectservant.length) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip27"));
                }
                return;
            }
            if (view.api.canGetTakReward(1)) {
                //一键领取
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                    idx: 0,
                    taskType: 1,
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
                        var arr_2 = [];
                        arr_2 = unit.getServantArr();
                        servantobj[Number(i) + 1] = [];
                        servantobj[Number(i) + 1] = arr_2;
                    }
                }
                if (allsend > 0) {
                    Api.zhenqifangVoApi.freshlist = true;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_BATCHITASK, {
                        sarr: servantobj
                    });
                }
                else {
                    //自动填充
                    var canselectservant = [];
                    var haveservant = [];
                    for (var i in list._scrollListItemArr) {
                        var unit = list._scrollListItemArr[i];
                        var arr_3 = unit.getServantArr();
                        for (var k in arr_3) {
                            haveservant.push(Number(arr_3[k].sid));
                        }
                    }
                    var servantlist = Api.servantVoApi.getServantInfoListWithSort(1);
                    for (var i in servantlist) {
                        var sid = Number(servantlist[i].servantId);
                        if (haveservant.indexOf(sid) == -1) {
                            canselectservant.push(sid);
                        }
                    }
                    for (var i in list._scrollListItemArr) {
                        var unit = list._scrollListItemArr[i];
                        if (!unit.canSend()) {
                            unit.setServantArr(canselectservant, haveservant);
                        }
                    }
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0, 20], true);
        view.addChild(btn);
        view._allbtn = btn;
        view.update(null);
        TickManager.addTick(view.tick, view);
        if (Api.rookieVoApi.getIsGuiding()) {
            scrollList.verticalScrollPolicy = "off";
        }
        view.tick();
    };
    ZhenqifangViewTab1.prototype.update = function (evt) {
        if (evt && evt.data && !evt.data.ret) {
            return;
        }
        var view = this;
        //免费次数
        var freenum = Math.max(0, Config.ZhenqifangCfg.individual.freeFresh[0] - view.api.curFreeNum);
        view._freeTxt.text = LanguageManager.getlocal("zhenqifangfreenum", [freenum.toString()]);
        if (Api.zhenqifangVoApi.freshlist) {
            Api.zhenqifangVoApi.freshlist = false;
            var arr = view.api.getCurTaskarr();
            Api.zhenqifangVoApi.sendList = [];
            view._scrollList.refreshData(arr);
        }
    };
    ZhenqifangViewTab1.prototype.sendCallback = function (evt) {
        if (evt.data.ret) {
            var view = this;
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip18"));
                var item = view._scrollList.getItemByIndex(view.api.selIdx);
                var info = view.api.getTaskData(false, view.api.selIdx);
                item.refreshAfterSend(info);
                view.api.selIdx = -1;
            }
        }
    };
    ZhenqifangViewTab1.prototype.refreshTaskCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
                var item = view._scrollList.getItemByIndex(view.api.selIdx);
                var info = view.api.getTaskData(false, view.api.selIdx);
                item.refreshAfterFresh(info);
                view.api.selIdx = -1;
            }
        }
    };
    ZhenqifangViewTab1.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && data.taskType && data.taskType == 1) {
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                var arr = view.api.getCurTaskarr();
                view._scrollList.refreshData(arr);
                Api.zhenqifangVoApi.sendList = [];
                if (data.isfirst) {
                    // Api.rookieVoApi.curGuideKey = "zhenqifang";
                    // Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_11"},true);
                    // Api.rookieVoApi.checkWaitingGuide();
                    view._scrollList.verticalScrollPolicy = "on";
                    Api.rookieVoApi.checkNextStep();
                    var baseview = ViewController.getInstance().getView('ZhenqifangView');
                    baseview.hide();
                }
            }
        }
    };
    ZhenqifangViewTab1.prototype.tick = function () {
        var view = this;
        var allsend = 0;
        var canSend = 0;
        var list = view._scrollList;
        var canselectservant = [];
        var haveservant = [];
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (unit.canSend()) {
                ++allsend;
            }
            if (unit.isInState()) {
                ++canSend;
            }
            if (unit.isSend()) {
                var arr = unit.getServantArr();
                for (var k in arr) {
                    haveservant.push(Number(arr[k].sid));
                }
            }
        }
        if (view.api.canGetTakReward(1)) {
            view._allbtn.setText("zhenqifangallget");
            view._allbtn.setGray(false);
        }
        else {
            view._allbtn.setText(allsend > 0 ? "ZhenqifangShopAllSend" : "ZhenqifangShopAllSelect");
            if (allsend == 0) {
                var servantlist = Api.servantVoApi.getServantInfoListWithSort(1);
                for (var i in servantlist) {
                    var sid = Number(servantlist[i].servantId);
                    if (haveservant.indexOf(sid) == -1) {
                        canselectservant.push(sid);
                    }
                }
                if (canSend == 0) {
                    view._allbtn.setGray(true);
                }
                else {
                    if (canselectservant.length >= 5) {
                        view._allbtn.setGray(false);
                    }
                    else {
                        view._allbtn.setGray(true);
                    }
                }
            }
        }
    };
    ZhenqifangViewTab1.prototype.saduncallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            Api.friendVoApi.sadunList = evt.data.data.data.sadunList;
        }
    };
    ZhenqifangViewTab1.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD), view.rewardCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETITASK), view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHITASK), view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO), view.saduncallback, view);
        view._scrollList = null;
        view._freeTxt = null;
        view._allbtn = null;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangViewTab1;
}(AcCommonViewTab));
__reflect(ZhenqifangViewTab1.prototype, "ZhenqifangViewTab1");
//# sourceMappingURL=ZhenqifangViewTab1.js.map