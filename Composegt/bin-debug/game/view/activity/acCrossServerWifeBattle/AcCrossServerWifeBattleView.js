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
 * 红颜对战
 * author jiangly
 * date 2018/08/13
 * @class WifebattleView
 */
var AcCrossServerWifeBattleView = (function (_super) {
    __extends(AcCrossServerWifeBattleView, _super);
    function AcCrossServerWifeBattleView() {
        var _this = _super.call(this) || this;
        // public static AID:string = null;
        // public static CODE:string = null;
        _this._searchGroup = null;
        _this._enemyGroup = null;
        _this._studyBtn = null;
        _this._shopBtn = null;
        _this._upBF = null;
        _this._upArrow = null;
        _this._talenBtn = null;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this.moveContainer = null;
        _this._touchBg = null;
        _this._currMaskBmp = null;
        _this._bottomBg = null;
        _this.isData = false;
        _this._battleDataList = [];
        _this._nameTxt = null;
        _this.describeTxt = null;
        _this._descTxt = null;
        _this._descBg = null;
        _this._playerNameTxt = null;
        _this._enemyTalenTxt = null;
        _this._enemyWifeNum = null;
        _this._wifeBM = null;
        _this._wifeParent = null;
        _this._isInBattle = false;
        _this._battleBtn = null;
        _this._isPass = false;
        _this._chatTxt = null;
        _this._scoreTextTab = [];
        _this._serverList = null;
        _this._atkracedes1 = null;
        _this._joinDescText = null;
        _this._cdTimeDesc = null;
        _this._middleDescBg = null;
        _this._isActiveOver = false;
        _this._isRefreshPass = false;
        _this._studyBg = null;
        _this._studyTxt = null;
        _this._talenBg = null;
        _this._addTalenBtn = null;
        _this._addTalenTxt = null;
        _this._shopBg = null;
        _this._myTalenBg = null;
        _this._myTalen = null;
        _this._shopTxt = null;
        _this._doubleResult = null;
        _this.aid = null;
        _this.code = null;
        _this.isDouble = true;
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcCrossServerWifeBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifebattleview_addtalentbtn",
            "wifebattleview_battlebtn",
            "wifebattleview_enemydescbg",
            "wifebattleview_enemymask",
            "wifebattleview_enemytip",
            "wifebattleview_talkbg",
            "studyatk_upfnt",
            "punish_rank_icon",
            "punish_rank_name",
            "arena_more",
            "arena_arrow",
            "arena_bottom_bg",
            // "wifebattleview_title"
            "wifebattleview_addtalentext",
            "wifebattleview_shopbtn",
            "punish_ex_name",
            "flipcard_button2",
            "wifebattleview_enemymask",
            "wifebattleview_studybtn",
            "wifebattleview_study",
            "wifebattleview_studytxt",
            "atkracecross_award_text",
            // "huaban_01",
            // "huaban_01_json"
            "atkracecross_top",
            "atkracecross_rank",
            "atkracecross_rewatdbg3",
            "atkracecross_win",
            "atkracecross_loss"
        ]);
    };
    AcCrossServerWifeBattleView.prototype.getRequestData = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        // console.log("aid - code -->",this.aid,this.code);
        var cdType = this.vo.judgeTimeProcess();
        if (this.vo.isCanJoin && cdType != 3 && cdType != 4) {
            //有资格
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, requestData: {
                    randtype: 1,
                    activeId: this.vo.aidAndCode
                } };
        }
        else {
            //没有资格
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, requestData: {
                    activeId: this.vo.aidAndCode
                } };
        }
    };
    AcCrossServerWifeBattleView.prototype.receiveData = function (data) {
        // console.log("receiveData",data);
        if (this._isRefreshPass) {
            return;
        }
        this.vo.setWifebattleInfo(data.data.data.wifebattlecross);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.initRankData, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, { activeId: this.vo.aidAndCode });
        this._isRefreshPass = true;
    };
    AcCrossServerWifeBattleView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("accrossserverwifebattle_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 1136;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    // protected getTitleStr():string
    // {
    // 	return null;
    // }
    AcCrossServerWifeBattleView.prototype.initView = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkStudyRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, this.checkShowSearch, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHT, this.fightCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST, this.refreshList, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHTREVIEW, this.fightReview, this);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        // let title = BaseLoadBitmap.create('wifebattleview_title');
        // title.width = 522;
        // title.height = 198;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, this, [0,0]);
        // this.addChild(title);
        var pkzidNum = this.vo.getPkzidNum();
        if (pkzidNum > 2) {
            this.isDouble = false;
            this.init_top2();
        }
        else {
            this.isDouble = true;
            this.init_top1();
        }
        //底部
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 94;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this);
        this._bottomBg = bottomBg;
        if (1) {
            var chatbg = null;
            //跨服聊天消息
            chatbg = BaseBitmap.create("mainui_chatbg");
            chatbg.width = GameConfig.stageWidth;
            chatbg.height = 35;
            chatbg.x = 0;
            chatbg.y = bottomBg.y - chatbg.height;
            this.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width / 2;
            chatIcon.anchorOffsetY = chatIcon.height / 2;
            chatIcon.x = chatIcon.width / 2 + 10;
            chatIcon.y = chatbg.y + chatbg.height / 2;
            this.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,
            }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
            var showStr = Api.chatVoApi.getLastMessage();
            if (!showStr) {
                showStr = " ";
            }
            // if(!showStr)
            // {
            //     showStr="";
            // }
            // else{
            //     let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
            //     showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            // }
            this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.x = chatIcon.x + 20;
            this._chatTxt.y = chatIcon.y - this._chatTxt.height / 2;
            this._chatTxt.width = 480;
            this._chatTxt.height = 50;
            this._chatTxt.lineSpacing = 50;
            // this._chatTxt.height = 20;
            // this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.width + 5, 0]);
            this.addChild(this._chatTxt);
        }
        var battleBtn = ComponentManager.getButton('wifebattleview_battlebtn', '', this.battleBtnHandler, this);
        // battleBtn.anchorOffsetX = battleBtn.width / 2;
        // battleBtn.anchorOffsetY = battleBtn.height / 2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, battleBtn, bottomBg,[0,0]);
        battleBtn.scaleX = 0.8;
        battleBtn.scaleY = 0.8;
        battleBtn.x = GameConfig.stageWidth / 2 - battleBtn.width * battleBtn.scaleX / 2;
        battleBtn.y = bottomBg.y - battleBtn.height * battleBtn.scaleY - 50;
        this._battleBtn = battleBtn;
        this.addChild(battleBtn);
        if (this.vo.checkHaveEnemy()) {
            battleBtn.setEnable(true);
        }
        else {
            battleBtn.setEnable(false);
        }
        var myTalenBg = BaseBitmap.create('public_itemtipbg2');
        myTalenBg.width = 400;
        myTalenBg.height = 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myTalenBg, battleBtn, [0, 0]);
        this.addChild(myTalenBg);
        this._myTalenBg = myTalenBg;
        var myTalen = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleMyTalen", [this.vo.wifebattlecross.info.totaltalent]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, myTalen, myTalenBg);
        this.addChild(myTalen);
        this._myTalen = myTalen;
        //才情加成
        var talenBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(talenBg);
        this._talenBg = talenBg;
        var addTalenBtn = ComponentManager.getButton("wifebattleview_addtalentbtn", "", this.addTalenBtnHandler, this);
        this._addTalenBtn = this._talenBtn = addTalenBtn;
        this._talenBtn.x = 15;
        this._talenBtn.y = bottomBg.y - 35 - this._talenBtn.height;
        this.addChild(addTalenBtn);
        talenBg.setPosition(addTalenBtn.x + addTalenBtn.width / 2 - talenBg.width / 2, addTalenBtn.y + addTalenBtn.height / 2 - talenBg.width / 2);
        var addTalenTxt = BaseBitmap.create("wifebattleview_addtalentext");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, addTalenTxt, addTalenBtn, [0, 0]);
        this.addChild(addTalenTxt);
        this._addTalenTxt = addTalenTxt;
        var addvStr = this.vo.wifebattlecross.info.tmpattr.statusadd + "%";
        var upBF = ComponentManager.getBitmapText(addvStr, "studyatk_upfnt");
        this._upBF = upBF;
        this.addChild(upBF);
        var uparrow = BaseBitmap.create("studyatk_uparrow");
        this._upArrow = uparrow;
        this.addChild(uparrow);
        this._upBF.x = this._talenBtn.x + this._talenBtn.width / 2 - (this._upBF.width + this._upArrow.width) / 2;
        this._upBF.y = this._talenBtn.y + this._talenBtn.height / 2 - this._upBF.height / 2;
        this._upArrow.x = this._upBF.x + this._upBF.width;
        this._upArrow.y = this._talenBtn.y + this._talenBtn.height / 2 - this._upArrow.height / 2;
        //永乐大典
        var studyBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(studyBg);
        this._studyBg = studyBg;
        var studyBtn = ComponentManager.getButton("wifebattleview_studybtn", "", this.studyBtnHandler, this);
        studyBtn.x = 15;
        studyBtn.y = this._talenBtn.y - 10 - studyBtn.height;
        this.addChild(studyBtn);
        this._studyBtn = studyBtn;
        studyBg.setPosition(studyBtn.x + studyBtn.width / 2 - studyBg.width / 2, studyBtn.y + studyBtn.height / 2 - studyBg.width / 2);
        var studyTxt = BaseBitmap.create("wifebattleview_studytxt");
        this._studyTxt = studyTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, studyTxt, studyBtn, [0, 0]);
        this.addChild(studyTxt);
        //排行榜
        var rankBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(rankBg);
        var rankBtn = ComponentManager.getButton("punish_rank_icon", "", this.rankClick, this);
        rankBtn.x = GameConfig.stageWidth - 15 - rankBtn.width;
        rankBtn.y = bottomBg.y - 30 - rankBtn.height;
        this.addChild(rankBtn);
        rankBg.setPosition(rankBtn.x + rankBtn.width / 2 - rankBg.width / 2, rankBtn.y + rankBtn.height / 2 - rankBg.width / 2);
        var rankTxt = BaseBitmap.create("punish_rank_name");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankTxt, rankBtn, [0, 0]);
        this.addChild(rankTxt);
        //兑换按钮
        var shopBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(shopBg);
        this._shopBg = shopBg;
        var shopBtn = ComponentManager.getButton("wifebattleview_shopbtn", "", this.shopClick, this);
        shopBtn.x = rankBtn.x;
        shopBtn.y = rankBtn.y - 5 - shopBtn.height;
        this.addChild(shopBtn);
        this._shopBtn = shopBtn;
        shopBg.setPosition(shopBtn.x + shopBtn.width / 2 - shopBg.width / 2, shopBtn.y + shopBtn.height / 2 - shopBg.width / 2);
        var shopTxt = BaseBitmap.create("atkracecross_award_text");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0, 0]);
        this.addChild(shopTxt);
        this._shopTxt = shopTxt;
        var cdType = this.vo.judgeTimeProcess();
        if (cdType == 3 || cdType == 4) {
            this._isActiveOver = true;
        }
        if (this.vo.isCanJoin && cdType != 3 && cdType != 4) {
            this.checkShowSearch();
            this.checkStudyRed();
        }
        else {
            //没有资格
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST, { activeId: this.vo.aidAndCode });
            //	屏蔽永乐大典
            studyBg.visible = false;
            studyBtn.visible = false;
            this._studyTxt.visible = false;
            //屏蔽才情
            talenBg.visible = false;
            addTalenBtn.visible = false;
            addTalenTxt.visible = false;
            this._upBF.visible = false;
            //活动奖励更改位置
            shopBg.x = talenBg.x;
            shopBg.y = talenBg.y;
            shopBtn.x = addTalenBtn.x + addTalenBtn.width / 2 - shopBtn.width / 2;
            shopBtn.y = addTalenBtn.y + addTalenBtn.height / 2 - shopBtn.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0, 0]);
            //battleBtn 屏蔽
            battleBtn.visible = false;
            myTalenBg.visible = false;
            myTalen.visible = false;
            this._middleDescBg = BaseBitmap.create("public_9v_bg05");
            this._middleDescBg.width = 413;
            this._middleDescBg.height = 219;
            this._middleDescBg.x = GameConfig.stageWidth / 2 - this._middleDescBg.width / 2;
            this._middleDescBg.y = GameConfig.stageHeigth / 2 - this._middleDescBg.height / 2;
            this.addChild(this._middleDescBg);
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            if (PlatformManager.checkIsViSp()) {
                this._joinDescText.width = 380;
            }
            this._joinDescText.x = this._middleDescBg.x + this._middleDescBg.width / 2 - this._joinDescText.width / 2;
            this._joinDescText.y = this._middleDescBg.y + 40;
            this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this._joinDescText);
            //活动倒计时时间
            var countDownTime = this.vo.et - 86400 - GameData.serverTime;
            this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xea1f07);
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
            this._cdTimeDesc.y = this._middleDescBg.y + 147;
            this.addChild(this._cdTimeDesc);
        }
        if (cdType == 3 || cdType == 4) {
            // let pkzidNum = this.vo.getPkzidNum();
            if (pkzidNum == 2) {
                this.initResult();
            }
            //	屏蔽永乐大典
            studyBg.visible = false;
            studyBtn.visible = false;
            this._studyTxt.visible = false;
            //屏蔽才情
            talenBg.visible = false;
            addTalenBtn.visible = false;
            addTalenTxt.visible = false;
            this._upBF.visible = false;
            //活动奖励更改位置
            shopBg.x = talenBg.x;
            shopBg.y = talenBg.y;
            shopBtn.x = addTalenBtn.x + addTalenBtn.width / 2 - shopBtn.width / 2;
            shopBtn.y = addTalenBtn.y + addTalenBtn.height / 2 - shopBtn.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0, 0]);
            //battleBtn 屏蔽
            battleBtn.visible = false;
            myTalenBg.visible = false;
            myTalen.visible = false;
            if (this._searchGroup) {
                this._searchGroup.visible = false;
            }
            if (this._enemyGroup) {
                this._enemyGroup.visible = false;
            }
            if (!this._middleDescBg) {
                this._middleDescBg = BaseBitmap.create("public_9v_bg05");
                this._middleDescBg.width = 413;
                this._middleDescBg.height = 219;
                this._middleDescBg.x = GameConfig.stageWidth / 2 - this._middleDescBg.width / 2;
                this._middleDescBg.y = GameConfig.stageHeigth / 2 - this._middleDescBg.height / 2;
                this.addChild(this._middleDescBg);
            }
            if (!this._joinDescText) {
                this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc4"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                if (PlatformManager.checkIsViSp()) {
                    this._joinDescText.width = 380;
                }
                // this._joinDescText.x = this._middleDescBg.x + this._middleDescBg.width/2 - this._joinDescText.width/2;
                // this._joinDescText.y = this._middleDescBg.y + 40;
                // this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
                this.addChild(this._joinDescText);
            }
            var firstZid = this.vo.rankData.zidrankarr[0];
            var server = "";
            if (this.vo.getQuByZid(firstZid.zid)) {
                server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.getQuByZid(firstZid.zid))]);
            }
            else {
                server = LanguageManager.getlocal("ranserver2", [String(firstZid.zid)]);
            }
            this._joinDescText.text = LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc4", [server]);
            this._joinDescText.x = this._middleDescBg.x + this._middleDescBg.width / 2 - this._joinDescText.width / 2;
            this._joinDescText.y = this._middleDescBg.y + 40;
            this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
            if (!this._cdTimeDesc) {
                var countDownTime_1 = this.vo.et - 86400 - GameData.serverTime;
                this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime_1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xea1f07);
                // this._cdTimeDesc.x = GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
                // this._cdTimeDesc.y = this._middleDescBg.y + 147;
                this.addChild(this._cdTimeDesc);
            }
            var countDownTime = this.vo.et - 86400 - GameData.serverTime;
            this._cdTimeDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime)]);
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
            this._cdTimeDesc.y = this._middleDescBg.y + 147;
        }
        var ruleBg = BaseBitmap.create("commonview_titlebg02");
        ruleBg.x = 0;
        ruleBg.y = 0;
        this.addChild(ruleBg);
        ruleBg.visible = false;
        var ruleBtn = ComponentManager.getButton("btn_rule", "", this.clickDetailBtnHandler, this);
        ruleBtn.x = 3 + (PlatformManager.hasSpcialCloseBtn() ? 90 : 0);
        ruleBtn.y = 0;
        this.addChild(ruleBtn);
        if (LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == '') {
            this.clickDetailBtnHandler(1);
            LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
        }
        if (PlatformManager.hasSpcialCloseBtn()) {
            this.setLayoutPosition(LayoutConst.horizontalCentertop, ruleBg, rankBg, [0, -ruleBg.height - 10]);
        }
        else {
            ruleBtn.x = 12;
            ruleBtn.y = 0;
        }
        this.addChild(bottomBg);
        var showMore = ComponentManager.getButton("arena_more", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottomBg.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - bottomBg.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
    };
    AcCrossServerWifeBattleView.prototype.clickDetailBtnHandler = function (param) {
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFEBATTLEDETAILPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerWifeBattleView.prototype.initRankData = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.initRankData, this);
        this.vo.setRankData(event.data.data.data);
        if (!this._isPass) {
            this._isPass = true;
            this.loadRes();
        }
    };
    AcCrossServerWifeBattleView.prototype.studyBtnHandler = function () {
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATTLESTUDYPOPUPVIEW);
    };
    AcCrossServerWifeBattleView.prototype.addTalenBtnHandler = function () {
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTPLUSPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcCrossServerWifeBattleView.prototype.searchBtnHandler = function () {
        var _this = this;
        //已经有敌人 返回
        if (this.vo.checkHaveEnemy()) {
            return;
        }
        //此处判断是否cd到了
        if (this.vo.checkCanCDSearch() && this.vo.checkHaveSearchCount()) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, { randtype: 1, activeId: this.vo.aidAndCode });
        }
        else {
            //消耗物品确认弹窗
            var itemUseCount = 1;
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.fightAdd);
            // let msg = LanguageManager.getlocal("wifebattleUseConfirm",[Api.itemVoApi.getItemInfoVoById(Config.WifebattleCfg.fightAdd).name])
            var msg = LanguageManager.getlocal("wifebattleUseConfirm", [Config.ItemCfg.getItemCfgById(Config.WifebattleCfg.fightAdd).name]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: function () {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, { randtype: 2, activeId: _this.vo.aidAndCode });
                },
                handler: this,
                id: Config.WifebattleCfg.fightAdd,
                num: itemCount,
                msg: msg,
                useNum: itemUseCount,
            });
        }
    };
    //两区对战
    AcCrossServerWifeBattleView.prototype.init_top1 = function () {
        var view = this;
        var topBg = BaseBitmap.create("atkracecross_top");
        topBg.x = 0;
        topBg.y = 45;
        topBg.height = 167;
        topBg.width = 640;
        this.addChild(topBg);
        var zonerankinfos = this.vo.rankData.zidrankarr; //this.vo.getPkzid();
        var myServerInfo;
        var otherSerInfo;
        if (zonerankinfos.length) {
            if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                myServerInfo = zonerankinfos[0];
                otherSerInfo = zonerankinfos[1];
            }
            else {
                myServerInfo = zonerankinfos[1];
                otherSerInfo = zonerankinfos[0];
            }
            var serverName1 = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, myServerInfo.zid);
            var serverId1 = ComponentManager.getTextField(serverName1, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 46 + 30);
            this.addChild(serverId1);
            var serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, otherSerInfo.zid);
            var serverId2 = ComponentManager.getTextField(serverName2, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
            this.addChild(serverId2);
            this._scoreTextTab.length = 0;
            var serverScore1 = ComponentManager.getBitmapText(String(myServerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
            serverScore1.setPosition(114, topBg.y + 97);
            this.addChild(serverScore1);
            this._scoreTextTab.push(serverScore1);
            var serverScore2 = ComponentManager.getBitmapText(String(otherSerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
            serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
            this.addChild(serverScore2);
            this._scoreTextTab.push(serverScore2);
        }
        this._doubleResult = new BaseDisplayObjectContainer();
        this.addChild(this._doubleResult);
    };
    AcCrossServerWifeBattleView.prototype.initResult = function () {
        var resultIcon1;
        var resultIcon2;
        var zonerankinfos = this.vo.rankData.zidrankarr;
        if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
            resultIcon1 = "atkracecross_win";
            resultIcon2 = "atkracecross_loss";
        }
        else {
            resultIcon2 = "atkracecross_win";
            resultIcon1 = "atkracecross_loss";
        }
        var result1 = BaseBitmap.create(resultIcon1);
        result1.setPosition(185, 95);
        this._doubleResult.addChild(result1);
        var result2 = BaseBitmap.create(resultIcon2);
        result2.setPosition(424, 95);
        this._doubleResult.addChild(result2);
    };
    //区服排行
    AcCrossServerWifeBattleView.prototype.init_top2 = function () {
        var view = this;
        // let api = view.api;
        var zonerankinfos = null;
        if (this.vo.rankData) {
            zonerankinfos = this.vo.rankData.zidrankarr;
        }
        //this.vo.getPkzid();
        var topBg = BaseBitmap.create("public_v_bg01");
        topBg.y = this.container.y - 20;
        topBg.height = 205;
        this.addChild(topBg);
        var serverText = BaseBitmap.create("atkracecross_rank");
        serverText.setPosition(GameConfig.stageWidth / 2 - serverText.width / 2, topBg.y + 8);
        this.addChild(serverText);
        var huaImg1 = BaseBitmap.create("public_v_huawen01");
        huaImg1.setPosition(GameConfig.stageWidth / 2 - huaImg1.width - 80, serverText.y + serverText.height / 2 - huaImg1.height / 2);
        this.addChild(huaImg1);
        var huaImg2 = BaseBitmap.create("public_v_huawen01");
        huaImg2.anchorOffsetX = huaImg2.width;
        huaImg2.scaleX = -1;
        huaImg2.setPosition(GameConfig.stageWidth / 2 + 80, huaImg1.y);
        this.addChild(huaImg2);
        var winbg = BaseBitmap.create("atkracecross_rewatdbg3");
        winbg.width = GameConfig.stageWidth;
        winbg.y = serverText.y + serverText.height + 5;
        winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
        this.addChild(winbg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(GameConfig.stageWidth / 2 - 155 - rankText.width / 2, winbg.y + winbg.height / 2 - rankText.height / 2);
        this.addChild(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(GameConfig.stageWidth / 2 - qufuText.width / 2, rankText.y);
        this.addChild(qufuText);
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointText.setPosition(GameConfig.stageWidth / 2 + 155 - pointText.width / 2, rankText.y);
        this.addChild(pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 120);
        var arr = [];
        if (zonerankinfos) {
            for (var _i = 0, zonerankinfos_1 = zonerankinfos; _i < zonerankinfos_1.length; _i++) {
                var unit = zonerankinfos_1[_i];
                arr.push({
                    zid: unit.zid,
                    point: unit.point,
                    type: 'enterIn'
                });
            }
        }
        this._serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
        this.addChild(this._serverList);
        this._serverList.y = winbg.height + winbg.y + 5;
        //描述
        var atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
        atkracedes.y = this._serverList.y + 50;
        this.addChild(atkracedes);
        this._atkracedes1 = atkracedes;
        this._atkracedes1.visible = arr.length == 0;
    };
    AcCrossServerWifeBattleView.prototype.searchCallback = function () {
        this.refreshView();
    };
    AcCrossServerWifeBattleView.prototype.battleBtnHandler = function () {
        if (this._isInBattle) {
            return;
        }
        //TEST
        // ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLERESULTVIEW,{type:1});
        if (this.vo.checkHaveEnemy()) {
            this._isInBattle = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHT, { activeId: this.vo.aidAndCode });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleNoEnemyAttack"));
        }
    };
    AcCrossServerWifeBattleView.prototype.shopClick = function () {
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFEBATTLEREWARDVIEW, {
            aid: this.aid,
            code: this.code
        });
    };
    AcCrossServerWifeBattleView.prototype.rankClick = function () {
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFEBATTLERANKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcCrossServerWifeBattleView.prototype.showMoreHandle = function () {
        if (this.touchBoo) {
            this._isShowMore = !this._isShowMore;
            if (this._isShowMore == true) {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                this.showList();
            }
            else {
                this._moreArrow.scaleY = 1;
                this._moreArrow.y -= this._moreArrow.height;
                this.closeList();
            }
        }
    };
    AcCrossServerWifeBattleView.prototype.showList = function () {
        AcCrossServerWifeBattleView.isOpenWin = true;
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moreBg = BaseBitmap.create("arena_bottom_bg");
        this.moreBg.width = 640;
        this.moreBg.height = GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width = GameConfig.stageWidth;
        this._currMaskBmp.height = GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp, this.getChildIndex(this._bottomBg));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9v_bg11");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        if (this.isData) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 10, 640, GameConfig.stageHeigth - 380);
            this._scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleMoreItem, this._battleDataList, rect, { aidAndCode: this.aid + "-" + this.code });
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.y = 25;
        }
        else {
            var atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x = GameConfig.stageWidth / 2 - atkracedes3.width / 2; //250;
            atkracedes3.y = 300;
            this.moveContainer.addChild(atkracedes3);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        //描述文字：击败门客20
        var num = Config.AtkraceCfg.getbeatNum();
        if (this.describeTxt) {
            this.describeTxt.visible = false;
            // this._nameTxt.visible =false;
        }
        egret.Tween.get(this.moveContainer).to({ y: 250 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
            if (this.listconditions) {
                this.listconditions.visible = true;
            }
        }, this);
    };
    AcCrossServerWifeBattleView.prototype.closeList = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
        this.touchBoo = false;
        if (this.describeTxt) {
            this.describeTxt.visible = true;
            // this._nameTxt.visible =true;
        }
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                this.touchBoo = true;
                egret.Tween.removeTweens(this.moveContainer);
            }, this);
        }
        if (this._currMaskBmp && this._currMaskBmp.parent) {
            this._currMaskBmp.parent.removeChild(this._currMaskBmp);
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        if (this._touchBg && this._touchBg.parent) {
            this._touchBg.parent.removeChild(this._touchBg);
            this._touchBg.dispose();
            this._touchBg = null;
        }
    };
    AcCrossServerWifeBattleView.prototype.showText = function () {
        if (this._nameTxt) {
            this.removeChild(this._nameTxt);
            this._nameTxt = null;
        }
        if (this._battleDataList.length > 0 && this._battleDataList[0].auid) {
            var data = this._battleDataList[0];
            var str = LanguageManager.getlocal("wifeBattleMoreDetail", [data.aname, data.dname, data.atotalwinnum, data.agetpoint]);
            // let str = LanguageManager.getlocal("wifeBattleMoreDetail",[data.aname,data.dname,data.num,data.point]);
            if (!this.describeTxt) {
                var describeTxt = null;
                describeTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                describeTxt.width = 450;
                describeTxt.x = 20;
                describeTxt.y = GameConfig.stageHeigth - 47 - describeTxt.height / 2;
                describeTxt.lineSpacing = 7;
                this.describeTxt = describeTxt;
                this.addChild(describeTxt);
            }
            else {
                this.describeTxt.text = str;
            }
        }
    };
    AcCrossServerWifeBattleView.prototype.fightReview = function (event) {
        var data = event.data.data.data;
        if (data.cantfindid == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleMoreOutTime"));
            return;
        }
        if (event.data.ret && event.data.data.ret == 0) {
            var fightarr = event.data.data.data.fightarr;
            var point = fightarr.auserinfo.point;
            var rewardnum = fightarr.auserinfo.rewardnum;
            var winflag = fightarr.winflag;
            if (event && event.data.data.data.wifebattlecross) {
                this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW, {
                fightarr: fightarr,
                point: point,
                rewardnum: rewardnum,
                winflag: winflag,
                callback: this.checkShowSearch,
                isReview: true,
                target: this
            });
        }
    };
    AcCrossServerWifeBattleView.prototype.chatBgClickHandler = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        AcCrossServerWifeBattleView.isOpenWin = true;
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLECHATVIEW, { aid: this.param.data.aid, code: this.param.data.code });
    };
    AcCrossServerWifeBattleView.prototype.checkStudyRed = function () {
        //当前等级
        // let curLv = this.vo.wifebattlecross.info.ylinfo ? this.vo.wifebattlecross.info.ylinfo.lv:0;
        var curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
        var studyItemCfg = Config.WifebattleCfg.getWifeStudyCfgById(curLv + 1);
        var showRed = false;
        if (studyItemCfg) {
            var statusNum = Api.wifestatusVoApi.getStatusWifeNum();
            var itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
            var needStatusNum = studyItemCfg.wifeStatusNum;
            var itemNeedNum = studyItemCfg.itemCost;
            if (statusNum >= needStatusNum && itemHaveNum >= itemNeedNum) {
                showRed = true;
            }
        }
        if (showRed) {
            App.CommonUtil.addIconToBDOC(this._studyBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._studyBtn);
        }
    };
    AcCrossServerWifeBattleView.prototype.refreshList = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.wifebattlecross) {
                this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
            }
            this._battleDataList = event.data.data.data.fightlist;
            this.showText();
            if (this._battleDataList.length > 0) {
                this.isData = true;
            }
            else {
                this.isData = false;
            }
        }
        else {
            this.isData = false;
        }
    };
    // }
    AcCrossServerWifeBattleView.prototype.fightCallback = function (event) {
        // console.log("fight");
        // console.log(event);
        if (event.data.ret && event.data.data.ret == 0) {
            var data = event.data.data.data;
            var fightarr = data.fightarr;
            var point = data.point;
            var rewardnum = data.rewardnum;
            var winflag = data.winflag;
            // console.log("fightcallback--->",event.data);
            if (event && event.data.data.data.wifebattlecross) {
                this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW, {
                fightarr: fightarr,
                point: point,
                rewardnum: rewardnum,
                winflag: winflag,
                callback: this.checkShowSearch,
                isReview: false,
                target: this
            });
        }
    };
    AcCrossServerWifeBattleView.prototype.checkShowSearch = function (event) {
        // console.log("checkShowSearch",data);
        if (event && event.data.data.data.wifebattlecross) {
            this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
        }
        this._isInBattle = false;
        if (!event) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.refreshTop, this);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, { activeId: this.vo.aidAndCode });
        }
        else {
            if (this.vo.isShowWifeSearch()) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW, { callback: this.searchCallback, target: this, aid: this.aid, code: this.code });
            }
            else {
                this.refreshView();
            }
        }
    };
    //刷新顶部
    AcCrossServerWifeBattleView.prototype.refreshTop = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.refreshTop, this);
        this.vo.setRankData(event.data.data.data);
        if (this.vo.isShowWifeSearch()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW, { callback: this.searchCallback, target: this, aid: this.aid, code: this.code });
        }
        else {
            this.refreshView();
        }
    };
    AcCrossServerWifeBattleView.prototype.gameOverHanler = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.gameOverHanler, this);
        // if(event && event.data.data.data.wifebattlecross){
        // 	this.vo.setWifebattleInfo(event.data.data.data.wifebattlecross);
        // }
        this.vo.setRankData(event.data.data.data);
        this.activeOver();
    };
    AcCrossServerWifeBattleView.prototype.activeOver = function () {
        var pkzidNum = this.vo.getPkzidNum();
        if (pkzidNum == 2) {
            this.initResult();
        }
        var cdType = this.vo.judgeTimeProcess();
        //	屏蔽永乐大典
        this._studyBg.visible = false;
        this._studyBtn.visible = false;
        this._studyTxt.visible = false;
        //屏蔽才情
        this._talenBg.visible = false;
        this._addTalenBtn.visible = false;
        this._addTalenTxt.visible = false;
        this._upBF.visible = false;
        //活动奖励更改位置
        this._shopBg.x = this._talenBg.x;
        this._shopBg.y = this._talenBg.y;
        this._shopBtn.x = this._addTalenBtn.x + this._addTalenBtn.width / 2 - this._shopBtn.width / 2;
        this._shopBtn.y = this._addTalenBtn.y + this._addTalenBtn.height / 2 - this._shopBtn.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._shopTxt, this._shopBtn, [0, 0]);
        //battleBtn 屏蔽
        this._battleBtn.visible = false;
        this._myTalenBg.visible = false;
        this._myTalen.visible = false;
        if (this._searchGroup) {
            this._searchGroup.visible = false;
        }
        if (this._enemyGroup) {
            this._enemyGroup.visible = false;
        }
        if (!this._middleDescBg) {
            this._middleDescBg = BaseBitmap.create("public_9v_bg05");
            this._middleDescBg.width = 413;
            this._middleDescBg.height = 219;
            this._middleDescBg.x = GameConfig.stageWidth / 2 - this._middleDescBg.width / 2;
            this._middleDescBg.y = GameConfig.stageHeigth / 2 - this._middleDescBg.height / 2;
            this.addChild(this._middleDescBg);
        }
        if (!this._joinDescText) {
            var firstZid = this.vo.rankData.zidrankarr[0];
            var server = "";
            if (this.vo.getQuByZid(firstZid.zid)) {
                server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.getQuByZid(firstZid.zid))]);
            }
            else {
                server = LanguageManager.getlocal("ranserver2", [String(firstZid.zid)]);
            }
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc4", [server]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            if (PlatformManager.checkIsViSp()) {
                this._joinDescText.width = 380;
            }
            this._joinDescText.x = this._middleDescBg.x + this._middleDescBg.width / 2 - this._joinDescText.width / 2;
            this._joinDescText.y = this._middleDescBg.y + 40;
            this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this._joinDescText);
        }
        if (!this._cdTimeDesc) {
            var countDownTime = this.vo.et - 86400 - GameData.serverTime;
            this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xea1f07);
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
            this._cdTimeDesc.y = this._middleDescBg.y + 147;
            this.addChild(this._cdTimeDesc);
        }
        // let pkzidNum = this.vo.getPkzidNum();
        if (pkzidNum > 2) {
            var zonerankinfos = this.vo.rankData.zidrankarr;
            var arr = [];
            for (var _i = 0, zonerankinfos_2 = zonerankinfos; _i < zonerankinfos_2.length; _i++) {
                var unit = zonerankinfos_2[_i];
                arr.push({
                    zid: unit.zid,
                    point: unit.point,
                    type: 'enterIn'
                });
            }
            this._serverList.refreshData(arr);
        }
        else {
            var zonerankinfos = this.vo.rankData.zidrankarr;
            var myServerInfo = void 0;
            var otherSerInfo = void 0;
            if (zonerankinfos.length) {
                if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                    myServerInfo = zonerankinfos[0];
                    otherSerInfo = zonerankinfos[1];
                }
                else {
                    myServerInfo = zonerankinfos[1];
                    otherSerInfo = zonerankinfos[0];
                }
            }
            if (this._scoreTextTab.length == 2) {
                this._scoreTextTab[0].text = String(myServerInfo.point);
                this._scoreTextTab[1].text = String(otherSerInfo.point);
            }
        }
    };
    AcCrossServerWifeBattleView.prototype.refreshView = function () {
        // console.log("refreshView");
        this._myTalen.text = LanguageManager.getlocal("wifeBattleMyTalen", [this.vo.wifebattlecross.info.totaltalent]);
        //刷新标头
        var pkzidNum = this.vo.getPkzidNum();
        if (pkzidNum > 2) {
            var zonerankinfos = this.vo.rankData.zidrankarr;
            var arr = [];
            for (var _i = 0, zonerankinfos_3 = zonerankinfos; _i < zonerankinfos_3.length; _i++) {
                var unit = zonerankinfos_3[_i];
                arr.push({
                    zid: unit.zid,
                    point: unit.point,
                    type: 'enterIn'
                });
            }
            this._serverList.refreshData(arr);
        }
        else {
            var zonerankinfos = this.vo.rankData.zidrankarr;
            var myServerInfo = void 0;
            var otherSerInfo = void 0;
            if (zonerankinfos.length) {
                if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                    myServerInfo = zonerankinfos[0];
                    otherSerInfo = zonerankinfos[1];
                }
                else {
                    myServerInfo = zonerankinfos[1];
                    otherSerInfo = zonerankinfos[0];
                }
            }
            if (this._scoreTextTab.length == 2) {
                this._scoreTextTab[0].text = String(myServerInfo.point);
                this._scoreTextTab[1].text = String(otherSerInfo.point);
            }
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST, { activeId: this.vo.aidAndCode });
        var maxInfo = this.vo.getEnemyMaxInfo();
        if (maxInfo == null) {
            //搜索
            if (this._enemyGroup) {
                this._enemyGroup.visible = false;
            }
            if (!this._searchGroup) {
                this._searchGroup = new BaseDisplayObjectContainer();
                this._searchGroup.width = 640;
                this._searchGroup.height = 200;
                this.addChild(this._searchGroup);
                this.setChildIndex(this._searchGroup, this.getChildIndex(this._bottomBg));
                this._searchGroup.x = 0;
                this._searchGroup.y = GameConfig.stageHeigth / 2 - this._searchGroup.height / 2 - 60;
                var descbg = BaseBitmap.create('public_lockbg');
                // descbg.width = 450;
                // descbg.height = 106;
                descbg.scaleX = 3;
                descbg.scaleY = 3;
                descbg.x = this._searchGroup.width / 2 - descbg.width * descbg.scaleX / 2;
                descbg.y = 0;
                this._descBg = descbg;
                this._searchGroup.addChild(descbg);
                var descTxt = ComponentManager.getTextField(this.vo.getCDStr(), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                descTxt.width = 430;
                descTxt.lineSpacing = 10;
                descTxt.textAlign = egret.HorizontalAlign.CENTER;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
                this._descTxt = descTxt;
                this._searchGroup.addChild(descTxt);
                var searchBtn = ComponentManager.getButton('flipcard_button2', 'wifeBattleSearchBtn', this.searchBtnHandler, this, null, 3);
                searchBtn.x = this._searchGroup.width / 2 - searchBtn.width / 2;
                searchBtn.y = this._searchGroup.height - searchBtn.height;
                searchBtn.setColor(TextFieldConst.COLOR_BROWN);
                this._searchGroup.addChild(searchBtn);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._descTxt, this._descBg);
            this._searchGroup.visible = true;
        }
        else {
            //显示红颜
            if (this._searchGroup) {
                this._searchGroup.visible = false;
            }
            if (!this._enemyGroup) {
                this._enemyGroup = new BaseDisplayObjectContainer();
                this._enemyGroup.width = 640;
                this._enemyGroup.height = 728;
                this.addChild(this._enemyGroup);
                this.setChildIndex(this._enemyGroup, this.getChildIndex(this._bottomBg));
                this._enemyGroup.x = 0;
                this._enemyGroup.y = (this._bottomBg.y - 185) / 2 - 728 / 2 + 30 + 30;
                var wifeParent = new BaseDisplayObjectContainer();
                wifeParent.width = 640;
                wifeParent.height = 728;
                wifeParent.x = 0;
                wifeParent.y = 0;
                this._enemyGroup.addChild(wifeParent);
                this._enemyGroup.name = "enemyGrounp";
                //talk
                var talkBg = BaseBitmap.create("wifebattleview_talkbg");
                var talkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                talkBg.name = "talkBg";
                talkTxt.name = "talkTxt";
                talkTxt.width = 200;
                var talkStr = LanguageManager.getlocal("wifeBattleEnemyTalk");
                talkTxt.text = talkStr;
                talkBg.width = talkTxt.width + 40;
                talkBg.height = talkTxt.height + 40 + 20;
                talkBg.scaleX = -1;
                talkBg.x = this._enemyGroup.width - 10;
                talkBg.y = this._enemyGroup.height - 450 - talkBg.height + 30 + 30;
                this._enemyGroup.addChild(talkBg);
                talkTxt.x = talkBg.x - talkBg.width + talkBg.width / 2 - talkTxt.width / 2;
                talkTxt.y = talkBg.y + talkBg.height / 2 - talkTxt.height / 2 - 10;
                this._enemyGroup.addChild(talkTxt);
                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
                    var hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
                    hudie.x = talkBg.x - talkBg.width + 20;
                    hudie.y = talkBg.y + 5;
                    this._enemyGroup.addChild(hudie);
                }
                //talk over
                var mask = BaseBitmap.create("wifebattleview_enemymask");
                wifeParent.addChild(mask);
                wifeParent.mask = mask;
                this._wifeParent = wifeParent;
                var wifeDescBg = BaseBitmap.create("wifebattleview_enemydescbg");
                wifeDescBg.x = this._enemyGroup.width / 2 - wifeDescBg.width / 2;
                wifeDescBg.y = 500;
                this._enemyGroup.addChild(wifeDescBg);
                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("huaban_01_ske")) {
                    var huaban_01 = App.DragonBonesUtil.getLoadDragonBones("huaban_01");
                    huaban_01.x = wifeDescBg.x + 100;
                    huaban_01.y = wifeDescBg.y + 100;
                    this._enemyGroup.addChild(huaban_01);
                }
                var playerNameTxt = ComponentManager.getTextField(String(this.vo.wifebattlecross.ainfo.fname), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                playerNameTxt.x = wifeDescBg.x + 180;
                playerNameTxt.y = wifeDescBg.y + 57;
                this._enemyGroup.addChild(playerNameTxt);
                var enemyTalenTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentEnemyTalen", [String(this.vo.wifebattlecross.ainfo.totaltalent)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                enemyTalenTxt.x = wifeDescBg.x + 180;
                enemyTalenTxt.y = wifeDescBg.y + 100;
                this._enemyGroup.addChild(enemyTalenTxt);
                var enemyWifeNum = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentEnemyWifeNum", [String(this.vo.wifebattlecross.ainfo.totalnum)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                enemyWifeNum.x = wifeDescBg.x + 180;
                enemyWifeNum.y = enemyTalenTxt.y + enemyTalenTxt.height + 5;
                this._enemyGroup.addChild(enemyWifeNum);
                //敌人的名字
                this._playerNameTxt = playerNameTxt;
                //敌人的总才情
                this._enemyTalenTxt = enemyTalenTxt;
                //敌人的个数
                this._enemyWifeNum = enemyWifeNum;
            }
            var wifeCfg = null;
            if (maxInfo.wifeid) {
                wifeCfg = Config.WifeCfg.getWifeCfgById(maxInfo.wifeid);
            }
            var wifeImg = wifeCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_full_" + wifeCfg.id;
            if (maxInfo.skin) {
                var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1); //myWifeSkinCfg.bone;//"wife_full3_" + maxInfo.skin;
            }
            if (this._wifeBM) {
                if (this._wifeBM instanceof BaseLoadDragonBones) {
                    this._wifeBM.stop();
                }
                // this._wifeParent.removeChild(this._wifeBM);
                this._wifeBM.dispose();
                this._wifeBM = null;
            }
            if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(wifeImg + "_ske") && Api.wifeVoApi.isHaveBone(wifeImg + "_ske")) {
                this._wifeBM = App.DragonBonesUtil.getLoadDragonBones(wifeImg);
                this._wifeBM.x = GameConfig.stageWidth / 2;
                this._wifeBM.y = 715 + 20; //750 - 35;//728;
                this._wifeParent.addChild(this._wifeBM);
                this._wifeBM.setScale(0.85);
            }
            else {
                if (maxInfo.skin) {
                    var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                    wifeImg = myWifeSkinCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1); //myWifeSkinCfg.body;//"wife_skin_" + maxInfo.skin;
                }
                var scaleNum = 0.7 * 0.85;
                this._wifeBM = BaseLoadBitmap.create(wifeImg);
                this._wifeBM.width = 640;
                this._wifeBM.height = 840;
                this._wifeBM.setScale(scaleNum);
                this._wifeBM.x = GameConfig.stageWidth / 2 - this._wifeBM.width * this._wifeBM.scaleX / 2;
                this._wifeBM.y = 715 - 840 * scaleNum + 20;
                this._wifeParent.addChild(this._wifeBM);
            }
            var server = null;
            if (this.vo.wifebattlecross.ainfo.qu > 0) {
                server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.wifebattlecross.ainfo.qu)]);
            }
            else {
                server = LanguageManager.getlocal("ranserver2", [String(this.vo.wifebattlecross.ainfo.zid)]);
            }
            this._playerNameTxt.text = String(this.vo.wifebattlecross.ainfo.fname + " (" + server + ")");
            this._enemyTalenTxt.text = LanguageManager.getlocal("wifeTalentEnemyTalen", [String(this.vo.wifebattlecross.ainfo.totaltalent)]);
            this._enemyWifeNum.text = LanguageManager.getlocal("wifeTalentEnemyWifeNum", [String(this.vo.wifebattlecross.ainfo.totalnum)]);
            this._enemyGroup.visible = true;
        }
        if (this.vo.checkHaveEnemy()) {
            this._battleBtn.setEnable(true);
        }
        else {
            this._battleBtn.setEnable(false);
        }
        var cdType = this.vo.judgeTimeProcess();
        if (cdType == 3 || cdType == 4) {
            this._isActiveOver = true;
            if (this._searchGroup) {
                this._searchGroup.visible = false;
            }
            if (this._enemyGroup) {
                this._enemyGroup.visible = false;
            }
        }
        if (!this.vo.isCanJoin) {
            if (this._searchGroup) {
                this._searchGroup.visible = false;
            }
            if (this._enemyGroup) {
                this._enemyGroup.visible = false;
            }
        }
    };
    AcCrossServerWifeBattleView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_WIFEBATTLE;
    };
    AcCrossServerWifeBattleView.prototype.tick = function () {
        var cdStr = this.vo.getCDStr();
        if (this._descTxt) {
            this._descTxt.text = cdStr;
            if (cdStr == "") {
                if (this._isInBattle) {
                    return;
                }
                if (AcCrossServerWifeBattleView.isOpenWin) {
                    return;
                }
                console.log(AcCrossServerWifeBattleView.isOpenWin);
                if (this.vo.checkHaveEnemy()) {
                    return;
                }
                //此处判断是否cd到了
                if (this.vo.checkCanCDSearch()) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, { randtype: 1, activeId: this.vo.aidAndCode });
                }
            }
        }
        var cdType = this.vo.judgeTimeProcess();
        var countDownTime = 0;
        if (cdType == 2) {
            countDownTime = this.vo.et - 86400 - GameData.serverTime;
        }
        else if (cdType == 3) {
            countDownTime = this.vo.et - GameData.serverTime;
            if (!this._isActiveOver) {
                //刚进入展示期 要刷新model  刷新界面
                this._isActiveOver = true;
                App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.gameOverHanler, this);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, { activeId: this.vo.aidAndCode });
            }
        }
        else if (cdType == 4) {
            // this._enterBtn.setEnable(false);
            this.hide();
            // App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
            return;
        }
        if (this._cdTimeDesc) {
            this._cdTimeDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + cdType, [this.vo.getCountTimeStr(countDownTime)]);
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
            this._cdTimeDesc.y = this._middleDescBg.y + 147;
        }
    };
    AcCrossServerWifeBattleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkStudyRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.initRankData, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,this.crashModelHanler,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, this.gameOverHanler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH, this.checkShowSearch, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHT, this.fightCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST, this.refreshList, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHTREVIEW, this.fightReview, this);
        this._searchGroup = null;
        this._enemyGroup = null;
        this._studyBtn = null;
        this._shopBtn = null;
        this._upBF = null;
        this._upArrow = null;
        this._talenBtn = null;
        this._moreArrow = null;
        this._isShowMore = false;
        this.touchBoo = true;
        this.moreBg = null;
        this.moveContainer = null;
        this._touchBg = null;
        this._currMaskBmp = null;
        this._scrollList = null;
        this._bottomBg = null;
        this.isData = false;
        this._battleDataList = [];
        this._nameTxt = null;
        this.describeTxt = null;
        this._descTxt = null;
        this._descBg = null;
        this._playerNameTxt = null;
        this._enemyTalenTxt = null;
        this._enemyWifeNum = null;
        if (this._wifeBM && this._wifeBM instanceof BaseLoadDragonBones) {
            this._wifeBM.stop();
            this._wifeBM.dispose();
        }
        this._wifeBM = null;
        this._wifeParent = null;
        this._isInBattle = false;
        this._battleBtn = null;
        this._isPass = false;
        this._chatTxt = null;
        this._scoreTextTab = [];
        this._serverList = null;
        this._atkracedes1 = null;
        this._joinDescText = null;
        this._cdTimeDesc = null;
        this._middleDescBg = null;
        this._isActiveOver = false;
        this._isRefreshPass = false;
        this._studyBg = null;
        this._studyTxt = null;
        this._talenBg = null;
        this._addTalenBtn = null;
        this._addTalenTxt = null;
        this._shopBg = null;
        this._myTalenBg = null;
        this._myTalen = null;
        this._shopTxt = null;
        this._doubleResult = null;
        this.aid = null;
        this.code = null;
        AcCrossServerWifeBattleView.isOpenWin = false;
        this.isDouble = true;
        _super.prototype.dispose.call(this);
    };
    AcCrossServerWifeBattleView.isOpenWin = false;
    return AcCrossServerWifeBattleView;
}(CommonView));
__reflect(AcCrossServerWifeBattleView.prototype, "AcCrossServerWifeBattleView");
