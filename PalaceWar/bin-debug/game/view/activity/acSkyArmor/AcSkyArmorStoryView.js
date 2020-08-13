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
/*
    author : wxz
    date : 2020/6/22
    desc : 天魔铠甲--吕布衣装
*/
var AcSkyArmorStoryView = /** @class */ (function (_super) {
    __extends(AcSkyArmorStoryView, _super);
    function AcSkyArmorStoryView() {
        return _super.call(this) || this;
    }
    AcSkyArmorStoryView.prototype.getBgName = function () {
        return "";
    };
    AcSkyArmorStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcSkyArmorStoryView.prototype.getTitleBgName = function () {
        return "";
    };
    AcSkyArmorStoryView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcSkyArmorStoryView.prototype.getRuleInfo = function () {
        return "";
    };
    AcSkyArmorStoryView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcSkyArmorStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcSkyArmorStoryView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat().concat(list);
    };
    AcSkyArmorStoryView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcSkyArmorStoryView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcSkyArmorStoryView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorStoryView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorStoryView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorStoryView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorStoryView.prototype.initView = function () {
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storybg", this.getTypeCode()));
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storybottombg", this.getTypeCode()));
        bottomBg.setPosition(bg.x + bg.width / 2 - bottomBg.width / 2, bg.y + bg.height - bottomBg.height);
        //衣装
        var skinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droIcon.setScale(1);
            droIcon.anchorOffsetY = droIcon.height;
            droIcon.anchorOffsetX = droIcon.width / 2;
            droIcon.x = bg.x + bg.width / 2 - 40;
            droIcon.y = bottomBg.y + 10;
            this.addChildToContainer(droIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 406;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(1);
            skinImg.x = bg.x + bg.width / 2;
            skinImg.y = bottomBg.y + 50;
            this.addChildToContainer(skinImg);
        }
        this.addChildToContainer(bottomBg);
        //name 
        var skinnamebg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_storynamebg", this.getTypeCode()));
        skinnamebg.height = 80;
        skinnamebg.setPosition(bg.x + 80, bg.y + 80);
        this.addChildToContainer(skinnamebg);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        // let skinName = ComponentManager.getTextField(skinCfg.name + " " + servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
        // skinName.setPosition(nameBg.x + 11 + 124/2 - skinName.width/2, nameBg.y + 19);
        // this.addChildToContainer(skinName);
        // let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        // skinnamebg.setPosition(bg.x+80, bg.y + 80);
        // this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 18);
        this.addChildToContainer(skinNameTxt);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 26);
        this.addChildToContainer(servantNameTxt);
        var skinDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorStoryInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinDesc.setPosition(bg.x + 107, bg.y + 639);
        skinDesc.width = 420;
        skinDesc.lineSpacing = 6;
        this.addChildToContainer(skinDesc);
        var con = this.vo.getAuraCon();
        con.x = skinDesc.x + skinDesc.width - con.width * con.scaleX / 2 - 15;
        con.y = skinDesc.y - con.height * con.scaleY - 20;
        this.addChildToContainer(con);
    };
    AcSkyArmorStoryView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorStoryView;
}(CommonView));
//# sourceMappingURL=AcSkyArmorStoryView.js.map