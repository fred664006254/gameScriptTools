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
var AcThreeKingdomsMeetingView = (function (_super) {
    __extends(AcThreeKingdomsMeetingView, _super);
    function AcThreeKingdomsMeetingView() {
        var _this = _super.call(this) || this;
        _this._type = 1; //1赛季 2上轮
        _this._topGroup = null;
        _this._limitBtn = null;
        _this._orderBtn = null;
        _this._flagstate = null;
        _this._totalarr = [0, 0, 0];
        _this._roundarr = [0, 0, 0];
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsMeetingView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMeetingView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMeetingView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMeetingView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMeetingView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsMeetingView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsMeetingView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomsmeetingview", "specialview_commoni_namebg"
        ]);
    };
    AcThreeKingdomsMeetingView.prototype.getRuleInfo = function () {
        return "acThreeKingdomsMeetingRule-" + this.getUiCode();
    };
    AcThreeKingdomsMeetingView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomsmeetingtitle", this.getUiCode());
    };
    AcThreeKingdomsMeetingView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsMeetingView.prototype.getBgName = function () {
        return "threekingdomsmeetingbg";
    };
    AcThreeKingdomsMeetingView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcThreeKingdomsMeetingView.prototype.receiveData = function (data) {
        if (data.ret) {
            var arr = data.data.data.seasonScore;
            for (var i = 0; i < arr.length; ++i) {
                var unit = arr[i];
                if (i == arr.length - 1) {
                    this._roundarr = unit;
                }
                for (var j in unit) {
                    if (!this._totalarr[j]) {
                        this._totalarr[j] = 0;
                    }
                    this._totalarr[j] += Number(unit[j]);
                }
            }
            // let scorearr = 
            // for(let i = 0; i < scorearr.length; ++ i){
            //     this._arr.push({
            // 		kingdomid : Number(i) + 1,
            // 		value : scorearr[i]
            // 	});
            // }
            // this._arr.sort((a,b)=>{
            // 	return b.value - a.value;
            // });
        }
    };
    AcThreeKingdomsMeetingView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.height = view.height - view.titleBg.height;
        view.container.y = view.titleBg.height;
        var topbg = BaseBitmap.create("threekingdomsmeetingtopbg");
        view.addChildToContainer(topbg);
        topbg.y = -20;
        view._type = 1;
        //切换按钮
        var btn = ComponentManager.getButton("threekingdomsmeetingtopbtn", '', function () {
            view._type = 3 - view._type;
            btn.setBtnBitMap(view._type == 1 ? "threekingdomsmeetingtopbtn" : "threekingdomsmeetingtopbtn_down");
            view.freshTop();
        }, view);
        view.addChildToContainer(btn);
        btn.y = -10;
        //顶部积分榜
        var topGroup = new BaseDisplayObjectContainer();
        topGroup.width = 515;
        view.addChildToContainer(topGroup);
        view._topGroup = topGroup;
        for (var i = 1; i <= 3; ++i) {
            var group = new BaseDisplayObjectContainer();
            group.name = "group" + i;
            topGroup.addChild(group);
            group.width = 150;
            group.x = (i - 1) * (150 + 30);
            var threekingdomsfont = BaseBitmap.create("threekingdomsfont" + i);
            group.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, threekingdomsfont, group, [0, 0], true);
            var pointbg = BaseBitmap.create("threekingdomspoint" + i + "bg");
            group.addChild(pointbg);
            pointbg.name = "pointbg" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, threekingdomsfont, [0, 25]);
            var point = view._type == 1 ? this._totalarr[i - 1] : this._roundarr[i - 1];
            var pointTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(point), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(pointTxt);
            pointTxt.name = "pointTxt" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, pointTxt, pointbg);
        }
        topGroup.x = 102;
        topGroup.y = -7;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topGroup, btn, [btn.width+10, 0]);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        // if(view.vo.getpublicRedhot1()){
        //     view.tabbarGroup.addRedPoint(2)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2)
        // }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
        var desk = BaseBitmap.create("threekingdomsmeetingdesk");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, desk, view.container, [0, 0], true);
        var manGroup = new BaseDisplayObjectContainer();
        manGroup.width = view.width;
        manGroup.height = desk.y - topbg.y - topbg.height + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, manGroup, desk, [0, desk.height - 20]);
        view.addChildToContainer(manGroup);
        manGroup.mask = new egret.Rectangle(0, 0, manGroup.width, manGroup.height);
        view.addChildToContainer(desk);
        //大都督 尚书 主簿 第二周
        var poscfg = {
            2: {
                layout: LayoutConst.leftbottom,
                param: [25, 0],
                nameparam: [0, 180],
                offlayout: LayoutConst.lefttop,
                offparam: [0, 0],
                emptyparam: [0, 140],
                roleparam: [0, 165],
                emplayout: LayoutConst.lefttop,
            },
            3: {
                layout: LayoutConst.rightbottom,
                param: [25, 0],
                nameparam: [0, 180],
                offlayout: LayoutConst.righttop,
                offparam: [0, 0],
                emptyparam: [0, 140],
                roleparam: [320, 165],
                emplayout: LayoutConst.lefttop,
            },
            1: {
                layout: LayoutConst.horizontalCenterbottom,
                param: [0, 70],
                nameparam: [0, 160],
                offlayout: LayoutConst.righttop,
                offparam: [0, 0],
                emptyparam: [0, 0],
                roleparam: [170, 50],
                emplayout: LayoutConst.horizontalCentertop,
            }
        };
        var week = view.vo.getCurWeek();
        //本周周一0点
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var man = null;
        var userContainer = null;
        for (var i = 1; i <= 3; ++i) {
            var pos = poscfg[i];
            var minfo = view.vo.getOfficalInfo(i);
            if (minfo) {
                var curLv = minfo.level;
                var tinfo = App.CommonUtil.getTitleData(minfo.title);
                if (tinfo.clothes != "") {
                    if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)) {
                        curLv = tinfo.clothes;
                    }
                    userContainer = new BaseDisplayObjectContainer();
                    var pic = minfo.pic;
                    userContainer.mask = egret.Rectangle.create().setTo(20, -40, 600, 800);
                    userContainer.name = "userContainer";
                    manGroup.addChild(userContainer);
                    var dbNode1 = new BaseDisplayObjectContainer(); //下层可变特效
                    userContainer.addChild(dbNode1);
                    var dbNode2 = new BaseDisplayObjectContainer(); //上层可变
                    var dbNode3 = new BaseDisplayObjectContainer(); //上层不可变
                    var role = null;
                    //App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")
                    role = Api.playerVoApi.getPlayerPortrait(Number(curLv), pic);
                    userContainer.addChild(role);
                    dbNode1.y = dbNode2.y = dbNode3.y = role.y + 40;
                    userContainer.anchorOffsetX = userContainer.width / 2;
                    userContainer.anchorOffsetY = userContainer.height / 2;
                    userContainer.addChild(dbNode2);
                    userContainer.addChild(dbNode3);
                    userContainer.anchorOffsetX = userContainer.width / 2; //300;
                    userContainer.anchorOffsetY = userContainer.height / 2;
                    userContainer.setScale(manGroup.height / 800);
                }
                else {
                    userContainer = Api.playerVoApi.getPlayerPortrait(curLv, minfo.pic);
                    userContainer.mask = egret.Rectangle.create().setTo(0, 0, userContainer.width, 800);
                    userContainer.x = 20;
                    userContainer.y = 40;
                    userContainer.name = "userContainer";
                    manGroup.addChild(userContainer);
                    userContainer.setScale(manGroup.height / 800);
                    userContainer.anchorOffsetX = userContainer.width / 2;
                    userContainer.anchorOffsetY = userContainer.height / 2;
                }
                if (i == 1) {
                    userContainer.x = 320;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY;
                }
                else if (i == 2) {
                    userContainer.x = 160;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                else if (i == 3) {
                    userContainer.x = 480;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                // App.DisplayUtil.setLayoutPosition(pos.emplayout, userContainer, manGroup, pos.emptyparam, true);
            }
            else {
                userContainer = BaseLoadBitmap.create("palace_role_empty");
                userContainer.width = 517;
                userContainer.height = 775;
                userContainer.setScale(manGroup.height / 775);
                manGroup.addChild(userContainer);
                userContainer.mask = egret.Rectangle.create().setTo(20, -40, 600, 800);
                userContainer.anchorOffsetX = userContainer.width / 2;
                userContainer.anchorOffsetY = userContainer.height / 2;
                if (i == 1) {
                    userContainer.x = 320;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY;
                }
                else if (i == 2) {
                    userContainer.x = 160;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                else if (i == 3) {
                    userContainer.x = 480;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
            }
            var official = BaseBitmap.create("threekingdomsofficial" + i);
            manGroup.addChild(official);
            if (i == 1) {
                official.x = 450;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
            }
            else if (i == 2) {
                official.x = 0;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
            }
            else if (i == 3) {
                official.x = 586;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
                if (PlatformManager.checkIsTextHorizontal()) {
                    official.x = 480;
                }
            }
            var namebg = BaseBitmap.create("specialview_commoni_namebg");
            namebg.name = "namebg" + i;
            manGroup.addChild(namebg);
            var str = "";
            var color = void 0;
            if (week >= 2) {
                if (minfo) {
                    str = minfo.name;
                    color = TextFieldConst.COLOR_LIGHT_YELLOW;
                }
                else {
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip2", code));
                    color = TextFieldConst.COLOR_WARN_RED;
                }
            }
            else {
                var end = view.vo.activeSt + 1 * (7 * 86400);
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsmeetingtip1", code), [App.DateUtil.getFormatBySecond(end, 7)]);
                color = TextFieldConst.COLOR_WARN_GREEN;
            }
            var nametxt = ComponentManager.getTextField(str, 20, color);
            nametxt.name = "nametxt" + i;
            manGroup.addChild(nametxt);
            namebg.width = nametxt.width + 50;
            if (i == 1) {
                namebg.x = 320 - namebg.width / 2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            else if (i == 2) {
                namebg.x = 160 - namebg.width / 2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            else if (i == 3) {
                namebg.x = 480 - namebg.width / 2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);
        }
        for (var i = 1; i <= 3; ++i) {
            var namebg = manGroup.getChildByName("namebg" + i);
            manGroup.setChildIndex(namebg, 9999);
            var nametxt = manGroup.getChildByName("nametxt" + i);
            manGroup.setChildIndex(nametxt, 9999);
        }
        //底部按钮
        var btnpos = {
            1: {
                layout: LayoutConst.lefttop,
                param: [80, 30],
            },
            2: {
                layout: LayoutConst.lefttop,
                param: [403, 65],
            },
            3: {
                layout: LayoutConst.lefttop,
                param: [240, 105],
            },
            4: {
                layout: LayoutConst.lefttop,
                param: [65, 190],
            },
            5: {
                layout: LayoutConst.lefttop,
                param: [520, 190],
            },
        };
        var _loop_1 = function (i) {
            var pos = btnpos[i];
            var group = new BaseDisplayObjectContainer();
            App.DisplayUtil.setLayoutPosition(pos.layout, group, desk, pos.param);
            view.addChildToContainer(group);
            var btn_1 = ComponentManager.getButton("threekingdomsmeetingbtn" + i, "", function () {
                var scene = "";
                switch (Number(i)) {
                    //神将助威
                    case 1:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSHEROCHEERVIEW;
                        break;
                    //排行榜
                    case 2:
                        scene = ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW;
                        break;
                    //军令
                    case 3:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSORDERVIEW;
                        break;
                    //限时军需
                    case 4:
                        scene = ViewConst.COMMON.ACTHREEKINGDOMSLIMITCHARGEVIEW;
                        break;
                    //转换阵营
                    case 5:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSCHANGETEAMVIEW;
                        break;
                }
                ViewController.getInstance().openView(scene, {
                    aid: view.aid,
                    code: view.code
                });
            }, view);
            group.addChild(btn_1);
            var citynamebg = BaseBitmap.create("threekingdomscitynamebg");
            var cityName = BaseBitmap.create("threekingdomsmeetingbtn" + i + "txt");
            citynamebg.width = cityName.width + 30;
            group.addChild(citynamebg);
            group.addChild(cityName);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynamebg, btn_1, [0, btn_1.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityName, citynamebg);
            if (Number(i) == 4) {
                view._limitBtn = group;
            }
            if (Number(i) == 3) {
                var flagstate = new BaseDisplayObjectContainer();
                flagstate.width = 56;
                flagstate.height = 90;
                var flag = BaseBitmap.create("threekingdomsorderstate2");
                flagstate.addChild(flag);
                var eff = ComponentManager.getCustomMovieClip("threekingdomsinorder", 10);
                eff.playWithTime(-1);
                // eff.blendMode = egret.BlendMode.ADD;
                flagstate.addChild(eff);
                eff.setPosition(-3, 2);
                view._flagstate = flagstate;
                group.addChild(flagstate);
                flagstate.setPosition(65, 10);
                view._orderBtn = group;
            }
        };
        for (var i in btnpos) {
            _loop_1(i);
        }
        //神将
        //排行榜
        //军令
        //限时军需
        //转换阵营
        view.freshTop();
        view.tick();
    };
    AcThreeKingdomsMeetingView.prototype.tick = function () {
        var view = this;
        //周六日出现限时军需
        view._limitBtn.visible = view.vo.getTodayWeek() > 5; //
        var info = view.vo.getOrderInfo();
        view._flagstate.visible = info.state == 2;
        if (view.vo.getpublicRedhot1()) {
            App.CommonUtil.addIconToBDOC(view._limitBtn);
            var reddot = view._limitBtn.getChildByName("reddot");
            if (reddot) {
                reddot.x = 65;
                reddot.y = 0;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._limitBtn);
        }
        //军令
        if (view.vo.getpublicRedhot7()) {
            App.CommonUtil.addIconToBDOC(view._orderBtn);
            var reddot = view._orderBtn.getChildByName("reddot");
            if (reddot) {
                reddot.x = 65;
                reddot.y = 0;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._orderBtn);
        }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
    };
    // private prankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setPrankinfo(evt.data.data.data);
    //     }
    // }
    // private zrankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setZrankinfo(evt.data.data.data);
    //     }
    // }
    //顶部的积分刷新
    AcThreeKingdomsMeetingView.prototype.freshTop = function () {
        var view = this;
        var topGroup = view._topGroup;
        var mykingdomid = view.vo.getMyKingdoms();
        var arr = [{
                id: 1,
                point: view._type == 1 ? this._totalarr[0] : this._roundarr[0]
            }, {
                id: 2,
                point: view._type == 2 ? this._totalarr[1] : this._roundarr[1]
            }, {
                id: 3,
                point: view._type == 3 ? this._totalarr[2] : this._roundarr[2]
            }];
        // arr.sort((a,b)=>{
        //     return b.point - a.point;
        //     // if(a.id == mykingdomid){
        //     //     return -1;
        //     // }
        //     // else if(b.id == mykingdomid){
        //     //     return 1;
        //     // }
        //     // else{
        //     //     return b.point - a.point;
        //     // }
        // });
        for (var i = 1; i <= arr.length; ++i) {
            var kingdomid = arr[i - 1].id;
            var group = topGroup.getChildByName("group" + kingdomid);
            group.x = (i - 1) * (150 + 30);
            var point = view._type == 1 ? this._totalarr[kingdomid - 1] : this._roundarr[kingdomid - 1];
            var pointTxt = group.getChildByName("pointTxt" + kingdomid);
            pointTxt.text = App.StringUtil.changeIntToText(point);
            var pointbg = group.getChildByName("pointbg" + kingdomid);
            //pointbg.setRes(i == 1 ? `threekingdomspoint${kingdomid}bg_down` : `threekingdomspoint${kingdomid}bg`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, pointbg, [0, 30]);
        }
    };
    AcThreeKingdomsMeetingView.prototype.dispose = function () {
        var view = this;
        view._type = 1;
        view._topGroup = null;
        view._limitBtn = null;
        view._flagstate = null;
        view._totalarr = [];
        view._roundarr = [];
        view._orderBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsMeetingView;
}(CommonView));
__reflect(AcThreeKingdomsMeetingView.prototype, "AcThreeKingdomsMeetingView");
//# sourceMappingURL=AcThreeKingdomsMeetingView.js.map