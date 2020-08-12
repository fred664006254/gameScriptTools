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
 * 商店
 * author qianjun
 * @class ShopView
 */
var ShopScene = (function (_super) {
    __extends(ShopScene, _super);
    function ShopScene() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._timeToday = 0;
        return _this;
    }
    ShopScene.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_SHOP, MsgConst.MODEL_GAMEINFO, MsgConst.SCROLLTOINDEX,
        ];
    };
    ShopScene.prototype.getNetConstEventArr = function () {
        return [
            NetConst.SHOP_BUYGOLD, NetConst.PAY_PROCESSPAYMENT, NetConst.SHOP_BUYBOX, NetConst.SHOP_BUYDAILY, NetConst.SHOP_BUYEMOTION, NetPushConst.PUSH_PAY,
        ];
    };
    ShopScene.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_SHOP:
                view.modelBack();
                break;
            case MsgConst.MODEL_GAMEINFO:
                view.gamemodelBack();
                break;
            case MsgConst.SCROLLTOINDEX:
                view.jump(evt);
                break;
        }
    };
    ShopScene.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.SHOP_BUYGOLD:
                view.buyGoldBack(evt);
                break;
            case NetConst.PAY_PROCESSPAYMENT:
                view.buyGemBack(evt);
                break;
            case NetConst.SHOP_BUYBOX:
                view.buyBoxBack(evt);
                break;
            case NetConst.SHOP_BUYDAILY:
                view.buyDailyBack(evt);
                break;
            case NetConst.SHOP_BUYEMOTION:
                view.buySpecialBack(evt);
                break;
            case NetPushConst.PUSH_PAY:
                view.buyDiscountBack(evt);
                break;
        }
    };
    ShopScene.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 157;
        // view.y = 72;
        var cfg = view.cfg;
        var arr = [
            { type: ShopConst.SHOP_DISCOUNTSHOP },
            { type: ShopConst.SHOP_DAILYSHOP },
            { type: ShopConst.SHOP_SPECIALVIP },
            { type: ShopConst.SHOP_SPECIALBOX },
            { type: ShopConst.SHOP_GEM },
            { type: ShopConst.SHOP_GOLD },
        ];
        //限定特价
        //每日精选
        //特权
        //皇家宝箱
        //钻石
        //金币
        var num = 2;
        if (Api.SwitchVoApi.checkWxShenhe()) {
            arr = [
                { type: ShopConst.SHOP_DAILYSHOP },
                { type: ShopConst.SHOP_SPECIALBOX },
                { type: ShopConst.SHOP_GOLD },
            ];
            num = 3;
        }
        else {
            if (view.height - 25 > (552 + 709)) {
                num = 20;
            }
        }
        var list = ComponentMgr.getScrollList(ShopTypeItem, arr, new egret.Rectangle(0, 0, view.width, view.height - 25), null, num);
        view.addChild(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, view, [0, 75], true);
        view._list = list;
        App.MsgHelper.addEvt(MsgConst.END_TOUCH_LIST, function (evt) {
            list._onTouchEnd(evt);
        }, this);
        view.checkJump();
        // let redJson = RES.getResByUrl(`/1.json`, (data)=>{
        //     if(data){
        //         let obj : any = {};
        //         for(let i in data){
        //             let key = i;
        //             if(RES.hasRes(key)){
        //                 obj[key] = data[i];
        //             }
        //         }
        //         console.log(JSON.stringify(obj));
        //     }
        // }, view);
    };
    ShopScene.prototype.checkJump = function () {
        if (Api.SwitchVoApi.checkWxShenhe()) {
            return;
        }
        var view = this;
        var list = view._list;
        if (list) {
            if (Api.ShopVoApi.getisbuyRoyal()) {
                Api.ShopVoApi.setisbuyRoyal(false);
                list.setScrollTopByIndex(2, 300);
                var data = Config.RoyalpassCfg.getRechargeType();
                // if(Api.ShopVoApi.getPayInfoById(data)){
                //     ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                //         title : LangMger.getlocal("sysTip"),
                //         msg : LangMger.getlocal(`sysHaveBuy`),
                //         needCancel : false,
                //     });
                //     return;
                // }
                // Api.ShopVoApi.setTouchType(ShopConst.SHOP_SPECIALVIP)
                // Api.ShopVoApi.setTouchId(data);
                //PlatMgr.pay(data); 
            }
        }
        //是0 不用跳转
        if (list && this.param && typeof this.param.index != "undefined") {
            list.setScrollTopByIndex(this.param.index, 300);
        }
    };
    ShopScene.prototype.refreshAfterShow = function (bool) {
        if (bool === void 0) { bool = false; }
        _super.prototype.refreshAfterShow.call(this, bool);
        this.checkJump();
        this.tick();
    };
    ShopScene.prototype.jump = function (param) {
        if (!this.isShow() || !this._list || typeof param.data.index == "undefined" || Api.SwitchVoApi.checkWxShenhe()) {
            return;
        }
        this._list.setScrollTopByIndex(param.data.index, 300);
    };
    Object.defineProperty(ShopScene.prototype, "cfg", {
        get: function () {
            return Config.ShopCfg;
        },
        enumerable: true,
        configurable: true
    });
    // protected getBgName():string{
    //     return `popupview_bg1`;
    // }
    ShopScene.prototype.modelBack = function () {
        var view = this;
        var touchType = Api.ShopVoApi.getTouchType();
        var discountitem = view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe() ? -1 : 0);
        var dailyitem = view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe() ? 0 : 1);
        var vipitem = view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe() ? -1 : 2);
        switch (touchType) {
            case ShopConst.SHOP_DAILYSHOP:
                if (dailyitem) {
                    dailyitem.freshDailyShop();
                }
                break;
            case ShopConst.SHOP_SPECIALVIP:
                if (vipitem) {
                    vipitem.freshSpecialVip();
                }
                break;
            case ShopConst.SHOP_DISCOUNTSHOP:
                if (discountitem) {
                    discountitem.freshDiscountShop();
                }
                break;
            default:
                if (discountitem && dailyitem) {
                    dailyitem.freshDailyShopAll();
                    discountitem.freshDiscountShopAll();
                }
                break;
        }
        Api.ShopVoApi.setTouchType("");
    };
    ShopScene.prototype.hide = function (isDispose) {
        App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, { index: -1 });
        _super.prototype.hide.call(this, isDispose);
    };
    ShopScene.prototype.gamemodelBack = function () {
        var view = this;
        if (view._list) {
            var vipitem = view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe() ? -1 : 2);
            if (vipitem) {
                vipitem.freshSpecialVip();
            }
        }
    };
    ShopScene.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "btn_rule", "shopinfoscene"
        ]);
    };
    ShopScene.prototype.tick = function () {
    };
    ShopScene.prototype.buyGoldBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var cfgid = Api.ShopVoApi.getTouchId();
            var cfg = Config.ShopCfg.getBuyGoldCfgById(Number(cfgid));
            Api.ShopVoApi.setTouchId(0);
        }
    };
    ShopScene.prototype.buyGemBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var cfgid = Api.ShopVoApi.getTouchId();
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(String(cfgid));
            if (cfg && cfg.gemCost) {
                //充值接口
                Api.ShopVoApi.setTouchId(0);
            }
            else {
                //弹出
                if (cfgid) {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title: LangMger.getlocal("sysTip"),
                        msg: LangMger.getlocal("sysBuySucc"),
                        needCancel: false,
                    });
                }
            }
        }
    };
    ShopScene.prototype.buyBoxBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var rewards = evt.data.data.data.rewards;
            var specialBoxId_1 = Api.ShopVoApi.getTouchId();
            var specialBoxCfg_1 = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId_1));
            ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                rewards: rewards,
                title: LangMger.getlocal("sysGetReward"),
                isBoxBuy: true,
                specialBoxId: specialBoxId_1,
                handler: view,
                needCancel: true,
                callback: function () {
                    if (Api.UserinfoVoApi.getGem() < specialBoxCfg_1.costGem1) {
                        App.CommonUtil.gemNotEnough(1);
                        // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        //     title : LangMger.getlocal("sysTip"),
                        //     msg : LangMger.getlocal(`sysgemNotEnough`),
                        //     needCancel : false,
                        // });
                    }
                    else {
                        NetManager.request(NetConst.SHOP_BUYBOX, {
                            shopId: String(specialBoxId_1),
                            idDiscout: 1
                        });
                    }
                },
                closecallback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                },
            });
        }
    };
    ShopScene.prototype.buyDailyBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var rewards = evt.data.data.data.rewards;
            var rewardsArr = GameData.formatRewardItem(rewards);
            if (Api.ShopVoApi.getIsBox()) {
                ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                    rewards: rewards,
                    title: LangMger.getlocal("sysGetReward"),
                    isBoxBuy: false,
                    specialBoxId: Api.ShopVoApi.getBoxId(),
                    handler: view,
                    needCancel: true,
                    closecallback: function () {
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    },
                });
                Api.ShopVoApi.setIsBox(false, "");
            }
            else {
                if (rewardsArr.length > 1 || (rewardsArr[0].type == 100)) {
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        handler: view,
                        callback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                }
                else if (rewardsArr[0].type == 1 || rewardsArr[0].type == 2) {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                }
            }
        }
    };
    ShopScene.prototype.buySpecialBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("sysTip"),
                msg: LangMger.getlocal("sysBuySucc"),
                needCancel: false,
            });
            var vipitem = view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe() ? -1 : 2);
            if (vipitem) {
                vipitem.freshSpecialVip();
            }
        }
    };
    ShopScene.prototype.buyDiscountBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var rewards = evt.data.data.data.rewards;
            // Api.ShopVoApi.setIsBox(true, rewardData.boxId);
            if (Api.ShopVoApi.getIsBox()) {
                ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                    rewards: rewards,
                    title: LangMger.getlocal("sysGetReward"),
                    isBoxBuy: false,
                    specialBoxId: Api.ShopVoApi.getBoxId(),
                    handler: view,
                    needCancel: true,
                    closecallback: function () {
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    },
                });
                Api.ShopVoApi.setIsBox(false, "");
            }
            else {
                if (rewards && rewards != "") {
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        handler: view,
                        callback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                }
            }
        }
    };
    ShopScene.prototype.getBgName = function () {
        return "public_ab_scenebg";
    };
    ShopScene.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._timeToday = 0;
        _super.prototype.dispose.call(this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
    };
    return ShopScene;
}(BaseScene));
__reflect(ShopScene.prototype, "ShopScene");
//# sourceMappingURL=ShopScene.js.map