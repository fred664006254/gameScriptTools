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
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusWifePopupView
 */
var WifestatusWifePopupView = (function (_super) {
    __extends(WifestatusWifePopupView, _super);
    function WifestatusWifePopupView() {
        var _this = _super.call(this) || this;
        // public _achId:string;
        _this._redDotSp = null;
        return _this;
    }
    WifestatusWifePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.setData, this);
        // let bgBB2:BaseBitmap = BaseBitmap.create("wifestatus_smallbg");
        // bgBB2.x = 20;
        // bgBB2.y = 10;
        // this.addChildToContainer(bgBB2);
        // let bottomBg = BaseBitmap.create("public_tc_bg01");
        // // bottomBg.x = 42;
        // bottomBg.y = 0;
        // this.addChildToContainer(bottomBg);
        var bgBB = BaseBitmap.create("wifestatus_smallbg");
        bgBB.width = 546; //bgBB.width + 4;
        bgBB.height = 551; //bgBB.height + 4;
        bgBB.x = this.viewBg.width / 2 - bgBB.width / 2;
        bgBB.y = -3;
        // bgBB.x = bottomBg.x + 2;
        // bgBB.y = bottomBg.y + 2;
        // bgBB.mask = bgBB2;
        this.addChildToContainer(bgBB);
        var line = BaseBitmap.create("commonview_border3");
        line.width = 550;
        line.x = this.viewBg.width / 2 - line.width / 2;
        line.y = bgBB.y + bgBB.height - 2;
        this.addChildToContainer(line);
        var descBg = BaseBitmap.create("public_9v_bg12");
        descBg.width = 532;
        descBg.height = 191;
        descBg.x = this.viewBg.width / 2 - descBg.width / 2;
        descBg.y = line.y + 15;
        this.addChildToContainer(descBg);
        var wifeId = this.param.data.wifeId;
        WifestatusView.wifeId = wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var wifePicStr = this._wifeInfoVo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePicStr = skinCfg.body;
                if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = 0;
                    // this._droWifeIcon.y = 0;
                    this.addChildToContainer(this._droWifeIcon);
                }
            }
            else {
                if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = this._wifeIcon.x;
                    // this._droWifeIcon.y = this._wifeIcon.y;
                    this.addChildToContainer(this._droWifeIcon);
                }
            }
        }
        else {
            if (Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske")) {
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
                // this._droWifeIcon.setScale(0.7)
                // this._droWifeIcon.x = this._wifeIcon.x;
                // this._droWifeIcon.y = this._wifeIcon.y;
                this.addChildToContainer(this._droWifeIcon);
            }
        }
        var wifeScale = 0.6;
        //红颜图像
        this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
        this._wifeIcon.x = 100;
        this._wifeIcon.setScale(wifeScale);
        this.addChildToContainer(this._wifeIcon);
        this._wifeIcon.y = 32;
        if (this._droWifeIcon) {
            var mask = new BaseShape();
            mask.graphics.beginFill(0x000000);
            mask.graphics.drawRect(bgBB.x, bgBB.y, bgBB.width, bgBB.height);
            mask.graphics.endFill();
            this.addChildToContainer(mask);
            this._wifeIcon.visible = false;
            this._droWifeIcon.mask = mask;
        }
        // if(this._wifeIcon.y + 840*wifeScale <  this._bottomBg.y + 50){
        // 	this._wifeIcon.y = this._bottomBg.y + 50 - 840*wifeScale;
        // }
        if (this._droWifeIcon) {
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.x = this._wifeIcon.x + 200;
            this._droWifeIcon.y = this._wifeIcon.y + 840 * 0.6 + 30;
        }
        // this.cacheAsBitmap = true;
        //红颜名字背景
        var nameBg = BaseBitmap.create("wifeview_namebg");
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            //红颜名字
            var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, 0x3e0d01);
            nameTF.name = "nameTF";
            nameBg.width = nameTF.width + 40;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            nameBg.y = bgBB.y + bgBB.height - nameBg.height;
            nameBg.name = "nameBg";
            this.addChildToContainer(nameBg);
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2 + 2;
            nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
            this.addChildToContainer(nameTF);
        }
        else {
            nameBg.x = 65;
            nameBg.y = 100;
            // nameBg.setScale(0.79);
            this.addChildToContainer(nameBg);
            //红颜名字
            var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, 0x3e0d01);
            nameTF.width = 27;
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2 - 15;
            nameTF.y = nameBg.y + 180 / 2 - nameTF.height / 2;
            this.addChildToContainer(nameTF);
        }
        // descBg
        var intimacyIcon = BaseBitmap.create("wifeview_vigoricon");
        intimacyIcon.x = this.viewBg.width / 2 - (52 + 400) / 2;
        intimacyIcon.y = descBg.y + 15; //bgBB.y + bgBB.height + 5;
        // intimacyIcon.setScale(0.67);
        this.addChildToContainer(intimacyIcon);
        this._progressBar1 = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 400);
        this._progressBar1.x = intimacyIcon.x + intimacyIcon.width + 10;
        this._progressBar1.y = intimacyIcon.y + 9;
        this.addChildToContainer(this._progressBar1);
        var wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
        if (!wifestatusCfg) {
            wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
        }
        var str1 = this._wifeInfoVo.intimacy + "/" + wifestatusCfg.needIntimacy;
        this._progressBar1.setPercentage(this._wifeInfoVo.intimacy / wifestatusCfg.needIntimacy);
        this._levelTxt1 = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this._levelTxt1.text = LanguageManager.getlocal("servant_infoLv");
        this._levelTxt1.x = this._progressBar1.x + this._progressBar1.width / 2 - this._levelTxt1.width / 2;
        this._levelTxt1.y = this._progressBar1.y + this._progressBar1.height / 2 - this._levelTxt1.height / 2;
        this.addChildToContainer(this._levelTxt1);
        var meiliIcon = BaseBitmap.create("wifeview_charmicon");
        meiliIcon.x = intimacyIcon.x;
        meiliIcon.y = intimacyIcon.y + intimacyIcon.height + 6;
        // meiliIcon.setScale(0.67)
        this.addChildToContainer(meiliIcon);
        this._progressBar2 = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 400);
        this._progressBar2.x = intimacyIcon.x + intimacyIcon.width + 10;
        this._progressBar2.y = meiliIcon.y + 9;
        this.addChildToContainer(this._progressBar2);
        var str2 = this._wifeInfoVo.glamour + "/" + wifestatusCfg.needGlamour;
        this._progressBar2.setPercentage(this._wifeInfoVo.glamour / wifestatusCfg.needGlamour);
        this._levelTxt2 = ComponentManager.getTextField(str2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this._levelTxt2.text = LanguageManager.getlocal("servant_infoLv");
        this._levelTxt2.x = this._progressBar2.x + this._progressBar2.width / 2 - this._levelTxt2.width / 2;
        this._levelTxt2.y = this._progressBar2.y + this._progressBar2.height / 2 - this._levelTxt2.height / 2;
        this.addChildToContainer(this._levelTxt2);
        var goAddBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "childUpd", this.clickAddBtn, this);
        goAddBtn.x = this.viewBg.width / 2 - 30 - goAddBtn.width;
        goAddBtn.y = meiliIcon.y + meiliIcon.height + 10;
        this.addChildToContainer(goAddBtn);
        // goAddBtn.setColor(TextFieldConst.COLOR_BLACK);
        var statusBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifestatusViewTitle", this.statusBtn, this);
        statusBtn.x = this.viewBg.width / 2 + 30;
        statusBtn.y = goAddBtn.y;
        this.addChildToContainer(statusBtn);
        // statusBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._redDotSp = BaseBitmap.create("public_dot2");
        this._redDotSp.x = statusBtn.x + statusBtn.width - this._redDotSp.width;
        this._redDotSp.y = statusBtn.y;
        this.addChildToContainer(this._redDotSp);
        this.checkRedPoint();
    };
    WifestatusWifePopupView.prototype.checkRedPoint = function () {
        //一键册封
        if (Api.wifestatusVoApi.getIsConferById(this.param.data.wifeId)) {
            // if(this._redDotSp == null)
            // {
            // }
            // else
            // {
            if (this._redDotSp) {
                this._redDotSp.visible = true;
            }
            // }
        }
        else {
            if (this._redDotSp) {
                this._redDotSp.visible = false;
            }
        }
    };
    WifestatusWifePopupView.prototype.setData = function () {
        var wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
        if (!wifestatusCfg) {
            wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
        }
        var wifeId = this.param.data.wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var str1 = this._wifeInfoVo.intimacy + "/" + wifestatusCfg.needIntimacy;
        this._progressBar1.setPercentage(this._wifeInfoVo.intimacy / wifestatusCfg.needIntimacy);
        var str2 = this._wifeInfoVo.glamour + "/" + wifestatusCfg.needGlamour;
        this._progressBar2.setPercentage(this._wifeInfoVo.glamour / wifestatusCfg.needGlamour);
        this._levelTxt1.text = str1;
        this._levelTxt2.text = str2;
        this._levelTxt1.x = this._progressBar1.x + this._progressBar1.width / 2 - this._levelTxt1.width / 2;
        this._levelTxt2.x = this._progressBar2.x + this._progressBar2.width / 2 - this._levelTxt2.width / 2;
        this.checkRedPoint();
    };
    WifestatusWifePopupView.prototype.clickAddBtn = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: this.param.data.wifeId });
    };
    WifestatusWifePopupView.prototype.statusBtn = function () {
        var wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(String(Number(this.param.data.level) + 1));
        if (!wifestatusCfg) {
            wifestatusCfg = Config.WifestatusCfg.getWifestatusCfgByID(this.param.data.level);
        }
        // if(this._wifeInfoVo.intimacy < wifestatusCfg.needIntimacy ||this._wifeInfoVo.glamour < wifestatusCfg.needGlamour)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusLessPro"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSPOPUPVIEW, { wifeId: this.param.data.wifeId, level: this.param.data.level });
        this.hide();
    };
    WifestatusWifePopupView.prototype.checkDro2 = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.resume();
        }
        else {
            this._wifeIcon.visible = true;
        }
    };
    WifestatusWifePopupView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        var statusCfg = Config.WifestatusCfg.getWifestatusList()[index];
        this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
        this.request(NetRequestConst.REQUEST_WIFESTATUS_CONFER, { wifeId: String(this.param.data.wifeId), position: statusCfg.id });
    };
    //请求回调
    WifestatusWifePopupView.prototype.receiveData = function (data) {
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // this._scrollList.refreshData(achList);
        // let statusType = 0;//0上封 1 下封
        // if(this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star)
        // {
        // 	statusType = 1;
        // }
        // ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:this.param.data.wifeId,type:statusType})
        // this.hide();
    };
    WifestatusWifePopupView.prototype.getTitleStr = function () {
        // let nameStr = LanguageManager.getlocal("wifestatusTitle" +this.param.data.level)
        return "wifestatusTitle" + this.param.data.level;
    };
    WifestatusWifePopupView.prototype.doGetReward = function (event) {
        this._achIndex = event.data.achIndex;
        this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS, { aid: AchievementDetailPopupView.itemId });
    };
    WifestatusWifePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            //   "wifestatus_itembg_an1","wifestatus_itembg_an2",
            "commonview_border3"
        ]);
    };
    WifestatusWifePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.setData, this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
        // this.cacheAsBitmap = false;r
        this._wifeInfoVo = null;
        this._wifeIcon = null;
        this._droWifeIcon = null;
        this._achIndex = null;
        this._oldList = null;
        this._oldStar = null;
        this._redDotSp = null;
        this._progressBar1 = null;
        this._progressBar2 = null;
        this._levelTxt1 = null;
        this._levelTxt2 = null;
        this._oldStar = null;
        _super.prototype.dispose.call(this);
    };
    return WifestatusWifePopupView;
}(PopupView));
__reflect(WifestatusWifePopupView.prototype, "WifestatusWifePopupView");
