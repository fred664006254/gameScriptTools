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
 * desc:围剿鳌拜探索结果界面
*/
var AcWipeBossSearchResultView = (function (_super) {
    __extends(AcWipeBossSearchResultView, _super);
    function AcWipeBossSearchResultView() {
        var _this = _super.call(this) || this;
        _this._midGroup = null;
        _this._keyText = null;
        _this._btn = null;
        return _this;
    }
    Object.defineProperty(AcWipeBossSearchResultView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossSearchResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossSearchResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossSearchResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "guide_createuserbg", "story_npc_3", "skin_lvup_light", "servant_attributemap",
            "wipeboss" + this.param.data.foeId,
            "acwipeboss_box1",
            "acwipeboss_box2",
            "acwipeboss_box3",
        ]);
    };
    AcWipeBossSearchResultView.prototype.isShowMask = function () {
        return true;
    };
    AcWipeBossSearchResultView.prototype.initTitle = function () {
        return null;
    };
    AcWipeBossSearchResultView.prototype.getBgName = function () {
        // return `guide_createuserbg`;
        return "acwipeboss_bg2";
    };
    AcWipeBossSearchResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcWipeBossSearchResultView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcWipeBossSearchResultView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = 0; //(GameConfig.stageHeigth - 1136);
        }
    };
    AcWipeBossSearchResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcWipeBossSearchResultView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK), view.attackCallback, view);
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = GameConfig.stageHeigth;
        maskBmp.touchEnabled = false;
        view.addChild(maskBmp);
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = GameConfig.stageWidth;
        view.addChild(infoGroup);
        view._midGroup = infoGroup;
        var res = '';
        var name = '';
        var boxId = resultInfo.id - 7;
        //Npc 宝箱
        if (resultInfo.type == 1) {
            res = resultInfo.npcPic;
            name = resultInfo.npcName;
        }
        else {
            res = "acwipeboss_box" + boxId;
            name = LanguageManager.getlocal("acwipeBossKillBox" + boxId);
        }
        var Img = BaseBitmap.create(res);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Img, infoGroup, [0, 0], true);
        infoGroup.addChild(Img);
        //NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
        var descbg = BaseBitmap.create('public_9_wordbg');
        descbg.width = GameConfig.stageWidth;
        descbg.height = 222;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, Img, [0, Img.height + (resultInfo.type == 1 ? 0 : 60)]);
        infoGroup.addChild(descbg);
        var midTxt = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossSearchTip" + resultInfo.type, [name]), 22);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midTxt, descbg, [0, 40]);
        infoGroup.addChild(midTxt);
        //按钮
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, 'acwipeBossSearchCancel', view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cancelBtn, descbg, [100, 55]);
        infoGroup.addChild(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, resultInfo.type == 1 ? 'sysConfirm' : 'acwipeBossSearchOpen', view.confirmClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, confirmBtn, descbg, [100, 55]);
        infoGroup.addChild(confirmBtn);
        view._btn = confirmBtn;
        // let moreBtn = ComponentManager.getButton('arena_more', '', view.moreClick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, moreBtn, descbg, [25,15]);
        // view.addChild(moreBtn);
        if (resultInfo.type == 2) {
            var skin_lvup_light = BaseBitmap.create("skin_lvup_light");
            skin_lvup_light.scaleX = 1.2;
            skin_lvup_light.scaleY = 4;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skin_lvup_light, Img, [-10, 0]);
            infoGroup.addChild(skin_lvup_light);
            infoGroup.swapChildren(Img, skin_lvup_light);
            var keynum = view.vo.getWipeBossBoxKeyNum(resultInfo.id);
            var keyTxt = ComponentManager.getTextField("" + LanguageManager.getlocal("acwipeBossKillKey" + boxId) + keynum + "/1", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            keyTxt.textColor = keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : 0xff3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, keyTxt, confirmBtn, [0, confirmBtn.height + 15]);
            infoGroup.addChild(keyTxt);
            view._keyText = keyTxt;
        }
        else {
            // if(PlatformManager.checkIsTextHorizontal())
            // {
            var nameBg = BaseBitmap.create("servant_attributemap");
            nameBg.setPosition(descbg.x + descbg.width / 2 - nameBg.width / 2, descbg.y - nameBg.height);
            infoGroup.addChild(nameBg);
            var nameTxt = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            nameTxt.setPosition(nameBg.x + nameBg.width / 2 - nameTxt.width / 2, nameBg.y + nameBg.height / 2 - nameTxt.height / 2);
            infoGroup.addChild(nameTxt);
            // }
            // else
            // {
            // 	let namebg = BaseBitmap.create("aobainamebg");
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, namebg, infoGroup, [55,0], true);
            // 	infoGroup.addChild(namebg);
            // 	let nameTxt = ComponentManager.getTextField(name, 22);
            // 	nameTxt.width = 22;
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            // 	infoGroup.addChild(nameTxt);
            // }	
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, infoGroup, view);
    };
    AcWipeBossSearchResultView.prototype.attackCallback = function (evt) {
        var view = this;
        var data = view.param.data;
        if (evt.data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("limitedCollectErrorTips"));
            return;
        }
        if (evt.data.data.data.hasKill) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip4"));
        }
        else {
            var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
            if (resultInfo.type == 2) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSGETREWARDVIEW, {
                    aid: view.param.data.aid,
                    code: view.param.data.code,
                    reward: evt.data.data.data.rewards
                });
            }
        }
        view.hide();
    };
    AcWipeBossSearchResultView.prototype.confirmClick = function () {
        var view = this;
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        if (resultInfo.type == 1) {
            //前往战斗
            ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSBATTLEVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
                foeId: view.param.data.foeId,
                bosskey: view.param.data.bosskey
            });
            view.hide();
        }
        else {
            //开启宝箱
            var curNum = view.vo.getWipeBossBoxKeyNum(resultInfo.id);
            if (curNum) {
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK, {
                    activeId: view.vo.aidAndCode,
                    bosstype: view.param.data.foeId,
                    bosskey: view.param.data.bosskey
                });
            }
            else {
                view.moreClick();
                // ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW,{
                // 	aid : view.param.data.aid,
                // 	code : view.param.data.code,
                // });
                // App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip3"));
            }
        }
    };
    AcWipeBossSearchResultView.prototype.moreClick = function () {
        var _this = this;
        var view = this;
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        var keysInfo = view.vo.getArr('actMarket');
        //let icon = GameData.getItemIcon(rewardItemVo,true);
        var goods = keysInfo[resultInfo.id - 7].goods;
        var contentList = GameData.formatRewardItem(goods); //shopItemCfg.contentList;
        var rewardItemVo = contentList[0];
        //展示信息
        var needGem = keysInfo[resultInfo.id - 7].needGem;
        var message = LanguageManager.getlocal("shopBuyUseGem", [needGem.toString(), rewardItemVo.name]);
        //玩家所持有的元宝数
        var playerGem = Api.playerVoApi.getPlayerGem();
        ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
            goods: goods,
            confirmCallback: function () {
                var vo = _this.vo;
                if (!vo) {
                    return;
                }
                if (Api.playerVoApi.getPlayerLevel() < _this.cfg.needLv) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossOpenTip", [Api.playerVoApi.getPlayerOfficeByLevel(_this.cfg.needLv)]));
                    return;
                }
                if (_this.vo.et < GameData.serverTime) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
                    return;
                }
                if (!_this.vo.isInTansuoTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
                    return;
                }
                if (Api.playerVoApi.getPlayerGem() < needGem) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY, {
                    activeId: view.vo.aidAndCode,
                    num: 1,
                    goods: resultInfo.id - 6,
                    stype: 'a'
                });
            },
            handler: this,
            num: playerGem,
            msg: message,
            id: 1 //消耗物品id  1->元宝
        });
        // ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSKILLINFOIEW,{
        // 	aid : view.param.data.aid,
        // 	code : view.param.data.code
        // });
    };
    AcWipeBossSearchResultView.prototype.update = function () {
        var view = this;
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        if (resultInfo.type == 2) {
            var keynum = view.vo.getWipeBossBoxKeyNum(resultInfo.id);
            var boxId = resultInfo.id - 7;
            view._keyText.text = "" + LanguageManager.getlocal("acwipeBossKillKey" + boxId) + keynum + "/1";
            view._keyText.textColor = keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : 0xff3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._keyText, view._btn, [0, view._btn.height + 15]);
        }
    };
    AcWipeBossSearchResultView.prototype.dispose = function () {
        var view = this;
        view._keyText = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK), view.attackCallback, view);
        view._midGroup = null;
        view._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossSearchResultView;
}(CommonView));
__reflect(AcWipeBossSearchResultView.prototype, "AcWipeBossSearchResultView");
