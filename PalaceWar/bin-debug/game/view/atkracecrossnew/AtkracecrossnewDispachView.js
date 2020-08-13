/**
 * author shaoliang
 * date 2020/6/16
 * @class AtkracecrossnewDispachView
 * 新跨服擂台 派遣门客
 */
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
var AtkracecrossnewDispachView = /** @class */ (function (_super) {
    __extends(AtkracecrossnewDispachView, _super);
    function AtkracecrossnewDispachView() {
        var _this = _super.call(this) || this;
        _this._dispatchTimeText = null;
        _this._dispatchTime = 0;
        _this._chooseNum = null;
        _this._confirmBtn = null;
        _this._noTimeText = null;
        _this._chooseServants = [];
        return _this;
    }
    AtkracecrossnewDispachView.prototype.getTitlePic = function () {
        return "newcrossatkrace_servanttitle";
    };
    Object.defineProperty(AtkracecrossnewDispachView.prototype, "crossVo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    AtkracecrossnewDispachView.prototype.getRuleInfo = function () {
        var key = "newatkracecrossDespath_rule";
        return App.CommonUtil.getCrossLeagueCn(key, this.crossVo.isCrossLeague());
    };
    AtkracecrossnewDispachView.prototype.getRuleInfoParam = function () {
        var cfg = Api.atkracecrossVoApi.getNewCrossCfg();
        return [String(cfg.lowerLimit2), String(cfg.lowerLimit3)];
    };
    AtkracecrossnewDispachView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newcrossatkrace_check", "newcrossatkrace_gone", "dailytask_topbg", "commonview_bigframe",
            "arena_bottom_bg", "servant_namebg", "mainlanddetailtitlebg2-1", "newcrossatkrace_addbuffdetailbtn",
        ]);
    };
    AtkracecrossnewDispachView.prototype.initView = function () {
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = -25;
        this.addChildToContainer(topBg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossDespathDesc"), 20, TextFieldConst.COLOR_WHITE);
        desc.width = 600;
        desc.lineSpacing = 4;
        desc.setPosition(20, 0);
        this.addChildToContainer(desc);
        this._dispatchTime = this.crossVo.st + 7200 - GameData.serverTime;
        // this._dispatchTime = 1000;
        // let choosetime = ComponentManager.getTextField(this.getDispachTimeStr(), 20,TextFieldConst.COLOR_QUALITY_YELLOW);
        // choosetime.setPosition(desc.x,desc.y+desc.height+5);
        // this.addChildToContainer(choosetime);
        // this._dispatchTimeText = choosetime;
        var frame = BaseBitmap.create("commonview_bigframe");
        frame.width = GameConfig.stageWidth;
        frame.height = GameConfig.stageHeigth - 110;
        frame.y = 100;
        this.addChildToContainer(frame);
        var values = this.crossVo.cfg.getBaseBuff();
        var v2 = Math.floor(values[0] * 1000 + 0.5) / 10;
        var v3 = Math.floor(values[1] * 1000 + 0.5) / 10;
        var value2 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff1", [String(v2)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        value2.setPosition(GameConfig.stageWidth / 2 - value2.width - 40, frame.y - value2.height - 5);
        this.addChildToContainer(value2);
        var value3 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff2", [String(v3)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        value3.setPosition(GameConfig.stageWidth / 2 + 40, value2.y);
        this.addChildToContainer(value3);
        var addBuffBtn = ComponentManager.getButton("newcrossatkrace_addbuffdetailbtn", "", this.addBuffBtnClick, this);
        this.addChildToContainer(addBuffBtn);
        addBuffBtn.setScale(0.8);
        addBuffBtn.setPosition(value3.x + value3.width + 7, value3.y + value3.height / 2 - addBuffBtn.height * addBuffBtn.scaleY / 2);
        var choosebg = BaseBitmap.create("mainlanddetailtitlebg2-1");
        choosebg.width = 306;
        choosebg.setPosition(GameConfig.stageWidth / 2 - choosebg.width / 2, 130);
        this.addChildToContainer(choosebg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 600;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = choosebg.y + choosebg.height / 2 - line1.height / 2;
        this.addChildToContainer(line1);
        var choosenum = ComponentManager.getTextField(this.getChooseNumStr(), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        choosenum.width = choosebg.width;
        choosenum.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, choosenum, choosebg);
        this.addChildToContainer(choosenum);
        this._chooseNum = choosenum;
        this._chooseServants = this.crossVo.getSids(); //["1001","1002"];
        var sids = Api.servantVoApi.getServantInfoIdListWithSort(6);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - 410));
        var scrollContiner = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        scrollView.y = choosebg.y + choosebg.height + 3;
        this.addChildToContainer(scrollView);
        var alphabg = BaseBitmap.create("public_alphabg");
        alphabg.width = 640;
        alphabg.height = Math.ceil((sids.length - 1) / 5) * 112;
        scrollContiner.addChild(alphabg);
        for (var i = 0; i < sids.length; i++) {
            var onesid = sids[i];
            var choose = GameData.isInArray(onesid, this._chooseServants);
            var oneItem = new AtkracecrossnewServantIcon();
            oneItem.init(onesid, choose, this.chooseServant, this);
            oneItem.setPosition(28 + i % 5 * 120, 3 + Math.floor(i / 5) * 112);
            scrollContiner.addChild(oneItem);
        }
        var downbg = BaseBitmap.create("arena_bottom_bg");
        downbg.height = 140;
        downbg.y = GameConfig.stageHeigth - downbg.height;
        this.addChild(downbg);
        var dispathBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.enterRackHandler, this, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dispathBtn, downbg);
        this.addChild(dispathBtn);
        var dispathTimeText = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossDespath_done"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dispathTimeText, downbg);
        this.addChild(dispathTimeText);
        this._confirmBtn = dispathBtn;
        this._noTimeText = dispathTimeText;
        this.resetServantNum();
        if (this._dispatchTime <= 0) {
            dispathBtn.visible = false;
            dispathTimeText.visible = true;
        }
        else {
            dispathTimeText.visible = false;
            dispathBtn.visible = true;
        }
    };
    AtkracecrossnewDispachView.prototype.addBuffBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSBUFFVIEW, {
            code: Api.atkracecrossVoApi.newcrossCode
        });
    };
    AtkracecrossnewDispachView.prototype.enterRackHandler = function () {
        if (this._chooseServants.length < 30) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipLess"));
        }
        else {
            if (this.crossVo.st + 7200 <= GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_done"));
                return;
            }
            this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_CHANGESIDS, { changesids: this._chooseServants, activeId: this.crossVo.aidAndCode });
        }
    };
    AtkracecrossnewDispachView.prototype.receiveData = function (data) {
        if (data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipSuccess"));
        }
    };
    AtkracecrossnewDispachView.prototype.chooseServant = function (oneIcon) {
        if (oneIcon.getChoose()) {
            //取消
            GameData.arrayDelItem(oneIcon.getSid(), this._chooseServants);
            oneIcon.setCheck();
        }
        else {
            //选择
            if (this._chooseServants.length == 30) {
                App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipMax"));
            }
            else {
                this._chooseServants.push(oneIcon.getSid());
                oneIcon.setCheck();
            }
        }
        this.resetServantNum();
    };
    AtkracecrossnewDispachView.prototype.resetServantNum = function () {
        this._chooseNum.text = this.getChooseNumStr();
        if (this._chooseServants.length == 30) {
            App.DisplayUtil.changeToNormal(this._confirmBtn);
        }
        else {
            App.DisplayUtil.changeToGray(this._confirmBtn);
        }
    };
    AtkracecrossnewDispachView.prototype.getDispachTimeStr = function () {
        var time = this._dispatchTime;
        if (time < 0) {
            time = 0;
        }
        return LanguageManager.getlocal("newatkracecross_time", [App.DateUtil.getFormatBySecond(time)]);
    };
    AtkracecrossnewDispachView.prototype.getChooseNumStr = function () {
        return LanguageManager.getlocal("newatkracecrossDespathChoose", [String(this._chooseServants.length), "30"]);
    };
    AtkracecrossnewDispachView.prototype.tick = function () {
        // if (this._dispatchTimeText) {
        this._dispatchTime--;
        // this._dispatchTimeText.text = this.getDispachTimeStr();
        if (this._dispatchTime < 0) {
            // this._dispatchTimeText.dispose();
            // this._dispatchTimeText = null;
            this._confirmBtn.visible = false;
            this._noTimeText.visible = true;
        }
        // }
    };
    AtkracecrossnewDispachView.prototype.dispose = function () {
        this._dispatchTimeText = null;
        this._chooseNum = null;
        this._dispatchTime = 0;
        this._confirmBtn = null;
        this._noTimeText = null;
        this._chooseServants.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossnewDispachView;
}(CommonView));
//# sourceMappingURL=AtkracecrossnewDispachView.js.map