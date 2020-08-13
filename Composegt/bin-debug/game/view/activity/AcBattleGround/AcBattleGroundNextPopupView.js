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
var AcBattleGroundNextPopupView = (function (_super) {
    __extends(AcBattleGroundNextPopupView, _super);
    function AcBattleGroundNextPopupView() {
        return _super.call(this) || this;
    }
    AcBattleGroundNextPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battleground_over1",
            "battleground_over2",
        ]);
    };
    Object.defineProperty(AcBattleGroundNextPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundNextPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundNextPopupView.prototype.initView = function () {
        var curRound = this.vo.getCurRound();
        if (curRound <= 1) {
            this.hide();
            return;
        }
        var over2 = BaseBitmap.create("battleground_over2");
        over2.x = GameConfig.stageWidth / 2 - over2.width / 2;
        over2.y = this.viewBg.y - 82;
        this.addChildToContainer(over2);
        var over1 = BaseBitmap.create("battleground_over1");
        over1.x = GameConfig.stageWidth / 2 - over1.width / 2;
        over1.y = this.viewBg.y - 82;
        this.addChildToContainer(over1);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.x = GameConfig.stageWidth / 2 - confirmBtn.width / 2;
        confirmBtn.y = this.viewBg.y + this.viewBg.height + 30;
        this.addChildToContainer(confirmBtn);
        var title = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinTitle", [String(curRound - 1)]), 40, TextFieldConst.COLOR_LIGHT_YELLOW);
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = this.viewBg.y - 120;
        this.addChildToContainer(title);
        var lastBtmLine = this.cfg.weedOut[curRound - 2].btmLine;
        var detail = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinDetail", [String(lastBtmLine)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        detail.x = GameConfig.stageWidth / 2 - detail.width / 2;
        detail.y = this.viewBg.y + 80;
        this.addChildToContainer(detail);
        var rank = this.vo.getMyRank();
        var score = this.vo.getMyScore();
        // let rankText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinRank",[String(rank)]),22,0xf4d638);
        // rankText.x = GameConfig.stageWidth/2 - 15 - rankText.width;
        // rankText.y = detail.y + detail.height + 15;
        // this.addChildToContainer(rankText);
        // let scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundWinScore",[String(score)]),22,0xf4d638);
        // scoreText.x = GameConfig.stageWidth/2 + 15;
        // scoreText.y = rankText.y;
        // this.addChildToContainer(scoreText);
        var statusText = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (this.vo.getJoinIn()) {
            statusText.text = LanguageManager.getlocal("acBattleGroundWinStatueSucc");
        }
        else {
            statusText.text = LanguageManager.getlocal("acBattleGroundWinStatueFail");
        }
        statusText.x = GameConfig.stageWidth / 2 - statusText.width / 2;
        statusText.y = detail.y + detail.height + 25;
        this.addChildToContainer(statusText);
    };
    AcBattleGroundNextPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcBattleGroundNextPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcBattleGroundNextPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    AcBattleGroundNextPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcBattleGroundNextPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcBattleGroundNextPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundNextPopupView;
}(PopupView));
__reflect(AcBattleGroundNextPopupView.prototype, "AcBattleGroundNextPopupView");
