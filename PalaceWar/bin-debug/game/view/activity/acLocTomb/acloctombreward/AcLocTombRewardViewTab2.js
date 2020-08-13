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
var AcLocTombRewardViewTab2 = (function (_super) {
    __extends(AcLocTombRewardViewTab2, _super);
    function AcLocTombRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLocTombRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombRewardViewTab2.prototype.getListType = function () {
        return 2;
    };
    AcLocTombRewardViewTab2.prototype.initView = function () {
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        var str = '';
        var rankList = view.vo.getArr('allianceRank');
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
            var winbg = BaseBitmap.create("tombrewardrankbg-" + view.code);
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rIcons1 = rItem.reward1Icons;
            var rank = rItem.alnRank;
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
            var descbg = BaseBitmap.create('aobaidescnamebg');
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0, winbg.height + 10]);
            view._nodeContainer.addChild(descbg);
            var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
            view._nodeContainer.addChild(alltxt);
            var len = rIcons1.length;
            var startY = descbg.y + descbg.height + 15;
            tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15) / 2;
            scroStartY = startY;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons1[innerIdx];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15) / 2;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                view._nodeContainer.addChild(element);
            }
            var orddescbg = BaseBitmap.create('aobaidescnamebg');
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, orddescbg, winbg, [0, winbg.height + 10]);
            view._nodeContainer.addChild(orddescbg);
            orddescbg.y = scroStartY + 106 + 15;
            var ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_memberget'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, orddescbg);
            view._nodeContainer.addChild(ordtxt);
            var rIcons2 = rItem.reward2Icons;
            var len2 = rIcons2.length;
            scroStartY = orddescbg.y + orddescbg.height + 15;
            tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15) / 2;
            for (var innerIdx = 0; innerIdx < len2; innerIdx++) {
                var element = rIcons2[innerIdx];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15) / 2;
                    scroStartY += (element.height + 15);
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
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
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab2', view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 0]);
        view.addChild(rankBtn);
        var rankstr = '';
        var rankV = view.vo.getMyAllPrank();
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
        var txt3 = ComponentManager.getTextField("", 20);
        txt3.text = LanguageManager.getlocal("loctombrank2-" + view.code, [color, rankstr]);
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
    AcLocTombRewardViewTab2.prototype.tick = function () {
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
    AcLocTombRewardViewTab2.prototype.rankCLick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBRANKIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
        });
    };
    AcLocTombRewardViewTab2.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcLocTombRewardViewTab2.prototype.dispose = function () {
        this._nodeContainer = null;
        this._countDownText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcLocTombRewardViewTab2;
}(CommonViewTab));
__reflect(AcLocTombRewardViewTab2.prototype, "AcLocTombRewardViewTab2");
//# sourceMappingURL=AcLocTombRewardViewTab2.js.map