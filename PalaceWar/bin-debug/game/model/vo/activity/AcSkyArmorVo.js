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
var AcSkyArmorVo = /** @class */ (function (_super) {
    __extends(AcSkyArmorVo, _super);
    function AcSkyArmorVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.isfree = 0;
        _this.v = 0;
        _this.buyGem = 0;
        return _this;
    }
    AcSkyArmorVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcSkyArmorVo.prototype.showExchangeWifeDot = function () {
        var str = this.cfg.change.needItem;
        var itemVo = GameData.formatRewardItem(str)[0];
        var itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        var currNum = 0;
        if (itemData) {
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num) {
            return true;
        }
        return false;
    };
    AcSkyArmorVo.prototype.getWifeNeed = function () {
        var change = this.cfg.change.needItem;
        return parseInt(change.split("_")[2]);
    };
    Object.defineProperty(AcSkyArmorVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorVo.prototype.getSortAchievementCfg = function (isSort) {
        if (isSort === void 0) { isSort = true; }
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getAchieveNum() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        if (isSort) {
            data.sort(function (a, b) { return a.sortId - b.sortId; });
        }
        else {
            data.sort(function (a, b) { return a.id - b.id; });
        }
        return data;
    };
    //是否已领取进度奖励
    AcSkyArmorVo.prototype.isGetAchievementById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcSkyArmorVo.prototype.getProcess = function () {
        return this.v;
    };
    AcSkyArmorVo.prototype.getAchieveNum = function () {
        var num = 0;
        if (this.ainfo && this.ainfo.v) {
            num = this.ainfo.v;
        }
        return num;
    };
    AcSkyArmorVo.prototype.isShowAchieveDot = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(String(data[i].id))) {
                if (this.getAchieveNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    AcSkyArmorVo.prototype.getAchRewardNum = function () {
        var data = this.cfg.getAchieveList();
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                count++;
            }
        }
        return count;
    };
    AcSkyArmorVo.prototype.getAchieveStatus = function (i) {
        var data = this.cfg.getAchieveList();
        data.sort(function (a, b) {
            return a.id - b.id;
        });
        if (!this.isGetAchievementById(String(data[i].id))) {
            if (this.getAchieveNum() >= data[i].needNum) {
                return 2;
            }
            else {
                return 1;
            }
        }
        return 3;
    };
    Object.defineProperty(AcSkyArmorVo.prototype, "isShowRedDot", {
        get: function () {
            var b = this.isShowAchieveDot() || this.showExchangeWifeDot();
            if (b) {
                return b;
            }
            if (!this.checkIsInEndShowTime()) {
                return this.v > 0 || this.isfree > 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcSkyArmorVo.prototype.getAuraCon = function () {
        var _this = this;
        var con = new BaseDisplayObjectContainer();
        var texticon = BaseBitmap.create("acskyarmor_aura");
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        var icon = BaseBitmap.create("servant_aura_Icon" + servantSkinCfg.specialAuraCfg.auraIcon);
        icon.touchEnabled = true;
        icon.addTouchTap(function (event) {
            ViewController.getInstance().openView(ViewConst.POPUP.SKINAURAINFOPOPUPVIEW, _this.cfg.show);
        }, this);
        con.addChild(texticon);
        con.addChild(icon);
        icon.setPosition(0, 0);
        texticon.setPosition(icon.x + icon.width / 2 - texticon.width / 2, icon.y + icon.height + 5);
        var effect = ComponentManager.getCustomMovieClip("acskyarmor_titleeff", 10, 150);
        effect.width = 257;
        effect.height = 257;
        effect.x = icon.width / 2 - effect.width / 2;
        effect.y = icon.height / 2 - effect.height / 2;
        effect.playWithTime(-1);
        con.addChild(effect);
        effect.blendMode = egret.BlendMode.ADD;
        con.width = icon.width;
        con.height = texticon.y + texticon.height;
        con.setScale(0.8);
        return con;
    };
    AcSkyArmorVo.prototype.dispose = function () {
        this.ainfo = null;
        this.isfree = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorVo;
}(AcBaseVo));
//# sourceMappingURL=AcSkyArmorVo.js.map