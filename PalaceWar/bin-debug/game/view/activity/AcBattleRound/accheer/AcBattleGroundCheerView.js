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
var AcBattleGroundCheerView = /** @class */ (function (_super) {
    __extends(AcBattleGroundCheerView, _super);
    function AcBattleGroundCheerView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    AcBattleGroundCheerView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcBattleGroundCheerView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundCheerView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "battletabbg", "battle-purport", "activity_charge_red"
        ]);
    };
    AcBattleGroundCheerView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acBattleCheerTab1-" + code,
            "acBattleCheerTab2-" + code,
        ];
    };
    AcBattleGroundCheerView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' && Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            return "acBattleRoundRule-1_newRule_withOpenRefusal";
        }
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? ("acBattleRoundRule-" + this.getUiCode() + "_newRule") : ("acBattleRoundRule-" + this.getUiCode());
    };
    AcBattleGroundCheerView.prototype.getRuleInfoParam = function () {
        var tmp = [];
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    };
    AcBattleGroundCheerView.prototype.getTitleStr = function () {
        return "battlegroundcheer-" + this.getUiCode() + "_Title";
    };
    Object.defineProperty(AcBattleGroundCheerView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    // protected getRequestData():{requestType:string,requestData:any}{	
    // 	return {
    //         requestType:NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.data.data){ 
    //         this.vo.setMyTeamInfo(data.data.data.allteam);
    //         let score = 0;
    //         if(data.data.data.myscore && data.data.data.myscore.score){
    //             score = data.data.data.myscore.score;
    //         }
    //         this.vo.setMyScore(score);
    //     } 
    // }
    AcBattleGroundCheerView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bouttom = BaseBitmap.create("battledownbg");
        bouttom.width = GameConfig.stageWidth;
        bouttom.height = GameConfig.stageHeigth - 72;
        this.addChildToContainer(bouttom);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        var tarbg = BaseBitmap.create("battletabbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0, view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);
        view._tabHeight = view.height - tarbg.y - tarbg.height;
        if (view.vo.getCheerId()) {
            view.tabbarGroup.setLocked(1, false);
        }
        else {
            view.tabbarGroup.setLocked(1, true);
        }
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcBattleGroundCheerView.prototype.checkTabCondition = function (index) {
        var view = this;
        if (view.vo.getCheerId()) {
            return true;
        }
        else {
            if (view.vo.isInActy()) {
                if (view.vo.getCurRound() == 1) {
                    if (Api.atkraceVoApi.isShowNpc()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("battlegroundcheertip62-" + view.getUiCode()));
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("battlegroundcheertip6-" + view.getUiCode()));
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("battlegroundcheertip8-" + view.getUiCode()));
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("battlegroundcheertip81-" + view.getUiCode()));
            }
            return false;
        }
    };
    AcBattleGroundCheerView.prototype.tick = function () {
        var view = this;
        if (view.vo.getCheerId()) {
            if (view.vo.canGetTask()) {
                view.tabbarGroup.addRedPoint(1);
            }
            else {
                view.tabbarGroup.removeRedPoint(1);
            }
            view.tabbarGroup.setLocked(1, false);
        }
        else {
            view.tabbarGroup.setLocked(1, true);
        }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
    };
    AcBattleGroundCheerView.prototype.dispose = function () {
        var view = this;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundCheerView;
}(CommonView));
//# sourceMappingURL=AcBattleGroundCheerView.js.map