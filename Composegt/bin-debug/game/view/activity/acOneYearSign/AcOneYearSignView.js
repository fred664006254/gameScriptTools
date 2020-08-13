/*
author : yanyuling
desc : 周年庆 登录有礼
*/
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
var AcOneYearSignView = (function (_super) {
    __extends(AcOneYearSignView, _super);
    function AcOneYearSignView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._collectTxtList = [];
        _this._scrollContiner = undefined;
        _this._reqDayIdx = undefined;
        _this._rewardbgList = [];
        _this._alphabgList = [];
        _this._clip = undefined;
        return _this;
    }
    AcOneYearSignView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_ONESIGN_VO_CHANGE, this.refreshUIInfo, this);
        var titletxt = BaseBitmap.create("oneyearsign_txt");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);
        //顶部背景图片
        var forpeople_top = BaseLoadBitmap.create('oneyearrank_topbg-1');
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = 109 - 20;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x; //forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY; //this._activityTimerText.y ;//this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        var rankTxt = "";
        //规则
        this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.text = LanguageManager.getlocal("acOneYearDesc-" + this.code, [rankTxt]);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x * 2;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(this._ruleText);
        //bottomBg
        var bottomBg = BaseBitmap.create("oneyearsign_bottom");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        var _scrollContiner = new BaseDisplayObjectContainer();
        _scrollContiner.width = GameConfig.stageWidth;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, bottomBg.y - forpeople_top.y - forpeople_top.height + 65);
        this._scrollContiner = _scrollContiner;
        var startY = 0;
        var startIdx = 0;
        var SignReward = this.cfg.SignReward;
        var len = SignReward.length;
        var daynum = this.vo.dayNum;
        var offPosY = 0;
        for (var index = 0; index < len; index++) {
            var rewardbg = BaseBitmap.create("oneyearsign_itembg");
            var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_txt1", ["" + (index + 1)]), 20, TextFieldConst.COLOR_BROWN);
            var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_txt2"), 20, TextFieldConst.COLOR_BROWN);
            var reward = SignReward[index].getReward;
            var rIcons = GameData.getRewardItemIcons(reward, true, true)[0];
            rIcons.setScale(0.8);
            if (index == 6 || index == 13) {
                rewardbg.texture = ResourceManager.getRes("oneyearsign_bg" + (index == 6 ? "2" : "3"));
                txt1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                txt2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                rewardbg.x = GameConfig.stageWidth / 2 - rewardbg.width / 2;
                startIdx += 3;
            }
            else {
                rewardbg.x = GameConfig.stageWidth / 2 - rewardbg.width / 2 + (startIdx % 3 - 1) * (rewardbg.width + 2);
                startIdx += 1;
            }
            rewardbg.y = startY;
            txt1.x = rewardbg.x + rewardbg.width / 2 - txt1.width / 2;
            txt1.y = rewardbg.y + 20;
            txt2.y = rewardbg.y + rewardbg.height - 15 - txt2.height;
            rIcons.x = rewardbg.x + rewardbg.width / 2 - rIcons.width / 2 * rIcons.scaleX;
            rIcons.y = rewardbg.y + rewardbg.height / 2 - rIcons.height / 2 * rIcons.scaleX;
            if (index == 6 || index == 13) {
                rIcons.x = rewardbg.x + rewardbg.width - rIcons.width / 2 * rIcons.scaleX - 120;
                rIcons.y = rewardbg.y + rewardbg.height / 2 - rIcons.height / 2 * rIcons.scaleX + 10;
                txt1.y = rewardbg.y + 25;
                txt2.y = rewardbg.y + rewardbg.height - 20 - txt2.height;
                if (index == 13) {
                    rIcons.alpha = 0;
                }
            }
            _scrollContiner.addChild(rewardbg);
            _scrollContiner.addChild(txt1);
            _scrollContiner.addChild(txt2);
            _scrollContiner.addChild(rIcons);
            var alphabg = BaseBitmap.create("public_alphabg");
            alphabg.width = rewardbg.width;
            alphabg.height = rewardbg.height;
            alphabg.x = rewardbg.x;
            alphabg.y = rewardbg.y;
            alphabg.visible = false;
            _scrollContiner.addChild(alphabg);
            if (index + 1 <= daynum) {
                alphabg.visible = true;
                if (this.vo.dayFlags(index + 1)) {
                    txt2.text = "";
                    var _collectFlag = BaseBitmap.create("collectflag");
                    _collectFlag.anchorOffsetX = _collectFlag.width / 2;
                    _collectFlag.anchorOffsetY = _collectFlag.height / 2;
                    _collectFlag.x = txt1.x + txt1.width / 2;
                    _collectFlag.y = txt2.y - 5;
                    _scrollContiner.addChild(_collectFlag);
                    if (index == 6 || index == 13) {
                        _collectFlag.texture = ResourceManager.getRes("collectflag2");
                    }
                    alphabg.visible = false;
                }
                if (index + 1 == daynum) {
                    offPosY = rewardbg.y;
                }
            }
            else if (index == daynum) {
                txt2.text = LanguageManager.getlocal("acOneYear_txt3");
                alphabg.visible = false;
            }
            else {
                txt2.text = LanguageManager.getlocal("acOneYear_txt4");
                alphabg.visible = false;
            }
            txt2.x = rewardbg.x + rewardbg.width / 2 - txt2.width / 2;
            var curdayIdx = index + 1;
            this._collectTxtList["" + curdayIdx] = txt2;
            this._rewardbgList["" + curdayIdx] = rewardbg;
            this._alphabgList["" + curdayIdx] = alphabg;
            rewardbg.addTouchTap(this.getRewardHandler, this, [curdayIdx]);
            alphabg.addTouchTap(this.getRewardHandler, this, [curdayIdx]);
            if (index == 2 || index == 5 || index == 12 || index == 9) {
                startY += rewardbg.height + 2;
            }
            if (index == 6 || index == 13) {
                startY += rewardbg.height - 10;
            }
        }
        var _scrollView = ComponentManager.getScrollView(_scrollContiner, rect);
        _scrollView.x = 0;
        _scrollView.y = forpeople_top.y + forpeople_top.height;
        _scrollView.horizontalScrollPolicy = "off";
        this.addChildToContainer(_scrollView);
        this.addChildToContainer(bottomBg);
        var balloon = BaseBitmap.create("oneyearsign_balloon");
        balloon.x = GameConfig.stageWidth - balloon.width + 5;
        balloon.y = forpeople_top.y + forpeople_top.height - 50;
        this.addChildToContainer(balloon);
        var maxOff = _scrollView.getMaxScrollTop();
        offPosY = offPosY >= maxOff ? maxOff : offPosY;
        _scrollView.scrollTop = offPosY;
        this.showClipAni();
        this.tick();
    };
    AcOneYearSignView.prototype.showClipAni = function () {
        var daynum = this.vo.dayNum;
        if (this._clip) {
            this._scrollContiner.removeChild(this._clip);
            this._clip = null;
        }
        if (this.vo.dayFlags(daynum)) {
            return;
        }
        var clipPath = "oneyearsign_clip1_";
        if (daynum == 7 || daynum == 14) {
            clipPath = "oneyearsign_clip2_";
        }
        var rewardbg = this._rewardbgList["" + daynum];
        if (!this._clip && rewardbg) {
            this._clip = ComponentManager.getCustomMovieClip(clipPath, 12, 100);
            this._clip.blendMode = egret.BlendMode.ADD;
            this._clip.x = rewardbg.x - 60;
            this._clip.y = rewardbg.y - 55;
            this._clip.playWithTime(0);
            this._scrollContiner.addChild(this._clip);
            if (clipPath == "oneyearsign_clip2_") {
                this._clip.x = rewardbg.x;
                this._clip.y = rewardbg.y - 50;
            }
        }
    };
    AcOneYearSignView.prototype.refreshUIInfo = function () {
        var SignReward = this.cfg.SignReward;
        var len = SignReward.length;
        var daynum = this.vo.dayNum;
        for (var index = 0; index < len; index++) {
            var curdayIdx = index + 1;
            var txt2 = this._collectTxtList["" + curdayIdx];
            txt2.text = LanguageManager.getlocal("acOneYear_txt2");
            if (index + 1 <= daynum) {
                if (this.vo.dayFlags(index + 1)) {
                    txt2.text = "";
                }
            }
            else if (index == daynum) {
                txt2.text = LanguageManager.getlocal("acOneYear_txt3");
            }
            else {
                txt2.text = LanguageManager.getlocal("acOneYear_txt4");
            }
        }
        this.showClipAni();
    };
    AcOneYearSignView.prototype.getRewardHandler = function (event, idx) {
        var daynum = this.vo.dayNum;
        if (idx > daynum || this.vo.dayFlags(idx)) {
            return;
        }
        this._reqDayIdx = idx;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN, this.getRewardHandlerCallback, this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN, { activeId: this.vo.aidAndCode, dayId: idx });
    };
    AcOneYearSignView.prototype.getRewardHandlerCallback = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN, this.getRewardHandlerCallback, this);
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            var txt2 = this._collectTxtList["" + this._reqDayIdx];
            var _collectFlag = BaseBitmap.create("collectflag");
            _collectFlag.anchorOffsetX = _collectFlag.width / 2;
            _collectFlag.anchorOffsetY = _collectFlag.height / 2;
            _collectFlag.x = txt2.x + txt2.width / 2;
            _collectFlag.y = txt2.y - 5;
            this._scrollContiner.addChild(_collectFlag);
            txt2.visible = false;
            this._alphabgList["" + this._reqDayIdx].visible = false;
            if (this._reqDayIdx == 7 || this._reqDayIdx == 14) {
                _collectFlag.texture = ResourceManager.getRes("collectflag2");
            }
            this.showClipAni();
            var rewards = rdata.data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
        }
    };
    AcOneYearSignView.prototype.tick = function () {
        var deltaT = this.acVo.acCountDown;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this._acCDTxt && deltaT) {
            if (GameData.serverTime < this.vo.et) {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(AcOneYearSignView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearSignView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearSignView.prototype.getBgName = function () {
        return "oneyearsign_bg";
    };
    AcOneYearSignView.prototype.getTitleBgName = function () {
        return "oneyearrank_titlebg-1";
    };
    AcOneYearSignView.prototype.getTitleStr = function () {
        return null;
    };
    AcOneYearSignView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneyearrank_titlebg-1", "oneyearsign_txt", "oneyearrank_topbg-1",
            "oneyearsign_bottom", "oneyearsign_bg",
            "oneyearsign_bg3", "oneyearsign_bg2", "oneyearsign_itembg",
            "oneyear_flag", "collectflag2", "oneyearsign_balloon", "collectflag",
        ]);
    };
    AcOneYearSignView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_ONESIGN_VO_CHANGE, this.refreshUIInfo, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._collectTxtList = [];
        this._scrollContiner = null;
        this._reqDayIdx = null;
        this._rewardbgList = [];
        this._clip = null;
        this._alphabgList = [];
        _super.prototype.dispose.call(this);
    };
    return AcOneYearSignView;
}(AcCommonView));
__reflect(AcOneYearSignView.prototype, "AcOneYearSignView");
