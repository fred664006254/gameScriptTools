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
/**
* 席位抢夺战斗结果
* date 2020.
* author ycg
* @name SixSection1SeatBattleResultView
*/
var SixSection1SeatBattleResultView = /** @class */ (function (_super) {
    __extends(SixSection1SeatBattleResultView, _super);
    function SixSection1SeatBattleResultView() {
        return _super.call(this) || this;
    }
    SixSection1SeatBattleResultView.prototype.getBgName = function () {
        return "";
    };
    SixSection1SeatBattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1SeatBattleResultView.prototype.getTitleBgName = function () {
        return "";
    };
    SixSection1SeatBattleResultView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    SixSection1SeatBattleResultView.prototype.getRuleInfo = function () {
        return "";
    };
    SixSection1SeatBattleResultView.prototype.getProbablyInfo = function () {
        return "";
    };
    SixSection1SeatBattleResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    SixSection1SeatBattleResultView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat().concat(list);
    };
    SixSection1SeatBattleResultView.prototype.initView = function () {
        var _this = this;
        var bg = BaseBitmap.create("public_9_wordbg");
        bg.touchEnabled = true;
        bg.width = GameConfig.stageWidth;
        bg.height = 230;
        this.addChildToContainer(bg);
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        var win = this.param.data.winflag;
        var titleBgImg = "sixsection1_battlewintxt";
        if (win == 2) {
            titleBgImg = "sixsection1_battlelosetxt";
        }
        var titleBg = BaseBitmap.create(titleBgImg);
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y - titleBg.height / 2);
        this.addChildToContainer(titleBg);
        //成功失败提示
        App.LogUtil.log("buildName " + this.param.data.index);
        var buildName = LanguageManager.getlocal("sixSection1BuildName" + (this.param.data.index + 1));
        var successTipStr = LanguageManager.getlocal("sixSection1HoldSeatBattlefailTip", [buildName]);
        if (win == 1) {
            successTipStr = LanguageManager.getlocal("sixSection1HoldSeatBattleSuccessTip", [buildName, "" + this.param.data.point]);
        }
        var successTip = ComponentManager.getTextField(successTipStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        successTip.width = bg.width - 20;
        successTip.anchorOffsetX = successTip.width / 2;
        successTip.textAlign = TextFieldConst.ALIGH_CENTER;
        successTip.setPosition(bg.x + bg.width / 2, bg.y + 60);
        successTip.lineSpacing = 7;
        this.addChildToContainer(successTip);
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", function () {
            if (_this.param.data.f) {
                _this.param.data.f.apply(_this.param.data.o);
            }
            _this.hide();
        }, this);
        enterBtn.setPosition(bg.x + bg.width / 2 - enterBtn.width / 2, bg.y + bg.height - enterBtn.height - 25);
        this.addChildToContainer(enterBtn);
    };
    SixSection1SeatBattleResultView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatBattleResultView;
}(CommonView));
//# sourceMappingURL=SixSection1SeatBattleResultView.js.map