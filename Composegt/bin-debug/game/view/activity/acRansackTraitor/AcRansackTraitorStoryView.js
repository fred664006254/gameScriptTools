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
 * 20190401
 * 奸臣皮肤兑换
 */
var AcRansackTraitorStoryView = (function (_super) {
    __extends(AcRansackTraitorStoryView, _super);
    function AcRansackTraitorStoryView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        return _this;
    }
    AcRansackTraitorStoryView.prototype.decode = function () {
        switch (String(this.param.data.code)) {
            case "1":
                return "1";
            case "2":
                return "2";
            case "3":
                return "3";
            case "4":
                return "4";
            case "5":
                return "1";
            case "6":
                return "2";
            case "7":
                return "3";
            case "8":
                return "4";
        }
    };
    AcRansackTraitorStoryView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = acvo.config;
        var skinId = cfg.getRewardSkinId();
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var sercfg = Config.ServantCfg.getServantItemById(skincfg.servantId);
        var topbg = BaseBitmap.create("ransackTraitor_bg5");
        var topbg2 = BaseBitmap.create("ransackTraitor_bg3");
        topbg.x = GameConfig.stageWidth / 2 - topbg.width / 2;
        topbg2.x = GameConfig.stageWidth / 2 - topbg2.width / 2 * topbg.scaleX;
        if (GameConfig.stageHeigth <= 960) {
            // topbg2.setScale(0.9);
            topbg.y = 0;
            topbg2.y = topbg.y + topbg.height * topbg.scaleX - 10;
        }
        else {
            topbg.y = 30;
            topbg2.y = topbg.y + topbg.height + 30;
        }
        this.addChildToContainer(topbg);
        this.addChildToContainer(topbg2);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        searchtxt1.text = LanguageManager.getlocal("acRansackTraitor_storybgtxt" + this.decode());
        searchtxt1.multiline = true;
        searchtxt1.lineSpacing = 3;
        searchtxt1.width = topbg.width - 140;
        searchtxt1.y = topbg.y + 80;
        searchtxt1.x = topbg.x + topbg.width / 2 - searchtxt1.width / 2;
        this.addChildToContainer(searchtxt1);
        var txt1 = BaseBitmap.create("ransackTraitor_txt4");
        txt1.x = topbg2.x + topbg2.width / 2 - txt1.width / 2;
        txt1.y = topbg2.y + 30;
        this.addChildToContainer(txt1);
        var servantFullImg = BaseLoadBitmap.create(skincfg.body);
        servantFullImg.width = 640 * topbg2.scaleY;
        servantFullImg.height = 482 * topbg2.scaleY;
        servantFullImg.anchorOffsetY = servantFullImg.height;
        servantFullImg.x = GameConfig.stageWidth / 2 - servantFullImg.width / 2;
        this.addChildToContainer(servantFullImg);
        var posY = topbg2.y + topbg2.height * topbg2.scaleY - 10;
        servantFullImg.y = posY;
        // this.showDBDragon(skincfg,posY);
        var namebg = BaseBitmap.create("ransackTraitor_namebg2");
        namebg.x = topbg2.x + 10;
        namebg.y = txt1.y + txt1.height + 40;
        this.addChildToContainer(namebg);
        var nametxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt.text = sercfg.name;
        nametxt.y = namebg.y + 35;
        nametxt.x = namebg.x + namebg.width / 2 - nametxt.width / 2;
        this.addChildToContainer(nametxt);
        var flag = BaseBitmap.create("ransackTraitor_flag");
        flag.x = topbg2.x + topbg2.width * topbg2.scaleY - flag.width;
        flag.y = topbg2.y + topbg2.height * topbg2.scaleY - flag.height - 8;
        this.addChildToContainer(flag);
        this.addTouchTap(this.hide, this);
    };
    AcRansackTraitorStoryView.prototype.showDBDragon = function (serSkincfg, posY) {
        var dagonBonesName = undefined;
        if (serSkincfg && serSkincfg.bone) {
            dagonBonesName = serSkincfg.bone;
        }
        var boneName = dagonBonesName + "_ske";
        if (!Api.switchVoApi.checkServantCloseBone() && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._skinImg) {
                this._skinImg.visible = false;
            }
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(0.8);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2 * this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth / 2;
            this._droWifeIcon.y = posY;
            // this._droWifeIcon.mask = new egret.Rectangle(0,0,this._droWifeIcon.width,)
            this.addChildToContainer(this._droWifeIcon);
        }
        else {
            if (!this._skinImg) {
                var skinW = 640;
                var skinH = 482;
                var tarScale = 1.0;
                var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
                var skinImgPath = serCfg.fullIcon;
                this._skinImg = BaseLoadBitmap.create(skinImgPath);
                this._skinImg.width = skinW;
                this._skinImg.height = skinH;
                this._skinImg.setScale(tarScale);
                this._skinImg.anchorOffsetY = this._skinImg.height;
                this._skinImg.anchorOffsetX = this._skinImg.width / 2;
                this._skinImg.x = GameConfig.stageWidth / 2;
                this._skinImg.y = posY;
                this.addChildToContainer(this._skinImg);
            }
        }
    };
    AcRansackTraitorStoryView.prototype.getBgName = function () {
        return null;
    };
    AcRansackTraitorStoryView.prototype.getResourceList = function () {
        return [];
    };
    AcRansackTraitorStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcRansackTraitorStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcRansackTraitorStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcRansackTraitorStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcRansackTraitorStoryView.prototype.dispose = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorStoryView;
}(AcCommonView));
__reflect(AcRansackTraitorStoryView.prototype, "AcRansackTraitorStoryView");
