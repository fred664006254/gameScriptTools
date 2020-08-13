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
 * author:qianjun
 * desc:定军中原入口
*/
var AcConquerMainLandView = (function (_super) {
    __extends(AcConquerMainLandView, _super);
    function AcConquerMainLandView() {
        var _this = _super.call(this) || this;
        _this._timeCDTxt = null;
        _this._enterBtnBg = null;
        _this._enterBtn = null;
        _this._descTxt = null;
        _this._descBg = null;
        _this._list = null;
        _this._curPeriod = 1;
        _this._titele1Txt = null;
        _this._titele2Txt = null;
        _this._titele3Txt = null;
        _this._day = 0;
        return _this;
    }
    Object.defineProperty(AcConquerMainLandView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcConquerMainLandView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "dailyboss_enter", "mainland" + code,
            "mldetailbtn-" + code + "_down", "mldetailbtn-" + code,
            "mldetailtarbar1-" + code + "_down", "mldetailtarbar1-" + code, "mldetailtarbar2-" + code + "_down",
            "mldetailtarbar2-" + code, "mldetailtarbar3-" + code + "_down", "mldetailtarbar3-" + code,
            "mldetailtarbar4-" + code + "_down", "mldetailtarbar4-" + code, "mlenterinflag1-" + code,
            "mlenterinflag2-" + code, "mlenterinflag3-" + code, "mlenterinflag4-" + code,
            "mlinfight-" + code, "mlservantinfight-" + code, "mainland_enterflag-" + code,
            "battleground_detailtxt", "battleground_detailbtn", "rank_1", "rank_2", "rank_3",
            "commonview_border2", "commonview_bottom", "commonview_border1"
        ]);
    };
    AcConquerMainLandView.prototype.getTitleStr = function () {
        return "acConquerMainLand-1_Title";
    };
    AcConquerMainLandView.prototype.getBgName = function () {
        return "mlenterbg-" + this.getUiCode();
    };
    Object.defineProperty(AcConquerMainLandView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
    };
    AcConquerMainLandView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_ZRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandView.prototype.receiveData = function (data) {
        if (data.data.data) {
            this.vo.setZrankinfo(data.data.data);
        }
    };
    AcConquerMainLandView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        if (!this.vo.firstflag) {
            this.openShowView();
        }
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAINLAND_GETINFO, view.getinfo, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, view.armyinfo, view);
        view._day = view.vo.getNowDay();
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETINFO, {
            activeId: view.acTivityId,
        });
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, {
            activeId: view.acTivityId,
        });
        var topBg = BaseBitmap.create("public_9v_bg10");
        topBg.width = GameConfig.stageWidth;
        view.addChild(topBg);
        view._curPeriod = view.vo.getCurPeriod();
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActTime-" + code, [view.vo.acTimeAndHour]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        var str = '';
        if (view._curPeriod == 1) {
            str = LanguageManager.getlocal("acBattleRoundNotStart-1");
        }
        else {
            str = this.vo.acCountDown;
        }
        view.addChild(dateTxt);
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActCD-" + code, [str]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(cdTxt);
        view._timeCDTxt = cdTxt;
        topBg.height = dateTxt.textHeight + cdTxt.textHeight + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, topBg, [13, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdTxt, topBg, [13, 15]);
        var rankbg = App.CommonUtil.getCommonBorderFrame(240);
        view.addChild(rankbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankbg, view);
        var listBg = BaseBitmap.create('public_listbg3');
        listBg.width = 620;
        listBg.height = rankbg.height - 40;
        listBg.setPosition(10, rankbg.y + 20);
        view.addChild(listBg);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = listBg.width - 30;
        innerKuang.height = listBg.height - 30;
        innerKuang.setPosition(listBg.x + 15, listBg.y + 15);
        this.addChild(innerKuang);
        var listTitle = BaseBitmap.create("public_ts_bg01");
        listTitle.width = 570;
        listTitle.setPosition(35, listBg.y + 15);
        this.addChild(listTitle);
        var enterBtnBg = BaseBitmap.create("mainland_enterflag-" + code);
        enterBtnBg.setPosition(GameConfig.stageWidth / 2 - enterBtnBg.width / 2, topBg.y + (rankbg.y - topBg.y) / 2 - enterBtnBg.height / 2 - 50);
        view.addChild(enterBtnBg);
        enterBtnBg.addTouchTap(function () {
            if (view.vo.getCurPeriod() == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        view._enterBtnBg = enterBtnBg;
        if (this._curPeriod == 2) {
            App.DisplayUtil.changeToNormal(view._enterBtnBg);
        }
        else {
            App.DisplayUtil.changeToGray(view._enterBtnBg);
        }
        var enterBtn = BaseBitmap.create("mlenterinflag" + this._curPeriod + "-" + code);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterBtn, enterBtnBg, [0, 0]);
        view.addChild(enterBtn);
        view._enterBtn = enterBtn;
        var descbg = BaseBitmap.create("mainland_entertip-" + code);
        var attend = view.vo.isCanJoin();
        var param = "";
        if (view._curPeriod == 3) {
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if (view._curPeriod == 4) {
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        var descstr = "";
        if (attend) {
            if (view._curPeriod == 1) {
                descstr = LanguageManager.getlocal("acConquerMainLandAttendTip1-" + code, [param]);
            }
            else {
                descstr = LanguageManager.getlocal("acConquerMainLandAttendTip" + view._curPeriod + "-" + code, [param]);
            }
            if (this.vo.isLastPeriod()) {
                descstr = LanguageManager.getlocal("acConquerMainLandAttendTip5-" + code);
            }
        }
        else {
            descstr = LanguageManager.getlocal("acConquerMainLandAttendTip0-" + code, [param]);
        }
        var descTxt = ComponentManager.getTextField(descstr, 22);
        descTxt.width = descbg.width - 20;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, enterBtn, [0, enterBtn.height + 80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        view.addChild(descbg);
        view.addChild(descTxt);
        view._descTxt = descTxt;
        view._descBg = descbg;
        var titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 22, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titele1Txt, rankbg, [80, 40]);
        view._titele1Txt = titele1Txt;
        var titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 22, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titele2Txt, rankbg, [-5, 40]);
        view._titele2Txt = titele2Txt;
        var titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandScore-" + code), 22, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, titele3Txt, rankbg, [80, 40]);
        view._titele3Txt = titele3Txt;
        var ranklist = view.vo.getZrankList();
        var scroRect = new egret.Rectangle(0, 0, rankbg.width, 140);
        var arr = [];
        if (view._curPeriod > 1 && !view.vo.isInJudge()) {
            for (var i in ranklist) {
                var unit = ranklist[i];
                unit.pos = [{ width: titele1Txt.textWidth, x: titele1Txt.x }, { width: titele2Txt.textWidth, x: titele2Txt.x }, { width: titele3Txt.textWidth, x: titele3Txt.x }];
                arr.push(unit);
            }
        }
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandRankItem, arr, scroRect);
        view.addChild(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, rankbg, [0, 70]);
        view._list = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal(view.vo.isInJudge() ? "acBattleGroundTip11-1" : "acBattleRoundNotStart-1", [param]), TextFieldConst.COLOR_BROWN_NEW);
        var detailBtnBg = BaseBitmap.create("mainui_bottombtnbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, detailBtnBg, rankbg, [25, rankbg.height + 20]);
        this.addChild(detailBtnBg);
        var detailBtn = ComponentManager.getButton("battleground_detailbtn", "", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        detailBtn.x = detailBtnBg.x + detailBtnBg.width / 2 - detailBtn.width / 2;
        detailBtn.y = detailBtnBg.y + detailBtnBg.height / 2 - detailBtn.height / 2;
        this.addChild(detailBtn);
        var detailStr = BaseBitmap.create("battleground_detailtxt");
        detailStr.x = detailBtnBg.x + detailBtnBg.width / 2 - detailStr.width / 2;
        detailStr.y = detailBtnBg.y + detailBtnBg.height - detailStr.height / 2;
        this.addChild(detailStr);
    };
    AcConquerMainLandView.prototype.openShowView = function () {
        ViewController.getInstance().openView('AcConquerMainLandFirstShowView', {
            code: this.code
        });
    };
    AcConquerMainLandView.prototype.infoClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcConquerMainLandView.prototype.getRuleInfo = function () {
        return "AcConquerMainLandRule-" + this.getUiCode();
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    // protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
    //     let view = this;
    //     let day = Math.ceil((GameData.serverTime - view.vo.st) / 86400);
    //     let key = `ConquerMainLand-${view.getUiCode()}report-${Api.playerVoApi.getPlayerID()}-${view.vo.st}-${day}`;
    //     let storage = LocalStorageManager.get(key);
    //     if (!storage) {
    //         LocalStorageManager.set(key, `1`);
    //         return { title: { key: `acConquerMainLandreporttitle-${view.getUiCode()}` }, msg: { key: `acConquerMainLandreportmsg-${view.getUiCode()}` } };
    //     }
    //     else {
    //         return null;
    //     }
    // }
    AcConquerMainLandView.prototype.tick = function () {
        var view = this;
        var code = view.getUiCode();
        var str = '';
        var period = view.vo.getCurPeriod();
        var attend = view.vo.isCanJoin();
        if (period != view._curPeriod) {
            view._enterBtn.setRes("mlenterinflag" + period + "-" + code);
            if (period == 2) {
                App.DisplayUtil.changeToNormal(view._enterBtnBg);
            }
            else {
                App.DisplayUtil.changeToGray(view._enterBtnBg);
            }
        }
        if (period == 1) {
            str = LanguageManager.getlocal("acBattleRoundNotStart-1");
        }
        else {
            str = this.vo.acCountDown;
        }
        view._timeCDTxt.text = LanguageManager.getlocal("acConquerMainLandActCD-" + code, [str]);
        this._timeCDTxt.x = GameConfig.stageWidth - this._timeCDTxt.width - 13;
        var param = "";
        if (period == 3) {
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if (period == 4) {
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        if (view._descTxt) {
            var descstr = "";
            if (attend) {
                if (view._curPeriod == 1) {
                    descstr = LanguageManager.getlocal("acConquerMainLandAttendTip1-" + code, [param]);
                }
                else {
                    descstr = LanguageManager.getlocal("acConquerMainLandAttendTip" + view._curPeriod + "-" + code, [param]);
                }
                if (this.vo.isLastPeriod()) {
                    descstr = LanguageManager.getlocal("acConquerMainLandAttendTip5-" + code);
                }
            }
            else {
                descstr = LanguageManager.getlocal("acConquerMainLandAttendTip0-" + code, [param]);
            }
            view._descTxt.text = descstr;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._descBg, view._enterBtn, [0, view._enterBtn.height + 80]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
        }
        view._curPeriod = period;
        view._day = view.vo.getNowDay();
    };
    AcConquerMainLandView.prototype.enterInHandler = function () {
        var view = this;
    };
    AcConquerMainLandView.prototype.update = function () {
        var view = this;
        var code = view.getUiCode();
        var str = '';
        var period = view.vo.getCurPeriod();
        var attend = view.vo.isCanJoin();
        if (period != view._curPeriod) {
            var param = "";
            if (period == 3) {
                param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
            }
            else if (period == 4) {
                param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
            }
            if (view._descTxt) {
                var descstr = "";
                if (attend) {
                    if (view._curPeriod == 1) {
                        descstr = LanguageManager.getlocal("acConquerMainLandAttendTip1-" + code, [param]);
                    }
                    else {
                        descstr = LanguageManager.getlocal("acConquerMainLandAttendTip" + view._curPeriod + "-" + code, [param]);
                    }
                    if (this.vo.isLastPeriod()) {
                        descstr = LanguageManager.getlocal("acConquerMainLandAttendTip5-" + code);
                    }
                }
                else {
                    descstr = LanguageManager.getlocal("acConquerMainLandAttendTip0-" + code, [param]);
                }
                view._descTxt.text = descstr;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._descBg, view._enterBtn, [0, view._enterBtn.height + 80]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
            }
            var ranklist = view.vo.getZrankList();
            var arr = [];
            if (period > 1) {
                for (var i in ranklist) {
                    var unit = ranklist[i];
                    unit.pos = [{ width: view._titele1Txt.textWidth, x: view._titele1Txt.x }, { width: view._titele2Txt.textWidth, x: view._titele2Txt.x }, { width: view._titele3Txt.textWidth, x: view._titele3Txt.x }];
                    arr.push(unit);
                }
            }
            view._list.refreshData(arr, view.code);
        }
    };
    AcConquerMainLandView.prototype.getinfo = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            view.vo.setZidInfo(data.zidgroup);
            view.vo.setBuff(data.buff);
        }
    };
    AcConquerMainLandView.prototype.armyinfo = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            view.vo.setMyTeamInfo(data.allteam);
            var score = 0;
            if (data.myscore && data.myscore.score) {
                score = data.myscore.score;
            }
            this.vo.setMyScore(score);
        }
    };
    AcConquerMainLandView.prototype.dispose = function () {
        var view = this;
        view._timeCDTxt = null;
        view._enterBtn = null;
        view._enterBtnBg = null;
        view._list = null;
        view._curPeriod = 1;
        view._descTxt = null;
        view._titele1Txt = null;
        view._titele2Txt = null;
        view._titele3Txt = null;
        view._day = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAINLAND_GETINFO, view.getinfo, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, view.armyinfo, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandView;
}(AcCommonView));
__reflect(AcConquerMainLandView.prototype, "AcConquerMainLandView");
