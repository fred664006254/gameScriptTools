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
 * 内阁/议事院具体事件view
 * author qianjun
 */
var CouncilEventView = (function (_super) {
    __extends(CouncilEventView, _super);
    function CouncilEventView() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._type = 1; //1参加时间 2结算间隔 3领赏时间
        _this._timeDesc = null;
        _this._topbg = null;
        _this._listview = null;
        return _this;
    }
    CouncilEventView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenckjl", "acsevenckjl_down", "discussplayerrole", "discussviewbg", "discussviewbg2",
            "palace_role_empty", "palace_role_shadow", "palace_king_empty", "emparena_bottom", "studyatk_frame_light", "studyatk_frame",
            "discussseat"
        ]);
    };
    CouncilEventView.prototype.getTitleStr = function () {
        return 'councilViewTitle';
    };
    Object.defineProperty(CouncilEventView.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilEventView.prototype.getRuleInfo = function () {
        return "councilRuleInfo";
    };
    CouncilEventView.prototype.getBgName = function () {
        return null;
    };
    CouncilEventView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        var zoneStr2 = 0;
        var zoneStr3 = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(12).hour;
        zoneStr2 = App.DateUtil.formatSvrHourByLocalTimeZone(22).hour;
        zoneStr3 = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + "", zoneStr2 + "", zoneStr2 + "", zoneStr + "", zoneStr3 + ""];
    };
    // protected initBg():void
    // {
    // 	let bgName:string=this.getBgName();
    // 	if(bgName)
    // 	{
    // 		this.viewBg = BaseLoadBitmap.create(bgName);
    // 		if(this.isTouchMaskClose())
    // 		{
    // 			this.viewBg.touchEnabled=true;
    // 		}
    //         this.addChild(this.viewBg);
    //         this.viewBg.width = GameConfig.stageWidth;
    //         this.height = GameConfig.stageHeigth;
    //         //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
    // 		// 
    //         // this.viewBg.height = GameConfig.stageHeigth;
    //         // let mask = BaseLoadBitmap.create('empvsmask');
    //         // this.addChild(mask);
    // 		// mask.width = GameConfig.stageWidth;
    //         // mask.height = GameConfig.stageHeigth;
    //         this.viewBg.y = 0;
    // 	}
    // }
    CouncilEventView.prototype.initView = function () {
        var view = this;
        var data = view.param.data;
        view._data = data;
        view._type = view.api.getCurpeirod();
        if (view.api.canGetReward(data.eventId)) {
            NetManager.request(NetRequestConst.REQUST_COUNCIL_GETREWARD, {
                eventId: data.eventId,
                eventst: view.api.getEventInfoById(data.eventId).st
            });
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_COUNCIL_JOINEVENT, view.joinEventCallBack, view);
        view._nodeContainer = new BaseDisplayObjectContainer();
        view.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("discussviewbg");
        bg.y = -89;
        view._nodeContainer.addChild(bg);
        //人物形象
        //武-武 智-仁 政-政 魅-文
        var titleId = '';
        switch (Number(data.eventNeedType)) {
            case 1:
                titleId = '3000';
                break;
            case 2:
                titleId = '3102';
                break;
            case 3:
                titleId = '3103';
                break;
            case 4:
                titleId = '3105';
                break;
            case 0:
                titleId = '3201';
                break;
        }
        var roleinfo = null;
        if (titleId == '3201') {
            roleinfo = Api.councilVoApi.getKingData();
            roleinfo.titleId = '3201';
        }
        else {
            roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(titleId);
        }
        if (!roleinfo || roleinfo.uid == 0) {
            var arr = ['3201', '3000', '3102', '3103', '3105', '3104'];
            for (var i in arr) {
                if (arr[i] == '3201') {
                    roleinfo = Api.councilVoApi.getKingData();
                    roleinfo.titleId = '3201';
                }
                else {
                    roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(arr[i]);
                }
                if (roleinfo && roleinfo.uid) {
                    titleId = arr[i];
                    break;
                }
                else {
                    roleinfo = null;
                }
            }
        }
        this._dbNode1 = new BaseDisplayObjectContainer(); //下层可变特效
        this._nodeContainer.addChild(this._dbNode1);
        this._dbNode2 = new BaseDisplayObjectContainer(); //上层可变
        this._dbNode3 = new BaseDisplayObjectContainer(); //上层不可变
        var role = new CouncilRole();
        if (roleinfo) {
            role.y = 50;
            role.refreshUIWithData(roleinfo);
            this._dbNode1.x = this._dbNode2.x = this._dbNode3.x = 190;
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = role.y + 100;
        }
        else {
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = role.y + 40;
        }
        role.scaleX = role.scaleY = 0.4;
        this._dbNode1.setScale(0.4);
        this._dbNode2.setScale(0.4);
        this._dbNode3.setScale(0.4);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, role, bg, [0, 180]);
        view._nodeContainer.addChild(role);
        this._nodeContainer.addChild(this._dbNode2);
        this._nodeContainer.addChild(this._dbNode3);
        //名
        if (roleinfo) {
            var nameBg = BaseBitmap.create("public_9_bg12");
            nameBg.width = 120;
            nameBg.height = 30;
            view._nodeContainer.addChild(nameBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0, 10]);
            var nameTxt = ComponentManager.getTextField(roleinfo.name, 20);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
            view._nodeContainer.addChild(nameTxt);
            if (!roleinfo.tlv) {
                roleinfo.tlv = 1;
            }
        }
        var titleImg = App.CommonUtil.getTitlePic(titleId, roleinfo ? roleinfo.tlv : 1);
        titleImg.width = 155;
        titleImg.height = 59;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0, 50]);
        view._nodeContainer.addChild(titleImg);
        //文本框
        var descbg = BaseBitmap.create("public_9_bg25"); //public_chatbg3 
        descbg.width = 320;
        if (PlatformManager.checkIsThSp()) {
            descbg.width = 380;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, role, [0, -90]);
        view._nodeContainer.addChild(descbg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(view._type == 4 ? 'discussViewEventSuccess' : "discussViewEventDesc" + data.eventNeedType + "_" + view.api.getDescId(data.eventNeedType)), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = descbg.width - 40;
        descTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descbg, [0, 10]);
        view._nodeContainer.addChild(descTxt);
        descbg.height = descTxt.height + 20 + 25;
        //所需述性
        var needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewNeedType3", [LanguageManager.getlocal("servantInfo_speciality" + (data.eventNeedType == 0 ? 7 : data.eventNeedType))]), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        view.setLayoutPosition(LayoutConst.rightbottom, needTypeTxt, descbg, [15, 10]);
        view._nodeContainer.addChild(needTypeTxt);
        if (PlatformManager.checkIsEnLang()) {
            needTypeTxt.setPosition(descbg.x + descbg.width / 2 - needTypeTxt.width / 2, descbg.y + descbg.height - needTypeTxt.height - 10);
        }
        var arrowBM = BaseBitmap.create("public_arrow");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        arrowBM.rotation = -90;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, arrowBM, descbg, [arrowBM.anchorOffsetX - 3, descbg.height - 10 + arrowBM.anchorOffsetY]);
        view._nodeContainer.addChild(arrowBM);
        if (PlatformManager.checkIsThSp()) {
            arrowBM.x -= 77;
        }
        // if(view._type == 4){
        // }
        // else{
        //     let tmpRect =  new egret.Rectangle(0,0,498, GameConfig.stageHeigth - role.y - 80 - 250 - 30);
        //     scrollList = ComponentManager.getScrollList(CouncilEventRoleItem, [], tmpRect);
        //     view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0,250]);
        // }
        if (view._type == 4) {
            var arr = view.api.getEventPlayerInfo(view.param.data.eventId, view._type);
            var tmpRect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - role.y - role.height * 0.5 - 10);
            var scrollList = ComponentManager.getScrollList(CouncilEventSuccessItem, arr, tmpRect, NaN, view.api.getMaxJoinNum());
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0, role.height * 0.5 - 60]);
            view._nodeContainer.addChild(scrollList);
            view.swapChildren(view._nodeContainer, view.container);
            if (!arr.length) {
                var listbg = BaseBitmap.create('discusslistbg');
                listbg.width = 634;
                listbg.height = scrollList.height - 20;
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, scrollList);
                view._nodeContainer.addChild(listbg);
                view._nodeContainer.swapChildren(scrollList, listbg);
                var tipbg = BaseBitmap.create('public_tipbg');
                tipbg.width = listbg.width - 60;
                tipbg.height = 30;
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipbg, listbg);
                view._nodeContainer.addChild(tipbg);
                var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('councilNoManJoin'), 24); //
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
                view._nodeContainer.addChild(tipTxt);
            }
            view._nodeContainer.y = 89;
        }
        else {
            for (var index = 0; index < view.api.getMaxJoinNum(); index++) {
                this.makeSeatItem(index);
            }
            var bgcount = Math.ceil((this._nodeContainer.height - bg.height) / 285);
            for (var i = 0; i < bgcount; ++i) {
                var bg2 = BaseBitmap.create("discussviewbg2");
                bg2.y = bg.height + i * 285 + bg.y;
                view._nodeContainer.addChildAt(bg2, 1);
            }
            var scrollH = GameConfig.stageHeigth + 10;
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
            var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
            scrollView.bounces = false;
            view.addChildToContainer(scrollView);
            view._listview = scrollView;
            view.fresh_list();
            // let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
            // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view._listview);
            // view.addChild(emparena_bottom);
            // //底部
            // let savebtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `discussViewVisitEvent`, view.joinEventClick, view);
            // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, savebtn, emparena_bottom); 
            // view.addChild(savebtn);
            // savebtn.setGray(view.api.isVisitEvent(data.eventId) || view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum());
            // view._saveBtn = savebtn;
            // emparena_bottom.visible = savebtn.visible = view._type == 2;
            var ckBtn = ComponentManager.getButton('acsevenckjl', '', view.ckjliClick, view);
            view.setLayoutPosition(LayoutConst.lefttop, ckBtn, view.titleBg, [10, view.titleBg.height + 10]);
            view.addChild(ckBtn);
        }
        //身体特效
        if (1) {
        }
        view.refreshDBDragons(roleinfo);
    };
    CouncilEventView.prototype.refreshDBDragons = function (roleinfo) {
        var view = this;
        if (roleinfo) {
            var roleNode1 = this._dbNode1.getChildByName("roleNode1");
            var roleNode2 = this._dbNode2.getChildByName("roleNode2");
            if (roleNode1 && roleNode1 instanceof BaseLoadDragonBones) {
                roleNode1.stop();
                roleNode1.dispose();
            }
            if (roleNode2 && roleNode2 instanceof BaseLoadDragonBones) {
                roleNode2.stop();
                roleNode2.dispose();
            }
            this._dbNode1.removeChildren(); //下层可变特效
            this._dbNode2.removeChildren(); //上层可变
            this._dbNode3.removeChildren(); //上层不可变
            var level = roleinfo.tlv;
            if (level) {
                var cfg = null;
                var titleconfig = Config.TitleCfg.getTitleCfgById(roleinfo.titleId);
                var isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
                var iswang = titleconfig.isTitle == 1 && titleconfig.titleType == 2;
                var ishuang = titleconfig.isTitle == 1 && titleconfig.titleType == 7;
                if (isdi) {
                    cfg = Config.TitleupgradeCfg.diList[level - 1];
                }
                if (iswang) {
                    cfg = Config.TitleupgradeCfg.wangList[level - 1];
                }
                if (ishuang) {
                    cfg = Config.TitleupgradeCfg.huangList[level - 1];
                }
                var xialevel = 0;
                if (cfg.shoulder) {
                    xialevel = 1;
                }
                if (cfg.head) {
                    xialevel = 2;
                }
                if (cfg.body) {
                    xialevel = 3;
                }
                if (cfg.dragon) {
                    xialevel = 4;
                }
                if (xialevel >= 1) {
                    if (xialevel > 1) {
                        var xiapath = "huangdi_" + xialevel + "xia";
                        var roleNode1_1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
                        if (xialevel == 2) {
                            roleNode1_1.y = 160;
                        }
                        else if (xialevel == 3) {
                            roleNode1_1.y = 160;
                        }
                        else if (xialevel == 4) {
                            roleNode1_1.y = 180;
                        }
                        this._dbNode1.addChild(roleNode1_1);
                        roleNode1_1.name = "roleNode1";
                        roleNode1_1.x = GameConfig.stageWidth / 2;
                    }
                    var shangpath = "huangdi_" + (xialevel >= 3 ? 3 : xialevel) + "shang";
                    if (xialevel == 1) {
                        shangpath = "huangdi_1";
                    }
                    var roleNode2_1 = App.DragonBonesUtil.getLoadDragonBones(shangpath);
                    roleNode2_1.y = 200;
                    this._dbNode2.addChild(roleNode2_1);
                    roleNode2_1.name = "roleNode2";
                    roleNode2_1.x = GameConfig.stageWidth / 2;
                }
            }
        }
    };
    CouncilEventView.prototype.makeSeatItem = function (index) {
        var view = this;
        var item = view._nodeContainer.getChildByName('roleitem' + index);
        var arr = view.api.getEventPlayerInfo(view.param.data.eventId, view._type);
        if (item) {
            if (arr[index] && !arr[index].empty) {
                item.refreshRole(arr[index]);
            }
        }
        else {
            var councilEventRoleItem = new CouncilEventRoleItem();
            councilEventRoleItem.name = 'roleitem' + index;
            councilEventRoleItem.initItem(index + 1, arr[index]);
            var posX = 40;
            if ((index % 2) == 1) {
                //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
                //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
                posX = GameConfig.stageWidth - 290;
            }
            var posY = 350 + Math.floor(index / 2) * 310;
            councilEventRoleItem.x = posX;
            councilEventRoleItem.y = posY;
            view._nodeContainer.addChild(councilEventRoleItem);
        }
    };
    CouncilEventView.prototype.ckjliClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILRANKLISTVIEW, view._data);
    };
    CouncilEventView.prototype.fresh_list = function () {
        var view = this;
        if (view.api.isVisitEvent(view._data.eventId) && view._type < 4) {
            var idx = view.api.getJoinEventSeatId(view.param.data.eventId);
            if (idx) {
                var height = 350 + Math.floor((idx - 1) / 2) * 310;
                var scrollH = GameConfig.stageHeigth - this.container.y + 10;
                var scrollTop = height + 310 / 2;
                var maxY = 350 + Math.floor(view.api.getMaxJoinNum() / 2) * 310 + 310;
                var isTop = false;
                var isEnd = false;
                if (scrollTop < (scrollH / 2)) {
                    scrollTop = 0;
                }
                else if (scrollTop > (maxY - scrollH / 2)) {
                    scrollTop = maxY - scrollH;
                }
                else {
                    scrollTop = height + 310 / 2 - scrollH / 2;
                }
                view._listview.setScrollTop(scrollTop, 100);
                //setScrollTopByIndex(idx - 1, 80);
            }
        }
    };
    CouncilEventView.prototype.joinEventCallBack = function (evt) {
        if (evt.data.ret) {
            var view = this;
            var str = '';
            if (Number(evt.data.data.data.councilstat)) {
                switch (Number(evt.data.data.data.councilstat)) {
                    case 1:
                        str = 'discussJoinEventTip4';
                        break;
                    case 2:
                        str = 'discussJoinEventTip5';
                        break;
                    case 3:
                        str = 'discussJoinEventTip6';
                        break;
                    case 4:
                        str = 'discussJoinEventTip7';
                        break;
                    default:
                        str = 'discussJoinEventTip6';
                        break;
                }
                App.CommonUtil.showTip(LanguageManager.getlocal(str));
            }
            if (evt.data.data.data.seatlist) {
                view.api.setEventSeatInfoBack(view.param.data.eventId, evt.data.data.data.seatlist);
                for (var index = 0; index < view.api.getMaxJoinNum(); index++) {
                    this.makeSeatItem(index);
                }
                // let seatid = Number(evt.data.data.data.seatinfo.seatId);
                // view.makeSeatItem(seatid - 1);
                view.fresh_list();
                //view._saveBtn.setGray(view.api.isVisitEvent(view._data.eventId) || view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum());
            }
        }
    };
    CouncilEventView.prototype.joinEventClick = function () {
        var view = this;
        if (Api.switchVoApi.checkOpenServerMaintain()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        if (view.api.isVisitEvent(view._data.eventId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewHaveVisit"));
            return;
        }
        if (view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewNumEnough"));
            return;
        }
        if (view.api.getCurpeirod() != 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewEventTimePass"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILSELECTSERVANTVIEW, view._data);
    };
    CouncilEventView.prototype.getRequestData = function () {
        var view = this;
        view._type = view.api.getCurpeirod();
        var msg = view._type == 4 ? NetRequestConst.REQUST_COUNCIL_GETRANK : NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL;
        return { requestType: msg, requestData: { eventId: view.param.data.eventId } };
    };
    CouncilEventView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETRANK) {
                view.api.setRankInfo(view.param.data.eventId, data.data.data);
            }
            else if (data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL) {
                view.api.setEventSeatInfo(view.param.data.eventId, data.data.data.seatlist);
            }
        }
        // if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_DBRANK)
        // {
        // 	this._acData  = data.data.data;
        // 	//this._acVo = <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid,AcMayDayRankPopupView.code);
        // }
    };
    CouncilEventView.prototype.dispose = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO, {});
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_COUNCIL_JOINEVENT, view.joinEventCallBack, view);
        view._timeDesc = null;
        view._topbg = null;
        view._type = 1;
        view._listview = null;
        //view._saveBtn = null;
        view._nodeContainer = null;
        this._dbNode1 = null;
        this._dbNode2 = null;
        this._dbNode3 = null;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),view.palaceInfoHandlerCallback,view);
        _super.prototype.dispose.call(this);
    };
    return CouncilEventView;
}(CommonView));
__reflect(CouncilEventView.prototype, "CouncilEventView");
//# sourceMappingURL=CouncilEventView.js.map