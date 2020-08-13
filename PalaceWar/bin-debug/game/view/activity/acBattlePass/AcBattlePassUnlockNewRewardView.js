var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * author:qianjun
 * desc:奖励弹窗
*/
var AcBattlePassUnlockNewRewardView = /** @class */ (function (_super) {
    __extends(AcBattlePassUnlockNewRewardView, _super);
    function AcBattlePassUnlockNewRewardView() {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._bottomGroup = null;
        _this._curLevel = 1;
        _this._stop = false;
        return _this;
    }
    Object.defineProperty(AcBattlePassUnlockNewRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassUnlockNewRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassUnlockNewRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassUnlockNewRewardView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            case 7:
                code = '4';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcBattlePassUnlockNewRewardView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassUnlockNewRewardView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassUnlockNewRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battlepassglow", "shopview_line",
            "acseventopbg", "btn_small_orange", "battlepassunlockbottom", "battlepassunlockrect", "battlepassunlockbg", "allianceweekendview_goldline", "luckydrawbg-1",
        ]);
    };
    AcBattlePassUnlockNewRewardView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcBattlePassUnlockNewRewardView.prototype.getRuleInfo = function () {
        var view = this;
        var code = view.code;
        return App.CommonUtil.getCnByCode("acBattlePassRuleInfo", code);
    };
    AcBattlePassUnlockNewRewardView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcBattlePassUnlockNewRewardView.prototype.getExtraRuleInfo = function () {
        if (this.code != "1") {
            var params = [];
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                params.push(LanguageManager.getlocal("acBattlePassRuleInfo-" + this.code + "_part1"));
            }
            else {
                params.push("");
            }
            return LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRuleInfo", this.code), params);
        }
        return null;
    };
    // protected getTitleStr():string{
    // 	return `acBattlePassBuyUnlockTitle-${this.getUiCode()}`;
    // }
    AcBattlePassUnlockNewRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcBattlePassUnlockNewRewardView.prototype.getTitleBgName = function () {
        var view = this;
        return App.CommonUtil.getResByCode("battlepassunlocktitle", this.code);
    };
    AcBattlePassUnlockNewRewardView.prototype.getBgName = function () {
        return "luckydrawbg-1";
    };
    AcBattlePassUnlockNewRewardView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._curLevel = view.vo.getMyBattleLevel();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = 610;
        var str = '';
        var topGroup = new BaseDisplayObjectContainer();
        topGroup.width = GameConfig.stageWidth;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topGroup, view, [0, 60]);
        view.addChildAt(topGroup, view.getChildIndex(view.titleBg) - 1);
        var topBg = BaseBitmap.create("acseventopbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, topGroup, [0, 0], true);
        topGroup.addChild(topBg);
        var topTip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip9", code)), 18);
        topTip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topTip1Txt, topBg, [0, 50]);
        topGroup.addChild(topTip1Txt);
        var tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip10", code), ["" + view.cfg.maxlevel]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1Txt, topTip1Txt, [0, topTip1Txt.textHeight + 15]);
        topGroup.addChild(tip1Txt);
        var bottomGroup = new BaseDisplayObjectContainer();
        var bottomBg = BaseBitmap.create("battlepassunlockbottom");
        bottomGroup.addChild(bottomBg);
        view._bottomGroup = bottomGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomGroup, view);
        for (var i = 0; i < 2; ++i) {
            var light = BaseBitmap.create("battlepassglow");
            bottomGroup.addChild(light);
            App.DisplayUtil.setLayoutPosition(i == 0 ? LayoutConst.lefttop : LayoutConst.righttop, light, bottomBg, [-25, -40]);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
        var listbg = BaseBitmap.create("battlepassunlockbg");
        listbg.height = bottomGroup.y - 158;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0, 218]);
        view.addChild(listbg);
        // let rankList = view.cfg.getBattleInfoArr();
        var tmpX = 20;
        var scroStartY = 3;
        var myBattlelevel = view.vo.getMyBattleLevel();
        var rankList = view.cfg.getBattleInfoArr();
        var rItem = rankList[0];
        var info = view.cfg.getBattleInfo(rItem.unlockBP);
        var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(info.unlockRecharge); //
        var level = rItem.unlockBP == "advanced" ? 3 : 2;
        //奖励物品
        var startY = 10;
        var arr = [["1", 0], ["2", 0]];
        var reward = view.cfg.show1.reward;
        for (var i in reward) {
            var unit = reward[i];
            // let rewardvo = unit[0];
            // if(rewardvo.type == 11 && !Api.switchVoApi.checkIsTitleState(rewardvo.id.toString())){
            //     continue;
            // }
            arr.push(unit);
        }
        var _loop_1 = function (i) {
            var group = new BaseDisplayObjectContainer();
            group.height = 105;
            group.width = 610;
            group.y = startY;
            view._nodeContainer.addChild(group);
            var unit = arr[i];
            var icon = null;
            var str_1 = "";
            //道具
            var tmpx = 20;
            var rewardvo = GameData.formatRewardItem(String(unit[0]))[0];
            if (unit[0] == "1") {
                //元宝
                icon = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassunlockicon1", code));
                str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip1", code), [rechargeCfg.gemCost.toString()]);
            }
            else if (unit[0] == "2") {
                var cost = 0;
                for (var i_1 in view.cfg.show) {
                    var unit_1 = view.cfg.show[i_1];
                    if (unit_1.unlockBP == "lv" && unit_1.lvAdd == info.lvAdd) {
                        cost = unit_1.cost;
                        break;
                    }
                }
                icon = BaseLoadBitmap.create(App.CommonUtil.getResByCode("battlepassicon", code));
                icon.width = 100;
                icon.height = 100;
                str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip2", code), [info.lvAdd, cost]);
            }
            else if (rewardvo.type == 8) {
                group.addTouchTap(function () {
                    var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                    if (index >= 1) {
                        ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                            aid: _this.aid,
                            code: _this.code
                        });
                    }
                }, view);
                icon = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassunlockicon3", code));
                var servantcfg = Config.ServantCfg.getServantItemById(rewardvo.id);
                var init = Api.servantVoApi.getServantAptitude(rewardvo.id.toString());
                var speciality = servantcfg.speciality;
                var specialityStr = "";
                for (var i_2 = 0; i_2 < speciality.length; i_2++) {
                    specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i_2]) + "，";
                }
                specialityStr = specialityStr.substr(0, specialityStr.length - 1);
                var servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr]);
                str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip3", code), [servantcfg.name, init.toString(), specialityStr]);
            }
            else if (rewardvo.type == 10) {
                group.addTouchTap(function () {
                    var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                    if (index >= 1) {
                        ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                            aid: _this.aid,
                            code: _this.code
                        });
                    }
                }, view);
                icon = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassunlockicon2", code));
                var wifecfg = Config.WifeCfg.getWifeCfgById(rewardvo.id);
                str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip4", code), [wifecfg.name, wifecfg.glamour.toString()]);
            }
            else {
                tmpx = 40;
                icon = GameData.getItemIcon(rewardvo, false, true);
                icon.setScale(0.7);
                var numlb = icon.getChildByName("numLb");
                if (numlb) {
                    numlb.visible = false;
                }
                var numbg = icon.getChildByName("numbg");
                if (numbg) {
                    numbg.visible = false;
                }
                if (rewardvo.type == 11) {
                    var tcfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
                    if (tcfg.isTitle == 2) {
                        icon = App.CommonUtil.getHeadPic(String(rewardvo.id), 10);
                        icon.setScale(0.9);
                        tmpx = 30;
                    }
                    else {
                        icon = App.CommonUtil.getTitlePic(String(rewardvo.id), 10);
                        icon.setScale(0.75);
                        tmpx = 20;
                    }
                    group.addTouchTap(function () {
                        var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if (index >= 1) {
                            ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                                aid: _this.aid,
                                code: _this.code
                            });
                        }
                    }, view);
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode((tcfg && tcfg.isTitle == 2) ? "battlepassunlocktip5" : "battlepassunlocktip6", code), [String(unit[1])]);
                }
                else if (rewardvo.type == 24) {
                    group.addTouchTap(function () {
                        var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if (index >= 1) {
                            ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                                aid: _this.aid,
                                code: _this.code
                            });
                        }
                    }, view);
                    var tcfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip7", code), [String(unit[1])]);
                }
                else if (rewardvo.type == 16) {
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip8", code), [String(unit[1]), LanguageManager.getlocal("itemType16"), rewardvo.name]);
                    group.addTouchTap(function () {
                        var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if (index >= 1) {
                            ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                                aid: _this.aid,
                                code: _this.code
                            });
                        }
                    }, view);
                }
                else if (rewardvo.type == 19) {
                    group.addTouchTap(function () {
                        var index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if (index >= 1) {
                            ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                                aid: _this.aid,
                                code: _this.code
                            });
                        }
                    }, view);
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip8", code), [String(unit[1]), LanguageManager.getlocal("itemType19"), rewardvo.name]);
                }
                else if (rewardvo.type == 1025 || rewardvo.type == 1026) {
                    group.addTouchTap(function () {
                        // for(let i in view.cfg.showDetail){
                        //     let vo = GameData.formatRewardItem(view.cfg.showDetail[i])[0];
                        //     if(vo.type == rewardvo.type){
                        //         index = Number(i) + 1;
                        //         break;
                        //     }
                        // }
                        var index = view.cfg.showDetail.indexOf("1025_" + view.code + "_1") + 1;
                        if (index >= 1) {
                            ViewController.getInstance().openView("AcBattlePassRewardPopupView|" + index, {
                                aid: _this.aid,
                                code: _this.code
                            });
                        }
                    }, view);
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode(rewardvo.type == 1025 ? "battlepassunlocktip9" : "battlepassunlocktip10", code), [String(unit[1]), rewardvo.name]);
                }
                else {
                    str_1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode("battlepassunlocktip11", code), [String(unit[1]), rewardvo.num.toString(), rewardvo.name]);
                }
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, group, [tmpx, 0], true);
            group.addChild(icon);
            var descTxt = ComponentManager.getTextField(str_1, 22, TextFieldConst.COLOR_BLACK);
            descTxt.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, group, [150, 0], true);
            group.addChild(descTxt);
            var line1 = BaseBitmap.create("allianceweekendview_goldline");
            line1.width = 600;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line1, group, [0, 0], true);
            group.addChild(line1);
            //说明
            startY += group.height;
        };
        for (var i in arr) {
            _loop_1(i);
        }
        var alphamask = BaseBitmap.create("public_alphabg");
        alphamask.width = view._nodeContainer.width;
        alphamask.height = view._nodeContainer.height;
        view._nodeContainer.addChildAt(alphamask, 0);
        var rect = new egret.Rectangle(0, 0, 610, listbg.height - 150);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, listbg, [0, 5]);
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var rectmask = BaseBitmap.create("battlepassunlockrect");
        rectmask.width = 690;
        rectmask.height = 63;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rectmask, scrollView, [0, scrollView.height - rectmask.height + 10]);
        view.addChild(rectmask);
        rectmask.alpha = 0;
        var btn = ComponentManager.getButton("btn_small_orange", "", function () {
            if (_this._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
                ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
                return;
            }
            //购买等级
            PlatformManager.checkPay(info.unlockRecharge);
        }, view);
        //
        var twStr = PlatformManager.getMoneySign();
        btn.setText("" + (twStr + rechargeCfg.cost) + LanguageManager.getlocal("acPunishBuyItemBuy"), false);
        if (PlatformManager.checkIsEnLang()) {
            btn.setText("" + (twStr + rechargeCfg.cost), false);
        }
        if (PlatformManager.checkisLocalPrice() && rechargeCfg.platFullPrice) {
            btn.setText(rechargeCfg.platFullPrice, false);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bottomBg, [0, 15]);
        bottomGroup.addChild(btn);
        btn.name = "btn" + level;
        btn.visible = false;
        var originPrice = LanguageManager.getlocal("originalPriceTitle") + "\uFF1A" + twStr + "99.99";
        var originPriceTxt = ComponentManager.getTextField(originPrice, 24);
        bottomGroup.addChild(originPriceTxt);
        originPriceTxt.name = "originPriceTxt" + level;
        originPriceTxt.visible = false;
        originPriceTxt.setPosition(btn.x + btn.width / 2 - originPriceTxt.width / 2, btn.y + btn.height + 7);
        var shopline = BaseBitmap.create("shopview_line");
        shopline.name = "shopline" + level;
        shopline.visible = false;
        shopline.width = originPriceTxt.width + 16;
        shopline.height = 17;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, originPriceTxt, [0, -2]);
        bottomGroup.addChild(shopline);
        var collectImg = BaseBitmap.create("battlepassrewardget");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectImg, btn);
        bottomGroup.addChild(collectImg);
        collectImg.name = "flag" + level;
        collectImg.visible = false;
        if (myBattlelevel == 3) {
            collectImg.visible = true;
        }
        else if (myBattlelevel == 1) {
            if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                originPriceTxt.visible = shopline.visible = true;
            }
            btn.visible = true;
        }
        else {
            if (level == 2) {
                collectImg.visible = true;
            }
            else {
                btn.visible = true;
                if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                    originPriceTxt.visible = shopline.visible = true;
                }
                btn.visible = true;
            }
        }
        view.setChildIndex(view.closeBtn, 99);
        view.addChild(bottomGroup);
        /**
         * 公告横条：
            位移距离：119px
                时间：0~0.2m


            卷轴背景：
            距离：1035px
            时间：0.2~0.6m

            卷轴内容
            距离：1035px
            时间：0.2~0.8m

            下面板+按钮
            距离：99px
            时间：0.8~1m
        */
        view._stop = true;
        topGroup.alpha = 0;
        var tmpY = topGroup.y;
        topGroup.y -= 119;
        egret.Tween.get(topGroup).to({ y: tmpY, alpha: 1 }, 200).call(function () {
            egret.Tween.removeTweens(topGroup);
        }, view);
        listbg.alpha = 0;
        if (Number(this.code) >= 3 && !Api.switchVoApi.checkCloseBone() && RES.hasRes("battlepass_unlockbg1_tex_png") && App.CommonUtil.check_dragon()) {
            var lamp1 = App.DragonBonesUtil.getLoadDragonBones("battlepass_unlockbell1");
            lamp1.x = 320;
            lamp1.y = 994 + scrollView.y;
            view.addChild(lamp1);
            var list_1 = App.DragonBonesUtil.getLoadDragonBones("battlepass_unlockbg1", 1, "appear");
            list_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                list_1.playDragonMovie("idle", 0);
            }, this);
            list_1.x = 320;
            list_1.scaleY = (listbg.height / 926);
            list_1.y = listbg.height + 255;
            view.addChildAt(list_1, view.getChildIndex(listbg) - 1);
            scrollView.alpha = 0;
            var scroy = scrollView.y;
            scrollView.y -= 1035;
            bottomGroup.alpha = 0;
            var bottomy = bottomGroup.y;
            bottomGroup.y += 99;
            egret.Tween.get(scrollView).wait(1200).to({ y: scroy, alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(scrollView);
                rectmask.alpha = 1;
            }, view);
            egret.Tween.get(bottomGroup).wait(1800).to({ y: bottomy, alpha: 1 }, 200).call(function () {
                egret.Tween.removeTweens(bottomGroup);
                view._stop = false;
            }, view);
        }
        else {
            var listy = listbg.y;
            listbg.y -= 1035;
            egret.Tween.get(listbg).wait(200).to({ y: listy, alpha: 1 }, 400).call(function () {
                egret.Tween.removeTweens(listbg);
            }, view);
            scrollView.alpha = 0;
            var scroy = scrollView.y;
            scrollView.y -= 1035;
            egret.Tween.get(scrollView).wait(200).to({ y: scroy, alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(scrollView);
                rectmask.alpha = 1;
            }, view);
            bottomGroup.alpha = 0;
            var bottomy = bottomGroup.y;
            bottomGroup.y += 99;
            egret.Tween.get(bottomGroup).wait(800).to({ y: bottomy, alpha: 1 }, 200).call(function () {
                egret.Tween.removeTweens(bottomGroup);
                view._stop = false;
            }, view);
        }
    };
    AcBattlePassUnlockNewRewardView.prototype.buyCallback = function () {
        var view = this;
        var myBattlelevel = view.vo.getMyBattleLevel();
        if (myBattlelevel == view._curLevel) {
            return;
        }
        view._curLevel = myBattlelevel;
        for (var i = 2; i < 4; ++i) {
            var collectImg = view._bottomGroup.getChildByName("flag" + i);
            var btn = view._bottomGroup.getChildByName("btn" + i);
            var shopline = view._bottomGroup.getChildByName("shopline" + i);
            var originPriceTxt = view._bottomGroup.getChildByName("originPriceTxt" + i);
            if (collectImg && btn) {
                if (myBattlelevel == 3) {
                    collectImg.visible = true;
                    btn.visible = false;
                    if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                        originPriceTxt.visible = shopline.visible = false;
                    }
                }
                else if (myBattlelevel == 1) {
                    collectImg.visible = false;
                    btn.visible = true;
                    if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                        originPriceTxt.visible = shopline.visible = true;
                    }
                }
                else {
                    if (i == 2) {
                        collectImg.visible = true;
                        btn.visible = false;
                        if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                            originPriceTxt.visible = shopline.visible = false;
                        }
                    }
                    else {
                        collectImg.visible = false;
                        btn.visible = true;
                        if (PlatformManager.checkIsThSp() && Number(this.code) == 4) {
                            originPriceTxt.visible = shopline.visible = true;
                        }
                    }
                }
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip14", view.getUiCode()), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassLevel" + view.vo.getMyBattleLevel(), view.getUiCode()))]),
            title: "itemUseConstPopupViewTitle",
            touchMaskClose: true
        });
    };
    AcBattlePassUnlockNewRewardView.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcBattlePassUnlockNewRewardView.prototype.dispose = function () {
        var view = this;
        view._stop = false;
        view._curLevel = 1;
        view._nodeContainer.dispose();
        view._nodeContainer = null;
        view._bottomGroup.dispose();
        view._bottomGroup = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassUnlockNewRewardView;
}(CommonView));
//# sourceMappingURL=AcBattlePassUnlockNewRewardView.js.map