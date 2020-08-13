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
 * 议事院选择门客
 * author 钱竣
 */
var CouncilSelectServantView = (function (_super) {
    __extends(CouncilSelectServantView, _super);
    function CouncilSelectServantView() {
        var _this = _super.call(this) || this;
        _this._buzheninfo = null;
        _this._cyrAttrTxt = null;
        _this._list = null;
        _this._bottomList = null;
        _this._seatId = 0;
        return _this;
    }
    Object.defineProperty(CouncilSelectServantView.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilSelectServantView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "discusspqzhong", "discussypqian", "discussclose",
        ]);
    };
    // protected resetBgSize() : void{
    // 	if(this.getBgName() != "public_rule_bg")
    // 	{
    // 		this.closeBtn.y = this.viewBg.y - 40;
    // 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 40);
    // 	}
    // 	else
    // 	{
    // 		this.closeBtn.y = this.viewBg.y - 18;
    // 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
    // 	}
    // }
    CouncilSelectServantView.prototype.initView = function () {
        var view = this;
        view.viewBg.width = 580;
        view.viewBg.height = 900;
        var eventId = view.param.data.eventId;
        var data = view.api.getEventInfoById(eventId);
        view._data = data;
        view._seatId = view.param.data.index ? view.param.data.index : 0;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, view.teamChange, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var topbg0 = BaseBitmap.create("public_tc_bg02");
        topbg0.x = view.viewBg.width / 2 - topbg0.width / 2;
        topbg0.y = 10;
        this.addChildToContainer(topbg0);
        var needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewNeedType2", [LanguageManager.getlocal("servantInfo_speciality" + (data.eventNeedType == 0 ? 7 : data.eventNeedType))]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.lefttop, needTypeTxt, topbg0, [30, 15]);
        view.addChildToContainer(needTypeTxt);
        var cyrAttrTxt = ComponentManager.getTextField('0', 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.righttop, cyrAttrTxt, topbg0, [40, 15]);
        view.addChildToContainer(cyrAttrTxt);
        view._cyrAttrTxt = cyrAttrTxt;
        // let topbg : BaseBitmap = BaseBitmap.create("public_9_bg44");
        // topbg.width = 546;
        // topbg.height = 120;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.viewBg, [0,95]);
        // view.addChild(topbg);
        view._buzheninfo = [];
        var rectbg = BaseBitmap.create("public_tc_bg01");
        rectbg.width = 540;
        rectbg.height = 114;
        rectbg.setPosition(view.viewBg.width / 2 - rectbg.width / 2, topbg0.y + topbg0.height + 10);
        view.addChildToContainer(rectbg);
        var tmpRect = new egret.Rectangle(0, 0, rectbg.width - 20, rectbg.height - 20);
        var scrollList = ComponentManager.getScrollList(CouncilEventSearvantItem, [], tmpRect);
        scrollList.verticalScrollPolicy = "off";
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, rectbg);
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        view.fresh_List();
        //needType
        var kuang = BaseBitmap.create("public_tc_bg01");
        kuang.width = 540;
        kuang.height = 520;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, rectbg, [0, rectbg.height + 10]);
        view.addChildToContainer(kuang);
        var bottomtmpRect = new egret.Rectangle(0, 0, kuang.width - 20, kuang.height - 20);
        var bottomscrollList = ComponentManager.getScrollList(CouncilEventSelectSearvantItem, [], bottomtmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bottomscrollList, kuang, [0, 10]);
        view.addChildToContainer(bottomscrollList);
        view._bottomList = bottomscrollList;
        view.fresh_List();
        view.fresh_bottom_list();
        var selectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'discussConfirmJoin', view.selectClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, selectBtn, kuang, [0, kuang.height + 10]);
        view.addChildToContainer(selectBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussJoinEventTip2"), 20, TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, kuang, [0, kuang.height + 75]);
        view.addChildToContainer(tipTxt);
    };
    CouncilSelectServantView.prototype.selectClick = function () {
        var view = this;
        if (!view._buzheninfo.length) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip3"));
            return;
        }
        var itemId = 1921;
        var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        var iteminfo = Config.ItemCfg.getItemCfgById(itemId);
        //出恢复弹窗
        var mesObj = {
            confirmCallback: function () {
                if (view.api.getCurpeirod() > 2) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip4"));
                    view.hide();
                    return;
                }
                if (view._data.num >= Config.CouncilCfg.maxPlayer) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip5"));
                    view.hide();
                    return;
                }
                if (ownNum <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip6"));
                    return;
                }
                var arr = [];
                for (var i in view._buzheninfo) {
                    var unit = view._buzheninfo[i];
                    arr.push(unit.data.servantId);
                }
                NetManager.request(NetRequestConst.REQUST_COUNCIL_JOINEVENT, {
                    eventId: view._data.eventId,
                    servant: arr,
                    seatId: view._seatId ? view._seatId : view.api.getSeatId(view._data.eventId)
                });
                view.hide();
            },
            handler: view,
            icon: "itemicon" + itemId,
            iconBg: iteminfo.iconBg,
            num: ownNum,
            msg: LanguageManager.getlocal("discussConfirmUse", [iteminfo.name]),
            id: itemId,
            useNum: 1,
            linespacing: 6,
            height: 250
        };
        // itemName_109
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    CouncilSelectServantView.prototype.fresh_bottom_list = function () {
        var view = this;
        var total = 0;
        var type = Number(view._data.eventNeedType);
        var eventId = view._data.eventId;
        var keys = Api.servantVoApi.getServantInfoIdListByProperty(type);
        var arr = [];
        for (var i in keys) {
            arr.push({
                needType: type,
                data: Api.servantVoApi.getServantObj(keys[i]),
                eventId: eventId
            });
        }
        arr.sort(function (a, b) {
            var notjoina = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'NOT_JOIN';
            var notjoinb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'NOT_JOIN';
            if (notjoina && !notjoinb) {
                return -1;
            }
            else if (!notjoina && notjoinb) {
                return 1;
            }
            else if (notjoina && notjoinb) {
                var valueA = 0;
                var valueB = 0;
                switch (type) {
                    case 1:
                        valueA = a.data.attrVo.forceTotal;
                        valueB = b.data.attrVo.forceTotal;
                        break;
                    case 2:
                        valueA = a.data.attrVo.brainsTotal;
                        valueB = b.data.attrVo.brainsTotal;
                        break;
                    case 4:
                        valueA = a.data.attrVo.charmTotal;
                        valueB = b.data.attrVo.charmTotal;
                        break;
                    case 3:
                        valueA = a.data.attrVo.politicsTotal;
                        valueB = b.data.attrVo.politicsTotal;
                        break;
                    case 0:
                        valueA = a.data.total;
                        valueB = b.data.total;
                        break;
                }
                return valueB - valueA;
            }
            else {
                var jointhisa = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'JOIN_THIS';
                var jointhisb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'JOIN_THIS';
                if (jointhisa && !jointhisb) {
                    return 1;
                }
                else if (!jointhisa && jointhisb) {
                    return -1;
                }
                else if (jointhisa && jointhisb) {
                    var valueA = 0;
                    var valueB = 0;
                    switch (type) {
                        case 1:
                            valueA = a.data.attrVo.forceTotal;
                            valueB = b.data.attrVo.forceTotal;
                            break;
                        case 2:
                            valueA = a.data.attrVo.brainsTotal;
                            valueB = b.data.attrVo.brainsTotal;
                            break;
                        case 4:
                            valueA = a.data.attrVo.charmTotal;
                            valueB = b.data.attrVo.charmTotal;
                            break;
                        case 3:
                            valueA = a.data.attrVo.politicsTotal;
                            valueB = b.data.attrVo.politicsTotal;
                            break;
                        case 0:
                            valueA = a.data.total;
                            valueB = b.data.total;
                            break;
                    }
                    return valueB - valueA;
                }
                else {
                    var joinothera = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'JOIN_OTHER';
                    var joinotherb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'JOIN_OTHER';
                    if (joinothera && !joinotherb) {
                        return 1;
                    }
                    else if (!joinothera && joinotherb) {
                        return -1;
                    }
                }
            }
        });
        view._bottomList.refreshData(arr);
    };
    CouncilSelectServantView.prototype.fresh_List = function () {
        var view = this;
        var total = 0;
        var type = Number(view._data.eventNeedType);
        var eventId = view._data.eventId;
        for (var i in view._buzheninfo) {
            var unit = view._buzheninfo[i];
            total += (Api.servantVoApi.getServantProByType(unit.data.servantId, type));
        }
        view._cyrAttrTxt.text = LanguageManager.getlocal("discussViewAttrCurTotal", [App.StringUtil.changeIntToText(total)]);
        // view.setLayoutPosition(LayoutConst.righttop, view._cyrAttrTxt, view.viewBg, [40,15]);
        view._cyrAttrTxt.anchorOffsetX = view._cyrAttrTxt.width;
        var emptyarr = [];
        for (var i = 0; i < Config.CouncilCfg.maxServant; ++i) {
            if (view._buzheninfo[i]) {
                emptyarr.push(view._buzheninfo[i]);
            }
            else {
                emptyarr.push({
                    empty: true,
                    select: true
                });
            }
        }
        view._list.refreshData(emptyarr);
    };
    CouncilSelectServantView.prototype.teamChange = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.type == 'delete') {
            for (var i in view._buzheninfo) {
                if (view._buzheninfo[i].data.servantId == data.servantId) {
                    view._buzheninfo.splice(Number(i), 1);
                    break;
                }
            }
        }
        else {
            if (view._buzheninfo.length >= 5) {
                App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip1"));
                return;
            }
            var obj = Api.servantVoApi.getServantObj(data.servantId);
            view._buzheninfo.push({
                data: obj,
                select: true
            });
        }
        view.api.setBuzhenInfo(view._buzheninfo);
        view.fresh_List();
        //上半部分列表
        // let list : any = view._list;
        // let arr = list._dataList;
        // let upidx = 0;
        // let bottomidx = 0;
        // for(let i in arr){
        // 	if(data.type == 'delete'){
        // 		if(arr[i].data.servantId == data.servantId){
        // 			arr[i] = {
        // 				empty : true,
        // 				select : true
        // 			};
        // 			upidx = Number(i);
        // 			break;
        // 		}
        // 	}
        // 	else{
        // 		if(arr[i].empty){
        // 			arr[i] = {
        // 				data : Api.servantVoApi.getServantObj(data.servantId),
        // 				select : true
        // 			};
        // 			upidx = Number(i);
        // 			break;
        // 		}
        // 	}
        // }
        // let item : ScrollListItem  = view._list.getItemByIndex(upidx);
        // item['refreshData'](data.type == 'delete' ? null : data.servantId);
        // view.fresh_List();
        var bottomList = view._bottomList;
        var bottomArr = bottomList._dataList;
        for (var i in bottomArr) {
            if (bottomArr[i].data.servantId == data.servantId) {
                var item = view._bottomList.getItemByIndex(Number(i));
                item.refreshStatus(data.type);
                break;
            }
        }
        // view._bottomList.refreshData(bottomList._dataList);
    };
    CouncilSelectServantView.prototype.dispose = function () {
        var view = this;
        view._seatId = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, view.teamChange, view);
        view._cyrAttrTxt = null;
        view._list = null;
        view._bottomList = null;
        view._buzheninfo = [];
        view.api.setBuzhenInfo(view._buzheninfo);
        _super.prototype.dispose.call(this);
    };
    return CouncilSelectServantView;
}(PopupView));
__reflect(CouncilSelectServantView.prototype, "CouncilSelectServantView");
