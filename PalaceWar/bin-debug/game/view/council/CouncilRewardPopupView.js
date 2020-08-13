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
 * 奖励弹窗
 * author qianjun
 */
var CouncilRewardPopupView = (function (_super) {
    __extends(CouncilRewardPopupView, _super);
    function CouncilRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CouncilRewardPopupView.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilRewardPopupView.prototype.getBgName = function () {
        return null;
    };
    CouncilRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    CouncilRewardPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    CouncilRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    CouncilRewardPopupView.prototype.initView = function () {
        var view = this;
        var data = this.param.data;
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 250;
        if (PlatformManager.checkIsEnLang()) {
            bottomBg.height = 300;
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottomBg, view);
        view.addChild(bottomBg);
        var titlePic = BaseBitmap.create("discusssuccess");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titlePic, bottomBg, [0, -titlePic.height / 2]);
        view.addChild(titlePic);
        var tip1 = BaseBitmap.create("discusstip1");
        var tip2 = BaseBitmap.create("discusstip2");
        var eventNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussViewEventName" + data.eventId + "_" + data.randevent), 20);
        var rankTxt = ComponentManager.getTextField(data.rank, 20);
        var rectWidth = (bottomBg.width - (tip1.width + tip2.width + eventNameTxt.textWidth + 10 + 10)) / 2;
        view.setLayoutPosition(LayoutConst.lefttop, tip1, bottomBg, [rectWidth, 60]);
        view.addChild(tip1);
        view.setLayoutPosition(LayoutConst.lefttop, eventNameTxt, tip1, [tip1.width + 10, 3]);
        view.addChild(eventNameTxt);
        view.setLayoutPosition(LayoutConst.lefttop, tip2, eventNameTxt, [eventNameTxt.textWidth + 10, -3]);
        view.addChild(tip2);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, tip2);
        view.addChild(rankTxt);
        if (PlatformManager.checkIsTextHorizontal()) {
            rankTxt.x = tip2.x + tip2.width;
        }
        //{"exp":"5_1_1500","eventst":1534219200,"servantData":{"1001":"14_1_1500"},"eventId":"2"}   
        var param1Txt = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam5", [data.exp.split('_')[2]]), 20);
        view.setLayoutPosition(LayoutConst.lefttop, param1Txt, bottomBg, [100, tip1.y + tip1.height + 30 - bottomBg.y]);
        if (PlatformManager.checkIsEnLang()) {
            param1Txt.setPosition(bottomBg.x + bottomBg.width / 2 - param1Txt.width / 2, tip1.y + tip1.height + 30);
        }
        view.addChild(param1Txt);
        var count = 1;
        for (var i in data.servantData) {
            var unit = data.servantData[i];
            var servantInfo = Config.ServantCfg.getServantItemById(i);
            var paramTxt = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam6", [servantInfo.name, unit.split('_')[2]]), 20);
            if (PlatformManager.checkIsThSp()) {
                view.setLayoutPosition(count % 2 ? LayoutConst.righttop : LayoutConst.lefttop, paramTxt, bottomBg, [50, tip1.y - bottomBg.y + tip1.height + 30 + 25 * (Math.floor(count / 2))]);
            }
            else if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
                paramTxt.setPosition(bottomBg.x + bottomBg.width / 2 - paramTxt.width / 2, tip1.y + tip1.height + 30 + 25 * (Math.floor(count)));
            }
            else {
                view.setLayoutPosition(count % 2 ? LayoutConst.righttop : LayoutConst.lefttop, paramTxt, bottomBg, [100, tip1.y - bottomBg.y + tip1.height + 30 + 25 * (Math.floor(count / 2))]);
            }
            view.addChild(paramTxt);
            ++count;
        }
        view.addTouchTap(view.hide, view, null);
        // egret.Tween.get(view).wait(2000).to({alpha : 0}, 2000).call(()=>{
        // 	view.hide();
        // },view);
    };
    CouncilRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'public_9_wordbg2'
        ]);
    };
    CouncilRewardPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        var view = this;
        if (view.param.data.confirmcallback) {
            view.param.data.confirmcallback.apply(view.param.data.callobj);
        }
    };
    CouncilRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CouncilRewardPopupView;
}(CommonView));
__reflect(CouncilRewardPopupView.prototype, "CouncilRewardPopupView");
//# sourceMappingURL=CouncilRewardPopupView.js.map