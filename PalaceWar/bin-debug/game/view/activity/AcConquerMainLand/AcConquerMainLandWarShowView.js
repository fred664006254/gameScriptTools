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
 * 门客战斗演示界面
 * author qianjun
 */
var AcConquerMainLandWarShowView = (function (_super) {
    __extends(AcConquerMainLandWarShowView, _super);
    function AcConquerMainLandWarShowView() {
        var _this = _super.call(this) || this;
        _this._servantRoleleft = null;
        _this._servantRoleright = null;
        _this._servantClipleft = null;
        _this._servantClipright = null;
        _this._roleGroupleft = null;
        _this._roleGroupright = null;
        _this._topGroup = null;
        _this._midGroupleft = null;
        _this._midGroupright = null;
        _this._playerNameTxtleft = null;
        _this._playerNameTxtright = null;
        _this._playerProgressleft = null;
        _this._playerProgressright = null;
        _this._winBitMapTxtleft = null;
        _this._winBitMapTxtright = null;
        _this._winBitMapleft = null;
        _this._winBitMapright = null;
        _this._winGroupleft = null;
        _this._winGroupright = null;
        _this._servantCardBgleft = null;
        _this._servantCardBgright = null;
        _this._memberListleft = null;
        _this._memberListright = null;
        _this._leftIdx = 0;
        _this._rightIdx = 0;
        _this._winFlag = '';
        _this._leftrolePosX = 0;
        _this._rightrolePosX = 0;
        _this._rolePosY = 0;
        _this._scrollY = 0;
        _this._round = 0;
        _this._log = {};
        _this._damageLog = {};
        _this._roundLog = {};
        _this._leftLog = [];
        _this._rightLog = [];
        _this._leftvsInfo = {};
        _this._rightvsInfo = {};
        _this._lunkong = false;
        _this._flag = false;
        _this._together = false;
        _this._vsImg = null;
        _this._planDescBgleft = null;
        _this._planDescBgright = null;
        _this._planDescArrowleft = null;
        _this._planDescArrowright = null;
        _this._planDescTxtleft = null;
        _this._planDescTxtright = null;
        _this._planGroupleft = null;
        _this._planGroupright = null;
        _this._skinnamebgleft = null;
        _this._skinnamebgright = null;
        _this._skinnameTxtleft = null;
        _this._skinnameTxtright = null;
        _this._skinEquip = [];
        _this._winGroup = null;
        _this._showSkin = 0;
        _this._self = false;
        _this.leftWin = 0;
        _this.rightWin = 0;
        return _this;
    }
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarShowView.prototype, "uiCode", {
        get: function () {
            var code = '';
            switch (Number(this.code)) {
                default:
                    code = "1";
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandWarShowView.prototype.getSoundBgName = function () {
        return 'music_atkrace';
    };
    AcConquerMainLandWarShowView.prototype.initdata = function (rdata) {
        var view = this;
        var arr = ['left', 'right'];
        var data = view.param.data.test ? rdata.data : rdata;
        //fightteam = {mteam={},fteam={}}
        view._self = false;
        for (var i in arr) {
            var info = Number(i) == 0 ? data.info : data.tinfo;
            var obj = {};
            var log = [];
            var total = 0;
            view["_" + arr[i] + "Log"] = [];
            view["_" + arr[i] + "vsInfo"] = {};
            //对阵门客
            for (var j in info.team) {
                var unit = info.team[j];
                total += unit.dps;
                log.push({
                    servantId: unit.sid,
                    attr: unit.dps,
                    name: Config.ServantCfg.getServantItemById(unit.sid).name,
                    curHp: unit.dps,
                    type: arr[i],
                    skin: unit.servantskin,
                    clv: unit.clv,
                    weaponDps: unit.weaponDps,
                });
            }
            view["_" + arr[i] + "Log"] = log;
            obj['attendLog'] = log;
            obj['totalattr'] = total;
            obj['type'] = arr[i];
            obj['zid'] = info.zid;
            obj["titleId"] = info.titleId;
            obj["name"] = info.name;
            obj["level"] = info.level;
            view["_" + arr[i] + "vsInfo"] = obj;
        }
    };
    AcConquerMainLandWarShowView.prototype.getBgName = function () {
        return "mlfightbg-" + this.uiCode;
    };
    AcConquerMainLandWarShowView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
            this.viewBg.anchorOffsetX = this.viewBg.width / 2;
            this.viewBg.x = GameConfig.stageWidth / 2;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            // 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = GameConfig.stageHeigth - 1136; //(GameConfig.stageHeigth - 1136)/2;
        }
    };
    AcConquerMainLandWarShowView.prototype.initView = function () {
        var view = this;
        // result : data.conquerStat == 8 ? `fail` : `win`,
        // 	isNpc :  data.conquerStat == 7
        if (view.param.data.test) {
            view.initdata({
                ret: true,
                data: {
                    id: 1,
                    zid: Api.mergeServerVoApi.getTrueZid(),
                    name: '打算武器',
                    info: {
                        team: {
                            123455: {
                                sid: 1001,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName(),
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                servantskin: 10011,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3301",
                                weaponDps: 123,
                            },
                            123456: {
                                sid: 1002,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '43',
                                stra: 2,
                                dps: 400000,
                                st: 2,
                                servantskin: 10021,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3302",
                            },
                            123457: {
                                sid: 1003,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123458: {
                                sid: 1004,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                            },
                            123459: {
                                sid: 1005,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                            },
                            123460: {
                                sid: 1006,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                            },
                            123461: {
                                sid: 1007,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123462: {
                                sid: 1008,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123463: {
                                sid: 1009,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123464: {
                                sid: 1010,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123465: {
                                sid: 1011,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10011,
                            },
                            123466: {
                                sid: 1014,
                                po: 1,
                                name: Api.playerVoApi.getPlayerName() + '44',
                                stra: 2,
                                dps: 5000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3303",
                                servantskin: 10141,
                            },
                        },
                        id: 1,
                        zid: Api.mergeServerVoApi.getTrueZid(),
                        name: '打算武器',
                        level: 1,
                    },
                    tinfo: {
                        team: {
                            223455: {
                                sid: 1001,
                                po: 1,
                                name: '天啊',
                                dps: 5000,
                                st: 1,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3304",
                                servantskin: 10011,
                                weaponDps: 123,
                            },
                            223456: {
                                sid: 1020,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                            223457: {
                                sid: 1008,
                                po: 2,
                                name: '天我',
                                stra: 1,
                                dps: 3000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3306",
                            },
                            223458: {
                                sid: 1018,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                            223459: {
                                sid: 1009,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                            223460: {
                                sid: 1011,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                            223461: {
                                sid: 1013,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                            },
                            223462: {
                                sid: 1014,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10141,
                            },
                            2234563: {
                                sid: 1001,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                                weaponDps: 123,
                            },
                            2234564: {
                                sid: 1002,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                            223465: {
                                sid: 1003,
                                po: 2,
                                name: '天我',
                                stra: 4,
                                dps: 1000,
                                st: 2,
                                level: App.MathUtil.getRandom(1, 7),
                                title: "3305",
                                servantskin: 10011,
                            },
                        },
                        level: 4,
                        id: 2,
                        zid: 2,
                        name: '撒啊',
                    },
                    score: 100,
                    level: 1,
                }
            });
        }
        else {
            view.initdata(view.param.data.wardata);
        }
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var topgroup = new BaseDisplayObjectContainer();
        topgroup.width = GameConfig.stageWidth;
        topgroup.height = 130;
        view.addChild(topgroup);
        view._topGroup = topgroup;
        view._topGroup.y = -view._topGroup.height;
        view.createWarInfo(LayoutConst.left);
        view.createWarInfo(LayoutConst.right);
        var crossservantrulevs = BaseBitmap.create('crossservantrulevs');
        crossservantrulevs.anchorOffsetX = crossservantrulevs.width / 2;
        crossservantrulevs.anchorOffsetY = crossservantrulevs.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, crossservantrulevs, view);
        view.addChild(crossservantrulevs);
        crossservantrulevs.setScale(10);
        crossservantrulevs.alpha = 0;
        view._vsImg = crossservantrulevs;
        var logo = BaseBitmap.create("mlfighttitle-" + view.uiCode);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, logo, view);
        view._topGroup.addChild(logo);
        var mask = BaseBitmap.create("mlfightmask-" + view.uiCode);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, logo, [0, 45]);
        view._topGroup.addChild(mask);
        var cityTxt = ComponentManager.getTextField(LanguageManager.getlocal("CountryWarVsTitle", [view.param.data.cityName]), 22, TextFieldConst.COLOR_WARN_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityTxt, mask, [0, 40]);
        view._topGroup.addChild(cityTxt);
        view.setChildIndex(view.closeBtn, 9999);
        App.DisplayUtil.setLayoutPosition(PlatformManager.hasSpcialCloseBtn() ? LayoutConst.lefttop : LayoutConst.righttop, view.closeBtn, view, [0, 0]);
        view.beginWarLog();
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acConquerMainLandTip32-" + view.uiCode, view.skipFight, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0, 15]);
        view.addChild(btn);
    };
    AcConquerMainLandWarShowView.prototype.createWarInfo = function (type) {
        var view = this;
        var isleft = type == LayoutConst.left;
        var wardata = view["_" + type + "vsInfo"];
        var empty = view._lunkong && !isleft;
        //职员信息
        var infobg = BaseBitmap.create(type == "left" ? "crossservantvsmask2" : "crossservantvsmask1");
        infobg.height = 140;
        infobg.anchorOffsetY = infobg.height / 2;
        infobg.scaleY = -1;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, infobg, view._topGroup, [0, 0], true);
        view._topGroup.addChild(infobg);
        var namebg = BaseBitmap.create("specialview_commoni_namebg");
        view._topGroup.addChild(namebg);
        var teamNameTxt = ComponentManager.getTextField(wardata.name, 20);
        view._topGroup.addChild(teamNameTxt);
        namebg.width = 200;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.leftverticalCenter : LayoutConst.rightverticalCenter, namebg, infobg, [30, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, teamNameTxt, namebg);
        var titleImg = null;
        var titleinfo = App.CommonUtil.getTitleData(wardata.titleId);
        if (titleinfo.title !== '') {
            titleImg = App.CommonUtil.getTitlePic(titleinfo);
            titleImg.width = 155;
            titleImg.height = 59;
            titleImg.setScale(0.7);
            view.setLayoutPosition(LayoutConst.lefttop, titleImg, namebg, [0, namebg.height + 5]);
            view._topGroup.addChild(titleImg);
        }
        var zidTxt = ComponentManager.getBitmapText(Api.mergeServerVoApi.getAfterMergeSeverName(null, true, wardata.zid), TextFieldConst.FONTNAME_ITEMTIP);
        view._topGroup.addChild(zidTxt);
        if (titleImg) {
            view.setLayoutPosition(LayoutConst.leftverticalCenter, zidTxt, titleImg, [titleImg.width * titleImg.scaleX, 0]);
        }
        else {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, zidTxt, namebg, [0, namebg.height + 5]);
        }
        //人物形象
        var midgroup = new BaseDisplayObjectContainer();
        midgroup.width = 260;
        midgroup.height = 330;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.leftbottom : LayoutConst.rightbottom, midgroup, view, [0, 120]);
        view.addChild(midgroup);
        view["_midGroup" + type] = midgroup;
        // let servantCfg = Config.ServantCfg.getServantItemById('1001');
        var roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = 248;
        roleContainer.height = 287;
        roleContainer.anchorOffsetX = roleContainer.width / 2;
        roleContainer.anchorOffsetY = roleContainer.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, midgroup, [0, 0], true);
        view["_" + type + "rolePosX"] = roleContainer.x;
        midgroup.addChild(roleContainer);
        view["_roleGroup" + type] = roleContainer;
        var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
        var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
        aureoleClip.blendMode = egret.BlendMode.ADD;
        aureoleClip.width = aureoleBM.width;
        aureoleClip.height = aureoleBM.height;
        aureoleClip.anchorOffsetX = aureoleBM.width / 2;
        aureoleClip.anchorOffsetY = aureoleBM.height / 2;
        aureoleClip.setScale(2.5 * 0.62);
        aureoleClip.x = roleContainer.width / 2;
        aureoleClip.y = roleContainer.height / 2 + 50;
        roleContainer.addChild(aureoleClip);
        aureoleClip.playWithTime(-1);
        aureoleClip.alpha = 0;
        view["_servantClip" + type] = aureoleClip;
        // let servantCfg = Config.ServantCfg.getServantItemById('1001');
        var role = BaseLoadBitmap.create('');
        role.width = 248;
        role.height = 287;
        roleContainer.addChild(role);
        view._rolePosY = roleContainer.y;
        view["_servantRole" + type] = role;
        //挑衅
        var plangroup = new BaseDisplayObjectContainer();
        plangroup.width = 250;
        plangroup.height = 110;
        view.addChild(plangroup);
        view["_planGroup" + type] = plangroup;
        plangroup.alpha = 0;
        //语言文本
        var descBg = BaseBitmap.create('public_9_bg42');
        descBg.width = 250;
        plangroup.addChild(descBg);
        view["_planDescBg" + type] = descBg;
        var arrowBM = BaseBitmap.create("public_9_bg13_tail");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.scaleX = -1;
        plangroup.addChild(arrowBM);
        view["_planDescArrow" + type] = arrowBM;
        var str = LanguageManager.getlocal("acConquerMainLandTip37-" + view.uiCode);
        var descTxt = ComponentManager.getTextField(str, 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = 200;
        descTxt.lineSpacing = 5;
        plangroup.addChild(descTxt);
        view["_planDescTxt" + type] = descTxt;
        descBg.height = descTxt.textHeight + 45;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, plangroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25, descBg.height - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [0, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, plangroup, midgroup, [0, -plangroup.height + 30]);
        var wingroup = new BaseDisplayObjectContainer();
        wingroup.width = 90;
        wingroup.height = 90;
        wingroup.anchorOffsetX = wingroup.width / 2;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, wingroup, midgroup, [10, 0], true);
        midgroup.addChild(wingroup);
        view["_winGroup" + type] = wingroup;
        wingroup.visible = false;
        wingroup.rotation = isleft ? -25 : 25;
        var winbg = BaseBitmap.create("acmazeview_textbg");
        winbg.anchorOffsetX = winbg.width / 2;
        winbg.scaleX = isleft ? 1 : -1;
        winbg.rotation = 25 * winbg.scaleX;
        winbg.x = isleft ? 105.5 : -5.5;
        winbg.y = -25;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, [0,-25])
        //App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, (isleft ? [-25.5,-25] : [-75.5,-25]), true);
        wingroup.addChild(winbg);
        var winBg = BaseBitmap.create("awlsheng");
        winBg.anchorOffsetX = winBg.width / 2;
        winBg.rotation = 25;
        winBg.x = isleft ? 80 : 64;
        winBg.y = -7;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBg, wingroup, (isleft ? [30,0] : [34,18]), true);
        wingroup.addChild(winBg);
        view["_winBitMap" + type] = winBg;
        var winBitMapTxt = ComponentManager.getBitmapText('2', TextFieldConst.FONTNAME_ITEMTIP);
        winBitMapTxt.x = winBg.x - 15 - winBitMapTxt.textWidth - winBg.anchorOffsetX;
        winBitMapTxt.y = 0;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBitMapTxt, wingroup, (isleft ? [10,33] : [10,0]),true);
        view["_winBitMapTxt" + type] = winBitMapTxt;
        wingroup.addChild(winBitMapTxt);
        var playernamebg = BaseBitmap.create(type == "left" ? 'awnamebg2' : 'awnamebg1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernamebg, roleContainer, [0, roleContainer.height * roleContainer.scaleX]);
        midgroup.addChild(playernamebg);
        var playernameTxt = ComponentManager.getTextField('', 22);
        playernameTxt.height = 22;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, playernamebg);
        midgroup.addChild(playernameTxt);
        view["_playerNameTxt" + type] = playernameTxt;
        var skinnamebg = BaseBitmap.create("skinshowkuang3");
        skinnamebg.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinnamebg, playernamebg, [0, -skinnamebg.height - 5]);
        midgroup.addChild(skinnamebg);
        view["_skinnamebg" + type] = skinnamebg;
        var skinnameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        skinnameTxt.height = 22;
        skinnameTxt.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
        midgroup.addChild(skinnameTxt);
        view["_skinnameTxt" + type] = skinnameTxt;
        var progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 260);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, playernamebg, [0, playernamebg.height + 5]);
        midgroup.addChild(progress);
        view["_playerProgress" + type] = progress;
        var cardbg = BaseLoadBitmap.create("");
        cardbg.width = 91;
        cardbg.height = 81;
        cardbg.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cardbg, playernamebg, [22, -5]);
        midgroup.addChild(cardbg);
        view["_servantCardBg" + type] = cardbg;
        var arr = Api.chatVoApi.arr_clone(wardata.attendLog);
        arr.splice(0, 1);
        var maxH = midgroup.y - view._topGroup.height - 30;
        var height = Math.min(arr.length * 91, Math.floor(maxH / 91) * 91);
        var tmpRect = new egret.Rectangle(0, 0, 86, height);
        arr.reverse();
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandServantVsItem, arr, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, scrollList, midgroup, [25, -scrollList.height]);
        view.addChild(scrollList);
        scrollList.verticalScrollPolicy = 'off';
        scrollList.bounces = false;
        view["_memberList" + type] = scrollList;
        scrollList.alpha = 0;
        if (height < arr.length * 91) {
            scrollList.scrollTop = 91 * arr.length - height;
        }
    };
    AcConquerMainLandWarShowView.prototype.beginWarLog = function () {
        var view = this;
        view._skinEquip = [];
        var leftlog = view._leftLog;
        var rightlog = view._rightLog;
        view._log = {};
        view._log['left'] = leftlog;
        view._log['right'] = rightlog;
        view._roundLog = {};
        view._damageLog = {};
        view._damageLog[LayoutConst.left] = {};
        view._damageLog[LayoutConst.right] = {};
        view._leftIdx = view._rightIdx = 0;
        for (var i in view._log) {
            for (var j in view._log[i]) {
                var unit = view._log[i][j];
                unit.curHp = unit.attr;
            }
        }
        view._scrollY = 0;
        //预先演算一遍
        var leftidx = 0;
        var rightidx = 0;
        view._roundLog = {};
        view._round = 0;
        view._roundLog[view._round] = {
            left: {
                servantId: leftlog[0].servantId,
                name: leftlog[0].name,
                curHp: leftlog[0].curHp,
                prevHp: leftlog[0].curHp,
                attr: leftlog[0].attr,
                dps: 0,
                win: 0,
                change: false,
                leftIdx: 0,
                skin: leftlog[0].skin,
                level: view._leftvsInfo.level,
                titleid: view._leftvsInfo.titleid,
                clv: leftlog[0].clv,
                winMax: this.cfg ? this.cfg.teamInfo.successive : 5,
            },
            right: {
                servantId: rightlog[0].servantId,
                name: rightlog[0].name,
                curHp: rightlog[0].curHp,
                prevHp: rightlog[0].curHp,
                attr: rightlog[0].attr,
                dps: 0,
                win: 0,
                change: false,
                rightIdx: 0,
                skin: rightlog[0].skin,
                level: view._rightvsInfo.level,
                titleid: view._rightvsInfo.titleid,
                clv: rightlog[0].clv,
                winMax: this.cfg ? this.cfg.teamInfo.successive : 5,
            },
        };
        var winflag = false;
        while (!winflag) {
            var view_1 = this;
            var leftData = view_1._log[LayoutConst.left][leftidx];
            var rightData = view_1._log[LayoutConst.right][rightidx];
            var leftHp = leftData.curHp;
            var rightHp = rightData.curHp;
            var sub = leftHp - rightHp;
            leftData["winMax"] = this.cfg ? this.cfg.teamInfo.successive : 5;
            rightData["winMax"] = this.cfg ? this.cfg.teamInfo.successive : 5;
            if (!view_1._damageLog['left'][leftData.servantId]) {
                view_1._damageLog['left'][leftData.servantId] = {};
                view_1._damageLog['left'][leftData.servantId]['damage'] = 0;
                view_1._damageLog['left'][leftData.servantId]['win'] = 0;
                view_1._damageLog['left'][leftData.servantId]['name'] = leftData.name;
            }
            view_1._damageLog['left'][leftData.servantId]['damage'] += ((sub > 0 ? rightHp : leftHp));
            if (!view_1._damageLog['right'][rightData.servantId]) {
                view_1._damageLog['right'][rightData.servantId] = {};
                view_1._damageLog['right'][rightData.servantId]['damage'] = 0;
                view_1._damageLog['right'][rightData.servantId]['win'] = 0;
                view_1._damageLog['right'][rightData.servantId]['name'] = rightData.name;
            }
            view_1._damageLog['right'][rightData.servantId]['damage'] += ((sub < 0 ? leftHp : rightHp));
            leftData.curHp = Math.max(sub, 0);
            rightData.curHp = Math.max(0, -sub);
            var leftchange = false;
            var rightchange = false;
            var leftresult = '';
            var rightresult = '';
            var lefttmpx = leftidx;
            var righttmpx = rightidx;
            var isWinMaxLeft = false;
            var isWinMaxRight = false;
            var calLeftIdx = leftidx;
            var calRightIdx = rightidx;
            if (sub > 0) {
                ++rightidx;
                ++calRightIdx;
                rightchange = true;
                leftresult = 'win';
                view_1._damageLog['left'][leftData.servantId]['win'] += 1;
                if (view_1._damageLog['left'][leftData.servantId]['win'] >= leftData["winMax"]) {
                    ++leftidx;
                    ++calLeftIdx;
                    leftchange = true;
                    isWinMaxLeft = true;
                }
            }
            else if (sub < 0) {
                ++leftidx;
                ++calLeftIdx;
                leftchange = true;
                rightresult = 'win';
                view_1._damageLog['right'][rightData.servantId]['win'] += 1;
                if (view_1._damageLog['right'][rightData.servantId]['win'] >= rightData["winMax"]) {
                    ++rightidx;
                    ++calRightIdx;
                    rightchange = true;
                    isWinMaxRight = true;
                }
            }
            else {
                ++leftidx;
                ++calLeftIdx;
                leftchange = true;
                if (view_1._damageLog['left'][leftData.servantId]['win'] >= leftData["winMax"]) {
                    isWinMaxLeft = true;
                }
                ++rightidx;
                ++calRightIdx;
                rightchange = true;
                if (view_1._damageLog['right'][rightData.servantId]['win'] >= rightData["winMax"]) {
                    isWinMaxRight = true;
                }
                leftresult = rightresult = 'draw';
            }
            ++view_1._round;
            view_1._roundLog[view_1._round] = {
                left: {
                    servantId: leftData.servantId,
                    name: leftData.name,
                    prevHp: leftHp,
                    curHp: leftData.curHp,
                    attr: leftData.attr,
                    dps: sub > 0 ? rightHp : leftHp,
                    win: view_1._damageLog['left'][leftData.servantId]['win'],
                    change: leftchange,
                    result: leftresult,
                    leftIdx: lefttmpx,
                    skin: leftData.skin,
                    level: leftData.level,
                    titleid: leftData.titleid,
                    clv: leftData.clv,
                    isWinMax: isWinMaxLeft,
                    weaponDps: leftData.weaponDps
                },
                right: {
                    servantId: rightData.servantId,
                    name: rightData.name,
                    prevHp: rightHp,
                    curHp: rightData.curHp,
                    attr: rightData.attr,
                    dps: sub > 0 ? rightHp : leftHp,
                    win: view_1._damageLog['right'][rightData.servantId]['win'],
                    change: rightchange,
                    result: rightresult,
                    rightIdx: righttmpx,
                    skin: rightData.skin,
                    level: rightData.level,
                    titleid: rightData.titleid,
                    clv: rightData.clv,
                    isWinMax: isWinMaxRight,
                    weaponDps: rightData.weaponDps
                },
            };
            var newleftdata = view_1._log[LayoutConst.left][calLeftIdx];
            var newrightData = view_1._log[LayoutConst.right][calRightIdx];
            winflag = true;
            if (!newleftdata && !newrightData) {
                if (leftresult == 'draw' && rightresult == 'draw') {
                    view_1._winFlag = 'draw';
                }
                else if (leftresult == 'win') {
                    view_1._winFlag = LayoutConst.left;
                }
                else if (rightresult == 'win') {
                    view_1._winFlag = LayoutConst.right;
                }
            }
            else if (newleftdata && !newrightData) {
                view_1._winFlag = LayoutConst.left;
            }
            else if (newrightData && !newleftdata) {
                view_1._winFlag = LayoutConst.right;
            }
            else {
                winflag = false;
            }
            if (winflag) {
                break;
            }
        }
        for (var i in view._log) {
            for (var j in view._log[i]) {
                var unit = view._log[i][j];
                unit.curHp = unit.attr;
                unit.winMax = this.cfg ? this.cfg.teamInfo.successive : 5;
            }
        }
        view.leftWin = view.rightWin = 0;
        view._round = 1;
        view._flag = false;
        var leftdata = view._roundLog[view._round][LayoutConst.left];
        var rightdata = view._roundLog[view._round][LayoutConst.right];
        if (leftdata && leftdata.weaponDps) {
            this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
        }
        if (rightdata && rightdata.weaponDps) {
            this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
        }
        view._together = true;
        view._showSkin = 0;
        if (this._skinEquip.length) {
            view._showSkin = this._skinEquip.length;
            if (this._skinEquip.length == 2) {
                view.showRoundAnti(LayoutConst.left, null, null, true);
            }
            else {
                if (leftdata && leftdata.skin) {
                    view.showRoundAnti(LayoutConst.left, null, null, true);
                }
                else {
                    view.showRoundAnti(LayoutConst.right, null, null, true);
                }
            }
        }
        else {
            view.showRoundAnti(LayoutConst.left);
            view.showRoundAnti(LayoutConst.right);
        }
    };
    AcConquerMainLandWarShowView.prototype.showSkin = function (func) {
        var view = this;
        if (this._skinEquip.length) {
            // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
            // 	callback : ()=>{
            // 		this._skinEquip.splice(0,1);
            // 		func.apply(this);
            // 	},
            // 	callbackThisObj : this,
            // 	skinId : this._skinEquip[0]
            // });
            var serId = void 0, serId2 = void 0, value1 = void 0, value2 = void 0;
            if (this._skinEquip[0][1] == 1) {
                serId = this._skinEquip[0][2];
                value1 = this._skinEquip[0][0];
            }
            else {
                serId2 = this._skinEquip[0][2];
                value2 = this._skinEquip[0][0];
            }
            var view_2 = this;
            ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW, {
                sid: serId,
                type: 3,
                atype: 8,
                value: value1,
                sid2: serId2,
                type2: 1,
                atype2: 8,
                value2: value2,
                endhide: true,
                f: function () {
                    view_2._skinEquip.splice(0, 1);
                    func.apply(view_2);
                },
                o: this,
                auto: false,
            });
        }
        else {
        }
    };
    AcConquerMainLandWarShowView.prototype.showRoundAnti = function (type, func, obj, showskin, showskinfunc) {
        var view = this;
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var playerNameTxt = view["_playerNameTxt" + type];
        var progress = view["_playerProgress" + type];
        var list = view["_memberList" + type];
        var plangroup = view["_planGroup" + type];
        var roundData = view._roundLog[view._round];
        var cardbg = view["_servantCardBg" + type];
        var rolex = view["_" + type + "rolePosX"];
        var skinNameTxt = view["_skinnameTxt" + type];
        var skinNameBg = view["_skinnamebg" + type];
        var aureoleClip = view["_servantClip" + type];
        var rolegroup = view["_roleGroup" + type];
        if (roundData) {
            var leftData_1 = view._roundLog[view._round][LayoutConst.left];
            var rightData_1 = view._roundLog[view._round][LayoutConst.right];
            var data_1 = view._roundLog[view._round][type];
            var curIdx = data_1[type + "Idx"];
            //上阵效果
            var servantInfo_1 = Config.ServantCfg.getServantItemById(data_1.servantId);
            rolegroup.y = view._rolePosY;
            var leftdata = view._roundLog[view._round]['left'];
            var rightdata = view._roundLog[view._round]['right'];
            var skip = false;
            if (view._round == 1) {
                view["_" + type + "Idx"] = list._scrollListItemArr.length - 1;
                egret.Tween.get(rolegroup).to({ x: isOnleft ? -248 : 508, y: view._rolePosY }, 250).call(function () {
                    rolegroup.setScale(1);
                    var img = servantInfo_1.fullIcon;
                    if (data_1.skin) {
                        img = Config.ServantskinCfg.getServantSkinItemById(data_1.skin).body;
                    }
                    role.setload(img);
                    cardbg.setload("servant_alv_" + data_1.clv);
                    view["_winGroup" + type].visible = false;
                    rolegroup.alpha = 1;
                    aureoleClip.alpha = 0;
                }, view).to({ x: rolex, y: view._rolePosY }, 500).call(function () {
                    playerNameTxt.text = data_1.name;
                    var skincfg = Config.ServantskinCfg.getServantSkinItemById(data_1.skin);
                    if (data_1.skin && skincfg) {
                        aureoleClip.alpha = 1;
                        skinNameTxt.text = skincfg.name;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinNameTxt, rolegroup);
                        skinNameBg.visible = skinNameTxt.visible = true;
                    }
                    else {
                        skinNameTxt.text = "";
                        skinNameBg.visible = skinNameTxt.visible = false;
                    }
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
                    progress.setText(App.StringUtil.changeIntToText(data_1.attr));
                    progress.setPercentage(data_1.attr / data_1.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data_1.attr), 0)));
                    //等级头衔
                    var str = LanguageManager.getlocal("PromotePlayersPopViewList1");
                    var titleId = data_1.titleid;
                    var titleinfo = App.CommonUtil.getTitleData(titleId);
                    if (titleinfo.title !== '') {
                        var title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
                        if (title && title.isTitle == 1 && title.titleType) {
                            str = title.titleName;
                        }
                    }
                    if (showskin) {
                        view.showSkin(function () {
                            if (view._skinEquip.length == 1) {
                                if (view._round > 1) {
                                    view.changeTween('right', rightData_1.isWinMax, true, function () {
                                        view.showNext(func, obj);
                                    });
                                }
                                else {
                                    view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, true, function () {
                                        view.showNext(func, obj);
                                    });
                                }
                            }
                            else {
                                if (view._showSkin == 1) {
                                    if (view._round > 1) {
                                        view.changeTween(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, type == LayoutConst.left ? rightData_1.isWinMax : leftData_1.isWinMax, false, function () {
                                            view.showNext(func, obj);
                                        });
                                    }
                                    else {
                                        view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, false, function () {
                                            view.showNext(func, obj);
                                        });
                                    }
                                }
                                else {
                                    if (showskinfunc) {
                                        showskinfunc.apply(view);
                                    }
                                    view.showNext(func, obj);
                                }
                            }
                        });
                    }
                    else {
                        if (showskinfunc) {
                            showskinfunc.apply(view);
                        }
                        view.showNext(func, obj);
                    }
                }, view);
            }
            else {
                rolegroup.setScale(0);
                egret.Tween.get(rolegroup).to({ x: rolex, y: view._rolePosY }, 250).call(function () {
                    var img = servantInfo_1.fullIcon;
                    if (data_1.skin) {
                        img = Config.ServantskinCfg.getServantSkinItemById(data_1.skin).body;
                    }
                    role.setload(img);
                    cardbg.setload("servant_alv_" + data_1.clv);
                    view["_winGroup" + type].visible = false;
                    rolegroup.alpha = 1;
                    aureoleClip.alpha = 0;
                }, view).to({ scaleX: 1, scaleY: 1 }, 500).wait(250).call(function () {
                    playerNameTxt.text = data_1.name;
                    var skincfg = Config.ServantskinCfg.getServantSkinItemById(data_1.skin);
                    if (data_1.skin && skincfg) {
                        aureoleClip.alpha = 1;
                        skinNameTxt.text = skincfg.name;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinNameTxt, rolegroup);
                        skinNameBg.visible = skinNameTxt.visible = true;
                    }
                    else {
                        skinNameTxt.text = "";
                        skinNameBg.visible = skinNameTxt.visible = false;
                    }
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
                    progress.setText(App.StringUtil.changeIntToText(data_1.attr));
                    progress.setPercentage(data_1.attr / data_1.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data_1.attr), 0)));
                    if (showskin) {
                        view.showSkin(function () {
                            if (view._skinEquip.length == 1) {
                                if (view._round > 1) {
                                    view.changeTween('right', rightData_1.isWinMax, true, function () {
                                        view.showNext(func, obj);
                                    });
                                }
                                else {
                                    view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, true, function () {
                                        view.showNext(func, obj);
                                    });
                                }
                            }
                            else {
                                if (view._showSkin == 1) {
                                    if (view._round > 1) {
                                        if (view._together) {
                                            view.changeTween(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, type == LayoutConst.left ? rightData_1.isWinMax : leftData_1.isWinMax, false, function () {
                                                view.showNext(func, obj);
                                            });
                                        }
                                        else {
                                            view.showNext(func, obj);
                                        }
                                    }
                                    else {
                                        view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, false, function () {
                                            view.showNext(func, obj);
                                        });
                                    }
                                }
                                else {
                                    if (showskinfunc) {
                                        showskinfunc.apply(view);
                                    }
                                    view.showNext(func, obj);
                                }
                            }
                        });
                    }
                    else {
                        if (showskinfunc) {
                            showskinfunc.apply(view);
                        }
                        view.showNext(func, obj);
                    }
                }, view);
            }
        }
        else {
            if (func) {
                func.apply(obj);
            }
        }
    };
    AcConquerMainLandWarShowView.prototype.showNext = function (func, obj) {
        var view = this;
        if (view._round == 1) {
            if (view._flag) {
                var leftplangroup = view._planGroupleft;
                var rightplangroup_1 = view._planGroupright;
                var leftxt = view._planDescTxtleft;
                var righttxt = view._planDescTxtright;
                var rid = App.MathUtil.getRandom(1, 6);
                leftxt.text = LanguageManager.getlocal("acConquerMainLandTip37_" + (rid * 2 - 1) + "-" + view.uiCode);
                righttxt.text = LanguageManager.getlocal("acConquerMainLandTip37_" + rid * 2 + "-" + view.uiCode);
                //挑衅文本
                egret.Tween.get(leftplangroup).to({ alpha: 1 }, 500).wait(500).to({ alpha: 0 }, 500).call(function () {
                    egret.Tween.get(rightplangroup_1).to({ alpha: 1 }, 500).wait(500).to({ alpha: 0 }, 500).call(function () {
                        var leftlist = view._memberListleft;
                        var rightlist = view._memberListright;
                        //门客列表
                        var idx = leftlist._dataList.length - 1;
                        var num = leftlist.height / 91;
                        var _loop_1 = function (i) {
                            var unit = leftlist._scrollListItemArr[i];
                            if (unit) {
                                var posy = unit.y;
                                unit.y = posy - leftlist.height;
                                var speed = 0.8;
                                egret.Tween.get(unit).wait(400).to({ y: posy }, (posy - unit.y) / speed).call(function () {
                                    egret.Tween.removeTweens(unit);
                                    if (i == 0) {
                                    }
                                }, view);
                            }
                        };
                        for (var i = idx; i >= 0; --i) {
                            _loop_1(i);
                        }
                        leftlist.alpha = 1;
                        var idx2 = rightlist._dataList.length - 1;
                        var num2 = rightlist.height / 91;
                        var _loop_2 = function (i) {
                            var unit = rightlist._scrollListItemArr[i];
                            if (unit) {
                                var posy = unit.y;
                                unit.y = posy - rightlist.height;
                                var speed = 0.8;
                                egret.Tween.get(unit).wait(400).to({ y: posy }, (posy - unit.y) / speed).call(function () {
                                    egret.Tween.removeTweens(unit);
                                    if (i == 0) {
                                    }
                                }, view);
                            }
                        };
                        for (var i = idx2; i >= 0; --i) {
                            _loop_2(i);
                        }
                        rightlist.alpha = 1;
                    }, view);
                }, view);
                egret.Tween.get(view._topGroup).to({ y: 0 }, 300).wait(3600).call(function () {
                    view._vsImg.x = GameConfig.stageWidth / 2;
                    //对战效果图
                    var loopClip = ComponentManager.getCustomMovieClip("servantpkxunhuan", 10, 110);
                    loopClip.width = 249;
                    loopClip.height = 229;
                    loopClip.anchorOffsetX = loopClip.width / 2;
                    loopClip.anchorOffsetY = loopClip.height / 2;
                    loopClip.setScale(0.84);
                    loopClip.x = view._vsImg.x - 12;
                    loopClip.y = view._vsImg.y - 5;
                    view.addChild(loopClip);
                    loopClip.alpha = 0;
                    var upgradeClip = ComponentManager.getCustomMovieClip("servantpkduizhan", 17, 100);
                    upgradeClip.width = 444;
                    upgradeClip.height = 478;
                    upgradeClip.anchorOffsetX = upgradeClip.width / 2;
                    upgradeClip.anchorOffsetY = upgradeClip.height / 2;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upgradeClip, view, [-7, 0]);
                    view.addChild(upgradeClip);
                    //upgradeClip.setEndCallBack(view.showPengzhuang,view);
                    upgradeClip.setEndCallBack(function () {
                        upgradeClip.dispose();
                        upgradeClip = null;
                        view._vsImg.alpha = 1;
                        loopClip.alpha = 1;
                        loopClip.playWithTime(-1);
                        var wingroup = new BaseDisplayObjectContainer();
                        wingroup.width = GameConfig.stageWidth;
                        view.addChild(wingroup);
                        var descbg = BaseBitmap.create("specialview_commoni_namebg");
                        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip38-" + view.uiCode, [view.cfg ? view.cfg.teamInfo.successive : 5]), 22);
                        descbg.height = tipTxt.textHeight + 70;
                        descbg.width = tipTxt.textWidth + 230;
                        wingroup.addChild(descbg);
                        wingroup.addChild(tipTxt);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, wingroup, [0, 0], true);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
                        view._winGroup = wingroup;
                        wingroup.alpha = 0;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wingroup, view);
                        // view.showPengzhuang();
                        view.startMove();
                    }, view);
                    egret.Tween.get(view._vsImg).wait(170).call(function () {
                        upgradeClip.playWithTime(1);
                    }, view);
                    egret.Tween.get(view._vsImg).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200).call(function () {
                        egret.Tween.removeTweens(view._vsImg);
                    }, view);
                }, view).call(function () {
                    egret.Tween.removeTweens(view._topGroup);
                }, view);
            }
            else {
                view._flag = true;
            }
        }
        else {
            if (view._flag) {
                if (func) {
                    func.apply(obj);
                }
            }
            else {
                view._flag = true;
            }
        }
    };
    AcConquerMainLandWarShowView.prototype.skipFight = function () {
        var view = this;
        var score = 0;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDWARRESULTVIEW, {
            type: view.param.data.result,
            damageLog: view._damageLog,
            aid: this.aid,
            code: this.code,
            wardata: view.param.data.wardata,
            cityName: view.param.data.cityName,
            attackwin: view.param.data.attackwin
        });
        if (this.param.data.callback) {
            this.param.data.callback.apply(this.param.data.callobj);
        }
        view.hide();
    };
    AcConquerMainLandWarShowView.prototype.startMove = function () {
        var _this = this;
        var view = this;
        //移动碰撞
        if (view.checkWin()) {
            egret.Tween.get(view).wait(500).call(function () {
                view.skipFight();
            }, view);
        }
        else {
            var leftData_2 = view._roundLog[view._round][LayoutConst.left];
            var rightData_2 = view._roundLog[view._round][LayoutConst.right];
            var leftrole = view["_servantRole" + LayoutConst.left];
            var rightrole = view["_servantRole" + LayoutConst.right];
            var leftprogress_1 = view["_playerProgress" + LayoutConst.left];
            var rightprogress_1 = view["_playerProgress" + LayoutConst.right];
            var leftrolex = view["_" + LayoutConst.left + "rolePosX"];
            var rightrolex = view["_" + LayoutConst.right + "rolePosX"];
            var leftrolegroup = view["_roleGroup" + LayoutConst.left];
            var rightrolegroup = view["_roleGroup" + LayoutConst.right];
            // let damageNum = sub > 0 ? damageright : damageLeft;
            view["_winGroup" + LayoutConst.left].visible = view["_winGroup" + LayoutConst.right].visible = false;
            var isleftWin = leftData_2.result == 'win';
            var isrightWin = rightData_2.result == 'win';
            egret.Tween.get(leftrolegroup).to({ scaleX: 1.3, scaleY: 1.3 }, 250).call(function () {
            }, view).to({ x: leftrolex + 200, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(function () {
                leftprogress_1.setText(App.StringUtil.changeIntToText(leftData_2.curHp));
                leftprogress_1.setPercentage(leftData_2.curHp / leftData_2.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(leftData_2.curHp), 0)));
            }, view).to({ x: isleftWin ? leftrolex : leftrolex - 124, y: isleftWin ? view._rolePosY : view._rolePosY - 400, scaleX: isleftWin ? 1 : 0, scaleY: isleftWin ? 1 : 0, alpha: isleftWin ? 1 : 0, rotation: isleftWin ? 0 : 720 }, 600);
            var customClip_1 = ComponentManager.getCustomMovieClip('atk_anim_', 7, 70);
            customClip_1.width = 185;
            customClip_1.height = 186;
            customClip_1.anchorOffsetX = customClip_1.width / 2;
            customClip_1.anchorOffsetY = customClip_1.height / 2;
            customClip_1.setScale(2);
            customClip_1.setEndCallBack(function () {
                view.removeChild(customClip_1);
                customClip_1 = null;
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, customClip_1, view, [320, view._rolePosY + view._midGroupleft.y - 200]);
            customClip_1.visible = false;
            customClip_1.x = 320;
            view.addChild(customClip_1);
            egret.Tween.get(rightrolegroup).to({ scaleX: 1.2, scaleY: 1.2 }, 250).call(function () {
            }, view).to({ x: rightrolex - 200, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(function () {
                //伤害	
                customClip_1.visible = true;
                customClip_1.playWithTime(1);
                customClip_1.goToAndPlay(0);
                rightprogress_1.setText(App.StringUtil.changeIntToText(rightData_2.curHp));
                rightprogress_1.setPercentage(rightData_2.curHp / rightData_2.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(rightData_2.curHp), 0)));
            }, view).to({ x: isrightWin ? rightrolex : rightrolex + 124, y: isrightWin ? view._rolePosY : view._rolePosY - 400, scaleX: isrightWin ? 1 : 0, scaleY: isrightWin ? 1 : 0, alpha: isrightWin ? 1 : 0, rotation: isrightWin ? 0 : 720 }, 600).wait(800).call(function () {
                ++view._round;
                view._together = false;
                if (leftData_2.change && rightData_2.change) {
                    view.rightWin = view.leftWin = 0;
                    view._together = true;
                    view._flag = false;
                    if (view._roundLog[view._round]) {
                        var leftdata = view._roundLog[view._round][LayoutConst.left];
                        if (leftdata && leftdata.weaponDps) {
                            _this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
                        }
                        var rightdata = view._roundLog[view._round][LayoutConst.right];
                        if (rightdata && rightdata.weaponDps) {
                            _this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
                        }
                    }
                    view._showSkin = _this._skinEquip.length;
                    if (_this._skinEquip.length) {
                        if (_this._skinEquip.length == 2) {
                            view.changeTween("left", leftData_2.isWinMax, true);
                        }
                        else {
                            var leftdata = view._roundLog[view._round][LayoutConst.left];
                            if (leftdata && leftdata.skin) {
                                view.changeTween("left", leftData_2.isWinMax, true);
                            }
                            else {
                                view.changeTween("right", rightData_2.isWinMax, true);
                            }
                        }
                    }
                    else {
                        view.changeTween("left", leftData_2.isWinMax);
                        view.changeTween("right", rightData_2.isWinMax);
                    }
                }
                else if (leftData_2.change) {
                    view.leftWin = 0;
                    if (view._roundLog[view._round]) {
                        var leftdata = view._roundLog[view._round][LayoutConst.left];
                        if (leftdata && leftdata.weaponDps) {
                            _this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
                        }
                    }
                    view._showSkin = _this._skinEquip.length;
                    if (_this._skinEquip.length) {
                        view.changeTween("left", leftData_2.isWinMax, true);
                    }
                    else {
                        view.changeTween("left", leftData_2.isWinMax);
                    }
                }
                else {
                    view.rightWin = 0;
                    if (view._roundLog[view._round]) {
                        var rightdata = view._roundLog[view._round][LayoutConst.right];
                        if (rightdata && rightdata.weaponDps) {
                            _this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
                        }
                    }
                    view._showSkin = _this._skinEquip.length;
                    if (_this._skinEquip.length) {
                        view.changeTween("right", rightData_2.isWinMax, true);
                    }
                    else {
                        view.changeTween("right", rightData_2.isWinMax);
                    }
                }
            }, view);
        }
    };
    //转场特效
    AcConquerMainLandWarShowView.prototype.changeTween = function (type, winChange, showskin, showskinfunc) {
        var view = this;
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var list = view["_memberList" + type];
        var roundData = view._roundLog[view._round];
        var rolex = view["_" + type + "rolePosX"];
        var rolegroup = view["_roleGroup" + type];
        var aureoleClip = view["_servantClip" + type];
        if (winChange) {
            egret.Tween.get(view._winGroup).to({ alpha: 1 }, 500).wait(400).to({ alpha: 0 }, 500).call(function () {
                egret.Tween.removeTweens(view._winGroup);
                aureoleClip.alpha = 0;
                egret.Tween.get(rolegroup).to({ x: isOnleft ? rolex - 248 : rolex + 248, y: view._rolePosY }, 250).call(function () {
                    if (showskin) {
                        view.moveList(type, showskin, showskinfunc);
                    }
                    else {
                        view.moveList(type, showskin, showskinfunc);
                    }
                }, view);
            }, view);
        }
        else {
            egret.Tween.get(rolegroup).wait(250).call(function () {
                view.moveList(type, showskin, showskinfunc);
            }, view);
        }
    };
    AcConquerMainLandWarShowView.prototype.moveList = function (type, showskin, showskinfunc) {
        var view = this;
        var isOnleft = type == LayoutConst.left;
        var list = view["_memberList" + type];
        var roundData = view._roundLog[view._round];
        var rolex = view["_" + type + "rolePosX"];
        var idx = view["_" + type + "Idx"];
        var item = list.getItemByIndex(idx);
        if (item) {
            item.refresh(function () {
                var speed = 0.8;
                egret.Tween.get(item).to({ y: item.y + 91 }, 91 / speed).call(function () {
                    egret.Tween.removeTweens(item);
                    list.hideItem(idx);
                    --view["_" + type + "Idx"];
                    if (view["_" + type + "Idx"] < 0) {
                        view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
                    }
                    else {
                        var _loop_3 = function (i) {
                            var unit = list._scrollListItemArr[i];
                            if (unit) {
                                list.showItem(i);
                                var posy = unit.y;
                                egret.Tween.get(unit).to({ y: posy + 91 }, 91 / speed).call(function () {
                                    egret.Tween.removeTweens(unit);
                                    if (i == 0) {
                                        view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
                                    }
                                }, view);
                            }
                            else {
                                view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
                            }
                        };
                        //门客列表
                        for (var i = view["_" + type + "Idx"]; i >= 0; --i) {
                            _loop_3(i);
                        }
                    }
                }, view);
            }, view);
        }
        else {
            view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
        }
    };
    AcConquerMainLandWarShowView.prototype.checkWin = function () {
        var view = this;
        var endFlag = true;
        var roundData = view._roundLog[view._round];
        if (roundData) {
            endFlag = false;
        }
        return endFlag;
    };
    AcConquerMainLandWarShowView.prototype.tick = function () {
        var view = this;
    };
    AcConquerMainLandWarShowView.prototype.getResourceList = function () {
        var code = this.uiCode;
        return _super.prototype.getResourceList.call(this).concat([
            "mlfightbg-" + code, 'awlsheng', 'awnamebg1', 'awnamebg2', "specialview_commoni_namebg",
            'crossservantvsmask1', 'crossservantvsmask2', "acwealthcarpeffect",
            'progress3_bg', 'progress8', 'crossservantrulevs', 'damage_fnt', 'acmazeview_textbg',
            "mlfightmask-" + code, "mlfighttitle-" + code, "servantpkduizhan", "servantpkxunhuan", "skinshowkuang3",
        ]);
    };
    AcConquerMainLandWarShowView.prototype.getRuleInfo = function () {
        return null;
    };
    AcConquerMainLandWarShowView.prototype.getTitleStr = function () {
        return null;
    };
    AcConquerMainLandWarShowView.prototype.getTitleBgName = function () {
        return null;
    };
    AcConquerMainLandWarShowView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    AcConquerMainLandWarShowView.prototype.closeHandler = function () {
        var view = this;
        view.skipFight();
    };
    AcConquerMainLandWarShowView.prototype.dispose = function () {
        var view = this;
        var arr = [LayoutConst.left, LayoutConst.right];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var type = arr_1[_i];
            egret.Tween.removeTweens(view["_servantRole" + type]);
            BaseLoadBitmap.release(view["_servantRole" + type]);
            view["_servantRole" + type] = null;
            view["_servantClip" + type].dispose();
            view["_servantClip" + type] = null;
            view["_roleGroup" + type] = null;
            view["_midGroup" + type] = null;
            view["_playerNameTxt" + type] = null;
            view["_playerProgress" + type] = null;
            view["_winBitMapTxt" + type] = null;
            view["_winGroup" + type] = null;
            view["_memberList" + type] = null;
            view["_winBitMap" + type] = null;
            view["skinnamebg" + type] = null;
            view["_skinnameTxt" + type] = null;
        }
        view._leftIdx = view._rightIdx = 0;
        view._winFlag = '';
        view._leftrolePosX = 0;
        view._rightrolePosX = 0;
        view._rolePosY = 0;
        view._scrollY = 0;
        view._round = 0;
        view._log = {};
        view._damageLog = {};
        view._roundLog = {};
        view._leftLog = [];
        view._rightLog = [];
        view._leftvsInfo = {};
        view._rightvsInfo = {};
        view._lunkong = false;
        view._flag = false;
        view._vsImg = null;
        view._skinEquip = [];
        view._showSkin = 0;
        view._together = false;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandWarShowView;
}(CommonView));
__reflect(AcConquerMainLandWarShowView.prototype, "AcConquerMainLandWarShowView");
//# sourceMappingURL=AcConquerMainLandWarShowView.js.map