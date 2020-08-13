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
/**
 * 赌坊领取奖励
 * author qianjun
 */
var AcGambleGetRewardPopupView = (function (_super) {
    __extends(AcGambleGetRewardPopupView, _super);
    // 滑动列表
    function AcGambleGetRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcGambleGetRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGambleGetRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGambleGetRewardPopupView.prototype.initView = function () {
        var view = this;
        var code = view.param.data.code;
        var contentBg = BaseBitmap.create("public_9_bg4");
        contentBg.width = 545;
        // contentBg.height = 440;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleGetRewardTip1-" + code), 24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTxt, contentBg, [0, 20]);
        view.addChildToContainer(titleTxt);
        var rewardInfo = view.vo.getRewardInfo();
        if (rewardInfo) {
            var prevRound = rewardInfo.round;
            var gem = view.vo.getMyGem();
            var gemNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleGetRewardTip2-" + code, [gem.toString()]), 22, TextFieldConst.COLOR_QUALITY_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, gemNumTxt, titleTxt, [0, titleTxt.textHeight + 15]);
            view.addChildToContainer(gemNumTxt);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleGetRewardTip3-" + code), 22);
            view.addChildToContainer(tipTxt);
            if (prevRound == 3) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, gemNumTxt, [0, gemNumTxt.textHeight + 15]);
            }
            else {
                var nextGem = view.vo.getThisRoundGem() * App.MathUtil.strip(view.cfg.gambPrize[prevRound + 1].stop.prize - 1);
                var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleGetRewardTip4-" + code, [String(TextFieldConst.COLOR_QUALITY_YELLOW), nextGem.toString()]), 22);
                view.addChildToContainer(tip2Txt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, gemNumTxt, [0, gemNumTxt.textHeight + 15]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, tip2Txt, [0, tip2Txt.textHeight + 15]);
            }
            contentBg.height = tipTxt.y - contentBg.y + tipTxt.textHeight + 20;
            var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'confirmBtn', function () {
                //领取消息
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_GAMBLEGETWINREWARD, {
                    "activeId": view.acTivityId,
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, confirmBtn, contentBg, [50, contentBg.height + 10]);
            view.addChildToContainer(confirmBtn);
            var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, 'cancelBtn', function () {
                view.hide();
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelBtn, contentBg, [50, contentBg.height + 10]);
            view.addChildToContainer(cancelBtn);
        }
    };
    AcGambleGetRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcGambleGetRewardPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    AcGambleGetRewardPopupView.prototype.getShowHeight = function () {
        return 380;
    };
    AcGambleGetRewardPopupView.prototype.getShowWidth = function () {
        return 590;
    };
    Object.defineProperty(AcGambleGetRewardPopupView.prototype, "acTivityId", {
        /**
         * 获取活动配置
         */
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGambleGetRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcGambleGetRewardPopupView;
}(PopupView));
__reflect(AcGambleGetRewardPopupView.prototype, "AcGambleGetRewardPopupView");
//# sourceMappingURL=AcGambleGetRewardPopupView.js.map