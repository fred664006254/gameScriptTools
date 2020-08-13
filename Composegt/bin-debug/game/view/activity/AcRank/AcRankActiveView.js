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
 * 冲榜
 * author yanyuling
 * date 2017/11/06
 * @class AcRankActiveView
 */
var AcRankActiveView = (function (_super) {
    __extends(AcRankActiveView, _super);
    function AcRankActiveView() {
        var _this = _super.call(this) || this;
        _this._deltaSecs = 86400;
        return _this;
    }
    AcRankActiveView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE, { activeId: this.aid + "-" + this.code });
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._nodeContainer.y = 80;
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        // let dibian:BaseBitmap=BaseBitmap.create("public_line");
        // dibian.width =640;  
        // dibian.y =330;
        // this.addChild(dibian);
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rightBg = "activity_rank_bg";
        if (rankcfg.type == 11) {
            rightBg = rightBg = "activity_rank_bg_" + this.code;
        }
        else {
            var roleNode = Api.playerVoApi.getPlayerPortrait(rankcfg.title, Api.playerVoApi.getPlayePicId());
            roleNode.width = 382;
            roleNode.height = 618;
            roleNode.x = 42;
            roleNode.setScale(0.7);
            this._nodeContainer.addChild(roleNode);
            //摄政王
            var officerImg = BaseLoadBitmap.create("user_title_" + rankcfg.title + "_2");
            //名字竖改横
            if (PlatformManager.checkIsTextHorizontal()) {
                officerImg.x = 95;
                officerImg.y = 155;
            }
            else {
                officerImg.x = 10;
                officerImg.y = 10;
            }
            this._nodeContainer.addChild(officerImg);
        }
        var activity_rank_bg = BaseLoadBitmap.create(rightBg);
        activity_rank_bg.width = 640;
        activity_rank_bg.height = 280;
        activity_rank_bg.x = 0;
        activity_rank_bg.y = -15;
        this._nodeContainer.addChildAt(activity_rank_bg, 0);
        var activity_rank_rightBg = BaseBitmap.create("public_9v_bg10");
        activity_rank_rightBg.height = 265;
        activity_rank_rightBg.width = 312;
        activity_rank_rightBg.x = GameConfig.stageWidth - activity_rank_rightBg.width - 5;
        activity_rank_rightBg.y = -10;
        this._nodeContainer.addChild(activity_rank_rightBg);
        activity_rank_rightBg.visible = false;
        var acTimeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_INPUT);
        var stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(this.acVo.et - this._deltaSecs, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(this.acVo.st, this.acVo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = 252;
        acTimeTxt.text = this.acVo.getAcLocalTime(true);
        acTimeTxt.x = activity_rank_rightBg.x + 35;
        acTimeTxt.y = activity_rank_rightBg.y + 20;
        this._nodeContainer.addChild(acTimeTxt);
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        var acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_INPUT);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            var showType = 8;
            if (PlatformManager.checkIsViSp()) {
                showType = 1;
            }
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD_yellow", [App.DateUtil.getFormatBySecond(deltaT, showType)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD_yellow", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        acCDTxt.x = acTimeTxt.x;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 8;
        this._nodeContainer.addChild(acCDTxt);
        // acRankActiveDesc1
        var rankDescTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_INPUT);
        this._rankDescTxt = rankDescTxt;
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        rankDescTxt.width = 252;
        this._rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc" + rankcfg.type, [rankcfg.getMaxRangValue()]);
        rankDescTxt.x = acTimeTxt.x;
        rankDescTxt.y = acCDTxt.y + acCDTxt.height + 8;
        this._nodeContainer.addChild(rankDescTxt);
        var myRankTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        myRankTxt.x = acTimeTxt.x;
        myRankTxt.y = 162;
        this._nodeContainer.addChild(myRankTxt);
        this._myRankTxt = myRankTxt;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRankBtnTxt", this.rankListBtnHandler, this);
            rankListBtn.x = 486 - rankListBtn.width / 2; //activity_rank_rightBg.x + activity_rank_rightBg.width/2 - rankListBtn.width/2;
            rankListBtn.y = activity_rank_rightBg.y + 205;
            this._nodeContainer.addChild(rankListBtn);
            this._rankListBtn = rankListBtn;
        }
        var wordRes = "activity_rank_word";
        if (rankcfg.titleType == 3) {
            wordRes = "activity_rank_word2";
        }
        if (rankcfg.type == 11) {
            wordRes = "activity_rank_word3";
        }
        //韩国开服特殊版本  权势冲榜
        if (this.code == "51" || this.code == "52") {
            wordRes = "activity_rank_word4";
        }
        var activity_rank_word = BaseLoadBitmap.create(wordRes);
        activity_rank_word.x = 23;
        activity_rank_word.y = activity_rank_bg.y + 220;
        this._nodeContainer.addChild(activity_rank_word);
        if (rankcfg.type == 22) {
            //
            //才情加成
            var talenBg = BaseBitmap.create("mainui_bottombtnbg");
            this._nodeContainer.addChild(talenBg);
            talenBg.setPosition(activity_rank_rightBg.x - talenBg.width + 5, activity_rank_bg.y + activity_rank_bg.height - 50 - talenBg.height);
            var addTalenBtn = ComponentManager.getButton("wifebattleview_addtalentbtn", "", this.addTalenBtnHandler, this);
            var _talenBtn = addTalenBtn;
            _talenBtn.x = talenBg.x + talenBg.width / 2 - _talenBtn.width / 2;
            _talenBtn.y = talenBg.y + talenBg.height / 2 - _talenBtn.height / 2;
            this._nodeContainer.addChild(addTalenBtn);
            var addTalenTxt = BaseBitmap.create("wifebattleview_addtalentext");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, addTalenTxt, addTalenBtn, [0, 0]);
            this._nodeContainer.addChild(addTalenTxt);
            var add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            var statusadd = add ? add : 0; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            var addvStr = statusadd + "%";
            var upBF = ComponentManager.getBitmapText(addvStr, "studyatk_upfnt");
            upBF.x = addTalenBtn.x + addTalenBtn.width / 2 - upBF.width / 2;
            upBF.y = addTalenTxt.y - upBF.height;
            this._nodeContainer.addChild(upBF);
        }
        /**
         * 下部列表
         */
        var bottomBg = BaseBitmap.create("commonview_woodbg");
        bottomBg.x = 0;
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.y = activity_rank_bg.y + activity_rank_bg.height - 3;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y; //-20; 
        this._nodeContainer.addChild(bottomBg);
        var bottomBgV = BaseBitmap.create("commonview_border1");
        bottomBgV.width = GameConfig.stageWidth;
        bottomBgV.height = GameConfig.stageHeigth - 346;
        bottomBgV.x = 0;
        bottomBgV.y = 345;
        this.addChildToContainer(bottomBgV);
        var downBottom = BaseBitmap.create("commonview_bottom");
        downBottom.y = bottomBgV.y + bottomBgV.height - downBottom.height;
        this.addChildToContainer(downBottom);
        var upBottom = BaseBitmap.create("commonview_border2");
        upBottom.width = GameConfig.stageWidth;
        upBottom.scaleY = -1;
        upBottom.y = bottomBgV.y + upBottom.height - 10;
        this.addChildToContainer(upBottom);
        var bottomBg2 = BaseBitmap.create("playerview_centerinfobg");
        bottomBg2.width = 624;
        bottomBg2.height = 50;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = downBottom.y - bottomBg2.height + 10;
        this.addChildToContainer(bottomBg2);
        var tipTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        tipTxt.text = LanguageManager.getlocal("acRanktip");
        if (rankcfg.type == 11) {
            tipTxt.text = LanguageManager.getlocal("acRanktip2");
        }
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg2.y + bottomBg2.height / 2 - tipTxt.height / 2;
        bottomBg.name = "bottomBg";
        this.addChildToContainer(tipTxt);
        //奸臣 谋士 特殊处理
        if (this.code == "28" || this.code == "29" || this.code == "23") {
            activity_rank_word.visible = false;
            activity_rank_rightBg.visible = false;
            // acTimeTxt.x = activity_rank_rightBg.x +35;;
            acTimeTxt.y = 15;
            acTimeTxt.size = 18;
            acCDTxt.x = acTimeTxt.x;
            acCDTxt.size = 18;
            rankDescTxt.x = acCDTxt.x;
            this._myRankTxt.size = 20;
            // this._myRankTxt.x=405;
            this._myRankTxt.y = 165;
            tipTxt.visible = false;
            if (!Api.switchVoApi.checkOpenShenhe()) {
                this._rankListBtn.x = 425;
            }
        }
    };
    AcRankActiveView.prototype.addTalenBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTPLUSPOPUPVIEW);
    };
    AcRankActiveView.prototype.getRankListHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        var rData = event.data.data.data;
        this._rankData = rData;
        if (rData.acrank.myrank.myrank) {
            this._myRankTxt.text = LanguageManager.getlocal("acRank_myrank1", [String(rData.acrank.myrank.myrank)]);
        }
        else {
            this._myRankTxt.text = LanguageManager.getlocal("acRank_myrank1", ["10000+"]);
        }
        // this._myRankTxt.x =399;
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rList = rankcfg.getRankList();
        var bottomBg = this._nodeContainer.getChildByName("bottomBg");
        if (rankcfg.isCross == 1) {
            var crossRes = "activity_rank_cross";
            if (ResourceManager.hasRes("activity_rank_cross" + "-" + rankcfg.crossServerType)) {
                crossRes = "activity_rank_cross" + "-" + rankcfg.crossServerType;
            }
            var crossbg = BaseLoadBitmap.create(crossRes);
            // crossbg.width = GameConfig.stageWidth;
            crossbg.width = 626;
            crossbg.height = 67;
            // crossbg.x = 0;
            crossbg.x = this.viewBg.width / 2 - crossbg.width / 2;
            crossbg.y = bottomBg.y + 10;
            this._nodeContainer.addChild(crossbg);
            bottomBg.height -= crossbg.height;
            bottomBg.y += crossbg.height;
        }
        else if (rankcfg.isCross == 2) {
            //风云擂台前置冲榜活动
            if (rankcfg.type == 12 || rankcfg.type == 13 || rankcfg.type == 14 || rankcfg.type == 4) {
                var crossbg = BaseLoadBitmap.create("activity_rank_battleground");
                crossbg.width = 626;
                crossbg.height = 67;
                crossbg.x = this.viewBg.width / 2 - crossbg.width / 2;
                crossbg.y = bottomBg.y + 10;
                this._nodeContainer.addChild(crossbg);
                bottomBg.height -= crossbg.height;
                bottomBg.y += crossbg.height;
            }
        }
        var rect = new egret.Rectangle(0, 0, 608, bottomBg.height - 204 + 90);
        var list = [];
        for (var key in rList) {
            list.push({ aid: this.aid, code: this.code, key: key });
        }
        var scrollList = ComponentManager.getScrollList(AcRankActiveScrollItem, list, rect);
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2; //bottomBg.x;
        scrollList.y = bottomBg.y + 13;
        this._nodeContainer.addChild(scrollList);
    };
    AcRankActiveView.prototype.rankListBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKLISTPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcRankActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_rank_bg", "activity_rank_rightBg",
            // "activity_rank_word",
            // // "itemeffect",
            // "activity_rank_word2",
            // "activity_rank_word3",
            "activity_rank_bg_19",
            // "activity_rank_cross",
            "activity_rank_bg_23",
            "servant_wenzibutiao", "adult_lowbg", "rank_biao", "rechargevie_db_01",
            "activity_rank_bg_28", "activity_rank_bg_29", "wifebattleview_addtalentbtn", "mainui_bottombtnbg", "wifebattleview_addtalentext", "studyatk_upfnt",
            "activity_rank_itembg1",
            "activity_rank_itembg2",
            "commonview_woodbg",
            "commonview_border2",
            "commonview_border1",
            "commonview_bottom",
            "playerview_centerinfobg",
            "commonview_titlebg2"
        ]);
    };
    AcRankActiveView.prototype.getRuleInfo = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        if (this.code == "28" || this.code == "29") {
            return rankcfg.helpInfo + this.code;
        }
        return rankcfg.helpInfo;
    };
    AcRankActiveView.prototype.tick = function () {
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            var showType = 8;
            if (PlatformManager.checkIsViSp()) {
                showType = 1;
            }
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD_yellow", [App.DateUtil.getFormatBySecond(deltaT, showType)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD_yellow", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        return false;
    };
    AcRankActiveView.prototype.getTitleStr = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        if (this.aid == "rankActive" && this.code == "28" || this.code == "29") {
            return "ac" + App.StringUtil.firstCharToUper(this.acVo.aid + "-" + rankcfg.type + "-" + this.code) + "_Title";
        }
        //韩国新王之路
        if (this.code == "51") {
            return "acRankActive-1-51_Title";
        }
        //韩国新王之路
        if (this.code == "52") {
            return "acRankActive-2-52_Title";
        }
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aid + "-" + rankcfg.type) + "_Title";
    };
    AcRankActiveView.prototype.getRuleParam = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        return [rankcfg.getMaxRangValue()];
    };
    AcRankActiveView.prototype.getTitleBgName = function () {
        return "commonview_titlebg2";
    };
    AcRankActiveView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        this._nodeContainer = null;
        this._rewardNodeContainer = null;
        this._myRankTxt = null;
        this._rankListBtn = null;
        this._rankData = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcRankActiveView;
}(AcCommonView));
__reflect(AcRankActiveView.prototype, "AcRankActiveView");
