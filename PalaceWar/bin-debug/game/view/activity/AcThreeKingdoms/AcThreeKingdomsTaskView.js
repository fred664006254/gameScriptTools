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
 * 三国争霸派遣任务弹窗
 * author qianjun
 */
var AcThreeKingdomsTaskView = (function (_super) {
    __extends(AcThreeKingdomsTaskView, _super);
    function AcThreeKingdomsTaskView() {
        var _this = _super.call(this) || this;
        _this._cdTxt = null;
        _this._tipTxt = null;
        _this._btn = null;
        _this._sendbtn = null;
        _this._fightcd = 0;
        _this._showlist = null;
        _this._selectlist = null;
        _this._tasktype = null;
        _this._rewardGroup = null;
        _this._needTxt = null;
        _this._servantgroup = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsTaskView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTaskView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomstaskview", "mlservantempty-1", "servant_namebg", "acchristmasview_smalldescbg", "mlservantmask-1",
            "mlservantselected-1", "awservantstate1",
        ]);
    };
    AcThreeKingdomsTaskView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsTaskView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsTaskView.prototype.initView = function () {
        var _this = this;
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANCLOSE_REFRESH, view.freshlist, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_TASKSTART, view.sendBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THREEKINGDOMS_HIDE, view.hide, view);
        var code = view.getUiCode();
        var vo = view.vo;
        var cfg = view.cfg;
        var isCentercity = view.kingdomid == 0;
        var info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        var status = info.status;
        //2武3知4政5魅1全属性
        var tasktype = view.cityId;
        var tasklevel = info.level;
        var taskcfg = view.cfg.taskList[tasklevel - 1];
        view._taskNeed = taskcfg.servantNeed;
        var taskTimeBg = BaseBitmap.create("threekingdomsrectbg2");
        taskTimeBg.width = 450;
        view.addChildToContainer(taskTimeBg);
        taskTimeBg.setPosition(view.viewBg.x + (view.viewBg.width - taskTimeBg.width) / 2, 10);
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip", code), [App.DateUtil.getFormatBySecond(taskcfg.needTime, 16)]), 22);
        view.addChildToContainer(taskTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt, taskTimeBg);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 470;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, taskTimeBg, [0, taskTimeBg.height + 15]);
        //getServantInfoListWithSort
        var taskbg = BaseBitmap.create("threekingdomstaskbg");
        view.addChildToContainer(taskbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, taskbg, bg, [0, 7]);
        //主城有特殊需求
        var ginfo = view.vo.getGeneralPlayerInfo();
        if (view.cityId == 1 && ginfo) {
            //大都督人物
            var curLv = ginfo.level;
            var posX = 20;
            var tinfo = App.CommonUtil.getTitleData(ginfo.title);
            if (tinfo.clothes != "") {
                if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)) {
                    curLv = tinfo.clothes;
                }
            }
            var userContainer = Api.playerVoApi.getPlayerPortrait(curLv, ginfo.pic);
            userContainer.anchorOffsetX = userContainer.width / 2;
            userContainer.mask = egret.Rectangle.create().setTo(0, 0, 490, 250);
            userContainer.x = 430;
            userContainer.y = taskbg.y + taskbg.height - 250;
            view.addChildToContainer(userContainer);
            //语言文本
            var descBg = BaseBitmap.create('public_9_bg42');
            view.addChildToContainer(descBg);
            descBg.width = 220;
            var arrowBM = BaseBitmap.create("public_9_bg13_tail");
            arrowBM.anchorOffsetX = arrowBM.width / 2;
            arrowBM.anchorOffsetY = arrowBM.height / 2;
            arrowBM.scaleX = -1;
            view.addChildToContainer(arrowBM);
            var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomstasktip17-" + view.getUiCode()), 22, TextFieldConst.COLOR_BROWN);
            descTxt.width = 190;
            descTxt.lineSpacing = 5;
            view.addChildToContainer(descTxt);
            descBg.height = descTxt.textHeight + 36;
            descBg.setPosition(150, 105);
            arrowBM.setPosition(322, 197);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        }
        //acThreeKingdomstaskname1
        var namebg = BaseBitmap.create("threekingdomsrectbg3");
        namebg.width = 420;
        namebg.height = 40;
        // view.addChildToContainer(namebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, taskbg, [0, 3]);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstaskname" + view.cityId, code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
        var line = BaseBitmap.create("public_line3");
        line.width = 400;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, nameTxt);
        var taskType = BaseBitmap.create("threekingdomstasktype" + tasklevel);
        view.addChildToContainer(taskType);
        view._tasktype = taskType;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, taskType, taskbg, [15, 125]);
        var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip3", code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardTxt, taskType, [taskType.width, 0]);
        //奖励物品
        var rewardGroup = new BaseDisplayObjectContainer();
        rewardGroup.x = taskbg.x + 18;
        rewardGroup.y = taskbg.y + 175;
        view.addChildToContainer(rewardGroup);
        view._rewardGroup = rewardGroup;
        var rewardstr = "1047_1_" + taskcfg.addHeroExp + "|" + taskcfg.getReward;
        var rIcons = GameData.getRewardItemIcons(rewardstr, true);
        var len = rIcons.length;
        var tmpX = 0;
        for (var innerIdx = 0; innerIdx < len; innerIdx++) {
            var element = rIcons[innerIdx];
            element.x = tmpX;
            element.y = 0;
            element.setScale(0.8);
            tmpX += (element.width * element.scaleX + 10);
            // if (tmpX >= GameConfig.stageWidth)
            // {
            //     tmpX = 20;
            //     scroStartY += element.height + 15;
            //     element.x = tmpX;
            //     element.y = scroStartY;
            //     tmpX +=  (element.width+ 15);
            // }
            element.cacheAsBitmap = true;
            rewardGroup.addChild(element);
        }
        var cutline = BaseBitmap.create("public_cut_line");
        view.addChildToContainer(cutline);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cutline, taskbg, [0, taskbg.height + 7]);
        //门客列表展示
        var servantObj = [];
        //已派遣
        if (status == 2) {
            servantObj = info.servantArr;
        }
        else {
            servantObj = []; //view.vo.getLastTeamInfo(army);
        }
        view.vo.selectServant = {};
        var tmp = [];
        for (var i = 0; i < this._taskNeed; ++i) {
            if (servantObj[i]) {
                var obj_1 = Api.servantVoApi.getServantObj(servantObj[i]);
                tmp.push({
                    data: obj_1,
                    bookvalue: obj_1.getTotalBookValue(view.cityId - 1),
                });
            }
            else {
                tmp.push({
                    empty: true
                });
            }
        }
        tmp.sort(function (a, b) {
            return b.bookvalue - a.bookvalue;
        });
        var tmpRect = new egret.Rectangle(0, 0, 490, 95);
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsTaskServantItem, tmp, tmpRect, view.cityId);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, cutline, [0, cutline.height + 15]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        scrollList.verticalScrollPolicy = 'off';
        view._showlist = scrollList;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip" + (status == 2 ? (tasklevel == view.cfg.taskList.length ? 19 : 11) : 5), code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scrollList, [0, scrollList.height + 15]);
        view._tipTxt = tipTxt;
        //奖励升级
        var fightBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode("acThreeKingdomstasktip2", code), function () {
            if (1) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSUPGRADEREWARDVIEW, {
                    cityId: view.cityId,
                    aid: view.aid,
                    code: view.code
                });
            }
            // App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip1`, code)));
        }, view);
        view.addChildToContainer(fightBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fightBtn, bg, [70, bg.height + 15]);
        //选择门客
        var selectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomstasktip4", code), function () {
            if (!view.vo.isInTaskTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip18", code)));
                return;
            }
            if (Object.keys(view.vo.selectServant).length < _this._taskNeed) {
                if (servantgroup.y == (GameConfig.stageHeigth - servantgroup.height)) {
                    return;
                }
                var obj_2 = Api.servantVoApi.getServantInfoList();
                var info_1 = view.vo.getCityTaskStaus(view.cityId);
                var tasklevel_1 = info_1.level;
                var taskcfg_1 = view.cfg.taskList[tasklevel_1 - 1];
                var tmparr = [];
                for (var i in obj_2) {
                    var unit = obj_2[i];
                    var attend = view.vo.getServantAttend(Number(unit.servantId));
                    tmparr.push({
                        bookvalue: unit.getTotalBookValue(view.cityId - 1),
                        data: unit,
                        isAttend: attend,
                        need: view.cityId == 1 ? taskcfg_1.needValue2 : taskcfg_1.needValue1
                    });
                }
                tmparr.sort(function (a, b) {
                    if (a.isAttend && b.isAttend) {
                        return b.bookvalue - a.bookvalue;
                    }
                    else if (a.isAttend) {
                        return 1;
                    }
                    else if (b.isAttend) {
                        return -1;
                    }
                    else {
                        return b.bookvalue - a.bookvalue;
                    }
                });
                servantlist.refreshData(tmparr, { code: view.code, cityid: view.cityId });
                view._tmp = Api.chatVoApi.object_clone(view.vo.selectServant);
                egret.Tween.get(view.closeBtn).to({ y: view.closeBtn.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.closeBtn);
                }, view);
                egret.Tween.get(view.titleTF).to({ y: view.titleTF.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.titleTF);
                }, view);
                egret.Tween.get(view.container).to({ y: view.container.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.container);
                }, view);
                egret.Tween.get(view.viewBg).to({ y: view.viewBg.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.viewBg);
                    var tmpy = GameConfig.stageHeigth - servantgroup.height;
                    servantgroup.y = GameConfig.stageHeigth;
                    servantgroup.alpha = 1;
                    egret.Tween.get(servantgroup).to({ y: tmpy }, servantgroup.height / 1).call(function () {
                        egret.Tween.removeTweens(servantgroup);
                    }, view);
                }, view);
            }
            else {
                //派遣门客
                var arr_1 = [];
                for (var i in view.vo.selectServant) {
                    arr_1.push(i.toString());
                }
                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_TASKSTART, {
                    activeId: view.vo.aidAndCode,
                    cityId: view.cityId == 1 ? 5 : (view.cityId - 1),
                    sids: arr_1,
                });
            }
        }, view);
        view.addChildToContainer(selectBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, selectBtn, bg, [70, bg.height + 15]);
        view._sendbtn = selectBtn;
        var timeCdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        if (info.status == 2) {
            selectBtn.visible = false;
            timeCdTxt.text = App.DateUtil.getFormatBySecond(info.et - GameData.serverTime);
            ;
        }
        view.addChildToContainer(timeCdTxt);
        timeCdTxt.lineSpacing = 5;
        timeCdTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCdTxt, selectBtn, [0, 5]);
        view._cdTxt = timeCdTxt;
        var servantgroup = new BaseDisplayObjectContainer();
        servantgroup.width = GameConfig.stageWidth;
        servantgroup.height = 415;
        servantgroup.touchEnabled = true;
        view.addChild(servantgroup);
        view._servantgroup = servantgroup;
        var listbg = BaseBitmap.create("threekingdomstaskservantbg");
        listbg.height = 330;
        servantgroup.addChild(listbg);
        var needBg = BaseBitmap.create("acchristmasview_smalldescbg");
        needBg.width = 550;
        needBg.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needBg, servantgroup, [0, 50], true);
        servantgroup.addChild(needBg);
        var needTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip6", code), [LanguageManager.getlocal("servantInfo_speciality" + (view.cityId == 1 ? 7 : (view.cityId - 1))), (view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1).toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, needTxt, needBg);
        servantgroup.addChild(needTxt);
        view._needTxt = needTxt;
        var bottomBg = BaseBitmap.create("arena_bottom");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, servantgroup, [0, 0], true);
        servantgroup.addChild(bottomBg);
        var obj = Api.servantVoApi.getServantInfoList();
        var arr = [];
        for (var i in obj) {
            var unit = obj[i];
            var attend = view.vo.getServantAttend(Number(unit.servantId));
            arr.push({
                bookvalue: unit.getTotalBookValue(view.cityId - 1),
                data: unit,
                isAttend: attend,
                need: view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1
            });
        }
        arr.sort(function (a, b) {
            if (a.isAttend && b.isAttend) {
                return b.bookvalue - a.bookvalue;
            }
            else if (a.isAttend) {
                return 1;
            }
            else if (b.isAttend) {
                return -1;
            }
            else {
                return b.bookvalue - a.bookvalue;
            }
        });
        //选择门客
        var tmpRect2 = new egret.Rectangle(0, 0, 600, bottomBg.y - needBg.y - needBg.height - 15);
        var servantlist = ComponentManager.getScrollList(AcThreeKingdomsTaskSelectServantItem, arr, tmpRect2, {
            code: view.code,
            cityid: view.cityId
        });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servantlist, needBg, [10, needBg.height + 10]);
        servantgroup.addChild(servantlist);
        servantlist.bounces = false;
        view._selectlist = servantlist;
        // view._servantList = servantlist;
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "confirmBtn", function () {
            if (Object.keys(view.vo.selectServant).length == _this._taskNeed) {
                egret.Tween.get(servantgroup).to({ y: GameConfig.stageHeigth }, servantgroup.height / 1).call(function () {
                    egret.Tween.removeTweens(servantgroup);
                    egret.Tween.get(view.viewBg).to({ y: view.viewBg.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.viewBg);
                    }, view);
                    egret.Tween.get(view.closeBtn).to({ y: view.closeBtn.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.closeBtn);
                    }, view);
                    egret.Tween.get(view.titleTF).to({ y: view.titleTF.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.titleTF);
                    }, view);
                    egret.Tween.get(view.container).to({ y: view.container.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.container);
                    }, view);
                }, view);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip5", code)));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bottomBg, [70, 0]);
        servantgroup.addChild(btn);
        view._btn = btn;
        view._btn.setGray(Object.keys(view.vo.selectServant).length < this._taskNeed);
        var cancelbtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "cancelBtn", function () {
            if (1) {
                egret.Tween.get(servantgroup).to({ y: GameConfig.stageHeigth }, servantgroup.height / 1).call(function () {
                    egret.Tween.removeTweens(servantgroup);
                    egret.Tween.get(view.viewBg).to({ y: view.viewBg.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.viewBg);
                    }, view);
                    egret.Tween.get(view.closeBtn).to({ y: view.closeBtn.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.closeBtn);
                    }, view);
                    egret.Tween.get(view.titleTF).to({ y: view.titleTF.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.titleTF);
                    }, view);
                    egret.Tween.get(view.container).to({ y: view.container.y + 70 }, 300).call(function () {
                        egret.Tween.removeTweens(view.container);
                    }, view);
                    view.vo.selectServant = Api.chatVoApi.object_clone(view._tmp);
                    var tmp = [];
                    for (var i in view.vo.selectServant) {
                        var sid = i;
                        var servantobj = Api.servantVoApi.getServantObj(sid);
                        if (servantObj) {
                            tmp.push({
                                data: servantobj,
                                bookvalue: servantobj.getTotalBookValue(view.cityId - 1),
                            });
                        }
                    }
                    if (tmp.length < _this._taskNeed) {
                        var len_1 = tmp.length;
                        for (var i = 0; i < (5 - len_1); ++i) {
                            tmp.push({
                                empty: true
                            });
                        }
                    }
                    tmp.sort(function (a, b) {
                        return b.bookvalue - a.bookvalue;
                    });
                    view._showlist.refreshData(tmp, view.cityId);
                    view.freshServant();
                }, view);
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cancelbtn, bottomBg, [70, 0]);
        servantgroup.addChild(cancelbtn);
        servantgroup.alpha = 0;
        servantgroup.y = GameConfig.stageHeigth;
        view.tick();
    };
    AcThreeKingdomsTaskView.prototype.tick = function () {
        var view = this;
        // -- view._fightcd; 
        var info = view.vo.getCityTaskStaus(view.cityId);
        var count = info.et - GameData.serverTime;
        if (info.status == 2) {
            view._sendbtn.visible = false;
            if (count > 0) {
                view._cdTxt.text = LanguageManager.getlocal("allianceTaskSendBtnTxt3") + "\n" + App.DateUtil.getFormatBySecond(count);
            }
            else {
                view._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
            }
        }
        else if (info.status == 3 || info.status == 4) {
            view._sendbtn.visible = false;
            view._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._fightNumTxt, view._tipTxt, [0,view._tipTxt.height+20]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._tipTxt, [0,view._tipTxt.height+20]);     
    };
    AcThreeKingdomsTaskView.prototype.getShowHeight = function () {
        return 700;
    };
    AcThreeKingdomsTaskView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomstasktitle", this.getUiCode());
    };
    AcThreeKingdomsTaskView.prototype.attackBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            var info = view.vo.getCityTaskStaus(view.cityId);
            view._tasktype.setRes("threekingdomstasktype" + info.level);
            view._rewardGroup.removeChildren();
            var taskcfg = view.cfg.taskList[info.level - 1];
            var rewardstr = "1047_1_" + taskcfg.addHeroExp + "|" + taskcfg.getReward;
            var rIcons = GameData.getRewardItemIcons(rewardstr, true);
            var len = rIcons.length;
            var tmpX = 0;
            for (var innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons[innerIdx];
                element.x = tmpX;
                element.y = 0;
                element.setScale(0.8);
                tmpX += (element.width * element.scaleX + 10);
                // if (tmpX >= GameConfig.stageWidth)
                // {
                //     tmpX = 20;
                //     scroStartY += element.height + 15;
                //     element.x = tmpX;
                //     element.y = scroStartY;
                //     tmpX +=  (element.width+ 15);
                // }
                element.cacheAsBitmap = true;
                view._rewardGroup.addChild(element);
            }
            view._needTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip6", view.getUiCode()), [LanguageManager.getlocal("servantInfo_speciality" + (view.cityId == 1 ? 7 : (view.cityId - 1))), (view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1).toString()]);
            view.freshlist();
        }
    };
    AcThreeKingdomsTaskView.prototype.sendBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("countryWarSuccessServantTip"));
            view.hide();
        }
    };
    AcThreeKingdomsTaskView.prototype.checkBuzhen = function (event) {
        var data = event.data;
        var view = this;
        var type = data.type;
        var info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        var status = info.status;
        if (status != 1) {
            return;
        }
        if (type == "add") {
            if (Object.keys(view.vo.selectServant).length == this._taskNeed) {
                return;
            }
            view.vo.selectServant[data.servantId] = 1;
        }
        else if (type == "delete") {
            if (Object.keys(view.vo.selectServant).length == this._taskNeed && (view._servantgroup.y == GameConfig.stageHeigth && status == 1)) {
                view._tmp = Api.chatVoApi.object_clone(view.vo.selectServant);
                egret.Tween.get(view.closeBtn).to({ y: view.closeBtn.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.closeBtn);
                }, view);
                egret.Tween.get(view.titleTF).to({ y: view.titleTF.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.titleTF);
                }, view);
                egret.Tween.get(view.container).to({ y: view.container.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.container);
                }, view);
                egret.Tween.get(view.viewBg).to({ y: view.viewBg.y - 70 }, 300).call(function () {
                    egret.Tween.removeTweens(view.viewBg);
                    var tmpy = GameConfig.stageHeigth - view._servantgroup.height;
                    view._servantgroup.y = GameConfig.stageHeigth;
                    view._servantgroup.alpha = 1;
                    egret.Tween.get(view._servantgroup).to({ y: tmpy }, view._servantgroup.height / 1).call(function () {
                        egret.Tween.removeTweens(view._servantgroup);
                    }, view);
                }, view);
                return;
            }
            delete view.vo.selectServant[data.servantId];
        }
        view._btn.setGray(Object.keys(view.vo.selectServant).length < this._taskNeed);
        view._tipTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip" + (Object.keys(view.vo.selectServant).length < this._taskNeed ? "5" : "10"), view.getUiCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipTxt, view._showlist, [0, view._showlist.height + 15]);
        view.freshServant();
    };
    AcThreeKingdomsTaskView.prototype.freshServant = function () {
        var view = this;
        var arr = [];
        var list = view._selectlist;
        for (var i in view.vo.selectServant) {
            var obj = Api.servantVoApi.getServantObj(i);
            arr.push({
                data: obj,
                bookvalue: obj.getTotalBookValue(view.cityId - 1),
            });
        }
        arr.sort(function (a, b) {
            return b.bookvalue - a.bookvalue;
        });
        if (arr.length < this._taskNeed) {
            for (var i = arr.length; i < this._taskNeed; ++i) {
                arr.push({
                    empty: true
                });
            }
        }
        view._showlist.refreshData(arr, view.cityId);
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (view.vo.selectServant[unit._servantInfoVo.servantId]) {
                unit.checkSelect(1);
            }
            else {
                unit.checkSelect(2);
            }
        }
        view._tipTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip" + (Object.keys(view.vo.selectServant).length < this._taskNeed ? "5" : "10"), view.getUiCode()));
        view._sendbtn.setText(App.CommonUtil.getCnByCode(Object.keys(view.vo.selectServant).length == this._taskNeed ? "acThreeKingdomstasktip12" : "acThreeKingdomstasktip4", view.code), true);
        // view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyScore-${view.uiCode}`, [LanguageManager.getlocal(`acmainlandarmy${view._army}-${view.uiCode}`), App.StringUtil.changeIntToText(num)]);
        // view.update();
    };
    AcThreeKingdomsTaskView.prototype.freshlist = function () {
        var view = this;
        var obj = Api.servantVoApi.getServantInfoList();
        var info = view.vo.getCityTaskStaus(view.cityId);
        var tasklevel = info.level;
        var taskcfg = view.cfg.taskList[tasklevel - 1];
        var arr = [];
        for (var i in obj) {
            var unit = obj[i];
            var attend = view.vo.getServantAttend(Number(unit.servantId));
            arr.push({
                bookvalue: unit.getTotalBookValue(view.cityId - 1),
                data: unit,
                isAttend: attend,
                need: view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1
            });
        }
        arr.sort(function (a, b) {
            if (a.isAttend && b.isAttend) {
                return b.bookvalue - a.bookvalue;
            }
            else if (a.isAttend) {
                return 1;
            }
            else if (b.isAttend) {
                return -1;
            }
            else {
                return b.bookvalue - a.bookvalue;
            }
        });
        view._selectlist.refreshData(arr, {
            code: view.code,
            cityid: view.cityId
        });
        var list = view._selectlist;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            if (view.vo.selectServant[unit._servantInfoVo.servantId]) {
                unit.checkSelect(1);
            }
            else {
                unit.checkSelect(2);
            }
        }
        var tmp = [];
        for (var i = 0; i < this._taskNeed; ++i) {
            var unit = Object.keys(view.vo.selectServant)[i];
            var servantObj = Api.servantVoApi.getServantObj(unit);
            if (servantObj) {
                tmp.push({
                    data: servantObj,
                    bookvalue: servantObj.getTotalBookValue(view.cityId - 1),
                });
            }
            else {
                tmp.push({
                    empty: true
                });
            }
        }
        tmp.sort(function (a, b) {
            return b.bookvalue - a.bookvalue;
        });
        view._showlist.refreshData(tmp, view.cityId);
    };
    AcThreeKingdomsTaskView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, view.checkBuzhen, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANCLOSE_REFRESH, view.freshlist, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_TASKSTART, view.sendBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THREEKINGDOMS_HIDE, view.hide, view);
        view._cdTxt = null;
        view._tipTxt = null;
        view._fightcd = 0;
        view._btn = null;
        view._selectlist = null;
        view._showlist = null;
        view._sendbtn = null;
        view._tasktype = null;
        view._rewardGroup.dispose();
        view._taskNeed = 0;
        view._servantgroup = null;
        view._needTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsTaskView;
}(PopupView));
__reflect(AcThreeKingdomsTaskView.prototype, "AcThreeKingdomsTaskView");
//# sourceMappingURL=AcThreeKingdomsTaskView.js.map