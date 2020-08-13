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
 * desc:跨服权势活动首页
*/
var AcCrossServerPowerView = (function (_super) {
    __extends(AcCrossServerPowerView, _super);
    function AcCrossServerPowerView() {
        var _this = _super.call(this) || this;
        _this._canJoinImg = null;
        _this._cdTimeDesc = null;
        _this._cdType = 0; //倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
        _this._countDownText = null;
        _this._countDownTime = 0;
        _this._enterBtn = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerPowerView.prototype, "api", {
        get: function () {
            return Api.crossPowerVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcCrossServerPowerView.prototype.getResourceList = function () {
        var baseRes = [
            "crossserverinti_detailbg-1", "crossserverintibg-1",
            // "crosspowertitle","crossserverpower_canjoin",
            "public_9_wordbg2", "crosspowerenter", "crosspowerenter_down",
            "punish_reward_icon",
            "punish_rank_icon",
            "punish_rank_name",
            "rechargevie_db_01"
        ];
        var resList = null;
        if (this.cfg.specialReward) {
            resList = baseRes.concat([
                "crosspowerenterbg_special",
                "atkracecross_namebg",
                "atkracecross_showbtnbg",
                // "atkracecross_showbtnicon",
                this.getDefaultRes("crosspowerenterbg_showbtnicon", "10"),
                "atkracecross_showbtntxt",
                "atkracecross_threetip",
                "atkracecross_threetipflower",
            ]);
        }
        else {
            resList = baseRes.concat([
                "crosspowerenterbg",
            ]);
        }
        return _super.prototype.getResourceList.call(this).concat(resList);
        // return super.getResourceList().concat([
        // 	"crossserverinti_detailbg-1","crossserverintibg-1",
        // 	// "crosspowertitle","crossserverpower_canjoin",
        // 	"public_9_wordbg2","crosspowerenter","crosspowerenter_down","crosspowerenterbg",
        // 	"punish_reward_icon",
        // 	"punish_rank_icon",
        // 	"punish_rank_name",
        // 	"rechargevie_db_01"
        // ]);
    };
    AcCrossServerPowerView.prototype.initTitle = function () {
    };
    AcCrossServerPowerView.prototype.getBgName = function () {
        if (this.cfg.specialReward) {
            return "crosspowerenterbg_special";
        }
        else {
            return "crosspowerenterbg";
        }
    };
    AcCrossServerPowerView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcCrossServerPowerView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
        }
    };
    AcCrossServerPowerView.prototype.getTitleStr = function () {
        return "crosspower";
    };
    AcCrossServerPowerView.prototype.createSpecial = function (y) {
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        if (rewardItemVo[0].type == 8) {
            //门客
            var dragon = null;
            if (RES.hasRes("servant_full2_" + rewardItemVo[0].id + "_ske") && App.CommonUtil.check_dragon()) {
                dragon = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + rewardItemVo[0].id);
                dragon.setScale(1);
                dragon.x = 320;
                dragon.y = GameConfig.stageHeigth - 146 + 35;
                this.servantContainer.addChild(dragon);
                var mask = BaseBitmap.create("public_9v_bg01");
                mask.width = 640;
                mask.height = GameConfig.stageHeigth - 146;
                dragon.mask = mask;
                this.servantContainer.addChild(mask);
            }
            else {
                var bm = null;
                // let skinW =640;
                // let skinH = 482;
                // let tarScale = 1;
                // bm = BaseLoadBitmap.create("servant_full_" + rewardItemVo[0].id);
                var skinW = 640;
                var skinH = 840;
                var tarScale = 0.8;
                bm = BaseLoadBitmap.create("wife_full_" + rewardItemVo[0].id);
                bm.width = skinW;
                bm.height = skinH;
                bm.setScale(tarScale);
                bm.x = 320 - skinW * tarScale / 2;
                bm.y = GameConfig.stageHeigth - 146 - bm.height * tarScale + 35;
                this.servantContainer.addChild(bm);
                var mask = BaseBitmap.create("public_9v_bg01");
                mask.width = 640;
                mask.height = GameConfig.stageHeigth - 146;
                bm.mask = mask;
                this.servantContainer.addChild(mask);
            }
            var servantCfg = Config.ServantCfg.getServantItemById(rewardItemVo[0].id);
            if (PlatformManager.checkIsViSp()) {
                var name_1 = ComponentManager.getTextField(servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
                var nameBg = BaseBitmap.create("atkracecross_namebg");
                nameBg.height = name_1.width + 50;
                nameBg.anchorOffsetX = 26;
                nameBg.anchorOffsetY = nameBg.height / 2;
                nameBg.rotation = -90;
                nameBg.x = 10 + nameBg.height / 2;
                nameBg.y = GameConfig.stageHeigth / 2 - nameBg.width / 2;
                this.servantContainer.addChild(nameBg);
                name_1.x = nameBg.x - name_1.width / 2;
                name_1.y = nameBg.y - name_1.height / 2;
                this.servantContainer.addChild(name_1);
            }
            else {
                var nameBg = BaseBitmap.create("atkracecross_namebg");
                nameBg.x = 30;
                nameBg.y = GameConfig.stageHeigth / 2 - nameBg.height / 2;
                this.servantContainer.addChild(nameBg);
                var name_2 = ComponentManager.getTextField(servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
                name_2.width = 24;
                name_2.x = nameBg.x + nameBg.width / 2 - name_2.width / 2 - 10;
                name_2.y = nameBg.y + nameBg.height / 2 - name_2.height / 2;
                this.servantContainer.addChild(name_2);
            }
        }
        var tip = BaseBitmap.create("atkracecross_threetip");
        tip.x = GameConfig.stageWidth / 2 - tip.width / 2;
        tip.y = y;
        this.servantContainer.addChild(tip);
        var tipFlower = BaseBitmap.create("atkracecross_threetipflower");
        tipFlower.x = tip.x + 60;
        tipFlower.y = tip.y + 52;
        this.servantContainer.addChild(tipFlower);
        var btn = ComponentManager.getButton("atkracecross_showbtnbg", null, this.detailBtnClick, this);
        btn.x = GameConfig.stageWidth - 10 - btn.width;
        btn.y = tip.y + tip.height;
        this.servantContainer.addChild(btn);
        var btnIcon = BaseBitmap.create(this.getDefaultRes("crosspowerenterbg_showbtnicon", "10"));
        btnIcon.x = btn.width / 2 - btnIcon.width / 2;
        btnIcon.y = btn.height / 2 - btnIcon.height / 2;
        btn.addChild(btnIcon);
        var btnTxt = BaseBitmap.create("atkracecross_showbtntxt");
        btnTxt.x = btn.width / 2 - btnTxt.width / 2;
        btnTxt.y = btn.height - btnTxt.y - 40;
        btn.addChild(btnTxt);
    };
    AcCrossServerPowerView.prototype.detailBtnClick = function () {
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW, { servantId: rewardItemVo[0].id, wifeId: rewardItemVo[0].id });
    };
    AcCrossServerPowerView.prototype.initView = function () {
        if (this.cfg.specialReward) {
            this.servantContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this.servantContainer);
        }
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
        var titleRes = "crosspowertitle";
        if (ResourceManager.hasRes("crosspowertitle" + "-" + this.cfg.getCrossServerType())) {
            titleRes = "crosspowertitle" + "-" + this.cfg.getCrossServerType();
        }
        var title = BaseLoadBitmap.create(titleRes);
        title.width = 528;
        title.height = 153;
        view.addChildToContainer(title);
        view.setLayoutPosition(LayoutConst.horizontalCenter, title, view);
        title.y = 23;
        //参赛资格
        var canJoin = this.vo.getIsCanJoin();
        var canJoinRes = "crossserverpower_canjoin";
        if (ResourceManager.hasRes("crossserverpower_canjoin" + "-" + this.cfg.getCrossServerType())) {
            canJoinRes = "crossserverpower_canjoin" + "-" + this.cfg.getCrossServerType();
        }
        view._canJoinImg = BaseLoadBitmap.create(canJoinRes);
        view._canJoinImg.width = 241;
        view._canJoinImg.height = 91;
        view._canJoinImg.visible = canJoin;
        view.addChildToContainer(view._canJoinImg);
        //底部
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 146;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        view.addChildToContainer(bottomBg);
        //当前时间段
        view._cdType = vo.judgeTimeProcess();
        if (view._cdType > 0 && view._cdType < 4) {
            if (view._cdType == 1) {
                view._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
            }
            else if (view._cdType == 2) {
                view._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
            }
            else {
                view._countDownTime = vo.et - GameData.serverTime;
            }
            view.api.setCountDownTime(view._countDownTime);
        }
        if (this.cfg.specialReward) {
            this.createSpecial(152);
        }
        view._enterBtn = ComponentManager.getButton("crosspowerenter", '', view.enterInHandler, this);
        if (view._cdType > 1 && view._cdType < 4) {
            view._enterBtn.setEnable(true);
        }
        else {
            //灰化
            view._enterBtn.setEnable(false);
        }
        //进入按钮
        // view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 25);
        view.setLayoutPosition(LayoutConst.horizontalCenter, view._enterBtn, view);
        view.addChildToContainer(this._enterBtn);
        view._enterBtn.y = bottomBg.y - 179 - 25 - 100;
        if (this.cfg.specialReward) {
            this._enterBtn.y = GameConfig.stageHeigth - 158 - this._enterBtn.height;
        }
        //活动时间
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 10;
        timeDesc.y = bottomBg.y + 20;
        view.addChildToContainer(timeDesc);
        //活动倒计时时间
        view._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._cdTimeDesc.x = timeDesc.x;
        view._cdTimeDesc.y = timeDesc.y + timeDesc.textHeight + 5;
        view.addChildToContainer(this._cdTimeDesc);
        if (view._countDownTime > 0) {
            view._countDownText = ComponentManager.getTextField(view.vo.getCountTimeStr(view._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
            view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth, this._cdTimeDesc.y);
            view.addChildToContainer(view._countDownText);
        }
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossPowerRule-" + view.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc.width = GameConfig.stageWidth - 20;
        ruleDesc.lineSpacing = 6;
        ruleDesc.x = timeDesc.x;
        ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
        view.addChildToContainer(ruleDesc);
        // view.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-20,-20]);
        if (PlatformManager.hasSpcialCloseBtn()) {
            if (canJoin == true) {
                this.closeBtn.y = 80;
            }
            else {
                this.closeBtn.y = 0;
            }
        }
    };
    AcCrossServerPowerView.prototype.tick = function () {
        var view = this;
        if (view._countDownText) {
            --view._countDownTime;
            view.api.setCountDownTime(view._countDownTime);
            view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
            if (view._countDownTime <= 0) {
                view._cdType = view.vo.judgeTimeProcess();
                if (view._cdType == 2) {
                    view._enterBtn.setEnable(true);
                    view._countDownTime = view.vo.et - 86400 - GameData.serverTime;
                }
                else if (view._cdType == 3) {
                    view._countDownTime = view.vo.et - GameData.serverTime;
                }
                else if (view._cdType == 4) {
                    view._enterBtn.setEnable(false);
                    view.hide();
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
                view.api.setCountDownTime(view._countDownTime);
                view._cdTimeDesc.text = LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType);
                view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
            }
        }
    };
    AcCrossServerPowerView.prototype.enterInHandler = function () {
        var view = this;
        if (view._cdType > 1 && view._cdType < 4) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERCROSSENTERVIEW, {
                aid: this.aid,
                code: this.code
            });
            this.hide();
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime0"));
        }
    };
    AcCrossServerPowerView.prototype.dispose = function () {
        var view = this;
        view._canJoinImg = null;
        view._cdTimeDesc = null;
        view._enterBtn.removeTouchTap();
        view._enterBtn = null;
        this.servantContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerView;
}(AcCommonView));
__reflect(AcCrossServerPowerView.prototype, "AcCrossServerPowerView");
