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
 * 邀请好友tab2
 * author qianjun
 */
var InviteFriendPopupViewTab2 = (function (_super) {
    __extends(InviteFriendPopupViewTab2, _super);
    function InviteFriendPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._errTxt = null;
        _this._boxId = "";
        _this.initView();
        return _this;
    }
    InviteFriendPopupViewTab2.prototype.getNetConstEventArr = function () {
        return [
            NetConst.INVITEFRIEND_BIND
        ];
    };
    InviteFriendPopupViewTab2.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.INVITEFRIEND_BIND:
                view.bindCallBack(evt);
                break;
        }
    };
    Object.defineProperty(InviteFriendPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.InvitefriendCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviteFriendPopupViewTab2.prototype, "api", {
        get: function () {
            return Api.InviteFriendVoApi;
        },
        enumerable: true,
        configurable: true
    });
    InviteFriendPopupViewTab2.prototype.initView = function () {
        var view = this;
        var api = view.api;
        view.initEventListener();
        view.width = 500;
        view.height = 531;
        var wordbg = BaseBitmap.create("invitefriendwordbg");
        wordbg.width = 500;
        wordbg.height = 204;
        view.addChild(wordbg);
        var descTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip6"), TextFieldConst.SIZE_22, 0xCFDEFF);
        descTxt.stroke = 2;
        descTxt.strokeColor = 0x0C2C77;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, wordbg, [0, 19]);
        view.addChild(descTxt);
        var rewards = GameData.formatRewardItem(view.cfg.getUseCanGet());
        var len = rewards.length;
        var tmpx = (wordbg.width - len * 124 - (len - 1) * 24) / 2;
        view._boxId = "";
        for (var index = 0; index < len; index++) {
            var vo = rewards[index];
            var item = this.createTopItem(vo);
            view.addChild(item);
            item.setPosition(wordbg.x + tmpx + index * (124 + 24), descTxt.y + descTxt.textHeight + 23);
            if (vo.type == 50) {
                view._boxId = vo.id + '';
            }
        }
        var inviteTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip7"), TextFieldConst.SIZE_22, 0xFFFFFF);
        inviteTxt.stroke = 2;
        inviteTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, inviteTxt, wordbg, [0, wordbg.height + 40]);
        view.addChild(inviteTxt);
        var input = ComponentMgr.getInputTextField(ColorEnums.gray, TextFieldConst.SIZE_22, 320, 48, "joinwarinputbg", "", ColorEnums.gray);
        view.addChild(input);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, input, inviteTxt, [0, inviteTxt.height + 17]);
        var inputTxt = input.getChildByName("textField");
        inputTxt.setColor(ColorEnums.white);
        var errTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip8"), TextFieldConst.SIZE_22, 0xDA5151);
        errTxt.stroke = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, errTxt, wordbg, [0, wordbg.height + 146]);
        view.addChild(errTxt);
        errTxt.visible = false;
        view._errTxt = errTxt;
        var copyBtn = ComponentMgr.getButton("invitefriendcopybtn", LangMger.getlocal("sysuse"), function () {
            //使用
            NetManager.request(NetConst.INVITEFRIEND_BIND, {
                bindCode: inputTxt.text
            });
        }, view);
        view.addChild(copyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, copyBtn, wordbg, [0, wordbg.height + 218]);
        copyBtn.visible = !api.getIsFinishBind();
    };
    InviteFriendPopupViewTab2.prototype.createTopItem = function (itemVo) {
        var view = this;
        var item = new BaseDisplayObjectContainer();
        item.width = 124;
        item.height = 127;
        var bg = BaseBitmap.create("invitefriendrewardbg");
        item.addChild(bg);
        var lingpai = ComponentMgr.getCustomMovieClip(itemVo.type == 100 ? "firstrec_effect1_" : "firstrec_effect2_", null, 120);
        lingpai.blendMode = egret.BlendMode.ADD;
        lingpai.playWithTime(0);
        item.addChild(lingpai);
        lingpai.anchorOffsetX = 190 / 2;
        lingpai.anchorOffsetY = 180 / 2;
        lingpai.setScale(1.3);
        lingpai.x = 60;
        lingpai.y = 58;
        lingpai.name = "lingpai";
        var iconstr = itemVo.icon;
        var icon = BaseLoadBitmap.create(iconstr, null, { callback: function () {
                icon.setScale(itemVo.type == 50 ? 0.35 : 0.65);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, itemVo.type == 50 ? 0 : 17]);
            }, callbackThisObj: view });
        item.addChild(icon);
        var numTxt = ComponentMgr.getTextField("x" + itemVo.num, TextFieldConst.SIZE_28);
        item.addChild(numTxt);
        numTxt.stroke = 2;
        numTxt.strokeColor = 0x353535;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, bg, [0, 7]);
        item.addTouchTap(function () {
            view.showDetails(itemVo);
        }, view);
        return item;
    };
    InviteFriendPopupViewTab2.prototype.bindCallBack = function (evt) {
        var view = this;
        view._errTxt.visible = false;
        if (evt.data.ret) {
            var rewards = evt.data.data.data.rewards;
            if (rewards) {
                if (view._boxId != '') {
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        isBoxBuy: false,
                        specialBoxId: view._boxId,
                        handler: view,
                        needCancel: true,
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    Api.ShopVoApi.setIsBox(false, "");
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        callback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        }
                    });
                }
            }
            else {
                var code = evt.data.data.data.code;
                if (code == 1) {
                    view._errTxt.visible = true;
                }
                App.CommonUtil.showTip(LangMger.getlocal("inviteFriendCodeErr" + code));
            }
        }
    };
    InviteFriendPopupViewTab2.prototype.showDetails = function (reward) {
        if (reward.type == 50) {
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                title: reward.name,
                needCancel: false,
                needClose: 1,
                boxId: reward.id,
            });
        }
        else if (reward.type == 1 || reward.type == 2) {
            ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                title: reward.name,
                handler: null,
                needCancel: false,
                needClose: 1,
                param: reward,
                costnum: LangMger.getlocal("sysconfirm"),
            });
        }
    };
    InviteFriendPopupViewTab2.prototype.dispose = function () {
        var view = this;
        view._errTxt = null;
        _super.prototype.dispose.call(this);
    };
    return InviteFriendPopupViewTab2;
}(CommonViewTab));
__reflect(InviteFriendPopupViewTab2.prototype, "InviteFriendPopupViewTab2");
//# sourceMappingURL=InviteFriendPopupViewTab2.js.map