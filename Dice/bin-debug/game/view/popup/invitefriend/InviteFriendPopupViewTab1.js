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
 * 邀请好友tab1
 * author qianjun
 */
var InviteFriendPopupViewTab1 = (function (_super) {
    __extends(InviteFriendPopupViewTab1, _super);
    function InviteFriendPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this._idx = -1;
        _this._group = null;
        _this.initView();
        return _this;
    }
    InviteFriendPopupViewTab1.prototype.getNetConstEventArr = function () {
        return [
            NetConst.INVITEFRIEND_GETREWARD
        ];
    };
    InviteFriendPopupViewTab1.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.INVITEFRIEND_GETREWARD:
                view.rewardCallback(evt);
                break;
        }
    };
    Object.defineProperty(InviteFriendPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.InvitefriendCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviteFriendPopupViewTab1.prototype, "api", {
        get: function () {
            return Api.InviteFriendVoApi;
        },
        enumerable: true,
        configurable: true
    });
    InviteFriendPopupViewTab1.prototype.initView = function () {
        var view = this;
        var api = view.api;
        var cfg = view.cfg;
        view.initEventListener();
        view.width = 500;
        view.height = 531;
        var codebg = BaseBitmap.create("invitefriendcodebg");
        codebg.width = 500;
        codebg.height = 174;
        view.addChild(codebg);
        var descTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip1"), TextFieldConst.SIZE_22, 0xCFDEFF);
        descTxt.stroke = 2;
        descTxt.strokeColor = 0x0C2C77;
        descTxt.lineSpacing = 13;
        descTxt.width = 270;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, codebg, [185 + (codebg.width - 185 - descTxt.width) / 2, 22]);
        view.addChild(descTxt);
        var inviteTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip2"), TextFieldConst.SIZE_22, 0xFFFFFF);
        inviteTxt.stroke = 2;
        inviteTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inviteTxt, codebg, [206, 119]);
        view.addChild(inviteTxt);
        var kuang = BaseBitmap.create("invitefriendcodekuang");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, kuang, inviteTxt, [inviteTxt.width + 12, 0]);
        view.addChild(kuang);
        var code = api.getMyCode();
        var codeTxt = ComponentMgr.getTextField(code, TextFieldConst.SIZE_30, 0x65EB95);
        codeTxt.stroke = 2;
        codeTxt.strokeColor = 0x007f2d;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, codeTxt, kuang, [0, 3]);
        view.addChild(codeTxt);
        var scoreBg = BaseBitmap.create("invitefriendscorebg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreBg, codebg, [0, codebg.height + 13]);
        view.addChild(scoreBg);
        var myscore = api.getMyScore();
        var scoreTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip3", ["" + myscore]), TextFieldConst.SIZE_22, 0xFFFFFF);
        scoreTxt.stroke = 2;
        scoreTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreBg);
        view.addChild(scoreTxt);
        //进度奖励
        var con = new BaseDisplayObjectContainer();
        view._group = con;
        var dx = 96;
        var maxNum = view.cfg.getRewardMaxNum();
        con.width = dx * maxNum + 45;
        con.height = 140;
        var alphabg = BaseBitmap.create("public_alphabg");
        con.addChild(alphabg);
        alphabg.width = con.width;
        alphabg.height = con.height;
        var pro = ComponentMgr.getProgressBar("userinfo_view_progress", "userinfo_view_bar", dx * maxNum);
        con.addChild(pro);
        var curid = api.getCurJinduId();
        var cur = 0;
        if (curid == 0) {
            cur = 0;
        }
        else if (curid == cfg.getRewardMaxNum()) {
            cur = con.width;
        }
        else {
            var curcfg = cfg.getInviteRewardItemById(curid);
            var nextcfg = cfg.getInviteRewardItemById(curid + 1);
            cur = curid * 100 + (api.getMyScore() - curcfg.needPoint) / ((nextcfg.needPoint - curcfg.needPoint) / 100);
        }
        var per = cur / con.width;
        pro.setPercentage(per);
        pro.setPosition(0, 77);
        for (var index = 1; index <= maxNum; index++) {
            var slp = BaseBitmap.create("userinfo_view_top_split");
            con.addChild(slp);
            slp.setPosition(index * dx, pro.y);
            var cfg_1 = view.cfg.getInviteRewardItemById(index);
            var item = this.createTopItem(index);
            con.addChild(item);
            item.setPosition(dx * (index), item.anchorOffsetY);
            // item.addTouchTap(this.boxOnclick, this, [index]);
            var numtxt = ComponentMgr.getTextField("" + cfg_1.needPoint, TextFieldConst.SIZE_22, ColorEnums.white);
            con.addChild(numtxt);
            numtxt.x = index * dx - numtxt.width / 2;
            numtxt.y = pro.y + pro.height + 5;
        }
        var scrollview = ComponentMgr.getScrollView(con, new egret.Rectangle(0, 0, 460, 140));
        view.addChild(scrollview);
        scrollview.bounces = false;
        scrollview.horizontalScrollPolicy = 'on';
        scrollview.verticalScrollPolicy = 'off';
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, scoreBg, [0, scoreBg.height + 16]);
        scrollview.setScrollLeft((curid - 1) * 96, 500);
        var copyBtn = ComponentMgr.getButton("invitefriendcopybtn", LangMger.getlocal("invitefriendTip4"), function () {
            //拷贝
            if (PlatMgr.checkIsUseSDK()) {
                RSDK.copyToClipboard(code);
            }
            else {
                var input = document.createElement("input");
                input.value = code;
                input.readOnly = true;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                    document.execCommand('Copy');
                document.body.removeChild(input);
                App.CommonUtil.showTip(LangMger.getlocal("invitefriendTip9"));
            }
        }, view);
        view.addChild(copyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, copyBtn, codebg, [45, codebg.height + 248]);
        var shareBtn = ComponentMgr.getButton("invitefriendsharebtn", LangMger.getlocal("invitefriendTip5"), function () {
            //调起分享
            App.ShareGuideUtil.shareBtnClickHandler();
        }, view);
        view.addChild(shareBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, shareBtn, codebg, [45, codebg.height + 248]);
    };
    InviteFriendPopupViewTab1.prototype.createTopItem = function (index) {
        var view = this;
        var item = new BaseDisplayObjectContainer();
        item.width = 68;
        item.height = 70;
        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        item.name = "item" + index;
        var bg = BaseBitmap.create("invitefriendrewardbg");
        bg.setScale(0.55);
        item.addChild(bg);
        bg.name = "bg";
        var itemVo = GameData.formatRewardItem(view.cfg.getInviteRewardItemById(index).getReward)[0];
        var iconstr = itemVo.icon;
        var icon = BaseLoadBitmap.create(iconstr, null, { callback: function () {
                icon.setScale(itemVo.type == 50 ? 0.18 : 0.38);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, itemVo.type == 50 ? 0 : 7]);
            }, callbackThisObj: view });
        item.addChild(icon);
        icon.name = "icon";
        var numTxt = ComponentMgr.getTextField("x" + itemVo.num, TextFieldConst.SIZE_16);
        item.addChild(numTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, bg, [0, 3]);
        if (view.api.isGetReward(index)) {
            var flag = BaseBitmap.create("royalgouhao");
            item.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bg);
        }
        else {
            if (view.api.canGetInviteReward(index)) {
                var lingpai = ComponentMgr.getCustomMovieClip(itemVo.type == 100 ? "firstrec_effect1_" : "firstrec_effect2_", null, 120);
                lingpai.blendMode = egret.BlendMode.ADD;
                lingpai.playWithTime(0);
                item.addChild(lingpai);
                lingpai.anchorOffsetX = 190 / 2;
                lingpai.anchorOffsetY = 180 / 2;
                lingpai.setScale(0.7);
                lingpai.x = 33;
                lingpai.y = 33;
                lingpai.name = "lingpai";
                item.addTouchTap(function () {
                    view._idx = index;
                    NetManager.request(NetConst.INVITEFRIEND_GETREWARD, {
                        rkey: index + ""
                    });
                }, view);
            }
        }
        item.addTouchTap(function () {
            view.showDetails(itemVo);
        }, view);
        return item;
    };
    InviteFriendPopupViewTab1.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rewards = evt.data.data.data.rewards;
            if (rewards) {
                var itemVo = GameData.formatRewardItem(view.cfg.getInviteRewardItemById(view._idx).getReward)[0];
                if (itemVo.type == 50) {
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        isBoxBuy: false,
                        specialBoxId: itemVo.id,
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
                var item = view._group.getChildByName("item" + view._idx);
                if (item) {
                    var bg = item.getChildByName("bg");
                    if (bg) {
                        var flag = BaseBitmap.create("royalgouhao");
                        item.addChild(flag);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bg);
                    }
                    var icon = item.getChildByName("icon");
                    if (icon) {
                        App.DisplayUtil.changeToGray(icon);
                    }
                    var lingpai = item.getChildByName("lingpai");
                    if (lingpai) {
                        lingpai.dispose();
                        lingpai = null;
                    }
                }
                view._idx = -1;
            }
        }
    };
    InviteFriendPopupViewTab1.prototype.showDetails = function (reward) {
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
    InviteFriendPopupViewTab1.prototype.dispose = function () {
        var view = this;
        view._idx = -1;
        view._group = null;
        _super.prototype.dispose.call(this);
    };
    return InviteFriendPopupViewTab1;
}(CommonViewTab));
__reflect(InviteFriendPopupViewTab1.prototype, "InviteFriendPopupViewTab1");
//# sourceMappingURL=InviteFriendPopupViewTab1.js.map