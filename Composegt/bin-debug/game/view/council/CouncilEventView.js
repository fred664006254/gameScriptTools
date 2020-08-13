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
            "discussseat", "acsevenckjl", "punish_reward_icon", "discusslistbg", "studyatk_arrow", "discussredbg", "dinner_name_bg1", "discuss_name_bg1",
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
        view.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("discussviewbg");
        bg.y = -60;
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
            if (roleinfo) {
                roleinfo.titleId = '3201';
            }
        }
        else {
            roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(titleId);
        }
        if (!roleinfo || roleinfo.uid == 0) {
            var arr = ['3201', '3000', '3102', '3103', '3105'];
            for (var i in arr) {
                if (arr[i] == '3201') {
                    roleinfo = Api.councilVoApi.getKingData();
                    if (roleinfo) {
                        roleinfo.titleId = '3201';
                    }
                    // roleinfo.titleId = '3201';
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
            if (!roleinfo) {
                var randL = Api.rankVoApi.getRankListByTabIdx(0);
                if (randL && randL[0]) {
                    roleinfo = randL[0];
                    roleinfo['titleId'] = roleinfo.ti;
                }
            }
        }
        var role = new CouncilRole();
        if (roleinfo) {
            role.y = 50;
            role.refreshUIWithData(roleinfo);
        }
        role.scaleX = role.scaleY = 0.4;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, role, bg, [0, 180]);
        view._nodeContainer.addChild(role);
        //名
        if (roleinfo && roleinfo.uid) {
            var nameBg = BaseBitmap.create("dinner_name_bg1");
            nameBg.width = 180;
            nameBg.height = 30;
            view._nodeContainer.addChild(nameBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0, 10]);
            var nameTxt = ComponentManager.getTextField(roleinfo.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
            view._nodeContainer.addChild(nameTxt);
        }
        var titlepath = Config.TitleCfg.getTitleIcon3WithLv(titleId, roleinfo ? roleinfo.titlelv : null);
        var titleImg = BaseLoadBitmap.create(titlepath);
        titleImg.width = 186;
        titleImg.height = 42;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0, 50]);
        view._nodeContainer.addChild(titleImg);
        //文本框
        var descbg = BaseBitmap.create("public_9v_bg11_2"); //public_chatbg3 
        descbg.width = 420;
        if (PlatformManager.checkIsThSp()) {
            descbg.width = 380;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, role, [0, -100]);
        view._nodeContainer.addChild(descbg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(view._type == 4 ? 'discussViewEventSuccess' : "discussViewEventDesc" + data.eventNeedType + "_" + view.api.getDescId(data.eventNeedType)), 20, TextFieldConst.COLOR_BROWN);
        descTxt.width = descbg.width - 40;
        descTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descbg, [0, 20]);
        view._nodeContainer.addChild(descTxt);
        descbg.height = descTxt.height + 20 + 25 + 40;
        //所需述性
        var needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewNeedType3", [LanguageManager.getlocal("servantInfo_speciality" + (data.eventNeedType == 0 ? 7 : data.eventNeedType))]), 20, TextFieldConst.COLOR_WARN_RED2);
        view.setLayoutPosition(LayoutConst.rightbottom, needTypeTxt, descbg, [15, 30]);
        view._nodeContainer.addChild(needTypeTxt);
        if (PlatformManager.checkIsEnLang()) {
            needTypeTxt.setPosition(descbg.x + descbg.width / 2 - needTypeTxt.width / 2, descbg.y + descbg.height - needTypeTxt.height - 50);
        }
        // let arrowBM = BaseBitmap.create("public_arrow");
        // arrowBM.anchorOffsetX = arrowBM.width / 2;
        // arrowBM.anchorOffsetY = arrowBM.height / 2;
        // arrowBM.rotation = -90;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, arrowBM, descbg, [arrowBM.anchorOffsetX - 3, descbg.height - 10 + arrowBM.anchorOffsetY]);
        // view._nodeContainer.addChild(arrowBM);
        // if(PlatformManager.checkIsThSp())
        // {
        //     arrowBM.x -= 77;
        // }
        // if(view._type == 4){
        // }
        // else{
        //     let tmpRect =  new egret.Rectangle(0,0,498, GameConfig.stageHeigth - role.y - 80 - 250 - 30);
        //     scrollList = ComponentManager.getScrollList(CouncilEventRoleItem, [], tmpRect);
        //     view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0,250]);
        // }
        if (view._type == 4) {
            var arr = view.api.getEventPlayerInfo(view.param.data.eventId, view._type);
            var tmpRect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - role.y - role.height * 0.5 - 50);
            var scrollList = ComponentManager.getScrollList(CouncilEventSuccessItem, arr, tmpRect, NaN, view.api.getMaxJoinNum());
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0, role.height * 0.5 - 50]);
            scrollList.bounces = false;
            view._nodeContainer.addChild(scrollList);
            // view.swapChildren(view._nodeContainer,view.container);
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
            else {
                var box1 = BaseBitmap.create('public_9v_bg03');
                box1.width = GameConfig.stageWidth;
                box1.height = tmpRect.height + 30;
                box1.x = 0;
                box1.y = scrollList.y - 15;
                // view.setLayoutPosition(LayoutConst.horizontalCentertop, box1, role, [0,role.height * 0.5 - 60]);
                view._nodeContainer.addChild(box1);
                view._nodeContainer.swapChildren(box1, scrollList);
                var line = BaseBitmap.create('public_line');
                line.width = GameConfig.stageWidth;
                line.x = box1.x;
                line.y = box1.y;
                view._nodeContainer.addChild(line);
            }
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
            scrollView.horizontalScrollPolicy = "off";
            scrollView.y = -15;
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
            var ckBtn = ComponentManager.getButton('punish_reward_icon', '', view.ckjliClick, view);
            // view.setLayoutPosition(LayoutConst.lefttop, ckBtn, view._nodeContainer, [10, view.titleBg.height + 40]);
            ckBtn.x = GameConfig.stageWidth - 90;
            ckBtn.y = 10;
            view._nodeContainer.addChild(ckBtn);
            var cktxt = BaseBitmap.create('acsevenckjl');
            view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCenterbottom, cktxt, ckBtn);
            view._nodeContainer.addChild(cktxt);
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
    };
    CouncilEventView.prototype.joinEventClick = function () {
        var view = this;
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
        if (data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETRANK) {
            view.api.setRankInfo(view.param.data.eventId, data.data.data);
        }
        else if (data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL) {
            view.api.setEventSeatInfo(view.param.data.eventId, data.data.data.seatlist);
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
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),view.palaceInfoHandlerCallback,view);
        _super.prototype.dispose.call(this);
    };
    return CouncilEventView;
}(CommonView));
__reflect(CouncilEventView.prototype, "CouncilEventView");
