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
 * 结识红颜
 * author hyd
 * date 2019/7/30
 * @class MeetBeautyView
 */
var MeetBeautyView = (function (_super) {
    __extends(MeetBeautyView, _super);
    function MeetBeautyView() {
        var _this = _super.call(this) || this;
        _this._wifeBone = null;
        _this._wifeImg = null;
        _this._wifeIdList = [];
        _this._wifeIconIdx = 0;
        _this._wifeIconContainer = null;
        _this._wifeInfoCfg = null;
        _this._wifeNameTxt = null;
        _this._powerNumber = 0;
        _this._powerNeed = [];
        _this._unlockStep = 0;
        _this._remainTime = 0;
        _this._remainTimeTxt = null;
        return _this;
    }
    MeetBeautyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'meetbeautyview_bg',
            'meetbeautyview_toptitle',
            'meetbeauty_powertip',
            'meetbeauty_powernumber_bg',
            'meetbeauty_needpower_bg',
            'meetbeauty_bonemask',
            'skin_detail_namebg',
            'tailor_iconBtn',
            'tailor_iconBtn_down',
            'meetbeauty_wifegot',
            'meetbeauty_barBg_1', 'meetbeauty_barBg_2', 'meetbeauty_barBg_3', 'meetbeauty_bar_1', 'meetbeauty_bar_2', 'meetbeauty_bar_3',
        ]);
    };
    MeetBeautyView.prototype.initView = function () {
        var view = this;
        //初始化数据
        this.initData();
        //界面标题
        var titleContainer = this.getTitleContainer();
        view.addChild(titleContainer);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleContainer, view, [0, 40]);
        //中背景框
        var centerBg = BaseBitmap.create('meetbeautyview_bg');
        centerBg.name = 'centerBg';
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, centerBg, view, [10, -90]);
        view.addChild(centerBg);
        //红颜名字
        var wifeNameBg = BaseBitmap.create('skin_detail_namebg');
        //wifeNameBg.setScale(0.8);
        view.addChild(wifeNameBg);
        wifeNameBg.x = centerBg.x - 30;
        wifeNameBg.y = centerBg.y + 100;
        var wifeNameStr = LanguageManager.getlocal('wifeName_' + this._wifeInfoCfg.id);
        this._wifeNameTxt = ComponentManager.getTextField(wifeNameStr, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._wifeNameTxt.width = wifeNameBg.width - 20;
        this._wifeNameTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(this._wifeNameTxt);
        this._wifeNameTxt.x = wifeNameBg.x + wifeNameBg.width / 2 - this._wifeNameTxt.width / 2 + 5;
        this._wifeNameTxt.y = wifeNameBg.y + wifeNameBg.height / 2 + 3;
        //中部红颜骨骼 没有骨骼用图片
        this.refreshWifeBone(this._wifeIconIdx, true);
        //樱花特效
        if (App.CommonUtil.check_dragon()) {
            var sakuraEffect = App.DragonBonesUtil.getLoadDragonBones('meetBeauty_wife_1', 0, 'huaban');
            //
            sakuraEffect.name = 'sakuraEffect';
            view.addChild(sakuraEffect);
            sakuraEffect.x = centerBg.x + centerBg.width / 2 - 40;
            sakuraEffect.y = centerBg.y + centerBg.height - 300;
        }
        //骨骼下方遮罩
        var boneMask = BaseBitmap.create('meetbeauty_bonemask');
        boneMask.name = 'boneMask';
        view.addChild(boneMask);
        boneMask.x = centerBg.x + centerBg.width / 2 - boneMask.width / 2 - 20;
        boneMask.y = centerBg.y + centerBg.height - 85;
        //下方当前权势
        var powerTipContainer = this.getPowerTipContainer();
        view.addChild(powerTipContainer);
        powerTipContainer.x = view.x + view.width / 2 - powerTipContainer.width / 2;
        powerTipContainer.y = centerBg.y + centerBg.height;
        this.startTimeCount();
        //权势进度条
        var progressContainer = this.getProgressContainer();
        view.addChild(progressContainer);
        //4位红颜cell
        this._wifeIconContainer = this.getWifeCircleContainer();
        this.addChild(this._wifeIconContainer);
        this._wifeIconContainer.x = centerBg.x;
        this._wifeIconContainer.y = centerBg.y;
        this.clickWifeCellHandler(null, this._unlockStep);
    };
    //获取数据
    MeetBeautyView.prototype.initData = function () {
        this._wifeIdList = Config.MeetbeautyCfg.getWifeIdList();
        this._powerNeed = Config.MeetbeautyCfg.getNeedPowerList();
        this._unlockStep = Config.MeetbeautyCfg.getNowPowerStep();
        this._powerNumber = Api.playerVoApi.getPlayerPower();
        if (this._unlockStep > 3) {
            this._unlockStep = 3;
        }
        this._wifeIconIdx = 0;
        this._wifeInfoCfg = Config.WifeCfg.getWifeCfgById(this._wifeIdList[this._wifeIconIdx]);
        var regdt = Api.gameinfoVoApi.getRegdt();
        var nowTime = GameData.serverTime;
        var resetDay = Config.MeetbeautyCfg.getResetDay();
        var resetSec = resetDay * App.DateUtil.dayHours * App.DateUtil.hourSeconds;
        this._remainTime = resetSec - (Math.floor((nowTime - regdt)) % (resetSec));
    };
    //标题栏
    MeetBeautyView.prototype.getTitleContainer = function () {
        var titleContainer = new BaseDisplayObjectContainer;
        titleContainer.name = 'topTitle';
        if (App.CommonUtil.check_dragon()) {
            var titleBone = App.DragonBonesUtil.getLoadDragonBones('specialgetreward_belt');
            titleContainer.addChild(titleBone);
            titleBone.setPosition(160, 45);
        }
        var moveClip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 70);
        moveClip.scaleX = 1.15;
        moveClip.scaleY = 1.2;
        titleContainer.addChild(moveClip);
        moveClip.setPosition(-30, -40);
        moveClip.playWithTime(-1);
        var topTitle = BaseBitmap.create('meetbeautyview_toptitle');
        titleContainer.addChild(topTitle);
        return titleContainer;
    };
    //当前权势
    MeetBeautyView.prototype.getPowerTipContainer = function () {
        var powerContainer = new BaseDisplayObjectContainer();
        var powerBg = BaseBitmap.create('meetbeauty_powertip');
        powerBg.height = 250;
        powerContainer.addChild(powerBg);
        var powerNumBg = BaseBitmap.create('meetbeauty_powernumber_bg');
        powerNumBg.alpha = 0.15;
        powerContainer.addChild(powerNumBg);
        powerNumBg.x = powerBg.width / 2 - powerNumBg.width / 2;
        powerNumBg.y = 70;
        var tipTitleTxt = ComponentManager.getTextField(LanguageManager.getlocal('meetBeautyReqTitle'), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTitleTxt.x = powerBg.width / 2 - tipTitleTxt.width / 2;
        tipTitleTxt.y = 40;
        powerContainer.addChild(tipTitleTxt);
        var nowPowerTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText2(this._powerNumber), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nowPowerTxt.x = powerNumBg.x + powerNumBg.width / 2 - nowPowerTxt.width / 2;
        nowPowerTxt.y = powerNumBg.y + powerNumBg.height / 2 - nowPowerTxt.height / 2 + 2;
        nowPowerTxt.textAlign = egret.HorizontalAlign.CENTER;
        powerContainer.addChild(nowPowerTxt);
        //to do 本地化
        var tipTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal('meetBeautyReqContent'), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt_1.x = powerBg.width / 2 - tipTxt_1.width / 2;
        ;
        tipTxt_1.y = 130;
        powerContainer.addChild(tipTxt_1);
        //to do 本地化
        // let tipTxt_2 = ComponentManager.getTextField('大人提升权势可以获得佳人芳心哦', TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // tipTxt_2.x = powerBg.width / 2 - tipTxt_2.width / 2;
        // tipTxt_2.y = 150;
        // powerContainer.addChild(tipTxt_2);
        //倒计时
        this._remainTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal('meetBeautyReqTimeLeft', [this.getFormatTime()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xd28ca0);
        this._remainTimeTxt.x = powerBg.width / 2 - this._remainTimeTxt.width / 2;
        this._remainTimeTxt.y = 180;
        powerContainer.addChild(this._remainTimeTxt);
        return powerContainer;
    };
    //4位红颜
    MeetBeautyView.prototype.getWifeCircleContainer = function () {
        var wifeContainer = new BaseDisplayObjectContainer();
        wifeContainer.name = 'wifeCellContainer';
        var posList = [[120, 465], [270, 450], [385, 365], [435, 220]];
        for (var i = 0, j = this._wifeIdList.length; i < j; i++) {
            var wifeIcon = this.getWifeIcon(this._wifeIdList[i], this._powerNeed[i], i);
            wifeContainer.addChild(wifeIcon);
            wifeIcon.setPosition(posList[i][0], posList[i][1]);
        }
        return wifeContainer;
    };
    //红颜头像cell
    MeetBeautyView.prototype.getWifeIcon = function (wifeId, needPower, idx) {
        var iconContainer = new BaseDisplayObjectContainer();
        //bg
        var iconBg = BaseBitmap.create("tailor_iconBtn");
        iconBg.name = "iconBg";
        iconContainer.addChild(iconBg);
        //icon
        var iconStr = Config.WifeCfg.getWifeCfgById(wifeId).icon;
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setScale(0.4);
        iconContainer.addChild(icon);
        icon.x = 15;
        icon.y = 8;
        //mask
        var iconMask = new egret.Shape();
        iconMask.graphics.beginFill(0x0000ff);
        iconMask.graphics.drawCircle(0, 0, 40);
        iconMask.graphics.endFill();
        iconContainer.addChild(iconMask);
        iconContainer.cacheAsBitmap = true;
        icon.mask = iconMask;
        iconMask.x = iconBg.x + iconBg.width / 2;
        iconMask.y = iconBg.y + iconBg.height / 2 - 5;
        //iconeffect
        if (idx === this._unlockStep) {
            var iconFireEffect = ComponentManager.getCustomMovieClip("wifeicon_effect", 12, 100);
            iconFireEffect.setPosition(iconBg.x + iconBg.width / 2 - 97, iconBg.y + iconBg.height / 2 - 105);
            iconFireEffect.playWithTime(-1);
            iconContainer.addChild(iconFireEffect);
        }
        //已获得
        if (idx < this._unlockStep) {
            var wifegot = BaseBitmap.create("meetbeauty_wifegot");
            wifegot.setPosition(iconBg.x + iconBg.width / 2 - wifegot.width / 2, iconBg.y + iconBg.height / 2 - wifegot.height / 2);
            iconContainer.addChild(wifegot);
        }
        //powerbg
        var nameBg = BaseBitmap.create("meetbeauty_needpower_bg");
        nameBg.width = iconBg.width + 2;
        nameBg.setPosition(iconBg.x + iconBg.width / 2 - nameBg.width / 2, 80);
        iconContainer.addChild(nameBg);
        //powertxt
        var fmtNeedPower = (needPower / 10000) + LanguageManager.getlocal("num_10K") + LanguageManager.getlocal("rankpower");
        var nameTF = ComponentManager.getTextField(fmtNeedPower, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        iconContainer.addChild(nameTF);
        iconContainer.addTouchTap(this.clickWifeCellHandler, this, [idx]);
        //iconContainer.setScale(0.8);
        return iconContainer;
    };
    //刷新骨骼 没有骨骼用图片
    MeetBeautyView.prototype.refreshWifeBone = function (wifeIdx, isInit) {
        if (!isInit && wifeIdx === this._wifeIconIdx) {
            return;
        }
        if (this.getChildByName('wifeBone')) {
            //this.removeChild(this._wifeBone);
            this._wifeBone.dispose();
        }
        if (this.getChildByName('wifeImg')) {
            //this.removeChild(this._wifeImg);
            this._wifeImg.dispose();
        }
        this._wifeIconIdx = wifeIdx;
        var wifeId = this._wifeIdList[wifeIdx];
        this._wifeInfoCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var wifePicStr = this._wifeInfoCfg.body;
        var centerBg = this.getChildByName('centerBg');
        if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(this._wifeInfoCfg.bone + "_ske")) {
            this._wifeBone = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoCfg.bone);
            this._wifeBone.name = 'wifeBone';
            this._wifeBone.setScale(0.8);
            this.addChildAt(this._wifeBone, this.getChildIndex(centerBg) + 1);
            this._wifeBone.x = centerBg.x + centerBg.width / 2 - 40;
            this._wifeBone.y = centerBg.y + centerBg.height - 40;
        }
        else {
            this._wifeImg = BaseLoadBitmap.create(wifePicStr);
            this._wifeImg.name = 'wifeImg';
            this._wifeImg.setScale(0.6);
            this.addChildAt(this._wifeImg, this.getChildIndex(centerBg) + 1);
            this._wifeImg.x = centerBg.x + 70;
            this._wifeImg.y = centerBg.y + 30;
        }
    };
    MeetBeautyView.prototype.getProgressContainer = function () {
        var progContainer = new BaseDisplayObjectContainer;
        var centerBg = this.getChildByName('centerBg');
        var posList = [[181, 515], [326, 412], [448, 282], [181, 515], [326, 412], [448, 282]];
        var barBg_1 = BaseBitmap.create('meetbeauty_barBg_1');
        var barBg_2 = BaseBitmap.create('meetbeauty_barBg_2');
        var barBg_3 = BaseBitmap.create('meetbeauty_barBg_3');
        var bar_1 = BaseBitmap.create('meetbeauty_bar_1');
        var bar_2 = BaseBitmap.create('meetbeauty_bar_2');
        var bar_3 = BaseBitmap.create('meetbeauty_bar_3');
        progContainer.addChild(barBg_1);
        progContainer.addChild(barBg_2);
        progContainer.addChild(barBg_3);
        progContainer.addChild(bar_1);
        progContainer.addChild(bar_2);
        progContainer.addChild(bar_3);
        for (var i = 0; i < progContainer.numChildren; i++) {
            var bar = progContainer.getChildAt(i);
            bar.x = centerBg.x + posList[i][0];
            bar.y = centerBg.y + posList[i][1];
            if (i < 3) {
                bar.visible = true;
            }
            else {
                bar.visible = this._unlockStep > i - 2;
            }
        }
        return progContainer;
    };
    MeetBeautyView.prototype.startTimeCount = function () {
    };
    MeetBeautyView.prototype.getBgName = function () {
        return null;
    };
    MeetBeautyView.prototype.getTitleBgName = function () {
        return '';
    };
    MeetBeautyView.prototype.getTitleStr = function () {
        return '';
    };
    MeetBeautyView.prototype.getFormatTime = function () {
        return App.DateUtil.getFormatBySecond(this._remainTime);
    };
    MeetBeautyView.prototype.clickWifeCellHandler = function (param, idx) {
        //选中发光
        var iconNum = this._wifeIconContainer.numChildren;
        for (var i = 0; i < iconNum; i++) {
            var icon = this._wifeIconContainer.getChildAt(i);
            var iconImg = icon.getChildByName('iconBg');
            if (i === idx) {
                iconImg.setRes('tailor_iconBtn_down');
            }
            else {
                iconImg.setRes('tailor_iconBtn');
            }
        }
        //刷新龙骨,刷新数据
        this.refreshWifeBone(idx);
        this._wifeNameTxt.setString(LanguageManager.getlocal('wifeName_' + this._wifeInfoCfg.id));
    };
    MeetBeautyView.prototype.tick = function () {
        if (this._remainTime) {
            this._remainTime--;
            if (this._remainTime < 0) {
                this._remainTime = 0;
            }
            this._remainTimeTxt.setString(LanguageManager.getlocal('meetBeautyReqTimeLeft', [this.getFormatTime()]));
        }
    };
    MeetBeautyView.prototype.closeHandler = function () {
        _super.prototype.hide.call(this);
    };
    MeetBeautyView.prototype.dispose = function () {
        this._wifeBone = null;
        this._wifeImg = null;
        this._wifeIdList = [];
        this._wifeIconIdx = 0;
        this._wifeIconContainer = null;
        this._wifeInfoCfg = null;
        this._wifeNameTxt = null;
        this._powerNumber = 0;
        this._powerNeed = [];
        this._unlockStep = 0;
        this._remainTime = 0;
        this._remainTimeTxt = null;
        _super.prototype.dispose.call(this);
    };
    return MeetBeautyView;
}(CommonView));
__reflect(MeetBeautyView.prototype, "MeetBeautyView");
//# sourceMappingURL=MeetBeautyView.js.map