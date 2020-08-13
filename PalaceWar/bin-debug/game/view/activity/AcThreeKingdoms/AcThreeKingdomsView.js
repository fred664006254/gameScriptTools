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
 * author:qianjun
 * desc:三国争霸预热界面
*/
var AcThreeKingdomsView = (function (_super) {
    __extends(AcThreeKingdomsView, _super);
    function AcThreeKingdomsView() {
        var _this = _super.call(this) || this;
        _this._dayCdTxt = null;
        _this._roundCdTxt = null;
        _this._curPeriod = 1;
        _this._curRound = 1;
        _this._enterBtn = null;
        _this._chatTxt = null;
        _this._junzhengbtn = null;
        _this._chatbg = null;
        _this._rankbtn = null;
        _this._clip = null;
        _this._titleclip = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "mainui_chatIcon", "mainui_chatbg", "threekingdomspreview"
        ]);
    };
    AcThreeKingdomsView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsView.prototype.getTitleBgName = function () {
        return null;
    };
    AcThreeKingdomsView.prototype.getBgName = function () {
        return "threekingdomsprebg";
    };
    Object.defineProperty(AcThreeKingdomsView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsView.prototype.getRuleInfo = function () {
        return "acThreeKingdomsRule-" + this.getUiCode();
    };
    AcThreeKingdomsView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcThreeKingdomsView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.vo.setMeetingInfo(rdata);
        }
    };
    AcThreeKingdomsView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcThreeKingdomsView.prototype.mapinfoback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            view.vo.setMapInfo(data);
        }
    };
    AcThreeKingdomsView.prototype.initView = function () {
        var _this = this;
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - view.container.y;
        var topbg = BaseBitmap.create(this.getResByCode("threekingdomsprevtitle", this.getUiCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0, 0], true);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, {
            activeId: view.acTivityId,
            all: 1
        });
        var datebg = BaseBitmap.create('public_itemtipbg2');
        datebg.width = 620;
        view.addChildToContainer(datebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, datebg, topbg, [0, 170]);
        view.addChildToContainer(topbg);
        var titleclip = ComponentManager.getCustomMovieClip("threekingdomspretitleeff", 10);
        view.addChildToContainer(titleclip);
        titleclip.width = 640;
        titleclip.height = 330;
        titleclip.blendMode = egret.BlendMode.ADD;
        titleclip.playWithTime(-1);
        titleclip.y = -20;
        view._titleclip = titleclip;
        //日期
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsDate", code), [view.vo.acTimeAndHour]), 20);
        view.addChildToContainer(dateTxt);
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
        dateTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, datebg, [0, 15]);
        dateTxt.addTouchTap(function () {
            //时间说明
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSTIMEVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view, null);
        //倒计时相关
        //活动日期倒计时
        var dayCdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var roundCdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._dayCdTxt = dayCdTxt;
        view._roundCdTxt = roundCdTxt;
        view.addChildToContainer(dayCdTxt);
        view.addChildToContainer(roundCdTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dayCdTxt, dateTxt, [0, dateTxt.textHeight + 5]);
        datebg.height = dayCdTxt.y + dayCdTxt.textHeight + 40 - datebg.y;
        var map = BaseBitmap.create(view.getResByCode("threekingdomsmap", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, map, view.container);
        view.addChildToContainer(map);
        //按钮
        var enterBtn = ComponentManager.getButton("threekingdomsenter", "", function () {
            if (view._curPeriod == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandAttendTip1-1"));
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSMAPVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view, null, 0);
        view._enterBtn = enterBtn;
        view.addChildToContainer(enterBtn);
        enterBtn.setGray(view._curPeriod == 1);
        enterBtn.setScale(1);
        var clip = ComponentManager.getCustomMovieClip("ladder_ef_jrzc", 10, 100);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        view._clip = clip;
        enterBtn.addChild(clip);
        clip.visible = false;
        //跨服聊天
        var chatbg = null;
        chatbg = BaseBitmap.create("mainui_chatbg");
        chatbg.height = 30;
        chatbg.width = GameConfig.stageWidth;
        chatbg.x = 0;
        chatbg.y = view.container.height - 25;
        view.addChildToContainer(chatbg);
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(function () {
            if (view.vo.isSelectedKindom()) {
                ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {
                    activeID: _this.vo.aidAndCode,
                    isKingdom: true,
                    kingdoms: view.vo.getMyKingdoms(),
                    aid: _this.aid,
                    code: _this.code,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsTip1")));
            }
        }, view);
        view._chatbg = chatbg;
        var chatIcon = BaseBitmap.create("mainui_chatIcon");
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 10;
        chatIcon.y = chatbg.y + chatbg.height / 2;
        view.addChildToContainer(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastAcCrossMessage();
        if (!showStr) {
            showStr = "";
        }
        else {
            var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
            showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
        }
        var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr) {
            showStr = emoticonStr;
        }
        view._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxt.width = 480;
        view._chatTxt.height = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, chatbg, [chatIcon.width + 5, 0]);
        view.addChildToContainer(view._chatTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, enterBtn, chatbg, [0, 30]);
        //军政按钮
        var junzhengBtn = ComponentManager.getButton(view.getResByCode("threekingdomsjunzheng", code), '', function () {
            if (view.vo.getMyKingdoms()) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSMEETINGVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip43", code)));
            }
        }, view);
        view._junzhengbtn = junzhengBtn;
        view.addChildToContainer(junzhengBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, junzhengBtn, chatbg, [0, chatbg.height + 15]);
        //排名按钮
        var rankBtn = ComponentManager.getButton(view.getResByCode("threekingdomszhengba", code), '', function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(rankBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, rankBtn, chatbg, [0, chatbg.height + 15]);
        view._rankbtn = rankBtn;
        var descbg = BaseBitmap.create('public_itemtipbg2');
        descbg.width = 640;
        view.addChildToContainer(descbg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsTip12", code)), 20);
        descTxt.width = 585;
        descTxt.lineSpacing = 5;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descbg.height = descTxt.textHeight + 30;
        view.addChildToContainer(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, enterBtn, [0, enterBtn.height + 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        var rankRewardBtn = ComponentManager.getButton("threekingdomsckjli", "", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view, null, 3);
        view.addChildToContainer(rankRewardBtn);
        // rankRewardBtn.setTextPos(36,31);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rankRewardBtn, descbg, [0, -rankRewardBtn.height]);
        var rankclip = ComponentManager.getCustomMovieClip("threekingdomsbtneff", 10);
        rankclip.playWithTime(0);
        rankclip.blendMode = egret.BlendMode.ADD;
        view.addChildToContainer(rankclip);
        rankclip.width = 340;
        rankclip.height = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankclip, rankRewardBtn, [0, -10]);
        var rantxt = ComponentManager.getTextField(LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsTip53", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(rantxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rantxt, rankRewardBtn, [0, 7]);
        //人物动画
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && Api.playerVoApi.checkHasDragonBones("3151")) {
            var dragon1 = App.DragonBonesUtil.getLoadDragonBones("palace_db_3151_1");
            dragon1.width = 685;
            dragon1.height = 815;
            var dragon2 = App.DragonBonesUtil.getLoadDragonBones("palace_db_3151_2");
            dragon2.width = 685;
            dragon2.height = 775;
            var dragon1y = -815;
            var dragon2y = -775;
            view.container.addChildAt(dragon2, view.container.getChildIndex(descbg) - 1);
            view.container.addChildAt(dragon1, view.container.getChildIndex(descbg) - 1);
            dragon1.setScale((descbg.y + descbg.height - datebg.y - datebg.height - 20) / 815);
            dragon2.setScale((descbg.y + descbg.height - datebg.y - datebg.height - 20) / 815);
            dragon1.x = 200; //320 - (dragon1.width*dragon1.scaleX-GameConfig.stageWidth)/2 -dragon1.width*dragon1.scaleX/2+dragon1.width*dragon1.scaleX*0.2;
            // dragon1.x = 64 * dragon1.scaleX + (dragon1.width*dragon1.scaleX-GameConfig.stageWidth)/2 -dragon1.width*dragon1.scaleX/2+dragon1.width*dragon1.scaleX*0.2;
            dragon1.y = descbg.y + descbg.height - (dragon1.height * dragon1.scaleY) + 84 * dragon1.scaleY; // + dragon1y * dragon1.scaleY;
            dragon2.x = 440; // + (dragon2.width*dragon1.scaleX-GameConfig.stageWidth)/2 -dragon2.width*dragon1.scaleX/2+dragon1.width*dragon1.scaleX*0.2;
            // dragon2.x = 64 * dragon2.scaleX +  (dragon2.width*dragon2.scaleX-GameConfig.stageWidth)/2 +dragon2.width*dragon2.scaleX/2-dragon2.width*dragon2.scaleX*0.2;
            dragon2.y = dragon1.y - 30;
        }
        else {
            var man1 = BaseLoadBitmap.create("user_body_full_3151_1");
            man1.width = 712;
            man1.height = 810;
            man1.anchorOffsetX = man1.width / 2;
            man1.anchorOffsetY = man1.height / 2;
            man1.setScale((descbg.y + descbg.height - datebg.y - datebg.height - 20) / 810);
            man1.x = 320 - man1.width * man1.scaleX / 2 + man1.width * man1.scaleX * 0.2;
            man1.y = descbg.y + descbg.height - (man1.height * man1.scaleY) + man1.anchorOffsetY * man1.scaleY;
            //App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, man1, descbg, [,0]);
            var man2 = BaseLoadBitmap.create("user_body_full_3151_2");
            man2.width = 712;
            man2.height = 810;
            man2.anchorOffsetX = man2.width / 2;
            man2.anchorOffsetY = man2.height / 2;
            man2.setScale(man1.scaleX);
            man2.x = 320 + man1.width * man1.scaleX / 2 - man1.width * man1.scaleX * 0.2;
            man2.y = man1.y;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, man2, descbg, [320+man1.width*man1.scaleX/2-70,0]);
            // man1.x = -110;
            // man2.x = 180;
            view.container.addChildAt(man2, view.container.getChildIndex(descbg) - 1);
            view.container.addChildAt(man1, view.container.getChildIndex(descbg) - 1);
        }
        view.tick();
    };
    AcThreeKingdomsView.prototype.tick = function () {
        var view = this;
        var code = view.getUiCode();
        var str = '';
        //当前活动阶段 1未开始 2进行中 3展示期 4已结束
        var period = view.vo.getCurPeriod();
        var round = view.vo.getCurRound();
        var daycdStr = LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsDayTimeCD" + period), [view.vo.getCountDown()]);
        view._dayCdTxt.text = daycdStr;
        var roundCdStr = LanguageManager.getlocal(view.getCnByCode("acThreeKingdomsDayRoundCD" + round), [view.vo.getRoundDown()]);
        view._roundCdTxt.text = roundCdStr;
        view._dayCdTxt.x = (view.width - view._dayCdTxt.width - view._roundCdTxt.width - 10) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._roundCdTxt, view._dayCdTxt, [view._dayCdTxt.textWidth + 10, 0]);
        if (view._curPeriod != period || view._curRound != round) {
            view.freshView();
        }
        view._curPeriod = period;
        view._curRound = round;
        if (view._chatTxt) {
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            view._chatTxt.text = showStr;
        }
        if (view.vo.getpublicRedhot1() || view.vo.getpublicRedhot7()) {
            App.CommonUtil.addIconToBDOC(view._junzhengbtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._junzhengbtn);
        }
        if (view.vo.getpublicRedhot4() || view.vo.getpublicRedhot6() || view.vo.getpublicRedhot8()) {
            App.CommonUtil.addIconToBDOC(view._rankbtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rankbtn);
        }
        if (view.vo.getpublicRedhot2() || view.vo.getpublicRedhot3() || view.vo.getpublicRedhot5()) {
            App.CommonUtil.addIconToBDOC(view._enterBtn);
            var reddot = view._enterBtn.getChildByName("reddot");
            if (reddot) {
                reddot.x = 230;
                reddot.y = 20;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._enterBtn);
        }
        view._enterBtn.setGray(view._curPeriod == 1);
        var res = "";
        view._clip.visible = false;
        if (view._curPeriod == 1) {
            res = "threekingdomsprepare";
        }
        else if (view._curPeriod == 2) {
            if (view.vo.isInRest()) {
                res = "threekingdomsrest";
            }
            else {
                view._clip.visible = true;
                res = "threekingdomsenter";
            }
        }
        else if (view._curPeriod >= 3) {
            res = "threekingdomsend";
        }
        view._enterBtn.setBtnBitMap(res);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._enterBtn, view._chatbg, [0]);
        view._clip.setPosition(-5, -62);
    };
    AcThreeKingdomsView.prototype.freshView = function () {
        var view = this;
        var code = view.getUiCode();
        view._enterBtn.setGray(view._curPeriod == 1);
        ///view._enterBtn.setText(view.getCnByCode(`acThreeKingdomsEnter${view.vo.getCurRound()}`));
    };
    AcThreeKingdomsView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        view._dayCdTxt = null;
        view._roundCdTxt = null;
        view._curPeriod = 1;
        view._curRound = 1;
        view._enterBtn = null;
        view._chatTxt = null;
        view._junzhengbtn = null;
        view._chatbg = null;
        view._rankbtn = null;
        if (view._clip) {
            view._clip.dispose();
            view._clip = null;
        }
        if (view._titleclip) {
            view._titleclip.dispose();
            view._titleclip = null;
        }
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsView;
}(AcCommonView));
__reflect(AcThreeKingdomsView.prototype, "AcThreeKingdomsView");
//# sourceMappingURL=AcThreeKingdomsView.js.map