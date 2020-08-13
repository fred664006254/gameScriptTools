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
 * 惩戒女囚
 * author dky
 * date 2017/11/20
 * @class AcPunishView
 */
var AcPunishView = (function (_super) {
    __extends(AcPunishView, _super);
    function AcPunishView() {
        var _this = _super.call(this) || this;
        _this._punishItemVoList = {};
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._score1Text = null;
        _this._score2Text = null;
        _this._btnclickType = '';
        _this._selectIndex = -1;
        // let tmpVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("dailyCharge","1");
        _this._lastTime = 0; //刷新时间
        _this._touchSwitch = true;
        _this._self = null;
        _this._bigBg = null;
        _this._dgbone = null;
        _this._dgbone2 = null;
        _this._tyitemClip = null;
        //code 12 新增
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._skillBtnList = [];
        _this._energyNum = null;
        _this._isSelectSkill = false;
        _this._critPos = 1;
        _this._selectPos = 1;
        _this._boneTw = null;
        //商铺
        _this._shopButton = null;
        _this.currIconArr = [];
        return _this;
    }
    AcPunishView.prototype.getResourceList = function () {
        var arr = [
            "prestige_tipbg",
            "forpeople_top",
            "wifeview_bottombg",
            "progress8",
            "progress3_bg",
            "acpunish"
        ];
        if (this.code == "4") {
            arr.push("punish_nian");
            arr.push("punish_nian1");
            // ["punish_boss","punish_boss1"]
            // )
        }
        else if (this.code == "5" || this.code == "7") {
            arr.push("punish_boss");
            arr.push("punish_boss1");
            // arr.concat(
            // 	["punish_nian","punish_nian1"]
            // )
        }
        if (this.code == "7") {
            if (RES.hasRes("punish5")) {
                arr.push("punish5");
            }
        }
        if (this.code == "11") {
            if (RES.hasRes("punish11")) {
                arr.push("punish11");
            }
            if (RES.hasRes("punish1")) {
                arr.push("punish1");
            }
        }
        else {
            if (RES.hasRes("punish" + this.code)) {
                arr.push("punish" + this.code);
            }
        }
        if (this.code == "8") {
            arr.push("reunion_integral");
            arr.push("reunion_rank");
            arr.push("reunion_rankrecharge");
            arr.push("reunion_shop");
            arr.push("reunion_integral_down");
            arr.push("reunion_rank_down");
            arr.push("reunion_rankrecharge_down");
            arr.push("reunion_shop_down");
            arr.push("punish_p1");
            arr.push("punish_p2");
            arr.push("dianxiaoer_tex_png");
            arr.push("dianxiaoer_tex_ske");
            arr.push("dianxiaoer_tex_json");
            arr.push("punsh_mask");
            arr.push("progress7");
            arr.push("progress7_bg");
        }
        if (this.code == "9") {
            arr.push("reunion_rank_down");
            arr.push("reunion_rank");
            arr.push("punish9shop");
            arr.push("punish9shop_down");
            arr.push("punish_bossman");
            arr.push("punish9item1");
            arr.push("punish9item2");
            arr.push("punish9item3");
            arr.push("punish9item4");
            arr.push("punish9boom1");
            arr.push("punish9boom2");
            if (!App.CommonUtil.check_dragon()) {
                arr.push("punish_boss9");
                arr.push("punish_boss9_hit");
            }
        }
        if (this.getTypeCode() == "12") {
            arr.push("punish_titlebg-12");
            arr.push("punish_infobg-12");
            arr.push("punish_bottombg-12");
            arr.push("punish_skill-12_1");
            arr.push("punish_skill-12_2");
            arr.push("punish_skill-12_3");
            arr.push("punish_skill-12_4");
            arr.push("punish_rank_reward_btn-12");
            arr.push("punish_rank_reward_btn-12_down");
            arr.push("punish_shop_btn-12");
            arr.push("punish_shop_btn-12_down");
            arr.push("progress7");
            arr.push("progress7_bg");
            arr.push("punish_score_bg-12");
            arr.push("atkrace_crit_text");
            arr.push("punsh_mask");
            arr.push("punish_role-12_0");
            arr.push("punish_role-12_1");
            arr.push("punish_role-12_2");
            arr.push("punish_role-12_3");
            arr.push("punish_role-12_4");
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat([
    // 		"prestige_tipbg",
    // 		"forpeople_top",
    // 		"wifeview_bottombg",
    // 		"progress8",
    // 		"progress3_bg",
    // 		]);
    // }
    AcPunishView.prototype.getTypeCode = function () {
        if (this.code == "13") {
            return "12";
        }
        return this.code;
    };
    AcPunishView.prototype.getTitleBgName = function () {
        if (this.getTypeCode() == "12") {
            var resStr = ResourceManager.hasRes("punish_titlebg-" + this.getTypeCode()) ? "punish_titlebg-" + this.getTypeCode() : "punish_titlebg-12";
            return resStr;
        }
        return _super.prototype.getTitleBgName.call(this);
    };
    //标题
    AcPunishView.prototype.getTitleStr = function () {
        if (this.getTypeCode() == "12") {
            return null;
        }
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aidAndCode) + "_Title";
    };
    //隐藏shadow
    AcPunishView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    Object.defineProperty(AcPunishView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcPunishView.prototype.initView = function () {
        this._lastTime = App.DateUtil.getWeeTs(GameData.serverTime);
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        var maskSp = BaseBitmap.create("commonview_bg1");
        maskSp.width = GameConfig.stageWidth;
        maskSp.height = 180;
        // maskSp.y = 180;
        this.addChildToContainer(maskSp);
        this._punishItemList = new Array();
        this.showText();
        if (this.getTypeCode() != "12") {
            this.showList();
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        //初始化 时间
        // let deltaT = this.acVo.et - GameData.serverTime;
        // if (this._acCDTxt && deltaT > 0) {
        // 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        // } else {
        // 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        // }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var params = App.DateUtil.getLocalTimeZoneTime(cfg.activeTime[0], cfg.activeTime[1]);
        this._acCDTxt.text = LanguageManager.getlocal("acPunishTime", params);
        this._acCDTxt.x = 10;
        this._activityTimerText.x = 10;
        this._self = this;
        if (this.code == "8") {
            this.showBtn();
        }
        this.refreshState();
        this.runText();
        this.checkState();
    };
    AcPunishView.prototype.showBtn = function () {
        var buttonNameArr = [{ name: "reunion_shop" }, { name: "reunion_integral" }, { name: "reunion_rankrecharge" }, { name: "reunion_rank" }];
        for (var i = 0; i < buttonNameArr.length; i++) {
            var btncfg = buttonNameArr[i];
            var imgBtn = ComponentManager.getButton(btncfg.name, "", this._self.bottomBtnClickHandler, this._self, [btncfg]);
            imgBtn.setPosition(34 + imgBtn.x + imgBtn.width * i - 20, 220);
            imgBtn.name = btncfg.name;
            this.addChild(imgBtn);
            if (btncfg.name == "reunion_shop") {
                this._shopButton = imgBtn;
                this.checkBtnRed();
            }
        }
        //蒸汽效果
        var tyitemClip = null;
        if (tyitemClip == null) {
            tyitemClip = ComponentManager.getCustomMovieClip("steam_", 10, 100);
            tyitemClip.width = 164;
            tyitemClip.height = 170;
            tyitemClip.anchorOffsetX = tyitemClip.width / 2;
            tyitemClip.anchorOffsetY = tyitemClip.height / 2;
            tyitemClip.setScale(1);
            tyitemClip.x = this._boxSp.x + 100;
            tyitemClip.y = GameConfig.stageHeigth - 222 - 10;
            tyitemClip.playWithTime(-1);
            this.addChildToContainer(tyitemClip);
            this._tyitemClip = tyitemClip;
            this._tyitemClip.visible = false;
        }
    };
    AcPunishView.prototype.bottomBtnClickHandler = function (data) {
        switch (data.name) {
            case "reunion_integral":
                if (this.acVo.isEnd) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                this.exchangeCilck();
                break;
            case "reunion_rank":
                this.rankCilck();
                break;
            case "reunion_rankrecharge":
                this.rankRewardBtnCilck();
                break;
            case "reunion_shop":
                if (this.acVo.checkIsInEndShowTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                this.doBuy();
                break;
        }
    };
    /**
    * 获取活动配置
    */
    AcPunishView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcPunishView.prototype.showText = function () {
        //背景图片
        var bgres = "punish_bigbg";
        if (this.code == "2") {
            bgres = "punish_bigbg2";
        }
        else if (this.code == "4") {
            bgres = "punish_bigbg4";
        }
        else if (this.code == "5" || this.code == "7") {
            bgres = "punish_bigbg5";
        }
        else if (this.code == "6") {
            bgres = "punish_bigbg6";
        }
        else if (this.code == "8") {
            bgres = "punish_bigbg8";
        }
        else if (this.code == "9") {
            bgres = "punish_bigbg9";
        }
        else if (this.code == "10" || this.code == "11" || this.code == "12" || this.code == "13") {
            bgres = "punish_bigbg" + this.getTypeCode();
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 1136);
        var bigBg = BaseLoadBitmap.create(bgres, rect);
        this.addChildToContainer(bigBg);
        if (this.code == "9") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bigBg, this.container, [0, 0], true);
        }
        // this.container.addChildAt(bigBg,0);
        bigBg.y = 20;
        if (this.code == "6") {
            bigBg.y = GameConfig.stageHeigth - this.container.y - bigBg.height;
        }
        if (this.code == "8") {
            bigBg.y = GameConfig.stageHeigth - bigBg.height; //-16 ;
            this._bigBg = bigBg;
        }
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("forpeople_top");
        forpeople_top.y = 20;
        if (this.getTypeCode() == "12") {
            App.LogUtil.log("bigBg.height: " + bigBg.height);
            bigBg.y = GameConfig.stageHeigth - bigBg.height;
            var topBgStr = ResourceManager.hasRes("punish_infobg-" + this.getTypeCode()) ? "punish_infobg-" + this.getTypeCode() : "punish_infobg-12";
            forpeople_top.setRes(topBgStr);
            forpeople_top.y = this.titleBg.y + this.titleBg.height - 7;
        }
        //女囚
        if (this.code == "1") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            var rect_1 = egret.Rectangle.create();
            rect_1.setTo(0, 0, 220, 612);
            var bodyPic = BaseLoadBitmap.create("punish_body2", rect_1);
            this._bodyContainer.addChild(bodyPic);
            ;
            bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_head2_1");
            this._headPic.y = 45;
            this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "3") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            var rect_2 = egret.Rectangle.create();
            rect_2.setTo(0, 0, 220, 612);
            var bodyPic = BaseLoadBitmap.create("punish_body", rect_2);
            this._bodyContainer.addChild(bodyPic);
            ;
            bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_head1");
            this._headPic.y = 45;
            this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "4") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            // let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
            // this._bodyContainer.addChild(bodyPic);;
            // bodyPic.y = 0;
            var rect_3 = egret.Rectangle.create();
            rect_3.setTo(0, 0, 557, 481);
            this._headPic = BaseBitmap.create("punish_nian");
            // this._headPic.y = 45;
            // this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "5" || this.code == "7") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            // let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
            // this._bodyContainer.addChild(bodyPic);;
            // bodyPic.y = 0;
            var rect_4 = egret.Rectangle.create();
            rect_4.setTo(0, 0, 633, 531);
            this._headPic = BaseBitmap.create("punish_boss");
            // this._headPic.y = 45;
            // this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = 0;
            this._bodyContainer.y = 290;
        }
        else if (this.code == "6") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            this._headPic = BaseBitmap.create("punish6_1");
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = 0;
            this._bodyContainer.y = bigBg.y + 470;
        }
        else if (this.code == "8") {
            // if(App.CommonUtil.check_dragon())
            // {
            var dgbone = App.DragonBonesUtil.getLoadDragonBones('dianxiaoer', 0, "idle");
            dgbone.playDragonMovie('idle', 0);
            dgbone.x = 400;
            dgbone.y = bigBg.y + 470 + 53 - 87 + 40 + 300 - 22;
            this.addChildToContainer(dgbone);
            this._dgbone = dgbone;
            var mask = BaseBitmap.create("punsh_mask");
            this.addChildToContainer(mask);
            mask.y = dgbone.y - 20;
            var dgbone2 = App.DragonBonesUtil.getLoadDragonBones('tangyuan', 0, "idle");
            dgbone2.playDragonMovie('idle', 0);
            dgbone2.x = 400;
            dgbone2.y = bigBg.y + 470 + 53 - 87 + 40 + 300 - 22;
            this.addChildToContainer(dgbone2);
            this._dgbone2 = dgbone2;
            //烟雾特效 
            this.showYanwu();
            // }
            // else
            // {
            // 	this._bodyContainer = new BaseDisplayObjectContainer();
            // 	this.addChildToContainer(this._bodyContainer);
            // 	this._headPic = BaseBitmap.create("punish_p1");
            // 	this._bodyContainer.addChild(this._headPic);
            // 	this._bodyContainer.x = 200;
            // 	this._bodyContainer.y = bigBg.y +470+53-87+40; 
            // }  
        }
        else if (this.code == "9") {
            if (App.CommonUtil.check_dragon()) {
                var dgbone_1 = App.DragonBonesUtil.getLoadDragonBones('acpunishview_dragon', 0, "idle");
                dgbone_1.playDragonMovie('idle', 0);
                dgbone_1.x = GameConfig.stageWidth / 2;
                dgbone_1.y = GameConfig.stageHeigth;
                this.addChildToContainer(dgbone_1);
                this._dgbone = dgbone_1;
            }
            else {
                this._bodyContainer = new BaseDisplayObjectContainer();
                this.addChildToContainer(this._bodyContainer);
                this._headPic = BaseBitmap.create("punish_boss9");
                this._bodyContainer.addChild(this._headPic);
                this._bodyContainer.x = 0;
                this._bodyContainer.y = bigBg.y + (GameConfig.stageHeigth - 810);
            }
            // this._bodyContainer = new BaseDisplayObjectContainer();
            // this.addChildToContainer(this._bodyContainer);
            // this._headPic = BaseBitmap.create(`punish_boss9`);
            // this._bodyContainer.addChild(this._headPic);
            // this._bodyContainer.x = 0;
            // this._bodyContainer.y = bigBg.y + 326;
        }
        else if (this.code == "10") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            // let rect: egret.Rectangle = egret.Rectangle.create();
            // rect.setTo(0, 0, 382 , 531);
            // let bodyPic: BaseLoadBitmap = BaseLoadBitmap.create("prison_body" + this.code, rect)
            // this._bodyContainer.addChild(bodyPic);;
            // bodyPic.y = 0;
            this._headPic = BaseBitmap.create("prison_body" + this.code + "_1");
            this._headPic.setPosition(0, 0);
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - 210;
            this._bodyContainer.y = 290;
        }
        else if (this.code == "11") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            this._headPic = BaseBitmap.create("prison_body" + this.code + "_1");
            this._headPic.setPosition(0, 0);
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._headPic.width / 2;
            this._bodyContainer.y = 290;
        }
        else if (this.code == "12" || this.code == "13") {
            var bone = "acpunishview_fist_1";
            var boneName = bone + "_ske";
            if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(boneName)) {
                var dgbone_2 = App.DragonBonesUtil.getLoadDragonBones(bone, 0, "Standby");
                dgbone_2.playDragonMovie('Standby', 0);
                dgbone_2.x = 320;
                dgbone_2.y = GameConfig.stageHeigth - 90;
                dgbone_2.setScale(0.85);
                this.addChildToContainer(dgbone_2);
                this._dgbone = dgbone_2;
            }
            else {
                this._bodyContainer = new BaseDisplayObjectContainer();
                this.addChildToContainer(this._bodyContainer);
                this._headPic = BaseBitmap.create("punish_role-" + this.code + "_0");
                this._headPic.setPosition(0, 0);
                this._bodyContainer.addChild(this._headPic);
                this._bodyContainer.x = GameConfig.stageWidth / 2 - this._headPic.width / 2;
                this._bodyContainer.y = 360;
            }
        }
        this.addChildToContainer(forpeople_top);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 30;
        this._activityTimerText.y = 109;
        var stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
        // let day = 
        var etTxt = App.DateUtil.getFormatBySecond(this.acVo.et - 86400, 7);
        // this._activityTimerText.text = LanguageManager.getlocal("acPunishDate", [stTxt, etTxt]);
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + 33;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        if (this.getTypeCode() == "12") {
            this.showNewList();
        }
        //积分背景
        var scoreBg = BaseBitmap.create("public_9_probiginnerbg");
        scoreBg.width = 190;
        scoreBg.height = 63;
        scoreBg.x = 440;
        scoreBg.y = 100;
        this.addChildToContainer(scoreBg);
        var newScoreBg = null;
        if (this.getTypeCode() == "12") {
            newScoreBg = BaseBitmap.create("punish_score_bg-" + this.getTypeCode());
            newScoreBg.setPosition(GameConfig.stageWidth / 2 - newScoreBg.width / 2, forpeople_top.y + forpeople_top.height + 101);
            this.addChildToContainer(newScoreBg);
        }
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text = ComponentManager.getTextField(score1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._score1Text.x = scoreBg.x + 20;
        this._score1Text.y = scoreBg.y + 7;
        this.addChildToContainer(this._score1Text);
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text = ComponentManager.getTextField(score2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._score2Text.x = this._score1Text.x;
        this._score2Text.y = this._score1Text.y + this._score1Text.height + 8;
        this.addChildToContainer(this._score2Text);
        //跑马灯背景
        var topBg = BaseBitmap.create("public_ac_notice_bg");
        topBg.width = GameConfig.stageWidth;
        // topBg.height = 96;
        topBg.x = 0;
        topBg.y = 185;
        if (this.code == "8") {
            topBg.y = 177;
        }
        else if (this.getTypeCode() == "12") {
            topBg.y = forpeople_top.y + forpeople_top.height + 18;
        }
        this.addChildToContainer(topBg);
        //顶部
        if (this.getTypeCode() == "12") {
            acCDTxt.visible = false;
            scoreBg.visible = false;
            // this._score1Text.visible = false;
            // this._score2Text.visible = false;
            this._score1Text.setPosition(newScoreBg.x + 6, newScoreBg.y + newScoreBg.height / 2 - this._score1Text.height / 2 - 7);
            this._score2Text.setPosition(newScoreBg.x + newScoreBg.width / 2 + 6, newScoreBg.y + newScoreBg.height / 2 - this._score2Text.height / 2 - 7);
            this._activityTimerText.y = forpeople_top.y + 15;
            //活动介绍
            var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acPunishDesc-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            acDesc.width = 600;
            acDesc.lineSpacing = 5;
            acDesc.setPosition(10, this._activityTimerText.y + this._activityTimerText.height + 10);
            this.addChildToContainer(acDesc);
            //倒计时
            this._timeBg = BaseBitmap.create("public_9_bg61");
            this._timeBg.y = forpeople_top.y + forpeople_top.height - this._timeBg.height / 2 - 2;
            this.addChildToContainer(this._timeBg);
            this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeople_acCD", [String(this.vo.getCountDown())]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
            this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
            this.addChildToContainer(this._acTimeTf);
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //下面属性背景
        var bottomBgStr = "wifeview_bottombg";
        if (this.getTypeCode() == "12") {
            bottomBgStr = ResourceManager.hasRes("punish_bottombg-" + this.getTypeCode()) ? "punish_bottombg-" + this.getTypeCode() : "punish_bottombg-12";
        }
        var bottomBg = BaseBitmap.create(bottomBgStr);
        if (this.getTypeCode() != "12") {
            bottomBg.width = GameConfig.stageWidth;
            bottomBg.height = 96;
        }
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        if (this.code == "5" || this.code == "7") {
            bigBg.y = bottomBg.y + bottomBg.height - bigBg.height;
        }
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acPunishRankRewardPopupViewTitle", this.rankRewardBtnCilck, this);
            rewardBtn.x = 85;
            rewardBtn.y = bottomBg.y + bottomBg.height / 2 - rewardBtn.height / 2;
            this.addChildToContainer(rewardBtn);
            rewardBtn.setColor(TextFieldConst.COLOR_BLACK);
            if (this.code == "8") {
                rewardBtn.visible = false;
                bottomBg.visible = false;
            }
            if (this.getTypeCode() == "12") {
                rewardBtn.visible = false;
            }
        }
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "dinnerExchangePopupViewTitle", this.exchangeCilck, this);
        exchangeBtn.x = 390;
        exchangeBtn.y = bottomBg.y + bottomBg.height / 2 - 30; //rewardBtn.y;
        this.addChildToContainer(exchangeBtn);
        exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
        if (this.code == "8" || this.getTypeCode() == "12") {
            exchangeBtn.visible = false;
        }
        if (this.code == "3") {
            var buyBtn = ComponentManager.getButton("btn_buy_tool2", "", this.butItemBtnCilck, this);
            buyBtn.x = 0;
            buyBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 120;
            this.addChildToContainer(buyBtn);
            this._shopButton = buyBtn;
            this.checkBtnRed();
        }
        else if (this.code == "9") {
            var buyBtn = ComponentManager.getButton("punish9shop", "", this.butItemBtnCilck, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, buyBtn, bottomBg, [0, -buyBtn.height]);
            this.addChild(buyBtn);
            this._shopButton = buyBtn;
            var bossman = BaseBitmap.create("punish_bossman");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bossman, this, [0, 100]);
            this.container.addChildAt(bossman, this.container.getChildIndex(bottomBg) - 1);
            this.checkBtnRed();
        }
        else {
            var btnImg = "btn_buy_tool";
            if (this.code == "6") {
                btnImg = "btn_buy_tool_6";
            }
            var buyBtn = ComponentManager.getButton(btnImg, "", this.butItemBtnCilck, this);
            buyBtn.x = 0;
            buyBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 120;
            this.addChildToContainer(buyBtn);
            if (this.code == "8" || this.getTypeCode() == "12") {
                buyBtn.visible = false;
            }
            else {
                this._shopButton = buyBtn;
                this.checkBtnRed();
            }
        }
        var buyBB = BaseBitmap.create("punish_buyitem");
        buyBB.x = 80;
        buyBB.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 30;
        buyBB.anchorOffsetX = buyBB.width / 2;
        buyBB.anchorOffsetY = buyBB.height / 2;
        this.addChildToContainer(buyBB);
        if (this.code == "8" || this.code == '9' || this.getTypeCode() == "12") {
            buyBB.visible = false;
        }
        this._tw = egret.Tween.get(buyBB, { loop: true });
        this._tw.to({ scaleX: 1.15, scaleY: 1.15 }, 700)
            .to({ scaleX: 1, scaleY: 1 }, 700);
        // .to({y:-80,alpha:0.5},1500)
        // .call(this.onComplete,this);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            if (this.code == '9') {
                var imgBtn = ComponentManager.getButton("reunion_rank", "", this.rankCilck, this);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, imgBtn, bottomBg, [0, -imgBtn.height]);
                this.addChild(imgBtn);
            }
            else {
                var rankBtnBg = BaseBitmap.create("mainui_bottombtnbg");
                rankBtnBg.x = GameConfig.stageWidth - rankBtnBg.width - 20;
                rankBtnBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 80;
                this.addChildToContainer(rankBtnBg);
                var rankBtn = BaseBitmap.create("punish_rank_icon");
                rankBtn.x = rankBtnBg.x + rankBtnBg.width / 2 - rankBtn.width / 2;
                rankBtn.y = rankBtnBg.y + 5;
                this.addChildToContainer(rankBtn);
                var rankIcon = BaseBitmap.create("punish_rank_name");
                rankIcon.x = rankBtnBg.x + rankBtnBg.width / 2 - rankIcon.width / 2;
                rankIcon.y = rankBtn.y + 50;
                rankBtn.addTouchTap(this.rankCilck, this);
                this.addChildToContainer(rankIcon);
                if (this.code == "8" || this.getTypeCode() == "12") {
                    rankBtn.visible = false;
                    rankIcon.visible = false;
                    rankBtnBg.visible = false;
                }
            }
        }
        //是否打死或者活动结束
        // if(this._acData.hp <= 0)
        if (this.code == "8" || this.getTypeCode() == "12") {
            this._progressBar = ComponentManager.getProgressBar("progress7", "progress7_bg", 562);
            this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2;
            this._progressBar.y = GameConfig.stageHeigth - 280; //topBg.y + topBg.height + 360;
            this.addChildToContainer(this._progressBar);
            if (this.getTypeCode() == "12") {
                this._progressBar.y = topBg.y + topBg.height + 20;
            }
        }
        else {
            this._progressBar = ComponentManager.getProgressBar("progress8", "progress3_bg", 562);
            this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2;
            this._progressBar.y = topBg.y + topBg.height + 30;
            this.addChildToContainer(this._progressBar);
        }
        var lvStr = "";
        var hp = cfg.getHp(this._acVo.day);
        if (this.code == "2") {
            lvStr = (100 - this._acData.hp / hp * 100).toFixed(3);
            this._progressBar.setPercentage(1 - this._acData.hp / hp);
        }
        else {
            lvStr = Math.floor(this._acData.hp / hp * 100).toString();
            this._progressBar.setPercentage(this._acData.hp / hp);
        }
        this._levelTxt = ComponentManager.getTextField(lvStr + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
        this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2;
        this.addChildToContainer(this._levelTxt);
        var btnKey = "acPunishBtn";
        if (this.code == "2") {
            btnKey = "useBtn";
        }
        else if (this.code == "3") {
            btnKey = "acPunishBtn2";
        }
        else if (this.code == "4") {
            btnKey = "acPunishBtn3";
        }
        else if (this.code == "5" || this.code == "7") {
            btnKey = "acPunishBtn5";
        }
        else if (this.code == "6") {
            btnKey = "acPunishBtn6";
        }
        else if (this.code == "8") {
            btnKey = "acPunishBtn8";
        }
        else if (this.code == "9") {
            btnKey = "acPunishBtn9";
        }
        else if (this.code == "10" || this.code == "11") {
            btnKey = "acPunishBtn" + this.code;
        }
        //煮汤圆＝
        if (this.code == "8") {
            this._chooseBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED, btnKey, this.chooseBtnClick, this);
            this._chooseBtn.x = this.width / 2 - this._chooseBtn.width / 2;
            this._chooseBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height + 20;
            this._chooseBtn.visible = false;
            this.addChildToContainer(this._chooseBtn);
        }
        else {
            this._chooseBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED, btnKey, this.chooseBtnClick, this);
            this._chooseBtn.x = this.width / 2 - this._chooseBtn.width / 2;
            this._chooseBtn.y = GameConfig.stageHeigth - this.container.y - bottomBg.height - 100;
            this._chooseBtn.visible = false;
            this.addChildToContainer(this._chooseBtn);
            this._chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        //增加一键按钮
        this._chooseAllBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED, "acPunishAllBtn" + this.code, this.chooseAllBtnClick, this);
        this._chooseAllBtn.x = this.width / 2 + 10;
        this._chooseAllBtn.y = this._chooseBtn.y;
        this._chooseAllBtn.visible = false;
        this.addChildToContainer(this._chooseAllBtn);
        this._chooseAllBtn.setColor(TextFieldConst.COLOR_BLACK);
        if (this.getTypeCode() == "12") {
            this._chooseBtn.visible = false;
            this._chooseAllBtn.visible = false;
        }
        this._openbg = BaseBitmap.create("prestige_tipbg");
        this._openbg.x = GameConfig.stageWidth / 2 - this._openbg.width / 2;
        this._openbg.y = 350;
        this.addChildToContainer(this._openbg);
        if (this.getTypeCode() == "12") {
            this._openbg.y = 380;
        }
        var openStr = LanguageManager.getlocal("acPunishOpenTime", ["00:00:00"]);
        this._openTxt = ComponentManager.getTextField(openStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._openTxt.anchorOffsetX = this._openTxt.width / 2;
        this._openTxt.x = GameConfig.stageWidth / 2;
        this._openTxt.y = this._openbg.y + this._openbg.height / 2 - this._openTxt.height / 2;
        this.addChildToContainer(this._openTxt);
        this._boxContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._boxContainer);
        this._lightSp = BaseBitmap.create("public_rotatelight");
        this._lightSp.scaleX = 1.5;
        this._lightSp.scaleY = 1.5;
        this._lightSp.anchorOffsetX = this._lightSp.width / 2;
        this._lightSp.anchorOffsetY = this._lightSp.height / 2;
        this._lightSp.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        egret.Tween.get(this._lightSp, { loop: true })
            .to({ rotation: 360 }, 3000);
        this._boxContainer.addChild(this._lightSp);
        this._boxSp = BaseBitmap.create("punish_box_close");
        if (this.code == "8") {
            this._boxSp.texture = ResourceManager.getRes("punish_bowl_close");
        }
        this._boxSp.x = GameConfig.stageWidth / 2 - this._boxSp.width / 2;
        this._boxSp.y = GameConfig.stageHeigth / 2 - this._boxSp.height / 2;
        this._boxContainer.addChild(this._boxSp);
        this._boxSp.addTouchTap(this.getBoxClick, this);
        var descBg = BaseBitmap.create("public_searchdescbg");
        descBg.x = GameConfig.stageWidth / 2 - descBg.width / 2;
        descBg.y = this._boxSp.y + this._boxSp.height + 50;
        this._boxContainer.addChild(descBg);
        this._descBg = descBg;
        this._boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBoxDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
        this._boxDesc.y = descBg.y + descBg.height / 2 - this._boxDesc.height / 2;
        this._boxContainer.addChild(this._boxDesc);
        this.tick();
        this._wordsContanier = new BaseDisplayObjectContainer();
        this._wordsContanier.x = 50;
        this._wordsContanier.y = 300;
        this.addChildToContainer(this._wordsContanier);
        var wordsBg = BaseBitmap.create("public_9_bg25");
        // wordsBg.visible = false;
        wordsBg.x = 0;
        wordsBg.y = 0;
        wordsBg.width = 200;
        wordsBg.height = 78;
        this._wordsContanier.addChild(wordsBg);
        var wordsBgCor = BaseBitmap.create("public_9_bg25_tail");
        wordsBgCor.x = 150;
        wordsBgCor.y = wordsBg.y + wordsBg.height - 3;
        wordsBgCor.skewY = 180;
        this._wordsContanier.addChild(wordsBgCor);
        this._wordsTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip");
        this._wordsTF.x = wordsBg.x + 20;
        this._wordsTF.y = wordsBg.y + 20;
        this._wordsTF.width = 180;
        this._wordsTF.height = 80;
        this._wordsContanier.addChild(this._wordsTF);
        this._wordsContanier.visible = false;
        // //顶部背景图片
        // let test1: BaseBitmap = BaseBitmap.create("punish_1_3");
        // this.addChildToContainer(test1);
        // //顶部背景图片
        // let test2: BaseBitmap = BaseBitmap.create("punish_2_3");
        // this.addChildToContainer(test2);
        // //顶部背景图片
        // let test3: BaseBitmap = BaseBitmap.create("punish_3_3");
        // this.addChildToContainer(test3);
        // //顶部背景图片
        // let test4: BaseBitmap = BaseBitmap.create("punish_4_3");
        // this.addChildToContainer(test4);
        //底部按钮
        if (this.getTypeCode() == "12") {
            var shopBtnRes = ResourceManager.hasRes("punish_shop_btn-" + this.getTypeCode()) ? "punish_shop_btn-" + this.getTypeCode() : "punish_shop_btn-12";
            var shopBtn = ComponentManager.getButton(shopBtnRes, "", this.shopBtnClick, this);
            shopBtn.setPosition(30, bottomBg.y + 20);
            this.addChildToContainer(shopBtn);
            this._shopButton = shopBtn;
            this.checkBtnRed();
            var rewardBtnRes = ResourceManager.hasRes("punish_rank_reward_btn-" + this.getTypeCode()) ? "punish_rank_reward_btn-" + this.getTypeCode() : "punish_rank_reward_btn-12";
            var rewardBtn = ComponentManager.getButton(rewardBtnRes, "", this.rankRewardBtnCilck, this);
            rewardBtn.setPosition(GameConfig.stageWidth - 30 - rewardBtn.width, bottomBg.y + 20);
            this.addChildToContainer(rewardBtn);
            var fightNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acPunishFightInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            fightNumInfo.setPosition(bottomBg.x + bottomBg.width / 2 - fightNumInfo.width / 2, bottomBg.y + 35);
            this.addChildToContainer(fightNumInfo);
            var fightNum = ComponentManager.getTextField("" + this.vo.energy, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            fightNum.setPosition(bottomBg.x + bottomBg.width / 2 - fightNum.width / 2, bottomBg.y + bottomBg.height - fightNum.height - 15);
            this.addChildToContainer(fightNum);
            this._energyNum = fightNum;
            this._wordsContanier.x = 130;
            this._wordsContanier.y = 390;
        }
    };
    //商店按钮点击
    AcPunishView.prototype.shopBtnClick = function () {
        if (this._acVo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        if (this.getTypeCode() != "12") {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var startTime = this._acVo.st;
            var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
            var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
            if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHSHOPPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    //元宵特效
    AcPunishView.prototype.showYanwu = function () {
        var steamBg1 = BaseBitmap.create("steambg1");
        steamBg1.width = 379;
        steamBg1.height = 179;
        steamBg1.anchorOffsetX = steamBg1.width / 2;
        steamBg1.anchorOffsetY = steamBg1.height / 2;
        steamBg1.x = this._bigBg.x + 434;
        steamBg1.y = this._bigBg.y + 734 + 40;
        this.addChildToContainer(steamBg1);
        egret.Tween.get(steamBg1, { loop: true }).to({ loop: true, alpha: 0 }, 1700).to({ alpha: 1 }, 1700);
        var steambg2 = BaseBitmap.create("steambg2");
        steambg2.width = 379;
        steambg2.height = 179;
        steambg2.anchorOffsetX = steambg2.width / 2;
        steambg2.anchorOffsetY = steambg2.height / 2;
        steambg2.alpha = 0;
        steambg2.x = 319; //this._bigBg.x+319;
        steambg2.y = this._bigBg.y + 703 + 40;
        this.addChildToContainer(steambg2);
        egret.Tween.get(steambg2, { loop: true }).to({ loop: true, alpha: 1 }, 1700).to({ alpha: 0 }, 1700);
        var posArr = [[317, 700], [219, 703], [436, 696], [367, 672]];
        for (var i = 0; i < 4; i++) {
            var itemClip = ComponentManager.getCustomMovieClip("steam_", 10, 80);
            itemClip.width = 164;
            itemClip.height = 170;
            itemClip.anchorOffsetX = itemClip.width / 2;
            itemClip.anchorOffsetY = itemClip.height / 2;
            itemClip.setScale(1.42);
            if (i != 0) {
                itemClip.alpha = 0.6;
            }
            itemClip.x = this._bigBg.x + posArr[i][0];
            itemClip.y = this._bigBg.y + posArr[i][1] + 40;
            itemClip.playWithTime(-1);
            this.addChildToContainer(itemClip);
        }
    };
    //刷新活动状态
    AcPunishView.prototype.refreshState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var num = 0;
        for (var i in this._punishItemVoList) {
            var data = this._punishItemVoList[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            num += hasNum;
        }
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
            this._openTxt.visible = true;
            this._openbg.visible = true;
            this.setBoxVisible(false);
            this.setBossVisible(false);
            this._chooseAllBtn.visible = false;
        }
        else {
            this._openTxt.visible = false;
            this._openbg.visible = false;
            //活动已经开始
            if (this._acData && this._acData.hp <= 0) {
                //被打死了
                this.setBoxVisible(true);
                this.setBossVisible(false);
                this._chooseAllBtn.visible = false;
                this._boxDesc.text = LanguageManager.getlocal("acPunishGetBoxDesc-" + this.code);
                this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
                this._boxDesc.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                if (this._acVo.get) {
                    this._boxSp.texture = ResourceManager.getRes("punish_box_open");
                    this._lightSp.visible = true;
                    this._boxDesc.text = LanguageManager.getlocal("acPunishGetBoxTip1");
                    this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
                    if (this.code == "8") {
                        this._boxSp.texture = ResourceManager.getRes("punish_bowl_open");
                        this._boxSp.y = GameConfig.stageHeigth - 222;
                        this._descBg.y = this._boxSp.y + this._boxSp.height + 10;
                        this._boxDesc.y = this._descBg.y + this._descBg.height / 2 - this._boxDesc.height / 2;
                        this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
                        this._lightSp.visible = false;
                        if (this._tyitemClip) {
                            this._tyitemClip.visible = false;
                        }
                    }
                }
                else {
                    this._boxSp.texture = ResourceManager.getRes("punish_box_close");
                    //汤圆没有领的时候
                    if (this.code == "8") {
                        this._boxSp.texture = ResourceManager.getRes("punish_bowl_close");
                        this._boxSp.y = GameConfig.stageHeigth - 222;
                        this._descBg.y = this._boxSp.y + this._boxSp.height + 10;
                        this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
                        this._boxDesc.y = this._descBg.y + this._descBg.height / 2 - this._boxDesc.height / 2;
                        if (this._tyitemClip) {
                            this._tyitemClip.visible = true;
                        }
                    }
                    this._lightSp.visible = false;
                }
            }
            else {
                var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                    this.setBoxVisible(true);
                    this.setBossVisible(false);
                    this._chooseAllBtn.visible = false;
                    this._boxDesc.text = LanguageManager.getlocal("acPunishBoxDesc-" + this.code);
                    this._boxDesc.x = this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2;
                    this._boxDesc.textColor = TextFieldConst.COLOR_WARN_RED;
                    this._lightSp.visible = false;
                    App.DisplayUtil.changeToGray(this._boxSp);
                    if (this.code == "8") {
                        this._boxSp.texture = ResourceManager.getRes("punish_bowl_open");
                        this._boxSp.y = GameConfig.stageHeigth - 222;
                        this._descBg.y = this._boxSp.y + this._boxSp.height + 10;
                        this._boxDesc.y = this._descBg.y + this._descBg.height / 2 - this._boxDesc.height / 2;
                    }
                    if (deltaT < 0) {
                        this._openTxt.visible = false;
                        this._openbg.visible = false;
                    }
                    else {
                        this._openTxt.visible = true;
                        this._openbg.visible = true;
                    }
                }
                else {
                    //没结束也没打死
                    this.setBoxVisible(false);
                    this.setBossVisible(true);
                    if (this.getTypeCode() == "12") {
                        // this.refreshSkillState();
                    }
                    else {
                        if (num >= cfg.itemNum) {
                            this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width - 10;
                            this._chooseAllBtn.visible = true;
                        }
                        else {
                            this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width / 2;
                            this._chooseAllBtn.visible = false;
                        }
                    }
                }
            }
        }
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            var heightDesc = this._boxDesc.height;
            this._boxDesc.width = 300;
            this._descBg.height += this._boxDesc.height - heightDesc;
            this._boxDesc.textAlign = egret.HorizontalAlign.CENTER;
            this._boxDesc.setPosition(this._descBg.x + this._descBg.width / 2 - this._boxDesc.width / 2, this._descBg.y + this._descBg.height / 2 - this._boxDesc.height / 2);
        }
        this.refreshSkillState();
    };
    AcPunishView.prototype.checkState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
        }
        else {
            this._openTxt.visible = false;
            this._openbg.visible = false;
            //活动已经开始
            if (this._acData && this._acData.hp <= 0) {
                //被打死了
            }
            else {
                var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                }
                else {
                    //没结束也没打死
                    ViewController.getInstance().openView(ViewConst.BASE.ACPUNISHREPORTVIEW, { aid: this.aid, code: this.code });
                }
            }
        }
    };
    AcPunishView.prototype.getState = function () {
        var state = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0] && deltaT > 0) {
            //活动未开始
            state = 1;
        }
        else {
            this._openTxt.visible = false;
            this._openbg.visible = false;
            //活动已经开始
            if (this._acData && this._acData.hp <= 0) {
                //被打死了
                state = 2;
            }
            else {
                var deltaT_1 = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT_1 < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                    // this.setBoxVisible(true);
                    if (deltaT_1 < 0) {
                        state = 3;
                    }
                    else {
                        state = 4;
                    }
                }
                else {
                    //没结束也没打死
                    state = 5;
                }
            }
        }
        return state;
        // return 4;
    };
    //箱子相关
    AcPunishView.prototype.setBoxVisible = function (b) {
        // this._openTxt.visible = true;
        this._boxContainer.visible = b;
    };
    //女囚相关
    AcPunishView.prototype.setBossVisible = function (b) {
        this._levelTxt.visible = b;
        this._progressBar.visible = b;
        if (this.getTypeCode() != "12") {
            this._chooseBtn.visible = b;
            this._chooseAllBtn.visible = b;
        }
        if (this._bodyContainer)
            this._bodyContainer.visible = b;
        for (var index = 0; index < this._punishItemList.length; index++) {
            var element = this._punishItemList[index];
            element.visible = b;
        }
        if (this._dgbone && this.code == '9') {
            this._dgbone.visible = b;
        }
        if (this._dgbone && this.getTypeCode() == "12") {
            this._dgbone.visible = b;
        }
    };
    //刷新选中状态
    AcPunishView.prototype.setSelect = function (index) {
        if (this._selectItem) {
            if (this._selectItem.getChildByName("select")) {
                this._selectItem.removeChild(this._selectItem.getChildByName("select"));
                var baseBitmap = this._selectItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._selectItem = this._punishItemList[index];
        // let bg2Index = this._selectItem.getChildIndex(this._selectItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("itembg_selected");
        itemBg2.width = 108;
        itemBg2.height = 108; //104
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = 0;
        itemBg2.y = 0;
        itemBg2.name = "select";
        this._selectItem.addChild(itemBg2);
        this._selectIndex = index;
    };
    AcPunishView.prototype.chooseAllBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            "msg": LanguageManager.getlocal("acPunishTips" + this.code),
            "needCancel": true,
            "title": "itemUseConstPopupViewTitle",
            "callback": this.clickConfirmClick,
            "handler": this,
        });
    };
    AcPunishView.prototype.clickConfirmClick = function () {
        if (!this._touchSwitch) {
            return;
        }
        var num = 0;
        for (var i in this._punishItemVoList) {
            var data = this._punishItemVoList[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            num += hasNum;
        }
        if (num <= 0) {
            var rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "acPunishBuyTitle",
                msg: rewardStr,
                callback: this.doBuy,
                handler: this,
                needCancel: true
            });
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (num >= cfg.itemNum) {
            this._touchSwitch = false;
            var key = (this._selectIndex + 1).toString();
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
            this._touchSwitch = false;
            this._btnclickType = 'all';
            if (this.code == "2") {
                this.doCodeTwoLightAni();
            }
            else if (this.code == "3" || this.code == "10") {
                this.doAni1();
            }
            else if (this.code == "4") {
                // this.doNianShouAni();
                this.doYanHuaAni();
            }
            else if (this.code == "5" || this.code == "7") {
                // this.doNianShouAni();
                this.doYingJiuAni();
            }
            else if (this.code == "6") {
                this.doCodeSixLightAni();
            }
            else if (this.code == "8") {
                this.reunionaAn();
            }
            else if (this.code == "9") {
                this.dragonAni();
            }
            else {
                this.doAni2();
            }
            //this.request(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH,{ activeId: "punish-"+this.code});
            //this._touchSwitch = true;
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishAllRule", ["" + cfg.itemNum, LanguageManager.getlocal("acPunishAllBtn" + this.code)]));
        }
    };
    AcPunishView.prototype.chooseAllBtnClickCallback = function (evt) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
        var data = evt.data;
        if (!data.ret) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                    this.showRewards(data.data.data);
                }
            }
            if (data.data.data.hasKill) {
                this._acData.hp = 0;
            }
            else {
                this._acData = data.data.data.punishActive;
            }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
            this.buyCallback(null);
            this.refreshState();
            /**
             * 飘起经验
             */
            var strList_1 = [];
            var scrore1 = data.data.data.score1;
            var flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1", [String(scrore1)]);
            strList_1.push({ tipMessage: flyStr1 });
            var scrore2 = data.data.data.score2;
            if (scrore2 > 0) {
                var flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2", [String(scrore2)]);
                strList_1.push({ tipMessage: flyStr2 });
            }
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(strList_1);
            }, this, 800);
        }
    };
    AcPunishView.prototype.showRewards = function (data) {
        this.currIconArr = [];
        var contentList = GameData.formatRewardItem(data.rewards);
        for (var i = 0; i < contentList.length; i++) {
            var icon = GameData.getItemIcon(contentList[i], true);
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.scaleX = 0.5;
            icon.scaleY = 0.5;
            icon.x = 300;
            icon.y = GameConfig.stageHeigth / 2 - 70;
            this.addChild(icon);
            App.DisplayUtil.addFactorFunc(BaseDisplayObjectContainer);
            var currX = App.MathUtil.getRandom(500);
            if (this.code == '1') {
                icon.y = GameConfig.stageHeigth - 300;
                icon.x = 180;
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 400), egret.Point.create(currX, 900)];
            }
            else {
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 200), egret.Point.create(currX, 800)];
            }
            egret.Tween.get(icon).to({}).call(this.onComplete, this, [icon]);
            this.addChild(icon);
            this.currIconArr.push(icon);
        }
    };
    AcPunishView.prototype.onComplete = function (icon) {
        if (icon === void 0) { icon = null; }
        var l = this.currIconArr.length;
        for (var i = l - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.currIconArr[i]);
            egret.Tween.get(this.currIconArr[i]).wait(100).to({ factor: 1 }, 700).call(function (icon) {
                var _this = this;
                var timerNum = egret.setTimeout(function () {
                    if (!_this.isInit()) {
                        egret.clearTimeout(timerNum);
                        return;
                    }
                    // this.restPrisonView();
                    icon.dispose();
                    icon["tweenMoveList"] = undefined;
                    _this.currIconArr.splice(i, 1);
                }, this, 800);
            }.bind(this, this.currIconArr[i]));
        }
    };
    AcPunishView.prototype.chooseBtnClick = function () {
        if (this._selectIndex == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishSelectItem"));
            return;
        }
        if (!this._touchSwitch) {
            return;
        }
        var data = this._punishItemVoList[(this._selectIndex + 1).toString()];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        if (hasNum <= 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            var rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "acPunishBuyTitle",
                msg: rewardStr,
                callback: this.doBuy,
                handler: this,
                needCancel: true
            });
            return;
        }
        this._touchSwitch = false;
        this._btnclickType = 'one';
        if (this.code == "2") {
            this.doCodeTwoLightAni();
        }
        else if (this.code == "3" || this.code == "10") {
            this.doAni1();
        }
        else if (this.code == "4") {
            // this.doNianShouAni();
            this.doYanHuaAni();
        }
        else if (this.code == "5" || this.code == "7") {
            // this.doNianShouAni();
            this.doYingJiuAni();
        }
        else if (this.code == "6") {
            this.doCodeSixLightAni();
        }
        else if (this.code == "8") {
            this.reunionaAn();
        }
        else if (this.code == "9") {
            this.dragonAni();
        }
        else {
            this.doAni2();
        }
    };
    //点灯动画
    AcPunishView.prototype.doYanHuaAni = function () {
        var _this = this;
        var idx = this._selectIndex + 1 + 1812;
        var lightSp = BaseLoadBitmap.create("itemicon" + idx);
        lightSp.width = lightSp.height = 100;
        lightSp.rotation = -20;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - lightContainer.height - 80;
        this.container.addChildAt(lightContainer, 10);
        lightSp.alpha = 0;
        var ranX = App.MathUtil.getRandom(0, 50);
        egret.Tween.get(lightSp, { loop: false }).to({ alpha: 1 }, 500).wait(300).call(function () {
            // this._touchSwitch = true;
        }, this);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: this._chooseBtn.y - lightContainer.height - 230,
            x: lightContainer.x - ranX,
            scaleX: 0.5,
            scaleY: 0.5,
        }, 500).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doNianShouAni();
        }, this);
    };
    //
    AcPunishView.prototype.dragonHitAni = function () {
        var _this = this;
        var view = this;
        var sound = "";
        switch (this._selectIndex) {
            case 0:
                sound = SoundConst.EFFECT_BATTLE_ATTACK1;
                break;
            case 1:
                sound = SoundConst.EFFECT_BATTLE_ATTACK2;
                break;
            case 2:
                sound = "effect_item_1";
                break;
            case 3:
                sound = SoundConst.EFFECT_DAILYBOSS_FIRE;
                break;
        }
        SoundManager.playEffect(sound);
        var lightSp = BaseBitmap.create("punish9boom" + (this._selectIndex < 2 ? 1 : 2));
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.anchorOffsetX = lightSp.width / 2;
        lightContainer.anchorOffsetY = lightSp.height / 2;
        lightContainer.setScale(0.1);
        lightContainer.x = GameConfig.stageWidth / 2;
        lightContainer.y = GameConfig.stageHeigth / 2;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lightContainer, view.container, [0,0], true);
        lightContainer.addChild(lightSp);
        this.container.addChildAt(lightContainer, 10);
        egret.Tween.get(lightSp, { loop: false }).wait(500);
        egret.Tween.get(lightContainer, { loop: false }).wait(100).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
        }, this);
        if (this._dgbone) {
            this._dgbone.playDragonMovie("hit", 1);
            this._dgbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, this.dragonMc, this);
        }
        else {
            if (this._headPic) {
                this._headPic.texture = ResourceManager.getRes("punish_boss9_hit");
                egret.Tween.get(this._headPic, { loop: false }).wait(500).call(function () {
                    _this._headPic.texture = ResourceManager.getRes("punish_boss9");
                }, this);
            }
            var key = (this._selectIndex + 1).toString();
            this.sendNetMessage(key);
        }
    };
    AcPunishView.prototype.dragonMc = function () {
        this._dgbone.playDragonMovie("idle", 0);
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
        this._touchSwitch = true;
    };
    //年兽动画
    AcPunishView.prototype.doNianShouAni = function () {
        var _this = this;
        SoundManager.playEffect("effect_punish_boom");
        var aniNum = [1, 3, 5, 7];
        var idx = this._selectIndex + 1 + 1812;
        this._headPic.texture = ResourceManager.getRes("punish_nian1");
        egret.Tween.get(this._headPic, { loop: false }).wait(500).call(function () {
            _this._headPic.texture = ResourceManager.getRes("punish_nian");
        }, this);
        var _loop_1 = function () {
            var ranIndex = App.MathUtil.getRandom(1, 3);
            var lightSp = BaseBitmap.create("punish_ani4" + ranIndex);
            lightSp.rotation = -20;
            lightSp.setScale(1.3);
            // lightSp.x = -lightSp.width/2*lightSp.scaleX;
            var lightContainer = new BaseDisplayObjectContainer();
            var ranX = App.MathUtil.getRandom(0, 100);
            var ranY = App.MathUtil.getRandom(-20, 80);
            lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX + ranX;
            // lightContainer.y = GameConfig.stageHeigth - 200;
            lightContainer.addChild(lightSp);
            lightContainer.y = this_1._chooseBtn.y - lightContainer.height - 180 + ranY;
            this_1.container.addChildAt(lightContainer, 10);
            // lightSp.alpha = 0;
            egret.Tween.get(lightSp, { loop: false }).wait(500).call(function () {
                _this._touchSwitch = true;
            }, this_1);
            lightSp.anchorOffsetX = lightSp.width / 2;
            lightSp.anchorOffsetY = lightSp.height / 2;
            lightContainer.setScale(0.1);
            egret.Tween.get(lightContainer, { loop: false }).wait(100 * index).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                _this.removeChildFromContainer(lightContainer);
                lightContainer = null;
                lightSp = null;
            }, this_1);
        };
        var this_1 = this;
        for (var index = 0; index < aniNum[this._selectIndex]; index++) {
            _loop_1();
        }
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
        //this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni0 = function () {
        var _this = this;
        var idx = this._selectIndex + 1;
        var lightSp = BaseBitmap.create("punish_ani5" + idx + "_0");
        lightSp.rotation = -20;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - 30;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - 160;
        this.container.addChildAt(lightContainer, 10);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: lightContainer.y + 10,
            x: lightContainer.x + 20,
            scaleX: 1.1,
            scaleY: 1.1,
        }, 300).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doYingJiuAni();
        }, this);
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni = function () {
        var _this = this;
        var dis = ((GameConfig.stageWidth / 2 - 30) - (this._headPic.x + 240)) / ((this._chooseBtn.y - 160) - (this._headPic.y + 470));
        var angle = Math.atan(dis) * 180 / Math.PI;
        ;
        SoundManager.playEffect("effect_punish_5weapon");
        var idx = this._selectIndex + 1;
        var lightSp = BaseBitmap.create("punish_ani5" + idx);
        lightSp.rotation = -angle;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - 30;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - 160;
        this.container.addChildAt(lightContainer, 10);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: this._headPic.y + 470,
            x: this._headPic.x + 240,
            scaleX: 0.5,
            scaleY: 0.5,
        }, 300).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doYingJiuAni2();
        }, this);
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni2 = function () {
        var _this = this;
        //飘血
        var bloodSp = BaseBitmap.create("punish_ani5_hit");
        bloodSp.x = this._headPic.x + 240 - 90;
        bloodSp.y = this._headPic.y + 470 - 70;
        this.container.addChildAt(bloodSp, 10);
        var idx = this._selectIndex + 1;
        var showSp = BaseBitmap.create("punish_ani5" + idx + "_0");
        var dis = ((GameConfig.stageWidth / 2 - 30) - (this._headPic.x + 240)) / ((this._chooseBtn.y - 160) - (this._headPic.y + 470));
        var angle = Math.atan(dis) * 180 / Math.PI;
        ;
        // Math.atan2
        showSp.rotation = -angle;
        showSp.x = this._headPic.x + 240;
        showSp.y = this._headPic.y + 470;
        showSp.setScale(0.5);
        this.container.addChildAt(showSp, 11);
        egret.Tween.get(bloodSp, { loop: false }).
            wait(300).call(function () {
            _this.removeChildFromContainer(bloodSp);
            bloodSp = null;
            // this.doYingJiuAni2();
            _this.removeChildFromContainer(showSp);
            showSp = null;
        }, this);
        // SoundManager.playEffect("effect_punish_boom");
        // let aniNum = [1,3,5,7];
        // let idx = this._selectIndex+1 + 1812;
        SoundManager.playEffect("effect_punish_5boss");
        this._headPic.texture = ResourceManager.getRes("punish_boss1");
        egret.Tween.get(this._headPic, { loop: false }).wait(500).call(function () {
            _this._headPic.texture = ResourceManager.getRes("punish_boss");
            _this._touchSwitch = true;
        }, this);
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
        //this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
    };
    //点灯动画
    AcPunishView.prototype.doCodeTwoLightAni = function () {
        var _this = this;
        var idx = this._selectIndex + 1 + 1804;
        var lightSp = BaseLoadBitmap.create("itemicon" + idx);
        lightSp.width = lightSp.height = 100;
        lightSp.rotation = -20;
        lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - lightContainer.height - 80;
        this.container.addChildAt(lightContainer, 2);
        lightSp.alpha = 0;
        var ranX = App.MathUtil.getRandom(0, 50);
        egret.Tween.get(lightSp, { loop: false }).to({ alpha: 1 }, 500).wait(300).call(function () {
            _this._touchSwitch = true;
        }, this);
        egret.Tween.get(lightContainer, { loop: false }).to({ y: 0, x: lightContainer.x + ranX }, 2500).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
        }, this);
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
    };
    //点灯动画
    AcPunishView.prototype.doCodeSixLightAni = function () {
        var _this = this;
        var aniStr = "punish6_";
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 5, 100);
        // itemClip.x = 0;
        // itemClip.y = 470;
        // this.addChildToContainer(itemClip);
        this._bodyContainer.addChild(itemClip);
        itemClip.playWithTime(1);
        this._headPic.visible = false;
        itemClip.setEndCallBack(function () {
            _this._headPic.visible = true;
            _this._bodyContainer.removeChild(itemClip);
            itemClip = null;
            _this._touchSwitch = true;
        }, this);
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
    };
    //汤圆动画
    AcPunishView.prototype.reunionaAn = function () {
        this._dgbone.playDragonMovie("daotangyuan", 1);
        this._dgbone2.playDragonMovie("daotangyuan", 1);
        this._dgbone2.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, this.changemc, this);
    };
    AcPunishView.prototype.changemc = function () {
        this._dgbone.playDragonMovie("idle", 0);
        this._dgbone2.playDragonMovie("idle", 0);
        this._touchSwitch = true;
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
    };
    AcPunishView.prototype.sendNetMessage = function (key) {
        var view = this;
        if (view._btnclickType == 'one') {
            view.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
        }
        else if (view._btnclickType == 'all') {
            view.request(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH, { activeId: "punish-" + this.code });
        }
    };
    AcPunishView.prototype.doAni1 = function () {
        var key = (this._selectIndex + 1).toString();
        var posX = [200, 200, 220, 220];
        var posY = [300, 300, 140, 300];
        var aniStr = "punish_" + key + "_";
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 2, 100);
        itemClip.frameImages = ["punish_" + key + "_1", "punish_" + key + "_2"];
        itemClip.x = posX[this._selectIndex];
        itemClip.y = posY[this._selectIndex];
        this.addChildToContainer(itemClip);
        itemClip.playWithTime(1);
        itemClip.setEndCallBack(this.nextAni, this);
    };
    AcPunishView.prototype.dragonAni = function () {
        var _this = this;
        var view = this;
        var idx = this._selectIndex;
        var lightSp = BaseBitmap.create("punish9item" + (idx + 1));
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.anchorOffsetX = lightSp.width / 2;
        lightContainer.anchorOffsetY = lightSp.height / 2;
        lightContainer.x = GameConfig.stageWidth / 2;
        lightContainer.y = this._chooseBtn.y - lightSp.height * lightSp.scaleY / 2;
        lightContainer.addChild(lightSp);
        this.container.addChildAt(lightContainer, 10);
        lightSp.alpha = 0;
        egret.Tween.get(lightSp, { loop: false }).to({ alpha: 1 }, 200).wait(300).call(function () {
            // this._touchSwitch = true;
        }, this);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: GameConfig.stageHeigth / 2,
            x: lightContainer.x,
            scaleX: 0.5,
            scaleY: 0.5,
        }, 200).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.dragonHitAni();
        }, this);
    };
    AcPunishView.prototype.doAni2 = function () {
        SoundManager.playEffect(SoundConst.EFFECT_PRISON_HIT);
        this._wordsContanier.visible = true;
        var rnd = App.MathUtil.getRandom(1, 4);
        this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);
        var key = (this._selectIndex + 1).toString();
        var container = new BaseDisplayObjectContainer();
        var aniBB = BaseBitmap.create("punish_ani" + key);
        container.setScale(2.5);
        this.addChildToContainer(container);
        container.addChild(aniBB);
        egret.Tween.get(container).to({ scaleX: 1, scaleY: 1 }, 200).call(function (m) {
            if (m) {
                // egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                // m.dispose();
                this.nextAni2(m);
            }
        }.bind(this, container), this);
        container.anchorOffsetX = container.width / 2;
        container.anchorOffsetY = container.height / 2;
        var posX = [250, 320, 250, 300];
        var posY = [500, 500, 440, 400];
        container.x = posX[this._selectIndex];
        container.y = posY[this._selectIndex];
    };
    AcPunishView.prototype.nextAni2 = function (m) {
        var key = (this._selectIndex + 1).toString();
        this.sendNetMessage(key);
        //this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.aid+ "-"+this.code,itemKey:key});
        this._headPic.texture = ResourceManager.getRes("punish_head2_2");
        if (this.code == "11") {
            this._headPic.texture = ResourceManager.getRes("prison_body" + this.code + "_2");
        }
        var aniBB = BaseBitmap.create("punish_light");
        m.addChildAt(aniBB, 0);
        egret.Tween.removeTweens(m);
        egret.Tween.get(m).wait(200).to({ alpha: 0 }, 500).call(function (m) {
            if (m) {
                // m.addChildAt(0)
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                this._headPic.texture = ResourceManager.getRes("punish_head2_1");
                if (this.code == "11") {
                    this._headPic.texture = ResourceManager.getRes("prison_body" + this.code + "_1");
                }
                m.dispose();
                // this.nextAni2(m);
                this._touchSwitch = true;
                this._wordsContanier.visible = false;
            }
        }.bind(this, m), this);
    };
    AcPunishView.prototype.doBuy = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        AcPunishBuyItemPopupView.aid = this.aid;
        AcPunishBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW, {});
    };
    AcPunishView.prototype.nextAni = function (m) {
        var key = (this._selectIndex + 1).toString();
        var rnd = App.MathUtil.getRandom(1, 5);
        if (this.code == "10") {
            SoundManager.playEffect("effect_punish_5boss");
        }
        else {
            SoundManager.playEffect("effect_punish_" + rnd);
        }
        SoundManager.playEffect("effect_item_" + key);
        var posX = [200, 200, 220, 220];
        var posY = [300, 300, 140, 300];
        var aniStr = "punish_" + key + "_";
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 2, 100);
        itemClip.frameImages = ["punish_" + key + "_3", "punish_" + key + "_4"];
        itemClip.x = posX[this._selectIndex];
        itemClip.y = posY[this._selectIndex];
        this.addChildToContainer(itemClip);
        this._touchSwitch = false;
        itemClip.playWithTime(1);
        this._headPic.texture = ResourceManager.getRes("punish_head2");
        if (this.code == "10") {
            this._headPic.texture = ResourceManager.getRes("prison_body" + this.code + "_2");
        }
        // this._headPic.setRes("punish_head2");
        itemClip.setEndCallBack(this.setEnd, this);
        m.dispose();
    };
    AcPunishView.prototype.setEnd = function (m) {
        var key = (this._selectIndex + 1).toString();
        this._headPic.texture = ResourceManager.getRes("punish_head1");
        if (this.code == "10" || this.code == "11") {
            this._headPic.texture = ResourceManager.getRes("prison_body" + this.code + "_1");
        }
        // this._headPic.setRes("punish_head1");
        this.sendNetMessage(key);
        //this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: "punish-"+this.code,itemKey:key});
        this._touchSwitch = true;
        var tmpThis = this;
        egret.Tween.get(m).to({ alpha: 0 }, 300).call(function (m) {
            if (m) {
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                m.dispose();
            }
        }.bind(this, m), this);
    };
    //领取BOSS奖励
    AcPunishView.prototype.getBoxClick = function () {
        if (this._acVo.get) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        if (this._acData.hp > 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD, { activeId: "punish-" + this.code });
    };
    //请求回调
    AcPunishView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM) {
            App.LogUtil.log("receiveData: atk**********");
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            if (data.data.data.hasKill) {
                this._acData.hp = 0;
            }
            else {
                this._acData = data.data.data.punishActive;
            }
            //code 12 泰拳 是否显示暴击
            if (this.getTypeCode() == "12") {
                // this._isSelectSkill = false;
                if (this._critPos == this._selectPos) {
                    //飘暴击
                    var boomPic_1 = BaseBitmap.create("atkrace_crit_text");
                    boomPic_1.anchorOffsetX = boomPic_1.width / 2;
                    boomPic_1.anchorOffsetY = boomPic_1.height / 2;
                    boomPic_1.setPosition(GameConfig.stageWidth / 2, 550);
                    this.addChildToContainer(boomPic_1);
                    boomPic_1.setScale(0.7);
                    egret.Tween.get(boomPic_1).wait(100).to({ scaleX: 1.1, scaleY: 1.1, y: boomPic_1.y - 80 }, 100).wait(200).to({ scaleX: 0.7, scaleY: 0.7, alpha: 0 }, 150).call(function () {
                        // if (this._dgbone){
                        // 	this._dgbone.playDragonMovie("Standby", 0);
                        // }
                        boomPic_1.dispose();
                    }, this);
                }
            }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
            this.buyCallback(null);
            this.refreshState();
            /**
             * 飘起经验
             */
            var strList_2 = [];
            var scrore1 = data.data.data.score1;
            var flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1", [String(scrore1)]);
            strList_2.push({ tipMessage: flyStr1 });
            var scrore2 = data.data.data.score2;
            if (scrore2 > 0) {
                var flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2", [String(scrore2)]);
                strList_2.push({ tipMessage: flyStr2 });
            }
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(strList_2);
            }, this, 800);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE) {
            this._acData = data.data.data.punishActive;
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            this.refreshState();
        }
    };
    AcPunishView.prototype.butItemBtnCilck = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // if(this.getState() == 3)
        // {
        // }
        AcPunishBuyItemPopupView.aid = this.aid;
        AcPunishBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW, {});
    };
    AcPunishView.prototype.rankRewardBtnCilck = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKREWARDPOPUPVIEW, { acData: this._acData, aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.rankCilck = function () {
        if (this._acVo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.exchangeCilck = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHEXPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenAllianceRankNewRule()) {
            return "acPunish_Rulenew-" + this.code;
        }
        return "acPunish_Rule-" + this.code;
    };
    AcPunishView.prototype.addChildToContainer = function (obj) {
        if (obj) {
            this.container.addChild(obj);
            this.container.y = 0;
        }
    };
    AcPunishView.prototype.showList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._punishItemVoList = cfg.punishList;
        for (var index = 1; index < 5; index++) {
            var item = this.getItem(this._punishItemVoList[index.toString()]);
            this._punishItemList.push(item);
            item.setScale(0.9);
            item.x = 77 + (136 * 0.9 + 10) * (index - 1);
            if (this.code == "8") {
                item.y = GameConfig.stageHeigth - this.container.y - 350 + 110;
            }
            else {
                item.y = GameConfig.stageHeigth - this.container.y - 350;
            }
            this.addChild(item);
            item.addTouchTap(this.itemClick, this, [index - 1]);
        }
        for (var index = 0; index < this._punishItemList.length; index++) {
            var data = this._punishItemVoList[(index + 1).toString()];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            if (hasNum > 0) {
                this.setSelect(index);
                return;
            }
        }
    };
    AcPunishView.prototype.getItem = function (data) {
        // let itemInfo = Api.itemVoApi.getItemInfoVoById(data.item.toString());
        var container = new BaseDisplayObjectContainer();
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(data.item));
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number("1810"));
        var iconBg = BaseBitmap.create(itemCfg.iconBg);
        iconBg.name = "itembg";
        container.addChild(iconBg);
        // container.width = iconBg.width;
        // container.height = iconBg.height;
        var icon = BaseLoadBitmap.create(itemCfg.icon);
        container.addChild(icon);
        if (this.code == "8") {
            icon.width = 100;
            icon.height = 100;
        }
        icon.name = "itemicon";
        icon.setPosition(4, 5);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        var numLb = ComponentManager.getTextField(hasNum.toString(), 18);
        var numBg = BaseBitmap.create("public_9_itemnumbg");
        if (hasNum > 99) {
            numBg.width = numLb.width + 22;
        }
        numBg.name = "numBg";
        numBg.setPosition(iconBg.x + iconBg.width - numBg.width - 4, iconBg.y + iconBg.height - numBg.height - 4);
        container.addChild(numBg);
        numLb.setPosition(iconBg.width - 12 - numLb.width, numBg.y + numBg.height / 2 - numLb.height / 2);
        // numLb.setPosition(iconBg.width - 8 - numLb.width, iconBg.height - 8 - numLb.height );
        container.addChild(numLb);
        numLb.name = "numLb";
        var nameBg = BaseBitmap.create("public_numbg");
        nameBg.x = iconBg.width / 2 - nameBg.width / 2;
        nameBg.y = iconBg.height + 5;
        container.addChild(nameBg);
        var nameLb = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameLb.x = nameBg.x + nameBg.width / 2 - nameLb.width / 2;
        nameLb.y = nameBg.y + nameBg.height / 2 - nameLb.height / 2;
        container.addChild(nameLb);
        if (hasNum <= 0) {
            App.DisplayUtil.changeToGray(icon);
            App.DisplayUtil.changeToGray(iconBg);
        }
        return container;
    };
    AcPunishView.prototype.itemClick = function (evt, index) {
        // this._selectIndex = index;
        this.setSelect(index);
    };
    AcPunishView.prototype.showNewList = function () {
        for (var i = 0; i < 4; i++) {
            var skillContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(skillContainer);
            var btnImg = ResourceManager.hasRes("punish_skill-" + this.getTypeCode() + "_" + (i + 1)) ? "punish_skill-" + this.getTypeCode() + "_" + (i + 1) : "punish_skill-12_" + (i + 1);
            var skillBtn = ComponentManager.getButton(btnImg, "", this.skillBtnClick, this, [i]);
            skillContainer.width = skillBtn.width;
            skillContainer.height = skillBtn.height;
            skillContainer.x = (i % 2 ? 60 : GameConfig.stageWidth - 60 - skillBtn.width);
            // skillContainer.y = this._progressBar.y + 90 + Math.floor(i/2) * 280;
            // App.LogUtil.log("skillContainer.y "+skillContainer.y);
            skillContainer.y = this.titleBg.y + this.titleBg.height + 340 + Math.floor(i / 2) * 280;
            App.LogUtil.log("skillContainer.y " + skillContainer.y);
            var btnEffect = ComponentManager.getCustomMovieClip("acpunish_fireeffect", 10, 70);
            btnEffect.setScale(1.2);
            btnEffect.setPosition(-88, -162);
            btnEffect.playWithTime(0);
            skillContainer.addChild(btnEffect);
            if (i + 1 == this.vo.crit) {
                btnEffect.visible = true;
            }
            else {
                btnEffect.visible = false;
            }
            skillContainer.addChild(skillBtn);
            var skillBtnData = { skillContainer: skillContainer, skillBtn: skillBtn, btnEffect: btnEffect };
            this._skillBtnList[i] = skillBtnData;
        }
    };
    AcPunishView.prototype.skillBtnClick = function (index) {
        var _this = this;
        App.LogUtil.log("this._isSelectSkill: " + this._isSelectSkill);
        // if (this._isSelectSkill){
        // return;
        // }
        App.LogUtil.log("skillBtnClick: " + index);
        var needEnergy = this.vo.config.needEnergy;
        if (this.vo.energy < needEnergy) {
            // 	// App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnergyNotEnough-"+this.getTypeCode()));
            // 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            // 		title:"itemUseConstPopupViewTitle",
            // 		msg:LanguageManager.getlocal("acPunishEnergyNotEnough"),
            // 		callback:() =>{
            // 			ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHSHOPPOPUPVIEW, {aid:this.aid, code:this.code});
            // 		},
            // 		handler:this,
            // 		needCancel:true,
            // 		});
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var startTime = this._acVo.st;
            var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
            var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
            if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHSHOPPOPUPVIEW, { aid: this.aid, code: this.code });
            return;
        }
        //放技能
        this._isSelectSkill = true;
        this._selectPos = index + 1;
        this._critPos = this.vo.crit;
        App.LogUtil.log("this.vo.crit: " + this.vo.crit);
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.vo.aidAndCode, itemKey: (index + 1) });
        if (this._dgbone) {
            egret.Tween.removeTweens(this._dgbone);
            this._boneTw = null;
            var actName = this.getBoneActByType(index + 1);
            this._dgbone.playDragonMovie(actName, 1);
            this._dgbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                // this._isSelectSkill = false;
                if (_this._boneTw) {
                    egret.Tween.removeTweens(_this._dgbone);
                    _this._boneTw = egret.Tween.get(_this._dgbone).wait(1000).call(function () {
                        _this._dgbone.playDragonMovie("Standby", 0);
                        _this._boneTw = null;
                    });
                }
                else {
                    _this._boneTw = egret.Tween.get(_this._dgbone).wait(1000).call(function () {
                        _this._dgbone.playDragonMovie("Standby", 0);
                        _this._boneTw = null;
                    });
                }
                //使用技能 播放完成掉接口
                egret.Tween.get(_this._wordsContanier).call(function () {
                    _this._wordsContanier.visible = true;
                    var rnd = App.MathUtil.getRandom(1, 4);
                    _this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);
                }).wait(300).to({ alpha: 0 }, 100).call(function () {
                    _this._wordsContanier.visible = false;
                    _this._wordsContanier.alpha = 1;
                });
                App.LogUtil.log("punish*播放完成");
                // this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.vo.aidAndCode,itemKey:(index + 1)});
            }, this);
        }
        else if (this._bodyContainer) {
            var bodyPic = "punish_role-" + this.getTypeCode() + "_" + (index + 1);
            this._headPic.setRes(bodyPic);
            egret.Tween.get(this._wordsContanier).call(function () {
                _this._wordsContanier.visible = true;
                var rnd = App.MathUtil.getRandom(1, 4);
                _this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);
            }).wait(300).to({ alpha: 0 }, 100).call(function () {
                _this._wordsContanier.visible = false;
                _this._wordsContanier.alpha = 1;
            });
            egret.Tween.get(this._headPic).wait(1000).call(function () {
                _this._headPic.setRes("punish_role-" + _this.getTypeCode() + "_0");
            });
        }
        //使用技能 播放完成掉接口
        // egret.Tween.get(this._wordsContanier).call(()=>{
        // 	this._wordsContanier.visible = true;
        // 	let rnd =  App.MathUtil.getRandom(1,4);
        // 	this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);
        // }).wait(300).to({alpha: 0}, 100).call(()=>{
        // 	this._wordsContanier.visible = false;
        // 	this._wordsContanier.alpha = 1;
        // 	this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM,{ activeId: this.vo.aidAndCode,itemKey:(index + 1)});
        // })
    };
    AcPunishView.prototype.getBoneActByType = function (index) {
        var act = "Standby";
        if (index == 1) {
            act = "fist";
        }
        else if (index == 2) {
            act = "elbow";
        }
        else if (index == 3) {
            act = "knee";
        }
        else if (index == 4) {
            act = "foot";
        }
        return act;
    };
    AcPunishView.prototype.refreshSkillState = function () {
        //新增
        var state = this.vo.inDayOpenState();
        App.LogUtil.log("state:**** " + state);
        for (var i = 0; i < this._skillBtnList.length; i++) {
            if (state == 1) {
                this._skillBtnList[i].skillBtn.setEnable(false);
                this._skillBtnList[i].btnEffect.visible = false;
            }
            else if (state == 3 && this._acData.hp > 0) {
                this._skillBtnList[i].skillContainer.visible = true;
                this._skillBtnList[i].skillBtn.setEnable(true);
                if (this.vo.crit == (i + 1)) {
                    this._skillBtnList[i].btnEffect.visible = true;
                }
                else {
                    this._skillBtnList[i].btnEffect.visible = false;
                }
            }
            else {
                this._skillBtnList[i].skillContainer.visible = false;
            }
        }
    };
    AcPunishView.prototype.refreshView = function () {
        if (this.getTypeCode() == "12") {
            this._energyNum.text = "" + this.vo.energy;
            this._energyNum.x = GameConfig.stageWidth / 2 - this._energyNum.width / 2;
            this.refreshState();
        }
    };
    AcPunishView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var acstartTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var now = GameData.serverTime;
        var startTime = zeroTime + 3600 * cfg.activeTime[0];
        var endTime = zeroTime + 3600 * cfg.activeTime[1];
        var isRefresh = false;
        if (this._lastTime < startTime && now > startTime) {
            isRefresh = true;
        }
        if (this._lastTime < endTime && now > endTime) {
            isRefresh = true;
        }
        if (this.getState() == 3 || this.getState() == 4) {
            if (this._boxContainer && this._boxContainer.visible == false) {
                isRefresh = true;
            }
        }
        if (isRefresh) {
            this.refreshState();
            this._lastTime = now;
        }
        // let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
        if (this.getState() == 4) {
            var openTime = 86400 + App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0] * 3600;
            var openStr = LanguageManager.getlocal("acPunishOpenTime", [App.DateUtil.getFormatBySecond(openTime, 1)]);
            this._openTxt.visible = true;
            this._openbg.visible = true;
            this._openTxt.text = openStr;
            this._openTxt.anchorOffsetX = this._openTxt.width / 2;
        }
        if (this.getState() == 1) {
            var openTime = App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0] * 3600;
            var openStr = LanguageManager.getlocal("acPunishOpenTime", [App.DateUtil.getFormatBySecond(openTime, 1)]);
            this._openTxt.visible = true;
            this._openbg.visible = true;
            this._openTxt.text = openStr;
            this._openTxt.anchorOffsetX = this._openTxt.width / 2;
        }
        if (this.getTypeCode() == "12") {
            this._acTimeTf.text = LanguageManager.getlocal("acFourPeople_acCD", [this.vo.getCountDown()]);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
            this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        }
    };
    AcPunishView.prototype.buyCallback = function (event) {
        var num = 0;
        for (var index = 0; index < this._punishItemList.length; index++) {
            var txt = this._punishItemList[index].getChildByName("numLb");
            // if (this._punishItemList[index].getChildByName("numbg"))
            // {
            //     this._punishItemList[index].getChildByName("numbg").visible = false;
            // }
            var data = this._punishItemVoList[(index + 1).toString()];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            txt.text = hasNum.toString();
            // txt.setPosition(108 - 8 - txt.width, 106 - 8 - txt.height );
            var numBg = this._punishItemList[index].getChildByName("numBg");
            var iconBg = this._punishItemList[index].getChildByName("itembg");
            var icon = this._punishItemList[index].getChildByName("itemicon");
            txt.setPosition(iconBg.width - 12 - txt.width, numBg.y + numBg.height / 2 - txt.height / 2);
            if (hasNum <= 0) {
                App.DisplayUtil.changeToGray(icon);
                App.DisplayUtil.changeToGray(iconBg);
            }
            else {
                App.DisplayUtil.changeToNormal(icon);
                App.DisplayUtil.changeToNormal(iconBg);
            }
            num += hasNum;
        }
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text.text = score1Str;
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text.text = score2Str;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var lvStr = "";
        var hp = cfg.getHp(this._acVo.day);
        if (this.code == "2") {
            lvStr = (100 - this._acData.hp / hp * 100).toFixed(3);
            this._progressBar.setPercentage(1 - this._acData.hp / hp);
        }
        else {
            lvStr = Math.floor(this._acData.hp / hp * 100).toString();
            this._progressBar.setPercentage(this._acData.hp / hp);
        }
        this._levelTxt.text = lvStr + "%";
        this.refreshState();
        // if(num >= cfg.itemNum){
        // 	this._chooseBtn.x = GameConfig.stageWidth/ 2 - this._chooseBtn.width - 10;
        // 	this._chooseAllBtn.visible = true;
        // }
        this.checkBtnRed();
    };
    AcPunishView.prototype.runText = function () {
        var strList = new Array();
        App.LogUtil.log("runtext: " + this._acData.log.length);
        for (var index = 0; index < this._acData.log.length; index++) {
            var str = this.getTipText(this._acData.log[index]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = 190;
        if (this.code == "8") {
            lampContainer.y = 183;
        }
        else if (this.getTypeCode() == "12") {
            lampContainer.y = 270;
        }
        this.addChildToContainer(lampContainer);
    };
    AcPunishView.prototype.getTipText = function (data) {
        var tipStr = "";
        if (!data) {
            return "";
        }
        var itemcfg = null;
        if (data[1]) {
            itemcfg = Config.ItemCfg.getItemCfgById(Number(data[1]));
        }
        if (itemcfg) {
            var rewardStr = GameData.getRewardsStr(data[2]);
            tipStr = LanguageManager.getlocal("acPunishTip", [data[0], itemcfg.name, rewardStr]);
        }
        else {
            var rewardStr = GameData.getRewardsStr(data[2]);
            tipStr = LanguageManager.getlocal("acPunishTip1", [data[0], rewardStr]);
        }
        return tipStr;
    };
    AcPunishView.prototype.exCallback = function (event) {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        this._score2Text.text = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
    };
    AcPunishView.prototype.getSheepType = function () {
        return 1;
    };
    AcPunishView.prototype.checkBtnRed = function () {
        if (this._acVo.checkHasGoldenTimes()) {
            App.CommonUtil.addIconToBDOC(this._shopButton);
            var red = this._shopButton.getChildByName("reddot");
            if (this.code == "9" || this.code == "8" || this.getTypeCode() == "12") {
            }
            else if (this.code == "3") {
                red.x = 150;
                red.y = 40;
            }
            else if (this.code == "6") {
                red.x = 15;
                red.y = 30;
            }
            else {
                red.x = 100;
                red.y = 40;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._shopButton);
        }
    };
    AcPunishView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._score1Text = null;
        this._score2Text = null;
        this._acData = null;
        this._acVo = null;
        this._progressBar = null;
        this._selectBg = null;
        this._selectIndex = -1;
        this._openTxt = null;
        this._boxContainer = null;
        this._lightSp = null;
        this._boxDesc = null;
        this._boxSp = null;
        this._chooseBtn = null;
        this._touchSwitch = true;
        // egret.Tween.removeTweens(this._lightSp);
        this._bodyContainer = null;
        this._headPic = null;
        this._wordsContanier = null;
        this._punishItemList = null;
        this._chooseAllBtn = null;
        this.currIconArr = [];
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this._openbg = null;
        this._descBg = null;
        this._tyitemClip = null;
        this._dgbone2 = null;
        //新增
        this._timeBg = null;
        this._acTimeTf = null;
        this._skillBtnList = [];
        this._energyNum = null;
        this._isSelectSkill = false;
        this._critPos = 1;
        this._selectPos = 1;
        this._boneTw = null;
        this._shopButton = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishView;
}(AcCommonView));
__reflect(AcPunishView.prototype, "AcPunishView");
//# sourceMappingURL=AcPunishView.js.map