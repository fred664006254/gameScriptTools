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
var ActrackCrossMoreItem = /** @class */ (function (_super) {
    __extends(ActrackCrossMoreItem, _super);
    function ActrackCrossMoreItem() {
        var _this = _super.call(this) || this;
        _this.zid = 0;
        return _this;
    }
    ActrackCrossMoreItem.prototype.initItem = function (index, data, itemParam) {
        this.zid = data.info.zid;
        _super.prototype.initItem.call(this, index, data, itemParam);
    };
    /**
     * 是否是跨服
     */
    ActrackCrossMoreItem.prototype.checkIsCross = function () {
        return true;
    };
    Object.defineProperty(ActrackCrossMoreItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        },
        enumerable: true,
        configurable: true
    });
    //挑战
    ActrackCrossMoreItem.prototype.challengBtnHandler = function (evt) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        if (GameData.serverTime > crossVo.et - 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.atkracecrossVoApi.isCanJoin == false) {
            var crossVo_1 = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
            var key = App.CommonUtil.getCrossLeagueCn("atkraceNoDes", crossVo_1.isCrossLeague());
            if (this.vo.checkIsFengyun()) {
                key = "atkraceNoDes_fengyun";
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(key));
            return;
        }
        var data = [];
        data.type = 1; //挑战
        data.uid = this.data.uid;
        data.zid = this.zid;
        AtkraceCrossChallengeItem.data = data;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
    };
    ActrackCrossMoreItem.prototype.dispose = function () {
        this.zid = 0;
        _super.prototype.dispose.call(this);
    };
    return ActrackCrossMoreItem;
}(AtkLogScrollItem));
//# sourceMappingURL=ActrackCrossMoreItem.js.map