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
var AcBattleGroundDetailsViewTab4 = (function (_super) {
    __extends(AcBattleGroundDetailsViewTab4, _super);
    function AcBattleGroundDetailsViewTab4(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._countDownText = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattleGroundDetailsViewTab4.prototype, "cfg", {
        // private get api() : WipeBossVoApi{
        //     return Api.wipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundDetailsViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundDetailsViewTab4.prototype.getListType = function () {
        return 2;
    };
    AcBattleGroundDetailsViewTab4.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var str = '';
        var rankList = this.cfg.allianceRank;
        var tmpX = 20;
        var scroStartY = 5;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = Number(id + 1); //rItem.id;
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var rIcons1 = GameData.getRewardItemIcons(rItem.lordReward, true, true);
            var rank = rItem.alnRank;
            var winbg = null;
            var txt = null;
            var offY = 0;
            var offH = 0;
            if (key == 1) {
                var titleBg = BaseBitmap.create("public_up3");
                titleBg.width = 620;
                titleBg.height = 160;
                titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
                titleBg.y = scroStartY + 5;
                this._nodeContainer.addChild(titleBg);
                winbg = BaseBitmap.create("battleground_first");
                winbg.y = scroStartY;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                offY = 35;
                offH = 10;
                var firstData = this.vo.getRankFirstAlli();
                var allinameText = ComponentManager.getTextField(firstData.name, 22, TextFieldConst.COLOR_BROWN);
                this._nodeContainer.addChild(allinameText);
                var serverText = null;
                if (firstData.qu > 0) {
                    serverText = ComponentManager.getTextField(LanguageManager.getlocal("mergeServer", [String(firstData.qu), String(firstData.zid)]), 22, TextFieldConst.COLOR_WARN_GREEN);
                }
                else {
                    serverText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2", [String(firstData.zid)]), 22, TextFieldConst.COLOR_WARN_GREEN);
                }
                this._nodeContainer.addChild(serverText);
                allinameText.x = GameConfig.stageWidth / 2 - (allinameText.width + 10 + serverText.width) / 2;
                allinameText.y = winbg.y + winbg.height + 10;
                serverText.x = allinameText.x + allinameText.width + 10;
                serverText.y = allinameText.y;
            }
            else {
                winbg = BaseBitmap.create("public_ts_bg01");
                winbg.width = 250;
                winbg.y = scroStartY + 13;
                winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
                this._nodeContainer.addChild(winbg);
                txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
                if (Number(key) < 4) {
                    txt.text = LanguageManager.getlocal("acRank_rank6", [String(key)]);
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
            }
            var descbg = BaseBitmap.create('acwipeboss_namebg');
            descbg.width = 250;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0, winbg.height + 10 + offY]);
            view._nodeContainer.addChild(descbg);
            var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
            view._nodeContainer.addChild(alltxt);
            var len = rIcons1.length;
            var startY = descbg.y + descbg.height + 15 + offH;
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
            var rIcons2 = GameData.getRewardItemIcons(rItem.memberReward, true, true);
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
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acBattleGroundDetailsViewAlliBtn', view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 2]);
        view.addChild(rankBtn);
        var rankstr = '';
        // let rankV = view.api.getMyAllPrank();
        var rankV = this.vo.getRankAllRank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.text = LanguageManager.getlocal("acBattleRankPopupViewAllRank", [rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 15;
        this.addChild(txt3);
        var txt4 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt4.text = LanguageManager.getlocal("acBattleRankPopupViewAllPlayerNum", [String(this.vo.getRankAllPlayerNum())]);
        txt4.x = txt3.x;
        txt4.y = txt3.y + txt3.height + 10;
        this.addChild(txt4);
        if (!this.vo.getAttendQuality()) {
            txt3.visible = false;
            txt4.visible = false;
        }
        var vo = this.vo;
        this._countDownText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._countDownText.x = txt3.x;
        this._countDownText.y = txt3.y + 30;
        this.addChild(this._countDownText);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.y - 5 - 25);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 0;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var warnText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewMail"), 18, TextFieldConst.COLOR_WHITE);
        warnText.x = GameConfig.stageWidth / 2 - warnText.width / 2;
        warnText.y = bottomBg.y - 5 - warnText.height;
        this.addChild(warnText);
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = 640;
        bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = 0;
        this.addChild(bottomBgFrame);
    };
    AcBattleGroundDetailsViewTab4.prototype.rankCLick = function () {
        var view = this;
        ViewController.getInstance().openView("AcBattleRankPopupView", {
            aid: view.param.data.aid,
            code: view.param.data.code,
            index: 1
            // curIndex:1
        });
    };
    AcBattleGroundDetailsViewTab4.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcBattleGroundDetailsViewTab4.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        this._countDownText = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundDetailsViewTab4;
}(CommonViewTab));
__reflect(AcBattleGroundDetailsViewTab4.prototype, "AcBattleGroundDetailsViewTab4");
