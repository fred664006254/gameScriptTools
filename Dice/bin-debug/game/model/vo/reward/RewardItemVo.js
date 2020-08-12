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
 * 奖励物品vo
 * author dmj
 * date 2017/9/26
 * @class RewardItemVo
 */
var RewardItemVo = (function (_super) {
    __extends(RewardItemVo, _super);
    function RewardItemVo() {
        var _this = _super.call(this) || this;
        /**
         * 后续纯前端用的type直接从1001开始，前后端约定好的才继续使用type+1规范，必须添加注释
         * 奖励物品类型：1钻石 2金币 1001奖杯 50宝箱 100骰子
         *
         */
        _this.type = 0;
        /**
         * 物品id
         */
        _this.id = 0;
        /**
         * 数量
         */
        _this.num = 0;
        _this._name = "";
        _this._tipName = "";
        _this._desc = "";
        _this._icon = "";
        _this._iconbg = "";
        // 品质
        _this._quality = 1;
        _this._code = "";
        _this._dropId = "";
        _this.target = 0;
        _this.targetId = 0;
        _this.getRewards = null;
        //奖励数组中原始排序，用于礼包领取
        _this.originalIdx = 0;
        return _this;
    }
    RewardItemVo.prototype.initData = function (data) {
        var itemArr = data.split("_");
        this.type = Number(itemArr[0]);
        this.id = Number(itemArr[1]);
        this.num = Number(itemArr[2]);
        this._code = (itemArr[3]);
        switch (this.type) {
            case 1001:
                this._name = LangMger.getlocal("sysscore");
                this._icon = "trophy_icon";
                break;
            case 100:
                this._name = LangMger.getlocal("dice" + this.id + "_name");
                this._icon = Config.DiceCfg.getIconById(this.id.toString());
                break;
            case 1:
                this._name = LangMger.getlocal("shopitemtypegem");
                this._icon = "item1";
                break;
            case 2:
                this._name = LangMger.getlocal("shopitemtypegold");
                this._icon = "item2";
                break;
            case 50:
                var boxcfg = Config.BoxCfg.getBoxCfgById(this.id.toString());
                if (boxcfg) {
                    this._name = boxcfg.name;
                    this._icon = boxcfg.icon;
                }
                break;
        }
    };
    Object.defineProperty(RewardItemVo.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "icon", {
        /**根据品质取颜色 */
        // public get nameColor():number
        // {
        // 	let color:number = GameConfig.getQualityColor(this._quality);
        // 	return color;
        // }
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "iconBg", {
        get: function () {
            return this._iconbg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "message", {
        get: function () {
            return this.name + (this.num < 0 ? this.num : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "tipMessage", {
        get: function () {
            return this._tipName + (this.num < 0 ? String(this.num) : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "desc", {
        get: function () {
            var desc = '';
            if (this.type == 100) {
                desc = LangMger.getlocal("diceDesc_" + this.id);
            }
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "dropDesc", {
        get: function () {
            var desc = '';
            if (this.type == 100) {
                desc = LangMger.getlocal("diceDropDesc_" + this.id);
            }
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "itemType", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    RewardItemVo.prototype.getDescTxt = function (showEffectStr) {
        var descStr;
        if (showEffectStr) {
            descStr = App.StringUtil.formatStringColor(LangMger.getlocal("effectTitle"), ColorEnums.black) + this.desc;
        }
        else {
            descStr = this.desc;
        }
        var descTxt = ComponentMgr.getTextField(descStr, TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.black);
        descTxt.lineSpacing = 2;
        return descTxt;
    };
    RewardItemVo.prototype.dispose = function () {
        this.type = 0;
        this.id = 0;
        this.num = 0;
        this._name = "";
        this._tipName = "";
        this._desc = "";
        this._icon = "";
        this._iconbg = "";
        this._quality = 1;
        this.target = 0;
        this.targetId = 0;
        this.getRewards = null;
        this.originalIdx = 0;
    };
    return RewardItemVo;
}(BaseVo));
__reflect(RewardItemVo.prototype, "RewardItemVo");
//# sourceMappingURL=RewardItemVo.js.map