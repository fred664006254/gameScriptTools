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
 * 帮会战斗首页入口
 * author qianjun
 */
var AllianceWarView = (function (_super) {
    __extends(AllianceWarView, _super);
    function AllianceWarView() {
        var _this = _super.call(this) || this;
        /**
         * 提示文字
         */
        _this._topTip = null;
        /** 上部倒计时文本 */
        _this._topTime = null;
        /** 上部背景 */
        _this._topBg = null;
        /** 帮会信息 简介背景 */
        _this._infoBg = null;
        /** npc图片 */
        _this._npcBM = null;
        /** 下部倒计时背景 */
        _this._buttomBg = null;
        /** 下部倒计时 */
        _this._buttomTimeBg = null;
        /** 下部倒计时 */
        _this._buttomTime = null;
        /** 参战总战斗力 */
        _this._allFightTxt = null;
        /** 参战门客 */
        _this._servantNameTxt = null;
        /** 战斗力 */
        _this._myFightTxt = null;
        /**领取奖励的btn */
        _this._reviceRewardBtn = null;
        /**展示的第一条数据的帮会1 */
        _this._firstLog1Txt = null;
        /**展示的第一条数据的帮会2 */
        _this._firstLog2Txt = null;
        /** 查看更多的btn */
        _this._showMoreLogBtn = null;
        /** 小箭头 */
        _this._showMoreLogArcher = null;
        /** 是否处于查看更多log 状态 */
        _this._isShowMoreLog = false;
        /** npc说的话Bg*/
        _this._npcTalkBg = null;
        /** npc说的话*/
        _this._npcTalkTxt = null;
        /** 箭头*/
        _this._talkArcher = null;
        //显示更多log
        _this._moreLogContainer = null;
        /** 显示更多 list*/
        _this._moreLogScrollList = null;
        /** 更多log 的bg*/
        _this._moreBg = null;
        /** 遮照*/
        _this._mask = null;
        /**记录上次的periodType */
        _this._periodType = 0;
        _this._moreLogMask = null;
        /**
         * log 的数据
         */
        _this._moreLogData = null;
        _this._sendBtn = null;
        return _this;
    }
    AllianceWarView.prototype.initView = function () {
        //监听 model事件
        App.MessageHelper.addNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, this.moreLogDataHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, this.allianceWarModelHandle, this);
        //大背景图
        var bg = BaseLoadBitmap.create("alliancewarbg");
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - bg.height - 103);
        this.addChildToContainer(bg);
        //顶部的背景
        this._topBg = BaseBitmap.create("public_9_bg8");
        this._topBg.width = 640;
        this._topBg.height = 65;
        this._topBg.setPosition(0, -15);
        this.addChildToContainer(this._topBg);
        //顶部的提示
        this._topTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewTopTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsEnLang()) {
            this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip1", [Api.allianceWarVoApi.getWeeksWithDate()]);
        }
        this._topTip.setPosition(this._topBg.x + this._topBg.width / 2 - this._topTip.width / 2, this._topBg.y + 10);
        this.addChildToContainer(this._topTip);
        //顶部的时间
        this._topTime = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewTopTime1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._topTime.setPosition(this._topTip.x + this._topTip.width / 2 - this._topTime.width / 2, this._topTip.y + this._topTip.height + 5);
        this.addChildToContainer(this._topTime);
        //积分榜按钮
        var scoreBtn = ComponentManager.getButton("awscorerank", null, this.scoreRankCLick, this);
        scoreBtn.setPosition(20, this._topBg.y + this._topBg.height + 5);
        this.addChildToContainer(scoreBtn);
        //底部的背景
        this._buttomBg = BaseBitmap.create("arena_bottom");
        this._buttomBg.setPosition(bg.x, bg.y + bg.height - this._buttomBg.height);
        this.addChildToContainer(this._buttomBg);
        //基本信息的背景
        this._infoBg = BaseBitmap.create("public_9_bg8");
        this._infoBg.width = 640;
        this._infoBg.height = 50;
        this._infoBg.setPosition(this._buttomBg.x, this._buttomBg.y - this._infoBg.height);
        this.addChildToContainer(this._infoBg);
        //总战斗力
        this._allFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewAllFight", [""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._allFightTxt.setPosition(5, this._infoBg.y + this._infoBg.height / 2 - this._allFightTxt.height / 2);
        this.addChildToContainer(this._allFightTxt);
        //参战门客
        this._servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewServantName", [""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._servantNameTxt.setPosition(this._infoBg.x + this._infoBg.width / 2 - this._servantNameTxt.width / 2, this._infoBg.y + this._infoBg.height / 2 - this._servantNameTxt.height / 2);
        this.addChildToContainer(this._servantNameTxt);
        //我的战斗力
        this._myFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewMyFight", [""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myFightTxt.setPosition(this._servantNameTxt.x + this._servantNameTxt.width + 40, this._infoBg.y + this._infoBg.height / 2 - this._myFightTxt.height / 2);
        this.addChildToContainer(this._myFightTxt);
        //npc 图片
        this._npcBM = BaseLoadBitmap.create("awnpc_idle");
        this._npcBM.width = 640;
        this._npcBM.height = 579;
        this._npcBM.setPosition(this._infoBg.x, this._infoBg.y - this._npcBM.height);
        this.addChildToContainer(this._npcBM);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 320;
        touchPos.height = 579;
        touchPos.setPosition(this._npcBM.x, this._npcBM.y);
        this.addChildToContainer(touchPos);
        touchPos.addTouchTap(this.npcManagerClick, this);
        //底部的倒计时
        this._buttomTime = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED3);
        this._buttomTimeBg = BaseBitmap.create("public_itemtipbg2");
        this._buttomTimeBg.width = this._buttomTime.width + 30;
        this._buttomTimeBg.setPosition(this._infoBg.x + this._infoBg.width - this._buttomTimeBg.width - 10, this._infoBg.y - this._buttomTimeBg.height - 3);
        this._buttomTime.setPosition(this._buttomTimeBg.x + this._buttomTimeBg.width / 2 - this._buttomTime.width / 2, this._buttomTimeBg.y + this._buttomTimeBg.height / 2 - this._buttomTime.height / 2);
        this.addChildToContainer(this._buttomTimeBg);
        this.addChildToContainer(this._buttomTime);
        //奖励按钮
        this._reviceRewardBtn = ComponentManager.getButton("awawardbtn", null, this.reviceRewardClick, this);
        this._reviceRewardBtn.setPosition(this._buttomTimeBg.x + this._buttomTimeBg.width / 2 - this._reviceRewardBtn.width / 2, this._buttomTimeBg.y - this._reviceRewardBtn.height);
        this.addChildToContainer(this._reviceRewardBtn);
        //派遣按钮
        var btn = ComponentManager.getButton("awsend", '', this.npcManagerClick, this);
        btn.visible = Api.allianceWarVoApi.getWarPeriod() == 1;
        this.addChildToContainer(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, this._reviceRewardBtn, [0, this._reviceRewardBtn.height]);
        this._sendBtn = btn;
        //第一个log 第一段话
        this._firstLog1Txt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewFirestLog1", ["", ""]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        this._firstLog1Txt.setPosition(5, this._buttomBg.y + 10);
        this.addChildToContainer(this._firstLog1Txt);
        //第一个log 第二段话
        this._firstLog2Txt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarViewFirestLog2_1", ["", "", ""]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._firstLog2Txt.setPosition(this._firstLog1Txt.x, this._firstLog1Txt.y + this._firstLog1Txt.height + 10);
        this.addChildToContainer(this._firstLog2Txt);
        //查看更多的log
        this._showMoreLogBtn = ComponentManager.getButton("arena_more", null, this.showMoreLogClick, this);
        this._showMoreLogBtn.setPosition(this._buttomBg.x + this._buttomBg.width - this._showMoreLogBtn.width - 18, this._buttomBg.y + this._buttomBg.height / 2 - this._showMoreLogBtn.height / 2);
        this.addChildToContainer(this._showMoreLogBtn);
        //小箭头
        this._showMoreLogArcher = BaseBitmap.create("arena_arrow");
        this._showMoreLogArcher.anchorOffsetX = this._showMoreLogArcher.width / 2;
        this._showMoreLogArcher.anchorOffsetY = this._showMoreLogArcher.height / 2;
        this._showMoreLogArcher.setPosition(this._showMoreLogBtn.x - this._showMoreLogArcher.width / 2 - 10, this._showMoreLogBtn.y + this._showMoreLogBtn.height / 2);
        this.addChildToContainer(this._showMoreLogArcher);
        //管家说话相关
        this._talkArcher = BaseBitmap.create("public_9_bg13_tail");
        this._talkArcher.setPosition(this._npcBM.x + this._npcBM.width / 2 - this._talkArcher.width / 2 + 20, this._npcBM.y + 60);
        this._npcTalkTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarNpcTalk1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._npcTalkTxt.lineSpacing = 3;
        this._npcTalkBg = BaseBitmap.create("public_9_bg25");
        this._npcTalkBg.width = 300;
        this._npcTalkTxt.width = this._npcTalkBg.width - 30;
        this._npcTalkBg.height = this._npcTalkTxt.height + 40;
        this._npcTalkBg.setPosition(this._talkArcher.x - 20, this._talkArcher.y - this._npcTalkBg.height + 3);
        this._npcTalkTxt.setPosition(this._npcTalkBg.x + this._npcTalkBg.width / 2 - this._npcTalkTxt.width / 2, this._npcTalkBg.y + this._npcTalkBg.height / 2 - this._npcTalkTxt.height / 2);
        this.addChildToContainer(this._npcTalkBg);
        this.addChildToContainer(this._talkArcher);
        this.addChildToContainer(this._npcTalkTxt);
        this.initMoreLogUI();
        this.tick();
    };
    /**
     * 初始化更多的界面UI
     */
    AllianceWarView.prototype.initMoreLogUI = function () {
        this._mask = BaseBitmap.create("public_9_viewmask");
        this._mask.width = GameConfig.stageWidth;
        this._mask.height = GameConfig.stageHeigth;
        this._mask.y = this._buttomBg.y - this._mask.height;
        this.addChildToContainer(this._mask);
        this._mask.touchEnabled = true;
        this._mask.setVisible(false);
        this._moreLogContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._moreLogContainer);
        this._moreBg = BaseBitmap.create("arena_bottom_bg");
        this._moreBg.width = 640;
        this._moreBg.height = GameConfig.stageHeigth - 330;
        this._moreLogContainer.addChild(this._moreBg);
        this._moreLogMask = BaseBitmap.create("public_alphabg");
        this._moreLogMask.width = 640;
        this._moreLogMask.height = 330;
        this._moreLogMask.setPosition(this._moreBg.x, this._moreBg.y - this._moreLogMask.height);
        this._moreLogContainer.addChild(this._moreLogMask);
        this._moreLogMask.addTouchTap(this.showMoreLogClick, this);
        this._moreLogMask.setVisible(false);
        var rect = new egret.Rectangle(0, 0, this._moreBg.width, this._moreBg.height - 50);
        this._moreLogScrollList = ComponentManager.getScrollList(AllianceWarLogScrollItem, null, rect);
        this._moreLogScrollList.setPosition(this._moreBg.x, this._moreBg.y + 30);
        this._moreLogContainer.addChild(this._moreLogScrollList);
        this._moreLogScrollList.setEmptyTip(LanguageManager.getlocal("allianceWarViewNotLog"));
        this._moreLogContainer.y = this._buttomBg.y + this._buttomBg.height;
    };
    /**
     * 显示更多的log
     */
    AllianceWarView.prototype.showMoreLogClick = function () {
        var _this = this;
        this._showMoreLogBtn.touchEnabled = false;
        if (this._isShowMoreLog) {
            this._moreLogMask.setVisible(false);
            this._mask.setVisible(false);
            this._showMoreLogArcher.rotation = 0;
            egret.Tween.get(this._moreLogContainer).to({ y: this._buttomBg.y + this._buttomBg.height }, 500).call(function () {
                _this._isShowMoreLog = false;
                _this._showMoreLogBtn.touchEnabled = true;
            });
        }
        else {
            this._mask.setVisible(true);
            this._showMoreLogArcher.rotation = 180;
            egret.Tween.get(this._moreLogContainer).to({ y: this._buttomBg.y - this._moreBg.height }, 500).call(function () {
                _this._isShowMoreLog = true;
                _this._showMoreLogBtn.touchEnabled = true;
                _this._moreLogMask.setVisible(true);
            });
        }
    };
    /**
     * 领取奖励的界面
     */
    AllianceWarView.prototype.reviceRewardClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARREWARDPOPUPVIEW);
    };
    /**
     * 	npc的一些开启弹框
     */
    AllianceWarView.prototype.npcManagerClick = function () {
        var view = this;
        var period = Api.allianceWarVoApi.getWarPeriod();
        var scene = '';
        var param = {};
        this._sendBtn.visible = period == 1;
        switch (period) {
            case 1:
                scene = ViewConst.POPUP.ALLIANCEWARJOINBATTLEINFOPOPUPVIEW;
                break;
            case 2:
                if (!Api.allianceWarVoApi.isFight()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip5'));
                    return;
                }
                App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip1'));
                return;
            case 3:
                if (!Api.allianceWarVoApi.isFight()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip4'));
                    return;
                }
                scene = ViewConst.COMMON.ALLIANCEWARVSVIEW;
                break;
            case 4:
                if (!Api.allianceWarVoApi.isFight()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip4'));
                    return;
                }
                scene = ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW;
                param = {
                    id: Api.allianceVoApi.getAllianceVo().id
                };
                break;
        }
        ViewController.getInstance().openView(scene, param);
    };
    /**
     * 打开积分排行榜
     */
    AllianceWarView.prototype.scoreRankCLick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCERANKPOPUPVIEW2);
    };
    /**
     * 倒计时
     */
    AllianceWarView.prototype.tick = function () {
        var periodType = Api.allianceWarVoApi.getWarPeriod();
        var isChange = periodType == this._periodType ? false : true;
        switch (periodType) {
            case 1:
                if (isChange) {
                    this._periodType = periodType;
                    //改变一次状态 刷新一次modle
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, {});
                    //log
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, {});
                    this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip1");
                    if (PlatformManager.checkIsEnLang()) {
                        this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip1", [Api.allianceWarVoApi.getWeeksWithDate()]);
                    }
                    this._topTip.setPosition(this._topBg.x + this._topBg.width / 2 - this._topTip.width / 2, this._topBg.y + 10);
                    if (Api.allianceWarVoApi.isFight()) {
                        this._buttomTimeBg.setVisible(true);
                        this._buttomTime.setVisible(true);
                        this._reviceRewardBtn.setVisible(true);
                    }
                    else {
                        this._buttomTimeBg.setVisible(false);
                        this._buttomTime.setVisible(false);
                        this._reviceRewardBtn.setVisible(false);
                    }
                }
                this._topTime.text = LanguageManager.getlocal("allianceWarViewTopTime1", [App.DateUtil.getFormatBySecond(Api.allianceWarVoApi.getCountDown(), 1)]);
                this._topTime.setPosition(this._topTip.x + this._topTip.width / 2 - this._topTime.width / 2, this._topTip.y + this._topTip.height + 5);
                if (Api.allianceWarVoApi.isFight()) {
                    this._buttomTime.text = App.DateUtil.getFormatBySecond(Api.allianceWarVoApi.getCountDown(), 1);
                    this._buttomTime.setPosition(this._buttomTimeBg.x + this._buttomTimeBg.width / 2 - this._buttomTime.width / 2, this._buttomTimeBg.y + this._buttomTimeBg.height / 2 - this._buttomTime.height / 2);
                }
                break;
            case 2:
                if (isChange) {
                    this._periodType = periodType;
                    //改变一次状态 刷新一次modle
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, {});
                    //log
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, {});
                    this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2");
                    if (PlatformManager.checkIsEnLang()) {
                        this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2", [Api.allianceWarVoApi.getWeeksWithDate()]);
                    }
                    this._topTip.setPosition(this._topBg.x + this._topBg.width / 2 - this._topTip.width / 2, this._topBg.y + 10);
                    this._buttomTimeBg.setVisible(false);
                    this._buttomTime.setVisible(false);
                    this._reviceRewardBtn.setVisible(false);
                }
                this._topTime.text = LanguageManager.getlocal("allianceWarViewTopTime2", [App.DateUtil.getFormatBySecond(Api.allianceWarVoApi.getCountDown(), 1)]);
                this._topTime.setPosition(this._topTip.x + this._topTip.width / 2 - this._topTime.width / 2, this._topTip.y + this._topTip.height + 5);
                return;
            case 3:
                if (isChange) {
                    this._periodType = periodType;
                    //改变一次状态 刷新一次modle
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, {});
                    //log
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, {});
                    this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2");
                    if (PlatformManager.checkIsEnLang()) {
                        this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2", [Api.allianceWarVoApi.getWeeksWithDate()]);
                    }
                    this._topTip.setPosition(this._topBg.x + this._topBg.width / 2 - this._topTip.width / 2, this._topBg.y + 10);
                    this._buttomTimeBg.setVisible(false);
                    this._buttomTime.setVisible(false);
                    this._reviceRewardBtn.setVisible(false);
                }
                this._topTime.text = LanguageManager.getlocal("allianceWarViewTopTime3", [App.DateUtil.getFormatBySecond(Api.allianceWarVoApi.getCountDown(), 1)]);
                this._topTime.setPosition(this._topTip.x + this._topTip.width / 2 - this._topTime.width / 2, this._topTip.y + this._topTip.height + 5);
                break;
            case 4:
                if (isChange) {
                    this._periodType = periodType;
                    //改变一次状态 刷新一次modle
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, {});
                    //log
                    this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, {});
                    this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2");
                    if (PlatformManager.checkIsEnLang()) {
                        this._topTip.text = LanguageManager.getlocal("allianceWarViewTopTip2", [Api.allianceWarVoApi.getWeeksWithDate()]);
                    }
                    this._topTip.setPosition(this._topBg.x + this._topBg.width / 2 - this._topTip.width / 2, this._topBg.y + 10);
                    if (Api.allianceWarVoApi.isFight()) {
                        this._reviceRewardBtn.setVisible(true);
                        this._buttomTimeBg.setVisible(true);
                        this._buttomTime.setVisible(true);
                    }
                    else {
                        this._reviceRewardBtn.setVisible(false);
                        this._buttomTimeBg.setVisible(false);
                        this._buttomTime.setVisible(false);
                    }
                }
                this._topTime.text = LanguageManager.getlocal("allianceWarViewTopTime4");
                this._topTime.setPosition(this._topTip.x + this._topTip.width / 2 - this._topTime.width / 2, this._topTip.y + this._topTip.height + 5);
                if (Api.allianceWarVoApi.isFight()) {
                    var time = 0;
                    if (Config.AlliancewarCfg.preWarTime.indexOf(Api.allianceWarVoApi.getTodayWeek() + 2) > -1) {
                        time = 86400 * 2;
                    }
                    else {
                        time = 86400;
                    }
                    this._buttomTime.text = App.DateUtil.getFormatBySecond(Api.allianceWarVoApi.getCountDown() + time, 1);
                    this._buttomTime.setPosition(this._buttomTimeBg.x + this._buttomTimeBg.width / 2 - this._buttomTime.width / 2, this._buttomTimeBg.y + this._buttomTimeBg.height / 2 - this._buttomTime.height / 2);
                }
                break;
        }
    };
    /**
     * log 数据
     */
    AllianceWarView.prototype.moreLogDataHandle = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data.warlog;
            if (data && Object.keys(data).length > 0) {
                this._showMoreLogBtn.setVisible(true);
                this._showMoreLogArcher.setVisible(true);
                this._firstLog1Txt.setVisible(true);
                this._firstLog2Txt.setVisible(true);
                this._moreLogScrollList.refreshData(data);
                this._firstLog1Txt.text = LanguageManager.getlocal("allianceWarViewFirestLog1", [data[0].zid, data[0].name]);
                var firstLog2TxtStr = "";
                var descTxt2Str = "";
                if (data[0].tinfo && data[0].tinfo.zid) {
                    descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_" + data[0].win, [App.StringUtil.changeIntToText(data[0].totaldps), data[0].tinfo.zid, data[0].tinfo.name]);
                }
                else {
                    descTxt2Str = LanguageManager.getlocal("allianceWarViewFirestLog2_3", [App.StringUtil.changeIntToText(data[0].totaldps)]);
                }
                this._firstLog2Txt.text = descTxt2Str;
            }
            else {
                this._showMoreLogBtn.setVisible(false);
                this._showMoreLogArcher.setVisible(false);
                this._moreLogScrollList.refreshData(null);
                this._firstLog1Txt.setVisible(false);
                this._firstLog2Txt.setVisible(false);
            }
        }
    };
    /**
     * 发送请求modle的
     */
    // protected getRequestData(): { requestType: string, requestData: any } {
    // 	return { requestType: NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, requestData: null };
    // }
    AllianceWarView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "awscorerank", "awscorerank_down", "awawardbtn", "awawardbtn_down", "arena_bottom",
            "arena_more_down", "arena_more", "arena_arrow", "rankinglist_rankbg", "rankinglist_line", "arena_bottom_bg", "alliancewarbg2", "awsend", "awsend_down"
        ]);
    };
    /**
     * model 刷新监听事件
     */
    AllianceWarView.prototype.allianceWarModelHandle = function () {
        //npc 说话相关
        var name = "";
        if (Api.allianceWarVoApi.getOtherInfo()) {
            name = Api.allianceWarVoApi.getOtherInfo().name;
        }
        this._npcTalkTxt.text = LanguageManager.getlocal("allianceWarNpcTalk" + Api.allianceWarVoApi.getNpcTalkType(), [name]);
        this._npcTalkTxt.width = this._npcTalkBg.width - 30;
        this._npcTalkBg.height = this._npcTalkTxt.height + 40;
        this._npcTalkBg.setPosition(this._talkArcher.x - 20, this._talkArcher.y - this._npcTalkBg.height + 3);
        this._npcTalkTxt.setPosition(this._npcTalkBg.x + this._npcTalkBg.width / 2 - this._npcTalkTxt.width / 2, this._npcTalkBg.y + this._npcTalkBg.height / 2 - this._npcTalkTxt.height / 2);
        //info 相关
        //战斗力特殊处理
        this._allFightTxt.text = LanguageManager.getlocal("allianceWarViewAllFight", [App.StringUtil.changeIntToText(Api.allianceWarVoApi.getAllFight())]);
        this._allFightTxt.setPosition(5, this._infoBg.y + this._infoBg.height / 2 - this._allFightTxt.height / 2);
        this._servantNameTxt.text = LanguageManager.getlocal("allianceWarViewServantName", [Api.allianceWarVoApi.getMyServantName()]);
        this._servantNameTxt.setPosition(this._infoBg.x + this._infoBg.width / 2 - this._servantNameTxt.width / 2, this._infoBg.y + this._infoBg.height / 2 - this._servantNameTxt.height / 2);
        var addInfo = Config.AlliancewarCfg.getAddition(Api.allianceVoApi.getMyAllianceVo().po);
        this._myFightTxt.text = LanguageManager.getlocal("allianceWarViewMyFight", [App.StringUtil.changeIntToText(Api.allianceWarVoApi.getMyFight())]);
        this._myFightTxt.setPosition(this._servantNameTxt.x + this._servantNameTxt.width + 40, this._infoBg.y + this._infoBg.height / 2 - this._myFightTxt.height / 2);
        //红点显示
        if (Api.allianceWarVoApi.isFight() && Api.allianceWarVoApi.getOldInfo()) {
            var myInfo = Api.allianceVoApi.getMyAllianceVo();
            if ((myInfo.po == 1 || myInfo.po == 2) && (!Api.allianceWarVoApi.isReceiveAllianceReward())) {
                App.CommonUtil.addIconToBDOC(this._reviceRewardBtn);
            }
            else if (!Api.allianceWarVoApi.isReceiveMyReward()) {
                App.CommonUtil.addIconToBDOC(this._reviceRewardBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._reviceRewardBtn);
            }
        }
    };
    AllianceWarView.prototype.getSoundBgName = function () {
        return "music_dailyboss";
    };
    AllianceWarView.prototype.getRuleInfo = function () {
        return "allianceWarRuleInfo";
    };
    AllianceWarView.prototype.getRuleInfoParam = function () {
        if (PlatformManager.checkIsEnLang()) {
            return [Api.allianceWarVoApi.getWeeksWithDate(), String(App.DateUtil.formatSvrHourByLocalTimeZone(0).hour), String(App.DateUtil.formatSvrHourByLocalTimeZone(0).hour), String(App.DateUtil.formatSvrHourByLocalTimeZone(12).hour) + ":05"];
        }
        return [];
    };
    AllianceWarView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG, this.moreLogDataHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS, this.allianceWarModelHandle, this);
        this._topTip = null;
        this._topTime = null;
        this._topBg = null;
        this._infoBg = null;
        this._npcBM = null;
        this._buttomBg = null;
        this._buttomTimeBg = null;
        this._buttomTime = null;
        this._allFightTxt = null;
        this._servantNameTxt = null;
        this._myFightTxt = null;
        this._reviceRewardBtn = null;
        this._firstLog1Txt = null;
        this._firstLog2Txt = null;
        this._showMoreLogBtn = null;
        this._showMoreLogArcher = null;
        this._isShowMoreLog = false;
        this._npcTalkBg = null;
        this._npcTalkTxt = null;
        this._talkArcher = null;
        this._moreLogContainer = null;
        this._moreLogScrollList = null;
        this._moreBg = null;
        this._mask = null;
        this._periodType = 0;
        this._moreLogData = null;
        this._moreLogMask = null;
        this._sendBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarView;
}(CommonView));
__reflect(AllianceWarView.prototype, "AllianceWarView");
//# sourceMappingURL=AllianceWarView.js.map