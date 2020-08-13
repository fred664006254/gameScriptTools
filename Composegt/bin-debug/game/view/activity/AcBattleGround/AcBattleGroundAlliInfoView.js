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
/*
author : qianjun
desc : 帮会争顶 帮派详情信息
*/
var AcBattleGroundAlliInfoView = (function (_super) {
    __extends(AcBattleGroundAlliInfoView, _super);
    function AcBattleGroundAlliInfoView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._chalBtn = null;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundAlliInfoView.prototype.getRequestData = function () {
        var view = this;
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL, requestData: {
                activeId: view.vo.aidAndCode,
                allianceId: alliinfo.mid
            } };
    };
    AcBattleGroundAlliInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data && data.data.data.allianceList) {
            view._data = data.data.data.allianceList;
            view._data.sort(function (a, b) {
                return a.myrank - b.myrank;
            });
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcBattleGroundAlliInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress3", "rank_biao"
        ]);
    }; //REQUST_ACTIVITY_BATTLEGROUNDDETAIL
    AcBattleGroundAlliInfoView.prototype.initView = function () {
        var _this = this;
        var view = this;
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 565;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 70);
        view.addChildToContainer(bg);
        var tcbg2 = BaseBitmap.create("public_tc_bg03");
        tcbg2.width = bg.width - 20;
        tcbg2.height = bg.height - 20;
        tcbg2.x = bg.x + 10;
        tcbg2.y = bg.y + 10;
        ;
        this.addChildToContainer(tcbg2);
        var mask = BaseBitmap.create("rank_biao");
        mask.width = 480;
        mask.x = bg.x + 20;
        mask.y = tcbg2.y + 10;
        this.addChildToContainer(mask);
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliRank")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [30, 0]);
        view.addChildToContainer(title1Text);
        var title2Text = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
        view.addChildToContainer(title2Text);
        var title3Text = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [40, 0]);
        view.addChildToContainer(title3Text);
        var alliNameText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliName"), [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 50, 10);
        view.addChildToContainer(alliNameText);
        var serverText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliRankServer"), [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
        view.addChildToContainer(serverText);
        var numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliNum"), [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [15, alliNameText.textHeight + 30]);
        view.addChildToContainer(numText);
        numText.y = serverText.y;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, bg.height - 40 - 25);
        var arr = [];
        for (var i in view._data) {
            var unit = view._data[i];
            arr.push({
                name: unit.name,
                rank: unit.myrank,
                score: unit.value,
                alliId: view.param.data.alliId,
                uid: unit.uid,
                alive: unit.alive
            });
        }
        var scrollList = ComponentManager.getScrollList(AcBattleGroundAlliInfoItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tcbg2, [0, 10 + mask.height]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        //view.freshList();
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleRoundNoAttend")));
                return;
            }
            if (view.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (view.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            if (view.vo.getAttendQuality() && view.vo.getJoinIn()) {
                //打开挑战弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW, {
                    code: view.code,
                    aid: view.aid,
                    alliId: view.param.data.alliId,
                    mem: view._data
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, challBtn, bg, [0, bg.height + 10]);
        view.addChildToContainer(challBtn);
        challBtn.visible = alliinfo.num > 0 && view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
        view._chalBtn = challBtn;
        // if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
        // 	let cdText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip12")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
        // 	view.addChildToContainer(cdText);
        // }
    };
    AcBattleGroundAlliInfoView.prototype.getRoundRewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
    };
    AcBattleGroundAlliInfoView.prototype.tick = function () {
        var view = this;
        if (view.vo.isActyEnd() && !view._end) {
            view._end = true;
            view.freshList();
        }
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        view._chalBtn.visible = alliinfo.num > 0 && view.vo.getAttendQuality() && view.vo.getJoinIn();
    };
    AcBattleGroundAlliInfoView.prototype.freshList = function () {
        var view = this;
    };
    AcBattleGroundAlliInfoView.prototype.getShowHeight = function () {
        return 800;
    };
    AcBattleGroundAlliInfoView.prototype.getShowWidth = function () {
        return 560;
    };
    AcBattleGroundAlliInfoView.prototype.getTitleStr = function () {
        return this.getDefaultCn("acBattleGroundSelect");
    };
    AcBattleGroundAlliInfoView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundAlliInfoView.prototype.dispose = function () {
        var view = this;
        view._end = false;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
        view._list = null;
        view._chalBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAlliInfoView;
}(PopupView));
__reflect(AcBattleGroundAlliInfoView.prototype, "AcBattleGroundAlliInfoView");
