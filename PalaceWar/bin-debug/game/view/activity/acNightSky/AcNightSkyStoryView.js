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
* 夜观天象
* date 2020.6.15
* author ycg
* @name AcNightSkyStoryView
*/
var AcNightSkyStoryView = (function (_super) {
    __extends(AcNightSkyStoryView, _super);
    function AcNightSkyStoryView() {
        return _super.call(this) || this;
    }
    AcNightSkyStoryView.prototype.getBgName = function () {
        return "";
    };
    AcNightSkyStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcNightSkyStoryView.prototype.getTitleBgName = function () {
        return "";
    };
    AcNightSkyStoryView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNightSkyStoryView.prototype.getRuleInfo = function () {
        return "";
    };
    AcNightSkyStoryView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcNightSkyStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcNightSkyStoryView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat().concat(list);
    };
    AcNightSkyStoryView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcNightSkyStoryView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcNightSkyStoryView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyStoryView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyStoryView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyStoryView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyStoryView.prototype.initView = function () {
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storybg", this.getTypeCode()));
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storybottombg", this.getTypeCode()));
        // bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2 - (bottomBg.height - 130)/2);
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
            droIcon.x = bg.x + bg.width / 2;
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
        var nameBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_storynamebg", this.getTypeCode()));
        nameBg.setPosition(bg.x + 80, bg.y + 80);
        this.addChildToContainer(nameBg);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var skinName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinName.setPosition(nameBg.x + 11 + 124 / 2 - skinName.width / 2, nameBg.y + 19);
        this.addChildToContainer(skinName);
        var skinDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyStoryInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinDesc.setPosition(bg.x + 107, bg.y + 639);
        skinDesc.width = 420;
        skinDesc.lineSpacing = 6;
        this.addChildToContainer(skinDesc);
    };
    AcNightSkyStoryView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNightSkyStoryView;
}(CommonView));
__reflect(AcNightSkyStoryView.prototype, "AcNightSkyStoryView");
//# sourceMappingURL=AcNightSkyStoryView.js.map