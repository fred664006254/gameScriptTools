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
 * 三国争霸任务奖励升级弹窗
 * author qianjun
 */
var AcThreeKingdomsUpgradeRewardView = (function (_super) {
    __extends(AcThreeKingdomsUpgradeRewardView, _super);
    function AcThreeKingdomsUpgradeRewardView() {
        var _this = _super.call(this) || this;
        _this._haveTxt = null;
        _this._costIcon = null;
        _this._costTxt = null;
        _this._showlist = null;
        _this._havebg = null;
        _this._upBtn = null;
        _this._bg = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsUpgradeRewardView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsUpgradeRewardView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsUpgradeRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "titleupgradearrow", "common_titlebg"
        ]);
    };
    AcThreeKingdomsUpgradeRewardView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsUpgradeRewardView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsUpgradeRewardView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.freshview, view);
        var code = view.getUiCode();
        var cfg = view.cfg;
        var info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        var status = info.status;
        //2武3知4政5魅1全属性
        var tasktype = view.cityId;
        var tasklevel = info.level;
        var taskcfg = view.cfg.taskList[tasklevel - 1];
        var havebg = BaseBitmap.create("threekingdomsrectbg1");
        havebg.width = 150;
        view.addChildToContainer(havebg);
        view._havebg = havebg;
        havebg.setPosition(view.viewBg.x + (view.viewBg.width - havebg.width) / 2, 10);
        var icon = BaseBitmap.create("public_icon1");
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, havebg);
        var haveTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), 20);
        view.addChildToContainer(haveTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, havebg, [15, 0]);
        view._haveTxt = haveTxt;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(tasklevel == view.cfg.taskList.length ? "acThreeKingdomstasktip16" : "acThreeKingdomstasktip" + (view.cityId == 1 ? 21 : 15), code), [view.cfg.taskList[view.cfg.taskList.length - 1]["needValue" + (view.cityId == 1 ? 2 : 1)]]), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, havebg, [0, havebg.height + 10]);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = tasklevel == view.cfg.taskList.length ? 340 : 380;
        view.addChildToContainer(bg);
        view._bg = bg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0, tipTxt.height + 7]);
        var tmp = [];
        for (var i in view.cfg.taskList) {
            tmp.push(view.cfg.taskList[i]);
        }
        var tmpRect = new egret.Rectangle(0, 0, 510, 450);
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsTaskLevelItem, tmp, tmpRect, {
            code: view.code,
            cityId: view.cityId
        });
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 7]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        view._showlist = scrollList;
        //奖励升级
        if (tasklevel == view.cfg.taskList.length) {
            // let costTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code)), 20, TextFieldConst.COLOR_BROWN);
            // view.addChildToContainer(costTxt); 
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costTxt, bg, [0,bg.height+20]);
        }
        else {
            var costicon = BaseBitmap.create("public_icon1");
            costicon.setScale(0.8);
            view.addChildToContainer(costicon);
            view._costIcon = costicon;
            var costTxt = ComponentManager.getTextField(taskcfg.needGem.toString(), 20, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(costTxt);
            view._costTxt = costTxt;
            if (Api.playerVoApi.getPlayerGem() < taskcfg.needGem) {
                costTxt.textColor = TextFieldConst.COLOR_WARN_RED;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, bg, [(bg.width - costicon.width * costicon.scaleX - costTxt.width) / 2, bg.height + 10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width, 0]);
            var upbtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomstasktip2", code), function () {
                if (!view.vo.isInTaskTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip18", code)));
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                    if (view.vo.getCurPeriod() == 4) {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                    }
                    view.hide();
                    return;
                }
                if (Api.playerVoApi.getPlayerGem() < taskcfg.needGem) {
                    // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    // 	msg : LanguageManager.getlocal(`acConquerMainLandTip19-${code}`, [view._costTxt.text]),
                    // 	title : `itemUseConstPopupViewTitle`,
                    // 	touchMaskClose : true,
                    // 	callback : ()=>{
                    // 		if(!view.vo.isInTaskTime()){
                    //             App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip18`, code)));
                    //             App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                    //             if(view.vo.getCurPeriod() == 4){
                    //                 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                    //             }
                    //             view.hide();
                    //             return
                    //         }	
                    // 		//充值
                    // 		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                    // 	},
                    // 	handle : view,
                    // 	needClose : 1,
                    // 	needCancel : true,
                    // 	confirmTxt : `gotocharge`
                    // });
                    //确认弹框
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW, {
                        msg: LanguageManager.getlocal("acConquerMainLandTip19-" + code, [view._costTxt.text]),
                        touchMaskClose: true,
                        title: "itemUseConstPopupViewTitle",
                        callback: function () {
                            if (!view.vo.isInTaskTime()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip18", code)));
                                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                                if (view.vo.getCurPeriod() == 4) {
                                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                                }
                                view.hide();
                                return;
                            }
                            //充值
                            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                        },
                        handle: view,
                        needClose: 1,
                        needCancel: true,
                        confirmTxt: "gotocharge",
                        recommand: false
                    });
                    return;
                }
                // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                // 	msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip20`, code), [taskcfg.needGem.toString()]),
                // 	title : `itemUseConstPopupViewTitle`,
                // 	touchMaskClose : true,
                // 	callback : ()=>{          
                //         NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, { 
                //             activeId : view.vo.aidAndCode, 
                //             cityId : view.cityId == 1 ? 5 : (view.cityId - 1),
                //         });
                // 	},
                // 	handle : view,
                // 	needClose : 1,
                // 	needCancel : true
                // });  
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW, {
                    msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomstasktip20", code), [taskcfg.needGem.toString()]),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, {
                            activeId: view.vo.aidAndCode,
                            cityId: view.cityId == 1 ? 5 : (view.cityId - 1),
                        });
                    },
                    handle: view,
                    needClose: 1,
                    needCancel: true,
                    recommand: false
                });
                // App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip1`, code)));
            }, view);
            view.addChildToContainer(upbtn);
            view._upBtn = upbtn;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upbtn, bg, [0, bg.height + 43]);
        }
    };
    // protected getShowHeight() : number{
    //     return 750;
    // }
    AcThreeKingdomsUpgradeRewardView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomstasktip14", this.getUiCode());
    };
    AcThreeKingdomsUpgradeRewardView.prototype.freshview = function () {
        var view = this;
        var info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        var status = info.status;
        //2武3知4政5魅1全属性
        var tasktype = view.cityId;
        var tasklevel = info.level;
        var taskcfg = view.cfg.taskList[tasklevel - 1];
        view._costTxt.textColor = Api.playerVoApi.getPlayerGem() < taskcfg.needGem ? TextFieldConst.COLOR_WARN_RED : TextFieldConst.COLOR_BROWN;
        view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15, 0]);
    };
    AcThreeKingdomsUpgradeRewardView.prototype.attackBack = function (evt) {
        var view = this;
        var code = view.getUiCode();
        if (evt.data.ret) {
            var data = evt.data.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            view.hide();
            // let info = view.vo.getCityTaskStaus(view.cityId);
            // let tasklevel = info.level;
            // let tmp = [];
            // for(let i in view.cfg.taskList){
            //     tmp.push(view.cfg.taskList[i]);
            // }
            // // tmp.sort((a,b)=>{
            // //     if(a.id == tasklevel){
            // //         return -1;
            // //     }
            // //     else if(b.id == tasklevel){
            // //         return 1;
            // //     }
            // //     else{
            // //         if(a.id > tasklevel && b.id < tasklevel){
            // //             return -1;
            // //         }
            // //         else if(a.id < tasklevel && b.id > tasklevel){
            // //             return 1;
            // //         }
            // //         else{
            // //             return a.id - b.id;
            // //         }
            // //     }
            // // });
            // view._showlist.refreshData(tmp,{
            //     code : view.code,
            //     cityId : view.cityId
            // });
            // view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15,0])
            // if(tasklevel == view.cfg.taskList.length){
            //     view._costIcon.visible = view._upBtn.visible = false;
            //     view._costTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code));
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costTxt, view._bg, [0,view._bg.height+20]);
            // }   
        }
    };
    AcThreeKingdomsUpgradeRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.freshview, view);
        view._haveTxt = null;
        view._costTxt = null;
        view._havebg = null;
        view._costIcon = null;
        view._showlist = null;
        view._upBtn = null;
        view._bg = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsUpgradeRewardView;
}(PopupView));
__reflect(AcThreeKingdomsUpgradeRewardView.prototype, "AcThreeKingdomsUpgradeRewardView");
//# sourceMappingURL=AcThreeKingdomsUpgradeRewardView.js.map