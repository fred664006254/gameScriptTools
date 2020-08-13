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
var AcJadeViewTab3 = (function (_super) {
    __extends(AcJadeViewTab3, _super);
    function AcJadeViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        _this._fettersList = [];
        _this._fettersBaseList = [];
        _this._maskPanel = null;
        _this._lockPeople = null;
        _this._lockDialog = null;
        _this._fettersDataList = [
            { x: -40, y: 30, scaleX: 1, scaleY: 1, rotation: -5 },
            { x: -20, y: 40, scaleX: 1, scaleY: 1, rotation: 23 },
            { x: -40, y: 130, scaleX: 1, scaleY: 1, rotation: -10 },
            { x: -30, y: 200, scaleX: 1, scaleY: 1, rotation: -3 }
        ];
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcJadeViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJadeViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 50 - 47);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // let taskList = cfg.getTaskList();
        // let vo  = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = this.vo.getSortTask();
        // let vo  = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList = ComponentManager.getScrollList(AcJadeViewTaskScrollItem, taskData, rect, this._aidAndCode);
        this._scrollList.y = 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChild(this._scrollList);
        var bottomBg = BaseBitmap.create("adult_lowbg");
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - 486 - bottomBg.height - 12;
        this.addChild(bottomBg);
        var tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip3_" + this.code), 20, 0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width / 2 - tabText.width / 2;
        tabText.y = bottomBg.y + bottomBg.height / 2 - tabText.height / 2;
        tabText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(tabText);
        this.initFetters();
    };
    //初始化锁链
    AcJadeViewTab3.prototype.initFetters = function () {
        var lock = this.vo.unlock;
        if (lock == 0 || lock == 1) {
            if (this._maskPanel == null) {
                this._maskPanel = new BaseDisplayObjectContainer();
                this._maskPanel.width = GameConfig.stageWidth;
                this._maskPanel.height = this.height;
                this.addChild(this._maskPanel);
                var mask = BaseBitmap.create("public_9_viewmask");
                mask.width = this._maskPanel.width;
                mask.height = this._maskPanel.height;
                this._maskPanel.addChild(mask);
                this._maskPanel.addTouchTap(function () { }, this);
                var clip = null;
                var bs = null;
                //初始化锁链
                for (var i = 0; i < this._fettersDataList.length; i++) {
                    clip = ComponentManager.getCustomMovieClip("acjadeview_fetters", 10, 70);
                    clip.x = this._fettersDataList[i].x;
                    clip.y = this._fettersDataList[i].y;
                    clip.scaleX = this._fettersDataList[i].scaleX;
                    clip.scaleY = this._fettersDataList[i].scaleY;
                    clip.rotation = this._fettersDataList[i].rotation;
                    this._fettersList.push(clip);
                    this._maskPanel.addChild(clip);
                    bs = BaseLoadBitmap.create("acjadeview_fettersB");
                    bs.x = this._fettersDataList[i].x;
                    bs.y = this._fettersDataList[i].y;
                    bs.scaleX = this._fettersDataList[i].scaleX;
                    bs.scaleY = this._fettersDataList[i].scaleY;
                    bs.rotation = this._fettersDataList[i].rotation;
                    this._fettersBaseList.push(bs);
                    this._maskPanel.addChild(bs);
                    // clip.texture = ResourceManager.getRes("acjadeview_fettersB");
                }
                this._lockDialog = new BaseDisplayObjectContainer();
                this._lockDialog.width = GameConfig.stageWidth;
                this._lockDialog.height = this.height;
                this._maskPanel.addChild(this._lockDialog);
                var lockPeople = BaseLoadBitmap.create("wife_full_304");
                lockPeople.width = 640;
                lockPeople.height = 840;
                lockPeople.setScale(0.5);
                lockPeople.x = -50;
                lockPeople.y = 100 + GameConfig.stageHeigth - 960;
                // lockPeople.y = this._lockDialog.height - lockPeople.height;
                this._lockDialog.addChild(lockPeople);
                var dialogBg = BaseBitmap.create("public_9v_bg11");
                dialogBg.scaleX = -1;
                dialogBg.width = 280;
                dialogBg.height = 170;
                dialogBg.x = GameConfig.stageWidth / 2 + dialogBg.width / 2;
                dialogBg.y = 90;
                this._lockDialog.addChild(dialogBg);
                var dialogText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewLockDesc_" + this.code), 20, TextFieldConst.COLOR_BROWN);
                dialogText.width = 250;
                dialogText.x = GameConfig.stageWidth / 2 - dialogText.width / 2;
                dialogText.y = dialogBg.y + 20;
                this._lockDialog.addChild(dialogText);
                var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
                rechargeBtn.x = GameConfig.stageWidth / 2 - rechargeBtn.width / 2;
                rechargeBtn.y = dialogText.y + dialogText.height + 15;
                this._lockDialog.addChild(rechargeBtn);
            }
            if (lock == 1) {
                this.playFetters();
            }
        }
    };
    AcJadeViewTab3.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().hideView("AcJadeView");
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    //播放锁链特效
    AcJadeViewTab3.prototype.playFetters = function () {
        this._lockDialog.visible = false;
        for (var j = 0; j < this._fettersBaseList.length; j++) {
            this._maskPanel.removeChild(this._fettersBaseList[j]);
        }
        this._fettersBaseList = [];
        for (var i = 0; i < this._fettersList.length; i++) {
            this._fettersList[i].playWithTime(1);
        }
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SETJADELOCK, { "activeId": activityId, "lock": 3 });
        // egret.Tween();
        egret.Tween.get(this._maskPanel)
            .wait(1000)
            .call(this.hideMaskPanel, this);
    };
    AcJadeViewTab3.prototype.hideMaskPanel = function () {
        this._maskPanel.visible = false;
    };
    AcJadeViewTab3.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
        if (this.vo.unlock == 1) {
            this.playFetters();
        }
        // this.initFetters();
    };
    /**
     * 切换标签
     */
    AcJadeViewTab3.prototype.refreshWhenSwitchBack = function () {
        this.refreshData(null);
    };
    AcJadeViewTab3.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.refreshData,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB,this.refreshData,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        this._fettersList = [];
        this._fettersBaseList = [];
        this._maskPanel = null;
        this._lockPeople = null;
        this._lockDialog = null;
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewTab3;
}(AcCommonViewTab));
__reflect(AcJadeViewTab3.prototype, "AcJadeViewTab3");
