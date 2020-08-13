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
var DailybossView = (function (_super) {
    __extends(DailybossView, _super);
    function DailybossView() {
        var _this = _super.call(this) || this;
        _this._lastStatus = 0;
        return _this;
    }
    DailybossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailyboss_enter",
            "dailybosslastattacktitle_di",
            "wifeview_wenzibg2",
            "punish_rank_icon",
            "punish_rank_name",
            "punish_ex_icon",
            "punish_ex_name"
        ]);
    };
    DailybossView.prototype.initView = function () {
        this.container.y = this.getTitleButtomY();
        this._bg = BaseLoadBitmap.create("dailybossbg");
        this._bg.y = (GameConfig.stageHeigth - 1136);
        this.addChildToContainer(this._bg);
        this._gate = BaseLoadBitmap.create("dailybossbg_gate");
        this._gate.x = (GameConfig.stageWidth - 338) / 2 - 3;
        this._gate.y = this._bg.y + 636; //-this.container.y+(GameConfig.stageHeigth-352) -21 ;
        this.addChildToContainer(this._gate);
        this._gate.visible = false;
        var titleW = 230; //463;//368;
        var titleH = 65; //91;//68;
        var title = BaseLoadBitmap.create("dailybosstitle" + Api.dailybossVoApi.getBossType());
        title.setPosition((GameConfig.stageWidth - titleW) / 2, 20);
        this.addChildToContainer(title);
        var timeBg = BaseBitmap.create("wifeview_wenzibg2");
        timeBg.width = 428;
        timeBg.x = title.x + (titleW - timeBg.width) / 2;
        timeBg.y = title.y + titleH + 3;
        this.addChildToContainer(timeBg);
        var timeTxt = ComponentManager.getTextField(this.getStatusStr(), TextFieldConst.FONTSIZE_TITLE_SMALL);
        timeTxt.width = timeBg.width;
        timeTxt.textAlign = egret.HorizontalAlign.CENTER;
        timeTxt.setPosition(timeBg.x + (timeBg.width - timeTxt.width) / 2, timeBg.y + (timeBg.height - timeTxt.height) / 2);
        this.addChildToContainer(timeTxt);
        // timeTxt.visible=false;
        this._leftTimeTxt = timeTxt;
        var buttomBg = BaseBitmap.create("public_bottombg1");
        // buttomBg.width=GameConfig.stageWidth;
        buttomBg.height = 95;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        this.addChildToContainer(buttomBg);
        var buttomTxt = ComponentManager.getTextField(Api.dailybossVoApi.getBossLocalTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTxt.lineSpacing = 12;
        buttomTxt.setPosition(buttomBg.x + 20, buttomBg.y + (buttomBg.height - buttomTxt.height) / 2);
        this.addChildToContainer(buttomTxt);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankBtn = ComponentManager.getButton("punish_rank_icon", "", this.showRankView, this);
            // rankBtn.setPosition(20,buttomBg.y-rankBtn.height- 30);
            rankBtn.x = 20;
            rankBtn.y = buttomBg.y - rankBtn.height;
            this.addChildToContainer(rankBtn);
            var rankTxtIcon = BaseBitmap.create("punish_rank_name");
            rankTxtIcon.x = rankBtn.x + rankBtn.width / 2 - rankTxtIcon.width / 2;
            rankTxtIcon.y = buttomBg.y - rankTxtIcon.height;
            this.addChildToContainer(rankTxtIcon);
        }
        var scoreBtn = ComponentManager.getButton("punish_ex_icon", "", this.showScoreView, this);
        scoreBtn.setPosition(GameConfig.stageWidth - scoreBtn.width - 20, buttomBg.y - scoreBtn.height);
        this.addChildToContainer(scoreBtn);
        var scoreTxtIcon = BaseBitmap.create("punish_ex_name");
        scoreTxtIcon.x = scoreBtn.x + scoreBtn.width / 2 - scoreTxtIcon.width / 2;
        scoreTxtIcon.y = buttomBg.y - scoreTxtIcon.height;
        this.addChildToContainer(scoreTxtIcon);
        this.tick();
        this.checkShowLastRankRewardView();
    };
    DailybossView.prototype.checkShowLastRankRewardView = function () {
        if (this._lastReward) {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKREWARDPOPUPVIEW, this._lastReward);
            this._lastReward = null;
        }
    };
    DailybossView.prototype.getStatusStr = function () {
        var statusStr = "";
        var status = Api.dailybossVoApi.getStatus();
        if (status == 0) {
            statusStr = LanguageManager.getlocal("dailybossLeftTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossVoApi.getNextStartLeftTime(), 1)]);
        }
        else if (status == 1) {
            if (Api.dailybossVoApi.getBossType() == 2 && this._bossData.isDead) {
                statusStr = LanguageManager.getlocal("dailybossEndWithKilled", [this._bossData.killName]);
            }
            else {
                statusStr = LanguageManager.getlocal("dailybossTypeComeOnDesc", [LanguageManager.getlocal("dailybossTitle" + Api.dailybossVoApi.getBossType())]);
            }
        }
        else {
            if (this._bossData.killName) {
                statusStr = LanguageManager.getlocal("dailybossKilled", [this._bossData.killName]);
            }
            else {
                statusStr = LanguageManager.getlocal("dailybossUnkilled");
            }
        }
        return statusStr;
    };
    DailybossView.prototype.showRankView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKPOPUPVIEW, this._bossData);
    };
    DailybossView.prototype.showScoreView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSSCROEPOPUPVIEW);
    };
    DailybossView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DAILYBOSS_GET, requestData: {} };
    };
    DailybossView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data) {
                if (data.data.data.bossData) {
                    this._bossData = data.data.data.bossData;
                }
                if (data.data.data.lastReward) {
                    this._lastReward = data.data.data.lastReward;
                }
            }
        }
    };
    DailybossView.prototype.tick = function () {
        if (this._leftTimeTxt) {
            this._leftTimeTxt.text = this.getStatusStr();
        }
        //0开始状态,1开始,2结束等待下一轮
        var status = Api.dailybossVoApi.getStatus();
        if (status == 1) {
            if (!this._enterBtn) {
                this._enterBtn = ComponentManager.getButton("dailyboss_enter", "", this.enterBattle, this, null, 1);
                this._enterBtn.setPosition((GameConfig.stageWidth) / 2, -this.container.y + (GameConfig.stageHeigth - 540));
                this._enterBtn.anchorOffsetX = this._enterBtn.width / 2;
                this._enterBtn.anchorOffsetY = this._enterBtn.height / 2;
                this.addChildToContainer(this._enterBtn);
                egret.Tween.get(this._enterBtn, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 600).to({ scaleX: 1, scaleY: 1 }, 600);
                this._gate.visible = true;
            }
        }
        else {
            if (this._enterBtn) {
                this._enterBtn.dispose();
                this._enterBtn = null;
            }
            this._gate.visible = false;
        }
        this._lastStatus = status;
    };
    DailybossView.prototype.enterBattle = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.DAILYBOSSBATTLEVIEW);
    };
    DailybossView.prototype.getTitleStr = function () {
        return "dailybossTitle";
    };
    DailybossView.prototype.dispose = function () {
        this._bossData = null;
        this._enterBtn = null;
        this._bg = null;
        this._leftTimeTxt = null;
        this._gate = null;
        this._lastReward = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossView;
}(CommonView));
__reflect(DailybossView.prototype, "DailybossView");
