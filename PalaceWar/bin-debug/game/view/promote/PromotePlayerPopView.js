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
desc : 分封弹窗
*/
var PromotePlayerPopView = (function (_super) {
    __extends(PromotePlayerPopView, _super);
    function PromotePlayerPopView() {
        var _this = _super.call(this) || this;
        _this.promoteType = 1;
        return _this;
    }
    Object.defineProperty(PromotePlayerPopView.prototype, "api", {
        get: function () {
            return Api.promoteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromotePlayerPopView.prototype, "cfg", {
        get: function () {
            return Config.PromoteCfg;
        },
        enumerable: true,
        configurable: true
    });
    PromotePlayerPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "promotetopbg", "servant_bottombg", "emprankinglist_line", "atkraceVisitbg", "atkracevipbg"
        ]);
    };
    PromotePlayerPopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_APPOINT), view.appointCallBack, view);
        var type = this.param.data.type;
        view.promoteType = type;
        //top背景图
        var _topBg = BaseBitmap.create('promotetopbg');
        _topBg.name = "_topBg";
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0, view.titleBg.height]);
        view.addChild(_topBg);
        var DesctText = ComponentManager.getTextField(LanguageManager.getlocal('PromotePlayersPopViewText', [LanguageManager.getlocal("promoteType" + type), LanguageManager.getlocal("promoteType" + type + "eff")]), 22);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, DesctText, _topBg, [0, 50]);
        DesctText.lineSpacing = 5;
        DesctText.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(DesctText);
        //targroup
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, _topBg, [0, _topBg.height + 4]);
        var tarGroupBg = BaseBitmap.create('servant_bottombg');
        tarGroupBg.width = view.width;
        tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0, _topBg.height]);
        view.addChild(tarGroupBg);
        view.swapChildren(view.tabbarGroup, tarGroupBg);
        view.container.width = tarGroupBg.width;
        view.container.height = tarGroupBg.height;
        view.setLayoutPosition(LayoutConst.lefttop, view.container, view.tabbarGroup, [0, view.tabbarGroup.height]);
    };
    PromotePlayerPopView.prototype.getTabbarTextArr = function () {
        return [
            "PromotePlayersPopViewTar1",
            "PromotePlayersPopViewTar2",
            "PromotePlayersPopViewTar3",
            "PromotePlayersPopViewTar4",
        ];
    };
    PromotePlayerPopView.prototype.appointCallBack = function (evt) {
        if (!evt || !evt.data) {
            return;
        }
        var view = this;
        var data = evt.data.data;
        if (data.ret < 0) {
            if (data.ret == -3) {
                App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewAppointFail', [LanguageManager.getlocal("officialTitle" + view.cfg.needLv)]));
            }
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewAppointSuccess'));
        view.api.initListData(data.data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PROMOTE_SUCCESS);
        view.hide();
    };
    PromotePlayerPopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_APPOINT), view.appointCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return PromotePlayerPopView;
}(CommonView));
__reflect(PromotePlayerPopView.prototype, "PromotePlayerPopView");
//# sourceMappingURL=PromotePlayerPopView.js.map