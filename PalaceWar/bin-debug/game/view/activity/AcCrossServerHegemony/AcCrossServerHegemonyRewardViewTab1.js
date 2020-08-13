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
//
var AcCrossServerHegemonyRewardViewTab1 = /** @class */ (function (_super) {
    __extends(AcCrossServerHegemonyRewardViewTab1, _super);
    function AcCrossServerHegemonyRewardViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._listBtn = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRewardViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerHegemonyRewardViewTab1.prototype.initView = function () {
        var detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 620;
        detailBg.height = 115;
        detailBg.x = GameConfig.stageWidth / 2 - detailBg.width / 2;
        detailBg.y = GameConfig.stageHeigth - 89 - 60 - detailBg.height - 10;
        var list = this.cfg.getQualifyingRewardList();
        var rect = new egret.Rectangle(0, 0, 610, GameConfig.stageHeigth - 89 - 60 - 60 - detailBg.height + 35 - 84);
        var scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyRewardScrollItem1, list, rect);
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2; //bottomBg.x;
        scrollList.y = 10;
        this.addChild(scrollList);
        this.addChild(detailBg);
        var tip = null;
        if (this.vo.isCanJoin()) {
            tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip1"), 22, TextFieldConst.COLOR_WARN_GREEN);
        }
        else {
            if (this.vo.isHasAlliance()) {
                tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip2"), 22, 0xbe4545);
            }
            else {
                tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip3"), 22, 0xbe4545);
            }
        }
        tip.textAlign = egret.HorizontalAlign.CENTER;
        tip.lineSpacing = 3;
        tip.x = detailBg.x + 150 - tip.width / 2;
        tip.y = detailBg.y + detailBg.height / 2 - tip.height / 2;
        this.addChild(tip);
        var listBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acCrossServerHegemonyRewardListBtn2", this.listBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        listBtn.x = detailBg.x + detailBg.width - listBtn.width - 10;
        listBtn.y = detailBg.y + detailBg.height / 2 - listBtn.height / 2;
        this.addChild(listBtn);
        this._listBtn = listBtn;
        if (this.vo.getEndTimeByMatchId(24, 3) <= GameData.serverTime) {
            listBtn.setGray(false);
        }
        else {
            listBtn.setGray(true);
        }
        //tip
        var tipBg = BaseBitmap.create("public_9_bg98");
        tipBg.width = GameConfig.stageWidth - 20;
        tipBg.setPosition(GameConfig.stageWidth / 2 - tipBg.width / 2, detailBg.y - tipBg.height);
        this.addChild(tipBg);
        var rewardTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        rewardTip.width = tipBg.width - 60;
        rewardTip.lineSpacing = 5;
        rewardTip.setPosition(tipBg.x + tipBg.width / 2 - rewardTip.width / 2, tipBg.y + tipBg.height / 2 - rewardTip.height / 2);
        this.addChild(rewardTip);
    };
    AcCrossServerHegemonyRewardViewTab1.prototype.listBtnClick = function () {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this.vo.getEndTimeByMatchId(24, 3) > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRewardJJNotInRank"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYRANKLISTPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
            type: 2
        });
    };
    AcCrossServerHegemonyRewardViewTab1.prototype.tick = function () {
        if (this._listBtn) {
            if (this.vo.getEndTimeByMatchId(24, 3) <= GameData.serverTime) {
                this._listBtn.setGray(false);
            }
            else {
                this._listBtn.setGray(true);
            }
        }
    };
    AcCrossServerHegemonyRewardViewTab1.prototype.dispose = function () {
        this._listBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRewardViewTab1;
}(CommonViewTab));
//# sourceMappingURL=AcCrossServerHegemonyRewardViewTab1.js.map