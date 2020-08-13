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
 * 皇陵海层数宝箱item
 * author qianjun
 */
var AcLocTombSeaBoxItem = (function (_super) {
    __extends(AcLocTombSeaBoxItem, _super);
    function AcLocTombSeaBoxItem() {
        var _this = _super.call(this) || this;
        _this._icon = null;
        _this._data = null;
        _this._alpha = null;
        _this._done = null;
        return _this;
    }
    Object.defineProperty(AcLocTombSeaBoxItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombSeaBoxItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombSeaBoxItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombSeaBoxItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_LOCTOMB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombSeaBoxItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombSeaBoxItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        /*
            floor//当前层数,
            id//对应编号,
        */
        var view = this;
        view._code = itemparam;
        view.width = 103;
        view.height = 80;
        view._data = data;
        var iconStr = "teamiconstatus1-" + view.code;
        var icon = BaseLoadBitmap.create(iconStr);
        icon.width = 77;
        icon.height = 77;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, view, [10, 2], true);
        view.addChild(icon);
        icon.addTouchTap(function () {
            var boxdata = view.vo.getBoxDataById(data.id);
            if (view.vo.moviePlay || !boxdata) {
                return;
            }
            if (!_this.vo.getAttendQUality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("loctombattend2-" + _this.code, [Api.playerVoApi.getPlayerOfficeByLevel(_this.cfg.lvNeed)]));
                return;
            }
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (!_this.vo.isInActTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (!view.vo.isInFightTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
                return;
            }
            var cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
            var status = view.vo.getBoxStatusById(data.id);
            var param = view.vo.getParamMap(data.id);
            if (status == 1) {
                var finished = view.vo.getBoxRewardById(data.id);
                if (finished) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("loctombattacktip3-" + view.code));
                    return;
                }
                var searchBuyNum = view.vo.getTanSuoNum().num;
                if (!searchBuyNum) {
                    var searchBuyNum_1 = view.vo.getBuySearchNum();
                    var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum_1, 9)];
                    var message = LanguageManager.getlocal("loctombbuysearchtip-" + view.code, [String(needNum)]);
                    var mesObj = {
                        confirmCallback: function () {
                            var searchBuyNum = view.vo.getBuySearchNum();
                            var needNum = view.cfg.buyNumCost[Math.min(searchBuyNum, 9)];
                            if (Api.playerVoApi.getPlayerGem() >= needNum) {
                                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBUYSEARCH, {
                                    activeId: view.vo.aidAndCode,
                                });
                            }
                            else {
                                App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                            }
                        },
                        handler: _this,
                        icon: "itemicon1",
                        iconBg: "itembg_1",
                        num: Api.playerVoApi.getPlayerGem(),
                        useNum: needNum,
                        msg: message,
                        id: 1,
                    };
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
                    return;
                }
                //发消息
                /***
                 ***
                */
                view.vo.setClickIdx('1', data.id);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBDIG, {
                    activeId: view.vo.aidAndCode,
                    index: param.index,
                    x: param.x,
                    y: param.y
                });
            }
            else if (status == 2) {
                if (cfg.type == 2) {
                    var finished = view.vo.getBoxRewardById(data.id);
                    if (finished) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("loctombfloorboxtip2-" + view.code));
                    }
                    else {
                        SoundManager.playEffect(SoundConst.EFFECT_TOMB_REWARD);
                        //宝箱飞出特效
                        view._icon.alpha = 0;
                        var icon_1 = BaseBitmap.create(cfg.getnpcPic(view.code));
                        icon_1.anchorOffsetX = icon_1.width / 2;
                        icon_1.anchorOffsetY = icon_1.height / 2;
                        icon_1.setScale(0.345);
                        icon_1.x = 50;
                        icon_1.y = 40;
                        view.addChild(icon_1);
                        var point_1 = icon_1.localToGlobal(icon_1.x, icon_1.y);
                        var circle_1 = BaseBitmap.create("tombboxcircle" + cfg.id + "-" + view.code);
                        circle_1.anchorOffsetX = circle_1.width / 2;
                        circle_1.anchorOffsetY = circle_1.height / 2;
                        circle_1.setScale(0.69);
                        circle_1.x = 50;
                        circle_1.y = 40;
                        circle_1.alpha = 0;
                        view.addChild(circle_1);
                        view.vo.moviePlay = true;
                        //光晕动画
                        egret.Tween.get(icon_1).to({ scaleX: 0.4, scaleY: 0.4 }, 130).to({ scaleX: 0.345, scaleY: 0.345 }, 200).call(function () {
                            egret.Tween.removeTweens(icon_1);
                        }, view);
                        egret.Tween.get(circle_1).to({ alpha: 1 }, 250).to({ alpha: 0 }, 80).call(function () {
                            egret.Tween.removeTweens(circle_1);
                            view.removeChild(circle_1);
                            //宝箱飞行动画
                            ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEARCHRESULTVIEW, {
                                aid: view.aid,
                                code: view.code,
                                foeId: cfg.id,
                                bosskey: boxdata.bossId,
                                func: view.update,
                                obj: view,
                                point: point_1,
                                id: view._data.id
                            });
                        }, view);
                        view.removeChild(icon_1);
                        //egret.Tween.get(circle).to({scaleX : 0.8, scaleY : 0.8},130).to({scaleX : 0.69, scaleY : 0.69},200);
                    }
                }
                else if (cfg.type == 1) {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBBATTLEVIEW, {
                        aid: view.aid,
                        code: view.code,
                        foeId: cfg.id,
                        bosskey: boxdata.bossId,
                        id: view._data.id
                    });
                }
                else if (cfg.type == 3) {
                    var finished = view.vo.getBoxRewardById(data.id);
                    if (finished) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("loctombattacktip3-" + view.code));
                        return;
                    }
                    //物品奖励
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBATTACK, {
                        activeId: view.vo.aidAndCode,
                        index: param.index,
                        x: param.x,
                        y: param.y
                    });
                }
            }
            else if (status == 3) {
                var finished = view.vo.getBoxRewardById(data.id);
                if (finished) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("loctombattacktip3-" + view.code));
                    return;
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, view, [10, 2], true);
        view.addChild(icon);
        view._icon = icon;
        var alpha = BaseBitmap.create("tombboxalpha-" + view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alpha, view._icon);
        view.addChild(alpha);
        view._alpha = alpha;
        var done = BaseBitmap.create("tombboxdone-" + view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, done, view._icon, [-5, -5]);
        view.addChild(done);
        view._done = done;
        alpha.visible = done.visible = false;
        view.update();
    };
    AcLocTombSeaBoxItem.prototype.playBoxEff = function (data) {
        var view = this;
        view.vo.moviePlay = true;
        /** tombboxef1-  tombdoor1- doorlight-1 tombbubble1-
         * 首先播放1文件夹里的序列。帧间隔0.07s，最后一帧停留0.21s，
        然后播放2文件夹里的序列，帧间隔0.07s，播放2的同时
        门光出现，透明度变化100%-0%，用时0.28s。缩放比例是400%
        播放2文件序列的0.07s后，播放泡泡序列，帧间隔0.07s。位置在门框上。
        这里面，1和2的序列是正常模式，泡泡和门光是oneone模式
        */
        var tombboxef = ComponentManager.getCustomMovieClip("tombboxef" + view.code + "-", 5, 70);
        tombboxef.width = 125;
        tombboxef.height = 145;
        tombboxef.anchorOffsetX = tombboxef.width / 2;
        tombboxef.anchorOffsetY = tombboxef.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tombboxef, view, [-2, 0], true);
        view.addChild(tombboxef);
        tombboxef.playWithTime(1);
        tombboxef.setEndCallBack(function () {
            tombboxef.setStopFrame(4);
            egret.Tween.get(tombboxef).wait(700).call(function () {
                var boxdata = view.vo.getBoxDataById(view._data.id);
                var cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
                var icon = "";
                //出现结果 宝箱 怪物 空格 物品奖励
                var itemreward = boxdata.rewards !== '';
                if (itemreward) {
                    var rewardvo = GameData.formatRewardItem(boxdata.rewards)[0]; //
                    icon = rewardvo.icon;
                }
                else {
                    icon = cfg.getnpcIcon(view.code);
                }
                view._icon.setload(icon);
                var parent = view.parent.parent.parent;
                var tombdoor = ComponentManager.getCustomMovieClip("tombdoor" + view.code + "-", 7, 50);
                tombdoor.width = 218;
                tombdoor.height = 218;
                tombdoor.anchorOffsetX = tombdoor.width / 2;
                tombdoor.anchorOffsetY = tombdoor.height / 2;
                tombdoor.x = view.x + 60;
                tombdoor.y = 100;
                tombdoor.playWithTime(1);
                parent.addChild(tombdoor);
                parent.setChildIndex(tombdoor, 9999);
                tombdoor.setEndCallBack(function () {
                    parent.removeChild(tombdoor);
                }, view);
                var tombdoorlight = BaseBitmap.create("doorlight-" + view.code);
                tombdoorlight.anchorOffsetX = tombdoorlight.width / 2;
                tombdoorlight.anchorOffsetY = tombdoorlight.height / 2;
                tombdoorlight.x = view.x + 60;
                tombdoorlight.y = 107;
                parent.addChild(tombdoorlight);
                tombdoorlight.setScale(4);
                egret.Tween.get(tombdoorlight).to({ alpha: 0 }, 280).call(function () {
                    parent.removeChild(tombdoorlight);
                }, view);
                tombdoor.setFrameEvent(1, function () {
                    view.removeChild(tombboxef);
                    var tombbubble = ComponentManager.getCustomMovieClip("tombbubble" + view.code + "-", 18, 70);
                    tombbubble.width = 72;
                    tombbubble.height = 85;
                    tombbubble.anchorOffsetX = tombbubble.width / 2;
                    tombbubble.anchorOffsetY = tombbubble.height / 2;
                    tombbubble.blendMode = egret.BlendMode.ADD;
                    tombbubble.x = view.x + 60;
                    tombbubble.y = 45;
                    tombbubble.playWithTime(1);
                    parent.addChild(tombbubble);
                    tombbubble.setEndCallBack(function () {
                        //泡泡消失
                        parent.removeChild(tombbubble);
                        view.update();
                        view.vo.moviePlay = false;
                    }, view);
                }, view);
            }, view);
        }, view);
    };
    AcLocTombSeaBoxItem.prototype.update = function () {
        var view = this;
        var id = view._data.id;
        var data = view.vo.getBoxDataById(id);
        var iconStr = '';
        if (data) {
            var status_1 = view.vo.getBoxStatusById(id);
            var cfg = view.cfg.getBossNpcItemCfgById(data.foe);
            if (status_1 == 2) {
                if (cfg.type == 3) {
                    var reward = GameData.formatRewardItem(data.rewards)[0];
                    iconStr = reward.icon;
                }
                else {
                    iconStr = cfg.getnpcIcon(view.code);
                }
            }
            else {
                iconStr = "teamiconstatus" + status_1 + "-" + view._code;
            }
        }
        // else{
        //     iconStr = `teamiconstatus${3}-${view._code}`
        // }
        view._icon.alpha = 1;
        view._icon.setload(iconStr);
        //已完成
        var finished = view.vo.getBoxRewardById(id);
        if (finished) {
            App.DisplayUtil.changeToGray(view._icon);
            view._alpha.visible = view._done.visible = true;
        }
        else {
            view._alpha.visible = view._done.visible = false;
        }
    };
    AcLocTombSeaBoxItem.prototype.freshAfterDig = function () {
        var view = this;
        SoundManager.playEffect(SoundConst.EFFECT_TOMB_BOX);
        //打开宝箱特效
        view.playBoxEff(null);
    };
    AcLocTombSeaBoxItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._icon.removeTouchTap();
        view._icon = null;
        view._alpha = null;
        view._done = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombSeaBoxItem;
}(ScrollListItem));
__reflect(AcLocTombSeaBoxItem.prototype, "AcLocTombSeaBoxItem");
//# sourceMappingURL=AcLocTombSeaBoxItem.js.map