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
 * author:qianjun
 * desc:跨服亲密活动首页
*/
var AcCrossServerWifeBattleEnterView = (function (_super) {
    __extends(AcCrossServerWifeBattleEnterView, _super);
    function AcCrossServerWifeBattleEnterView() {
        var _this = _super.call(this) || this;
        _this._canJoinImg = null;
        _this._cdTimeDesc = null;
        _this._cdType = 0; //倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
        _this._countDownText = null;
        _this._countDownTime = 0;
        _this._enterBtn = null;
        _this._joinDescText = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleEnterView.prototype, "aid", {
        // public static AID:string = null;
        // public static CODE:string = null;
        get: function () {
            return "crossServerWifeBattle";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleEnterView.prototype, "cfg", {
        get: function () {
            // return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleEnterView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleEnterView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "crossserverinti_detailbg-1","crossserverinti_enterin-1","crossserverintibg-1",
            // "crossserverinti_detailbg-4","crossserverinti_enterin-4","crossserverintibg-4",
            // "public_9_wordbg2",
            // "crossserverinti_flagword",
            // "rechargevie_db_01",
            "accrossserverwifebattle_descbg",
            "accrossserverwifebattle_desctitle",
            "accrossserverwifebattle_enterbg",
            "accrossserverwifebattle_enterbtn",
            "accrossserverwifebattle_helpbtn",
            "accrossserverwifebattle_title",
        ]);
    };
    AcCrossServerWifeBattleEnterView.prototype.initTitle = function () {
    };
    AcCrossServerWifeBattleEnterView.prototype.getBgName = function () {
        return "accrossserverwifebattle_enterbg";
    };
    AcCrossServerWifeBattleEnterView.prototype.getCloseBtnName = function () {
        // return ButtonConst.POPUP_CLOSE_BTN_1;
        return "btn_win_closebtn";
    };
    AcCrossServerWifeBattleEnterView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETINFO, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcCrossServerWifeBattleEnterView.prototype.receiveData = function (data) {
        // console.log("AcCrossServerWifebattleEnterView-> data",data);
        this.vo.setActInfo(data.data.data);
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
    };
    AcCrossServerWifeBattleEnterView.prototype.getTitleStr = function () {
        return "atkracecross";
    };
    // 初始化背景
    AcCrossServerWifeBattleEnterView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AcCrossServerWifeBattleEnterView.prototype.initView = function () {
        var flagword = "accrossserverwifebattle_title";
        var title = null;
        title = BaseBitmap.create(flagword);
        // title.width = 640;
        // title.height = 120;
        title.x = 0;
        title.y = 0;
        this.addChildToContainer(title);
        //参赛资格
        var canJoin = this.vo.isCanJoin;
        if (PlatformManager.hasSpcialCloseBtn()) {
            // if(canJoin==true)
            // {
            // 	this.closeBtn.y =80;
            // }
            // else
            // {
            // 	this.closeBtn.y =35;
            // }
            this.closeBtn.y = 80;
        }
        else {
            this.closeBtn.y = 35;
        }
        this.closeBtn.x = 550;
        //底部
        var vo = this.vo;
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height + 40;
        this.addChild(bottomBg);
        var middleBg = BaseBitmap.create("accrossserverwifebattle_descbg");
        middleBg.x = 0;
        middleBg.y = bottomBg.y - middleBg.height + 5;
        //当前时间段
        //当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
        this._cdType = vo.judgeTimeProcess();
        if (this._cdType > 0 && this._cdType < 4) {
            if (this._cdType == 1) {
                this._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
            }
            else if (this._cdType == 2) {
                this._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
            }
            else {
                this._countDownTime = vo.et - GameData.serverTime;
            }
            // this.api.setCountDownTime(this._countDownTime);
        }
        // if(RES.hasRes(`crossserverinti_enterin-${view.code}`))
        // {
        // 	view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-${view.code}`, '', view.enterInHandler,this);
        // }
        // else{
        // 	view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-1`, '', view.enterInHandler,this);
        // }
        this._enterBtn = ComponentManager.getButton("accrossserverwifebattle_enterbtn", '', this.enterInHandler, this);
        if (this._cdType > 1 && this._cdType < 4) {
            this._enterBtn.setEnable(true);
        }
        else {
            //灰化
            this._enterBtn.setEnable(false);
        }
        //进入按钮
        this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, middleBg.y - this._enterBtn.height + 70);
        this.addChild(this._enterBtn);
        this.addChild(middleBg);
        //活动倒计时时间
        this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + this._cdType, [this.vo.getCountTimeStr(this._countDownTime)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        this._cdTimeDesc.y = middleBg.y + 27;
        this.addChild(this._cdTimeDesc);
        // if(this._countDownTime > 0){
        // 	this._countDownText = ComponentManager.getTextField(this.vo.getCountTimeStr(this._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
        // 	this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth , this._cdTimeDesc.y);
        // 	this.addChild(this._countDownText);
        // }
        //是否有资格
        if (canJoin) {
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        }
        else {
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        }
        this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
        this._joinDescText.lineSpacing = 3;
        this._joinDescText.x = GameConfig.stageWidth / 2 - this._joinDescText.width / 2;
        this._joinDescText.y = this._cdTimeDesc.y + this._cdTimeDesc.height + 3;
        this.addChild(this._joinDescText);
        //活动时间
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 12;
        timeDesc.y = bottomBg.y + 15;
        this.addChild(timeDesc);
        //参与区服
        var pkzidsTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossServerWifeBattlePkzids', [this.vo.getPkzidsStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pkzidsTxt.x = timeDesc.x;
        pkzidsTxt.y = timeDesc.y + timeDesc.height + 5;
        this.addChild(pkzidsTxt);
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acCrossServerWifeBattleRule")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc.width = 616; //GameConfig.stageWidth - 100;
        ruleDesc.lineSpacing = 5;
        ruleDesc.x = pkzidsTxt.x;
        ruleDesc.y = pkzidsTxt.y + pkzidsTxt.textHeight + 5;
        this.addChild(ruleDesc);
    };
    AcCrossServerWifeBattleEnterView.prototype.tick = function () {
        var view = this;
        if (this._cdTimeDesc) {
            --this._countDownTime;
            // view.api.setCountDownTime(view._countDownTime);
            // this._countDownText.text = this.vo.getCountTimeStr(this._countDownTime);
            // if (this._countDownTime <= 0) {
            this._cdType = this.vo.judgeTimeProcess();
            if (this._cdType == 2) {
                this._enterBtn.setEnable(true);
                this._countDownTime = this.vo.et - 86400 - GameData.serverTime;
            }
            else if (this._cdType == 3) {
                this._countDownTime = view.vo.et - GameData.serverTime;
            }
            else if (this._cdType == 4) {
                this._enterBtn.setEnable(false);
                this.hide();
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
                return;
            }
            this._cdTimeDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + this._cdType, [this.vo.getCountTimeStr(this._countDownTime)]);
            // }
        }
    };
    AcCrossServerWifeBattleEnterView.prototype.enterInHandler = function () {
        var view = this;
        if (view._cdType > 1 && view._cdType < 4) {
            // if(this.vo.isCanJoin){
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW, {
                aid: this.aid,
                code: this.code
            });
            // } else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleNotCanJoin"));
            // }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime0"));
        }
    };
    AcCrossServerWifeBattleEnterView.prototype.dispose = function () {
        this._canJoinImg = null;
        this._cdTimeDesc = null;
        this._cdType = 0;
        this._countDownText = null;
        this._countDownTime = null;
        if (this._enterBtn) {
            this._enterBtn.removeTouchTap();
        }
        this._enterBtn = null;
        this._joinDescText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleEnterView;
}(AcCommonView));
__reflect(AcCrossServerWifeBattleEnterView.prototype, "AcCrossServerWifeBattleEnterView");
