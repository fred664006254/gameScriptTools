/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinDetailView
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
var AcMoonNightShowView = (function (_super) {
    __extends(AcMoonNightShowView, _super);
    function AcMoonNightShowView() {
        var _this = _super.call(this) || this;
        _this._mySkinProTxtList = [];
        return _this;
    }
    Object.defineProperty(AcMoonNightShowView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcMoonNightShowView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcMoonNightShowView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcMoonNightShowView.prototype.initView = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.visible = false;
        this.addChildToContainer(this._nodeContainer);
        // let infobg = BaseBitmap.create("skin_myskinInfobg");
        // infobg.y = this._scrollList.y;// innerbg.y;
        // this._nodeContainer.addChild(infobg);
        // this._infobg = infobg;
        var infobg = { y: 0 };
        var tabList = [];
        tabList.push(this.getDefaultCn("acMoonNightShowViewTab1"));
        tabList.push(this.getDefaultCn("acMoonNightShowViewTab2"));
        this.wifeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this.wifeContainer);
        this.servantContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this.servantContainer);
        var tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1", tabList, this.tabBtnClickHandler2, this);
        tabbarGroup.setColor(0x230602, 0x230602);
        tabbarGroup.x = GameConfig.stageWidth / 2 - tabbarGroup.width / 2;
        tabbarGroup.y = infobg.y - 33;
        this._nodeContainer.addChild(tabbarGroup);
        var skin_mytab_cover1 = BaseBitmap.create("skin_mytab_cover");
        skin_mytab_cover1.x = 8;
        skin_mytab_cover1.y = infobg.y - 2;
        this._nodeContainer.addChild(skin_mytab_cover1);
        var skin_mytab_cover2 = BaseBitmap.create("skin_mytab_cover");
        skin_mytab_cover2.scaleX = -1;
        skin_mytab_cover2.x = GameConfig.stageWidth - skin_mytab_cover1.x;
        skin_mytab_cover2.y = skin_mytab_cover1.y;
        this._nodeContainer.addChild(skin_mytab_cover2);
        this.createNode();
    };
    AcMoonNightShowView.prototype.createNode = function () {
        this.createWife();
        this.createServant();
    };
    AcMoonNightShowView.prototype.createWife = function () {
        var wifeSkincfg = undefined;
        var skinImgPath = "";
        var skinNameStr = "";
        var wifeOrSerNameStr = "";
        var skinW = 640;
        var skinH = 840;
        var tarScale = 0.55;
        var bone = undefined;
        var bgStr = "skin_detailbg2";
        wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.wifeSkin);
        skinImgPath = wifeSkincfg.body;
        bone = wifeSkincfg.bone;
        wifeOrSerNameStr = LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
        skinNameStr = wifeSkincfg.name;
        var infobg = BaseLoadBitmap.create(bgStr);
        infobg.width = 640;
        infobg.height = 720;
        infobg.y = -this.container.y;
        this.wifeContainer.addChild(infobg);
        var probg2 = BaseBitmap.create("wifeview_xinxibanbg");
        probg2.width = 640;
        probg2.x = GameConfig.stageWidth / 2 - probg2.width / 2;
        probg2.y = -this.container.y + 720 - 140;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y + 15;
        var boneName = "";
        if (bone) {
            boneName = bone + "_ske";
        }
        var dbEnable = true;
        if (!Api.wifeVoApi.isHaveBone(boneName)) {
            dbEnable = false;
        }
        if (!Api.switchVoApi.checkCloseBone() && bone && boneName && dbEnable && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var _droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bone);
            var sv = 0.8;
            _droWifeIcon.setScale(sv);
            _droWifeIcon.anchorOffsetY = _droWifeIcon.height * sv;
            _droWifeIcon.anchorOffsetX = _droWifeIcon.width / 2 * sv;
            _droWifeIcon.x = GameConfig.stageWidth / 2;
            _droWifeIcon.y = probg2.y + 80;
            this.wifeContainer.addChild(_droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.width = skinW;
            skinImg.height = skinH;
            skinImg.setScale(tarScale);
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.x = GameConfig.stageWidth / 2;
            skinImg.y = probg2.y + 5;
            this.wifeContainer.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("servant_skinnamebg");
        skinnamebg.y = 65;
        skinnamebg.x = 20;
        this.wifeContainer.addChild(skinnamebg);
        this.wifeContainer.addChild(probg2);
        var public_listbg = BaseBitmap.create("public_9v_bg09");
        public_listbg.width = probg2.width - 30;
        public_listbg.x = probg2.x + 15;
        public_listbg.y = probg2.y + 25;
        public_listbg.height = probg2.height - 60;
        this.wifeContainer.addChild(public_listbg);
        // let proTopTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinview_DetaipTopTxt1"),24,TextFieldConst.COLOR_BROWN);
        // if(wifeSkincfg){
        //     proTopTxt.text = LanguageManager.getlocal("skinview_DetaipTopTxt2");
        // }
        // proTopTxt.x = probg2.x + probg2.width / 2  - proTopTxt.width/2;
        // proTopTxt.y = public_listbg.y + 15;
        // this.wifeContainer.addChild(proTopTxt);
        // let leftLine = BaseBitmap.create("public_v_huawen01");
        // leftLine.anchorOffsetY = leftLine.height / 2;
        // leftLine.setPosition(probg2.x + probg2.width / 2  - leftLine.width - 90, proTopTxt.y + 10)
        // this.wifeContainer.addChild(leftLine);
        // let rightLine = BaseBitmap.create("public_v_huawen01");
        // rightLine.anchorOffsetX = rightLine.width / 2;
        // rightLine.anchorOffsetY = rightLine.height / 2;
        // rightLine.rotation = 180;
        // rightLine.setPosition(probg2.x + probg2.width / 2 + rightLine.width / 2 + 90, leftLine.y)
        // this.wifeContainer.addChild(rightLine);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x = skinnamebg.x + 25;
        skinNameTxt.y = skinnamebg.y + 15;
        this.wifeContainer.addChild(skinNameTxt);
        var wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeOrSerNameTxt.x = skinNameTxt.x;
        wifeOrSerNameTxt.y = skinNameTxt.y + 25;
        this.wifeContainer.addChild(wifeOrSerNameTxt);
        var dropDescBg = BaseBitmap.create("public_left2");
        dropDescBg.width = 604;
        dropDescBg.height = 30;
        dropDescBg.x = probg2.x + probg2.width / 2 - dropDescBg.width / 2;
        dropDescBg.y = probg2.y + probg2.height - dropDescBg.height - 38;
        this.wifeContainer.addChild(dropDescBg);
        var dropTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2 - dropDescBg.width / 2;
        dropTxt.y = dropDescBg.y + 7;
        this.wifeContainer.addChild(dropTxt);
        dropTxt.text = wifeSkincfg.dropDesc;
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2 - dropDescBg.width / 2;
        var addvalues = Api.wifeSkinVoApi.getWifeSkinProAdd(wifeSkincfg.id, true);
        var proTopTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"), 24, TextFieldConst.COLOR_BROWN);
        proTopTxt2.x = probg2.x + probg2.width / 2 - proTopTxt2.width / 2;
        proTopTxt2.y = public_listbg.y + 15;
        this.wifeContainer.addChild(proTopTxt2);
        var leftLine2 = BaseBitmap.create("public_v_huawen01");
        leftLine2.anchorOffsetY = leftLine2.height / 2;
        leftLine2.setPosition(probg2.x + probg2.width / 2 - leftLine2.width - 90, proTopTxt2.y + 10);
        this.wifeContainer.addChild(leftLine2);
        var rightLine2 = BaseBitmap.create("public_v_huawen01");
        rightLine2.anchorOffsetX = rightLine2.width / 2;
        rightLine2.anchorOffsetY = rightLine2.height / 2;
        rightLine2.rotation = 180;
        rightLine2.setPosition(probg2.x + probg2.width / 2 + rightLine2.width / 2 + 90, leftLine2.y);
        this.wifeContainer.addChild(rightLine2);
        for (var index = 0; index < 6; index++) {
            var wifeProTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            wifeProTxt.y = proTopTxt2.y + 35 + Math.floor(index / 2) * 30;
            var addV = "" + addvalues[index];
            if (index < 4 && addvalues[index] == 0) {
                addV = addvalues[index + 6] * 100 + "%";
            }
            if (index % 4 == 0) {
                var skprobg = BaseBitmap.create("public_ditu");
                //  if (index == 5){
                //    skprobg.texture = ResourceManager.getRes( "public_ditu");
                // }
                skprobg.width = 598;
                skprobg.height = 30;
                this.wifeContainer.addChild(skprobg);
                skprobg.x = GameConfig.stageWidth / 2 - skprobg.width / 2; // - probg.width /2 ;
                skprobg.y = wifeProTxt.y - 5;
            }
            var addVStr = App.StringUtil.formatStringColor(addV, 0x13851e);
            wifeProTxt.text = LanguageManager.getlocal("skin_myPro1_" + index, [addVStr]);
            if (index % 2 == 1) {
                wifeProTxt.x = probg2.x + 360;
            }
            else {
                wifeProTxt.x = probg2.x + 70;
            }
            this.wifeContainer.addChild(wifeProTxt);
        }
    };
    AcMoonNightShowView.prototype.createServant = function () {
        this.servantContainer.visible = false;
        var serSkincfg = undefined;
        var wifeSkincfg = undefined;
        var skinImgPath = "";
        var skinNameStr = "";
        var wifeOrSerNameStr = "";
        var skinW = 640;
        var skinH = 840;
        var tarScale = 1.0;
        var bone = undefined;
        var bgStr = "skin_detailbg1";
        skinW = 640;
        skinH = 482;
        serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.servantSkin);
        bone = serSkincfg.bone;
        var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
        skinImgPath = serSkincfg.body;
        wifeOrSerNameStr = LanguageManager.getlocal("servant_name" + serSkincfg.servantId);
        skinNameStr = LanguageManager.getlocal("servantSkinName" + serSkincfg.id);
        var infobg = BaseLoadBitmap.create(bgStr);
        infobg.width = 640;
        infobg.height = 720;
        infobg.y = -this.container.y;
        this.servantContainer.addChild(infobg);
        var probg2 = BaseBitmap.create("wifeview_xinxibanbg");
        probg2.width = 640;
        probg2.x = GameConfig.stageWidth / 2 - probg2.width / 2;
        probg2.y = -this.container.y + 720 - 140;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y + 15;
        var boneName = "";
        if (bone) {
            boneName = bone + "_ske";
        }
        // let dbEnable = true;
        // if( !Api.wifeVoApi.isHaveBone(boneName)){
        //     dbEnable = false;
        // }
        if (!Api.switchVoApi.checkServantCloseBone() && bone && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var _droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bone);
            var sv = 0.9;
            _droWifeIcon.setScale(sv);
            _droWifeIcon.anchorOffsetY = _droWifeIcon.height * sv;
            _droWifeIcon.anchorOffsetX = _droWifeIcon.width / 2 * sv;
            _droWifeIcon.x = GameConfig.stageWidth / 2;
            _droWifeIcon.y = probg2.y + 80;
            this.servantContainer.addChild(_droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.width = skinW;
            skinImg.height = skinH;
            skinImg.setScale(tarScale);
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.x = GameConfig.stageWidth / 2;
            skinImg.y = probg2.y + 5;
            this.servantContainer.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("servant_skinnamebg");
        skinnamebg.y = 65;
        skinnamebg.x = 20;
        this.servantContainer.addChild(skinnamebg);
        this.servantContainer.addChild(probg2);
        var public_listbg = BaseBitmap.create("public_9v_bg09");
        public_listbg.width = probg2.width - 30;
        public_listbg.x = probg2.x + 15;
        public_listbg.y = probg2.y + 25;
        public_listbg.height = probg2.height - 60;
        this.servantContainer.addChild(public_listbg);
        // let proTopTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinview_DetaipTopTxt1"),24,TextFieldConst.COLOR_BROWN);
        // if(wifeSkincfg){
        //     proTopTxt.text = LanguageManager.getlocal("skinview_DetaipTopTxt2");
        // }
        // proTopTxt.x = probg2.x + probg2.width / 2  - proTopTxt.width/2;
        // proTopTxt.y = public_listbg.y + 15;
        // this.servantContainer.addChild(proTopTxt);
        // let leftLine = BaseBitmap.create("public_v_huawen01");
        // leftLine.anchorOffsetY = leftLine.height / 2;
        // leftLine.setPosition(probg2.x + probg2.width / 2  - leftLine.width - 90, proTopTxt.y + 10)
        // this.servantContainer.addChild(leftLine);
        // let rightLine = BaseBitmap.create("public_v_huawen01");
        // rightLine.anchorOffsetX = rightLine.width / 2;
        // rightLine.anchorOffsetY = rightLine.height / 2;
        // rightLine.rotation = 180;
        // rightLine.setPosition(probg2.x + probg2.width / 2 + rightLine.width / 2 + 90, leftLine.y)
        // this.servantContainer.addChild(rightLine);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x = skinnamebg.x + 25;
        skinNameTxt.y = skinnamebg.y + 15;
        this.servantContainer.addChild(skinNameTxt);
        var wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeOrSerNameTxt.x = skinNameTxt.x;
        wifeOrSerNameTxt.y = skinNameTxt.y + 25;
        this.servantContainer.addChild(wifeOrSerNameTxt);
        var dropDescBg = BaseBitmap.create("public_left2");
        dropDescBg.width = 604;
        dropDescBg.height = 30;
        dropDescBg.x = probg2.x + probg2.width / 2 - dropDescBg.width / 2;
        dropDescBg.y = probg2.y + probg2.height - dropDescBg.height - 38;
        this.servantContainer.addChild(dropDescBg);
        var dropTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2 - dropDescBg.width / 2;
        dropTxt.y = dropDescBg.y + 7;
        this.servantContainer.addChild(dropTxt);
        dropTxt.text = serSkincfg.getSkinDropDesc();
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2 - dropDescBg.width / 2;
        var proTopTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"), 24, TextFieldConst.COLOR_BROWN);
        proTopTxt2.x = probg2.x + probg2.width / 2 - proTopTxt2.width / 2; //probg2.x + probg2.width / 2  - proTopTxt.width/2;
        proTopTxt2.y = public_listbg.y + 15;
        this.servantContainer.addChild(proTopTxt2);
        var leftLine2 = BaseBitmap.create("public_v_huawen01");
        leftLine2.anchorOffsetY = leftLine2.height / 2;
        leftLine2.setPosition(probg2.x + probg2.width / 2 - leftLine2.width - 90, proTopTxt2.y + 10);
        this.servantContainer.addChild(leftLine2);
        var rightLine2 = BaseBitmap.create("public_v_huawen01");
        rightLine2.anchorOffsetX = rightLine2.width / 2;
        rightLine2.anchorOffsetY = rightLine2.height / 2;
        rightLine2.rotation = 180;
        rightLine2.setPosition(probg2.x + probg2.width / 2 + rightLine2.width / 2 + 90, leftLine2.y);
        this.servantContainer.addChild(rightLine2);
        //书籍信息
        var addAbility = serSkincfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var blv = 1;
            var bid = addAbility[index];
            var bookcfg = GameConfig.config.abilityCfg[bid];
            var bookprobg = BaseBitmap.create("public_9v_bg09");
            bookprobg.width = 600;
            bookprobg.height = 115;
            bookprobg.x = probg2.x + probg2.width / 2 - bookprobg.width / 2;
            bookprobg.y = proTopTxt2.y + 35 + (bookprobg.height + 7) * index;
            this.servantContainer.addChild(bookprobg);
            var biconBg = BaseBitmap.create("public_left");
            biconBg.width = 110;
            biconBg.height = bookprobg.height - 12;
            biconBg.x = bookprobg.x + 5.5;
            biconBg.y = bookprobg.y + 5.5;
            this.servantContainer.addChild(biconBg);
            var bicon = BaseLoadBitmap.create("servant_infoPro" + bookcfg.type);
            bicon.width = 80;
            bicon.height = 90;
            bicon.x = biconBg.x + biconBg.width / 2 - bicon.width / 2;
            bicon.y = biconBg.y + biconBg.height / 2 - bicon.height / 2;
            this.servantContainer.addChild(bicon);
            var starsp = this.getServantBookStars(bookcfg.num);
            starsp.x = bicon.x + bicon.width / 2 - starsp.width / 2;
            starsp.y = bicon.y + 70;
            this.servantContainer.addChild(starsp);
            var bnameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bid) + "Lv" + blv;
            bnameTxt.x = biconBg.x + biconBg.width + 5;
            bnameTxt.y = biconBg.y + 15;
            this.servantContainer.addChild(bnameTxt);
            var bnameTypeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
            bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " " + (bookcfg.num * blv);
            bnameTypeTxt.x = bnameTxt.x + 10;
            bnameTypeTxt.y = bnameTxt.y + 25;
            this.servantContainer.addChild(bnameTypeTxt);
        }
    };
    AcMoonNightShowView.prototype.tabBtnClickHandler2 = function (params) {
        console.log("111111", params);
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            //嫦娥
            this.wifeContainer.visible = true;
            this.servantContainer.visible = false;
        }
        else {
            //吕布
            this.wifeContainer.visible = false;
            this.servantContainer.visible = true;
        }
        // list.sort((dataA:any,dataB:any)=>{
        // 	dataA["uiType"] = uiTypeV;
        // 	dataB["uiType"] = uiTypeV;
        // 	dataA["myown"]=1;
        // 	dataB["myown"]=1;
        // 	return Number(dataA.id) - Number(dataB.id)
        // });
        // let ownList = [];
        // let notOwnList = [];
        // for (var index = 0; index < list.length; index++) {
        // 	let tmp = list[index];
        // 	let id = tmp.id;
        // 	if(uiTypeV == 1 ){
        // 		if(Api.servantVoApi.isOwnSkinOfSkinId(id)){
        // 			ownList.push(tmp);
        // 		}else{
        // 			tmp["myown"]=1;
        // 			notOwnList.push(tmp);
        // 		}
        // 	}else if(uiTypeV == 2){
        // 		if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)){
        // 			ownList.push(tmp);
        // 		}else{
        // 			tmp["myown"]=1;
        // 			notOwnList.push(tmp);
        // 		}
        // 	}
        // }
        this.refreshSkinInfo();
    };
    AcMoonNightShowView.prototype.refreshSkinInfo = function () {
        var preIdx = this._curTabIdx;
        if (preIdx == 0) {
            preIdx = 1;
        }
        ///////////////
    };
    AcMoonNightShowView.prototype.getServantBookStars = function (num) {
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
    AcMoonNightShowView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_probg",
            // "skin_proimg1","skin_proimg2","skin_proimg3","skin_proimg4","skin_proimg5",
            "skin_rankbtn_down", "skin_rankbtn", "skin_bookbg", "servant_star",
            "arena_rank", "arena_rank_text", "forpeople_bottom", "wifeview_xinxibanbg",
            "servant_skinnamebg", "public_v_huawen01",
            "skin_mytab_cover",
            "skin_mytab1",
            "skin_mytab1_down",
            "skin_mydetail_top2",
        ]);
    };
    AcMoonNightShowView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMoonNightShowView;
}(CommonView));
__reflect(AcMoonNightShowView.prototype, "AcMoonNightShowView");
