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
var AcTombRewardViewTab1 = (function (_super) {
    __extends(AcTombRewardViewTab1, _super);
    function AcTombRewardViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcTombRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombRewardViewTab1.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombRewardViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcTombRewardViewTab1.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        var code = view.getUicode();
        view._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var str = '';
        var rankList = view.vo.getArr('indivdualRank');
        var tmpX = 20;
        var scroStartY = 3;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = rItem.id;
            var winBottomBg = BaseBitmap.create("public_9_bg23");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("tombrewardrankbg-" + code);
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rewardStr = rItem.getReward;
            var rIcons = rItem.rewardIcons;
            var rank = rItem.idvRank;
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
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var len = rIcons.length;
            var startY = winbg.y + winbg.height + 10;
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
                    tmpX += (element.width + 15);
                }
                element.cacheAsBitmap = true;
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 10;
            this._nodeContainer.height = winBottomBg.y + winBottomBg.height;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 150;
        view.addChild(bottomBg);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 0]);
        view.addChild(rankBtn);
        var txt3 = ComponentManager.getTextField("", 20);
        var rankstr = '';
        var rankV = view.vo.getMyPrank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(0x21eb39);
        if (!view.vo.getAttendQUality()) {
            rankstr = LanguageManager.getlocal('crossImacyNoAccess');
            color = String(0xff3c3c);
        }
        txt3.text = LanguageManager.getlocal("tombrank1-" + code, [color, rankstr]);
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
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 5);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcTombRewardViewTab1.prototype.tick = function () {
        if (this._countDownText) {
            var countDownTime = this.vo.getCountDownTime();
            if (countDownTime > 0) {
                this._countDownText.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(countDownTime)]);
            }
            else {
                this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
            }
        }
    };
    AcTombRewardViewTab1.prototype.rankCLick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBRANKIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
        });
    };
    AcTombRewardViewTab1.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcTombRewardViewTab1.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        this._countDownText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcTombRewardViewTab1;
}(CommonViewTab));
__reflect(AcTombRewardViewTab1.prototype, "AcTombRewardViewTab1");
//# sourceMappingURL=AcTombRewardViewTab1.js.map