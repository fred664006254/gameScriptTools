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
var WifeGetView = (function (_super) {
    __extends(WifeGetView, _super);
    function WifeGetView() {
        var _this = _super.call(this) || this;
        _this._wifeInfoBg = null;
        _this._checkBox = null;
        return _this;
    }
    WifeGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeget_bg",
            "wifeget",
            "wifeget_json",
            "shareBtn",
            "shareRewardPop",
            "wifeview_namebg",
            "wifeview_namebg_male",
        ]);
    };
    WifeGetView.prototype.getWifeid = function () {
        if (typeof (this.param.data.wifeIdList) == "string") {
            this.param.data.wifeIdList = [this.param.data.wifeIdList];
        }
        var wifeId = this.param.data.wifeIdList.shift();
        // //触发分阶段引导
        // if(wifeId == "101"){
        // 	Api.rookieVoApi.curGuideKey = "wife";
        // 	Api.rookieVoApi.insertWaitingGuide({"idx":"wife_1"},true);
        // }
        if (wifeId == "101") {
            PlatformManager.analytics37JPPoint("custom_active", "obtain_the_beauty", 1);
        }
        return wifeId;
    };
    WifeGetView.prototype.getWaitServantId = function () {
        if (typeof (this.param.data) == "object") {
            return this.param.data.servantId;
        }
        return null;
    };
    WifeGetView.prototype.initView = function () {
        // SoundManager.pauseBg()
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
        this.reFreshView();
    };
    WifeGetView.prototype.reFreshView = function () {
        //删除这个界面的触摸回调
        this.removeTouchTap();
        App.DisplayUtil.destory(this.container);
        // super.dispose();
        //释放上级对话框的内存
        this.releaseFunc();
        //设置本次人物id
        this._personId = this.getWifeid();
        //设置类型
        this.targetType = "2";
        //设置结束回调
        this.initCallbackFunc(this.reFreshViewNext);
        //开始创建窗口
        _super.prototype.startView.call(this);
    };
    WifeGetView.prototype.reFreshViewNext = function () {
        var _this = this;
        SoundManager.pauseBg();
        var itemCfg = Config.WifeCfg.getWifeCfgById(this._personId);
        var id = itemCfg.id;
        if (id == "211" && Api.switchVoApi.checkOpenWifeVideo()) {
            App.VideoUtil.play("resource/other/wifeVideo/" + id + "/001001.mp4", function () { _this.reFreshView2(itemCfg); });
        }
        else {
            this.reFreshView2(itemCfg);
        }
    };
    WifeGetView.prototype.reFreshView2 = function (itemCfg) {
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id));
        var blueRes = { words: '', sound: '' };
        if (wifeInfoVo.cfg.isBule()) {
            var index = App.MathUtil.getRandom(1, 4);
            blueRes = wifeInfoVo.getBlueWordsAndSound(index);
        }
        if (!Api.switchVoApi.checkCloseWifeSound()) {
            var soundStr = wifeInfoVo.sound;
            if (wifeInfoVo.cfg.isBule()) {
                soundStr = blueRes.sound;
            }
            SoundManager.playEffect(soundStr);
        }
        // let bg:BaseBitmap=BaseBitmap.create("wifeget_bg");
        var bg = App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
        bg.setScale(GameConfig.stageWidth / bg.width);
        this.addChildToContainer(bg);
        var lizi = App.ParticleUtil.getParticle("wifeget");
        this.addChildToContainer(lizi);
        lizi.start();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 840);
        var wifeIcon = BaseLoadBitmap.create(itemCfg.body, rect);
        wifeIcon.setScale(0.7);
        var pos = App.CommonUtil.getCenterPos(this.viewBg, wifeIcon, false);
        wifeIcon.setPosition(pos.x, pos.y);
        this.addChildToContainer(wifeIcon);
        if (Api.wifeVoApi.isHaveBone(itemCfg.bone + "_ske")) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(itemCfg.bone);
            // droWifeIcon.setScale(0.7)
            droWifeIcon.x = wifeIcon.x + 210;
            droWifeIcon.y = wifeIcon.y + 760 * 0.7 + 70;
            this.addChildToContainer(droWifeIcon);
            wifeIcon.visible = false;
        }
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, false), wifeIcon.y + wifeIcon.height * wifeIcon.scaleY - bg.height * bg.scaleY);
        lizi.y = wifeIcon.y - 100;
        lizi.x = -350;
        this._wifeInfoBg = BaseBitmap.create("public_9_wordbg");
        this._wifeInfoBg.height = 200;
        this._wifeInfoBg.setPosition(0, wifeIcon.y + wifeIcon.height * wifeIcon.scaleY);
        this.addChildToContainer(this._wifeInfoBg);
        // let txt1:BaseTextField=ComponentManager.getTextField();
        //红颜名字背景
        var nameBg = BaseBitmap.create("wifeview_namebg" + (wifeInfoVo.cfg.isBule() ? "_male" : ''));
        this.addChildToContainer(nameBg);
        //红颜名字
        var nameTF = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.width = nameTF.width + 50;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            nameBg.y = GameConfig.stageHeigth - 300;
            nameTF.x = nameBg.x + (nameBg.width - nameTF.width) * 0.5;
            nameTF.y = nameBg.y + (nameBg.height - nameTF.height) / 2;
        }
        else {
            nameBg.x = wifeIcon.x - nameBg.width + 28;
            nameBg.y = wifeIcon.y;
            nameTF.width = 27;
            nameTF.x = nameBg.x + (nameBg.width - nameTF.width) * 0.5 - 15;
            nameTF.y = nameBg.y + (nameBg.height - nameTF.height) / 2;
        }
        this.addChildToContainer(nameTF);
        //红颜说的话背景
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        // wordsBg.height=200;
        // wordsBg.skewY = 180;
        // wordsBg.x = 140 - wordsBg.height;
        // wordsBg.y = wifeIcon.y-wordsBg.height-10;
        // this.addChildToContainer(wordsBg);
        wordsBg.skewY = 180;
        wordsBg.width = 330;
        wordsBg.height = 90;
        wordsBg.x = 280 + wordsBg.width;
        wordsBg.y = wifeIcon.y - 120;
        this.addChildToContainer(wordsBg);
        // let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
        // wordsCornerBg.x = wordsBg.x+wordsBg.width/2;
        // wordsCornerBg.y = wifeIcon.y - 120 + 87;
        // this.addChildToContainer(wordsCornerBg);
        //红颜说的话
        var wordsStr = itemCfg.words;
        if (wifeInfoVo.cfg.isBule()) {
            wordsStr = blueRes.words;
        }
        var wifeWordsText = ComponentManager.getTextField(wordsStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        wifeWordsText.width = wordsBg.width - 40;
        wifeWordsText.x = wordsBg.x + 20 - wordsBg.width;
        wifeWordsText.y = wordsBg.y + 15;
        this.addChildToContainer(wifeWordsText);
        var searchPersonCfg = Config.SearchCfg.getPersonItemCfgByWifeId(itemCfg.id);
        if (searchPersonCfg) {
            var ofx = 10;
            var ofy = 10;
            var identityTxt = ComponentManager.getTextField(LanguageManager.getlocal("identityDesc") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            identityTxt.setPosition(40, this._wifeInfoBg.y + 40);
            this.addChildToContainer(identityTxt);
            var identityDescTxt = ComponentManager.getTextField(searchPersonCfg.shortDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            identityDescTxt.setPosition(identityTxt.x + identityTxt.width + ofx, identityTxt.y);
            this.addChildToContainer(identityDescTxt);
            var meiliTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            meiliTxt.setPosition(identityTxt.x, identityTxt.y + identityTxt.height + ofy);
            this.addChildToContainer(meiliTxt);
            var meiliDescTxt = ComponentManager.getTextField(Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id)).glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            meiliDescTxt.setPosition(meiliTxt.x + meiliTxt.width + ofx, meiliTxt.y);
            this.addChildToContainer(meiliDescTxt);
            var memoirTxt = ComponentManager.getTextField(LanguageManager.getlocal("memoirDesc") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            memoirTxt.setPosition(meiliTxt.x, meiliTxt.y + meiliTxt.height + ofy);
            this.addChildToContainer(memoirTxt);
            var memoirDescTxt = ComponentManager.getTextField(searchPersonCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            memoirDescTxt.setPosition(memoirTxt.x + memoirTxt.width + ofx, memoirTxt.y);
            memoirDescTxt.width = this._wifeInfoBg.width - memoirDescTxt.x - 30;
            this.addChildToContainer(memoirDescTxt);
        }
        this.addTouchTap(this.removeTween, this);
        this.container.alpha = 0;
        var ths = this;
        this.checkShowGetBtn();
        egret.Tween.get(this.container).to({ alpha: 1 }, 500).call(function () {
            ths.removeTouchTap();
            // ths.addTouchTap(ths.checkView,ths);
            ths.showGetBtn();
        });
        // //如果不是第二个红颜  第二个红颜会强弹分享(此处会判断平台和开关和第二个红颜的条件)
        // if(!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_WIFE,null)){
        // 	// 分享按钮
        // 	App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_WIFEGET);
        // }
    };
    WifeGetView.prototype.removeTween = function () {
        if (this.container) {
            egret.Tween.removeTweens(this.container);
            this.container.alpha = 1;
        }
        this.removeTouchTap();
        // this.addTouchTap(this.checkView,this);
        this.showGetBtn();
    };
    WifeGetView.prototype.checkShowGetBtn = function () {
        if (PlatformManager.checkGetShare()) {
            //如果不是第二个红颜  第二个红颜会强弹分享(此处会判断平台和开关和第二个红颜的条件)
            if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_WIFE, null)) {
                // 显示勾选分享
                this._checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("shareFriendText"), false, 18, 0x987160, "public_select_down2", "public_select2");
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "shareFriendCollect", this.collectBtnListener, this);
                // let checkBoxBg = BaseBitmap.create("public_icontimebg");
                // checkBoxBg.setScale(1);
                // this.addChildToContainer(checkBoxBg);
                collectBtn.x = this.viewBg.width / 2 - collectBtn.width / 2;
                collectBtn.y = this._wifeInfoBg.y - 5 - collectBtn.height;
                this.addChildToContainer(collectBtn);
                // GameConfig.stageWidth - 147 - 20 + 147/2 - this._checkBox.width/2;
                this._checkBox.x = this.viewBg.width - 20 - this._checkBox.width;
                this._checkBox.y = collectBtn.y;
                // checkBoxBg.x = this._checkBox.x + this._checkBox.width / 2 - checkBoxBg.width * checkBoxBg.scaleX/2 + 20;
                // checkBoxBg.y = this._checkBox.y + this._checkBox.height / 2 - checkBoxBg.height * checkBoxBg.scaleY/2;
                this.addChildToContainer(this._checkBox);
                var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
                this._checkBox.isSelected = !(otherinfo.notsharewife);
            }
        }
    };
    WifeGetView.prototype.showGetBtn = function () {
        if (PlatformManager.checkGetShare()) {
            //如果不是第二个红颜  第二个红颜会强弹分享(此处会判断平台和开关和第二个红颜的条件)
            if (Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_WIFE, null)) {
                // 显示勾选分享
                this.addTouchTap(this.checkView, this);
            }
        }
        else {
            this.addTouchTap(this.checkView, this);
        }
    };
    WifeGetView.prototype.collectBtnListener = function () {
        var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
        var oldState = !!otherinfo.notsharewife;
        var curState = !this._checkBox.isSelected;
        if (oldState != curState) {
            //值发生改变
            NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE, { scene: "wifeget", changshare: curState ? 1 : 0 });
        }
        if (!curState) {
            console.log("分享");
            PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_MEIRENAUTO, function () { }, this);
        }
        this.checkView();
    };
    WifeGetView.prototype.checkView = function () {
        if (this.param.data.wifeIdList.length <= 0) {
            //添加强制分享逻辑 不满足强弹条件 ，则调用回调函数
            Api.shareVoApi.showShare(ShareVoApi.TYPE_WIFE, null, this.hide, this);
        }
        else {
            this.reFreshView();
        }
    };
    WifeGetView.prototype.hide = function () {
        var servantId = this.getWaitServantId();
        _super.prototype.hide.call(this);
        if (servantId) {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, servantId);
        }
    };
    WifeGetView.prototype.getTitleStr = function () {
        return null;
    };
    WifeGetView.prototype.getBgName = function () {
        return "wifeview_lovebg";
    };
    WifeGetView.prototype.dispose = function () {
        this._wifeInfoBg = null;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return WifeGetView;
}(DialogueGetBaseView));
__reflect(WifeGetView.prototype, "WifeGetView");
