/**
  * 情定鹊桥 活动
  * @author shaoliang
  * date 2020/7/15
  * @class AcBirdBridgeView
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
var AcBirdBridgeView = /** @class */ (function (_super) {
    __extends(AcBirdBridgeView, _super);
    function AcBirdBridgeView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this._detailBtn = null;
        _this._playTimesText = null;
        _this._rewardNodeTab = [];
        _this._theBridge = null;
        _this._man = null;
        _this._woman = null;
        _this._achievemantLevel = -1;
        _this._itembg = null;
        _this._itemIcon = null;
        _this._wishDescText = null;
        _this._wishNumText = null;
        _this._progressbar = null;
        _this._curWishId = 0;
        //底部信息
        _this._itemNumText = null;
        _this._tenWishCheck = null;
        _this._50WishCheck = null;
        _this._50WishText = null;
        _this._checkTimes = 1;
        _this._btnTime = 1;
        _this._wishBtn = null;
        _this._btnTimes = null;
        _this._btnText = null;
        _this._btnFreeText = null;
        _this._btnIcon = null;
        _this._btnChooseText = null;
        _this._rewardBtn = null;
        _this._lihuaNode = null;
        _this._isShowLihua = false;
        _this._isPlaying = false;
        _this.manPos = {
            "man": [[0, 37], [43, 28], [87, 15], [125, 0], [164, -13]],
            "woman": [[540, 37], [488, 24], [438, 0], [389, -4], [349, -13]]
        };
        _this.lihuaCfg = {
            1: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: -40, y: 177, scale: 0.5 },
            2: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450, x: 156, y: 125, scale: 0.5 },
            3: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400, x: 56, y: 244, scale: 0.6 },
            4: { color: "red", framenum: 10, firenum: 10, width: 500, height: 500, x: 223, y: 128, scale: 0.8 },
            5: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: 291, y: 125, scale: 1 },
            6: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400, x: 435, y: 302, scale: 0.5 },
            7: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450, x: -178, y: 282, scale: 0.7 },
            8: { color: "red", framenum: 10, firenum: 10, width: 500, height: 500, x: 35, y: 374, scale: 0.5 },
            9: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: 314, y: 207, scale: 0.5 },
            10: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450, x: 338, y: 419, scale: 0.4 },
            11: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400, x: 513, y: 177, scale: 0.5 }
        };
        _this._idx = 1;
        return _this;
    }
    AcBirdBridgeView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_AC_BIRDBRIDGEGETMODEL, requestData: { activeId: this.acTivityId } };
    };
    // 标题背景名称
    AcBirdBridgeView.prototype.getTitleBgName = function () {
        return "birdbridge_title-" + this.getUiCode();
    };
    AcBirdBridgeView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acBirdbridgeProbablyInfo", this.code);
    };
    AcBirdBridgeView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcBirdBridgeView.prototype.getTitleStr = function () {
        return null;
    };
    AcBirdBridgeView.prototype.getBgName = function () {
        return "birdbridge_bg-" + this.getUiCode();
    };
    AcBirdBridgeView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    AcBirdBridgeView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            return "acBirdBridgeRuleInfo-" + code + "_withOpenRefusal";
        }
        return "acBirdBridgeRuleInfo-" + code;
    };
    Object.defineProperty(AcBirdBridgeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBirdBridgeView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
    };
    AcBirdBridgeView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "birdbridgecode" + code, "birdbridge_bg-" + code, "birdbridge_bottombg-" + code,
            "acwealthcarpview_skineffect", "acgiftreturnview_common_skintxt", "progress3", "progress3_bg",
        ]);
    };
    AcBirdBridgeView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, this.refreshWishInfo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, this.resetWish, this);
        var code = this.getUiCode();
        var vo = this.vo;
        var key = this.acTivityId + Api.playerVoApi.getPlayerID() + String(vo.st);
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
                idx: "acBirdBridge_1-" + this.getUiCode(), f: function () {
                }, o: this
            });
            LocalStorageManager.set(key, vo.aidAndCode);
        }
        var acDescBg = BaseBitmap.create("birdbridge_descbg-" + code);
        acDescBg.y = 91;
        this.addChildToContainer(acDescBg);
        //活动时间
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.width = 540;
        timeTF.setPosition(20, acDescBg.y + 22);
        this.addChildToContainer(timeTF);
        var desckey = "acBirdBridgeDesc-" + code;
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            desckey = "acBirdBridgeDesc-" + code + "_withOpenRefusal";
        }
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        descTF.width = 600;
        descTF.lineSpacing = 5;
        descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 8);
        this.addChildToContainer(descTF);
        var onenode = new BaseDisplayObjectContainer();
        // onenode.y = acDescBg.height+acDescBg.y;
        this.addChildToContainer(onenode);
        this._lihuaNode = onenode;
        var rewardNode = new BaseDisplayObjectContainer();
        rewardNode.y = acDescBg.height + acDescBg.y;
        this.addChildToContainer(rewardNode);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        var detailBtn = ComponentManager.getButton("birdbridge_detail-" + code, null, this.detailBtnHandler, this, null, 1);
        detailBtn.setPosition(5, 10);
        rewardNode.addChild(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isShowDetailRedDot) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 77;
            reddot.y = 10;
        }
        var playstr = LanguageManager.getlocal("acBirdBridgeTimes-" + code, [String(this.vo.ainfo[0].v)]);
        var playtimeText = ComponentManager.getTextField(playstr, 20, TextFieldConst.COLOR_BLACK);
        playtimeText.width = 120;
        playtimeText.lineSpacing = 3;
        playtimeText.textAlign = egret.HorizontalAlign.CENTER;
        playtimeText.setPosition(detailBtn.width / 2 - playtimeText.width / 2 - 2, 28);
        detailBtn.addChild(playtimeText);
        this._playTimesText = playtimeText;
        //成就奖励
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 120);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        rewardNode.addChild(scrollView);
        scrollView.setPosition(GameConfig.stageWidth - rect.width, 0);
        scrollView.verticalScrollPolicy = "off";
        var cfgs = this.cfg.achievementOne;
        for (var i = 0; i < cfgs.length; i++) {
            var oneNode = new BirdBridgeRewardNode();
            oneNode.init(cfgs[i], code, this.rewardHandle, this);
            oneNode.setPosition(i * 92 + 5, 0);
            scrollContiner.addChild(oneNode);
            oneNode.setShowType(this.vo.getAchievementOneType(i + 1));
            this._rewardNodeTab.push(oneNode);
        }
        scrollContiner.width += 10;
        scrollView.setScrollLeft(scrollContiner.width - rect.width);
        egret.Tween.get(scrollView).wait(1).call(function () {
            scrollView.setScrollLeft(0, 1000);
        });
        //鹊桥
        this._theBridge = BaseLoadBitmap.create("birdbridge_bridge2-" + code);
        this._theBridge.y = 345;
        this.addChildToContainer(this._theBridge);
        this.resetBridge();
        //水池
        var pool = BaseBitmap.create("birdbridge_pool-" + code);
        pool.setPosition(GameConfig.stageWidth / 2 - pool.width / 2, GameConfig.stageHeigth - 360);
        this.addChildToContainer(pool);
        var progressbg = BaseBitmap.create("birdbridge_progressbg-" + code);
        progressbg.setPosition(GameConfig.stageWidth / 2 - progressbg.width / 2, pool.y - progressbg.height);
        this.addChildToContainer(progressbg);
        var itembg = BaseBitmap.create("birdbridge_itembg-" + code);
        itembg.setPosition(GameConfig.stageWidth / 2 - itembg.width / 2, progressbg.y - itembg.height);
        this.addChildToContainer(itembg);
        this._itembg = itembg;
        itembg.addTouchTap(function () {
            if (_this._isPlaying) {
                return;
            }
            if (_this.vo.isCanGetCurWish()) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acBirdbridgeNeedReward-' + code));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW, {
                aid: _this.aid,
                code: _this.code,
                uicode: _this.getUiCode()
            });
        }, this);
        this._progressbar = ComponentManager.getProgressBar("birdbridge_progress-" + code, "birdbridge_progress-" + code, 333);
        this._progressbar._progressBarBg.alpha = 0;
        this._progressbar.setPosition(163, progressbg.y + 39);
        this.addChildToContainer(this._progressbar);
        var wishdesc = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
        wishdesc.width = GameConfig.stageWidth;
        wishdesc.textAlign = egret.HorizontalAlign.CENTER;
        wishdesc.setPosition(10, progressbg.y + 15);
        this.addChildToContainer(wishdesc);
        this._wishDescText = wishdesc;
        var wishnum = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
        wishnum.width = GameConfig.stageWidth;
        wishnum.textAlign = egret.HorizontalAlign.CENTER;
        wishnum.setPosition(10, progressbg.y + 55);
        this.addChildToContainer(wishnum);
        this._wishNumText = wishnum;
        //人物
        var servantBone = "servant_full2_1067";
        // Api.switchVoApi.checkCloseBone=function(){return true;}
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(servantBone + "_ske")) //+"_ske"
         {
            var servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
            servantDB.setPosition(0 + view.viewBg.x + 100, GameConfig.stageHeigth);
            servantDB.anchorOffsetY = servantDB.height;
            servantDB.anchorOffsetX = servantDB.width / 2;
            servantDB.scaleX = -0.88;
            servantDB.scaleY = 0.88;
            this.addChild(servantDB);
        }
        else {
            var servantPic = BaseLoadBitmap.create("servant_full_1067");
            servantPic.scaleX = -0.83;
            servantPic.scaleY = 0.83;
            servantPic.setPosition(300, GameConfig.stageHeigth - 420);
            this.addChild(servantPic);
        }
        var wifeBone = "wife_full_254";
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(wifeBone + "_ske")) //
         {
            var wifetDB = App.DragonBonesUtil.getLoadDragonBones(wifeBone);
            wifetDB.setPosition(158 + view.viewBg.x + 410, GameConfig.stageHeigth);
            wifetDB.anchorOffsetY = wifetDB.height;
            wifetDB.anchorOffsetX = wifetDB.width;
            wifetDB.scaleX = -0.7;
            wifetDB.scaleY = 0.7;
            this.addChild(wifetDB);
        }
        else {
            var rect_1 = egret.Rectangle.create();
            rect_1.setTo(0, 0, 640, 840);
            var wifepic = BaseLoadBitmap.create("wife_full_254", rect_1);
            wifepic.scaleX = -0.5;
            wifepic.scaleY = 0.5;
            wifepic.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth - 420);
            this.addChild(wifepic);
        }
        var bottombg = BaseBitmap.create("birdbridge_bottombg-" + code);
        bottombg.y = GameConfig.stageHeigth - bottombg.height;
        this.addChild(bottombg);
        //预览
        var topBg = { x: 17, y: GameConfig.stageHeigth - 312 };
        var _loop_1 = function (i) {
            if (i == 2) {
                topBg = { x: 430, y: GameConfig.stageHeigth - 312 };
            }
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
            skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this_1.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
            this_1.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
            this_1.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(topBg.x, topBg.y);
            view.addChild(touchPos);
            touchPos.addTouchTap(function () {
                //if (i == 1)
                var servantcfg = _this.cfg.wish[0];
                var wifecfg = _this.cfg.wish[1];
                var wifeTopMsg = LanguageManager.getlocal("acBirdBridgeWifeTopMsg-" + code, ["" + wifecfg.needTime]);
                var servantTopMsg = LanguageManager.getlocal("acBirdBridgeServantTopMsg-" + code, ["" + servantcfg.needTime]);
                // let wifeOtherTip = LanguageManager.getlocal("acRechargeBoxSpPreviewWifeTip-"+this.code);
                var wifId = Config.WifeCfg.formatRewardItemVoStr(wifecfg.getReward);
                var itemvo = GameData.formatRewardItem(servantcfg.getReward)[0];
                var itemcfg = Config.ItemCfg.getItemCfgById(itemvo.id);
                var servantvo = GameData.formatRewardItem(itemcfg.getRewards)[0];
                var servantId = Config.ServantCfg.formatRewardItemVoStr(servantvo.id);
                var showTypee = i == 1 ? servantId : wifId;
                var data = { data: [
                        { idType: servantId, topMsg: servantTopMsg, bgName: "", scale: 0.73, offY: 13 },
                        { idType: wifId, topMsg: wifeTopMsg, bgName: "", scale: 0.62, offY: 13 },
                    ], showType: showTypee };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }, ViewController);
        };
        var this_1 = this;
        for (var i = 1; i <= 2; i++) {
            _loop_1(i);
        }
        var numbg = BaseBitmap.create("public_numbg");
        numbg.width = 140;
        numbg.height = 24;
        numbg.setPosition(GameConfig.stageWidth / 2 - numbg.width / 2, GameConfig.stageHeigth - 142);
        this.addChild(numbg);
        var wishIcon1 = BaseBitmap.create("birdbridge_itemicon-" + code);
        wishIcon1.setScale(0.4);
        wishIcon1.setPosition(numbg.x + 20, numbg.y + numbg.height / 2 - wishIcon1.height * wishIcon1.scaleX / 2);
        this.addChild(wishIcon1);
        var itemNumText = ComponentManager.getTextField(" X" + this.vo.getItemNum(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNumText.setPosition(wishIcon1.x + wishIcon1.width * wishIcon1.scaleX, numbg.y + numbg.height / 2 - itemNumText.height / 2);
        this.addChild(itemNumText);
        this._itemNumText = itemNumText;
        var checkIcon = BaseBitmap.create("birdbridge_selected1-" + code);
        checkIcon.x = 90;
        checkIcon.y = GameConfig.stageHeigth - 90;
        this.addChild(checkIcon);
        checkIcon.addTouchTap(this.tenChooseHandle, this);
        this._tenWishCheck = checkIcon;
        var tenText = ComponentManager.getTextField(LanguageManager.getlocal("acBirdBridgePlay1-" + code, ["10"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenText.setPosition(checkIcon.x + checkIcon.width, checkIcon.y + checkIcon.height / 2 - tenText.height / 2);
        this.addChild(tenText);
        var checkIcon2 = BaseBitmap.create("birdbridge_selected1-" + code);
        checkIcon2.x = 440;
        checkIcon2.y = checkIcon.y;
        this.addChild(checkIcon2);
        checkIcon2.addTouchTap(this.choose50Handle, this);
        this._50WishCheck = checkIcon2;
        var _50Text = ComponentManager.getTextField(LanguageManager.getlocal("acBirdBridgePlay1-" + code, ["50"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        _50Text.setPosition(checkIcon2.x + checkIcon2.width, checkIcon2.y + checkIcon2.height / 2 - _50Text.height / 2);
        this.addChild(_50Text);
        this._50WishText = _50Text;
        this._50WishCheck.visible = false;
        this._50WishText.visible = false;
        if (this.vo.ainfo[0].v >= 50) {
            this._50WishCheck.visible = true;
            this._50WishText.visible = true;
        }
        // let btnBitmap = BaseBitmap.create("birdbridge_btn-"+code);
        // btnBitmap.setPosition(GameConfig.stageWidth/2 - btnBitmap.width/2, GameConfig.stageHeigth-btnBitmap.height);
        // this.addChild(btnBitmap);
        var wishBtn = ComponentManager.getButton("birdbridge_btn-" + code, null, this.wishHandle, this, null, 3);
        // wishBtn.width = 200;
        // wishBtn.height = 80;
        wishBtn.setPosition(GameConfig.stageWidth / 2 - wishBtn.width / 2, GameConfig.stageHeigth - wishBtn.height);
        this.addChild(wishBtn);
        this._wishBtn = wishBtn;
        //  //透明点击区域
        // let touchPos2 = BaseBitmap.create("public_alphabg");
        // touchPos2.width = wishBtn.width;
        // touchPos2.height = wishBtn.height;
        // wishBtn.addChild(touchPos2);
        var wishIcon = BaseBitmap.create("birdbridge_itemicon-" + code);
        wishIcon.setScale(0.4);
        wishIcon.setPosition(wishBtn.width / 2 - wishIcon.width * wishIcon.scaleX, 21);
        wishBtn.addChild(wishIcon);
        this._btnIcon = wishIcon;
        var wishtime = ComponentManager.getTextField(" X" + this._checkTimes, 18, TextFieldConst.COLOR_BLACK);
        wishtime.setPosition(wishIcon.x + wishIcon.width * wishIcon.scaleX, wishIcon.y + wishIcon.height / 2 * wishIcon.scaleY - wishtime.height / 2);
        wishBtn.addChild(wishtime);
        this._btnTimes = wishtime;
        var wishText = ComponentManager.getTextField(" ", 24, TextFieldConst.COLOR_BLACK);
        wishText.width = wishBtn.width;
        wishText.textAlign = egret.HorizontalAlign.CENTER;
        wishText.setPosition(0, wishIcon.y + wishIcon.height * wishIcon.scaleY - 2);
        wishBtn.addChild(wishText);
        this._btnText = wishText;
        var chooseText = ComponentManager.getTextField(LanguageManager.getlocal("acBirdBridgeChooseRewards-" + code), 22, TextFieldConst.COLOR_BLACK);
        chooseText.width = wishBtn.width;
        chooseText.textAlign = egret.HorizontalAlign.CENTER;
        chooseText.setPosition(0, 44);
        wishBtn.addChild(chooseText);
        this._btnChooseText = chooseText;
        var freeText = ComponentManager.getTextField(LanguageManager.getlocal("sysFreeDesc"), 26, TextFieldConst.COLOR_BLACK);
        freeText.width = wishBtn.width;
        freeText.textAlign = egret.HorizontalAlign.CENTER;
        freeText.setPosition(0, 42);
        wishBtn.addChild(freeText);
        this._btnFreeText = freeText;
        var rewardBtn = ComponentManager.getButton("birdbridge_btn-" + code, null, this.rewardBtnHandle, this, null, 3);
        // rewardBtn.width = 200;
        // rewardBtn.height = 80;
        rewardBtn.setPosition(GameConfig.stageWidth / 2 - rewardBtn.width / 2, GameConfig.stageHeigth - rewardBtn.height);
        this.addChild(rewardBtn);
        this._rewardBtn = rewardBtn;
        // //透明点击区域
        // let touchPos1 = BaseBitmap.create("public_alphabg");
        // touchPos1.width = rewardBtn.width;
        // touchPos1.height = rewardBtn.height;
        // rewardBtn.addChild(touchPos1);
        var reardText = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayLq"), 24, TextFieldConst.COLOR_BLACK);
        reardText.width = rewardBtn.width;
        reardText.textAlign = egret.HorizontalAlign.CENTER;
        reardText.setPosition(0, 42);
        rewardBtn.addChild(reardText);
        this.checkBottomBtn();
        // this.checkShowChoose();
        this.resetBtnInfo();
        this.refreshWishInfo();
        this.checkShowLihua();
    };
    AcBirdBridgeView.prototype.checkBottomBtn = function () {
        if (this.vo.isCanGetCurWish()) {
            this._wishBtn.visible = false;
            this._rewardBtn.visible = true;
        }
        else {
            this._wishBtn.visible = true;
            this._rewardBtn.visible = false;
        }
    };
    // private checkShowChoose():void
    // {
    //     if ((this.vo.winfo.idx == 0 || this.vo.isWishMaxById(this.vo.winfo.idx)) && this.vo.isWishMax()==false )
    //     {
    //         ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW,{
    //             aid:this.aid, 
    //             code:this.code,
    //             uicode:this.getUiCode(),
    //         });
    //     }
    // }
    AcBirdBridgeView.prototype.isShowChoose = function () {
        if ((this.vo.winfo.idx == 0 || this.vo.isWishMaxById(this.vo.winfo.idx)) && this.vo.isWishMax() == false) {
            return true;
        }
        return false;
    };
    AcBirdBridgeView.prototype.wishHandle = function () {
        var _this = this;
        if (this.isShowChoose()) {
            ViewController.getInstance().openView(ViewConst.POPUP.BIRDBRIDGECHOOSEVIEW, {
                aid: this.aid,
                code: this.code,
                uicode: this.getUiCode()
            });
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this._checkTimes == 1 && this.vo.isFree()) {
            if (this._isPlaying) {
                return;
            }
            this._isPlaying = true;
            this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, { activeId: this.acTivityId, isFree: 1, playNum: 1 });
            return;
        }
        if (this.vo.getItemNum() <= 0) {
            var message = LanguageManager.getlocal('acBirdBridgeNoItem-' + this.getUiCode());
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: message,
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                        uicode: _this.getUiCode()
                    });
                },
                handler: this,
                needClose: 1,
                needCancel: true
            });
            return;
        }
        this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, { activeId: this.acTivityId, isFree: 0, playNum: this._btnTime });
    };
    AcBirdBridgeView.prototype.rewardBtnHandle = function () {
        if (this.vo.isWishMaxById(this.vo.winfo.idx) && this.vo.isWishMax() == true) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acBirdBridgeRewadMax-' + this.getUiCode()));
            return;
        }
        if (this.vo.isStart) {
            if (this._isPlaying) {
                return;
            }
            this._isPlaying = true;
            this.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEGETWISH, { activeId: this.acTivityId, rkey: String(this.vo.winfo.idx) });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            this.hide();
        }
    };
    AcBirdBridgeView.prototype.tenChooseHandle = function () {
        var code = this.getUiCode();
        if (this._checkTimes == 10) {
            this._checkTimes = 1;
            this._tenWishCheck.texture = ResourceManager.getRes("birdbridge_selected1-" + code);
        }
        else {
            this._checkTimes = 10;
            this._tenWishCheck.texture = ResourceManager.getRes("birdbridge_selected2-" + code);
        }
        this._50WishCheck.texture = ResourceManager.getRes("birdbridge_selected1-" + code);
        this.resetBtnInfo();
    };
    AcBirdBridgeView.prototype.choose50Handle = function () {
        var code = this.getUiCode();
        if (this._checkTimes == 50) {
            this._checkTimes = 1;
            this._50WishCheck.texture = ResourceManager.getRes("birdbridge_selected1-" + code);
        }
        else {
            this._checkTimes = 50;
            this._50WishCheck.texture = ResourceManager.getRes("birdbridge_selected2-" + code);
        }
        this._tenWishCheck.texture = ResourceManager.getRes("birdbridge_selected1-" + code);
        this.resetBtnInfo();
    };
    AcBirdBridgeView.prototype.resetBtnInfo = function () {
        var btnstr = "";
        var code = this.getUiCode();
        if (this.vo.getItemNum() == 0) {
            this._btnTime = this._checkTimes;
        }
        else {
            this._btnTime = Math.min(this._checkTimes, this.vo.getCurCanWishMaxNum());
        }
        if (this.isShowChoose()) {
            this._btnChooseText.visible = true;
            this._btnFreeText.visible = false;
            this._btnIcon.visible = false;
            this._btnTimes.visible = false;
            this._btnText.visible = false;
        }
        else if (this._checkTimes == 1 && this.vo.isFree()) {
            this._btnChooseText.visible = false;
            this._btnFreeText.visible = true;
            this._btnIcon.visible = false;
            this._btnTimes.visible = false;
            this._btnText.visible = false;
        }
        else {
            this._btnChooseText.visible = false;
            this._btnFreeText.visible = false;
            this._btnIcon.visible = true;
            this._btnTimes.visible = true;
            this._btnText.visible = true;
        }
        if (this._btnTime == 0) {
            this._btnTime = 1;
        }
        this._btnText.text = LanguageManager.getlocal("acBirdBridgePlay1-" + code, [String(this._btnTime)]);
        ;
        this._btnTimes.text = " X" + this._btnTime;
    };
    AcBirdBridgeView.prototype.resetBridge = function () {
        var lv = this.vo.getAchievementAllLevel();
        if (lv == this._achievemantLevel) {
            return;
        }
        this._achievemantLevel = lv;
        var code = this.getUiCode();
        if (lv >= this.cfg.achievementAll.length) {
            this._theBridge.setload("birdbridge_bridge2-" + code);
            if (this._man) {
                this._man.dispose();
                this._man = null;
            }
            if (this._woman) {
                this._woman.dispose();
                this._woman = null;
            }
        }
        else {
            this._theBridge.setload("birdbridge_bridge1-" + code);
            if (!this._man) {
                this._man = BaseBitmap.create("birdbridge_man-" + code);
                this.addChildToContainer(this._man);
            }
            if (!this._woman) {
                this._woman = BaseBitmap.create("birdbridge_woman-" + code);
                this.addChildToContainer(this._woman);
            }
            var manpos = this.manPos["man"][lv];
            var womanpos = this.manPos["woman"][lv];
            this._man.setPosition(manpos[0], manpos[1] + this._theBridge.y);
            this._woman.setPosition(womanpos[0], womanpos[1] + this._theBridge.y);
            egret.Tween.get(this._man, { loop: true }).to({ y: this._man.y - 5 }, 1000).wait(100).to({ y: this._man.y }, 1000).wait(100);
            egret.Tween.get(this._woman, { loop: true }).to({ y: this._woman.y - 5 }, 1000).wait(100).to({ y: this._woman.y }, 1000).wait(100);
        }
    };
    AcBirdBridgeView.prototype.detailBtnHandler = function () {
        if (this._isPlaying) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEW, {
            aid: this.aid,
            code: this.code,
            uicode: this.getUiCode()
        });
    };
    AcBirdBridgeView.prototype.rewardHandle = function (id) {
        if (this._isPlaying) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACBIRDBRIDGEPOPVIEWTAB2, {
            aid: this.aid,
            code: this.code,
            uicode: this.getUiCode(),
            id: id
        });
    };
    AcBirdBridgeView.prototype.tick = function () {
        var cfg = this.cfg;
        var vo = this.vo;
        // if (vo.checkIsInEndShowTime()) {
        // 	this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        // }
        // else {
        this._countDownTime.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        // }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    AcBirdBridgeView.prototype.freshView = function () {
        this._playTimesText.text = LanguageManager.getlocal("acBirdBridgeTimes-" + this.getUiCode(), [String(this.vo.ainfo[0].v)]);
        if (this.vo.isShowDetailRedDot) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 77;
            reddot.y = 10;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        this.resetBridge();
        for (var i = 0; i < this._rewardNodeTab.length; i++) {
            var oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.vo.getAchievementOneType(i + 1));
        }
        this._itemNumText.text = " X" + this.vo.getItemNum();
        this.checkShowLihua();
        this.resetBtnInfo();
    };
    AcBirdBridgeView.prototype.resetWish = function () {
        if (this.vo.ainfo[0].v >= 50) {
            this._50WishCheck.visible = true;
            this._50WishText.visible = true;
        }
    };
    //许愿信息刷新
    AcBirdBridgeView.prototype.refreshWishInfo = function () {
        if (this.isShowChoose()) {
            this._curWishId = 0;
            if (this._itemIcon) {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }
            this._itemIcon = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._itemIcon);
            var choose = BaseBitmap.create("birdbridge_choose1-" + this.getUiCode());
            this._itemIcon.addChild(choose);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._itemIcon, this._itembg);
            egret.Tween.get(choose, { loop: true }).to({ alpha: 0.5 }, 800).to({ alpha: 1 }, 800);
            this._wishDescText.visible = false;
            this._wishNumText.visible = false;
            this._progressbar.setPercentage(0);
            return;
        }
        if (this.vo.winfo.idx != this._curWishId) {
            this._curWishId = this.vo.winfo.idx;
            if (this._itemIcon) {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }
            if (this._curWishId != 0) {
                var wiscfg = this.cfg.getWishCfg(this._curWishId);
                this._itemIcon = GameData.getRewardItemIcons(wiscfg.getReward)[0];
                this.addChildToContainer(this._itemIcon);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._itemIcon, this._itembg);
            }
        }
        if (this._curWishId == 0) {
            this._wishDescText.visible = false;
            this._wishNumText.visible = false;
            this._progressbar.setPercentage(0);
        }
        else {
            this._wishDescText.visible = true;
            this._wishNumText.visible = true;
            var wiscfg = this.cfg.getWishCfg(this._curWishId);
            var v1 = this.vo.getWishValueById(this._curWishId);
            var v2 = wiscfg.needTime;
            this._wishDescText.text = LanguageManager.getlocal("acBirdBridgeGetRewards-" + this.getUiCode(), [String(wiscfg.needTime)]);
            this._wishNumText.text = LanguageManager.getlocal("AcMazeViewTaskPlan", [String(v1), String(v2)]);
            this._progressbar.setPercentage(v1 / v2);
        }
        if (this.vo.isWishMax()) {
            if (this._itemIcon) {
                this._itemIcon.dispose();
                this._itemIcon = null;
            }
            this._wishDescText.visible = true;
            this._wishNumText.visible = false;
            this._wishDescText.text = LanguageManager.getlocal("acBirdbridgeRewardMax-" + this.getUiCode());
            this._wishBtn.setEnable(false);
            this._progressbar.setPercentage(0);
        }
    };
    AcBirdBridgeView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            // 领取许愿奖励
            this._isPlaying = false;
            if (data.data.cmd == NetRequestConst.REQUEST_AC_BIRDBRIDGEGETWISH) {
                var rData = data.data.data;
                var rewards = rData.rewards;
                var replacerewards = rData.replacerewards;
                var rewardsVo = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardsVo);
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                }
                this.checkBottomBtn();
                this.resetBtnInfo();
                this.refreshWishInfo();
                // this.checkShowChoose();
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH) {
                var rData = data.data.data;
                var rewards = rData.rewards;
                var replacerewards_1 = rData.replacerewards;
                // let rewardsVo = GameData.formatRewardItem(rewards);
                //App.CommonUtil.playRewardFlyAction(rewardsVo);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, isSameAdd: true, "isPlayAni": true, "callback": function () {
                        if (replacerewards_1) {
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards_1 });
                        }
                    }, "handler": this });
                this.checkBottomBtn();
                this.resetBtnInfo();
                this.refreshWishInfo();
                // this.checkShowChoose();
            }
        }
        else {
            this._isPlaying = false;
        }
    };
    AcBirdBridgeView.prototype.checkShowLihua = function () {
        if (this._isShowLihua == false && this.vo.getAchievementAllLevel() >= this.cfg.achievementAll.length) //
         {
            this._isShowLihua = true;
            this.showLihua();
        }
    };
    AcBirdBridgeView.prototype.showLihua = function () {
        var _this = this;
        var view = this;
        var cfg = this.lihuaCfg[this._idx];
        var fireeff = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color + "fire", cfg.firenum, 70);
        fireeff.width = 150;
        fireeff.height = 500;
        fireeff.playWithTime(1);
        this._lihuaNode.addChildAt(fireeff, 1);
        fireeff.setEndCallBack(function () {
            fireeff.dispose();
            fireeff = null;
        }, view);
        var lihua = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color, cfg.framenum, 70);
        lihua.width = cfg.width;
        lihua.height = cfg.height;
        this._lihuaNode.addChildAt(lihua, 1);
        lihua.setEndCallBack(function () {
            lihua.dispose();
            lihua = null;
        }, view);
        lihua.setPosition(cfg.x, cfg.y);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fireeff, lihua, [0, 200]);
        egret.Tween.get(lihua).wait((cfg.firenum - 3) * 70).call(function () {
            lihua.playWithTime(1);
            ++_this._idx;
            if (_this._idx == 10) {
                _this._idx = 1;
            }
            view.showLihua();
            egret.Tween.removeTweens(lihua);
        }, view);
    };
    AcBirdBridgeView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, this.refreshWishInfo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH, this.resetWish, this);
        this._btnChooseText = null;
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._detailBtn = null;
        this._playTimesText = null;
        this._theBridge = null;
        this._achievemantLevel = -1;
        this._itembg = null;
        this._itemIcon = null;
        this._wishDescText = null;
        this._wishNumText = null;
        this._progressbar = null;
        this._curWishId = 0;
        this._itemNumText = null;
        this._tenWishCheck = null;
        this._50WishText = null;
        this._50WishCheck = null;
        this._checkTimes = 1;
        this._wishBtn = null;
        this._btnTimes = null;
        this._btnText = null;
        this._rewardBtn = null;
        this._btnTime = 1;
        this._btnIcon = null;
        this._btnFreeText = null;
        this._lihuaNode = null;
        this._isShowLihua = false;
        this._rewardNodeTab.length = 0;
        this._man = null;
        this._woman = null;
        this._isPlaying = false;
        _super.prototype.dispose.call(this);
    };
    return AcBirdBridgeView;
}(AcCommonView));
//# sourceMappingURL=AcBirdBridgeView.js.map