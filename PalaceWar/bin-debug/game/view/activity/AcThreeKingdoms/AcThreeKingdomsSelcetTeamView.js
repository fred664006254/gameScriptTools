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
/**
 * 三国争霸选择阵营
 * author qianjun
 */
var AcThreeKingdomsSelcetTeamView = /** @class */ (function (_super) {
    __extends(AcThreeKingdomsSelcetTeamView, _super);
    function AcThreeKingdomsSelcetTeamView() {
        var _this = _super.call(this) || this;
        _this._stop = false;
        _this._commandGroup = null;
        _this._curTeam = 1;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsSelcetTeamView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsSelcetTeamView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsSelcetTeamView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsSelcetTeamView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsSelcetTeamView.prototype.getUiCode = function () {
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
    AcThreeKingdomsSelcetTeamView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg", "specialview_commoni_namebg", "threekingdomsselectteamview"
        ]);
    };
    AcThreeKingdomsSelcetTeamView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsSelcetTeamView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsSelcetTeamView.prototype.initView = function () {
        var _this = this;
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, view.selectCallback, view);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip11", view.getUiCode())), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        tipTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2, 20);
        view.addChildToContainer(tipTxt);
        var line = BaseBitmap.create("public_cut_line");
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 10]);
        var listbg = BaseBitmap.create("public_9_bg94");
        listbg.width = 526;
        listbg.height = 440;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0, tipTxt.textHeight + 30]);
        var listbg2 = BaseBitmap.create("threekingdomsselcetmapbg");
        view.addChildToContainer(listbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg2, listbg);
        var poscfg = {
            1: { x: 140, y: 8 },
            2: { x: 10, y: 26 },
            3: { x: 68, y: 155 }
        };
        //获取当前推荐阵营
        var recommand = view.vo.getRecommandTeam();
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
        };
        for (var i = 1; i < 4; ++i) {
            _loop_1(i);
        }
        var group = new BaseDisplayObjectContainer();
        view._commandGroup = group;
        view.addChildToContainer(group);
        view.createRecommandMap(recommand);
        if (!view.vo.isSelectedKindom()) {
            if (view.vo.isCanJoin()) {
                var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsJoinTeam", view.getUiCode()), function () {
                    //加入阵营
                    if (view._stop) {
                        return;
                    }
                    //确认弹框
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW, {
                        msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip18", '1'), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + view._curTeam, ''))]),
                        touchMaskClose: true,
                        title: App.CommonUtil.getCnByCode("acThreeKingdomsJoinTeam", "1"),
                        callback: function () {
                            //发消息
                            if (view.vo.getCurPeriod() == 2) {
                                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, {
                                    activeId: view.vo.aidAndCode,
                                    kingdom: view._curTeam,
                                    recommend: view._curTeam == view.vo.getRecommandTeam() ? 1 : 0
                                });
                            }
                        },
                        handler: _this,
                        needClose: 1,
                        needCancel: true,
                        canelTxt: App.CommonUtil.getCnByCode("acThreeKingdomsTip17", '1'),
                        recommand: view._curTeam != view.vo.getRecommandTeam()
                    });
                }, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 20]);
                view.addChildToContainer(btn);
                var rewardvo = GameData.formatRewardItem(view.cfg.recommendReward)[0];
                var recommendRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomscangetreward", view.getUiCode()), [rewardvo.name, rewardvo.num.toString()]), 20, TextFieldConst.COLOR_WARN_RED2);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, recommendRewardTxt, btn, [0, btn.height + 10]);
                view.addChildToContainer(recommendRewardTxt);
            }
            else {
                var cannotTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsCanNotJoinTeam", view.getUiCode()), [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.lvNeed), App.StringUtil.changeIntToText(view.cfg.powerNeed)]), 20, TextFieldConst.COLOR_BROWN);
                cannotTxt.textAlign = egret.HorizontalAlign.CENTER;
                cannotTxt.lineSpacing = 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cannotTxt, listbg, [0, listbg.height + 30]);
                view.addChildToContainer(cannotTxt);
            }
        }
    };
    AcThreeKingdomsSelcetTeamView.prototype.createRecommandMap = function (team) {
        var view = this;
        var code = view.getUiCode();
        var posCfg = {
            //魏国曹操 司马懿 张辽
            1: [
                { sid: 1020,
                    x: -20,
                    y: 20
                },
                { sid: 2007,
                    x: 100,
                    y: 0
                },
                { sid: 1058,
                    x: 55,
                    y: 55
                },
            ],
            //蜀国赵云 张飞 关羽
            2: [{
                    sid: 2016,
                    x: -100,
                    y: 30
                },
                {
                    sid: 2015,
                    x: -10,
                    y: 30
                },
                {
                    sid: 2014,
                    x: -50,
                    y: 80
                }],
            //吴国孙策 周瑜 小乔
            3: [
                { sid: 1038,
                    x: 80,
                    y: 120
                },
                { sid: 1037,
                    x: 0,
                    y: 200
                },
                { sid: 306,
                    x: 120,
                    y: 200,
                    isWife: true
                },
            ]
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
        var recommand = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomteamrecommondtxt", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, recommand, tipbg, [0, tipbg.height + 5]);
        textGroup.addChild(recommand);
        recommand.visible = view.vo.getRecommandTeam() == team;
        var groupPos = {
            1: [50, 60],
            2: [-10, 120],
            3: [60, 80]
        };
        var rolePos = {
            1: [150, 70],
            2: [180, 50],
            3: [200, 0]
        };
        var textPos = {
            1: [120, 255],
            2: [70, 265],
            3: [180, 370]
        };
        view._commandGroup.setPosition(groupPos[team][0], groupPos[team][1]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roleGroup, view._commandGroup, rolePos[team], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, textGroup, view._commandGroup, textPos[team], true);
        textGroup.mask = new egret.Rectangle(0, 0, textGroup.width, textGroup.height);
    };
    // protected getShowHeight():number{
    // 	return 760;
    // }
    AcThreeKingdomsSelcetTeamView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsSelectTeam", this.getUiCode());
    };
    AcThreeKingdomsSelcetTeamView.prototype.hide = function () {
        var view = this;
        if (view._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcThreeKingdomsSelcetTeamView.prototype.selectCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            if (evt.data.data.data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                    rewards: evt.data.data.data.rewards,
                    callback: function () {
                        //打开成功弹窗
                        ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSSELECTSUCCESSVIEW, {
                            cancelTxt: App.CommonUtil.getCnByCode("acThreeKingdomsTip20", "1"),
                            team: view._curTeam
                        });
                        view.hide();
                    },
                    handler: view
                });
            }
            else {
                //打开成功弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSSELECTSUCCESSVIEW, {
                    cancelTxt: App.CommonUtil.getCnByCode("acThreeKingdomsTip20", "1"),
                    team: view._curTeam
                });
                view.hide();
            }
        }
    };
    AcThreeKingdomsSelcetTeamView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS, view.selectCallback, view);
        view._stop = false;
        view._commandGroup.dispose();
        view._commandGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsSelcetTeamView;
}(PopupView));
//# sourceMappingURL=AcThreeKingdomsSelcetTeamView.js.map