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
 * 子嗣
 * author dky
 * date 2017/10/11
 * @class ChildView
 */
var ChildView = (function (_super) {
    __extends(ChildView, _super);
    function ChildView() {
        var _this = _super.call(this) || this;
        _this._childId = null;
        _this._childInfoObj = null;
        _this._proTxtList = null;
        _this._childProCfg = null;
        _this._curLevel = 0;
        _this._mainTaskHandKey = null;
        _this._mainTaskHandChoosedChild = null;
        _this._proAddTxt = null;
        _this._isRequesting = false;
        _this._mainTaskHandKey1 = null;
        _this._mainTaskHandKey2 = null;
        _this._mainTaskHandKey3 = null;
        return _this;
    }
    ChildView.prototype.showGuideAgain = function () {
        return "child_2";
    };
    ChildView.prototype.clickGuideAgain = function () {
        if (Api.childVoApi.getChildrenVoList().length <= 0) {
            var str = LanguageManager.getlocal("showGuideAgainTip_child");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: str,
                callback: this.clickRuleBtnHandler,
                handler: this,
                needCancel: false
            });
        }
        else {
            _super.prototype.clickGuideAgain.call(this);
            this._scrollList.setScrollTop(0);
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
            this._mainTaskHandKey1 = null;
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
            this._mainTaskHandKey2 = null;
        }
    };
    Object.defineProperty(ChildView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ChildView.prototype.getContainerY = function () {
        return 14;
    };
    ChildView.prototype.getBigFrame = function () {
        return null;
    };
    ChildView.prototype.initView = function () {
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        // let topBg = BaseBitmap.create("public_bg6");
        // topBg.y = -21;
        // this.addChildToContainer(topBg);
        Api.mainTaskVoApi.checkShowGuide();
        //孩子背景
        var childBg = BaseBitmap.create("childview_newbg");
        childBg.x = this.viewBg.width / 2 - childBg.width / 2;
        childBg.y = -17;
        this.addChildToContainer(childBg);
        //进度条背景
        var barBg = BaseBitmap.create("servant_downbg");
        barBg.x = 0;
        barBg.y = 320;
        this.addChildToContainer(barBg);
        //一键培养
        this._reachText = ComponentManager.getTextField(LanguageManager.getlocal("childUnlockDesc", [egret.toColorString(TextFieldConst.COLOR_QUALITY_ORANGE), "5", egret.toColorString(TextFieldConst.COLOR_QUALITY_GREEN)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._reachText.setPosition(20, GameConfig.stageHeigth - this.container.y - this._reachText.height - 30);
        this.addChildToContainer(this._reachText);
        this._childItemText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this._childNameText.addEventListener()
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeNameHandler, this._childNameText); 
        this._childItemText.setPosition(480, GameConfig.stageHeigth - this.container.y - this._reachText.height - 25);
        this.addChildToContainer(this._childItemText);
        if (Api.childVoApi.getChildNum() > 0) {
            //孩子属性容器
            this._childContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._childContainer);
            this._child_wordbg = BaseBitmap.create("public_9_bg25");
            this._child_wordbg.visible = false;
            this._child_wordbg.x = 420;
            this._child_wordbg.y = 20;
            this._child_wordbg.width = 210;
            this._child_wordbg.height = 78;
            this._childContainer.addChild(this._child_wordbg);
            this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
            this._child_wordbgCor.x = 480;
            this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
            this._childContainer.addChild(this._child_wordbgCor);
            this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this._childWordsText.text = LanguageManager.getlocal("childIntimacyDesc");
            this._childWordsText.x = this._child_wordbg.x + 20;
            this._childWordsText.y = this._child_wordbg.y + 20;
            this._childWordsText.width = 190;
            this._childWordsText.height = 80;
            this._childContainer.addChild(this._childWordsText);
            this._child_Icon = BaseLoadBitmap.create("");
            this._child_Icon.x = 140;
            this._child_Icon.y = this._child_wordbgCor.y - 60;
            this._childContainer.addChild(this._child_Icon);
            //等级蓝色背景图
            var servant_levebg = BaseBitmap.create("servant_levebg2");
            servant_levebg.x = 5;
            servant_levebg.y = barBg.y;
            this._childContainer.addChild(servant_levebg);
            //红色属性背景条
            var servant_attributemap = BaseBitmap.create("servant_attributemap");
            servant_attributemap.x = 180;
            servant_attributemap.y = 270;
            this._childContainer.addChild(servant_attributemap);
            //活力
            this._childVigourText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            this._childVigourText.text = LanguageManager.getlocal("childVigour");
            this._childVigourText.x = 500;
            this._childVigourText.y = barBg.y + 30 - this._childVigourText.height / 2;
            if (PlatformManager.checkIsThSp()) {
                this._childVigourText.x -= 20;
            }
            this._childContainer.addChild(this._childVigourText);
            this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
            this._progressBar.x = 10;
            this._progressBar.y = barBg.y + 85;
            this._childContainer.addChild(this._progressBar);
            this._levelTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            this._levelTxt.text = LanguageManager.getlocal("servant_infoLv");
            this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
            this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2;
            this._childContainer.addChild(this._levelTxt);
            // let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
            this._vigouTimeText = ComponentManager.getTextField("00:00:00", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._vigouTimeText.x = 510;
            this._vigouTimeText.y = barBg.y + 30 - this._vigouTimeText.height / 2;
            this._childContainer.addChild(this._vigouTimeText);
            //子嗣
            this._proTxtList = [];
            this._childInfoVo = Api.childVoApi.getChildrenVoList()[0];
            this._childInfoVoList = Api.childVoApi.getChildrenVoList();
            // let childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
            // 找到主线任务时要引导的child
            this.calcMainTaskHandChoosedChild();
            this._motherText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
            this._motherText.x = 5;
            this._motherText.y = -9;
            this._childContainer.addChild(this._motherText);
            this._intimacyText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
            this._intimacyText.x = 170;
            this._intimacyText.y = this._motherText.y;
            this._childContainer.addChild(this._intimacyText);
            if (!Api.switchVoApi.checkOpenWifeBattle()) {
                if (Api.switchVoApi.checkOpenQingYuanHuiJuan() || Api.switchVoApi.checkOpenWifeStatus()) {
                    var addstr = LanguageManager.getlocal("wifeStatusProAdd3", ["0.0"]);
                    //
                    var childAdd = ComponentManager.getTextField(addstr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                    // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
                    childAdd.x = this.width - childAdd.width - 45;
                    childAdd.y = this._motherText.y;
                    this._childContainer.addChild(childAdd);
                    this._proAddTxt = childAdd;
                    var askImg = ComponentManager.getButton("activity_rank_ask", "", function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.CHILDADDVIEW, _this._childInfoVo);
                    }, this);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, askImg, childAdd, [-askImg.width - 5, 0]);
                    this._childContainer.addChild(askImg);
                }
            }
            else {
                var askImg = ComponentManager.getButton("zqfdetail", "", function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.CHILDDETAILVIEW, _this._childInfoVo);
                }, this);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, askImg, servant_attributemap, [servant_attributemap.width - 17 - 40, 0]);
                this._childContainer.addChild(askImg);
            }
            //子嗣名字
            //子嗣属性
            this._nameBg = BaseBitmap.create("childview_namebg1");
            this._childContainer.addChild(this._nameBg);
            this._childNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._childNameText.text = "";
            this._childContainer.addChild(this._childNameText);
            //竖着的名字改横着的
            if (PlatformManager.checkIsTextHorizontal()) {
                var tempY = this._childContainer.height;
                this._nameBg.x = this._childContainer.width / 2 - this._nameBg.width / 2 - 22;
                this._nameBg.y = tempY - 230;
                this._childNameText.x = this._childContainer.width / 2 - this._childNameText.width / 2;
                this._childNameText.y = tempY - 210;
            }
            else {
                this._nameBg.x = 30;
                this._nameBg.y = 40;
                this._childNameText.width = 27;
                this._childNameText.x = this._nameBg.x + this._nameBg.width / 2 - this._childNameText.width / 2 + 3;
                this._childNameText.y = this._nameBg.y + 250 / 2 - this._childNameText.height / 2;
            }
            this._childNameText.addTouchTap(this.changeNameHandler, this, null);
            // this.addTouchTap(this.changeNameHandler,this);
            //等级 文字不变
            var lvText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            lvText.text = LanguageManager.getlocal("servant_infoLv");
            lvText.x = 22;
            lvText.y = servant_levebg.y + 5;
            this._childContainer.addChild(lvText);
            for (var i = 0; i < 4; i++) {
                var attribute = BaseBitmap.create("servant_attribute" + (i + 1));
                var num = i % 2;
                attribute.x = 90 + num * 180;
                attribute.y = 335 + 32 * Math.floor(i / 2);
                this._childContainer.addChild(attribute);
                // let proTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xddd5c7);
                // proTxt.x = attribute.x + attribute.width + 10;
                // proTxt.y = attribute.y + attribute.height/2 - proTxt.height/2
                // this._childContainer.addChild(proTxt);
                // this._proTxtList.push(proTxt);
            }
            this._childProCfg = [
                {
                    txt: this.getProStringWithProId(1),
                    txtId: 1,
                },
                {
                    txt: this.getProStringWithProId(2),
                    txtId: 2,
                },
                {
                    txt: this.getProStringWithProId(3),
                    txtId: 3,
                },
                {
                    txt: this.getProStringWithProId(4),
                    txtId: 4,
                },
                {
                    txt: this.getProStringWithProId(5),
                    txtId: 5,
                },
                {
                    txt: this.getProStringWithProId(6),
                    txtId: 6,
                },
            ];
            for (var index = 0; index < this._childProCfg.length; index++) {
                var element = this._childProCfg[index];
                var proTxt = ComponentManager.getTextField("", 22, element.txtcolor);
                if (index == 1) {
                    proTxt.text = element.txt;
                }
                else {
                    proTxt.text = this.getProStringWithProId(element.txtId);
                }
                // proTxt.x = proX;
                // proTxt.y = proY;
                //等级
                if (element.txtId == 1) {
                    proTxt.x = 5;
                    proTxt.y = 350;
                    proTxt.width = 80;
                    proTxt.textAlign = "center";
                    proTxt.size = 42;
                    proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                }
                //属性
                if (element.txtId == 2) {
                    // proTxt.visible =false;
                    proTxt.x = 210;
                    proTxt.y = 282;
                    proTxt.width = 190;
                    proTxt.size = 26;
                    proTxt.textAlign = "center";
                    proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                }
                //属性武力	
                if (element.txtId == 3) {
                    proTxt.x = 160;
                    proTxt.y = 338;
                    proTxt.size = 24;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                //属性智力
                if (element.txtId == 4) {
                    proTxt.x = 340;
                    proTxt.y = 338;
                    proTxt.size = 24;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                //属性政治
                if (element.txtId == 5) {
                    proTxt.x = 160;
                    proTxt.y = 372;
                    proTxt.size = 24;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                //属性魅力
                if (element.txtId == 6) {
                    proTxt.x = 340;
                    proTxt.y = 372;
                    proTxt.size = 24;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                if (element.txtId == 7) {
                    proTxt.x = 340;
                    proTxt.y = 395;
                    proTxt.size = 24;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                this._childContainer.addChild(proTxt);
                // proY += 28;
                this._proTxtList.push(proTxt);
            }
            // this.tick();
        }
        //孩子栏位背景
        var childItemBg = BaseBitmap.create("public_9_bg22");
        // childItemBg.width = 626;
        childItemBg.height = GameConfig.stageHeigth - this.container.y - childBg.height - 170;
        // childItemBg.height = 300 ;
        childItemBg.x = 0;
        childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height - 70;
        // childItemBg.y = -15;
        this.addChildToContainer(childItemBg);
        //初始化孩子席位
        var childNum = Api.childVoApi.getChildPosNum() + 1;
        if (Api.childVoApi.getChildPosNum() >= Config.ChildbaseCfg.maxPos) {
            childNum = Api.childVoApi.getChildPosNum();
        }
        var childPosList = new Array();
        for (var index = 0; index < childNum; index++) {
            childPosList.push(index);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 590, childItemBg.height - 55);
        this._scrollList = ComponentManager.getScrollList(ChildScrollItem, childPosList, rect, { data: this._childInfoVoList });
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = childItemBg.x + childItemBg.width / 2 - (640 - 46) / 2;
        this._scrollList.y = childItemBg.y + childItemBg.height / 2 - this._scrollList.height / 2;
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        if (this._childContainer) {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._childContainer.parent, 500, 375, null, 110, true, function () {
                return true;
            }, this);
        }
        if (!Api.rookieVoApi.isGuiding && (!Api.rookieVoApi.isInGuiding)) {
            var childNum_1 = Api.childVoApi.getChildPosNum();
            var item = this._scrollList.getItemByIndex(childNum_1);
            if (item) {
                this._mainTaskHandKey3 = App.MainTaskHandUtil.addHandNode(item, item.width / 2, 20, null, 404, true, function () {
                    return childNum_1 < Config.ChildbaseCfg.maxPos;
                }, this);
            }
        }
        //从其他界面点过来
        if (this.param && this.param.data.childId) {
            if (this.param.data.childId) {
                var chidlIndex = Api.childVoApi.getChildIndexVoById(this.param.data.childId);
                this._scrollList.setScrollTopByIndex(chidlIndex, 0);
                var childInfoVo = this._childInfoVoList[chidlIndex];
                var id = childInfoVo.id;
                this._childInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                // this._childScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
                SoundManager.playEffect(SoundConst.EFFECT_GETCHILD);
            }
        }
        else {
            if (Api.childVoApi.getChildNum() > 0) {
                var childInfoVo = this._childInfoVoList[0];
                var id = childInfoVo.id;
                this._childInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                var chidlIndex = Api.childVoApi.getChildIndexVoById(id);
                // this._childScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
                this.playChildEffect(childInfoVo);
            }
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var checkbox = ComponentManager.getCheckBox(LanguageManager.getlocal("childUpdAll2"));
            this.addChildToContainer(checkbox);
            this._checkBox = checkbox;
            var key = "childeventRemind-" + Api.playerVoApi.getPlayerID();
            var storage = LocalStorageManager.get(key);
            checkbox.setSelected(storage && storage == '1');
        }
        this.refreshChildPos();
    };
    ChildView.prototype.playChildEffect = function (childInfoVo) {
        var girlSound = [SoundConst.EFFECT_DAUGHTER_3AGE, SoundConst.EFFECT_DAUGHTER_8AGE];
        var boySound = [SoundConst.EFFECT_SON_3AGE, SoundConst.EFFECT_SON_8AGE];
        var rnd = App.MathUtil.getRandom(0, 2);
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var childState = childInfoVo.level / childCfg.lv;
        if (childState < 0.4) {
            SoundManager.playEffect(SoundConst.EFFECT_GETCHILD);
        }
        else if (childState >= 0.4 && childState < 1) {
            if (childInfoVo.sex == 1) {
                SoundManager.playEffect(boySound[rnd]);
            }
            else {
                SoundManager.playEffect(girlSound[rnd]);
            }
        }
    };
    ChildView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.tick();
        if (this._childInfoVoList) {
            var childInfoVo = this._childInfoVoList[index];
            if (childInfoVo) {
                var id = childInfoVo.id;
                this._childInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                this.setSelect(id);
            }
        }
        var childNum = Api.childVoApi.getChildPosNum();
        if (index == childNum) {
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey3);
            this._mainTaskHandKey3 = null;
            if (childNum >= Config.ChildbaseCfg.maxPos) {
                App.CommonUtil.showTip(LanguageManager.getlocal("childPosNumMax"));
                return;
            }
            //扩展席位
            var gem = Api.playerVoApi.getPlayerGem();
            var needGem = Api.childVoApi.getAddPosNeedGem();
            var message = LanguageManager.getlocal("childExtendGem", [App.StringUtil.toString(needGem)]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { useNum: needGem, confirmCallback: this.addChildPos, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1 });
        }
    };
    //扩展子嗣栏位回调
    ChildView.prototype.addChildPos = function () {
        this.request(NetRequestConst.REQUEST_CHILD_ADDPOSNUM, null);
    };
    //刷新选中状态
    ChildView.prototype.setSelect = function (childId) {
        var childIndex = Api.childVoApi.getChildIndexVoById(childId, this._childInfoVoList);
        if (this._childScrollItem) {
            if (this._childScrollItem.getChildByName("select")) {
                this._childScrollItem.removeChild(this._childScrollItem.getChildByName("select"));
                var baseBitmap = this._childScrollItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._childScrollItem = this._scrollList.getItemByIndex(childIndex);
        var bg2Index = this._childScrollItem.getChildIndex(this._childScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("childview_bg3");
        itemBg2.width = this._childScrollItem.width;
        itemBg2.height = 143;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = 0;
        itemBg2.y = 0;
        itemBg2.name = "select";
        this._childScrollItem.addChildAt(itemBg2, bg2Index);
        if (childIndex == 0) {
            var childInfoVo = this._childInfoVoList[childIndex];
            if (childInfoVo) {
                var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
                var vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
                if ((childInfoVo.name == "" || vigour <= 0) && childInfoVo.level < childCfg.lv) {
                    if (this._childNameBtn) {
                        if (!this._mainTaskHandKey1 && (!Api.rookieVoApi.isInGuiding) && (!Api.rookieVoApi.isGuiding)) {
                            this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(this._childContainer.parent, 530, 375, [this._childNameBtn], 402, true, function () {
                                return Api.childVoApi.getChildNum() > 0;
                            }, this);
                        }
                    }
                }
                else {
                    if (this._childUpdBtn) {
                        if (!this._mainTaskHandKey2 && (!Api.rookieVoApi.isInGuiding) && (!Api.rookieVoApi.isGuiding)) {
                            var childCfg_1 = GameConfig.config.childCfg[childInfoVo.quality.toString()];
                            this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(this._childContainer.parent, 530, 375, [this._childUpdBtn], 402, true, function () {
                                return this._childInfoVo.level < childCfg_1.lv;
                            }, this);
                        }
                    }
                }
            }
        }
        else {
            var childInfoVo = this._childInfoVoList[childIndex];
            if (childInfoVo) {
                if (this._mainTaskHandKey1) {
                    App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
                    this._mainTaskHandKey1 = null;
                }
                if (this._mainTaskHandKey2) {
                    App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
                    this._mainTaskHandKey2 = null;
                }
            }
        }
    };
    //刷新子嗣数据
    ChildView.prototype.updChildAttData = function (childInfoVo, isProAni) {
        this._childProCfg = [
            {
                txt: this.getProStringWithProId(1),
                txtId: 1,
            },
            {
                txt: this.getProStringWithProId(2),
                txtId: 2,
            },
            {
                txt: this.getProStringWithProId(3),
                txtId: 3,
            },
            {
                txt: this.getProStringWithProId(4),
                txtId: 4,
            },
            {
                txt: this.getProStringWithProId(5),
                txtId: 25,
            },
            {
                txt: this.getProStringWithProId(6),
                txtId: 6,
            },
        ];
        if (!childInfoVo) {
            return;
        }
        this._child_Icon.setload(Api.childVoApi.getChildPic(childInfoVo.id));
        var childCfg1 = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        if (childInfoVo.level == childCfg1.lv) {
            this._child_wordbg.visible = false;
            this._child_wordbgCor.visible = false;
            this._childWordsText.visible = false;
        }
        else {
            this._childWordsText.text = Api.childVoApi.getChildWord(childInfoVo.id);
            this._child_wordbg.visible = true;
            this._child_wordbgCor.visible = true;
            this._childWordsText.visible = true;
        }
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childInfoVo.motherId);
        this._motherText.text = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        this._intimacyText.text = LanguageManager.getlocal("childIntimacy", [wifeInfoVo.intimacy.toString()]);
        this._intimacyText.setPosition(this._motherText.x + this._motherText.width + 10, this._motherText.y);
        if (this._proAddTxt) {
            var num = 0;
            if (Api.switchVoApi.checkOpenWifeStatus()) {
                var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
                var starEffect = Config.WifestatusbaseCfg.starEffect;
                num += wifestatusVo.star * starEffect;
            }
            if (Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
                num += Api.encounterVoApi.getChildAdd(childInfoVo.motherId);
            }
            var addstr = LanguageManager.getlocal("wifeStatusProAdd3", [num.toFixed(1)]);
            this._proAddTxt.text = addstr;
        }
        var childName = childInfoVo.name;
        if (childName == "") {
            childName = LanguageManager.getlocal("childNeedName");
        }
        else {
            // childName = "<font u ='true'>" + childInfoVo.name + "</font>";
            // childName = "<font u ='true'>" + childInfoVo.name + "</font>";
        }
        this._childNameText.text = childName;
        //竖着的名字改横着的
        if (PlatformManager.checkIsTextHorizontal()) {
            // this._nameBg.x = this._childContainer.width/2-this._nameBg.width/2;
            // this._nameBg.y = this._childContainer.height - 250;
            // this._childNameText.x = this._nameBg.x + this._nameBg.width/2 - this._childNameText.width/2;
            // this._childNameText.y = this._nameBg.y + this._nameBg.height/2 - this._childNameText.height/2;
            this._childNameText.x = GameConfig.stageWidth / 2 - this._childNameText.width / 2;
            // this._childNameText.y = this._childContainer.height - 225;
            this._nameBg.width = this._childNameText.width + 95;
            this._nameBg.x = this._childNameText.x + this._childNameText.width / 2 - this._nameBg.width / 2 - 20;
        }
        else {
            this._childNameText.x = this._nameBg.x + this._nameBg.width / 2 - this._childNameText.width / 2 + 3;
            this._childNameText.y = this._nameBg.y + 250 / 2 - this._childNameText.height / 2;
        }
        // this._childNameText.x = this._nameBg.x + this._nameBg.width/2 - this._childNameText.width/2 + 3;
        // this._childNameText.y = this._nameBg.y + 250/2 - this._childNameText.height/2;
        if (childInfoVo.sex == 1) {
            this._nameBg.texture = ResourceManager.getRes("childview_namebg1");
        }
        else {
            this._nameBg.texture = ResourceManager.getRes("childview_namebg2");
        }
        //刷新活力
        var vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
        var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
        var statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour + "/" + maxV;
        this._childVigourText.text = statelStr;
        // for (var index = 0; index < this._vigourPics.length; index++) {
        // 	if(index < vigour)
        // 	{
        // 		this._vigourPics[index].visible = true;
        // 	}
        // 	else{
        // 		this._vigourPics[index].visible = false;
        // 	}		
        // }
        if (vigour == 0) {
            this._vigouTimeText.visible = true;
            this._childVigourText.visible = false;
        }
        else {
            this._vigouTimeText.visible = false;
            this._childVigourText.visible = true;
        }
        // if (vigour == 0) {
        // 	this._vigouTimeText.visible = true;
        // 	this._vigourPic1.visible = false;
        // 	this._vigourPic2.visible = false;
        // }
        // else if (vigour == 1) {
        // 	this._vigourPic1.visible = true;
        // 	this._vigourPic2.visible = false;
        // 	this._vigouTimeText.visible = false;
        // } else {
        // 	this._vigourPic1.visible = true;
        // 	this._vigourPic2.visible = true;
        // 	this._vigouTimeText.visible = false;
        // }
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var levelStr = LanguageManager.getlocal("childExp") + childInfoVo.exp + "/" + childCfg.needExp[childInfoVo.level - 1];
        if (childInfoVo.level >= childCfg.lv) {
            levelStr = LanguageManager.getlocal("child_levelMax");
            this._vigouTimeText.visible = false;
        }
        this._curLevel = childInfoVo.level;
        this._levelTxt.text = levelStr;
        this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
        // this._levelTxt.x = this._progressBar.x + this._progressBar.width/2 - this._levelTxt.width/2;
        // this._levelTxt.y = this._progressBar.y + this._progressBar.height/2 - this._levelTxt.height/2;
        this._progressBar.setPercentage(childInfoVo.exp / childCfg.needExp[childInfoVo.level - 1]);
        for (var index = 0; index < this._childProCfg.length; index++) {
            var element = this._childProCfg[index];
            var proTxt = this._proTxtList[index];
            proTxt.text = element.txt;
        }
        //刷新按钮
        if ((childInfoVo.name == "" || vigour <= 0) && childInfoVo.level < childCfg.lv) {
            //起名
            var btnStr = "childAddVigour";
            if (childInfoVo.name == "") {
                btnStr = "childGiveName";
            }
            if (this._childUpdBtn) {
                this._childUpdBtn.visible = false;
            }
            if (this._childNameBtn) {
                this._childNameBtn.visible = true;
            }
            else {
                this._childNameBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, btnStr, this.nameBtnClickHandler, this);
                this._childNameBtn.x = 480;
                this._childNameBtn.y = 375;
                this._childNameBtn.setColor(TextFieldConst.COLOR_BLACK);
                this._childContainer.addChild(this._childNameBtn);
            }
            this._childNameBtn.setText(btnStr);
        }
        else {
            var btnStr = "childUpd";
            if (this._childInfoVo.level >= childCfg.lv) {
                //科举
                btnStr = "examination";
            }
            if (this._childNameBtn) {
                this._childNameBtn.visible = false;
            }
            if (this._childUpdBtn) {
                this._childUpdBtn.visible = true;
            }
            else {
                //培养按钮
                this._childUpdBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnStr, this.updBtnClickHandler, this);
                this._childUpdBtn.x = 480;
                this._childUpdBtn.y = 375;
                this._childUpdBtn.setColor(TextFieldConst.COLOR_BLACK);
                this._childContainer.addChild(this._childUpdBtn);
            }
            this._childUpdBtn.setText(btnStr);
            if (!this._mainTaskHandKey2 && (!Api.rookieVoApi.isInGuiding) && (!Api.rookieVoApi.isGuiding)) {
                var childCfg_2 = GameConfig.config.childCfg[childInfoVo.quality.toString()];
                this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(this._childContainer.parent, 530, 375, [this._childUpdBtn], 402, true, function () {
                    return this._childInfoVo.level < childCfg_2.lv;
                }, this);
            }
        }
        // if(Api.switchVoApi.checkOpenWifeStatus())
        // {
        // 	let goWifeStateBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeStatusGoto", this.goStatus, this);
        // 	goWifeStateBtn.x = 250;
        // 	goWifeStateBtn.y = GameConfig.stageHeigth - this.container.y - goWifeStateBtn.height - 8;
        // 	goWifeStateBtn.setColor(TextFieldConst.COLOR_BLACK);
        // 	this._childContainer.addChild(goWifeStateBtn);
        // }
        if (childInfoVo.id === this._mainTaskHandChoosedChild) {
            App.MainTaskHandUtil.showHandKey(this._mainTaskHandKey);
        }
        else {
            App.MainTaskHandUtil.hideHandKey(this._mainTaskHandKey);
        }
    };
    // 计算主线任务引导所选择的孩子
    ChildView.prototype.calcMainTaskHandChoosedChild = function () {
        this._mainTaskHandChoosedChild = null;
        for (var index = 0; index < this._childInfoVoList.length; index++) {
            var childVo = this._childInfoVoList[index];
            var childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
            if (childVo.level < childCfg.lv) {
                this._mainTaskHandChoosedChild = childVo.id;
                break;
            }
        }
    };
    ChildView.prototype.goStatus = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
        this.hide();
    };
    //刷新子嗣栏位下面的数据
    ChildView.prototype.refreshChildPos = function () {
        var childPosNum = Api.childVoApi.getChildPosNum();
        var childNum = Api.childVoApi.getChildNum();
        this._childItemText.text = LanguageManager.getlocal("childCurItemCount") + childNum + "/" + childPosNum;
        if (childPosNum < Config.ChildbaseCfg.needPos) {
            // this._childItemText.text = LanguageManager.getlocal("childCurItemCount") + childNum + "/" + Config.ChildbaseCfg.maxPos;
        }
        else {
            this._reachText.visible = false;
            // 1111111111
            // if (this._childNameBtn) {
            // 	this._childNameBtn.visible = false;
            // }
            var canUpdChildCount = Api.childVoApi.getChildrenCanUpdCount();
            var itemCount = Api.childVoApi.getChildrenVigourItemCount();
            if (canUpdChildCount > 0 || itemCount <= 0) {
                //需要一键恢复
                if (this._childAddAllBtn) {
                    this._childAddAllBtn.visible = false;
                }
                //一键培养
                if (this._childUpdAllBtn) {
                    this._childUpdAllBtn.visible = true;
                    if (this._checkBox) {
                        this._checkBox.visible = true;
                    }
                }
                else {
                    //培养按钮
                    this._childUpdAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "childUpdAll", this.updBtnAllClickHandler, this);
                    this._childUpdAllBtn.setPosition(20, GameConfig.stageHeigth - this.container.y - this._childUpdAllBtn.height - 8);
                    this._childUpdAllBtn.setColor(TextFieldConst.COLOR_BLACK);
                    this.addChildToContainer(this._childUpdAllBtn);
                    if (this._checkBox) {
                        this._checkBox.visible = true;
                    }
                }
            }
            else {
                //需要一键恢复
                if (this._childUpdAllBtn) {
                    this._childUpdAllBtn.visible = false;
                }
                if (this._childAddAllBtn) {
                    this._childAddAllBtn.visible = true;
                }
                else {
                    //恢复按钮
                    this._childAddAllBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "childAddVigourAll", this.addBtnAllClickHandler, this);
                    this._childAddAllBtn.setPosition(20, GameConfig.stageHeigth - this.container.y - this._childAddAllBtn.height - 8);
                    this._childAddAllBtn.setColor(TextFieldConst.COLOR_BLACK);
                    this.addChildToContainer(this._childAddAllBtn);
                }
            }
        }
        if (this._checkBox) {
            if (childPosNum < Config.ChildbaseCfg.needPos) {
                this._checkBox.x = this._reachText.x + this._reachText.width + 10;
                this._checkBox.y = this._reachText.y + (this._reachText.height - this._checkBox.height) / 2;
            }
            else {
                if (this._childUpdAllBtn) {
                    this._checkBox.x = this._childUpdAllBtn.x + this._childUpdAllBtn.width + 10;
                    this._checkBox.y = this._childUpdAllBtn.y + (this._childUpdAllBtn.height - this._checkBox.height) / 2;
                }
                if (this._childAddAllBtn) {
                    this._checkBox.x = this._childAddAllBtn.x + this._childAddAllBtn.width + 10;
                    this._checkBox.y = this._childAddAllBtn.y + (this._childAddAllBtn.height - this._checkBox.height) / 2;
                }
            }
        }
    };
    //一键培养
    ChildView.prototype.updBtnAllClickHandler = function () {
        var canUpdChildCount = Api.childVoApi.getChildrenCanUpdCount();
        if (canUpdChildCount <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("childNoUpdChild"));
            return;
        }
        this.request(NetRequestConst.REQUEST_CHILD_AUTOTRAIN, null);
    };
    //一键恢复
    ChildView.prototype.addBtnAllClickHandler = function () {
        // let childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
        // let levelStr = LanguageManager.getlocal("servant_infoLv") + this._childInfoVo.level + "/" + childCfg.lv
        // if (this._childInfoVo.level >= childCfg.lv) // 到达最高等级上限，提示：已达子嗣最高等级  
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("child_levelupTip1"));
        // 	return;
        // }
        //判断道具够不够
        var itemUseCount = Api.childVoApi.getChildrenVigourItemCount();
        var itemCount = Api.itemVoApi.getItemNumInfoVoById(Number(Config.ChildbaseCfg.needItem));
        // let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(Config.ChildbaseCfg.needItem));
        // let itemName = Config.ItemCfg.getItemNameById(Config.ChildbaseCfg.needItem)
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(Config.ChildbaseCfg.needItem));
        var message = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" + itemUseCount, LanguageManager.getlocal("childVigour")]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.useItemAllConfirmCallbackHandler, handler: this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: itemUseCount, msg: message, id: Number(Config.ChildbaseCfg.needItem) });
    };
    //恢复所有活力
    ChildView.prototype.useItemAllConfirmCallbackHandler = function () {
        this.request(NetRequestConst.REQUEST_CHILD_AUTORECOVER, null);
    };
    ChildView.prototype.changeNameHandler = function () {
        if (this._childInfoVo.name != "") {
            ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 2, childId: this._childInfoVo.id, confirmCallback: this.reNameCallBack, handler: this });
        }
    };
    ChildView.prototype.nameBtnClickHandler = function () {
        Api.rookieVoApi.checkNextStep();
        if (this._childInfoVo.name == "") {
            ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 1, childId: this._childInfoVo.id, confirmCallback: this.reNameCallBack, handler: this });
        }
        else {
            //起名字了就是补充体力了
            var vigour = Api.childVoApi.getChildrenVigourById(this._childInfoVo.id);
            // let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(Config.ChildbaseCfg.needItem));
            var itemCfg = Config.ItemCfg.getItemCfgById(Number(Config.ChildbaseCfg.needItem));
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(Number(Config.ChildbaseCfg.needItem));
            var message = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x1", LanguageManager.getlocal("childVigour")]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.useItemConfirmCallbackHandler, handler: this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: 1, msg: message, id: Number(Config.ChildbaseCfg.needItem) });
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
            this._mainTaskHandKey = null;
        }
    };
    //起名字回调
    ChildView.prototype.reNameCallBack = function () {
        this.refreshItem();
        this._childInfoVo = Api.childVoApi.getChildrenInfoVoById(this._childInfoVo.id);
        // this._childInfoVoList = Api.childVoApi.getChildrenVoList();
        // this._childInfoVoList = Api.childVoApi.updateChildreInfoVo(this._childInfoVoList);
        this.updChildAttData(this._childInfoVo);
        this.refreshChildPos();
    };
    //恢复活力
    ChildView.prototype.useItemConfirmCallbackHandler = function () {
        this.request(NetRequestConst.REQUEST_CHILD_RECOVER, { childId: this._childInfoVo.id });
    };
    ChildView.prototype.updBtnClickHandler = function () {
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        var childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
        var levelStr = LanguageManager.getlocal("servant_infoLv") + this._childInfoVo.level + "/" + childCfg.lv;
        if (this._childInfoVo.level >= childCfg.lv) {
            // if(!Api.switchVoApi.checkAudlt()){
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
            // 	return;
            // }
            // ViewController.getInstance().openView(ViewConst.BASE.CHILDUPDVIEW,this._childInfoVo.id);
            // ViewController.getInstance().openView(ViewConst.BASE.CHILDUPDVIEW,"c1");
            if (Api.adultVoApi.getAdultMarryNum() == 0 && Api.adultVoApi.getAdultNum() == 0) {
                Api.rookieVoApi.curGuideKey = "adult";
                Api.rookieVoApi.insertWaitingGuide({ "idx": "adult_1" }, true);
            }
            if (Api.switchVoApi.checkOpenWifeBattle()) {
                var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this._childInfoVo.motherId);
                ViewController.getInstance().openView(ViewConst.POPUP.CHILDEVENTVIEW, {
                    type: 1,
                    childname: this._childInfoVo.name,
                    mname: wifeInfoVo.name,
                    sex: this._childInfoVo.sex,
                    num: 0,
                    eventtype: 0,
                    callfunc: function (data) {
                        egret.callLater(function () {
                            _this.request(NetRequestConst.REQUEST_CHILD_EXAMINATION, { childId: _this._childInfoVo.id, eType: data });
                            _this._childId = _this._childInfoVo.id;
                        }, _this);
                    },
                    callobj: this
                });
            }
            else {
                this.request(NetRequestConst.REQUEST_CHILD_EXAMINATION, { childId: this._childInfoVo.id });
                this._childId = this._childInfoVo.id;
            }
            return;
        }
        if (this._isRequesting) {
            return;
        }
        if (!this._childUpdBtn.visible) {
            return;
        }
        var vigour = Api.childVoApi.getChildrenVigourById(this._childInfoVo.id);
        if (vigour <= 0) {
            return;
        }
        this._isRequesting = true;
        this.request(NetRequestConst.REQUEST_CHILD_TRAIN, { childId: this._childInfoVo.id });
    };
    //播放升级成功动画
    ChildView.prototype.showUpgradeEffect = function (isPro) {
        var _this = this;
        //左侧
        var servant_upgrade_word = BaseLoadBitmap.create("servant_upgrade_word");
        servant_upgrade_word.x = 220;
        servant_upgrade_word.y = 250;
        this._childContainer.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 170 }, 800).to({ alpha: 0 }, 100);
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = -30 + 106;
        upgradeClip.y = 80;
        this._childContainer.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        egret.setTimeout(function () {
            if (!_this._childInfoVo) {
                return;
            }
            _this.updChildAttData(_this._childInfoVo);
            _this._childContainer.removeChild(upgradeClip);
            upgradeClip = null;
            _this._childContainer.removeChild(servant_upgrade_word);
            servant_upgrade_word = null;
            //右侧  levelup_lizi
            // let servant_upgrade_box = BaseLoadBitmap.create("servant_upgrade_box")
            // servant_upgrade_box.setScale(2);
            // // servant_upgrade_box.x = 383;
            // // servant_upgrade_box.y = 125
            // // servant_upgrade_box.x = this._child_infobg.x;
            // // servant_upgrade_box.y = this._child_infobg.y + 10;
            // this._childContainer.addChild(servant_upgrade_box);
            // egret.Tween.get(servant_upgrade_box,{loop:false}).to({alpha:0},800);
            // let servant_upgrade_light = BaseLoadBitmap.create("servant_upgrade_light")
            // servant_upgrade_light.x = servant_upgrade_box.x;
            // servant_upgrade_light.y = 370
            // this._childContainer.addChild(servant_upgrade_light);
            // egret.Tween.get(servant_upgrade_light,{loop:false}).to({alpha:0,y:125},800);
            // let levelup_lizi = App.ParticleUtil.getParticle("levelup_lizi");
            // levelup_lizi.x = 485;
            // levelup_lizi.y = 250;
            // this._childContainer.addChild(levelup_lizi);
            // levelup_lizi.start();
            // egret.Tween.get(levelup_lizi,{loop:false}).to({alpha:1},900).to({alpha:0},300);
            // egret.setTimeout(()=> {
            // 	if (this._childContainer){
            // 		this._childContainer.removeChild(servant_upgrade_box);
            // 		this._childContainer.removeChild(servant_upgrade_light);
            // 		this._childContainer.removeChild(levelup_lizi);
            // 	}
            // },this, 1200);
        }, this, 500);
        // let lastValue:number=Math.max(0,Api.searchVoApi.getWifeValueById(this.getPersonId())-1);
        // let tmpValue=lastValue/itemCfg.value;
        // this._progressBar.setPercentage(tmpValue,lastValue+"/"+itemCfg.value);
        // if(isPro){
        // }
        // else{
        // }	
    };
    //播放进度条动画
    ChildView.prototype.playProAni = function () {
        var childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
        //刷新等级
        var value = this._childInfoVo.exp / childCfg.needExp[this._childInfoVo.level - 1];
        var aniTime = 0;
        var oldValue = this._progressBar.getPercent();
        if (value == 0) {
            value = 1;
        }
        //升级了
        if (value < oldValue) {
            aniTime = 1;
        }
        this._progressBar.tweenTo(value, 500, aniTime, function (prograssBar) {
            this.updChildAttData(this._childInfoVo);
            // prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
        }.bind(this, this._progressBar), this);
    };
    //请求回调
    ChildView.prototype.receiveData = function (data) {
        var _this = this;
        // if(this._childInfoVo){
        if (!data || !data.ret) {
            this._isRequesting = false;
            return;
        }
        var lastLevel;
        if (this._childInfoVo) {
            lastLevel = this._childInfoVo.level;
        }
        var oldList = this._childInfoVoList;
        // this._childInfoVoList = Api.childVoApi.getChildrenVoList();
        var infoList = Api.childVoApi.getChildrenVoList();
        if (infoList.length > 0) {
            this._childInfoVo = Api.childVoApi.getChildrenInfoVoById(this._childInfoVo.id);
        }
        // }
        if (data.data.data.lucky) {
            App.CommonUtil.showGodbless("child");
        }
        if (data.data.data.noVigourFlag) {
            ViewController.getInstance().openView(ViewConst.POPUP.GIVEREWARDSPOPUPVIEW, { rewards: data.data.data.noVigourFlag });
        }
        if (data.data.cmd == NetRequestConst.REQUEST_CHILD_TRAIN) {
            SoundManager.playEffect(SoundConst.EFFECT_UPD);
            this._isRequesting = false;
            // //功能解锁
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
            this.refreshItem();
            this.refreshChildPos();
            this.playProAni();
            var lv = this._curLevel;
            if (this._childInfoVo.level > lv) {
                this.showUpgradeEffect(true);
            }
            else {
                this.updChildAttData(this._childInfoVo);
            }
            if (this._checkBox && data.data.data.chanceArr) {
                if (this._checkBox.checkSelected()) {
                    for (var i in data.data.data.chanceArr) {
                        var unit = data.data.data.chanceArr[i];
                        var childid = i;
                        var childIndex = Api.childVoApi.getChildIndexVoById(childid, this._childInfoVoList);
                        var childScrollItem = this._scrollList.getItemByIndex(childIndex);
                        if (childScrollItem) {
                            childScrollItem.showEvent();
                        }
                    }
                }
                else {
                    for (var i in data.data.data.chanceArr) {
                        var unit = data.data.data.chanceArr[i];
                        for (var j in unit) {
                            var t_unit = unit[j];
                            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this._childInfoVo.motherId);
                            var childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
                            //刷新等级
                            var childState = this._childInfoVo.level / childCfg.lv;
                            this._childScrollItem.showEvent();
                            ViewController.getInstance().openView(ViewConst.POPUP.CHILDEVENTVIEW, {
                                type: childState >= 0.4 ? 2 : 4,
                                childname: this._childInfoVo.name,
                                mname: wifeInfoVo.name,
                                sex: this._childInfoVo.sex,
                                num: t_unit[1],
                                eventtype: t_unit[0],
                            });
                        }
                    }
                }
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_RECOVER) {
            this.updChildAttData(this._childInfoVo);
            this.refreshItem();
            this.refreshChildPos();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_EXAMINATION) {
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
            if (data.data.data.chanceArr) {
                var adultInfoVo = Api.adultVoApi.getAdultInfoVoById(String(this._childId));
                var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(adultInfoVo.motherId);
                var childname_1 = adultInfoVo.name;
                var childid_1 = this._childId;
                var mname_1 = wifeInfoVo.name;
                var sex_1 = adultInfoVo.sex;
                for (var i in data.data.data.chanceArr) {
                    var unit = data.data.data.chanceArr[i];
                    var _loop_1 = function (j) {
                        var t_unit = unit[j];
                        egret.Tween.get(this_1).wait(300).call(function () {
                            ViewController.getInstance().openView(ViewConst.POPUP.CHILDEVENTVIEW, {
                                type: 3,
                                childname: childname_1,
                                mname: mname_1,
                                sex: sex_1,
                                num: t_unit[1],
                                eventtype: t_unit[0],
                                callfunc: function () {
                                    ViewController.getInstance().openView(ViewConst.BASE.SPECIALCHILDUPGETVIEW, { id: childid_1, type: "ChildUp" });
                                },
                                callobj: _this,
                            });
                        }, this_1);
                    };
                    var this_1 = this;
                    for (var j in unit) {
                        _loop_1(j);
                    }
                }
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.SPECIALCHILDUPGETVIEW, { id: this._childId, type: "ChildUp" });
            }
            // 
            this._childInfoVo = Api.childVoApi.getChildrenVoList()[0];
            this._childInfoVoList = Api.childVoApi.getChildrenVoList();
            this.calcMainTaskHandChoosedChild();
            var childNum = Api.childVoApi.getChildPosNum() + 1;
            if (Api.childVoApi.getChildPosNum() >= Config.ChildbaseCfg.maxPos) {
                childNum = Api.childVoApi.getChildPosNum();
            }
            var childPosList = new Array();
            for (var index = 0; index < childNum; index++) {
                childPosList.push(index);
            }
            this._scrollList.refreshData(childPosList, { data: this._childInfoVoList });
            this.refreshChildPos();
            if (this._childInfoVo) {
                this.updChildAttData(this._childInfoVo);
            }
            else {
                this._childContainer.visible = false;
            }
            if (Api.childVoApi.getChildNum() > 0) {
                var childInfoVo = this._childInfoVoList[0];
                var id = childInfoVo.id;
                // this._childInfoVo = childInfoVo;
                // this.updChildAttData(childInfoVo);
                // let chidlIndex = Api.childVoApi.getChildIndexVoById(id);
                // this._childScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
                // this.playChildEffect(childInfoVo);
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_ADDPOSNUM) {
            var childNum = Api.childVoApi.getChildPosNum() + 1;
            if (Api.childVoApi.getChildPosNum() >= Config.ChildbaseCfg.maxPos) {
                childNum = Api.childVoApi.getChildPosNum();
            }
            var childPosList = new Array();
            for (var index = 0; index < childNum; index++) {
                childPosList.push(index);
            }
            this._scrollList.refreshData(childPosList, { data: this._childInfoVoList });
            var childPosNum = Api.childVoApi.getChildPosNum();
            var childNum2 = Api.childVoApi.getChildNum();
            this._childItemText.text = LanguageManager.getlocal("childCurItemCount") + childNum2 + "/" + childPosNum;
            this.refreshChildPos();
            App.CommonUtil.showTip(LanguageManager.getlocal("child_addPosTip"));
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_AUTOTRAIN || data.data.cmd == NetRequestConst.REQUEST_CHILD_AUTORECOVER) {
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
            var childNum = Api.childVoApi.getChildPosNum() + 1;
            if (Api.childVoApi.getChildPosNum() >= Config.ChildbaseCfg.maxPos) {
                childNum = Api.childVoApi.getChildPosNum();
            }
            // this._childInfoVoList = Api.childVoApi.getChildrenVoList();
            this._childInfoVo = Api.childVoApi.getChildrenInfoVoById(this._childInfoVo.id);
            var childPosList = new Array();
            for (var index = 0; index < childNum; index++) {
                childPosList.push(index);
            }
            // this.updChildAttData(this._childInfoVo);
            this._scrollList.refreshData(childPosList, { data: this._childInfoVoList });
            this.setSelect(this._childInfoVo.id);
            this.refreshChildPos();
            if (lastLevel && lastLevel != this._childInfoVo.level) {
                this.showUpgradeEffect();
            }
            else {
                this.updChildAttData(this._childInfoVo);
            }
            for (var index = 0; index < this._childInfoVoList.length; index++) {
                var listIndex = Api.childVoApi.getChildIndexVoById(this._childInfoVoList[index].id);
                var childScrollItem = this._scrollList.getItemByIndex(index);
                // this._tw = 
                if (this._childInfoVoList[index].lastLevel != this._childInfoVoList[index].level) {
                    var upBg = BaseBitmap.create("childview_levelup");
                    childScrollItem.addChild(upBg);
                    upBg.x = childScrollItem.width / 2 - upBg.width / 2;
                    upBg.y = childScrollItem.height / 2 - upBg.height / 2;
                    egret.Tween.get(upBg)
                        .to({ y: childScrollItem.height / 2 - upBg.height / 2 - 30 }, 700).call(function (upBg) {
                        BaseBitmap.release(upBg);
                        upBg = null;
                    }, this, [upBg]);
                }
                else if (this._childInfoVoList[index].lastExp != this._childInfoVoList[index].exp) {
                    var upBg = BaseBitmap.create("childview_expup");
                    childScrollItem.addChild(upBg);
                    upBg.x = childScrollItem.width / 2 - upBg.width / 2;
                    upBg.y = childScrollItem.height / 2 - upBg.height / 2;
                    egret.Tween.get(upBg)
                        .to({ y: childScrollItem.height / 2 - upBg.height / 2 - 30 }, 700).call(function (upBg) {
                        BaseBitmap.release(upBg);
                        upBg = null;
                    }, this, [upBg]);
                }
                // this._tw.to({y:this.height/2 - childScrollItem.height/2 - 100},1500).call(this.onComplete,this,);
            }
            if (this._checkBox && data.data.data.chanceArr) {
                if (this._checkBox.checkSelected()) {
                    for (var i in data.data.data.chanceArr) {
                        var unit = data.data.data.chanceArr[i];
                        var childid = i;
                        var childIndex = Api.childVoApi.getChildIndexVoById(childid, this._childInfoVoList);
                        var childScrollItem = this._scrollList.getItemByIndex(childIndex);
                        if (childScrollItem) {
                            childScrollItem.showEvent();
                        }
                    }
                }
                else {
                    var arr = [];
                    for (var i in data.data.data.chanceArr) {
                        var unit = data.data.data.chanceArr[i];
                        for (var j in unit) {
                            var t_unit = unit[j];
                            arr.push({
                                childid: i,
                                arr: t_unit
                            });
                        }
                    }
                    if (arr.length) {
                        this.showEvent(arr);
                    }
                }
            }
        }
    };
    ChildView.prototype.showEvent = function (arr) {
        var _this = this;
        if (arr.length) {
            var temp = arr[0].arr;
            var childid = arr[0].childid;
            var childIndex = Api.childVoApi.getChildIndexVoById(childid, this._childInfoVoList);
            var childScrollItem = this._scrollList.getItemByIndex(childIndex);
            if (childScrollItem) {
                childScrollItem.showEvent();
            }
            var cinfovo = Api.childVoApi.getChildrenInfoVoById(childid);
            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(cinfovo.motherId);
            var childCfg = GameConfig.config.childCfg[cinfovo.quality.toString()];
            //刷新等级
            var childState = cinfovo.level / childCfg.lv;
            ViewController.getInstance().openView(ViewConst.POPUP.CHILDEVENTVIEW, {
                type: childState >= 0.4 ? 2 : 4,
                childname: cinfovo.name,
                mname: wifeInfoVo.name,
                sex: cinfovo.sex,
                num: temp[1],
                eventtype: temp[0],
                callfunc: function () {
                    //
                    egret.Tween.get(_this).wait(300).call(function () {
                        arr.splice(0, 1);
                        _this.showEvent(arr);
                    }, _this);
                },
                callobj: this
            });
        }
        else {
        }
    };
    //刷新列表属性
    ChildView.prototype.refreshItem = function () {
        if (this._childInfoVo == null) {
            return;
        }
        var index = Api.childVoApi.getChildIndexVoById(this._childInfoVo.id, this._childInfoVoList);
        var childScrollItem = this._scrollList.getItemByIndex(index);
        childScrollItem.refreshData(index, this._childInfoVo.id);
    };
    ChildView.prototype.getProStringWithProId = function (id) {
        if (!this._childInfoVo) {
            return "";
        }
        if (id == 1) {
            // let childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
            // let levelStr = LanguageManager.getlocal("servant_infoLv") + this._childInfoVo.level + "/" + childCfg.lv
            return this._childInfoVo.level.toString();
        }
        if (id == 2) {
            return LanguageManager.getlocal("servant_infoAttr") + this._childInfoVo.attrVo.attTotal;
        }
        if (id == 3) {
            return this._childInfoVo.attrVo.forceTotal.toString();
        }
        if (id == 4) {
            return this._childInfoVo.attrVo.brainsTotal.toString();
        }
        if (id == 5) {
            return this._childInfoVo.attrVo.politicsTotal.toString();
        }
        if (id == 6) {
            return this._childInfoVo.attrVo.charmTotal.toString();
        }
        return "";
    };
    ChildView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "childview_bg", "childview_girlicon",
            "childview_boyicon", "childview_mask", "childview_pic_1", "childview_powar", "childview_power2",
            "progress3", "progress3_bg", "servant_probigbg", "childview_expup", "childview_levelup",
            "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "childview_addicon", "childview_bg1", "childview_bg2", "childview_bg3", "childview_itembg", "childview_namebg1", "childview_namebg2",
            "childview_newbg", "servant_attributemap", "servant_downbg", "servant_levebg2",
            "servant_attribute1",
            "servant_attribute2",
            "servant_attribute3",
            "servant_attribute4",
            "servant_attributemap",
            "guide_hand", "activity_rank_ask", "zqfdetail", "zqfdetail_down", "childeventtitle"
        ]);
    };
    ChildView.prototype.tick = function () {
        if (this._checkBox) {
            var key = "childeventRemind-" + Api.playerVoApi.getPlayerID();
            var storage = LocalStorageManager.get(key);
            if (!storage) {
                LocalStorageManager.set(key, "0");
            }
            LocalStorageManager.set(key, this._checkBox.checkSelected() ? "1" : "0");
        }
        if (Api.childVoApi.getChildNum() <= 0) {
            return;
        }
        var childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
        if (this._childInfoVo.level >= childCfg.lv) {
            return;
        }
        if (this._vigouTimeText == null) {
            return;
        }
        var vigour = Api.childVoApi.getChildrenVigourById(this._childInfoVo.id);
        //刷新活力
        var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
        // for (var index = 0; index < this._vigourPics.length; index++) {
        // 	if(index < vigour)
        // 	{
        // 		this._vigourPics[index].visible = true;
        // 	}
        // 	else{
        // 		this._vigourPics[index].visible = false;
        // 	}		
        // }
        if (vigour == 0) {
            var vigourTime = Api.childVoApi.getChildrenVigourTimeById(this._childInfoVo.id);
            this._vigouTimeText.text = App.DateUtil.getFormatBySecond(vigourTime, 1);
            this._vigouTimeText.visible = true;
        }
        else {
            this._vigouTimeText.visible = false;
        }
        // if (vigour == 0) {
        // 	let vigourTime = Api.childVoApi.getChildrenVigourTimeById(this._childInfoVo.id);
        // 	this._vigouTimeText.visible = true;
        // 	this._vigourPic1.visible = false;
        // 	this._vigourPic2.visible = false;
        // 	this._vigouTimeText.text = App.DateUtil.getFormatBySecond(vigourTime, 1);
        // }
        // else if (vigour == 1) {
        // 	this._vigourPic1.visible = true;
        // 	this._vigourPic2.visible = false;
        // 	this._vigouTimeText.visible = false;
        // } else {
        // 	this._vigourPic1.visible = true;
        // 	this._vigourPic2.visible = true;
        // 	this._vigouTimeText.visible = false;
        // }
    };
    ChildView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenWifeStatus()) {
            return "child_description2";
        }
        return "child_description";
    };
    ChildView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (Api.switchVoApi.checkOpenWifeStatus()) {
            params.push(LanguageManager.getlocal("child_descriptionPart1"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            params.push(LanguageManager.getlocal("child_descriptionPart2"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("child_descriptionSpell", params);
    };
    ChildView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        if (this._checkBox) {
            var key = "childeventRemind-" + Api.playerVoApi.getPlayerID();
            var storage = LocalStorageManager.get(key);
            if (!storage) {
                LocalStorageManager.set(key, "0");
            }
            LocalStorageManager.set(key, this._checkBox.checkSelected() ? "1" : "0");
        }
        // 滑动列表
        this._scrollList = null;
        this._childInfoVoList = null;
        this._motherText = null;
        this._intimacyText = null;
        // this._intimacyDescText = null;
        this._childWordsText = null;
        this._childNameText = null;
        this._child_Icon = null;
        this._childInfoVo = null;
        this._childUpdBtn = null;
        this._childNameBtn = null;
        this._childUpdAllBtn = null;
        this._childAddAllBtn = null;
        // this._nameBg = null;
        // this._attBg = null;
        // this._child_infobg = null;
        this._vigouTimeText = null;
        this._childItemText = null;
        this._childContainer = null;
        this._childId = null;
        this._levelTxt;
        this._childInfoObj = null;
        this._proTxtList = null;
        this._childProCfg = null;
        this._progressBar = null;
        this._curLevel = 0;
        this._childScrollItem = null;
        this._reachText = null;
        this._child_wordbg = null;
        this._child_wordbgCor = null;
        this._nameBg = null;
        this._childVigourText = null;
        // this._vigourPics = null
        if (this._childNameText) {
            this._childNameText.removeTouchTap();
        }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
        this._mainTaskHandKey2 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey3);
        this._mainTaskHandKey3 = null;
        this._proAddTxt = null;
        this._checkBox = null;
        this._isRequesting = false;
        _super.prototype.dispose.call(this);
    };
    return ChildView;
}(CommonView));
__reflect(ChildView.prototype, "ChildView");
//# sourceMappingURL=ChildView.js.map