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
  * 除夕7天签到活动
  * @author 张朝阳
  * date 2018/12/17
  * @class AcNewYearSignUpView
  */
var AcNewYearSignUpView = (function (_super) {
    __extends(AcNewYearSignUpView, _super);
    // private lanternbtnPosCfg: { x: number, y: number, depth: number }[] = [
    // 	{ x: 44, y: 108, depth: 110 },
    // 	{ x: 116, y: 55, depth: 109 },
    // 	{ x: 189, y: 97, depth: 108 },
    // 	{ x: 268, y: 69, depth: 107 },
    // 	{ x: 354, y: 106, depth: 106 },
    // 	{ x: 427, y: 60, depth: 105 },
    // 	{ x: 492, y: 116, depth: 104 },
    // ];
    function AcNewYearSignUpView() {
        var _this = _super.call(this) || this;
        _this._lanternInfoList = [];
        _this._receiveBtn = null;
        _this._receiveBM = null;
        _this._giftBtn = null;
        /**是否需要补签 */
        _this._isHaveSign = false;
        _this._type = 0;
        _this._timeTF = null;
        _this._timeBg = null;
        _this._isShowTime = false;
        _this._isShowTip = false;
        _this._isRefresh = false;
        _this._bgIndex = 0;
        return _this;
    }
    Object.defineProperty(AcNewYearSignUpView.prototype, "lanternbtnPosCfg", {
        get: function () {
            if (this.getTypeCode() == "1") {
                return [
                    { x: 44, y: 108, depth: 110 },
                    { x: 116, y: 55, depth: 109 },
                    { x: 189, y: 97, depth: 108 },
                    { x: 268, y: 69, depth: 107 },
                    { x: 354, y: 106, depth: 106 },
                    { x: 427, y: 60, depth: 105 },
                    { x: 492, y: 116, depth: 104 }
                ];
            }
            else {
                return [
                    { x: 46, y: 184, depth: 110 },
                    { x: 200, y: 230, depth: 109 },
                    { x: 363, y: 180, depth: 108 }
                ];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearSignUpView.prototype, "lihuaCfg", {
        //礼花
        get: function () {
            return [
                { name: "purple", x: -116, y: 66, scale: 0.5, frames: 12 },
                { name: "blue", x: 80, y: -44, scale: 0.7, frames: 11 },
                { name: "green", x: 252, y: 73, scale: 0.3, frames: 11 },
                { name: "purple", x: 403, y: 149, scale: 1, frames: 12 },
                { name: "green", x: 321, y: 0, scale: 1, frames: 11 },
                { name: "blue", x: 29, y: 88, scale: 0.8, frames: 11 },
                { name: "purple", x: 207, y: 100, scale: 0.5, frames: 12 },
                { name: "green", x: 438, y: -62, scale: 0.5, frames: 11 },
                { name: "blue", x: 332, y: 107, scale: 1, frames: 11 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearSignUpView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD, this.receiveHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.LogUtil.log("initView: aid: " + this.aid + " code:" + this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        var bg = null;
        var rewardBg = null;
        if (this.getTypeCode() == "1") {
            bg = BaseLoadBitmap.create("acnewyearsignupview_bg");
            bg.width = 590;
            bg.height = 700;
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2 - 20, GameConfig.stageHeigth / 2 - bg.height / 2);
            this.addChildToContainer(bg);
            var titleBg = BaseLoadBitmap.create("acnewyearsignupview_title");
            titleBg.width = 462;
            titleBg.height = 194;
            titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2 + 20, bg.y - titleBg.height / 2);
            this.addChildToContainer(titleBg);
            this.closeBtn.setPosition(bg.x + bg.width - this.closeBtn.width / 2 - 30, bg.y - this.closeBtn.height / 2 + 30);
        }
        else {
            bg = BaseBitmap.create("acnewyearsignup_bg-" + this.getTypeCode());
            bg.setPosition(0, GameConfig.stageHeigth - bg.height);
            this.addChildToContainer(bg);
            var bgIndex = this.container.getChildIndex(bg);
            this._bgIndex = bgIndex;
            this.showLiHua();
            var bgTree = BaseBitmap.create("acnewyearsignup_treeline-" + this.getTypeCode());
            bgTree.setPosition(10, this.titleBg.y + this.titleBg.height - 12);
            this.addChildToContainer(bgTree);
            var bgFrame = BaseBitmap.create("acnewyearsignupview_common_bgframe");
            bgFrame.width = GameConfig.stageWidth;
            bgFrame.height = GameConfig.stageHeigth;
            this.addChildToContainer(bgFrame);
            rewardBg = BaseBitmap.create("acnewyearsignupview_common_rewardbg");
            rewardBg.setPosition(bg.x + bg.width - rewardBg.width - 50, GameConfig.stageHeigth - 176 - rewardBg.height);
            this.addChildToContainer(rewardBg);
        }
        var lanternBtnStr = "acnewyearsignupview_lanternbtn";
        var lanternTfStr = "acNewYearSignUpViewlanternType";
        if (this.getTypeCode() == "2") {
            lanternBtnStr = "acnewyearsignupview_lanternbtn-" + this.getTypeCode();
            lanternTfStr = "acNewYearSignUpViewlanternType-" + this.getTypeCode() + "_";
        }
        //灯笼的位置
        for (var i = 0; i < this.lanternbtnPosCfg.length; i++) {
            var lanternbtn = ComponentManager.getButton(lanternBtnStr, null, this.rewardInfoClick, this, [i + 1]);
            this.container.addChildAt(lanternbtn, this.lanternbtnPosCfg[i].depth);
            var lanternTF = ComponentManager.getTextField(LanguageManager.getlocal(lanternTfStr + String(i + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x891414);
            if (this.getTypeCode() == "2") {
                lanternbtn.setPosition(this.lanternbtnPosCfg[i].x, this.lanternbtnPosCfg[i].y);
                //英 泰 俄 葡
                if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
                    lanternTF.setPosition(lanternbtn.x + lanternbtn.width / 2 - lanternTF.width / 2 + 13, lanternbtn.y + lanternbtn.height / 2 - lanternTF.height / 2 + 10);
                }
                else {
                    lanternTF.size = TextFieldConst.FONTSIZE_TITLE_COMMON;
                    lanternTF.width = 32;
                    lanternTF.setPosition(lanternbtn.x + lanternbtn.width / 2 - lanternTF.width / 2 + 13, lanternbtn.y + lanternbtn.height / 2 - lanternTF.height / 2 + 10);
                }
            }
            else {
                lanternbtn.setPosition(bg.x + this.lanternbtnPosCfg[i].x, bg.y + this.lanternbtnPosCfg[i].y);
                lanternTF.setPosition(lanternbtn.x + lanternbtn.width / 2 - lanternTF.width / 2, lanternbtn.y + lanternbtn.height / 2 - lanternTF.height / 2);
            }
            this.container.addChildAt(lanternTF, this.lanternbtnPosCfg[i].depth + 1);
            var rewardRewardVo = GameData.formatRewardItem(cfg.getNewSignUpItemCfg(i).getReward);
            var rewardContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(rewardContainer);
            //奖励的位置
            for (var i_1 = 0; i_1 < rewardRewardVo.length; i_1++) {
                var rewardScale = 0.8;
                var rewardDB = GameData.getItemIcon(rewardRewardVo[i_1], true, true);
                rewardDB.setScale(rewardScale);
                if (this.getTypeCode() == "2") {
                    rewardDB.setPosition(rewardBg.x + 28 + ((rewardDB.width * rewardScale + 20) * (i_1 % 2)), rewardBg.y + 15 + ((rewardDB.height * rewardScale + 12) * Math.floor(i_1 / 2)));
                }
                else {
                    rewardDB.setPosition(bg.x + 338 + ((rewardDB.width * rewardScale + 16) * (i_1 % 2)), bg.y + 405 + ((rewardDB.height * rewardScale + 12) * Math.floor(i_1 / 2)));
                }
                rewardContainer.addChild(rewardDB);
            }
            var lanternInfo = { id: i + 1, lanternBtn: lanternbtn, lanternTF: lanternTF, rewardContainer: rewardContainer };
            this._lanternInfoList.push(lanternInfo);
        }
        var bottomBg = null;
        if (this.getTypeCode() == "2") {
            bottomBg = BaseBitmap.create("duanwu_handrail");
            bottomBg.setPosition(bg.x + bg.width / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
            //佳人衣装
            var skinId = "1071";
            var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var boneName = wifeSkinCfg.bone + "_ske";
            var role = null;
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                role = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                role.setScale(0.95);
                role.anchorOffsetY = role.height;
                role.anchorOffsetX = 0;
                role.x = 170;
                role.y = bottomBg.y + 120;
            }
            else {
                role = BaseLoadBitmap.create(wifeSkinCfg.body);
                role.width = 640;
                role.height = 840;
                role.anchorOffsetY = role.height;
                role.anchorOffsetX = 0;
                role.setScale(0.65);
                role.x = -30;
                role.y = bottomBg.y + 120;
            }
            this.addChildToContainer(role);
            this.addChildToContainer(bottomBg);
        }
        this._receiveBtn = ComponentManager.getButton("acnewyearsignupview_common_receivebtn", null, this.receiveBtnClick, this);
        this._receiveBtn.setPosition(bg.x + bg.width - this._receiveBtn.width - 70, bg.y + bg.height - this._receiveBtn.height - 22);
        this.addChildToContainer(this._receiveBtn);
        var receiveBMSclae = 0.85;
        var bmStr = "collectflag";
        if (this.getTypeCode() == "2") {
            bmStr = "collectflag_yellow";
        }
        this._receiveBM = BaseBitmap.create(bmStr);
        this._receiveBM.setScale(receiveBMSclae);
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMSclae / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * receiveBMSclae / 2);
        this.addChildToContainer(this._receiveBM);
        var giftBtnStr = "acnewyearsignupview_giftbtn";
        if (this.getTypeCode() == "2") {
            giftBtnStr = "acnewyearsignupview_giftbtn-" + this.getTypeCode();
        }
        this._giftBtn = ComponentManager.getButton(giftBtnStr, null, this.giftBtnClick, this);
        this._giftBtn.setPosition(bg.x + 35, bg.y + bg.height - this._giftBtn.height);
        this.addChildToContainer(this._giftBtn);
        var npcTalkTail = BaseBitmap.create("public_9_bg25_tail");
        npcTalkTail.setPosition(bg.x + 275, bg.y + 375);
        this.addChildToContainer(npcTalkTail);
        var npcTalkBg = BaseBitmap.create("public_9_bg25");
        npcTalkBg.width = 320;
        var npcTalkStr = "acNewYearSignUpViewNpcTalk";
        if (this.getTypeCode() == "2") {
            npcTalkStr = "acNewYearSignUpViewNpcTalk-" + this.getTypeCode();
        }
        var npcTalkTxt = ComponentManager.getTextField(LanguageManager.getlocal(npcTalkStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        npcTalkTxt.width = 290;
        npcTalkBg.height = 30 + npcTalkTxt.height;
        if (this.getTypeCode() == "2") {
            npcTalkTail.setPosition(bg.x + 280, rewardBg.y - npcTalkTail.height);
        }
        npcTalkBg.setPosition(npcTalkTail.x - 30, npcTalkTail.y - npcTalkBg.height + 3);
        npcTalkTxt.setPosition(npcTalkBg.x + npcTalkBg.width / 2 - npcTalkTxt.width / 2, npcTalkBg.y + npcTalkBg.height / 2 - npcTalkTxt.height / 2);
        this.addChildToContainer(npcTalkBg);
        this.addChildToContainer(npcTalkTxt);
        if (this.getTypeCode() == "2") {
            this._receiveBtn.setPosition(bg.x + bg.width - this._receiveBtn.width - 86, bottomBg.y - 10);
            this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMSclae / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * receiveBMSclae / 2);
            this._giftBtn.setPosition(bg.x + 25, bottomBg.y - this._giftBtn.height + 55);
            this._timeBg = BaseBitmap.create("public_9_bg61");
            this._timeBg.y = bg.y + bg.height - 570;
            this.addChildToContainer(this._timeBg);
            this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearSignUpViewTimeDown", [vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeBg.width = 40 + this._timeTF.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
            this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
            this.addChildToContainer(this._timeTF);
        }
        else {
            this._ruleBtn.setPosition(bg.x + bg.width - this._ruleBtn.width - 45, bg.y + 225);
            if (PlatformManager.checkIsTextHorizontal() || PlatformManager.checkIsKRSp()) {
                this._ruleBtn.setPosition(bg.x + 40, bg.y + 225);
            }
            this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearSignUpViewTime", [App.DateUtil.getFormatBySecond((vo.et - 86400 - GameData.serverTime), 1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeTF.setPosition(bg.x + 270, this._ruleBtn.y + this._ruleBtn.height / 2 - this._timeTF.height / 2);
            this.addChildToContainer(this._timeTF);
        }
        this.refreashLanternInfo(vo.getNowDay());
        this.tick();
    };
    /**刷新view */
    AcNewYearSignUpView.prototype.refreshView = function () {
        App.LogUtil.log("refreshView: " + this._type);
        // this._isRefresh = true;
        this.refreashLanternInfo(this._type);
    };
    AcNewYearSignUpView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        if (this.getTypeCode() == "2") {
            this._timeTF.text = LanguageManager.getlocal("acNewYearSignUpViewTimeDown", [vo.getCountDown()]);
            this._timeBg.width = 40 + this._timeTF.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
            this._timeTF.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2;
        }
        if (this._code == "1") {
            if (vo.et - 86400 - GameData.serverTime > 0) {
                this._timeTF.text = LanguageManager.getlocal("acNewYearSignUpViewTime", [App.DateUtil.getFormatBySecond((vo.et - 86400 - GameData.serverTime), 1)]);
            }
            else {
                this._timeTF.text = LanguageManager.getlocal("acNewYearSignUpViewTime", [LanguageManager.getlocal("acPunishEnd")]);
                if (!this._isShowTime) {
                    this._isShowTime = true;
                    this.refreshView();
                }
            }
        }
        else {
            if (vo.et - 86400 - GameData.serverTime <= 0) {
                if (!this._isShowTime) {
                    this._isShowTime = true;
                    this.refreshView();
                }
            }
        }
    };
    /**领取奖励 */
    AcNewYearSignUpView.prototype.receiveBtnClick = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        var deltaT = vo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isShowTip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acNewYearSignUpViewTip", [String(this._type - vo.getNowDay())]));
            return;
        }
        var ftype = 0;
        if (this._isHaveSign) {
            ftype = 2;
            var cost = cfg.redeem[vo.getBuySign()];
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARSIGNUPConfirmPOPUPVIEW, {
                "callbackHandle": function () {
                    _this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD, { activeId: vo.aidAndCode, rKey: _this._type, ftype: ftype });
                },
                "handle": this,
                "cost": cost,
            });
            return;
            // if (cost > Api.playerVoApi.getPlayerGem()) {
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            // 	return;
            // }
        }
        else {
            ftype = 1;
        }
        this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD, { activeId: vo.aidAndCode, rKey: this._type, ftype: ftype });
    };
    /**领取奖励回调 */
    AcNewYearSignUpView.prototype.receiveHandle = function (event) {
        if (event && event.data && event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            this.refreashLanternInfo(this._type);
        }
    };
    /**刷新灯的信息 */
    AcNewYearSignUpView.prototype.refreashLanternInfo = function (type) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        if (this.getTypeCode() == "1") {
            if (type > 7) {
                type = 7;
            }
        }
        else {
            if (type > 3) {
                type = 3;
            }
        }
        this._type = type;
        var btnLightBgStr = "acnewyearsignupview_lanternbtn_light";
        var btnBgStr = "acnewyearsignupview_lanternbtn";
        if (this.getTypeCode() == "2") {
            btnLightBgStr = "acnewyearsignupview_lanternbtn_light-" + this.getTypeCode();
            btnBgStr = "acnewyearsignupview_lanternbtn-" + this.getTypeCode();
        }
        for (var i = 0; i < this._lanternInfoList.length; i++) {
            if (this._lanternInfoList[i].id == type) {
                this._lanternInfoList[i].lanternBtn.setBtnBitMap(btnLightBgStr);
                this._lanternInfoList[i].lanternBtn.touchEnabled = false;
                this._lanternInfoList[i].lanternTF.setColor(0xd1241e);
                this._lanternInfoList[i].rewardContainer.setVisible(true);
            }
            else {
                this._lanternInfoList[i].lanternBtn.setBtnBitMap(btnBgStr);
                this._lanternInfoList[i].lanternBtn.touchEnabled = true;
                this._lanternInfoList[i].lanternTF.setColor(0x891414);
                this._lanternInfoList[i].rewardContainer.setVisible(false);
            }
            // //刷新奖励
            // if (this._isRefresh){
            // 	if (vo.getNowDay() == this._lanternInfoList[i].id){
            // 		this._lanternInfoList[i].rewardContainer.setVisible(true);
            // 	}
            // 	else{
            // 		this._lanternInfoList[i].rewardContainer.setVisible(false);
            // 	}
            // }
            //是否变灰
            if (this._lanternInfoList[i].id < (vo.getNowDay()) || vo.checkIsInEndShowTime()) {
                App.DisplayUtil.changeToGray(this._lanternInfoList[i].lanternBtn);
                App.DisplayUtil.changeToGray(this._lanternInfoList[i].lanternTF);
            }
            else {
                App.DisplayUtil.changeToNormal(this._lanternInfoList[i].lanternBtn);
                App.DisplayUtil.changeToNormal(this._lanternInfoList[i].lanternTF);
            }
            if ((!vo.isReceiveReward(String(this._lanternInfoList[i].id))) && vo.isHaveReward(String(this._lanternInfoList[i].id)) && (!vo.checkIsInEndShowTime())) {
                App.CommonUtil.addIconToBDOC(this._lanternInfoList[i].lanternBtn);
                if (this.getTypeCode() == "2") {
                    var redDot = this._lanternInfoList[i].lanternBtn.getChildByName("reddot");
                    redDot.setPosition(this._lanternInfoList[i].lanternBtn.width - 47, 20);
                }
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._lanternInfoList[i].lanternBtn);
            }
        }
        if (this._isRefresh) {
            this._isRefresh = false;
        }
        if (vo.isReceiveReward(String(type))) {
            //领取
            this._receiveBM.setVisible(true);
            this._receiveBtn.setVisible(false);
        }
        else {
            //未领取
            this._receiveBM.setVisible(false);
            this._receiveBtn.setVisible(true);
            if (vo.isHaveReward(String(type))) {
                this._isHaveSign = false;
                this._receiveBtn.setGray(false);
                this._isShowTip = false;
                this._receiveBtn.setText("acNewYearSignUpViewRecrive");
            }
            else {
                if (vo.getNowDay() < type) {
                    this._receiveBtn.setGray(true);
                    this._isShowTip = true;
                    this._isHaveSign = false;
                    this._receiveBtn.setText("acNewYearSignUpViewRecrive");
                }
                else if (vo.getNowDay() > type) {
                    // let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
                    this._isHaveSign = true;
                    this._receiveBtn.setGray(false);
                    this._isShowTip = false;
                    this._receiveBtn.setText("acNewYearSignUpViewSign");
                }
                else {
                    this._isHaveSign = false;
                    this._receiveBtn.setGray(false);
                    this._isShowTip = false;
                    this._receiveBtn.setText("acNewYearSignUpViewRecrive");
                }
            }
        }
        //进入展示期置灰
        if (vo.checkIsInEndShowTime()) {
            this._receiveBtn.setGray(true);
        }
        if ((!vo.isReceiveSevenReward()) && vo.isHaveReceiveSevenReward()) {
            App.CommonUtil.addIconToBDOC(this._giftBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._giftBtn);
        }
    };
    AcNewYearSignUpView.prototype.giftBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARSIGNUPPOPUPVIEW, { aid: this.aid, code: this._code });
        // ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARSIGNUPSHARKVIEW)
    };
    /**按钮事件 */
    AcNewYearSignUpView.prototype.rewardInfoClick = function (param) {
        this.refreashLanternInfo(param);
    };
    AcNewYearSignUpView.prototype.showLiHua = function () {
        egret.Tween.get(this, { loop: true }).wait(200).call(this.playLihuaAni, this).wait(900);
    };
    AcNewYearSignUpView.prototype.playLihuaAni = function () {
        var len = this.lihuaCfg.length;
        var randNum = App.MathUtil.getRandom(0, len);
        var data = this.lihuaCfg[randNum];
        var lihua = ComponentManager.getCustomMovieClip("newyearlihua" + data.name, data.frames, 100);
        lihua.setPosition(data.x, data.y);
        this.container.addChildAt(lihua, this._bgIndex + 1);
        lihua.playWithTime(1);
        lihua.setEndCallBack(function () {
            lihua.dispose();
        }, this);
    };
    AcNewYearSignUpView.prototype.getCloseBtnName = function () {
        if (this.getTypeCode() == "2") {
            return ButtonConst.COMMON_CLOSE_1;
        }
        return "sharepopupview_closebtn";
    };
    AcNewYearSignUpView.prototype.getTypeCode = function () {
        return this._code;
    };
    AcNewYearSignUpView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    Object.defineProperty(AcNewYearSignUpView.prototype, "_code", {
        get: function () {
            if (typeof (this.code) == "object") {
                return this.param.data.code;
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    // 背景图名称
    AcNewYearSignUpView.prototype.getBgName = function () {
        if (this.getTypeCode() == "2") {
            return "acnewyearsignup_bg-2";
        }
        return null;
    };
    // 标题背景名称
    AcNewYearSignUpView.prototype.getTitleBgName = function () {
        if (this.getTypeCode() == "2") {
            return "acnewyearsignup_titlebg-2";
        }
        return null;
    };
    AcNewYearSignUpView.prototype.getTitleStr = function () {
        return null;
        ;
    };
    AcNewYearSignUpView.prototype.getRuleInfo = function () {
        if (this.getTypeCode() == "2") {
            return "acNewYearSignUpViewRuleInfo-" + this.getTypeCode();
        }
        return "acNewYearSignUpViewRuleInfo";
    };
    AcNewYearSignUpView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "2") {
            list = [
                "acnewyearsignup_bg-2", "acnewyearsignupview_giftbtn-2_down", "acnewyearsignupview_giftbtn-2", "acnewyearsignupview_lanternbtn_light-2", "acnewyearsignupview_lanternbtn-2",
                "acnewyearsignup_titlebg-2", "acnewyearsignup_treeline-2"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "sharepopupview_closebtn", "sharepopupview_closebtn_down", "acnewyearsignupview_common_receivebtn", "acnewyearsignupview_common_receivebtn_down", "acnewyearsignupview_common_bgframe", "acnewyearsignupview_common_rewardbg", "duanwu_handrail", "collectflag_yellow"
        ]).concat(list);
    };
    AcNewYearSignUpView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD, this.receiveHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._lanternInfoList.length = 0;
        this._receiveBtn = null;
        this._receiveBM = null;
        this._giftBtn = null;
        this._isHaveSign = false;
        this._type = 0;
        this._timeBg = null;
        this._timeTF = null;
        this._isShowTip = false;
        this._isShowTime = false;
        this._isRefresh = false;
        this._bgIndex = 0;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearSignUpView;
}(AcCommonView));
__reflect(AcNewYearSignUpView.prototype, "AcNewYearSignUpView");
//# sourceMappingURL=AcNewYearSignUpView.js.map