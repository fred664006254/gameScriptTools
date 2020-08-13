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
 * desc:跨服亲密活动首页
*/
var AcCrossServerIntimacyView = (function (_super) {
    __extends(AcCrossServerIntimacyView, _super);
    function AcCrossServerIntimacyView() {
        var _this = _super.call(this) || this;
        _this._canJoinImg = null;
        _this._cdTimeDesc = null;
        _this._cdType = 0; //倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
        _this._countDownText = null;
        _this._countDownTime = 0;
        _this._enterBtn = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            default:
                code = "1";
                if (this.vo.checkIsTianjiao()) {
                    code = "7";
                }
                break;
        }
        return code;
    };
    AcCrossServerIntimacyView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    AcCrossServerIntimacyView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        var arr = [];
        if (code == "7") {
            arr = ["crossserverintibg-" + code, "crossserverintidaizi-" + code, "crossserverintizhalan-" + code,
                "crossserverintibtn-" + code, "crossserverintitle-" + code, "crossserverinti_canjoin-" + code, "acwealthcarpview_servantskintxt",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "crossserverinti_canjoin-1", "crossserverinti_detailbg-1", "crossserverinti_enterin-1", "crossserverinti_enterin-1_down", "crossserverintibg-1",
            "public_9_wordbg2", this.getMyTitlePicStr(),
        ]).concat(arr);
    };
    AcCrossServerIntimacyView.prototype.initTitle = function () {
    };
    AcCrossServerIntimacyView.prototype.getBgName = function () {
        return "crossserverintibg-" + this.getUiCode();
    };
    AcCrossServerIntimacyView.prototype.getTitleStr = function () {
        return "atkracecross";
    };
    AcCrossServerIntimacyView.prototype.getMyTitlePicStr = function () {
        return App.CommonUtil.getCrossLeagueRes("crossserverintitle-" + this.getUiCode(), this.vo.isCrossLeague());
    };
    AcCrossServerIntimacyView.prototype.initView = function () {
        var _this = this;
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY, {});
        if (this.getUiCode() == "7") {
            //佳人衣装
            var skinId = this.vo.getShowSkinId();
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var skinBoneName = skinCfg.bone + "_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
                var skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                skin.anchorOffsetY = skin.height;
                skin.setScale(1.05);
                skin.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 310);
                this.addChildToContainer(skin);
            }
            else {
                var skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.setScale(1.1);
                skinImg.x = GameConfig.stageWidth / 2 - skinImg.width / 2;
                skinImg.y = GameConfig.stageHeigth - 340;
                this.addChildToContainer(skinImg);
            }
            //衣装预览
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(GameConfig.stageWidth / 2 - skinTxtEffect.width / 2, GameConfig.stageHeigth - 470);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChildToContainer(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            var alpha = BaseBitmap.create("public_alphabg");
            alpha.width = 160;
            alpha.height = 70;
            alpha.setPosition(skinTxt.x - alpha.width / 2, skinTxt.y - 40);
            this.addChildToContainer(alpha);
            alpha.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINTIMACYCHEERVIEW, { aid: _this.aid, code: _this.code });
            }, this);
            var uicode = this.getUiCode();
            var daizi = BaseBitmap.create("crossserverintidaizi-" + uicode);
            daizi.y = GameConfig.stageHeigth - 146 - daizi.height;
            var zhalan = BaseBitmap.create("crossserverintizhalan-" + uicode);
            zhalan.y = daizi.y - zhalan.height + 235;
            view.addChildToContainer(zhalan);
            view.addChildToContainer(daizi);
            var circle = new egret.Shape();
            circle.graphics.beginFill(0x542020, 1);
            circle.graphics.drawRect(zhalan.x, zhalan.y, zhalan.width, GameConfig.stageHeigth - 146 - zhalan.y);
            circle.graphics.endFill();
            this.addChild(circle);
            zhalan.mask = circle;
            var btn = ComponentManager.getButton("crossserverintibtn-" + uicode, '', function () {
                _this.enterInHandler();
            }, this);
            btn.setPosition(GameConfig.stageWidth / 2 - btn.width / 2, daizi.y + 3);
            view.addChildToContainer(btn);
        }
        //参赛资格
        var canJoin = this.vo.getIsCanJoin();
        view._canJoinImg = BaseLoadBitmap.create(App.CommonUtil.getCrossLeagueRes("crossserverinti_canjoin-" + this.getUiCode(), view.vo.isCrossLeague()));
        view._canJoinImg.visible = canJoin;
        view.addChildToContainer(view._canJoinImg);
        view._canJoinImg.y = -15;
        var title = BaseBitmap.create(this.getMyTitlePicStr());
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, 1);
        view.addChild(title);
        //底部
        var vo = view.vo;
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 146;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        if (this.getUiCode() == "7") {
            var rect = new egret.Shape();
            rect.graphics.beginFill(0x271918, 1);
            rect.graphics.drawRect(bottomBg.x, bottomBg.y, bottomBg.width, bottomBg.height);
            rect.graphics.endFill();
            this.addChildToContainer(rect);
        }
        view.addChildToContainer(bottomBg);
        //当前时间段
        view._cdType = vo.judgeTimeProcess();
        if (view._cdType > 0 && view._cdType < 4) {
            if (view._cdType == 1) {
                view._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
            }
            else if (view._cdType == 2) {
                view._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
            }
            else {
                view._countDownTime = vo.et - GameData.serverTime;
            }
            view.api.setCountDownTime(view._countDownTime);
        }
        view._enterBtn = ComponentManager.getButton("crossserverinti_enterin-" + view.getUiCode(), '', view.enterInHandler, this);
        if (view._cdType > 1 && view._cdType < 4) {
            view._enterBtn.setEnable(true);
        }
        else {
            //灰化
            view._enterBtn.setEnable(false);
        }
        //进入按钮
        view._enterBtn.setPosition(GameConfig.stageWidth / 2 - 208 / 2, bottomBg.y - 179 - 5);
        view.addChildToContainer(this._enterBtn);
        //活动时间
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 10;
        timeDesc.y = bottomBg.y + 20;
        view.addChildToContainer(timeDesc);
        //活动倒计时时间
        view._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._cdTimeDesc.x = timeDesc.x;
        view._cdTimeDesc.y = timeDesc.y + timeDesc.textHeight + 5;
        view.addChildToContainer(this._cdTimeDesc);
        if (view._countDownTime > 0) {
            view._countDownText = ComponentManager.getTextField(view.vo.getCountTimeStr(view._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
            view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth, this._cdTimeDesc.y);
            view.addChildToContainer(view._countDownText);
        }
        //规则描述
        var ruleDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("crossIntimacyRule-" + view.getUiCode(), this.vo.isCrossLeague())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDesc.width = GameConfig.stageWidth - 20;
        ruleDesc.lineSpacing = 6;
        ruleDesc.x = timeDesc.x;
        ruleDesc.y = view._cdTimeDesc.y + view._cdTimeDesc.textHeight + 5;
        view.addChildToContainer(ruleDesc);
    };
    AcCrossServerIntimacyView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(this.getBgName()); //App.CommonUtil.getCrossLeagueRes(bgName,this.vo.isCrossLeague())
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = 0;
        }
    };
    AcCrossServerIntimacyView.prototype.tick = function () {
        var view = this;
        if (view._countDownText) {
            --view._countDownTime;
            view.api.setCountDownTime(view._countDownTime);
            view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
            if (view._countDownTime <= 0) {
                view._cdType = view.vo.judgeTimeProcess();
                if (view._cdType == 2) {
                    view._enterBtn.setEnable(true);
                    view._countDownTime = view.vo.et - 86400 - GameData.serverTime;
                }
                else if (view._cdType == 3) {
                    view._countDownTime = view.vo.et - GameData.serverTime;
                }
                else if (view._cdType == 4) {
                    view._enterBtn.setEnable(false);
                    view.hide();
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
                view.api.setCountDownTime(view._countDownTime);
                view._cdTimeDesc.text = LanguageManager.getlocal("crossIntimacyCDTime" + view._cdType);
                view._countDownText.text = view.vo.getCountTimeStr(view._countDownTime);
                view._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth, this._cdTimeDesc.y);
            }
        }
    };
    AcCrossServerIntimacyView.prototype.enterInHandler = function () {
        var view = this;
        if (view._cdType > 1 && view._cdType < 4) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERINTIMACYENTERVIEW, {
                aid: this.aid,
                code: this.code,
                getUiCode: this.getUiCode()
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime0"));
        }
    };
    AcCrossServerIntimacyView.prototype.dispose = function () {
        var view = this;
        view._canJoinImg = null;
        view._cdTimeDesc = null;
        view._enterBtn.removeTouchTap();
        view._enterBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyView;
}(AcCommonView));
__reflect(AcCrossServerIntimacyView.prototype, "AcCrossServerIntimacyView");
//# sourceMappingURL=AcCrossServerIntimacyView.js.map