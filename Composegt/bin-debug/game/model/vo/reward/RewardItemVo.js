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
         * 奖励物品类型：1 元宝  2 银两  3 粮食  4 士兵 5 政绩  6 道具  7 门客属性 8 门客  9亲密度 10红颜  11 称号  12红颜魅力 13 红颜经验值 14 门客书籍经验  15  门客技能经验 //1000开始客户端自用  1001 开服活动酒杯
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
        return _this;
    }
    RewardItemVo.prototype.initData = function (data) {
        var itemArr = data.split("_");
        this.type = Number(itemArr[0]);
        this.id = Number(itemArr[1]);
        this.num = Number(itemArr[2]);
        this._code = (itemArr[3]);
        var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
        this._tipName = "";
        if (this.type == 1) {
            this._name = LanguageManager.getlocal("gemName");
            this._icon = "itemicon1";
        }
        else if (this.type == 2) {
            this._name = LanguageManager.getlocal("itemName_2");
            this._icon = "itemicon2";
        }
        else if (this.type == 3) {
            this._name = LanguageManager.getlocal("itemName_3");
            this._icon = "itemicon3";
        }
        else if (this.type == 4) {
            this._name = LanguageManager.getlocal("itemName_4");
            this._icon = "itemicon4";
        }
        else if (this.type == 5) {
            this._name = LanguageManager.getlocal("itemName_5");
            this._icon = "itemicon5";
        }
        else if (this.type == 6) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
        }
        else if (this.type == 7) {
            if (this.id == 1) {
                this._name = LanguageManager.getlocal("playerview_forceAtt").replace(":  ", "");
            }
            else if (this.id == 2) {
                this._name = LanguageManager.getlocal("playerview_inteAtt").replace(":  ", "");
            }
            else if (this.id == 3) {
                this._name = LanguageManager.getlocal("playerview_policyAtt").replace(":  ", "");
            }
            else if (this.id == 4) {
                this._name = LanguageManager.getlocal("playerview_charmAtt").replace(":  ", "");
            }
            this._tipName = this._name;
        }
        else if (this.type == 8) {
            this._icon = "servant_half_" + this.id;
            this._name = LanguageManager.getlocal("servant_name" + this.id);
        }
        else if (this.type == 9) {
            this._name = LanguageManager.getlocal("rank_imacy");
            this._tipName = this._name;
        }
        else if (this.type == 10) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
                this._name = wifeCfg.name;
            }
        }
        else if (this.type == 11) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
            //自定义头像(7开头的itemid)走不同配置
            if (Math.floor(this.id / 1000) == 7) {
                itemCfg = Config.PortraitCfg.getPortraitCfgById(this.id);
            }
            else {
                itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
            }
        }
        else if (this.type == 12) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            this._name = LanguageManager.getlocal("wifeCharm").replace(" :", "");
            this._tipName = this._name;
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
            }
        }
        else if (this.type == 13) {
            this._name = LanguageManager.getlocal("wifeExp").replace(" :", "");
            this._tipName = this._name;
        }
        else if (this.type == 14) {
            if (this.id > 10) {
                var itemCfg_1 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_1.halfIcon;
            }
            else {
                this._icon = "itemicon14";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 15) {
            if (this.id > 10) {
                var itemCfg_2 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_2.halfIcon;
            }
            else {
                this._icon = "itemicon15";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 16) {
            var itemCfg_3 = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
            this._icon = itemCfg_3.icon;
            this._name = itemCfg_3.name;
        }
        else if (this.type == 17) {
            this._icon = "itemicon17";
            this._name = LanguageManager.getlocal("itemName_17");
        }
        else if (this.type == 19) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.id);
            this._icon = skincfg.icon;
            this._name = skincfg.getSkinName();
        }
        else if (this.type == 20) {
            // let itemCfg=Config.ServantskinCfg.getSkinIdByBid(this.id.toString());
            this._icon = "dragonboatitem" + this._code;
            this._name = LanguageManager.getlocal("DragonBoatZongziItem_" + this._code);
        }
        else if (this.type == 21) {
            // let itemCfg=Config.ServantskinCfg.getSkinIdByBid(this.id.toString());
            // this._icon = "acjadeview_item"+this._code;			
            // this._name = LanguageManager.getlocal("acJadeItem_"+this._code);
            this._icon = "acjadeview_item1";
            this._name = LanguageManager.getlocal("acJadeItem_1");
            if (this._code == "3") {
                this._icon = "acjadeview_item3";
                this._name = LanguageManager.getlocal("acJadeItem_3");
            }
        }
        else if (this.type == 22) {
            // let itemCfg=Config.ServantskinCfg.getSkinIdByBid(this.id.toString());
            this._icon = "acchristmasview_1_item";
            this._name = LanguageManager.getlocal("acChristmasItem_1");
        }
        else if (this.type == 23) {
            if (ResourceManager.hasRes("acspringouting_itemicon-" + this._code)) {
                this._icon = "acspringouting_itemicon-" + this._code;
            }
            else {
                this._icon = "acspringouting_itemicon-1";
            }
            if (LanguageManager.checkHasKey("acSpringOutingIconName-" + this._code)) {
                this._name = LanguageManager.getlocal("acSpringOutingIconName-" + this._code);
            }
            else {
                this._name = LanguageManager.getlocal("acSpringOutingIconName-1");
            }
        }
        else if (this.type == 24) {
            if (ResourceManager.hasRes("acseasidegame_itemicon-" + this._code)) {
                this._icon = "acseasidegame_itemicon-" + this._code;
            }
            else {
                this._icon = "acseasidegame_itemicon-1";
            }
            if (LanguageManager.checkHasKey("acseasidegameview_itemname-" + this._code)) {
                this._name = LanguageManager.getlocal("acseasidegameview_itemname-" + this._code);
            }
            else {
                this._name = LanguageManager.getlocal("acseasidegameview_itemname-1");
            }
        }
        else if (this.type == 25) {
            //代金券
            this._icon = this.id == 0 ? "" : "acsingleday_coupon_itemIcon";
            this._name = LanguageManager.getlocal("AcSingleDayCouponViewTitle");
        }
        else if (this.type == 27) {
            //天灯
            // this._icon = this.id == 0 ? "" : "acsingleday_coupon_itemIcon";	
            // this._name = LanguageManager.getlocal("AcSingleDayCouponViewTitle");	
            if (ResourceManager.hasRes("aclanternview_itemicon-" + this._code)) {
                this._icon = "aclanternview_itemicon-" + this._code;
            }
            else {
                this._icon = "aclanternview_itemicon-1";
            }
        }
        else if (this.type == 100) {
            this._icon = "servant_amulet_" + this.id;
            this._name = LanguageManager.getlocal("servant_amuletAura_" + this.id);
        }
        else if (this.type == 101) {
            this._icon = "itemicon101";
            this._name = LanguageManager.getlocal("itemDesc_101");
        }
        else if (this.type == 102) {
            this._icon = "itemicon102";
            this._name = LanguageManager.getlocal("itemName_102");
        }
        else if (this.type == 103) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            this._name = LanguageManager.getlocal("wifeArtistry").replace(" :", "");
            this._tipName = this._name;
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
            }
        }
        else if (this.type == 104 && this.id == 20801) {
            this._name = LanguageManager.getlocal("itemName_6201");
            this._icon = "itemicon6201";
        }
        this._quality = (itemCfg ? itemCfg.quality : 1);
        this._iconbg = "itembg_" + this._quality;
        //门客  红颜 设置品质
        if (this.type == 8) {
            this._quality = this.type;
        }
        else if (this.type == 10) {
            this._quality = this.type;
        }
        else if (this.type == 11) {
            this._quality = this.type;
        }
        else if (this.type == 16) {
            this._quality = this.type;
        }
        else if (this.type == 19) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.id);
            this._quality = this.type;
            this._iconbg = skincfg.iconBg;
        }
        else if (this.type == 1006) {
            this._icon = "acthrowarrowview_icon-" + this._code;
            this._name = LanguageManager.getlocal("acThrowArrowViewIconName-" + this._code);
        }
        else if (this.type == 1007) {
            this._icon = "ryeharvesticon1-" + this._code;
            this._name = LanguageManager.getlocal("acRyeHarvestViewIconName-" + this._code);
        }
        else if (this.type == 1008) {
            this._icon = "acarrowarrowicon-" + this.id;
            this._name = LanguageManager.getlocal("acArrowArrowicon-" + this.id);
        }
        else if (this.type == 1009) {
            this._icon = "chasebandit_icon-" + this._code;
            this._name = LanguageManager.getlocal("acChaseBanditIconName-" + this._code);
        }
        else if (this.type == 1010) {
            this._icon = "carnivalnight_icon-" + this._code;
            this._name = LanguageManager.getlocal("acCarnivalNightIconName-" + this._code);
        }
        else if (this.type == 1011) {
            this._icon = "merryxmas_icon-" + this._code;
            this._name = LanguageManager.getlocal("acMerryXmasIconName-" + this._code);
        }
        if (this.type == 8) {
            this._iconbg = "itembg_" + 7;
        }
        if (this.type == 14 || this.type == 15) {
            this._iconbg = "itembg_" + 1;
        }
        if (this.type == 25) {
            var iconbg = '';
            switch (this.id) {
                case 1:
                case 2:
                case 3:
                case 4:
                    iconbg = 'itembg_4';
                    break;
                case 5:
                case 6:
                    iconbg = 'itembg_5';
                    break;
                case 7:
                case 8:
                    iconbg = 'itembg_6';
                    break;
                default:
                    iconbg = 'itembg_1';
                    break;
            }
            this._iconbg = iconbg;
        }
        else if (this.type == 26) {
            this._icon = "betheking_horn";
            this._name = LanguageManager.getlocal("betheking_horn_name");
        }
        if (this.type == 100) {
            this._quality = 7;
            this._iconbg = "itembg_" + this._quality;
        }
        if (this.type == 101) {
            this._quality = 6;
            this._iconbg = "itembg_" + this._quality;
        }
        if (this.type == 102) {
            this._quality = 2;
            this._iconbg = "itembg_" + this._quality;
        }
        if (this.type == 201) {
            this._quality = 2;
            this._iconbg = "itembg_" + this._quality;
            this._icon = "monopoly_icon";
            this._name = LanguageManager.getlocal("monopoly_icon_name");
        }
        if (this.type == 1006) {
            this._iconbg = "itembg_7";
        }
        if (this.type == 1007) {
            this._iconbg = "itembg_7";
        }
        if (this.type == 1008) {
            this._iconbg = "itembg_7";
        }
    };
    RewardItemVo.prototype.getDescTxt = function (showEffectStr) {
        var descStr;
        if (showEffectStr) {
            descStr = App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"), TextFieldConst.COLOR_BROWN) + this.desc;
        }
        else {
            descStr = this.desc;
        }
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.lineSpacing = 2;
        return descTxt;
    };
    Object.defineProperty(RewardItemVo.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "quality", {
        get: function () {
            return this._quality;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "nameColor", {
        /**根据品质取颜色 */
        get: function () {
            var color = TextFieldConst.COLOR_QUALITY_WHITE;
            if (this._quality == 2) {
                color = TextFieldConst.COLOR_QUALITY_GREEN;
            }
            else if (this._quality == 3) {
                color = TextFieldConst.COLOR_QUALITY_BLUE;
            }
            else if (this._quality == 4) {
                color = TextFieldConst.COLOR_QUALITY_PURPLE;
            }
            else if (this._quality == 5) {
                color = TextFieldConst.COLOR_QUALITY_ORANGE;
            }
            else if (this._quality == 7) {
                color = 0xaea003;
            }
            return color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "icon", {
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
            var nn = String(this.num);
            if (this.type == 2 || this.type == 3 || this.type == 4) {
                nn = App.StringUtil.changeIntToText(this.num);
            }
            return this.name + (this.num < 0 ? nn : "+" + nn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "tipMessage", {
        get: function () {
            var nn = String(this.num);
            if (this.type == 2 || this.type == 3 || this.type == 4) {
                nn = App.StringUtil.changeIntToText(this.num);
            }
            return this._tipName + (this.num < 0 ? String(nn) : "+" + nn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "desc", {
        get: function () {
            var desc = "";
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 10) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = wifeCfg.name + "*1";
            }
            else if (this.type == 11) {
                var itemCfg = null;
                //自定义头像(7开头的itemid)走不同配置
                if (Math.floor(this.id / 1000) == 7) {
                    itemCfg = Config.PortraitCfg.getPortraitCfgById(this.id);
                }
                else {
                    itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                }
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 12) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = LanguageManager.getlocal("itemDesc_12", [wifeCfg.name]);
            }
            else if (this.type == 14) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_14", [itemCfg.name]);
            }
            else if (this.type == 15) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_15", [itemCfg.name]);
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                desc = itemCfg.desc2;
            }
            else if (this.type == 19) {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.id);
                desc = skincfg.getSkinDesc();
            }
            else if (this.type == 20) {
                desc = LanguageManager.getlocal("DragonBoatZongziItemDesc_" + this._code);
            }
            else if (this.type == 21) {
                desc = LanguageManager.getlocal("acJadeItemDesc_" + this._code);
            }
            else if (this.type == 100) {
                desc = LanguageManager.getlocal("servant_amuletAura_" + this.id + "_desc");
            }
            else if (this.type == 1006) {
                desc = LanguageManager.getlocal("acThrowArrowItemDesc-" + this._code);
            }
            else if (this.type == 1007) {
                desc = LanguageManager.getlocal("acRyeHarvestItemDesc-" + this._code);
            }
            else if (this.type == 1009) {
                desc = LanguageManager.getlocal("acChaseBanditItemDesc-" + this._code);
            }
            else if (this.type == 1010) {
                desc = LanguageManager.getlocal("acCarnivalNightItemDesc-" + this._code);
            }
            else if (this.type == 1011) {
                desc = LanguageManager.getlocal("acMerryXmasItemDesc-" + this._code);
            }
            else if (this.type == 104 && this.id == 20801) {
                desc = LanguageManager.getlocal("itemDesc_6201");
            }
            else {
                desc = LanguageManager.getlocal("itemDesc_" + this.type, [this.type == 25 ? this._code : '']);
            }
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "dropDesc", {
        get: function () {
            var dropDesc = "";
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 10) {
                dropDesc = LanguageManager.getlocal("wifeDropDesc_" + this.id);
            }
            else if (this.type == 11) {
                var itemCfg = null;
                //自定义头像(7开头的itemid)走不同配置
                if (Math.floor(this.id / 1000) == 7) {
                    itemCfg = Config.PortraitCfg.getPortraitCfgById(this.id);
                }
                else {
                    itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                }
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                dropDesc = itemCfg.dropDesc;
            }
            else if (this.type == 19) {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.id);
                dropDesc = skincfg.getSkinDropDesc();
            }
            else if (this.type == 20) {
                dropDesc = LanguageManager.getlocal("DragonBoatZongziDropDesc_" + this._code);
            }
            else if (this.type == 21) {
                dropDesc = LanguageManager.getlocal("acJadeDropDesc_" + this._code);
            }
            else if (this.type == 100) {
                dropDesc = LanguageManager.getlocal("servant_amuletAura_" + this.id + "_drop");
            }
            else if (this.type == 1006) {
                dropDesc = LanguageManager.getlocal("acThrowArrowDropDesc-" + this._code);
            }
            else if (this.type == 1007) {
                dropDesc = LanguageManager.getlocal("acRyeHarvestDropDesc-" + this._code);
            }
            else if (this.type == 1009) {
                dropDesc = LanguageManager.getlocal("acChaseBanditDropDesc-" + this._code);
            }
            else if (this.type == 1010) {
                dropDesc = LanguageManager.getlocal("acCarnivalNightDropDesc-" + this._code);
            }
            else if (this.type == 1011) {
                dropDesc = LanguageManager.getlocal("acMerryXmasDropDesc-" + this._code);
            }
            else if (this.type == 104 && this.id == 20801) {
                dropDesc = LanguageManager.getlocal("itemDropDesc_6201");
            }
            else {
                dropDesc = LanguageManager.getlocal("itemDropDesc_" + this.type);
            }
            return dropDesc;
        },
        enumerable: true,
        configurable: true
    });
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
    };
    return RewardItemVo;
}(BaseVo));
__reflect(RewardItemVo.prototype, "RewardItemVo");
