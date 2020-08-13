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
var LevyScrollItemDetailPopupView = (function (_super) {
    __extends(LevyScrollItemDetailPopupView, _super);
    function LevyScrollItemDetailPopupView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._scrollList = null;
        _this._topbg = null;
        _this._middleBg = null;
        _this._servantList = [];
        _this._progressBar = null;
        _this._serConList = [];
        return _this;
    }
    LevyScrollItemDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_LEVY_SELECTSID, this.refreshSercon, this);
        this._scrollList = null;
        this._servantList = null;
        this._topbg = null;
        this._middleBg = null;
        this._progressBar = null;
        this._serConList = [];
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(LevyScrollItemDetailPopupView.prototype, "index", {
        get: function () {
            return this.param.data.index;
        },
        enumerable: true,
        configurable: true
    });
    LevyScrollItemDetailPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_LEVY_SELECTSID, this.refreshSercon, this);
        var cityBg = BaseLoadBitmap.create("levy_itemcontentbg" + this.index, new egret.Rectangle(0, 0, 570, 166));
        cityBg.mask = new egret.Rectangle(0, 20, 570, 140);
        var scale = 548 / cityBg.width;
        cityBg.setScale(scale);
        cityBg.x = this.viewBg.x + this.viewBg.width / 2 - cityBg.width * scale / 2;
        cityBg.y = -23;
        this.addChildToContainer(cityBg);
        this._topbg = cityBg;
        var middleBg = BaseBitmap.create("public_9v_bg12");
        middleBg.width = this.getShowWidth() - 60;
        middleBg.height = 185;
        middleBg.x = this.viewBg.x + this.viewBg.width / 2 - middleBg.width / 2;
        middleBg.y = 135;
        this._middleBg = middleBg;
        this.addChildToContainer(middleBg);
        var buffBg = BaseBitmap.create("public_9v_bg12");
        buffBg.width = this.getShowWidth() - 60;
        buffBg.height = 370;
        buffBg.x = this.viewBg.x + this.viewBg.width / 2 - buffBg.width / 2;
        buffBg.y = middleBg.y + middleBg.height + 5;
        this.addChildToContainer(buffBg);
        this.refreshTopInfo();
        this.initMiddleServant();
        var arr = Config.LevyCfg.LevyItemList[this.index].buffGroup;
        this._scrollList = ComponentManager.getScrollList(LevyScrollItemDetailBuffItem, arr, new egret.Rectangle(0, 0, buffBg.width - 10, buffBg.height - 10), { itemIndex: this.index });
        this._scrollList.setPosition(buffBg.x + 5, buffBg.y + 5);
        this.addChildToContainer(this._scrollList);
    };
    LevyScrollItemDetailPopupView.prototype.initMiddleServant = function () {
        var tipBg = BaseBitmap.create("public_ts_bg01");
        tipBg.width = 400;
        tipBg.setPosition(GameConfig.stageWidth / 2 - tipBg.width / 2, this._middleBg.y + 10);
        this.addChildToContainer(tipBg);
        var need = Config.LevyCfg.LevyItemList[this.index].launch[0].split("_")[1];
        var titletip = ComponentManager.getTextField(LanguageManager.getlocal("levy_selectservant_condtip_onlylevel", [need]), 18, TextFieldConst.COLOR_BROWN_NEW);
        titletip.x = tipBg.x + tipBg.width / 2 - titletip.width / 2;
        titletip.y = tipBg.y + 7;
        this.addChildToContainer(titletip);
        var arr = [];
        var launch = Config.LevyCfg.LevyItemList[this.index].launch || [];
        for (var i = 0; i < launch.length; i++) {
            arr.push({
                servantId: "",
                empty: true,
                pos: this.index + "_" + (i + 1),
                type: Number(launch[i].split("_")[0])
            });
        }
        var sinfo = Api.levyVoApi.getLevyItemServantIds(this.index);
        for (var key in sinfo) {
            if (sinfo.hasOwnProperty(key)) {
                arr[Number(key) - 1].servantId = sinfo[key];
                arr[Number(key) - 1].empty = false;
                arr[Number(key) - 1].pos = this.index + "_" + key;
            }
        }
        this._servantList = arr;
        var _len = arr.length;
        var itemW = 110;
        var spaceX = 100 - _len * 10;
        var startX = GameConfig.stageWidth / 2 - (_len * itemW + spaceX * (_len - 1)) / 2;
        var startY = 185;
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            var serItem = new LevyServantItem();
            serItem.init(data, itemW);
            serItem.setPosition(startX + i * (itemW + spaceX), startY);
            this.addChildToContainer(serItem);
            this._serConList.push(serItem);
            if (Api.levyVoApi.checkPosRedPoint(this.index + "_" + (i + 1))) {
                App.CommonUtil.addIconToBDOC(serItem);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(serItem);
            }
        }
    };
    LevyScrollItemDetailPopupView.prototype.refreshTopInfo = function () {
        //避免界面关闭调用导致报错
        if (this._topbg) {
            if (this._progressBar) {
                this._progressBar.dispose();
                this._progressBar = null;
            }
            var rateObj = {};
            var itemRate = Api.levyVoApi.getLevyItemRate(this.index);
            var haveSpeed = false;
            if ((Math.abs(itemRate.frate) + Math.abs(itemRate.grate) + Math.abs(itemRate.srate)) > 0) {
                haveSpeed = true;
            }
            if (haveSpeed) {
                rateObj = itemRate;
                var progress = Api.levyVoApi.getLevyProgressBar(this.index, 500);
                progress.x = this._topbg.x + 24;
                progress.y = this._topbg.y + 130;
                this.addChildToContainer(progress);
                this._progressBar = progress;
            }
            else {
                var progress = Api.levyVoApi.getLevyStopProgressBar(500, 2);
                progress.x = this._topbg.x + 24;
                progress.y = this._topbg.y + 130;
                this.addChildToContainer(progress);
                this._progressBar = progress;
                var rateCfg = Config.LevyCfg.LevyItemList[this.index];
                rateObj.grate = rateCfg.gold || 0;
                rateObj.frate = rateCfg.food || 0;
                rateObj.srate = rateCfg.soldier || 0;
            }
            var index = 0;
            if (rateObj.grate) {
                this.getResIcons(index, "grate", rateObj["grate"]);
                index++;
            }
            if (rateObj.frate) {
                this.getResIcons(index, "frate", rateObj["frate"]);
                index++;
            }
            if (rateObj.srate) {
                this.getResIcons(index, "srate", rateObj["srate"]);
                index++;
            }
        }
    };
    LevyScrollItemDetailPopupView.prototype.refreshSercon = function () {
        if (this._serConList && this._serConList[0]) {
            var arr = [];
            var launch = Config.LevyCfg.LevyItemList[this.index].launch || [];
            for (var i = 0; i < launch.length; i++) {
                arr.push({
                    servantId: "",
                    empty: true,
                });
            }
            var sinfo = Api.levyVoApi.getLevyItemServantIds(this.index);
            for (var key in sinfo) {
                if (sinfo.hasOwnProperty(key)) {
                    arr[Number(key) - 1].servantId = sinfo[key];
                    arr[Number(key) - 1].empty = false;
                }
            }
            for (var i = 0; i < this._serConList.length; i++) {
                var serCon = this._serConList[i];
                if (arr[i].empty) {
                    serCon.clearServant(true);
                }
                else {
                    serCon.fresh_servant(arr[i].servantId);
                }
                if (Api.levyVoApi.checkPosRedPoint(this.index + "_" + (i + 1))) {
                    App.CommonUtil.addIconToBDOC(serCon);
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(serCon);
                }
            }
        }
    };
    LevyScrollItemDetailPopupView.prototype.getResIcons = function (index, rateName, rateNum) {
        var resbgPath = "levy_numbg";
        var diffX = 160;
        var resBg = null;
        if (this.container.getChildByName("resBg" + index)) {
            resBg = this.container.getChildByName("resBg" + index);
        }
        else {
            resBg = BaseBitmap.create(resbgPath);
            resBg.name = "resBg" + index;
            resBg.setPosition(80 + index * diffX, this._topbg.y + 90);
            this.addChildToContainer(resBg);
        }
        var resName;
        var resNum;
        var type;
        var interval = Config.LevyCfg.LevyItemList[this.index].interval;
        if (rateName == "grate") {
            resName = "public_icon2";
            type = "gold";
        }
        else if (rateName == "frate") {
            resName = "public_icon3";
            type = "food";
        }
        else if (rateName == "srate") {
            resName = "public_icon4";
            type = "soldier";
        }
        resNum = rateNum;
        var resIcon = null;
        if (this.container.getChildByName("resIcon" + index)) {
            resIcon = this.container.getChildByName("resIcon" + index);
        }
        else {
            resIcon = BaseBitmap.create(resName);
            resIcon.name = "resIcon" + index;
            resIcon.setPosition(resBg.x - 10, resBg.y - 10);
            this.addChildToContainer(resIcon);
        }
        var resColor = TextFieldConst.COLOR_WARN_GREEN2;
        if (resNum < 0) {
            resColor = 0xff5a5a;
        }
        var resNumText = null;
        if (this.container.getChildByName("resNumText" + index)) {
            resNumText = this.container.getChildByName("resNumText" + index);
            resNumText.text = LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]);
            resNumText.setColor(resColor);
        }
        else {
            resNumText = ComponentManager.getTextField(LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]), 20, resColor);
            resNumText.name = "resNumText" + index;
            resNumText.setPosition(resBg.x + 45, resBg.y + (resBg.height - resNumText.height) / 2);
            this.addChildToContainer(resNumText);
        }
    };
    LevyScrollItemDetailPopupView.prototype.refreshUi = function () {
        this.refreshTopInfo();
        if (this._scrollList) {
            var arr = Config.LevyCfg.LevyItemList[this.index].buffGroup;
            this._scrollList.refreshData(arr, { itemIndex: this.index });
        }
    };
    LevyScrollItemDetailPopupView.prototype.getShowWidth = function () {
        return 585;
    };
    LevyScrollItemDetailPopupView.prototype.getShowHeight = function () {
        return 798;
    };
    LevyScrollItemDetailPopupView.prototype.getTitleStr = function () {
        return 'levy_levyitem_title' + this.index;
    };
    LevyScrollItemDetailPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    LevyScrollItemDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "levy_plus",
            "servant_speciality1", "servant_speciality2", "servant_speciality3", "servant_speciality4", "servant_speciality5", "servant_speciality6",
            "levy_uplevelbtn", "levy_upabilitybtn", "levy_fnt", "levy_getBtn"
        ]);
    };
    return LevyScrollItemDetailPopupView;
}(PopupView));
__reflect(LevyScrollItemDetailPopupView.prototype, "LevyScrollItemDetailPopupView");
var LevyServantItem = (function (_super) {
    __extends(LevyServantItem, _super);
    function LevyServantItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curServantId = "";
        _this._addIcon = null;
        _this._cardbg = null;
        _this._servantImg = null;
        _this._lvTxt = null;
        return _this;
    }
    LevyServantItem.prototype.dispose = function () {
        this._data = null;
        this._curServantId = "";
        this._addIcon = null;
        this._cardbg = null;
        this._servantImg = null;
        this._lvTxt = null;
        this._skillBuffNumText = null;
        this._effect = null;
        _super.prototype.dispose.call(this);
    };
    LevyServantItem.prototype.init = function (data, itemW) {
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.checkBuzhen,this);
        this.cacheAsBitmap = true;
        this._data = data;
        this.width = itemW;
        this.height = itemW;
        //门客信息
        this._curServantId = data.servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(data.servantId);
        var servantQuality = '';
        var servantPic = '';
        var addIcon = BaseBitmap.create("levy_plus");
        this._addIcon = addIcon;
        if (data.empty) {
            servantQuality = "servant_cardbg_0";
            addIcon.visible = true;
        }
        else {
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
            addIcon.visible = false;
        }
        var cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.anchorOffsetX = cardbg.width / 2;
        cardbg.anchorOffsetY = cardbg.height / 2;
        cardbg.setScale(this.height / 194);
        cardbg.x = cardbg.anchorOffsetX * cardbg.scaleX;
        cardbg.y = cardbg.anchorOffsetY * cardbg.scaleY;
        this.addChild(cardbg);
        this._cardbg = cardbg;
        cardbg.addTouchTap(this.servantTouch, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, this);
        this._servantImg = BaseLoadBitmap.create(servantPic);
        this._servantImg.width = 102;
        this._servantImg.height = 100;
        this._servantImg.anchorOffsetX = this._servantImg.width / 2;
        this._servantImg.anchorOffsetY = this._servantImg.height / 2;
        this.addChild(this._servantImg);
        this._servantImg.x = this._servantImg.anchorOffsetX * this._servantImg.scaleX + 4;
        this._servantImg.y = this._servantImg.anchorOffsetY * this._servantImg.scaleY + 5;
        this._servantImg.addTouchTap(this.servantTouch, this);
        this.addChild(addIcon);
        var typeIcon = BaseBitmap.create("servant_speciality" + (data.type >= 5 ? 6 : data.type));
        typeIcon.setScale(0.7);
        this.addChild(typeIcon);
        typeIcon.setPosition(5, 5);
        this._skillBuffNumText = ComponentManager.getBitmapText("", "levy_fnt");
        this._skillBuffNumText.letterSpacing = -6;
        this.addChild(this._skillBuffNumText);
        this._skillBuffNumText.y = 84;
        if (servantInfoObj && servantInfoObj.activeSkillLevy) {
            var _skill = servantInfoObj.activeSkillLevy;
            this._skillBuffNumText.text = Math.floor((_skill.addValue + 1) * 100) + "%涨";
            this._skillBuffNumText.x = 108 - this._skillBuffNumText.width;
            this._effect = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            this.addChild(this._effect);
            this._effect.blendMode = egret.BlendMode.ADD;
            this._effect.width = this._effect.height = 156;
            this._effect.setPosition(-25, -23);
            this._effect.playWithTime(-1);
        }
        this._lvTxt = ComponentManager.getTextField("Lv.0", 16, TextFieldConst.COLOR_BROWN_NEW);
        this._lvTxt.width = this.width;
        this._lvTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._lvTxt.setPosition(0, this.height + 3);
        this._lvTxt.visible = false;
        this.addChild(this._lvTxt);
        if (!data.empty) {
            this.fresh_servant(data.servantId);
        }
    };
    LevyServantItem.prototype.fresh_servant = function (servantId) {
        if (servantId && this._lvTxt) {
            this._lvTxt.visible = true;
            this._lvTxt.text = "Lv." + Api.servantVoApi.getServantObj(servantId).level;
        }
        if (servantId == this._curServantId) {
            return;
        }
        this._servantImg.visible = true;
        this._servantImg.alpha = 1;
        this._curServantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        //品质 头像 名称
        var servantQuality = '';
        var servantPic = '';
        servantQuality = servantInfoObj.qualityBoxImgPath;
        servantPic = servantInfoObj.halfImgPath;
        this._cardbg.setload(servantQuality);
        this._servantImg.setload(servantPic);
        this._servantImg.width = 102;
        this._servantImg.height = 100;
        this._servantImg.anchorOffsetX = this._servantImg.width / 2;
        this._servantImg.anchorOffsetY = this._servantImg.height / 2;
        this._servantImg.x = this._servantImg.anchorOffsetX * this._servantImg.scaleX + 4;
        this._servantImg.y = this._servantImg.anchorOffsetY * this._servantImg.scaleY + 5;
        var _skill = servantInfoObj.activeSkillLevy;
        if (_skill) {
            this._skillBuffNumText.visible = true;
            this._skillBuffNumText.text = Math.floor((_skill.addValue + 1) * 100) + "%涨";
            this._skillBuffNumText.x = 108 - this._skillBuffNumText.width;
            if (!this._effect) {
                this._effect = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
                this.addChild(this._effect);
                this._effect.blendMode = egret.BlendMode.ADD;
                this._effect.width = this._effect.height = 156;
                this._effect.setPosition(-25, -23);
                this._effect.playWithTime(-1);
            }
        }
        //this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._servantImg, this._cardbg);
        this._addIcon.visible = false;
    };
    LevyServantItem.prototype.clearServant = function (tween) {
        var _this = this;
        if (tween === void 0) { tween = false; }
        this._lvTxt.visible = false;
        if (tween) {
            var tmpx2_1 = this._servantImg.scaleX;
            egret.Tween.get(this._servantImg).to({ scaleX: tmpx2_1 * 1.3, scaleY: tmpx2_1 * 1.3, alpha: 0 }, 270).call(function () {
                egret.Tween.removeTweens(_this._servantImg);
                _this._servantImg.setScale(tmpx2_1);
                _this._addIcon.visible = true;
                _this._servantImg.visible = false;
                _this._skillBuffNumText.visible = false;
                _this._effect && _this._effect.dispose();
                _this._effect = null;
                _this._cardbg.setload("servant_cardbg_0");
                _this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, _this._servantImg, _this._cardbg);
                _this._curServantId = null;
                //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
            }, this);
        }
        else {
            this._addIcon.visible = true;
            this._servantImg.visible = false;
            this._skillBuffNumText.visible = false;
            this._effect && this._effect.dispose();
            this._effect = null;
            this._cardbg.setload("servant_cardbg_0");
            this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._servantImg, this._cardbg);
            this._curServantId = null;
            //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
        }
    };
    LevyServantItem.prototype.servantTouch = function () {
        Api.rookieVoApi.checkNextStep();
        var data = this._data;
        ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYSELECTSERVANTPOPUPVIEW, {
            data: data,
            callback: this.changeCallback,
            handler: this
        });
    };
    LevyServantItem.prototype.changeCallback = function (data) {
        var lid = this._data.pos.split("_")[0];
        var pos = this._data.pos.split("_")[1];
        NetManager.request(NetRequestConst.REQUEST_LEVY_SELECTSID, {
            dtype: data.isSelf ? 2 : 1,
            lid: lid,
            pos: pos,
            sid: data.servantId
        });
    };
    Object.defineProperty(LevyServantItem.prototype, "curServantId", {
        get: function () {
            return this._curServantId;
        },
        enumerable: true,
        configurable: true
    });
    return LevyServantItem;
}(BaseDisplayObjectContainer));
__reflect(LevyServantItem.prototype, "LevyServantItem");
