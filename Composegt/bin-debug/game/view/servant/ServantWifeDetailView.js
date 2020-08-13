/**
 * 门客红颜展示
 * author jiangliuyang
 * date 2019/09/10
 * @class ServantWifeDetailView
 */
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
var ServantWifeDetailView = (function (_super) {
    __extends(ServantWifeDetailView, _super);
    function ServantWifeDetailView() {
        var _this = _super.call(this) || this;
        _this._servantContainer = null;
        _this._wifeContainer = null;
        _this._servantDescContainer = null;
        _this._wifeDescContainer = null;
        _this._probg = null;
        _this._servantCfg = null;
        _this._wifeCfg = null;
        return _this;
    }
    ServantWifeDetailView.prototype.initView = function () {
        this._servantId = this.param.data.servantId;
        this._wifeId = this.param.data.wifeId;
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        this._servantCfg = servantCfg;
        this._wifeCfg = wifeCfg;
        var servantTarScale = 1.0;
        var wifeTarScale = 0.55;
        var servantBgStr = "skin_detailbg1";
        var wifeBgStr = "skin_detailbg2";
        var servantW = 640;
        var servantH = 482;
        var wifeW = 640;
        var wifeH = 840;
        this._servantContainer = new BaseDisplayObjectContainer();
        this._servantContainer.y = 0;
        this.addChildToContainer(this._servantContainer);
        this._wifeContainer = new BaseDisplayObjectContainer();
        this._wifeContainer.y = 0;
        this.addChildToContainer(this._wifeContainer);
        var servantInfoBg = BaseLoadBitmap.create(servantBgStr);
        servantInfoBg.width = 640;
        servantInfoBg.height = 720;
        servantInfoBg.y = -this.container.y;
        this._servantContainer.addChild(servantInfoBg);
        var wifeInfoBg = BaseLoadBitmap.create(wifeBgStr);
        wifeInfoBg.width = 640;
        wifeInfoBg.height = 720;
        wifeInfoBg.y = -this.container.y;
        this._wifeContainer.addChild(wifeInfoBg);
        var probg2 = BaseBitmap.create("wifeview_xinxibanbg");
        probg2.width = 640;
        probg2.x = GameConfig.stageWidth / 2 - probg2.width / 2;
        probg2.height = 430 + GameConfig.stageHeigth - 1136;
        if (probg2.height < 370) {
            probg2.height = 370;
        }
        probg2.y = GameConfig.stageHeigth - probg2.height - 69 - 15 + 81;
        this.addChildToContainer(probg2);
        this._probg = probg2;
        var tabName = [];
        tabName.push("ServantWifeDetailServant");
        tabName.push("ServantWifeDetailWife");
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_NEWTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(3);
        tabbarGroup.x = 15;
        tabbarGroup.y = probg2.y - tabbarGroup.height + 5;
        this.addChildToContainer(tabbarGroup);
        this._servantDescContainer = new BaseDisplayObjectContainer();
        this._servantDescContainer.y = 0;
        this.addChildToContainer(this._servantDescContainer);
        this._wifeDescContainer = new BaseDisplayObjectContainer();
        this._wifeDescContainer.y = 0;
        this.addChildToContainer(this._wifeDescContainer);
        if (RES.hasRes("servant_full2_" + this._servantId + "_ske") && App.CommonUtil.check_dragon()) {
            var servantDragon = null;
            servantDragon = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + this._servantId);
            servantDragon.setScale(1);
            servantDragon.x = 320;
            servantDragon.y = GameConfig.stageHeigth < 1070 ? 1070 - 368 : GameConfig.stageHeigth - 368; //1136 - 368 + 50;
            this._servantContainer.addChild(servantDragon);
        }
        else {
            // if(this._servantId == this._wifeId){
            //     let bm = null;
            //     let skinW = 640;
            //     let skinH = 840;
            //     let tarScale = 0.7;
            //     bm = BaseLoadBitmap.create("wife_full_" + this._wifeId);
            //     bm.width = skinW;
            //     bm.height = skinH;
            //     bm.setScale(tarScale);
            //     bm.x = 320 - skinW * tarScale / 2;
            //     bm.y = 1136 - 380 - skinH * tarScale ;//GameConfig.stageHeigth - 168 - bm.height * tarScale + 5;
            //     this._wifeContainer.addChild(bm);
            // } else {
            var bm = null;
            var skinW = 640;
            var skinH = 482;
            var tarScale = 1;
            bm = BaseLoadBitmap.create("servant_full_" + this._servantId);
            bm.width = skinW;
            bm.height = skinH;
            bm.setScale(tarScale);
            bm.x = 320 - skinW * tarScale / 2;
            // bm.y = 1136 - 380 - skinH * tarScale - 274 + 179;
            bm.y = probg2.y - skinH * tarScale + 5;
            this._servantContainer.addChild(bm);
            // }
        }
        // 274
        if (!Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full_" + this._wifeId + "_ske") && App.CommonUtil.check_dragon()) {
            var wifeDragon = null;
            wifeDragon = App.DragonBonesUtil.getLoadDragonBones("wife_full_" + this._wifeId);
            wifeDragon.setScale(1);
            wifeDragon.x = 320;
            wifeDragon.y = GameConfig.stageHeigth < 1070 ? 1070 - 368 : GameConfig.stageHeigth - 368; // 1136 - 368 ;//+ 50;
            this._wifeContainer.addChild(wifeDragon);
        }
        else {
            var bm = null;
            var skinW = 640;
            var skinH = 840;
            var tarScale = 0.7;
            bm = BaseLoadBitmap.create("wife_full_" + this._wifeId);
            bm.width = skinW;
            bm.height = skinH;
            bm.setScale(tarScale);
            bm.x = 320 - skinW * tarScale / 2;
            bm.y = (GameConfig.stageHeigth < 1070 ? 1070 - 368 : GameConfig.stageHeigth - 368) - skinH * tarScale; //1136 - 380 - skinH * tarScale ;//GameConfig.stageHeigth - 168 - bm.height * tarScale + 5;
            this._wifeContainer.addChild(bm);
        }
        if (PlatformManager.checkIsViSp()) {
            var servantName = ComponentManager.getTextField(servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
            var servantNameBg = BaseBitmap.create("atkracecross_namebg");
            servantNameBg.height = servantName.width + 50;
            servantNameBg.anchorOffsetX = 26;
            servantNameBg.anchorOffsetY = servantNameBg.height / 2;
            servantNameBg.rotation = -90;
            servantNameBg.x = 10 + servantNameBg.height / 2;
            servantNameBg.y = 50; //GameConfig.stageHeigth /2 - servantNameBg.width/2 - 100;
            this._servantContainer.addChild(servantNameBg);
            servantName.x = servantNameBg.x - servantName.width / 2;
            servantName.y = servantNameBg.y - servantName.height / 2;
            this._servantContainer.addChild(servantName);
        }
        else {
            var servantNameBg = BaseBitmap.create("atkracecross_namebg");
            servantNameBg.x = 30;
            servantNameBg.y = 125; //GameConfig.stageHeigth /2 - servantNameBg.height/2 - 100;
            this._servantContainer.addChild(servantNameBg);
            var servantName = ComponentManager.getTextField(this._servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
            servantName.width = 24;
            servantName.x = servantNameBg.x + servantNameBg.width / 2 - servantName.width / 2 - 10;
            servantName.y = servantNameBg.y + servantNameBg.height / 2 - servantName.height / 2;
            this._servantContainer.addChild(servantName);
        }
        if (PlatformManager.checkIsViSp()) {
            var wifeName = ComponentManager.getTextField(this._wifeCfg.name, 24, TextFieldConst.COLOR_BLACK);
            var wifeNameBg = BaseBitmap.create("atkracecross_namebg");
            wifeNameBg.height = wifeName.width + 50;
            wifeNameBg.anchorOffsetX = 26;
            wifeNameBg.anchorOffsetY = wifeNameBg.height / 2;
            wifeNameBg.rotation = -90;
            wifeNameBg.x = 10 + wifeNameBg.height / 2;
            wifeNameBg.y = 50; //GameConfig.stageHeigth /2 - wifeNameBg.width/2 - 100;
            this._wifeContainer.addChild(wifeNameBg);
            wifeName.x = wifeNameBg.x - wifeName.width / 2;
            wifeName.y = wifeNameBg.y - wifeName.height / 2;
            this._wifeContainer.addChild(wifeName);
        }
        else {
            var wifeNameBg = BaseBitmap.create("atkracecross_namebg");
            wifeNameBg.x = 30;
            wifeNameBg.y = 125; //GameConfig.stageHeigth /2 - wifeNameBg.height/2 - 100;
            this._wifeContainer.addChild(wifeNameBg);
            var wifeName = ComponentManager.getTextField(this._wifeCfg.name, 24, TextFieldConst.COLOR_BLACK);
            wifeName.width = 24;
            wifeName.x = wifeNameBg.x + wifeNameBg.width / 2 - wifeName.width / 2 - 10;
            wifeName.y = wifeNameBg.y + wifeNameBg.height / 2 - wifeName.height / 2;
            this._wifeContainer.addChild(wifeName);
        }
        var public_listbg = BaseBitmap.create("public_9v_bg09");
        public_listbg.width = probg2.width - 30;
        public_listbg.x = probg2.x + 15;
        public_listbg.y = probg2.y + 25;
        public_listbg.height = probg2.height - 60;
        this.addChildToContainer(public_listbg);
        //三国女将
        // if(this._wifeId == this._servantId){
        //     let tip = BaseBitmap.create("atkracecross_threetip");
        //     tip.x = GameConfig.stageWidth / 2 - tip.width/2;
        //     tip.y = 80 - 30;
        //     this.addChildToContainer(tip);
        //     let tipFlower = BaseBitmap.create("atkracecross_threetipflower");
        //     tipFlower.x = tip.x + 60;
        //     tipFlower.y = tip.y + 52;
        //     this.addChildToContainer(tipFlower);
        // }
        this.createServantInfo();
        this.createWifeInfo();
        this._servantContainer.visible = true;
        this._wifeContainer.visible = false;
        this._servantDescContainer.visible = true;
        this._wifeDescContainer.visible = false;
    };
    ServantWifeDetailView.prototype.tabBtnClickHandler = function (params) {
        if (params.index == 0) {
            this._servantContainer.visible = true;
            this._wifeContainer.visible = false;
            this._servantDescContainer.visible = true;
            this._wifeDescContainer.visible = false;
        }
        else {
            this._servantContainer.visible = false;
            this._wifeContainer.visible = true;
            this._servantDescContainer.visible = false;
            this._wifeDescContainer.visible = true;
        }
    };
    ServantWifeDetailView.prototype.createServantInfo = function () {
        var topBg = BaseBitmap.create("public_up3");
        topBg.width = 604;
        topBg.height = 32;
        topBg.x = GameConfig.stageWidth / 2 - topBg.width / 2;
        topBg.y = this._probg.y + 28;
        this._servantDescContainer.addChild(topBg);
        var zizhi = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailZizhi", [String(this._servantCfg.getStarNums())]), 22, TextFieldConst.COLOR_BROWN);
        zizhi.x = 40;
        zizhi.y = this._probg.y + 33;
        this._servantDescContainer.addChild(zizhi);
        // servantInfo_speciality
        var speList = this._servantCfg.speciality;
        var speStr = "";
        for (var i = 0; i < speList.length; i++) {
            var str = LanguageManager.getlocal("servantInfo_speciality" + speList[i]);
            speStr = speStr + str;
            if (i < speList.length - 1) {
                speStr = speStr + "，";
            }
        }
        var techang = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailTechang", [speStr]), 22, TextFieldConst.COLOR_BROWN);
        techang.x = GameConfig.stageWidth / 2;
        techang.y = this._probg.y + 33;
        this._servantDescContainer.addChild(techang);
        this.initBookInfo(this._servantDescContainer, this._probg.y + 60, this._probg.height - 135);
        var bottomBg = BaseBitmap.create("public_left2");
        bottomBg.width = 604;
        bottomBg.height = 32;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = this._probg.y + this._probg.height - bottomBg.height - 38;
        this._servantDescContainer.addChild(bottomBg);
        var bottomTxt = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailWifeName", [this._wifeCfg.name]), 22, TextFieldConst.COLOR_BLACK);
        bottomTxt.x = bottomBg.x + bottomBg.width / 2 - bottomTxt.width / 2;
        bottomTxt.y = bottomBg.y + bottomBg.height / 2 - bottomTxt.height / 2 + 2;
        this._servantDescContainer.addChild(bottomTxt);
    };
    ServantWifeDetailView.prototype.createWifeInfo = function () {
        var topBg = BaseBitmap.create("public_up3");
        topBg.width = 604;
        topBg.height = 32;
        topBg.x = GameConfig.stageWidth / 2 - topBg.width / 2;
        topBg.y = this._probg.y + 28;
        this._wifeDescContainer.addChild(topBg);
        var meili = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailMeili", [String(this._wifeCfg.glamour)]), 22, TextFieldConst.COLOR_BROWN);
        meili.x = 40;
        meili.y = this._probg.y + 33;
        this._wifeDescContainer.addChild(meili);
        var contact = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailServantName", [this._servantCfg.name]), 22, TextFieldConst.COLOR_BROWN);
        contact.x = GameConfig.stageWidth / 2;
        contact.y = this._probg.y + 33;
        this._wifeDescContainer.addChild(contact);
        this.initSkillInfo(this._wifeDescContainer, this._probg.y + 60, this._probg.height - 135);
        var bottomBg = BaseBitmap.create("public_left2");
        bottomBg.width = 604;
        bottomBg.height = 32;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = this._probg.y + this._probg.height - bottomBg.height - 38;
        this._wifeDescContainer.addChild(bottomBg);
        // let unlockTF = ComponentManager.getTextField(wifeItemCfg.wifeunlock,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_RED3);
        // // unlockTF.width = 150;
        // unlockTF.x = unlockTFTitle.x ;
        // unlockTF.y = lockBg.y + lockBg.height/2 - unlockTF.height/2;
        // this.addChild(unlockTF);
        // let bottomTxt = ComponentManager.getTextField(LanguageManager.getlocal("ServantWifeDetailLockDesc",[String(this._servantCfg.unlockwifelv),String(this._wifeCfg.name)]),22,TextFieldConst.COLOR_BLACK);
        var unlockStr = LanguageManager.getlocal("ServantWifeDetailLockDesc", [this._wifeCfg.wifeunlock]);
        var bottomTxt = ComponentManager.getTextField(unlockStr, 22, TextFieldConst.COLOR_BLACK);
        bottomTxt.x = bottomBg.x + bottomBg.width / 2 - bottomTxt.width / 2;
        bottomTxt.y = bottomBg.y + bottomBg.height / 2 - bottomTxt.height / 2 + 2;
        this._wifeDescContainer.addChild(bottomTxt);
    };
    ServantWifeDetailView.prototype.initBookInfo = function (tmpNode, startY, bottomH) {
        var bookItem = new ServantWifeBookItem();
        bookItem.init(String(this._servantId), bottomH);
        bookItem.y = startY;
        tmpNode.addChild(bookItem);
    };
    ServantWifeDetailView.prototype.initSkillInfo = function (tmpNode, startY, bottomH) {
        var bookItem = new ServantWifeSkillItem();
        bookItem.init(String(this._wifeId), bottomH);
        bookItem.y = startY;
        tmpNode.addChild(bookItem);
    };
    ServantWifeDetailView.prototype.getTitleBgName = function () {
        return null;
    };
    ServantWifeDetailView.prototype.getTitleStr = function () {
        return null;
    };
    ServantWifeDetailView.prototype.getServantBookStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantWifeDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_probg",
            // "skin_proimg1","skin_proimg2","skin_proimg3","skin_proimg4","skin_proimg5",
            "servant_star",
            "arena_rank", "arena_rank_text", "forpeople_bottom", "wifeview_xinxibanbg",
            "servant_skinnamebg", "public_v_huawen01",
            "servant_infoPro1",
            "servant_infoPro2",
            "servant_infoPro3",
            "servant_infoPro4",
            "servant_wifebookbg",
            "atkracecross_namebg",
        ]);
    };
    ServantWifeDetailView.prototype.dispose = function () {
        this._servantId = 0;
        this._wifeId = 0;
        this._servantContainer = null;
        this._wifeContainer = null;
        this._servantDescContainer = null;
        this._wifeDescContainer = null;
        this._probg = null;
        this._servantCfg = null;
        this._wifeCfg = null;
        _super.prototype.dispose.call(this);
    };
    return ServantWifeDetailView;
}(CommonView));
__reflect(ServantWifeDetailView.prototype, "ServantWifeDetailView");
