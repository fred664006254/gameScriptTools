/*
    author : shaoliang
    date : 2019.10.23
    desc : 天下至尊-每日任务
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
var LadderTaskView = (function (_super) {
    __extends(LadderTaskView, _super);
    function LadderTaskView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        return _this;
    }
    Object.defineProperty(LadderTaskView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    LadderTaskView.prototype.getTitleBgName = function () {
        return "ladderview_title";
    };
    LadderTaskView.prototype.getTitleStr = function () {
        return null;
    };
    LadderTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_task_topbg", "servant_bottombg", "progress7_bg", "progress7"
        ]);
    };
    LadderTaskView.prototype.getTabbarTextArr = function () {
        return [
            "acCharge_tab1",
            "acLadder_task_tab2",
            "acLadder_task_tab3",
            "acLadder_task_tab4",
        ];
    };
    LadderTaskView.prototype.initView = function () {
        this.titleBgShadow.visible = false;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK), this.rewardCallBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        var vo = this.vo;
        var acDescBg = BaseBitmap.create("ladder_task_topbg");
        acDescBg.width = 640;
        acDescBg.height = 225;
        acDescBg.setPosition(0, -62);
        this.addChildToContainer(acDescBg);
        var acTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadderTournamentView_acTime", [vo.acTimeAndHour]), 18, TextFieldConst.COLOR_WHITE);
        acTimeDesc.setPosition(220, acDescBg.y + 52);
        this.addChildToContainer(acTimeDesc);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_task_desc"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 406;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTimeDesc.x - 2, acTimeDesc.y + acTimeDesc.height + 7);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height - 5;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        this.tick();
        var midtop = BaseBitmap.create("servant_bottombg");
        midtop.width = 660;
        midtop.height = GameConfig.stageHeigth - 310;
        midtop.setPosition(-10, acDescBg.y + acDescBg.height - 3);
        this.container.addChildAt(midtop, 0);
        view.tabbarGroup.y = 307;
        this.freshView();
    };
    LadderTaskView.prototype.rewardCallBack = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (evt.data.ret) {
            var rewardList = GameData.formatRewardItem(Api.laddertournamentVoApi.taskReward);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
    };
    LadderTaskView.prototype.tick = function () {
        var vo = this.vo;
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
            var et = today0 + 24 * 3600;
            var time = et - GameData.serverTime;
            this._countDownTime.text = LanguageManager.getlocal("acLadder_today_time", [App.DateUtil.getFormatBySecond((time), 1)]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    LadderTaskView.prototype.freshView = function () {
        for (var i = 1; i <= 4; ++i) {
            if (this.vo.getpublicRedDot(i)) {
                this.tabbarGroup.addRedPoint(i - 1);
            }
            else {
                this.tabbarGroup.removeRedPoint(i - 1);
            }
        }
    };
    LadderTaskView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK), this.rewardCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return LadderTaskView;
}(CommonView));
__reflect(LadderTaskView.prototype, "LadderTaskView");
//# sourceMappingURL=LadderTaskView.js.map