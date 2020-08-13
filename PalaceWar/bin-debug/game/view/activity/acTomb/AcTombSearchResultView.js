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
 * desc:东海皇陵宝箱飞行展示画面
*/
var AcTombSearchResultView = (function (_super) {
    __extends(AcTombSearchResultView, _super);
    function AcTombSearchResultView() {
        var _this = _super.call(this) || this;
        _this._midGroup = null;
        _this._keyText = null;
        _this._btn = null;
        return _this;
    }
    Object.defineProperty(AcTombSearchResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSearchResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSearchResultView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSearchResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombSearchResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombSearchResultView.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombSearchResultView.prototype.getResourceList = function () {
        var code = this.getUicode();
        return _super.prototype.getResourceList.call(this).concat([
            "guide_createuserbg", "story_npc_3", "skin_lvup_light", "servant_attributemap",
            "tombboss" + this.param.data.foeId + "-" + code, "aobainamebg",
            "tomboxhighlight-" + code, "tombboxscan" + code + "-", "tombboxcircle" + this.param.data.foeId + "-" + code,
        ]);
    };
    AcTombSearchResultView.prototype.isShowMask = function () {
        return false;
    };
    AcTombSearchResultView.prototype.initTitle = function () {
        return null;
    };
    AcTombSearchResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcTombSearchResultView.prototype.getBgName = function () {
        return null;
    };
    AcTombSearchResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcTombSearchResultView.prototype.initView = function () {
        var view = this;
        var code = view.getUicode();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK), view.attackCallback, view);
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = GameConfig.stageHeigth;
        maskBmp.touchEnabled = true;
        view.addChild(maskBmp);
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = GameConfig.stageWidth;
        view.addChild(infoGroup);
        view._midGroup = infoGroup;
        var res = '';
        var name = '';
        //Npc 宝箱
        res = resultInfo.getnpcPic(code);
        name = resultInfo.getnpcName(code);
        var scanEffect = ComponentManager.getCustomMovieClip("tombboxscan" + code + "-", 10, 70);
        scanEffect.width = 385;
        scanEffect.height = 390;
        scanEffect.anchorOffsetX = scanEffect.width / 2;
        scanEffect.anchorOffsetY = scanEffect.height / 2;
        scanEffect.setScale(0.2);
        scanEffect.alpha = 0;
        scanEffect.playWithTime(-1);
        view.addChild(scanEffect);
        var Img = BaseBitmap.create(res);
        Img.anchorOffsetX = Img.width / 2;
        Img.anchorOffsetY = Img.height / 2;
        view.addChild(Img);
        //NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
        var descbg = BaseBitmap.create('public_9_wordbg');
        descbg.width = GameConfig.stageWidth;
        descbg.height = 230;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, infoGroup, [0, 0], true);
        infoGroup.addChild(descbg);
        var midTxt = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossSearchTip" + resultInfo.type, [name]), 22);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midTxt, descbg, [0, 40]);
        infoGroup.addChild(midTxt);
        //按钮
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, 'acwipeBossSearchCancel', view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cancelBtn, descbg, [140, 45]);
        infoGroup.addChild(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, resultInfo.type == 1 ? 'sysConfirm' : 'acwipeBossSearchOpen', view.confirmClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, confirmBtn, descbg, [140, 45]);
        infoGroup.addChild(confirmBtn);
        view._btn = confirmBtn;
        // let moreBtn = ComponentManager.getButton('arena_more', '', view.moreClick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, moreBtn, descbg, [25,15]);
        // view.addChild(moreBtn);
        var keynum = view.vo.getTombBoxKeyNum(resultInfo.id);
        var keyTxt = ComponentManager.getTextField("(" + LanguageManager.getlocal("tombbossnameKey" + data.foeId + "-" + code) + keynum + "/1)", 22, 0xff3c3c);
        keyTxt.textColor = keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN : 0xff3c3c;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, keyTxt, midTxt, [0, midTxt.textHeight + 20]);
        infoGroup.addChild(keyTxt);
        view._keyText = keyTxt;
        infoGroup.anchorOffsetY = infoGroup.height / 2;
        infoGroup.x = 0;
        infoGroup.y = 640;
        var tmpX = 320;
        var tmpY = 430;
        var from = view.param.data.point;
        if (from) {
            maskBmp.alpha = 0;
            infoGroup.alpha = 0;
            infoGroup.scaleY = 0;
            Img.setScale(0.345);
            Img.setPosition(from.x + 20, from.y + 20);
            //宝箱飞行
            egret.Tween.get(Img).to({ scaleX: 1, scaleY: 1, x: tmpX, y: tmpY }, 500).call(function () {
                var light = BaseBitmap.create("tomboxhighlight-" + code);
                light.anchorOffsetX = light.width / 2;
                light.anchorOffsetY = light.height / 2;
                light.setScale(3);
                light.alpha = 0;
                view.addChild(light);
                light.x = 320;
                light.y = 420;
                //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, light, Img);
                scanEffect.x = 320;
                scanEffect.y = 420;
                //宝箱缩放动画：100%-140%用时0.03秒。100%-100%用时0.13秒。
                egret.Tween.get(Img).to({ scaleX: 1.4, scaleY: 1.4 }, 30).call(function () {
                    light.alpha = 1;
                    egret.Tween.get(light).to({ scaleX: 0, scaleY: 0 }, 130).call(function () {
                        egret.Tween.removeTweens(light);
                        view.removeChild(light);
                    }, view);
                    scanEffect.alpha = 1;
                    egret.Tween.get(scanEffect).to({ scaleX: 1.25, scaleY: 1.25 }, 30).call(function () {
                        egret.Tween.removeTweens(scanEffect);
                        view.vo.moviePlay = false;
                    }, view);
                }, view).to({ scaleX: 1, scaleY: 1 }, 130);
                egret.Tween.get(Img, { loop: true }).to({ y: tmpY - 10 }, 1000).to({ y: tmpY }, 1000);
                //宝箱光晕：（随宝箱一起缩放，但比例X2） ，透明度动画：0%-70%用时0.07秒。70%-0%用时0.5秒。
                var circle = BaseBitmap.create("tombboxcircle" + data.foeId + "-" + code);
                circle.anchorOffsetX = circle.width / 2;
                circle.anchorOffsetY = circle.height / 2;
                circle.setScale(2);
                circle.alpha = 0;
                view.addChild(circle);
                circle.x = 320;
                circle.y = 420;
                //光晕动画
                egret.Tween.get(circle).to({ scaleX: 2.8, scaleY: 2.8 }, 30).to({ scaleX: 2, scaleY: 2 }, 130);
                egret.Tween.get(circle).to({ alpha: 0.7 }, 70).to({ alpha: 0 }, 500).call(function () {
                    egret.Tween.removeTweens(circle);
                    view.removeChild(circle);
                }, view);
            }, view);
            egret.Tween.get(maskBmp).to({ alpha: 0.7 }, 500).call(function () {
                egret.Tween.removeTweens(maskBmp);
                egret.Tween.get(infoGroup).to({ alpha: 1, scaleY: 1 }, 270).call(function () {
                    egret.Tween.removeTweens(infoGroup);
                }, view);
            }, view);
        }
        else {
            scanEffect.alpha = 1;
            scanEffect.x = 320;
            scanEffect.y = 420;
            scanEffect.setScale(1.25);
            Img.setPosition(tmpX, tmpY);
            egret.Tween.get(Img, { loop: true }).to({ y: tmpY - 10 }, 1000).to({ y: tmpY }, 1000);
        }
    };
    AcTombSearchResultView.prototype.attackCallback = function (evt) {
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBGETREWARDVIEW, {
                    aid: view.param.data.aid,
                    code: view.param.data.code,
                    reward: evt.data.data.data.rewards
                });
            }
        }
        view.hide();
    };
    AcTombSearchResultView.prototype.confirmClick = function () {
        var view = this;
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        if (resultInfo.type == 1) {
            //前往战斗
            ViewController.getInstance().openView(ViewConst.COMMON.ACTOMBBATTLEVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code,
                foeId: view.param.data.foeId,
                bosskey: view.param.data.bosskey
            });
            view.hide();
        }
        else {
            //开启宝箱
            var curNum = view.vo.getTombBoxKeyNum(resultInfo.id);
            if (curNum) {
                var param = view.vo.getParamMap(data.id);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK, {
                    activeId: view.vo.aidAndCode,
                    index: param.index,
                    x: param.x,
                    y: param.y
                });
                // this.attackCallback({
                // 	data : {
                // 		data : {
                // 			ret : 0,
                // 			data :{
                // 				rewards : "6_1150_4|6_1710_1",
                // 			}
                // 		}
                // 	}
                // });
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
    AcTombSearchResultView.prototype.moreClick = function () {
        var _this = this;
        var view = this;
        var code = this.getUicode();
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        var keysInfo = view.vo.getArr('actMarket');
        //let icon = GameData.getItemIcon(rewardItemVo,true);
        var goods = keysInfo[resultInfo.id - 7].goods;
        var contentList = GameData.formatRewardItem(goods); //shopItemCfg.contentList;
        var rewardItemVo = contentList[0];
        //展示信息
        var needGem = keysInfo[resultInfo.id - 7].needGem;
        var message = LanguageManager.getlocal("shopBuyUseGem2", [needGem.toString(), rewardItemVo.name]);
        //玩家所持有的元宝数
        var playerGem = Api.playerVoApi.getPlayerGem();
        ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
            goods: goods,
            confirmCallback: function () {
                var vo = _this.vo;
                if (!vo) {
                    return;
                }
                if (!_this.vo.getAttendQUality()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("tombattend2-" + code, [Api.playerVoApi.getPlayerOfficeByLevel(_this.cfg.needLv)]));
                    return;
                }
                if (_this.vo.et < GameData.serverTime) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
                    return;
                }
                if (!_this.vo.isInActTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
                    return;
                }
                if (!view.vo.isInFightTime()) {
                    view.hide();
                    return;
                }
                if (Api.playerVoApi.getPlayerGem() < needGem) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                    return;
                }
                var param = view.vo.getParamMap(data.id);
                var curNum = keysInfo[resultInfo.id - 7].limit - view.vo.getShopBuyLimitnum(resultInfo.id - 6);
                if (curNum <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
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
    };
    AcTombSearchResultView.prototype.update = function () {
        var view = this;
        var data = view.param.data;
        var resultInfo = view.cfg.getBossNpcItemCfgById(data.foeId);
        if (resultInfo.type == 2) {
            var keynum = view.vo.getTombBoxKeyNum(resultInfo.id);
            var boxId = resultInfo.id - 7;
            view._keyText.text = "" + LanguageManager.getlocal("tombbossnameKey" + data.foeId + "-" + view.getUicode()) + keynum + "/1";
            view._keyText.textColor = keynum > 0 ? TextFieldConst.COLOR_WARN_GREEN : 0xff3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._keyText, view);
        }
    };
    AcTombSearchResultView.prototype.hide = function () {
        var data = this.param.data;
        if (data.func) {
            data.func.apply(data.obj);
        }
        _super.prototype.hide.call(this);
    };
    AcTombSearchResultView.prototype.dispose = function () {
        var view = this;
        view._keyText = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK), view.attackCallback, view);
        view._midGroup = null;
        view._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcTombSearchResultView;
}(CommonView));
__reflect(AcTombSearchResultView.prototype, "AcTombSearchResultView");
//# sourceMappingURL=AcTombSearchResultView.js.map