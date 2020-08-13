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
var AcCrossServerWipeBossEnterView = (function (_super) {
    __extends(AcCrossServerWipeBossEnterView, _super);
    function AcCrossServerWipeBossEnterView() {
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
        _this._chatTxt = null;
        _this._canJoin = null;
        _this._count = 0;
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossEnterView.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossEnterView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossEnterView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_more",
            "atkracecross_rewatdbg3",
            "accrossserverwipeboss_enemybtn",
            "accrossserverwipeboss_enemytxt",
            "accrossserverwipeboss_searchbtn",
            "accrossserverwipeboss_buybtn"
        ]);
    };
    AcCrossServerWipeBossEnterView.prototype.initTitle = function () {
        return null;
    };
    AcCrossServerWipeBossEnterView.prototype.getBgName = function () {
        return "accrossserverwipeboss_bg4";
    };
    AcCrossServerWipeBossEnterView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcCrossServerWipeBossEnterView.prototype.initBg = function () {
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
    AcCrossServerWipeBossEnterView.prototype.getTitleStr = function () {
        return null;
    };
    //请求回调
    AcCrossServerWipeBossEnterView.prototype.getKilllog = function (evt) {
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
    AcCrossServerWipeBossEnterView.prototype.getTipText = function (info) {
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
            rollingString = bosscfg.type == 1 ? (LanguageManager.getlocal('accrossserverwipeBossAllKillSuccessInfo', [info.name, servant.name, bosscfg.npcName, bosscfg.killScore, reward_str])) : (LanguageManager.getlocal('acwipeBossAllOpenSuccessInfo', [info.name, bosscfg.npcName, reward_str]));
        }
        return rollingString;
    };
    AcCrossServerWipeBossEnterView.prototype.initView = function () {
        var view = this;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SEARCH), view.searchCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_KILLLOG), view.getKilllog, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_GETRANK), view.freshBottom, view);
        if (this.vo.isCanJoin()) {
            NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_KILLLOG, {
                activeId: view.vo.aidAndCode,
            });
        }
        NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_GETRANK, {
            activeId: this.vo.aidAndCode,
        });
        var title = BaseLoadBitmap.create('accrossserverwipeboss_title');
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
        var lastTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossLastEnermy', [view.api.getWipeLastEnermy()[0].toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        var lastTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossLastBox', [view.api.getWipeLastEnermy()[1].toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var ranktitle = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBoss_rankDetail"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var midBtn = ComponentManager.getButton("accrossserverwipeboss_searchbtn", "accrossserverwipeBoss_searchTxt", view.enterInHandler, view, null, null, 30);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBtn, midBg, [0, -midBtn.height - 10]);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        //没有资格
        if (!this.vo.isCanJoin()) {
            this._midBg.visible = false;
            this._midStr.visible = false;
            this._midBtn.visible = false;
            this._canJoin = new BaseDisplayObjectContainer();
            this._canJoin.width = 640;
            this._canJoin.height = 80;
            var canJoinBg = BaseBitmap.create("public_lockbg");
            canJoinBg.scaleX = this._canJoin.width / canJoinBg.width;
            canJoinBg.scaleY = this._canJoin.height / canJoinBg.height;
            this._canJoin.addChild(canJoinBg);
            var canJoinText = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBoss_cannotjoin"), 22, TextFieldConst.COLOR_WHITE);
            canJoinText.textAlign = egret.HorizontalAlign.CENTER;
            canJoinText.x = this._canJoin.width / 2 - canJoinText.width / 2;
            canJoinText.y = this._canJoin.height / 2 - canJoinText.height / 2;
            this._canJoin.addChild(canJoinText);
            this._canJoin.x = 0;
            this._canJoin.y = bottomBg.y - 200 - this._canJoin.height;
            this.addChild(this._canJoin);
        }
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
        //按钮
        var infoBtn = ComponentManager.getButton('accrossserverwipeboss_enemybtn', '', view.infoClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, infoBtn, bottomBg, [20, -infoBtn.height - 40]);
        view.addChild(infoBtn);
        var infoTxt = BaseBitmap.create("accrossserverwipeboss_enemytxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infoTxt, infoBtn, [0, 0]);
        view.addChild(infoTxt);
        var moreBtn = ComponentManager.getButton('arena_more', '', view.moreClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, moreBtn, bottomBg, [25, 15]);
        view.addChild(moreBtn);
        if (!this.vo.isCanJoin()) {
            infoBtn.visible = false;
            moreBtn.visible = false;
            infoTxt.visible = false;
        }
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
    AcCrossServerWipeBossEnterView.prototype.chatBgClickHandler = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSCHATVIEW, { aid: this.param.data.aid, code: this.param.data.code });
    };
    AcCrossServerWipeBossEnterView.prototype.infoClick = function () {
        var view = this;
        if (!this.vo.isCanJoin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBoss_cannotjointip"));
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcCrossServerWipeBossEnterView.prototype.getRuleInfo = function () {
        return 'accrossserverwipeBossRuleInfo';
    };
    AcCrossServerWipeBossEnterView.prototype.moreClick = function () {
        var view = this;
        if (!this.vo.isCanJoin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBoss_cannotjointip"));
            return;
        }
        if (!this.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
            return;
        }
        if (!this.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSKILLINFOIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code
        });
    };
    AcCrossServerWipeBossEnterView.prototype.freshBottom = function () {
        var view = this;
        var scrollStart = 10;
        var arr = view.api.getWipeInfo();
        if (arr.length) {
            arr.sort(function (a, b) {
                return b.v - a.v;
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
                    scoreTxt.text = LanguageManager.getlocal("accrossserverwipeBossMidDesc4", [unit.v]);
                }
                else {
                    scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBossMidDesc4", [unit.v]), 20);
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
    AcCrossServerWipeBossEnterView.prototype.freshView = function () {
        var view = this;
        // view._bottomScrollView.
        view.freshMid();
    };
    AcCrossServerWipeBossEnterView.prototype.freshMid = function () {
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
            var str = period == 2 ? LanguageManager.getlocal('accrossserverwipeBossDesc1', [(curValue / maxHp * 100).toFixed(2)]) : LanguageManager.getlocal('accrossserverwipeBossDesc2', [view.api.getWipeKillPlayer()]);
            view._bossBloodTxt.text = str;
            view._bossBloodTxt.textColor = period == 2 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED3;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossBloodTxt, view._midDescBg, [0, 20]);
            topDistance = 20 + view._bossBloodTxt.textHeight + 10;
        }
        view._lastTxt1.text = LanguageManager.getlocal('accrossserverwipeBossLastEnermy', [view.api.getWipeLastEnermy()[0].toString()]);
        view._lastTxt2.text = LanguageManager.getlocal('accrossserverwipeBossLastBox', [view.api.getWipeLastEnermy()[1].toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._lastTxt1, view._midDescBg, [0, topDistance]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._lastTxt2, view._lastTxt1, [0, view._lastTxt1.textHeight + 10]);
        view._midDescBg.height = view._lastTxt2.y + view._lastTxt2.textHeight + 15 - view._midDescBg.y;
        var unit = view.vo.getTanSuoNum();
        var midStr = '';
        if (unit.killAll) {
            view._midBtn.visible = false;
            midStr = LanguageManager.getlocal('accrossserverwipeBossMidDesc3');
        }
        else {
            if (view.vo.isInFightTime()) {
                view._midBtn.visible = true;
                if (unit.num) {
                    view._midBtn.setBtnBitMap("accrossserverwipeboss_searchbtn");
                    view._midBtn.setText("accrossserverwipeBoss_searchTxt");
                    view._midBtn.setColor(0x261801);
                    midStr = LanguageManager.getlocal('accrossserverwipeBossMidDesc1', [unit.num]);
                }
                else {
                    view._midBtn.setBtnBitMap("accrossserverwipeboss_buybtn");
                    view._midBtn.setText("accrossserverwipeBoss_buycountTxt");
                    view._midBtn.setColor(0x644800);
                    midStr = LanguageManager.getlocal('accrossserverwipeBossMidDesc2', [App.DateUtil.getFormatBySecond(unit.time)]);
                }
            }
            else {
                midStr = LanguageManager.getlocal('accrossserverwipeBossMidDesc5', [App.DateUtil.getFormatBySecond(view.vo.getNextOpenTime())]);
                view._midBtn.visible = false;
            }
        }
        if (this.vo.isCanJoin()) {
            if (this._canJoin) {
                this._canJoin.visible = false;
            }
        }
        else {
            this._midBtn.visible = false;
            this._midBg.visible = false;
            this._midStr.visible = false;
            if (this._canJoin) {
                this._canJoin.visible = true;
            }
        }
        view._midStr.text = midStr;
        this._midStr.x = this._midBg.x + this._midBg.width * this._midBg.scaleX / 2 - this._midStr.width / 2;
        this._midStr.y = this._midBg.y + this._midBg.height * this._midBg.scaleY - this._midStr.height - 15;
        // view._midBg.height = view._midStr.textHeight + 20  
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._midStr, view._midBg,[0,10]);
    };
    AcCrossServerWipeBossEnterView.prototype.tick = function () {
        var view = this;
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossEnd"));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (!unit.killAll) {
            view.freshMid();
            ++view._count;
            if (view._count == 300) {
                view._count = 0;
                //没有资格  不能看击杀流水
                if (!this.vo.isCanJoin()) {
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_KILLLOG, {
                    activeId: view.vo.aidAndCode,
                });
            }
        }
    };
    AcCrossServerWipeBossEnterView.prototype.enterInHandler = function () {
        var view = this;
        if (!this.vo.isCanJoin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBoss_cannotjointip"));
            return;
        }
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
            view.hide();
            return;
        }
        var unit = view.vo.getTanSuoNum();
        if (unit.killAll) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc3"));
            return;
        }
        if (unit.num) {
            NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_SEARCH, {
                activeId: view.vo.aidAndCode,
            });
        }
        else {
            var searchBuyNum = view.vo.getBuySearchNum();
            var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
            var message = LanguageManager.getlocal("accrossserverwipeBossBuySearchTimes", [String(needNum)]);
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
    AcCrossServerWipeBossEnterView.prototype.buySearchHandler = function () {
        var view = this;
        var searchBuyNum = view.vo.getBuySearchNum();
        var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
        if (Api.playerVoApi.getPlayerGem() >= needNum) {
            NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_BUYSEARCH, {
                activeId: view.vo.aidAndCode,
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
        }
    };
    AcCrossServerWipeBossEnterView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcCrossServerWipeBossEnterView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setBossNumInfo(data.data.data);
    };
    AcCrossServerWipeBossEnterView.prototype.searchCallback = function (evt) {
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
            view.hide();
            return;
        }
        if (evt.data.data.ret >= 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSSEARCHRESULTVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
                foeId: evt.data.data.data.bosstype,
                bosskey: evt.data.data.data.bosskey
            });
        }
        else if (evt.data.data.ret == -3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossSearchTip5"));
            this.request(NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM, {
                activeId: this.vo.aidAndCode,
            });
        }
    };
    AcCrossServerWipeBossEnterView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SEARCH), view.searchCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_KILLLOG), view.getKilllog, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_GETRANK), view.freshBottom, view);
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
        this._chatTxt = null;
        this._canJoin = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossEnterView;
}(CommonView));
__reflect(AcCrossServerWipeBossEnterView.prototype, "AcCrossServerWipeBossEnterView");
