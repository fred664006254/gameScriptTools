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
 * 冲榜
 * author yanyuling
 * date 2017/11/06
 * @class AcRankActiveView
 */
var AcRankActiveView = /** @class */ (function (_super) {
    __extends(AcRankActiveView, _super);
    function AcRankActiveView() {
        var _this = _super.call(this) || this;
        _this._deltaSecs = 86400;
        _this._acRankInfoVo = null;
        _this._allirank = null;
        return _this;
    }
    AcRankActiveView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE, { activeId: this.aid + "-" + this.code });
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rightBg = "activity_rank_bg";
        if (rankcfg.type == 11) {
            rightBg = rightBg = "activity_rank_bg_" + this.code;
        }
        else {
            var curLv = void 0;
            var titleinfo = App.CommonUtil.getTitleData(rankcfg.title);
            if (!Config.TitleCfg.getIsTitleOnly(titleinfo.title) && titleinfo.title != "") {
                curLv = titleinfo.title;
            }
            var roleNode = Api.playerVoApi.getPlayerPortrait(Number(curLv), Api.playerVoApi.getPlayePicId());
            roleNode.width = 382;
            roleNode.height = 618;
            roleNode.x = 30;
            roleNode.setScale(0.7);
            this._nodeContainer.addChild(roleNode);
            //摄政王
            var officerImg = BaseLoadBitmap.create("user_title_" + rankcfg.title + "_2");
            //名字竖改横
            if (PlatformManager.checkIsTextHorizontal()) {
                officerImg.x = 50;
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
        var activity_rank_rightBg = BaseBitmap.create("activity_rank_rightBg");
        activity_rank_rightBg.height = 265;
        activity_rank_rightBg.x = GameConfig.stageWidth - activity_rank_rightBg.width - 5;
        activity_rank_rightBg.y = -10;
        this._nodeContainer.addChild(activity_rank_rightBg);
        var activity_rank_rightBg2 = BaseBitmap.create("public_9_managebg");
        activity_rank_rightBg2.width = activity_rank_rightBg.width - 30;
        activity_rank_rightBg2.height = 205;
        activity_rank_rightBg2.x = activity_rank_rightBg.x + 15;
        activity_rank_rightBg2.y = -15;
        this._nodeContainer.addChild(activity_rank_rightBg2);
        var acTimeTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        var stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(this.acVo.et - this._deltaSecs, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(this.acVo.st, this.acVo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = activity_rank_rightBg2.width - 50;
        var datastr = this.acVo.getAcLocalTime(true);
        if (this.aid == "rankActive" && PlatformManager.checkIsRuSp()) {
            datastr = LanguageManager.getlocal("acLocalTime_linefeed", [this.acVo.acTimeAndHour]);
        }
        acTimeTxt.text = datastr;
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = activity_rank_rightBg.x + 25;
        acTimeTxt.y = activity_rank_rightBg.y + 20;
        this._nodeContainer.addChild(acTimeTxt);
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        acCDTxt.x = acTimeTxt.x;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 8;
        this._nodeContainer.addChild(acCDTxt);
        var rankDescTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._rankDescTxt = rankDescTxt;
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        rankDescTxt.width = 240;
        this._rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc" + rankcfg.type, [rankcfg.getMaxRangValue()]);
        rankDescTxt.x = activity_rank_rightBg.x + 25;
        rankDescTxt.y = acCDTxt.y + acCDTxt.height + 8;
        this._nodeContainer.addChild(rankDescTxt);
        var myRankTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        myRankTxt.y = activity_rank_rightBg2.y + activity_rank_rightBg2.height - 28;
        this._nodeContainer.addChild(myRankTxt);
        this._myRankTxt = myRankTxt;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRankBtnTxt", this.rankListBtnHandler, this);
            rankListBtn.x = activity_rank_rightBg.x + activity_rank_rightBg.width / 2 - rankListBtn.width / 2;
            rankListBtn.y = activity_rank_rightBg.y + 205;
            this._nodeContainer.addChild(rankListBtn);
            this._rankListBtn = rankListBtn;
        }
        var wordRes = "activity_rank_word";
        if (rankcfg.titleType == 3) {
            wordRes = "activity_rank_word2";
        }
        if (rankcfg.type == 11) {
            if (this.code == "28" || this.code == "29" || this.code == "87" || this.code == "88") {
                if (this.code == "29" || this.code == "88") {
                    var typeIconBg = BaseLoadBitmap.create("activity_rank_imgbg");
                    typeIconBg.width = 268;
                    typeIconBg.height = 258;
                    typeIconBg.anchorOffsetX = typeIconBg.width / 2;
                    typeIconBg.anchorOffsetY = typeIconBg.height / 2;
                    typeIconBg.x = 160;
                    typeIconBg.y = 90;
                    this._nodeContainer.addChild(typeIconBg);
                    egret.Tween.get(typeIconBg, { loop: true }).to({ rotation: 360 }, 30000);
                }
                var typeIconNode = new BaseDisplayObjectContainer();
                typeIconNode.width = 148;
                typeIconNode.height = 183;
                var typeIcon = BaseLoadBitmap.create("activity_rank_img_" + this.code);
                typeIcon.width = 148;
                typeIcon.height = 183;
                typeIconNode.addChild(typeIcon);
                var effect = null;
                if (this.code == "28" || this.code == "87") {
                    effect = ComponentManager.getCustomMovieClip("activity_rank_effect28_", 10, 100);
                    effect.x = typeIconNode.width / 2 - 191 / 2 + 3.5;
                    effect.y = typeIconNode.height / 2 - 190 / 2 - 7;
                    typeIconNode.addChild(effect);
                    effect.playWithTime(0);
                }
                else if (this.code == "29" || this.code == "88") {
                    effect = ComponentManager.getCustomMovieClip("activity_rank_effect29_", 10, 100);
                    effect.x = typeIconNode.width / 2 - 153 / 2 - 2.5;
                    effect.y = typeIconNode.height / 2 - 195 / 2 - 4;
                    typeIconNode.addChild(effect);
                    effect.playWithTime(0);
                }
                typeIconNode.x = 85;
                typeIconNode.y = activity_rank_bg.y + 23;
                this._nodeContainer.addChild(typeIconNode);
                egret.Tween.get(typeIconNode, { loop: true }).to({ y: typeIconNode.y - 5 }, 1000).wait(100).to({ y: typeIconNode.y }, 1000).wait(100);
                wordRes = "activity_rank_word_" + this.code;
            }
            else if (Number(this.code) >= 92 && Number(this.code) <= 97) {
                wordRes = "activity_rank_word_" + this.code;
            }
            else if (Number(this.code) >= 107 && Number(this.code) <= 111) {
                wordRes = "activity_rank_word_" + this.code;
            }
            else {
                wordRes = "activity_rank_word3";
            }
        }
        var activity_rank_word = BaseLoadBitmap.create(wordRes);
        activity_rank_word.width = 326;
        activity_rank_word.height = 52;
        activity_rank_word.x = 5;
        activity_rank_word.y = activity_rank_bg.y + 220;
        this._nodeContainer.addChild(activity_rank_word);
        /**
         * 下部列表
         */
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.x = 0;
        bottomBg.y = activity_rank_bg.y + activity_rank_bg.height - 3;
        // bottomBg.height = 1134 - bottomInfoY  - this.container.y-20;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y; //-20;
        this._nodeContainer.addChild(bottomBg);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        tipTxt.text = LanguageManager.getlocal("acRanktip");
        if (rankcfg.type == 11) {
            var codeNum = Number(this.code);
            if (this.code == "28" || this.code == "29" || this.code == "87" || this.code == "88"
                || (codeNum >= 107 && codeNum <= 111)) {
                tipTxt.text = LanguageManager.getlocal("acRanktip_" + this.code);
            }
            else {
                tipTxt.text = LanguageManager.getlocal("acRanktip2");
            }
        }
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + bottomBg.height - 50;
        bottomBg.name = "bottomBg";
        this._nodeContainer.addChild(tipTxt);
        if (PlatformManager.checkIsEnLang()) {
            tipTxt.y = bottomBg.y + bottomBg.height - 60;
        }
    };
    AcRankActiveView.prototype.getRankListHandler = function (event) {
        if (!event.data.ret) {
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
        this._myRankTxt.x = this._rankListBtn.x + this._rankListBtn.width / 2 - this._myRankTxt.width / 2; //399
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var rList = rankcfg.getRankList();
        var bottomBg = this._nodeContainer.getChildByName("bottomBg");
        if (rankcfg.isCross) {
            var mapName = "activity_rank_" + rankcfg.isCross + "_cross";
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var aid = vo.getCrossActivityAid();
            // mapName = `activity_rank_${aid}`;
            if (aid !== '') {
                var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid);
                mapName = "activity_rank_" + aid;
                // mapName = `activity_rank_${aid}${acvo && acvo.zids && acvo.isCrossLeague() ? `_multicross`: ``}`;
                // if (acvo && acvo.zids && acvo.isCrossFengYun()){
                //     mapName = `activity_rank_${aid}`+ `_fengyun`;
                // } 
            }
            var crossbg = BaseLoadBitmap.create(mapName);
            crossbg.height = 64;
            crossbg.width = 640;
            crossbg.width = GameConfig.stageWidth;
            crossbg.x = 0;
            crossbg.y = bottomBg.y - 5;
            this._nodeContainer.addChild(crossbg);
            bottomBg.height -= crossbg.height;
            bottomBg.y += crossbg.height - 5;
        }
        //巾帼冲榜＋分数要求
        if (rankcfg.type == "11") {
            var crossbg = BaseLoadBitmap.create("activity_rank_empty");
            crossbg.height = 64;
            crossbg.width = 640;
            crossbg.width = GameConfig.stageWidth;
            crossbg.x = 0;
            crossbg.y = bottomBg.y - 5;
            this._nodeContainer.addChild(crossbg);
            bottomBg.height -= crossbg.height;
            bottomBg.y += crossbg.height - 5;
            //排名
            var tipStr = "";
            tipStr = LanguageManager.getlocal("acRankActive19", [rankcfg.rankLimit]);
            var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
            tipTxt.text = tipStr;
            tipTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            this.setLayoutPosition(LayoutConst.horizontalCenter, tipTxt, crossbg);
            tipTxt.y = crossbg.y + 10;
            this._nodeContainer.addChild(tipTxt);
            //积分
            var addvalueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            var addV = 0;
            if (this._acRankInfoVo.myrank.value) {
                addV = this._acRankInfoVo.myrank.value;
            }
            var titleStr3 = LanguageManager.getlocal("acRankPop_title3_11");
            addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV", [titleStr3, String(addV)]);
            addvalueTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            this.setLayoutPosition(LayoutConst.horizontalCenter, addvalueTxt, crossbg);
            addvalueTxt.y = tipTxt.y + tipTxt.height + 5;
            this._nodeContainer.addChild(addvalueTxt);
        }
        var rect = new egret.Rectangle(0, 10, GameConfig.stageWidth, bottomBg.height - 85);
        var list = [];
        for (var key in rList) {
            list.push({ aid: this.aid, code: this.code, key: key });
        }
        var scrollList = ComponentManager.getScrollList(AcRankActiveScrollItem, list, rect);
        scrollList.x = 0; //bottomBg.x;
        scrollList.y = bottomBg.y + 25;
        this._nodeContainer.addChild(scrollList);
    };
    AcRankActiveView.prototype.rankListBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKLISTPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcRankActiveView.prototype.getRequestData = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        if (rankcfg.type == "11") {
            if (this.aid == "" || this.code == "") {
                return null;
            }
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE, requestData: { activeId: this.aid + "-" + this.code } };
        }
    };
    AcRankActiveView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._acRankInfoVo = Api.acRankVoApi.getAcRankInfoVoByAidAndCode(this.aid, this.code);
        this._allirank = data.data.data.allirank;
    };
    AcRankActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_rank_rightBg",
        ]);
    };
    AcRankActiveView.prototype.getRuleInfo = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var codeNum = Number(this.code);
        if (rankcfg.type == 11 && (String(this.code) == "28" || String(this.code) == "29" || this.code == "87" || this.code == "88"
            || (codeNum >= 107 && codeNum <= 111))) {
            var rulekey = "acRankActive-" + rankcfg.type + "-" + this.code + "_Desc";
            return rulekey;
        }
        else {
            return rankcfg.helpInfo;
        }
    };
    AcRankActiveView.prototype.getRuleInfoParam = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        if (rankcfg.type == 11) {
            return [rankcfg.rankLimit];
        }
        else {
            return ["" + rankcfg.getMaxRangValue()];
        }
    };
    AcRankActiveView.prototype.tick = function () {
        var deltaT = this.acVo.et - this._deltaSecs - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        return false;
    };
    AcRankActiveView.prototype.getTitleStr = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, String(this.code));
        var codeNum = Number(this.code);
        if (this.aid == "rankActive" && (this.code == "28" || this.code == "29" || this.code == "87" || this.code == "88"
            || (codeNum >= 107 && codeNum <= 111))) {
            return "ac" + App.StringUtil.firstCharToUper(this.acVo.aid + "-" + rankcfg.type + "-" + this.code) + "_Title";
        }
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aid + "-" + rankcfg.type) + "_Title";
    };
    AcRankActiveView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE), this.getRankListHandler, this);
        this._nodeContainer = null;
        this._rewardNodeContainer = null;
        this._myRankTxt = null;
        this._rankListBtn = null;
        this._rankData = null;
        this._acCDTxt = null;
        this._rankDescTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcRankActiveView;
}(AcCommonView));
//# sourceMappingURL=AcRankActiveView.js.map