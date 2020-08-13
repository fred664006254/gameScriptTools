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
var AcCrossServerServantRewardViewTab2 = (function (_super) {
    __extends(AcCrossServerServantRewardViewTab2, _super);
    function AcCrossServerServantRewardViewTab2() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this._collectFlag = null;
        _this._rewardBtn = null;
        _this.initView();
        return _this;
    }
    AcCrossServerServantRewardViewTab2.prototype.getListType = function () {
        return 2;
    };
    Object.defineProperty(AcCrossServerServantRewardViewTab2.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantRewardViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETZREWARD), view.getrewardCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        view.height = 560;
        view.width = 520;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var Bg = BaseBitmap.create("public_9_bg32");
        Bg.width = 525;
        Bg.height = 350;
        view.setLayoutPosition(LayoutConst.lefttop, Bg, view, [25, 55]);
        view.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, Bg.width - 10, Bg.height - 20);
        var arr = [];
        for (var i = 0; i < 2; ++i) {
            arr.push({
                type: 'zrank',
            });
        }
        var scrollList = ComponentManager.getScrollList(AcCrossServerServantRewardItem, arr, tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 10]);
        view.addChild(scrollList);
        var bottombg = BaseBitmap.create("public_9_bg32");
        bottombg.width = 526;
        bottombg.height = 97;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, Bg, [0, Bg.height + 10]);
        view.addChild(bottombg);
        var cheerId = view.api.getCheerServantId();
        var strname = LanguageManager.getlocal('crossserverNoTeam');
        if (cheerId) {
            strname = Config.ServantCfg.getServantItemById(cheerId).name;
        }
        var tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal('crossserverTeam', [strname]), 20, TextFieldConst.COLOR_WARN_GREEN);
        view.addChild(tip1Txt);
        var winTxt = LanguageManager.getlocal('crossserverNoWin');
        if (view.api.getCurpeirod() == 8) {
            winTxt = LanguageManager.getlocal(view.api.getIsWinner() ? 'atkraceFightWin' : 'atkraceFightFail');
        }
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal('crossserverTeamWin', [winTxt]), 20, TextFieldConst.COLOR_WARN_GREEN);
        view.addChild(tip2Txt);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tip1Txt, bottombg, [0, (bottombg.height - tip2Txt.textHeight * 2 - 10) / 2]);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, tip1Txt, [0, tip1Txt.textHeight + 10]);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'DragonBoatDayLq', view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rewardBtn, bottombg, [0, -80]);
        view.addChild(rewardBtn);
        rewardBtn.visible = !view.api.getIsLqZreward();
        view._rewardBtn = rewardBtn;
        rewardBtn.setGray(view.api.getCurpeirod() < 8);
        view._collectFlag = BaseBitmap.create("collectflag");
        view._collectFlag.anchorOffsetX = view._collectFlag.width / 2;
        view._collectFlag.anchorOffsetY = view._collectFlag.height / 2;
        view._collectFlag.setScale(0.75);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._collectFlag, rewardBtn, [view._collectFlag.anchorOffsetX, view._collectFlag.anchorOffsetY - 10]);
        view._collectFlag.visible = view.api.getIsLqZreward();
        view.addChild(view._collectFlag);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        view.addChild(public_dot1);
        ;
        public_dot1.x = rewardBtn.x + rewardBtn.width - 20;
        public_dot1.y = rewardBtn.y;
        view.public_dot1 = public_dot1;
        view.update();
    };
    AcCrossServerServantRewardViewTab2.prototype.rewardClick = function () {
        var view = this;
        if (view.api.getCurpeirod() < 8) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
            return;
        }
        else {
            if (Number(view.api.vo.sid)) {
                NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETZREWARD, {
                    activeId: view.api.vo.aidAndCode,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip8"));
                return;
            }
        }
    };
    AcCrossServerServantRewardViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = view.vo.getpublicRedhot2();
        }
    };
    AcCrossServerServantRewardViewTab2.prototype.getrewardCallback = function (evt) {
        var view = this;
        view.api.initData(evt.data.data.data);
        var rdata = evt.data.data;
        if (rdata.ret != 0) {
            return;
        }
        view._rewardBtn.visible = false;
        var rewards = rdata.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = this._rewardBtn.localToGlobal(this._rewardBtn.width / 2, this._rewardBtn.height / 2);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        view.createCollectFlag();
        view._collectFlag.setScale(1.0);
        view._collectFlag.visible = false;
        view._collectFlag.setScale(1.3);
        view._collectFlag.visible = true;
        egret.Tween.get(view._collectFlag, { loop: false }).to({ scaleX: 0.75, scaleY: 0.75 }, 300);
    };
    AcCrossServerServantRewardViewTab2.prototype.createCollectFlag = function () {
        var view = this;
        view._collectFlag = BaseBitmap.create("collectflag");
        view._collectFlag.anchorOffsetX = view._collectFlag.width / 2;
        view._collectFlag.anchorOffsetY = view._collectFlag.height / 2;
        view._collectFlag.setScale(0.75);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._collectFlag, view._rewardBtn, [view._collectFlag.anchorOffsetX, view._collectFlag.anchorOffsetY - 10]);
        view.addChild(view._collectFlag);
    };
    AcCrossServerServantRewardViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETZREWARD), view.getrewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantRewardViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerServantRewardViewTab2.prototype, "AcCrossServerServantRewardViewTab2");
//# sourceMappingURL=AcCrossServerServantRewardViewTab2.js.map