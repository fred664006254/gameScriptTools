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
/*
author : qianjun
desc : 七夕活动
*/
var AcDoubleSeventhView = (function (_super) {
    __extends(AcDoubleSeventhView, _super);
    function AcDoubleSeventhView() {
        var _this = _super.call(this) || this;
        _this._lqbtn = null;
        _this._lqjindu = 1;
        _this._acchargetipTxt = null;
        _this._build1 = null;
        _this._build1name = null;
        _this._build2 = null;
        _this._build2name = null;
        _this._build3 = null;
        _this._build3name = null;
        _this._build4 = null;
        _this._build4name = null;
        _this._build5 = null;
        _this._build5name = null;
        _this._build6 = null;
        _this._build6name = null;
        _this._build7 = null;
        _this._build7name = null;
        _this._build8 = null;
        _this._build8name = null;
        _this._dliangfont = null;
        _this._moveCountainer = null;
        _this.scrollView = null;
        _this._lampClip = null;
        _this._gquan = null;
        _this._buildCountainer = null;
        _this._nameCountainer = null;
        _this._build1pic = null;
        _this._build2pic = null;
        _this._build3pic = null;
        _this._build4pic = null;
        _this._build5pic = null;
        _this._build6pic = null;
        _this._build7pic = null;
        _this._build8pic = null;
        _this._tipBg = null;
        _this._posArr = null;
        _this._buildRectMap = null;
        _this._isShowLihua = false;
        _this._isShowRiverLight = false;
        _this._isShowLight = false;
        _this._riverLight = null;
        _this._lihuaPool = { "hong": [], "huang": [], "lan": [] };
        _this._lihuaParam = ["hong", "huang", "lan"];
        _this._lightPool = { "acsevenlight1": [], "acsevenlight2": [], "acsevenlight3": [] };
        _this._rewards = '';
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcDoubleSeventhView.AID, AcDoubleSeventhView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhView.prototype, "acTivityId", {
        get: function () {
            return AcDoubleSeventhView.AID + "-" + AcDoubleSeventhView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhView.prototype.getTitleBgName = function () {
        return "acseventopbg0" + this.code;
    };
    AcDoubleSeventhView.prototype.getTitleStr = function () {
        return null;
    };
    AcDoubleSeventhView.prototype.isShowOpenAni = function () {
        return false;
    };
    // 背景图名称
    AcDoubleSeventhView.prototype.getBgName = function () {
        return 'acsevenbg' + this.code;
    };
    AcDoubleSeventhView.prototype.initBg = function () {
        var bigBg = BaseBitmap.create("public_9v_bg01");
        bigBg.width = GameConfig.stageWidth;
        bigBg.height = GameConfig.stageHeigth;
        bigBg.touchEnabled = true;
        this.addChild(bigBg);
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
            this.viewBg.y = 0;
        }
    };
    AcDoubleSeventhView.prototype.initView = function () {
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_DOUBLESEVENTH});
        this._moveCountainer = new BaseDisplayObjectContainer();
        if (this.code == "3") {
            this._moveCountainer.addChild(this.viewBg);
            // this._moveCountainer.y = 72;
            this._moveCountainer.width = 640;
            this._moveCountainer.height = 1369;
            this._buildCountainer = new BaseDisplayObjectContainer();
            this._buildCountainer.width = this._moveCountainer.width;
            this._buildCountainer.height = this._moveCountainer.height;
            this._moveCountainer.addChild(this._buildCountainer);
            this._nameCountainer = new BaseDisplayObjectContainer();
            this._nameCountainer.width = this._moveCountainer.width;
            this._nameCountainer.height = this._moveCountainer.height;
            this._moveCountainer.addChild(this._nameCountainer);
        }
        else {
            this.addChild(this._moveCountainer);
            this._moveCountainer.addChild(this.viewBg);
        }
        var view = this;
        AcDoubleSeventhView.AID = view.aid;
        AcDoubleSeventhView.CODE = view.code;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD), view.getrewardCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH, this.fresh_jindu, this);
        var buttonBg = BaseBitmap.create("acseventopbg02_" + this.code);
        buttonBg.y = GameConfig.stageHeigth - buttonBg.height; ///2-90;
        this.addChild(buttonBg);
        var titleFont = BaseLoadBitmap.create('acsevenfont' + this.code);
        // titleFont.setPosition(230,10);
        // if(PlatformManager.checkIsViSp()){
        //     titleFont.setPosition(230 - (248 - 182) / 2,10);
        // } else {
        //     titleFont.setPosition(230,10);
        // }
        titleFont.width = 188;
        titleFont.height = 45;
        titleFont.x = 320 - titleFont.width / 2;
        titleFont.y = 10;
        this.addChild(titleFont);
        var top = BaseLoadBitmap.create('acseventopbg' + this.code);
        top.width = 640;
        top.height = 153;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, top, view.titleBg, [0, view.titleBg.height - 8]);
        view.addChild(top);
        //活动时间
        var ac_timeTF = null;
        if (this.code == "3") {
            ac_timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTime3", [view.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        else {
            ac_timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTime", [view.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        ac_timeTF.textAlign = egret.HorizontalAlign.LEFT;
        ac_timeTF.width = 430;
        if (this.code == "3") {
            view.setLayoutPosition(LayoutConst.lefttop, ac_timeTF, top, [30, 17]);
        }
        else {
            view.setLayoutPosition(LayoutConst.lefttop, ac_timeTF, top, [10, 13]);
        }
        view.addChild(ac_timeTF);
        //活动规则文本
        var acruleTxt = null;
        if (this.code == "3") {
            acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhRule3"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        else {
            acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhRule"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        acruleTxt.width = 430;
        acruleTxt.textAlign = egret.HorizontalAlign.LEFT;
        acruleTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.lefttop, acruleTxt, ac_timeTF, [0, ac_timeTF.textHeight + 10]);
        view.addChild(acruleTxt);
        var acruleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhRuleDesc" + this.code), 18);
        acruleTxt2.textAlign = egret.HorizontalAlign.LEFT;
        acruleTxt2.lineSpacing = 5;
        acruleTxt2.width = 350;
        acruleTxt2.x = acruleTxt.x + acruleTxt.textWidth;
        acruleTxt2.y = acruleTxt.y;
        view.addChild(acruleTxt2);
        var actipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        actipTxt.setPosition(120, acruleTxt2.y + acruleTxt2.textHeight + 10);
        if (PlatformManager.checkIsViSp()) {
            actipTxt.x = 160;
            actipTxt.y = acruleTxt2.y + acruleTxt2.height - actipTxt.height;
        }
        view.addChild(actipTxt);
        //建筑
        var pos_arr = {
            1: { buildId: 1, buildPos: [46, 277], namePos: [25, 434] },
            2: { buildId: 2, buildPos: [255, 342], namePos: [22, 657] },
            3: { buildId: 3, buildPos: [490, 372], namePos: [298, 717] },
            4: { buildId: 4, buildPos: [378, 649], namePos: [460, 771] },
            5: { buildId: 5, buildPos: [170, 670], namePos: [596, 532] },
            6: { buildId: 6, buildPos: [66, 973], namePos: [358, 532] },
            7: { buildId: 7, buildPos: [284, 1005], namePos: [198, 532] },
            8: { buildId: 8, buildPos: [490, 1089], namePos: [490, 460] },
        };
        if (this.code == "3") {
            if (PlatformManager.checkIsViSp()) {
                pos_arr = {
                    1: { buildId: 1, buildPos: [0, 755], namePos: [144, 975] },
                    2: { buildId: 2, buildPos: [0, 487], namePos: [252, 764] },
                    3: { buildId: 3, buildPos: [203, 464], namePos: [556, 694] },
                    4: { buildId: 4, buildPos: [0, 0], namePos: [306, 502] },
                    5: { buildId: 5, buildPos: [437, 185], namePos: [415, 387] },
                    6: { buildId: 6, buildPos: [232, 157], namePos: [555, 135] },
                    7: { buildId: 7, buildPos: [0, 368], namePos: [199, 318] },
                    8: { buildId: 8, buildPos: [59, 229 + 153], namePos: [59, 229] },
                };
            }
            else {
                pos_arr = {
                    1: { buildId: 1, buildPos: [0, 755], namePos: [144, 975] },
                    2: { buildId: 2, buildPos: [0, 487], namePos: [252, 764] },
                    3: { buildId: 3, buildPos: [203, 464], namePos: [556, 694] },
                    4: { buildId: 4, buildPos: [0, 0], namePos: [306, 502] },
                    5: { buildId: 5, buildPos: [437, 185], namePos: [415, 387] },
                    6: { buildId: 6, buildPos: [232, 157], namePos: [573, 241] },
                    7: { buildId: 7, buildPos: [0, 368], namePos: [199, 333] },
                    8: { buildId: 8, buildPos: [59, 229 + 153], namePos: [59, 229] },
                };
            }
            this._posArr = pos_arr;
            if (this._buildRectMap == null) {
                this._buildRectMap = {
                    build1: { width: 640, height: 614, x: 0, y: 755 },
                    build2: { width: 536, height: 603, x: 0, y: 487, isAnim2: true },
                    build3: { width: 418, height: 557, x: 222, y: 464 },
                    build4: { width: 335, height: 129, x: 305, y: 506 },
                    build5: { width: 203, height: 394, x: 437, y: 185 },
                    build6: { width: 412, height: 366, x: 228, y: 275, isAnim6: true },
                    build7: { width: 399, height: 186, x: 0, y: 368 },
                    build8: { width: 0, height: 0, x: 0, y: 0, isAnim8: true },
                };
            }
        }
        var moveX = 0;
        var moveY = 50;
        if (this.code == "2") {
            moveX = 46;
            for (var i in pos_arr) {
                var unit = pos_arr[i];
                var buildPic = BaseBitmap.create("acsevenbuild_hui" + this.code);
                buildPic.x = unit.buildPos[0] - moveX;
                buildPic.y = unit.buildPos[1] + Math.floor(view.viewBg.y) + moveY;
                this._moveCountainer.addChild(buildPic);
                view["_build" + unit.buildId] = buildPic;
                var nameTxt = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3f0406);
                // let num =i+1;
                nameTxt.text = LanguageManager.getlocal("architectureName" + i);
                // nameTxt.width = 115;
                this._moveCountainer.addChild(nameTxt);
                this.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, buildPic, [0, 25]);
            }
        }
        else if (this.code == "3") {
            for (var i in pos_arr) {
                var unit = pos_arr[i];
                var buildName = BaseBitmap.create("acsevenbuild_hui" + this.code);
                buildName.x = unit.namePos[0];
                buildName.y = unit.namePos[1] - 70;
                view["_build" + unit.buildId] = buildName;
                this._nameCountainer.addChild(buildName);
                if (PlatformManager.checkIsViSp()) {
                    buildName.rotation = -90;
                    buildName.x = unit.namePos[0] - buildName.width;
                    buildName.y = unit.namePos[1] - 70 + buildName.height;
                }
                var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                if (PlatformManager.checkIsViSp()) {
                    nameTxt.size = 18;
                    nameTxt.text = LanguageManager.getlocal("acDoubleSeventhBuildNameVi-" + i + "_" + this.code);
                    nameTxt.x = buildName.x + 45;
                    nameTxt.y = buildName.y - buildName.width / 2 - nameTxt.height / 2;
                }
                else {
                    nameTxt.width = 19;
                    nameTxt.text = LanguageManager.getlocal("acDoubleSeventhBuildName-" + i + "_" + this.code);
                    nameTxt.x = buildName.x + buildName.width / 2 - nameTxt.width / 2;
                    nameTxt.y = buildName.y + buildName.height / 2 - nameTxt.height / 2 + 8;
                }
                // nameTxt.text = LanguageManager.getlocal("acDoubleSeventhBuildName-"+i+"_"+this.code);
                // nameTxt.x = buildName.x + buildName.width / 2 - nameTxt.width/2;
                // nameTxt.y = buildName.y + buildName.height / 2 - nameTxt.height/2 + 8;
                this._nameCountainer.addChild(nameTxt);
            }
        }
        else {
            for (var i in pos_arr) {
                var unit = pos_arr[i];
                var buildPic = BaseBitmap.create("acsevenbuild_hui" + this.code);
                buildPic.x = unit.buildPos[0] - moveX;
                buildPic.y = unit.buildPos[1] + Math.floor(view.viewBg.y);
                this._moveCountainer.addChild(buildPic);
                view["_build" + unit.buildId] = buildPic;
                var namePic = BaseBitmap.create("acsevenbuild" + unit.buildId);
                // namePic.width =31;
                // namePic.height =67;
                // namePic.x = buildPic.x+34;
                // namePic.y = buildPic.y+90;
                namePic.x = buildPic.x + buildPic.width / 2 - namePic.width / 2;
                namePic.y = buildPic.y + 110 - namePic.height / 2;
                App.DisplayUtil.changeToGray(namePic);
                this._moveCountainer.addChild(namePic);
                view["_build" + unit.buildId + "name"] = namePic;
            }
        }
        //当前进度与显示
        var lqBtn = ComponentManager.getButton('acsevenlampgray' + this.code, '', view.lqBtnClick, view);
        view._lqbtn = lqBtn;
        if (this.code == "2") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, buttonBg, [-11, 12]);
            view.addChild(lqBtn);
        }
        else if (this.code == "3") {
            /*
            let water = BaseBitmap.create("acsevenlampbottom3");
            water.x = GameConfig.stageWidth / 2 - water.width/2;
            water.y = GameConfig.stageHeigth - water.height-20;
            this.addChild(water);
            */
            lqBtn.x = GameConfig.stageWidth / 2 - lqBtn.width / 2;
            lqBtn.y = GameConfig.stageHeigth - lqBtn.height - 30;
            view.addChild(lqBtn);
            this._tipBg = BaseBitmap.create("acsevenbuild_descbg3");
            this._tipBg.width = 400;
            view.addChild(this._tipBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._tipBg, view, [0, 0]);
        }
        else {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, buttonBg, [-31, 27]);
            view.addChild(lqBtn);
        }
        // let font = BaseBitmap.create('acsevendliang');
        // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, font, lqBtn, [5,-10]);
        // view.addChild(font);
        // font.visible = false;
        // view._dliangfont = font;
        var acchargetipTxt = null;
        if (this.code == "3") {
            acchargetipTxt = ComponentManager.getTextField('', 18);
        }
        else {
            acchargetipTxt = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_SMALL);
        }
        view._acchargetipTxt = acchargetipTxt;
        view.addChild(acchargetipTxt);
        view.swapChildren(view.closeBtn, top); //view.closeBtn
        var visitBg = BaseBitmap.create("mainui_bottombtnbg");
        view.setLayoutPosition(LayoutConst.leftbottom, visitBg, view, [20, 30]);
        this.addChild(visitBg);
        //查看奖励
        var ckjliBtn = ComponentManager.getButton('punish_reward_icon', '', view.ckjlCall, view);
        view.setLayoutPosition(LayoutConst.leftbottom, ckjliBtn, view, [20, 30]);
        view.addChild(ckjliBtn);
        var ckjllFont = BaseBitmap.create('acsevenckjl');
        view.setLayoutPosition(LayoutConst.leftbottom, ckjllFont, view, [6, 30]);
        view.addChild(ckjllFont);
        var visitBg2 = BaseBitmap.create("mainui_bottombtnbg");
        view.setLayoutPosition(LayoutConst.rightbottom, visitBg2, view, [20, 30]);
        this.addChild(visitBg2);
        // 充值
        var czhiBtn = ComponentManager.getButton('ac_luckbag-1_icon', '', view.czhiCall, view);
        view.setLayoutPosition(LayoutConst.rightbottom, czhiBtn, view, [20, 30]);
        view.addChild(czhiBtn);
        var czFont = BaseBitmap.create("acsevenczhi");
        view.setLayoutPosition(LayoutConst.rightbottom, czFont, view, [20, 30]);
        view.addChild(czFont);
        var scrollRect1 = null;
        if (this.code == "3") {
            scrollRect1 = new egret.Rectangle(0, 72, 640, GameConfig.stageHeigth - 72);
        }
        else {
            scrollRect1 = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth);
        }
        this.scrollView = ComponentManager.getScrollView(this._moveCountainer, scrollRect1);
        this.scrollView.bounces = false;
        this.addChild(this.scrollView);
        this.setChildIndex(this.scrollView, 2);
        var gquan = BaseBitmap.create('doublesevengquan');
        gquan.anchorOffsetX = gquan.width / 2;
        gquan.anchorOffsetY = gquan.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, gquan, view._lqbtn, [gquan.width / 2 + 1 + 25, gquan.height / 2 - 40]);
        gquan.visible = false;
        view._gquan = gquan;
        view.addChild(gquan);
        view.swapChildren(gquan, view._lqbtn);
        if (this.code == "2") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, gquan, view._lqbtn, [gquan.width / 2 + 1, gquan.height / 2 - 40]);
        }
        var font = BaseBitmap.create('acsevendliang' + this.code);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, font, view, [5, 0]);
        view.addChild(font);
        font.visible = false;
        view._dliangfont = font;
        var lampName = "dbsevenloop";
        var animNum = 10;
        var animScale = 1.5;
        var animWidth = 178;
        var animHeight = 177;
        if (this.code == "2") {
            lampName = "hats0";
            //    view.setLayoutPosition(LayoutConst.horizontalCenterbottom, font, view, [-15,0]);
        }
        else if (this.code == "3") {
            lampName = "luoshuiloop";
            animNum = 8;
            animScale = 1;
            animWidth = 400;
            animHeight = 350;
        }
        var lamp = ComponentManager.getCustomMovieClip(lampName, animNum, 83);
        lamp.blendMode = egret.BlendMode.ADD;
        lamp.width = animWidth;
        lamp.height = animHeight;
        lamp.setScale(animScale);
        view.addChild(lamp);
        lamp.playWithTime(-1);
        view._lampClip = lamp;
        lamp.visible = false;
        view.fresh_jindu();
        this.initJindu();
        if (this.code == "1") {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [30, -65]); //-30
        }
        else if (this.code == "2") {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [0, -65]);
        }
        else if (this.code == "3") {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [10, -105]);
        }
    };
    AcDoubleSeventhView.prototype.showDialog = function (buildId) {
        var view = this;
        if (view.vo.getAvgConfig(buildId, this.code)) {
            ViewController.getInstance().openView(ViewConst.BASE.ACDOUBLESEVENTHAVGVIEW, {
                f: view.avgendCallback,
                o: view,
                idx: 1,
                buidId: buildId,
                aid: this.aid,
                code: this.code
            });
        }
    };
    AcDoubleSeventhView.prototype.avgendCallback = function () {
        var view = this;
        var rewardList = GameData.formatRewardItem(view._rewards);
        var pos = new egret.Point(view._lqbtn.x + (view._lqbtn.width / 2) + 23, view._lqbtn.y + (view._lqbtn.height / 2));
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.refreshJinduAnim();
    };
    AcDoubleSeventhView.prototype.refreshJinduAnim = function () {
        if (this.code == "3") {
            var view = this;
            var curJindu = view.vo.getCurJindu();
            var chargeNum = view.vo.getChargeNum();
            for (var i = 1; i <= curJindu; ++i) {
                view._lqjindu = i;
                if (chargeNum >= view.cfg.recharge[i].needGem && view.vo.isGetRecharge(i)) {
                    if (this["_build" + i + "pic"] == null) {
                        if (ResourceManager.hasRes("acsevenbuild" + i + "_3")) {
                            this["_build" + i + "pic"] = BaseLoadBitmap.create("acsevenbuild" + i + "_3");
                            this["_build" + i + "pic"].width = this._buildRectMap["build" + i].width;
                            this["_build" + i + "pic"].height = this._buildRectMap["build" + i].height;
                            this["_build" + i + "pic"].x = this._buildRectMap["build" + i].x;
                            this["_build" + i + "pic"].y = this._buildRectMap["build" + i].y;
                            this["_build" + i + "pic"].alpha = 0;
                            this._buildCountainer.addChild(this["_build" + i + "pic"]);
                            egret.Tween.get(this["_build" + i + "pic"]).to({ alpha: 1 }, 1000);
                        }
                    }
                    if (i == 6) {
                        this.showLihua();
                    }
                    else if (i == 8) {
                        this.showLight();
                    }
                }
                if (chargeNum >= view.cfg.recharge[i].needGem && !view.vo.isGetRecharge(i)) {
                    break;
                }
            }
            if (view._lqjindu == 3) {
                this.showRiverLight();
            }
        }
    };
    AcDoubleSeventhView.prototype.initJindu = function () {
        if (this.code == "3") {
            var curJindu = this.vo.getCurJindu();
            var chargeNum = this.vo.getChargeNum();
            for (var i = 1; i <= curJindu; ++i) {
                this._lqjindu = i;
                if (chargeNum >= this.cfg.recharge[i].needGem && this.vo.isGetRecharge(i)) {
                    if (this.code == "3") {
                        // this._buildRectMap
                        if (this["_build" + i + "pic"] == null) {
                            if (ResourceManager.hasRes("acsevenbuild" + i + "_3")) {
                                this["_build" + i + "pic"] = BaseLoadBitmap.create("acsevenbuild" + i + "_3");
                                this["_build" + i + "pic"].width = this._buildRectMap["build" + i].width;
                                this["_build" + i + "pic"].height = this._buildRectMap["build" + i].height;
                                this["_build" + i + "pic"].x = this._buildRectMap["build" + i].x;
                                this["_build" + i + "pic"].y = this._buildRectMap["build" + i].y;
                                this._buildCountainer.addChild(this["_build" + i + "pic"]);
                            }
                        }
                        if (i == 6) {
                            this.showLihua();
                        }
                        else if (i == 8) {
                            this.showLight();
                        }
                    }
                }
                if (chargeNum >= this.cfg.recharge[i].needGem && !this.vo.isGetRecharge(i)) {
                    break;
                }
            }
        }
    };
    AcDoubleSeventhView.prototype.fresh_jindu = function () {
        var view = this;
        var curJindu = view.vo.getCurJindu();
        var chargeNum = view.vo.getChargeNum();
        for (var i = 1; i <= curJindu; ++i) {
            view._lqjindu = i;
            if (view["_build" + i]) {
                egret.Tween.removeTweens(view["_build" + i]);
            }
            if (chargeNum >= view.cfg.recharge[i].needGem && view.vo.isGetRecharge(i)) {
                view["_build" + i].texture = ResourceManager.getRes("acsevenbuild_dl" + this.code);
                view["_build" + i].alpha = 1;
                if (this.code == "1") {
                    App.DisplayUtil.changeToNormal(view["_build" + i + "name"]);
                }
                else if (this.code == "3") {
                    if (PlatformManager.checkIsViSp()) {
                    }
                    /*
                    if(this["_build"+i+"pic"] == null){
                        if(ResourceManager.hasRes("acsevenbuild"+i+"_3")){
                            this["_build"+i+"pic"] = BaseLoadBitmap.create("acsevenbuild"+i+"_3");
                            this["_build"+i+"pic"].width = this._buildRectMap["build"+i].width;
                            this["_build"+i+"pic"].height = this._buildRectMap["build"+i].height;
                            this["_build"+i+"pic"].x = this._buildRectMap["build"+i].x;
                            this["_build"+i+"pic"].y = this._buildRectMap["build"+i].y;
                            this._buildCountainer.addChild(this["_build"+i+"pic"]);
                        }

                    }
                    if(i == 6){
                        this.showLihua();
                    } else if(i == 8){
                        this.showLight();
                    }
                    */
                }
            }
            if (chargeNum >= view.cfg.recharge[i].needGem && !view.vo.isGetRecharge(i)) {
                break;
            }
        }
        if (this.code == "3") {
            if (view._lqjindu && view._lqjindu >= 5) {
                this.scrollView.scrollTop = 0;
            }
            else {
                this.scrollView.scrollTop = this._buildCountainer.height - this.scrollView.height;
            }
            // if(view._lqjindu == 3){
            //     this.showRiverLight();
            // }
        }
        else {
            if (view._lqjindu && view._lqjindu >= 5) {
                this.scrollView.scrollTop = 400;
            }
        }
        view._lampClip.visible = view._dliangfont.visible = ((chargeNum >= view.cfg.recharge[view._lqjindu].needGem) && !view.vo.isGetRecharge(view._lqjindu));
        var descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        view._lqbtn.setBtnBitMap(chargeNum >= view.cfg.recharge[view._lqjindu].needGem ? 'acsevenlamp' + this.code : 'acsevenlampgray' + this.code);
        var nameStr = "acDoubleSeventhViewBuild";
        var moveX = 0;
        if (this.code == "2") {
            nameStr = "architectureName";
            moveX = 20;
        }
        else if (this.code == "3") {
            nameStr = "acDoubleSeventhBuildName-";
        }
        view._dliangfont.visible = ((chargeNum >= view.cfg.recharge[view._lqjindu].needGem) && !view.vo.isGetRecharge(view._lqjindu));
        if (1) {
            egret.Tween.get(view._dliangfont, { onChange: function () {
                    view._dliangfont.x = (GameConfig.stageWidth - view._dliangfont.width * view._dliangfont.scaleX) / 2 + 5 * view._dliangfont.scaleX - moveX;
                    view._dliangfont.y = GameConfig.stageHeigth - view._dliangfont.height - 10 * view._dliangfont.scaleY;
                }, onChangeObj: view, loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        }
        if (this.code == "3") {
            view._acchargetipTxt.text = LanguageManager.getlocal("acDoubleSeventhChargeTip", [descNum.toString(), LanguageManager.getlocal(nameStr + view._lqjindu + "_" + this.code)]);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._acchargetipTxt, view, [0, 6]);
            if (this._tipBg) {
                this._tipBg.visible = descNum > 0;
            }
        }
        else {
            view._acchargetipTxt.text = LanguageManager.getlocal("acDoubleSeventhChargeTip", [descNum.toString(), LanguageManager.getlocal(nameStr + view._lqjindu)]);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._acchargetipTxt, view, [0, 12]);
        }
        view._acchargetipTxt.visible = descNum > 0;
        view.setChildIndex(view._acchargetipTxt, this.numChildren - 1);
    };
    //放礼花
    AcDoubleSeventhView.prototype.showLihua = function () {
        if (this._isShowLihua) {
            return;
        }
        this.createLihua();
        this._isShowLihua = true;
    };
    AcDoubleSeventhView.prototype.createLihua = function () {
        var _this = this;
        var x = 330 + Math.floor(Math.random() * 100);
        var y = 120 + Math.floor(Math.random() * 100);
        var scale = 0.6 + Math.random() * 0.5;
        var index = Math.floor(Math.random() * 3);
        var delay = 500 + Math.floor(Math.random() * 500);
        var lihuaName = this._lihuaParam[index];
        var lihuaclip = null;
        if (this._lihuaPool[lihuaName].length > 0) {
            lihuaclip = this._lihuaPool[lihuaName].pop();
        }
        else {
            lihuaclip = ComponentManager.getCustomMovieClip("lihua_" + lihuaName + "000", 10, 150);
        }
        // lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${param[index]}000`, 10, 150);
        lihuaclip.x = x;
        lihuaclip.y = y;
        lihuaclip.setScale(scale);
        if (this._buildCountainer) {
            this._buildCountainer.addChild(lihuaclip);
            lihuaclip.playWithTime(1);
            lihuaclip.setEndCallBack(function () {
                _this._buildCountainer.removeChild(lihuaclip);
                if (_this._lihuaPool[lihuaName].length < 4) {
                    _this._lihuaPool[lihuaName].push(lihuaclip);
                }
            }, this);
            egret.setTimeout(function () {
                _this.createLihua();
            }, this, delay);
        }
    };
    //展现孔明灯
    AcDoubleSeventhView.prototype.showLight = function () {
        if (this._isShowLight) {
            return;
        }
        this.createLight();
        this._isShowLight = true;
    };
    AcDoubleSeventhView.prototype.createLight = function () {
        var _this = this;
        var baseX = 0;
        var baseWidth = 350;
        var baseY = 330;
        var baseHeight = 50;
        var baseOffY = 380;
        var baseOffYPlus = 150;
        //持续时间
        var baseTime = 15000;
        var baseTimePlus = 3000;
        //间隔时间
        var baseDelay = 2500;
        var baseDelayPlus = 500;
        var baseScale = 0.3;
        var baseScalePlus = 0.6;
        var x = baseX + Math.floor(Math.random() * baseWidth);
        var y = baseY + Math.floor(Math.random() * baseHeight);
        // let toY = y - baseOffY + Math.floor(Math.random() * baseOffYPlus);
        var toY = 100;
        var time = baseTime + Math.floor(Math.random() * baseTimePlus);
        var delay = baseDelay + Math.floor(Math.random() * baseDelayPlus);
        var scale = baseScale + Math.random() * baseScalePlus;
        var index = Math.floor(Math.random() * 3 + 1);
        var lightName = "acsevenlight" + index;
        var light = null;
        if (this._lightPool[lightName].length > 0) {
            light = this._lightPool[lightName].pop();
        }
        else {
            light = BaseBitmap.create("acsevenlight" + index);
        }
        light.setScale(scale);
        light.x = x;
        light.y = y;
        light.alpha = 0;
        if (this._buildCountainer) {
            this._buildCountainer.addChild(light);
            egret.Tween.removeTweens(light);
            egret.Tween.get(light)
                .to({ alpha: 1 }, 600)
                .wait(time - 1200)
                .to({ alpha: 0 }, 600)
                .call(function () {
                // BaseBitmap.release(light);
                if (_this._lightPool[lightName].length < 4) {
                    _this._lightPool[lightName].push(light);
                }
                _this._buildCountainer.removeChild(light);
            }, this);
            egret.Tween.get(light)
                .to({ y: toY }, time);
            egret.setTimeout(function () {
                _this.createLight();
            }, this, delay);
        }
    };
    Object.defineProperty(AcDoubleSeventhView.prototype, "factor", {
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            if (this._riverLight) {
                var p0 = { x: 245, y: 880 };
                var p1 = { x: 60, y: 681 };
                var p2 = { x: 105, y: 614 };
                var p3 = { x: 144, y: 576 };
                var p4 = { x: 25, y: 511 };
                // this._riverLight.setScale(1-value * 0.5);
                if (value <= 1) {
                    this._riverLight.x = (1 - value) * (1 - value) * p0.x + 2 * value * (1 - value) * p1.x + value * value * p2.x;
                    this._riverLight.y = (1 - value) * (1 - value) * p0.y + 2 * value * (1 - value) * p1.y + value * value * p2.y;
                }
                else {
                    value = value - 1;
                    this._riverLight.x = (1 - value) * (1 - value) * p2.x + 2 * value * (1 - value) * p3.x + value * value * p4.x;
                    this._riverLight.y = (1 - value) * (1 - value) * p2.y + 2 * value * (1 - value) * p3.y + value * value * p4.y;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    //展现河灯
    AcDoubleSeventhView.prototype.showRiverLight = function () {
        var _this = this;
        if (this._isShowRiverLight) {
            return;
        }
        this._riverLight = BaseBitmap.create("acsevenriverlight");
        this._nameCountainer.addChild(this._riverLight);
        egret.Tween.get(this).to({ factor: 2 }, 15000, egret.Ease.sineIn);
        egret.Tween.get(this._riverLight)
            .to({ scaleX: 0.2, scaleY: 0.2 }, 13000, egret.Ease.sineIn)
            .to({ alpha: 0 }, 2000)
            .call(function () {
            _this._nameCountainer.removeChild(_this._riverLight);
        }, this);
        this._isShowRiverLight = true;
    };
    AcDoubleSeventhView.prototype.showBuilding = function (buildId) {
        var view = this;
        if (view.vo.isGetRecharge(buildId)) {
            return;
        }
        if (view["_build" + buildId]) {
            egret.Tween.get(view["_build" + buildId]).setPaused(true);
            egret.Tween.removeTweens(view["_build" + buildId]);
        }
        // egret.Tween.get(view[`_build${buildId}`], {loop : true}).to({alpha : 0}, 1300).to({alpha : 1}, 1300);
    };
    AcDoubleSeventhView.prototype.getrewardCallback = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (event.data.data.ret < 0) {
            return;
        }
        view._rewards = rData.rewards;
        if (view.vo.isGetRecharge(view._lqjindu)) {
            view.showDialog(view._lqjindu);
        }
        else {
            view.showDialog(view._lqjindu - 1);
        }
    };
    AcDoubleSeventhView.prototype.ckjlCall = function () {
        var view = this;
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:NetRequestConst.KID_DOUBLESEVENTH});
        ViewController.getInstance().openView(ViewConst.POPUP.ACDOUBLESEVENTHAWARDVIEW);
    };
    AcDoubleSeventhView.prototype.czhiCall = function () {
        var view = this;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcDoubleSeventhView.prototype.lqBtnClick = function () {
        var _this = this;
        var view = this;
        var chargeNum = view.vo.getChargeNum();
        var descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (view.vo.isGetRecharge(view._lqjindu)) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip3'));
            return;
        }
        var nameStr = "dbsevenlamp";
        var animNum = 10;
        if (this.code == "2") {
            nameStr = "pumpkin";
        }
        else if (this.code == "3") {
            nameStr = "luoshuilight";
            animNum = 8;
        }
        if (descNum <= 0) {
            view._gquan.visible = true;
            egret.Tween.get(view._gquan).to({ scaleX: 1.71, scaleY: 1.71 }, 160).to({ scaleX: 2.22, scaleY: 2.22 }, 160).to({ scaleX: 2.4, scaleY: 2.4 }, 180).
                call(function () {
                if (view._gquan) {
                    egret.Tween.removeTweens(view._gquan);
                }
                view._gquan.visible = false;
                view._gquan.scaleX = view._gquan.scaleY = 1;
                view._gquan.alpha = 1;
                var animWidth = 407;
                var animHeight = 259;
                if (_this.code == "3") {
                    animWidth = 400;
                    animHeight = 350;
                    SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
                }
                var lamp = ComponentManager.getCustomMovieClip(nameStr, animNum, 83);
                lamp.width = animWidth;
                lamp.height = animHeight;
                lamp.blendMode = egret.BlendMode.ADD;
                view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [30, -25]);
                view.addChild(lamp);
                if (_this.code == "2") {
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [10, -5]);
                }
                else if (_this.code == "3") {
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [5, -85]);
                }
                lamp.playWithTime(1);
                lamp.setEndCallBack(function () {
                    lamp.dispose();
                    lamp = null;
                    NetManager.request(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD, { activeId: _this.acTivityId, rechargeId: _this._lqjindu });
                }, view);
            }, view);
            egret.Tween.get(view._gquan).wait(80).to({ alpha: 0 }, 590);
        }
        else {
            var codeName = "";
            if (this.code == "2") {
                codeName = "_code2";
            }
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip2' + codeName, [descNum.toString()]));
        }
    };
    AcDoubleSeventhView.prototype.getRuleInfo = function () {
        return "acDoubleSeventhRules" + this.code;
    };
    AcDoubleSeventhView.prototype.getResourceList = function () {
        var result = _super.prototype.getResourceList.call(this).concat([
            "ac_luckbag-1_icon",
            "punish_reward_icon",
            "doublesevengquan",
            // "dbsevenloop",
            // "dbsevenlamp", 
            "acseventopbg02",
            "acsevenbuild_hui2",
            "acsevenbuild_dl2",
            "acsevendliang2",
            "acsevenfont2",
            "acseventopbg2",
            "acsevenlamp2",
            "acsevenlampgray2",
        ]);
        var codeRes3 = [
            "acdoubleseven_res3",
            "acsevendliang3",
            "acseventopbg03"
        ];
        if (this.code == "3") {
            return result.concat(codeRes3);
        }
        else {
            return result;
        }
    };
    AcDoubleSeventhView.prototype.dispose = function () {
        var view = this;
        if (view._dliangfont) {
            egret.Tween.removeTweens(view._dliangfont);
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD), view.getrewardCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH, this.fresh_jindu, this);
        view._lqbtn = null;
        view._lqjindu = 1;
        view._acchargetipTxt = null;
        for (var i = 1; i <= 8; ++i) {
            if (view["_build" + i]) {
                egret.Tween.removeTweens(view["_build" + i]);
            }
            view["_build" + i] = null;
            view["_build" + i + "name"] = null;
            if (view["_build" + i + "pic"]) {
                egret.Tween.removeTweens(view["_build" + i + "pic"]);
            }
            view["_build" + i + "pic"] = null;
        }
        view._dliangfont = null;
        this._moveCountainer = null;
        this.scrollView = null;
        if (view._gquan) {
            egret.Tween.removeTweens(view._gquan);
        }
        view._gquan = null;
        view._lampClip = null;
        this._buildCountainer = null;
        this._nameCountainer = null;
        this._buildRectMap = null;
        this._tipBg = null;
        this._posArr = null;
        this._isShowLihua = false;
        this._isShowRiverLight = false;
        this._isShowLight = false;
        this._riverLight = null;
        this._lihuaPool = { "hong": [], "huang": [], "lan": [] };
        this._lightPool = { "acsevenlight1": [], "acsevenlight2": [], "acsevenlight3": [] };
        _super.prototype.dispose.call(this);
    };
    AcDoubleSeventhView.AID = null;
    AcDoubleSeventhView.CODE = null;
    return AcDoubleSeventhView;
}(AcCommonView));
__reflect(AcDoubleSeventhView.prototype, "AcDoubleSeventhView");
