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
 * desc:围剿鳌拜庭院
*/
var AcWipeBossEnterView = (function (_super) {
    __extends(AcWipeBossEnterView, _super);
    function AcWipeBossEnterView() {
        var _this = _super.call(this) || this;
        _this._infoGroup = null;
        _this._midBg = null;
        _this._midDescBg = null;
        _this._bossBloodTxt = null;
        _this._midStr = null;
        _this._lastTxt1 = null;
        _this._lastTxt2 = null;
        _this._midBtn = null;
        _this._bottomScrollView = null;
        _this._bottomBg = null;
        _this._lamproll = null;
        _this._count = 0;
        return _this;
    }
    Object.defineProperty(AcWipeBossEnterView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossEnterView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossEnterView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcWipeBossEnterView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_more",
            "atkracecross_rewatdbg3",
            "acwipeboss_enemybtn",
            "acwipeboss_enemytxt",
            "acwipeboss_searchbtn",
            "acwipeboss_buybtn"
        ]);
    };
    AcWipeBossEnterView.prototype.initTitle = function () {
        return null;
    };
    AcWipeBossEnterView.prototype.getBgName = function () {
        return "acwipeboss_bg4";
    };
    AcWipeBossEnterView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcWipeBossEnterView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
    };
    AcWipeBossEnterView.prototype.getTitleStr = function () {
        return null;
    };
    //请求回调
    AcWipeBossEnterView.prototype.getKilllog = function (evt) {
        var view = this;
        if (evt.data.data.data.killlog && evt.data.data.data.killlog.length) {
            this.api.setKillLog(evt.data.data.data.killlog);
            var strList = new Array();
            for (var index = 0; index < evt.data.data.data.killlog.length; index++) {
                var str = this.getTipText(evt.data.data.data.killlog[index]);
                strList.push(str);
            }
            if (view._lamproll) {
                view._lamproll.dispose();
                view._lamproll = null;
            }
            var lampContainer = new LoopLamp(strList);
            lampContainer.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth - 150, 50);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, lampContainer, view._bottomBg, [0, 20]);
            view.addChild(lampContainer);
            view._lamproll = lampContainer;
        }
    };
    AcWipeBossEnterView.prototype.getTipText = function (info) {
        var rollingString = "";
        if (info) {
            //击杀奖励
            var icon = GameData.formatRewardItem(info.rewards);
            var reward_str = '';
            for (var i in icon) {
                reward_str += ("\u3001" + icon[i].name + "+" + icon[i].num);
            }
            var bosscfg = this.cfg.getBossNpcItemCfgById(info.bosstype);
            if (bosscfg.type == 2) {
                reward_str = reward_str.substring(1, reward_str.length);
            }
            var servant = Config.ServantCfg.getServantItemById(info.servantId);
            rollingString = bosscfg.type == 1 ? (LanguageManager.getlocal('acwipeBossAllKillSuccessInfo', [info.name, servant.name, bosscfg.npcName, bosscfg.killScore, reward_str])) : (LanguageManager.getlocal('acwipeBossAllOpenSuccessInfo', [info.name, bosscfg.npcName, reward_str]));
        }
        return rollingString;
    };
    AcWipeBossEnterView.prototype.initView = function () {
        var view = this;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH), view.searchCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG), view.getKilllog, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK), view.freshBottom, view);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG, {
            activeId: view.vo.aidAndCode,
        });
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, {
            activeId: this.vo.aidAndCode,
        });
        var title = BaseLoadBitmap.create('acwipeboss_title');
        title.width = 456;
        title.height = 160;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 25]);
        view.addChild(title);
        var descbg = BaseBitmap.create('public_9v_bg05');
        descbg.width = 328;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, title, [0, title.height + 30]);
        view.addChild(descbg);
        view._midDescBg = descbg;
        var tipTxt = ComponentManager.getTextField('', 22);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        var lastTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossLastEnermy', [view.api.getWipeLastEnermy()[0].toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        var lastTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossLastBox', [view.api.getWipeLastEnermy()[1].toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(lastTxt1);
        view.addChild(lastTxt2);
        view.addChild(tipTxt);
        view._bossBloodTxt = tipTxt;
        view._lastTxt1 = lastTxt1;
        view._lastTxt2 = lastTxt2;
        //底部
        var vo = view.vo;
        //public_v_bg01
        //atkracecross_rewatdbg3  
        //public_line1
        var bottomBg = BaseBitmap.create("public_v_bg01");
        bottomBg.height = 258;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        // let line1 = BaseBitmap.create("public_line1");
        // line1.width = 420;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, bottomBg, [0,15]);
        // view.addChild(line1);
        var titlebg = BaseBitmap.create("atkracecross_rewatdbg3");
        titlebg.width = GameConfig.stageWidth;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, bottomBg);
        this.addChild(titlebg);
        var ranktitle = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBoss_rankDetail"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ranktitle, titlebg);
        view.addChild(ranktitle);
        //中部
        var midBg = BaseBitmap.create('public_icontimebg');
        // midBg.width = 330;
        // midBg.height = 50;
        midBg.scaleX = 3;
        midBg.scaleY = 2;
        // midBg.width = 300;
        // midBg.height = 60;
        // if(PlatformManager.checkIsEnLang())
        // {
        // 	midBg.width = 430;
        // }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBg, bottomBg, [0, -midBg.height - 120]);
        view.addChild(midBg);
        view._midBg = midBg;
        var midTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        midTxt.lineSpacing = 5;
        midTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(midTxt);
        view._midStr = midTxt;
        // midBg.height = midTxt.textHeight + 20
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, midTxt, midBg,[0,10]);
        midTxt.x = midBg.x + midBg.width * midBg.scaleX / 2 - midTxt.width / 2;
        midTxt.y = midBg.y + midBg.height * midBg.scaleY - midTxt.height - 15;
        var midBtn = ComponentManager.getButton("acwipeboss_searchbtn", "acwipeBoss_searchTxt", view.enterInHandler, view, null, null, 30);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBtn, midBg, [0, -midBtn.height - 10]);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        //按钮
        var infoBtn = ComponentManager.getButton('acwipeboss_enemybtn', '', view.infoClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, infoBtn, bottomBg, [20, -infoBtn.height - 20]);
        view.addChild(infoBtn);
        var infoTxt = BaseBitmap.create("acwipeboss_enemytxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infoTxt, infoBtn, [0, 0]);
        view.addChild(infoTxt);
        var moreBtn = ComponentManager.getButton('arena_more', '', view.moreClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, moreBtn, bottomBg, [25, 15]);
        view.addChild(moreBtn);
        var bottomline = BaseBitmap.create("public_line1");
        bottomline.width = 640;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomline, bottomBg, [0, 60]);
        view.addChild(bottomline);
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 640;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoGroup, bottomBg, [0,45]);
        view.addChild(infoGroup);
        view._infoGroup = infoGroup;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 140);
        infoGroup.y = 0;
        var scrollView = ComponentManager.getScrollView(infoGroup, rect);
        scrollView.y = bottomBg.y + 50;
        scrollView.horizontalScrollPolicy = "off";
        scrollView.bounces = false;
        view.addChild(scrollView);
        view._bottomScrollView = scrollView;
        view.freshView();
        if (!PlatformManager.hasSpcialCloseBtn()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0, 0]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [0, 0]);
        }
    };
    AcWipeBossEnterView.prototype.infoClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcWipeBossEnterView.prototype.getRuleInfo = function () {
        return 'acwipeBossRuleInfo';
    };
    AcWipeBossEnterView.prototype.moreClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSKILLINFOIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcWipeBossEnterView.prototype.freshBottom = function () {
        var view = this;
        var scrollStart = 10;
        var arr = view.api.getWipeInfo();
        if (arr.length) {
            arr.sort(function (a, b) {
                return b.value - a.value;
            });
        }
        view._infoGroup.removeChildren();
        if (arr.length) {
            for (var i in arr) {
                var unit = arr[i];
                var nameTxt = view._infoGroup.getChildByName("name" + unit.uid);
                var namestr = Number(i) + 1 + "." + unit.name;
                if (nameTxt) {
                    var nameTxtStr = "";
                    if (PlatformManager.checkIsEnLang()) {
                        nameTxtStr = unit.name.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
                    }
                    else {
                        nameTxtStr = unit.name.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
                    }
                    nameTxt.text = nameTxtStr;
                }
                else {
                    var nameTxtStr = "";
                    if (PlatformManager.checkIsEnLang()) {
                        nameTxtStr = unit.name.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
                    }
                    else {
                        nameTxtStr = unit.name.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
                    }
                    nameTxt = ComponentManager.getTextField(nameTxtStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    nameTxt.width = 150;
                    nameTxt.name = "name" + unit.uid;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view._infoGroup, [20, scrollStart], true);
                    view._infoGroup.addChild(nameTxt);
                }
                var scoreTxt = view._infoGroup.getChildByName("score" + unit.uid);
                if (scoreTxt) {
                    scoreTxt.text = LanguageManager.getlocal("acwipeBossMidDesc4", [unit.value]);
                }
                else {
                    scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossMidDesc4", [unit.value]), 20);
                    scoreTxt.name = "score" + unit.uid;
                    scoreTxt.textAlign = egret.HorizontalAlign.LEFT;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, nameTxt, [nameTxt.width + 160, 0]);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, scoreTxt, view._infoGroup, [150,scrollStart], true);
                    view._infoGroup.addChild(scoreTxt);
                }
                scrollStart += 30;
                if (unit.uid == Api.playerVoApi.getPlayerID()) {
                    nameTxt.textColor = scoreTxt.textColor = 0x00d81b; //TextFieldConst.COLOR_WARN_GREEN;
                }
            }
        }
        else {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._infoGroup, [0, scrollStart + 20], true);
            view._infoGroup.addChild(tipTxt);
        }
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = scrollStart;
        maskBmp.name = 'mask';
        maskBmp.alpha = 0;
        view._infoGroup.addChild(maskBmp);
    };
    AcWipeBossEnterView.prototype.freshView = function () {
        var view = this;
        // view._bottomScrollView.
        view.freshMid();
    };
    AcWipeBossEnterView.prototype.freshMid = function () {
        var view = this;
        var period = view.api.getWipePeriod();
        var topDistance = 0;
        if (period == 1) {
            topDistance = 20;
        }
        else {
            var blood = view.api.getBossNumInfo().finalbosshp;
            var maxHp = view.vo.getWipeBossMaxHp(7);
            //let cfg = view.cfg.getBossNpcItemCfgById(7);
            var curValue = blood == undefined ? maxHp : blood;
            var str = period == 2 ? LanguageManager.getlocal('acwipeBossDesc1', [(curValue / maxHp * 100).toFixed(2)]) : LanguageManager.getlocal('acwipeBossDesc2', [view.api.getWipeKillPlayer()]);
            view._bossBloodTxt.text = str;
            view._bossBloodTxt.textColor = period == 2 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED3;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossBloodTxt, view._midDescBg, [0, 20]);
            topDistance = 20 + view._bossBloodTxt.textHeight + 10;
        }
        view._lastTxt1.text = LanguageManager.getlocal('acwipeBossLastEnermy', [view.api.getWipeLastEnermy()[0].toString()]);
        view._lastTxt2.text = LanguageManager.getlocal('acwipeBossLastBox', [view.api.getWipeLastEnermy()[1].toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._lastTxt1, view._midDescBg, [0, topDistance]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._lastTxt2, view._lastTxt1, [0, view._lastTxt1.textHeight + 10]);
        view._midDescBg.height = view._lastTxt2.y + view._lastTxt2.textHeight + 15 - view._midDescBg.y;
        var unit = view.vo.getTanSuoNum();
        var midStr = '';
        if (unit.killAll) {
            view._midBtn.visible = false;
            midStr = LanguageManager.getlocal('acwipeBossMidDesc3');
        }
        else {
            if (view.vo.isInFightTime()) {
                view._midBtn.visible = true;
                if (unit.num) {
                    view._midBtn.setBtnBitMap("acwipeboss_searchbtn");
                    view._midBtn.setText("acwipeBoss_searchTxt");
                    view._midBtn.setColor(0x261801);
                    midStr = LanguageManager.getlocal('acwipeBossMidDesc1', [unit.num]);
                }
                else {
                    view._midBtn.setBtnBitMap("acwipeboss_buybtn");
                    view._midBtn.setText("acwipeBoss_buycountTxt");
                    view._midBtn.setColor(0x644800);
                    midStr = LanguageManager.getlocal('acwipeBossMidDesc2', [App.DateUtil.getFormatBySecond(unit.time)]);
                }
            }
            else {
                midStr = LanguageManager.getlocal('acwipeBossMidDesc5', [App.DateUtil.getFormatBySecond(view.vo.getNextOpenTime())]);
                view._midBtn.visible = false;
            }
        }
        view._midStr.text = midStr;
        this._midStr.x = this._midBg.x + this._midBg.width * this._midBg.scaleX / 2 - this._midStr.width / 2;
        this._midStr.y = this._midBg.y + this._midBg.height * this._midBg.scaleY - this._midStr.height - 15;
        // view._midBg.height = view._midStr.textHeight + 20  
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._midStr, view._midBg,[0,10]);
    };
    AcWipeBossEnterView.prototype.tick = function () {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (!unit.killAll) {
            view.freshMid();
            ++view._count;
            if (view._count == 300) {
                view._count = 0;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG, {
                    activeId: view.vo.aidAndCode,
                });
            }
        }
    };
    AcWipeBossEnterView.prototype.enterInHandler = function () {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (unit.killAll) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc3"));
            return;
        }
        if (unit.num) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH, {
                activeId: view.vo.aidAndCode,
            });
        }
        else {
            var searchBuyNum = view.vo.getBuySearchNum();
            var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
            var message = LanguageManager.getlocal("acwipeBossBuySearchTimes", [String(needNum)]);
            var mesObj = {
                confirmCallback: this.buySearchHandler,
                handler: this,
                icon: "itemicon1",
                iconBg: "itembg_1",
                num: Api.playerVoApi.getPlayerGem(),
                useNum: needNum,
                msg: message,
                id: 1,
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        }
        // if(view.vo.isInActivity()){
        // 	// ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERCROSSENTERVIEW,{
        // 	// 	aid : this.aid,
        // 	// 	code : this.code
        // 	// });
        // }
        // else{
        // 	App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
        // }ACWIPEBOSSSEARCHRESULTVIEW
        // ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSSEARCHRESULTVIEW,{
        // 	aid : view.param.data.aid,
        // 	code : view.param.data.code,
        // 	foeId : App.MathUtil.getRandom(1,11)
        // });
    };
    AcWipeBossEnterView.prototype.buySearchHandler = function () {
        var view = this;
        var searchBuyNum = view.vo.getBuySearchNum();
        var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
        if (Api.playerVoApi.getPlayerGem() >= needNum) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSBUYSEARCH, {
                activeId: view.vo.aidAndCode,
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
        }
    };
    AcWipeBossEnterView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcWipeBossEnterView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setBossNumInfo(data.data.data);
    };
    AcWipeBossEnterView.prototype.searchCallback = function (evt) {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
            view.hide();
            return;
        }
        if (evt.data.data.ret >= 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSSEARCHRESULTVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
                foeId: evt.data.data.data.bosstype,
                bosskey: evt.data.data.data.bosskey
            });
        }
        else if (evt.data.data.ret == -3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip5"));
            this.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
                activeId: this.vo.aidAndCode,
            });
        }
    };
    AcWipeBossEnterView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH), view.searchCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG), view.getKilllog, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK), view.freshBottom, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
        view._midBg = null;
        view._midDescBg = null;
        view._bossBloodTxt = null;
        view._midStr = null;
        view._lastTxt1 = null;
        view._lastTxt2 = null;
        view._midBtn = null;
        view._bottomScrollView = null;
        view._bottomBg = null;
        view._lamproll = null;
        view._count = 0;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossEnterView;
}(CommonView));
__reflect(AcWipeBossEnterView.prototype, "AcWipeBossEnterView");
