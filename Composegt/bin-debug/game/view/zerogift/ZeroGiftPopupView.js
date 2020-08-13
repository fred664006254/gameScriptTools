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
var ZeroGiftPopupView = (function (_super) {
    __extends(ZeroGiftPopupView, _super);
    function ZeroGiftPopupView() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        return _this;
    }
    ZeroGiftPopupView.prototype.initView = function () {
        var lb_time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_RED);
        lb_time.width = 620;
        lb_time.textAlign = egret.HorizontalAlign.CENTER;
        lb_time.x = -20;
        lb_time.y = 796;
        this.addChildToContainer(lb_time);
        this.lb_time = lb_time;
        //
        var et = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"]['et'];
        this.time = et - GameData.serverTime;
        var time = App.DateUtil.getFormatBySecond(this.time, 8);
        lb_time.text = LanguageManager.getlocal("zeroGift_endtime", [time]);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
    };
    ZeroGiftPopupView.prototype.setTabBarPosition = function () {
        var tab_group = this.tabbarGroup;
        if (tab_group) {
            tab_group.setPosition(88, this.viewBg.y + 90);
            tab_group.setSpace(24);
            tab_group.setColor(0x4a2308, 0x4a2308);
        }
    };
    ZeroGiftPopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    ZeroGiftPopupView.prototype.getBgName = function () {
        return "zerogift_bg";
    };
    ZeroGiftPopupView.prototype.getTitleStr = function () {
        return "";
    };
    // 页签图名称
    ZeroGiftPopupView.prototype.getTabbarName = function () {
        return "zerogift_tab";
    };
    ZeroGiftPopupView.prototype.getTabbarTextArr = function () {
        return ['zeroGiftTab1', 'zeroGiftTab2', 'zeroGiftTab3'];
    };
    ZeroGiftPopupView.prototype.getResourceList = function () {
        return ["zerogift_bg", "zerogift_des6888", "zerogift_attr",
            "zerogift_des4888", "zerogift_des9888", "zerogift_shili_40000",
            "zerogift_shili_80000", "zerogift_tab", "zerogift_tab_down",
            "zerogift_headicon", "acredlotuswarrior_btn-1"];
    };
    ZeroGiftPopupView.prototype.getRequestData = function () {
        var zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
        if (zeroGift && zeroGift["firstflag"] >= 1) {
            return null;
        }
        else {
            return { requestType: NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG, requestData: null };
        }
    };
    ZeroGiftPopupView.prototype.tick = function () {
        if (this.lb_time) {
            if (this.time <= 0) {
                this.hide();
                return;
            }
            var time = App.DateUtil.getFormatBySecond(--this.time, 8);
            this.lb_time.text = LanguageManager.getlocal("zeroGift_endtime", [time]);
        }
    };
    ZeroGiftPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.lb_time = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
    };
    ZeroGiftPopupView.prototype.toBuy = function (id, price) {
        if (this.time <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal('zeroprice_end'));
            return;
        }
        if (price > Api.playerVoApi.getPlayerGem()) {
            var str = LanguageManager.getlocal("zerogemnotenough");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "",
                msg: str,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        var sendData = {};
        sendData["typeid"] = id;
        this.request(NetRequestConst.REQUEST_BUY_ZEROGIFT, sendData);
    };
    ZeroGiftPopupView.prototype.receiveData = function (event) {
        var data = event.data;
        if (!data.ret && data.cmd != NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG) {
            // App.CommonUtil.showTip(LanguageManager.getlocal(data.data.msg));
            return;
        }
        if (data.data.data && data.data.data.rewards) {
            var rewards = GameData.formatRewardItem(data.data.data.rewards);
            var length_1 = rewards.length;
            if (rewards && length_1 > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
        }
    };
    /**
     * id 奖励的id，门客、红颜、或皮肤
     * obj 所在节点
     */
    ZeroGiftPopupView.prototype.addAni = function (id, node) {
        //创建一个容器，存放动画
        var parent = new BaseDisplayObjectContainer;
        node.addChild(parent);
        parent.y = 150;
        //绘一遮罩
        var shape = new BaseShape, graphics = shape.graphics;
        node.addChild(shape);
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(0, 150, 600, 400);
        graphics.endFill();
        parent.mask = shape;
        var ids = GameData.formatRewardItem(id), leng = ids.length;
        var _loop_1 = function (i) {
            var itemCfg = null;
            if (ids[i].type == 8) {
                itemCfg = Config.ServantCfg.getServantItemById(ids[i].id);
            }
            else if (ids[i].type == 10) {
                itemCfg = Config.WifeCfg.getWifeCfgById(ids[i].id);
            }
            else if (ids[i].type == 16) {
                itemCfg = Config.WifeskinCfg.getWifeCfgById(ids[i].id);
            }
            var dagonBonesName = itemCfg.bone, picName = itemCfg.body, boneName = dagonBonesName + "_ske";
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var boneAni = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                boneAni.visible = true;
                boneAni.setScale(0.5);
                var half_h = boneAni.height / 2;
                boneAni.anchorOffsetY = half_h;
                boneAni.anchorOffsetX = boneAni.width / 2;
                if (leng > 1) {
                    boneAni.x = 200 + i * 200;
                }
                else {
                    boneAni.x = 290;
                }
                boneAni.y = 415 - half_h; //ids[i].type == 8 ? 405 - half_h : 415 - half_h;
                parent.addChild(boneAni);
            }
            else {
                var Img_1 = BaseLoadBitmap.create(picName, null, {
                    callback: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var scale = ids[i].type == 8 ? 0.6 : 0.35;
                        Img_1.width *= scale;
                        Img_1.height *= scale;
                        Img_1.anchorOffsetY = Img_1.height / 2;
                        Img_1.anchorOffsetX = Img_1.width / 2;
                        Img_1.y = 398 - Img_1.height / 2;
                    }, callbackThisObj: node
                });
                if (leng > 1) {
                    Img_1.x = 220 + i * 200;
                }
                else {
                    Img_1.x = 290;
                }
                parent.addChild(Img_1);
            }
        };
        for (var i = 0; i < leng; i++) {
            _loop_1(i);
        }
    };
    return ZeroGiftPopupView;
}(PopupView));
__reflect(ZeroGiftPopupView.prototype, "ZeroGiftPopupView");
