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
var ZhenqifangViewTab1ScrollItem = (function (_super) {
    __extends(ZhenqifangViewTab1ScrollItem, _super);
    function ZhenqifangViewTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._cdTxt = null;
        _this._servantList = null;
        _this._rewardsbg = null;
        _this._rewardStrTxt = null;
        _this._changecostTxt = null;
        _this._needTxt = null;
        _this._sendbtn = null;
        _this._changebtn = null;
        _this._getbtn = null;
        _this._listbg = null;
        _this._collectflag = null;
        _this._costGroup = null;
        _this._sadunTxt = null;
        return _this;
    }
    ZhenqifangViewTab1ScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT, this.checkSelect, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, this.checkSelect_friend, this);
        view.makeItem(index, data);
    };
    ZhenqifangViewTab1ScrollItem.prototype.makeItem = function (index, data) {
        var _this = this;
        var view = this;
        view._data = data;
        view.width = 600;
        view.height = data.empty ? (180) : (360);
        var bg = BaseBitmap.create(data.empty ? "public_9_bg75" : "public_9_bg14");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        view._listbg = bg;
        if (data.empty) {
            var lock = BaseBitmap.create("zqflock");
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, bg, [110, 0]);
            view.addChild(lock);
            var start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
            var endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
            var time = endNum - GameData.serverTime;
            var txt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip", [App.DateUtil.getFormatBySecond(time)]), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, bg, [0, 20]);
            view.addChild(txt);
            view._cdTxt = txt;
            //立即领取
            var rewardvo_1 = GameData.formatRewardItem(Config.ZhenqifangCfg.individual.getTaskNeed)[0];
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "zhenqifangfabu", function () {
                //
                var start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
                var endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
                var time = endNum - GameData.serverTime;
                var neednum = Math.ceil(time / single_1);
                var havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo_1.id);
                if (neednum > havenum) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: LanguageManager.getlocal("zhenqifangcdtip11", [neednum.toString(), rewardvo_1.name]),
                        needCancel: true,
                        title: "confirmBtn",
                        callback: function () {
                            Api.zhenqifangVoApi.freshlist = true;
                            NetManager.request(NetRequestConst.REQUEST_ZQF_GETITASK, {});
                        },
                        handler: view,
                        needClose: true,
                    });
                }
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 12]);
            view.addChild(btn);
            var icon = BaseBitmap.create("zqfitemicon2");
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [12, -icon.height - 5]);
            view.addChild(icon);
            var single_1 = Config.ZhenqifangCfg.individual.getTaskNum;
            var neednum = Math.ceil(time / single_1);
            var havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo_1.id);
            var needTxt = ComponentManager.getTextField(("<font color=" + (neednum > havenum ? 0xff3c3c : 0xffffff) + ">" + havenum + "</font>/" + neednum).toString(), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needTxt, icon, [icon.width, 0]);
            view.addChild(needTxt);
            view._needTxt = needTxt;
        }
        else {
            var titlebg = BaseBitmap.create("zqfitemtitlebg");
            view.addChild(titlebg);
            titlebg.x = 0;
            titlebg.y = 6;
            var sadunTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip9"), 20, TextFieldConst.COLOR_BLACK);
            view.addChild(sadunTxt);
            sadunTxt.visible = false;
            view._sadunTxt = sadunTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, sadunTxt, bg, [20, 25]);
            var time = data.time;
            var leveltype = BaseBitmap.create("zqf" + App.StringUtil.firstCharToLower(data.type) + "level");
            view.addChild(leveltype);
            leveltype.visible = data.friend == 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leveltype, titlebg, [-2, 0]);
            if (leveltype.visible && data.type != "D") {
                var clip = ComponentManager.getCustomMovieClip(App.StringUtil.firstCharToLower(data.type) + "levelscan", 10, 80);
                view.addChild(clip);
                clip.playWithTime(-1);
                clip.x = data.type == "S" ? -10.5 : -8;
                clip.y = data.type == "S" ? -8.5 : -4;
            }
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtaskname_" + data.friend + "_" + data.type + data.taskId), 22); //LanguageManager.getlocal(`zhenqifangtask${data.type}${index + 1}name`)
            view.addChild(nameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, leveltype, [data.friend == 0 ? leveltype.width : 15, 0]);
            var issend = data.st > 0;
            var timeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BLACK);
            view.addChild(timeTxt);
            var listbg = BaseBitmap.create("public_9_managebg");
            listbg.width = 580;
            listbg.height = 196;
            view.addChild(listbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, bg, [0, 60]);
            //切换
            var changeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "zhenqifangchangeevent", function () {
                //更换
                var total = data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0];
                var num = Api.zhenqifangVoApi.curFreeNum - total;
                if (num < 0) {
                    //免费
                    Api.zhenqifangVoApi.selIdx = _this._index;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_FRESHTASK, {
                        idx: view._index + 1,
                        taskType: data.friend ? 2 : 1,
                        cts: data.cts
                    });
                }
                else {
                    var costarr = data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask;
                    var costnum_1 = costarr[Math.min(num, costarr.length - 1)];
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: LanguageManager.getlocal("zhenqifangcdtip9", [costnum_1]),
                        needCancel: true,
                        title: "achuntingTipTitle",
                        callback: function () {
                            if (Api.playerVoApi.getPlayerGem() < costnum_1) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                                return;
                            }
                            Api.zhenqifangVoApi.selIdx = _this._index;
                            NetManager.request(NetRequestConst.REQUEST_ZQF_FRESHTASK, {
                                idx: view._index + 1,
                                taskType: data.friend ? 2 : 1,
                                cts: data.cts
                            });
                        },
                        handler: view,
                        needClose: true,
                    });
                }
                //
            }, view);
            view.addChild(changeBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, changeBtn, bg, [100, 13]);
            view._changebtn = changeBtn;
            var costGroup = new BaseDisplayObjectContainer();
            costGroup.width = 120;
            costGroup.height = 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, changeBtn, [0, -costGroup.height]);
            view._costGroup = costGroup;
            view.addChild(costGroup);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 40, 40);
            var goldIcon = BaseLoadBitmap.create("itemicon1", rect);
            goldIcon.x = 10;
            costGroup.addChild(goldIcon);
            var total = data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0];
            var num = Api.zhenqifangVoApi.curFreeNum - total;
            var cost = 0;
            if (num >= 0) {
                var costarr = data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask;
                cost = costarr[Math.min(num, costarr.length - 1)];
            }
            var goldText = ComponentManager.getTextField(cost == 0 ? LanguageManager.getlocal("achuntingFree") : cost.toString(), 18, TextFieldConst.COLOR_BLACK);
            view._changecostTxt = goldText;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldText, goldIcon, [goldIcon.width + 5, 0]);
            costGroup.addChild(goldText);
            if (issend) {
                costGroup.visible = false;
                changeBtn.setVisible(false);
                var num_1 = data.st + time - GameData.serverTime;
                timeTxt.text = LanguageManager.getlocal(num_1 <= 0 ? "zhenqifangcdtip10" : "zhenqifangcdtip2", [App.DateUtil.getFormatBySecond(num_1)]);
                var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                        idx: view._index + 1,
                        taskType: view._data.friend ? 2 : 1,
                        cts: view._data.cts
                    });
                }, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getBtn, bg, [0, 13]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getBtn, listbg, [0,listbg.height+40]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, bg, [100,13]);
                view._getbtn = getBtn;
                getBtn.visible = num_1 <= 0;
                view.addChild(getBtn);
                // if(data.friend == 1){
                //     changeBtn.visible = false;
                //     costGroup.visible = false;
                // }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeTxt, getBtn, [0, -timeTxt.height - 8]);
                var collectfalg = BaseBitmap.create("achievement_state1");
                collectfalg.anchorOffsetX = collectfalg.width / 2;
                collectfalg.anchorOffsetY = collectfalg.height / 2;
                collectfalg.setScale(0.8);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectfalg, timeTxt, [0, timeTxt.height - 10]);
                view.addChild(collectfalg);
                view._collectflag = collectfalg;
                collectfalg.visible = !getBtn.visible;
            }
            else {
                timeTxt.text = LanguageManager.getlocal("zhenqifangcdtip3", [App.DateUtil.getFormatBySecond(time, 16)]);
                var sendBtn_1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceTaskSendBtnTxt", function () {
                    //
                    if (sendBtn_1.getIsGray()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip8"));
                        return;
                    }
                    var servantarr = [];
                    var list = view._servantList;
                    for (var i in list._scrollListItemArr) {
                        var unit = list._scrollListItemArr[i];
                        if (unit.curServantId && Number(unit.curServantId) > 0) {
                            servantarr.push({
                                sid: unit.curServantId,
                                uid: unit.getUid()
                            });
                        }
                    }
                    //派遣
                    Api.zhenqifangVoApi.selIdx = _this._index;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_SELECTSERVANT, {
                        idx: view._index + 1,
                        taskType: data.friend ? 2 : 1,
                        slist: servantarr,
                        cts: data.cts
                    });
                }, view);
                view.addChild(sendBtn_1);
                sendBtn_1.setGray(true);
                view._sendbtn = sendBtn_1;
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, sendBtn_1, bg, [100, 13]);
                if (data.friend == 1 || data.first) {
                    changeBtn.visible = false;
                    costGroup.visible = false;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn_1, listbg, [0, listbg.height + 40]);
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeTxt, sendBtn_1, [0, -timeTxt.height - 8]);
            }
            view._cdTxt = timeTxt;
            //所需门客
            var bg1 = BaseBitmap.create("rankactivenamebg");
            bg1.rotation = -90;
            bg1.setScale(0.65);
            bg1.x = 4;
            bg1.y = 105;
            var needTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangneedservant"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(bg1);
            view.addChild(needTxt1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needTxt1, listbg, [0, 15]);
            //英 泰 俄 葡
            if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
                bg1.visible = false;
                needTxt1.setColor(TextFieldConst.COLOR_BLACK);
            }
            var tmpRect2 = new egret.Rectangle(0, 0, 490, 110);
            var servantarr = [];
            for (var i in data.svtInfo) {
                var unit = data.svtInfo[i];
                servantarr.push({
                    empty: unit.sid ? false : true,
                    servantID: unit.sid ? unit.sid : 0,
                    type: data.type,
                    taskId: data.taskId,
                    note: unit.note ? unit.note : null,
                    requirement: unit.requirement ? unit.requirement : null,
                    insend: unit.sid ? true : false,
                    index: index,
                    friend: data.friend,
                    needfriend: unit.friend,
                    clv: unit.clv ? unit.clv : 0,
                    equip: unit.equip ? unit.equip : "",
                    deduction: unit.deduction ? unit.deduction : 0,
                    taskdata: data,
                });
            }
            var servantlist = ComponentManager.getScrollList(data.friend ? ZhenqifangServantShowItem : ZhenqifangServantItem, servantarr, tmpRect2);
            servantlist.verticalScrollPolicy = "off";
            servantlist.setContentPosY(10);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servantlist, listbg, [115, 0]);
            view.addChild(servantlist);
            view._servantList = servantlist;
            var bg2 = BaseBitmap.create("rankactivenamebg");
            bg2.rotation = -90;
            bg2.setScale(0.65);
            bg2.x = 4;
            bg2.y = 200;
            var needTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangreward"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(bg2);
            view.addChild(needTxt2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needTxt2, listbg, [0, 110]);
            //英 泰 俄 葡
            if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
                bg2.visible = false;
                needTxt2.setColor(TextFieldConst.COLOR_BLACK);
            }
            var rewardsbg = BaseBitmap.create("battlepassfntbg-1");
            view.addChild(rewardsbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardsbg, needTxt2, [-5, needTxt2.textHeight + 12]);
            view._rewardsbg = rewardsbg;
            var rewardstrtxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(rewardstrtxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardstrtxt, rewardsbg);
            view._rewardStrTxt = rewardstrtxt;
            view.checkReward();
            var tmpRect = new egret.Rectangle(0, 0, 490, 108);
            var str = "1024_1_" + data.data.exp + "|";
            str += (data.getReward);
            var rewardstr = GameData.formatRewardItem(str);
            rewardstr.sort(function (a, b) {
                if (a.type == 1024) {
                    return -1;
                }
                else if (b.type == 1024) {
                    return 1;
                }
                else {
                    if (b._quality == a._quality) {
                        return a.id - b.id;
                    }
                    else {
                        return b._quality - a._quality;
                    }
                }
            });
            var rewardlist = ComponentManager.getScrollList(RewardItemScrollItem, rewardstr, tmpRect, 85 / 108);
            rewardlist.verticalScrollPolicy = "off";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardlist, listbg, [110, 100]);
            view.addChild(rewardlist);
        }
        TickManager.addTick(view.tick, view);
    };
    ZhenqifangViewTab1ScrollItem.prototype.checkSelect_friend = function (evt) {
        var data = evt.data;
        if (this._data.friend && this._data.st <= 0) {
            for (var i in data.data) {
                var unit = data.data[i];
                var item = this._servantList.getItemByIndex(Number(i));
                if (item && this._data.index == data.index) {
                    if (!Api.zhenqifangVoApi.friendsendList[unit.uid]) {
                        Api.zhenqifangVoApi.friendsendList[unit.uid] = {};
                    }
                    if (!Api.zhenqifangVoApi.friendsendList[unit.uid][unit.sid]) {
                        Api.zhenqifangVoApi.friendsendList[unit.uid][unit.sid] = 1;
                    }
                    if (!Api.zhenqifangVoApi.friendobj[this._index]) {
                        Api.zhenqifangVoApi.friendobj[this._index] = {};
                    }
                    if (!Api.zhenqifangVoApi.friendobj[this._index][i]) {
                        Api.zhenqifangVoApi.friendobj[this._index][i] = unit;
                    }
                    if (unit && (unit.id || unit.sid)) {
                        item.addServant(unit);
                    }
                    else {
                        item.clearServant();
                    }
                }
            }
            this.checkReward();
        }
    };
    ZhenqifangViewTab1ScrollItem.prototype.checkSelect = function (evt) {
        var data = evt.data;
        if (this._data.friend) {
            for (var i in data.data) {
                var unit = data.data[i];
                var item = this._servantList.getItemByIndex(Number(i));
                if (item && this._index == data.index) {
                    if (unit && (unit.id || unit.sid)) {
                        item.addServant(unit);
                    }
                    else {
                        item.clearServant();
                    }
                }
            }
            this.checkReward();
        }
    };
    ZhenqifangViewTab1ScrollItem.prototype.checkReward = function () {
        var view = this;
        var list = view._servantList;
        var count = 0;
        var servantnum = 0;
        //门客派遣
        var qiinjiaadd = 0;
        var total = 0;
        var issend = view._data.st > 0;
        if (issend) {
            for (var i in view._data.svtInfo) {
                var unit = view._data.svtInfo[i];
                if (unit.deduction) {
                    count += unit.deduction;
                }
                if (unit.addRate) {
                    qiinjiaadd += unit.addRate;
                }
            }
            total = qiinjiaadd - count;
        }
        else {
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                if (unit.checkIsNotAllReward()) {
                    ++count;
                }
                if (unit.curServantId && Number(unit.curServantId) > 0) {
                    ++servantnum;
                }
                if (unit.getUid() && unit._times >= Config.SadunCfg.needNum) {
                    var info = Api.adultVoApi.getFreiendNums2(unit._freind);
                    qiinjiaadd += Config.ZhenqifangCfg.rltvByMarr[info.quality - 1];
                }
            }
            total = qiinjiaadd - (view._data.friend ? Config.ZhenqifangCfg.friend.deduction : Config.ZhenqifangCfg.individual.deduction) * count;
            if (this._data.friend) {
                var sadunList = [];
                if (Api.switchVoApi.checkopenSadun()) {
                    var total_1 = Config.ZhenqifangCfg.friend.supportTimes;
                    for (var index = 0; index < Api.friendVoApi.sadunList.length; index++) {
                        var tmpData = Api.friendVoApi.sadunList[index];
                        tmpData["num"] = total_1 - Api.zhenqifangVoApi.getFriendSupportTimes(tmpData.uid);
                        if (tmpData["num"] > 0 && (typeof Api.zhenqifangVoApi.friendsendList[tmpData.uid] == "undefined" || Object.keys(Api.zhenqifangVoApi.friendsendList[tmpData.uid]).length == 0)) {
                            sadunList.push(tmpData);
                        }
                    }
                    sadunList.sort(function (dataA, dataB) {
                        return dataB["friend"] - dataA["friend"];
                    });
                }
                var selectuid = [];
                var servantlist = this._servantList;
                for (var i in servantlist._scrollListItemArr) {
                    var item = servantlist._scrollListItemArr[i];
                    if (item && item.getUid()) {
                        selectuid.push(Number(item.getUid()));
                    }
                }
                var flag = false;
                if (selectuid.length) {
                    for (var i = 0; i < sadunList.length; ++i) {
                        var uid = Number(sadunList[i]);
                        if (selectuid.indexOf(uid) == -1) {
                            flag = true;
                            break;
                        }
                    }
                }
                this._sadunTxt.visible = flag;
            }
        }
        if (total !== 0) {
            view._rewardsbg.visible = true;
            view._rewardStrTxt.text = "" + (total > 0 ? "+" : "") + (total * 100).toFixed(0) + "%";
            view._rewardStrTxt.textColor = total > 0 ? 0x21eb39 : TextFieldConst.COLOR_WARN_RED3;
        }
        else {
            view._rewardsbg.visible = false;
            view._rewardStrTxt.text = "";
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._rewardStrTxt, view._rewardsbg);
        if (view._sendbtn) {
            view._sendbtn.setGray(servantnum < list._scrollListItemArr.length);
        }
        if (servantnum == 0) {
            view._sadunTxt.visible = false;
        }
    };
    ZhenqifangViewTab1ScrollItem.prototype.checkBuzhen = function () {
        var view = this;
        if (view._data.empty) {
        }
        else {
            view.checkReward();
        }
    };
    ZhenqifangViewTab1ScrollItem.prototype.tick = function () {
        var view = this;
        if (view._data.empty) {
            var start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
            var endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
            var time = endNum - GameData.serverTime;
            if (time > 0) {
                var rewardvo = GameData.formatRewardItem(Config.ZhenqifangCfg.individual.getTaskNeed)[0];
                var single = Config.ZhenqifangCfg.individual.getTaskNum;
                var neednum = Math.ceil(time / single);
                var havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                var needTxt = ComponentManager.getTextField(("<font color=" + (neednum > havenum ? 0xff3c3c : 0xffffff) + ">" + neednum + "</font>/" + havenum).toString(), 20);
                view._needTxt.text = ("<font color=" + (neednum > havenum ? 0xff3c3c : 0xffffff) + ">" + havenum + "</font>/" + neednum).toString();
                view._cdTxt.text = LanguageManager.getlocal("zhenqifangcdtip", [App.DateUtil.getFormatBySecond(time)]);
            }
            else {
                //发消息同步
                Api.zhenqifangVoApi.freshlist = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
        }
        else {
            var total = view._data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0];
            var num = Api.zhenqifangVoApi.curFreeNum - total;
            var cost = 0;
            if (num >= 0) {
                var costarr = view._data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask;
                cost = costarr[Math.min(num, costarr.length - 1)];
            }
            view._changecostTxt.text = (cost == 0 ? LanguageManager.getlocal("achuntingFree") : cost.toString());
            var issend = view._data.st > 0;
            if (issend) {
                view._costGroup.visible = false;
                view._changebtn.setEnable(false);
                var num_2 = view._data.st + view._data.time - GameData.serverTime;
                if (num_2 > 0) {
                    view._collectflag.visible = true;
                    if (view._getbtn) {
                        view._getbtn.visible = false;
                    }
                    view._cdTxt.text = LanguageManager.getlocal("zhenqifangcdtip2", [App.DateUtil.getFormatBySecond(num_2)]);
                }
                else {
                    view._cdTxt.text = LanguageManager.getlocal("zhenqifangcdtip10");
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._getbtn, [0, -view._cdTxt.height - 8]);
                    view._collectflag.visible = false;
                    if (view._getbtn) {
                        view._getbtn.visible = true;
                    }
                    //发消息同步
                    // Api.zhenqifangVoApi.freshlist = true;
                    // NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
                }
            }
            else {
                if (view._data.friend == 1 || view._data.first) {
                    view._costGroup.visible = false;
                }
                else {
                    view._costGroup.visible = true;
                }
                view._changebtn.setEnable(true);
            }
        }
    };
    ZhenqifangViewTab1ScrollItem.prototype.refreshAfterSend = function (data) {
        var view = this;
        view._data = data;
        if (view._sendbtn) {
            view._sendbtn.visible = false;
        }
        if (view._changebtn) {
            view._changebtn.setVisible(false);
        }
        var num = view._data.st + view._data.time - GameData.serverTime;
        if (num) {
            view._cdTxt.text = LanguageManager.getlocal("zhenqifangcdtip2", [App.DateUtil.getFormatBySecond(num)]);
        }
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
            NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                idx: view._index + 1,
                taskType: view._data.friend ? 2 : 1,
                cts: view._data.cts
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getBtn, view._listbg, [0, 13]);
        view._cdTxt.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, getBtn, [0, -view._cdTxt.height - 8]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, view._listbg, [100,13]);
        view._getbtn = getBtn;
        getBtn.visible = false;
        view.addChild(getBtn);
        var collectfalg = BaseBitmap.create("achievement_state1");
        collectfalg.anchorOffsetX = collectfalg.width / 2;
        collectfalg.anchorOffsetY = collectfalg.height / 2;
        collectfalg.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectfalg, view._cdTxt, [0, view._cdTxt.height - 10]);
        view.addChild(collectfalg);
        view._collectflag = collectfalg;
        collectfalg.setScale(1.3);
        collectfalg.alpha = 0;
        egret.Tween.get(collectfalg).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 300).call(function () {
            view._cdTxt.alpha = 1;
        }, view);
        if (view._costGroup) {
            view._costGroup.visible = false;
        }
        if (!view._data.empty) {
            var list = view._servantList;
            for (var i in list._scrollListItemArr) {
                var tmp = list._scrollListItemArr[i];
                var unit = data.svtInfo[i];
                tmp.setDelBtn({
                    empty: unit.sid ? false : true,
                    servantID: unit.sid ? unit.sid : 0,
                    type: data.type,
                    taskId: data.taskId,
                    note: unit.note ? unit.note : null,
                    requirement: unit.requirement ? unit.requirement : null,
                    insend: unit.sid ? true : false,
                    index: view._index,
                    friend: data.friend,
                    needfriend: unit.friend,
                    clv: unit.clv ? unit.clv : 0,
                    equip: unit.equip ? unit.equip : "",
                    deduction: unit.deduction ? unit.deduction : 0,
                });
            }
        }
        if (Api.rookieVoApi.getIsGuiding()) {
            Api.rookieVoApi.checkNextStep();
        }
        view._sadunTxt.visible = false;
    };
    ZhenqifangViewTab1ScrollItem.prototype.refreshAfterFresh = function (data) {
        var view = this;
        for (var i = 0; i < 5; ++i) {
            var item = this._servantList.getItemByIndex(i);
            if (item) {
                var sid = item.curServantId;
                if (Api.zhenqifangVoApi.sendList.indexOf(sid) > -1) {
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(sid), 1);
                }
            }
        }
        TickManager.removeTick(view.tick, view);
        view.removeChildren();
        view._cdTxt = null;
        view._rewardsbg = null;
        view._servantList = null;
        view._rewardStrTxt = null;
        if (view._changecostTxt) {
            view._changecostTxt = null;
        }
        if (view._needTxt) {
            view._needTxt = null;
        }
        if (view._sendbtn) {
            view._sendbtn = null;
        }
        if (view._changebtn) {
            view._changebtn = null;
        }
        if (view._listbg) {
            view._listbg = null;
        }
        if (view._collectflag) {
            view._collectflag = null;
        }
        if (view._getbtn) {
            view._getbtn = null;
        }
        if (view._costGroup) {
            view._costGroup = null;
        }
        view.makeItem(view._index, data);
    };
    ZhenqifangViewTab1ScrollItem.prototype.canSend = function () {
        var issend = false;
        if (this._data.friend == 0) {
            issend = this._sendbtn && !this._sendbtn.getIsGray() && this._data.st <= 0;
        }
        else {
            issend = this._sendbtn && !this._sendbtn.getIsGray() && this._data.st <= 0;
        }
        return issend;
    };
    ZhenqifangViewTab1ScrollItem.prototype.isSend = function () {
        var flag = false;
        var issend = this._data.st > 0;
        return issend;
    };
    ZhenqifangViewTab1ScrollItem.prototype.isInState = function () {
        var flag = false;
        var issend = this._data.st > 0;
        if (this._data.friend == 0) {
            flag = !this._data.empty && !issend && !this.canSend();
        }
        else {
            flag = !this._data.empty && !issend && !this.canSend();
        }
        return flag;
    };
    ZhenqifangViewTab1ScrollItem.prototype.getServantArr = function () {
        var view = this;
        var servantarr = [];
        if (!view._data.empty) {
            var list = view._servantList;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                if (unit.curServantId && Number(unit.curServantId) > 0) {
                    servantarr.push({
                        sid: String(unit.curServantId),
                        uid: unit.getUid()
                    });
                }
            }
        }
        return servantarr;
    };
    ZhenqifangViewTab1ScrollItem.prototype.setServantArr = function (canselectarr, haveservantarr) {
        var view = this;
        var list = view._servantList;
        if (list) {
            var now = 0;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                if (unit.curServantId && Number(unit.curServantId) > 0) {
                    ++now;
                }
            }
            var _loop_1 = function (i) {
                var unit = list._scrollListItemArr[i];
                if (unit.curServantId && Number(unit.curServantId) > 0) {
                }
                else {
                    var tmp = [];
                    if (canselectarr.length >= (5 - now)) {
                        if (unit._data.note) {
                            for (var i_1 in canselectarr) {
                                var info_1 = Api.servantVoApi.getServantObj(canselectarr[i_1]);
                                if (info_1[unit._data.note] >= unit._data.requirement) {
                                    tmp.push(canselectarr[i_1]);
                                }
                            }
                            if (tmp.length) {
                                tmp.sort(function (a, b) {
                                    var infoa = Api.servantVoApi.getServantObj(a);
                                    var infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[unit._data.note] - infob[unit._data.note];
                                });
                            }
                            else {
                                canselectarr.sort(function (a, b) {
                                    var infoa = Api.servantVoApi.getServantObj(a);
                                    var infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[unit._data.note] - infob[unit._data.note];
                                });
                            }
                        }
                        else {
                            canselectarr.sort(function (a, b) {
                                var infoa = Api.servantVoApi.getServantObj(a);
                                var infob = Api.servantVoApi.getServantObj(b);
                                return infoa.total - infob.total;
                            });
                        }
                        var sid = tmp.length ? tmp[0] : canselectarr[0];
                        var info = Api.servantVoApi.getServantObj(sid);
                        unit.fresh_servant({
                            id: sid,
                            uid: 0,
                            clv: info.clv,
                            equip: info.equip,
                            value: unit._data.note ? info[unit._data.note] : info.total
                        });
                        canselectarr.splice(canselectarr.indexOf(sid), 1);
                        haveservantarr.push(sid);
                        ++now;
                    }
                }
            };
            for (var i in list._scrollListItemArr) {
                _loop_1(i);
            }
        }
    };
    /**
     * 不同格子X间距
     */
    ZhenqifangViewTab1ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    ZhenqifangViewTab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ZhenqifangViewTab1ScrollItem.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT, this.checkSelect, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, this.checkSelect_friend, this);
        TickManager.removeTick(view.tick, view);
        view._data = null;
        view._cdTxt = null;
        view._rewardsbg = null;
        view._servantList = null;
        view._rewardStrTxt = null;
        view._sadunTxt = null;
        if (view._changecostTxt) {
            view._changecostTxt = null;
        }
        if (view._needTxt) {
            view._needTxt = null;
        }
        if (view._sendbtn) {
            view._sendbtn = null;
        }
        if (view._changebtn) {
            view._changebtn = null;
        }
        if (view._listbg) {
            view._listbg = null;
        }
        if (view._collectflag) {
            view._collectflag = null;
        }
        if (view._getbtn) {
            view._getbtn = null;
        }
        if (view._costGroup) {
            view._costGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangViewTab1ScrollItem;
}(ScrollListItem));
__reflect(ZhenqifangViewTab1ScrollItem.prototype, "ZhenqifangViewTab1ScrollItem");
//# sourceMappingURL=ZhenqifangViewTab1ScrollItem.js.map