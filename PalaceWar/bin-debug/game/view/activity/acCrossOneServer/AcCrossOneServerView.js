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
var AcCrossOneServerView = /** @class */ (function (_super) {
    __extends(AcCrossOneServerView, _super);
    function AcCrossOneServerView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossOneServerView.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossOneServerView.prototype.initView = function () {
        var _this = this;
        this.initServantImage();
        var _mask = BaseLoadBitmap.create("ac_crossoneserver_mask1");
        _mask.height = 275;
        this.addChildToContainer(_mask);
        _mask.y = GameConfig.stageHeigth - 166 - _mask.height;
        this._rankBtn = ComponentManager.getButton("ac_crossoneserver_rank1", "", this.onRankTap, this);
        this.addChildToContainer(this._rankBtn);
        this._rankBtn.setPosition(20, GameConfig.stageHeigth - 186 - this._rankBtn.height);
        this._taskBtn = ComponentManager.getButton("ac_crossoneserver_task1", "", this.onTaskTap, this);
        this.addChildToContainer(this._taskBtn);
        this._taskBtn.setPosition(GameConfig.stageWidth - this._taskBtn.width - 20, GameConfig.stageHeigth - 186 - this._taskBtn.height);
        var _bottomBg = BaseLoadBitmap.create("public_9_wordbg");
        _bottomBg.height = 166;
        this.addChildToContainer(_bottomBg);
        _bottomBg.y = GameConfig.stageHeigth - 166;
        this._djsLabel = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this._djsLabel.width = GameConfig.stageWidth;
        this._djsLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChildToContainer(this._djsLabel);
        this._djsLabel.setPosition(0, _bottomBg.y + 16);
        this._msgLabel = ComponentManager.getTextField(this.Vo.MsgText, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this._msgLabel.width = GameConfig.stageWidth - 32;
        this.addChildToContainer(this._msgLabel);
        this._msgLabel.setPosition(16, _bottomBg.y + 40);
        this._msgLabel.lineSpacing = 6;
        var groupLabel = ComponentManager.getTextField(this.Vo.getServerGroupText(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        groupLabel.width = GameConfig.stageWidth - 32;
        this.addChildToContainer(groupLabel);
        groupLabel.setPosition(16, _bottomBg.y + 46 + this._msgLabel.height);
        groupLabel.lineSpacing = 6;
        groupLabel.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "acCrossOneServerText27",
                msg: _this.Vo.getServerGroup(),
                handler: _this
            });
        }, this, null);
        this.refreshView();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
    };
    AcCrossOneServerView.prototype.refreshView = function () {
        if (this.Vo.TaskHasRewGet() && !this.Vo.isEnd) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
    };
    AcCrossOneServerView.prototype.initServantImage = function () {
        var _dragonPath = this.Vo.CurrServantDragon;
        if (Api.switchVoApi.checkCloseBone() || !RES.hasRes(_dragonPath + "_ske") || !App.CommonUtil.check_dragon()) {
            this._servantImg = BaseLoadBitmap.create(this.Vo.CurrServantImg);
            this._servantImg.width = 405;
            this._servantImg.height = 467;
            this._servantImg.anchorOffsetX = this._servantImg.width / 2;
            this._servantImg.anchorOffsetY = this._servantImg.height;
            this.addChildToContainer(this._servantImg);
            this._servantImg.x = GameConfig.stageWidth / 2;
            this._servantImg.y = GameConfig.stageHeigth - 166;
            this._servantImg.setScale(1.3);
        }
        else {
            this._servantDragon = App.DragonBonesUtil.getLoadDragonBones(_dragonPath);
            this._servantDragon.visible = true;
            this._servantDragon.anchorOffsetX = this._servantDragon.width / 2;
            this._servantDragon.anchorOffsetY = this._servantDragon.height;
            this.addChildToContainer(this._servantDragon);
            this._servantDragon.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 166);
            this._servantDragon.setScale(1.3);
        }
    };
    AcCrossOneServerView.prototype.onRankTap = function () {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKREWPOPUPVIEW, {
            aid: this.aid,
            code: this.code
        });
    };
    AcCrossOneServerView.prototype.onTaskTap = function () {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSTASKPOPUPVIEW, {
            aid: this.aid,
            code: this.code
        });
    };
    AcCrossOneServerView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        this.titleBgShadow.dispose();
    };
    AcCrossOneServerView.prototype.tick = function () {
        if (this.Vo.checkIsAtEndShowTime()) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSSONESERVER_END);
        }
        this._djsLabel.text = this.Vo.getAcCountDown();
    };
    AcCrossOneServerView.prototype.getBgName = function () {
        return "ac_crossoneserver_bg";
    };
    AcCrossOneServerView.prototype.getTitleBgName = function () {
        return "ac_crossoneserver_title";
    };
    AcCrossOneServerView.prototype.getTitlePic = function () {
        return "";
    };
    AcCrossOneServerView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossOneServerView.prototype.getRuleInfo = function () {
        return "acCrossOneServerRule";
    };
    AcCrossOneServerView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcCrossOneServerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_crossoneserver_rank1",
            "ac_crossoneserver_task1",
            "ac_crossoneserver_rank1_down",
            "ac_crossoneserver_task1_down",
            "ac_crossoneserver_mask1",
            "progress7",
            "progress7_bg"
        ]);
    };
    AcCrossOneServerView.prototype.dispose = function () {
        this._servantImg = null;
        this._servantDragon = null;
        this._rankBtn = null;
        this._taskBtn = null;
        this._djsLabel = null;
        this._msgLabel = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossOneServerView;
}(AcCommonView));
//# sourceMappingURL=AcCrossOneServerView.js.map