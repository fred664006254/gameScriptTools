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
 * 门客战界面
 * author qianjun
 */
var CountryWarView = (function (_super) {
    __extends(CountryWarView, _super);
    function CountryWarView() {
        var _this = _super.call(this) || this;
        _this._init = false;
        _this._countrywarleftbg = null;
        _this._countrywarrightbg = null;
        _this._timeDesc = null;
        _this._timeBg = null;
        _this._chatTxt = null;
        _this._servantBg = null;
        _this._servantList = null;
        _this._myRoleGroup0 = null;
        _this._myRoleGroup1 = null;
        _this._myRoleGroup2 = null;
        _this._myPos0 = [];
        _this._myIdx0 = 0;
        _this._myPos1 = [];
        _this._myIdx1 = 0;
        _this._myPos2 = [];
        _this._myIdx2 = 0;
        _this._noticeScrollView = null;
        _this._lineGroup1 = null;
        _this._lineGroup2 = null;
        _this._lineGroup3 = null;
        _this._midGroup = null;
        _this._noticeGroup = null;
        _this._speed = 10;
        _this._prevServant = {};
        _this._curMoveServant = {};
        _this._city0 = null;
        _this._city1 = null;
        _this._city2 = null;
        _this._city3 = null;
        _this._city4 = null;
        _this._city5 = null;
        _this._cityServantarrow1 = null;
        _this._cityServantarrow2 = null;
        _this._cityServantarrow3 = null;
        _this._cityServantarrow4 = null;
        _this._cityServantarrow5 = null;
        _this._cityServantGroup1 = null;
        _this._cityServantGroup2 = null;
        _this._cityServantGroup3 = null;
        _this._cityServantGroup4 = null;
        _this._cityServantGroup5 = null;
        _this._cityServant1 = null;
        _this._cityServant2 = null;
        _this._cityServant3 = null;
        _this._cityServant4 = null;
        _this._cityServant5 = null;
        _this._cityName1 = null;
        _this._cityDetailBg1 = null;
        _this._cityDetailNumTxtleft1 = null;
        _this._cityDetailNumTxtright1 = null;
        _this._cityDetailFlagleft1 = null;
        _this._cityDetailFlagright1 = null;
        _this._cityName2 = null;
        _this._cityDetailBg2 = null;
        _this._cityDetailNumTxtleft2 = null;
        _this._cityDetailNumTxtright2 = null;
        _this._cityDetailFlagleft2 = null;
        _this._cityDetailFlagright2 = null;
        _this._cityName3 = null;
        _this._cityDetailBg3 = null;
        _this._cityDetailNumTxtleft3 = null;
        _this._cityDetailNumTxtright3 = null;
        _this._cityDetailFlagleft3 = null;
        _this._cityDetailFlagright3 = null;
        _this._cityName4 = null;
        _this._cityDetailBg4 = null;
        _this._cityDetailNumTxtleft4 = null;
        _this._cityDetailNumTxtright4 = null;
        _this._cityDetailFlagleft4 = null;
        _this._cityDetailFlagright4 = null;
        _this._cityName5 = null;
        _this._cityDetailBg5 = null;
        _this._cityDetailNumTxtleft5 = null;
        _this._cityDetailNumTxtright5 = null;
        _this._cityDetailFlagleft5 = null;
        _this._cityDetailFlagright5 = null;
        _this._editText = null;
        _this._editBg = null;
        _this._midBg = null;
        _this.ruleBtn = null;
        _this.rankBtn = null;
        _this._cloudGroup = null;
        _this._vsBg = null;
        _this._battlescoreleft = null;
        _this._battlescoreright = null;
        _this._posArr = {
            0: { x: 173, y: 472, anchorx: 120, anchory: 65 },
            1: { x: 96, y: 395, anchorx: 75, anchory: 45 },
            2: { x: 316, y: 355, anchorx: 75, anchory: 45 },
            3: { x: 466, y: 427, anchorx: 75, anchory: 45 },
            4: { x: 482, y: 655, anchorx: 75, anchory: 45 },
            5: { x: 437, y: 952, anchorx: 75, anchory: 45 },
            6: { x: 257, y: 833, anchorx: 75, anchory: 45 },
            7: { x: 241, y: 684, anchorx: 75, anchory: 45 },
            8: { x: 201, y: 997, anchorx: 75, anchory: 45 },
            9: { x: 8, y: 927, anchorx: 75, anchory: 45 },
            10: { x: 25, y: 773, anchorx: 75, anchory: 45 },
        };
        _this.freshInit = false;
        _this._sendTick = 0;
        _this._curType = 0;
        return _this;
    }
    CountryWarView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'crossservantrulevs', 'mainui_chatbg', 'mainui_chatIcon', 'palace_editBtn2', 'arena_bottom', 'prestige_titlebg', 'draftline',
            'countrywarbuild1', 'countrywarbuild2', 'countrywarbg', 'countrywarbuild3', 'countrywarfight', 'countrywarcitydamage', 'studyatk_arrow',
            'coutrywarwin', 'coutrywarmyarmyleftbottom', 'coutrywarmyarmylefttop', 'coutrywarotherarmyleftbottom', 'coutrywarotherarmyleftup',
            'coutrywarcloud1', 'coutrywarcloud2', 'coutrywarcloud3', "crossservantwin", "crossservantlose", "recharge2_fnt"
        ]);
    };
    Object.defineProperty(CountryWarView.prototype, "api", {
        get: function () {
            return Api.countryWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountryWarView.prototype, "cfg", {
        get: function () {
            return Config.CountrywarCfg;
        },
        enumerable: true,
        configurable: true
    });
    CountryWarView.prototype.getRuleInfo = function () {
        return "CountryWarRuleInfo";
    };
    /**
     * 参数
     */
    CountryWarView.prototype.getRuleInfoParam = function () {
        var level = LanguageManager.getlocal("officialTitle" + Config.CountrywarCfg.unlock);
        return [level, this.cfg.loserPointAdd.toString()];
    };
    CountryWarView.prototype.getTitleStr = function () {
        return "CountryWarTitle";
    };
    CountryWarView.prototype.getRequestData = function () {
        var view = this;
        if (0) {
        }
        else {
            return { requestType: NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, requestData: null };
        }
        // NetManager.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL,{
        // 	id:view._data.id
        // });
    };
    CountryWarView.prototype.receiveData = function (rdata) {
        if (!rdata.ret) {
            return;
        }
        var view = this;
        if (!rdata.ret) {
            return;
        }
        if (rdata.data.data.countrywar) {
            view.api.formatData(rdata.data.data.countrywar);
        }
        if (rdata.data.data.announce) {
            view.api.setAnnouce(rdata.data.data.announce);
        }
        if (rdata.data.data.numpercity) {
            view.api.setMyCityInfo(rdata.data.data.numpercity);
        }
        if (rdata.data.data.tnumpercity) {
            view.api.setEnermyCityInfo(rdata.data.data.tnumpercity);
        }
        if (rdata.data.data.history) {
            view.api.setHistoryInfo(rdata.data.data.history);
        }
        if (view._init) {
            var cityArr = view.api.getRandCity();
            for (var i in cityArr) {
                view.freshCityNumText(cityArr[i]);
            }
        }
        if (view.api.getCurpeirod() == 3 && !view.api.result) {
            if (view._init) {
                view.api.result = true;
                view.freshView();
                ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARRESULTVIEW, {
                    result: view.api.getThisWarWin()
                });
            }
            else {
                view.api.result = false;
            }
        }
    };
    CountryWarView.prototype.editBtnhandlerCallback = function (event) {
        var view = this;
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        Api.countryWarVoApi.setAnnouce(data.announce);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        ViewController.getInstance().getView('CountryWarEditNoticePopupView').hide();
        view.freshNoticeTxt();
    };
    CountryWarView.prototype.freshNoticeTxt = function () {
        var view = this;
        //刷新公告
        view._editText.text = view.api.getNotice();
    };
    CountryWarView.prototype.initView = function () {
        var view = this;
        view._sendTick = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE), view.editBtnhandlerCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT, view.changeServantCallback, view);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_POLICY_INDEX,view.kingCallback,view);
        // NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {});
        //战斗结果
        view._curType = view.api.getCurpeirod();
        if (view._curType == 3 && !view.api.result) {
            view.api.result = true;
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARRESULTVIEW, {
                result: view.api.getThisWarWin()
            });
        }
        var servantinfo = view.api.myServantInfo();
        view._prevServant = {};
        for (var i in servantinfo) {
            view._prevServant[i] = servantinfo[i].cityId;
        }
        //中间主城
        var midGroup = new BaseDisplayObjectContainer();
        var cityarr = view.api.getRandCity();
        var city = Number(cityarr[0]);
        view.addChild(midGroup);
        view.viewBg.visible = false;
        view.swapChildren(midGroup, view.viewBg);
        view._midGroup = midGroup;
        view.createCity();
        // for(let i in cityarr){
        //     let cityId = cityarr[i];
        //     let cityIndex = view.api.getCityIndex(cityId);
        //     let pos = view._posArr[cityId];
        //     view.createLine(new egret.Point(view._posArr[0].x + 120, view._posArr[0].y + 65), new egret.Point(pos.x + 75, pos.y + 45));
        // }
        //顶部
        view.createTop('left');
        view.createTop('right');
        var vsbg = BaseBitmap.create("crossservantrulevs");
        var top = 75;
        if (view.api.getCurpeirod() == 3) {
            vsbg.setRes(view.api.getIsWin() ? 'crossservantwin' : 'crossservantlose');
            top = 115;
        }
        vsbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0, top]);
        view.addChild(vsbg);
        view._vsBg = vsbg;
        var ruleBtn = ComponentManager.getButton('countrywarrule', '', function () {
            // 打开规则奖励弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleBtn, view.titleBg, [10, view.titleBg.height + 35]);
        view.addChild(ruleBtn);
        view.ruleBtn = ruleBtn;
        var rankBtn = ComponentManager.getButton('countrywarrank', '', function () {
            // 打开排行弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW, { type: 4 });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankBtn, view.titleBg, [10, view.titleBg.height + 35]);
        view.addChild(rankBtn);
        view.rankBtn = rankBtn;
        if (view.api.isShowRewardRedPoint()) {
            App.CommonUtil.addIconToBDOC(ruleBtn);
            App.CommonUtil.addIconToBDOC(rankBtn);
        }
        var servantBg = BaseBitmap.create('countrywarservantbg');
        servantBg.addTouchTap(function () {
            //打开派遣门客
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW, { type: 3 });
        }, view);
        view.addChild(servantBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servantBg, view.titleBg, [0, view.titleBg.height + 135]);
        view._servantBg = servantBg;
        var servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarServant"), 14, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servantNameTxt, servantBg, [0, 15]);
        view.addChild(servantNameTxt);
        var itemRect = new egret.Rectangle(0, 0, servantBg.width - 20, 1);
        var scrollList = ComponentManager.getScrollList(CountryWayServantItem, null, itemRect);
        scrollList.touchChildren = false;
        scrollList.touchEnabled = false;
        scrollList.verticalScrollPolicy = 'off';
        view.addChild(scrollList);
        scrollList.setEmptyTip("CountryWarServantEmpty");
        view._servantList = scrollList;
        view.freshServantList();
        //倒计时
        var timeCDbg = BaseBitmap.create("public_itemtipbg2");
        view._timeBg = timeCDbg;
        view.addChild(timeCDbg);
        var period = view.api.getCurpeirod();
        var param = [];
        if (period == 3) {
            param.push(view.api.getWinNum().toString());
            param.push((view.cfg.cityNum - view.api.getWinNum()).toString());
            param.push(LanguageManager.getlocal("atkraceFight" + (view.api.getIsWin() ? "Win" : "Fail")));
        }
        param.push(App.DateUtil.getFormatBySecond(view.api.getCountTime()));
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarCDTxt" + period, param), 20);
        if (period == 1 && view.api.getEmptyServant()) {
            cdTxt.text = LanguageManager.getlocal('CountryWarCityTip2', param);
        }
        if (period == 3) {
            cdTxt.text = LanguageManager.getlocal("CountryWarCDTxt" + period + "-" + (view.api.isRedTeam("left") ? 1 : 2), param);
        }
        cdTxt.lineSpacing = 5;
        cdTxt.textAlign = egret.HorizontalAlign.CENTER;
        timeCDbg.width = cdTxt.textWidth + 100;
        timeCDbg.height = cdTxt.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCDbg, view.titleBg, [0, view.titleBg.height + 130]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, timeCDbg);
        view.addChild(cdTxt);
        view._timeDesc = cdTxt;
        //聊天消息
        var chatbg = BaseBitmap.create('public_9_bg20');
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, chatbg, view);
        view.addChild(chatbg);
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(view.chatBgClickHandler, view);
        var chatIcon = BaseBitmap.create('mainui_chatIcon');
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 10;
        chatIcon.y = chatbg.y + chatbg.height / 2;
        view.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastMessage();
        if (!showStr) {
            showStr = "1";
        }
        view._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxt.width = 480;
        view._chatTxt.height = 20;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
        view.addChild(view._chatTxt);
        view._chatTxtPoint = ComponentManager.getTextField("...", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxtPoint.x = 522;
        view._chatTxtPoint.y = chatIcon.y - view._chatTxtPoint.height / 2 - 5;
        view._chatTxtPoint.visible = false;
        view.doRefreshChat();
        //国战公告
        var descBg = BaseBitmap.create('arena_bottom');
        descBg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descBg, chatbg, [0, chatbg.height]);
        view.addChild(descBg);
        view._editBg = descBg;
        var noticeGroup = new BaseDisplayObjectContainer();
        noticeGroup.width = GameConfig.stageWidth;
        view.addChild(noticeGroup);
        var str = view.api.getNotice();
        var descTxt = ComponentManager.getTextField(str, 20);
        descTxt.width = descBg.width - 20;
        descTxt.lineSpacing = 5;
        view._editText = descTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, noticeGroup, [0, 0], true);
        noticeGroup.addChild(descTxt);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 100);
        var noticescrollView = ComponentManager.getScrollView(noticeGroup, rect);
        noticescrollView.y = descBg.y + 5;
        noticeGroup.y = 0;
        noticescrollView.horizontalScrollPolicy = "off";
        view.addChild(noticescrollView);
        view._noticeGroup = noticeGroup;
        view._noticeScrollView = noticescrollView;
        var titleBg = BaseBitmap.create('prestige_titlebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, titleBg, descBg, [0, descBg.height]);
        view.addChild(titleBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarNoticeTitle'), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titleBg);
        view.addChild(titleTxt);
        var editBtn = ComponentManager.getButton('palace_editBtn2', '', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWAREDITNOTICEPOPUPVIEW);
            // 打开排行弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, editBtn, descBg, [0, descBg.height + 5 + 30]);
        view.addChild(editBtn);
        editBtn.visible = view.api.canEditNotice();
        //调整位置
        // if(GameConfig.stageHeigth - 215 - chatbg.height - descBg.height){
        // } 
        //view.checkMovePos();
        view._curMoveServant = {};
        view.setChildIndex(view.closeBtn, 9999);
        view._init = true;
        var cityArr = view.api.getRandCity();
        var index = 0;
        for (var i in cityArr) {
            var cityId = cityArr[i];
            view.freshCityNumText(cityArr[i]);
            view.freshCityServant(cityArr[i]);
            if (view.api.getCurpeirod() == 3) {
                if (!view.api.reback) {
                    if (view.api.getJoinCityWar(cityId)) {
                        var servant = view.api.getServant();
                        if (servant[Number(i) + 1]) {
                            view["_myIdx" + index] = 0;
                            view["_myPos" + index] = [0];
                            view.checkMovePos(cityId, index, servant[Number(i) + 1].servant);
                            ++index;
                        }
                    }
                }
            }
        }
        if (index > 0) {
            view.api.reback = true;
        }
        if (city < 4) {
            var api = view.api;
            var cityRandId = api.randcity - 1;
            var height = 0;
            if (noticescrollView.y - view._timeBg.y > 620) {
                height = 40;
            }
            else {
                height = city == 3 ? -200 : -20;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midGroup, view, [0, height]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midGroup, view._noticeScrollView, [0, 100 - 10 - 30]);
        }
    };
    CountryWarView.prototype.calRotain = function (from, target) {
        var tan = (target.y - from.y) / (target.x - from.x);
        return Math.round(Math.atan2(target.y - from.y, target.x - from.x) / (Math.PI / 180));
    };
    CountryWarView.prototype.freshView = function () {
        var view = this;
        var period = view.api.getCurpeirod();
        var cityArr = view.api.getRandCity();
        var vsbg = view._vsBg;
        var top = 75;
        vsbg.setRes("crossservantrulevs");
        view._battlescoreleft.visible = view._battlescoreright.visible = period == 3;
        if (period == 1) {
            view.clearCityInfo();
            App.DisplayUtil.changeToNormal(view._countrywarrightbg);
            App.DisplayUtil.changeToNormal(view._countrywarleftbg);
        }
        else if (period == 2) {
            for (var i in cityArr) {
                view.createFightCity(cityArr[i]);
                view.freshCityServant(cityArr[i]);
            }
        }
        else if (period == 3) {
            view._battlescoreleft.text = view.api.getWinNum().toString();
            view._battlescoreright.text = (view.cfg.cityNum - view.api.getWinNum()).toString();
            vsbg.setRes(view.api.getIsWin() ? 'crossservantwin' : 'crossservantlose');
            top = 115;
            view.clearCityInfo();
            var index = 0;
            for (var i in cityArr) {
                var cityId = cityArr[i];
                view.freshCityServant(cityId);
                if (!view.api.getCityIsWin(cityId)) {
                    view.createFailCity(cityId);
                }
                else {
                    view.createWinCity(cityId);
                }
                if (!view.api.reback) {
                    if (view.api.getJoinCityWar(cityId)) {
                        var servant = view.api.getServant();
                        if (servant[Number(i) + 1]) {
                            view["_myIdx" + index] = 0;
                            view["_myPos" + index] = [0];
                            view.checkMovePos(cityId, index, servant[Number(i) + 1].servant);
                            ++index;
                        }
                    }
                }
            }
            if (index > 0) {
                view.api.reback = true;
            }
            if (view.api.getIsWin()) {
                App.DisplayUtil.changeToGray(view._countrywarrightbg);
            }
            else {
                App.DisplayUtil.changeToGray(view._countrywarleftbg);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0, top]);
    };
    CountryWarView.prototype.createWinCity = function (cityId) {
        var view = this;
        var cityIndex = view.api.getCityIndex(cityId);
        var cityimg = view["_city" + cityIndex];
        var winclip = ComponentManager.getCustomMovieClip('coutrywarwin', 4, 140);
        winclip.width = 32;
        winclip.height = 53;
        //failclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, winclip, cityimg, [0, -30]);
        winclip.playWithTime(-1);
        view._midGroup.addChild(winclip);
    };
    CountryWarView.prototype.createCity = function () {
        var view = this;
        var midGroup = view._midGroup;
        var midbg = BaseBitmap.create("countrywarbg");
        view._midBg = midbg;
        midGroup.addChild(midbg);
        var _loop_1 = function (i) {
            var pos = view._posArr[i];
            var cityId = Number(i);
            if (!view.api.getJoinCityWar(cityId) && cityId != 0) {
                return "continue";
            }
            var cityimg = BaseBitmap.create("countrywarbuild" + (cityId == 0 ? 2 : 1));
            cityimg.x = pos.x;
            cityimg.y = pos.y;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityimg, view._midBg, [pos.x, pos.y]);
            midGroup.addChild(cityimg);
            var cityIndex = view.api.getCityIndex(cityId);
            view["_city" + cityIndex] = cityimg;
            var arrow = BaseBitmap.create("studyatk_arrow");
            arrow.visible = false;
            arrow.setScale(0.7);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow, cityimg, [0, -10]);
            var tarY = arrow.y;
            egret.Tween.get(arrow, { loop: true }).to({ y: tarY - 30 }, 1000).to({ y: tarY }, 1000);
            midGroup.addChild(arrow);
            view["_cityServantarrow" + cityIndex] = arrow;
            var cityservantGroup = new BaseDisplayObjectContainer();
            cityservantGroup.visible = false;
            cityservantGroup.width = 64;
            cityservantGroup.height = 74;
            view["_cityServantGroup" + cityIndex] = cityservantGroup;
            midGroup.addChild(cityservantGroup);
            var bg = BaseBitmap.create('countrywarcityservant');
            cityservantGroup.addChild(bg);
            var cityServant = BaseLoadBitmap.create("");
            cityServant.width = 180;
            cityServant.height = 177;
            cityServant.setScale(0.3);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityServant, bg, [0, 8]);
            var circle = new egret.Shape();
            circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(27, 25.5, 25);
            circle.graphics.endFill();
            cityservantGroup.addChild(circle);
            cityServant.mask = circle;
            cityservantGroup.addChild(cityServant);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, circle, bg, [0, 8]);
            //servant_half_1008
            view["_cityServant" + cityIndex] = cityServant;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityservantGroup, cityimg, [0, -cityservantGroup.height]);
            var tmpY = cityservantGroup.y;
            egret.Tween.get(cityservantGroup, { loop: true }).to({ y: tmpY - 30 }, 1000).to({ y: tmpY }, 1000);
            var period = view.api.getCurpeirod();
            cityimg.addTouchTap(function () {
                if (view.api.getJoinCityWar(cityId)) {
                    if (period == 1 || period == 3) {
                        ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCITYPOPUPVIEW, {
                            cityId: cityId,
                        });
                    }
                    else if (period == 2) {
                        if (view.api.canCheckVs()) {
                            ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARVSVIEW, {
                                cityId: cityId,
                            });
                        }
                        else {
                            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip5"));
                        }
                    }
                }
            }, view);
            if (cityId > 0) {
                var cityname = BaseBitmap.create("countrywarcity" + cityId);
                cityname.setScale(0.65);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityname, cityimg, [0, -cityname.height + 40]);
                midGroup.addChild(cityname);
                if (view.api.getJoinCityWar(cityId)) {
                    var period_1 = view.api.getCurpeirod();
                    if (period_1 == 2) {
                        view.createFightCity(cityId);
                    }
                    else if (period_1 == 3) {
                        if (!view.api.getCityIsWin(cityId)) {
                            view.createFailCity(cityId);
                        }
                        else {
                            view.createWinCity(cityId);
                        }
                    }
                    // view.createWinCity(cityId);
                    var arr = view.api.getCityInfo(cityId);
                    var detailbg = BaseBitmap.create("countrywarcitydetailbg");
                    midGroup.addChild(detailbg);
                    var leftText = ComponentManager.getTextField(arr[0].toString(), 22, view.api.isRedTeam('left') ? 0xff3c3c : 0x649efa);
                    var rightText = ComponentManager.getTextField(arr[1].toString(), 22, view.api.isRedTeam('right') ? 0xff3c3c : 0x649efa);
                    midGroup.addChild(leftText);
                    midGroup.addChild(rightText);
                    var leftflag = BaseBitmap.create(view.api.isRedTeam('left') ? "countrywarcitydetailleft" : "countrywarcitydetailright");
                    midGroup.addChild(leftflag);
                    var rightflag = BaseBitmap.create(view.api.isRedTeam('right') ? "countrywarcitydetailleft" : "countrywarcitydetailright");
                    midGroup.addChild(rightflag);
                    view["_cityName" + cityIndex] = cityname;
                    view["_cityDetailBg" + cityIndex] = detailbg;
                    view["_cityDetailNumTxtleft" + cityIndex] = leftText;
                    view["_cityDetailNumTxtright" + cityIndex] = rightText;
                    view["_cityDetailFlagleft" + cityIndex] = leftflag;
                    view["_cityDetailFlagright" + cityIndex] = rightflag;
                }
            }
            else {
                view._city0 = cityimg;
            }
        };
        for (var i in view._posArr) {
            _loop_1(i);
        }
        if (view._editBg) {
            var cityarr = view.api.getRandCity();
            var city = Number(cityarr[0]);
            if (city < 4) {
                var api = view.api;
                var cityRandId = api.randcity - 1;
                var height = 0;
                if (view._noticeScrollView.y - view._timeBg.y > 620) {
                    height = 20;
                }
                else {
                    height = city == 3 ? -200 : -50;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midGroup, view, [0, height]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midGroup, view._noticeScrollView, [0, 100 - 10 - 30]);
            }
        }
    };
    CountryWarView.prototype.createFailCity = function (cityId) {
        var view = this;
        var cityIndex = view.api.getCityIndex(cityId);
        var cityimg = view["_city" + cityIndex];
        cityimg.setRes("countrywarbuild3");
        var failclip = ComponentManager.getCustomMovieClip('countrywardamage', 10, 70);
        failclip.width = 160;
        failclip.height = 184;
        //failclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, failclip, cityimg, [5, -57]);
        failclip.playWithTime(-1);
        view._midGroup.addChild(failclip);
    };
    CountryWarView.prototype.createFightCity = function (cityId) {
        var view = this;
        var cityIndex = view.api.getCityIndex(cityId);
        var cityimg = view["_city" + cityIndex];
        var fightclip = ComponentManager.getCustomMovieClip('countrywarfight', 10, 70);
        fightclip.width = 154;
        fightclip.height = 168;
        fightclip.blendMode = egret.BlendMode.ADD;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fightclip, cityimg, [-5, -40]);
        fightclip.playWithTime(-1);
        view._midGroup.addChild(fightclip);
    };
    CountryWarView.prototype.clearCityInfo = function () {
        var view = this;
        view._midGroup.removeChildren();
        view.createCity();
    };
    CountryWarView.prototype.createLine = function (from, to, index) {
        var view = this;
        var distance = view.get_distance_xy(from, to);
        var num = Math.round(distance / 27);
        var lineGroup = new BaseDisplayObjectContainer();
        lineGroup.width = num * 27;
        lineGroup.height = 15;
        lineGroup.anchorOffsetX = lineGroup.width / 2;
        lineGroup.anchorOffsetY = lineGroup.height / 2;
        lineGroup.mask = new egret.Rectangle(0, 0, lineGroup.width, lineGroup.height);
        var endX = lineGroup.width;
        var speed = 30;
        lineGroup.x = (from.x + to.x) / 2;
        lineGroup.y = (from.y + to.y) / 2;
        lineGroup.rotation = view.calRotain(from, to);
        view._midGroup.addChild(lineGroup);
        if (view["_lineGroup" + index]) {
            view["_lineGroup" + index].removeChildren();
            view._midGroup.removeChild(view["_lineGroup" + index]);
            view["_lineGroup" + index] = null;
        }
        view["_lineGroup" + index] = lineGroup;
        var _loop_2 = function (i) {
            var line = BaseBitmap.create('countrywarline1');
            var startX = (i - 1) * (line.width);
            line.x = startX;
            line.y = 0;
            lineGroup.addChild(line);
            var time1 = (endX - startX) / speed * 1000 + 100;
            var time2 = (startX - (-line.width)) / speed * 1000 + 100;
            egret.Tween.get(line, { loop: true }).to({ x: endX }, time1).call(function () {
                line.x = -line.width;
            }, view).to({ x: -line.width }, 1).to({ x: startX }, time2);
        };
        for (var i = 0; i <= num; ++i) {
            _loop_2(i);
        }
    };
    CountryWarView.prototype.freshCityNumText = function (cityId) {
        var view = this;
        var cityIndex = view.api.getRandCity().indexOf(cityId) + 1;
        var arr = view.api.getCityInfo(cityId);
        var detailbg = view["_cityDetailBg" + cityIndex];
        var leftText = view["_cityDetailNumTxtleft" + cityIndex];
        var rightText = view["_cityDetailNumTxtright" + cityIndex];
        leftText.text = arr[0];
        rightText.text = arr[1];
        detailbg.width = leftText.textWidth + rightText.textWidth + 20 + 10;
        var cityname = view["_cityName" + cityIndex];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg, cityname, [0, cityname.height * cityname.scaleY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftText, detailbg, [10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightText, detailbg, [10, 0]);
        var leftflag = view["_cityDetailFlagleft" + cityIndex];
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftflag, leftText, [-leftflag.width - 5, 0]);
        var rightflag = view["_cityDetailFlagright" + cityIndex];
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightflag, rightText, [-rightflag.width - 5, 0]);
    };
    CountryWarView.prototype.chatBgClickHandler = function () {
        if (Api.rookieVoApi.isInGuiding) {
            return;
        }
        // App.LogUtil.log("chatBgClickHandler >>>>> ");
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
    };
    //判断方向
    CountryWarView.prototype.judgePos = function (from, to) {
        var pos = '';
        if (from.x > to.x) {
            pos = 'left';
        }
        else {
            pos = 'right';
        }
        if (from.y > to.y) {
            pos += '|top';
        }
        else {
            pos += '|bottom';
        }
        return pos;
    };
    CountryWarView.prototype.createRoleGroup = function (from, index, servantId) {
        var view = this;
        var idx = view["_myIdx" + index];
        var pos = view["_myPos" + index];
        // let disX = from == 0 ? (234 / 2) : 0;
        // let disY = from == 0 ? (133 / 2) : 0;
        var fromCityIndex = view.api.getCityIndex(from);
        var toCity = Number(pos[idx]);
        var toCityIndex = view.api.getCityIndex(toCity);
        var rolegroup = new BaseDisplayObjectContainer();
        view._midGroup.addChild(rolegroup);
        var posfrom = view._posArr[from];
        var posto = view._posArr[toCity];
        var style = view.judgePos(posfrom, posto);
        var tmp = style.split('|');
        var rolestr = "coutrywarmyarmyleft" + tmp[1];
        var roleclip = ComponentManager.getCustomMovieClip(rolestr, 5, 200);
        if (tmp[1] == 'top') {
            roleclip.width = 107;
            roleclip.height = 89;
            rolegroup.width = 107;
            rolegroup.height = 89;
        }
        else {
            roleclip.width = 102;
            roleclip.height = 81;
            rolegroup.width = 102;
            rolegroup.height = 81;
        }
        rolegroup.anchorOffsetX = roleclip.width / 2;
        rolegroup.anchorOffsetY = roleclip.height / 2;
        roleclip.anchorOffsetX = roleclip.width / 2;
        roleclip.anchorOffsetY = roleclip.height / 2;
        rolegroup.scaleX = tmp[0] == 'left' ? 1 : -1;
        roleclip.playWithTime(-1);
        rolegroup.addChild(roleclip);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rolegroup, view["_city" + fromCityIndex]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roleclip, rolegroup, [rolegroup.anchorOffsetX, rolegroup.anchorOffsetY], true);
        view["_myRoleGroup" + index] = rolegroup;
        //人物头像
        var cityservantGroup = new BaseDisplayObjectContainer();
        cityservantGroup.width = 64;
        cityservantGroup.height = 74;
        rolegroup.addChild(cityservantGroup);
        var bg = BaseBitmap.create('countrywarcityservant');
        cityservantGroup.addChild(bg);
        var servantCloth = "servant_half_" + servantId;
        var obj = Api.servantVoApi.getServantObj(servantId.toString());
        if (obj && obj.equip) {
            servantCloth = "skin_half_" + obj.equip;
        }
        var cityServant = BaseLoadBitmap.create(servantCloth);
        cityServant.width = 180;
        cityServant.height = 177;
        cityServant.setScale(0.3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityServant, bg, [0, 8]);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(27, 25.5, 25);
        circle.graphics.endFill();
        cityservantGroup.addChild(circle);
        cityServant.mask = circle;
        cityservantGroup.addChild(cityServant);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, circle, bg, [0, 8]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityservantGroup, rolegroup, [0,-cityservantGroup.height], true);
        cityservantGroup.x = 0;
        cityservantGroup.y = -74;
        rolegroup.addTouchTap(function () {
            var child = rolegroup.getChildByName('planGroup');
            if (toCity == 0) {
                //回城
                if (child) {
                    egret.Tween.removeTweens(child);
                    rolegroup.removeChild(child);
                }
            }
            else {
                //不存在
                if (!child) {
                    var planGroup_1 = new BaseDisplayObjectContainer();
                    planGroup_1.name = 'planGroup';
                    rolegroup.addChild(planGroup_1);
                    var descBg = BaseBitmap.create('public_9_bg42');
                    planGroup_1.addChild(descBg);
                    var arrowBM = BaseBitmap.create("public_9_bg13_tail");
                    arrowBM.anchorOffsetX = arrowBM.width / 2;
                    arrowBM.scaleX = -1;
                    planGroup_1.addChild(arrowBM);
                    var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarWalkTalk" + App.MathUtil.getRandom(1, 5)), 20, TextFieldConst.COLOR_BLACK);
                    descTxt.width = 150;
                    descTxt.lineSpacing = 5;
                    descTxt.textAlign = egret.HorizontalAlign.CENTER;
                    planGroup_1.addChild(descTxt);
                    descBg.height = descTxt.textHeight + 30;
                    descBg.width = descTxt.textWidth + 30;
                    planGroup_1.width = descBg.width;
                    planGroup_1.anchorOffsetX = planGroup_1.width / 2;
                    planGroup_1.scaleX = rolegroup.scaleX;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descBg, planGroup_1, [0, 0], true);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25, descBg.height - 3]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [0, 15]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, planGroup_1, rolegroup, [0, -planGroup_1.height + 40], true);
                    egret.Tween.get(planGroup_1).wait(5000).call(function () {
                        if (planGroup_1 && rolegroup) {
                            egret.Tween.removeTweens(planGroup_1);
                            planGroup_1.removeChildren();
                            rolegroup.removeChild(planGroup_1);
                        }
                    }, view);
                }
            }
        }, view);
        return rolegroup;
    };
    CountryWarView.prototype.checkMovePos = function (from, index, servantId) {
        var view = this;
        var role = view["_myRoleGroup" + index];
        var idx = view["_myIdx" + index];
        var pos = view["_myPos" + index];
        // let disX = from == 0 ? (234 / 2) : 0;
        // let disY = from == 0 ? (133 / 2) : 0;
        var fromCityIndex = view.api.getCityIndex(from);
        var toCity = Number(pos[idx]);
        var toCityIndex = view.api.getCityIndex(toCity);
        view.createLine({
            x: view._posArr[from].x + view._posArr[from].anchorx,
            y: view._posArr[from].y + view._posArr[from].anchory,
        }, {
            x: view._posArr[toCity].x + view._posArr[toCity].anchorx,
            y: view._posArr[toCity].y + view._posArr[toCity].anchory
        }, index);
        if (!role) {
            role = view.createRoleGroup(from, index, servantId);
        }
        else {
            view._midGroup.swapChildren(role, view["_lineGroup" + index]);
        }
        var point = App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view["_city" + toCityIndex], [0, 0], false, true);
        var toX = point.x;
        var toY = point.y;
        if (!view._curMoveServant[servantId]) {
            view._curMoveServant[servantId] = {};
        }
        view._curMoveServant[servantId]["fromId"] = from;
        view._curMoveServant[servantId]["toId"] = toCity;
        view._curMoveServant[servantId]["index"] = index;
        if (toCity == 0) {
            var child = role.getChildByName('planGroup');
            if (child) {
                egret.Tween.removeTweens(child);
                role.removeChild(child);
            }
        }
        var posstyle = view.judgePos({ x: role.x, y: role.y }, point);
        var tmp = posstyle.split('|');
        role.scaleX = tmp[0] == 'left' ? 1 : -1;
        //文字气泡
        var distance = view.get_distance_xy({ x: role.x, y: role.y }, { x: toX, y: toY });
        egret.Tween.get(role).to({ x: toX, y: toY }, distance / view._speed * 1000).call(function () {
            if (idx < (pos.length - 1)) {
                ++view["_myIdx" + index];
                view.checkMovePos(toCity, index, servantId);
            }
            else {
                view["_myIdx" + index] = 0;
                view["_myPos" + index] = [];
                delete view._curMoveServant[servantId];
                view["_myRoleGroup" + index].alpha = 0;
                view._midGroup.removeChild(view["_myRoleGroup" + index]);
                view["_myRoleGroup" + index] = null;
                if (view["_lineGroup" + index]) {
                    view["_lineGroup" + index].removeChildren();
                    view._midGroup.removeChild(view["_lineGroup" + index]);
                    view["_lineGroup" + index] = null;
                }
                if (toCity > 0) {
                    view.freshCityServant(toCity);
                }
            }
        }, view);
    };
    CountryWarView.prototype.get_distance_xy = function (from, target) {
        //返回格子数
        var view = this;
        var x1 = from.x;
        var x2 = target.x;
        var y1 = from.y;
        var y2 = target.y;
        var xdiff = Math.abs(x2 - x1); // 计算两个点的横坐标之差
        var ydiff = Math.abs(y2 - y1); // 计算两个点的纵坐标之差
        return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    };
    CountryWarView.prototype.createTop = function (type) {
        var view = this;
        var isLeft = type == LayoutConst.left;
        var bgname = '';
        var bg = BaseBitmap.create(view.api.isRedTeam(type) ? "countrywarleft" : "countrywarright");
        if ((type == 'left' && !view.api.isRedTeam(type)) || (type == 'right' && view.api.isRedTeam(type))) {
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            bg.scaleX = -1;
        }
        if (view.api.getCurpeirod() == 3 && ((isLeft && !view.api.getIsWin()) || (!isLeft && view.api.getIsWin()))) {
            App.DisplayUtil.changeToGray(bg);
        }
        App.DisplayUtil.setLayoutPosition(isLeft ? LayoutConst.lefttop : LayoutConst.righttop, bg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(bg);
        var teamNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWar" + type + "Team", [LanguageManager.getlocal("Countrywarvsname" + (view.api.isRedTeam(type) ? 'left' : 'right')), Api.mergeServerVoApi.getAfterMergeSeverName(null, true, isLeft ? Api.mergeServerVoApi.getTrueZid() : view.api.getEnermyZid())]), 20, view.api.isRedTeam(type) ? 0xff3c3c : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(isLeft ? LayoutConst.righttop : LayoutConst.lefttop, teamNameTxt, bg, [40, 7]);
        view.addChild(teamNameTxt);
        var msgTF = ComponentManager.getBitmapText(String(isLeft ? view.api.getWinNum() : (view.cfg.cityNum - view.api.getWinNum())), "recharge2_fnt");
        msgTF.setScale(1.5);
        App.DisplayUtil.setLayoutPosition(!isLeft ? LayoutConst.righttop : LayoutConst.lefttop, msgTF, teamNameTxt, [60, teamNameTxt.textHeight + 30]);
        if (PlatformManager.checkIsTextHorizontal()) {
            if (isLeft) {
                msgTF.x = teamNameTxt.x + 150;
            }
            else {
                msgTF.x = teamNameTxt.x + teamNameTxt.width - msgTF.width * 1.5 - 150;
            }
        }
        view.addChild(msgTF);
        view["_battlescore" + type] = msgTF;
        view["_countrywar" + type + "bg"] = bg;
        msgTF.visible = view.api.getCurpeirod() == 3;
    };
    CountryWarView.prototype.freshServantList = function () {
        var view = this;
        var arr = view.api.getServantInfo();
        view._servantBg.height = arr.length * (78 + 5) + 60;
        var list = view._servantList;
        list._scrollRect.height = arr.length * (83 + 5);
        view._servantList.refreshData(arr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._servantList, view._servantBg, [2, 40]);
    };
    CountryWarView.prototype.tick = function () {
        var view = this;
        var period = view.api.getCurpeirod();
        if (period != view._curType) {
            //跨阶段 刷新界面
            if (period == 3) {
                view.api.result = false;
            }
            view.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, null);
        }
        var param = [];
        if (period == 3) {
            if (view.api.isShowRewardRedPoint()) {
                App.CommonUtil.addIconToBDOC(view.ruleBtn);
                App.CommonUtil.addIconToBDOC(view.rankBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view.ruleBtn);
                App.CommonUtil.removeIconFromBDOC(view.rankBtn);
            }
            param.push(view.api.getWinNum().toString());
            param.push((view.cfg.cityNum - view.api.getWinNum()).toString());
            param.push(LanguageManager.getlocal("atkraceFight" + (view.api.getIsWin() ? "Win" : "Fail")));
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view.ruleBtn);
            App.CommonUtil.removeIconFromBDOC(view.rankBtn);
        }
        param.push(App.DateUtil.getFormatBySecond(view.api.getCountTime()));
        var str = LanguageManager.getlocal("CountryWarCDTxt" + period, param);
        if (period == 1 && view.api.getEmptyServant()) {
            str = LanguageManager.getlocal('CountryWarCityTip2', param);
        }
        if (period == 3) {
            str = LanguageManager.getlocal("CountryWarCDTxt" + period + "-" + (view.api.isRedTeam("left") ? 1 : 2), param);
        }
        view._timeDesc.text = str;
        view._timeBg.width = view._timeDesc.textWidth + 100;
        view._timeBg.height = view._timeDesc.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._timeBg, view.titleBg, [0, view.titleBg.height + 130]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, view._timeBg);
        if (period == 1) {
            ++view._sendTick;
            if (view._sendTick == 20) {
                view.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, null);
                view._sendTick = 0;
            }
            if (!view._cloudGroup) {
                var cloudGroup = new BaseDisplayObjectContainer();
                cloudGroup.width = GameConfig.stageWidth;
                cloudGroup.height = view._noticeScrollView.y - view._timeBg.y - view._timeBg.height;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cloudGroup, view._timeBg, [0, view._timeBg.height]);
                view.addChild(cloudGroup);
                view._cloudGroup = cloudGroup;
                /*
                最上面的云走出画面用了24秒，等7秒然后从最左面走到初始位置用了9秒
                中间的云走出画面用了15秒，等7秒，然后从最左面走到初始位置用了18秒
                最下面的走出画面用了2秒，等8秒，然后从最左面走到初始位置用了30秒
                */
                var cloud1 = BaseBitmap.create("coutrywarcloud1");
                cloud1.x = 40;
                cloud1.y = 40;
                cloudGroup.addChild(cloud1);
                egret.Tween.get(cloud1, { loop: true }).to({ x: GameConfig.stageWidth }, 24000).set({ x: -cloud1.width }).wait(7000).to({ x: 40 }, 9000);
                var cloud2 = BaseBitmap.create("coutrywarcloud2");
                cloud2.x = 400;
                cloud2.y = 110;
                cloudGroup.addChild(cloud2);
                egret.Tween.get(cloud2, { loop: true }).to({ x: GameConfig.stageWidth }, 15000).set({ x: -cloud2.width }).wait(7000).to({ x: 400 }, 18000);
                var cloud3 = BaseBitmap.create("coutrywarcloud3");
                cloud3.x = 600;
                cloud3.y = 275;
                cloudGroup.addChild(cloud3);
                egret.Tween.get(cloud3, { loop: true }).to({ x: GameConfig.stageWidth }, 2000).set({ x: -cloud3.width }).wait(8000).to({ x: 600 }, 30000);
            }
        }
        else {
            if (view._cloudGroup) {
                view._cloudGroup.dispose();
                view._cloudGroup = null;
            }
        }
        view._curType = period;
    };
    // protected getBgName():string{
    //     return `crosspowerenterbg-1`;
    // }
    CountryWarView.prototype.createNewMove = function (fromId, toId, servantId) {
        var view = this;
        var curMove = Object.keys(view._curMoveServant).length;
        if (curMove >= 3) {
            //让一只正在撤回的队伍迅速完成 减少渲染压力
            for (var i in view._curMoveServant) {
                var obj = view._curMoveServant[i];
                if (obj.toId == 0) {
                    var index = obj.index;
                    view["_myIdx" + index] = 0;
                    view["_myPos" + index] = [];
                    egret.Tween.removeTweens(view["_myRoleGroup" + index]);
                    view["_myRoleGroup" + index].alpha = 0;
                    view._midGroup.removeChild(view["_myRoleGroup" + index]);
                    view["_myRoleGroup" + index] = null;
                    view["_myPos" + index].push(toId);
                    view.checkMovePos(fromId, index, servantId);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < 3; ++i) {
                if (!view["_myRoleGroup" + i]) {
                    view["_myIdx" + i] = 0;
                    view["_myPos" + i].push(toId);
                    view.checkMovePos(fromId, i, servantId);
                    break;
                }
            }
        }
    };
    CountryWarView.prototype.clearArrow = function (cityId) {
        var view = this;
        var cityIdx = view.api.getCityIndex(cityId);
        var arrow = view["_cityServantarrow" + cityIdx];
        var servantInfo = view.api.getServant();
        if (servantInfo[cityIdx] && servantInfo[cityIdx].servant) {
            arrow.visible = false;
        }
        else {
            arrow.visible = true;
        }
        if (view.api.getCurpeirod() > 1 || !view.api.getEmptyServant()) {
            arrow.visible = false;
        }
        if (view.api.getCurpeirod() == 3) {
            arrow.visible = false;
        }
    };
    CountryWarView.prototype.freshCityServant = function (cityId) {
        var view = this;
        var cityIdx = view.api.getCityIndex(cityId);
        var group = view["_cityServantGroup" + cityIdx];
        var servantImg = view["_cityServant" + cityIdx];
        var servantInfo = view.api.getServant();
        var arrow = view["_cityServantarrow" + cityIdx];
        view._midGroup.setChildIndex(group, 999);
        view.clearArrow(cityId);
        if (servantInfo[cityIdx] && servantInfo[cityIdx].servant) {
            var servantCloth = "servant_half_" + servantInfo[cityIdx].servant;
            var obj = Api.servantVoApi.getServantObj(servantInfo[cityIdx].servant);
            if (obj && obj.equip) {
                servantCloth = "skin_half_" + obj.equip;
            }
            servantImg.setload(servantCloth);
            group.visible = true;
        }
        else {
            group.visible = false;
        }
        if (view.api.getCurpeirod() == 3) {
            group.visible = false;
        }
    };
    CountryWarView.prototype.changeServantCallback = function (evt) {
        var view = this;
        //刷新人数
        var cityArr = view.api.getRandCity();
        for (var i in cityArr) {
            view.freshCityNumText(cityArr[i]);
            view.clearArrow(cityArr[i]);
            //view.freshCityServant(cityArr[i]);
        }
        var newServantInfo = {};
        var servantinfo = view.api.myServantInfo();
        for (var i in servantinfo) {
            newServantInfo[i] = servantinfo[i].cityId;
        }
        for (var i in view._prevServant) {
            var servantId = Number(i);
            var toPrevCity = view._prevServant[i];
            if (newServantInfo[servantId]) {
                //派遣后门客还在
                //比对目的地是否相同
                var toNewCity = newServantInfo[servantId];
                if (toNewCity != toPrevCity) {
                    //目的地不同 需要移动门客
                    var unit = view._curMoveServant[servantId];
                    //门客如果正在移动中
                    if (unit) {
                        var index = unit.index;
                        var lineGroup = view["_lineGroup" + index];
                        lineGroup.removeChildren();
                        view._midGroup.removeChild(lineGroup);
                        view["_lineGroup" + index] = null;
                        //view.createLine(new egret.Point(view._posArr[0].x + 120, view._posArr[0].y + 65), new egret.Point(pos.x + 75, pos.y + 45));
                        //新目的地回城 半路返回
                        if (toNewCity == 0) {
                            var role = view["_myRoleGroup" + index];
                            egret.Tween.removeTweens(role);
                            view["_myPos" + index] = [0];
                            view["_myIdx" + index] = 0;
                            view.checkMovePos(toPrevCity, index, servantId);
                        }
                        else {
                            //新目的地是别的城市 则视为瞬间撤回 再派出
                            view["_myIdx" + index] = 0;
                            view["_myPos" + index] = [];
                            egret.Tween.removeTweens(view["_myRoleGroup" + index]);
                            view["_myRoleGroup" + index].alpha = 0;
                            view._midGroup.removeChild(view["_myRoleGroup" + index]);
                            view["_myRoleGroup" + index] = null;
                            //新动画
                            view.createNewMove(0, toNewCity, servantId);
                        }
                    }
                    else {
                        view.freshCityServant(toPrevCity);
                        //新动画toPrevCity
                        view.createNewMove(0, toNewCity, servantId);
                    }
                }
            }
            else {
                //派遣后门客不在，被撤回了
                var unit = view._curMoveServant[servantId];
                view.freshCityServant(toPrevCity);
                //门客如果正在移动中
                if (unit) {
                    var index = unit.index;
                    var lineGroup = view["_lineGroup" + index];
                    lineGroup.removeChildren();
                    view._midGroup.removeChild(lineGroup);
                    view["_lineGroup" + index] = null;
                    var role = view["_myRoleGroup" + index];
                    egret.Tween.removeTweens(role);
                    view["_myPos" + index] = [0];
                    view["_myIdx" + index] = 0;
                    view.checkMovePos(toPrevCity, index, servantId);
                }
                else {
                    //新动画
                    view.createNewMove(toPrevCity, 0, servantId);
                }
            }
        }
        for (var i in newServantInfo) {
            var servantId = Number(i);
            var toNewCity = newServantInfo[i];
            //之前没有派出
            if (!view._prevServant[servantId]) {
                var unit = view._curMoveServant[servantId];
                //门客如果正在移动中
                if (unit) {
                    var index = unit.index;
                    var role = view["_myRoleGroup" + index];
                    var lineGroup = view["_lineGroup" + index];
                    lineGroup.removeChildren();
                    view._midGroup.removeChild(lineGroup);
                    view["_lineGroup" + index] = null;
                    //之前正在撤回中 瞬间完成
                    if (unit.toId == 0) {
                        view["_myIdx" + index] = 0;
                        view["_myPos" + index] = [];
                        egret.Tween.removeTweens(view["_myRoleGroup" + index]);
                        view["_myRoleGroup" + index].alpha = 0;
                        view._midGroup.removeChild(view["_myRoleGroup" + index]);
                        view["_myRoleGroup" + index] = null;
                        //新派出的门客
                        view.createNewMove(0, toNewCity, servantId);
                    }
                }
                else {
                    //新派出的门客
                    view.createNewMove(0, toNewCity, servantId);
                }
            }
        }
        //替换最新的门课派遣情况
        view._prevServant = {};
        for (var i in newServantInfo) {
            view._prevServant[i] = newServantInfo[i];
        }
    };
    CountryWarView.prototype.doRefreshChat = function () {
        if (!this._chatTxt) {
            return;
        }
        var showStr = Api.chatVoApi.getLastMessage();
        var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr) {
            showStr = emoticonStr;
        }
        this._chatTxt.text = showStr;
        var chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (chatTxt.width >= 480) {
            this._chatTxtPoint.visible = true;
        }
        else {
            this._chatTxtPoint.visible = false;
        }
    };
    CountryWarView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE), view.editBtnhandlerCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT, view.changeServantCallback, view);
        view._timeDesc = null;
        view._timeBg = null;
        view._chatTxt = null;
        view._chatTxtPoint = null;
        for (var i = 0; i < 4; ++i) {
            if (view["_myRoleGroup" + i]) {
                view["_myRoleGroup" + i].removeTouchTap();
                view["_myRoleGroup" + i].dispose();
                view["_myRoleGroup" + i] = null;
            }
            view["_myPos" + i] = [];
            view["_myIdx" + i] = 0;
            if (view["_lineGroup" + i]) {
                view["_lineGroup" + i].dispose();
                view["_lineGroup" + i] = null;
            }
        }
        view["_city0"] = null;
        for (var i = 1; i < 6; ++i) {
            view["_city" + i] = null;
            view["_cityName" + i] = null;
            view["_cityDetailBg" + i] = null;
            view["_cityDetailNumTxtleft" + i] = null;
            view["_cityDetailNumTxtright" + i] = null;
            view["_cityDetailFlagleft" + i] = null;
            view["_cityDetailFlagright" + i] = null;
            if (view["_cityServant" + i]) {
                BaseLoadBitmap.release(view["_cityServant" + i]);
                view["_cityServant" + i] = null;
            }
            if (view["_cityServantarrow" + i]) {
                egret.Tween.removeTweens(view["_cityServantarrow" + i]);
                view["_cityServantarrow" + i] = null;
            }
            if (view["_cityServantGroup" + i]) {
                view["_cityServantGroup" + i].dispose();
                view["_cityServantGroup" + i] = null;
            }
        }
        view._midGroup = null;
        view._prevServant = {};
        view._curMoveServant = {};
        if (view._servantBg) {
            view._servantBg.removeTouchTap();
            view._servantBg = null;
        }
        view._servantList = null;
        view._editBg = null;
        view._editText = null;
        view._sendTick = 0;
        view._init = false;
        view._countrywarleftbg = null;
        view._countrywarrightbg = null;
        view._midBg = null;
        view._noticeGroup = null;
        view._noticeScrollView = null;
        view._vsBg = null;
        view._battlescoreleft = null;
        view._battlescoreright = null;
        if (view._cloudGroup) {
            view._cloudGroup.dispose();
            view._cloudGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return CountryWarView;
}(CommonView));
__reflect(CountryWarView.prototype, "CountryWarView");
//# sourceMappingURL=CountryWarView.js.map