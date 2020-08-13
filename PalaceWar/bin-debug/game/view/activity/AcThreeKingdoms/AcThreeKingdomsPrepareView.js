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
 * 三国争霸城市进攻准备弹窗
 * author qianjun
 */
var AcThreeKingdomsPrepareView = (function (_super) {
    __extends(AcThreeKingdomsPrepareView, _super);
    function AcThreeKingdomsPrepareView() {
        var _this = _super.call(this) || this;
        _this._cdTxt = null;
        _this._fightNumTxt = null;
        _this._tipTxt = null;
        _this._costTxt = null;
        _this._line = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsPrepareView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsPrepareView.prototype, "judianid", {
        get: function () {
            return this.param.data.judianid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsPrepareView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "titleupgradearrow"
        ]);
    };
    AcThreeKingdomsPrepareView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsPrepareView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsPrepareView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, requestData: {
                activeId: this.vo.aidAndCode,
            } };
    };
    //请求回调
    AcThreeKingdomsPrepareView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO) {
            this.vo.setMapInfo(rData.data);
        }
    };
    AcThreeKingdomsPrepareView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.attackBack, view);
        var code = view.getUiCode();
        var vo = view.vo;
        var cfg = view.cfg;
        var isCentercity = view.kingdomid == 0;
        var info = view.vo.getJudianPlayerInfo(view.kingdomid, view.cityId, view.judianid);
        // obj = {
        //     uid : 1,
        //     pic : 1,
        //     ptitleid : 4000 + id,
        //     name : '玩家名',
        //     kingdomid : App.MathUtil.getRandom(1,4),
        //     army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
        // };
        //1 对战敌军 2 对战npc 3 对友方部队 4 对自己部队 
        var type = 1;
        if (info) {
            if (info.uid == Api.playerVoApi.getPlayerID()) {
                type = 4;
            }
            else if (info.kingdomid == view.vo.getMyKingdoms()) {
                type = 3;
            }
            else {
                type = 1;
            }
        }
        else {
            type = 2;
        }
        //顶部描述
        var descbg = BaseBitmap.create("public_9_bg95");
        descbg.width = 220;
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparetopdesc" + type, code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(descbg);
        view.addChildToContainer(descTxt);
        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        //顶部信息
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = 515;
        bg.height = 115;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, descbg, [0, descbg.height + 10]);
        var armynum = '';
        var zhankingdomn = view.kingdomid;
        //玩家头像
        if (type != 2) {
            armynum = info.army;
            zhankingdomn = info.kingdomid;
            //头像框
            var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(info.pic), (info.ptitleid));
            view.addChildToContainer(headContainer);
            headContainer.addTouchTap(function () {
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                    ruid: info.uid,
                    rzid: Api.mergeServerVoApi.getTrueZid(info.uid)
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, headContainer, bg, [15, 0]);
            //玩家名
            var namebg = BaseBitmap.create("public_titlebg");
            namebg.width = 240;
            view.addChildToContainer(namebg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, namebg, headContainer, [headContainer.width + 7, 5]);
            var playernameTxt = ComponentManager.getTextField(info.name + "\uFF08" + Api.mergeServerVoApi.getAfterMergeSeverName(info.uid, true, info.zid) + "\uFF09", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChildToContainer(playernameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, playernameTxt, namebg, [20, 0]);
            var armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip" + (type == 4 ? 54 : 29), code), [armynum.toString(), (info.army / info.max * 100).toFixed(0)]), 22, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(armynumTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armynumTxt, namebg, [0, namebg.height + 20]);
            // playernameTxt.textColor = Number(info.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
            //称号
            // let titleId = info.titleid;
            // let width = 0;
            // if(titleId){
            // 	let titleinfo = App.CommonUtil.getTitleData(titleId);
            // 	if(titleinfo.title != ``){
            // 		let titleImg = App.CommonUtil.getTitlePic(titleinfo);
            // 		titleImg.width = 155;
            // 		titleImg.height = 59;
            // 		view.setLayoutPosition(LayoutConst.lefttop, titleImg, namebg, [0,namebg.height+7]);
            //         view.addChildToContainer(titleImg);
            //         App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armynumTxt, bg, [260,60]);
            // 	}
            // }
        }
        else {
            armynum = App.StringUtil.changeIntToText(view.cfg.powerNeed);
            var npcTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparenpc" + zhankingdomn, code), [isCentercity ? LanguageManager.getlocal("" + (view.vo.getTodayWeek() == 6 ? "acThreeKingdomscenterCityName_1-1" : "acThreeKingdomscenterCityName_2-1")) : ""]), 22, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(npcTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, npcTxt, bg, [30, 50]);
        }
        var shuiyin = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsshuiyin" + zhankingdomn, code));
        view.addChildToContainer(shuiyin);
        shuiyin.setScale(1.3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shuiyin, bg, [5, 5]);
        var vsimg = BaseBitmap.create("threekingdomspreparevs" + (type == 2 ? (zhankingdomn == view.vo.getMyKingdoms() ? 3 : 2) : type));
        view.addChildToContainer(vsimg);
        vsimg.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsimg, bg, [0, bg.height - 20]);
        //
        //顶部描述
        var descbg2 = BaseBitmap.create("public_9_bg95");
        descbg2.width = 220;
        var descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparebottomdesc" + type, code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(descbg2);
        view.addChildToContainer(descTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg2, vsimg, [0, vsimg.height * vsimg.scaleY - 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt2, descbg2);
        var attackbg = BaseBitmap.create("public_9_bg94");
        attackbg.width = 515;
        view.addChildToContainer(attackbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, attackbg, descbg2, [0, descbg2.height + 10]);
        var listbg = BaseBitmap.create("threekingdomspreparemask1");
        listbg.width = 485;
        listbg.height = 105;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, attackbg, [0, 10]);
        var listbg2 = BaseBitmap.create("threekingdomspreparemask2");
        listbg2.width = 120;
        listbg2.height = 105;
        view.addChildToContainer(listbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, listbg2, listbg);
        //攻击加成
        var total1 = 0;
        //血量加成
        var total2 = 0;
        var total1base = view.vo.getMyAtkNum();
        var total2base = view.vo.getMyArmyNum();
        for (var i = 1; i < 4; ++i) {
            var group = new BaseDisplayObjectContainer();
            group.width = 485;
            group.height = 35;
            view.addChildToContainer(group);
            group.setPosition(listbg.x, listbg.y + (i - 1) * 35);
            var icon = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsprepareadd" + (i + 1), code));
            group.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, group, [10, 0], true);
            var line_1 = BaseBitmap.create("public_line1");
            line_1.width = 375;
            group.addChild(line_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line_1, group, [110, 0], true);
            line_1.visible = i < 3;
            var strList = new Array();
            //buff加成 1城防 2神将 3援军 4神器
            var add = view.vo.getAddBuff(i + 1, isCentercity, view.kingdomid, view.cityId, view.vo.getMyKingdoms());
            if (add.length > 1) {
                var tmpX = 140;
                for (var i_1 = 0; i_1 < add.length; ++i_1) {
                    var addstr = "";
                    var addtype = add[i_1].addType;
                    var num = add[i_1].add;
                    if (num <= 1) {
                        addstr = (num * 100).toFixed(2) + '%';
                        if (addtype == 1) {
                            total1 += (total1base * num);
                        }
                        else if (addtype == 2) {
                            total2 += (total2base * num);
                        }
                    }
                    else {
                        addstr = App.StringUtil.changeIntToText(num);
                        if (addtype == 1) {
                            total1 += (num);
                        }
                        else if (addtype == 2) {
                            total2 += (num);
                        }
                    }
                    // let addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]), 18, TextFieldConst.COLOR_BROWN);
                    // group.addChild(addTxt);
                    // addTxt.x = tmpX;
                    // addTxt.y = (group.height - addTxt.height) / 2;
                    // tmpX += (addTxt.textWidth + 50);
                    strList.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsprepareaddbuff" + addtype, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]));
                    //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addTxt, buffbg, [0,6]);
                }
                var lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
                lampContainer.mask = new egret.Rectangle(0, -10, 350, 40);
                lampContainer.x = 130;
                lampContainer.y = 6;
                group.addChild(lampContainer);
                // let addTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff2`, code), [String(TextFieldConst.COLOR_WARN_GREEN), add[1].toString()]), 18);
                // group.addChild(addTxt2);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addTxt2, addTxt, [0,addTxt.textHeight+3]);
            }
            else if (add.length == 1) {
                //只有属性加成
                var addstr = "";
                var num = add[0].add;
                var addtype = add[0].addType;
                if (num <= 1) {
                    addstr = (num * 100).toFixed(2) + '%';
                    if (addtype == 1) {
                        total1 += (total1base * num);
                    }
                    else if (addtype == 2) {
                        total2 += (total2base * num);
                    }
                }
                else {
                    addstr = App.StringUtil.changeIntToText(num);
                    if (addtype == 1) {
                        total1 += (num);
                    }
                    else if (addtype == 2) {
                        total2 += (num);
                    }
                }
                var addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsprepareaddbuff" + addtype, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]), 18, TextFieldConst.COLOR_BROWN);
                group.addChild(addTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addTxt, group, [140, 0], true);
                //strList.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]));
            }
            else {
                var addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsprepareaddbuff0", code)), 18, TextFieldConst.COLOR_BROWN);
                group.addChild(addTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addTxt, group, [140, 0], true);
            }
        }
        // //最终加成
        // let total1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff1`, code), [String(TextFieldConst.COLOR_WARN_RED2), total1.toString()]), 22, TextFieldConst.COLOR_BROWN);
        // view.addChildToContainer(total1Txt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, total1Txt, attackbg, [30,165]);
        // let total2Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff2`, code), [String(TextFieldConst.COLOR_WARN_RED2), total2.toString()]), 22, TextFieldConst.COLOR_BROWN);
        // view.addChildToContainer(total2Txt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, total2Txt, total1Txt, [total1Txt.textWidth+40,0]);
        var txtbg = BaseBitmap.create("threekingdomspreparetotalbg");
        view.addChildToContainer(txtbg);
        var total3Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsprepareaddtotal", code), [App.StringUtil.changeIntToText(total2base + total2)]), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChildToContainer(total3Txt);
        txtbg.width = total3Txt.width + 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txtbg, listbg, [0, listbg.height + 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, total3Txt, txtbg, [0, 1]);
        var line = BaseBitmap.create("public_cut_line");
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, txtbg, [0, txtbg.height + 10]);
        view._line = line;
        //消耗物资
        var isfree = view.vo.isFightFree(isCentercity ? 2 : 1);
        var costStr = "";
        if (isfree) {
            costStr = ""; //LanguageManager.getlocal(`sysFreeDesc`);
        }
        else {
            //普通消耗粮草 中心城消耗军资
            var havenum = isCentercity ? view.vo.getMyResource() : view.vo.getMyFood();
            var cost = isCentercity ? view.cfg.costFood1 : view.cfg.costFood2;
            costStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip41", code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurWarPeriod() == 3 ? "acThreeKingdomsTip25" : "acThreeKingdomsTip24", code)), String(havenum >= cost ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED), havenum + "/" + cost]);
        }
        var costTxt = ComponentManager.getTextField(costStr, 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(costTxt);
        view._costTxt = costTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costTxt, line, [0, line.height + 10]);
        var fightBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "dailybossRecoveryBattleNumDesc", function () {
            //出战处理
            //时间已过期
            if (view.vo.isInWarTime() && ((isCentercity && view.vo.getCurWarPeriod() == 3) || (!isCentercity && view.vo.getCurWarPeriod() < 3 && view.vo.getCurWarPeriod() > 0))) {
                //物资不满足
                var havenum = isCentercity ? view.vo.getMyResource() : view.vo.getMyFood();
                var cost = isCentercity ? view.cfg.costFood1 : view.cfg.costFood2;
                var canfight = false;
                var fightcd_1 = view.vo.getFightCD(isCentercity);
                if (fightcd_1 <= 0) {
                    if (isfree) {
                        canfight = true;
                    }
                    else {
                        if (fightnum > 0) {
                            canfight = true;
                        }
                        else {
                            //消耗物资
                            if (havenum >= cost) {
                                canfight = true;
                            }
                            else {
                                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparerfighttip2", code), [LanguageManager.getlocal("acthreekingdomswaricon" + (isCentercity ? 2 : 1))]));
                            }
                        }
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparerfighttip4", code)));
                }
                if (canfight) {
                    //打开战斗
                    NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, {
                        activeId: view.vo.aidAndCode,
                        mainland: isCentercity ? 7 : ((view.kingdomid - 1) * 2 + (view.cityId - 3)),
                        building: view.judianid,
                        preuid: info ? info.uid : 0,
                    });
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparerfighttip1", code)));
            }
        }, view);
        view.addChildToContainer(fightBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fightBtn, line, [0, line.height + 40]);
        //出战次数和倒计时
        var fightcd = view.vo.getFightCD(isCentercity);
        var fightnum = view.vo.getMyFightNum(isCentercity ? 2 : 1);
        var fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomspreparefightnum", code), ["<font color=" + (fightnum == 0 ? TextFieldConst.COLOR_WARN_RED2 : TextFieldConst.COLOR_WARN_GREEN2) + ">" + fightnum + "</font>/" + view.cfg.getFightNum(isCentercity ? 2 : 1)]), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(fightNumTxt);
        view._fightNumTxt = fightNumTxt;
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("studyatkCdTxt1", []), 20, TextFieldConst.COLOR_BROWN);
        view._cdTxt = cdTxt;
        view.addChildToContainer(cdTxt);
        if (type == 4) {
            fightBtn.setText("acThreeKingdomsbattletip5", true);
        }
        costTxt.visible = fightcd <= 0 && fightnum <= 0;
        fightNumTxt.visible = fightcd <= 0 && fightnum > 0;
        cdTxt.visible = fightcd > 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fightNumTxt, line, [0, line.height + 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cdTxt, line, [0, line.height + 10]);
        var str = '';
        var param = [];
        //是否已派遣
        var isSendArmy = view.vo.isSendArmy();
        var armyinfo = view.vo.myArmyInfo();
        if (type == 4) {
            str = "acThreeKingdomsprepareremptytip4";
        }
        else {
            if (isSendArmy) {
                str = "acThreeKingdomspreparerinfighttip";
                param.push(armyinfo.kingdomid ? view.vo.getCityName(armyinfo.kingdomid, armyinfo.cityid, armyinfo.judianid) : LanguageManager.getlocal("acthreekingdomcenter" + (view.vo.getTodayWeek() == 6 ? 1 : 2) + "-1", [armyinfo.judianid]));
                param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsprepareremptytip" + type, code)));
            }
            else {
                str = "acThreeKingdomsprepareremptytip" + type;
            }
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(str, code), param), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, fightBtn, [0, fightBtn.height + 10]);
        view._tipTxt = tipTxt;
        attackbg.height = tipTxt.y + tipTxt.textHeight + 7 - attackbg.y + 3;
        view.tick();
    };
    AcThreeKingdomsPrepareView.prototype.tick = function () {
        var view = this;
        var isCentercity = view.kingdomid == 0;
        var cd = view.vo.getFightCD(isCentercity);
        if (cd > 0) {
            view._cdTxt.text = LanguageManager.getlocal("studyatkCdTxt1", [App.DateUtil.getFormatBySecond(cd)]);
        }
        else {
            view._cdTxt.text = "";
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._fightNumTxt, view._line, [0, view._line.height + 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._line, [0, view._line.height + 10]);
        var fightnum = view.vo.getMyFightNum(isCentercity ? 2 : 1);
        view._costTxt.visible = fightnum <= 0 && cd <= 0;
        view._fightNumTxt.visible = cd <= 0 && fightnum > 0;
    };
    AcThreeKingdomsPrepareView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomspreparetitle", this.getUiCode());
    };
    AcThreeKingdomsPrepareView.prototype.attackBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            var showfight = false;
            var showpop = false;
            switch (Number(data.tkStat)) {
                case 4: //--4打败玩家成功占领
                case 8://--8占领失败
                    showfight = true;
                    break;
                case 7: // --7占领npc
                case 10: //10战场易手
                case 11: // --11支援成功换防
                case 12://--12支援失败变为援军
                    showpop = true;
                    break;
            }
            if (showpop) {
                if (Number(data.tkStat) == 10) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattletkStat" + data.tkStat, view.getUiCode())));
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSWARRESULTVIEW, {
                        point: data.honorScore,
                        winflag: 1,
                        f: this.hide,
                        o: this,
                        iscenter: this.kingdomid == 0,
                        tip: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsbattletkStat" + data.tkStat, view.getUiCode()))
                    });
                }
            }
            if (showfight) {
                /**
                 *   pklogs : [
                        [1,1,[[0,100],[0,50],[0,100]],{ uid : 100001,
                            name : '玩家1',
                            power : 10000,
                            attr : 100000,
                            quality : 2,
                            fullattr : 500,
                            plevel : 3,
                            skillRate : 1,
                            skillValue : 10,
                            title : 3000 + 5,
                            level : 8,
                            pic : 3,
                            ptitle : 4000 + 5,
                            kingdomid : 1,
                            army : 20000000,},
                                { uid : 100001,
                                name : '玩家2',
                                power : 10002,
                                attr : 100002,
                                quality : 3,
                                fullattr : 200,
                                plevel : 4,
                                skillRate : 1,
                                skillValue : 20,
                                title : 3000 + 6,
                                level : 9,
                                pic : 2,
                                ptitle : 4000 + 7,
                                kingdomid : 2,
                                army : 20000003,}],
                        [1,0,[[0,50],[0,50],[0,50],[1,300]],{sid:"1001", attr:200, fightattr : 200, quality:1, lv:1, s1lv:1, s2lv:1, fullattr:200, clv:1, equip:"", weaponDps:1},{sid:"1002", attr:300, quality:2, lv:2, s1lv:1, s2lv:1, fullattr:300, clv:2, equip:"10021", weaponDps:2, fightattr : 300}],
                        [0,1,[[0,50],[1,100],[0,50],[1,200]],{sid:"1003", attr:200, fightattr : 200, quality:1, lv:3, s1lv:1, s2lv:1, fullattr:200, clv:3, equip:"", weaponDps:1},{sid:"1002", attr:300, quality:2, lv:2, s1lv:1, s2lv:1, fullattr:300, clv:2, equip:"10021", weaponDps:3, fightattr : 200}],
                    ],
                    winuid : 100001,
                    sidlist1 : [{sid : 1001, clv : 1, lv : 1, equip : `10011`, fightattr : 200}, {sid : 1002, clv : 2, lv : 2, fightattr : 200}],
                    sidlist2 : [{sid : 1003, equip : `10031`, fightattr : 300, clv : 3, lv : 3}],
                */
                //打开战斗
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSBATTLEVIEW, {
                    aid: view.aid,
                    code: view.code,
                    cityId: view.cityId,
                    kingdomid: view.kingdomid,
                    judianid: view.judianid,
                    pklogs: data.attacklog.pklogs,
                    winuid: data.attacklog.winuid,
                    sidlist1: data.attacklog.sidlist1,
                    sidlist2: data.attacklog.sidlist2,
                    point: data.honorScore,
                    aBuff: data.attacklog.aBuff,
                    bBuff: data.attacklog.bBuff,
                });
                view.vo.listred = true;
            }
            view.hide();
        }
    };
    AcThreeKingdomsPrepareView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.attackBack, view);
        view._cdTxt = null;
        view._fightNumTxt = null;
        view._tipTxt = null;
        view._costTxt = null;
        view._line = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsPrepareView;
}(PopupView));
__reflect(AcThreeKingdomsPrepareView.prototype, "AcThreeKingdomsPrepareView");
//# sourceMappingURL=AcThreeKingdomsPrepareView.js.map