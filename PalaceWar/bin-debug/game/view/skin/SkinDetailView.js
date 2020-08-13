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
var SkinDetailView = (function (_super) {
    __extends(SkinDetailView, _super);
    function SkinDetailView() {
        var _this = _super.call(this) || this;
        _this._skinNetData = undefined;
        _this._inflagImg = undefined;
        return _this;
    }
    SkinDetailView.prototype.initView = function () {
        var serSkincfg = undefined;
        var wifeSkincfg = undefined;
        var skinImgPath = "";
        var skinNameStr = "";
        var wifeOrSerNameStr = "";
        var data = this.param.data;
        var skinW = 640;
        var skinH = 840;
        var tarScale = 1.0;
        var bone = undefined;
        var bgStr = "skin_detailbg1";
        var skinBgEffBone = null;
        var flagimg = null;
        if (data.wifeId || data.wid) {
            tarScale = 0.55;
            wifeSkincfg = data;
            if (data.wid) {
                wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(data.wid);
            }
            this._wifeSkinId = wifeSkincfg.id;
            flagimg = App.CommonUtil.getWifeSkinFlagById(this._wifeSkinId);
            skinImgPath = wifeSkincfg.body;
            bone = wifeSkincfg.bone;
            wifeOrSerNameStr = LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
            skinNameStr = wifeSkincfg.name;
            bgStr = "skin_detailbg2";
        }
        else if (data.servantId || data.slv) {
            skinW = 405;
            skinH = 467;
            serSkincfg = data;
            if (data.slv) {
                this._servantSkinId = data.skinid;
                serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
            }
            bone = serSkincfg.bone;
            var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            this._servantSkinId = serSkincfg.id;
            flagimg = App.CommonUtil.getServantSkinFlagById(this._servantSkinId);
            skinImgPath = serSkincfg.body;
            wifeOrSerNameStr = LanguageManager.getlocal("servant_name" + serSkincfg.servantId);
            skinNameStr = LanguageManager.getlocal("servantSkinName" + serSkincfg.id);
            var skinBg = serSkincfg.getSkinDetailBg();
            if (skinBg && ResourceManager.hasRes(skinBg)) {
                bgStr = skinBg;
            }
            skinBgEffBone = serSkincfg.getSkinEffectBone();
        }
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var infobg = BaseLoadBitmap.create(bgStr);
        infobg.width = 640;
        infobg.height = 720;
        infobg.y = -this.container.y;
        if ((data.servantId || data.slv) && Api.switchVoApi.checkOpenServantSkinAura()) {
            var auraImg = "servantskinauramanbg";
            var skinBg = serSkincfg.getSkinDetailAuraBg();
            if (skinBg && ResourceManager.hasRes(skinBg)) {
                auraImg = skinBg;
            }
            infobg.setload(auraImg);
            infobg.height = 498;
            infobg.y = 0;
        }
        this._nodeContainer.addChild(infobg);
        if (skinBgEffBone) {
            var skinEffBoneName = skinBgEffBone + "_ske";
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)) {
                var skinEff = App.DragonBonesUtil.getLoadDragonBones(skinBgEffBone);
                skinEff.setPosition(infobg.x + infobg.width / 2, 190);
                this._nodeContainer.addChild(skinEff);
            }
        }
        var probg = BaseBitmap.create("skin_detail_buttom_probg");
        if (Api.switchVoApi.checkOpenServantSkinAura()) {
            probg.setRes("skin_detail_buttom_probg2");
        }
        probg.width = 640;
        probg.x = GameConfig.stageWidth / 2 - probg.width / 2;
        probg.y = -this.container.y + 720 - 140;
        var boneName = "";
        if (bone) {
            boneName = bone + "_ske";
        }
        var dbEnable = true;
        if (this._wifeSkinId && !Api.wifeVoApi.isHaveBone(boneName)) {
            dbEnable = false;
        }
        if (!Api.switchVoApi.checkCloseBone() && bone && boneName && dbEnable && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var _droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bone);
            var sv = 0.8;
            if (data.wifeId) {
            }
            else if (data.servantId) {
                sv = 1;
            }
            if (data.servantId == "1063") {
                sv = 0.9;
            }
            _droWifeIcon.setScale(sv);
            _droWifeIcon.anchorOffsetY = _droWifeIcon.height * sv;
            _droWifeIcon.anchorOffsetX = _droWifeIcon.width / 2 * sv;
            _droWifeIcon.x = GameConfig.stageWidth / 2;
            _droWifeIcon.y = probg.y;
            this._nodeContainer.addChild(_droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.width = skinW;
            skinImg.height = skinH;
            skinImg.setScale(tarScale);
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.x = GameConfig.stageWidth / 2;
            skinImg.y = probg.y;
            this._nodeContainer.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.y = -10;
        skinnamebg.x = -15;
        this._nodeContainer.addChild(skinnamebg);
        var ownerNamebg = BaseBitmap.create("skin_detail_ownernamebg");
        ownerNamebg.y = probg.y - 50;
        ;
        ownerNamebg.x = GameConfig.stageWidth / 2 - ownerNamebg.width / 2;
        ;
        this._nodeContainer.addChild(ownerNamebg);
        if (flagimg) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flagimg, ownerNamebg, [0, ownerNamebg.height]);
            this._nodeContainer.addChild(flagimg);
        }
        var rankBtn = ComponentManager.getButton("skin_rankbtn", "", this.rankBtnHandler, this);
        rankBtn.x = GameConfig.stageWidth - rankBtn.width - 10;
        rankBtn.y = probg.y - rankBtn.height - 10;
        this._nodeContainer.addChild(rankBtn);
        this._nodeContainer.addChild(probg);
        var probg2 = BaseBitmap.create("public_9_bg22");
        probg2.width = 640;
        probg2.x = GameConfig.stageWidth / 2 - probg.width / 2;
        probg2.y = probg.y + probg.height;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y + 15;
        this._nodeContainer.addChild(probg2);
        var pronamebg = BaseBitmap.create("skin_detail_pronamebg");
        pronamebg.x = GameConfig.stageWidth / 2 - pronamebg.width / 2;
        pronamebg.y = probg2.y + 15;
        this._nodeContainer.addChild(pronamebg);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 22, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.x = skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2;
        skinNameTxt.y = skinnamebg.y + 33;
        this._nodeContainer.addChild(skinNameTxt);
        var wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr, 24);
        wifeOrSerNameTxt.x = skinnamebg.x + skinnamebg.width / 2 - wifeOrSerNameTxt.width / 2;
        wifeOrSerNameTxt.y = skinNameTxt.y + 28;
        this._nodeContainer.addChild(wifeOrSerNameTxt);
        var ownerNameTxtStr = ""; //LanguageManager.getlocal("skin_ownerNameStr2");
        if (this._skinNetData) {
            // skin_ownerNameStr3
            if (this._skinNetData.qu) {
                ownerNameTxtStr = LanguageManager.getlocal("skin_ownerNameStr3", [this._skinNetData.result.name, this._skinNetData.qu, this._skinNetData.ozid]);
            }
            else {
                ownerNameTxtStr = LanguageManager.getlocal("skin_ownerNameStr", [this._skinNetData.result.name, this._skinNetData.ozid]);
            }
            ownerNamebg.visible = true;
            var ownerNameTxt = ComponentManager.getTextField(ownerNameTxtStr, 24);
            ownerNameTxt.x = ownerNamebg.x + ownerNamebg.width / 2 - ownerNameTxt.width / 2;
            ownerNameTxt.y = ownerNamebg.y + ownerNamebg.height / 2 - ownerNameTxt.height / 2 + 5;
            this._nodeContainer.addChild(ownerNameTxt);
        }
        else {
            ownerNamebg.visible = false;
        }
        var skinProTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"), 24);
        skinProTxt1.x = pronamebg.x + pronamebg.width / 2 - skinProTxt1.width / 2;
        skinProTxt1.y = pronamebg.y + pronamebg.height / 2 - skinProTxt1.height / 2 + 1;
        this._nodeContainer.addChild(skinProTxt1);
        //拥有者属性
        if (this._skinNetData) {
            var resultData = this._skinNetData.result;
            if (this._wifeSkinId) {
                var attr = [
                    "0",
                    App.StringUtil.changeIntToText(resultData.intimacy),
                    App.StringUtil.changeIntToText(resultData.glamour),
                ];
                for (var index = 1; index <= 2; index++) {
                    var ProTxt = ComponentManager.getTextField("", 22, 0x8cb8d3);
                    ProTxt.text = LanguageManager.getlocal("skindetail_wifeproTxt" + index, [attr[index]]);
                    if (index % 2 == 1) {
                        ProTxt.x = probg.x + 70;
                    }
                    else {
                        ProTxt.x = probg.x + 400;
                    }
                    ProTxt.y = probg.y + 50;
                    this._nodeContainer.addChild(ProTxt);
                }
            }
            else {
                //总属性
                var totalProTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                totalProTxt.text = LanguageManager.getlocal("skindetail_serproTxt0", [App.StringUtil.changeIntToText(resultData.totalattr)]);
                totalProTxt.x = probg.x + probg.width / 2 - totalProTxt.width / 2;
                totalProTxt.y = probg.y + 20;
                this._nodeContainer.addChild(totalProTxt);
                var attr = [
                    "0",
                    App.StringUtil.changeIntToText(resultData.attr.atk),
                    App.StringUtil.changeIntToText(resultData.attr.inte),
                    App.StringUtil.changeIntToText(resultData.attr.politics),
                    App.StringUtil.changeIntToText(resultData.attr.charm),
                ];
                //武智政魅
                for (var index = 1; index <= 4; index++) {
                    var ProTxt = ComponentManager.getTextField("", 20, 0x8cb8d3);
                    ProTxt.text = LanguageManager.getlocal("skindetail_serproTxt" + index, [attr[index]]);
                    if (index % 2 == 1) {
                        ProTxt.x = probg.x + 70;
                    }
                    else {
                        ProTxt.x = probg.x + 400;
                    }
                    if (index > 2) {
                        ProTxt.y = probg.y + 75;
                    }
                    else {
                        ProTxt.y = probg.y + 45;
                    }
                    this._nodeContainer.addChild(ProTxt);
                }
                var servant = Api.servantVoApi.getServantObj(serSkincfg.servantId);
                if (Api.switchVoApi.checkOpenServantSkinAura()) {
                    for (var i in serSkincfg.aura) {
                        var unit = serSkincfg.aura[i];
                        var aura = this._skinNetData.result.aura;
                        var curLevel = aura ? aura[Number(i) - 1] : 0;
                        var index = Number(i);
                        var value = '0';
                        if (unit.growAtt >= 1) {
                            var tmp = unit.growAtt * curLevel;
                            value = App.MathUtil.strip(tmp) + '';
                        }
                        else {
                            var tmp = unit.growAtt * 100 * curLevel;
                            value = App.MathUtil.strip(tmp) + '%';
                        }
                        var text = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinAuraAdd" + index, [String(0x8cb8d3), value]), 20);
                        text.name = "aura" + index;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, probg, [index % 2 == 0 ? 400 : 70, (index < 3 ? 105 : 135)]);
                        this._nodeContainer.addChild(text);
                    }
                }
            }
        }
        else {
            var data_1 = this.param.data;
            var uiType = data_1["uiType"];
            var tipStr = "skin_notOwnTip2";
            if (uiType == 2) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._wifeSkinId)) {
                    tipStr = "skin_notOwnTip3";
                }
                else {
                    tipStr = "skin_notOwnTip";
                }
            }
            else if (uiType == 1) {
                tipStr = "skin_notOwnTip";
            }
            var tipTxt = ComponentManager.getTextField("", 40, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.text = LanguageManager.getlocal(tipStr);
            tipTxt.x = probg.x + probg.width / 2 - tipTxt.width / 2;
            tipTxt.y = probg.y + probg.height / 2 - tipTxt.height / 2 + 10;
            this._nodeContainer.addChild(tipTxt);
        }
        //皮肤属性
        if (serSkincfg) {
            //书籍信息
            var ability = serSkincfg.ability;
            var bookPosY = pronamebg.y + pronamebg.height + 5;
            var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth - 30, GameConfig.stageHeigth - bookPosY - 103);
            var scrollView = ComponentManager.getScrollList(ServantChangeSkinBookItem, ability, rect2, [this._servantSkinId, true]);
            scrollView.x = 30;
            scrollView.y = bookPosY;
            this._nodeContainer.addChild(scrollView);
            // let addAbility = serSkincfg.addAbility;
            // for (let index = 0; index < addAbility.length; index++) {
            //     let blv = 1;
            //     if(this._skinNetData && this._skinNetData.result.ability[addAbility[index]]){
            //          blv = this._skinNetData.result.ability[addAbility[index]].alv;
            //     }
            //     let bid = addAbility[index];
            //     let bookcfg = GameConfig.config.abilityCfg[bid];
            //     let bookprobg = BaseBitmap.create("skin_detail_probg");
            //     bookprobg.width = 600;
            //     bookprobg.height = 115;
            //     bookprobg.x = probg2.x + probg2.width/2 - bookprobg.width/2 ;
            //     bookprobg.y = pronamebg.y + pronamebg.height + 5 + (bookprobg.height +7)* index;
            //     this._nodeContainer.addChild(bookprobg);
            //     let biconBg = BaseBitmap.create("skin_bookbg");
            //     biconBg.x = bookprobg.x + 10;
            //     biconBg.y = bookprobg.y + bookprobg.height/2-biconBg.height/2;
            //     this._nodeContainer.addChild(biconBg);
            //     let bicon =  BaseLoadBitmap.create("servant_infoPro"+bookcfg.type); 
            //     bicon.width = 80;
            //     bicon.height = 90;
            //     bicon.x = biconBg.x +biconBg.width/2 - bicon.width/2;
            //     bicon.y = biconBg.y +biconBg.height/2 - bicon.height/2;
            //     this._nodeContainer.addChild(bicon);
            //     let starsp = this.getServantBookStars(bookcfg.num);
            //     starsp.x = bicon.x +bicon.width/2 - starsp.width/2;
            //     starsp.y = bicon.y + 70;
            //     this._nodeContainer.addChild(starsp);
            //     let bnameTxt =   ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            //     bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bid) + "Lv" + blv;
            //     bnameTxt.x = biconBg.x + biconBg.width +5;
            //     bnameTxt.y = biconBg.y + 15;
            //     this._nodeContainer.addChild(bnameTxt);
            //     let bnameTypeTxt =   ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
            //     bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " "+  (bookcfg.num*blv);
            //     bnameTypeTxt.x = bnameTxt.x+10 ;
            //     bnameTypeTxt.y = bnameTxt.y + 25;
            //     this._nodeContainer.addChild(bnameTypeTxt);
            // }
        }
        else if (wifeSkincfg) {
            // let addvalues = Api.wifeSkinVoApi.getWifeSkinProAdd(wifeSkincfg.id,true);
            var wifeprobg = BaseBitmap.create("skin_detail_probg");
            wifeprobg.width = 600;
            // wifeprobg.height = 100;
            wifeprobg.x = probg2.x + probg2.width / 2 - wifeprobg.width / 2;
            wifeprobg.y = pronamebg.y + pronamebg.height + 5;
            this._nodeContainer.addChild(wifeprobg);
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkincfg.wifeId);
            var servantName = LanguageManager.getlocal("servant_name" + wifeCfg.servantId);
            var addValues = Api.wifeSkinVoApi.getNewWifeSkinProAdd(wifeSkincfg.id);
            for (var i = 0; i < addValues.length; i++) {
                var wifeProTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                var type = addValues[i].type;
                if (type > 0) {
                    if (addValues[i].kind == 1) {
                        var key = "skin_myPro_" + addValues[i].attr;
                        if (type > 2) {
                            key = "skin_myPro_" + addValues[i].attr + "_1";
                        }
                        if (type == 2 || type == 4) {
                            wifeProTxt.text = LanguageManager.getlocal(key, ["" + (addValues[i].value * 100)]) + "%";
                        }
                        else {
                            wifeProTxt.text = LanguageManager.getlocal(key, ["" + addValues[i].value]);
                        }
                    }
                    else {
                        if (type == 2 || type == 4) {
                            wifeProTxt.text = LanguageManager.getlocal("skin_myPro_" + addValues[i].attr, [servantName, "" + (addValues[i].value * 100)]) + "%";
                        }
                        else {
                            wifeProTxt.text = LanguageManager.getlocal("skin_myPro_" + addValues[i].attr, [servantName, "" + addValues[i].value]);
                        }
                    }
                }
                else {
                    wifeProTxt.text = LanguageManager.getlocal("skin_myPro_" + addValues[i].attr, ["" + addValues[i].value]);
                }
                if (i % 2 == 1) {
                    wifeProTxt.x = wifeprobg.x + 360;
                }
                else {
                    wifeProTxt.x = wifeprobg.x + 70;
                }
                wifeProTxt.y = wifeprobg.y + 15 + Math.floor(i / 2) * 25;
                this._nodeContainer.addChild(wifeProTxt);
            }
            var bgH = 15 + (Math.ceil(addValues.length / 2) * 25) + 15;
            wifeprobg.height = bgH > 100 ? bgH : 100;
            // for (let index = 0; index < 6; index++) {
            //     let wifeProTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
            //     let addV = "" + addvalues[index];
            //     if(index < 4 && addvalues[index] == 0 ){
            //         addV = addvalues[index + 6] * 100 + "%";
            //     }
            //     wifeProTxt.text = LanguageManager.getlocal("skin_myPro1_"+index,[ addV]);
            //      if(index < 4 && addvalues[10] == 1)
            //      {
            //          wifeProTxt.text = LanguageManager.getlocal("skin_myPro1_"+(index+10),[servantName, addV]);
            //      }
            //      if(index%2 == 1){
            //         wifeProTxt.x = wifeprobg.x + 360;
            //     }else{
            //         wifeProTxt.x = wifeprobg.x + 70;
            //     }
            //     wifeProTxt.y = wifeprobg.y + 15 + Math.floor(index/2)*25;
            //     this._nodeContainer.addChild(wifeProTxt); 
            // }
        }
    };
    SkinDetailView.prototype.rankBtnHandler = function () {
        var rtype = 1;
        var rskinId = this._servantSkinId;
        if (this._wifeSkinId) {
            rtype = 2;
            rskinId = this._wifeSkinId;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SKINRANKPOPUPVIEW, { rtype: rtype, rskinId: rskinId });
    };
    SkinDetailView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rData = data.data;
            if (rData.ret == 0) {
                this._skinNetData = rData.data;
            }
        }
    };
    SkinDetailView.prototype.getRequestData = function () {
        var data = this.param.data;
        var uiType = data["uiType"];
        var _wifeSkinId = "";
        var _servantSkinId = "";
        var sinfo = undefined;
        if (uiType == 2) {
            _wifeSkinId = data.id;
            if (!Api.wifeSkinVoApi.isOwnSkinOfSkinId(data.id)) {
                return;
            }
            var wifeId = Config.WifeskinCfg.getWifeCfgById(_wifeSkinId).wifeId;
            if (!Api.wifeVoApi.getWifeInfoVoById(wifeId) && Api.wifeSkinVoApi.isOwnSkinOfSkinId(data.id)) {
                return;
            }
        }
        else if (uiType == 1) {
            _servantSkinId = data.id;
            if (!Api.servantVoApi.getServantSkinLV(data.id)) {
                return;
            }
        }
        else if (uiType == 0) {
            if (uiType == 0 && data.wifeId) {
                _wifeSkinId = data.id;
                sinfo = Api.skinVoApi.getWifeSkinFirstInfo(_wifeSkinId);
            }
            else if (uiType == 0 && data.servantId) {
                _servantSkinId = data.id;
                sinfo = Api.skinVoApi.getServantSkinFirstInfo(_servantSkinId);
            }
        }
        var rdata = {
            ruid: "",
            rtype: 1,
            rcsId: "",
            rskinId: _servantSkinId,
        };
        if (_wifeSkinId) {
            rdata.rtype = 2;
            rdata.rskinId = _wifeSkinId;
            rdata.rcsId = Config.WifeskinCfg.getWifeCfgById(_wifeSkinId).wifeId;
        }
        else {
            rdata.rcsId = Config.ServantskinCfg.getServantSkinItemById(_servantSkinId).servantId;
        }
        if (!sinfo) {
            if (uiType == 0) {
                return null;
            }
            rdata.ruid = "" + Api.playerVoApi.getPlayerID();
        }
        else {
            rdata.ruid = sinfo.uid;
        }
        return { requestType: NetRequestConst.REQUST_CROSSSKIN_USERSKINSHOT, requestData: rdata };
    };
    SkinDetailView.prototype.getServantBookStars = function (num) {
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
    SkinDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_buttom_probg", "skin_detail_namebg", "skin_detail_ownernamebg",
            "skin_detail_probg", "skin_detail_pronamebg",
            "skin_proimg1", "skin_proimg2", "skin_proimg3", "skin_proimg4", "skin_proimg5",
            "skin_rankbtn_down", "skin_rankbtn", "skin_bookbg", "servant_star", "skin_detail_buttom_probg2",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
        ]);
    };
    SkinDetailView.prototype.getExtraRuleInfo = function () {
        var msg = "";
        if (Api.switchVoApi.checkOpenServantSkin()) {
            msg += LanguageManager.getlocal("skinviewrule1") + "\n\n";
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            msg += LanguageManager.getlocal("skinviewrule2") + "\n\n";
        }
        msg += LanguageManager.getlocal("skinviewrule3") + "\n\n";
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            msg += LanguageManager.getlocal("skinviewrule4") + "\n\n";
        }
        return msg;
    };
    SkinDetailView.prototype.getRuleInfo = function () {
        return '1';
    };
    SkinDetailView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._wifeSkinId = null;
        this._servantSkinId = null;
        this._skinNetData = null;
        this._inflagImg = null;
        _super.prototype.dispose.call(this);
    };
    return SkinDetailView;
}(CommonView));
__reflect(SkinDetailView.prototype, "SkinDetailView");
//# sourceMappingURL=SkinDetailView.js.map