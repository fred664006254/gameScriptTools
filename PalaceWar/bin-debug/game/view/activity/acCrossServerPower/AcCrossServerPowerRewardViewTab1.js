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
//
var AcCrossServerPowerRewardViewTab1 = (function (_super) {
    __extends(AcCrossServerPowerRewardViewTab1, _super);
    function AcCrossServerPowerRewardViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerPowerRewardViewTab1.prototype, "api", {
        get: function () {
            return Api.crossPowerVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRewardViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRewardViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerRewardViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerPowerRewardViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD), this.collectHandlerCallBack, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var winBottomBg = BaseBitmap.create("public_9_bg23");
        winBottomBg.width = 628;
        winBottomBg.y = 3;
        winBottomBg.x = 6;
        this._nodeContainer.addChild(winBottomBg);
        var winbg = BaseBitmap.create("atkracecross_rewatdbg1");
        winbg.y = winBottomBg.y;
        winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
        this._nodeContainer.addChild(winbg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
        this._nodeContainer.addChild(line1);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt1"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.x = GameConfig.stageWidth / 2 - txt1.width / 2;
        ;
        txt1.y = winbg.y + winbg.height / 2 - txt1.height / 2;
        this._nodeContainer.addChild(txt1);
        var cfg = this.cfg;
        var zrankinfo = this.api.zonerankinfos;
        var str = '';
        if ((!this.vo.zids && zrankinfo.length == 2) || (this.vo.zids && this.vo.zids <= 2)) {
            var txt1_1 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt1"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt1_1.x = GameConfig.stageWidth / 2 - txt1_1.width / 2;
            ;
            txt1_1.y = winbg.y + winbg.height / 2 - txt1_1.height / 2;
            this._nodeContainer.addChild(txt1_1);
            var cfg_1 = this.cfg;
            var winItemArr = cfg_1.getWinServerRewards();
            var tmpX = winBottomBg.x + 15;
            var scroStartY = winbg.y + winbg.height + 5;
            for (var index = 0; index < winItemArr.length; index++) {
                var element = winItemArr[index];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                //换行处理
                if (tmpX - 5 >= winBottomBg.x + winBottomBg.width) {
                    tmpX = winBottomBg.x + 15;
                    scroStartY += element.height + 10;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                this._nodeContainer.addChild(element);
            }
            scroStartY += 120;
            winBottomBg.height = scroStartY;
            scroStartY += 20;
            /**
             * 奖励物资
             */
            var failBottomBg = BaseBitmap.create("public_9_bg23");
            failBottomBg.width = winBottomBg.width;
            failBottomBg.y = scroStartY;
            failBottomBg.x = winBottomBg.x;
            this._nodeContainer.addChild(failBottomBg);
            var failbg = BaseBitmap.create("atkracecross_rewatdbg1");
            failbg.y = failBottomBg.y;
            failbg.x = winbg.x;
            this._nodeContainer.addChild(failbg);
            var line2 = BaseBitmap.create("public_line3");
            line2.width = line1.width;
            line2.x = line1.x;
            line2.y = failbg.y + failbg.height / 2 - line2.height / 2;
            this._nodeContainer.addChild(line2);
            var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt2"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt2.x = GameConfig.stageWidth / 2 - txt2.width / 2;
            txt2.y = failbg.y + failbg.height / 2 - txt2.height / 2;
            this._nodeContainer.addChild(txt2);
            var lossItemArr = cfg_1.getLossServerRewards();
            tmpX = winBottomBg.x + 15;
            scroStartY = failbg.y + failbg.height + 5;
            for (var index = 0; index < lossItemArr.length; index++) {
                var element = lossItemArr[index];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                //换行处理
                if (tmpX - 5 >= winBottomBg.x + winBottomBg.width) {
                    tmpX = winBottomBg.x + 15;
                    scroStartY += element.height + 10;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                this._nodeContainer.addChild(element);
            }
            scroStartY += 120;
            failBottomBg.height = scroStartY - failBottomBg.y;
            // scroStartY += 15;
        }
        else {
            var rankList = null;
            if (this.vo.checkIsFengyun()) {
                rankList = this.cfg.getMulServerRewards(this.vo.zids);
            }
            else {
                rankList = this.cfg.getMulServerRewards(zrankinfo.length);
            }
            // let rankList = this.cfg.getMulServerRewards(zrankinfo.length);
            var rList = Object.keys(rankList);
            rList.sort(function (a, b) {
                return Number(a) - Number(b);
            });
            var tmpX = 20;
            var scroStartY = 3;
            for (var index = 0; index < rList.length; index++) {
                var id = index;
                var key = rList[index];
                var rItem = rankList[key];
                var winBottomBg_1 = BaseBitmap.create("public_9_bg23");
                winBottomBg_1.width = 628;
                winBottomBg_1.y = scroStartY;
                winBottomBg_1.x = 6;
                this._nodeContainer.addChild(winBottomBg_1);
                var winbg_1 = BaseBitmap.create("atkracecross_rewatdbg3");
                winbg_1.y = scroStartY;
                winbg_1.x = GameConfig.stageWidth / 2 - winbg_1.width / 2;
                this._nodeContainer.addChild(winbg_1);
                var line1_1 = BaseBitmap.create("public_line3");
                line1_1.width = 480;
                line1_1.x = GameConfig.stageWidth / 2 - line1_1.width / 2;
                line1_1.y = winbg_1.y + winbg_1.height / 2 - line1_1.height / 2;
                this._nodeContainer.addChild(line1_1);
                var rewardStr = rItem.reward;
                var rank = rItem.rank;
                var txt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                if (Number(key) < 4) {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [key]);
                }
                else {
                    if (rank[0] < rank[1]) {
                        txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
                    }
                    else {
                        txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
                    }
                }
                txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
                txt.y = winbg_1.y + winbg_1.height / 2 - txt.height / 2;
                this._nodeContainer.addChild(txt);
                var rIcons = GameData.getRewardItemIcons(rewardStr, true, true);
                var len = rIcons.length;
                var startY = winbg_1.y + winbg_1.height + 5;
                tmpX = 20;
                scroStartY = startY;
                for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                    var element = rIcons[innerIdx];
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                    if (tmpX >= GameConfig.stageWidth) {
                        tmpX = 20;
                        scroStartY += element.height + 15;
                        element.x = tmpX;
                        element.y = scroStartY;
                        tmpX += (element.width + 8);
                    }
                    this._nodeContainer.addChild(element);
                }
                scroStartY += 130;
                winBottomBg_1.height = scroStartY - winBottomBg_1.y;
                scroStartY += 10;
            }
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 150;
        this.addChild(bottomBg);
        var txt3 = ComponentManager.getTextField("", 20);
        if ((!this.vo.zids && this.api.zonerankinfos.length == 2) || (this.vo.zids && this.vo.zids <= 2)) {
            if (this.api.iszonewin == 1) {
                txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt3");
            }
            else {
                txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt4");
            }
        }
        else {
            var rankOrder = 1;
            for (var i in this.api.zonerankinfos) {
                var unit = this.api.zonerankinfos[i];
                if (Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())) {
                    rankOrder = Number(i) + 1;
                    break;
                }
            }
            txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt7", [rankOrder.toString()]);
        }
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 25;
        this.addChild(txt3);
        TickManager.addTick(this.tick, this);
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20);
        this.tick();
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 35;
        this.addChild(this._countDownText);
        // let vo =  Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bottomBg.x + bottomBg.width - 150;
        this._collectBtn.y = bottomBg.y + bottomBg.height / 2 - this._collectBtn.height / 2;
        this._collectBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._collectBtn.setEnable(false);
        this.addChild(this._collectBtn);
        var crossVo = this.vo;
        if (crossVo.isGettZonereward()) {
            this._collectBtn.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(0.75);
        }
        else {
            if (GameData.serverTime >= vo.st && GameData.serverTime <= vo.et && GameData.serverTime + 86400 > vo.et) {
                this._collectBtn.setEnable(true);
            }
            else {
                txt3.text = LanguageManager.getlocal("atkracecrossActivityRewardTxt6");
            }
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 5);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcCrossServerPowerRewardViewTab1.prototype.collectHandler = function () {
        if (this.vo && (!this.vo.isStart)) {
            this.vo.showAcEndTip();
            return;
        }
        var crossVo = this.vo;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD, { activeId: crossVo.aid + "-" + crossVo.code });
    };
    AcCrossServerPowerRewardViewTab1.prototype.collectHandlerCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        this._collectBtn.visible = false;
        var rewards = rdata.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        // let pos = this._collectBtn.localToGlobal(this._collectBtn.width/2,this._collectBtn.height/2)
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        App.CommonUtil.playRewardFlyAction(rewardList);
        this.createCollectFlag();
        this._collectFlag.setScale(1.0);
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.75, scaleY: 0.75 }, 300);
    };
    AcCrossServerPowerRewardViewTab1.prototype.tick = function () {
        var vo = this.vo;
        if (this._collectBtn) {
            if (vo.checkZoneRewardDeddot()) {
                App.CommonUtil.addIconToBDOC(this._collectBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._collectBtn);
            }
        }
        if (this._countDownText) {
            var countDownTime = this.api.getCountDownTime();
            var type = this.vo.judgeTimeProcess();
            if (type < 4) {
                this._countDownText.text = LanguageManager.getlocal("crossIntimacyCDTime" + type) + this.vo.getCountTimeStr(countDownTime);
            }
            else {
                this._countDownText.text = LanguageManager.getlocal("crossIntimacyCDTime3") + LanguageManager.getlocal("acRank_acCDEnd");
            }
        }
    };
    AcCrossServerPowerRewardViewTab1.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcCrossServerPowerRewardViewTab1.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcCrossServerPowerRewardViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD), this.collectHandlerCallBack, this);
        this._nodeContainer = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._countDownText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerRewardViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerPowerRewardViewTab1.prototype, "AcCrossServerPowerRewardViewTab1");
//# sourceMappingURL=AcCrossServerPowerRewardViewTab1.js.map