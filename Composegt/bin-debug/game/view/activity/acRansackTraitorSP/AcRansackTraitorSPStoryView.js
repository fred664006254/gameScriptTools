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
var AcRansackTraitorSPStoryView = (function (_super) {
    __extends(AcRansackTraitorSPStoryView, _super);
    function AcRansackTraitorSPStoryView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        return _this;
    }
    AcRansackTraitorSPStoryView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = acvo.config;
        // let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        // let sercfg = Config.ServantCfg.getServantItemById(skincfg.servantId);
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
        searchtxt1.text = LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_storybgtxt" + this.param.data.code));
        searchtxt1.multiline = true;
        searchtxt1.lineSpacing = 3;
        searchtxt1.width = topbg.width - 140;
        searchtxt1.y = topbg.y + topbg.height / 2 - searchtxt1.height / 2; //topbg.y + 80;
        searchtxt1.x = topbg.x + topbg.width / 2 - searchtxt1.width / 2;
        this.addChildToContainer(searchtxt1);
        var txt1 = BaseBitmap.create("ransackTraitor_txt4");
        txt1.x = topbg2.x + topbg2.width / 2 - txt1.width / 2;
        txt1.y = topbg2.y + 30;
        this.addChildToContainer(txt1);
        var servantFullImg = BaseLoadBitmap.create("ransackTraitorSP_fourman");
        servantFullImg.width = 539;
        servantFullImg.height = 495;
        servantFullImg.anchorOffsetY = servantFullImg.height;
        servantFullImg.x = GameConfig.stageWidth / 2 - servantFullImg.width / 2;
        this.addChildToContainer(servantFullImg);
        var posY = topbg2.y + topbg2.height * topbg2.scaleY - 10;
        servantFullImg.y = posY;
        // this.showDBDragon(skincfg,posY);
        // let namebg1 = BaseBitmap.create("ransackTraitorSP_namebg");
        // namebg1.x = topbg2.x + 66 ;
        // namebg1.y = topbg2.y + 175;
        // this.addChildToContainer(namebg1);
        // let namebg2 = BaseBitmap.create("ransackTraitorSP_namebg");
        // namebg2.x = topbg2.x + 2 ;
        // namebg2.y = topbg2.y + 460;
        // this.addChildToContainer(namebg2);
        // let namebg3 = BaseBitmap.create("ransackTraitorSP_namebg");
        // namebg3.x = topbg2.x + 393 ;
        // namebg3.y = topbg2.y + 400;
        // this.addChildToContainer(namebg3);
        // let namebg4 = BaseBitmap.create("ransackTraitorSP_namebg");
        // namebg4.x = topbg2.x + 240 ;
        // namebg4.y = topbg2.y + 573;
        // this.addChildToContainer(namebg4);
        var namebg1 = BaseBitmap.create("ransackTraitorSP_namebg");
        namebg1.x = topbg2.x + 2;
        namebg1.y = topbg2.y + 460;
        this.addChildToContainer(namebg1);
        var namebg2 = BaseBitmap.create("ransackTraitorSP_namebg");
        namebg2.x = topbg2.x + 240;
        namebg2.y = topbg2.y + 573;
        this.addChildToContainer(namebg2);
        var namebg3 = BaseBitmap.create("ransackTraitorSP_namebg");
        namebg3.x = topbg2.x + 66;
        namebg3.y = topbg2.y + 175;
        this.addChildToContainer(namebg3);
        var namebg4 = BaseBitmap.create("ransackTraitorSP_namebg");
        namebg4.x = topbg2.x + 393;
        namebg4.y = topbg2.y + 400;
        this.addChildToContainer(namebg4);
        var nametxt1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_storyName1")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt1.x = namebg1.x + namebg1.width / 2 - nametxt1.width / 2;
        nametxt1.y = namebg1.y + namebg1.height / 2 - nametxt1.height / 2;
        this.addChildToContainer(nametxt1);
        var nametxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_storyName2")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt2.x = namebg2.x + namebg2.width / 2 - nametxt2.width / 2;
        nametxt2.y = namebg2.y + namebg2.height / 2 - nametxt2.height / 2;
        this.addChildToContainer(nametxt2);
        var nametxt3 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_storyName3")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt3.x = namebg3.x + namebg3.width / 2 - nametxt3.width / 2;
        nametxt3.y = namebg3.y + namebg3.height / 2 - nametxt3.height / 2;
        this.addChildToContainer(nametxt3);
        var nametxt4 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_storyName4")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt4.x = namebg4.x + namebg4.width / 2 - nametxt4.width / 2;
        nametxt4.y = namebg4.y + namebg4.height / 2 - nametxt4.height / 2;
        this.addChildToContainer(nametxt4);
        var flag = BaseBitmap.create("ransackTraitor_flag");
        flag.x = topbg2.x + topbg2.width * topbg2.scaleY - flag.width;
        flag.y = topbg2.y + topbg2.height * topbg2.scaleY - flag.height - 8;
        this.addChildToContainer(flag);
        this.addTouchTap(this.hide, this);
    };
    AcRansackTraitorSPStoryView.prototype.showDBDragon = function (serSkincfg, posY) {
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
    AcRansackTraitorSPStoryView.prototype.getBgName = function () {
        return null;
    };
    AcRansackTraitorSPStoryView.prototype.getResourceList = function () {
        return [];
    };
    AcRansackTraitorSPStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcRansackTraitorSPStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcRansackTraitorSPStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcRansackTraitorSPStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcRansackTraitorSPStoryView.prototype.dispose = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorSPStoryView;
}(AcCommonView));
__reflect(AcRansackTraitorSPStoryView.prototype, "AcRansackTraitorSPStoryView");
