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
 * 防守消息
 */
var AcBattleGroundCheerViewTab1 = /** @class */ (function (_super) {
    __extends(AcBattleGroundCheerViewTab1, _super);
    function AcBattleGroundCheerViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._btn = null;
        _this._cheerTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcBattleGroundCheerViewTab1.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcBattleGroundCheerViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundCheerViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view);
        var baseview = ViewController.getInstance().getView('AcBattleGroundCheerView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var bg = BaseBitmap.create("battle-purport");
        // bg.width=516;
        // bg.height=618;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip-" + code, [App.DateUtil.formatSvrHourByLocalTimeZone(22).hour.toString()]), 22, TextFieldConst.COLOR_BLACK);
        tiptxt.width = 555;
        tiptxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, bg, [0, 20]);
        view.addChild(tiptxt);
        var tip2txt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip2-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2txt, bg, [0, bg.height + 10]);
        view.addChild(tip2txt);
        // let CheerId = view.vo.getCheerId();
        // if(CheerId > 0){
        // }
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
        // 	activeId : this.acTivityId
        // });
        // AcBattileGroundVisitViewTab1.AtkaceType = 0;
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", function () {
            if (view.vo.getCurRound() > 1 && !view.vo.getCheerId()) {
                var str = LanguageManager.getlocal("battlegroundcheertip3-" + code);
                App.CommonUtil.showTip(str);
                baseview.hide();
                return;
            }
            if (view.vo.getCheerId()) {
                //打开排行
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code,
                    type: "rank"
                });
            }
            else {
                //打开选择帮会
                if (Api.atkraceVoApi.isShowNpc()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHEERSELECTVIEW, {
                        aid: view.aid,
                        code: view.code
                    });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("battlegroundcheertip6-" + code));
                }
            }
        }, view);
        view._btn = btn;
        view.addChild(btn);
        var info = view.vo.getCheerId();
        var txt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, tiptxt, [85, tiptxt.height + 30]);
        view._cheerTxt = txt;
        view.addChild(txt);
        for (var i in this.cfg.audienceReward) {
            var unit = this.cfg.audienceReward[i];
            unit.idvRank = unit.allianceRank;
        }
        var rewardData = this.cfg.audienceReward;
        var rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - 395);
        var data = {};
        data.type = 1;
        data.code = this.param.data.code;
        var list = ComponentManager.getScrollList(AcBattleRewardScrollItem, rewardData, rect, data);
        list.setPosition(-3, bg.y + bg.height + 40);
        list.bounces = false;
        view.addChild(list);
        view.freshview();
    };
    AcBattleGroundCheerViewTab1.prototype.freshview = function () {
        var view = this;
        var code = view.getUiCode();
        var info = view.vo.getCheerId();
        if (info) {
            var param = [info.name];
            var str = "battlegroundcheertip4";
            view._btn.visible = false;
            if (info.isout) {
                param.push(LanguageManager.getlocal("acBattleRoundOut-" + code));
            }
            else if (view.vo.getCurperiod() > 2) {
                if (Number(view.vo.getWinnerAlliance().mid) == Number(info.id)) {
                    param.push(LanguageManager.getlocal("acBattleRoundWin-" + code));
                }
                else {
                    param.push(LanguageManager.getlocal("acBattleRoundOut-" + code));
                }
            }
            else {
                view._btn.visible = true;
                str = "battlegroundcheertip14";
            }
            view._cheerTxt.text = LanguageManager.getlocal(str + "-" + code, param);
            view._cheerTxt.visible = true;
            view._btn.setText("battlegroundcheertip5-" + code, true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [view._cheerTxt.textWidth + 25, 0]);
            App.CommonUtil.removeIconFromBDOC(view._btn);
        }
        else {
            if (view.vo.getCurRound() == 1) {
                view._btn.visible = true;
                view._btn.setText("battlegroundcheertip7-" + code, true);
                view._cheerTxt.visible = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [110, 0]);
                if (Api.atkraceVoApi.isShowNpc()) {
                    App.CommonUtil.addIconToBDOC(view._btn);
                }
            }
            else {
                view._btn.visible = false;
                view._cheerTxt.text = LanguageManager.getlocal("battlegroundcheertip3-" + code);
                view._cheerTxt.visible = true;
                App.DisplayUtil.changeToGray(view._cheerTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._cheerTxt, view, [0]);
            }
        }
    };
    // public useCallback(data:any):void
    // {
    // 	if(data.data.ret)
    // 	{
    // 		if(data.data.data.data.atkrace.dinfo&&data.data.data.data.atkrace.dinfo.length>=1)
    // 		{
    // 			this.defenseList=data.data.data.data.atkrace.dinfo;
    // 			if(AtkraceVisitViewTab1.AtkaceType ==0)
    // 			{
    // 				this.showList();
    // 			}
    // 		}
    // 		else 
    // 		{
    // 			//没有数据消息
    // 			if(this.noDataTxt==null)
    // 			{
    // 				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
    // 				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
    // 				this.noDataTxt.x = 220;//rankImg.x+60
    // 				if(PlatformManager.checkIsEnLang()){
    // 					this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
    // 				}
    // 				this.noDataTxt.y = 300;//rankImg.y+10;
    // 			}
    // 			this.addChild(this.noDataTxt);
    // 		}	
    // 	}
    //}
    AcBattleGroundCheerViewTab1.prototype.prankCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            view.freshview();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            var baseview = ViewController.getInstance().getView('AcBattleGroundCheerSelectView');
            baseview.hide();
        }
    };
    AcBattleGroundCheerViewTab1.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._cheerTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this)
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundCheerViewTab1;
}(PopupViewTab));
//# sourceMappingURL=AcBattleGroundCheerViewTab1.js.map