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
 * 端午活动 粽夏连连看
 * @author weixiaozhe
 */
var AcFindSameView = /** @class */ (function (_super) {
    __extends(AcFindSameView, _super);
    function AcFindSameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timeTxt = null;
        _this._isThisGetMap = false;
        _this._flowerBoneList = [];
        _this._speed1 = 1;
        _this._speed2 = 0.5;
        return _this;
    }
    AcFindSameView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
    };
    //规则
    AcFindSameView.prototype.getRuleInfo = function () {
        return "findSameRuleInfo-" + this.TypeCode;
    };
    AcFindSameView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    Object.defineProperty(AcFindSameView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameView.prototype.getTitleStr = function () {
        return null;
    };
    AcFindSameView.prototype.getTitleBgName = function () {
        // return this.getDefaultRes('findsame_title');
        return null;
    };
    AcFindSameView.prototype.initView = function () {
        var _this = this;
        AcFindSameView.AID = this.aid;
        AcFindSameView.CODE = this.code;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshVo, this);
        this.showStartDialog();
        this.initMoveBg();
        var bg4 = BaseBitmap.create(this.getDefaultRes("findsame_bg4"));
        this.addChildToContainer(bg4);
        bg4.x = GameConfig.stageWidth - bg4.width;
        bg4.y = 85;
        var titleBg = BaseBitmap.create(this.getDefaultRes("findsame_title"));
        this.addChildToContainer(titleBg);
        titleBg.x = titleBg.y = 0;
        // 底部背景
        var bottomBg = BaseBitmap.create(this.getDefaultRes("findsame_botbg"));
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this.addChild(bottomBg);
        //活动时间   
        var dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = 15;
        dateText.y = bottomBg.y + bottomBg.height - 170;
        this.addChild(dateText);
        var timebg = BaseBitmap.create("public_9_bg61");
        timebg.width = 230;
        this.addChild(timebg);
        timebg.x = GameConfig.stageWidth / 2 - timebg.width / 2;
        timebg.y = bottomBg.y + bottomBg.height - timebg.height - 7;
        //剩余时间
        var timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = timebg.x + timebg.width / 2 - timeTxt.width / 2;
        timeTxt.y = timebg.y + timebg.height / 2 - timeTxt.height / 2;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;
        var achieveData = this.cfg.getAchievementList();
        var servantNeedMoney = this.vo.getNeedMoney1();
        var wifeNeedMoney = 0;
        if (achieveData && achieveData.length > 0) {
            for (var j = 0; j < achieveData.length; j++) {
                var strArr = achieveData[j].getReward.split("|");
                for (var k = 0; k < strArr.length; k++) {
                    if (strArr[k].split("_")[1] == String(this.cfg.show2)) {
                        wifeNeedMoney = achieveData[j].needNum;
                        break;
                    }
                }
                if (wifeNeedMoney > 0) {
                    break;
                }
            }
            // wifeNeedMoney = achieveData[achieveData.length - 1].needNum;
        }
        //活动规则文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("findsame_desc"), [String(servantNeedMoney), String(wifeNeedMoney)]), 18);
        descTxt.width = 610;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 15;
        this.addChild(descTxt);
        //活动详情
        var detailBtnBg = ResourceManager.hasRes("ac_findsame_detailbtn-" + this.getUiCode()) ? "ac_findsame_detailbtn-" + this.getUiCode() : "ac_findsame_detailbtn-1";
        var detailBtn = ComponentManager.getButton(detailBtnBg, "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMEREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this, null);
        detailBtn.setPosition(10, 100);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(70, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        // 开始按钮
        this.enterButton = ComponentManager.getButton(this.getDefaultRes("findsame_enter_btn"), "", this.enterClick, this);
        this.enterButton.x = GameConfig.stageWidth / 2 - this.enterButton.width / 2 - 15;
        this.enterButton.y = GameConfig.stageHeigth / 2 - this.enterButton.height / 2 - 130;
        this.addChild(this.enterButton);
        // if (this.vo.inGaming()) {
        //     this.visible = false;
        //     this.enterClick();
        //     setTimeout(() => {// 避免闪一下主界面
        //         this.visible = true;
        //     }, 500);
        // }
        if (this.vo.firstOpen != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "firstOpen", value: 1 });
        }
        if (this.vo.avgShow != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "avgShow", value: 1 });
            // ViewController.getInstance().openView(ViewConst.BASE.ACLINKGAMEAVGVIEW,{
            //     f : this.avgendCallback,
            //     o : this,
            //     idx : 1,
            //     aid : this.aid,
            //     code : this.code
            // });
        }
        this.showEffect();
        this.refreshVo();
    };
    AcFindSameView.prototype.avgendCallback = function () {
    };
    AcFindSameView.prototype.enterClick = function () {
        console.log("enter");
        // ViewController.getInstance().openView(ViewConst.POPUP.ACLINKGAMERESULTVIEW, {score:100, rewards:"6_6092_1|6_6092_2|6_6092_3"});
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.inGaming()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
        }
        // else if (this.vo.getCount() <= 0) { // 次数不足，（已达到3次）
        //     App.CommonUtil.showTip(LanguageManager.getlocal('linkgame_count_not_enough'));
        // } 
        // else if (this.vo.num <= 0) { // 次数不足，（活跃不够）
        //     ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
        // } 
        else {
            this._isThisGetMap = true;
            this.request(NetRequestConst.REQUEST_FINDSAME_GETMAP, { "activeId": this.aid + "-" + this.code });
        }
    };
    //请求回调
    AcFindSameView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_FINDSAME_GETMAP) {
            if (this._isThisGetMap) {
                this._isThisGetMap = false;
                ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
            }
        }
    };
    AcFindSameView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcFindSameView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([
            "findsame_title",
            "findsame_botbg",
            "findsame_enter_btn",
            "ac_findsame_detailbtn",
            "acfindsame_poolbg",
            "findsame_bg1",
            "findsame_bg2",
            "findsame_bg3",
            "findsame_bg4",
        ]);
        var baseList = [
            "findsame_lg_1",
            "findsame_lg_2",
            "findsame_lg_3",
            "findsame_lg_4",
            "acsearchproofview_common_skintxt",
            "story_bg6",
        ];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeList).concat(codeRes);
    };
    AcFindSameView.prototype.refreshVo = function () {
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(70, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
    };
    AcFindSameView.prototype.showEffect = function () {
        var _this = this;
        var view = this;
        //门客
        var achieveData = this.cfg.getAchievementList();
        var servantNeedMoney = this.vo.getNeedMoney1();
        var wifeNeedMoney = 0;
        if (achieveData && achieveData.length > 0) {
            wifeNeedMoney = achieveData[achieveData.length - 1].needNum;
        }
        var servantSkinId = this.cfg.show1;
        var wifeSkinId = this.cfg.show2;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var servantBaseCon = new BaseDisplayObjectContainer();
        view.addChildToContainer(servantBaseCon);
        var fun1 = function () {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.setPosition(150 - 104, GameConfig.stageHeigth - 320);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            servantBaseCon.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMESKINPOPUPVIEW, {
                    wifeId: wifeSkinId,
                    servantId: servantSkinId,
                    wifeNeedText: "findsameShowWifeTopMsg-" + _this.code,
                    servantNeedText: "findsameShowServentTopMsg-" + _this.code,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife: false
                });
            }, _this);
            var skinTxt1 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt1.setPosition(skinTxtEffect.x + skinTxtEffect.width / 2 - skinTxt1.width / 2 + 105, skinTxtEffect.y + skinTxtEffect.height / 2 - skinTxt1.height / 2 + 75);
            servantBaseCon.addChild(skinTxt1);
            egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxteffect.setPosition(skinTxt1.x, skinTxt1.y);
            servantBaseCon.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        };
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            // let servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone,0,'idle',()=>
            // {
            //     servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            //     servantBaseCon.addChild(servant);
            //     servant.setScale(0.95);
            //     servant.setPosition(150,GameConfig.stageHeigth-220);
            // });
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone), null, function () {
                var servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantBaseCon.addChild(servant);
                servant.setScale(0.95);
                servant.setPosition(150, GameConfig.stageHeigth - 220);
                fun1();
            }, null, this);
        }
        else {
            var servant = BaseLoadBitmap.create(skinCfg.body);
            servantBaseCon.addChild(servant);
            servant.setScale(0.95);
            servant.setPosition(-30, GameConfig.stageHeigth - 660);
            fun1();
        }
        //佳人
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        var baseCon = new BaseDisplayObjectContainer();
        view.addChildToContainer(baseCon);
        var fun2 = function () {
            var skinTxtEffect2 = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect2.setPosition(480 - 104, GameConfig.stageHeigth - 320);
            skinTxtEffect2.blendMode = egret.BlendMode.ADD;
            baseCon.addChild(skinTxtEffect2);
            skinTxtEffect2.playWithTime(-1);
            skinTxtEffect2.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMESKINPOPUPVIEW, {
                    wifeId: wifeSkinId,
                    servantId: servantSkinId,
                    wifeNeedText: "findsameShowWifeTopMsg-" + _this.code,
                    servantNeedText: "findsameShowServentTopMsg-" + _this.code,
                    wifeNeed: "" + wifeNeedMoney,
                    servantNeed: "" + servantNeedMoney,
                    isShowWife: true
                });
            }, _this);
            var skinTxt3 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt3.setPosition(skinTxtEffect2.x + skinTxtEffect2.width / 2 - skinTxt3.width / 2 + 105, skinTxtEffect2.y + skinTxtEffect2.height / 2 - skinTxt3.height / 2 + 75);
            baseCon.addChild(skinTxt3);
            egret.Tween.get(skinTxt3, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt4 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt4.setPosition(skinTxt3.x, skinTxt3.y);
            baseCon.addChild(skinTxt4);
            skinTxt4.blendMode = egret.BlendMode.ADD;
            skinTxt4.alpha = 0;
            egret.Tween.get(skinTxt4, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        };
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            // let wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone,0,'idle',()=>
            // {
            //     wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            //     wife.anchorOffsetX = wife.width / 2;
            //     wife.anchorOffsetY = wife.height;
            //     baseCon.addChild(wife);
            //     wife.setPosition(0,0);
            //     wife.setScale(0.65);
            //     wife.setPosition(480,GameConfig.stageHeigth-190);
            // });
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone), null, function () {
                var wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                baseCon.addChild(wife);
                wife.setPosition(0, 0);
                wife.setScale(0.65);
                wife.setPosition(480, GameConfig.stageHeigth - 190);
                fun2();
            }, null, this);
        }
        else {
            var wife = BaseLoadBitmap.create(wifeSkinCfg.body);
            baseCon.addChild(wife);
            wife.anchorOffsetX = wife.width / 2;
            wife.anchorOffsetY = wife.height;
            wife.setPosition(0, 0);
            wife.setScale(0.65);
            wife.setPosition(300, GameConfig.stageHeigth - 650);
            fun2();
        }
    };
    AcFindSameView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    AcFindSameView.prototype.initMoveBg = function () {
        var bg2_1 = BaseBitmap.create(this.getDefaultRes("findsame_bg2"));
        this.addChildToContainer(bg2_1);
        this._movebg2_1 = bg2_1;
        this._movebg2_1.x = this._movebg2_1.y = 0;
        var bg2_2 = BaseBitmap.create(this.getDefaultRes("findsame_bg2"));
        this.addChildToContainer(bg2_2);
        this._movebg2_2 = bg2_2;
        this._movebg2_2.x = this._movebg2_1.width;
        this._movebg2_2.y = 0;
        var bg1_1 = BaseBitmap.create(this.getDefaultRes("findsame_bg1"));
        this.addChildToContainer(bg1_1);
        this._movebg1_1 = bg1_1;
        this._movebg1_1.x = this._movebg1_1.y = 0;
        var bg1_2 = BaseBitmap.create(this.getDefaultRes("findsame_bg1"));
        this.addChildToContainer(bg1_2);
        this._movebg1_2 = bg1_2;
        this._movebg1_2.x = this._movebg1_1.width;
        this._movebg1_2.y = 0;
        var bg3 = BaseBitmap.create(this.getDefaultRes("findsame_bg3"));
        this.addChildToContainer(bg3);
        bg3.x = 0;
        bg3.y = bg1_1.height - bg3.height;
        this._lgEffect1 = ComponentManager.getCustomMovieClip("findsame_lg_", 4, 100);
        // this._lgEffect1.blendMode = egret.BlendMode.ADD;
        this._lgEffect1.x = 123;
        this._lgEffect1.y = 486;
        this._lgEffect1.scaleX = -1;
        this._lgEffect1.x = this._lgEffect1.x + 188;
        this._lgEffect1.playWithTime(0);
        this.addChildToContainer(this._lgEffect1);
        this._lgEffect2 = ComponentManager.getCustomMovieClip("findsame_lg_", 4, 100);
        // this._lgEffect2.blendMode = egret.BlendMode.ADD;
        this._lgEffect2.x = 225;
        this._lgEffect2.y = 565;
        this._lgEffect2.scaleX = -1;
        this._lgEffect2.x = this._lgEffect2.x + 188;
        this._lgEffect2.playWithTime(0);
        this.addChildToContainer(this._lgEffect2);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterHandel, this);
    };
    AcFindSameView.prototype.enterHandel = function () {
        this._movebg1_1.x -= this._speed1;
        this._movebg1_2.x -= this._speed1;
        if (this._movebg1_1.x <= -640) {
            this._movebg1_1.x = this._movebg1_2.x + this._movebg1_2.width;
        }
        if (this._movebg1_2.x <= -640) {
            this._movebg1_2.x = this._movebg1_1.x + this._movebg1_1.width;
        }
        this._movebg2_1.x -= this._speed2;
        this._movebg2_2.x -= this._speed2;
        if (this._movebg2_1.x <= -640) {
            this._movebg2_1.x = this._movebg2_2.x + this._movebg2_2.width;
        }
        if (this._movebg2_2.x <= -640) {
            this._movebg2_2.x = this._movebg2_1.x + this._movebg2_1.width;
        }
    };
    AcFindSameView.prototype.tick = function () {
        this._timeTxt.setString(this.vo.acCountDown);
        this._timeTxt.x = GameConfig.stageWidth / 2 - this._timeTxt.width / 2;
    };
    Object.defineProperty(AcFindSameView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameView.prototype, "acTivityId", {
        get: function () {
            return AcFindSameView.AID + "-" + AcFindSameView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcFindSameView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcFindSameView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcFindSameView.prototype.showStartDialog = function () {
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "dialog";
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var view = this;
        var keyStr = "startDialog_" + this.TypeCode;
        var startCfg = view.cfg[keyStr];
        var bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: "" + view.TypeCode,
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acFindSameStartTalk_",
            bgName: bgName
        });
    };
    AcFindSameView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = 0; i < this._flowerBoneList.length; i++) {
            this._flowerBoneList[i].dispose();
        }
        this._flowerBoneList = [];
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshVo, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshVo, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshVo, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterHandel, this);
        this._lgEffect1.dispose();
        this._lgEffect2.dispose();
        this._movebg1_1 = null;
        this._movebg1_2 = null;
        this._movebg2_1 = null;
        this._movebg2_2 = null;
    };
    AcFindSameView.AID = null;
    AcFindSameView.CODE = null;
    return AcFindSameView;
}(AcCommonView));
//# sourceMappingURL=AcFindSameView.js.map