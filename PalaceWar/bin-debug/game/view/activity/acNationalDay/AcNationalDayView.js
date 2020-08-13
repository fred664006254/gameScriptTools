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
 * 国庆节活动
 * author yangchengguo
 * date 2019.9.9
 * @class AcNationalDayView
 */
var AcNationalDayView = (function (_super) {
    __extends(AcNationalDayView, _super);
    function AcNationalDayView() {
        var _this = _super.call(this) || this;
        _this._roleIcon = null;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._buildingNum = 8;
        _this._buildingArr = [];
        _this._nationalStoreBtn = null;
        _this._tokenNum = null;
        _this._currSkinIndex = 0;
        //建筑标签位置
        _this._buildNamePos = [
            { x: 476, y: 678 },
            { x: 64, y: 678 },
            { x: 442, y: 529 },
            { x: 102, y: 527 },
            { x: 392, y: 430 },
            { x: 130, y: 415 },
            { x: 256, y: 238 },
            { x: 484, y: 290 },
        ];
        //建筑位置
        _this._buildPos = [
            { x: 478, y: 691 },
            { x: 0, y: 705 },
            { x: 398, y: 546 },
            { x: 0, y: 530 },
            { x: 377, y: 451 },
            { x: 49, y: 440 },
            { x: 164, y: 241 },
            { x: 478, y: 303 },
        ];
        //建筑特效位置
        _this._buildEffectPos = [
            { x: 410, y: 615 },
            { x: -36, y: 611 },
            { x: 412, y: 467 },
            { x: 60, y: 468 },
            { x: 358, y: 381 },
            { x: 91, y: 374 },
            { x: 187, y: 158 },
            { x: 467, y: 266 },
        ];
        //建筑点亮特效位置 二态
        _this._buildLightPos = [
            { x: 428, y: 688 },
            { x: 0, y: 688 },
            { x: 342, y: 545 },
            { x: 0, y: 530 },
            { x: 347, y: 451 },
            { x: 44, y: 440 },
            { x: 137, y: 241 },
            { x: 453, y: 303 }
        ];
        return _this;
    }
    AcNationalDayView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW, this.changeSkin, this);
        var bgName = this.getBgName();
        if (bgName) {
            var bg = BaseBitmap.create(bgName);
            this.addChildToContainer(bg);
        }
        //宫殿
        this.initBuilding();
        //活动介绍背景
        var acDescBgStr = ResourceManager.hasRes("acnationalday_infobg-" + this.getTypeCode()) ? "acnationalday_infobg-" + this.getTypeCode() : "acnationalday_infobg-1";
        var acDescBg = BaseBitmap.create(acDescBgStr);
        acDescBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - acDescBg.width / 2, this.titleBg.y + this.titleBg.height - 9);
        this.addChildToContainer(acDescBg);
        //衣装icon
        var roleIconId = this.cfg.show2[this._currSkinIndex];
        var roleIconStr = ResourceManager.hasRes("acnationalday_clothes_icon-" + this.getTypeCode() + "_" + roleIconId) ? "acnationalday_clothes_icon-" + this.getTypeCode() + "_" + roleIconId : "acnationalday_clothes_icon-1_" + roleIconId;
        var roleIcon = BaseLoadBitmap.create(roleIconStr);
        roleIcon.width = 222;
        roleIcon.height = 141;
        roleIcon.setScale(1);
        roleIcon.setPosition(acDescBg.x - 3, acDescBg.y + acDescBg.height - roleIcon.height * roleIcon.scaleY - 5);
        this.addChildToContainer(roleIcon);
        this._roleIcon = roleIcon;
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(0, acDescBg.y + acDescBg.height - skinTxtEffectBM.height / 2 - 30);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        skinTxtEffect.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYCLOTHERVIEW, { aid: _this.aid, code: _this.code, index: _this._currSkinIndex });
        }, this);
        var skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(skinTxtEffect.x + 100, acDescBg.y + acDescBg.height - 30);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //活动时间
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTime.setPosition(200, acDescBg.y + 10);
        this.addChildToContainer(acTime);
        //活动介绍
        var acDescStr = LanguageManager.getlocal("acNationalDayInfo-" + this.getTypeCode(), [String(1 / this.cfg.ratio)]);
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acDesc.setPosition(acTime.x, acTime.y + acTime.height + 6);
        acDesc.width = 430;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);
        //活动倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = acDescBg.y + acDescBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        //国库
        // let nationalStoreBtn = ComponentManager.getButton("acnationalday_national_name_bg", "acNationalDayNationStore-"+this.getTypeCode(), ()=>{
        //打开充值面板
        // ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYTRECHARGEVIEW, { aid: this.aid, code: this.code});
        // }, this);
        // nationalStoreBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        // nationalStoreBtn.setPosition(26, 292);
        // this.addChildToContainer(nationalStoreBtn);
        // this._nationalStoreBtn = nationalStoreBtn;
        //物品数量
        var numBg = BaseBitmap.create("battlepassfntbg-1");
        numBg.setPosition(this._buildPos[this._buildingNum - 1].x + 40, this._buildPos[this._buildingNum - 1].y + 100);
        this.addChildToContainer(numBg);
        //icon
        var numIconStr = ResourceManager.hasRes("acnationalday_rewarditem_small_icon-" + this.getTypeCode()) ? "acnationalday_rewarditem_small_icon-" + this.getTypeCode() : "acnationalday_rewarditem_small_icon-1";
        var numIcon = BaseBitmap.create(numIconStr);
        numIcon.setPosition(numBg.x - 10, numBg.y + numBg.height / 2 - numIcon.height / 2);
        this.addChildToContainer(numIcon);
        //物品数量
        var tokenNum = ComponentManager.getTextField(String(this.vo.getChargeNum()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tokenNum.setPosition(numBg.x + 30, numBg.y + numBg.height / 2 - tokenNum.height / 2 + 2);
        this.addChildToContainer(tokenNum);
        this._tokenNum = tokenNum;
        this.refreshView();
        //首次进入打开衣装面板
        if (this.vo.isFirstInView()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYCLOTHERVIEW, { aid: this.aid, code: this.code });
        }
    };
    //初始化宫殿
    AcNationalDayView.prototype.initBuilding = function () {
        for (var i = 0; i < this._buildingNum; i++) {
            var alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.setPosition(this._buildPos[i].x, this._buildPos[i].y);
            this.addChildToContainer(alphaBg);
            var buildImg = ResourceManager.hasRes("acnationalday_building-" + this.getTypeCode() + "_" + (i + 1)) ? "acnationalday_building-" + this.getTypeCode() + "_" + (i + 1) : "acnationalday_building-1_" + (i + 1);
            var building = BaseBitmap.create(buildImg);
            building.setPosition(this._buildPos[i].x, this._buildPos[i].y);
            this.addChildToContainer(building);
            building.visible = false;
            //二态
            var lightRes = ResourceManager.hasRes("acnationalday_building-" + this.getTypeCode() + "_" + (i + 1) + "_effect") ? "acnationalday_building-" + this.getTypeCode() + "_" + (i + 1) + "_effect" : "acnationalday_building-1_" + (i + 1) + "_effect";
            var buildLight = ComponentManager.getCustomMovieClip(lightRes, 5, 70);
            buildLight.setPosition(this._buildLightPos[i].x, this._buildLightPos[i].y);
            this.addChildToContainer(buildLight);
            buildLight.playWithTime(0);
            buildLight.visible = true;
            alphaBg.width = building.width;
            alphaBg.height = building.height;
            alphaBg.addTouchTap(this.buildingClick, this, [{ index: i + 1 }]);
            var buildEffect = ComponentManager.getCustomMovieClip("acnationalday_fire_effect", 10, 50);
            buildEffect.setPosition(this._buildEffectPos[i].x, this._buildEffectPos[i].y);
            this.addChildToContainer(buildEffect);
            buildEffect.playWithTime(0);
            if (i == 0 || i == 1 || i == 6) {
                buildEffect.setScale(1.5);
            }
            buildEffect.visible = false;
            var buildings = { building: building, nameContainer: null, effect: buildEffect, buildLight: buildLight };
            this._buildingArr[i] = buildings;
        }
        for (var i = 0; i < this._buildingNum; i++) {
            var nameContainer = new BaseDisplayObjectContainer();
            nameContainer.setPosition(this._buildNamePos[i].x, this._buildNamePos[i].y);
            this.addChildToContainer(nameContainer);
            var nameBgStr = "ac_sweetgift_palace_name_bg-1_1";
            if (i == 6) {
                nameBgStr = "acsearchproofview_common_yellow";
            }
            else if (i == 7) {
                nameBgStr = "acnationalday_national_name_bg";
            }
            var nameBg = BaseBitmap.create(nameBgStr);
            nameContainer.addChild(nameBg);
            var name_1 = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDaybuildName-" + this.getTypeCode() + "_" + (i + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
            if (i != 7) {
                nameBg.width = name_1.width + 30;
            }
            else {
                name_1.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            name_1.setPosition(nameBg.x + nameBg.width / 2 - name_1.width / 2, nameBg.y + nameBg.height / 2 - name_1.height / 2 + 1);
            nameContainer.addChild(nameBg);
            nameContainer.addChild(name_1);
            nameContainer.addTouchTap(this.buildingClick, this, [{ index: i + 1 }]);
            this._buildingArr[i].nameContainer = nameContainer;
        }
    };
    //点击建筑
    AcNationalDayView.prototype.buildingClick = function (target, data) {
        App.LogUtil.log("buildingClick: " + data.index);
        //8 国库
        if (data.index == 8) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYTRECHARGEVIEW, { aid: this.aid, code: this.code });
        }
        else {
            //打开每日任务
            ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYTASKVIEW, { aid: this.aid, code: this.code, showDay: data.index });
        }
    };
    //刷新建筑状态
    AcNationalDayView.prototype.refreshBuilding = function () {
        var day = this.vo.getDay();
        for (var i = 0; i < this._buildingArr.length - 1; i++) {
            //判断红点
            var buildingData = this._buildingArr[i];
            if (this.vo.isCanGetTaskRewardByDay(i + 1)) {
                App.CommonUtil.addIconToBDOC(buildingData.nameContainer);
            }
            else {
                if (i + 1 == day && this.vo.isShowDailyChargeRedDot()) {
                    App.CommonUtil.addIconToBDOC(buildingData.nameContainer);
                }
                else {
                    if (this.vo.isCanGetSevenReward() && !this.vo.isGetSevenReward()) {
                        App.CommonUtil.addIconToBDOC(buildingData.nameContainer);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(buildingData.nameContainer);
                    }
                }
            }
            //刷新建筑状态
            if (day == (i + 1)) {
                buildingData.effect.visible = true;
                buildingData.buildLight.visible = true;
                buildingData.building.visible = false;
            }
            else {
                buildingData.effect.visible = false;
                buildingData.buildLight.visible = false;
                buildingData.building.visible = true;
            }
        }
        var nationalStore = this._buildingArr[this._buildingArr.length - 1];
        if (this.vo.isShowChargeRewardRedDot()) {
            App.CommonUtil.addIconToBDOC(nationalStore.nameContainer);
            nationalStore.effect.visible = true;
            nationalStore.buildLight.visible = true;
            nationalStore.building.visible = false;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(nationalStore.nameContainer);
            nationalStore.effect.visible = false;
            nationalStore.buildLight.visible = false;
            nationalStore.building.visible = true;
        }
    };
    //刷新页面
    AcNationalDayView.prototype.refreshView = function () {
        //国库红点
        // if (this.vo.isShowChargeRewardRedDot()){
        //     App.CommonUtil.addIconToBDOC(this._nationalStoreBtn);
        // }
        // else{
        //     App.CommonUtil.removeIconFromBDOC(this._nationalStoreBtn);
        // }
        //物品数量
        this._tokenNum.text = String(this.vo.getChargeNum());
        //刷新建筑
        this.refreshBuilding();
    };
    AcNationalDayView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acNationalDayTimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    //皮肤icon 切换
    AcNationalDayView.prototype.changeSkin = function (evt) {
        var skinData = this.cfg.show2;
        this._currSkinIndex += 1;
        if (this._currSkinIndex == skinData.length) {
            this._currSkinIndex = 0;
        }
        var roleIconId = skinData[this._currSkinIndex];
        var roleIconStr = ResourceManager.hasRes("acnationalday_clothes_icon-" + this.getTypeCode() + "_" + roleIconId) ? "acnationalday_clothes_icon-" + this.getTypeCode() + "_" + roleIconId : "acnationalday_clothes_icon-1_" + roleIconId;
        this._roleIcon.setload(roleIconStr);
        if (evt && evt.data && evt.data.isFreshDot) {
            this.refreshBuilding();
        }
    };
    Object.defineProperty(AcNationalDayView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNationalDayView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //code 类型
    AcNationalDayView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    //背景图
    AcNationalDayView.prototype.getBgName = function () {
        return ResourceManager.hasRes("acnationalday_bg-" + this.getTypeCode()) ? "acnationalday_bg-" + this.getTypeCode() : "acnationalday_bg-1";
    };
    //标题背景
    AcNationalDayView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acnationalday_titlebg-" + this.getTypeCode()) ? "acnationalday_titlebg-" + this.getTypeCode() : "acnationalday_titlebg-1";
    };
    //标题
    AcNationalDayView.prototype.getTitleStr = function () {
        return null;
    };
    //规则
    AcNationalDayView.prototype.getRuleInfo = function () {
        return "acNationalDayRuleInfo-" + this.getTypeCode();
    };
    AcNationalDayView.prototype.getRuleInfoParam = function () {
        return [
            String(1 / this.cfg.ratio)
        ];
    };
    AcNationalDayView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    //资源
    AcNationalDayView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acnationalday_titlebg-1", "acnationalday_infobg-1", "acnationalday_bg-1",
                "acnationalday_rewarditem_small_icon-1", "acnationalday_building-1_1", "acnationalday_building-1_2", "acnationalday_building-1_3", "acnationalday_building-1_4", "acnationalday_building-1_5", "acnationalday_building-1_6", "acnationalday_building-1_7", "acnationalday_building-1_8"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acwealthcarpview_skineffect1", "acnationalday_common_rewardtxt", "ac_sweetgift_palace_name_bg-1_1", "acsearchproofview_common_yellow",
            "acnationalday_national_name_bg", "battlepassfntbg-1",
            "acnationalday_titlebg-" + this.getTypeCode(),
            "acnationalday_infobg-" + this.getTypeCode(),
            "acnationalday_rewarditem_small_icon-" + this.getTypeCode(),
            "acnationalday_bg-" + this.getTypeCode(),
            "acnationalday_building-" + this.getTypeCode() + "_1",
            "acnationalday_building-" + this.getTypeCode() + "_2",
            "acnationalday_building-" + this.getTypeCode() + "_3",
            "acnationalday_building-" + this.getTypeCode() + "_4",
            "acnationalday_building-" + this.getTypeCode() + "_5",
            "acnationalday_building-" + this.getTypeCode() + "_6",
            "acnationalday_building-" + this.getTypeCode() + "_7",
            "acnationalday_building-" + this.getTypeCode() + "_8",
        ]).concat(list);
    };
    AcNationalDayView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW, this.changeSkin, this);
        this._roleIcon = null;
        this._timeBg = null;
        this._acTimeTf = null;
        this._buildingArr = [];
        this._nationalStoreBtn = null;
        this._tokenNum = null;
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayView;
}(AcCommonView));
__reflect(AcNationalDayView.prototype, "AcNationalDayView");
//# sourceMappingURL=AcNationalDayView.js.map