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
 选择对战信息列表
 * author qianjun---wxz
 */
var AcGroupWifeBattleSelectItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleSelectItem, _super);
    function AcGroupWifeBattleSelectItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleSelectItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleSelectItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_GROUPWIFEBATTLE;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleSelectItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleSelectItem.prototype.initItem = function (index, bData, itemparam) {
        var _this = this;
        this.width = 520;
        this.height = 120 + this.getSpaceY();
        // childInfo.total
        this._data = bData;
        this._code = itemparam;
        this._itemIndex = index;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height - this.getSpaceY();
        this.addChild(bg);
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChild(iconContainer);
        var headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic), bData.ptitle);
        iconContainer.addChild(headContainer);
        iconContainer.width = 103;
        iconContainer.height = 100;
        var nameStr = bData.name;
        this._nameTf = ComponentManager.getTextField(nameStr, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [iconContainer.x + iconContainer.width + 15, 15]);
        this.addChild(this._nameTf);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15, -1]);
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleSelectRank-" + this.getUiCode(), [bData.rank]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0, this._nameTf.textHeight + 17]);
        this.addChild(rankTxt);
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleSelectScore-" + this.getUiCode(), [bData.score]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0, rankTxt.textHeight + 8]);
        this.addChild(scoreTxt);
        var killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acGroupWifeBattleAvengerBtn", function () {
            if (!_this.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleNoAttend-" + _this.getUiCode()));
                return;
            }
            if (_this.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (_this.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE, { activeId: _this.vo.aidAndCode, fuid: bData.uid });
        }, this);
        killBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, killBtn, bg, [11, 15]);
        this.addChild(killBtn);
    };
    AcGroupWifeBattleSelectItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AcGroupWifeBattleSelectItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AcGroupWifeBattleSelectItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AcGroupWifeBattleSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcGroupWifeBattleSelectItem.prototype.dispose = function () {
        this._data = null;
        this._itemIndex = null;
        this._nameTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleSelectItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleSelectItem.js.map