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
// TypeScript file
/**
 * 网红来了活动
 */
var AcWifeComeView = (function (_super) {
    __extends(AcWifeComeView, _super);
    function AcWifeComeView() {
        var _this = _super.call(this) || this;
        //活动model对应vo
        _this._dataVo = null;
        //活动配置的cfg
        _this._dataCfg = null;
        //是否已经领取
        _this._isCollected = false;
        //容器
        _this._nodeContainer = null;
        //top背景图片
        _this._topBgImg = null;
        //bottom背景图片
        _this._bottomBgImg = null;
        //活动时间title文字
        _this._actTimeTitleText = null;
        //活动时间文本
        _this._actTimeText = null;
        //绝版活动限时的文本
        _this._actDescText = null;
        //活动详情文本
        _this._actDetailText = null;
        //照片
        _this._contentImg = null;
        //真人入住的标识
        _this._misaJoinImg = null;
        //进度条
        _this._progress = null;
        //进度条文字
        _this._progressText = null;
        //已经领取标识
        _this._collectFlag = null;
        //领取按钮
        _this._collectBtn = null;
        //充值按钮
        _this._chargeBtn = null;
        _this._avatar1 = null;
        _this._timeBg = null;
        _this._acTimeTf = null;
        return _this;
    }
    //init view 
    AcWifeComeView.prototype.initView = function () {
        //初始化数据
        if (this._dataVo == null) {
            this._dataVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        }
        if (this._dataCfg == null) {
            this._dataCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        }
        //初始化已经领取标识
        this._isCollected = this._dataVo.get == 1 ? true : false;
        //初始化界面
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = GameConfig.stageHeigth - 104;
        this.addChildToContainer(this._nodeContainer);
        this._topBgImg = BaseBitmap.create("forpeople_top");
        this._topBgImg.y = -82;
        this._nodeContainer.addChild(this._topBgImg);
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            this._nodeContainer.y = this.titleBg.height + this.titleBg.y + 7;
        }
        this._actTimeTitleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._actTimeTitleText.text = LanguageManager.getlocal("acWifeComeTimeTitle");
        this._actTimeTitleText.x = 10;
        this._actTimeTitleText.y = this._topBgImg.y + 75;
        this._nodeContainer.addChild(this._actTimeTitleText);
        this._actTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        this._actTimeText.text = this._dataVo.acTimeAndHour; //"11月20日－11月22日(每日9-22点)";
        this._actTimeText.x = 110;
        this._actTimeText.y = this._topBgImg.y + 75;
        this._nodeContainer.addChild(this._actTimeText);
        if (PlatformManager.checkIsTextHorizontal()) {
            this._actTimeText.x = this._actTimeTitleText.x + this._actTimeTitleText.width;
        }
        var descStr = "acWifeComeDesc_" + this.code;
        if (this.code == "1") {
            descStr = "acWifeComeDesc";
        }
        this._actDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._actDescText.text = LanguageManager.getlocal(descStr); //"绝版活动限时来袭，快来与Misa缔结良缘";
        this._actDescText.x = 10;
        this._actDescText.y = this._topBgImg.y + 105;
        this._nodeContainer.addChild(this._actDescText);
        var detailStr = "acWifeComeDetail_" + this.code;
        if (this.code == "1") {
            detailStr = "acWifeComeDetail";
        }
        this._actDetailText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        if (this.code == "3") {
            this._actDescText.text = LanguageManager.getlocal(descStr, [this._dataCfg.exchange]); //"绝版活动限时来袭，快来与Misa缔结良缘";
            this._actDetailText.text = LanguageManager.getlocal(detailStr, [this._dataCfg.servantneed, this._dataCfg.need]); //"活动期间，每充值1元会赠送给红颜1朵花，满99朵获得米莎公主";
        }
        else {
            this._actDetailText.text = LanguageManager.getlocal(detailStr, [this._dataCfg.exchange, this._dataCfg.need]); //"活动期间，每充值1元会赠送给红颜1朵花，满99朵获得米莎公主";
        }
        this._actDetailText.x = 10;
        this._actDetailText.y = this._topBgImg.y + 135;
        this._nodeContainer.addChild(this._actDetailText);
        var bgStr = "acwifecomeview_content_" + this.code;
        if (this.code == "1") {
            bgStr = "acwifecomeview_content";
        }
        this._contentImg = BaseLoadBitmap.create(bgStr);
        this._contentImg.y = -82 + this._topBgImg.height;
        this._nodeContainer.addChild(this._contentImg);
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            //倒计时
            this._timeBg = BaseBitmap.create("public_9_bg61");
            this._timeBg.y = this._contentImg.y + 2;
            this._nodeContainer.addChild(this._timeBg);
            this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeTimeCountDown", [this._dataVo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
            this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
            this._nodeContainer.addChild(this._acTimeTf);
        }
        if (this.code != "3" && this.code != "4" && this.code != "5" && this.code != "6" && this.code != "7") {
            //网红名字背景
            var nameBg = BaseBitmap.create("wifeview_namebg");
            nameBg.x = 20;
            nameBg.y = 285;
            this.addChildToContainer(nameBg);
            if (this.code == "4" || this.code == "5") {
                nameBg.y = this.titleBg.y + this.titleBg.height + 7 + 285;
            }
            //网红名字
            var nameStr = "acWifeComeName_" + this.code;
            if (this.code == "1") {
                nameStr = "acWifeComeName";
            }
            var nameTF = ComponentManager.getTextField(LanguageManager.getlocal(nameStr), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameBg.width = nameTF.width + 30;
                nameTF.setPosition(nameBg.x + nameBg.width / 2 - nameTF.width / 2, nameBg.y + nameBg.height / 2 - nameTF.height / 2);
            }
            else {
                nameTF.width = 27;
                nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
                nameTF.y = nameBg.y + 190 / 2 - nameTF.height / 2;
            }
            this.addChildToContainer(nameTF);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameTF.setVisible(false);
                nameBg.setVisible(false);
            }
        }
        this._bottomBgImg = BaseBitmap.create("wifeskin_barbg");
        this._bottomBgImg.y = this._nodeContainer.height - this._bottomBgImg.height + 13;
        //添加预览
        // 佳人
        if (this.code == "5" || this.code == "6" || this.code == "7") {
            var skinCfg = null;
            if (this.code == "5") {
                skinCfg = Config.WifeCfg.getWifeCfgById(this._dataCfg.wifeId);
            }
            else if (this.code == "6" || this.code == "7") {
                skinCfg = Config.WifeskinCfg.getWifeCfgById(this._dataCfg.wifeSkinID);
            }
            var boneName = skinCfg.bone + "_ske";
            var wife = null;
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.9); //0.53
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = this._bottomBgImg.x + this._bottomBgImg.width / 2;
                wife.y = this._bottomBgImg.y + 15;
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.7);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = this._bottomBgImg.x + this._bottomBgImg.width / 2;
                wife.y = this._bottomBgImg.y + 15;
            }
            this._nodeContainer.addChild(wife);
            var maskBg = BaseBitmap.create("acwifecomview_maskbg");
            maskBg.x = this._bottomBgImg.x + this._bottomBgImg.width / 2 - maskBg.width / 2;
            maskBg.y = this._bottomBgImg.y - maskBg.height;
            this._nodeContainer.addChild(maskBg);
        }
        this._nodeContainer.addChild(this._bottomBgImg);
        this._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 580);
        this._progress.y = this._bottomBgImg.y - 50;
        this._progress.x = 40;
        this._nodeContainer.addChild(this._progress);
        this._progressText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        this._progressText.text = "0/0";
        this._progressText.textAlign = egret.HorizontalAlign.CENTER;
        this._progressText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._progressText.x = GameConfig.stageWidth / 2 - this._progressText.width / 2;
        this._progressText.y = this._progress.y + 4;
        this._nodeContainer.addChild(this._progressText);
        //花
        var flowerStr = "acwifecomeview_flower_" + this.code;
        if (this.code == "1" || this.code == "3") {
            flowerStr = "acwifecomeview_flower";
        }
        var flowerImg = BaseBitmap.create(flowerStr);
        flowerImg.x = 17;
        flowerImg.y = this._bottomBgImg.y - 65;
        this._nodeContainer.addChild(flowerImg);
        //预览按钮
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            var id = "";
            if (this.code == "4") {
                id = this._dataCfg.sceneID;
            }
            else if (this.code == "5") {
                id = this._dataCfg.wifeId;
            }
            else if (this.code == "6" || this.code == "7") {
                id = this._dataCfg.wifeSkinID;
            }
            var skinEffect = this.getSkinBtnContainer(id, null);
            skinEffect.x = this._progress.x + this._progress.width / 2 - 115;
            skinEffect.y = this._progress.y - 100;
            if (this.code == "5") {
                skinEffect.y = this._progress.y - 190;
            }
            else if (this.code == "6" || this.code == "7") {
                skinEffect.y = this._progress.y - 180;
            }
            this._nodeContainer.addChild(skinEffect);
        }
        //添加vo数据更改的消息监听
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE, this.refreshDataStatus, this);
        if (this.code != "3" && this.code != "4") {
            var additionBM = BaseBitmap.create("acwifecomeview_servant_" + this.code);
            additionBM.setPosition(GameConfig.stageWidth / 2 - additionBM.width / 2, this._progress.y - 10 - additionBM.height);
            this.addChildToContainer(additionBM);
            if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
                // additionBM.y = GameConfig.stageHeigth - this._bottomBgImg.height - this._progress.height - 130;
                additionBM.y = GameConfig.stageHeigth - this._bottomBgImg.height - this._progress.height - additionBM.height - 5;
            }
            if (PlatformManager.checkIsThSp() && this.code == "1") {
                additionBM.setPosition(0, 200);
            }
        }
        if (this.code == "3") {
            var avatar1 = BaseLoadBitmap.create("acwifecomeview_head_3_1");
            avatar1.width = 42;
            avatar1.height = 47;
            avatar1.setPosition(GameConfig.stageWidth / 2 - avatar1.width / 2, this._progress.y - 10 - avatar1.height);
            this._nodeContainer.addChild(avatar1);
            var avatar2 = BaseLoadBitmap.create("acwifecomeview_head_3_2");
            avatar2.width = avatar1.width;
            avatar2.height = avatar1.height;
            avatar2.setPosition(this._progress.x + this._progress.width - avatar2.width, avatar1.y);
            this._nodeContainer.addChild(avatar2);
            var wordImg = BaseLoadBitmap.create("acwifecomeview_word_3_1");
            wordImg.width = 605;
            wordImg.height = 114;
            wordImg.setPosition(GameConfig.stageWidth / 2 - wordImg.width / 2, avatar1.y - wordImg.height - 5);
            this._nodeContainer.addChild(wordImg);
            var charTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            charTxt.text = LanguageManager.getlocal("acWifeComeName_chargeTxt", ["" + this._dataCfg.servantneed]);
            charTxt.x = avatar1.x + avatar1.width / 2 - charTxt.width / 2;
            charTxt.y = this._progress.y + this._progress.height + 1;
            this._nodeContainer.addChild(charTxt);
            var charTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            charTxt2.text = LanguageManager.getlocal("acWifeComeName_chargeTxt", ["" + this._dataCfg.need]);
            charTxt2.x = avatar2.x + avatar2.width - charTxt2.width - 5;
            charTxt2.y = charTxt.y;
            this._nodeContainer.addChild(charTxt2);
            var tip2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
            tip2.text = LanguageManager.getlocal("acWifeCome_3_collectTip2");
            tip2.x = this._bottomBgImg.x + this._bottomBgImg.width / 2 - tip2.width / 2;
            tip2.y = this._bottomBgImg.y + 5;
            this._nodeContainer.addChild(tip2);
            var servant_mask = BaseLoadBitmap.create("servant_mask");
            servant_mask.width = GameConfig.stageWidth;
            servant_mask.height = 140;
            servant_mask.x = GameConfig.stageWidth / 2 - servant_mask.width / 2;
            servant_mask.y = this._bottomBgImg.y - servant_mask.height;
            this._nodeContainer.addChildAt(servant_mask, 6);
            this._avatar1 = avatar1;
        }
        if (this.code == "3") {
            var servantCfg = Config.ServantCfg.getServantItemById("1053");
            if (servantCfg.quality2) {
                var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
                cornerImg.x = 555;
                cornerImg.y = GameConfig.stageHeigth - 353;
                cornerImg.setScale(1.3);
                this.addChild(cornerImg);
            }
        }
        //刷新数据状态
        this.refreshDataStatus();
    };
    //刷新按钮初始化状态
    AcWifeComeView.prototype.refreshDataStatus = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        //刷新进度条上的文本进度显示
        var totalNeed = this._dataCfg.need;
        this._progressText.text = (this._dataVo.v > totalNeed ? totalNeed : this._dataVo.v) + "/" + totalNeed;
        this._progressText.x = GameConfig.stageWidth / 2 - this._progressText.width / 2;
        this._progress.setPercentage(this._dataVo.v / this._dataCfg.need);
        //实际数值和需要数值的差
        var val = this._dataVo.v - totalNeed;
        var showMark = 0; //1->显示充值按钮  2->显示领取按钮  3->显示标识
        if (this.code == "3") {
            val = this._dataVo.v - this._dataCfg.servantneed;
            if (this._dataVo.v < this._dataCfg.servantneed) {
                showMark = 1;
            }
            else if (this._dataVo.v >= this._dataCfg.need) {
                if (this._dataVo.get < 2) {
                    showMark = 2;
                }
            }
            else {
                if (this._dataVo.get < 1) {
                    showMark = 2;
                }
                else {
                    showMark = 1;
                }
            }
            if (this._avatar1 && vo.get == 1) {
                App.DisplayUtil.changeToGray(this._avatar1);
            }
            else {
                App.DisplayUtil.changeToNormal;
            }
        }
        else {
            App.LogUtil.log("this._davo.get: " + this._dataVo.get);
            App.LogUtil.log("iscollect: " + this._isCollected + "  val: " + val);
            if (val < 0) {
                //没有达成需求，显示去充值按钮
                showMark = 1;
            }
            else {
                //已经达成需求，显示 领取按钮 或者显示 已经领取标识
                if (this._dataVo.get == 0) {
                    //没领取 显示 领取按钮
                    showMark = 2;
                }
                else if (this._dataVo.get == 1) {
                    //已经领取 显示 已经领取标识
                    showMark = 3;
                }
            }
        }
        //刷新按钮状态
        this.refreshBtnStatus(showMark);
    };
    // private checkOwnWife():boolean{
    //     if(Api.wifeVoApi.getWifeInfoVoById(Number(213)))
    //     {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    //显示按钮
    //1->显示充值按钮  2->显示领取按钮  3->显示标识
    AcWifeComeView.prototype.refreshBtnStatus = function (showMar) {
        //创建按钮
        if (this._chargeBtn == null) {
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
            this._chargeBtn.x = GameConfig.stageWidth / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._chargeBtn);
        }
        if (this._collectBtn == null) {
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.collectBtnHandler, this);
            this._collectBtn.x = GameConfig.stageWidth / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._collectBtn);
        }
        if (this._collectFlag == null) {
            this.createCollectFlag();
        }
        App.LogUtil.log("showMAR: " + showMar);
        //1->显示充值按钮  2->显示领取按钮  3->显示标识
        switch (showMar) {
            case 1:
                this._chargeBtn.visible = true;
                this._collectBtn.visible = false;
                this._collectFlag.visible = false;
                break;
            case 2:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = true;
                this._collectFlag.visible = false;
                break;
            case 3:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = false;
                this._collectFlag.visible = true;
                // this.checkShowCollectAnim();
                break;
            default:
                break;
        }
    };
    //创建已领取标识
    AcWifeComeView.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.setScale(0.7);
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.x = GameConfig.stageWidth / 2;
        this._collectFlag.y = this._bottomBgImg.y + 50;
        this._nodeContainer.addChild(this._collectFlag);
    };
    //判断是否播放标识动画
    AcWifeComeView.prototype.checkShowCollectAnim = function () {
        //刚刚领取 播放动画
        if (!this._isCollected) {
            this._isCollected = true;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
        }
        else {
            this._collectFlag.visible = true;
        }
    };
    //点击领取按钮
    AcWifeComeView.prototype.collectBtnHandler = function () {
        if (this.code == "3") {
            // let isOwn = Api.servantVoApi.getServantObj("1053") ? true : false;
            //   acWifeCome_3_collectTip
            var wifename = LanguageManager.getlocal("wifeName_219");
            ViewController.getInstance().openView(ViewConst.POPUP.ACWIFECOMECOLLECTPOPUPVIEW, {
                wifeId: "219",
                callback: this.doCollectRequest,
                handler: this,
                needCancel: true,
                aid: this.aid,
                code: this.code
            });
        }
        else {
            this.doCollectRequest();
        }
    };
    AcWifeComeView.prototype.doCollectRequest = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD), this.collectBtnHandlerCallback, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD, { activeId: this.aid + "-" + this.code });
    };
    //领取请求返回
    AcWifeComeView.prototype.collectBtnHandlerCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD), this.collectBtnHandlerCallback, this);
        var ret = event.data.data.ret;
        // let data = {get:1,v:this._dataVo.v};
        // this._dataVo.testFunc(data);
        console.log(event);
        //领取失败
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        else {
            var replacerewards = event.data.data.data.replacerewards;
            if (this.code == "3") {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                // let isOwn = Api.wifeVoApi.getWifeInfoVoById("219");
                var isOwn = vo.get == 2 ? true : false;
                if (!isOwn) {
                    if (replacerewards) {
                        var oldReward = "";
                        var newReward_1 = "";
                        for (var key in replacerewards[0]) {
                            if (key && replacerewards[0][key]) {
                                oldReward = String(key);
                                newReward_1 = replacerewards[0][key];
                            }
                        }
                        var rewardName = Config.ServantCfg.getServantItemById(GameData.formatRewardItem(oldReward)[0].id).name;
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": rewardName, "touch": newReward_1, "message": "changeOtherRewardTip", "callback": function () {
                                var rewardVo = GameData.formatRewardItem(newReward_1);
                                App.CommonUtil.playRewardFlyAction(rewardVo);
                            }, handler: this });
                    }
                    this.refreshDataStatus();
                }
                else {
                    if (replacerewards) {
                        var oldReward = "";
                        var newReward_2 = "";
                        for (var key in replacerewards[0]) {
                            if (key && replacerewards[0][key]) {
                                oldReward = String(key);
                                newReward_2 = replacerewards[0][key];
                            }
                        }
                        var rewardName = Config.WifeCfg.getWifeCfgById(GameData.formatRewardItem(oldReward)[0].id).name;
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": rewardName, "touch": newReward_2, "message": "changeOtherRewardTip", "callback": function () {
                                var rewardVo = GameData.formatRewardItem(newReward_2);
                                App.CommonUtil.playRewardFlyAction(rewardVo);
                            }, handler: this });
                    }
                    this.checkRewardSuccess();
                }
            }
            else {
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                }
                this.checkRewardSuccess();
            }
        }
    };
    //成功获取 隐藏按钮
    AcWifeComeView.prototype.checkRewardSuccess = function () {
        //创建按钮
        if (this._chargeBtn == null) {
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
            this._chargeBtn.x = GameConfig.stageWidth / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._chargeBtn);
        }
        if (this._collectBtn == null) {
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.collectBtnHandler, this);
            this._collectBtn.x = GameConfig.stageWidth / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._bottomBgImg.y + 25;
            this._nodeContainer.addChild(this._collectBtn);
        }
        if (this._collectFlag == null) {
            this.createCollectFlag();
        }
        this._chargeBtn.visible = false;
        this._collectBtn.visible = false;
        this.checkShowCollectAnim();
    };
    //跳转充值界面
    AcWifeComeView.prototype.goRechargeHandler = function () {
        if (!this._dataVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    //衣装预览按钮
    AcWifeComeView.prototype.getSkinBtnContainer = function (id, type, isOther) {
        var _this = this;
        var container = new BaseDisplayObjectContainer();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        container.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxtStr = "acgiftreturnview_common_skintxt";
        var skinTxt = BaseBitmap.create(skinTxtStr);
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        container.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        // skinTxt.touchEnabled = false;
        var skinTxteffect = BaseBitmap.create(skinTxtStr);
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        container.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        // skinTxteffect.touchEnabled = false;
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 40;
        touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        touchPos.addTouchTap(function () {
            if (_this.code == "5") {
                var skinId = Config.WifeCfg.formatRewardItemVoStr(id);
                var topMsg = LanguageManager.getlocal("acWifeComeSkinTopMsg-" + _this.code, ["" + _this._dataCfg.need]);
                var data = { data: [
                        { idType: skinId, scale: 0.55, offY: -5, topMsg: topMsg }
                    ], showType: "" };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
            else if (_this.code == "4") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACWIFECOMESCENEPOPUPVIEW, { aid: _this.aid, code: _this.code });
            }
            else if (_this.code == "6" || _this.code == "7") {
                var skinId = Config.WifeskinCfg.formatRewardItemVoStr(id);
                var topMsg = LanguageManager.getlocal("acWifeComeSkinTopMsg-" + _this.code, ["" + _this._dataCfg.need]);
                var data = { data: [
                        { idType: skinId, scale: 0.62, offY: -5, topMsg: topMsg }
                    ], showType: "" };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
        }, this);
        return container;
    };
    AcWifeComeView.prototype.tick = function () {
        if (this._acTimeTf) {
            this._acTimeTf.text = LanguageManager.getlocal("acWifeComeTimeCountDown", [this._dataVo.getCountDown()]);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
            this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        }
    };
    //加载资源
    AcWifeComeView.prototype.getResourceList = function () {
        var arr = [];
        if (this.code != "3" && this.code != "4") {
            arr.push("acwifecomeview_servant_" + this.code);
        }
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            arr.push("acwifecomview_titlebg-" + this.code);
            arr.push("acwifecomview_maskbg");
            arr.push("acgiftreturnview_common_skintxt");
        }
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_top",
            // "acwifecomeview_content",
            "wifeskin_barbg",
            "progress3",
            "progress3_bg",
            (this.code == "1" || this.code == "3") ? "acwifecomeview_flower" : "acwifecomeview_flower_" + this.code,
            "wifeview_namebg",
        ]).concat(arr);
    };
    AcWifeComeView.prototype.isHideTitleBgShadow = function () {
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            return true;
        }
        return false;
    };
    AcWifeComeView.prototype.getTitleBgName = function () {
        if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            return "acwifecomview_titlebg-" + this.code;
        }
        return _super.prototype.getTitleBgName.call(this);
    };
    /**
     *
     */
    AcWifeComeView.prototype.getTitleStr = function () {
        if (this.code == "1") {
            return "acWifeComeViewTitle";
        }
        else if (this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7") {
            return "";
        }
        else {
            return "acWifeComeViewTitle_" + this.code;
        }
    };
    /**红颜info */
    AcWifeComeView.prototype.getRuleInfo = function () {
        if (this.code == "3") {
            return "acWifeComeViewRuleInfo_" + this.code;
        }
        else {
            return null;
        }
    };
    /**红颜info */
    AcWifeComeView.prototype.getRuleInfoParam = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.code == "3") {
            return [String(cfg.exchange), String(cfg.servantneed), String(cfg.need)];
        }
        else {
            return [];
        }
    };
    AcWifeComeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE, this.refreshDataStatus, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD), this.collectBtnHandlerCallback, this);
        this._dataVo = null;
        this._dataCfg = null;
        this._isCollected = false;
        this._nodeContainer = null;
        this._topBgImg = null;
        this._bottomBgImg = null;
        this._actTimeTitleText = null;
        this._actTimeText = null;
        this._actDescText = null;
        this._actDetailText = null;
        this._contentImg = null;
        this._misaJoinImg = null;
        this._progress = null;
        this._progressText = null;
        this._collectFlag = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._avatar1 = null;
        this._timeBg = null;
        this._acTimeTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcWifeComeView;
}(AcCommonView));
__reflect(AcWifeComeView.prototype, "AcWifeComeView");
//# sourceMappingURL=AcWifeComeView.js.map