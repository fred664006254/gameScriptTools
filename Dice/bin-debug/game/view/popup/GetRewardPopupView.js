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
 * 宝箱类打开后获得弹窗
 * author qianjun
 */
var GetRewardPopupView = (function (_super) {
    __extends(GetRewardPopupView, _super);
    function GetRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._dbGroup = null;
        _this._isplay = false;
        _this._isTween = false;
        _this._hasone = false;
        _this.opennum = 0;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    GetRewardPopupView.prototype.initView = function () {
        var view = this;
        view._maskBmp.removeTouchTap();
        view._maskBmp.touchEnabled = true;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        TickMgr.addTick(this.tick, this);
    };
    GetRewardPopupView.prototype.createRewardGroup = function () {
        var _this = this;
        var view = this;
        view._isplay = false;
        view._hasone = false;
        view.container.y = view.lastY || view.container.y;
        var param = view.param.data;
        var dbGroup = new BaseDisplayObjectContainer();
        // dbGroup.width = GameConfig.stageWidth;
        // dbGroup.height = GameConfig.stageHeigth;
        view.addChildToContainer(dbGroup);
        view._dbGroup = dbGroup;
        var group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;
        view.addChildToContainer(group);
        var resGroup = new BaseDisplayObjectContainer();
        resGroup.width = GameConfig.stageWidth;
        resGroup.height = GameConfig.stageHeigth;
        view.addChildToContainer(resGroup);
        resGroup.visible = true;
        var rewards = GameData.formatRewardItem(param.rewards);
        var boxOpen = BaseBitmap.create("boxopen");
        boxOpen.visible = false;
        group.addChild(boxOpen);
        boxOpen.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxOpen, group, [0, 0]);
        var boxBottom = BaseBitmap.create("boxbottom");
        boxBottom.visible = false;
        group.addChild(boxBottom);
        boxBottom.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxBottom, boxOpen, [0, 0]);
        var rewardTitleBg = BaseBitmap.create("boxrewardtitle");
        group.addChild(rewardTitleBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardTitleBg, boxOpen, [0, 230]);
        var rewardTxt = ComponentMgr.getTextField(LangMger.getlocal("sysYouGetReward"), TextFieldConst.SIZE_38, ColorEnums.white);
        rewardTxt.strokeColor = 0x7e1201;
        rewardTxt.stroke = 1.5;
        group.addChild(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardTxt, rewardTitleBg, [10, 10]);
        var len = Math.min(3, rewards.length);
        var sortRewards = [];
        var birds = [];
        for (var index = 0; index < rewards.length; index++) {
            var item = rewards[index];
            if (item.type == 100) {
                birds.splice(0, 0, item);
            }
            else {
                sortRewards.push(item);
            }
        }
        sortRewards = sortRewards.concat(birds);
        var list = ComponentMgr.getScrollList(GetrewardItem, sortRewards, new egret.Rectangle(0, 0, len * 157, rewards.length > 3 ? 400 : 188));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, rewardTitleBg, [0, rewardTitleBg.height + 10]);
        group.addChild(list);
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("confirmBtn"), view.closeHandler, view);
        conBtn.setColor(ColorEnums.white);
        conBtn.setTextPos(null, 25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, conBtn, list, [0, list.height + 55]);
        group.addChild(conBtn);
        //宝箱连续购买
        if (param.isBoxBuy) {
            var specialBoxId = param.specialBoxId;
            var specialBoxCfg = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId));
            var buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", view.clickConHandler, view);
            buyBtn.setColor(ColorEnums.white);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, buyBtn, list, [0, list.height + 55]);
            group.addChild(buyBtn);
            buyBtn.setTextPos(null, 25);
            // conBtn.setText(specialBoxCfg.costGem1.toString());
            // conBtn.addTextIcon(`public_icon1`);
            var costGroup = new BaseDisplayObjectContainer();
            costGroup.width = buyBtn.width;
            costGroup.height = buyBtn.height;
            var costicon = BaseBitmap.create("ab_mainui_gem");
            costGroup.addChild(costicon);
            costicon.setScale(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, costGroup, [10, 10]);
            var costTxt = ComponentMgr.getTextField("" + specialBoxCfg.costGem, TextFieldConst.SIZE_CONTENT_COMMON);
            costGroup.addChild(costTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt, costicon, [costicon.width * costicon.scaleX + 15, 0]);
            var shopline = BaseBitmap.create("shopview_line");
            shopline.width = costTxt.width + 20;
            costGroup.addChild(shopline);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, costTxt);
            var buyTxt = ComponentMgr.getTextField("" + specialBoxCfg.costGem1, TextFieldConst.SIZE_CONTENT_COMMON);
            costGroup.addChild(buyTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, buyTxt, costTxt, [0, costTxt.textHeight + 5]);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, conBtn, [0,-costGroup.height]);
            buyBtn.addChild(costGroup);
            var reopenbg = BaseBitmap.create("boxreopenbg");
            buyBtn.addChild(reopenbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, reopenbg, buyBtn, [-5, 0]);
            var reopenTxt = ComponentMgr.getTextField(LangMger.getlocal("shopreopen"), TextFieldConst.SIZE_16);
            buyBtn.addChild(reopenTxt);
            reopenTxt.strokeColor = ColorEnums.btnStrokeBlue;
            ;
            reopenTxt.stroke = 1.5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, reopenTxt, reopenbg, [0, 5]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, list, [0, list.height + 55]);
        }
        group.height = Math.min(group.height, 926);
        group.x = (view.width - group.width) / 2;
        group.y = (view.height - group.height) / 2;
        // DEBUG: 调试阶段用播放龙骨动画，提交代码是要记得放开
        if (App.CommonUtil.check_dragon()) {
            rewards = GameData.formatRewardItem(param.rewards);
            this._isTween = true;
            group.alpha = 0;
            var arr_1 = [];
            for (var i in rewards) {
                var unit = rewards[i];
                if (unit.type == 100) {
                    arr_1.push(unit);
                }
            }
            var idx_1 = -1;
            var hasLoad_1 = false;
            //宝箱动画
            var boxdb_1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_bxani", 1, "idle1", function () {
                hasLoad_1 = true;
            });
            boxdb_1.name = "boxdb";
            boxdb_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function (evt) {
                if (evt.animationName == "idle2") {
                    // view._isplay = false;
                }
                else if (evt.animationName == "idle1") {
                    // view._isplay = false;
                    boxdb_1.playDragonMovie("idle3", 0);
                }
                else if (evt.animationName == "idle3" && view._isplay) {
                    view._isplay = false;
                }
            }, view);
            var tip_1 = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            dbGroup.addChild(tip_1);
            tip_1.stroke = 2;
            tip_1.width = GameConfig.stageWidth;
            tip_1.textAlign = egret.HorizontalAlign.CENTER;
            tip_1.text = LangMger.getlocal("sysclickbox");
            // 一键领取按钮
            var allreward_1 = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("sysrewardall"), function () {
                _this._hasone = true;
                boxdb_1.playDragonMovie("idle2", 1);
                boxdb_1.getDBobj().animation.timeScale = 100000;
                resGroup.visible = false;
                fguang_1.alpha = 0;
                xunhuan_1.visible = false;
                var diecIcon = dbGroup.getChildByName("diceicon");
                if (diecIcon) {
                    diecIcon.visible = false;
                    egret.Tween.removeTweens(diecIcon);
                    diecIcon.dispose();
                    diecIcon = null;
                }
                if (diceShow_1) {
                    diceShow_1.alpha = 0;
                    diceShow_1.stop();
                }
                tip_1.visible = false;
                remainG_1.visible = false;
                egret.Tween.removeTweens(remainG_1);
                allreward_1.visible = false;
                // group.y = GameConfig.stageHeigth;
                view.removeTouchTap();
                egret.Tween.get(boxdb_1, { onChange: function () {
                        fguang_1.y = boxdb_1.y - 130;
                    }, onChangeObj: view }).to({ y: group.y + 253 }, 500).call(function () {
                    fguang_1.setPosition(boxdb_1.x, group.y + 120);
                    fguang_1.alpha = 1;
                    egret.Tween.removeTweens(boxdb_1);
                    egret.Tween.get(group).to({ alpha: 1 }, 200).call(function () {
                        egret.Tween.removeTweens(group);
                        _this._isTween = false;
                    }, view);
                }, view);
                view.lastY = view.container.y;
                view.container.y = 0;
            }, this);
            allreward_1.visible = false;
            dbGroup.addChild(allreward_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, allreward_1, tip_1, [0, 0]);
            // 显示还有多少个奖励
            var remainG_1 = new BaseDisplayObjectContainer();
            // dbGroup.addChild(remainG);
            var remainbg = BaseBitmap.create("getrewardremain");
            remainG_1.addChild(remainbg);
            var remaintip_1 = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            remainG_1.addChild(remaintip_1);
            remaintip_1.stroke = 2;
            remaintip_1.text = String(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, remaintip_1, remainbg, [-6, 0]);
            remainG_1.visible = false;
            // 循环效果
            var xunhuan_1 = App.DragonBonesUtil.getLoadDragonBones("box_effect_xunhuan");
            xunhuan_1.alpha = 1;
            xunhuan_1.x = GameConfig.stageWidth / 2;
            xunhuan_1.y = boxdb_1.y - 645;
            dbGroup.addChild(xunhuan_1);
            var pizhiarr_1 = {
                1: "bai",
                2: "lan",
                3: "zi",
                4: "huang"
            };
            boxdb_1.setDragonBoneEventListener(dragonBones.EventObject.FRAME_EVENT, function (evt) {
                if (evt.frameLabel == "do") {
                    if (idx_1 >= arr_1.length || _this._hasone)
                        return;
                    remainG_1.visible = true;
                    var unit = arr_1[idx_1];
                    var dicecfg = Config.DiceCfg.getCfgById(unit.id);
                    var playani = function (evt) {
                        if (evt.frameLabel == "niao") {
                            if (idx_1 >= arr_1.length)
                                return;
                            var unit_1 = arr_1[idx_1];
                            var dicecfg_1 = Config.DiceCfg.getCfgById(unit_1.id);
                            var curlv = Api.DiceVoApi.getDiceLvById(unit_1.id.toString());
                            var needNum_1 = dicecfg_1.getNextLvCostNumByLv(curlv + 1);
                            var curNum_1 = Api.DiceVoApi.getDiceNumById(unit_1.id.toString());
                            var ismaxlevel_1 = curlv == dicecfg_1.maxGrade;
                            var canlevelup = curNum_1 >= needNum_1 && !ismaxlevel_1;
                            var diceicon_1 = App.CommonUtil.getDiceIconById(unit_1.id.toString(), 1, true, Api.DiceVoApi.notOld(unit_1.id.toString()));
                            // let shadow = diceicon.getChildByName(`shadow`);
                            // if(shadow){
                            //     shadow.visible = false;
                            // }
                            diceicon_1.anchorOffsetX = diceicon_1.width / 2;
                            diceicon_1.anchorOffsetY = diceicon_1.height / 2;
                            dbGroup.addChildAt(diceicon_1, dbGroup.getChildIndex(diceShow_1) - 1);
                            diceicon_1.alpha = 1;
                            // diceicon.scaleX = 0;
                            // diceicon.scaleY = 0;
                            diceicon_1.name = "diceicon";
                            diceicon_1.setPosition(diceShow_1.x, diceShow_1.y);
                            var num = ComponentMgr.getTextField('11', 44, ColorEnums.white);
                            num.width = 200;
                            num.textAlign = egret.HorizontalAlign.CENTER;
                            diceicon_1.addChild(num);
                            num.text = "x" + unit_1.num;
                            num.y = 200 + 10;
                            var nameTxt_1 = ComponentMgr.getTextField("" + dicecfg_1.name, TextFieldConst.SIZE_44);
                            nameTxt_1.lineSpacing = 5;
                            resGroup.addChild(nameTxt_1);
                            nameTxt_1.setPosition(350, diceicon_1.y - diceicon_1.height / 2 + 30);
                            nameTxt_1.alpha = 0;
                            // 品质
                            var qualityTxt_1 = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, GameConfig.getQualityColor(dicecfg_1.quality));
                            resGroup.addChild(qualityTxt_1);
                            qualityTxt_1.stroke = 2;
                            qualityTxt_1.strokeColor = ColorEnums.strokeBlack;
                            qualityTxt_1.textColor = GameConfig.getQualityColor(dicecfg_1.quality);
                            qualityTxt_1.text = LangMger.getlocal("quality" + dicecfg_1.quality);
                            qualityTxt_1.x = nameTxt_1.x;
                            qualityTxt_1.y = nameTxt_1.y + nameTxt_1.height + 20;
                            qualityTxt_1.alpha = 0;
                            // 小鸟当前等级
                            var lvTxt_1 = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, GameConfig.getQualityColor(dicecfg_1.quality));
                            resGroup.addChild(lvTxt_1);
                            lvTxt_1.stroke = 2;
                            lvTxt_1.strokeColor = ColorEnums.strokeBlack;
                            lvTxt_1.textColor = GameConfig.getQualityColor(dicecfg_1.quality);
                            lvTxt_1.text = LangMger.getlocal("shopgetboxlv", [String(curlv)]);
                            lvTxt_1.x = nameTxt_1.x;
                            lvTxt_1.y = qualityTxt_1.y + qualityTxt_1.height * 2;
                            lvTxt_1.alpha = 0;
                            allreward_1.visible = arr_1.length - idx_1 - 1 > 0;
                            var progressGroup_1 = new BaseDisplayObjectContainer();
                            resGroup.addChild(progressGroup_1);
                            progressGroup_1.alpha = 0;
                            var progressbg = "dicelevelupprogress";
                            var arrowres = "public_arrowblue";
                            if (ismaxlevel_1) {
                                progressbg = "dicelevelupprogress3";
                                arrowres = "";
                            }
                            else if (canlevelup) {
                                arrowres = "public_arrowgreen";
                                progressbg = "dicelevelupprogress2";
                            }
                            var progress_1 = ComponentMgr.getProgressBar(progressbg, "dicelevelupprogress_bg", 180); //progress_bg_1
                            progressGroup_1.addChild(progress_1);
                            var lastnum_1 = (curNum_1 - unit_1.num) > 0 ? curNum_1 - unit_1.num : 0;
                            progress_1.setPercentage(lastnum_1 / needNum_1);
                            // progress.tweenTo(curNum/needNum,500);
                            if (needNum_1 > 99 || curNum_1 > 99) {
                                progress_1.setTextSize(TextFieldConst.SIZE_30);
                            }
                            else {
                                progress_1.setTextSize(TextFieldConst.SIZE_36);
                            }
                            var progress2_1 = BaseBitmap.create(progressbg);
                            progress2_1.width = 180;
                            progress2_1.blendMode = egret.BlendMode.ADD;
                            // progressGroup.addChild(progress2);
                            progress2_1.setPosition(progress_1.x, progress_1.y);
                            progress2_1.mask = new egret.Rectangle(0, 0, progress2_1.width * (ismaxlevel_1 ? 1 : (curNum_1 / needNum_1)), progress2_1.height);
                            progress2_1.alpha = 0;
                            var arrow = BaseBitmap.create(arrowres);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow, progress_1, [-20, 0]);
                            progressGroup_1.addChild(arrow);
                            var arrow2_1 = BaseBitmap.create(arrowres);
                            arrow2_1.blendMode = egret.BlendMode.ADD;
                            arrow2_1.setPosition(arrow.x, arrow.y);
                            // progressGroup.addChild(arrow2);
                            arrow2_1.alpha = 0;
                            progressGroup_1.anchorOffsetX = progressGroup_1.width / 2;
                            progressGroup_1.anchorOffsetY = progressGroup_1.height / 2;
                            progressGroup_1.setPosition(410 + 214, lvTxt_1.y + lvTxt_1.height + 55);
                            // fguang.setPosition(diceicon.x,diceicon.y);
                            var waitNum = 0;
                            var timeparam_1 = BattleStatus.timeparam;
                            var endX = 450; // nameTxt.x + 50;
                            // egret.Tween.get(diceicon).wait(8 * timeparam).to({scaleX : 0.2, scaleY : 0.2}, 5 * timeparam).to({scaleX : 1, scaleY : 1}, 3 * timeparam);
                            egret.Tween.get(diceicon_1).to({ alpha: 1 }, 2 * timeparam_1).wait(8 * timeparam_1).to({ x: 210 }, 7 * timeparam_1)
                                .call(function () {
                                xunhuan_1.alpha = 1;
                                xunhuan_1.x = diceicon_1.x;
                                xunhuan_1.y = diceicon_1.y;
                                xunhuan_1.playDragonMovie("box_effect_xunhuan_" + pizhiarr_1[dicecfg_1.quality], 0);
                            });
                            var gt = egret.Tween.get(progressGroup_1);
                            gt.wait(10 * timeparam_1).call(function () {
                                // nameTxt.alpha = 1;
                                nameTxt_1.alpha = 1;
                                qualityTxt_1.alpha = 1;
                                qualityTxt_1.x = nameTxt_1.x + 15;
                                lvTxt_1.alpha = 0;
                                var last = nameTxt_1.x;
                                nameTxt_1.x = last + 30;
                                lvTxt_1.x = last + 40;
                                // egret.Tween.get(nameTxt).to({x: nameTxt.x - 30}, 2*timeparam).to({x:nameTxt.x +15}, 2*timeparam).to({x:nameTxt.x}, 3*timeparam)
                                egret.Tween.get(nameTxt_1).to({ x: last }, 3 * timeparam_1)
                                    .call(function () {
                                    egret.Tween.removeTweens(nameTxt_1);
                                });
                                egret.Tween.get(qualityTxt_1).to({ x: last }, 2 * timeparam_1)
                                    .call(function () {
                                    egret.Tween.removeTweens(qualityTxt_1);
                                });
                                egret.Tween.get(lvTxt_1).to({ x: last, alpha: 1 }, 2 * timeparam_1)
                                    .call(function () {
                                    egret.Tween.removeTweens(lvTxt_1);
                                });
                            }, view).to({ alpha: 1, x: endX }, 7 * timeparam_1)
                                .call(function () {
                                App.CommonUtil.changeNumTween(lastnum_1, curNum_1, 500, function (num) {
                                    try {
                                        if (ismaxlevel_1) {
                                            progress_1 && progress_1.setPercentage(1);
                                            progress_1 && progress_1.setText("" + num);
                                        }
                                        else {
                                            progress_1 && progress_1.setText(num + "/" + needNum_1);
                                        }
                                    }
                                    catch (error) {
                                        App.LogUtil.log(error);
                                    }
                                });
                                if (ismaxlevel_1) {
                                    progress_1 && progress_1.setPercentage(1);
                                }
                                else {
                                    progress_1.tweenTo(curNum_1 / needNum_1, 500);
                                }
                            });
                            if (unit_1.num > 1) {
                                var sxNum = unit_1.num > 4 ? 4 : unit_1.num;
                                for (var index = 0; index < sxNum; index++)
                                    gt.to({ scaleX: 0.9 }, 0.5 * timeparam_1).to({ scaleX: 1 }, 0.5 * timeparam_1).to({ scaleX: 1.1 }, 0.5 * timeparam_1).to({ scaleX: 1 }, 0.5 * timeparam_1);
                            }
                            gt.call(function () {
                                arrow2_1.alpha = 1;
                                progress2_1.alpha = 1;
                                egret.Tween.get(arrow2_1).to({ alpha: 0 }, 5 * timeparam_1);
                                egret.Tween.get(progress2_1).to({ alpha: 0 }, 5 * timeparam_1).call(function () {
                                    view._isplay = false;
                                    egret.Tween.removeTweens(diceicon_1);
                                    egret.Tween.removeTweens(progressGroup_1);
                                    egret.Tween.removeTweens(arrow2_1);
                                    egret.Tween.removeTweens(progress2_1);
                                    // fguang.alpha = 0;
                                    // if(idx < arr.length - 1){
                                    //     // boxdb.playDragonMovie(`idle3`,0);
                                    //     // boxdb.playDragonMovie(`idle1`,0);
                                    // }
                                }, view);
                            }, view);
                        }
                    };
                    diceShow_1.alpha = 1;
                    diceShow_1.playDragonMovie("box_effect_kaidan_" + pizhiarr_1[dicecfg.quality], 1); // `box_effect_kaidan_${pizhiarr[dicecfg.quality]}`
                    diceShow_1.setDragonBoneEventListener(dragonBones.EventObject.FRAME_EVENT, playani, view);
                }
            }, view);
            view.addTouchTap(function () {
                if (view._isplay || !hasLoad_1) {
                    return;
                }
                fguang_1.alpha = 0;
                xunhuan_1.alpha = 0;
                view._isplay = true;
                _this.opennum = 0;
                ++idx_1;
                var diecIcon = dbGroup.getChildByName("diceicon");
                if (diecIcon) {
                    diecIcon.alpha = 0;
                    egret.Tween.removeTweens(diecIcon);
                    diecIcon.dispose();
                    diecIcon = null;
                }
                if (diceShow_1) {
                    diceShow_1.alpha = 0;
                    diceShow_1.stop();
                }
                remaintip_1.text = String(Math.max(0, arr_1.length - idx_1 - 1));
                allreward_1.visible = (arr_1.length - idx_1 - 1 > 0) ? allreward_1.visible : false;
                resGroup.removeChildren();
                if (idx_1 == arr_1.length) {
                    tip_1.visible = false;
                    remainG_1.visible = false;
                    allreward_1.visible = false;
                    egret.Tween.removeTweens(remainG_1);
                    // group.y = GameConfig.stageHeigth;
                    view.removeTouchTap();
                    egret.Tween.get(boxdb_1, { onChange: function () {
                            fguang_1.y = boxdb_1.y - 130;
                        }, onChangeObj: view }).to({ y: group.y + 253 }, 800).call(function () {
                        fguang_1.setPosition(boxdb_1.x, group.y + 120);
                        fguang_1.alpha = 1;
                        egret.Tween.removeTweens(boxdb_1);
                        egret.Tween.get(group).to({ alpha: 1 }, 500).call(function () {
                            egret.Tween.removeTweens(group);
                            _this._isTween = false;
                        }, view);
                    }, view);
                    view.lastY = view.container.y;
                    view.container.y = 0;
                }
                else {
                    var remainTween = egret.Tween.get(remainG_1);
                    remainTween.to({ scaleX: 0.9, scaleY: 0.9 }, 100)
                        .to({ scaleX: 1, scaleY: 1 }, 100)
                        .call(function () {
                        egret.Tween.removeTweens(remainG_1);
                    });
                    fguang_1.setPosition(boxdb_1.x, boxdb_1.y - 130);
                    fguang_1.alpha = 1;
                    boxdb_1.playDragonMovie("idle2", 1);
                    if (Config.DiceCfg.getCfgById(arr_1[idx_1].id).quality == 4) {
                        SoundMgr.playEffect(SoundConst.EFFECT_BOX_EXTENDED);
                    }
                    else {
                        SoundMgr.playEffect(SoundConst.EFFECT_BOX);
                    }
                }
            }, view);
            dbGroup.addChild(boxdb_1);
            boxdb_1.width = 324;
            boxdb_1.height = 253;
            boxdb_1.x = GameConfig.stageWidth / 2;
            boxdb_1.y = GameConfig.stageHeigth / 2 + boxdb_1.height + 100;
            tip_1.y = boxdb_1.y + 30;
            allreward_1.y = tip_1.y + tip_1.height + 10;
            //发光
            var fguang_1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_bxvfx", 0, "idle");
            // let fguang = App.DragonBonesUtil.getLoadDragonBones(`box_effect_xunhuan`, 0, `idle`);
            dbGroup.addChild(fguang_1);
            fguang_1.alpha = 0;
            //小鸟出现
            // let diceShow = App.DragonBonesUtil.getLoadDragonBones(`royalpass_bxfx`);
            var diceShow_1 = App.DragonBonesUtil.getLoadDragonBones("box_effect_kaidan");
            diceShow_1.alpha = 1;
            diceShow_1.x = GameConfig.stageWidth / 2;
            diceShow_1.y = boxdb_1.y - 645;
            dbGroup.addChild(diceShow_1);
            dbGroup.addChild(remainG_1);
            remainG_1.x = boxdb_1.x + 97;
            remainG_1.y = boxdb_1.y - 263;
        }
        else {
            boxOpen.visible = boxBottom.visible = false;
        }
    };
    GetRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.createRewardGroup();
        // this.container.y = 50;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, view);
    };
    GetRewardPopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    GetRewardPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (this._isTween) {
            return;
        }
        // if (!param.data.clickNotAutoHide) {
        // 	this.hide();
        // }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    GetRewardPopupView.prototype.tick = function () {
        if (this._isplay) {
            this.opennum++;
            if (this.opennum >= 5) {
                this._isplay = false;
                this.opennum = 0;
            }
        }
    };
    GetRewardPopupView.prototype.getBgName = function () {
        return "public_ab_scenebg";
    };
    GetRewardPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    GetRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    GetRewardPopupView.prototype.getCloseBtnName = function () {
        return null; //this.param.data.needClose === 1 ? 
    };
    GetRewardPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (this._isTween) {
            return;
        }
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    GetRewardPopupView.prototype.switchToTop = function (data) {
        var _this = this;
        _super.prototype.switchToTop.call(this, data);
        this.param = data;
        this.playHideViewEffect(function () {
            _this.container.removeChildren();
            _this._dbGroup.removeChildren();
            _this.createRewardGroup();
            _this.playOpenViewEffect();
        }, this);
    };
    GetRewardPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    GetRewardPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "shopview_line", "getrewardpopupview", "progress24_bg", "progress24", "progress25", "progress26"
        ]);
    };
    GetRewardPopupView.prototype.dispose = function () {
        TickMgr.removeTick(this.tick, this);
        this._dbGroup = null;
        this._isplay = false;
        this._isTween = false;
        this._hasone = false;
        _super.prototype.dispose.call(this);
    };
    return GetRewardPopupView;
}(PopupView));
__reflect(GetRewardPopupView.prototype, "GetRewardPopupView");
//# sourceMappingURL=GetRewardPopupView.js.map