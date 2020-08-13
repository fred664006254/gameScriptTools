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
/*
author : qinajun
desc : 任务奖励
*/
var AcRabbitComingShopViewTab2 = (function (_super) {
    __extends(AcRabbitComingShopViewTab2, _super);
    function AcRabbitComingShopViewTab2(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._haveTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingShopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingShopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingShopViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingShopViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingShopViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingShopViewTab2.prototype.getUiCode = function () {
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
    AcRabbitComingShopViewTab2.prototype.initView = function () {
        var _this = this;
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_BUY), this.buyCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_TASK), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 650;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var code = view.getUiCode();
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("rabittaskrewardbg", code));
        view.addChild(topbg);
        topbg.width = 532;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 3]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingtip5", code), [view.vo.getChoclateNum().toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [20, 12]);
        view._haveTxt = tipTxt;
        var reward = GameData.formatRewardItem("1050_1_0")[0];
        var icon = GameData.getItemIcon(reward, true);
        view.addChild(icon);
        icon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [20, 40]);
        var dailyTxt = ComponentManager.getTextField(reward.desc, 20, TextFieldConst.COLOR_BLACK);
        dailyTxt.width = 255;
        dailyTxt.lineSpacing = 5;
        view.addChild(dailyTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, dailyTxt, icon, [icon.width * icon.scaleX + 10, 0]);
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.scaleX = 40 / gemIcon.width;
        gemIcon.scaleY = 40 / gemIcon.height;
        view.addChild(gemIcon);
        var gemTxt = ComponentManager.getTextField(view.cfg.cost.toString(), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        view.addChild(gemTxt);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acPunishBuyItemBuy", function () {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            var playerNum = Api.playerVoApi.getPlayerGem();
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW, {
                "confirmCallback": function (data) {
                    if (Api.playerVoApi.getPlayerGem() < (view.cfg.cost * data)) {
                        //确认弹框
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: LanguageManager.getlocal("acConquerMainLandTip19-1"),
                            touchMaskClose: true,
                            title: "itemUseConstPopupViewTitle",
                            callback: function () {
                                if (view.vo.isInActivity()) {
                                    //充值
                                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                                }
                            },
                            handle: view,
                            needClose: 1,
                            needCancel: true,
                            confirmTxt: "gotocharge",
                            recommand: false
                        });
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_RABBIT_BUY, {
                        activeId: view.vo.aidAndCode,
                        num: data
                    });
                },
                "maxNum": 100,
                "shopItemCost": _this.cfg.cost,
                "shopItemName": reward.name,
                "handler": _this,
                "playerNum": playerNum,
                "id": 1,
            });
            // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            // 	msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip14`, code), [view.cfg.cost.toString()]),
            // 	title : `itemUseConstPopupViewTitle`,
            // 	touchMaskClose : true,
            // 	callback : ()=>{          
            //         NetManager.request(NetRequestConst.REQUEST_RABBIT_BUY, { 
            //             activeId : view.vo.aidAndCode, 
            //         });
            // 	},
            // 	handle : view,
            // 	needClose : 1,
            // 	needCancel : true
            // });  
        }, view);
        view.addChild(getBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, topbg, [20, 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, gemIcon, getBtn, [23, -gemIcon.height + 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, gemIcon, [gemIcon.width - 5, 0]);
        var vo = this.vo;
        var arr = view.getArr(); //
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - topbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingShopTaskItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0, topbg.height + 2]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcRabbitComingShopViewTab2.prototype.getArr = function () {
        var view = this;
        var arr = view.vo.getArr("task"); //
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = view.vo.getTask(arr[i].id);
            if (view.vo.isGetTaskReward(arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (taskNum >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcRabbitComingShopViewTab2.prototype.buyCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingtip15", view.getUiCode())));
        }
    };
    AcRabbitComingShopViewTab2.prototype.update = function () {
        var view = this;
        var code = view.getUiCode();
        if (!view.vo) {
            return;
        }
        view._haveTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingtip5", code), [view.vo.getChoclateNum().toString()]);
        var arr = view.getArr();
        view._scrollList.refreshData(arr, view.code);
    };
    AcRabbitComingShopViewTab2.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        var cfg = view.cfg.task[view.vo.lastidx];
        var str = rewards;
        if (cfg.specialGift) {
            str = "1050_1_" + cfg.specialGift + "|" + str;
        }
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcRabbitComingShopViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_BUY), this.buyCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_TASK), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingShopViewTab2;
}(CommonViewTab));
__reflect(AcRabbitComingShopViewTab2.prototype, "AcRabbitComingShopViewTab2");
//# sourceMappingURL=AcRabbitComingShopViewTab2.js.map