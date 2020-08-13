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
var AcWipeBossRewardViewTab2 = (function (_super) {
    __extends(AcWipeBossRewardViewTab2, _super);
    function AcWipeBossRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWipeBossRewardViewTab2.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossRewardViewTab2.prototype.getListType = function () {
        return 2;
    };
    AcWipeBossRewardViewTab2.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var str = '';
        var rankList = view.vo.getArr('allRankReward');
        var tmpX = 20;
        var scroStartY = 8;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = rItem.id;
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("public_ts_bg01");
            winbg.width = 250;
            winbg.y = scroStartY + 13;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            // let line1 =  BaseBitmap.create("public_line3");
            // line1.width = 480;
            // line1.x = GameConfig.stageWidth/2 - line1.width/2;
            // line1.y = winbg.y + winbg.height/2 - line1.height/2;
            // this._nodeContainer.addChild(line1);
            var rIcons1 = rItem.reward1Icons;
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
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
            var descbg = BaseBitmap.create('acwipeboss_namebg');
            descbg.width = 250;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0, winbg.height + 10]);
            view._nodeContainer.addChild(descbg);
            var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
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
            var orddescbg = BaseBitmap.create('acwipeboss_namebg');
            orddescbg.width = 250;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, orddescbg, winbg, [0, winbg.height + 10]);
            view._nodeContainer.addChild(orddescbg);
            orddescbg.y = scroStartY + 106 + 15;
            var ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_memberget'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
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
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
        // 膜拜背景
        var bottomBg = BaseBitmap.create("adult_lowbg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 162;
        view.addChild(bottomBg);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab2', view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 0]);
        view.addChild(rankBtn);
        var rankstr = '';
        var rankV = view.api.getMyAllPrank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.text = LanguageManager.getlocal("acwipeBossRank2", [rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 17;
        this.addChild(txt3);
        TickManager.addTick(this.tick, this);
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.tick();
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 30;
        this.addChild(this._countDownText);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 5);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = 640;
        bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = 0;
        this.addChild(bottomBgFrame);
    };
    AcWipeBossRewardViewTab2.prototype.tick = function () {
        if (this._countDownText) {
            var countDownTime = this.vo.getCountDownTime();
            if (countDownTime > 0) {
                this._countDownText.text = LanguageManager.getlocal("acwipeBoss_acCD", [App.DateUtil.getFormatBySecond(countDownTime)]);
            }
            else {
                this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
            }
        }
    };
    AcWipeBossRewardViewTab2.prototype.rankCLick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSRANKIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
        });
    };
    AcWipeBossRewardViewTab2.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcWipeBossRewardViewTab2.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        this._countDownText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossRewardViewTab2;
}(CommonViewTab));
__reflect(AcWipeBossRewardViewTab2.prototype, "AcWipeBossRewardViewTab2");
