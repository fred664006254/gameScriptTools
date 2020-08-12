var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 出站骰子队列1
 * author qianjun
 */
var DiceSceneTab1 = /** @class */ (function (_super) {
    __extends(DiceSceneTab1, _super);
    function DiceSceneTab1() {
        var _this = _super.call(this) || this;
        // private _notList:ScrollList;
        _this._mycardgroup = null;
        _this._teamid = 1;
        // private _scrollview : ScrollView = null;
        _this._lastIdx = -1;
        _this._diceNumTxt = null;
        _this._critNumTxt = null;
        _this._critGroup = null;
        _this._critbg = null;
        // private _havecardGroup : BaseDisplayObjectContainer = null;
        _this._line = null;
        _this.curDice = null;
        _this._teamDice = null;
        _this._lastCritNum = 0;
        _this.initView();
        return _this;
    }
    DiceSceneTab1.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.DICE_INFOCLICK, MsgConst.DICE_CHANGETOTEAM, MsgConst.TWEEN_CIRT_NUM
        ];
    };
    DiceSceneTab1.prototype.getNetConstEventArr = function () {
        return [
            NetConst.DICE_UPGRADE, NetConst.DICE_USE, NetConst.REQUEST_USER_STEPGUILD
        ];
    };
    DiceSceneTab1.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.DICE_INFOCLICK:
                view.clickInfo(evt);
                break;
            case MsgConst.DICE_CHANGETOTEAM:
                view.changeToTeam(evt);
                break;
            case MsgConst.TWEEN_CIRT_NUM:
                view.freshCritNum(1);
                break;
        }
    };
    DiceSceneTab1.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.DICE_UPGRADE:
                view.upgardeBack(evt);
                break;
            case NetConst.DICE_USE:
                view.useBack(evt);
                break;
            case NetConst.REQUEST_USER_STEPGUILD:
                view.stepBack(evt);
                break;
        }
    };
    DiceSceneTab1.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        var view = this;
        view.initEventListener();
        view._teamid = Api.LineVoApi.getCurLine();
        view.initTabbarGroup();
        var tabArr = this.getTabbarTextArr();
        // let skinView : any  = ViewController.getInstance().getView(`SkinView`);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 120 - 39;
        //顶部骰子队列
        var group = new BaseDisplayObjectContainer();
        group.width = 587;
        group.height = 254;
        view.addChild(group);
        view._mycardgroup = group;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, view, [0, 20], true);
        var card_bg = BaseBitmap.create("ab_card_bg");
        // card_bg.width = group.width;
        // card_bg.height = group.height;
        group.addChild(card_bg);
        card_bg.y = 60;
        // let tabbg = BaseBitmap.create(`card_group_tab_bg`);
        // tabbg.width = 260;
        // tabbg.height = 36;
        // group.addChild(tabbg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tabbg, card_bg, [0,20]);
        // view.setChildIndex(view.tabbarGroup, view.getChildIndex(group));
        view.setTabBarPosition();
        // view.changeTab();
        //分割线
        var line = BaseBitmap.create("public_line1");
        line.width = 600;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, group, [0, group.height + 25]);
        view._line = line;
        line.visible = false;
        view.createView();
        // let tab = Api.LineVoApi.getCurLine() - 1;
        // if(tab){
        // 	view.clickTabbarHandler({index : tab, no : true}); 
        // 	view.selectedTabIndex = tab;
        // 	view.tabbarGroup.selectedIndex = tab;
        // }
        // let mask2 = BaseBitmap.create(`public_graymask`);
        // view.addChild(mask2);
        // mask2.width = view._scrollview.width;
        // mask2.height = view._scrollview.height;
        // mask2.touchEnabled = false;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask2, view._scrollview, [0,10]);
        // let tab = Api.LineVoApi.getCurLine() - 1;
        // view.clickTabbarHandler({index : tab}); 
        // view.selectedTabIndex = tab;
        // view.tabbarGroup.selectedIndex = tab;
    };
    DiceSceneTab1.prototype.initTabbarGroup = function () {
        var view = this;
        var tabBarTextArr = view.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            view.tabbarGroup = ComponentMgr.getTabBarGroup(view.getTabbarName(), tabBarTextArr, view.clickTabbarHandler, view, null, '', 0, false, 235, 68);
            view.addChild(view.tabbarGroup);
            view.tabbarGroup.selectedIndex = this._selectedTabIndex;
            view.tabbarGroup.setColor(ColorEnums.white, ColorEnums.cardSel);
        }
    };
    DiceSceneTab1.prototype.createView = function () {
        var view = this;
        var cardGroup = new BaseDisplayObjectContainer();
        cardGroup.width = 640;
        //已有卡组
        // let havecardGroup = new BaseDisplayObjectContainer();
        // havecardGroup.width = view.width;
        // cardGroup.addChild(havecardGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, havecardGroup, cardGroup, [0,0], true);
        // view._havecardGroup = havecardGroup;
        var havenum = Api.DiceVoApi.getDiceTotalType();
        var totalnum = Config.DiceCfg.getTotalDice();
        var myDiceTxt = ComponentMgr.getTextField(LangMger.getlocal("mydice", [havenum.toString(), totalnum.toString()]), TextFieldConst.SIZE_30, ColorEnums.white);
        view.addChild(myDiceTxt);
        myDiceTxt.stroke = 1.5;
        myDiceTxt.strokeColor = ColorEnums.black;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, myDiceTxt, view._line, [0, view._line.height + 10]);
        view._diceNumTxt = myDiceTxt;
        var critbg = BaseBitmap.create("ab_boss_bg");
        critbg.width = 400;
        critbg.height = 54;
        view.addChild(critbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, critbg, myDiceTxt, [0, myDiceTxt.height + 10]);
        view._critbg = critbg;
        var critGroup = new BaseDisplayObjectContainer();
        critGroup.width = critbg.width;
        critGroup.height = critbg.height;
        view.addChild(critGroup);
        view._critGroup = critGroup;
        var criticon = BaseBitmap.create("dicecriticon");
        critGroup.addChild(criticon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, criticon, critGroup, [15, 0]);
        var critDes = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_NORMAL);
        critGroup.addChild(critDes);
        critDes.text = LangMger.getlocal("mydicecrit");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, critDes, critGroup, [criticon.width + 40, 0]);
        var critNum = Api.DiceVoApi.getDiceCrit();
        var critTxt = ComponentMgr.getTextField(critNum.toString() + "%", TextFieldConst.SIZE_CONTENT_NORMAL);
        critGroup.addChild(critTxt);
        view._critNumTxt = critTxt;
        critTxt.strokeColor = ColorEnums.btnStrokeBlue;
        ;
        critTxt.anchorOffsetX = critTxt.width / 2;
        critTxt.anchorOffsetY = critTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, critTxt, critDes, [0, 0]);
        critTxt.x = critDes.x + critDes.width + 2 + critTxt.width / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, critGroup, critbg);
        var rulebtn = ComponentMgr.getButton("dicerule", "", function (evt) {
            var point = new egret.Point(rulebtn.localToGlobal().x + rulebtn.width / 2, rulebtn.localToGlobal().y - 5);
            App.CommonUtil.showExtendTip(LangMger.getlocal("mydicecritdesc"), point);
            App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
                idx: -1,
                dice: ""
            });
        }, view);
        critGroup.addChild(rulebtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rulebtn, critGroup, [20, 0]);
        //拥有的骰子卡片列表
        var diceidarr = []; //Api.DiceVoApi.getDiceInfoList();
        var height = view.height - critbg.height - critbg.y - 90;
        var num = Math.ceil(height / 293) * 4;
        var list = ComponentMgr.getScrollList(DiceInfoItem, diceidarr, new egret.Rectangle(0, 0, view.width - 20, height), view._teamid, num);
        list.horizontalScrollPolicy = "off";
        list.bounces = false;
        view.addChild(list);
        view._haveList = list;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, critbg, [0, critbg.height]);
        if (Api.GameinfoVoApi.checlIsInGuideId(19)) {
            for (var i = 0; i < diceidarr.length; ++i) {
                var unit = diceidarr[i];
                if (unit == "106") {
                    view._haveList.setScrollTopByIndex(i);
                    var item = list.getItemByIndex(i);
                    view._haveList.horizontalScrollPolicy = 'off';
                    view._haveList.verticalScrollPolicy = 'off';
                    view.curDice = item;
                    break;
                }
            }
        }
        if (!Api.GameinfoVoApi.getIsFinishStepGuide(28) && Api.DiceVoApi.getDiceCanLevelUpNum() > 0) {
            Api.GameinfoVoApi.setCurGudingId(28);
            for (var i = 0; i < diceidarr.length; ++i) {
                var unit = diceidarr[i];
                var num_1 = Api.DiceVoApi.getDiceNumById(unit);
                var lv = Api.DiceVoApi.getDiceLvById(unit);
                var cfg = Config.DiceCfg.getCfgById(unit);
                var needNum = cfg.getNextLvCostNumByLv(lv + 1);
                if (needNum && num_1 >= needNum) {
                    var item = list.getItemByIndex(i);
                    view._haveList.setScrollTopByIndex(i);
                    // view._haveList.scrollTop = i < 4 ? 0 : top;
                    view._haveList.horizontalScrollPolicy = 'off';
                    view._haveList.verticalScrollPolicy = 'off';
                    view.curDice = item;
                    break;
                }
            }
        }
    };
    DiceSceneTab1.prototype.getTabPos = function () {
        var x = 0;
        var y = 0;
        if (this._mycardgroup) {
            x = this._mycardgroup.x + 12;
            y = this._mycardgroup.y + 60;
        }
        return {
            x: x,
            y: y
        };
    };
    DiceSceneTab1.prototype.clickTabbarHandler = function (data) {
        var view = this;
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        view.lastSelectedTabIndex = view.selectedTabIndex;
        view.selectedTabIndex = index;
        view._teamid = index + 1;
        if (!data.no) {
            NetManager.request(NetConst.DICE_CHOOSELINE, {
                lineNo: view._teamid
            });
        }
        view.changeTab();
        view.checkDiceInUse();
        view._diceNumTxt.visible = view._critbg.visible = view._critGroup.visible = view._haveList.visible = true;
    };
    DiceSceneTab1.prototype.checkDiceInUse = function () {
        var view = this;
        var havenum = Api.DiceVoApi.getDiceTotalType();
        for (var i = 0; i < havenum; ++i) {
            var item = view._haveList.getItemByIndex(i);
            if (item) {
                item.checkInUse(view._teamid);
            }
        }
    };
    DiceSceneTab1.prototype.changeTab = function () {
        var name = "MyCardTeamType";
        var tabveiwClass = egret.getDefinitionByName(name + "Tab" + (this.selectedTabIndex + 1));
        var pos = this.getTabPos();
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                commViewTab.setPosition(pos.x, pos.y);
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass();
                this.tabViewData[this.selectedTabIndex] = tabView;
                // tabView["param"]=this.param;
                tabView.setPosition(pos.x, pos.y);
                this.addChild(tabView);
            }
            if (!Api.GameinfoVoApi.getIsFinishNewGuide()) {
                var tabteam = this.tabViewData[0];
                if (tabteam) {
                    this._teamDice = tabteam._scrollList.getItemByIndex(3);
                }
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex] && this.lastSelectedTabIndex != this.selectedTabIndex) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    DiceSceneTab1.prototype.setTabBarPosition = function () {
        var view = this;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view._mycardgroup, [0, 16]);
        for (var i = 0; i < 3; ++i) {
            var tab = view.tabbarGroup.getTabBar(i);
            var txt = tab.getChildByName("btnTxt");
            txt.bold = true;
            txt.width = 65; // 给的按钮图片有透明区，左右不对称
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.setPosition(0, 10);
            tab.x = i * 80;
        }
    };
    DiceSceneTab1.prototype.getTabbarTextArr = function () {
        return ["1", "2", "3"];
    };
    // 页签图名称
    DiceSceneTab1.prototype.getTabbarName = function () {
        return "ab_tab_btn";
    };
    DiceSceneTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        var diceidarr = Api.DiceVoApi.getDiceInfoList();
        if (Api.DiceVoApi.needfreshDice) {
            Api.DiceVoApi.needfreshDice = false;
            view._haveList.refreshData(diceidarr, view._teamid);
        }
        // 
        view._diceNumTxt.visible = view._critbg.visible = view._critGroup.visible = view._haveList.visible = true;
        if (Api.GameinfoVoApi.checlIsInGuideId(19)) {
            for (var i = 0; i < diceidarr.length; ++i) {
                var unit = diceidarr[i];
                if (unit == "106") {
                    view._haveList.setScrollTopByIndex(i);
                    var item = view._haveList.getItemByIndex(i);
                    view._haveList.horizontalScrollPolicy = 'off';
                    view._haveList.verticalScrollPolicy = 'off';
                    view.curDice = item;
                    break;
                }
            }
        }
        if (!Api.GameinfoVoApi.getIsFinishStepGuide(28) && Api.DiceVoApi.getDiceCanLevelUpNum() > 0) {
            Api.GameinfoVoApi.setCurGudingId(28);
            for (var i = 0; i < diceidarr.length; ++i) {
                var unit = diceidarr[i];
                var num = Api.DiceVoApi.getDiceNumById(unit);
                var lv = Api.DiceVoApi.getDiceLvById(unit);
                var cfg = Config.DiceCfg.getCfgById(unit);
                var needNum = cfg.getNextLvCostNumByLv(lv + 1);
                if (needNum && num >= needNum) {
                    var item = view._haveList.getItemByIndex(i);
                    view._haveList.setScrollTopByIndex(i);
                    // view._haveList.scrollTop = i < 4 ? 0 : top;
                    view._haveList.horizontalScrollPolicy = 'off';
                    view._haveList.verticalScrollPolicy = 'off';
                    view.curDice = item;
                    break;
                }
            }
        }
        view.lastSelectedTabIndex = null;
        var tab = Api.LineVoApi.getCurLine() - 1;
        view.clickTabbarHandler({ index: tab, no: true });
        view.selectedTabIndex = tab;
        view.tabbarGroup.selectedIndex = tab;
        view.freshView();
        // view.changeTab();
    };
    DiceSceneTab1.prototype.freshView = function (up) {
        var view = this;
        var critNum = Api.DiceVoApi.getDiceCrit();
        if (up && up === 1) {
            // //暴击伤害变化
            // let obj = {num: this._lastCritNum};
            // egret.Tween.get(obj, {
            //     onChange:()=>{
            //         view._critNumTxt.text = LangMger.getlocal(`mydicecrit`, [obj.num.toString()]);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._critNumTxt, view._critGroup);
            //     }
            // }).to({num: critNum}, 500);
            // view._critNumTxt.text = LangMger.getlocal(`mydicecrit`, [critNum.toString()]);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._critNumTxt, view._critGroup);
        }
        else {
            //暴击伤害变化
            view._critNumTxt.text = critNum + "%";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view._critNumTxt, view._critGroup, [100, 0]);
            this._lastCritNum = critNum;
        }
        //筛子列表变化
        var havenum = Api.DiceVoApi.getDiceTotalType();
        var totalnum = Config.DiceCfg.getTotalDice();
        view._diceNumTxt.text = LangMger.getlocal("mydice", [havenum.toString(), totalnum.toString()]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._diceNumTxt, view, [0,30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._diceNumTxt, view._line, [0, view._line.height + 10]);
    };
    DiceSceneTab1.prototype.freshCritNum = function (up) {
        var view = this;
        var critNum = Api.DiceVoApi.getDiceCrit();
        egret.Tween.removeTweens(this._critNumTxt);
        // this._critNumTxt.anchorOffsetX = this._critNumTxt.width / 2;
        // this._critNumTxt.anchorOffsetY = this._critNumTxt.height / 2;
        var tw = egret.Tween.get(this._critNumTxt);
        var temNum = critNum - this._lastCritNum;
        for (var index = 0; index < temNum; index++) {
            tw = tw.to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        }
        //暴击伤害变化
        var obj = { num: this._lastCritNum };
        egret.Tween.get(obj, {
            onChange: function () {
                view._critNumTxt.text = obj.num.toFixed() + "%";
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._critNumTxt, view._critGroup);
            }
        }).to({ num: critNum }, 200 * temNum)
            .call(function () {
            view._lastCritNum = critNum;
        });
    };
    DiceSceneTab1.prototype.clickInfo = function (evt) {
        var view = this;
        var dice = evt.data.dice;
        var lastitem = view._haveList.getItemByIndex(view._lastIdx);
        if (lastitem) {
            lastitem.hideInfo();
        }
        var idx = evt.data.idx;
        view._lastIdx = idx;
        var curItem = view._haveList.getItemByIndex(idx);
        if (curItem && (!Api.GameinfoVoApi.checlIsInStepId(28) && Api.GameinfoVoApi.getIsFinishNewGuide())) {
            //检测视角
            view._haveList.setScrollTopByIndex(idx, 500);
        }
    };
    DiceSceneTab1.prototype.upgardeBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //骰子信息刷新
            var lastitem = view._haveList.getItemByIndex(view._lastIdx);
            if (lastitem) {
                lastitem.freshInfo();
            }
            view.freshView(1);
            Api.DiceVoApi.needfreshDice = false;
        }
    };
    DiceSceneTab1.prototype.useBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //骰子信息刷新
            view.checkDiceInUse();
            view._diceNumTxt.visible = view._critbg.visible = view._critGroup.visible = view._haveList.visible = true;
        }
    };
    DiceSceneTab1.prototype.changeToTeam = function (evt) {
        var view = this;
        var dice = evt.data.dice;
        if (evt.data.show) {
            view._diceNumTxt.visible = view._critbg.visible = view._critGroup.visible = view._haveList.visible = true;
        }
        else {
            view._diceNumTxt.visible = view._critbg.visible = view._critGroup.visible = view._haveList.visible = false;
            var commViewTab = view.tabViewData[view.selectedTabIndex];
            if (commViewTab) {
                commViewTab.openChangeTeam(dice);
            }
        }
    };
    DiceSceneTab1.prototype.checkCanUse = function () {
        var view = this;
    };
    DiceSceneTab1.prototype.stepBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            view._haveList.scrollTop = 0;
            view._haveList.horizontalScrollPolicy = 'on';
            view._haveList.verticalScrollPolicy = 'on';
        }
    };
    DiceSceneTab1.prototype.dispose = function () {
        var view = this;
        view._lastCritNum = 0;
        view._haveList = null;
        // view._notList = null;
        view._mycardgroup = null;
        view._teamid = 1;
        // view._scrollview = null;
        view._lastIdx = -1;
        view._diceNumTxt = null;
        view._critNumTxt = null;
        view._critGroup = null;
        view._critbg = null;
        // view._havecardGroup = null;
        view._line = null;
        view.curDice = null;
        view._teamDice = null;
        _super.prototype.dispose.call(this);
    };
    return DiceSceneTab1;
}(CommonViewTab));
//# sourceMappingURL=DiceSceneTab1.js.map