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
var GuideView = (function (_super) {
    __extends(GuideView, _super);
    function GuideView(data) {
        var _this = _super.call(this) || this;
        _this._curGuideId = 1;
        _this._curData = null;
        _this._msgTxt = null;
        _this._hand = null;
        _this._arrow = null;
        _this._tmpMask = null;
        _this._msgBg = null;
        _this._guideNpc = null;
        _this._curData = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(GuideView.prototype, "cfg", {
        get: function () {
            return GuideCfg.rookieCfg;
        },
        enumerable: true,
        configurable: true
    });
    GuideView.prototype.initView = function () {
        var view = this;
        view.name = ViewConst.GUIDEVIEW;
        view._curGuideId = view._curData.guidid;
        var shp = new BaseShape();
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawRect(0, 0, 1, 1);
        shp.graphics.endFill();
        LayerMgr.guideLayer.addChild(shp);
        view.bg0_rect = shp;
        view.addChild(shp);
        //shp.addEventListener(egret.TouchEvent.TOUCH_TAP, view.rect_click, view);
        shp.touchEnabled = true;
        if (App.DeviceUtil.isRuntime2()) {
            var shp1 = new egret.Shape();
            shp1.graphics.beginFill(0x000000, 0.8);
            shp1.graphics.drawRect(0, 0, GameConfig.stageWidth, 1);
            shp1.graphics.endFill();
            LayerMgr.guideLayer.addChild(shp1);
            view.bg1_rect = shp1;
            view.addChild(shp1);
            shp1.touchEnabled = true;
            var shp2 = new egret.Shape();
            shp2.graphics.beginFill(0x000000, 0.8);
            shp2.graphics.drawRect(0, 0, 1, 1);
            shp2.graphics.endFill();
            LayerMgr.guideLayer.addChild(shp2);
            view.bg2_rect = shp2;
            view.addChild(shp2);
            shp2.touchEnabled = true;
            var shp3 = new egret.Shape();
            shp3.graphics.beginFill(0x000000, 0.8);
            shp3.graphics.drawRect(0, 0, 1, 1);
            shp3.graphics.endFill();
            LayerMgr.guideLayer.addChild(shp3);
            view.bg3_rect = shp3;
            view.addChild(shp3);
            shp3.touchEnabled = true;
            var shp4 = new egret.Shape();
            shp4.graphics.beginFill(0x000000, 0.8);
            shp4.graphics.drawRect(0, 0, GameConfig.stageWidth, 1);
            shp4.graphics.endFill();
            LayerMgr.guideLayer.addChild(shp4);
            view.bg4_rect = shp4;
            view.addChild(shp4);
            shp4.touchEnabled = true;
        }
        view.showContent();
    };
    GuideView.prototype.showContent = function () {
        var view = this;
        var cfg = view._curData;
        if (cfg.addtouch) {
            view.addTouchTap(function () {
                var cfg = view._curData;
                view.removeTouchTap();
                if (cfg.nextId) {
                    Api.GameinfoVoApi.setCurGudingId(cfg.nextId);
                }
                if (cfg.showNext) {
                    view.freshView(GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()]);
                }
                else {
                    //一个阶段的引导结束了
                    if (cfg.period == 1) {
                        BattleStatus.scene.battleResume();
                    }
                    if (cfg.guidid == 17) {
                        Api.GameinfoVoApi.setCurGudingId(0);
                    }
                    view.dispose();
                }
            }, view);
        }
        if (cfg.showRect) {
            var pos_1 = null;
            //寻找界面元素坐标
            if (cfg.layer) {
                var tar = cfg.layer.split("|");
                if (tar[0] == "scene") {
                    if (tar[1]) {
                        var tab = tar[1].split("_")[0];
                        var index = tar[1].split("_")[1];
                        if (tab == "tab") {
                            var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                            if (scene) {
                                var tabview = scene.tabViewData[index - 1];
                                if (tabview) {
                                    var unit = tabview[cfg.key];
                                    var list = tabview[cfg.list];
                                    if (unit) {
                                        pos_1 = {
                                            x: unit.localToGlobal().x,
                                            y: unit.localToGlobal().y,
                                            height: unit.height,
                                            width: unit.width,
                                        };
                                    }
                                }
                            }
                            // if(cfg.scrollTop && list){
                            //     pos.y -= (list.scrollTop)
                            // }
                        }
                    }
                    else {
                        var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                        if (scene && scene[cfg.key]) {
                            var unit = scene[cfg.key];
                            pos_1 = {
                                x: unit.localToGlobal().x,
                                y: unit.localToGlobal().y,
                                height: unit.height,
                                width: unit.width,
                            };
                        }
                    }
                }
                else if (tar[0] == "popup" || tar[0] == "view") {
                    if (tar[1]) {
                        var tab = tar[1].split("_")[0];
                        var index = tar[1].split("_")[1];
                        if (tab == "tab") {
                            var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                            if (scene) {
                                var tabview = scene.tabViewData[index - 1];
                                if (tabview) {
                                    var unit = tabview[cfg.key];
                                    if (unit) {
                                        pos_1 = {
                                            x: unit.localToGlobal().x,
                                            y: unit.localToGlobal().y,
                                            height: unit.height,
                                            width: unit.width,
                                        };
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var popupview = LayerMgr.panelLayer.getChildByName(cfg.viewname);
                        if (popupview && popupview[cfg.key]) {
                            var unit = popupview[cfg.key];
                            pos_1 = {
                                x: unit.localToGlobal().x,
                                y: unit.localToGlobal().y,
                                height: unit.height,
                                width: unit.width,
                            };
                            // if(cfg.guidid == 10){
                            //     unit.dispose();
                            //     unit = null;
                            // }
                        }
                    }
                }
                else if (tar[0] == "ui") {
                    var scene = LayerMgr.uiLayer.getChildByName(cfg.viewname);
                    if (scene) {
                        var unit = scene[cfg.key];
                        if (unit) {
                            pos_1 = {
                                x: unit.localToGlobal().x,
                                y: unit.localToGlobal().y,
                                height: unit.height,
                                width: unit.width,
                            };
                        }
                    }
                }
                if (pos_1) {
                }
                else {
                    StatisticsHelper.reportOwnNameLog("curGuideId" + cfg.guidid + ",layer:" + cfg.layer + ",key:" + cfg.key, "guideviewerror");
                }
            }
            if (cfg.keyrect) {
                pos_1.width = cfg.keyrect.width;
                pos_1.height = cfg.keyrect.height;
            }
            if (cfg.ExtRect) {
                pos_1.x -= cfg.ExtRect.x;
                pos_1.y -= cfg.ExtRect.y;
                pos_1.width += cfg.ExtRect.width;
                pos_1.height += cfg.ExtRect.height;
            }
            if (cfg.showMask) {
                if (cfg.layer) {
                    var unit_1 = null;
                    var tar = cfg.layer.split("|");
                    if (tar[0] == "scene") {
                        if (tar[1]) {
                            var tab = tar[1].split("_")[0];
                            var index = tar[1].split("_")[1];
                            if (tab == "tab") {
                                var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                                unit_1 = scene[cfg.key];
                            }
                        }
                        else {
                            var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                            if (scene && scene[cfg.key]) {
                                unit_1 = scene[cfg.key];
                            }
                        }
                    }
                    else if (tar[0] == "popup" || tar[0] == "view") {
                        if (tar[1]) {
                            var tab = tar[1].split("_")[0];
                            var index = tar[1].split("_")[1];
                            if (tab == "tab") {
                                var scene = LayerMgr.bgLayer.getChildByName(cfg.viewname);
                                unit_1 = view[cfg.key];
                            }
                        }
                        else {
                            var popupview = LayerMgr.panelLayer.getChildByName(cfg.viewname);
                            if (popupview && popupview[cfg.key]) {
                                unit_1 = popupview[cfg.key];
                            }
                        }
                    }
                    if (cfg.guidid == 3 || cfg.guidid == 5 || cfg.guidid == 7) {
                        BattleStatus.scene.setOnlyCreateMons(false);
                    }
                    if (cfg.guidid == 8 || cfg.guidid == 9) {
                        unit_1.visible = false;
                    }
                    var mask_1 = BaseBitmap.create("public_9_viewmask");
                    mask_1.width = GameConfig.stageWidth;
                    mask_1.height = GameConfig.stageHeigth;
                    mask_1.y = 0;
                    unit_1.parent.addChild(mask_1);
                    unit_1.parent.setChildIndex(unit_1, 9999);
                    view._tmpMask = mask_1;
                    mask_1.touchEnabled = true;
                    if (cfg.guidid == 1 || cfg.guidid == 16 || cfg.guidid == 27) {
                        unit_1.parent.parent.setChildIndex(unit_1.parent, 9999);
                        mask_1.y = -unit_1.parent.y;
                        var mainui = MainUI.getInstance();
                        var x = mainui.x;
                        var y = mainui.y;
                        mainui.parent.removeChild(mainui);
                        unit_1.parent.parent.addChildAt(mainui, unit_1.parent.parent.getChildIndex(unit_1.parent));
                        mainui.setPosition(x, y);
                    }
                    if (cfg.guidid == 31) {
                        unit_1.parent.setChildIndex(unit_1, 9999);
                        mask_1.y = -unit_1.parent.y;
                        var mainui = MainUI.getInstance();
                        var x = mainui.x;
                        var y = mainui.y;
                        mainui.parent.removeChild(mainui);
                        unit_1.parent.addChildAt(mainui, unit_1.parent.getChildIndex(unit_1) - 1);
                        mainui.setPosition(x, y);
                    }
                    if (cfg.guidid == 8) {
                        unit_1.parent.setBirdIndex();
                        unit_1.parent.setChildIndex(mask_1, unit_1.parent.getChildIndex(unit_1));
                    }
                    //小鸟属性框
                    if (cfg.guidid == 10) {
                        unit_1.parent.setDetailIndex();
                        unit_1.parent.setChildIndex(mask_1, unit_1.parent.getChildIndex(unit_1));
                    }
                    //增幅说明
                    if (cfg.guidid == 12) {
                        unit_1.parent.setDiceIndex();
                        unit_1.parent.setChildIndex(mask_1, unit_1.parent.getChildIndex(unit_1));
                        var bg_1 = BaseBitmap.create("public_alphabg");
                        bg_1.width = GameConfig.stageWidth;
                        bg_1.height = GameConfig.stageHeigth;
                        this.addChild(bg_1);
                        bg_1.addTouchTap(function () {
                            App.CommonUtil.sendNewGuideId(12);
                            bg_1.dispose();
                            bg_1 = null;
                            BattleStatus.scene.resetDiceIndex();
                            // Api.GameinfoVoApi.setCurGudingId(cfg.nextId);
                            // view.freshView(GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()]);
                            // BattleStatus.scene.battleResume();
                            view.dispose();
                        }, view);
                    }
                    if (cfg.guidid == 27) {
                        // unit.touchChildren = false;
                        var bg = BaseBitmap.create("public_alphabg");
                        bg.width = GameConfig.stageWidth;
                        bg.height = GameConfig.stageHeigth;
                        this.addChild(bg);
                        bg.addTouchTap(function () {
                            App.CommonUtil.sendNewGuideId(27);
                            unit_1.touchEnabled = true;
                            var mainui = MainUI.getInstance();
                            var x = mainui.x;
                            var y = mainui.y;
                            mainui.parent.removeChild(mainui);
                            LayerMgr.uiLayer.addChild(mainui);
                            mainui.setPosition(x, y);
                            Api.GameinfoVoApi.setCurGudingId(9999);
                            App.MsgHelper.dispEvt(MsgConst.FINISH_GUIDE_BUBBLE);
                            view.dispose();
                        }, view);
                    }
                    if (cfg.guidid == 32 || cfg.guidid == 33 || cfg.guidid == 34) {
                        unit_1.visible = true;
                        var bg = BaseBitmap.create("public_alphabg");
                        bg.width = GameConfig.stageWidth;
                        bg.height = GameConfig.stageHeigth;
                        this.addChild(bg);
                        bg.addTouchTap(function () {
                            if (cfg.nextId) {
                                Api.GameinfoVoApi.setCurGudingId(cfg.nextId);
                            }
                            if (cfg.guidid > 32) {
                                BattleStatus.scene.battleResume();
                                view.dispose();
                            }
                            else {
                                view.freshView(GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()]);
                            }
                            unit_1.touchEnabled = true;
                            if (cfg.guidid != 34) {
                                unit_1.dispose();
                                unit_1 = null;
                            }
                        }, view);
                    }
                    if (cfg.needTouch) {
                        mask_1.addTouchTap(function () {
                            var cfg = view._curData;
                            mask_1.removeTouchTap();
                            mask_1.dispose();
                            mask_1 = null;
                            if (cfg.guidid == 8) {
                                App.CommonUtil.sendNewGuideId(8);
                                unit_1.parent.resetBirdIndex();
                            }
                            if (cfg.guidid == 11) {
                                App.CommonUtil.sendNewGuideId(11);
                                view.dispose();
                            }
                            if (cfg.guidid == 13) {
                                App.CommonUtil.sendNewGuideId(13);
                                BattleStatus.scene.battleResume();
                            }
                            if (cfg.guidid == 27) {
                                unit_1.touchEnabled = true;
                                var mainui = MainUI.getInstance();
                                var x = mainui.x;
                                var y = mainui.y;
                                mainui.parent.removeChild(mainui);
                                LayerMgr.uiLayer.addChild(mainui);
                                mainui.setPosition(x, y);
                                view.dispose();
                            }
                            if (cfg.nextId) {
                                Api.GameinfoVoApi.setCurGudingId(cfg.nextId);
                            }
                            if (cfg.showNext) {
                                view.freshView(GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()]);
                            }
                            else {
                                view.dispose();
                            }
                        }, view);
                    }
                    // unit.parent.addChildAt(mask, unit.parent.getChildIndex(unit));
                }
                if (pos_1) {
                }
                else {
                    StatisticsHelper.reportOwnNameLog("curGuideId" + cfg.guidid + ",layer:" + cfg.layer + ",key:" + cfg.key, "guideviewerror");
                }
            }
            else {
                if (cfg.onlyshowHand) {
                }
                else {
                    view.resetRect(pos_1);
                    if (cfg.needTouch) {
                        var shp_1 = new BaseShape();
                        shp_1.graphics.beginFill(0x000000, 0);
                        shp_1.graphics.drawRect(0, 0, pos_1.width, pos_1.height);
                        shp_1.graphics.endFill();
                        view.addChild(shp_1);
                        shp_1.name = "shp";
                        //shp.addEventListener(egret.TouchEvent.TOUCH_TAP, view.rect_click, view);
                        shp_1.touchEnabled = true;
                        shp_1.setPosition(pos_1.x + GameData.layerPosX, pos_1.y + GameData.layerPosY);
                        shp_1.addTouchTap(function () {
                            var cfg = view._curData;
                            shp_1.removeTouchTap();
                            shp_1.dispose();
                            shp_1 = null;
                            if (cfg.nextId) {
                                Api.GameinfoVoApi.setCurGudingId(cfg.nextId);
                            }
                            if (cfg.showNext) {
                                view.freshView(GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()]);
                            }
                            else {
                                if (Api.GameinfoVoApi.checlIsInGuideId(12)) {
                                    BattleStatus.scene.battleResume();
                                }
                                if (cfg.guidid == 17) {
                                    Api.GameinfoVoApi.setCurGudingId(0);
                                }
                                view.dispose();
                            }
                        }, view);
                    }
                }
            }
            //显示箭头
            if (cfg.showArrow) {
                if (view._arrow) {
                    view._arrow.dispose();
                    view._arrow = null;
                }
                var arrow = BaseBitmap.create("guide_arrow");
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                view.addChild(arrow);
                if (cfg.guidid == 34) {
                    arrow.anchorOffsetY = -1;
                }
                view._arrow = arrow;
                if (cfg.arrowpos) {
                    //默认是pos的中心点
                    arrow.setPosition(pos_1.x + pos_1.width / 2 + cfg.arrowpos.x, pos_1.y + pos_1.height / 2 + cfg.arrowpos.y);
                    var tmpY = arrow.y;
                    egret.Tween.get(arrow, { loop: true }).to({ y: tmpY - 10 }, 500).to({ y: tmpY }, 500);
                }
            }
            else {
                if (view._arrow) {
                    view._arrow.dispose();
                    view._arrow = null;
                }
            }
            //显示文本
            if (cfg.descStr) {
                if (!view._msgBg) {
                    view._msgBg = BaseBitmap.create("guidedescbg");
                    view.addChild(view._msgBg);
                }
                if (!view._msgTxt) {
                    view._msgTxt = ComponentMgr.getTextField(LangMger.getlocal(cfg.descStr), TextFieldConst.SIZE_36, 0x34425B);
                    view._msgTxt.lineSpacing = 10;
                    view._msgTxt.textAlign = cfg.guidid > 30 ? egret.HorizontalAlign.LEFT : egret.HorizontalAlign.CENTER;
                    view._msgTxt.stroke = 0;
                    view.addChild(view._msgTxt);
                }
                if (!view._guideNpc) {
                    view._guideNpc = BaseBitmap.create("guidenpc");
                    view.addChild(view._guideNpc);
                }
                view._msgTxt.text = LangMger.getlocal(cfg.descStr);
                if (cfg.descWidth) {
                    view._msgTxt.width = cfg.descWidth;
                }
                view._msgBg.width = view._msgTxt.width + 100;
                view._msgBg.height = view._msgTxt.height + 100;
                view._msgBg.anchorOffsetX = view._msgBg.width / 2;
                view._msgBg.anchorOffsetY = view._msgBg.height / 2;
                if (cfg.descpos) {
                    //默认是pos的中心点
                    var x = pos_1.x + pos_1.width / 2 + cfg.descpos.x;
                    if (x < view._msgBg.anchorOffsetX) {
                        x = view._msgBg.anchorOffsetX + 20;
                    }
                    if (x > (GameConfig.stageWidth - view._msgBg.anchorOffsetX)) {
                        x = GameConfig.stageWidth - view._msgBg.anchorOffsetX - 20;
                    }
                    var y = pos_1.y + pos_1.height / 2 + cfg.descpos.y;
                    if (y < view._msgBg.anchorOffsetY) {
                        y = view._msgBg.anchorOffsetY + 20;
                    }
                    if (y > (GameConfig.stageHeigth - view._msgBg.anchorOffsetY)) {
                        y = GameConfig.stageHeigth - view._msgBg.anchorOffsetY - 20;
                    }
                    view._msgBg.setPosition(x, y);
                }
                else {
                    view._msgBg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 20);
                    if (cfg.guidid == 12) {
                        view._msgBg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 80);
                    }
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._msgTxt, view._msgBg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._guideNpc, view._msgBg, [-95, -4]);
            }
            else {
                if (view._msgTxt) {
                    view._msgTxt.dispose();
                    view._msgTxt = null;
                }
                if (view._msgBg) {
                    view._msgBg.dispose();
                    view._msgBg = null;
                }
                if (view._guideNpc) {
                    view._guideNpc.dispose();
                    view._guideNpc = null;
                }
            }
            //显示小手
            if (cfg.showHand || cfg.onlyshowHand) {
                if (view._hand) {
                    view._hand.dispose();
                    view._hand = null;
                }
                //小手移动动画 默认从元素的右边滑动到左边 循环
                if (cfg.handmove) {
                    if (view._hand) {
                        view._hand.dispose();
                        view._hand = null;
                    }
                    var hand_1 = BaseBitmap.create("guide_hand");
                    hand_1.touchEnabled = false;
                    hand_1.removeTouchTap();
                    view.addChild(hand_1);
                    view._hand = hand_1;
                    if (cfg.guidid == 9) {
                        //默认是pos的中心点
                        var tmpx_1 = pos_1.x;
                        hand_1.setPosition(tmpx_1, pos_1.y + pos_1.height / 2 + 60);
                        egret.Tween.get(hand_1, { loop: true })
                            .to({ x: pos_1.x + pos_1.width }, 1000).call(function () {
                            hand_1.x = tmpx_1;
                        }, view);
                    }
                    else if (cfg.guidid == 12) {
                        //默认是pos的中心点
                        //upDice.setPosition(upinfoBg.x+29+i*(78+32),upinfoBg.y);
                        var idx_1 = 0;
                        var tmpx_2 = pos_1.x + 38 + idx_1 * (75 + 30);
                        hand_1.setPosition(tmpx_2, pos_1.y + pos_1.height / 2 - 10);
                        hand_1.alpha = 0;
                        egret.Tween.get(hand_1, { loop: true })
                            .to({ scaleX: 0.9, scaleY: 0.9, alpha: 1 }, 500)
                            .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 500).call(function () {
                            ++idx_1;
                            if (idx_1 > 4) {
                                idx_1 = 0;
                            }
                            tmpx_2 = pos_1.x + 38 + idx_1 * (75 + 30);
                            hand_1.x = tmpx_2;
                        }, view);
                    }
                }
                else {
                    var hand = BaseBitmap.create("guide_hand");
                    hand.touchEnabled = false;
                    // hand.anchorOffsetX = hand.width / 2;
                    // hand.anchorOffsetY = hand.height / 2;
                    view.addChild(hand);
                    view._hand = hand;
                    if (cfg.handpos) {
                        //默认是pos的中心点
                        hand.setPosition(pos_1.x + pos_1.width / 2 + cfg.handpos.x, pos_1.y + pos_1.height / 2 + cfg.handpos.y);
                        egret.Tween.get(hand, { loop: true })
                            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                            .to({ scaleX: 1, scaleY: 1 }, 500);
                    }
                }
            }
            else {
                if (view._hand) {
                    view._hand.dispose();
                    view._hand = null;
                }
            }
        }
        if (cfg.openview) {
            ViewController.getInstance().openView(cfg.viewname);
            view.dispose();
        }
    };
    GuideView.prototype.resetRect = function (pos) {
        var view = this;
        var screen_width = GameConfig.stageWidth;
        var screen_height = GameConfig.stageHeigth;
        var rect = this.bg0_rect;
        var rectalha = 0;
        if (!pos) {
            // rect.visible = true;
            // rect.touchEnabled = true;
        }
        else {
            // rect.visible = false;
            // rect.touchEnabled = false;
        }
        // if(view._curData.through){
        //     rect.touchEnabled = false;
        //     rect.visible = false;
        // }
        if (this.bg0_rect) {
            this.bg0_rect.graphics.clear();
        }
        if (pos) {
            for (var k in pos) {
                rect[k] = pos[k]; //屏蔽没有宽高导致引导无法点击  
            }
            if (App.DeviceUtil.isRuntime2()) {
                view.bg0_rect.visible = false;
                if (this.bg1_rect) {
                    this.bg1_rect.graphics.clear();
                }
                if (this.bg2_rect) {
                    this.bg2_rect.graphics.clear();
                }
                if (this.bg3_rect) {
                    this.bg3_rect.graphics.clear();
                }
                if (this.bg4_rect) {
                    this.bg4_rect.graphics.clear();
                }
                rect.graphics.beginFill(0x000000, rectalha);
                //rect.graphics.lineStyle(1, 0x000000);//alphaV, true, "normal", egret.CapsStyle.SQUARE, egret.JointStyle.MITER)
                rect.graphics.drawRect(0, 0, pos.width, pos.height);
                rect.graphics.endFill();
                this.bg1_rect.graphics.beginFill(0x000000, 0.8);
                this.bg1_rect.graphics.drawRect(0, 0, screen_width, rect.y < 0 ? 0 : rect.y);
                this.bg1_rect.graphics.endFill();
                this.bg2_rect.graphics.beginFill(0x000000, 0.8);
                this.bg2_rect.graphics.drawRect(0, 0, rect.x < 0 ? 0 : rect.x, rect.height);
                this.bg2_rect.graphics.endFill();
                this.bg3_rect.graphics.beginFill(0x000000, 0.8);
                this.bg3_rect.graphics.drawRect(0, 0, Math.max(0, screen_width - rect.x - rect.width), rect.height);
                this.bg3_rect.graphics.endFill();
                this.bg4_rect.graphics.beginFill(0x000000, 0.8);
                this.bg4_rect.graphics.drawRect(0, 0, screen_width, Math.max(0, screen_height - rect.y - rect.height));
                this.bg4_rect.graphics.endFill();
                rect.x = pos.x;
                rect.y = pos.y;
                this.bg2_rect.y = this.bg3_rect.y = rect.y; //左右
                this.bg3_rect.x = rect.x + rect.width;
                this.bg4_rect.y = rect.y + rect.height; //下
            }
            else {
                var alphaV = 0.8;
                rect.alpha = alphaV;
                var minX = Math.max(pos.x, 0);
                var minY = Math.max(pos.y, 0);
                var maxX = Math.min(pos.x + pos.width, screen_width);
                var maxY = Math.min(pos.y + pos.height, screen_height);
                rect.x = minX - 255 * 5 / 2;
                rect.y = minY - 255 * 5 / 2;
                rect.graphics.lineStyle(255, 0x000000, alphaV, true, "normal", egret.CapsStyle.SQUARE, egret.JointStyle.MITER);
                rect.graphics.drawRect(0, 0, 255 / 2 + 255 / 2 + pos.width / 5, 255 / 2 + 255 / 2 + pos.height / 5);
                var xx = rect.x;
                var yy = rect.y;
                rect.setScale(15);
                rect.x = rect.x - (rect.width * rect.scaleX - rect.width * 5) / 4;
                rect.y = rect.y - (rect.width * rect.scaleY - rect.width * 5) / 4;
                egret.Tween.get(rect, { loop: false }).to({ scaleX: 5, scaleY: 5, x: xx, y: yy }, 200);
            }
        }
        else {
            rectalha = 0.8;
            pos = { "x": 0, "y": 0, "width": screen_width, "height": screen_height };
            rect.graphics.beginFill(0x000000, rectalha);
            rect.graphics.drawRect(0, 0, pos.width, pos.height);
            rect.graphics.endFill();
        }
    };
    GuideView.prototype.freshView = function (data) {
        var view = this;
        view.removeTouchTap();
        if (view.bg0_rect) {
            view.bg0_rect.graphics.clear();
            view.bg0_rect.removeTouchTap();
        }
        if (view.bg1_rect) {
            view.bg1_rect.graphics.clear();
        }
        if (view.bg2_rect) {
            view.bg2_rect.graphics.clear();
        }
        if (view.bg3_rect) {
            view.bg3_rect.graphics.clear();
        }
        if (view.bg4_rect) {
            view.bg4_rect.graphics.clear();
        }
        if (data.guidid == 2 || data.guidid == 17) {
            var mainui = MainUI.getInstance();
            var x = mainui.x;
            var y = mainui.y;
            mainui.parent.removeChild(mainui);
            LayerMgr.uiLayer.addChild(mainui);
            mainui.setPosition(x, y);
        }
        var shp = view.getChildByName("shp");
        if (shp) {
            shp.dispose();
            shp = null;
        }
        if (view._tmpMask) {
            view._tmpMask.dispose();
            view._tmpMask = null;
        }
        view._curData = data;
        view.showContent();
        view.visible = true;
    };
    GuideView.prototype.dispose = function () {
        var view = this;
        // view.bg0_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
        //中央点击穿透区域
        // view.bg1_rect = null;//上
        // view.bg2_rect = null;//左
        // view.bg3_rect = null;//右
        // view.bg4_rect = null;//下
        view.removeTouchTap();
        if (view.bg0_rect) {
            view.bg0_rect.graphics.clear();
            view.bg0_rect.removeTouchTap();
            view.bg0_rect = null;
        }
        if (view.bg1_rect) {
            view.bg1_rect.graphics.clear();
            view.bg1_rect = null;
        }
        if (view.bg2_rect) {
            view.bg2_rect.graphics.clear();
            view.bg2_rect = null;
        }
        if (view.bg3_rect) {
            view.bg3_rect.graphics.clear();
            view.bg3_rect = null;
        }
        if (view.bg4_rect) {
            view.bg4_rect.graphics.clear();
            view.bg4_rect = null;
        }
        if (view._curData && (view._curData.guidid == 16 || view._curData.guidid == 31 || view._curData.guidid == 27)) {
            var mainui = MainUI.getInstance();
            var x = mainui.x;
            var y = mainui.y;
            mainui.parent.removeChild(mainui);
            LayerMgr.uiLayer.addChild(mainui);
            mainui.setPosition(x, y);
        }
        var shp = view.getChildByName("shp");
        if (shp) {
            shp.dispose();
            shp = null;
        }
        if (view._tmpMask) {
            view._tmpMask.dispose();
            view._tmpMask = null;
        }
        view._curGuideId = 1;
        view._curData = null;
        view._msgTxt = null;
        view._hand = null;
        view._arrow = null;
        view._tmpMask = null;
        view._msgBg = null;
        view._guideNpc = null;
        _super.prototype.dispose.call(this);
    };
    return GuideView;
}(BaseDisplayObjectContainer));
__reflect(GuideView.prototype, "GuideView");
//# sourceMappingURL=GuideView.js.map