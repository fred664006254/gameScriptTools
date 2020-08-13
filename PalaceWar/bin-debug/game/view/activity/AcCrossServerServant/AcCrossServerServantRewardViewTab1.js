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
var AcCrossServerServantRewardViewTab1 = (function (_super) {
    __extends(AcCrossServerServantRewardViewTab1, _super);
    function AcCrossServerServantRewardViewTab1() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this._collectFlag = null;
        _this._rewardBtn = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerServantRewardViewTab1.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantRewardViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerServantRewardViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 560;
        view.width = 520;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD), view.getrewardCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var Bg = BaseBitmap.create("public_9_bg32");
        Bg.width = 525;
        Bg.height = 483;
        view.setLayoutPosition(LayoutConst.lefttop, Bg, view, [25, 55]);
        view.addChild(Bg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossServerServantTip1'), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, 10]);
        view.addChild(tipTxt);
        var tmpRect = new egret.Rectangle(0, 0, Bg.width - 10, Bg.height - tipTxt.textHeight - 20);
        var arr = [];
        var ranklist = view.api.cfg.rankList;
        for (var i in ranklist) {
            arr.push({
                type: 'prank',
                rewards: ranklist[i],
            });
        }
        var scrollList = ComponentManager.getScrollList(AcCrossServerServantRewardItem, arr, tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChild(scrollList);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'rankViewTitle', view.rankClick, view);
        view.setLayoutPosition(LayoutConst.leftbottom, rankBtn, Bg, [40, -80]);
        view.addChild(rankBtn);
        rankBtn.setGray(view.api.getCurpeirod() < 8);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'DragonBoatDayLq', view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.rightbottom, rewardBtn, Bg, [40, -80]);
        view.addChild(rewardBtn);
        rewardBtn.setGray(view.api.getCurpeirod() < 8);
        rewardBtn.visible = !view.api.getIsLqPreward();
        view._rewardBtn = rewardBtn;
        view._collectFlag = BaseBitmap.create("collectflag");
        view._collectFlag.anchorOffsetX = view._collectFlag.width / 2;
        view._collectFlag.anchorOffsetY = view._collectFlag.height / 2;
        view._collectFlag.setScale(0.75);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._collectFlag, rewardBtn, [view._collectFlag.anchorOffsetX, view._collectFlag.anchorOffsetY - 10]);
        view._collectFlag.visible = view.api.getIsLqPreward();
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
    AcCrossServerServantRewardViewTab1.prototype.rankClick = function () {
        var view = this;
        if (view.api.getCurpeirod() < 8) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerServantRewardViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = view.vo.getpublicRedhot1();
        }
    };
    AcCrossServerServantRewardViewTab1.prototype.rewardClick = function () {
        var view = this;
        if (view.api.getCurpeirod() < 8) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
            return;
        }
        else {
            if (view.api.getIsWinner()) {
                NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD, {
                    activeId: view.api.vo.aidAndCode,
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
                return;
            }
        }
    };
    AcCrossServerServantRewardViewTab1.prototype.createCollectFlag = function () {
        var view = this;
        view._collectFlag = BaseBitmap.create("collectflag");
        view._collectFlag.anchorOffsetX = view._collectFlag.width / 2;
        view._collectFlag.anchorOffsetY = view._collectFlag.height / 2;
        view._collectFlag.setScale(0.75);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._collectFlag, view._rewardBtn, [view._collectFlag.anchorOffsetX, view._collectFlag.anchorOffsetY - 10]);
        view.addChild(view._collectFlag);
    };
    AcCrossServerServantRewardViewTab1.prototype.getrewardCallback = function (evt) {
        var view = this;
        var rdata = evt.data.data;
        if (rdata.ret != 0) {
            return;
        }
        view._rewardBtn.visible = false;
        view.api.initData(evt.data.data.data);
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
    AcCrossServerServantRewardViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD), view.getrewardCallback, view);
        view._collectFlag = null;
        view.public_dot1 = null;
        view._rewardBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantRewardViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerServantRewardViewTab1.prototype, "AcCrossServerServantRewardViewTab1");
//# sourceMappingURL=AcCrossServerServantRewardViewTab1.js.map