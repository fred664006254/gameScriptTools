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
 * 三国争霸转换阵营
 * author qianjun
 */
var AcThreeKingdomsChangeTeamView = (function (_super) {
    __extends(AcThreeKingdomsChangeTeamView, _super);
    function AcThreeKingdomsChangeTeamView() {
        var _this = _super.call(this) || this;
        _this._stop = false;
        _this._commandGroup = null;
        _this._curTeam = 1;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsChangeTeamView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsChangeTeamView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsChangeTeamView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsChangeTeamView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsChangeTeamView.prototype.getUiCode = function () {
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
    AcThreeKingdomsChangeTeamView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg", "specialview_commoni_namebg", "threekingdomsselectteamview"
        ]);
    };
    AcThreeKingdomsChangeTeamView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsChangeTeamView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsChangeTeamView.prototype.initView = function () {
        var _this = this;
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var code = view.getUiCode();
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, view.selectCallback, view);
        var npc = BaseBitmap.create("threekingdomteamnpc");
        npc.setPosition(this.viewBg.x + 60, 3);
        view.addChildToContainer(npc);
        var descbg = BaseBitmap.create("threekingdomteamdescbg");
        descbg.width = 385;
        descbg.height = 90;
        view.addChildToContainer(descbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, npc, [npc.width, 10]);
        var arr = [1, 2, 3];
        arr.splice(view.vo.getMyKingdoms() - 1, 1);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip1", code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + arr[0], code)), LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + arr[1], code))]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 340;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, descbg, [30, 10]);
        view.addChildToContainer(tipTxt);
        var line = BaseBitmap.create("public_cut_line");
        view.addChildToContainer(line);
        line.width = 500;
        line.setPosition(view.viewBg.x + (view.viewBg.width - line.width) / 2, 110);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip2", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt2.width = 520;
        tipTxt2.lineSpacing = 5;
        tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, line, [0, line.height + 15]);
        view.addChildToContainer(tipTxt2);
        var listbg = BaseBitmap.create("public_9_bg4");
        listbg.width = 526;
        listbg.height = 440;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt2, [0, tipTxt2.textHeight + 10]);
        var listbg2 = BaseBitmap.create("threekingdomsselcetmapbg");
        view.addChildToContainer(listbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg2, listbg);
        var poscfg = {
            1: { x: 140, y: 8 },
            2: { x: 10, y: 26 },
            3: { x: 68, y: 155 },
        };
        var curposcfg = {
            1: { x: 280, y: 400 },
            2: { x: 180, y: 530 },
            3: { x: 370, y: 555 },
        };
        //获取当前推荐阵营
        var recommand = arr[0];
        var selectbg = BaseBitmap.create("");
        selectbg.setScale(0.8);
        view.addChildToContainer(selectbg);
        view._curTeam = recommand;
        var _loop_1 = function (i) {
            var map = BaseBitmap.create("threekingdommap" + i);
            view.addChildToContainer(map);
            map.name = "map" + i;
            map.pixelHitTest = true;
            map.addTouchTap(function () {
                if (view._stop) {
                    return;
                }
                if (view.vo.getMyKingdoms() == i) {
                    return;
                }
                view._stop = true;
                view._curTeam = i;
                selectbg.setRes("threekingdommap" + i + "_down");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, map);
                view.createRecommandMap(i);
                //动画
                var roleGroup = view._commandGroup.getChildByName("roleGroup");
                var textGroup = view._commandGroup.getChildByName("textGroup");
                textGroup.mask.width = 0;
                roleGroup.alpha = 0;
                egret.Tween.get(roleGroup).to({ alpha: 1 }, 500).call(function () {
                    egret.Tween.removeTweens(roleGroup);
                }, view);
                //播放卷轴动画
                egret.Tween.get(textGroup.mask).to({ width: 640 }, 1000).call(function () {
                    egret.Tween.removeTweens(textGroup.mask);
                    view._stop = false;
                }, view);
            }, view, [i]);
            map.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, map, listbg, [poscfg[i].x, poscfg[i].y]);
            if (i == recommand) {
                selectbg.setRes("threekingdommap" + i + "_down");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, map);
            }
            if (view.vo.getMyKingdoms() == i) {
                App.DisplayUtil.changeToGray(map);
                var curImg = BaseBitmap.create("threekingdomteamcurtxt");
                view.addChildToContainer(curImg);
                curImg.setPosition(curposcfg[i].x, curposcfg[i].y);
            }
        };
        for (var i = 1; i < 4; ++i) {
            _loop_1(i);
        }
        var group = new BaseDisplayObjectContainer();
        view._commandGroup = group;
        view.addChildToContainer(group);
        view.createRecommandMap(recommand);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsJoinTeam", view.getUiCode()), function () {
            //加入阵营
            if (view._stop) {
                return;
            }
            //活动结束
            if (view.vo.getCurPeriod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip7", code)));
                return;
            }
            //第四轮不可更换
            if (view.vo.getCurWeek() >= 4) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip9", code)));
                return;
            }
            //今日已转换
            var isTodayChange = view.vo.getHasTodayChange();
            if (isTodayChange) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip8", code)));
                return;
            }
            //身居高官
            var isHighOfficial = view.vo.getIsMyOffical();
            if (isHighOfficial) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip6", code)));
                return;
            }
            //今日已转换
            var w = view.vo.getWeekendLock();
            if (w) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip10", code)));
                return;
            }
            var itemnum = view.vo.getMyLetterNum();
            if (itemnum > 0) {
                //确认弹框
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW, {
                    msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip44", code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + view._curTeam, ''))]),
                    touchMaskClose: true,
                    title: App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip4", code),
                    callback: function () {
                        //发消息
                        //活动结束
                        if (view.vo.getCurPeriod() == 3) {
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip7", code)));
                            return;
                        }
                        //第四轮不可更换
                        if (view.vo.getCurWeek() >= 4) {
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip9", code)));
                            return;
                        }
                        //今日已转换
                        var isTodayChange = view.vo.getHasTodayChange();
                        if (isTodayChange) {
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip8", code)));
                            return;
                        }
                        //身居高官
                        var isHighOfficial = view.vo.getIsMyOffical();
                        if (isHighOfficial) {
                            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip6", code)));
                            return;
                        }
                        if (view.vo.getCurPeriod() == 2) {
                            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, {
                                activeId: view.vo.aidAndCode,
                                kingdom: view._curTeam
                            });
                            // ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSSELECTSUCCESSVIEW,{
                            //     cancelTxt : App.CommonUtil.getCnByCode(`acThreeKingdomsTip20`, code),
                            //     team : view._curTeam
                            // });
                            // view.hide();
                        }
                    },
                    handler: _this,
                    needClose: 1,
                    needCancel: true,
                    canelTxt: App.CommonUtil.getCnByCode("acThreeKingdomsTip17", code),
                    recommand: false
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip5", code)));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 40]);
        view.addChildToContainer(btn);
        var icon = BaseBitmap.create("threekingdomteamicon2");
        view.addChildToContainer(icon);
        var itemnum = view.vo.getMyLetterNum();
        var havatxt = ComponentManager.getTextField("x" + itemnum, 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(havatxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [(btn.width - (icon.width + havatxt.width)) / 2, -icon.height + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, havatxt, icon, [icon.width, 0]);
    };
    AcThreeKingdomsChangeTeamView.prototype.createRecommandMap = function (team) {
        var view = this;
        var code = view.getUiCode();
        var posCfg = {
            //魏国曹操 司马懿 张辽
            1: [
                { sid: 1020,
                    x: -20,
                    y: 20,
                },
                { sid: 2007,
                    x: 100,
                    y: 0,
                },
                { sid: 1058,
                    x: 55,
                    y: 55,
                },
            ],
            //蜀国赵云 张飞 关羽
            2: [{
                    sid: 2016,
                    x: -100,
                    y: 30,
                },
                {
                    sid: 2015,
                    x: -10,
                    y: 30,
                },
                {
                    sid: 2014,
                    x: -50,
                    y: 80,
                }],
            //吴国孙策 周瑜 小乔
            3: [
                { sid: 1038,
                    x: 80,
                    y: 120,
                },
                { sid: 1037,
                    x: 0,
                    y: 200,
                },
                { sid: 306,
                    x: 120,
                    y: 200,
                    isWife: true
                },
            ],
        };
        var map = view.container.getChildByName("map" + team);
        view._commandGroup.removeChildren();
        var roleGroup = new BaseDisplayObjectContainer();
        ;
        view._commandGroup.addChild(roleGroup);
        roleGroup.name = "roleGroup";
        for (var i in posCfg[team]) {
            var unit = posCfg[team][i];
            var img = '';
            if (unit.isWife) {
                var wcfg = Config.WifeCfg.getWifeCfgById(unit.sid);
                img = wcfg.body;
            }
            else {
                var scfg = Config.ServantCfg.getServantItemById(unit.sid);
                img = scfg.fullIcon;
            }
            var role = BaseLoadBitmap.create(img);
            role.setScale(unit.isWife ? 0.23 : 0.4);
            role.setPosition(unit.x, unit.y);
            roleGroup.addChild(role);
        }
        var textGroup = new BaseDisplayObjectContainer();
        ;
        view._commandGroup.addChild(textGroup);
        //view._commandGroup.addChild(textGroup);
        textGroup.name = "textGroup";
        var tipbg = BaseBitmap.create("specialview_commoni_namebg");
        textGroup.addChild(tipbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip16_" + team, code)), 18, TextFieldConst.COLOR_WARN_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 280;
        textGroup.addChild(tipTxt);
        tipbg.width = tipTxt.width + 20;
        tipbg.height = tipTxt.height + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        // let recommand = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomteamrecommondtxt`,code));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, recommand, tipbg, [0,tipbg.height+5]);
        // textGroup.addChild(recommand);
        var groupPos = {
            1: [50, 160],
            2: [0, 230],
            3: [60, 180],
        };
        var rolePos = {
            1: [150, 70],
            2: [180, 50],
            3: [200, 0],
        };
        var textPos = {
            1: [120, 245],
            2: [70, 255],
            3: [180, 370],
        };
        view._commandGroup.setPosition(groupPos[team][0], groupPos[team][1]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roleGroup, view._commandGroup, rolePos[team], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, textGroup, view._commandGroup, textPos[team], true);
        textGroup.mask = new egret.Rectangle(0, 0, textGroup.width, textGroup.height);
    };
    AcThreeKingdomsChangeTeamView.prototype.getShowHeight = function () {
        return 877;
    };
    AcThreeKingdomsChangeTeamView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomschangeteamtip4", this.getUiCode());
    };
    AcThreeKingdomsChangeTeamView.prototype.hide = function () {
        var view = this;
        if (view._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcThreeKingdomsChangeTeamView.prototype.selectCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //打开成功弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSSELECTSUCCESSVIEW, {
                cancelTxt: App.CommonUtil.getCnByCode("acThreeKingdomsTip20", "1"),
                team: view._curTeam
            });
            view.hide();
        }
    };
    AcThreeKingdomsChangeTeamView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, view.selectCallback, view);
        view._stop = false;
        view._commandGroup.dispose();
        view._commandGroup = null;
        view._curTeam = 1;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsChangeTeamView;
}(PopupView));
__reflect(AcThreeKingdomsChangeTeamView.prototype, "AcThreeKingdomsChangeTeamView");
//# sourceMappingURL=AcThreeKingdomsChangeTeamView.js.map