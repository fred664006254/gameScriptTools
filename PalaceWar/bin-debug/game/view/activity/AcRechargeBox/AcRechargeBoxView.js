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
  * 百服活动-储值宝箱
  * author 张朝阳
  * date 2018/8/14
  * @class AcRechargeBoxView
  */
var AcRechargeBoxView = (function (_super) {
    __extends(AcRechargeBoxView, _super);
    function AcRechargeBoxView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topbg = null;
        _this.boxInfoList = null;
        _this.timebg = null;
        _this.tip2Text = null;
        return _this;
    }
    Object.defineProperty(AcRechargeBoxView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxView.prototype.getTitleStr = function () {
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
            return null;
        }
        return "acRechargeBox-" + this.code + "_Title";
    };
    AcRechargeBoxView.prototype.getTitleBgName = function () {
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
            return "acrechargebox_titlebg_" + this.newCode;
        }
        return _super.prototype.getTitleBgName.call(this);
    };
    AcRechargeBoxView.prototype.getContainerY = function () {
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20") {
            return 14;
        }
        return 0;
    };
    Object.defineProperty(AcRechargeBoxView.prototype, "typeCode", {
        get: function () {
            var code = "";
            switch (Number(this.code)) {
                case 3:
                case 6:
                    code = "2";
                    break;
                case 5:
                    code = "1";
                    break;
                case 7:
                    code = "4";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    code = "5";
                    break;
                case 12:
                case 13:
                    code = "12";
                    break;
                case 14:
                case 15:
                    code = "14";
                    break;
                case 17:
                    code = "16";
                    break;
                case 19:
                    code = "18";
                    break;
                case 21:
                    code = "20";
                    break;
                case 23:
                    code = "22";
                    break;
                default:
                    code = this.code;
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxView.prototype, "newCode", {
        get: function () {
            var code = "";
            switch (Number(this.code)) {
                case 6:
                    code = "3";
                    break;
                case 5:
                    code = "1";
                    break;
                case 7:
                    code = "4";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    code = "5";
                    break;
                case 12:
                case 13:
                    code = "12";
                    break;
                case 14:
                case 15:
                    code = "14";
                    break;
                case 17:
                    code = "16";
                    break;
                case 19:
                    code = "18";
                    break;
                case 21:
                    code = "20";
                    break;
                case 23:
                    code = "22";
                    break;
                default:
                    code = this.code;
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.refreshView, this);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var bottomBg = BaseLoadBitmap.create("acrechargeboxview_buttombg_" + this.typeCode);
        bottomBg.width = 640;
        bottomBg.height = 832;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 105;
        this.addChildToContainer(bottomBg);
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20") {
            bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        }
        var topbgstr = "acrechargeboxview_bg_" + this.newCode;
        this._topbg = BaseLoadBitmap.create(topbgstr);
        this._topbg.width = 640;
        this._topbg.height = 221;
        this._topbg.setPosition(0, -15);
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
            this._topbg.y = -15 + 100;
        }
        this.addChildToContainer(this._topbg);
        if (this.newCode == "22") {
            bottomBg.y = this._topbg.y + this._topbg.height;
        }
        var topbg = this._topbg;
        if (this.newCode == "3") {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(20, 95);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.touchEnabled = false;
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            skinTxt.touchEnabled = false;
            var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
            this.addChildToContainer(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxteffect.touchEnabled = false;
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(topbg.x + 35, topbg.y + 40);
            view.addChildToContainer(touchPos);
            touchPos.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXSKINPOPUPVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }, ViewController);
        }
        var actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        actimeTF.width = 395;
        actimeTF.setPosition(this._topbg.x + 225 + 12, this._topbg.y + 100);
        if (this.newCode == "3") {
            actimeTF.setPosition(this._topbg.x + 225, this._topbg.y + 115);
        }
        else if (this.newCode == "20") {
            actimeTF.setPosition(this._topbg.x + 225, this._topbg.y + 110);
        }
        else if (this.newCode == "22") {
            actimeTF.y = this._topbg.y + 110;
            actimeTF.setColor(TextFieldConst.COLOR_WARN_YELLOW2);
        }
        this.addChildToContainer(actimeTF);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxDesc_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(actimeTF.x, actimeTF.y + actimeTF.height);
        acDesc.width = 395;
        this.addChildToContainer(acDesc);
        if (this.newCode == "22") {
            acDesc.setColor(TextFieldConst.COLOR_BROWN);
            acDesc.y = actimeTF.y + actimeTF.height + 5;
            acDesc.lineSpacing = 6;
        }
        var bottomBg2 = null;
        if (this.newCode == "4" || this.newCode == "5" || this.newCode == "14" || this.newCode == "16" || this.newCode == "20") {
            bottomBg2 = BaseBitmap.create("acrechargebox_big_bg_" + this.newCode);
            bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2, this._topbg.y + this._topbg.height);
            this.addChildToContainer(bottomBg2);
            var smallbg1 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg1.setPosition(GameConfig.stageWidth / 2 - smallbg1.width / 2, bottomBg2.y + 81);
            this.addChildToContainer(smallbg1);
            var smallbg2 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg2.setPosition(smallbg1.x, smallbg1.y + smallbg1.height + 2);
            this.addChildToContainer(smallbg2);
            if (this.newCode == "14") {
                smallbg1.y = bottomBg2.y + 35;
                smallbg2.y = smallbg1.y + smallbg1.height + 15;
            }
            else if (this.newCode == "16") {
                smallbg1.y = bottomBg2.y + 45;
                smallbg2.y = smallbg1.y + smallbg1.height + 5;
            }
            else if (this.code == "20") {
                smallbg1.y = bottomBg2.y + 55;
                smallbg2.y = smallbg1.y + smallbg1.height + 7;
            }
        }
        else if (this.newCode == "12") {
            bottomBg2 = BaseBitmap.create("public_9_bg51");
            bottomBg2.width = 630;
            bottomBg2.height = bottomBg.y + bottomBg.height - this._topbg.y - this._topbg.height - 55;
            bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2, this._topbg.y + this._topbg.height + 5);
            this.addChildToContainer(bottomBg2);
            var smallbg1 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg1.setPosition(GameConfig.stageWidth / 2 - smallbg1.width / 2, bottomBg2.y + 29);
            this.addChildToContainer(smallbg1);
            var smallbg2 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg2.setPosition(smallbg1.x, smallbg1.y + smallbg1.height + 2 + 15);
            this.addChildToContainer(smallbg2);
        }
        else if (this.newCode == "18") {
            bottomBg2 = BaseBitmap.create("acrechargebox_big_bg_" + this.newCode);
            bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2, this._topbg.y + this._topbg.height);
            this.addChildToContainer(bottomBg2);
        }
        else if (this.newCode == "22") {
            var smallbg1 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg1.setPosition(GameConfig.stageWidth / 2 - smallbg1.width / 2, this._topbg.y + this._topbg.height + 160);
            this.addChildToContainer(smallbg1);
            var smallbg2 = BaseBitmap.create("acrechargebox_small_bg_" + this.newCode);
            smallbg2.setPosition(smallbg1.x, smallbg1.y + smallbg1.height + 100);
            this.addChildToContainer(smallbg2);
        }
        else if (this.newCode != "1") {
            bottomBg2 = BaseBitmap.create("public_9_bg51");
            bottomBg2.width = 630;
            bottomBg2.height = bottomBg.y + bottomBg.height - this._topbg.y - this._topbg.height - 55;
            bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2, this._topbg.y + this._topbg.height + 5);
            this.addChildToContainer(bottomBg2);
        }
        var boxList = cfg.getBoxListData();
        if (this.newCode != "5" && this.newCode != "12" && this.newCode != "14" && this.newCode != "16" && this.newCode != "18" && this.newCode != "20" && this.newCode != "22") {
            boxList.sort(function (a, b) {
                return b.id - a.id;
            });
        }
        this.boxInfoList = [];
        for (var i = 0; i < boxList.length; i++) {
            var boxCfg = boxList[i];
            var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
            if (i % 3 == 0) {
                var line1 = BaseBitmap.create("acrechargeboxview_line");
                line1.width = 604;
                line1.setPosition(bottomBg.x + bottomBg.width / 2 - line1.width / 2, this._topbg.y + this._topbg.height + 25 + (Math.floor(i / 3) * 260));
                var bgStr = "firstbg_" + this.typeCode;
                if (this.newCode == "1") {
                    bgStr = "firstbg";
                    if (Math.floor(i / 3) > 0) {
                        bgStr = "secondbg";
                    }
                    line1.y = this._topbg.y + this._topbg.height + 25 + (Math.floor(i / 3) * 290);
                }
                var bg1 = BaseLoadBitmap.create(bgStr);
                bg1.width = 605;
                bg1.height = 243;
                bg1.setPosition(line1.x + line1.width / 2 - bg1.width / 2, line1.y + line1.height / 2);
                this.addChildToContainer(bg1);
                this.addChildToContainer(line1);
                if (this.newCode == "4") {
                    bg1.y += 40;
                }
                else if (this.newCode != "1") {
                    bg1.y += 20;
                }
            }
            var boxBgStr = "acrechargeboxview_whitebg_" + this.typeCode;
            if (boxCfg.needGem == "g6" && (this.newCode == "1" || this.newCode == "5" || this.newCode == "12" || this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "22")) {
                boxBgStr = "acrechargeboxview_redbg_" + this.typeCode;
            }
            var boxBg = BaseBitmap.create(boxBgStr);
            var PosX = bottomBg.x + 18 + (605 - boxBg.width * 3) / 4 + ((boxBg.width) * (i % 3));
            if (this.newCode == "12") {
                PosX = bottomBg.x + 18 + (605 - boxBg.width * 3) / 4 + ((boxBg.width - 7) * (i % 3)) + 15;
            }
            else if (this.newCode == "14" || this.newCode == "16") {
                PosX = bottomBg.x + 18 + (605 - boxBg.width * 3) / 4 + ((boxBg.width - 7) * (i % 3)) + 12;
            }
            else if (this.newCode == "18") {
                PosX = bottomBg.x + 52 + (537 - boxBg.width * 3) / 4 * (i % 3 + 1) + ((boxBg.width - 0) * (i % 3));
            }
            else if (this.newCode == "20") {
                PosX = bottomBg.x + 18 + (605 - boxBg.width * 3) / 4 + ((boxBg.width + 6) * (i % 3)) + 16;
            }
            else if (this.newCode == "22") {
                PosX = bottomBg.x + 40 + (605 - boxBg.width * 3) / 4 + ((boxBg.width + 11) * (i % 3));
            }
            //bottomBg.x + 18 + ((boxBg.width) * (i%3))
            boxBg.setPosition(PosX, this._topbg.y + this._topbg.height + 27 + (Math.floor(i / 3) * 290));
            if (this.newCode == "4") {
                boxBg.x += 22;
                boxBg.y = this._topbg.y + this._topbg.height + 98 + (Math.floor(i / 3) * 242);
            }
            else if (this.newCode == "5") {
                boxBg.x += 30;
                boxBg.y = this._topbg.y + this._topbg.height + 104 + (Math.floor(i / 3) * 245);
            }
            else if (this.newCode == "12") {
                boxBg.x += 22;
                boxBg.y = this._topbg.y + this._topbg.height + 50 + (Math.floor(i / 3) * 265);
            }
            else if (this.newCode == "14") {
                boxBg.x += 20;
                boxBg.y = this._topbg.y + this._topbg.height + 54 + (Math.floor(i / 3) * 259);
            }
            else if (this.newCode == "16") {
                boxBg.x += 17;
                boxBg.y = this._topbg.y + this._topbg.height + 56 + (Math.floor(i / 3) * 248);
            }
            else if (this.newCode == "18") {
                boxBg.y = this._topbg.y + this._topbg.height + 201 + (Math.floor(i / 3) * 247);
            }
            else if (this.newCode == "20") {
                boxBg.visible = false;
                boxBg.y = this._topbg.y + this._topbg.height + 50 + (Math.floor(i / 3) * 248);
            }
            else if (this.newCode == "22") {
                boxBg.y = this._topbg.y + this._topbg.height + 61 + (Math.floor(i / 3) * 250);
            }
            else if (this.newCode != "1") {
                boxBg.x += 35;
                boxBg.y = this._topbg.y + this._topbg.height + 68 + (Math.floor(i / 3) * 260);
            }
            this.addChildToContainer(boxBg);
            var box = BaseBitmap.create("acrechargeboxview_box1_" + this.typeCode);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            if (this.newCode == "1") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + 80 + box.height / 2);
            }
            else if (this.newCode == "4") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 20);
            }
            else if (this.newCode == "5") {
                box.setPosition(boxBg.x + boxBg.width / 2 + 10, boxBg.y + box.height / 2 - 10);
            }
            else if (this.newCode == "12") {
                box.setPosition(boxBg.x + boxBg.width / 2 - 5, boxBg.y + box.height / 2 + 12);
            }
            else if (this.newCode == "14") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 - 15);
            }
            else if (this.newCode == "16") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 4);
            }
            else if (this.newCode == "18") {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y - box.height / 2 + 6);
            }
            else if (this.newCode == "22") {
                box.setPosition(boxBg.x + boxBg.width / 2 - 32, boxBg.y + box.height / 2 + 3);
            }
            else {
                box.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + box.height / 2 + 17);
            }
            //tailor_get_light
            var light = BaseBitmap.create("tailor_get_light");
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.setPosition(box.x, box.y);
            light.setScale(0.75);
            this.addChildToContainer(light);
            light.setVisible(false);
            this.addChildToContainer(box);
            box.addTouchTap(this.boxClick, this, [boxCfg.needGem]);
            var gemBM = BaseLoadBitmap.create("itemicon1");
            gemBM.width = 40;
            gemBM.height = 40;
            if (this.newCode == "1") {
                gemBM.setPosition(boxBg.x + 50, boxBg.y + 30);
            }
            else {
                gemBM.setPosition(boxBg.x + 20, boxBg.y + boxBg.height - gemBM.height - 5);
            }
            this.addChildToContainer(gemBM);
            if (boxCfg.needGem == "g6" && this.newCode == "1") {
                gemBM.x = boxBg.x + 30;
                if (PlatformManager.checkIsThSp()) {
                    var gemNum = ComponentManager.getTextField(String(rechargecfg.gemCost), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
                    gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
                    this.addChildToContainer(gemNum);
                }
                else {
                    var gemNumBitMap = ComponentManager.getBitmapText(String(rechargecfg.gemCost), "socre_fnt");
                    gemNumBitMap.setScale(0.7);
                    gemNumBitMap.setPosition(gemBM.x + gemBM.width, gemBM.y + gemBM.height / 2 - gemNumBitMap.height / 2 + 3);
                    this.addChildToContainer(gemNumBitMap);
                }
                var giveBM = BaseBitmap.create("acrechargeboxview_give");
                giveBM.setPosition(box.x + 22, box.y);
                this.addChildToContainer(giveBM);
                var decorateBM = BaseBitmap.create("acrechargeboxview_decorate");
                decorateBM.setPosition(box.x - decorateBM.width + 27, box.y + 5);
                this.addChildToContainer(decorateBM);
                box.y -= 8;
            }
            else {
                if (this.newCode == "3" || this.newCode == "4" || this.newCode == "5" || this.newCode == "12" || this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                    var gemNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTip-" + this.newCode, [String(rechargecfg.gemCost)]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this.addChildToContainer(gemNum);
                    var tmpx = (boxBg.width - gemBM.width - gemNum.textWidth) / 2;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, gemNum, boxBg, [tmpx, 10]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemBM, gemNum, [gemNum.textWidth, 0]);
                    if (this.newCode == "4") {
                        gemNum.y += 5;
                    }
                    else if (this.newCode == "18") {
                        gemNum.y += 5;
                        gemBM.y += 2;
                    }
                    else if (this.newCode == "20") {
                        gemNum.y += 33;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemBM, gemNum, [gemNum.textWidth, 0]);
                    }
                    else if (this.newCode == "22") {
                        gemNum.x -= 7;
                        gemNum.y -= 3;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemBM, gemNum, [gemNum.textWidth, 0]);
                    }
                }
                else {
                    var gemNum = ComponentManager.getTextField(String(rechargecfg.gemCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
                    if (this.newCode != "1") {
                        gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
                    }
                    gemNum.setPosition(gemBM.x + gemBM.width + 5, gemBM.y + gemBM.height / 2 - gemNum.height / 2);
                    this.addChildToContainer(gemNum);
                }
            }
            var rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
            var receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [String(rechargeNum), String(boxCfg.limit)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
            if (this.newCode == "3" || this.newCode == "4") {
                var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                receiveNum.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                receiveNum.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [String(num > 0 ? 0x21eb39 : 0xff3c3c), num.toString()]);
            }
            else if (this.newCode == "5" || this.newCode == "12" || this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                receiveNum.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                receiveNum.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [num.toString()]);
            }
            if (this.newCode == "1") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height - 30);
            }
            else if (this.newCode == "4") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height + 2);
            }
            else if (this.newCode == "5" || this.newCode == "12") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height + 6);
                light.setPosition(box.x - 20, box.y + 20);
            }
            else if (this.newCode == "14") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height + 7);
                light.setPosition(box.x - 6, box.y + 30);
            }
            else if (this.newCode == "16") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height + 7);
                light.setPosition(box.x - 6, box.y + 30);
            }
            else if (this.newCode == "18") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height - receiveNum.height + 10);
                light.setPosition(box.x - 6, box.y + 20);
            }
            else if (this.newCode == "20") {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height + receiveNum.height + 9);
                light.setPosition(box.x, box.y + 15);
            }
            else {
                receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2, boxBg.y + boxBg.height + 100);
            }
            // receiveNum.setPosition(boxBg.x + boxBg.width / 2 - receiveNum.width / 2,boxBg.y + boxBg.height - receiveNum.height - 30);
            var rechargebgStr = "public_9_bg48";
            if (this.newCode != "1") {
                rechargebgStr = "public_9_bg50";
            }
            var rechargebg = BaseBitmap.create(rechargebgStr);
            rechargebg.width = receiveNum.width;
            rechargebg.setPosition(receiveNum.x + receiveNum.width / 2 - rechargebg.width / 2, receiveNum.y + receiveNum.height / 2 - rechargebg.height / 2);
            if (this.newCode == "14") {
                rechargebg.setPosition(receiveNum.x + receiveNum.width / 2 - rechargebg.width / 2 + 10, receiveNum.y + receiveNum.height / 2 - rechargebg.height / 2);
            }
            this.addChildToContainer(rechargebg);
            this.addChildToContainer(receiveNum);
            var boxInfo = { "boxBg": boxBg, "needGem": boxCfg.needGem, "lightBM": light, "boxBM": box, "rechargeTF": receiveNum, "rechargebg": rechargebg };
            this.boxInfoList.push(boxInfo);
            if (this.newCode == "3" && boxCfg.needGem == "g6") {
                var giveBM = BaseBitmap.create("acrechargeboxview_give");
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, giveBM, box, [-20, 0]);
                this.addChildToContainer(giveBM);
                // let skinId = cfg.getSkin(this.code);
                // let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
                // let icon = BaseLoadBitmap.create(skincfg.icon);
                // icon.width = 205;
                // icon.height = 196;
                // icon.setScale(0.5);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, icon, box);
                // this.addChildToContainer(icon);
            }
        }
        this.refreshView();
        if (this.newCode != "1") {
            var flowerBM = BaseBitmap.create("acrechargeboxview_flower");
            flowerBM.setPosition(this._topbg.x, this._topbg.y + this._topbg.height);
            this.addChildToContainer(flowerBM);
            var buttomBg3 = BaseLoadBitmap.create("acrechargeboxview_bg3_" + this.typeCode);
            buttomBg3.width = 640;
            buttomBg3.height = 99;
            buttomBg3.setPosition(bottomBg.x + bottomBg.width / 2 - buttomBg3.width / 2, bottomBg.y + bottomBg.height - buttomBg3.height);
            this.addChildToContainer(buttomBg3);
        }
        //倒计时
        var timeBgStr = 'public_9_bg61';
        if (this.newCode == "14" || this.newCode == "16" || this.newCode == "20" || this.newCode == "22") {
            timeBgStr = "acrechargetimebg_" + this.newCode;
        }
        var timebg = BaseBitmap.create(timeBgStr);
        view.addChild(timebg);
        view.timebg = timebg;
        var str = '';
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
        }
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [str]), 20);
        view.addChild(tip2Text);
        timebg.width = tip2Text.width + 50;
        view.tip2Text = tip2Text;
        if (this.newCode == "4" || this.newCode == "5") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, view, [0, 20]);
        }
        else if (this.newCode == "14") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, bottomBg2, [0, 25]);
        }
        else if (this.newCode == "16") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, bottomBg2, [0, 35]);
        }
        else if (this.newCode == "18") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, bottomBg2, [0, -30]);
        }
        else if (this.newCode == "20") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, bottomBg2, [0, 37]);
        }
        else if (this.newCode == "22") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, this._topbg, [0, -590]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, timebg, view, [0, 67]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tip2Text, timebg);
        if (this.newCode == "4" || this.newCode == "5" || this.newCode == "12" || this.newCode == "14" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
            //衣装预览
            var view_1 = this;
            var topBg = { x: 20, y: 18 };
            if (view_1.newCode == '14' || view_1.newCode == "16" || view_1.newCode == "18" || view_1.newCode == "20" || view_1.newCode == "22") {
                topBg.y = 18 + 92;
            }
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
            skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
            this.addChildToContainer(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(topBg.x, topBg.y);
            this.addChildToContainer(touchPos);
            var skinId_1 = String(cfg.show);
            touchPos.addTouchTap(function () {
                var needCharge = view_1.cfg.getBoxListData();
                if (view_1.newCode == '14' || view_1.newCode == "16" || view_1.newCode == "18" || view_1.newCode == "20" || view_1.newCode == "22") {
                    var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId_1);
                    var num = 0;
                    for (var i in needCharge) {
                        if (needCharge[i].getReward.indexOf(skincfg.item) > -1) {
                            var cfg_1 = Config.RechargeCfg.getRechargeItemCfgByKey(needCharge[i].needGem);
                            if (cfg_1) {
                                num = cfg_1.gemCost;
                            }
                            break;
                        }
                    }
                    var scale = null;
                    var skinName = skincfg.name;
                    var servantName = LanguageManager.getlocal("servant_name" + skincfg.servantId);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTSKINPOPUPVIEW, { aid: _this.aid, code: _this.code, skin: cfg.show, topMsg: LanguageManager.getlocal("acRechargeBoxSkinTip", [String(num), servantName, skinName]), scale: scale });
                    //ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSEVRVANTSKINPOPUPVIEW, { sid: skinId, title: LanguageManager.getlocal("acRechargeBoxSkinTip", [String(num), servantName, skinName]) });
                }
                else {
                    var num = 0;
                    for (var i in needCharge) {
                        if (needCharge[i].getReward.indexOf(skinId_1) > -1) {
                            var cfg_2 = Config.RechargeCfg.getRechargeItemCfgByKey(needCharge[i].needGem);
                            if (cfg_2) {
                                num = cfg_2.gemCost;
                            }
                            break;
                        }
                    }
                    var skinName = LanguageManager.getlocal("skinName" + skinId_1);
                    var skincfg = Config.WifeskinCfg.getWifeCfgById(skinId_1);
                    var wifeName = LanguageManager.getlocal("wifeName_" + skincfg.wifeId);
                    ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSKINPOPUPVIEW, { sid: skinId_1, title: LanguageManager.getlocal("acRechargeBoxSkinTip", [String(num), wifeName, skinName]) });
                }
            }, ViewController);
        }
    };
    AcRechargeBoxView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    Object.defineProperty(AcRechargeBoxView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxView.prototype.tick = function () {
        var view = this;
        if (view.tip2Text) {
            var str = '';
            if (view.vo.isInActivity()) {
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else {
                str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
            }
            view.tip2Text.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [str]);
            if (this.timebg) {
                this.timebg.width = view.tip2Text.width + 50;
                if (this.newCode == "4" || this.newCode == "5") {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view.timebg, view, [0, 20]);
                }
                else if (this.newCode == '14') {
                }
                else if (this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view.timebg, view, [0, 230]);
                }
                else {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view.timebg, view, [0, 67]);
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.tip2Text, view.timebg);
            }
        }
    };
    AcRechargeBoxView.prototype.refreshView = function () {
        for (var i = 0; i < this.boxInfoList.length; i++) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var boxInfo = this.boxInfoList[i];
            var boxCfg = cfg.getBoxData(boxInfo.needGem);
            var rechargeNum = vo.getBoxReChargeNum(boxInfo.needGem);
            var receiveNum = vo.getBoxReceiveNum(boxInfo.needGem);
            if (Number(boxCfg.limit) <= receiveNum) {
                egret.Tween.removeTweens(boxInfo.lightBM);
                egret.Tween.removeTweens(boxInfo.boxBM);
                boxInfo.lightBM.rotation = 0;
                boxInfo.boxBM.rotation = 0;
                boxInfo.lightBM.setVisible(false);
                if (this.newCode == "5") {
                    boxInfo.boxBM.alpha = 0;
                    if (boxCfg.needGem == "g6") {
                        boxInfo.boxBg.setRes("acrechargeboxview_redbg2_" + this.typeCode);
                    }
                    else {
                        boxInfo.boxBg.setRes("acrechargeboxview_whitebg2_" + this.typeCode);
                    }
                }
                else if (this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                    if (boxCfg.needGem == "g6") {
                        boxInfo.boxBM.setRes("acrechargeboxview_box2_3_" + this.typeCode);
                    }
                    else {
                        boxInfo.boxBM.setRes("acrechargeboxview_box3_" + this.typeCode);
                    }
                }
                else {
                    boxInfo.boxBM.setRes("acrechargeboxview_box3_" + this.typeCode);
                }
                boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum3");
                if (this.newCode == "3" || this.newCode == "4") {
                    boxInfo.rechargebg.setRes("public_9_bg50");
                    boxInfo.boxBg.setRes("acrechargeboxview_whitebg_" + this.typeCode);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [String(0xff3c3c), "0"]);
                }
                else if (this.newCode == "5" || this.newCode == "12" || this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                    boxInfo.rechargebg.setRes("public_9_bg50");
                }
            }
            else {
                if (rechargeNum > receiveNum) {
                    boxInfo.lightBM.setVisible(true);
                    boxInfo.boxBM.setRes("acrechargeboxview_box2_" + this.typeCode);
                    egret.Tween.get(boxInfo.lightBM, { loop: true }).to({ rotation: boxInfo.lightBM.rotation + 360 }, 10000);
                    egret.Tween.get(boxInfo.boxBM, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum2");
                    if (this.newCode == "3" || this.newCode == "4") {
                        boxInfo.rechargebg.setRes("acrechargetimebg");
                        boxInfo.boxBg.setRes("acrechargeboxview_redbg_" + this.typeCode);
                    }
                    else if (this.newCode == "5" || this.newCode == "18") {
                        if (boxCfg.needGem == "g6") {
                            boxInfo.boxBM.setRes("acrechargeboxview_box2_2_" + this.typeCode);
                        }
                        boxInfo.rechargebg.setRes("acrechargetimebg");
                    }
                    else if (this.newCode == "16" || this.newCode == "20" || this.newCode == "22") {
                        if (boxCfg.needGem == "g6") {
                            boxInfo.boxBM.setRes("acrechargeboxview_box2_2_" + this.typeCode);
                        }
                        else {
                            boxInfo.boxBM.setRes("acrechargeboxview_box2_" + this.typeCode);
                        }
                        boxInfo.rechargebg.setRes("public_9_bg88");
                    }
                }
                else {
                    egret.Tween.removeTweens(boxInfo.lightBM);
                    egret.Tween.removeTweens(boxInfo.boxBM);
                    boxInfo.lightBM.rotation = 0;
                    boxInfo.boxBM.rotation = 0;
                    boxInfo.lightBM.setVisible(false);
                    boxInfo.boxBM.setRes("acrechargeboxview_box1_" + this.typeCode);
                    boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [String(rechargeNum), String(boxCfg.limit)]);
                    if (this.newCode == "3" || this.newCode == "4") {
                        var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                        boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                        boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [String(num > 0 ? 0x21eb39 : 0xff3c3c), num.toString()]);
                        boxInfo.rechargebg.setRes("public_9_bg50");
                        boxInfo.boxBg.setRes("acrechargeboxview_whitebg_" + this.typeCode);
                    }
                    else if (this.newCode == "5") {
                        var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                        boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [num.toString()]);
                        if (boxCfg.needGem == "g6") {
                            boxInfo.boxBM.setRes("acrechargeboxview_box2_1_" + this.typeCode);
                        }
                        boxInfo.rechargebg.setRes("public_9_bg50");
                    }
                    else if (this.newCode == "16" || this.newCode == "18" || this.newCode == "20" || this.newCode == "22") {
                        if (boxCfg.needGem == "g6") {
                            boxInfo.boxBM.setRes("acrechargeboxview_box2_1_" + this.typeCode);
                        }
                        else {
                            boxInfo.boxBM.setRes("acrechargeboxview_box1_" + this.typeCode);
                        }
                        boxInfo.rechargebg.setRes("public_9_bg50");
                        var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                        boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [num.toString()]);
                    }
                    else if (this.newCode == "12" || this.newCode == "14") {
                        var num = Math.max(Number(boxCfg.limit) - rechargeNum, 0);
                        boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum-" + this.newCode, [num.toString()]);
                    }
                }
            }
            boxInfo.rechargebg.width = Math.max(boxInfo.rechargeTF.width + 40, 165);
            if (this.newCode == "1") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2, boxInfo.boxBg.y + boxInfo.boxBg.height - boxInfo.rechargeTF.height - 30);
            }
            else if (this.newCode == "4") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2, boxInfo.boxBg.y + boxInfo.boxBg.height + 2);
            }
            else if (this.newCode == "14") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2 - 2, boxInfo.boxBg.y + boxInfo.boxBg.height + 7);
            }
            else if (this.newCode == "16") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2, boxInfo.boxBg.y + boxInfo.boxBg.height + 10);
            }
            else if (this.newCode == "18") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2, boxInfo.boxBg.y + boxInfo.boxBg.height + 13);
            }
            else if (this.newCode == "20") {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2, boxInfo.boxBg.y + boxInfo.boxBg.height + boxInfo.rechargeTF.height + 9);
            }
            else {
                boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2 - 10, boxInfo.boxBg.y + boxInfo.boxBg.height + 10);
            }
            // boxInfo.rechargeTF.setPosition(boxInfo.boxBg.x + boxInfo.boxBg.width / 2 - boxInfo.rechargeTF.width / 2,boxInfo.boxBg.y + boxInfo.boxBg.height - boxInfo.rechargeTF.height - 20);
            boxInfo.rechargebg.setPosition(boxInfo.rechargeTF.x + boxInfo.rechargeTF.width / 2 - boxInfo.rechargebg.width / 2, boxInfo.rechargeTF.y + boxInfo.rechargeTF.height / 2 - boxInfo.rechargebg.height / 2);
        }
    };
    /**
     * 宝箱的点击事件
     */
    AcRechargeBoxView.prototype.boxClick = function (event, needGem) {
        ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXPOPUPVIEW, { "aid": this.aid, "code": this.code, "boxId": needGem });
    };
    AcRechargeBoxView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "common_9_bg", "tailor_get_light", "acrechargeboxview" + this.typeCode, "acwealthcarpview_servantskintxt",
            "acwealthcarpview_skineffect1", "acwealthcarpview_skineffect", "acrechargetimebg",
        ]);
    };
    AcRechargeBoxView.prototype.getRuleInfo = function () {
        if (this.newCode == "1") {
            return "acRechargeBoxRule";
        }
        else {
            return "acRechargeBoxRule_" + this.code;
        }
    };
    AcRechargeBoxView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.refreshView, this);
        this._topbg = null;
        this.boxInfoList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxView;
}(AcCommonView));
__reflect(AcRechargeBoxView.prototype, "AcRechargeBoxView");
//# sourceMappingURL=AcRechargeBoxView.js.map