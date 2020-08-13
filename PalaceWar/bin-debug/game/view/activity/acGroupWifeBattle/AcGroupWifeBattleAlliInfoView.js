var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
author : qianjun---wxz
desc : 帮会争顶 帮派详情信息
*/
var AcGroupWifeBattleAlliInfoView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleAlliInfoView, _super);
    function AcGroupWifeBattleAlliInfoView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._chalBtn = null;
        _this._numText = null;
        _this._data = [];
        _this._isfresh = false;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleAlliInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleAlliInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleAlliInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleAlliInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleAlliInfoView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleAlliInfoView.prototype.getRequestData = function () {
        var view = this;
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        return { requestType: NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL, requestData: {
                activeId: view.vo.aidAndCode,
                allianceId: alliinfo.mid
            } };
    };
    AcGroupWifeBattleAlliInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data && data.data.data.allianceList) {
            view._data = data.data.data.allianceList;
            view._data.sort(function (a, b) {
                return a.myrank - b.myrank;
            });
        }
        if (view._isfresh) {
            view._isfresh = false;
            this.freshList();
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcGroupWifeBattleAlliInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress5"
        ]);
    };
    AcGroupWifeBattleAlliInfoView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), view.challengeCallback, view);
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 565;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 70);
        view.addChildToContainer(bg);
        var mask = BaseBitmap.create("public_9_bg37");
        mask.width = bg.width;
        mask.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, bg);
        view.addChildToContainer(mask);
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAlliRank-" + view.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [10, 0]);
        view.addChildToContainer(title1Text);
        var title2Text = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
        view.addChildToContainer(title2Text);
        var title3Text = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [25, 0]);
        view.addChildToContainer(title3Text);
        var alliNameText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAlliName-" + view.getUiCode(), [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 25 + GameData.popupviewOffsetX, 15);
        view.addChildToContainer(alliNameText);
        var serverText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAlliRankServer-" + view.getUiCode(), [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
        view.addChildToContainer(serverText);
        var numText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAlliNum-" + view.getUiCode(), [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [5, alliNameText.textHeight + 10]);
        view.addChildToContainer(numText);
        numText.y = serverText.y;
        this._numText = numText;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, bg.height - 40 - 10);
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
        var scrollList = ComponentManager.getScrollList(AcGroupWifeBattleAlliInfoItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, mask, [0, mask.height]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        var challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceChallengeViewTitle", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleNoAttend-" + _this.getUiCode()));
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLESELECTVIEW, {
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
        challBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
        view._chalBtn = challBtn;
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            var cdText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleTip12-" + view.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
            view.addChildToContainer(cdText);
        }
    };
    AcGroupWifeBattleAlliInfoView.prototype.tick = function () {
        var view = this;
        // if(view.vo.isActyEnd() && !view._end){
        // 	view._end = true;
        // 	view.freshList();
        // }
        view._chalBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
    };
    AcGroupWifeBattleAlliInfoView.prototype.freshList = function () {
        var view = this;
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
        view._list.refreshData(arr);
        var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
        this._numText.text = LanguageManager.getlocal("acGroupWifeBattleAlliNum-" + view.getUiCode(), [alliinfo.num.toString(), alliinfo.total.toString()]);
    };
    AcGroupWifeBattleAlliInfoView.prototype.challengeCallback = function (event) {
        if (event.data.ret && event.data.data.ret == 0) {
            var view = this;
            ViewController.getInstance().hideView(ViewConst.POPUP.ACGROUPWIFEBATTLESELECTVIEW);
            this._isfresh = true;
            var alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
            this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE, { activeId: view.vo.aidAndCode, allianceId: alliinfo.mid });
        }
    };
    AcGroupWifeBattleAlliInfoView.prototype.checkShowSearch = function (event) {
        // console.log("checkShowSearch",data);
        if (!this.vo) {
            return;
        }
        if (event && event.data.data.data.groupwifebattle) {
            this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
        }
    };
    AcGroupWifeBattleAlliInfoView.prototype.getShowHeight = function () {
        return 880;
    };
    AcGroupWifeBattleAlliInfoView.prototype.getShowWidth = function () {
        return 560;
    };
    AcGroupWifeBattleAlliInfoView.prototype.getTitleStr = function () {
        return "acGroupWifeBattleAlliInfo-" + this.getUiCode();
    };
    AcGroupWifeBattleAlliInfoView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), view.challengeCallback, view);
        view._end = false;
        view._list = null;
        view._chalBtn = null;
        this._numText = null;
        this._isfresh = false;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleAlliInfoView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleAlliInfoView.js.map