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
 * 帮会战斗演示界面
 * author qianjun
 */
var AcCrossServerHegemonyBattleShowView = (function (_super) {
    __extends(AcCrossServerHegemonyBattleShowView, _super);
    function AcCrossServerHegemonyBattleShowView() {
        var _this = _super.call(this) || this;
        _this._servantRoleleft = null;
        _this._servantRoleright = null;
        _this._servantClipleft = null;
        _this._servantClipright = null;
        _this._roleGroupleft = null;
        _this._roleGroupright = null;
        _this._midGroupleft = null;
        _this._midGroupright = null;
        _this._playerNameTxtleft = null;
        _this._playerNameTxtright = null;
        _this._playerProgressleft = null;
        _this._playerProgressright = null;
        _this._winBitMapTxtleft = null;
        _this._winBitMapTxtright = null;
        _this._winGroupleft = null;
        _this._winGroupright = null;
        _this._planDescBgleft = null;
        _this._planDescBgright = null;
        _this._planDescArrowleft = null;
        _this._planDescArrowright = null;
        _this._planDescTxtleft = null;
        _this._planDescTxtright = null;
        _this._planNameTxtleft = null;
        _this._planNameTxtright = null;
        _this._planGroupleft = null;
        _this._planGroupright = null;
        _this._memberListleft = null;
        _this._memberListright = null;
        _this._damageTxtGroup = null;
        _this._damageScrollView = null;
        _this._arrowleft = null;
        _this._arrowright = null;
        _this._buffTxtleft = null;
        _this._buffTxtright = null;
        _this._skinnamebgleft = null;
        _this._skinnamebgright = null;
        _this._skinnameTxtleft = null;
        _this._skinnameTxtright = null;
        _this._leftIdx = 0;
        _this._rightIdx = 0;
        _this._winFlag = '';
        _this._rolePosX = 0;
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
        _this._serverWin = '';
        _this._skinEquip = [];
        _this._showSkin = 0;
        _this.isover = false;
        _this._self = false;
        _this.flag = false;
        _this.buff = false;
        //文本消息 type 1入场 2出战 3击败 4退败
        _this._scrollIdx = 0;
        _this._messageIdx = 0;
        _this.leftWin = 0;
        _this.rightWin = 0;
        _this._together = false;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyBattleShowView.prototype, "api", {
        get: function () {
            return Api.allianceWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyBattleShowView.prototype.getSoundBgName = function () {
        return 'music_atkrace';
    };
    AcCrossServerHegemonyBattleShowView.prototype.getRequestData = function () {
        var view = this;
        if (view.param.data.history || view.param.data.test) {
            return null;
        }
        else {
            return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL, requestData: {
                    activeId: view.param.data.activeId,
                    allianceid: view.param.data.allianceid,
                    rid: view.param.data.rid,
                } };
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.receiveData = function (rdata) {
        var view = this;
        var test = view.param.data.test;
        var arr = ['left', 'right'];
        // if(!rdata.data.data.wardetail.length){
        // 	return;
        // }r
        if (!test && (!rdata || !rdata.ret)) {
            return;
        }
        var data = test ? rdata.data : rdata.data.data.wardetail[0]; // rdata.data;
        //检测 只要有一方为空，直接战报结果
        if (Object.keys(data.tinfo).length == 0 || !data.info || Object.keys(data.info).length == 0 || !data.tinfo.info || Object.keys(data.tinfo.info).length == 0) {
            var Win = Number(data.win);
            var tipsStr = LanguageManager.getlocal('acCrossServerHegemonyChangeTip6');
            if (Win <= 0) {
                tipsStr = LanguageManager.getlocal('acCrossServerHegemonyChangeTip7');
            }
            if ((Object.keys(data.tinfo).length > 0 && data.tinfo.info && Object.keys(data.tinfo.info).length > 0) || (data.info && Object.keys(data.info).length > 0)) {
                tipsStr = LanguageManager.getlocal('acCrossServerHegemonyChangeTip4');
                if (Win <= 0) {
                    tipsStr = LanguageManager.getlocal('acCrossServerHegemonyChangeTip5');
                }
            }
            App.CommonUtil.showTip(tipsStr);
            this.isover = true;
        }
        else {
            view._self = false;
            view._lunkong = false;
            if (Object.keys(data.tinfo).length == 0) {
                view._lunkong = true;
            }
            for (var i in arr) {
                var info = null;
                var sourceObj = null;
                if (Number(data.tinfo.id) == Number(Api.allianceVoApi.getAllianceVo().id)) {
                    view._self = true;
                    sourceObj = Number(i) == 0 ? data.tinfo : data;
                    info = Number(i) == 0 ? data.tinfo.info : data.info;
                }
                else {
                    sourceObj = Number(i) == 0 ? data : data.tinfo;
                    info = Number(i) == 0 ? data.info : data.tinfo.info;
                }
                var obj = {};
                var log = [];
                var total = 0;
                view["_" + arr[i] + "Log"] = [];
                view["_" + arr[i] + "vsInfo"] = {};
                //对阵门客
                for (var j in info) {
                    var unit = info[j];
                    total += unit.dps;
                    // let extra = view.api.getAlliancePosAdd(sourceObj.level, unit.po);
                    log.push({
                        servantId: unit.servant,
                        plan: unit.stra,
                        attr: unit.dps,
                        name: unit.name,
                        uid: j,
                        curHp: unit.dps,
                        allipos: unit.po,
                        alliname: sourceObj.name,
                        zid: sourceObj.zid,
                        time: unit.st,
                        type: arr[i],
                        skin: unit.servantskin,
                        weaponDps: unit.weaponDps,
                    });
                    if (unit.stra == 1 && unit.servant2) {
                        log.push({
                            servantId: unit.servant2,
                            plan: 0,
                            attr: unit.dps2,
                            name: unit.name,
                            uid: j,
                            curHp: unit.dps2,
                            allipos: unit.po,
                            alliname: sourceObj.name,
                            zid: sourceObj.zid,
                            time: unit.st + 1,
                            type: arr[i],
                            skin: unit.servantskin2,
                            weaponDps: unit.weaponDps,
                        });
                    }
                }
                log.sort(function (a, b) {
                    if (a.allipos == b.allipos) {
                        if (a.time == b.time) {
                            return a.uid - b.uid;
                        }
                        else {
                            return a.time - b.time;
                        }
                    }
                    else {
                        return a.allipos - b.allipos;
                    }
                });
                view["_" + arr[i] + "Log"] = log;
                obj['server'] = sourceObj.zid;
                obj['allianceName'] = sourceObj.name ? sourceObj.name : LanguageManager.getlocal('nothing');
                obj['attendLog'] = log;
                obj['totalattr'] = total;
                obj['allilevel'] = sourceObj.level;
                obj['score'] = sourceObj.score;
                obj['type'] = arr[i];
                obj['id'] = sourceObj.id;
                view["_" + arr[i] + "vsInfo"] = obj;
            }
            if (view._self || data.win == 0) {
                view._serverWin = 'right';
            }
            else {
                view._serverWin = 'left';
            }
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.getBgName = function () {
        return 'alliancewarbg2';
    };
    AcCrossServerHegemonyBattleShowView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;
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
    AcCrossServerHegemonyBattleShowView.prototype.initView = function () {
        var view = this;
        if (view.param.data.history) {
            view.receiveData({
                ret: true,
                data: view.param.data.history
            });
        }
        if (view.param.data.test) {
            view.receiveData({
                ret: true,
                data: {
                    id: Api.allianceVoApi.getAllianceVo().id,
                    zid: Api.mergeServerVoApi.getTrueZid(),
                    name: Api.allianceVoApi.getAllianceVo().name,
                    "info": { "1000000589": { "stra": 2, "name": "百特9", "po": 4, "atkEffect": 0, "st": 1572334853, "servant": "1006", "dps": 35070 }, "1000000584": { "stra": 1, "name": "百特4", "dps2": 30060, "atkEffect": 0, "st": 1572334539, "servant2": "1002", "dps": 35070, "servant": "1006", "po": 4 }, "1000000582": { "dps": 195390, "name": "百特2", "atkEffect": 0, "st": 1572332942, "servant": "1040", "po": 4 }, "1000000583": { "dps": 195390, "name": "百特3", "atkEffect": 0, "st": 1572333003, "servant": "1040", "po": 4 }, "1000000588": { "dps": 35070, "name": "百特8", "atkEffect": 0, "st": 1572334823, "servant": "1006", "po": 4 }, "1000000586": { "stra": 1, "name": "百特6", "dps2": 30060, "atkEffect": 0, "st": 1572334698, "servant2": "1002", "dps": 35070, "servant": "1006", "po": 4 }, "1000000553": { "stra": 1, "name": "祝清嘉", "dps2": 298946, "atkEffect": 0.03, "st": 1572332675, "servant2": "1040", "dps": 18222654, "servant": "1041", "po": 1 }, "1000000585": { "dps": 195390, "name": "百特5", "atkEffect": 0, "st": 1572334617, "servant": "1041", "po": 4 }, "1000000587": { "stra": 1, "name": "百特7", "dps2": 40080, "atkEffect": 0, "st": 1572334762, "servant2": "1010", "dps": 45090, "servant": "1014", "po": 4 }, "1000000581": { "dps": 195390, "name": "百特1", "atkEffect": 0, "st": 1572332719, "servant": "1040", "po": 4 } },
                    "tinfo": {
                        "id": "6400020",
                        "zid": "62",
                        "score": "122",
                        "oinfo": {
                            "ldtitle": "",
                            "score": "122",
                            "lastscore": "130",
                            "lastinfo": {},
                            "ldlevel": 16,
                            "pic": 4
                        },
                        "level": "8",
                        "info": { "1000000591": { "dps": 40080, "name": "百特11", "atkEffect": 0, "st": 1572334964, "servant": "1010", "po": 4 }, "1000000600": { "dps": 40080, "name": "百特19", "atkEffect": 0, "st": 1572335565, "po": 4, "servant": "1010" }, "1000000590": { "stra": 1, "name": "百特10", "dps2": 293085, "atkEffect": 0, "st": 1572334913, "servant2": "1040", "dps": 345690, "servant": "1042", "po": 1 }, "1000000599": { "dps": 40080, "name": "百特18", "atkEffect": 0, "st": 1572335505, "servant": "1010", "po": 4 }, "1000000594": { "dps": 40080, "name": "百特13", "atkEffect": 0, "st": 1572335034, "servant": "1010", "po": 4 }, "1000000598": { "dps": 40080, "name": "百特17", "atkEffect": 0, "st": 1572335402, "servant": "1010", "po": 4 }, "1000000597": { "dps": 40080, "name": "百特16", "atkEffect": 0, "st": 1572335259, "servant": "1010", "po": 4 }, "1000000595": { "dps": 40080, "name": "百特14", "atkEffect": 0, "st": 1572335159, "servant": "1010", "po": 4 }, "1000000593": { "stra": 1, "name": "百特12", "dps2": 35070, "atkEffect": 0, "st": 1572334993, "servant2": "1006", "dps": 40080, "servant": "1010", "po": 4 }, "1000000596": { "dps": 40080, "name": "百特15", "atkEffect": 0, "st": 1572335192, "servant": "1010", "po": 4 } },
                        "name": "浩气三界"
                    },
                    score: 100,
                    level: Api.allianceVoApi.getAllianceVo().level,
                }
            });
        }
        if (this.isover) {
            this.hide();
            return;
        }
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bottomgroup = new BaseDisplayObjectContainer();
        bottomgroup.width = GameConfig.stageWidth;
        bottomgroup.height = 190;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomgroup, view);
        view.addChild(bottomgroup);
        var bottombg = BaseBitmap.create('public_9_downbg');
        bottombg.width = bottomgroup.width;
        bottombg.height = bottomgroup.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottombg, bottomgroup, [0, 0], true);
        bottomgroup.addChild(bottombg);
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 640;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoGroup, bottomBg, [0,45]);
        view.addChild(infoGroup);
        view._damageTxtGroup = infoGroup;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottombg.height - 20);
        infoGroup.y = 0;
        var scrollView = ComponentManager.getScrollView(infoGroup, rect);
        scrollView.y = bottomgroup.y + 10;
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        view.addChild(scrollView);
        view._damageScrollView = scrollView;
        view.createWarInfo(LayoutConst.left);
        view.createWarInfo(LayoutConst.right);
        var logo = BaseBitmap.create('achegemony_logo-1');
        logo.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, logo, view);
        view.addChild(logo);
        var crossservantrulevs = BaseBitmap.create('crossservantrulevs');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, crossservantrulevs, bottomgroup, [15, -crossservantrulevs.height]);
        view.addChild(crossservantrulevs);
        view.setChildIndex(view.closeBtn, 9999);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-25,-20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0, 0]);
        view.beginWarLog();
    };
    AcCrossServerHegemonyBattleShowView.prototype.createWarInfo = function (type) {
        var view = this;
        var blue = type == LayoutConst.left;
        var wardata = view["_" + type + "vsInfo"];
        var empty = view._lunkong && !blue;
        var topgroup = new BaseDisplayObjectContainer();
        topgroup.width = GameConfig.stageWidth / 2;
        topgroup.height = 140;
        App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.lefttop : LayoutConst.righttop, topgroup, view);
        view.addChild(topgroup);
        //职员信息
        var infobg = BaseBitmap.create(blue ? 'crossservantvsmask2' : 'crossservantvsmask1');
        infobg.height = 140;
        infobg.anchorOffsetY = infobg.height / 2;
        infobg.scaleY = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infobg, topgroup, [0, 0], true);
        topgroup.addChild(infobg);
        //帮会信息
        var servernamebg = BaseBitmap.create(blue ? 'awserverbg2' : 'awserverbg1');
        App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.lefttop : LayoutConst.righttop, servernamebg, infobg, [81, 40]);
        topgroup.addChild(servernamebg);
        var servernameTxt = ComponentManager.getBitmapText(Api.mergeServerVoApi.getAfterMergeSeverName(null, true, empty ? 0 : wardata.server), TextFieldConst.FONTNAME_ITEMTIP);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servernameTxt, servernamebg);
        topgroup.addChild(servernameTxt);
        servernameTxt.visible = !empty;
        var allinamebg = BaseBitmap.create(blue ? 'awservernamebg2' : 'awservernamebg1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, allinamebg, servernamebg, [0, servernamebg.height - 3]);
        topgroup.addChild(allinamebg);
        var allinameTxt = ComponentManager.getTextField(empty ? '' : wardata.allianceName, 24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, allinamebg);
        topgroup.addChild(allinameTxt);
        var memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarAttendNum', [empty ? 0 : wardata.attendLog.length.toString()]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, memberNumTxt, allinamebg, [0, allinamebg.height - 2]);
        topgroup.addChild(memberNumTxt);
        //人物形象
        var midgroup = new BaseDisplayObjectContainer();
        midgroup.width = 260;
        midgroup.height = 460;
        App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.leftbottom : LayoutConst.rightbottom, midgroup, view, [0, 200]);
        view.addChild(midgroup);
        view["_midGroup" + type] = midgroup;
        var roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = 248;
        roleContainer.height = 287;
        roleContainer.anchorOffsetX = roleContainer.width / 2;
        roleContainer.anchorOffsetY = roleContainer.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, midgroup, [0, 0], true);
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
        view._rolePosX = roleContainer.x;
        view._rolePosY = roleContainer.y;
        view["_servantRole" + type] = role;
        //计策
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
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = 200;
        descTxt.lineSpacing = 5;
        plangroup.addChild(descTxt);
        view["_planDescTxt" + type] = descTxt;
        var planNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 18, TextFieldConst.COLOR_WARN_GREEN2);
        plangroup.addChild(planNameTxt);
        view["_planNameTxt" + type] = planNameTxt;
        descBg.height = descTxt.textHeight + 45;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, plangroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25, descBg.height - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [0, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, planNameTxt, descBg, [20, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, plangroup, midgroup, [0, -plangroup.height]);
        //连胜场数
        var wingroup = new BaseDisplayObjectContainer();
        wingroup.width = 90;
        wingroup.height = 90;
        App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.lefttop : LayoutConst.righttop, wingroup, midgroup, [10, 0], true);
        midgroup.addChild(wingroup);
        view["_winGroup" + type] = wingroup;
        wingroup.visible = false;
        var winbg = BaseBitmap.create("acmazeview_textbg");
        winbg.anchorOffsetX = winbg.width / 2;
        winbg.scaleX = blue ? 1 : -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, (blue ? [-25.5, -25] : [-75.5, -25]), true);
        wingroup.addChild(winbg);
        var winBg = BaseBitmap.create("awlsheng");
        winBg.anchorOffsetX = winBg.width / 2;
        winBg.rotation = blue ? 0 : 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBg, wingroup, (blue ? [30, 0] : [34, 18]), true);
        wingroup.addChild(winBg);
        var winBitMapTxt = ComponentManager.getBitmapText('2', TextFieldConst.FONTNAME_ITEMTIP);
        winBitMapTxt.rotation = blue ? -30 : 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBitMapTxt, wingroup, (blue ? [10, 33] : [10, 0]), true);
        view["_winBitMapTxt" + type] = winBitMapTxt;
        wingroup.addChild(winBitMapTxt);
        var playernamebg = BaseBitmap.create(blue ? 'awnamebg2' : 'awnamebg1');
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
        var arrowImg = BaseBitmap.create('');
        var buffTxt = ComponentManager.getTextField('', 18);
        view["_arrow" + type] = arrowImg;
        view["_buffTxt" + type] = buffTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, buffTxt, progress);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrowImg, buffTxt);
        arrowImg.visible = buffTxt.visible = false;
        midgroup.addChild(arrowImg);
        midgroup.addChild(buffTxt);
        var awpositionbg = BaseBitmap.create(blue ? 'awpositionbgblue' : 'awpositionbgred');
        awpositionbg.width = 260;
        awpositionbg.height = 105;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, awpositionbg, progress, [0, progress.height + 7]);
        midgroup.addChild(awpositionbg);
        var tmpRect = new egret.Rectangle(0, 0, awpositionbg.width - 10, awpositionbg.height - 25);
        var arr = Api.chatVoApi.arr_clone(wardata.attendLog);
        for (var i = 0; i < 3; ++i) {
            arr.push({ empty: true });
        }
        var scrollList = ComponentManager.getScrollList(AllianceWarShowPlayerInfoItem, arr, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awpositionbg);
        midgroup.addChild(scrollList);
        scrollList.verticalScrollPolicy = 'off';
        scrollList.bounces = false;
        view["_memberList" + type] = scrollList;
    };
    AcCrossServerHegemonyBattleShowView.prototype.beginWarLog = function () {
        var view = this;
        view._skinEquip = [];
        var leftlog = view._leftLog;
        var rightlog = view._rightLog;
        view._log = {};
        view._log['left'] = leftlog;
        view._log['right'] = rightlog;
        view._roundLog = {};
        if (view._lunkong) {
            view._winFlag = 'left';
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
                    plan: leftlog[0].plan,
                    allipos: leftlog[0].allipos,
                    alliname: leftlog[0].alliname,
                    skin: leftlog[0].skin,
                    weaponDps: leftlog[0].weaponDps
                }
            };
            view.showRoundAnti(LayoutConst.left, view.startMove, view);
        }
        else {
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
            view.freshText('1', [view._leftvsInfo.allianceName, App.StringUtil.changeIntToText(Math.floor(view._leftvsInfo.totalattr))], true);
            view.freshText('1', [view._rightvsInfo.allianceName, App.StringUtil.changeIntToText(Math.floor(view._rightvsInfo.totalattr))], false);
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
                    plan: 0,
                    allipos: leftlog[0].allipos,
                    alliname: leftlog[0].alliname,
                    skin: leftlog[0].skin,
                    weaponDps: leftlog[0].weaponDps
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
                    plan: 0,
                    allipos: rightlog[0].allipos,
                    alliname: rightlog[0].alliname,
                    skin: rightlog[0].skin,
                    weaponDps: rightlog[0].weaponDps
                },
            };
            var winflag = false;
            while (!winflag) {
                var view_1 = this;
                var leftData = view_1._log[LayoutConst.left][leftidx];
                var rightData = view_1._log[LayoutConst.right][rightidx];
                var leftExtra = 0;
                var leftplan = 0;
                if (!leftData["planEffect"]) {
                    leftData["winMax"] = Config.AlliancewarCfg.servantMaxWin;
                    leftExtra = view_1.calExtraDamage(leftData.plan, rightData.curHp);
                    view_1.calPlanEffect(leftData, rightData);
                    leftData["planEffect"] = true;
                    leftplan = leftData.plan;
                }
                var rightExtra = 0;
                var rightplan = 0;
                if (!rightData["planEffect"]) {
                    rightData["winMax"] = Config.AlliancewarCfg.servantMaxWin;
                    rightExtra = view_1.calExtraDamage(rightData.plan, leftData.curHp);
                    view_1.calPlanEffect(rightData, leftData);
                    rightData["planEffect"] = true;
                    rightplan = rightData.plan;
                }
                var leftHp = leftData.curHp;
                var rightHp = rightData.curHp;
                var sub = leftHp - rightHp;
                if (!view_1._damageLog['left'][leftData.uid]) {
                    view_1._damageLog['left'][leftData.uid] = {};
                    view_1._damageLog['left'][leftData.uid]['damage'] = 0;
                    view_1._damageLog['left'][leftData.uid]['win'] = {};
                    view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId] = 0;
                    view_1._damageLog['left'][leftData.uid]['name'] = leftData.name;
                }
                if (!view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId]) {
                    view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId] = 0;
                }
                view_1._damageLog['left'][leftData.uid]['damage'] += ((sub > 0 ? rightHp : leftHp) + leftExtra);
                if (!view_1._damageLog['right'][rightData.uid]) {
                    view_1._damageLog['right'][rightData.uid] = {};
                    view_1._damageLog['right'][rightData.uid]['damage'] = 0;
                    view_1._damageLog['right'][rightData.uid]['win'] = {};
                    view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId] = 0;
                    view_1._damageLog['right'][rightData.uid]['name'] = rightData.name;
                }
                if (!view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId]) {
                    view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId] = 0;
                }
                view_1._damageLog['right'][rightData.uid]['damage'] += ((sub < 0 ? leftHp : rightHp) + rightExtra);
                leftData.curHp = Math.max(sub, 0);
                rightData.curHp = Math.max(0, -sub);
                var leftchange = false;
                var rightchange = false;
                var leftresult = '';
                var rightresult = '';
                var lefttmpx = leftidx;
                var righttmpx = rightidx;
                var calLeftIdx = leftidx;
                var calRightIdx = rightidx;
                if (sub > 0) {
                    ++rightidx;
                    ++calRightIdx;
                    rightchange = true;
                    leftresult = 'win';
                    view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId] += 1;
                    if (view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId] >= leftData["winMax"] || leftData.plan == 5) {
                        ++leftidx;
                        ++calLeftIdx;
                        leftchange = true;
                    }
                }
                else if (sub < 0) {
                    ++leftidx;
                    ++calLeftIdx;
                    leftchange = true;
                    rightresult = 'win';
                    view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId] += 1;
                    if (view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId] >= rightData["winMax"] || rightData.plan == 5) {
                        ++rightidx;
                        ++calRightIdx;
                        rightchange = true;
                    }
                }
                else {
                    ++leftidx;
                    ++calLeftIdx;
                    leftchange = true;
                    ++rightidx;
                    ++calRightIdx;
                    rightchange = true;
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
                        win: view_1._damageLog['left'][leftData.uid]['win'][leftData.servantId],
                        change: leftchange,
                        result: leftresult,
                        leftIdx: lefttmpx,
                        plan: leftplan,
                        allipos: leftData.allipos,
                        alliname: leftData.alliname,
                        skin: leftData.skin,
                        weaponDps: leftData.weaponDps,
                    },
                    right: {
                        servantId: rightData.servantId,
                        name: rightData.name,
                        prevHp: rightHp,
                        curHp: rightData.curHp,
                        attr: rightData.attr,
                        dps: sub > 0 ? rightHp : leftHp,
                        win: view_1._damageLog['right'][rightData.uid]['win'][rightData.servantId],
                        change: rightchange,
                        result: rightresult,
                        rightIdx: righttmpx,
                        plan: rightplan,
                        allipos: rightData.allipos,
                        alliname: rightData.alliname,
                        skin: rightData.skin,
                        weaponDps: rightData.weaponDps,
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
                    unit.planEffect = false;
                    unit.winMax = Config.AlliancewarCfg.servantMaxWin;
                }
            }
            view.leftWin = view.rightWin = 0;
            view._round = 1;
            view._together = true;
            view.flag = false;
            view.buff = false;
            var leftdata = view._roundLog[view._round][LayoutConst.left];
            if (leftdata && leftdata.weaponDps) {
                this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
            }
            var rightdata = view._roundLog[view._round][LayoutConst.right];
            if (rightdata && rightdata.weaponDps) {
                this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
            }
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
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.calPlanEffect = function (sourceData, TargetData) {
        var view = this;
        var cfg = Config.AlliancewarCfg.getItemList();
        var info = cfg[sourceData.plan - 1];
        switch (sourceData.plan) {
            case 2:
            case 3:
            case 5:
                sourceData.curHp *= (1 + info.powerup);
                break;
            case 4:
                TargetData.curHp *= (1 - info.powerdown);
                break;
            case 6:
                sourceData.winMax += info.wins;
                break;
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.calExtraDamage = function (plan, curhp) {
        var view = this;
        var cfg = Config.AlliancewarCfg.getItemList();
        var extra = 0;
        if (plan) {
            var unit = cfg[plan - 1];
            if (unit.powerdown > 0) {
                extra = unit.powerdown * curhp;
            }
        }
        return extra;
    };
    AcCrossServerHegemonyBattleShowView.prototype.showRoundAnti = function (type, func, obj, showskin, showskinfunc) {
        var view = this;
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var playerNameTxt = view["_playerNameTxt" + type];
        var skinNameTxt = view["_skinnameTxt" + type];
        var skinNameBg = view["_skinnamebg" + type];
        var progress = view["_playerProgress" + type];
        var list = view["_memberList" + type];
        var plangroup = view["_planGroup" + type];
        var roundData = view._roundLog[view._round];
        var aureoleClip = view["_servantClip" + type];
        var rolegroup = view["_roleGroup" + type];
        if (roundData) {
            var data_1 = view._roundLog[view._round][type];
            var curIdx_1 = data_1[type + "Idx"];
            //上阵效果
            var servantInfo_1 = Config.ServantCfg.getServantItemById(data_1.servantId);
            rolegroup.y = view._rolePosY;
            var leftdata = view._roundLog[view._round]['left'];
            var rightdata = view._roundLog[view._round]['right'];
            var skip_1 = false;
            if (view._together && ((leftdata.plan == 4 && rightdata.plan > 1 && rightdata.plan < 6) || (rightdata.plan == 4 && leftdata.plan > 1 && leftdata.plan < 6))) {
                if (!view.buff) {
                    view.buff = true;
                    skip_1 = true;
                }
            }
            egret.Tween.get(rolegroup).to({ x: isOnleft ? -124 : 384, y: view._rolePosY }, 500).call(function () {
                rolegroup.setScale(1);
                aureoleClip.alpha = 0;
                var img = servantInfo_1.fullIcon;
                if (data_1.skin) {
                    img = Config.ServantskinCfg.getServantSkinItemById(data_1.skin).body;
                }
                skinNameBg.visible = skinNameTxt.visible = false;
                role.setload(img);
                view["_arrow" + type].visible = view["_buffTxt" + type].visible = false;
                view["_winGroup" + type].visible = false;
                rolegroup.alpha = 1;
            }, view).to({ x: view._rolePosX, y: view._rolePosY }, 500).call(function () {
                if (data_1.skin) {
                    aureoleClip.alpha = 1;
                }
                var item = list.getItemByIndex(curIdx_1);
                if (item) {
                    item.refreshTextColor();
                }
                playerNameTxt.text = data_1.name;
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(data_1.skin);
                if (data_1.skin && skincfg) {
                    skinNameTxt.text = skincfg.name;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinNameTxt, rolegroup);
                    skinNameBg.visible = skinNameTxt.visible = true;
                }
                else {
                    skinNameTxt.text = "";
                    skinNameBg.visible = skinNameTxt.visible = false;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
                list.setScrollTop(curIdx_1 * 25, 300);
                progress.setText(App.StringUtil.changeIntToText(data_1.attr));
                progress.setPercentage(data_1.attr / data_1.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data_1.attr), 0)));
                view.freshText('2', [data_1.alliname, LanguageManager.getlocal("allianceMemberPo" + item._data.allipos), data_1.name, servantInfo_1.name, (view.api.getAlliancePosAdd(view["_" + type + "vsInfo"].allilevel, item._data.allipos) * 100).toFixed(0), App.StringUtil.changeIntToText(Math.floor(data_1.attr))], type == 'left');
                if (showskin) {
                    view.showSkin(function () {
                        if (view._skinEquip.length == 1) {
                            view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, true, function () {
                                view.showNext(type, skip_1, func, obj);
                            });
                        }
                        else {
                            if (view._showSkin == 1) {
                                if (view._together) {
                                    view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, false, function () {
                                        view.showNext(type, skip_1, func, obj);
                                    });
                                }
                                else {
                                    view.showNext(type, skip_1, func, obj);
                                }
                            }
                            else {
                                if (showskinfunc) {
                                    showskinfunc.apply(view);
                                }
                                view.showNext(type, skip_1, func, obj);
                            }
                        }
                    });
                }
                else {
                    if (showskinfunc) {
                        showskinfunc.apply(view);
                    }
                    view.showNext(type, skip_1, func, obj);
                }
            }, view);
        }
        else {
            if (func) {
                func.apply(obj);
            }
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.showNext = function (type, skip, func, obj) {
        var view = this;
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var playerNameTxt = view["_playerNameTxt" + type];
        var skinNameTxt = view["_skinnameTxt" + type];
        var skinNameBg = view["_skinnamebg" + type];
        var progress = view["_playerProgress" + type];
        var list = view["_memberList" + type];
        var plangroup = view["_planGroup" + type];
        var roundData = view._roundLog[view._round];
        var data = view._roundLog[view._round][type];
        var curIdx = data[type + "Idx"];
        var servantInfo = Config.ServantCfg.getServantItemById(data.servantId);
        //计策使用
        if (data.plan && !skip) {
            if (view.buff) {
                view.buff = false;
                var first = type;
                if (data.plan == 4) {
                    first = type == 'left' ? 'right' : 'left';
                }
                view.showBuff2(first, func, obj);
            }
            else {
                view.showBuff(type, func, obj);
            }
        }
        else {
            if (view._together) {
                if (view.flag) {
                    view._together = false;
                    if (view._round == 1) {
                        view.startMove();
                    }
                    if (func) {
                        func.apply(obj);
                    }
                }
                else {
                    view.flag = true;
                }
            }
            else {
                if (func) {
                    func.apply(obj);
                }
            }
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.showBuff2 = function (type, func, obj) {
        var view = this;
        var data = view._roundLog[view._round][type];
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var playerNameTxt = view["_playerNameTxt" + type];
        var progress = view["_playerProgress" + type];
        var list = view["_memberList" + type];
        var plangroup = view["_planGroup" + type];
        var roundData = view._roundLog[view._round];
        view.freshPlanTxt(data.plan, type);
        var planImg = BaseLoadBitmap.create("itemicon220" + data.plan);
        planImg.width = planImg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planImg, view["_midGroup" + type], [0, 0], true);
        var tmpY = planImg.y;
        var plangbg = BaseBitmap.create('awplaneffect');
        plangbg.anchorOffsetX = plangbg.width / 2;
        plangbg.anchorOffsetY = plangbg.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, plangbg, planImg);
        egret.Tween.get(plangbg, { loop: true }).to({ rotation: 360 }, 10000);
        egret.Tween.get(planImg, { loop: true }).to({ y: tmpY + 10 }, 1000).to({ y: tmpY }, 1000);
        // egret.Tween.get(planImg,{loop : true}).to({y : tmpY + 10},1000).to({y : tmpY},1000);
        view["_midGroup" + type].addChild(plangbg);
        view["_midGroup" + type].addChild(planImg);
        egret.Tween.get(plangroup).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000).call(function () {
            planImg.visible = plangbg.visible = false;
            egret.Tween.removeTweens(plangbg);
            egret.Tween.removeTweens(planImg);
            view["_midGroup" + type].removeChild(plangbg);
            view["_midGroup" + type].removeChild(planImg);
            plangbg = null;
            planImg = null;
            var newType = type;
            var buff = 'buffeffect';
            if (data.plan == 4) {
                buff = 'debuffeffect';
                newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
                var buffeffect = view["_midGroup" + newType].getChildByName('buffeffect');
                if (buffeffect) {
                    buffeffect.stop();
                    view["_midGroup" + newType].removeChild(buffeffect);
                    buffeffect = null;
                }
            }
            var customClip = ComponentManager.getCustomMovieClip(buff, 8, 100);
            customClip.width = 283;
            customClip.height = 272;
            customClip.playWithTime(-1);
            customClip.name = 'buffeffect';
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view["_playerNameTxt" + newType], [0, view["_playerNameTxt" + newType].height - 20]);
            view["_midGroup" + newType].addChild(customClip);
            var posY = view["_arrow" + newType].y;
            var param = 0;
            var cfg = Config.AlliancewarCfg.getItemList();
            var tmp = cfg[data.plan - 1];
            switch (data.plan) {
                case 2:
                case 3:
                case 5:
                    param = tmp.powerup;
                    break;
                case 4:
                    param = tmp.powerdown;
                    break;
            }
            if (data.plan == 4) {
                var newdata = view._roundLog[view._round][newType];
                var hp = newdata.attr * (1 - param);
                view["_playerProgress" + newType].setText(App.StringUtil.changeIntToText(hp));
                view["_playerProgress" + newType].setPercentage(hp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
                newdata.attr = hp;
            }
            else if (data.plan >= 2 && data.plan <= 5) {
                var hp = data.attr * (1 + param);
                view["_playerProgress" + newType].setText(App.StringUtil.changeIntToText(hp));
                view["_playerProgress" + newType].setPercentage(hp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
                data.attr = hp;
            }
            view["_playerProgress" + newType].TweenTxt(200);
            egret.Tween.get(view["_arrow" + newType]).wait(100).call(function () {
                view["_arrow" + newType].visible = view["_buffTxt" + newType].visible = true;
            }, view).to({ y: posY - 10 }, 600).to({ y: posY }, 600).call(function () {
                //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
            }, view).wait(300).call(function () {
                view.buff = false;
                //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                view.showBuff(type == 'left' ? 'right' : 'left', func, obj);
            }, view);
        }, view);
    };
    AcCrossServerHegemonyBattleShowView.prototype.showBuff = function (type, func, obj) {
        var view = this;
        var data = view._roundLog[view._round][type];
        var role = view["_servantRole" + type];
        var isOnleft = type == LayoutConst.left;
        var playerNameTxt = view["_playerNameTxt" + type];
        var progress = view["_playerProgress" + type];
        var list = view["_memberList" + type];
        var plangroup = view["_planGroup" + type];
        var roundData = view._roundLog[view._round];
        view.freshPlanTxt(data.plan, type);
        var planImg = BaseLoadBitmap.create("itemicon220" + data.plan);
        planImg.width = planImg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planImg, view["_midGroup" + type], [0, 0], true);
        var tmpY = planImg.y;
        var plangbg = BaseBitmap.create('awplaneffect');
        plangbg.anchorOffsetX = plangbg.width / 2;
        plangbg.anchorOffsetY = plangbg.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, plangbg, planImg);
        egret.Tween.get(plangbg, { loop: true }).to({ rotation: 360 }, 10000);
        egret.Tween.get(planImg, { loop: true }).to({ y: tmpY + 10 }, 1000).to({ y: tmpY }, 1000);
        view["_midGroup" + type].addChild(plangbg);
        view["_midGroup" + type].addChild(planImg);
        egret.Tween.get(plangroup).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000).call(function () {
            planImg.visible = plangbg.visible = false;
            egret.Tween.removeTweens(plangbg);
            egret.Tween.removeTweens(planImg);
            view["_midGroup" + type].removeChild(plangbg);
            view["_midGroup" + type].removeChild(planImg);
            plangbg = null;
            planImg = null;
            if (data.plan == 1 || data.plan == 6) {
                if (view._together) {
                    if (view.flag) {
                        view._together = false;
                        if (view._round == 1) {
                            view.startMove();
                        }
                        if (func) {
                            func.apply(obj);
                        }
                    }
                    else {
                        view.flag = true;
                    }
                }
                else {
                    if (func) {
                        func.apply(obj);
                    }
                }
            }
            else {
                var newType_1 = type;
                if (data.plan == 4) {
                    newType_1 = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
                }
                var posY = view["_arrow" + newType_1].y;
                view["_playerProgress" + newType_1].TweenTxt(100);
                var buff = '';
                if (data.plan == 4) {
                    buff = 'debuffeffect';
                    var newdata = view._roundLog[view._round][newType_1];
                    view["_playerProgress" + newType_1].setText(App.StringUtil.changeIntToText(newdata.prevHp));
                    view["_playerProgress" + newType_1].setPercentage(newdata.prevHp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(newdata.prevHp), 0)));
                }
                else if (data.plan >= 2 && data.plan <= 5) {
                    buff = 'buffeffect';
                    view["_playerProgress" + newType_1].setText(App.StringUtil.changeIntToText(data.prevHp));
                    view["_playerProgress" + newType_1].setPercentage(data.prevHp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.prevHp), 0)));
                }
                var buffeffect = view["_midGroup" + newType_1].getChildByName('buffeffect');
                if (buffeffect) {
                    buffeffect.stop();
                    view["_midGroup" + newType_1].removeChild(buffeffect);
                    buffeffect = null;
                }
                var customClip = ComponentManager.getCustomMovieClip(buff, 8, 100);
                customClip.width = 283;
                customClip.height = 272;
                customClip.playWithTime(-1);
                customClip.name = 'buffeffect';
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view["_playerNameTxt" + newType_1], [0, view["_playerNameTxt" + newType_1].height - 20]);
                view["_midGroup" + newType_1].addChild(customClip);
                //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
                egret.Tween.get(view["_arrow" + newType_1]).wait(100).call(function () {
                    view["_arrow" + newType_1].visible = view["_buffTxt" + newType_1].visible = true;
                }, view).to({ y: posY - 10 }, 600).to({ y: posY }, 600).call(function () {
                }, view).wait(300).call(function () {
                    //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                    if (view._together) {
                        if (view.flag) {
                            view._together = false;
                            if (view._round == 1) {
                                view.startMove();
                            }
                            if (func) {
                                func.apply(obj);
                            }
                        }
                        else {
                            view.flag = true;
                        }
                    }
                    else {
                        if (func) {
                            func.apply(obj);
                        }
                    }
                }, view);
            }
        }, view);
    };
    AcCrossServerHegemonyBattleShowView.prototype.freshPlanTxt = function (plan, type) {
        var view = this;
        var plangroup = view["_planGroup" + type];
        var param;
        var cfg = Config.AlliancewarCfg.getItemList();
        var obj = cfg[plan - 1];
        for (var i in obj) {
            if (obj[i]) {
                param = obj[i];
                break;
            }
        }
        var arrow = '';
        switch (plan) {
            case 1:
                param = obj.moreguest;
                break;
            case 2:
            case 3:
            case 5:
                param = (obj.powerup * 100).toFixed(0);
                arrow = 'awuparrow';
                break;
            case 4:
                param = (obj.powerdown * 100).toFixed(0);
                ;
                arrow = 'awdownarrow';
                break;
            case 6:
                param = obj.wins;
                break;
        }
        var rid = App.MathUtil.getRandom(1, 4);
        view["_planDescTxt" + type].text = LanguageManager.getlocal("allianceWarPlanDesc" + plan + "-" + rid, [param]);
        view["_planNameTxt" + type].text = LanguageManager.getlocal("allianceWarPlanName" + plan);
        view["_planDescBg" + type].height = view["_planDescTxt" + type].textHeight + 45;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view["_planDescBg" + type], plangroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view["_planDescArrow" + type], view["_planDescBg" + type], [25, view["_planDescBg" + type].height - 3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view["_planDescTxt" + type], view["_planDescBg" + type], [0, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view["_planNameTxt" + type], view["_planDescBg" + type], [20, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, plangroup, view["_midGroup" + type], [0, -plangroup.height]);
        //buff箭头
        if (arrow !== '') {
            var newType = type;
            if (plan == 4) {
                newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
            }
            view["_arrow" + newType].setRes(arrow);
            view["_buffTxt" + newType].text = "" + (plan == 4 ? '-' : '+') + param + "%";
            view["_buffTxt" + newType].textColor = plan == 4 ? TextFieldConst.COLOR_WARN_RED : TextFieldConst.COLOR_WARN_GREEN;
            var progress = view["_playerProgress" + newType];
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view["_buffTxt" + newType], progress, [10, 0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view["_arrow" + newType], progress, [view["_buffTxt" + newType].width + 15, 0]);
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.skipFight = function () {
        var view = this;
        var score = 0;
        view._winFlag = view._serverWin;
        if (view._self) {
            score = view._rightvsInfo.allilevel;
        }
        else {
            score = view._winFlag == LayoutConst.left ? view._rightvsInfo.allilevel : view._leftvsInfo.allilevel;
        }
        if (!score) {
            score = view._leftvsInfo.allilevel;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYBATTLERESULTVIEW, {
            type: view._winFlag == LayoutConst.left ? 'win' : 'fail',
            alliname: view._lunkong ? '' : view._rightvsInfo.allianceName,
            score: score,
            damageLog: view._damageLog,
            winanme: view._winFlag == LayoutConst.left ? view._leftvsInfo.allianceName : view._rightvsInfo.allianceName,
            lunkong: view._lunkong,
            id: view._leftvsInfo.id,
            draw: view._winFlag == 'draw',
            test: view.param.data.test,
            ishistory: view.param.data.ishistory,
            history: view.param.data.history,
            activeId: view.param.data.activeId,
            allianceid: view.param.data.allianceid,
            rid: view.param.data.rid,
        });
        view.hide();
    };
    AcCrossServerHegemonyBattleShowView.prototype.freshText = function (type, param, isLeft) {
        var view = this;
        var infoGroup = view._damageTxtGroup;
        var desc = "allianceWarDesc" + type;
        // if(sub >= 0){
        // 	desc = sub == 0 ? 'allianceWarTip4' : 'allianceWarTip2';
        // 	param = [leftData.name, Config.ServantCfg.getServantItemById(leftData.servantId).name, damageLeft];
        // }
        // else{
        // 	desc = 'allianceWarTip3';
        // 	param = [rightData.name, Config.ServantCfg.getServantItemById(rightData.servantId).name, damageright];
        // }
        var damageTxt = ComponentManager.getTextField(LanguageManager.getlocal(desc, param), 18, isLeft ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW);
        damageTxt.lineSpacing = 5;
        damageTxt.width = GameConfig.stageWidth - 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, damageTxt, view._damageTxtGroup, [20, view._scrollY], true);
        damageTxt.name = "message" + view._messageIdx;
        var height = 0;
        if (view._scrollY > 140) {
            var item = view._damageTxtGroup.getChildByName("message" + view._scrollIdx);
            if (item) {
                height = view._damageScrollView.scrollTop + item.height + 17 + (damageTxt.textHeight - item.height);
                ++view._scrollIdx;
            }
        }
        view._damageScrollView.scrollTop = height;
        view._scrollY += (damageTxt.textHeight + 10);
        view._damageTxtGroup.addChild(damageTxt);
        ++view._messageIdx;
    };
    AcCrossServerHegemonyBattleShowView.prototype.startMove = function () {
        var _this = this;
        var view = this;
        //移动碰撞
        if (view.checkWin()) {
            egret.Tween.get(view._planGroupleft).wait(1000).call(function () {
                view.skipFight();
            }, view);
        }
        else {
            var leftData_1 = view._roundLog[view._round][LayoutConst.left];
            var rightData_1 = view._roundLog[view._round][LayoutConst.right];
            var leftrole = view["_servantRole" + LayoutConst.left];
            var rightrole = view["_servantRole" + LayoutConst.right];
            var leftprogress_1 = view["_playerProgress" + LayoutConst.left];
            var rightprogress_1 = view["_playerProgress" + LayoutConst.right];
            var leftaureoleClip = view["_servantClip" + LayoutConst.left];
            var rightaureoleClip = view["_servantClip" + LayoutConst.right];
            var leftrolegroup_1 = view["_roleGroup" + LayoutConst.left];
            var rightrolegroup_1 = view["_roleGroup" + LayoutConst.right];
            // let damageNum = sub > 0 ? damageright : damageLeft;
            view["_winGroup" + LayoutConst.left].visible = view["_winGroup" + LayoutConst.right].visible = false;
            var isleftWin_1 = leftData_1.result == 'win';
            var isrightWin_1 = rightData_1.result == 'win';
            var buffeffect_1 = view["_midGroup" + LayoutConst.left].getChildByName('buffeffect');
            var buffeffect2_1 = view["_midGroup" + LayoutConst.right].getChildByName('buffeffect');
            egret.Tween.get(leftrolegroup_1).to({ scaleX: 1.3, scaleY: 1.3 }, 500).call(function () {
                if (buffeffect_1) {
                    buffeffect_1.visible = false;
                }
            }, view).to({ x: view._rolePosX + 130, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(function () {
                leftprogress_1.setText(App.StringUtil.changeIntToText(leftData_1.curHp));
                leftprogress_1.setPercentage(leftData_1.curHp / leftData_1.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(leftData_1.curHp), 0)));
            }, view).call(function () {
                // let desc = '';
                // let param = [];
                // if(sub >= 0){
                // 	desc = sub == 0 ? 'allianceWarTip4' : 'allianceWarTip2';
                // 	param = [leftData.name, Config.ServantCfg.getServantItemById(leftData.servantId).name, damageLeft];
                // }
                // else{
                // 	desc = 'allianceWarTip3';
                // 	param = [rightData.name, Config.ServantCfg.getServantItemById(rightData.servantId).name, damageright];
                // }
                // let damageTxt =  ComponentManager.getTextField(LanguageManager.getlocal(desc, param),18,sub >= 0 ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, damageTxt, view._damageTxtGroup, [20, 15 + (view._round - 1) * (18 + 10)], true);
                // view._damageTxtGroup.addChild(damageTxt);
                // view._damageScrollView.scrollTop = 15 + (view._round - 1) * (18 + 10);
            }, view).to({ x: isleftWin_1 ? view._rolePosX : -124, y: isleftWin_1 ? view._rolePosY : -200, scaleX: isleftWin_1 ? 1 : 0, scaleY: isleftWin_1 ? 1 : 0, alpha: isleftWin_1 ? 1 : 0, rotation: isleftWin_1 ? 0 : 720 }, 600).call(function () {
                if (isleftWin_1) {
                    if (buffeffect_1) {
                        buffeffect_1.visible = true;
                    }
                    view.rightWin = 0;
                    ++view.leftWin;
                    if (leftData_1.plan) {
                        view.freshText('5', [leftData_1.name, LanguageManager.getlocal("allianceWarPlanName" + leftData_1.plan), rightData_1.name, App.StringUtil.changeIntToText(Math.floor(leftData_1.curHp)), view.leftWin], true);
                    }
                    else {
                        view.freshText('3', [leftData_1.name, rightData_1.name, App.StringUtil.changeIntToText(Math.floor(leftData_1.curHp)), view.leftWin], true);
                    }
                    view.freshText('4', [rightData_1.alliname, LanguageManager.getlocal("allianceMemberPo" + rightData_1.allipos), rightData_1.name], false);
                    view["_winGroup" + LayoutConst.right].visible = false;
                }
                else if (isrightWin_1) {
                    view.leftWin = 0;
                    ++view.rightWin;
                    if (rightData_1.plan) {
                        view.freshText('5', [rightData_1.name, LanguageManager.getlocal("allianceWarPlanName" + rightData_1.plan), leftData_1.name, App.StringUtil.changeIntToText(Math.floor(rightData_1.curHp)), view.rightWin], false);
                    }
                    else {
                        view.freshText('3', [rightData_1.name, leftData_1.name, App.StringUtil.changeIntToText(Math.floor(rightData_1.curHp)), view.rightWin], false);
                    }
                    view.freshText('4', [leftData_1.alliname, LanguageManager.getlocal("allianceMemberPo" + leftData_1.allipos), leftData_1.name], true);
                    leftrolegroup_1.setScale(1);
                    leftrolegroup_1.alpha = 1;
                    leftrolegroup_1.x = -124;
                    leftrolegroup_1.y = view._rolePosY;
                    view["_winGroup" + LayoutConst.left].visible = false;
                }
                else {
                    view.rightWin = 0;
                    view.freshText('4', [rightData_1.alliname, LanguageManager.getlocal("allianceMemberPo" + rightData_1.allipos), rightData_1.name], false);
                    view["_winGroup" + LayoutConst.right].visible = false;
                    view.leftWin = 0;
                    view.freshText('4', [leftData_1.alliname, LanguageManager.getlocal("allianceMemberPo" + leftData_1.allipos), leftData_1.name], true);
                    leftrolegroup_1.setScale(1);
                    leftrolegroup_1.alpha = 1;
                    leftrolegroup_1.x = -124;
                    leftrolegroup_1.y = view._rolePosY;
                    view["_winGroup" + LayoutConst.left].visible = false;
                }
                if (view.leftWin) {
                    view["_winBitMapTxt" + LayoutConst.left].text = view.leftWin.toString();
                    view["_winGroup" + LayoutConst.left].visible = true;
                }
                if (view.rightWin) {
                    view["_winBitMapTxt" + LayoutConst.right].text = view.rightWin.toString();
                    ;
                    view["_winGroup" + LayoutConst.right].visible = true;
                }
            }, view);
            var customClip_1 = ComponentManager.getCustomMovieClip('atk_anim_', 7, 70);
            customClip_1.width = 185;
            customClip_1.height = 186;
            customClip_1.setEndCallBack(function () {
                view.removeChild(customClip_1);
                customClip_1 = null;
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, customClip_1, view, [0, -150]);
            customClip_1.visible = false;
            view.addChild(customClip_1);
            egret.Tween.get(rightrolegroup_1).to({ scaleX: 1.2, scaleY: 1.2 }, 500).call(function () {
                if (buffeffect2_1) {
                    buffeffect2_1.visible = false;
                }
            }, view).to({ x: view._rolePosX - 130, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(function () {
                //伤害	
                // let damageText = ComponentManager.getBitmapText("-"+Math.floor(damageNum).toString(),"damage_fnt",undefined,undefined,true);
                // damageText.setPosition(rightrole.x + rightrole.width/2 - damageText.width/2 , rightrole.y + rightrole.height/2  - 50);
                // view[`_midGroupright`].addChild(damageText);
                // egret.Tween.get(damageText).to({y:damageText.y+30*3},300).to({y:damageText.y+30*6,alpha:0.1},600).call(()=>{
                // 	view[`_midGroupright`].removeChild(damageText);
                // 	damageText = null;
                // },view);
                customClip_1.visible = true;
                customClip_1.playWithTime(1);
                customClip_1.goToAndPlay(0);
                rightprogress_1.setText(App.StringUtil.changeIntToText(rightData_1.curHp));
                rightprogress_1.setPercentage(rightData_1.curHp / rightData_1.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(rightData_1.curHp), 0)));
            }, view).to({ x: isrightWin_1 ? view._rolePosX : 384, y: isrightWin_1 ? view._rolePosY : -200, scaleX: isrightWin_1 ? 1 : 0, scaleY: isrightWin_1 ? 1 : 0, alpha: isrightWin_1 ? 1 : 0, rotation: isrightWin_1 ? 0 : 720 }, 600).call(function () {
                if (isrightWin_1) {
                    if (buffeffect2_1) {
                        buffeffect2_1.visible = true;
                    }
                }
                else {
                    rightrolegroup_1.setScale(1);
                    rightrolegroup_1.alpha = 1;
                    rightrolegroup_1.x = 384;
                    rightrolegroup_1.y = view._rolePosY;
                }
            }, view).wait(800).call(function () {
                ++view._round;
                view._together = false;
                view._showSkin = 0;
                if (leftData_1.change && rightData_1.change) {
                    view.rightWin = view.leftWin = 0;
                    view._together = true;
                    view.flag = false;
                    view.buff = false;
                    var buffeffect_2 = view["_midGroup" + LayoutConst.right].getChildByName('buffeffect');
                    if (buffeffect_2) {
                        buffeffect_2.stop();
                        view["_midGroup" + LayoutConst.right].removeChild(buffeffect_2);
                        buffeffect_2 = null;
                    }
                    var buffeffect2_2 = view["_midGroup" + LayoutConst.left].getChildByName('buffeffect');
                    if (buffeffect2_2) {
                        buffeffect2_2.stop();
                        view["_midGroup" + LayoutConst.left].removeChild(buffeffect2_2);
                        buffeffect2_2 = null;
                    }
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
                            view.showRoundAnti(LayoutConst.left, view.startMove, view, true);
                        }
                        else {
                            var leftdata = view._roundLog[view._round][LayoutConst.left];
                            if (leftdata && leftdata.skin) {
                                view.showRoundAnti(LayoutConst.left, view.startMove, view, true);
                            }
                            else {
                                view.showRoundAnti(LayoutConst.right, view.startMove, view, true);
                            }
                        }
                    }
                    else {
                        view.showRoundAnti(LayoutConst.left, view.startMove, view);
                        view.showRoundAnti(LayoutConst.right, view.startMove, view);
                    }
                }
                else if (leftData_1.change) {
                    view.leftWin = 0;
                    var buffeffect2_3 = view["_midGroup" + LayoutConst.left].getChildByName('buffeffect');
                    if (buffeffect2_3) {
                        buffeffect2_3.stop();
                        view["_midGroup" + LayoutConst.left].removeChild(buffeffect2_3);
                        buffeffect2_3 = null;
                    }
                    if (view._roundLog[view._round]) {
                        var leftdata = view._roundLog[view._round][LayoutConst.left];
                        if (leftdata && leftdata.weaponDps) {
                            _this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
                        }
                    }
                    view._showSkin = _this._skinEquip.length;
                    if (_this._skinEquip.length) {
                        view.showRoundAnti(LayoutConst.left, view.startMove, view, true);
                    }
                    else {
                        view.showRoundAnti(LayoutConst.left, view.startMove, view);
                    }
                }
                else {
                    view.rightWin = 0;
                    var buffeffect_3 = view["_midGroup" + LayoutConst.right].getChildByName('buffeffect');
                    if (buffeffect_3) {
                        buffeffect_3.stop();
                        view["_midGroup" + LayoutConst.right].removeChild(buffeffect_3);
                        buffeffect_3 = null;
                    }
                    if (view._roundLog[view._round]) {
                        var rightdata = view._roundLog[view._round][LayoutConst.right];
                        if (rightdata && rightdata.weaponDps) {
                            _this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
                        }
                    }
                    view._showSkin = _this._skinEquip.length;
                    if (_this._skinEquip.length) {
                        view.showRoundAnti(LayoutConst.right, view.startMove, view, true);
                    }
                    else {
                        view.showRoundAnti(LayoutConst.right, view.startMove, view);
                    }
                }
            }, view);
        }
    };
    AcCrossServerHegemonyBattleShowView.prototype.checkWin = function () {
        var view = this;
        var endFlag = true;
        var roundData = view._roundLog[view._round];
        if (roundData) {
            endFlag = false;
        }
        if (view._lunkong) {
            endFlag = true;
        }
        return endFlag;
    };
    AcCrossServerHegemonyBattleShowView.prototype.tick = function () {
        var view = this;
    };
    AcCrossServerHegemonyBattleShowView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'achegemony_logo-1', 'awbattletimebg', 'crossservantplayernamebg', 'awpositionbgblue', 'awpositionbgred', 'awlsheng', 'awnamebg1', 'awnamebg2',
            'crossservantvsmask1', 'crossservantvsmask2', 'awservernamebg1', 'awservernamebg2', 'awserverbg1', 'awserverbg2', 'awuparrow', 'awdownarrow',
            ,
            'progress3_bg', 'progress8', 'crossservantrulevs', 'damage_fnt', 'acmazeview_textbg',
            'buffeffect', 'debuffeffect', 'awplaneffect', "skinshowkuang3", "acwealthcarpeffect",
        ]);
    };
    AcCrossServerHegemonyBattleShowView.prototype.getRuleInfo = function () {
        return null;
    };
    AcCrossServerHegemonyBattleShowView.prototype.getTitleBgName = function () {
        return null;
    };
    AcCrossServerHegemonyBattleShowView.prototype.getTitleStr = function () {
        return null;
    };
    AcCrossServerHegemonyBattleShowView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    AcCrossServerHegemonyBattleShowView.prototype.closeHandler = function () {
        var view = this;
        view.skipFight();
    };
    AcCrossServerHegemonyBattleShowView.prototype.showSkin = function (func) {
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
                atype: 3,
                value: value1,
                sid2: serId2,
                type2: 1,
                atype2: 3,
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
    AcCrossServerHegemonyBattleShowView.prototype.dispose = function () {
        var view = this;
        var arr = [LayoutConst.left, LayoutConst.right];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var type = arr_1[_i];
            if (view["_servantRole" + type]) {
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
                view["_planDescBg" + type] = null;
                view["_planDescArrow" + type] = null;
                view["_planDescTxt" + type] = null;
                view["_planNameTxt" + type] = null;
                egret.Tween.removeTweens(view["_planGroup" + type]);
                view["_planGroup" + type] = null;
                view["_memberList" + type] = null;
                egret.Tween.removeTweens(view["_arrow" + type]);
                view["_arrow" + type] = null;
                view["_buffTxt" + type] = null;
                view["skinnamebg" + type] = null;
                view["_skinnameTxt" + type] = null;
            }
        }
        view._damageTxtGroup = null;
        view._damageScrollView = null;
        view._leftIdx = view._rightIdx = 0;
        view._winFlag = '';
        view._rolePosX = 0;
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
        view._scrollIdx = 0;
        view._messageIdx = 0;
        view._together = false;
        view.flag = false;
        view.buff = false;
        view._skinEquip = [];
        view._showSkin = 0;
        view.isover = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyBattleShowView;
}(CommonView));
__reflect(AcCrossServerHegemonyBattleShowView.prototype, "AcCrossServerHegemonyBattleShowView");
//# sourceMappingURL=AcCrossServerHegemonyBattleShowView.js.map