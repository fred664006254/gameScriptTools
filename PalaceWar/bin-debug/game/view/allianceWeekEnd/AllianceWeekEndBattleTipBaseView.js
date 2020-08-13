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
  * 勤王除恶--战斗确认
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndBattleTipBaseView
  */
var AllianceWeekEndBattleTipBaseView = (function (_super) {
    __extends(AllianceWeekEndBattleTipBaseView, _super);
    function AllianceWeekEndBattleTipBaseView() {
        var _this = _super.call(this) || this;
        _this._isCheck = false;
        return _this;
    }
    AllianceWeekEndBattleTipBaseView.prototype.getCloseBtnName = function () {
        return null;
    };
    AllianceWeekEndBattleTipBaseView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AllianceWeekEndBattleTipBaseView.prototype.initView = function () {
        var _this = this;
        var cancelCalback = this.param.data.cancelCalback;
        var battleCalback = this.param.data.battleCalback;
        var upCalback = this.param.data.upCalback;
        var handle = this.param.data.handle;
        var bg = BaseBitmap.create("public_9_wordbg2"); //640 × 107
        bg.height = 280;
        bg.setPosition(0, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var title = BaseBitmap.create("allianceweekendview_battle");
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y - title.height / 2);
        this.addChildToContainer(title);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("AllianceWeekEndBattleTipBaseViewDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        desc.width = 525;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.lineSpacing = 10;
        desc.setPosition(title.x + title.width / 2 - desc.width / 2, title.y + title.height + 10);
        this.addChildToContainer(desc);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "cancelBtn", function () {
            cancelCalback.apply(handle);
            _this.closeView();
        }, this);
        cancelBtn.setPosition(desc.x, bg.y + bg.height - cancelBtn.height - 27);
        this.addChildToContainer(cancelBtn);
        var battleBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "AllianceWeekEndBattleTipBaseViewBattle", function () {
            battleCalback.apply(handle);
            _this.closeView();
        }, this);
        battleBtn.setPosition(desc.x + desc.width - battleBtn.width, cancelBtn.y);
        this.addChildToContainer(battleBtn);
        var myAllVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllVo.po < 3) {
            var upBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "AllianceWeekEndBattleTipBaseViewUpPower", function () {
                upCalback.apply(handle);
                _this.closeView();
            }, this);
            upBtn.setPosition(desc.x + desc.width / 2 - upBtn.width / 2, cancelBtn.y);
            this.addChildToContainer(upBtn);
        }
        else {
            cancelBtn.x = desc.x + desc.width / 4 - cancelBtn.width / 2;
            battleBtn.x = desc.x + desc.width / 4 * 3 - battleBtn.width / 2;
        }
        var check = BaseBitmap.create("activitypop_check1");
        check.setPosition(desc.x + 140, cancelBtn.y - check.height - 25);
        this.addChildToContainer(check);
        check.addTouchTap(function () {
            if (_this._isCheck) {
                _this._isCheck = false;
                check.setRes("activitypop_check1");
            }
            else {
                _this._isCheck = true;
                check.setRes("activitypop_check2");
            }
        }, this);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("AllianceWeekEndBattleTipBaseViewTodayNoTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        tip.setPosition(check.x + check.width + 15, check.y + check.height / 2 - tip.height / 2);
        this.addChildToContainer(tip);
    };
    AllianceWeekEndBattleTipBaseView.prototype.closeView = function () {
        if (this._isCheck) {
            var data = new Date(GameData.serverTime * 1000);
            var date = String(data.getMonth()) + String(data.getDate());
            LocalStorageManager.set(Api.playerVoApi.getPlayerID() + "allianceweekend", date);
        }
        this.hide();
    };
    AllianceWeekEndBattleTipBaseView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'public_9_wordbg2', "allianceweekendview_battle", "activitypop_check1", "activitypop_check2"
        ]);
    };
    AllianceWeekEndBattleTipBaseView.prototype.dispose = function () {
        this._isCheck = false;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndBattleTipBaseView;
}(BaseView));
__reflect(AllianceWeekEndBattleTipBaseView.prototype, "AllianceWeekEndBattleTipBaseView");
//# sourceMappingURL=AllianceWeekEndBattleTipBaseView.js.map