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
 * 奖励
 * author sl
 * date 2020.7.16
 * @class BirdBridgeChooseView
 */
var BirdBridgeChooseView = /** @class */ (function (_super) {
    __extends(BirdBridgeChooseView, _super);
    function BirdBridgeChooseView() {
        var _this = _super.call(this) || this;
        _this._selectId = 0;
        _this._rewardNodeTab = [];
        return _this;
    }
    BirdBridgeChooseView.prototype.getTitleStr = function () {
        return "chooseReward";
    };
    BirdBridgeChooseView.prototype.getResourceList = function () {
        var code = this.param.data.uicode;
        var list = [
            "birdbridge_got-" + code, "birdbridge_kuang1-" + code, "birdbridge_got-" + code, "birdbridge_light1-" + code
        ];
        return _super.prototype.getResourceList.call(this).concat(list);
    };
    BirdBridgeChooseView.prototype.getTypeCode = function () {
        return this.param.data.uicode;
    };
    Object.defineProperty(BirdBridgeChooseView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BirdBridgeChooseView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BirdBridgeChooseView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BirdBridgeChooseView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    BirdBridgeChooseView.prototype.initView = function () {
        var _this = this;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 660;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this.addChildToContainer(bg);
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, bg.height - 8);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        this.addChildToContainer(scrollView);
        scrollView.setPosition(bg.x, bg.y + 4);
        scrollView.horizontalScrollPolicy = "off";
        var code = this.param.data.uicode;
        var cfgs = this.cfg.wish;
        if (this.vo.winfo.idx && this.vo.isWishMaxById(this.vo.winfo.idx) == false) {
            this._selectId = this.vo.winfo.idx;
        }
        for (var i = 0; i < cfgs.length; i++) {
            var onecfg = cfgs[i];
            var wishNum = this.vo.getWishValueById(onecfg.id);
            var gotNum = this.vo.getWishGotTimesById(onecfg.id);
            var oneNode = new BirdBridgeChooseIcon();
            oneNode.init(cfgs[i], gotNum, wishNum, code, this.chooseHandle, this);
            scrollContiner.addChild(oneNode);
            this._rewardNodeTab.push(oneNode);
            oneNode.setPosition(3 + i % 3 * 176, Math.floor(i / 3) * 260);
            if (onecfg.id == this._selectId) {
                oneNode.setSelect(true);
            }
        }
        if (this._selectId == 0) {
            for (var i = 0; i < this._rewardNodeTab.length; i++) {
                var id = this._rewardNodeTab[i].cfg.id;
                if (this.vo.isWishMaxById(id) == false) {
                    this._selectId = id;
                    break;
                }
            }
        }
        for (var i = 0; i < this._rewardNodeTab.length; i++) {
            var id = this._rewardNodeTab[i].cfg.id;
            this._rewardNodeTab[i].setSelect(id == this._selectId);
        }
        var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "adultChoose", function () {
            _this.hide();
        }, this);
        reviceBtn.setPosition(bg.x + bg.width / 2 - reviceBtn.width / 2, bg.y + bg.height + 12);
        this.addChildToContainer(reviceBtn);
    };
    BirdBridgeChooseView.prototype.chooseHandle = function (icon) {
        if (this._selectId == icon.cfg.id) {
            return;
        }
        this._selectId = icon.cfg.id;
        for (var i = 0; i < this._rewardNodeTab.length; i++) {
            var id = this._rewardNodeTab[i].cfg.id;
            this._rewardNodeTab[i].setSelect(id == this._selectId);
        }
    };
    BirdBridgeChooseView.prototype.hide = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            _super.prototype.hide.call(this);
            return;
        }
        if (this.vo.isInActivity() && this._selectId && this._selectId != this.vo.winfo.idx) {
            NetManager.request(NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH, { activeId: this.vo.aidAndCode, rkey: this._selectId });
        }
        _super.prototype.hide.call(this);
    };
    BirdBridgeChooseView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    BirdBridgeChooseView.prototype.dispose = function () {
        this._rewardNodeTab.length = 0;
        this._selectId = 0;
        _super.prototype.dispose.call(this);
    };
    return BirdBridgeChooseView;
}(PopupView));
//# sourceMappingURL=BirdBridgeChooseView.js.map