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
var AcRechargeBoxSpShowView = (function (_super) {
    __extends(AcRechargeBoxSpShowView, _super);
    function AcRechargeBoxSpShowView() {
        var _this = _super.call(this) || this;
        _this._mySkinProTxtList = [];
        return _this;
    }
    Object.defineProperty(AcRechargeBoxSpShowView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcRechargeBoxSpShowView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcRechargeBoxSpShowView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcRechargeBoxSpShowView.prototype.initView = function () {
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
        // let tabList = [];
        // tabList.push(this.getDefaultCn("acMoonNightShowViewTab1"));
        // tabList.push(this.getDefaultCn("acMoonNightShowViewTab2"));
        this.wifeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this.wifeContainer);
        // this.servantContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.addChild(this.servantContainer);
        // let tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1",tabList,this.tabBtnClickHandler2,this);
        // tabbarGroup.setColor(0x230602,0x230602);
        // tabbarGroup.x = GameConfig.stageWidth/2 - tabbarGroup.width/2;
        // tabbarGroup.y = infobg.y - 33;
        // this._nodeContainer.addChild(tabbarGroup);
        var skin_mytab_cover1 = BaseBitmap.create("skin_mytab_cover");
        skin_mytab_cover1.x = 8;
        skin_mytab_cover1.y = infobg.y - 2;
        this._nodeContainer.addChild(skin_mytab_cover1);
        // let skin_mytab_cover2 =  BaseBitmap.create("skin_mytab_cover");
        // skin_mytab_cover2.scaleX = -1;
        // skin_mytab_cover2.x = GameConfig.stageWidth - skin_mytab_cover1.x;
        // skin_mytab_cover2.y = skin_mytab_cover1.y ;
        // this._nodeContainer.addChild(skin_mytab_cover2);
        this.createNode();
    };
    AcRechargeBoxSpShowView.prototype.createNode = function () {
        this.createWife();
    };
    AcRechargeBoxSpShowView.prototype.createWife = function () {
        var wifeid = "221";
        var wifeSkinid = "2211";
        var wifeSkincfg = undefined;
        var skinImgPath = "";
        var skinNameStr = "";
        var wifeOrSerNameStr = "";
        var skinW = 640;
        var skinH = 840;
        var tarScale = 0.55;
        var bone = undefined;
        var bgStr = "skin_detailbg2";
        wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinid);
        skinImgPath = wifeSkincfg.body;
        bone = wifeSkincfg.bone;
        wifeOrSerNameStr = LanguageManager.getlocal("wifeName_" + wifeid);
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
    AcRechargeBoxSpShowView.prototype.getResourceList = function () {
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
    AcRechargeBoxSpShowView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSpShowView;
}(CommonView));
__reflect(AcRechargeBoxSpShowView.prototype, "AcRechargeBoxSpShowView");
