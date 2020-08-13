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
// TypeScript file
/**
 * 洗澡
 * jiangliuyang
 */
var AcWifeBathingView = (function (_super) {
    __extends(AcWifeBathingView, _super);
    function AcWifeBathingView() {
        var _this = _super.call(this) || this;
        //容器
        _this._nodeContainer = null;
        //照片
        _this._contentImg = null;
        //进度条
        _this._progress = null;
        //进度条文字
        _this._progressText = null;
        //领取按钮
        _this._collectBtn = null;
        //充值按钮
        _this._chargeBtn = null;
        _this._haveBtn = null;
        _this._timeText = null;
        return _this;
    }
    Object.defineProperty(AcWifeBathingView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeBathingView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //init view 
    AcWifeBathingView.prototype.initView = function () {
        //添加vo数据更改的消息监听
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACWIFEBATHING_REFRESHVO, this.refreshDataStatus, this);
        //初始化已经领取标识
        // this._isCollected = this.vo.get == 1 ? true : false;
        if (this.code == "2") {
            var titltTxt = BaseBitmap.create(this.getDefaultRes("acwifebathingview_txt"));
            titltTxt.y = 2;
            titltTxt.x = GameConfig.stageWidth / 2 - titltTxt.width / 2;
            this.addChild(titltTxt);
        }
        //初始化界面
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = GameConfig.stageHeigth - 104;
        this.addChildToContainer(this._nodeContainer);
        this._contentImg = BaseLoadBitmap.create(this.getDefaultRes("acwifebathingview_bg"));
        this._contentImg.width = 640;
        this._contentImg.height = 1136;
        this._contentImg.y = GameConfig.stageHeigth - 1136;
        this.addChildToContainer(this._contentImg);
        //public_daoju_bg01 di
        //public_daoju_bg02 花
        //上面详情底板
        var topBg = BaseBitmap.create("public_9_wordbg");
        if (this.code == "2") {
            topBg.texture = ResourceManager.getRes("acwifebathingview_topbg-2");
        }
        else {
            topBg.scaleY = 90 / 184;
        }
        topBg.x = 0;
        topBg.y = 0 + 69;
        this.addChildToContainer(topBg);
        //下面底板
        var bottom = BaseBitmap.create("public_daoju_bg01");
        if (this.code == "2") {
            bottom.texture = ResourceManager.getRes("acredlotuswarrior_btnbg-1");
            bottom.y = GameConfig.stageHeigth - bottom.height - this.container.y;
        }
        else {
            bottom.y = GameConfig.stageHeigth - bottom.height;
        }
        bottom.x = GameConfig.stageWidth / 2 - bottom.width / 2;
        this.addChildToContainer(bottom);
        //花
        var f = BaseBitmap.create("public_daoju_bg02");
        f.x = GameConfig.stageWidth - f.width;
        f.y = GameConfig.stageHeigth - f.height;
        this.addChildToContainer(f);
        //活动时间
        var time = this.vo.acTimeAndHour;
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewAcTime"), [time]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTime.x = 15;
        acTime.y = topBg.y + 5;
        this.addChildToContainer(acTime);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewDesc"), ["1", String(this.cfg.exchange)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 560;
        desc.x = acTime.x;
        desc.y = acTime.y + acTime.height + 10;
        desc.lineSpacing = 5;
        this.addChildToContainer(desc);
        this._progress = ComponentManager.getProgressBar("progress_type2_yellow", "progress_type2_bg", 500);
        this._progress.x = GameConfig.stageWidth / 2 - this._progress.width / 2;
        this._progress.y = topBg.y + 90 + 30;
        this.addChildToContainer(this._progress);
        this._progressText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._progressText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewProgress"), ["0", String(this.cfg.need)]);
        this._progressText.x = this._progress.x + this._progress.width / 2 - this._progressText.width / 2;
        this._progressText.y = this._progress.y + this._progress.height / 2 - this._progressText.height / 2;
        this.addChildToContainer(this._progressText);
        var icon = BaseBitmap.create(this.getDefaultRes("acwifebathingview_proicon"));
        icon.x = this._progress.x - icon.width + 10;
        icon.y = this._progress.y + this._progress.height / 2 - icon.height / 2;
        this.addChildToContainer(icon);
        if (this.code == "1") {
            var detailBtn = ComponentManager.getButton(this.getDefaultRes("acwifebathingview_detailbtn"), null, this.openDetailWin, this, null, 3);
            detailBtn.anchorOffsetY = detailBtn.height;
            detailBtn.x = GameConfig.stageWidth / 2 + 70;
            detailBtn.y = GameConfig.stageHeigth / 2 - detailBtn.height / 2 + detailBtn.height;
            this.addChildToContainer(detailBtn);
            egret.Tween.get(detailBtn, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 1000)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 2000)
                .to({ scaleX: 1, scaleY: 1 }, 1000);
        }
        // let detailBtnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewDetailText")),18,TextFieldConst.COLOR_BROWN);
        // detailBtnText.lineSpacing = 5;
        // detailBtnText.textAlign = egret.HorizontalAlign.CENTER;
        // detailBtnText.x = detailBtn.x + detailBtn.width/2 - detailBtnText.width/2;
        // detailBtnText.y = detailBtn.y + detailBtn.height/2 - detailBtnText.height/2 - 15;
        // this.addChildToContainer(detailBtnText);
        var t = this.acVo.et - GameData.serverTime;
        if (t < 0) {
            t = 0;
        }
        var timeTxt = App.DateUtil.getFormatBySecond(t, 8);
        this._timeText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewCdTime"), [timeTxt]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeText.x = acTime.x + acTime.width + 20;
        this._timeText.y = acTime.y;
        this.addChildToContainer(this._timeText);
        if (this.code == "2") {
            var infoBtn = ComponentManager.getButton("acmidautumnview_infobtn", "", this.openDetailWin, this);
            infoBtn.setPosition(10, bottom.y - 30);
            this.addChild(infoBtn);
        }
        //刷新数据状态
        this.refreshDataStatus();
        this.showFirstDialog();
    };
    AcWifeBathingView.prototype.detailBtnHandler = function () {
        var sceneId = this.cfg.wifeBathingId;
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW, { sceneId: sceneId, wifename: LanguageManager.getlocal("wifeName_" + this.cfg.wifeId) });
    };
    AcWifeBathingView.prototype.tick = function () {
        var t = this.acVo.et - GameData.serverTime;
        if (t < 0) {
            t = 0;
            TickManager.removeTick(this.tick, this);
            this._timeText.text = LanguageManager.getlocal("acChristmasActiveOver");
        }
        else {
            var t_1 = this.acVo.et - GameData.serverTime;
            if (t_1 < 0) {
                t_1 = 0;
            }
            var timeTxt = App.DateUtil.getFormatBySecond(t_1, 8);
            this._timeText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewCdTime"), [timeTxt]);
        }
    };
    AcWifeBathingView.prototype.openDetailWin = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIFEBATHINGDETAILPOPUPVIEW, { "code": this.code, "aid": this.aid });
    };
    //刷新按钮初始化状态
    AcWifeBathingView.prototype.refreshDataStatus = function () {
        //刷新进度条上的文本进度显示
        this._progressText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeBathingViewProgress"), [this.vo.scorenum >= this.cfg.need ? String(this.cfg.need) : String(this.vo.scorenum), String(this.cfg.need)]);
        this._progressText.x = this._progress.x + this._progress.width / 2 - this._progressText.width / 2;
        this._progress.setPercentage(this.vo.scorenum / this.cfg.need);
        //实际数值和需要数值的差
        var val = this.vo.scorenum - this.cfg.need;
        var showMark = 0; //1->显示充值按钮  2->显示领取按钮  3->已解锁
        if (val < 0) {
            //没有达成需求，显示去充值按钮
            showMark = 1;
        }
        else {
            showMark = 3;
            //已经达成需求，显示 领取按钮 或者显示 已经领取标识
            if (this.vo.get == 0) {
                //没领取 显示 领取按钮
                showMark = 2;
            }
        }
        //刷新按钮状态
        this.refreshBtnStatus(showMark);
    };
    //显示按钮
    //1->显示充值按钮  2->显示领取按钮  3->显示标识
    AcWifeBathingView.prototype.refreshBtnStatus = function (showMar) {
        //创建按钮
        if (this._chargeBtn == null) {
            this._chargeBtn = ComponentManager.getButton(this.code == "2" ? "acredlotuswarrior_btn-1" : ButtonConst.BTN_BIG_YELLOW, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
            this._chargeBtn.x = GameConfig.stageWidth / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = GameConfig.stageHeigth - this._chargeBtn.height - 10;
            this.addChildToContainer(this._chargeBtn);
        }
        if (this._collectBtn == null) {
            this._collectBtn = ComponentManager.getButton(this.code == "2" ? "acredlotuswarrior_btn-1" : ButtonConst.BTN_BIG_BLUE, this.getDefaultCn("acWifeBathingViewGetBtn"), this.collectBtnHandler, this);
            this._collectBtn.x = GameConfig.stageWidth / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = GameConfig.stageHeigth - this._collectBtn.height - 10;
            this.addChildToContainer(this._collectBtn);
        }
        if (this._haveBtn == null) {
            this._haveBtn = ComponentManager.getButton(this.code == "2" ? "acredlotuswarrior_btn-1" : ButtonConst.BTN_BIG_BLUE, this.getDefaultCn("acWifeBathingViewHaveBtn"), null, this);
            this._haveBtn.x = GameConfig.stageWidth / 2 - this._haveBtn.width / 2;
            this._haveBtn.y = GameConfig.stageHeigth - this._haveBtn.height - 10;
            this._haveBtn.setEnable(false);
            this.addChildToContainer(this._haveBtn);
        }
        if (this.code == "2") {
            this._chargeBtn.setColor(TextFieldConst.COLOR_BROWN);
            this._collectBtn.setColor(TextFieldConst.COLOR_BROWN);
            this._haveBtn.setColor(TextFieldConst.COLOR_BROWN);
        }
        //1->显示充值按钮  2->显示领取按钮  3->显示标识
        switch (showMar) {
            case 1:
                this._chargeBtn.visible = true;
                this._collectBtn.visible = false;
                this._haveBtn.visible = false;
                break;
            case 2:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = true;
                this._haveBtn.visible = false;
                break;
            case 3:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = false;
                this._haveBtn.visible = true;
                break;
            default:
                break;
        }
    };
    AcWifeBathingView.prototype.getTitleBgName = function () {
        if (this.code == "2") {
            return "acwifebathingview_titlebg-2";
        }
        return "commonview_db_04";
    };
    //点击领取按钮
    AcWifeBathingView.prototype.collectBtnHandler = function () {
        var deltaT = this.vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFEBATHINGREWARD), this.collectBtnHandlerCallback, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWIFEBATHINGREWARD, { activeId: this.aid + "-" + this.code });
    };
    //领取请求返回
    AcWifeBathingView.prototype.collectBtnHandlerCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFEBATHINGREWARD), this.collectBtnHandlerCallback, this);
        var ret = event.data.data.ret;
        // let data = {get:1,v:this._dataVo.v};
        // this._dataVo.testFunc(data);
        //领取失败
        if (ret == 0) {
            //领取成功
            ViewController.getInstance().openView(ViewConst.BASE.WIFEBATHSCENEVIEW, { id: this.cfg.wifeId, sceneId: this.cfg.wifeBathingId });
            this.checkRewardSuccess();
        }
        else if (ret == -3) {
            //没有红颜
            App.CommonUtil.showTip(LanguageManager.getlocal("acWifeBathingViewHaveNoWife" + (this.code == "1" ? "" : this.code)));
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
    };
    //成功获取 隐藏按钮
    AcWifeBathingView.prototype.checkRewardSuccess = function () {
        //创建按钮
        if (this._chargeBtn == null) {
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
            this._chargeBtn.x = GameConfig.stageWidth / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = GameConfig.stageHeigth - this._chargeBtn.height - 10;
            this.addChildToContainer(this._chargeBtn);
        }
        if (this._collectBtn == null) {
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "ac_recharge_Btntxt2", this.collectBtnHandler, this);
            this._collectBtn.x = GameConfig.stageWidth / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = GameConfig.stageHeigth - this._collectBtn.height - 10;
            this.addChildToContainer(this._collectBtn);
        }
        if (this._haveBtn == null) {
            this._haveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, this.getDefaultCn("acWifeBathingViewHaveBtn"), null, this);
            this._haveBtn.x = GameConfig.stageWidth / 2 - this._haveBtn.width / 2;
            this._haveBtn.y = GameConfig.stageHeigth - this._haveBtn.height - 10;
            this._haveBtn.setEnable(false);
            this._nodeContainer.addChild(this._haveBtn);
        }
        this._chargeBtn.visible = false;
        this._collectBtn.visible = false;
        this._haveBtn.visible = true;
    };
    AcWifeBathingView.prototype.showFirstDialog = function () {
        if (!this.vo.getOpened()) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.aid + "-" + this.code, flagkey: "opened", value: 1 });
            ViewController.getInstance().openView(ViewConst.BASE.ACWIFEBATHINGAVGVIEW, {
                idx: 1,
                buidId: "first",
                aid: this.aid,
                code: this.code
            });
        }
    };
    //跳转充值界面
    AcWifeBathingView.prototype.goRechargeHandler = function () {
        var deltaT = this.vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcWifeBathingView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    //根据资源名字得到完整资源名字
    AcWifeBathingView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcWifeBathingView.prototype.getTitleStr = function () {
        if (this.code == "2") {
            return null;
        }
        else {
            _super.prototype.getTitleStr.call(this);
        }
    };
    //加载资源
    AcWifeBathingView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_9_wordbg",
            "progress_type2_yellow",
            "progress_type2_bg",
            "wifeview_charmicon",
            "acwifebathingview_expicon",
            "acmidautumnview_infobtn",
            "acredlotuswarrior_btn-1",
            "acredlotuswarrior_btnbg-1",
            this.getDefaultRes("acwifebathingview_detailborder"),
            this.getDefaultRes("acwifebathingview_detaildescbg"),
            this.getDefaultRes("acwifebathingview_detailflower1"),
            this.getDefaultRes("acwifebathingview_detailflower2"),
            this.getDefaultRes("acwifebathingview_proicon"),
            this.getDefaultRes("acwifebathingview_detailbtn"),
            this.getDefaultRes("acwifebathingview_topbg"),
            this.getDefaultRes("acwifebathingview_titlebg"),
            this.getDefaultRes("acwifebathingview_txt"),
        ]);
    };
    AcWifeBathingView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACWIFEBATHING_REFRESHVO, this.refreshDataStatus, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFEBATHINGREWARD), this.collectBtnHandlerCallback, this);
        this._nodeContainer = null;
        this._contentImg = null;
        this._progress = null;
        this._progressText = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._haveBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcWifeBathingView;
}(AcCommonView));
__reflect(AcWifeBathingView.prototype, "AcWifeBathingView");
