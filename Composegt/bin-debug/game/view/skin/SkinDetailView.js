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
        if (data.wifeId || data.wid) {
            tarScale = 0.55;
            wifeSkincfg = data;
            if (data.wid) {
                wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(data.wid);
            }
            this._wifeSkinId = wifeSkincfg.id;
            skinImgPath = wifeSkincfg.body;
            bone = wifeSkincfg.bone;
            wifeOrSerNameStr = LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
            skinNameStr = wifeSkincfg.name;
            bgStr = "skin_detailbg2";
        }
        else if (data.servantId || data.slv) {
            skinW = 640;
            skinH = 482;
            serSkincfg = data;
            if (data.slv) {
                this._servantSkinId = data.skinid;
                serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
            }
            bone = serSkincfg.bone;
            var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            this._servantSkinId = serSkincfg.id;
            skinImgPath = serSkincfg.body;
            wifeOrSerNameStr = LanguageManager.getlocal("servant_name" + serSkincfg.servantId);
            skinNameStr = LanguageManager.getlocal("servantSkinName" + serSkincfg.id);
        }
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var infobg = BaseLoadBitmap.create(bgStr);
        infobg.width = 640;
        infobg.height = 720;
        infobg.y = -this.container.y;
        if ((data.servantId || data.slv) && Api.switchVoApi.checkOpenServantSkinAura()) {
            infobg.setload("servantskinauramanbg");
            infobg.height = 498;
            infobg.y = 0;
        }
        this._nodeContainer.addChild(infobg);
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
        if (this._wifeSkinId && !Api.wifeVoApi.isHaveBone(boneName)) {
            dbEnable = false;
        }
        if (!Api.switchVoApi.checkCloseBone() && bone && boneName && dbEnable && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var _droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bone);
            var sv = 0.8;
            if (data.wifeId) {
            }
            else if (data.servantId) {
                sv = 0.9;
            }
            _droWifeIcon.setScale(sv);
            _droWifeIcon.anchorOffsetY = _droWifeIcon.height * sv;
            _droWifeIcon.anchorOffsetX = _droWifeIcon.width / 2 * sv;
            _droWifeIcon.x = GameConfig.stageWidth / 2;
            _droWifeIcon.y = probg2.y + 80;
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
            skinImg.y = probg2.y + 5;
            this._nodeContainer.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("servant_skinnamebg");
        skinnamebg.y = 25;
        skinnamebg.x = 20;
        this._nodeContainer.addChild(skinnamebg);
        var ownerNamebg = BaseBitmap.create("public_lockbg");
        ownerNamebg.y = probg2.y - 50;
        ownerNamebg.x = GameConfig.stageWidth / 2 - ownerNamebg.width / 2;
        this._nodeContainer.addChild(ownerNamebg);
        if (!data["myown"]) {
            //排行榜
            var rankBg = BaseBitmap.create("mainui_bottombtnbg"); //("forpeople_bottom"); 
            rankBg.width *= 1.2;
            rankBg.height *= 1.2;
            rankBg.x = GameConfig.stageWidth - rankBg.width - 10;
            rankBg.y = probg2.y - rankBg.height - 10;
            this._nodeContainer.addChild(rankBg);
            var rankIcon = ComponentManager.getButton("arena_rank", null, this.rankBtnHandler, this, null, 0); //BaseBitmap.create("arena_rank");
            rankIcon.setPosition(rankBg.x + rankBg.width / 2 - rankIcon.width / 2, rankBg.y + rankBg.height / 2 - rankIcon.height / 2 + 5);
            this._nodeContainer.addChild(rankIcon);
            var rankText = BaseBitmap.create("arena_rank_text");
            rankText.setPosition(rankBg.x + rankBg.width / 2 - rankText.width / 2, rankIcon.y + rankIcon.height - 30);
            this._nodeContainer.addChild(rankText);
        }
        // this._nodeContainer.addChild(probg2);
        this._nodeContainer.addChild(probg2);
        var public_listbg = BaseBitmap.create("public_9v_bg09");
        public_listbg.width = probg2.width - 30;
        public_listbg.x = probg2.x + 15;
        public_listbg.y = probg2.y + 25;
        public_listbg.height = probg2.height - 60;
        this._nodeContainer.addChild(public_listbg);
        var proTopTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinview_DetaipTopTxt1"), 24, TextFieldConst.COLOR_BROWN);
        if (wifeSkincfg) {
            proTopTxt.text = LanguageManager.getlocal("skinview_DetaipTopTxt2");
        }
        proTopTxt.x = probg2.x + probg2.width / 2 - proTopTxt.width / 2;
        proTopTxt.y = public_listbg.y + 15;
        this._nodeContainer.addChild(proTopTxt);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.anchorOffsetY = leftLine.height / 2;
        leftLine.setPosition(probg2.x + probg2.width / 2 - leftLine.width - 90, proTopTxt.y + 10);
        this._nodeContainer.addChild(leftLine);
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.anchorOffsetX = rightLine.width / 2;
        rightLine.anchorOffsetY = rightLine.height / 2;
        rightLine.rotation = 180;
        rightLine.setPosition(probg2.x + probg2.width / 2 + rightLine.width / 2 + 90, leftLine.y);
        this._nodeContainer.addChild(rightLine);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x = skinnamebg.x + 25;
        skinNameTxt.y = skinnamebg.y + 15;
        this._nodeContainer.addChild(skinNameTxt);
        var wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeOrSerNameTxt.x = skinNameTxt.x;
        wifeOrSerNameTxt.y = skinNameTxt.y + 25;
        this._nodeContainer.addChild(wifeOrSerNameTxt);
        var ownerNameTxtStr = ""; //LanguageManager.getlocal("skin_ownerNameStr2");
        ownerNamebg.visible = false;
        if (this._skinNetData) {
            // skin_ownerNameStr3
            if (!data["myown"]) {
                if (this._skinNetData.qu) {
                    ownerNameTxtStr = LanguageManager.getlocal("skin_ownerNameStr3", [this._skinNetData.result.name, this._skinNetData.qu, this._skinNetData.ozid]);
                }
                else {
                    ownerNameTxtStr = LanguageManager.getlocal("skin_ownerNameStr", [this._skinNetData.result.name, this._skinNetData.ozid]);
                }
                ownerNamebg.visible = true;
                // }else{
                //     ownerNameTxtStr = this._skinNetData.result.name ;
            }
            var ownerNameTxt = ComponentManager.getTextField(ownerNameTxtStr, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            ownerNameTxt.x = GameConfig.stageWidth / 2 - ownerNameTxt.width / 2;
            ownerNameTxt.y = ownerNamebg.y + ownerNamebg.height / 2 - ownerNameTxt.height / 2;
            ownerNamebg.width = ownerNameTxt.width + 120;
            ownerNamebg.x = GameConfig.stageWidth / 2 - ownerNamebg.width / 2;
            this._nodeContainer.addChild(ownerNameTxt);
        }
        else {
            ownerNamebg.visible = false;
        }
        // let skinProTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"),24,TextFieldConst.COLOR_BROWN);
        // skinProTxt1.x = probg2.x + probg2.width/2 - skinProTxt1.width/2;
        // skinProTxt1.y = probg2.y + probg2.height/2 - skinProTxt1.height/2+1;
        // this._nodeContainer.addChild(skinProTxt1);
        //拥有者属性
        if (this._skinNetData) {
            var resultData = this._skinNetData.result;
            if (this._wifeSkinId) {
                var lvtxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_wifeskinLv", [resultData.wlv]), 22, TextFieldConst.COLOR_BROWN);
                lvtxt.x = probg2.x + probg2.width / 2 - lvtxt.width / 2;
                lvtxt.y = proTopTxt.y + 40;
                this._nodeContainer.addChild(lvtxt);
                var attr = [
                    "0",
                    App.StringUtil.changeIntToText(resultData.intimacy),
                    App.StringUtil.changeIntToText(resultData.glamour),
                ];
                for (var index = 1; index <= 2; index++) {
                    var ProTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                    ProTxt.text = LanguageManager.getlocal("skindetail_wifeproTxt" + index, [attr[index]]);
                    if (index % 2 == 1) {
                        ProTxt.x = probg2.x + 70;
                    }
                    else {
                        ProTxt.x = probg2.x + 400;
                    }
                    ProTxt.y = lvtxt.y + 32;
                    this._nodeContainer.addChild(ProTxt);
                }
            }
            else {
                //总属性
                var totalProTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
                totalProTxt.text = LanguageManager.getlocal("skindetail_serproTxt0", [App.StringUtil.changeIntToText(resultData.totalattr)]);
                totalProTxt.x = probg2.x + probg2.width / 2 - totalProTxt.width / 2;
                totalProTxt.y = proTopTxt.y + 40;
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
                    var ProTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                    ProTxt.text = LanguageManager.getlocal("skindetail_serproTxt" + index, [attr[index]]);
                    if (index % 2 == 1) {
                        ProTxt.x = probg2.x + 70;
                    }
                    else {
                        ProTxt.x = probg2.x + 400;
                    }
                    if (index > 2) {
                        ProTxt.y = totalProTxt.y + 60;
                    }
                    else {
                        ProTxt.y = totalProTxt.y + 30;
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
                        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, probg2, [index % 2 == 0 ? 400 : 70, (index < 3 ? 105 : 135)]);
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
            var tipTxt = ComponentManager.getTextField("", 30, TextFieldConst.COLOR_BROWN);
            tipTxt.text = LanguageManager.getlocal(tipStr);
            tipTxt.x = probg2.x + probg2.width / 2 - tipTxt.width / 2;
            tipTxt.y = probg2.y + 100;
            this._nodeContainer.addChild(tipTxt);
        }
        var dropDescBg = BaseBitmap.create("public_left2");
        dropDescBg.width = 604;
        dropDescBg.height = 30;
        dropDescBg.x = probg2.x + probg2.width / 2 - dropDescBg.width / 2;
        dropDescBg.y = probg2.y + probg2.height - dropDescBg.height - 38;
        this._nodeContainer.addChild(dropDescBg);
        var dropTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2;
        dropTxt.y = dropDescBg.y + 7;
        this._nodeContainer.addChild(dropTxt);
        //皮肤属性
        if (serSkincfg) {
            dropTxt.text = serSkincfg.getSkinDropDesc();
            var proTopTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"), 24, TextFieldConst.COLOR_BROWN);
            proTopTxt2.x = probg2.x + probg2.width / 2 - proTopTxt.width / 2;
            proTopTxt2.y = proTopTxt.y + 130;
            this._nodeContainer.addChild(proTopTxt2);
            var leftLine2 = BaseBitmap.create("public_v_huawen01");
            leftLine2.anchorOffsetY = leftLine.height / 2;
            leftLine2.setPosition(leftLine.x, proTopTxt2.y + 10);
            this._nodeContainer.addChild(leftLine2);
            var rightLine2 = BaseBitmap.create("public_v_huawen01");
            rightLine2.anchorOffsetX = rightLine.width / 2;
            rightLine2.anchorOffsetY = rightLine.height / 2;
            rightLine2.rotation = 180;
            rightLine2.setPosition(rightLine.x, leftLine2.y);
            this._nodeContainer.addChild(rightLine2);
            //书籍信息
            var addAbility = serSkincfg.addAbility;
            for (var index = 0; index < addAbility.length; index++) {
                var blv = 1;
                if (this._skinNetData) {
                    blv = this._skinNetData.result.ability[addAbility[index]].alv;
                }
                var bid = addAbility[index];
                var bookcfg = GameConfig.config.abilityCfg[bid];
                var bookprobg = BaseBitmap.create("public_9v_bg09");
                bookprobg.width = 600;
                bookprobg.height = 115;
                bookprobg.x = probg2.x + probg2.width / 2 - bookprobg.width / 2;
                bookprobg.y = proTopTxt2.y + 35 + (bookprobg.height + 7) * index;
                this._nodeContainer.addChild(bookprobg);
                var biconBg = BaseBitmap.create("public_left");
                biconBg.width = 110;
                biconBg.height = bookprobg.height - 12;
                biconBg.x = bookprobg.x + 5.5;
                biconBg.y = bookprobg.y + 5.5;
                this._nodeContainer.addChild(biconBg);
                var bicon = BaseLoadBitmap.create("servant_infoPro" + bookcfg.type);
                bicon.width = 80;
                bicon.height = 90;
                bicon.x = biconBg.x + biconBg.width / 2 - bicon.width / 2;
                bicon.y = biconBg.y + biconBg.height / 2 - bicon.height / 2;
                this._nodeContainer.addChild(bicon);
                var starsp = this.getServantBookStars(bookcfg.num);
                starsp.x = bicon.x + bicon.width / 2 - starsp.width / 2;
                starsp.y = bicon.y + 70;
                this._nodeContainer.addChild(starsp);
                var bnameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bid) + "Lv" + blv;
                bnameTxt.x = biconBg.x + biconBg.width + 5;
                bnameTxt.y = biconBg.y + 15;
                this._nodeContainer.addChild(bnameTxt);
                var bnameTypeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
                bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " " + (bookcfg.num * blv);
                bnameTypeTxt.x = bnameTxt.x + 10;
                bnameTypeTxt.y = bnameTxt.y + 25;
                this._nodeContainer.addChild(bnameTypeTxt);
            }
        }
        else if (wifeSkincfg) {
            dropTxt.text = wifeSkincfg.dropDesc;
            var addvalues = Api.wifeSkinVoApi.getWifeSkinProAdd(wifeSkincfg.id, true);
            // let wifeprobg = BaseBitmap.create("skin_detail_probg");
            // wifeprobg.width = 600;
            // wifeprobg.height = 100;
            // wifeprobg.x = probg2.x + probg2.width/2 - wifeprobg.width/2 ;
            // wifeprobg.y = proTopTxt.y + 35;
            // this._nodeContainer.addChild(wifeprobg);
            var proTopTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"), 24, TextFieldConst.COLOR_BROWN);
            proTopTxt2.x = probg2.x + probg2.width / 2 - proTopTxt.width / 2;
            proTopTxt2.y = proTopTxt.y + 130;
            this._nodeContainer.addChild(proTopTxt2);
            var leftLine2 = BaseBitmap.create("public_v_huawen01");
            leftLine2.anchorOffsetY = leftLine.height / 2;
            leftLine2.setPosition(leftLine.x, proTopTxt2.y + 10);
            this._nodeContainer.addChild(leftLine2);
            var rightLine2 = BaseBitmap.create("public_v_huawen01");
            rightLine2.anchorOffsetX = rightLine.width / 2;
            rightLine2.anchorOffsetY = rightLine.height / 2;
            rightLine2.rotation = 180;
            rightLine2.setPosition(rightLine.x, leftLine2.y);
            this._nodeContainer.addChild(rightLine2);
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
                    this._nodeContainer.addChild(skprobg);
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
                this._nodeContainer.addChild(wifeProTxt);
            }
        }
        dropTxt.anchorOffsetX = dropTxt.width / 2;
    };
    SkinDetailView.prototype.rankBtnHandler = function () {
        if (!this._skinNetData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("skin_notOwnTip4"));
            return;
        }
        var rtype = 1;
        var rskinId = this._servantSkinId;
        if (this._wifeSkinId) {
            rtype = 2;
            rskinId = this._wifeSkinId;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SKINRANKPOPUPVIEW, { rtype: rtype, rskinId: rskinId });
    };
    SkinDetailView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            this._skinNetData = rData.data;
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
            "skin_detail_probg",
            // "skin_proimg1","skin_proimg2","skin_proimg3","skin_proimg4","skin_proimg5",
            "skin_rankbtn_down", "skin_rankbtn", "skin_bookbg", "servant_star",
            "arena_rank", "arena_rank_text", "forpeople_bottom", "wifeview_xinxibanbg",
            "servant_skinnamebg", "public_v_huawen01",
        ]);
    };
    SkinDetailView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenServantSkin() && !Api.switchVoApi.checkCloseWifeskin()) {
            return "skinview_description1";
        }
        else if (Api.switchVoApi.checkOpenServantSkin()) {
            return "skinview_description3";
        }
        return "skinview_description2";
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
