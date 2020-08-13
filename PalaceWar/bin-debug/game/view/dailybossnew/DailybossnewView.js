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
    author : shaoliang
    date : 2019.6.28
    desc : 新蛮王
*/
var DailybossnewView = (function (_super) {
    __extends(DailybossnewView, _super);
    // private _bossData:any;
    // private _lastReward:{score:number,myrank:number,rewardType:number,joinNum:number,rewards:string};
    function DailybossnewView() {
        var _this = _super.call(this) || this;
        _this._lastStatus = 0;
        return _this;
    }
    DailybossnewView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailybossnew_bg1", "dailybossnew_rank", "dailybossnew_score", "dailyboss_enter"
        ]);
    };
    DailybossnewView.prototype.getBgName = function () {
        return "dailybossnew_bg1";
    };
    DailybossnewView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_NEWBOSS_GET, requestData: {} };
    };
    DailybossnewView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data) {
                // if(data.data.data.bossData)
                // {
                // 	this._bossData=data.data.data.bossData;
                // }
                // if(data.data.data.lastReward)
                // {
                // 	this._lastReward=data.data.data.lastReward;
                // }
            }
        }
    };
    DailybossnewView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    };
    DailybossnewView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD), this.resetBtn, this);
        this._gate = BaseLoadBitmap.create("dailybossnew_gate");
        this._gate.setPosition(167, 597 + this.viewBg.y - this.container.y);
        this.addChildToContainer(this._gate);
        this._gate.visible = false;
        var titleW = 368;
        var titleH = 68;
        var title = BaseLoadBitmap.create("dailybossnew_title");
        title.setPosition((GameConfig.stageWidth - 368) / 2, 20);
        this.addChildToContainer(title);
        var timeBg = BaseBitmap.create("public_9_bg15");
        timeBg.width = titleW;
        timeBg.setPosition(title.x + (timeBg.width - titleW) / 2, title.y + titleH + 3);
        this.addChildToContainer(timeBg);
        var timeTxt = ComponentManager.getTextField(this.getStatusStr(), TextFieldConst.FONTSIZE_TITLE_SMALL);
        if (PlatformManager.checkIsEnLang()) {
            timeBg.width = timeTxt.width;
            timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        }
        else {
            timeTxt.width = timeBg.width;
        }
        timeTxt.textAlign = egret.HorizontalAlign.CENTER;
        timeTxt.setPosition(timeBg.x + (timeBg.width - timeTxt.width) / 2, timeBg.y + (timeBg.height - timeTxt.height) / 2);
        this.addChildToContainer(timeTxt);
        this._leftTimeTxt = timeTxt;
        var buttomBg = BaseBitmap.create("public_9_downbg");
        buttomBg.width = GameConfig.stageWidth;
        buttomBg.height = 142;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rankBtn = ComponentManager.getButton("dailybossnew_rank", "", this.showRankView, this);
            rankBtn.setPosition(10, buttomBg.y - rankBtn.height);
            this.addChildToContainer(rankBtn);
            this._rankBtn = rankBtn;
        }
        var scoreBtn = ComponentManager.getButton("dailybossnew_score", "", this.showScoreView, this);
        scoreBtn.setPosition(GameConfig.stageWidth - scoreBtn.width - 10, buttomBg.y - scoreBtn.height);
        this.addChildToContainer(scoreBtn);
        this.addChildToContainer(buttomBg);
        var str1 = LanguageManager.getlocal("dailybossLocalTimeDesc", [LanguageManager.getlocal("dailybossTimeTitleNew"), Config.DailybossnewCfg.getInTimeStr(1)]);
        var buttomTxt = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTxt.lineSpacing = 5;
        buttomTxt.setPosition(buttomBg.x + 20, buttomBg.y + 16);
        this.addChildToContainer(buttomTxt);
        var buttomTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewBottomDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTxt2.lineSpacing = 5;
        buttomTxt2.width = 600;
        buttomTxt2.setPosition(buttomTxt.x, buttomTxt.y + buttomTxt.height + 10);
        this.addChildToContainer(buttomTxt2);
        this.resetBtn();
        this.tick();
    };
    DailybossnewView.prototype.resetBtn = function () {
        var f = Api.dailybossnewVoApi.getRewardFlag();
        if (f == 1) {
            App.CommonUtil.addIconToBDOC(this._rankBtn);
            this._rankBtn.getChildByName("reddot").x = this._rankBtn.width - 30;
            this._rankBtn.getChildByName("reddot").y = 50;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rankBtn);
        }
    };
    DailybossnewView.prototype.showRankView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWRANKPOPUPVIEW, {});
    };
    DailybossnewView.prototype.showScoreView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWSCROEPOPUPVIEW);
    };
    DailybossnewView.prototype.tick = function () {
        if (this._leftTimeTxt) {
            this._leftTimeTxt.text = this.getStatusStr();
        }
        //0开始状态,1开始,2结束等待下一轮
        var status = this.getBossStatus();
        if (status == 1) {
            if (!this._enterBtn) {
                this._enterBtn = ComponentManager.getButton("dailyboss_enter", "", this.enterBattle, this, null, 1);
                this._enterBtn.setPosition((GameConfig.stageWidth) / 2 - 12, -this.container.y + (GameConfig.stageHeigth - 540));
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
    DailybossnewView.prototype.enterBattle = function () {
        if (this.getBossStatus() == 0) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.BATTLE.DAILYBOSSNEWBATTLEVIEW);
    };
    DailybossnewView.prototype.getBossStatus = function () {
        return Api.dailybossnewVoApi.getStatus();
    };
    DailybossnewView.prototype.getStatusStr = function () {
        var statusStr = "";
        var status = this.getBossStatus();
        if (status == 0) {
            statusStr = LanguageManager.getlocal("dailybossnewLeftTimeDesc", [App.DateUtil.getFormatBySecond(this.getNextStartLeftTime(), 1)]);
        }
        else if (status == 1) {
            statusStr = LanguageManager.getlocal("dailybossnewEndTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getEndTimeByName("boss2"), 1)]);
        }
        else {
        }
        return statusStr;
    };
    DailybossnewView.prototype.getNextStartLeftTime = function () {
        return Api.dailybossnewVoApi.getNextStartLeftTime();
    };
    DailybossnewView.prototype.getTitleStr = function () {
        return "dailybossNew";
    };
    DailybossnewView.prototype.getRuleInfo = function () {
        return "dailybossnewRuleInfo";
    };
    DailybossnewView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWBOSS_GETREWARD), this.resetBtn, this);
        this._gate = null;
        this._enterBtn = null;
        this._leftTimeTxt = null;
        this._rankBtn = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossnewView;
}(CommonView));
__reflect(DailybossnewView.prototype, "DailybossnewView");
//# sourceMappingURL=DailybossnewView.js.map