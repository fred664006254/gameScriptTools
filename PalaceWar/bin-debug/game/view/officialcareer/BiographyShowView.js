/**
 * 仕途之路 列传本纪
 * author shaoliang
 * date 2020/2/6
 * @class BiographyView
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
var BiographyShowView = (function (_super) {
    __extends(BiographyShowView, _super);
    function BiographyShowView() {
        var _this = _super.call(this) || this;
        _this._playerDragon = null;
        _this._isShowing = false;
        _this._clickNum = 0;
        _this._hideSt = null;
        _this._rewardStr = "";
        return _this;
    }
    BiographyShowView.prototype.getResourceList = function () {
        var resArray = [
            "biographyview_showbg", "biography_playernamebg", "biography_rewardbg"
        ];
        var data = this.info;
        var cfg = Config.BiographyCfg.getCfgBgId(data.id);
        if (cfg.type == 1) {
            // resArray.push("biography_type1_add");
            resArray.push("biography_type1_open");
            resArray.push("biography_type1_show");
        }
        else {
            // resArray.push("biography_type2_add");
            resArray.push("biography_type2_open");
            resArray.push("biography_type2_show");
        }
        return _super.prototype.getResourceList.call(this).concat(resArray);
    };
    BiographyShowView.prototype.getBgName = function () {
        return "biographyview_showbg";
    };
    BiographyShowView.prototype.getTitleBgName = function () {
        return null;
    };
    BiographyShowView.prototype.getTitleStr = function () {
        return null;
    };
    BiographyShowView.prototype.getCloseBtnName = function () {
        return null;
    };
    Object.defineProperty(BiographyShowView.prototype, "info", {
        get: function () {
            return Api.biographyVoApi.showInfo;
        },
        enumerable: true,
        configurable: true
    });
    BiographyShowView.prototype.initView = function () {
        this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height) / 2;
        var titleId = null;
        if (this.info.title && this.info.title.clothes && this.info.title.clothes != "") {
            titleId = this.info.title.clothes;
        }
        var tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        var resPath = "palace_db_" + titleId + (tcfg && tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(this.info.pic) : "");
        if (titleId && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath + "_ske")) {
            var loadIdx = 0;
            var myHair = null;
            this._playerDragon = new BaseDisplayObjectContainer();
            this._playerDragon.x = GameConfig.stageWidth / 2;
            this._playerDragon.y = GameConfig.stageHeigth / 2 - 400;
            this.addChild(this._playerDragon);
            var roleinfo = this.info.title;
            var level = roleinfo.clv;
            var role = App.CommonUtil.getPlayerDragonRole(titleId, this.info.pic, level);
            role.name = "role";
            this._playerDragon.addChild(role);
            role.setPosition(0, 40);
            // myHead.setPosition(-65,0);
            // myHair.setPosition(-65+23.5,0);
            // myHead.name = 'myHead';
            // this._playerDragon.addChild(myHead)
        }
        else {
            if (!titleId) {
                titleId = this.info.level;
            }
            var roleinfo = this.info.title;
            var level = roleinfo.clv;
            this._playerDragon = Api.playerVoApi.getPlayerPortrait(titleId, this.info.pic, 0, false, null, null, level);
            this._playerDragon.x = GameConfig.stageWidth / 2 - this._playerDragon.width * this._playerDragon.scaleX / 2;
            this._playerDragon.y = GameConfig.stageHeigth / 2 - 400;
            this.addChild(this._playerDragon);
        }
        var closeText = ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 50);
        this.addChild(closeText);
        var data = this.info;
        var cfg = Config.BiographyCfg.getCfgBgId(data.id);
        var container = new BaseDisplayObjectContainer();
        var playernamebg = BaseBitmap.create("biography_playernamebg");
        playernamebg.setPosition(GameConfig.stageWidth / 2 - playernamebg.width / 2, 0);
        container.addChild(playernamebg);
        var playername = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playername, playernamebg);
        container.addChild(playername);
        var serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        var servertext = ComponentManager.getTextField(serverstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servertext.setPosition(GameConfig.stageWidth / 2 - servertext.width / 2, playernamebg.y + playernamebg.height + 8);
        container.addChild(servertext);
        var title = ComponentManager.getTextField(cfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xad3519);
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = servertext.y + servertext.height + 10;
        container.addChild(title);
        // let ornament = BaseBitmap.create("biography_ornament");
        // ornament.width = playername.width+ornament.width;
        // ornament.setPosition(GameConfig.stageWidth/2-ornament.width/2,playername.y+playername.height/2-ornament.height/2);
        // container.addChild(ornament);
        var desctext = ComponentManager.getTextField(cfg.desc, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        desctext.width = 380;
        desctext.lineSpacing = 5;
        desctext.textAlign = egret.HorizontalAlign.CENTER;
        desctext.setPosition(GameConfig.stageWidth / 2 - desctext.width / 2, title.y + title.height + 17);
        container.addChild(desctext);
        var datestr = App.DateUtil.getFormatBySecond(data.st, 20);
        var datetext = ComponentManager.getTextField(LanguageManager.getlocal("biography_date", [datestr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        datetext.setPosition(100, 190);
        container.addChild(datetext);
        var lastdatestr;
        if (cfg.lastTime) {
            lastdatestr = App.DateUtil.getFormatBySecond(data.st + cfg.lastTime * 86400, 20);
            var lastdatetext = ComponentManager.getTextField(LanguageManager.getlocal("biography_lastdate", [lastdatestr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            lastdatetext.setPosition(GameConfig.stageWidth - datetext.x - lastdatetext.width, datetext.y);
            container.addChild(lastdatetext);
        }
        else {
            lastdatestr = LanguageManager.getlocal("biography_forever");
            var lastdatetext = ComponentManager.getTextField(lastdatestr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            lastdatetext.setPosition(GameConfig.stageWidth - datetext.x - datetext.width / 2 - lastdatetext.width / 2, datetext.y);
            container.addChild(lastdatetext);
        }
        var offy = (GameConfig.stageHeigth - 960) * 0.3;
        container.y = GameConfig.stageHeigth / 2 + 148 + offy;
        this._isShowing = true;
        var view = this;
        if (cfg.type == 1) {
            var clip_1 = ComponentManager.getCustomMovieClip("biography_type1_bookopen", 7, 100);
            clip_1.y = GameConfig.stageHeigth / 2 + 40 + offy;
            var clip2_1 = ComponentManager.getCustomMovieClip("biography_type1_show", 8, 100);
            clip2_1.y = clip_1.y + 8;
            // let addclip = ComponentManager.getCustomMovieClip("biography_type1_add",10,100);
            // addclip.blendMode = egret.BlendMode.ADD;
            // addclip.setPosition(50+30,GameConfig.stageHeigth/2+85);
            // addclip.setScale(2);
            clip_1.setFrameEvent(5, function () {
                egret.Tween.get(container).to({ alpha: 1 }, 500);
                clip2_1.playWithTime(0);
            }, this);
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                // addclip.playWithTime(0);
                view._isShowing = false;
            }, this);
            clip_1.playWithTime(1);
            this.addChild(clip2_1);
            this.addChild(clip_1);
            this.addChild(container);
            // this.addChild(addclip);
            container.x = 30;
            container.alpha = 0;
        }
        else {
            // let showarray:string[] = [];
            // for (let i =1 ;i<=7; i++)
            // {
            //     showarray.push('biography_type2_show'+i);
            // }
            var openarray_1 = [];
            for (var i = 2; i <= 9; i++) {
                openarray_1.push('biography_type2_open' + i);
            }
            var clip_2 = ComponentManager.getCustomMovieClip("biography_type2_open", 1, 100);
            clip_2.setScale(2);
            clip_2.setPosition(-320, GameConfig.stageHeigth / 2 + 40 - 275 + offy);
            clip_2.playWithTime(1);
            var clip2_2 = ComponentManager.getCustomMovieClip("biography_type2_show", 7, 100);
            clip2_2.y = GameConfig.stageHeigth / 2 + 40 + 18 + offy;
            var showopen_1 = function () {
                clip_2.frameImages = openarray_1;
                clip_2.playWithTime(1);
                clip_2.setFrameEvent(5, function () {
                    egret.Tween.get(container).to({ alpha: 1 }, 500);
                    clip2_2.playWithTime(0);
                }, view);
                clip_2.setEndCallBack(function () {
                    clip_2.dispose();
                    // addclip.playWithTime(0);
                    view._isShowing = false;
                }, view);
            };
            clip_2.setEndCallBack(function () {
                egret.Tween.get(clip_2).to({ scaleX: 1, scaleY: 1, x: 0, y: GameConfig.stageHeigth / 2 + 23 + offy }, 500).call(showopen_1);
            }, this);
            // let addclip = ComponentManager.getCustomMovieClip("biography_type2_add",10,100);
            // addclip.blendMode = egret.BlendMode.ADD;
            // addclip.setPosition(30,GameConfig.stageHeigth/2+85);
            // addclip.setScale(2.2);
            this.addChild(clip2_2);
            this.addChild(clip_2);
            this.addChild(container);
            // this.addChild(addclip);
            container.alpha = 0;
        }
        //寻访奖励
        // if ()
        // {
        //     let rList = GameData.formatRewardItem(data.rewards);
        //     App.CommonUtil.playRewardFlyAction(rList);
        // }
        //膜拜奖励
        if (Api.biographyVoApi.showNum || data.rewards) {
            this._playerDragon.y += 50;
            this._nodeContainer = new BaseDisplayObjectContainer();
            this._nodeContainer.alpha = 0;
            this.addChild(this._nodeContainer);
            this.touchEnabled = false;
            var topTxtBg = BaseBitmap.create("public_9_bg25");
            topTxtBg.width = 490;
            topTxtBg.height = 130;
            topTxtBg.x = GameConfig.stageWidth / 2 - 270;
            topTxtBg.y = 20;
            this._nodeContainer.addChild(topTxtBg);
            var tailBM = BaseBitmap.create("public_9_bg25_tail");
            tailBM.setPosition(topTxtBg.x + 330, topTxtBg.y + topTxtBg.height - 3);
            this._nodeContainer.addChild(tailBM);
            var txt_1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            txt_1.multiline = true;
            txt_1.lineSpacing = 5;
            txt_1.width = topTxtBg.width - 40;
            txt_1.x = topTxtBg.x + 20;
            txt_1.y = topTxtBg.y + 20;
            this._nodeContainer.addChild(txt_1);
            var resBg = BaseBitmap.create("biography_rewardbg");
            resBg.x = topTxtBg.x + 355;
            resBg.y = topTxtBg.y + 80;
            this._nodeContainer.addChild(resBg);
            var getNum = 0;
            var goldIcon = null;
            if (Api.biographyVoApi.showNum) {
                getNum = Api.biographyVoApi.showNum;
                goldIcon = BaseLoadBitmap.create("public_icon5");
                this._rewardStr = "5_5_" + getNum;
            }
            else if (data.rewards) {
                var vo = GameData.formatRewardItem(data.rewards)[0];
                this._rewardStr = data.rewards;
                getNum = vo.num;
                goldIcon = BaseLoadBitmap.create(vo.icon);
                goldIcon.width = 50;
                goldIcon.height = 50;
            }
            goldIcon.y = resBg.y + resBg.height / 2 - 25;
            goldIcon.x = resBg.x - 10;
            this._nodeContainer.addChild(goldIcon);
            var goldTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            goldTxt.text = String(getNum);
            goldTxt.x = goldIcon.x + 50;
            goldTxt.y = resBg.y + resBg.height / 2 - goldTxt.height / 2;
            this._nodeContainer.addChild(goldTxt);
            var tmpThis_1 = this;
            var rnd = App.MathUtil.getRandom(1, 3);
            var text_1 = LanguageManager.getlocal("biographyDialogue" + rnd);
            if (PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang()) {
                this._nodeContainer.alpha = 1;
                txt_1.text = text_1;
            }
            else {
                egret.Tween.get(this._nodeContainer, { loop: false }).to({ alpha: 1 }, 700).call(function () {
                    tmpThis_1.typerEffect(txt_1, text_1);
                    tmpThis_1.touchEnabled = false;
                });
            }
        }
        if (this._rewardStr) {
            this.addTouchTap(this.clickHandler, this);
        }
        else {
            this.addTouchTap(this.touchTap, this, null);
        }
    };
    BiographyShowView.prototype.typerEffect = function (obj, content, interval, backFun) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval * i);
        }
    };
    BiographyShowView.prototype.touchTap = function () {
        if (this._isShowing) {
            return;
        }
        this.hide();
    };
    BiographyShowView.prototype.hide = function () {
        var rData = Api.wifeVoApi.getWaitShowWife();
        if (rData) {
            Api.verifySpecialReward(rData.unlockWife, false);
            Api.verifySpecialReward(rData.unlockServant, true);
            Api.openSpecialView();
        }
        _super.prototype.hide.call(this);
        Api.biographyVoApi.checkShowRewars();
    };
    BiographyShowView.prototype.clickHandler = function () {
        //飘奖励
        if (this._clickNum == 0) {
            var rList = GameData.formatRewardItem(this._rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else if (this._clickNum == 1) {
            this._hideSt = egret.setTimeout(this.hideSelf, this, 500);
        }
        this._clickNum++;
    };
    BiographyShowView.prototype.hideSelf = function () {
        egret.clearTimeout(this._hideSt);
        _super.prototype.hide.call(this);
    };
    BiographyShowView.prototype.dispose = function () {
        Api.biographyVoApi.showInfo = null;
        Api.biographyVoApi.showNum = 0;
        this._playerDragon = null;
        this._isShowing = false;
        this._nodeContainer = null;
        this._clickNum = 0;
        this._hideSt = null;
        this._rewardStr = "";
        _super.prototype.dispose.call(this);
    };
    return BiographyShowView;
}(CommonView));
__reflect(BiographyShowView.prototype, "BiographyShowView");
//# sourceMappingURL=BiographyShowView.js.map