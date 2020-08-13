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
 * 议事事件item
 * author qianjun
 * date 2017/10/12
 */
var CouncilEventRoleItem = (function (_super) {
    __extends(CouncilEventRoleItem, _super);
    function CouncilEventRoleItem() {
        var _this = _super.call(this) || this;
        _this._joinBg = null;
        _this._joinBtn = null;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(CouncilEventRoleItem.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilEventRoleItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 139 + 110;
        view.height = 310;
        view._data = data;
        var joinBg = BaseBitmap.create("discussseat");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, joinBg, view, [0, 20]);
        view.addChild(joinBg);
        view._joinBg = joinBg;
        if (data.name) {
            var role = BaseBitmap.create("discussplayerrole");
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view, [0, -35], true);
            view.addChild(role);
            var nameBg = BaseBitmap.create("public_9_bg12");
            nameBg.width = 120;
            nameBg.height = 30;
            view.addChild(nameBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0, 35]);
            var nameTxt = ComponentManager.getTextField(data.name, 20);
            view.addChild(nameTxt);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            }
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
        }
        else {
            joinBg.addTouchTap(view.joinBtnHandler, view);
            var joinBtn = BaseBitmap.create("studyatk_arrow");
            joinBtn.addTouchTap(view.joinBtnHandler, view);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, joinBtn, joinBg, [0, 60]);
            var tarY = joinBtn.y;
            egret.Tween.get(joinBtn, { loop: true }).to({ y: tarY - 50 }, 1000).wait(200).to({ y: tarY }, 1000);
            view.addChild(joinBtn);
            view._joinBtn = joinBtn;
        }
    };
    CouncilEventRoleItem.prototype.refreshRole = function (data) {
        var view = this;
        if (view._joinBg) {
            view._joinBg.removeTouchTap();
        }
        if (view._joinBtn) {
            view._joinBtn.removeTouchTap();
            view.removeChild(view._joinBtn);
            egret.Tween.removeTweens(view._joinBtn);
            view._joinBtn = null;
        }
        var role = BaseBitmap.create("discussplayerrole");
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view, [0, -35], true);
        view.addChild(role);
        var nameBg = BaseBitmap.create("public_9_bg12");
        nameBg.width = 120;
        nameBg.height = 30;
        view.addChild(nameBg);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0, 35]);
        var nameTxt = ComponentManager.getTextField(data.name, 20);
        view.addChild(nameTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
    };
    CouncilEventRoleItem.prototype.joinBtnHandler = function () {
        var view = this;
        if (Api.switchVoApi.checkOpenServerMaintain()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        if (view.api.isVisitEvent(view._data.eventId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewHaveVisit"));
            return;
        }
        if (view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewNumEnough"));
            return;
        }
        if (view.api.getCurpeirod() != 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewEventTimePass"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILSELECTSERVANTVIEW, view._data);
    };
    CouncilEventRoleItem.prototype.getSpaceX = function () {
        return 220;
    };
    CouncilEventRoleItem.prototype.getSpaceY = function () {
        return 10;
    };
    CouncilEventRoleItem.prototype.dispose = function () {
        var view = this;
        if (view._joinBg) {
            view._joinBg.removeTouchTap();
            view._joinBg = null;
        }
        if (view._joinBtn) {
            view._joinBtn.removeTouchTap();
            egret.Tween.removeTweens(view._joinBtn);
            view._joinBtn = null;
        }
        _super.prototype.dispose.call(this);
    };
    return CouncilEventRoleItem;
}(BaseDisplayObjectContainer));
__reflect(CouncilEventRoleItem.prototype, "CouncilEventRoleItem");
//# sourceMappingURL=CouncilEventRoleItem.js.map