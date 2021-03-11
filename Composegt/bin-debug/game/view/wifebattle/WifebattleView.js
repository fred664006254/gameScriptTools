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
var WifebattleView = (function (_super) {
    __extends(WifebattleView, _super);
    function WifebattleView() {
        var _this = _super.call(this) || this;
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
        _this._isFirst = 0;
        _this._isPass = false;
        return _this;
    }
    Object.defineProperty(WifebattleView.prototype, "vo", {
        get: function () {
            return Api.wifebattleVoApi.wifebattleVo;
        },
        enumerable: true,
        configurable: true
    });
    WifebattleView.prototype.isShowOpenAni = function () {
        return false;
    };
    WifebattleView.prototype.getResourceList = function () {
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
        ]);
    };
    WifebattleView.prototype.getRequestData = function () {
        this._isFirst = this.vo.info.isfirst;
        return { requestType: NetRequestConst.REQUEST_WIFEBATTLE_INDEX, requestData: {
                randtype: 1,
            } };
    };
    WifebattleView.prototype.receiveData = function (data) {
        if (data.data.ret == 0 && data.data.data.notstandard) {
            this.hideLoadingMask();
            this.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleUpLockDesc2", [String(Config.WifebattleCfg.unlock_player), String(data.data.data.standardnum)]));
        }
        else {
            if (!this._isPass) {
                this._isPass = true;
                this.loadRes();
            }
        }
    };
    WifebattleView.prototype.initTitle = function () {
        return null;
    };
    // protected getBgName():string
    // {
    // 	return "acwipeboss_bg1";
    // }
    WifebattleView.prototype.getCloseBtnName = function () {
        return ButtonConst.BTN_WIN_CLOSEBTN;
    };
    WifebattleView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("wifebattlebattleview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 1136;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    WifebattleView.prototype.getTitleStr = function () {
        return null;
    };
    WifebattleView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkStudyRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_SEARCH, this.checkShowSearch, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_FIGHT, this.fightCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_LIST, this.refreshList, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, this.fightReview, this);
        // NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_LIST, {});
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        if (this._isFirst == 1) {
            // this._isFirst = 0;
            Api.rookieVoApi.insertWaitingGuide({ "idx": "wifebattle_1" }, true);
            Api.rookieVoApi.checkWaitingGuide();
        }
        var title = BaseLoadBitmap.create('wifebattleview_title');
        title.width = 522;
        title.height = 198;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, this, [0, 0]);
        this.addChild(title);
        //底部
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 94;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this);
        this._bottomBg = bottomBg;
        var battleBtn = ComponentManager.getButton('wifebattleview_battlebtn', '', this.battleBtnHandler, this);
        // battleBtn.anchorOffsetX = battleBtn.width / 2;
        // battleBtn.anchorOffsetY = battleBtn.height / 2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, battleBtn, bottomBg,[0,0]);
        battleBtn.x = GameConfig.stageWidth / 2 - battleBtn.width / 2;
        battleBtn.y = bottomBg.y - battleBtn.height - 30;
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
        var myTalen = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleMyTalen", [this.vo.info.totaltalent]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, myTalen, myTalenBg);
        this.addChild(myTalen);
        //才情加成
        var talenBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(talenBg);
        var addTalenBtn = ComponentManager.getButton("wifebattleview_addtalentbtn", "", this.addTalenBtnHandler, this);
        this._talenBtn = addTalenBtn;
        this._talenBtn.x = 15;
        this._talenBtn.y = bottomBg.y - 20 - this._talenBtn.height;
        this.addChild(addTalenBtn);
        talenBg.setPosition(addTalenBtn.x + addTalenBtn.width / 2 - talenBg.width / 2, addTalenBtn.y + addTalenBtn.height / 2 - talenBg.width / 2);
        var addTalenTxt = BaseBitmap.create("wifebattleview_addtalentext");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, addTalenTxt, addTalenBtn, [0, 0]);
        this.addChild(addTalenTxt);
        var addvStr = (this.vo.info.tmpattr.statusadd + this.vo.info.tmpattr.actadd) + "%";
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
        var studyBtn = ComponentManager.getButton("wifebattleview_studybtn", "", this.studyBtnHandler, this);
        studyBtn.x = 15;
        studyBtn.y = this._talenBtn.y - 10 - studyBtn.height;
        this.addChild(studyBtn);
        this._studyBtn = studyBtn;
        studyBg.setPosition(studyBtn.x + studyBtn.width / 2 - studyBg.width / 2, studyBtn.y + studyBtn.height / 2 - studyBg.width / 2);
        var studyTxt = BaseBitmap.create("wifebattleview_studytxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, studyTxt, studyBtn, [0, 0]);
        this.addChild(studyTxt);
        //排行榜
        var rankBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(rankBg);
        var rankBtn = ComponentManager.getButton("punish_rank_icon", "", this.rankClick, this);
        rankBtn.x = GameConfig.stageWidth - 15 - rankBtn.width;
        rankBtn.y = bottomBg.y - 15 - rankBtn.height;
        this.addChild(rankBtn);
        rankBg.setPosition(rankBtn.x + rankBtn.width / 2 - rankBg.width / 2, rankBtn.y + rankBtn.height / 2 - rankBg.width / 2);
        var rankTxt = BaseBitmap.create("punish_rank_name");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankTxt, rankBtn, [0, 0]);
        this.addChild(rankTxt);
        //兑换按钮
        var shopBg = BaseBitmap.create("mainui_bottombtnbg");
        this.addChild(shopBg);
        var shopBtn = ComponentManager.getButton("wifebattleview_shopbtn", "", this.shopClick, this);
        shopBtn.x = rankBtn.x;
        shopBtn.y = rankBtn.y - 5 - shopBtn.height;
        this.addChild(shopBtn);
        this._shopBtn = shopBtn;
        shopBg.setPosition(shopBtn.x + shopBtn.width / 2 - shopBg.width / 2, shopBtn.y + shopBtn.height / 2 - shopBg.width / 2);
        var shopTxt = BaseBitmap.create("punish_ex_name");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0, 0]);
        this.addChild(shopTxt);
        this.addChild(bottomBg);
        var showMore = ComponentManager.getButton("arena_more", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottomBg.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - bottomBg.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
        this.checkShowSearch();
        if (!PlatformManager.hasSpcialCloseBtn()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this, [25, 20]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.closeBtn, this, [25, 20]);
        }
        this.checkStudyRed();
    };
    // private doGuide()
    // {
    //    this.exchangeClickHandler();
    // }
    WifebattleView.prototype.studyBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATTLESTUDYPOPUPVIEW);
    };
    WifebattleView.prototype.addTalenBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTPLUSPOPUPVIEW);
    };
    WifebattleView.prototype.searchBtnHandler = function () {
        //已经有敌人 返回
        if (this.vo.checkHaveEnemy()) {
            return;
        }
        //此处判断是否cd到了
        if (this.vo.checkCanCDSearch() && this.vo.checkHaveSearchCount()) {
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_SEARCH, { randtype: 1 });
        }
        else {
            //消耗物品确认弹窗
            var itemUseCount = 1;
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.fightAdd);
            // let msg = LanguageManager.getlocal("wifebattleUseConfirm",[Api.itemVoApi.getItemInfoVoById(Config.WifebattleCfg.fightAdd).name])
            var msg = LanguageManager.getlocal("wifebattleUseConfirm", [Config.ItemCfg.getItemCfgById(Config.WifebattleCfg.fightAdd).name]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: function () {
                    NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_SEARCH, { randtype: 2 });
                },
                handler: this,
                id: Config.WifebattleCfg.fightAdd,
                num: itemCount,
                msg: msg,
                useNum: itemUseCount,
            });
        }
    };
    WifebattleView.prototype.searchCallback = function () {
        this.refreshView();
    };
    WifebattleView.prototype.battleBtnHandler = function () {
        if (this._isInBattle) {
            return;
        }
        //TEST
        // ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLERESULTVIEW,{type:1});
        if (this.vo.checkHaveEnemy()) {
            this._isInBattle = true;
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_FIGHT, {});
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleNoEnemyAttack"));
        }
    };
    WifebattleView.prototype.shopClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATTLESHOPPOPUPVIEW);
    };
    WifebattleView.prototype.rankClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATTLERANKPOPUPVIEW);
    };
    WifebattleView.prototype.showMoreHandle = function () {
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
    WifebattleView.prototype.showList = function () {
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
            this._scrollList = ComponentManager.getScrollList(WifebattleMoreItem, this._battleDataList, rect);
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
    WifebattleView.prototype.closeList = function () {
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
    WifebattleView.prototype.showText = function () {
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
    WifebattleView.prototype.fightReview = function (event) {
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
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLEBATTLEVIEW, {
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
    WifebattleView.prototype.checkStudyRed = function () {
        //当前等级
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
    WifebattleView.prototype.refreshList = function (event) {
        if (event.data.ret) {
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
    // private battleCallback():void
    // {
    // 	this.refreshView();
    // 	if(this.describeTxt)
    // 	{
    // 		this.removeChild(this.describeTxt);
    // 		this.describeTxt =null;
    // 	}
    // 	NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_LIST, {});
    // }
    WifebattleView.prototype.fightCallback = function (event) {
        console.log("fight");
        console.log(event);
        if (event.data.ret && event.data.data.ret == 0) {
            var data = event.data.data.data;
            var fightarr = data.fightarr;
            var point = data.point;
            var rewardnum = data.rewardnum;
            var winflag = data.winflag;
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLEBATTLEVIEW, {
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
    WifebattleView.prototype.checkShowSearch = function () {
        console.log("checkShowSearch");
        this._isInBattle = false;
        var isOpen = true;
        if (this._isFirst == 1) {
            this._isFirst = 0;
            isOpen = false;
        }
        if (isOpen && Api.wifebattleVoApi.wifebattleVo.isShowWifeSearch()) {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLESEARCHRESULTVIEW, { callback: this.searchCallback, target: this });
        }
        else {
            this.refreshView();
        }
    };
    WifebattleView.prototype.refreshView = function () {
        console.log("refreshView");
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_LIST, {});
        var maxInfo = Api.wifebattleVoApi.wifebattleVo.getEnemyMaxInfo();
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
                this._enemyGroup.y = (this._bottomBg.y - 185) / 2 - 728 / 2;
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
                talkBg.y = this._enemyGroup.height - 450 - talkBg.height;
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
                var playerNameTxt = ComponentManager.getTextField(String(this.vo.ainfo.fname), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                playerNameTxt.x = wifeDescBg.x + 180;
                playerNameTxt.y = wifeDescBg.y + 57;
                this._enemyGroup.addChild(playerNameTxt);
                var enemyTalenTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentEnemyTalen", [String(this.vo.ainfo.totaltalent)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                enemyTalenTxt.x = wifeDescBg.x + 180;
                enemyTalenTxt.y = wifeDescBg.y + 100;
                this._enemyGroup.addChild(enemyTalenTxt);
                var enemyWifeNum = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentEnemyWifeNum", [String(this.vo.ainfo.totalnum)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
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
                wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_full3_" + maxInfo.skin;
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
                this._wifeBM.y = 715; //750 - 35;//728;
                this._wifeParent.addChild(this._wifeBM);
            }
            else {
                if (maxInfo.skin) {
                    var myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                    wifeImg = myWifeSkinCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1); //"wife_skin_" + maxInfo.skin;
                }
                var scaleNum = 0.7;
                this._wifeBM = BaseLoadBitmap.create(wifeImg);
                this._wifeBM.width = 640;
                this._wifeBM.height = 840;
                this._wifeBM.setScale(scaleNum);
                this._wifeBM.x = GameConfig.stageWidth / 2 - this._wifeBM.width * this._wifeBM.scaleX / 2;
                this._wifeBM.y = 715 - 840 * 0.7;
                this._wifeParent.addChild(this._wifeBM);
            }
            this._playerNameTxt.text = String(this.vo.ainfo.fname);
            this._enemyTalenTxt.text = LanguageManager.getlocal("wifeTalentEnemyTalen", [String(this.vo.ainfo.totaltalent)]);
            this._enemyWifeNum.text = LanguageManager.getlocal("wifeTalentEnemyWifeNum", [String(this.vo.ainfo.totalnum)]);
            this._enemyGroup.visible = true;
        }
        if (this.vo.checkHaveEnemy()) {
            this._battleBtn.setEnable(true);
        }
        else {
            this._battleBtn.setEnable(false);
        }
        // if(this._isFirst == 1){
        // 	this._isFirst = 0;
        // 	Api.rookieVoApi.insertWaitingGuide({"idx":"wifebattle_1"},true);
        // 	Api.rookieVoApi.checkWaitingGuide();
        // }
    };
    WifebattleView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_WIFEBATTLE;
    };
    WifebattleView.prototype.tick = function () {
        var cdStr = this.vo.getCDStr();
        if (this._descTxt) {
            this._descTxt.text = cdStr;
            if (cdStr == "") {
                if (this._isInBattle) {
                    return;
                }
                if (this.vo.checkHaveEnemy()) {
                    return;
                }
                //此处判断是否cd到了
                if (this.vo.checkCanCDSearch()) {
                    NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_SEARCH, { randtype: 1 });
                }
            }
        }
    };
    WifebattleView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkStudyRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_SEARCH, this.checkShowSearch, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_FIGHT, this.fightCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_LIST, this.refreshList, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, this.fightReview, this);
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
        this._isFirst = 0;
        this._isPass = false;
        _super.prototype.dispose.call(this);
    };
    return WifebattleView;
}(CommonView));
__reflect(WifebattleView.prototype, "WifebattleView");