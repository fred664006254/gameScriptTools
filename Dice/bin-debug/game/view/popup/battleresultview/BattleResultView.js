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
 * 战斗结算
 * author qianjun
 * 参数
 * type 1对战 2协助
 * info battle.init返回的player中下方玩家信息
 * finfo battle.init返回的player中上方玩家信息
 * turns 轮数
 * winFlag 下方为主视角 0负 1胜
 * value 获得/减少的奖杯数
 * rewardArr 获得的信息
 */
var BattleResultView = (function (_super) {
    __extends(BattleResultView, _super);
    function BattleResultView() {
        var _this = _super.call(this) || this;
        _this._isclick = false;
        _this._totalScore = 0;
        _this._totalCoin = 0;
        _this._totalGem = 0;
        _this._rewaedBtn = null;
        _this._conBtn = null;
        return _this;
    }
    BattleResultView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "battleresultview", "win_fnt", "joinwarinputbg",
        ]);
    };
    BattleResultView.prototype.isTouchMaskClose = function () {
        return false;
    };
    BattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    BattleResultView.prototype.getTitleBgName = function () {
        return null;
    };
    BattleResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    BattleResultView.prototype.getBgName = function () {
        return null;
    };
    // 打开该面板时，需要传参数msg
    BattleResultView.prototype.initView = function () {
        var view = this;
        view.name = "BattleResultView";
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    };
    BattleResultView.prototype.resetBgSize = function () {
        var _this = this;
        var view = this;
        view._maskBmp.alpha = 1.2;
        _super.prototype.resetBgSize.call(this);
        //下方为主视角
        var param = view.param.data;
        var type = param.type;
        var winflag = param.winFlag;
        var basegroup = new BaseDisplayObjectContainer();
        basegroup.width = view.width;
        // basegroup.height = view.height;
        view.addChildToContainer(basegroup);
        //type 1 对战 2 协作
        if (type == 1 || type == 3) {
            if (winflag == 0) {
                SoundMgr.playEffect(SoundConst.EFFECT_FAILURE);
            }
            else {
                SoundMgr.playEffect(SoundConst.EFFECT_VICTORY);
                if (Api.AdvertiseVoApi.notfriend) {
                    Api.AdvertiseVoApi.notfriend = false;
                    Api.AdvertiseVoApi.setPlayHuo(false);
                }
            }
            var light_1 = view.createLight();
            var topresult_1 = BaseBitmap.create("result" + (winflag == 1 ? "lose" : "win"));
            basegroup.addChild(topresult_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topresult_1, basegroup);
            var topgroup_1 = view.createInfoGroup(param.finfo);
            basegroup.addChild(topgroup_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topgroup_1, topresult_1, [0, topresult_1.height]);
            var waveIcon_1 = BaseBitmap.create("resultvs");
            basegroup.addChild(waveIcon_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveIcon_1, topgroup_1, [0, topgroup_1.height + 80]);
            var downresult_1 = winflag == 1 ? view.createWinGroup() : view.createLoseGroup();
            basegroup.addChild(downresult_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downresult_1, waveIcon_1, [0, waveIcon_1.height + 80]);
            var downgroup_1 = view.createInfoGroup(param.info);
            basegroup.addChild(downgroup_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downgroup_1, downresult_1, [0, downresult_1.height]);
            var btnstr = LangMger.getlocal(winflag == 0 || type == 3 ? "confirmBtn" : "reward");
            var btn_1 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, btnstr, function () {
                if (type == 3) {
                    if (param.callback) {
                        param.callback.apply(param.handle, [_this]);
                    }
                    view.hide();
                    return;
                }
                if (winflag == 1) {
                    if (view._isclick) {
                        return;
                    }
                    view._isclick = true;
                    if (Api.GameinfoVoApi.checlIsInGuideId(14)) {
                        App.CommonUtil.sendNewGuideId(14);
                        App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                        Api.GameinfoVoApi.setCurGudingId(15);
                    }
                    waveIcon_1.dispose();
                    light_1.dispose();
                    btn_1.dispose();
                    rewardGroup_1.alpha = 1;
                    //创建详细奖励弹窗
                    egret.Tween.get(topgroup_1).to({ y: -topgroup_1.height, alpha: 0 }, 600).call(function () {
                        egret.Tween.removeTweens(topgroup_1);
                        topgroup_1.dispose();
                    }, view);
                    egret.Tween.get(topresult_1).to({ y: -topresult_1.height - topgroup_1.height, alpha: 0 }, 600).call(function () {
                        egret.Tween.removeTweens(topresult_1);
                        topresult_1.dispose();
                    }, view);
                    var closebtn_1 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("confirmBtn"), function () {
                        if (Api.GameinfoVoApi.checlIsInGuideId(15)) {
                            App.CommonUtil.sendNewGuideId(15);
                            Api.GameinfoVoApi.setCurGudingId(16);
                        }
                        if (param.callback) {
                            param.callback.apply(param.handle, [_this]);
                        }
                        if (param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)) {
                            Api.GameinfoVoApi.setCurGudingId(31);
                            NetManager.request(NetConst.REQUEST_USER_STEPGUILD, { stepId: "31" });
                            PlatMgr.analyticsCompleteNewGuide();
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                        view.hide();
                        // let unitgroup = <BaseDisplayObjectContainer>rewardGroup.getChildByName(`unitgroup1`);
                        // if(unitgroup){
                        //     unitgroup.setScale(0.8);
                        //     egret.Tween.get(unitgroup).to({scaleX : 1.2, scaleY : 1.2}, 500).to({scaleX : 1, scaleY : 1}, 200).call(()=>{
                        //         egret.Tween.removeTweens(unitgroup); 
                        //     },view);
                        // }
                    }, view, null, 0, 0, ColorEnums.white, 182);
                    view._conBtn = closebtn_1;
                    var tmpY = 0;
                    var db1_1 = basegroup.getChildByName("db1");
                    var db2_1 = basegroup.getChildByName("db2");
                    tmpY = (basegroup.height - downgroup_1.height - downresult_1.height - rewardGroup_1.height - closebtn_1.height - 40 - 50) / 2;
                    egret.Tween.get(downgroup_1).to({ y: tmpY + downresult_1.height }, 600).call(function () {
                        egret.Tween.removeTweens(downgroup_1);
                    }, view);
                    egret.Tween.get(downresult_1).to({ y: tmpY }, 600).call(function () {
                        egret.Tween.removeTweens(downresult_1);
                    }, view);
                    var totalgroup = rewardGroup_1.getChildByName("unitgroup4");
                    var scroeTxt_1 = totalgroup.getChildByName("scroeTxt");
                    var coinTxt_1 = totalgroup.getChildByName("coinTxt");
                    var gemTxt_1 = totalgroup.getChildByName("gemTxt");
                    egret.Tween.get(rewardGroup_1).to({ y: tmpY + downresult_1.height + downgroup_1.height + 40 }, 600).call(function () {
                        egret.Tween.removeTweens(rewardGroup_1);
                        var _loop_1 = function (i) {
                            var unitgroup = rewardGroup_1.getChildByName("unitgroup" + i);
                            unitgroup.anchorOffsetX = unitgroup.width / 2;
                            unitgroup.anchorOffsetY = unitgroup.height / 2;
                            unitgroup.x += unitgroup.anchorOffsetX;
                            unitgroup.y += unitgroup.anchorOffsetY;
                            if (unitgroup) {
                                egret.Tween.get(unitgroup).wait(100 + (i - 1) * 200).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 150).call(function () {
                                    egret.Tween.removeTweens(unitgroup);
                                    if (i == 3) {
                                        if (view._totalScore) {
                                            App.TweenUtil.numTween(scroeTxt_1, 0, view._totalScore);
                                        }
                                        if (view._totalCoin) {
                                            App.TweenUtil.numTween(coinTxt_1, 0, view._totalCoin);
                                        }
                                        if (view._totalGem) {
                                            App.TweenUtil.numTween(gemTxt_1, 0, view._totalGem);
                                        }
                                    }
                                }, view);
                            }
                        };
                        for (var i = 1; i <= 3; ++i) {
                            _loop_1(i);
                        }
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, closebtn_1, rewardGroup_1, [0, rewardGroup_1.height + 50]);
                        basegroup.addChild(closebtn_1);
                        if (Api.GameinfoVoApi.checlIsInGuideId(15)) {
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                    }, view);
                    if (db1_1) {
                        egret.Tween.get(db1_1).to({ y: tmpY }, 600).call(function () {
                            egret.Tween.removeTweens(db1_1);
                        }, view);
                        egret.Tween.get(db2_1).to({ y: tmpY }, 600).call(function () {
                            egret.Tween.removeTweens(db2_1);
                        }, view);
                    }
                }
                else {
                    if (param.callback) {
                        param.callback.apply(param.handle, [_this]);
                    }
                    if (param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)) {
                        Api.GameinfoVoApi.setCurGudingId(31);
                        NetManager.request(NetConst.REQUEST_USER_STEPGUILD, { stepId: "31" });
                        PlatMgr.analyticsCompleteNewGuide();
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    }
                    view.hide();
                }
            }, view, null, 0, 0, ColorEnums.white, 182);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn_1, downgroup_1, [0, downgroup_1.height + 120]);
            basegroup.addChild(btn_1);
            btn_1.visible = true;
            view._rewaedBtn = btn_1;
            basegroup.height = btn_1.y + btn_1.height;
            light_1.mask = new egret.Rectangle(0, 0, 640, 230);
            if (winflag == 1) {
                basegroup.addChild(light_1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light_1, downgroup_1);
            }
            else {
                var rewardArr = view.param.data.rewardArr;
                var value = 0;
                for (var i in rewardArr) {
                    if (rewardArr[i] && rewardArr[i].score) {
                        value = rewardArr[i].score;
                        break;
                    }
                }
                if (value != 0) {
                    var addTxt = ComponentMgr.getTextField("" + value, TextFieldConst.SIZE_28, 0xfb0f0f);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, addTxt, downgroup_1, [80, downgroup_1.height + 15]);
                    basegroup.addChild(addTxt);
                }
            }
            if (App.CommonUtil.check_dragon()) {
                var tmpHeight_1 = topresult_1.height + topgroup_1.height + 80 + waveIcon_1.height + 80 - 20;
                downresult_1.visible = false;
                egret.Tween.get(basegroup).wait(350).call(function () {
                    if (winflag == 1) {
                        var db1 = App.DragonBonesUtil.getLoadDragonBones("win_1", 1, "win");
                        db1.setPosition(downresult_1.x + downresult_1.width / 2, tmpHeight_1);
                        basegroup.addChildAt(db1, basegroup.getChildIndex(downgroup_1) - 1);
                        db1.name = "db1";
                        var db2 = App.DragonBonesUtil.getLoadDragonBones("win_2", 1, "win");
                        db2.setPosition(downresult_1.x + downresult_1.width / 2, tmpHeight_1);
                        basegroup.addChild(db2);
                        db2.name = "db2";
                    }
                    else {
                        var db = App.DragonBonesUtil.getLoadDragonBones("lose", 1, "lose");
                        db.setPosition(downresult_1.x + downresult_1.width / 2, tmpHeight_1);
                        basegroup.addChild(db);
                    }
                }, view).wait(1000).call(function () {
                    // btn.visible = true;
                    egret.Tween.removeTweens(basegroup);
                }, view);
            }
            basegroup.y = (view.height - basegroup.height) / 2;
            var rewardGroup_1 = view.createRewardGroup();
            basegroup.addChild(rewardGroup_1);
            rewardGroup_1.y = view.height;
            rewardGroup_1.alpha = 0;
        }
        else {
            SoundMgr.playEffect(SoundConst.EFFECT_SYNERGY);
            basegroup.height = view.height;
            var turns = param.turns;
            var powerNum = turns;
            if (turns > 50) {
                powerNum = 50 + 3 * (turns - 50);
            }
            var light = view.createLight();
            basegroup.addChild(light);
            var waveIcon_2 = BaseBitmap.create("resultwave");
            var waveTxt_1 = ComponentMgr.getTextField(LangMger.getlocal("ranktip2", [turns]), TextFieldConst.SIZE_40, ColorEnums.white);
            waveTxt_1.strokeColor = 0x0d4a87;
            waveTxt_1.stroke = 2;
            var icon = BaseBitmap.create("task_power");
            icon.name = "task_power";
            var valueTxt_1 = ComponentMgr.getTextField("+" + powerNum, TextFieldConst.SIZE_28, ColorEnums.white);
            var btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("confirmBtn"), function () {
                if (param.callback) {
                    param.callback.apply(param.handle, [_this]);
                }
                if (param.type == 2 && Api.DailytaskVoApi.canGetOrpBox() && !Api.GameinfoVoApi.getIsFinishStepGuide(31)) {
                    Api.GameinfoVoApi.setCurGudingId(31);
                    NetManager.request(NetConst.REQUEST_USER_STEPGUILD, { stepId: "31" });
                    PlatMgr.analyticsCompleteNewGuide();
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                Api.UserinfoVoApi.setFreshCard(false);
                App.MsgHelper.dispEvt(MsgConst.FLY_EFFECT, null);
                view.hide();
            }, view, null, 0, 0, ColorEnums.white, 182);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, basegroup, [0, 50]);
            basegroup.addChild(btn);
            var topgroup = view.createInfoGroup(param.finfo);
            basegroup.addChild(topgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topgroup, basegroup, [0, 220]);
            var downgroup = view.createInfoGroup(param.info);
            basegroup.addChild(downgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, downgroup, basegroup, [0, 220]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveIcon_2, basegroup, [0, topgroup.y + 148 + (downgroup.y - (topgroup.y + 148) - waveIcon_2.height) / 2]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, waveTxt_1, waveIcon_2, [0, 105]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, waveIcon_2, [(waveIcon_2.width - icon.width - valueTxt_1.textWidth - 5) / 2, waveIcon_2.height + 15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, valueTxt_1, icon, [icon.width + 5, 0]);
            light.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, waveIcon_2, [0, 0]);
            if (App.CommonUtil.check_dragon()) {
                egret.Tween.get(basegroup).wait(350).call(function () {
                    var db = App.DragonBonesUtil.getLoadDragonBones("battle_result_cop", 0, "idle");
                    db.setPosition(waveIcon_2.x + waveIcon_2.width / 2, waveIcon_2.y + waveIcon_2.height / 2 + 35);
                    basegroup.addChild(db);
                    waveTxt_1.visible = valueTxt_1.visible = false;
                    basegroup.addChild(waveTxt_1);
                    basegroup.addChild(valueTxt_1);
                }, view).wait(1500).call(function () {
                    egret.Tween.removeTweens(basegroup);
                    waveTxt_1.visible = valueTxt_1.visible = true;
                }, view);
            }
            else {
                basegroup.addChild(waveIcon_2);
                basegroup.addChild(waveTxt_1);
                basegroup.addChild(icon);
                basegroup.addChild(valueTxt_1);
            }
            basegroup.y = (view.height - basegroup.height) / 2;
        }
    };
    BattleResultView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        if (Api.GameinfoVoApi.checlIsInGuideId(13)) {
            Api.GameinfoVoApi.setCurGudingId(14);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    //胜利的一些装饰图
    BattleResultView.prototype.createWinGroup = function () {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 325;
        group.height = 116;
        var arr = ["v", "i", "c", "t", "o", "r", "y"];
        var pos = {
            v: [0, 0],
            i: [62, 0],
            c: [81, 0],
            t: [130, 0],
            o: [172, 0],
            r: [232, 0],
            y: [273, 0],
        };
        var fontgroup = new BaseDisplayObjectContainer();
        fontgroup.width = 325;
        fontgroup.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fontgroup, group, [0, 0], true);
        group.addChild(fontgroup);
        for (var i in arr) {
            var font = BaseBitmap.create("win_" + arr[i]);
            fontgroup.addChild(font);
            font.setPosition(pos[arr[i]][0], pos[arr[i]][1]);
        }
        var effpos = {
            1: [-30, 90],
            2: [345, 90],
            3: [-60, 63],
            4: [315, 65],
            5: [340, 30],
            6: [173, 0],
            7: [-20, 40],
            8: [-10, 115]
        };
        for (var i = 1; i < 9; ++i) {
            var eff = BaseBitmap.create("wineffect" + i);
            group.addChild(eff);
            eff.setPosition(effpos[i][0], effpos[i][1]);
        }
        var stars = BaseBitmap.create("winstars");
        stars.anchorOffsetX = stars.width / 2;
        stars.anchorOffsetY = stars.height / 2;
        group.addChild(stars);
        stars.setPosition(8, -20);
        var stars2 = BaseBitmap.create("winstars");
        stars2.anchorOffsetX = stars2.width / 2;
        stars2.anchorOffsetY = stars2.height / 2;
        group.addChild(stars2);
        stars2.rotation = -12;
        stars2.setPosition(-80, 90);
        stars2.alpha = 0.5;
        var stars3 = BaseBitmap.create("winstars");
        stars3.anchorOffsetX = stars3.width / 2;
        stars3.anchorOffsetY = stars3.height / 2;
        group.addChild(stars3);
        stars3.rotation = 20;
        stars3.setPosition(405, 55);
        stars3.alpha = 0.5;
        group.mask = new egret.Rectangle(-136, -200, 600, group.height + 205);
        return group;
    };
    //胜利的详细
    BattleResultView.prototype.createRewardGroup = function () {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        var arr = view.param.data.rewardArr;
        var scoretotal = 0;
        var goldtotal = 0;
        var gemtotal = 0;
        var colors = {
            1: 0xFFFFFF,
            2: 0x8DEDFF,
            3: 0xF3CA26
        };
        for (var i = 1; i <= 3; ++i) {
            var unitgroup_1 = new BaseDisplayObjectContainer();
            unitgroup_1.setScale(1.3);
            unitgroup_1.alpha = 0;
            unitgroup_1.name = "unitgroup" + i;
            unitgroup_1.width = GameConfig.stageWidth;
            group.addChild(unitgroup_1);
            unitgroup_1.setPosition(0, (i - 1) * (70));
            var icon = BaseBitmap.create("resulticon" + i);
            unitgroup_1.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, unitgroup_1, [75, 0]);
            var icontxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_18, colors[i]);
            unitgroup_1.addChild(icontxt);
            icontxt.text = LangMger.getlocal("resulticontxt" + i);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icontxt, icon, [0, -icontxt.height + 2]);
            if (arr[i] && arr[i].score) {
                App.DisplayUtil.changeToNormal(icon);
                App.DisplayUtil.changeToNormal(icontxt);
            }
            else {
                App.DisplayUtil.changeToGray(icon);
                App.DisplayUtil.changeToGray(icontxt);
            }
            if (i == 2 && arr[i] && arr[i].winNum && arr[i].winNum > 1) {
                var winnum = ComponentMgr.getBitmapText(arr[i].winNum, "win_fnt", NaN, TextFieldConst.SIZE_TITLE_COMMON, true);
                winnum.letterSpacing = -5;
                unitgroup_1.addChild(winnum);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, winnum, icon, [icon.width - 25, 3]);
            }
            var score = 0;
            if (arr[i] && arr[i].score > 0) {
                score = arr[i].score;
            }
            scoretotal += score;
            var scroeIcon_1 = BaseBitmap.create("trophy_icon");
            scroeIcon_1.setScale(0.336);
            unitgroup_1.addChild(scroeIcon_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeIcon_1, icon, [icon.width + 70, 16]);
            var scroeTxt_2 = ComponentMgr.getTextField("+" + score, TextFieldConst.SIZE_28);
            unitgroup_1.addChild(scroeTxt_2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeTxt_2, scroeIcon_1, [scroeIcon_1.width * scroeIcon_1.scaleX + 10, 0]);
            if (score == 0) {
                App.DisplayUtil.changeToGray(scroeIcon_1);
                App.DisplayUtil.changeToGray(scroeTxt_2);
            }
            var coin = 0;
            if (arr[i] && arr[i].gold) {
                coin = arr[i].gold;
            }
            goldtotal += coin;
            var coinIcon_1 = BaseBitmap.create("public_icon2");
            unitgroup_1.addChild(coinIcon_1);
            coinIcon_1.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinIcon_1, scroeIcon_1, [scroeIcon_1.width * scroeIcon_1.scaleX + 100, 0]);
            var coinTxt_2 = ComponentMgr.getTextField("+" + coin, TextFieldConst.SIZE_28, 0xfce690);
            unitgroup_1.addChild(coinTxt_2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinTxt_2, coinIcon_1, [coinIcon_1.width * coinIcon_1.scaleX + 10, 0]);
            if (coin == 0) {
                App.DisplayUtil.changeToGray(coinIcon_1);
                App.DisplayUtil.changeToGray(coinTxt_2);
            }
            var gem = 0;
            if (arr[i] && arr[i].gem) {
                gem = arr[i].gem;
            }
            gemtotal += gem;
            var gemIcon_1 = BaseBitmap.create("public_icon1");
            unitgroup_1.addChild(gemIcon_1);
            gemIcon_1.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon_1, coinIcon_1, [coinIcon_1.width * coinIcon_1.scaleX + 100, 0]);
            var gemTxt_2 = ComponentMgr.getTextField("+" + gem, TextFieldConst.SIZE_28, 0xF29BFF);
            unitgroup_1.addChild(gemTxt_2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt_2, gemIcon_1, [gemIcon_1.width * gemIcon_1.scaleX + 10, 0]);
            if (gem == 0) {
                App.DisplayUtil.changeToGray(gemIcon_1);
                App.DisplayUtil.changeToGray(gemTxt_2);
            }
        }
        var unitgroup = new BaseDisplayObjectContainer();
        unitgroup.name = "unitgroup4";
        unitgroup.width = GameConfig.stageWidth;
        group.addChild(unitgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, unitgroup, group, [0, 250]);
        var totalbg = BaseBitmap.create("resultscorebg");
        totalbg.width = 640;
        totalbg.height = 60;
        unitgroup.addChild(totalbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, totalbg, unitgroup);
        var totalTxt = ComponentMgr.getTextField(LangMger.getlocal("systotal"), TextFieldConst.SIZE_32);
        unitgroup.addChild(totalTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, totalTxt, totalbg, [65, 0]);
        var scroeIcon = BaseBitmap.create("trophy_icon");
        scroeIcon.setScale(0.336);
        unitgroup.addChild(scroeIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeIcon, totalTxt, [totalTxt.width + 58, 0]);
        view._totalScore = scoretotal;
        var scroeTxt = ComponentMgr.getTextField("+" + 0, TextFieldConst.SIZE_28);
        unitgroup.addChild(scroeTxt);
        scroeTxt.name = "scroeTxt";
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scroeTxt, scroeIcon, [scroeIcon.width * scroeIcon.scaleX + 10, 0]);
        if (scoretotal == 0) {
            App.DisplayUtil.changeToGray(scroeIcon);
            App.DisplayUtil.changeToGray(scroeTxt);
        }
        var coinIcon = BaseBitmap.create("public_icon2");
        unitgroup.addChild(coinIcon);
        coinIcon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinIcon, scroeIcon, [scroeIcon.width * scroeIcon.scaleX + 100, 0]);
        view._totalCoin = goldtotal;
        var coinTxt = ComponentMgr.getTextField("+" + 0, TextFieldConst.SIZE_28, 0xfce690);
        unitgroup.addChild(coinTxt);
        coinTxt.name = "coinTxt";
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinTxt, coinIcon, [coinIcon.width * coinIcon.scaleX + 10, 0]);
        if (goldtotal == 0) {
            App.DisplayUtil.changeToGray(coinIcon);
            App.DisplayUtil.changeToGray(coinTxt);
        }
        var gemIcon = BaseBitmap.create("public_icon1");
        unitgroup.addChild(gemIcon);
        gemIcon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon, coinIcon, [coinIcon.width * coinIcon.scaleX + 100, 0]);
        view._totalGem = gemtotal;
        var gemTxt = ComponentMgr.getTextField("+" + 0, TextFieldConst.SIZE_28, 0xF29BFF);
        unitgroup.addChild(gemTxt);
        gemTxt.name = "gemTxt";
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, gemIcon, [gemIcon.width * gemIcon.scaleX + 10, 0]);
        if (gemtotal == 0) {
            App.DisplayUtil.changeToGray(gemIcon);
            App.DisplayUtil.changeToGray(gemTxt);
        }
        return group;
    };
    //失败的一些装饰图
    BattleResultView.prototype.createLoseGroup = function () {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 473;
        group.height = 116;
        var arr = ["l", "o", "s", "e"];
        var pos = {
            l: [0, 0],
            o: [61, 0],
            s: [123, 0],
            e: [169, 0],
        };
        var fontgroup = new BaseDisplayObjectContainer();
        fontgroup.width = 194;
        fontgroup.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fontgroup, group, [0, 0], true);
        group.addChild(fontgroup);
        for (var i in arr) {
            var font = BaseBitmap.create("lose_" + arr[i]);
            fontgroup.addChild(font);
            font.setPosition(pos[arr[i]][0], pos[arr[i]][1]);
            if (Number(i) == 0) {
                font.anchorOffsetX = font.width / 2;
                font.anchorOffsetY = font.height / 2;
                font.x += font.anchorOffsetX;
                font.y += font.anchorOffsetY;
                font.rotation = -30;
            }
        }
        var zshi1 = BaseBitmap.create("loseeff1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, zshi1, fontgroup, [-47, -10]);
        group.addChild(zshi1);
        var zshi2 = BaseBitmap.create("loseeff2");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, zshi2, fontgroup, [fontgroup.width + 25, 0]);
        group.addChild(zshi2);
        var zshi3 = BaseBitmap.create("loseeff3");
        group.addChild(zshi3);
        var zshi4 = BaseBitmap.create("loseeff3");
        group.addChild(zshi4);
        zshi4.anchorOffsetX = zshi4.width / 2;
        zshi4.anchorOffsetY = zshi4.height / 2;
        zshi4.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zshi3, fontgroup, [-zshi4.width - 80, -10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zshi4, fontgroup, [fontgroup.width + 95, -10]);
        return group;
    };
    BattleResultView.prototype.createInfoGroup = function (info) {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 600;
        group.height = 200;
        var bg = BaseBitmap.create("resultdicelinebg");
        bg.width = group.width;
        bg.height = 148;
        group.addChild(bg);
        //出站队列
        var line = info.upInfo;
        var list = ComponentMgr.getScrollList(DiceTeamItem, line, new egret.Rectangle(0, 0, 575, 140), 0);
        list.verticalScrollPolicy = "off";
        list.horizontalScrollPolicy = "off";
        group.addChild(list);
        list.setPosition(16, 17);
        for (var i = 0; i < line.length; ++i) {
            var item = list.getItemByIndex(i);
            item.status = 2;
        }
        //玩家信息
        var levelinfobg = BaseBitmap.create("resultinfobg");
        levelinfobg.width = 182;
        levelinfobg.height = 36;
        group.addChild(levelinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelinfobg, bg, [40, bg.height + 10]);
        // let levelbg = BaseBitmap.create(`public_level_${info.level}`);
        var levelbg = BaseLoadBitmap.create("levelicon" + info.level);
        group.addChild(levelbg);
        levelbg.setScale(0.175);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, levelinfobg, [-levelbg.width * levelbg.scaleX / 2, 0]);
        var name = info.uid < 1000 ? Config.NamesCfg.getEnemyName(info) : info.name;
        var nameTxt = ComponentMgr.getTextField(name, TextFieldConst.SIZE_24);
        group.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, levelinfobg);
        var winrateinfobg = BaseBitmap.create("resultinfobg");
        winrateinfobg.width = 142;
        winrateinfobg.height = 36;
        group.addChild(winrateinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, winrateinfobg, levelinfobg, [levelinfobg.width + 25, 0]);
        var winrateicon = BaseBitmap.create("battlelogicon");
        winrateicon.setScale(1.1);
        group.addChild(winrateicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, winrateicon, winrateinfobg, [-10, 0]);
        var win = info.win ? info.win : 0;
        var lose = info.lose ? info.lose : 0;
        var winrateTxt = ComponentMgr.getTextField(((win == 0 ? 0 : (win / (win + lose))) * 100).toFixed(0) + "%", TextFieldConst.SIZE_24);
        group.addChild(winrateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, winrateTxt, winrateinfobg);
        var scoreinfobg = BaseBitmap.create("resultinfobg");
        scoreinfobg.width = 172;
        scoreinfobg.height = 36;
        group.addChild(scoreinfobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreinfobg, winrateinfobg, [winrateinfobg.width + 16, 0]);
        var scoreicon = BaseBitmap.create("trophy_icon");
        scoreicon.setScale(0.4);
        group.addChild(scoreicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreicon, scoreinfobg, [0, 0]);
        var score = info.score ? info.score : 0;
        var scoreTxt = ComponentMgr.getTextField("" + score, TextFieldConst.SIZE_24);
        group.addChild(scoreTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreinfobg);
        return group;
    };
    BattleResultView.prototype.createLight = function () {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        var light = BaseBitmap.create("public_light");
        group.addChild(light);
        light.anchorOffsetX = group.width / 2;
        light.anchorOffsetY = group.height / 2;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 3000);
        group.width = light.width;
        group.height = light.height;
        light.x = group.width / 2;
        light.y = group.height / 2;
        return group;
    };
    BattleResultView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BattleResultView.prototype.dispose = function () {
        var view = this;
        view._isclick = false;
        view._totalScore = 0;
        view._totalCoin = 0;
        view._totalGem = 0;
        view._rewaedBtn = null;
        view._conBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BattleResultView;
}(PopupView));
__reflect(BattleResultView.prototype, "BattleResultView");
//# sourceMappingURL=BattleResultView.js.map