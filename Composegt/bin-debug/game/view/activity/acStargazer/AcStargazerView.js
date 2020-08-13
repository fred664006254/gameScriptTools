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
var AcStargazerView = (function (_super) {
    __extends(AcStargazerView, _super);
    function AcStargazerView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText1 = null;
        _this._inOrderText2 = null;
        _this._inOrderText3 = null;
        _this._inOrderText4 = null;
        _this._aniPlaying = false;
        // private _animPlaying:boolean = false;
        _this._acvo = undefined;
        _this._rechargeBg = null;
        _this._rewardLookBg = null;
        // --------------
        _this._searchtxt = null;
        _this._searchdesc = null;
        _this._searchBtn = null;
        _this._bg1 = null;
        _this._bg2 = null;
        _this._innerCircle = null;
        _this._outerCircle = null;
        //每个形象的角度
        _this._degress = 30;
        _this._loopTime = 30000;
        _this._temp = null;
        _this._centerCircle = null;
        _this._starMap0 = null;
        _this._starMap1 = null;
        _this._starMap2 = null;
        _this._starMap3 = null;
        _this._starMap4 = null;
        _this._cfg = null;
        _this._reward = null;
        _this._btnidleEffect = null;
        _this._btnclickEffect = null;
        _this._lightoverEffect = null;
        _this._lightstartEffect = null;
        _this._starLine = null;
        _this._topBg = null;
        _this._bottomBg = null;
        _this._circleEffect = null;
        _this._bgContent = null;
        _this._starPos = [
            [
                { x: 88, y: 122, isBig: false },
                { x: 126, y: 94, isBig: true },
                { x: 163, y: 122, isBig: true },
                { x: 135, y: 163, isBig: false },
                { x: 81, y: 207, isBig: true },
                { x: 26, y: 218, isBig: true },
                { x: 73, y: 248, isBig: false },
                { x: 104, y: 243, isBig: true },
                { x: 109, y: 281, isBig: false },
                { x: 69, y: 300, isBig: true },
                { x: 175, y: 254, isBig: true },
                { x: 201, y: 223, isBig: true },
                { x: 232, y: 239, isBig: false },
                { x: 236, y: 288, isBig: true },
                { x: 195, y: 325, isBig: true },
                { x: 236, y: 186, isBig: true },
                { x: 316, y: 202, isBig: true },
                { x: 355, y: 202, isBig: true },
                { x: 277, y: 133, isBig: false },
                { x: 248, y: 101, isBig: false },
            ],
            [
                { x: 109, y: 105, isBig: true },
                { x: 108, y: 154, isBig: false },
                { x: 71, y: 212, isBig: true },
                { x: 83, y: 275, isBig: true },
                { x: 117, y: 241, isBig: false },
                { x: 153, y: 205, isBig: true },
                { x: 158, y: 140, isBig: true },
                { x: 193, y: 179, isBig: false },
                { x: 211, y: 124, isBig: false },
                { x: 240, y: 164, isBig: true },
                { x: 163, y: 52, isBig: true },
                { x: 264, y: 105, isBig: true },
                { x: 282, y: 69, isBig: true },
                { x: 175, y: 253, isBig: true },
                { x: 144, y: 293, isBig: false },
                { x: 222, y: 275, isBig: true },
                { x: 223, y: 308, isBig: true },
                { x: 258, y: 241, isBig: false },
                { x: 293, y: 188, isBig: true },
                { x: 310, y: 124, isBig: false },
            ],
            [
                { x: 88, y: 77, isBig: true },
                { x: 157, y: 132, isBig: true },
                { x: 88, y: 160, isBig: false },
                { x: 11, y: 132, isBig: true },
                { x: 2, y: 176, isBig: false },
                { x: 32, y: 208, isBig: true },
                { x: 82, y: 213, isBig: true },
                { x: 110, y: 197, isBig: true },
                { x: 121, y: 250, isBig: false },
                { x: 75, y: 283, isBig: true },
                { x: 184, y: 223, isBig: false },
                { x: 215, y: 272, isBig: true },
                { x: 257, y: 215, isBig: false },
                { x: 248, y: 169, isBig: true },
                { x: 244, y: 108, isBig: false },
                { x: 281, y: 61, isBig: true },
                { x: 307, y: 224, isBig: true },
                { x: 328, y: 166, isBig: false },
                { x: 365, y: 163, isBig: true },
                { x: 359, y: 208, isBig: true },
            ],
            [
                { x: 59, y: 96, isBig: true },
                { x: 109, y: 106, isBig: false },
                { x: 43, y: 178, isBig: true },
                { x: 13, y: 182, isBig: false },
                { x: 90, y: 240, isBig: true },
                { x: 129, y: 264, isBig: false },
                { x: 122, y: 286, isBig: true },
                { x: 176, y: 235, isBig: true },
                { x: 184, y: 204, isBig: false },
                { x: 167, y: 183, isBig: true },
                { x: 164, y: 140, isBig: true },
                { x: 189, y: 113, isBig: true },
                { x: 212, y: 95, isBig: true },
                { x: 252, y: 133, isBig: true },
                { x: 214, y: 172, isBig: false },
                { x: 236, y: 235, isBig: false },
                { x: 289, y: 228, isBig: true },
                { x: 298, y: 275, isBig: true },
                { x: 326, y: 199, isBig: true },
                { x: 330, y: 147, isBig: false },
            ]
        ];
        return _this;
    }
    Object.defineProperty(AcStargazerView.prototype, "cfg", {
        get: function () {
            if (!this._cfg) {
                this._cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            }
            return this._cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcStargazerView.prototype.getBgName = function () {
        return this.getDefaultRes("acstargazer_bg");
    };
    AcStargazerView.prototype.initBg = function () {
        // let bgName:string=this.getBgName();
        // this._bg1 = BaseBitmap.create(bgName);
        // this._bg1.y = GameConfig.stageHeigth/2 - 1136/2;
        // this.addChild(this._bg1);
        var _this = this;
        // this._bg2 = BaseBitmap.create(bgName);
        // this._bg2.y = GameConfig.stageHeigth/2 - 1136/2;
        // this.addChild(this._bg2);
        // // this._bg2.x = -this._bg1.width;
        // this._bg2.x = -668;
        // let onePageTime = 60000;
        // egret.Tween.get(this._bg1)
        // .to({x:668},onePageTime)
        // .set({x:-668})
        // .call(()=>{
        // 	egret.Tween.removeTweens(this._bg1);
        // 	egret.Tween.get(this._bg1,{loop:true})
        // 	.to({x:668},onePageTime * 2)
        // 	.set({x:-667})
        // });
        // egret.Tween.removeTweens(this._bg2);
        // egret.Tween.get(this._bg2,{loop:true})
        // .to({x:668},onePageTime * 2)
        // .set({x:-667})
        var bgName = this.getBgName();
        var bgContent = new BaseDisplayObjectContainer();
        bgContent.height = 1136;
        bgContent.x = 640;
        bgContent.y = GameConfig.stageHeigth / 2 - 1136 / 2;
        this.addChild(bgContent);
        this._bg1 = BaseBitmap.create(bgName);
        this._bg2 = BaseBitmap.create(bgName);
        bgContent.addChild(this._bg1);
        bgContent.addChild(this._bg2);
        this._bg1.x = -this._bg1.width;
        this._bg1.y = 0;
        this._bg2.x = -this._bg1.width * 2;
        this._bg2.y = 0;
        this._temp = { t: 0 };
        egret.Tween.get(this._temp, { onChange: function () {
                bgContent.x += 0.2;
                if (_this._bg1.x + bgContent.x > 640) {
                    _this._bg1.x = _this._bg2.x - _this._bg1.width;
                }
                if (_this._bg2.x + bgContent.x > 640) {
                    _this._bg2.x = _this._bg1.x - _this._bg2.width;
                }
            }, onChangeObj: this, loop: true })
            .to({ t: 1 }, 1000);
    };
    AcStargazerView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_STARGAZER_REFRESH, this.refreshUIInfos, this);
        this._acvo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var titleFont = BaseBitmap.create(this.getDefaultRes("acstargazer_titletxt"));
        titleFont.x = GameConfig.stageWidth / 2 - titleFont.width / 2;
        titleFont.y = 0;
        this.addChild(titleFont);
        this.initCircle();
        this.showText();
        //下面属性背景
        var bottomBg = BaseBitmap.create(this.getDefaultRes("acstargazer_bottom"));
        bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = 160;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        var searchtxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt.text = LanguageManager.getlocal("acStargazer_count", ["0"]);
        searchtxt.x = GameConfig.stageWidth / 2 - searchtxt.width / 2;
        searchtxt.y = bottomBg.y + 73;
        // searchtxt.visible = false;
        this.addChildToContainer(searchtxt);
        this._searchtxt = searchtxt;
        this._searchdesc = ComponentManager.getTextField(LanguageManager.getlocal("acStargazer_countdesc"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._searchdesc.x = GameConfig.stageWidth / 2 - this._searchdesc.width / 2;
        this._searchdesc.y = searchtxt.y - this._searchdesc.height - 1;
        this.addChildToContainer(this._searchdesc);
        var searchBtn = ComponentManager.getButton(this.getDefaultRes("acstargazer_centerbtn"), null, this.searchHandler, this, [1]);
        searchBtn.x = GameConfig.stageWidth / 2 - searchBtn.width / 2;
        searchBtn.y = bottomBg.y - 80 + 8;
        searchBtn.name = "searchBtn";
        this.addChildToContainer(searchBtn);
        this._searchBtn = searchBtn;
        this._btnidleEffect = ComponentManager.getCustomMovieClip("acstargazer_btnidle", 13, 70);
        this._btnidleEffect.x = searchBtn.x + searchBtn.width / 2 - 126 / 2;
        this._btnidleEffect.y = searchBtn.y + searchBtn.height / 2 - 127 / 2;
        this.addChildToContainer(this._btnidleEffect);
        this._btnidleEffect.playWithTime(-1);
        // 兑换
        var rewardLookBtn = ComponentManager.getButton(this.getDefaultRes("acstargazer_changebtn"), "", this.rewardLookClick, this);
        rewardLookBtn.x = 125 - rewardLookBtn.width / 2;
        rewardLookBtn.y = bottomBg.y + 15 - rewardLookBtn.height / 2;
        rewardLookBtn.name = "rewardLookBtn";
        this.addChildToContainer(rewardLookBtn);
        var rewardLookTxt = BaseBitmap.create("ransackTraitorSP_exchangetxt");
        rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width / 2 - rewardLookTxt.width / 2;
        rewardLookTxt.y = rewardLookBtn.y + rewardLookBtn.height;
        this.addChildToContainer(rewardLookTxt);
        this._rewardLookBtn = rewardLookBtn;
        // 充值
        var rechargeBtn = ComponentManager.getButton(this.getDefaultRes("acstargazer_rechargebtn"), "", this.rechargeClick, this);
        rechargeBtn.x = 515 - rechargeBtn.width / 2;
        rechargeBtn.y = bottomBg.y + 15 - rechargeBtn.height / 2;
        this.addChildToContainer(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("ransackTraitorSP_rechargetxt");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + rechargeBtn.height;
        this.addChildToContainer(rechargeTxt);
        this.refreshUIInfos();
        ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERSTORYVIEW, { aid: this.aid, code: this.code });
    };
    AcStargazerView.prototype.initCircle = function () {
        this._innerCircle = BaseBitmap.create(this.getDefaultRes("acstargazer_innercircle"));
        this._outerCircle = BaseBitmap.create(this.getDefaultRes("acstargazer_outercircle"));
        this._innerCircle.anchorOffsetX = this._innerCircle.width / 2;
        this._innerCircle.anchorOffsetY = this._innerCircle.height / 2;
        this._innerCircle.x = GameConfig.stageWidth / 2;
        this._innerCircle.y = GameConfig.stageHeigth / 2 + 52;
        this._outerCircle.anchorOffsetX = this._outerCircle.width / 2;
        this._outerCircle.anchorOffsetY = this._outerCircle.height / 2;
        this._outerCircle.x = GameConfig.stageWidth / 2;
        this._outerCircle.y = GameConfig.stageHeigth / 2 + 52;
        this.addChildToContainer(this._innerCircle);
        this.addChildToContainer(this._outerCircle);
        if (App.CommonUtil.check_dragon() && RES.hasRes("acstargazer_zhuan_ske")) {
            this._circleEffect = App.DragonBonesUtil.getLoadDragonBones("acstargazer_zhuan");
            this._circleEffect.x = this._innerCircle.x;
            this._circleEffect.y = this._innerCircle.y;
            this.addChildToContainer(this._circleEffect);
            this._circleEffect.visible = false;
        }
        egret.Tween.get(this._innerCircle, { loop: true })
            .to({ rotation: -360 }, 60000);
        egret.Tween.get(this._outerCircle, { loop: true })
            .to({ rotation: 360 }, 60000);
        var mask = BaseBitmap.create(this.getDefaultRes("acstargazer_circlemask"));
        mask.x = this._innerCircle.x - mask.width / 2;
        mask.y = this._innerCircle.y - mask.height / 2;
        this.addChildToContainer(mask);
        this._centerCircle = new BaseDisplayObjectContainer();
        this._centerCircle.width = 100;
        this._centerCircle.height = 100;
        this._centerCircle.anchorOffsetX = this._centerCircle.width / 2;
        this._centerCircle.anchorOffsetY = this._centerCircle.height / 2;
        this.addChildToContainer(this._centerCircle);
        this._centerCircle.mask = mask;
        var radius = 900; // this._centerCircle.y - this._innerCircle.y;
        //角度
        var degress = this._degress;
        //弧度
        var rad = degress * (Math.PI / 180);
        this._centerCircle.x = GameConfig.stageWidth / 2;
        this._centerCircle.y = this._innerCircle.y + radius; //GameConfig.stageHeigth;
        this.addChildToContainer(this._centerCircle);
        for (var i = 0; i < 5; i++) {
            if (i == 4) {
                var starMap = new BaseDisplayObjectContainer();
                var starIcon = BaseBitmap.create(this.getDefaultRes("acstargazer_starimg_" + (0 + 1)));
                starMap.width = starIcon.width;
                starMap.height = starIcon.height;
                starMap.addChild(starIcon);
                starMap.anchorOffsetX = starMap.width / 2;
                starMap.anchorOffsetY = starMap.height / 2;
                var temp1 = Math.sin(i * rad) * radius;
                var temp2 = Math.cos(i * rad) * radius;
                var temp3 = this._centerCircle.width / 2;
                var temp4 = this._centerCircle.height / 2;
                starMap.x = this._centerCircle.width / 2 - Math.sin(i * rad) * radius;
                starMap.y = this._centerCircle.height / 2 - Math.cos(i * rad) * radius;
                starMap.rotation = -i * degress;
                this._centerCircle.addChild(starMap);
                this["_starMap" + i] = starMap;
                var shopItem = this.acVo.config.exchangeShop[0];
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
                var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acStargazer_name", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                nameTF.x = starMap.width / 2 - nameTF.width / 2;
                nameTF.y = starMap.height - nameTF.height - 25;
                starMap.addChild(nameTF);
                // this._starMap
                var allCount = shopItem["proofNum"];
                var itemCount = this._acvo.getItemNumByIndex(String(shopItem.itemID));
                var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
                var starPos = this._starPos[0];
                for (var j = 0; j < starPos.length; j++) {
                    if (!isOwn && j >= itemCount) {
                        break;
                    }
                    var pos = starPos[j];
                    var star = null;
                    if (pos.isBig) {
                        star = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_" + (0 + 1)));
                    }
                    else {
                        star = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_" + (0 + 1)));
                    }
                    star.x = pos.x;
                    star.y = pos.y;
                    starMap.addChild(star);
                }
            }
            else {
                var starMap = new BaseDisplayObjectContainer();
                var starIcon = BaseBitmap.create(this.getDefaultRes("acstargazer_starimg_" + (i + 1)));
                starMap.width = starIcon.width;
                starMap.height = starIcon.height;
                starMap.addChild(starIcon);
                starMap.anchorOffsetX = starMap.width / 2;
                starMap.anchorOffsetY = starMap.height / 2;
                var temp1 = Math.sin(i * rad) * radius;
                var temp2 = Math.cos(i * rad) * radius;
                var temp3 = this._centerCircle.width / 2;
                var temp4 = this._centerCircle.height / 2;
                starMap.x = this._centerCircle.width / 2 - Math.sin(i * rad) * radius;
                starMap.y = this._centerCircle.height / 2 - Math.cos(i * rad) * radius;
                starMap.rotation = -i * degress;
                this._centerCircle.addChild(starMap);
                this["_starMap" + i] = starMap;
                var shopItem = this.acVo.config.exchangeShop[i];
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
                var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acStargazer_name", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                nameTF.x = starMap.width / 2 - nameTF.width / 2;
                nameTF.y = starMap.height - nameTF.height - 25;
                starMap.addChild(nameTF);
                // this._starMap
                var allCount = shopItem["proofNum"];
                var itemCount = this._acvo.getItemNumByIndex(String(shopItem.itemID));
                var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
                var starPos = this._starPos[i];
                for (var j = 0; j < starPos.length; j++) {
                    if (!isOwn && j >= itemCount) {
                        break;
                    }
                    var pos = starPos[j];
                    var star = null;
                    if (pos.isBig) {
                        star = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_" + (i + 1)));
                    }
                    else {
                        star = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_" + (i + 1)));
                    }
                    star.x = pos.x;
                    star.y = pos.y;
                    starMap.addChild(star);
                }
            }
        }
        egret.Tween.get(this._centerCircle, { loop: true })
            .to({ rotation: degress * 4 }, this._loopTime)
            .set({ rotation: 0 });
    };
    AcStargazerView.prototype.resetCircle = function () {
        var _this = this;
        egret.Tween.removeTweens(this._centerCircle);
        var curRad = this._centerCircle.rotation;
        var time = (this._degress * 4 - curRad) / (this._degress * 4) * this._loopTime;
        egret.Tween.get(this._centerCircle)
            .to({ rotation: this._degress * 4 }, time)
            .set({ rotation: 0 })
            .call(function () {
            egret.Tween.removeTweens(_this._centerCircle);
            egret.Tween.get(_this._centerCircle, { loop: true })
                .to({ rotation: _this._degress * 4 }, _this._loopTime)
                .set({ rotation: 0 });
        });
    };
    AcStargazerView.prototype.rechargeClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcStargazerView.prototype.refreshUIInfos = function () {
        this._searchtxt.text = LanguageManager.getlocal("acStargazer_count", [this.acVo["cannum"]]);
        var cfg = this.acVo.config;
        var exchangeShop = cfg.exchangeShop;
        var deltaY = 3;
        for (var i = 0; i < exchangeShop.length; i++) {
            var shopItem = exchangeShop[i];
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
            var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
            var txt = null; //ransackTraitorSP_txt6
            if (isOwn) {
                txt = LanguageManager.getlocal("acStargazer_starNumOver", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]);
            }
            else {
                txt = LanguageManager.getlocal("acStargazer_starNum", [LanguageManager.getlocal("servant_name" + skincfg.servantId), this._acvo.getItemNumByIndex(String(shopItem.itemID)), shopItem["proofNum"]]);
            }
            //罪证
            if (!this["_inOrderText" + (i + 1)]) {
                break;
            }
            this["_inOrderText" + (i + 1)].text = txt;
            if (i == 0) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 1) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 2) {
                this["_inOrderText" + (i + 1)].x = this._activityTimerText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            else if (i == 3) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            this.addChildToContainer(this._inOrderText1);
        }
        var idfall = this.acVo.isExchangeEnable();
        var searchAll = this._acvo.checkSearchAll();
        if (searchAll) {
            App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn"));
            if (this._searchtxt) {
                this._searchtxt.visible = false;
                this._searchdesc.visible = false;
            }
        }
        else {
            if (this.acVo["cannum"] >= 10) {
                this._searchdesc.visible = true;
            }
            else {
                this._searchdesc.visible = false;
            }
        }
        if (idfall) {
            App.CommonUtil.addIconToBDOC(this._rewardLookBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardLookBtn);
        }
    };
    AcStargazerView.prototype.rewardLookClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZEREXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcStargazerView.prototype.searchHandler = function (param) {
        // if(1==1){
        // 	this.showStarLine();
        // 	return;
        // }
        if (this._aniPlaying) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this._acvo.checkSearchAll()) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZEREXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
            return;
        }
        if (this.acVo["cannum"] < param) {
            var rewardStr = LanguageManager.getlocal("acStargazer_notEnough", [this.acVo["cannum"]]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.rechargeClick,
                handler: this,
                needCancel: true
            });
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_STAZERSERCH, this.searchHandlerNetBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_STAZERSERCH, { activeId: this.acVo.aidAndCode });
    };
    AcStargazerView.prototype.searchHandlerNetBack = function (event) {
        var _this = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_STAZERSERCH, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            this._reward = rewards;
            //序列帧
            // this._aniPlaying = true;
            this._aniPlaying = true;
            if (!this._btnclickEffect) {
                this._btnclickEffect = ComponentManager.getCustomMovieClip("acstargazer_btnclick", 12, 70);
                this._btnclickEffect.x = this._searchBtn.x + this._searchBtn.width / 2 - 126 / 2;
                this._btnclickEffect.y = this._searchBtn.y + this._searchBtn.height / 2 - 127 / 2;
                this.addChildToContainer(this._btnclickEffect);
                this._btnclickEffect.setEndCallBack(function () {
                    _this._btnclickEffect.visible = false;
                }, this);
            }
            this._btnclickEffect.visible = true;
            this._btnclickEffect.playWithTime(1);
            var isFind = false;
            var RansackItemID = this.acVo.config.RansackItemID;
            var findItemIndex = -1;
            for (var i = 0; i < RansackItemID.length; i++) {
                var id = RansackItemID[i];
                var itemStr = "6_" + id + "_1";
                if (rewards.indexOf(itemStr) > -1) {
                    findItemIndex = i;
                    isFind = true;
                }
            }
            if (findItemIndex > -1) {
                var itemId = RansackItemID[findItemIndex];
                var zzNum = this._acvo.getItemNumByIndex(String(itemId));
                var baseRad = 30;
                var rad = findItemIndex * baseRad;
                var curRad = this._centerCircle.rotation;
                egret.Tween.removeTweens(this._centerCircle);
                if (this._circleEffect) {
                    this._circleEffect.visible = true;
                    this._circleEffect.playDragonMovie("zhuan", 1);
                    this._circleEffect.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this._circleEffect.visible = false;
                    }, this);
                }
                if (rad >= curRad) {
                    egret.Tween.get(this._centerCircle)
                        .to({ rotation: rad }, 600)
                        .call(this.showStarLine, this, [findItemIndex, isFind]);
                }
                else {
                    // egret.Tween.get(this._centerCircle)
                    // .to({rotation:30 * 4},(30 * 4 - curRad)/360 * 1800)//,egret.Ease.sineOut
                    // .set({rotation : 0})
                    // .to({rotation: rad},rad / 360 *1800)
                    // .call(this.showStarLine,this,[findItemIndex,isFind]);
                    egret.Tween.get(this._centerCircle)
                        .to({ rotation: 30 * 4 }, (30 * 4 - curRad) / (30 * 4 - curRad + rad) * 600) //,egret.Ease.sineOut
                        .set({ rotation: 0 })
                        .to({ rotation: rad }, rad / (30 * 4 - curRad + rad) * 600)
                        .call(this.showStarLine, this, [findItemIndex, isFind]);
                }
            }
            else {
                egret.Tween.get(this)
                    .wait(1000)
                    .call(this.showStarLine, this, [findItemIndex, isFind]);
            }
        }
    };
    AcStargazerView.prototype.showStarLine = function (findItemIndex, isFind) {
        var _this = this;
        // private showStarLine():void {
        var pos = null;
        if (findItemIndex > -1) {
            var RansackItemID = this.acVo.config.RansackItemID;
            var itemId = RansackItemID[findItemIndex];
            var zzNum = this._acvo.getItemNumByIndex(String(itemId));
            pos = this._starPos[findItemIndex][zzNum - 1];
        }
        else {
            // pos = {x: 0,y: 0,isBig:false};
            var partList = [
                { x: 0, y: this._topBg.y + this._topBg.height, width: 640 / 2 - 520 / 2, height: this._bottomBg.y - this._topBg.y - this._topBg.height },
                { x: 640 - 320 + 520 / 2, y: this._topBg.y + this._topBg.height, width: 640 / 2 - 520 / 2, height: this._bottomBg.y - this._topBg.y - this._topBg.height },
            ];
            var part = partList[Math.floor(Math.random() * partList.length)];
            pos = { x: part.x + part.width * Math.random(), y: part.y + part.height * Math.random(), isBig: false };
        }
        // let pos = {x:88,y:122,isBig:false};//88,y:122
        if (!this._lightstartEffect) {
            this._lightstartEffect = ComponentManager.getCustomMovieClip("acstargazer_lightstart", 9, 70);
            this.addChildToContainer(this._lightstartEffect);
            this._lightstartEffect.setEndCallBack(function () {
                _this._lightstartEffect.visible = false;
            }, this);
        }
        this._lightstartEffect.x = this._searchBtn.x + this._searchBtn.width / 2 - 150 / 2;
        this._lightstartEffect.y = this._searchBtn.y + this._searchBtn.height / 2 - 145;
        this._lightstartEffect.visible = true;
        this._lightstartEffect.playWithTime(1);
        var startPosX = this._searchBtn.x + this._searchBtn.width / 2;
        var startPosY = this._searchBtn.y + this._searchBtn.height / 2;
        var off = 0;
        if (pos.isBig) {
            off = 23 / 2;
        }
        else {
            off = 19 / 2;
        }
        var overPosX = 0;
        var overPosY = 0;
        if (findItemIndex > -1) {
            overPosX = this._innerCircle.x - 200 + pos.x + off;
            overPosY = this._innerCircle.y - 200 + pos.y + off;
        }
        else {
            overPosX = pos.x;
            overPosY = pos.y;
        }
        if (!this._starLine) {
            this._starLine = BaseBitmap.create("acstargazer_starline");
            this.addChildToContainer(this._starLine);
        }
        this._starLine.alpha = 1;
        this._starLine.visible = true;
        this._starLine.anchorOffsetX = 94;
        this._starLine.anchorOffsetY = 293;
        this._starLine.x = startPosX;
        this._starLine.y = startPosY;
        var bet = -180 / Math.PI * Math.atan((startPosX - overPosX) / (startPosY - overPosY));
        this._starLine.rotation = bet;
        //94 57  ---- 94 293
        var len = Math.sqrt(Math.pow(startPosX - overPosX, 2) + Math.pow(startPosY - overPosY, 2));
        // this._starLine.scaleY = len /(300 -70);
        var baseScaleY = 0.3;
        var lineA = 1;
        if (findItemIndex > -1) {
            lineA = 1;
        }
        else {
            lineA = 0.5;
        }
        var maxScaleY = len / (293 - 57);
        this._starLine.scaleY = baseScaleY;
        egret.Tween.get(this._starLine)
            .to({ scaleY: maxScaleY }, 150)
            .set({ anchorOffsetX: 94, anchorOffsetY: 57, x: overPosX, y: overPosY })
            .call(function () {
            if (findItemIndex > -1) {
                var star = null;
                if (pos.isBig) {
                    star = BaseBitmap.create(_this.getDefaultRes("acstargazer_star1_" + (findItemIndex + 1)));
                }
                else {
                    star = BaseBitmap.create(_this.getDefaultRes("acstargazer_star2_" + (findItemIndex + 1)));
                }
                star.x = pos.x;
                star.y = pos.y;
                _this["_starMap" + findItemIndex].addChild(star);
                if (findItemIndex == 0) {
                    var star2 = null;
                    if (pos.isBig) {
                        star2 = BaseBitmap.create(_this.getDefaultRes("acstargazer_star1_" + (findItemIndex + 1)));
                    }
                    else {
                        star2 = BaseBitmap.create(_this.getDefaultRes("acstargazer_star2_" + (findItemIndex + 1)));
                    }
                    star2.x = pos.x;
                    star2.y = pos.y;
                    _this["_starMap4"].addChild(star2);
                }
            }
            if (!_this._lightoverEffect) {
                _this._lightoverEffect = ComponentManager.getCustomMovieClip("acstargazer_lightover", 7, 70);
                _this.addChildToContainer(_this._lightoverEffect);
                _this._lightoverEffect.setEndCallBack(function () {
                    _this._lightoverEffect.visible = false;
                }, _this);
            }
            if (findItemIndex > -1) {
                _this._lightoverEffect.alpha = 1;
            }
            else {
                _this._lightoverEffect.alpha = 0.5;
            }
            _this._lightoverEffect.x = overPosX - 217 / 2;
            _this._lightoverEffect.y = overPosY - 219 / 2;
            _this._lightoverEffect.visible = true;
            _this._lightoverEffect.playWithTime(1);
        })
            .to({ scaleY: baseScaleY, alpha: lineA }, 150)
            .to({ alpha: 0 }, 40)
            .call(function () {
            _this._starLine.visible = false;
            // egret.Tween.get(this)
            // .wait(1000)
            // .call(this.showReward,this,[findItemIndex,isFind]);
        })
            .wait(500)
            .call(this.checkReward, this, [findItemIndex, isFind]);
    };
    AcStargazerView.prototype.checkReward = function (findItemIndex, isFind) {
        this._aniPlaying = false;
        if (findItemIndex > -1) {
            this.showReward(findItemIndex, isFind);
        }
        else {
            var popdata = { aid: this.aid, code: this.code, rewards: this._reward, isFind: isFind, findItemIndex: findItemIndex };
            ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERPOPUPVIEW, popdata);
        }
    };
    AcStargazerView.prototype.showReward = function (findItemIndex, isFind) {
        this._aniPlaying = false;
        this.resetCircle();
        // let isFind = false;
        var RansackItemID = this.cfg.RansackItemID;
        this._aniPlaying = false;
        var popdata = { aid: this.aid, code: this.code, rewards: this._reward, isFind: isFind, findItemIndex: findItemIndex };
        ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERPOPUPVIEW, popdata);
        // if(findItemIndex > -1){
        // 	let itemId = RansackItemID[findItemIndex];
        // 	let zzNum = this._acvo.getItemNumByIndex(String(itemId));
        // 	if(zzNum == this.cfg.RansackItemNum || zzNum % 3 == 0){
        // 		ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERGUIDSTORYVIEW,{aid:this.aid,code:this.code,zzNum:zzNum,findItemIndex:findItemIndex});
        // 	}
        // }
    };
    AcStargazerView.prototype.showText = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create(this.getDefaultRes("acstargazer_topbg"));
        forpeople_top.y = 69; //-15;
        this.addChildToContainer(forpeople_top);
        this._topBg = forpeople_top;
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 20;
        this._activityTimerText.y = forpeople_top.y + 12;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true, "0x00ff00");
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 3;
        // if(PlatformManager.checkIsViSp()){
        // 	deltaY = 5;
        // }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acStargazer_acCD", [""]);
        acCDTxt.x = this._activityTimerText.y; //forpeople_top.x + forpeople_top.width - 20 - acCDTxt.width;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        var cfg = this.acVo.config;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.multiline = true;
        this._ruleText.width = 608; //GameConfig.stageWidth - this._activityTimerText.x - 10;
        this._ruleText.lineSpacing = 2;
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acStargazer_desc"), [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum]);
        this.addChildToContainer(this._ruleText);
        var exchangeShop = cfg.exchangeShop;
        for (var i = 0; i < exchangeShop.length; i++) {
            var shopItem = exchangeShop[i];
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
            var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
            var txt = null; //ransackTraitorSP_txt6
            if (isOwn) {
                txt = LanguageManager.getlocal("acStargazer_starNumOver", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]);
            }
            else {
                txt = LanguageManager.getlocal("acStargazer_starNum", [LanguageManager.getlocal("servant_name" + skincfg.servantId), this._acvo.getItemNumByIndex(String(shopItem.itemID)), shopItem["proofNum"]]);
            }
            //罪证
            // this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
            this["_inOrderText" + (i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
            this["_inOrderText" + (i + 1)].text = txt;
            if (i == 0) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 1) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 2) {
                this["_inOrderText" + (i + 1)].x = this._activityTimerText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            else if (i == 3) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            this.addChildToContainer(this["_inOrderText" + (i + 1)]);
        }
    };
    AcStargazerView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "acStargazer_acCD";
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            this._acCDTxt.x = this._activityTimerText.x;
            this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._acCDTxt.x = this._activityTimerText.x;
        this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
        return false;
    };
    AcStargazerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "ransackTraitor_numbg2",
            // "arena_bottom","punish_reward_icon","ac_luckbag-1_icon",
            // "ransackTraitor_btn","ransackTraitor_2003","ransackTraitor_txt4","ransackTraitor_bg3","ransackTraitor_2001","ransackTraitor_2004","ransackTraitor_2002",
            // "ransackTraitor_txt1","ransackTraitorSP_bg1","ransackTraitor_txt2","ransackTraitor_txt3",
            // "ransackTraitor_bg2","ransackTraitor_leftimg","ransackTraitor_bg6","ransackTraitor_bg4","ransackTraitor_namebg2","ransackTraitor_numbg",
            // "ransackTraitor_progressbg","ransackTraitor_progress","ransackTraitor_bg5","ransackTraitor_namebg","ransackTraitor_flag",
            // "ransackTraitor_box1",
            // "ransackTraitor_box2",
            // "ransackTraitor_box3",
            // "ransackTraitorSP_namebg",
            // "ransackTraitorSP_leftbtn",
            // "ransackTraitorSP_buildnamebg",
            // "ransackTraitorSP_btnbg",
            // "ransackTraitorSP_rechargetxt",
            // "ransackTraitorSP_exchangetxt",
            // "ransackTraitorSP_leftmask",
            // "ransackTraitorSP_rightmask",
            // "oneyear_flag"
            // "ac_ransackTraitor_ani",
            this.getDefaultRes("acstargazer_bg"),
            this.getDefaultRes("acstargazer_bottom"),
            this.getDefaultRes("acstargazer_centerbtn"),
            this.getDefaultRes("acstargazer_changebtn"),
            this.getDefaultRes("acstargazer_circlemask"),
            this.getDefaultRes("acstargazer_innercircle"),
            this.getDefaultRes("acstargazer_namebg"),
            this.getDefaultRes("acstargazer_outercircle"),
            this.getDefaultRes("acstargazer_rechargebtn"),
            this.getDefaultRes("acstargazer_star1_1"),
            this.getDefaultRes("acstargazer_star1_2"),
            this.getDefaultRes("acstargazer_star1_3"),
            this.getDefaultRes("acstargazer_star1_4"),
            this.getDefaultRes("acstargazer_star2_1"),
            this.getDefaultRes("acstargazer_star2_2"),
            this.getDefaultRes("acstargazer_star2_3"),
            this.getDefaultRes("acstargazer_star2_4"),
            this.getDefaultRes("acstargazer_starimg_1"),
            this.getDefaultRes("acstargazer_starimg_2"),
            this.getDefaultRes("acstargazer_starimg_3"),
            this.getDefaultRes("acstargazer_starimg_4"),
            this.getDefaultRes("acstargazer_titletxt"),
            this.getDefaultRes("acstargazer_topbg"),
            this.getDefaultRes("acstargazer_changebg"),
            this.getDefaultRes("acstargazer_changefb"),
            this.getDefaultRes("acstargazer_firstbg"),
            "acrechargeboxspview_title_bg7",
            "ransackTraitorSP_exchangetxt",
            "ransackTraitorSP_rechargetxt",
            "ransackTraitorSP_leftbtn",
            "oneyear_flag",
            "ransackTraitor_txt3",
            "itemeffect",
            "ransackTraitor_leftimg",
            "wifeview_xinxibanbg",
            "servant_star",
            "acstargazer_starline"
        ]);
    };
    AcStargazerView.prototype.getTitleBgName = function () {
        return "acrechargeboxspview_title_bg7";
    };
    AcStargazerView.prototype.getTitleStr = function () {
        return "";
    };
    // protected getRuleInfo():string
    // {
    // 	return "ransackTraitorSPRuleInfo" + this.code;
    // }
    AcStargazerView.prototype.getRuleParam = function () {
        var cfg = this.acVo.config;
        return [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum];
    };
    AcStargazerView.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_STARGAZER_REFRESH, this.refreshUIInfos, this);
        egret.Tween.removeTweens(this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._inOrderText1 = null;
        this._inOrderText2 = null;
        this._inOrderText3 = null;
        this._inOrderText4 = null;
        this._rewardLookBtn = null;
        this._aniPlaying = false;
        this._acvo = undefined;
        this._rechargeBg = null;
        this._rewardLookBg = null;
        this._searchtxt = null;
        this._searchdesc = null;
        this._searchBtn = null;
        if (this._bg1) {
            egret.Tween.removeTweens(this._bg1);
        }
        if (this._bg2) {
            egret.Tween.removeTweens(this._bg2);
        }
        if (this._innerCircle) {
            egret.Tween.removeTweens(this._innerCircle);
        }
        if (this._outerCircle) {
            egret.Tween.removeTweens(this._outerCircle);
        }
        if (this._centerCircle) {
            egret.Tween.removeTweens(this._centerCircle);
        }
        if (this._temp) {
            egret.Tween.removeTweens(this._temp);
        }
        this._bg1 = null;
        this._bg2 = null;
        this._innerCircle = null;
        this._outerCircle = null;
        this._centerCircle = null;
        this._starMap0 = null;
        this._starMap1 = null;
        this._starMap2 = null;
        this._starMap3 = null;
        this._starMap4 = null;
        this._cfg = null;
        this._reward = null;
        if (this._starLine) {
            egret.Tween.removeTweens(this._starLine);
        }
        this._btnidleEffect = null;
        this._btnclickEffect = null;
        this._lightoverEffect = null;
        this._lightstartEffect = null;
        this._starLine = null;
        this._topBg = null;
        this._bottomBg = null;
        this._circleEffect = null;
        this._temp = null;
        _super.prototype.dispose.call(this);
    };
    return AcStargazerView;
}(AcCommonView));
__reflect(AcStargazerView.prototype, "AcStargazerView");
