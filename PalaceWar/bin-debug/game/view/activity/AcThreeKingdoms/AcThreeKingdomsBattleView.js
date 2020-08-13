/**
 * 三国争霸对战
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
var AcThreeKingdomsBattleView = /** @class */ (function (_super) {
    __extends(AcThreeKingdomsBattleView, _super);
    function AcThreeKingdomsBattleView() {
        var _this = _super.call(this) || this;
        _this._fightarr = null;
        _this._point = 0;
        _this._rewardnum = 0;
        _this._winflag = 0;
        _this._callback = null;
        _this._target = null;
        _this._downGroup = null;
        _this._topGroup = null;
        //跳过战斗按钮
        _this._stepBtn = null;
        _this._curRoundFirst = 0;
        //上方玩家剩余红颜个数
        _this._upWifeCount = null;
        _this._upWifeNum = 0;
        //上方玩家的总才情
        _this._upTotalTalent = null;
        //上方玩家的卡牌容器
        _this._upCardContainer = null;
        //上方玩家的总才情进度条
        _this._upBProgress = null;
        //上方玩家的红颜卡牌列表
        _this._upWifeCardList = null;
        //下方玩家的剩余红颜个数
        _this._downWifeCount = null;
        _this._downWifeNum = 0;
        //下方玩家的总才情
        _this._downTotalTalent = null;
        //下方玩家的卡牌容器
        _this._downCardContainer = null;
        //下方玩家的总才情进度条
        _this._downBProgress = null;
        //下方玩家的红颜卡牌列表
        _this._downWifeCardList = null;
        // private _myCardDataList:any[] = null;
        // private _enemyCardDataList:any[]= null;
        _this._upCurIndex = 0;
        _this._downCurIndex = 0;
        _this._curRound = 0;
        _this._curIdex = 0;
        _this._upSelectCard = null;
        _this._downSelectCard = null;
        _this._upMaxNum = 0;
        _this._downMaxNum = 0;
        _this._isPause = false;
        _this._isReview = false;
        _this._skip = false;
        _this._isEnd = false;
        _this._uptotalarmy = 0;
        _this._upmaxarmy = 0;
        _this._downtotalarmy = 0;
        _this._downmaxarmy = 0;
        _this._skinEquip = [];
        _this._showSkin = 0;
        _this.isDeadAtk = false;
        return _this;
    }
    AcThreeKingdomsBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "cfg", {
        // protected isTouchMaskClose():boolean
        // {
        //     return true;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBattleView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "judianid", {
        get: function () {
            return this.param.data.judianid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBattleView.prototype.hide = function () {
        if (this._target && this._callback) {
            this._callback.apply(this._target);
        }
        _super.prototype.hide.call(this);
    };
    AcThreeKingdomsBattleView.prototype.initView = function () {
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        this.titleTF.visible = false;
        // this._fightarr = this.param.data.fightarr;
        this._point = this.param.data.point;
        // this._rewardnum = this.param.data.rewardnum;
        this._winflag = this.param.data.winuid == this.downPlayerInfo.uid ? 1 : 2;
        // this._callback = this.param.data.callback;
        // this._target = this.param.data.target;
        // this._isReview = this.param.data.isReview;
        this.initBottomView();
        this.initCards();
        //第一场是双方玩家
        this._skinEquip = [];
        this.roundBeginAnim();
    };
    AcThreeKingdomsBattleView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("threekingdomsbattlebg");
        this.viewBg.width = 640;
        this.viewBg.height = 1136;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    AcThreeKingdomsBattleView.prototype.isShowOpenAni = function () {
        return false;
    };
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "upPlayerInfo", {
        /**
         * pklogs=pklogs,winuid=winuid,sidlist1={},sidlist2={}
         * pklogs = {log1,log2...}，
    log1 = {firstflag,win,reports,ainfo,binfo}
    firstflag = 1 表示主视角先手
    win = 1 表示主视角获胜
    reports = [hit1,hit2,hit3...] ，hit1为先手攻击，hit2为后手，以此类推
    hit = [isCri,damage]  isCri=1表示暴击了，damage伤害
    ainfo为主视角门客信息，binfo为对手门客信息
    ainfo = {sid="1001", attr=1, quality=1, v=1, s1lv=1, s2lv=1, fullattr=1, clv=1, equip="", weaponDps=1} fullattr为最大血量，attr为战斗后血量
    ainfo = {sid="1001", attr=1, quality=1, lv=1, s1lv=1, s2lv=1, fullattr=1, clv=1, equip="", weaponDps=1}
    */
        get: function () {
            //上方信息 敌对
            return this.param.data.pklogs[0][4];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBattleView.prototype, "downPlayerInfo", {
        get: function () {
            //下方玩家 自己 主视角
            return this.param.data.pklogs[0][3];
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBattleView.prototype.createInfoGroup = function (type) {
        var view = this;
        var code = view.getUiCode();
        //1顶部玩家 2底部玩家
        var info = type == 1 ? view.upPlayerInfo : view.downPlayerInfo;
        var group = new BaseDisplayObjectContainer();
        var topinfobg = BaseBitmap.create("threekingdomsbattletopbg");
        group.width = GameConfig.stageWidth;
        group.height = 200;
        topinfobg.x = 0;
        topinfobg.y = type == 1 ? 0 : 110;
        group.addChild(topinfobg);
        //人物形象
        //头像框
        var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(info.pic), (info.ptitle));
        headContainer.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: info.uid,
                rzid: Api.mergeServerVoApi.getTrueZid(info.uid)
            });
        }, this);
        headContainer.setScale(0.85);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.leftverticalCenter : LayoutConst.rightverticalCenter, headContainer, topinfobg, [0, 0]);
        //玩家名
        var namebg = BaseBitmap.create("threekingdomsbattleplayernamebg");
        namebg.width = 255;
        namebg.anchorOffsetX = namebg.width / 2;
        namebg.scaleX = type == 1 ? 1 : -1;
        group.addChild(namebg);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.lefttop : LayoutConst.righttop, namebg, topinfobg, [type == 1 ? 90 : 100, 17]);
        var playernameTxt = ComponentManager.getTextField(info.name + "\uFF08" + Api.mergeServerVoApi.getAfterMergeSeverName(info.uid, true, Api.mergeServerVoApi.getTrueZid(info.uid)) + "\uFF09", 22, TextFieldConst.COLOR_BROWN);
        group.addChild(playernameTxt);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.leftverticalCenter : LayoutConst.rightverticalCenter, playernameTxt, namebg, [5, 0]);
        // playernameTxt.textColor = Number(info.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
        //称号
        var titleId = info.title;
        var width = 0;
        // if(titleId){
        //     let titleinfo = App.CommonUtil.getTitleData(titleId);
        //     if(titleinfo.title != ``){
        //         let titleImg = App.CommonUtil.getTitlePic(titleinfo);
        //         titleImg.width = 155;
        //         titleImg.height = 59;
        //         titleImg.setScale(0.7);
        //         width = 155 * 0.7;
        //         App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, headContainer);
        //         group.addChild(titleImg);
        //     }
        // }
        //总兵力
        var army = 0;
        var max = 0;
        var list = type == 1 ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for (var i in list) {
            var unit = list[i];
            if (unit.fightattr > 0) {
                army += unit.fightattr;
            }
            max += unit.fullattr;
        }
        type == 1 ? view._uptotalarmy = army : view._downtotalarmy = army;
        type == 1 ? view._upmaxarmy = max : view._downmaxarmy = max;
        //进度条
        var progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 540);
        progress.setPercentage(army / max);
        group.addChild(progress);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.lefttop : LayoutConst.righttop, progress, namebg, [0, namebg.height]);
        type == 1 ? view._upBProgress = progress : view._downBProgress = progress;
        group.addChild(headContainer);
        // private _uptotalarmy = 0;
        // private _upmaxarmy = 0;
        var totalTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattlearmynum", code), [army.toString()]), 22);
        group.addChild(totalTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, totalTxt, progress);
        type == 1 ? view._upTotalTalent = totalTxt : view._downTotalTalent = totalTxt;
        //剩余门客数
        var servantnum = 0;
        var sidlist = type == 1 ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for (var key in sidlist) {
            var info_1 = sidlist[key];
            if (info_1 && info_1.fightattr > 0) {
                ++servantnum;
            }
        }
        var servantcount = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattleservantnum", code), [servantnum.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        group.addChild(servantcount);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.righttop : LayoutConst.lefttop, servantcount, progress, [50, -servantcount.textHeight - 5]);
        type == 1 ? view._upWifeCount = servantcount : view._downWifeCount = servantcount;
        type == 1 ? view._upWifeNum = servantnum : view._downWifeNum = servantnum;
        //门客列表   
        var cardsBg = BaseBitmap.create("threekingdomsbattleservantlistbg");
        cardsBg.height = 110;
        cardsBg.anchorOffsetY = cardsBg.height / 2;
        cardsBg.scaleY = type == 1 ? 1 : -1;
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.horizontalCentertop : LayoutConst.horizontalCenterbottom, cardsBg, topinfobg, [0, topinfobg.height]);
        group.addChild(cardsBg);
        var cardContainer = new BaseDisplayObjectContainer();
        cardContainer.width = 640;
        cardContainer.height = 95;
        group.addChild(cardContainer);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardContainer, cardsBg);
        type == 1 ? view._upCardContainer = cardContainer : view._downCardContainer = cardContainer;
        //属性buff
        // let buff1icon = BaseBitmap.create(`threekingdomsbattlebuff1`);
        // let buff2icon = BaseBitmap.create(`threekingdomsbattlebuff2`);
        // group.addChild(buff1icon);
        // group.addChild(buff2icon);
        // App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.righttop : LayoutConst.lefttop, buff1icon, group, [type == 1 ? 105 : 25, type == 1 ? (group.height+15) : (-buff1icon.height-35)], true);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, buff2icon, buff1icon, [buff1icon.width+15,0]);
        // let buff = type == 1 ? this.param.data.bBuff : this.param.data.aBuff
        // let add1 = buff && buff.length ? buff[0] : 0;
        // let addbg1 = BaseBitmap.create(`public_itemtipbg2`);
        // let add1Txt = ComponentManager.getTextField(`+${add1}`, 18, TextFieldConst.COLOR_WARN_GREEN);
        // group.addChild(addbg1);
        // group.addChild(add1Txt);
        // addbg1.width = add1Txt.textWidth + 70;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addbg1, buff1icon, [0,buff1icon.height]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, add1Txt, addbg1);
        // let add2 = buff && buff.length ? buff[1] : 0;
        // let addbg2 = BaseBitmap.create(`public_itemtipbg2`);
        // let add2Txt = ComponentManager.getTextField(`+${add2}`, 18, TextFieldConst.COLOR_WARN_GREEN);
        // group.addChild(addbg2);
        // group.addChild(add2Txt);
        // addbg2.width = add2Txt.textWidth + 70;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addbg2, buff2icon, [0,buff2icon.height]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, add2Txt, addbg2);
        return group;
    };
    AcThreeKingdomsBattleView.prototype.showWinBattle = function (str, isup, ismiddle) {
        if (ismiddle === void 0) { ismiddle = false; }
        var view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        var descbg = BaseBitmap.create("specialview_commoni_namebg");
        var tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;
        if (ismiddle) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view, [0, 0]);
            this.addChild(descbg);
            this.addChild(tipTxt);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0, 150]);
            this.addChildToContainer(descbg);
            this.addChildToContainer(tipTxt);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        descbg.alpha = 0;
        tipTxt.alpha = 0;
        egret.Tween.get(descbg).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            descbg.dispose();
            descbg = null;
        }, this);
        egret.Tween.get(tipTxt).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            tipTxt.dispose();
            tipTxt = null;
        }, this);
    };
    /**
     * 显示初始化View
     */
    AcThreeKingdomsBattleView.prototype.initBottomView = function () {
        var view = this;
        console.log("initBottomView");
        //顶部信息栏
        var topGroup = view.createInfoGroup(1);
        view.addChild(topGroup);
        view._topGroup = topGroup;
        //底部信息栏
        var downGroup = view.createInfoGroup(2);
        view.addChild(downGroup);
        view._downGroup = downGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, downGroup, view);
        view._stepBtn = ComponentManager.getButton("atkrace_skip_down", null, view.stepBtnHandler, view);
        view._stepBtn.x = GameConfig.stageWidth - 10 - view._stepBtn.width;
        view._stepBtn.y = topGroup.y + topGroup.height + 100;
        // this._stepBtn.visible = false;
        view.addChild(view._stepBtn);
        // egret.Tween.get(this._stepBtn)
        // .wait(5000)
        // .set({visible:true})
    };
    /**
     * 开始一回合战斗
     */
    AcThreeKingdomsBattleView.prototype.showRound = function () {
        var _this = this;
        //当前回合信息
        var curRoundData = this.getCurRoundData();
        if (this._topCurValue > 0 && this._bottomCurValue > 0) {
            if (this._curRound > 0 && this._curIdex > 1 && ((this._curIdex - 1) % (2 * this.cfg.round) == 0)) {
                this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip7", [String(Math.floor(this._curIdex / 2)), this.cfg.atkAdd.toString()]), false, true);
                egret.Tween.get(this).wait(1300).call(function () {
                    egret.Tween.removeTweens(_this);
                    //上方先手0 下方先手1
                    var area = 1;
                    if (_this._curRoundFirst != _this._curIdex % 2) {
                        area = 2;
                    }
                    //伤害信息 当前步骤
                    var reportInfo = curRoundData.reports[_this._curIdex - 1];
                    _this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                    var num = 0;
                    if (area == 1) {
                        if (reportInfo[1] > _this._topCurValue) {
                            num = _this._topCurValue;
                        }
                        else {
                            num = reportInfo[1];
                        }
                        if (_this._curRound > 1) {
                            _this._uptotalarmy -= num;
                        }
                    }
                    else {
                        if (reportInfo[1] > _this._bottomCurValue) {
                            num = _this._bottomCurValue;
                        }
                        else {
                            num = reportInfo[1];
                        }
                        if (_this._curRound > 1) {
                            _this._downtotalarmy -= num;
                        }
                    }
                    _this._curIdex++;
                }, this);
            }
            else {
                //上方先手0 下方先手1
                var area = 1;
                if (this._curRoundFirst != this._curIdex % 2) {
                    area = 2;
                }
                //伤害信息 当前步骤
                var reportInfo = curRoundData.reports[this._curIdex - 1];
                this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                var num = 0;
                if (area == 1) {
                    if (reportInfo[1] > this._topCurValue) {
                        num = this._topCurValue;
                    }
                    else {
                        num = reportInfo[1];
                    }
                    if (this._curRound > 1) {
                        this._uptotalarmy -= num;
                    }
                }
                else {
                    if (reportInfo[1] > this._bottomCurValue) {
                        num = this._bottomCurValue;
                    }
                    else {
                        num = reportInfo[1];
                    }
                    if (this._curRound > 1) {
                        this._downtotalarmy -= num;
                    }
                }
                this._curIdex++;
            }
        }
        else {
            if (this.isDeadAtk) {
                this.showEndGameBefore();
                this.isDeadAtk = false;
            }
            else {
                this.checkDeadWeapon();
            }
        }
    };
    AcThreeKingdomsBattleView.prototype.checkDeadWeapon = function () {
        var _this = this;
        var view = this;
        if (this._curRound == 1 || this._curRound >= this.param.data.pklogs.length) {
            this.showEndGameBefore();
        }
        else {
            if (this._topCurValue > 0 || this._bottomCurValue > 0) {
                var info = this.getCurRoundData();
                var weaponinfo = this._topCurValue > 0 ? info.ainfo : info.binfo;
                var serId = weaponinfo.sid;
                var sinfo = this.getServantInfo(serId, this._topCurValue <= 0); //;
                var value_1 = sinfo.deadDps;
                if (value_1) { //value
                    this.isDeadAtk = true;
                    var clipgroup_1 = new BaseDisplayObjectContainer();
                    this.addChildToContainer(clipgroup_1);
                    var eff1 = ComponentManager.getCustomMovieClip("threekingdomsfighteff1", 10);
                    eff1.playWithTime(-1);
                    eff1.width = 230;
                    eff1.height = 230;
                    // eff1.blendMode = egret.BlendMode.ADD;
                    var eff2 = ComponentManager.getCustomMovieClip("threekingdomsfighteff2", 10);
                    eff2.playWithTime(-1);
                    eff2.width = 260;
                    eff2.height = 160;
                    // eff2.blendMode = egret.BlendMode.ADD;
                    clipgroup_1.addChild(eff2);
                    eff2.setPosition(120, 25);
                    clipgroup_1.addChild(eff1);
                    var img = BaseBitmap.create("threekingdomsbattlelastatk");
                    clipgroup_1.addChild(img);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, img, eff2, [55, 10]);
                    var weaponimg = BaseLoadBitmap.create("weapon_icon_" + serId);
                    weaponimg.width = 346;
                    weaponimg.height = 346;
                    clipgroup_1.addChild(weaponimg);
                    weaponimg.setScale(0.4);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, weaponimg, eff1, [0, 5]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clipgroup_1, this._topCurValue > 0 ? this._downHero : this._upHero, [-60, -20]);
                    egret.Tween.get(this).wait(1000).call(function () {
                        //复仇一击
                        //上方先手2 下方先手1
                        var area = _this._topCurValue <= 0 ? 2 : 1;
                        clipgroup_1.visible = false;
                        clipgroup_1.dispose();
                        clipgroup_1 = null;
                        //伤害信息 当前步骤
                        _this.attackHandle(area, value_1, false);
                        var num = 0;
                        if (area == 1) {
                            if (value_1 > _this._topCurValue) {
                                num = _this._topCurValue;
                            }
                            else {
                                num = value_1;
                            }
                            _this._uptotalarmy -= num;
                        }
                        else {
                            if (value_1 > _this._bottomCurValue) {
                                num = _this._bottomCurValue;
                            }
                            else {
                                num = value_1[1];
                            }
                            _this._downtotalarmy -= num;
                        }
                        egret.Tween.removeTweens(_this);
                    }, view);
                }
                else {
                    this.showEndGameBefore();
                }
            }
            else {
                this.showEndGameBefore();
            }
        }
    };
    AcThreeKingdomsBattleView.prototype.atkEndCallback = function () {
        //掉血
        if (this._curRound > 1) {
            this._upTotalTalent.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattlearmynum", this.getUiCode()), [this._uptotalarmy.toString()]);
            this._upBProgress.setPercentage(this._uptotalarmy / this._upmaxarmy);
            this._downTotalTalent.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattlearmynum", this.getUiCode()), [this._downtotalarmy.toString()]);
            this._downBProgress.setPercentage(this._downtotalarmy / this._downmaxarmy);
        }
        if (this._skip) {
            this.hideLoadingMask();
            this.battleEnd();
            this._skip = false;
        }
        else {
            if (this._isEnd != true && this._isPause != true) {
                this.showRound();
            }
        }
    };
    AcThreeKingdomsBattleView.prototype.showEndGameBefore = function () {
        // let failMan:BattleHero;
        // if (this._reportVoApi.getBattleResultByRound(this._type,this._curRound) == 1) {
        // 	failMan = this._upHero;
        // }
        // else {
        var _this = this;
        // 	failMan = this._downHero;
        // }
        // egret.Tween.get(failMan).to({alpha:0},800).call(this.showEndGame,this);
        if (this._curRound == 1) {
            this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip6"), this._topCurValue > 0, false);
            //进行一系列特效
            /*...*/
            egret.Tween.get(this._upHero).wait(1300).to({ x: -this._upHero.width }, 600);
            egret.Tween.get(this._downHero).wait(1300).to({ x: this.width + this._downHero.width }, 600).call(function () {
                //完成下一步
                _this.showEndGame();
            }, this);
        }
        else {
            //卡牌移动 
            this.overRoundCardRun();
        }
    };
    AcThreeKingdomsBattleView.prototype.showEndGame = function () {
        if (this._isEnd) {
            return;
        }
        // if (this._type == 1)
        // {
        // 	this.battleEnd();
        // 	return;
        // }
        this.removeRoundAnim();
        this._upHero.clearHero();
        this._downHero.clearHero();
        this.showMaskAndWin(this._curRound);
        if (this._curRound >= this.param.data.pklogs.length) {
            this.battleEnd();
        }
        else {
            this.roundBeginAnim();
        }
    };
    //给icon贴上 胜 或 负
    AcThreeKingdomsBattleView.prototype.showMaskAndWin = function (round) {
        // for (let r = 1; r<=round; r++)
        // {
        // 	if ( this._reportVoApi.getBattleResultByRound(this._type,r)==1)
        // 	{
        // 		this._topIcons[r-1].setResult(2);
        // 		this._bottomIcons[r-1].setResult(1);
        // 	}
        // 	else 
        // 	{
        // 		this._topIcons[r-1].setResult(1);
        // 		this._bottomIcons[r-1].setResult(2);
        // 	}
        // }
    };
    AcThreeKingdomsBattleView.prototype.roundBeginAnim = function () {
        this._curRound++;
        if (this._upHero) {
            this._upHero.visible = false;
        }
        if (this._downHero) {
            this._downHero.visible = false;
        }
        // if (this._bottomProgress)
        // {
        // 	this._bottomProgress.visible = false;
        // }
        // if (this._topProgress)
        // {
        // 	this._topProgress.visible = false;
        // }
        this._stepBtn.visible = false;
        // this._beginAnimNode = new BaseDisplayObjectContainer();
        // this.addChild(this._beginAnimNode);
        var view = this;
        //特效待补充
        view.roundBegin();
        // if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("ladderTournament_BattleIcon_ske")) {
        // 	let idleNameTab = ["jiang","qinglong","baihu","zhuque","xuanwu"];
        // 	let bone = App.DragonBonesUtil.getLoadDragonBones("ladderTournament_BattleIcon",1,idleNameTab[this._type-1]);
        // 	bone.x = GameConfig.stageWidth/2;
        // 	bone.y = GameConfig.stageHeigth/2;
        // 	this._beginAnimNode.addChild(bone);
        // 	bone.setDragonBoneEventListener(dragonBones.EventObject.START, ()=>{
        // 		let oneNode = new BaseDisplayObjectContainer();
        // 		view._beginAnimNode.addChild(oneNode);
        // 		let roundBg = BaseBitmap.create("ladder_battle_typebg"+view._type);
        // 		oneNode.addChild(roundBg);
        // 		let picstr = "ladder_battle_round"+view._curRound;
        // 		if (view._type==1)
        // 		{
        // 			picstr = "ladder_battle_round0";
        // 		}
        // 		let roundBitmap = BaseBitmap.create(picstr);
        // 		roundBitmap.setPosition(roundBg.width/2-roundBitmap.width/2, roundBg.height/2 - roundBitmap.height/2);
        // 		oneNode.addChild(roundBitmap);
        // 		roundBg.alpha =0;
        // 		oneNode.setScale(GameConfig.stageWidth/roundBg.width);
        // 		oneNode.y = GameConfig.stageHeigth/2 - roundBg.height*oneNode.scaleY/2;
        // 		egret.Tween.get(oneNode).
        // 		to({x:GameConfig.stageWidth/2-roundBg.width/2,
        // 			y:GameConfig.stageHeigth/2-roundBg.height/2,
        // 			scaleX:1,scaleY:1
        // 			},150).
        // 		wait(1500).call(view.roundBegin,view);
        // 	}, this);
        // 	// bone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
        // 	// 	this.roundBegin();
        // 	// }, this);
        // } else {
        // 	let oneNode = new BaseDisplayObjectContainer();
        // 	this._beginAnimNode.addChild(oneNode);
        //     let roundBg = BaseBitmap.create("ladder_battle_typebg"+this._type);
        // 	oneNode.addChild(roundBg);
        // 	let picstr = "ladder_battle_round"+this._curRound;
        // 	if (this._type==1)
        // 	{
        // 		picstr = "ladder_battle_round0";
        // 	}
        // 	let roundBitmap = BaseBitmap.create(picstr);
        // 	roundBitmap.setPosition(roundBg.width/2-roundBitmap.width/2, roundBg.height/2 - roundBitmap.height/2);
        // 	oneNode.addChild(roundBitmap);
        // 	oneNode.setScale(GameConfig.stageWidth/roundBg.width);
        // 	oneNode.y = GameConfig.stageHeigth/2 - roundBg.height*oneNode.scaleY/2;
        // 	egret.Tween.get(oneNode).
        // 	to({x:GameConfig.stageWidth/2-roundBg.width/2,
        // 		y:GameConfig.stageHeigth/2-roundBg.height/2,
        // 		scaleX:1,scaleY:1
        // 		},500).
        // 	wait(300).call(this.roundBegin,this);
        // }
    };
    AcThreeKingdomsBattleView.prototype.roundBegin = function () {
        var _this = this;
        this._stepBtn.visible = true;
        this._isPause = false;
        this.removeRoundAnim();
        this._curIdex = 1;
        var curRoundData = this.getCurRoundData();
        //上方先手0 下方先手1
        this._curRoundFirst = curRoundData.firstflag == 1 ? 1 : 0;
        var info = this.getCurRoundData();
        var ainfo = info.ainfo;
        var binfo = info.binfo;
        this._topMaxValue = binfo.fullattr;
        this._bottomMaxValue = ainfo.fullattr;
        this.setBottomProgress(ainfo.fightattr ? ainfo.fightattr : ainfo.fullattr, ainfo.fullattr, 345);
        this.setTopProgress(binfo.fightattr ? binfo.fightattr : binfo.fullattr, binfo.fullattr, 345);
        if (this._curRound == 1) {
            this.setUpHero(null, this.upPlayerInfo, 4);
            this.setDownHero(null, this.downPlayerInfo, 4);
            this._upHero.x = 17;
            this._downHero.x = 280;
            this._upHero.y = 100;
            this._downHero.y = GameConfig.stageHeigth - 420 - 320 + 80;
        }
        else {
            var sid = ainfo.sid;
            var sinfo = this.getServantInfo(sid, false);
            for (var i in sinfo) {
                if (i == "fightattr") {
                    continue;
                }
                if (typeof ainfo[i] == "undefined") {
                    ainfo[i] = sinfo[i];
                }
            }
            ainfo.level = sinfo.lv;
            ainfo.skin = sinfo.equip;
            sid = binfo.sid;
            sinfo = this.getServantInfo(sid, true);
            for (var i in sinfo) {
                if (i == "fightattr") {
                    continue;
                }
                if (typeof binfo[i] == "undefined") {
                    binfo[i] = sinfo[i];
                }
            }
            binfo.level = sinfo.lv;
            binfo.skin = sinfo.equip;
            if (binfo.sid) {
                var flag = false;
                var upHeroPic = "";
                if (binfo.equip) {
                    upHeroPic = "skin_full_" + binfo.equip;
                    flag = true;
                }
                else {
                    upHeroPic = Config.ServantCfg.getServantItemById(binfo.sid).fullIcon;
                }
                this.setUpHero(upHeroPic, { level: binfo.lv, name: LanguageManager.getlocal("servant_name" + binfo.sid), ability: binfo.quality, pos: 1 }, 0, flag);
            }
            else {
                this.setUpHero(null);
            }
            if (ainfo.sid) {
                var downPic = void 0;
                var flag = false;
                if (ainfo.equip) {
                    flag = true;
                    downPic = "skin_full_" + ainfo.equip;
                }
                else {
                    downPic = Config.ServantCfg.getServantItemById(ainfo.sid).fullIcon;
                }
                this.setDownHero(downPic, { level: ainfo.lv, name: LanguageManager.getlocal("servant_name" + ainfo.sid), ability: ainfo.quality, pos: 1 }, 0, flag);
            }
            else {
                this.setDownHero(null);
            }
            // this._upHero.x = 17;
            // this._downHero.x = 280;
            this._upHero.y = 100;
            this._downHero.y = GameConfig.stageHeigth - 740 + 20;
        }
        this._topProgress.y = this._upHero.y + (this._curRound == 1 ? 330 : 385);
        this._topProgress.x = 17;
        // this._bottomProgress.y = GameConfig.stageHeigth - 740 + 80 + (this._curRound == 1 ? 330 : 385);
        this._bottomProgress.y = GameConfig.stageHeigth - 740 + 80 + 330;
        this._bottomProgress.x = 280;
        // this._topProgress.visible = this._bottomProgress.visible = false;
        this._upHero.visible = true;
        this._downHero.visible = true;
        // this._topProgress.visible = true;
        // this._bottomProgress.visible = true;
        if (this._upHero.x < 0) {
            egret.Tween.get(this._upHero).to({ x: 17 }, 300);
        }
        if (this._downHero.x > this.width) {
            egret.Tween.get(this._downHero).to({ x: 280 }, 300);
        }
        egret.Tween.get(this._upHero).wait(600).call(function () {
            _this._upPositon = egret.Point.create(_this._upHero.x, _this._upHero.y);
            _this._downPositon = egret.Point.create(_this._downHero.x, _this._downHero.y);
            _this.checkWeapon();
        }, this);
    };
    AcThreeKingdomsBattleView.prototype.checkWeapon = function () {
        if (this._curRound == 1) {
            this.checkWeaponBack();
            return;
        }
        var info = this.getCurRoundData();
        var ainfo = info.ainfo;
        var binfo = info.binfo;
        var serId = ainfo.sid;
        var serId2 = binfo.sid;
        var value1 = ainfo.weaponDps;
        var value2 = binfo.weaponDps;
        if (!value1 && !value2) {
            this.checkWeaponBack();
            return;
        }
        ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW, {
            sid: serId,
            type: 1,
            atype: 4,
            value: value1,
            sid2: serId2,
            type2: 4,
            atype2: 4,
            value2: value2,
            f: this.checkWeaponBack,
            o: this,
            auto: false
        });
    };
    AcThreeKingdomsBattleView.prototype.checkWeaponBack = function (skip) {
        if (skip === void 0) { skip = 0; }
        if (this && this.isShow()) {
            if (skip == 0) {
                this.showRound();
            }
            else if (skip == 1) {
                this._downHero.showLight(this.showRound, this);
            }
            else if (skip == 2) {
                this._upHero.showLight(this.showRound, this);
            }
            else if (skip == 3) {
                this._upHero.showLight();
                this._downHero.showLight(this.showRound, this);
            }
            else {
                this.showRound();
            }
        }
    };
    AcThreeKingdomsBattleView.prototype.removeRoundAnim = function () {
        // if (this._beginAnimNode)
        // {
        // 	egret.Tween.removeTweens(this._beginAnimNode);
        // 	this.removeChild(this._beginAnimNode);
        // 	this._beginAnimNode=null;
        // }
    };
    //真结束
    AcThreeKingdomsBattleView.prototype.battleEnd = function () {
        this.stopBattle();
        this._isEnd = true;
        ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSWARRESULTVIEW, {
            point: this._point,
            winflag: this._winflag,
            f: this.hide,
            o: this,
            iscenter: this.kingdomid == 0
        });
        // this._isEnd = true;
        // let curRoundResult:number = this._reportVoApi.getBattleWinByType(this._type) ? 1 : 2;
        // let socretab = this._reportVoApi.getBattleResultByType(this._type);
        // ViewController.getInstance().openView(ViewConst.BASE.LADDERBATTLEWIN,
        // 	{	f:this.battleCallbackEnd,
        // 		o:this,
        // 		result:curRoundResult,
        // 		score:socretab,
        // 		type:this._type
        // 	});
    };
    AcThreeKingdomsBattleView.prototype.battleCallbackEnd = function () {
        // this._fuction.apply(this._obj,[this._type]);
        // this.hide();
    };
    AcThreeKingdomsBattleView.prototype.getCurRoundData = function (round) {
        if (round === void 0) { round = 0; }
        if (!round) {
            round = this._curRound;
        }
        var log = this.param.data.pklogs[round - 1];
        if (log) {
            return {
                firstflag: log[0],
                win: log[1],
                reports: log[2],
                ainfo: log[3],
                binfo: log[4]
            };
        }
        else {
            return null;
        }
    };
    AcThreeKingdomsBattleView.prototype.overRoundCardRun = function () {
        console.log("overRoundCardRun");
        if (this._isPause) {
            return;
        }
        var curRoundData = this.getCurRoundData();
        var nextRoundData = this.getCurRoundData(this._curRound + 1);
        if (curRoundData && nextRoundData) {
            //上方赢了
            if (curRoundData.win != 1) {
                //剩余门客数
                --this._downWifeNum;
                this._downWifeCount.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattleservantnum", this.getUiCode()), [this._downWifeNum.toString()]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._downWifeCount, this._downBProgress, [50, -this._downWifeCount.textHeight - 5]);
                //自己方移动 visible
                var tempCard = this._downSelectCard;
                this._downSelectCard = this._downWifeCardList[tempCard["index"] + 1];
                this._downCardContainer.setChildIndex(this._downSelectCard, this._downMaxNum);
                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._downCardContainer.width / 2 - tempCard.width * tempCard.scaleX / 2 + 90 * tempCard["index"];
                tempCard.y = this._downCardContainer.height / 2 - tempCard.height * tempCard.scaleY / 2;
                this._downSelectCard["select"].visible = true;
                this._downSelectCard.setScale(1);
                this._downSelectCard.x = this._downCardContainer.width / 2 - this._downSelectCard.width * this._downSelectCard.scaleX / 2 + 90 * this._downSelectCard["index"];
                this._downSelectCard.y = this._downCardContainer.height / 2 - this._downSelectCard.height * this._downSelectCard.scaleY / 2;
                this._downCardContainer.setChildIndex(tempCard, this._downCardContainer.getChildIndex(this._downSelectCard) - 1);
                // this._downCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._downCardContainer)
                    .to({ x: this._downCardContainer.x - 90 }, 400);
                egret.Tween.get(this._downHero).to({ x: this.width + this._downHero.width }, 600);
            }
            //下方赢了
            if (curRoundData.win == 1) {
                //剩余门客数
                --this._upWifeNum;
                this._upWifeCount.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattleservantnum", this.getUiCode()), [this._upWifeNum.toString()]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._upWifeCount, this._upBProgress, [50, -this._upWifeCount.textHeight - 5]);
                var tempCard = this._upSelectCard;
                this._upSelectCard = this._upWifeCardList[tempCard["index"] + 1];
                this._upCardContainer.setChildIndex(this._upSelectCard, this._upMaxNum);
                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._upCardContainer.width / 2 - tempCard.width * tempCard.scaleX / 2 - 90 * tempCard["index"];
                tempCard.y = this._upCardContainer.height / 2 - tempCard.height * tempCard.scaleY / 2;
                this._upSelectCard["select"].visible = true;
                this._upSelectCard.setScale(1);
                this._upSelectCard.x = this._upCardContainer.width / 2 - this._upSelectCard.width * this._upSelectCard.scaleX / 2 - 90 * this._upSelectCard["index"];
                this._upSelectCard.y = this._upCardContainer.height / 2 - this._upSelectCard.height * this._upSelectCard.scaleY / 2;
                this._upCardContainer.setChildIndex(tempCard, this._upCardContainer.getChildIndex(this._upSelectCard) - 1);
                // this._upCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._upCardContainer)
                    .to({ x: this._upCardContainer.x + 90 }, 400);
                egret.Tween.get(this._upHero).to({ x: -this._upHero.width }, 600);
            }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
                .wait(600)
                .call(this.showEndGame, this);
        }
        else {
            this.playOver();
            this.showEndGame();
        }
    };
    AcThreeKingdomsBattleView.prototype.playOver = function () {
        this.stopBattle();
    };
    AcThreeKingdomsBattleView.prototype.initCards = function () {
        var view = this;
        var myCardDataList = [];
        view._downWifeCardList = [];
        view._upWifeCardList = [];
        var sidlist1 = view.param.data.sidlist1;
        for (var i in sidlist1) {
            var info = sidlist1[i];
            var obj = {
                servantid: info.sid,
                idx: Number(i) + 1,
                fightattr: info.fightattr
            };
            myCardDataList.push(obj);
        }
        myCardDataList = myCardDataList.sort(function (w1, w2) {
            return w1.idx - w2.idx;
        });
        var enemyCardDataList = [];
        var sidlist2 = view.param.data.sidlist2;
        for (var i in sidlist2) {
            var info = sidlist2[i];
            var obj = {
                servantid: info.sid,
                idx: Number(i) + 1,
                fightattr: info.fightattr
            };
            enemyCardDataList.push(obj);
        }
        enemyCardDataList = enemyCardDataList.sort(function (w1, w2) {
            return w1.idx - w2.idx;
        });
        this._downMaxNum = myCardDataList.length;
        this._upMaxNum = enemyCardDataList.length;
        var offX = 90;
        var scale = 0.85;
        var curCard = null;
        var flag = -1;
        for (var i = 0; i < enemyCardDataList.length; i++) {
            var enemyCardData = enemyCardDataList[i];
            var card = this.createCard(enemyCardData.servantid, i, true);
            card.setScale(scale);
            this._upCardContainer.addChild(card);
            if (enemyCardData.fightattr <= 0) {
                App.DisplayUtil.changeToGray(card);
            }
            if (enemyCardData.fightattr > 0 && flag == -1) {
                flag = Number(i);
                this._upSelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._upCardContainer.width / 2 - card.width * card.scaleX / 2 - offX * i;
            card.y = this._upCardContainer.height / 2 - card.height * card.scaleY / 2;
            if (curCard != null) {
                this._upCardContainer.setChildIndex(card, this._upCardContainer.getChildIndex(curCard));
            }
            // this._upCardContainer.addChildAt(card,this._upMaxNum - i);
            this._upWifeCardList.push(card);
            curCard = card;
        }
        this._upCardContainer.x = 90 * flag;
        curCard = null;
        flag = -1;
        for (var i = 0; i < myCardDataList.length; i++) {
            var myCardData = myCardDataList[i];
            var card = this.createCard(myCardData.servantid, i, false);
            card.setScale(scale);
            this._downCardContainer.addChild(card);
            if (myCardData.fightattr <= 0) {
                App.DisplayUtil.changeToGray(card);
            }
            if (myCardData.fightattr > 0 && flag == -1) {
                this._downSelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
                flag = Number(i);
            }
            card.x = this._downCardContainer.width / 2 - card.width * card.scaleX / 2 + offX * i;
            card.y = this._downCardContainer.height / 2 - card.height * card.scaleY / 2;
            if (curCard != null) {
                this._downCardContainer.setChildIndex(card, this._downCardContainer.getChildIndex(curCard));
            }
            // this._downCardContainer.addChildAt(card,this._downMaxNum - i);
            this._downWifeCardList.push(card);
            curCard = card;
        }
        this._downCardContainer.x = -90 * flag;
    };
    AcThreeKingdomsBattleView.prototype.getServantInfo = function (servantid, up) {
        var view = this;
        var sinfo = up ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for (var i in sinfo) {
            if (Number(sinfo[i].sid) == Number(servantid)) {
                return sinfo[i];
            }
        }
    };
    AcThreeKingdomsBattleView.prototype.createCard = function (servantid, index, isMy) {
        var card = new BaseDisplayObjectContainer();
        card.width = 86;
        card.height = 86;
        var info = this.getServantInfo(servantid, isMy);
        var isblue = false;
        // if(isMy){
        //     isblue = Api.switchVoApi.checkIsInBlueWife() && info.sexflag && info.sexflag >= 1;
        // } else {
        //     isblue = info.sexflag && info.sexflag >= 1;
        // }
        var bg = BaseLoadBitmap.create("servant_cardbg_" + info.clv);
        bg.width = 194;
        bg.height = 192;
        bg.x = 0;
        bg.y = 0;
        bg.setScale(86 / bg.width);
        card.addChild(bg);
        var servantcfg = Config.ServantCfg.getServantItemById(servantid); //Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var servantskin = null;
        var iconStr = null;
        if (info.equip) {
            //皮肤
            servantskin = Config.ServantskinCfg.getServantSkinItemById(info.equip);
            iconStr = servantskin.icon;
        }
        else {
            iconStr = servantcfg.halfIcon;
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.width = 180;
        icon.height = 177;
        icon.setScale(85 / 180);
        icon.x = card.width / 2 - icon.width * icon.scaleX / 2;
        icon.y = 0;
        card.addChild(icon);
        icon.mask = new egret.Rectangle(0, 0, 186, 186);
        var nameSize = 18;
        if (PlatformManager.checkIsViSp()) {
            nameSize = 16;
        }
        // let name = ComponentManager.getTextField(wifeInfo.getName(isblue),nameSize,TextFieldConst.COLOR_BROWN);
        // //let name = ComponentManager.getTextField(wifeInfo.name,nameSize,TextFieldConst.COLOR_BROWN);
        // if(PlatformManager.checkIsViSp()){
        //     name.width = 100;
        //     name.textAlign = egret.HorizontalAlign.CENTER;
        //     name.y = card.height - 25 - name.height/2;
        // } else {
        //     name.y = card.height - 10 - name.height;
        // }
        // name.x = card.width/2 - name.width/2;
        // card.addChild(name);
        var select = BaseBitmap.create("wifebattlebattleview_select");
        select.width = card.width + 20;
        select.height = card.height + 20;
        select.x = -10;
        select.y = -10;
        card.addChild(select);
        card["select"] = select;
        card["index"] = index;
        select.visible = false;
        return card;
    };
    AcThreeKingdomsBattleView.prototype.setUpHero = function (picName, info, type, eff) {
        var tmpx = 0;
        var tmpy = 0;
        if (this._upHero) {
            tmpx = this._upHero.x;
            tmpy = this._upHero.y;
            this._upHero.dispose();
            this._upHero = null;
        }
        this._upHero = new BattleHero();
        this._upHero.init(picName, info, type, 0, eff);
        this._upHero.setPosition(tmpx, tmpy);
        this.addChildToContainer(this._upHero);
    };
    AcThreeKingdomsBattleView.prototype.setDownHero = function (picName, info, type, eff) {
        var tmpx = 0;
        var tmpy = 0;
        if (this._downHero) {
            tmpx = this._downHero.x;
            tmpy = this._downHero.y;
            this._downHero.dispose();
            this._downHero = null;
        }
        this._downHero = new BattleHero();
        this._downHero.init(picName, info, type, 1, eff);
        this._downHero.setPosition(tmpx, tmpy);
        this.addChildToContainer(this._downHero);
    };
    AcThreeKingdomsBattleView.prototype.stepBtnHandler = function () {
        if (!this._skip) {
            this._skip = true;
            this.showLoadingMask();
        }
    };
    AcThreeKingdomsBattleView.prototype.stopBattle = function () {
        this._isPause = true;
    };
    AcThreeKingdomsBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_battle_info",
            "threekingdomsbattleview",
            "specialview_commoni_namebg",
            "wifebattlebattleview_blackbg",
            "progress3_bg",
            "progress8",
            "progress7_bg",
            "skinshowkuang3",
            "wifebattlebattleview_flower1",
            "wifebattlebattleview_flower2",
            "wifebattlebattleview_playercardbg",
            "wifebattlebattleview_progresslight",
            "wifebattlebattleview_select",
            "atkrace_skip_down",
            "wifebattlebattleview_skinnamebg",
            "wifebattlebattleview_sprogressbar",
            "wifebattlebattleview_sprogressbg",
            "wifebattlebattleview_wifenamebg",
            "wifebattlebattleview_wifenamefg",
            "wifebattlebattleview_cardmask"
        ]);
    };
    AcThreeKingdomsBattleView.prototype.dispose = function () {
        if (this) {
            egret.Tween.removeTweens(this);
        }
        this._topGroup = null;
        this._downGroup = null;
        this._fightarr = null;
        this._point = 0;
        this._rewardnum = 0;
        this._winflag = 0;
        this._callback = null;
        this._target = null;
        if (this._stepBtn) {
            egret.Tween.removeTweens(this._stepBtn);
        }
        this._stepBtn = null;
        //我方
        this._downWifeCount = null;
        this._downTotalTalent = null;
        this._downCardContainer = null;
        this._downBProgress = null;
        this._downWifeCardList = null;
        //敌人
        this._upWifeCount = null;
        this._upTotalTalent = null;
        this._upCardContainer = null;
        this._upBProgress = null;
        this._upWifeCardList = null;
        // this._myCardDataList = null;
        // this._enemyCardDataList= null;
        this._curRound = 0;
        this._downSelectCard = null;
        this._upSelectCard = null;
        this._downMaxNum = 0;
        this._upMaxNum = 0;
        this._isPause = false;
        this._skip = false;
        this._isEnd = false;
        this._curRoundFirst = 0;
        this.isDeadAtk = false;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsBattleView;
}(BaseBattleView));
//# sourceMappingURL=AcThreeKingdomsBattleView.js.map