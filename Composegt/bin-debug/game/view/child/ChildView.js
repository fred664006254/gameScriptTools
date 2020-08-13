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
        return _this;
    }
    ChildView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.checkShowGuide();
        // let topBg = BaseBitmap.create("public_bg6");
        // topBg.y = -21;
        // this.addChildToContainer(topBg);
        //孩子背景
        var childBg = BaseLoadBitmap.create("childview_newbg");
        childBg.width = 640;
        childBg.height = 440;
        childBg.x = 0; //this.viewBg.width/2 - childBg.width/2;
        childBg.y = -15;
        this.addChildToContainer(childBg);
        var cBgH = 330; //340;
        //描述背景
        var titleBg = BaseBitmap.create("public_9v_bg10");
        titleBg.width = GameConfig.stageWidth;
        titleBg.height = 50;
        titleBg.y = -21;
        this.addChildToContainer(titleBg);
        //进度条背景
        var barBg = BaseBitmap.create("public_balckbg");
        barBg.width = 640;
        // barBg.height = 
        barBg.x = 0;
        barBg.y = childBg.y + cBgH;
        this.addChildToContainer(barBg);
        if (Api.childVoApi.getChildNum() > 0) {
            //孩子属性容器
            this._childContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._childContainer);
            this._child_wordbg = BaseBitmap.create("childview_talkbg");
            this._child_wordbg.skewY = 180;
            this._child_wordbg.visible = false;
            this._child_wordbg.width = 200;
            this._child_wordbg.height = 78;
            this._child_wordbg.x = 430 + this._child_wordbg.width;
            this._child_wordbg.y = 40;
            this._childContainer.addChild(this._child_wordbg);
            // this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
            // this._child_wordbgCor.x = 480;
            // this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
            // this._childContainer.addChild(this._child_wordbgCor);
            this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            this._childWordsText.text = LanguageManager.getlocal("childIntimacyDesc");
            this._childWordsText.x = this._child_wordbg.x + 20 - this._child_wordbg.width;
            this._childWordsText.y = this._child_wordbg.y + 20;
            this._childWordsText.width = 160;
            this._childWordsText.height = 80;
            this._childContainer.addChild(this._childWordsText);
            this._child_Icon = BaseLoadBitmap.create("");
            this._child_Icon.x = 120;
            this._child_Icon.y = childBg.y + cBgH - 289;
            this._childContainer.addChild(this._child_Icon);
            //等级蓝色背景图
            var servant_levebg = BaseBitmap.create("childview_lvbg");
            servant_levebg.x = 25;
            servant_levebg.y = barBg.y - 3;
            this._childContainer.addChild(servant_levebg);
            //红色属性背景条  
            var servant_attributemap = BaseBitmap.create("playerview_canvas01");
            servant_attributemap.x = GameConfig.stageWidth / 2 - servant_attributemap.width / 2;
            servant_attributemap.y = 270;
            this._childContainer.addChild(servant_attributemap);
            //活力
            this._childVigourText = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_INPUT);
            this._childVigourText.text = LanguageManager.getlocal("childVigour");
            this._childVigourText.x = 500;
            this._childVigourText.y = barBg.y + 25 - this._childVigourText.height / 2;
            this._childContainer.addChild(this._childVigourText);
            this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 360);
            this._progressBar.x = 110;
            this._progressBar.y = barBg.y + 75;
            this._childContainer.addChild(this._progressBar);
            var level = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv"), 28, TextFieldConst.COLOR_WHITE);
            level.x = servant_levebg.x + servant_levebg.width / 2 - level.width / 2;
            level.y = servant_levebg.y + 10;
            this._childContainer.addChild(level);
            this._levelTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            this._levelTxt.text = LanguageManager.getlocal("servant_infoLv");
            this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
            this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2;
            this._childContainer.addChild(this._levelTxt);
            // let maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
            this._vigouTimeText = ComponentManager.getTextField("00:00:00", 22, TextFieldConst.COLOR_INPUT);
            this._vigouTimeText.x = 510;
            this._vigouTimeText.y = barBg.y + 25 - this._vigouTimeText.height / 2;
            this._childContainer.addChild(this._vigouTimeText);
            //子嗣
            this._proTxtList = [];
            this._childInfoVo = Api.childVoApi.getChildrenVoList()[0];
            this._childInfoVoList = Api.childVoApi.getChildrenVoList();
            // 找到主线任务时要引导的child
            this.calcMainTaskHandChoosedChild();
            // let childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
            var mSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            if (PlatformManager.checkIsViSp()) {
                mSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
            }
            this._motherText = ComponentManager.getTextField("", mSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
            this._motherText.x = 5;
            this._motherText.y = -4;
            this._childContainer.addChild(this._motherText);
            this._intimacyText = ComponentManager.getTextField("", mSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
            this._intimacyText.x = 200;
            this._intimacyText.y = this._motherText.y;
            this._childContainer.addChild(this._intimacyText);
            if (Api.switchVoApi.checkOpenWifeBattle()) {
                this._artistryText = ComponentManager.getTextField("", mSize);
                this._artistryText.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                this._artistryText.x = 300;
                this._artistryText.y = this._motherText.y;
                this.addChildToContainer(this._artistryText);
            }
            if (Api.switchVoApi.checkOpenWifeStatus()) {
                var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
                var starEffect = Config.WifestatusbaseCfg.starEffect;
                // let addstr = LanguageManager.getlocal("wifeStatusChildAdd",[String(wifestatusVo.star*starEffect)]);
                var addstr = LanguageManager.getlocal("wifeStatusProAdd2", [String((wifestatusVo.star * starEffect).toFixed(1))]);
                this._childAddText = ComponentManager.getTextField(addstr, mSize, TextFieldConst.COLOR_LIGHT_YELLOW);
                // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
                this._childAddText.x = this.width - this._childAddText.width - 10;
                this._childAddText.y = this._motherText.y;
                this._childContainer.addChild(this._childAddText);
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
                this._nameBg.x = this._childContainer.width / 2 - this._nameBg.width / 2;
                this._nameBg.y = this._childContainer.height - 200;
                this._childNameText.x = this._nameBg.x + (this._nameBg.width + 10) / 2 - this._childNameText.width / 2;
                this._childNameText.y = this._nameBg.y + this._nameBg.height / 2 - this._childNameText.height / 2;
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
            // let lvText =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            // lvText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            // lvText.text = LanguageManager.getlocal("servant_infoLv");
            // lvText.x =22;
            // lvText.y = servant_levebg.y + 5;
            // this._childContainer.addChild( lvText);
            for (var i = 0; i < 4; i++) {
                var attribute = BaseBitmap.create("servant_attribute" + (i + 1));
                var num = i % 2;
                attribute.x = 110 + num * 180;
                attribute.y = 325 + 32 * Math.floor(i / 2) - 5;
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
                    proTxt.x = 25;
                    proTxt.y = 355;
                    proTxt.width = 80;
                    proTxt.textAlign = "center";
                    proTxt.size = 36;
                    if (PlatformManager.checkIsViSp()) {
                        proTxt.size = 30;
                    }
                    // proTxt.textColor =TextFieldConst.COLOR_LIGHT_YELLOW;
                    proTxt.textColor = TextFieldConst.COLOR_WHITE;
                }
                //属性
                if (element.txtId == 2) {
                    // proTxt.visible =false;
                    proTxt.x = 230;
                    proTxt.y = 278;
                    proTxt.width = 190;
                    proTxt.size = 26;
                    proTxt.textAlign = "center";
                    proTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
                }
                var fntSize = 24;
                var offY = -5;
                if (PlatformManager.checkIsViSp()) {
                    fntSize = 18;
                    offY = 2 - 5;
                }
                //属性武力	
                if (element.txtId == 3) {
                    proTxt.x = 180;
                    proTxt.y = 328 + offY;
                    proTxt.size = fntSize;
                    proTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
                }
                //属性智力
                if (element.txtId == 4) {
                    proTxt.x = 360;
                    proTxt.y = 328 + offY;
                    proTxt.size = fntSize;
                    proTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
                }
                //属性政治
                if (element.txtId == 5) {
                    proTxt.x = 180;
                    proTxt.y = 362 + offY;
                    proTxt.size = fntSize;
                    proTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
                }
                //属性魅力
                if (element.txtId == 6) {
                    proTxt.x = 360;
                    proTxt.y = 362 + offY;
                    proTxt.size = fntSize;
                    proTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
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
        // let childItemBg: BaseBitmap = BaseBitmap.create("wifeview_xinxibanbg");
        // childItemBg.width = GameConfig.stageWidth;
        // childItemBg.height = GameConfig.stageHeigth - this.container.y - cBgH - barBg.height + 30;
        // // childItemBg.height = 300 ;
        // childItemBg.x = 0;
        // childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height ;
        // // childItemBg.y = -15;
        // this.addChildToContainer(childItemBg);
        var bottomBg = BaseBitmap.create("commonview_woodbg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y - cBgH - barBg.height + 30;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var bottomFoot = BaseBitmap.create("childview_bottombg");
        bottomFoot.width = GameConfig.stageWidth;
        bottomFoot.height = 120;
        bottomFoot.y = bottomBg.y + bottomBg.height - bottomFoot.height;
        this.addChildToContainer(bottomFoot);
        //拼接 tab下背景
        var bottomBorder = BaseBitmap.create("commonview_border1");
        bottomBorder.width = GameConfig.stageWidth;
        bottomBorder.height = bottomBg.height;
        bottomBorder.x = 0;
        bottomBorder.y = bottomBg.y;
        // this.addChildToContainer(bottomBorder);
        this.addChildToContainer(bottomBorder);
        var bottomTop = BaseBitmap.create("commonview_border2");
        bottomTop.width = GameConfig.stageWidth;
        bottomTop.scaleY = -1;
        bottomTop.x = 0;
        bottomTop.y = bottomBorder.y + 25;
        // this.addChildToContainer(bottomTop);
        this.addChildToContainer(bottomTop);
        var bottomB = BaseBitmap.create("commonview_bottom");
        bottomB.width = GameConfig.stageWidth;
        bottomB.x = 0;
        bottomB.y = bottomBg.y + bottomBg.height - bottomB.height; //GameConfig.stageHeigth - bottomB.height;//bottomBorder.y + bottomBorder.height - bottomB.height;
        // this.addChildToContainer(bottomB);
        this.addChildToContainer(bottomB);
        // let innerbg = BaseBitmap.create("public_9v_bg09");
        // innerbg.width = 606
        // // innerbg.height = 364+promoDeltaH;
        // innerbg.height = bottomBg.height - 140;
        // innerbg.x = bottomBg.width/2 - innerbg.width/2;
        // innerbg.y = bottomBg.y +26;
        // this.addChildToContainer(innerbg);
        // let innerDitu = BaseBitmap.create("public_listshotbg");
        // innerDitu.width = innerbg.width - 10
        // // innerDitu.height = 364+promoDeltaH;
        // innerDitu.height = innerbg.height - 50;
        // innerDitu.x = innerbg.x + 5;
        // innerDitu.y = innerbg.y + 25;
        // this.addChildToContainer(innerDitu);
        // let innerTopBg = BaseBitmap.create("public_down");
        // innerTopBg.skewX = 180;
        // innerTopBg.x = bottomBg.width/2 - innerTopBg.width/2;
        // innerTopBg.y = bottomBg.y + 29.5 + innerTopBg.height;
        // this.addChildToContainer(innerTopBg);
        // let innerDownBg = BaseBitmap.create("public_down");
        // innerDownBg.x = bottomBg.width/2 - innerDownBg.width/2;
        // innerDownBg.y = innerbg.y + innerbg.height - innerDownBg.height-3;
        // this.addChildToContainer(innerDownBg);
        //一键培养
        this._reachText = ComponentManager.getTextField(LanguageManager.getlocal("childUnlockDesc", [egret.toColorString(TextFieldConst.COLOR_INPUT), "5", egret.toColorString(TextFieldConst.COLOR_QUALITY_GREEN)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_INPUT);
        this._reachText.setPosition(GameConfig.stageWidth - 30 - this._reachText.width, GameConfig.stageHeigth - this.container.y - this._reachText.height - 63);
        this.addChildToContainer(this._reachText);
        this._childItemText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_INPUT);
        // this._childNameText.addEventListener()
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeNameHandler, this._childNameText); 
        this._childItemText.setPosition(45, GameConfig.stageHeigth - this.container.y - this._reachText.height - 63);
        this.addChildToContainer(this._childItemText);
        // let officeBg = BaseBitmap.create("public_biaoti");
        // officeBg.x = GameConfig.stageWidth/2-officeBg.width/2 - 10;
        // officeBg.y = innerTopBg.y + innerTopBg.height/2 - officeBg.height/2 ;
        // this.addChildToContainer(officeBg);
        //初始化孩子席位
        var childNum = Api.childVoApi.getChildPosNum() + 1;
        if (Api.childVoApi.getChildPosNum() >= Config.ChildbaseCfg.maxPos) {
            childNum = Api.childVoApi.getChildPosNum();
        }
        var childPosList = new Array();
        for (var index = 0; index < childNum; index++) {
            childPosList.push(index);
        }
        var rect = new egret.Rectangle();
        rect.setTo(0, 0, 610, bottomBg.height - 140);
        this._scrollList = ComponentManager.getScrollList(ChildScrollItem, childPosList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this._scrollList.y = bottomBg.y + 20;
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        if (this._childContainer) {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._childContainer.parent, 500, 375, null, 110, true, function () {
                return true;
            }, this);
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
        var childIndex = Api.childVoApi.getChildIndexVoById(childId);
        if (this._childScrollItem) {
            if (this._childScrollItem.getChildByName("select")) {
                this._childScrollItem.removeChild(this._childScrollItem.getChildByName("select"));
                var baseBitmap = this._childScrollItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._childScrollItem = this._scrollList.getItemByIndex(childIndex);
        var bg2Index = this._childScrollItem.getChildIndex(this._childScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("public_9_bg29");
        itemBg2.width = 302 + 10;
        itemBg2.height = 112 + 10;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = -5;
        itemBg2.y = -5;
        itemBg2.name = "select";
        this._childScrollItem.addChildAt(itemBg2, 10);
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
            // this._child_wordbgCor.visible = false;
            this._childWordsText.visible = false;
        }
        else {
            this._childWordsText.text = Api.childVoApi.getChildWord(childInfoVo.id);
            this._child_wordbg.visible = true;
            // this._child_wordbgCor.visible = true;
            this._childWordsText.visible = true;
        }
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childInfoVo.motherId);
        this._motherText.text = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        this._intimacyText.text = LanguageManager.getlocal("childIntimacy", [wifeInfoVo.intimacy.toString()]);
        var aaa = 30;
        if (PlatformManager.checkIsViSp()) {
            aaa = 10;
        }
        this._intimacyText.x = this._motherText.x + this._motherText.width + aaa;
        if (this._artistryText) {
            var artistryValue = LanguageManager.getlocal("wifeArtistry") + " " + wifeInfoVo.artistry;
            this._artistryText.text = artistryValue;
            this._artistryText.x = this._intimacyText.x + this._intimacyText.width + aaa;
        }
        if (this._childAddText) {
            if (this._artistryText) {
                this._childAddText.x = this._artistryText.x + this._artistryText.width + aaa;
            }
            else {
                this._childAddText.x = this._intimacyText.x + this._intimacyText.width + aaa;
            }
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
            // this._childNameText.x = this._childContainer.width/2 -this._childNameText.width/2;
            // this._childNameText.y = this._childContainer.height - 225;
            // this._nameBg.width = this._childNameText.width + 95;
            // this._nameBg.x = this._childContainer.width/2 - this._nameBg.width/2 - 22;
            this._childNameText.x = this._nameBg.x + (this._nameBg.width + 10) / 2 - this._childNameText.width / 2;
            this._childNameText.y = this._nameBg.y + this._nameBg.height / 2 - this._childNameText.height / 2;
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
                this._childNameBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, btnStr, this.nameBtnClickHandler, this);
                this._childNameBtn.x = 480;
                this._childNameBtn.y = 365;
                // this._childNameBtn.setColor(TextFieldConst.COLOR_BLACK);
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
                this._childUpdBtn.y = 365;
                // this._childUpdBtn.setColor(TextFieldConst.COLOR_BLACK);
                this._childContainer.addChild(this._childUpdBtn);
            }
            this._childUpdBtn.setText(btnStr);
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
                }
                else {
                    //培养按钮
                    this._childUpdAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "childUpdAll", this.updBtnAllClickHandler, this);
                    this._childUpdAllBtn.setPosition(GameConfig.stageWidth - 30 - this._childUpdAllBtn.width, GameConfig.stageHeigth - this.container.y - this._childUpdAllBtn.height - 44);
                    // this._childUpdAllBtn.setColor(TextFieldConst.COLOR_BLACK);
                    this.addChildToContainer(this._childUpdAllBtn);
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
                    this._childAddAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_ORANGE, "childAddVigourAll", this.addBtnAllClickHandler, this);
                    this._childAddAllBtn.setPosition(GameConfig.stageWidth - 30 - this._childAddAllBtn.width, GameConfig.stageHeigth - this.container.y - this._childAddAllBtn.height - 47);
                    // this._childAddAllBtn.setColor(TextFieldConst.COLOR_BLACK);
                    this.addChildToContainer(this._childAddAllBtn);
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
        PlatformManager.analytics37Point("custom_active", "train_fosterson", 1);
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
        this._childInfoVoList = Api.childVoApi.getChildrenVoList();
        this.updChildAttData(this._childInfoVo);
        this.refreshChildPos();
    };
    //恢复活力
    ChildView.prototype.useItemConfirmCallbackHandler = function () {
        this.request(NetRequestConst.REQUEST_CHILD_RECOVER, { childId: this._childInfoVo.id });
    };
    ChildView.prototype.updBtnClickHandler = function () {
        var childCfg = GameConfig.config.childCfg[this._childInfoVo.quality.toString()];
        var levelStr = LanguageManager.getlocal("servant_infoLv") + this._childInfoVo.level + "/" + childCfg.lv;
        if (this._childInfoVo.level >= childCfg.lv) {
            // if(!Api.switchVoApi.checkAudlt()){
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
            // 	return;
            // }
            // ViewController.getInstance().openView(ViewConst.BASE.CHILDUPDVIEW,this._childInfoVo.id);
            // ViewController.getInstance().openView(ViewConst.BASE.CHILDUPDVIEW,"c1");
            this.request(NetRequestConst.REQUEST_CHILD_EXAMINATION, { childId: this._childInfoVo.id });
            this._childId = this._childInfoVo.id;
            return;
        }
        PlatformManager.analytics37Point("custom_active", "train_fosterson", 1);
        this.request(NetRequestConst.REQUEST_CHILD_TRAIN, { childId: this._childInfoVo.id });
    };
    //播放升级成功动画
    ChildView.prototype.showUpgradeEffect = function (isPro) {
        var _this = this;
        //左侧
        var servant_upgrade_word = BaseLoadBitmap.create("servant_upgrade_word");
        servant_upgrade_word.x = 240;
        servant_upgrade_word.y = 270;
        this._childContainer.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 220 }, 800).to({ alpha: 0 }, 100);
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 8, 100);
        upgradeClip.setScale(1.25);
        upgradeClip.x = 140;
        upgradeClip.y = 0;
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
        // if(this._childInfoVo){
        var lastLevel;
        if (this._childInfoVo) {
            lastLevel = this._childInfoVo.level;
        }
        var oldList = this._childInfoVoList;
        this._childInfoVoList = Api.childVoApi.getChildrenVoList();
        if (this._childInfoVoList.length > 0) {
            this._childInfoVo = Api.childVoApi.getChildrenInfoVoById(this._childInfoVo.id);
        }
        // }
        if (data.data.data.lucky) {
            App.CommonUtil.showGodbless("child");
        }
        if (data.data.cmd == NetRequestConst.REQUEST_CHILD_TRAIN) {
            SoundManager.playEffect(SoundConst.EFFECT_UPD);
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
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_RECOVER) {
            this.updChildAttData(this._childInfoVo);
            this.refreshItem();
            this.refreshChildPos();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_EXAMINATION) {
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
            ViewController.getInstance().openView(ViewConst.BASE.CHILDUPDVIEW, this._childId);
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
            this._scrollList.refreshData(childPosList);
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
            this._scrollList.refreshData(childPosList);
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
            this._childInfoVoList = Api.childVoApi.getChildrenVoList();
            this._childInfoVo = Api.childVoApi.getChildrenInfoVoById(this._childInfoVo.id);
            var childPosList = new Array();
            for (var index = 0; index < childNum; index++) {
                childPosList.push(index);
            }
            // this.updChildAttData(this._childInfoVo);
            this._scrollList.refreshData(childPosList);
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
        }
    };
    //刷新列表属性
    ChildView.prototype.refreshItem = function () {
        if (this._childInfoVo == null) {
            return;
        }
        var index = Api.childVoApi.getChildIndexVoById(this._childInfoVo.id);
        var childScrollItem = this._scrollList.getItemByIndex(index);
        childScrollItem.refreshData(index);
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
            "childview_boyicon", "childview_pic_1", "childview_powar", "childview_power2",
            "progress_type1_yellow", "progress_type1_bg", "childview_expup", "childview_levelup",
            // "servant_upgrade_frame",
            "levelup_lizi", "levelup_lizi_json",
            "childview_addicon", "childview_bg", "childview_namebg1", "childview_namebg2",
            "servant_attributemap",
            "servant_attribute1",
            "servant_attribute2",
            "servant_attribute3",
            "servant_attribute4",
            "wifeview_xinxibanbg", "servant_levebg",
            "guide_hand",
            "playerview_canvas01",
            "childview_bg1",
            "childview_bg2",
            "childview_bg3",
            "childview_bg4",
            "childview_bottombg",
            "childview_lvbg",
            "childview_talkbg",
            "childview_talkmark",
            "progress_type3_bg",
            "progress_type1_yellow2",
            "commonview_border1",
            "commonview_bottom",
            "commonview_border2",
            "commonview_woodbg",
            "childview_mask"
        ]);
    };
    ChildView.prototype.tick = function () {
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
    ChildView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
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
        this._artistryText = null;
        this._childAddText = null;
        this._child_wordbg = null;
        // this._child_wordbgCor = null;
        this._nameBg = null;
        this._childVigourText = null;
        // this._vigourPics = null
        if (this._childNameText) {
            this._childNameText.removeTouchTap();
        }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ChildView;
}(CommonView));
__reflect(ChildView.prototype, "ChildView");
