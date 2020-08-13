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
 * 	神器预览
 * author ycg
 * date 2019.8.1
 * @class AcWeaponMazeDetailPopupViewTab4
 */
var AcWeaponMazeDetailPopupViewTab4 = (function (_super) {
    __extends(AcWeaponMazeDetailPopupViewTab4, _super);
    function AcWeaponMazeDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._weaponIds = null;
        _this._curIdx = 0;
        _this._infoContaioner = null;
        _this._isPlaying = false;
        _this._showContaioner = null;
        _this._arrowLeft = null;
        _this._arrowRight = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeDetailPopupViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        return this.code;
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.initView = function () {
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        this._bg = rewardBg;
        if (!this.cfg.coreReward1) {
            var bgStr = "servantweaponshowbg"; //acchristmasview_rewardmidbg_4 544 400
            var bg = BaseBitmap.create(bgStr);
            bg.setPosition(rewardBg.x, rewardBg.y + 1);
            this.addChild(bg);
            var bgMask = new egret.Rectangle(11, 0, 522, bg.height);
            bg.mask = bgMask;
            bg.x = rewardBg.x - 6;
            var rect = new egret.Rectangle(0, 0, 544, 364);
            var maskContaner = new BaseDisplayObjectContainer();
            maskContaner.width = 544;
            maskContaner.height = 400;
            maskContaner.mask = rect;
            maskContaner.setPosition(bg.x + bg.width / 2 - maskContaner.width / 2, bg.y + 30);
            this.addChild(maskContaner);
            var topbg = BaseBitmap.create("ackite_skintopbg");
            topbg.setPosition(rewardBg.x + rewardBg.width / 2 - topbg.width / 2, rewardBg.y + 1);
            this.addChild(topbg);
            var topbgLine = BaseBitmap.create("ackite_skintopline");
            topbgLine.setPosition(topbg.x + topbg.width / 2 - topbgLine.width / 2, topbg.y + topbg.height - 1);
            this.addChild(topbgLine);
            var clip = ComponentManager.getCustomMovieClip("destorysameshenqitexiao", 20);
            clip.width = 250;
            clip.height = 250;
            clip.anchorOffsetX = clip.width / 2;
            clip.anchorOffsetY = clip.height / 2;
            this.addChild(clip);
            clip.setScale(2);
            clip.playWithTime(-1);
            var weaponId = this.cfg.coreReward;
            var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(weaponId);
            var coreNeed = this.vo.getCoreShowNeed();
            var topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPreviewInfo", this.getTypeCode()), ["" + coreNeed, weaponCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
            this.addChild(topDesc);
            var servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
            var icon = BaseLoadBitmap.create(weaponCfg.icon);
            icon.width = 346;
            icon.height = 346;
            this.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
            clip.x = icon.x + icon.width / 2;
            clip.y = icon.y + icon.height / 2;
            var namebg = BaseBitmap.create("specialview_commoni_namebg");
            this.addChild(namebg);
            var nametxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip8", [servantCfg.name, "<font color=" + TextFieldConst.COLOR_WARN_YELLOW + ">" + weaponCfg.name + "</font>"]), 20);
            this.addChild(nametxt);
            namebg.width = nametxt.textWidth + 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, bg, [0, 15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);
            var buttomBg = BaseBitmap.create("public_popupscrollitembg");
            buttomBg.height = 275;
            buttomBg.setPosition(rewardBg.x + rewardBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
            this.addChild(buttomBg);
            var str1 = LanguageManager.getlocal("weapon_belong", [servantCfg.name]);
            var skill1 = String(weaponCfg.skill1[0] * 100);
            var str2 = LanguageManager.getlocal("weapon_skill1_desc3", [servantCfg.name, skill1]);
            var skill2 = String(weaponCfg.skill2[0] * 100);
            var str4 = LanguageManager.getlocal("weapon_skill2_desc4", [skill2]);
            var str3 = LanguageManager.getlocal("weapon_immediately");
            var desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BROWN);
            desc1.width = 470;
            desc1.lineSpacing = 6;
            desc1.setPosition(buttomBg.x + 20, buttomBg.y + 25);
            this.addChild(desc1);
            var desc2 = ComponentManager.getTextField(str2, 20, TextFieldConst.COLOR_BROWN);
            desc2.width = desc1.width;
            desc2.lineSpacing = 6;
            desc2.setPosition(desc1.x, desc1.y + desc1.height + 15);
            this.addChild(desc2);
            var desc3 = ComponentManager.getTextField(str3, 20, TextFieldConst.COLOR_BROWN);
            desc3.width = desc1.width;
            desc3.lineSpacing = 6;
            desc3.setPosition(desc1.x, desc2.y + desc2.height + 6);
            this.addChild(desc3);
            var desc4 = ComponentManager.getTextField(str4, 20, TextFieldConst.COLOR_BROWN);
            desc4.width = desc1.width;
            desc4.lineSpacing = 6;
            desc4.setPosition(desc1.x, desc3.y + desc3.height + 15);
            this.addChild(desc4);
        }
        else {
            this.initMultiWeapon();
        }
        // let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifeSkinRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        // this.addChildToContainer(buttomTipTxt);
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.initMultiWeapon = function () {
        this._weaponIds = this.cfg.coreReward1;
        this._infoContaioner = new BaseDisplayObjectContainer();
        this.addChild(this._infoContaioner);
        this._infoContaioner.width = this._bg.width;
        this._infoContaioner.height = this._bg.height;
        this._infoContaioner.setPosition(this._bg.x, this._bg.y);
        var rect = new egret.Rectangle();
        rect.setTo(0, 0, this._bg.width, this._bg.height);
        this._infoContaioner.mask = rect;
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(this._bg.x + this._bg.width / 2 - topbg.width / 2, this._bg.y + 1);
        this.addChild(topbg);
        var topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(topbg.x + topbg.width / 2 - topbgLine.width / 2, topbg.y + topbg.height - 1);
        this.addChild(topbgLine);
        var coreNeed = this.vo.getCoreShowNeed();
        App.LogUtil.log("coreNeed " + coreNeed);
        var topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPreviewInfo", this.getTypeCode()), ["" + coreNeed]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        this.addChild(topDesc);
        var arrow_leftBtn = ComponentManager.getButton("titleupgradearrow", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.x = this._bg.x + 15 + arrow_leftBtn.width;
        arrow_leftBtn.scaleX = -1;
        arrow_leftBtn.y = this._bg.y + 150;
        this.addChild(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("titleupgradearrow", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.x = this._bg.x + this._bg.width - arrow_rightBtn.width - 15;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChild(arrow_rightBtn);
        this._arrowLeft = arrow_leftBtn;
        this._arrowRight = arrow_rightBtn;
        this.showWeaponById(String(this._weaponIds[this._curIdx]), null);
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.switchHandler = function (param) {
        if (this._isPlaying) {
            return;
        }
        if (param == "left") {
            this._curIdx--;
            if (this._curIdx < 0) {
                this._curIdx = this._weaponIds.length - 1;
            }
        }
        else if (param == "right") {
            this._curIdx++;
            if (this._curIdx >= this._weaponIds.length) {
                this._curIdx = 0;
            }
        }
        this.showWeaponById(String(this._weaponIds[this._curIdx]), param);
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.showWeaponById = function (wid, param) {
        var _this = this;
        var newnode = this.getWeaponNode(wid);
        this._infoContaioner.addChild(newnode);
        if (this._showContaioner) {
            this._isPlaying = true;
            if (param == "left") {
                newnode.x = -this._infoContaioner.width;
                egret.Tween.get(this._showContaioner).to({ x: this._infoContaioner.width }, 300);
                egret.Tween.get(newnode).to({ x: 0 }, 300).call(function () {
                    egret.Tween.removeTweens(newnode);
                    _this._showContaioner.dispose();
                    _this._isPlaying = false;
                    _this._showContaioner = newnode;
                    newnode.x = 0;
                });
            }
            else {
                newnode.x = this._infoContaioner.width;
                egret.Tween.get(this._showContaioner).to({ x: -this._infoContaioner.width }, 300);
                egret.Tween.get(newnode).to({ x: 0 }, 300).call(function () {
                    egret.Tween.removeTweens(newnode);
                    _this._showContaioner.dispose();
                    _this._isPlaying = false;
                    _this._showContaioner = newnode;
                    newnode.x = 0;
                });
            }
        }
        else {
            this._showContaioner = newnode;
        }
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.getWeaponNode = function (wid) {
        var node = new BaseDisplayObjectContainer();
        node.width = this._infoContaioner.width;
        var bgStr = "servantweaponshowbg";
        var bg = BaseBitmap.create(bgStr);
        // bg.setPosition(this._bg.x, this._bg.y + 1);
        node.addChild(bg);
        var bgMask = new egret.Rectangle(11, 0, 522, bg.height);
        bg.mask = bgMask;
        bg.x = -6;
        var clip = ComponentManager.getCustomMovieClip("destorysameshenqitexiao", 20);
        clip.width = 250;
        clip.height = 250;
        clip.anchorOffsetX = clip.width / 2;
        clip.anchorOffsetY = clip.height / 2;
        node.addChild(clip);
        clip.setScale(2);
        clip.playWithTime(-1);
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(wid);
        var servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
        var icon = BaseLoadBitmap.create(weaponCfg.icon);
        icon.width = 346;
        icon.height = 346;
        node.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        clip.x = icon.x + icon.width / 2;
        clip.y = icon.y + icon.height / 2;
        var namebg = BaseBitmap.create("specialview_commoni_namebg");
        node.addChild(namebg);
        var nametxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangtip8", [servantCfg.name, "<font color=" + TextFieldConst.COLOR_WARN_YELLOW + ">" + weaponCfg.name + "</font>"]), 20);
        node.addChild(nametxt);
        namebg.width = nametxt.textWidth + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, bg, [0, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.height = 275;
        buttomBg.setPosition(node.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        node.addChild(buttomBg);
        var str1 = LanguageManager.getlocal("weapon_belong", [servantCfg.name]);
        var skill1 = String(weaponCfg.skill1[0] * 100);
        var str2 = LanguageManager.getlocal("weapon_skill1_desc3", [servantCfg.name, skill1]);
        var skill2 = String(weaponCfg.skill2[0] * 100);
        var str4 = LanguageManager.getlocal("weapon_skill2_desc4", [skill2]);
        var str3 = LanguageManager.getlocal("weapon_immediately");
        var desc1 = ComponentManager.getTextField(str1, 20, TextFieldConst.COLOR_BLACK);
        desc1.width = 540;
        desc1.lineSpacing = 6;
        desc1.setPosition(buttomBg.x + 20, buttomBg.y + 25);
        node.addChild(desc1);
        var desc2 = ComponentManager.getTextField(str2, 20, TextFieldConst.COLOR_BLACK);
        desc2.width = desc1.width;
        desc2.lineSpacing = 6;
        desc2.setPosition(desc1.x, desc1.y + desc1.height + 15);
        node.addChild(desc2);
        var desc3 = ComponentManager.getTextField(str3, 20, TextFieldConst.COLOR_BLACK);
        desc3.width = desc1.width;
        desc3.lineSpacing = 6;
        desc3.setPosition(desc1.x, desc2.y + desc2.height + 6);
        node.addChild(desc3);
        var desc4 = ComponentManager.getTextField(str4, 20, TextFieldConst.COLOR_BLACK);
        desc4.width = desc1.width;
        desc4.lineSpacing = 6;
        desc4.setPosition(desc1.x, desc3.y + desc3.height + 15);
        node.addChild(desc4);
        return node;
    };
    AcWeaponMazeDetailPopupViewTab4.prototype.dispose = function () {
        this._bg = null;
        this._weaponIds = null;
        this._curIdx = 0;
        this._isPlaying = false;
        this._infoContaioner = null;
        this._arrowLeft = null;
        this._arrowRight = null;
        this._showContaioner = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeDetailPopupViewTab4;
}(CommonViewTab));
__reflect(AcWeaponMazeDetailPopupViewTab4.prototype, "AcWeaponMazeDetailPopupViewTab4");
//# sourceMappingURL=AcWeaponMazeDetailPopupViewTab4.js.map