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
 * 权倾朝野
 * date 2020.7.14
 * author ycg
 * @class AcPowerFullView
 */
var AcPowerFullView = /** @class */ (function (_super) {
    __extends(AcPowerFullView, _super);
    function AcPowerFullView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._rechargeTip = null;
        _this._rewardData = null;
        _this._isPlay = false;
        _this._isTenPlay = false;
        _this._isBatch = false;
        _this._isSkipAni = false;
        _this._skipContainer = null;
        _this._playMoreContainer = null;
        _this._playBtnTxt = null;
        _this._toolNumTxt = null;
        _this._freeDesc = null;
        _this._pieceNum = null;
        _this._detailBg = null;
        _this._processNum = null;
        _this._processRed = null;
        _this._proContainer = null;
        _this._scrollView = null;
        _this._boxList = [];
        _this._skinContainer = null;
        return _this;
    }
    AcPowerFullView.prototype.getTitleStr = function () {
        return null;
    };
    AcPowerFullView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acpowerfull_titlebg", this.getUicode());
    };
    AcPowerFullView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode());
    };
    AcPowerFullView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcPowerFullView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acPowerFullRuleInfo", this.getUicode());
    };
    AcPowerFullView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem];
    };
    AcPowerFullView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcPowerFullView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acPowerFullProbablyInfo", this.getUicode());
    };
    AcPowerFullView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "acpowerfullcode1", "acpowerfullcode" + this.getUicode(), "acwealthcarpview_servantskintxt",
        ]).concat(list);
    };
    Object.defineProperty(AcPowerFullView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullView.prototype.getUicode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, this.playCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.getRewardCallback, this);
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode()));
        bg.y = GameConfig.stageHeigth - bg.height;
        this.addChildToContainer(bg);
        var localKey = "startDialog" + this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.st;
        var isShow = LocalStorageManager.get(localKey);
        if (isShow && isShow != "") {
            // this.showSkinNumChangeView();
        }
        else {
            this.showStartDialog();
        }
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_infobg", this.getUicode()));
        infoBg.setPosition(0, GameConfig.stageHeigth - infoBg.height);
        infoBg.touchEnabled = true;
        //角色
        var roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = GameConfig.stageWidth;
        this.addChildToContainer(roleContainer);
        //主角
        var title = Api.playerVoApi.getTitleInfo();
        var titleData = { title: title, level: Api.playerVoApi.getPlayerLevel(), pic: Api.playerVoApi.getPlayePicId() };
        var player = this.getRoleContainer(titleData);
        player.setScale(0.65);
        player.setPosition(60 + 40, 0);
        roleContainer.setPosition(0, GameConfig.stageHeigth - infoBg.height - 180 + 20);
        roleContainer.addTouchTap(this.roleClick, this);
        //衣装
        // let skinIdArr = this.vo.getHasSkinId();
        var skinIdArr = ["20041", "20042"];
        if (skinIdArr.length > 0) {
            for (var i = 0; i < 2; i++) {
                var skinCfg_1 = Config.ServantskinCfg.getServantSkinItemById(skinIdArr[i]);
                var skinImg = BaseLoadBitmap.create(skinCfg_1.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.setScale(0.45);
                skinImg.x = (i == 0 ? 100 : GameConfig.stageWidth - skinImg.width * skinImg.scaleX - 100);
                if (i == 1) {
                    skinImg.scaleX = -0.45;
                    skinImg.x += skinImg.width * Math.abs(skinImg.scaleX);
                }
                skinImg.y = 30;
                roleContainer.addChild(skinImg);
                if (!Api.servantVoApi.isOwnSkinOfSkinId(skinIdArr[i])) {
                    App.DisplayUtil.changeToGray(skinImg);
                }
                skinImg.addTouchTap(this.roleClick, this);
            }
        }
        roleContainer.addChild(player);
        this.addChildToContainer(infoBg);
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 20;
        dateText.y = infoBg.y + 60;
        this.addChildToContainer(dateText);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + 27;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        //碎片数量
        // let needItemVo = this.vo.getShowSkinData();
        // let pieceData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
        // let currPieceNum = 0;
        // if (pieceData){
        //     currPieceNum = pieceData.num;
        // }
        var currPieceNum = this.cfg.special.specialLimit - this.vo.getSpecailNum();
        if (currPieceNum < 0) {
            currPieceNum = 0;
        }
        var pieceNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPieceNum", this.getUicode()), ["" + currPieceNum, "" + this.cfg.special.specialLimit]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        pieceNum.setPosition(dateText.x, dateText.y + dateText.height + 5);
        this.addChildToContainer(pieceNum);
        this._pieceNum = pieceNum;
        //充值信息
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRechargeInfo", this.getUicode()), ["" + this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(GameConfig.stageWidth - rechargeTip.width - 15, pieceNum.y);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDesc", this.getUicode()), ["" + this.cfg.needGem]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = pieceNum.y + pieceNum.height + 5;
        this.addChildToContainer(descTxt);
        // play btn
        var playBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acpowerfull_playbtn", this.getUicode()), "", this.playBtnClick, this);
        // let playBtn = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_playbtn", this.getUicode()));
        playBtn.setPosition(GameConfig.stageWidth / 2 - playBtn.width * playBtn.scaleX / 2, GameConfig.stageHeigth - 390 - 160);
        this.addChildToContainer(playBtn);
        //道具数量
        var toolNum = this.vo.getToolNum();
        var toolNumBg = BaseBitmap.create("acpowerfull_numbg-1");
        this.addChildToContainer(toolNumBg);
        toolNumBg.setPosition(GameConfig.stageWidth / 2 - toolNumBg.width / 2, playBtn.y + playBtn.height - 25);
        var toolNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullUseNum", this.getUicode()), ["" + toolNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        toolNumTxt.setPosition(toolNumBg.x + toolNumBg.width / 2 - toolNumTxt.width / 2, toolNumBg.y + toolNumBg.height / 2 - toolNumTxt.height / 2 + 2);
        this.addChildToContainer(toolNumTxt);
        this._toolNumTxt = toolNumTxt;
        //免费
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPlayFree", this.getUicode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(toolNumTxt.x + toolNumTxt.width, toolNumTxt.y);
        this.addChildToContainer(freeDesc);
        freeDesc.visible = false;
        this._freeDesc = freeDesc;
        //一次，十次
        var playBtnKey = "acpowerfull_playbtntxt1";
        if (toolNum >= 10) {
            playBtnKey = "acpowerfull_playbtntxt2";
        }
        if (this._isBatch) {
            playBtnKey = "acpowerfull_playbtntxt3";
        }
        var playBtnTxt = BaseBitmap.create(App.CommonUtil.getResByCode(playBtnKey, this.getUicode()));
        // playBtnTxt.setPosition(GameConfig.stageWidth/2 - playBtnTxt.width/2, playBtn.y + 85);
        // this.addChildToContainer(playBtnTxt);
        playBtnTxt.setPosition(playBtn.width / 2 - playBtnTxt.width / 2, 85 - 10);
        playBtn.addChild(playBtnTxt);
        this._playBtnTxt = playBtnTxt;
        if (this.vo.isFree()) {
            playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()));
            freeDesc.visible = true;
            toolNumTxt.x = GameConfig.stageWidth / 2 - (toolNumTxt.width + freeDesc.width) / 2;
            freeDesc.x = toolNumTxt.x + toolNumTxt.width;
        }
        //进度背景
        var topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_progressbg", this.getUicode()));
        topBg.setPosition(0, playBtn.y - topBg.height - 5);
        var roleOffY = topBg.y + topBg.height - 20 - this.titleBg.height - this.titleBg.y + 10;
        //皮肤衣装
        var skinContainer = new BaseDisplayObjectContainer();
        skinContainer.width = GameConfig.stageWidth;
        skinContainer.height = roleOffY;
        this.addChildToContainer(skinContainer);
        skinContainer.anchorOffsetX = skinContainer.width / 2;
        this._skinContainer = skinContainer;
        skinContainer.setPosition(GameConfig.stageWidth / 2, this.titleBg.y + this.titleBg.height);
        var skinMask = new egret.Rectangle(0, 0, GameConfig.stageWidth, skinContainer.height);
        skinContainer.mask = skinMask;
        var skinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var roleScale = 0.65 + 0.2 * (roleOffY - 300) / (470 - 300); //300
        roleScale = roleScale > 0.85 ? 0.85 : roleScale;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(roleScale);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = skinContainer.width / 2;
            servantIcon.y = skinContainer.height; //-5
            skinContainer.addChild(servantIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(roleScale);
            skinImg.x = skinContainer.width / 2;
            skinImg.y = skinContainer.height;
            skinContainer.addChild(skinImg);
        }
        this.addChildToContainer(topBg);
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(topBg.x + topBg.width / 2 - skinTxtEffect.width / 2, topBg.y - 100);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEWTAB4, { aid: _this.aid, code: _this.code });
        }, this);
        //跳过动画
        var skipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(skipContainer);
        this._skipContainer = skipContainer;
        var skipBottom = BaseBitmap.create("public_9_bg12");
        skipBottom.height = 42;
        skipBottom.setPosition(12, playBtn.y + 28);
        skipContainer.addChild(skipBottom);
        skipBottom.alpha = 0.8;
        var skipBg = BaseBitmap.create("public_select");
        skipBg.setPosition(15, playBtn.y + 30);
        skipContainer.addChild(skipBg);
        skipBg.addTouchTap(function () {
            _this._isSkipAni = !_this._isSkipAni;
            if (_this._isSkipAni) {
                skipBg.setRes("public_select_down");
            }
            else {
                skipBg.setRes("public_select");
            }
        }, this);
        var skipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullSkipTip", this.getUicode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        skipTxt.setPosition(skipBg.x + skipBg.width + 5, skipBg.y + skipBg.height / 2 - skipTxt.height / 2);
        skipContainer.addChild(skipTxt);
        skipBottom.width = skipBg.width + skipTxt.width + 40;
        //搭救50次
        var goMoreContainer = new BaseDisplayObjectContainer();
        skipContainer.addChild(goMoreContainer);
        this._playMoreContainer = goMoreContainer;
        var goMoreBottom = BaseBitmap.create("public_9_bg12");
        goMoreBottom.height = 42;
        goMoreBottom.setPosition(skipBottom.x, skipBg.y + skipBg.height + 10);
        goMoreContainer.addChild(goMoreBottom);
        goMoreBottom.alpha = 0.8;
        var goMoreBg = BaseBitmap.create("public_select");
        goMoreBg.setPosition(skipBg.x, skipBg.y + skipBg.height + 12);
        goMoreContainer.addChild(goMoreBg);
        goMoreBg.addTouchTap(function () {
            var currToolNum = _this.vo.getToolNum();
            _this._isBatch = !_this._isBatch;
            if (_this._isBatch) {
                goMoreBg.setRes("public_select_down");
                // if (this.vo.isFree()){
                //     playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()))
                // }
                // else{
                playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt3", _this.getUicode()));
                // }
            }
            else {
                goMoreBg.setRes("public_select");
                if (currToolNum < 10 || _this.vo.isFree()) {
                    playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", _this.getUicode()));
                }
                else {
                    playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt2", _this.getUicode()));
                }
            }
        }, this);
        var goMoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPlayMultiTip", this.getUicode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        goMoreTxt.setPosition(goMoreBg.x + goMoreBg.width + 5, goMoreBg.y + goMoreBg.height / 2 - goMoreTxt.height / 2);
        goMoreContainer.addChild(goMoreTxt);
        goMoreBottom.width = goMoreBg.width + goMoreTxt.width + 40;
        if (this.vo.getProcessNum() >= 50) {
            this._playMoreContainer.visible = true;
        }
        else {
            this._playMoreContainer.visible = false;
        }
        //进度
        var detailBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_detailbg", this.getUicode()));
        detailBg.setPosition(5, topBg.y);
        detailBg.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this._detailBg = detailBg;
        var processRed = BaseBitmap.create("public_dot2");
        processRed.setPosition(detailBg.x + detailBg.width - 28, detailBg.y - 9);
        this.addChildToContainer(processRed);
        this._processRed = processRed;
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed()) {
            processRed.visible = true;
        }
        else {
            processRed.visible = false;
        }
        var currProNum = this.vo.getProcessNum();
        var processNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullProcessNum", this.getUicode()), ["" + currProNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        processNum.textAlign = TextFieldConst.ALIGH_CENTER;
        processNum.$anchorOffsetX = processNum.width / 2;
        processNum.setPosition(detailBg.x + detailBg.width / 2, detailBg.y + detailBg.height / 2 - processNum.height / 2 - 10);
        this._processNum = processNum;
        //进度
        var proContainer = new BaseDisplayObjectContainer();
        proContainer.height = 140;
        this._proContainer = proContainer;
        var scrollView = ComponentManager.getScrollView(proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 95, proContainer.height));
        scrollView.setPosition(95, topBg.y - 25);
        this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChildToContainer(detailBg);
        this.addChildToContainer(processNum);
        this.initProContainer();
    };
    Object.defineProperty(AcPowerFullView.prototype, "progressOffX", {
        //进度 间距
        get: function () {
            return 120;
        },
        enumerable: true,
        configurable: true
    });
    //进度相关
    AcPowerFullView.prototype.initProContainer = function () {
        var _this = this;
        var data = this.cfg.getAchieveList();
        var len = data.length;
        var proW = this.progressOffX * len + 10;
        this._proContainer.width = proW;
        var _loop_1 = function (i) {
            var boxCon = new BaseDisplayObjectContainer();
            boxCon.width = 100;
            boxCon.height = this_1._proContainer.height;
            var box = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_box", this_1.getUicode()));
            box.setPosition(boxCon.width / 2 - box.width / 2, 20);
            box.name = "box" + i;
            var boxEff = ComponentManager.getCustomMovieClip("acpowerfull_boxeffect", 15);
            boxEff.name = "eff" + i;
            boxCon.addChild(boxEff);
            boxEff.width = 200;
            boxEff.height = 200;
            boxEff.playWithTime(-1);
            boxEff.x = box.x + box.width / 2 - boxEff.width * boxEff.scaleX / 2;
            boxEff.y = box.y + box.height / 2 - boxEff.height * boxEff.scaleY / 2;
            boxCon.addChild(box);
            var killFlag = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_killed", this_1.getUicode()));
            killFlag.setScale(0.8);
            killFlag.setPosition(boxCon.width / 2 - killFlag.width * killFlag.scaleX / 2, box.y + 20);
            boxCon.addChild(killFlag);
            killFlag.name = "killFlag" + i;
            var proNumBg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_processnumbg", this_1.getUicode()));
            proNumBg.setPosition(boxCon.width / 2 - proNumBg.width / 2, box.y + box.height - 10);
            boxCon.addChild(proNumBg);
            var proNum = ComponentManager.getTextField(data[i].needNum + "", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxCon.addChild(proNum);
            proNum.setPosition(proNumBg.x + proNumBg.width / 2 - proNum.width / 2, proNumBg.y + proNumBg.height / 2 - proNum.height / 2);
            boxCon.setPosition(10 + i * this_1.progressOffX, 0);
            this_1._proContainer.addChild(boxCon);
            boxCon.addTouchTap(function () {
                //进度
                ViewController.getInstance().openView(ViewConst.POPUP.ACPOWERFULLDETAILVIEWTAB2, { aid: _this.aid, code: _this.code, id: data[i].id });
            }, this_1);
            this_1._boxList[i] = boxCon;
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        this.refreshProContainer();
        var curId = this.vo.getCurProcessIndex();
        this._scrollView.scrollLeft = this._proContainer.width - this._scrollView.width;
        var posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        this.showViewMask();
        egret.Tween.get(this._scrollView).wait(300).to({ scrollLeft: posX }, (this._scrollView.scrollLeft - posX)).call(function () {
            _this.hideViewMask();
            egret.Tween.removeTweens(_this._scrollView);
        }, this);
    };
    //刷新进度
    AcPowerFullView.prototype.refreshProContainer = function () {
        var currProNum = this.vo.getProcessNum();
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            var group = this._boxList[i];
            var eff = group.getChildByName("eff" + i);
            var box = group.getChildByName("box" + i);
            var killFlag = group.getChildByName("killFlag" + i);
            eff.visible = false;
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                killFlag.visible = true;
            }
            else {
                killFlag.visible = false;
                if (currProNum >= data[i].needNum) {
                    eff.visible = true;
                }
            }
        }
    };
    AcPowerFullView.prototype.refreshProcess = function () {
        var _this = this;
        this.refreshProContainer();
        var curId = this.vo.getCurProcessIndex();
        var posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        egret.Tween.get(this._scrollView).wait(500).to({ scrollLeft: posX }, (this._scrollView.scrollLeft - posX)).call(function () {
            egret.Tween.removeTweens(_this._scrollView);
        }, this);
    };
    AcPowerFullView.prototype.getRewardCallback = function () {
        this.refreshProContainer();
    };
    AcPowerFullView.prototype.playBtnClick = function () {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        if (this._isBatch) {
            if (toolNum < 50) {
                this.showRechargeTip();
                return;
            }
            this._isTenPlay = true;
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: 0, isFifthPlay: 1 });
        }
        else {
            if (this.vo.isFree()) {
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: 0 });
            }
            else {
                var toolNum_1 = this.vo.getToolNum();
                if (toolNum_1 <= 0) {
                    this.showRechargeTip();
                    return;
                }
                var isTen = 0;
                this._isPlay = true;
                if (toolNum_1 < 10) {
                    this._isTenPlay = false;
                }
                else {
                    isTen = 1;
                    this._isTenPlay = true;
                }
                NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: isTen });
            }
        }
    };
    AcPowerFullView.prototype.playCallback = function (evt) {
        if (!evt.data.ret) {
            this._isPlay = false;
            return;
        }
        var rData = evt.data.data.data;
        this._rewardData = rData;
        if (this._isSkipAni) {
            this._isPlay = false;
            this.showRewardView();
        }
        else {
            this.showPlayAni();
        }
    };
    AcPowerFullView.prototype.showPlayAni = function () {
        var _this = this;
        this.showViewMask();
        var swordBMStr = "acmarryview_sword";
        var boneName = 'acmarryview_sword';
        var swordPosX = GameConfig.stageWidth / 4 - 95;
        if (this._isTenPlay || this._isBatch) {
            swordBMStr = "acmarryview_knife";
            boneName = 'acmarryview_knife';
            swordPosX = GameConfig.stageWidth * 3 / 4 - 95;
        }
        var sword = BaseLoadBitmap.create(swordBMStr);
        sword.width = 190;
        sword.height = 285;
        this.addChildToContainer(sword);
        sword.setPosition(swordPosX, GameConfig.stageHeigth - sword.height - 100);
        egret.Tween.get(sword, { loop: false })
            .to({ x: GameConfig.stageWidth / 2 - sword.width / 2, y: this._skinContainer.y + this._skinContainer.height / 2 - 20 }, 150, egret.Ease.sineIn)
            .call(function () {
            egret.Tween.removeTweens(sword);
            sword.visible = false;
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && boneName && RES.hasRes(boneName)) {
                var knifeBone_1 = App.DragonBonesUtil.getLoadDragonBones(boneName, 1);
                knifeBone_1.setPosition(_this._skinContainer.x, sword.y);
                _this.addChildToContainer(knifeBone_1);
                knifeBone_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    knifeBone_1.dispose();
                }, _this);
            }
            _this.showRoleAni();
            sword.dispose();
        });
    };
    //人物受攻击效果
    AcPowerFullView.prototype.showRoleAni = function () {
        var _this = this;
        var count = 0;
        egret.Tween.get(this._skinContainer, { loop: true })
            .to({ scaleX: 0.85, scaleY: 0.85 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(function () {
            count++;
            if (count >= 4) {
                egret.Tween.removeTweens(_this._skinContainer);
                _this._skinContainer.setScale(1);
                _this.showRewardView();
            }
        });
    };
    AcPowerFullView.prototype.showRewardView = function () {
        var _this = this;
        this.hideViewMask();
        this._isPlay = false;
        if (this._rewardData) {
            var rewards = this._rewardData.rewards;
            var replacerewards = this._rewardData.replacerewards;
            var isSameAdd = false;
            if (this._isTenPlay) {
                isSameAdd = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true, "isSameAdd": isSameAdd, "callback": function () {
                    _this.refreshProcess();
                } });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcPowerFullView.prototype.refreshView = function () {
        if (this.vo.getProcessNum() >= 50) {
            this._playMoreContainer.visible = true;
        }
        else {
            this._playMoreContainer.visible = false;
        }
        var currToolNum = this.vo.getToolNum();
        this._toolNumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullUseNum", this.getUicode()), ["" + currToolNum]);
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._playBtnTxt.setRes(App.CommonUtil.getResByCode("acpowerfull_playbtntxt1", this.getUicode()));
            this._freeDesc.visible = true;
            this._toolNumTxt.x = GameConfig.stageWidth / 2 - (this._toolNumTxt.width + this._freeDesc.width) / 2;
            this._freeDesc.x = this._toolNumTxt.x + this._toolNumTxt.width;
        }
        else {
            this._freeDesc.visible = false;
            this._toolNumTxt.x = GameConfig.stageWidth / 2 - this._toolNumTxt.width / 2;
            var playBtnKey = "acpowerfull_playbtntxt1";
            if (currToolNum >= 10) {
                playBtnKey = "acpowerfull_playbtntxt2";
            }
            if (this._isBatch) {
                playBtnKey = "acpowerfull_playbtntxt3";
            }
            this._playBtnTxt.setRes(App.CommonUtil.getResByCode(playBtnKey, this.getUicode()));
        }
        //碎片数量
        // let needItemVo = this.vo.getShowSkinData();
        // let pieceData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
        // let currPieceNum = 0;
        // if (pieceData){
        //     currPieceNum = pieceData.num;
        // }
        var currPieceNum = this.cfg.special.specialLimit - this.vo.getSpecailNum();
        if (currPieceNum < 0) {
            currPieceNum = 0;
        }
        this._pieceNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPieceNum", this.getUicode()), ["" + currPieceNum, "" + this.cfg.special.specialLimit]);
        //充值提示
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]);
        this._rechargeTip.x = GameConfig.stageWidth - this._rechargeTip.width - 15;
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed()) {
            this._processRed.visible = true;
        }
        else {
            this._processRed.visible = false;
        }
        //进度
        var currProNum = this.vo.getProcessNum();
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullProcessNum", this.getUicode()), ["" + currProNum]);
        this._processNum.anchorOffsetX = this._processNum.width / 2;
    };
    //充值提示
    AcPowerFullView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullPlayNumNotEnough", this.getUicode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "taskGoBtn"
        });
    };
    //首次进入对话
    AcPowerFullView.prototype.showStartDialog = function () {
        var localKey = "startDialog" + this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.st;
        LocalStorageManager.set(localKey, String(this.vo.st));
        var view = this;
        var keyStr = "startDialog_" + this.getUicode();
        var startCfg = view.cfg[keyStr];
        var skinNum = this.vo.getHasSkinNum();
        App.LogUtil.log("showStartDialog " + skinNum);
        if (skinNum == 0) {
            startCfg["1"]["10"].nextId = null;
        }
        else if (skinNum == 1) {
            var servantInfoVo = Api.servantVoApi.getServantObj("2004");
            if (servantInfoVo) {
                var skinId = servantInfoVo.getAllSkinList()[0];
                startCfg["1"]["11"].personPic = "skin_full_" + skinId;
            }
        }
        else {
            startCfg["1"]["11"].personPic = "skin_full_20042";
        }
        // let bgName = App.CommonUtil.getResByCode("acpowerfull_bg", this.getUicode());
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: view.getUicode(),
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acPowerFullStartDialog"
        });
    };
    AcPowerFullView.prototype.showSkinNumChangeView = function () {
        var _this = this;
        App.LogUtil.log("showSkinNumChangeView ");
        var id = this.vo.getShowSkinDialogId();
        if (id) {
            var msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRewardTip" + id, this.getUicode()));
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_PLOT, { plotId: id, activeId: _this.vo.aidAndCode });
                },
                handler: this
            });
        }
    };
    AcPowerFullView.prototype.roleClick = function () {
        var skinNum = this.vo.getHasSkinNum();
        if (skinNum > 2) {
            skinNum = 2;
        }
        var msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullRewardTip" + (skinNum + 1), this.getUicode()));
        App.CommonUtil.showTip(msg);
    };
    AcPowerFullView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    };
    AcPowerFullView.prototype.getRoleContainer = function (data) {
        if (!data) {
            return null;
        }
        var titleData = App.CommonUtil.getTitleData(data.title);
        var curLevel = 1;
        if (titleData.clv) {
            curLevel = titleData.clv;
        }
        var titleconfig = null;
        var curTitleId = null;
        if (titleData.clothes) {
            titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
            if (curLevel == 0) {
                curLevel = 1;
            }
        }
        var userContainer = null;
        App.LogUtil.log("curTitleId " + curTitleId);
        if (curTitleId) {
            userContainer = new BaseDisplayObjectContainer();
            userContainer.name = "userContainer";
            this.addChildToContainer(userContainer);
            var role = null;
            // let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
            // let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
            // if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
            // 	App.LogUtil.log("aaa dragonbone ");
            // 	role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
            // 	role.x = 340; //w432, h508
            // 	role.y = 35;
            // 	userContainer.addChild(role);
            // 	role.name = 'role';
            // 	userContainer.height = 790;
            // }else{
            role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic, null, null, null, null, null, true);
            role.y = -30;
            var isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
            if (isnew) {
                role.x = 0;
            }
            else {
                role.x = 155;
            }
            userContainer.addChild(role);
            userContainer.height = 765;
            // }
        }
        else {
            userContainer = new BaseDisplayObjectContainer();
            // let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
            var role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic, 0, false, null, null, curLevel, true);
            role.width = 300;
            role.y = -30;
            role.x = 190;
            userContainer.name = "userContainer";
            userContainer.addChild(role);
            userContainer.height = 765;
        }
        return userContainer;
    };
    //mask
    AcPowerFullView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcPowerFullView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcPowerFullView.prototype.dispose = function () {
        this.hideViewMask();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY, this.playCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD, this.getRewardCallback, this);
        if (this._scrollView) {
            egret.Tween.removeTweens(this._scrollView);
        }
        if (this._skinContainer) {
            egret.Tween.removeTweens(this._skinContainer);
        }
        this._timeBg = null;
        this._timeTxt = null;
        this._rechargeTip = null;
        this._rewardData = null;
        this._isPlay = false;
        this._isTenPlay = false;
        this._isBatch = false;
        this._isSkipAni = false;
        this._skipContainer = null;
        this._playMoreContainer = null;
        this._playBtnTxt = null;
        this._toolNumTxt = null;
        this._freeDesc = null;
        this._pieceNum = null;
        this._proContainer = null;
        this._scrollView = null;
        this._boxList = [];
        this._processRed = null;
        this._detailBg = null;
        this._processNum = null;
        this._skinContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullView;
}(AcCommonView));
//# sourceMappingURL=AcPowerFullView.js.map