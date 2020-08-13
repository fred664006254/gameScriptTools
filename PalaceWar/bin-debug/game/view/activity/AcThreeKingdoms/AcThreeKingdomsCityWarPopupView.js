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
 * 三国争霸城池点开据点弹窗
 * author qianjun
 */
var AcThreeKingdomsCityWarPopupView = (function (_super) {
    __extends(AcThreeKingdomsCityWarPopupView, _super);
    function AcThreeKingdomsCityWarPopupView() {
        var _this = _super.call(this) || this;
        _this._topGroup = null;
        _this._bottomGroup = null;
        _this._timebg = null;
        _this._timecdTxt = null;
        _this._count = 0;
        _this._titlebg = null;
        _this._titleTxt = null;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityWarPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPopupView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityWarPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg", "specialview_commoni_namebg", "threekingdomscitypopupview"
        ]);
    };
    AcThreeKingdomsCityWarPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsCityWarPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsCityWarPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETBUILDINGINFO, requestData: {
                activeId: this.vo.aidAndCode,
                mainland: this.kingdomid == 0 ? 7 : ((this.kingdomid - 1) * 2 + (this.cityId - 3)),
            } };
    };
    //请求回调
    AcThreeKingdomsCityWarPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_THREEKINGDOMS_GETBUILDINGINFO) {
            this.vo.setBuildingInfo(rData.data.buildinginfo);
        }
    };
    AcThreeKingdomsCityWarPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var isCentercity = view.kingdomid == 0;
        var code = view.getUiCode();
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.selectCallback, view);
        //顶部积分榜
        var topGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(topGroup);
        view._topGroup = topGroup;
        topGroup.width = 555;
        var titlebg = BaseBitmap.create("threekingdomscityzhanjubg" + (isCentercity ? "1" : view.kingdomid));
        view._titlebg = titlebg;
        view.addChildToContainer(titlebg);
        titlebg.y = 10;
        titlebg.x = 70;
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip50", code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + view.kingdomid, code))]), 20);
        view._titleTxt = titleTxt;
        view.addChildToContainer(titleTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titlebg);
        if (isCentercity) {
            titlebg.visible = titleTxt.visible = false;
        }
        for (var i = 1; i <= 3; ++i) {
            var group = new BaseDisplayObjectContainer();
            group.name = "group" + i;
            topGroup.addChild(group);
            group.width = 165;
            group.x = 10 + (i - 1) * (165 + 20);
            var threekingdomsfont = BaseBitmap.create("threekingdomsfont" + i);
            group.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, threekingdomsfont, group, [0, 0], true);
            var pointbg = BaseBitmap.create("threekingdomspoint" + i + "bg");
            group.addChild(pointbg);
            pointbg.name = "pointbg" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, threekingdomsfont, [0, 30]);
            var point = view.vo.getPoint(i);
            var pointTxt = ComponentManager.getTextField(point.toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(pointTxt);
            pointTxt.name = "pointTxt" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, pointTxt, pointbg);
        }
        view.freshTop();
        topGroup.x = view.viewBg.x + (view.viewBg.width - topGroup.width) / 2;
        topGroup.y = titlebg.y + titlebg.height + 5;
        if (isCentercity) {
            topGroup.y = 5;
        }
        var listbg = BaseBitmap.create("public_9_bg4");
        listbg.width = 530;
        listbg.height = 550;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, topGroup, [0, topGroup.height + 10]);
        //倒计时
        var timebg = BaseBitmap.create("public_itemtipbg2");
        var timecdTxt = ComponentManager.getTextField("", 18);
        view.addChildToContainer(timebg);
        view.addChildToContainer(timecdTxt);
        timebg.width = 400;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timebg, listbg, [0, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timecdTxt, timebg);
        view._timebg = timebg;
        view._timecdTxt = timecdTxt;
        //城市据点
        var cityNum = view.kingdomid == 0 ? view.cfg.campNum2 : view.cfg.campNum1;
        var arr = [];
        //let scrollist = ComponentManager.getScrollList(, );
        for (var i = 1; i <= cityNum; ++i) {
            arr.push({
                id: i,
                cityid: view.cityId,
                kingdomid: view.kingdomid
            });
        }
        //     let citySingle = new BaseDisplayObjectContainer();
        //     citySingle.name = `citySingle${i}`;
        //     cityGroup.addChild(citySingle);
        //     citySingle.width = 150;
        //     citySingle.height = 102;
        //     let bg = BaseBitmap.create(`threekingdomscityzhanjulistbg`);
        //     citySingle.addChild(bg);
        //     bg.name = `bg`;
        //     let playerGroup = new BaseDisplayObjectContainer();
        //     playerGroup.width = 230;
        //     playerGroup.height = 70;
        //     playerGroup.name = `playerGroup`
        //     citySingle.addChild(playerGroup);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerGroup, bg);
        //     let emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip51`, view.getUiCode()), [view.cfg.powerNeed.toString()]), 20,TextFieldConst.COLOR_BROWN);
        //     emptyTxt.name = `emptyTxt`;
        //     emptyTxt.lineSpacing = 10;
        //     emptyTxt.textAlign = egret.HorizontalAlign.CENTER;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg);
        //     citySingle.addChild(emptyTxt);
        //     let flag = BaseBitmap.create(`threekingdomscityzhanjuflag`);
        //     citySingle.addChild(flag);
        //     flag.name = `flag`;
        //     citySingle.setPosition(i % 2 == 1 ? 10 : 270, 10 + (Math.ceil(i / 2) - 1) * 110);
        //     citySingle.addTouchTap(()=>{
        //          //打开出站弹窗
        //          if(view.vo.isInWarTime()){
        //             ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSPREPAREVIEW,{
        //                 aid : view.aid,
        //                 code : view.code,
        //                 cityId : view.cityId,
        //                 kingdomid : view.kingdomid,
        //                 judianid : i
        //             });
        //          }
        //          else{
        //             App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsTip60-1`));
        //             view.hide();
        //          }
        //     }, view, null);
        //     let order = BaseBitmap.create(`threekingdomscityzhanjuorder`);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, order, bg);
        //     citySingle.addChild(order);
        //     let ordrTxt = ComponentManager.getTextField(`${i}`, 16);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordrTxt, order, [0,-4]);
        //     citySingle.addChild(ordrTxt);
        // }
        var list = ComponentManager.getScrollList(AcThreeKingdomsCityItem, arr, new egret.Rectangle(0, 0, listbg.width, listbg.height - 60), view.code);
        view.addChildToContainer(list);
        list.setContentPosY(5);
        list.bounces = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, listbg, [10, 50]);
        view._list = list;
        //底部援军情况
        var bottomGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(bottomGroup);
        bottomGroup.width = 520;
        view._bottomGroup = bottomGroup;
        for (var i = 1; i <= 3; ++i) {
            var armygroup = new BaseDisplayObjectContainer();
            armygroup.name = "armygroup" + i;
            bottomGroup.addChild(armygroup);
            armygroup.width = 110;
            armygroup.x = (i - 1) * (110 + 30);
            var armyicon = BaseBitmap.create("threekingdomarmyicon" + i);
            armygroup.addChild(armyicon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armyicon, armygroup, [0, 0], true);
            var threekingdomsfont = BaseBitmap.create("threekingdomsfont" + i);
            armygroup.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, threekingdomsfont, armyicon, [0, 10]);
            var pointbg = BaseBitmap.create("specialview_commoni_namebg");
            armygroup.addChild(pointbg);
            pointbg.name = "pointbg" + i;
            pointbg.width = 140;
            pointbg.height = 55;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, armyicon, [0, armyicon.height - 20]);
            var yuanbingpercent = i * 10 + "%";
            var yuanbingpercentTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            armygroup.addChild(yuanbingpercentTxt);
            yuanbingpercentTxt.name = "yuanbingpercentTxt" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, pointbg);
            var armynum = "" + i * 10000;
            var armynumTxt = ComponentManager.getTextField(armynum.toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            armygroup.addChild(armynumTxt);
            armynumTxt.name = "armynumTxt" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, pointbg);
            if (i == view.vo.getMyKingdoms()) {
                armygroup.addTouchTap(function () {
                    //打开援兵详情弹窗
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSYUANBINGDETAILVIEW, {
                        aid: view.aid,
                        code: view.code,
                        cityId: view.cityId,
                        kingdomid: view.kingdomid
                    });
                }, view);
                // let rulebtn = ComponentManager.getButton(`btn_rule`, '', ()=>{
                // }, view);
                // rulebtn.setScale(0.5);
                // rulebtn.setPosition(armynumTxt.x+armynumTxt.textWidth+10,81);
                // armygroup.addChild(rulebtn);
            }
        }
        view.freshBottom();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomGroup, listbg, [0, listbg.height + 10]);
        var bottomtipBg = BaseBitmap.create("public_textbrownbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomtipBg, bottomGroup, [0, bottomGroup.height + 7]);
        view.addChildToContainer(bottomtipBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip26", view.code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomtipBg);
        view.tick();
    };
    //顶部的积分刷新
    AcThreeKingdomsCityWarPopupView.prototype.freshTop = function () {
        var view = this;
        var code = view.getUiCode();
        var isCentercity = view.kingdomid == 0;
        var topGroup = view._topGroup;
        var mykingdomid = view.vo.getMyKingdoms();
        var arr = [{
                id: 1,
                point: view.vo.getCityPoint(view.kingdomid, view.cityId, 1)
            }, {
                id: 2,
                point: view.vo.getCityPoint(view.kingdomid, view.cityId, 2)
            }, {
                id: 3,
                point: view.vo.getCityPoint(view.kingdomid, view.cityId, 3)
            }];
        arr.sort(function (a, b) {
            return b.point - a.point;
        });
        for (var i = 1; i <= arr.length; ++i) {
            var kingdomid = arr[i - 1].id;
            var group = topGroup.getChildByName("group" + kingdomid);
            group.x = 10 + (i - 1) * (165 + 20);
            var point = view.vo.getCityPoint(view.kingdomid, view.cityId, kingdomid);
            var pointTxt = group.getChildByName("pointTxt" + kingdomid);
            pointTxt.text = App.StringUtil.changeIntToText(point) + "(+<font color=0x21eb39>" + view.vo.getCityPerCore(view.kingdomid, view.cityId, kingdomid) + "</font>)";
            var pointbg = group.getChildByName("pointbg" + kingdomid);
            pointbg.setRes(i == 1 ? "threekingdomspoint" + kingdomid + "bg_down" : "threekingdomspoint" + kingdomid + "bg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, pointbg, [0, 30]);
        }
        // view._titlebg.setRes(`threekingdomscityzhanjubg${isCentercity ? arr[0].id : view.kingdomid}`);
        // let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip50`, code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${isCentercity ? arr[0].id : view.kingdomid}`, code))]), 20,);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,  view._titleTxt, view._titlebg);
    };
    //底部城池援军
    AcThreeKingdomsCityWarPopupView.prototype.freshBottom = function () {
        var view = this;
        var code = view.getUiCode();
        var bottomGroup = view._bottomGroup;
        var mykingdomid = view.vo.getMyKingdoms();
        var isCentercity = view.kingdomid == 0;
        var arr = [{
                id: 1,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 1, isCentercity)
            }, {
                id: 2,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 2, isCentercity)
            }, {
                id: 3,
                point: view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 3, isCentercity)
            }];
        arr.sort(function (a, b) {
            if (a.point == b.point) {
                return a.id - b.id;
            }
            else {
                return b.point - a.point;
            }
        });
        for (var i = 1; i <= arr.length; ++i) {
            var kingdomid = arr[i - 1].id;
            var armygroup = bottomGroup.getChildByName("armygroup" + kingdomid);
            armygroup.x = 45 + (i - 1) * (110 + 50);
            var pointbg = armygroup.getChildByName("pointbg" + kingdomid);
            var yuanbingpercent = view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, kingdomid, isCentercity);
            var yuanbingpercentTxt = armygroup.getChildByName("yuanbingpercentTxt" + kingdomid);
            yuanbingpercentTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip30", code), [yuanbingpercent.toString()]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, pointbg, [0, 5]);
            var armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, kingdomid);
            var armynumTxt = armygroup.getChildByName("armynumTxt" + kingdomid);
            armynumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip31", code), [App.StringUtil.changeIntToText(armynum)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, yuanbingpercentTxt, [0, yuanbingpercentTxt.textHeight + 7]);
        }
    };
    AcThreeKingdomsCityWarPopupView.prototype.freshCity = function (cityId) {
        var view = this;
        var code = view.getUiCode();
        //刷新城池的玩家信息
        var item = view._list.getItemByIndex(cityId - 1);
        if (item) {
            item.freshCity();
        }
    };
    AcThreeKingdomsCityWarPopupView.prototype.getShowHeight = function () {
        return 990;
    };
    AcThreeKingdomsCityWarPopupView.prototype.getTitleStr = function () {
        var view = this;
        var name = "";
        if (view.kingdomid) {
            name = "acThreeKingdoms" + view.kingdomid + "City" + view.cityId + "Name";
        }
        else {
            name = "acThreeKingdomscenterCityName_" + (view.vo.getTodayWeek() == 7 ? 2 : 1);
        }
        return App.CommonUtil.getCnByCode(name, this.getUiCode());
    };
    AcThreeKingdomsCityWarPopupView.prototype.tick = function () {
        var view = this;
        view.freshTop();
        if (view.vo.isInWarTime()) {
            view._timecdTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip27", view.code), [view.vo.getWarTimeCD(2)]);
        }
        else {
            view._timecdTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip28", view.code));
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timecdTxt, view._timebg);
    };
    AcThreeKingdomsCityWarPopupView.prototype.selectCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //有据点消息变化
            if (evt.data.data.data.buildinginfo) {
                view.vo.setBuildingInfoById(evt.data.data.data.buildinginfo);
                for (var i in evt.data.data.data.buildinginfo) {
                    var tmp = evt.data.data.data.buildinginfo[i];
                    if (tmp && tmp.building) {
                        view.freshCity(tmp.building);
                    }
                }
            }
        }
    };
    AcThreeKingdomsCityWarPopupView.prototype.getSpaceX = function () {
        return 10;
    };
    // public getSpaceY():number{
    //     return 0;
    // }
    AcThreeKingdomsCityWarPopupView.prototype.dispose = function () {
        var view = this;
        view._topGroup.dispose();
        view._topGroup = null;
        view._bottomGroup = null;
        view._timebg = null;
        view._timecdTxt = null;
        view._count = 0;
        view._titlebg = null;
        view._titleTxt = null;
        view._list = null;
        if (view.vo.listred) {
            view.vo.listred = false;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST, {
                activeId: view.acTivityId,
            });
        }
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, {
            activeId: view.acTivityId,
        });
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.selectCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsCityWarPopupView;
}(PopupView));
__reflect(AcThreeKingdomsCityWarPopupView.prototype, "AcThreeKingdomsCityWarPopupView");
//# sourceMappingURL=AcThreeKingdomsCityWarPopupView.js.map