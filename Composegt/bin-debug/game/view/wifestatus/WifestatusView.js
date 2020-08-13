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
 * 红颜册封
 * author dky
 * date 2018/4/24
 * @class WifestatusView
 */
var WifestatusView = (function (_super) {
    __extends(WifestatusView, _super);
    function WifestatusView() {
        var _this = _super.call(this) || this;
        _this._redDotSp = null;
        return _this;
    }
    WifestatusView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE, this.showUnlockAni, this);
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE);
        // this.playEffect(SoundConst.EFFECT_WIFE,true);
        Api.rookieVoApi.checkNextStep();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESTATUS_STATE, this.callWifeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS, this.checkRedPoint, this);
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        //黑色长条
        // let bgBlackBar:BaseBitmap=BaseBitmap.create("public_9_viewmask");
        // bgBlackBar.width =640;
        // bgBlackBar.height =30;
        // bgBlackBar.setPosition(0,-7);
        // this.addChildToContainer(bgBlackBar);
        // let bottomBg = BaseBitmap.create("public_9v_bg02");
        // bottomBg.width = GameConfig.stageWidth-10;
        // bottomBg.height = GameConfig.stageHeigth - 186;
        // bottomBg.x = 5;
        // bottomBg.y = -7;
        // this.addChildToContainer(bottomBg);
        var bottomBg0 = BaseBitmap.create("public_9v_bg02");
        bottomBg0.width = GameConfig.stageWidth;
        bottomBg0.height = GameConfig.stageHeigth - 72;
        bottomBg0.x = 0;
        bottomBg0.y = -14;
        this.addChildToContainer(bottomBg0);
        var bottomBg2 = BaseBitmap.create("adult_lowbg");
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        this.addChildToContainer(bottomBg2);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = bottomBg0.height;
        bottomBg.x = 0;
        bottomBg.y = bottomBg0.y;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            bottomBg2.y = bottomBg.y + bottomBg.height - bottomBg2.height - 15;
            rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 219 - 8);
        }
        else {
            bottomBg2.y = bottomBg.y + bottomBg.height - bottomBg2.height - 10;
            rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 219);
        }
        var wifeList = Config.WifestatusCfg.getWifestatusList();
        this._scrollList = ComponentManager.getScrollList(WifestatusScrollItem, wifeList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 10);
        if (wifeList.length > 0) {
            this._scrollList.setScrollTopByIndex(wifeList.length - 1);
        }
        var listTitleBg = BaseBitmap.create("dinner_finish_dt01");
        listTitleBg.width = 624;
        listTitleBg.height = 46;
        listTitleBg.setPosition(GameConfig.stageWidth / 2 - listTitleBg.width / 2, this._scrollList.y + this._scrollList.height + 2);
        this.addChildToContainer(listTitleBg);
        var addContainer = new BaseDisplayObjectContainer();
        var add1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAdd1"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        add1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        // add1.x = 10;
        // add1.y = bottomBg.y + bottomBg.height/2 - add1.height/2;
        addContainer.addChild(add1);
        if (PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            add1.visible = false;
        }
        var add1Icon = BaseBitmap.create("wifestatus_icon");
        add1Icon.x = add1.x + add1.width + 10;
        add1Icon.setScale(0.7);
        // add1Icon.y = bgBlackBar.y + bgBlackBar.height/2 - add1Icon.height*0.7/2;
        addContainer.addChild(add1Icon);
        var starEffect = Config.WifestatusbaseCfg.starEffect;
        var add2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAdd2", [String(starEffect)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        add2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        add2.x = add1Icon.x + add1Icon.width * 0.7 + 10;
        add1.y = 3;
        add2.y = add1.y;
        // add2.y = bgBlackBar.y + bgBlackBar.height/2 - add2.height/2;
        addContainer.addChild(add2);
        addContainer.x = this.container.width / 2 - addContainer.width / 2;
        addContainer.y = listTitleBg.y + 10;
        this.addChildToContainer(addContainer);
        // let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
        // bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
        // this.addChildToContainer(bottom);
        //当前
        var curTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusScoreTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        curTitle.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        curTitle.x = 20;
        curTitle.y = bottomBg2.y + 15;
        this.addChildToContainer(curTitle);
        var scoreIcon = BaseBitmap.create("wifestatus_icon");
        scoreIcon.x = curTitle.x + curTitle.width + 10;
        scoreIcon.setScale(0.7);
        scoreIcon.y = curTitle.y - 3;
        this.addChildToContainer(scoreIcon);
        this._scoreTF = ComponentManager.getTextField(wifestatusVo.star + "", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // scoreTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._scoreTF.x = scoreIcon.x + scoreIcon.width * 0.7 + 10;
        this._scoreTF.y = curTitle.y;
        this.addChildToContainer(this._scoreTF);
        // let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var addstr = LanguageManager.getlocal("wifeStatusProAdd", [String((wifestatusVo.star * starEffect).toFixed(1))]);
        this._addTF = ComponentManager.getTextField(addstr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._addTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        this._addTF.x = 250;
        this._addTF.y = curTitle.y;
        this.addChildToContainer(this._addTF);
        var numstr = LanguageManager.getlocal("wifeStatusNum", [String(Api.wifestatusVoApi.getStatusWifeNum())]);
        this._numTF = ComponentManager.getTextField(numstr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._numTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        this._numTF.x = curTitle.x;
        this._numTF.y = curTitle.y + 35;
        this.addChildToContainer(this._numTF);
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var statusadd = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            var actadd = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.actadd;
            var statusaddall = statusadd ? statusadd : 0 + actadd ? actadd : 0;
            var talentstr = LanguageManager.getlocal("wifeStatusTalentAdd", [String((statusaddall))]);
            this._talentTF = ComponentManager.getTextField(talentstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            // this._talentTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            this._talentTF.x = this._addTF.x;
            this._talentTF.y = this._numTF.y;
            this.addChildToContainer(this._talentTF);
            this._talentTF.addTouchTap(this.talentInfo, this, null);
        }
        this._callBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeStatusAll", this.clickCallBtn, this);
        this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 20;
        // if(Api.switchVoApi.checkOpenWifeBattle()){
        // 	this._callBtn.y = this._addTF.y-15;
        // } else {
        // 	this._callBtn.y = this._addTF.y - 30
        // }
        this._callBtn.y = bottomBg2.y + 15;
        this.addChildToContainer(this._callBtn);
        // this._callBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.checkRedPoint();
        // Config.WifestatusbaseCfg.needVip
        var needVip = Api.vipVoApi.getNeedVip("wifeStatusAuto");
        if (needVip && Api.playerVoApi.getPlayerVipLevel() < needVip) {
            var vipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusAutoTip", [needVip + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            vipTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            vipTF.x = GameConfig.stageWidth - vipTF.width - 37;
            vipTF.y = this._scoreTF.y + this._scoreTF.height;
            this.addChildToContainer(vipTF);
            this._callBtn.visible = false;
        }
    };
    // public clickItemHandler(event: egret.TouchEvent): void {
    //     WifestatusView.currNum =event.data;
    //     var _wifestatusScrollItem: WifestatusScrollItem = <WifestatusScrollItem>this._scrollList.getItemByIndex(event.data);
    //     _wifestatusScrollItem.touchNum += 1;
    //     if (_wifestatusScrollItem.touchNum % 2 == 0) {
    //         _wifestatusScrollItem.itemListType = false;
    //     }
    //     else {
    //         _wifestatusScrollItem.itemListType = true;
    //     }
    //     this._scrollList.refreshData(this._announcementList);
    //     // this._scrollList.setScrollTopByIndex(event.data);
    // }
    WifestatusView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "wifeview",
            "wifestatus_child_bg", "servant_topresbg",
            "wifestatus_headbg", "wifestatus_headmask", "wifestatus_headnull", "wifestatus_icon",
            "wifestatus_itembg", "wifestatus_itembg2", "wifestatus_lock", "wifestatus_namebg", "wifestatus_smallbg",
            "wifeview_namebg",
            "wifeview_charmicon", "wifestatus_itembg_an1", "wifestatus_itembg_an2", "wifestatus_itembg_an3",
            "wifeview_vigoricon", "progress_type1_yellow", "progress_type1_bg", "arena_bottom",
            // "wifestatus_frame",
            "wifestatus_flytext", "wifestatus_itembg_9", "wifestatus_flytext_blueType",
            "wifestatus_itembg3", "wifestatus_itemeffect", "wifestatus_locked",
            "adult_lowbg", "dinner_finish_dt01", "wifestatus_yun1", "wifestatus_yun2",
            "progress_type3_bg",
            "progress_type1_yellow2"
        ]);
    };
    WifestatusView.prototype.unLockClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW);
    };
    WifestatusView.prototype.talentInfo = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTPLUSPOPUPVIEW);
    };
    WifestatusView.prototype.clickCallBtn = function (param) {
        //一件册封拦截
        if (!Api.wifestatusVoApi.getIsConfer()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusNoStatus"));
            return;
        }
        this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
        this.request(NetRequestConst.REQUEST_WIFESTATUS_AUTOCONFER, {});
        // ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:"102"})
    };
    //请求回调
    WifestatusView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.data.unlockFlag) {
            WifestatusView.unlockLevel = Api.wifestatusVoApi.getWifestatusVo().level;
        }
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // this._scrollList.refreshData(achList);
        var wifeList = Config.WifestatusCfg.getWifestatusList();
        var level = Api.wifestatusVoApi.getWifestatusVo().level;
        var index = Api.wifestatusVoApi.getWifeIndexVoById(level);
        // this._scrollList.setScrollTopByIndex(index);
        this._scrollList.refreshData(wifeList);
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var starEffect = Config.WifestatusbaseCfg.starEffect;
        var addstr = LanguageManager.getlocal("wifeStatusProAdd", [String((wifestatusVo.star * starEffect).toFixed(1))]);
        this._addTF.text = addstr;
        this._scoreTF.text = wifestatusVo.star + "";
        //显示特效
        var statusType = 0; //0上封 1 下封
        if (this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star) {
            statusType = 1;
        }
        // ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW,{wifeId:this.param.data.wifeId,type:statusType})
        if (data.data.data.addWifeArr && data.data.data.addWifeArr.length == 1) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW, { wifeId: data.data.data.addWifeArr[0], type: statusType });
            var needLv = Api.wifestatusVoApi.getWifestatusLevelById(data.data.data.addWifeArr[0]);
            var index2 = Api.wifestatusVoApi.getWifeIndexVoById(needLv);
            this._scrollList.setScrollTopByIndex(index2);
        }
        else {
            this._scrollList.setScrollTopByIndex(index);
            this.showUnlockAni();
        }
        var container = Api.wifestatusVoApi.getStatusEffect(Api.wifestatusVoApi.getWifestatusVo().star - this._oldStar);
        LayerManager.msgLayer.addChild(container);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESTATUS_STATE);
        // 
    };
    WifestatusView.prototype.confirmCallbackHandler = function () {
        if (WifeView.isMoveing) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY, null);
    };
    // 随机传唤后端返回数据后
    WifestatusView.prototype.callWifeCallback = function (event) {
        // let rdata = event.data.data.data;
        // this._loveData = rdata;
        // let id = this._loveData.callWife[0];
        // this._scrollList.addEventListener(egret.Event.COMPLETE,this.moveComplete,this);
        // this.container.touchChildren = false;
        // let index = Api.wifeVoApi.getWifeIndexVoById(id);
        // WifeView.isMoveing = true;
        // this._scrollList.setScrollTopByIndex(index +1,500);
        // let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index + 1);
        // wideItem.refreshData(id);
        var wifeList = Config.WifestatusCfg.getWifestatusList();
        this._scrollList.refreshData(wifeList);
        var index = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.wifeLevel);
        if (WifestatusView.unlockLevel) {
            index = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.unlockLevel);
            // this.showUnlockAni();
        }
        this._scrollList.setScrollTopByIndex(index);
        // if(wifeList.length > 0 ){
        // 	this._scrollList.setScrollTopByIndex(wifeList.length-1);
        // }
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var starEffect = Config.WifestatusbaseCfg.starEffect;
        var addstr = LanguageManager.getlocal("wifeStatusProAdd", [String((wifestatusVo.star * starEffect).toFixed(1))]);
        this._addTF.text = addstr;
        this._scoreTF.text = wifestatusVo.star + "";
        var numstr = LanguageManager.getlocal("wifeStatusNum", [String(Api.wifestatusVoApi.getStatusWifeNum())]);
        this._numTF.text = numstr;
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var statusadd = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            var actadd = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.actadd;
            var statusaddall = statusadd ? statusadd : 0 + actadd ? actadd : 0;
            var talentstr = LanguageManager.getlocal("wifeStatusTalentAdd", [String((statusaddall))]);
            if (this._talentTF) {
                this._talentTF.text = talentstr;
            }
        }
        // let index1 = Api.wifestatusVoApi.getWifeIndexVoById("11");
        // // WifestatusView.unlockLevel = "11";
        // this._scrollList.refreshData(wifeList);
        // this._scrollList.setScrollTopByIndex(index1);
    };
    WifestatusView.prototype.showUnlockAni = function () {
        if (WifestatusView.unlockLevel) {
            var index1 = Api.wifestatusVoApi.getWifeIndexVoById(WifestatusView.unlockLevel);
            var wifestatusScrollItem = this._scrollList.getItemByIndex(index1);
            wifestatusScrollItem.showUnlockAni();
        }
    };
    WifestatusView.prototype.refreshItem = function (p) {
        // if(!WifeView.wifeId){
        // 	return;
        // }
        if (p.data.ret == true && p.data.data.data.lucky) {
            this.showLucky();
        }
        var index = Api.wifeVoApi.getWifeIndexVoById(WifeView.wifeId);
        var wideItem = this._scrollList.getItemByIndex(index + 1);
        wideItem.refreshData(WifeView.wifeId);
    };
    // 列表滑动结束后
    WifestatusView.prototype.moveComplete = function (event) {
    };
    WifestatusView.prototype.showLucky = function () {
        App.CommonUtil.showGodbless("wife");
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    WifestatusView.prototype.getRuleInfo = function () {
        return "wifestatus_description";
    };
    WifestatusView.prototype.hide = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
        _super.prototype.hide.call(this);
    };
    WifestatusView.prototype.checkRedPoint = function () {
        var needVip = Api.vipVoApi.getNeedVip("wifeStatusAuto");
        //一键册封
        if (needVip && Api.wifestatusVoApi.getIsConfer() && Api.playerVoApi.getPlayerVipLevel() >= needVip) {
            if (this._redDotSp == null) {
                this._redDotSp = BaseBitmap.create("public_dot2");
                this._redDotSp.x = this._callBtn.x + this._callBtn.width - this._redDotSp.width;
                this._redDotSp.y = this._callBtn.y;
                this.addChildToContainer(this._redDotSp);
            }
            else {
                if (this._redDotSp) {
                    this._redDotSp.visible = true;
                }
            }
        }
        else {
            if (this._redDotSp) {
                this._redDotSp.visible = false;
            }
        }
    };
    WifestatusView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE, this.showUnlockAni, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS, this.checkRedPoint, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESTATUS_STATE, this.callWifeCallback, this);
        if (this._scrollList) {
            this._scrollList = null;
        }
        this._redDotSp = null;
        this._oldStar = null;
        this._loveData = null;
        this._rewardData = null;
        this._addTF = null;
        this._talentTF = null;
        this._scoreTF = null;
        WifestatusView.unlockLevel = null;
        _super.prototype.dispose.call(this);
    };
    WifestatusView.currNum = 0;
    WifestatusView.isMoveing = false;
    return WifestatusView;
}(CommonView));
__reflect(WifestatusView.prototype, "WifestatusView");
