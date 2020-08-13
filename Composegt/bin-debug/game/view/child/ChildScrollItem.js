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
 * 子嗣栏位
 * author dky
 * date 2017/10/12
 * @class ChildScrollItem
 */
var ChildScrollItem = (function (_super) {
    __extends(ChildScrollItem, _super);
    function ChildScrollItem() {
        return _super.call(this) || this;
    }
    ChildScrollItem.prototype.initItem = function (index, posIndex) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this);
        this.width = 302;
        this.height = 112;
        var childVoList = Api.childVoApi.getChildrenVoList();
        var childPosNum = Api.childVoApi.getChildPosNum();
        //1孩子 2空闲 3扩展
        var itemType = 1;
        if (posIndex + 1 <= childVoList.length) {
            itemType = 1;
        }
        else if (posIndex + 1 > childVoList.length && posIndex + 1 <= childPosNum) {
            itemType = 2;
        }
        else {
            itemType = 3;
        }
        // let itemBg0:BaseBitmap = BaseBitmap.create("public_listbg2");
        // itemBg0.width = 290;
        // itemBg0.height = 117;
        // itemBg0.x =  290/2 - itemBg0.width/2;
        // itemBg0.y = 117/2 - itemBg0.height/2;
        // this.addChild(itemBg0);
        if (itemType == 1) {
            var childInfoVo = childVoList[posIndex];
            if (childInfoVo.sex == 2) {
                this._itemBg = BaseBitmap.create("childview_bg2");
            }
            else {
                this._itemBg = BaseBitmap.create("childview_bg1");
            }
            this._itemBg.width = this.width;
            this._itemBg.height = this.height;
            this._itemBg.x = this.width / 2 - this._itemBg.width / 2;
            this._itemBg.y = this.height / 2 - this._itemBg.height / 2;
            this._itemBg.name = "bg1";
            this.addChild(this._itemBg);
            // let itemBg2:BaseBitmap = BaseBitmap.create("childview_bg");
            // // itemBg2.width = this.width-80;
            // // itemBg2.height = this.height-25;
            // itemBg2.x =  2;
            // itemBg2.y = 2;
            // itemBg2.name = "bg2";
            // this.addChild(itemBg2);
            this._child_Icon = BaseLoadBitmap.create(Api.childVoApi.getChildPic(childInfoVo.id));
            this._child_Icon.x = -20;
            this._child_Icon.y = 10;
            this._child_Icon.setScale(0.4);
            this.addChild(this._child_Icon);
            var mask = BaseBitmap.create("childview_mask");
            mask.x = 9;
            mask.y = 9;
            this.addChild(mask);
            this._child_Icon.mask = mask;
            // this._child_Icon.setload( Api.childVoApi.getChildPic(childInfoVo.id));
            var childName = childInfoVo.name;
            var nameColor = TextFieldConst.COLOR_BROWN_NEW;
            if (childName == "") {
                childName = LanguageManager.getlocal("childNeedName");
                nameColor = TextFieldConst.COLOR_BROWN_NEW;
            }
            else {
                if (childInfoVo.sex == 2) {
                    nameColor = TextFieldConst.COLOR_QUALITY_RED_NEW;
                }
                else {
                    nameColor = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
                }
            }
            var fntSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
            this._nameTF = ComponentManager.getTextField(childName, fntSize, nameColor);
            // this._nameTF.textColor = nameColor;
            this._nameTF.x = 110;
            this._nameTF.y = 18;
            this.addChild(this._nameTF);
            // let sexStr = LanguageManager.getlocal("child_sex",[LanguageManager.getlocal("child_boy")]);
            // if(childInfoVo.sex == 2){
            // 	sexStr = LanguageManager.getlocal("child_sex",[LanguageManager.getlocal("child_girl")]);
            // }
            // let sexTF = ComponentManager.getTextField( sexStr,fntSize,TextFieldConst.COLOR_BROWN);
            // sexTF.x = this._nameTF.x ;
            // if(PlatformManager.checkIsViSp()){
            // 	sexTF.y = this._nameTF.y + this._nameTF.height + 8;
            // } else {
            // 	sexTF.y = this._nameTF.y + this._nameTF.height + 5;
            // }
            // this.addChild(sexTF);
            var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
            var levelStr = LanguageManager.getlocal("servant_infoLv") + "：" + +childInfoVo.level + "/" + childCfg.lv;
            this._levelTF = ComponentManager.getTextField(levelStr, fntSize, TextFieldConst.COLOR_BROWN_NEW);
            // this._levelTF.textColor = nameColor;
            this._levelTF.x = this._nameTF.x;
            this._levelTF.y = this._nameTF.y + this._nameTF.height + 10;
            this.addChild(this._levelTF);
            var vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
            var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
            var statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour + "/" + maxV;
            if (childInfoVo.level >= childCfg.lv) {
                statelStr = LanguageManager.getlocal("childWaitGrowup");
            }
            this._stateTF = ComponentManager.getTextField(statelStr, fntSize, TextFieldConst.COLOR_BROWN_NEW);
            // this._stateTF.textColor = nameColor;
            this._stateTF.x = this._nameTF.x;
            this._stateTF.y = this._levelTF.y + this._levelTF.height + 3;
            this.addChild(this._stateTF);
        }
        else if (itemType == 2) {
            // this._itemBg = BaseBitmap.create("public_listbg2");
            // this._itemBg.width = this.width;
            // this._itemBg.height = this.height;
            // this._itemBg.x =  this.width/2 - this._itemBg.width/2;
            // this._itemBg.y = this.height/2 - this._itemBg.height/2;
            // this.addChild(this._itemBg);
            // let itemBg2:BaseBitmap = BaseBitmap.create("childview_bg2");
            // // itemBg2.width = this.width-80;
            // // itemBg2.height = this.height-25;
            // itemBg2.x =  2;
            // itemBg2.y = 2;
            // itemBg2.name = "bg2";
            // this.addChild(itemBg2);
            // let itemBg2:BaseBitmap = BaseBitmap.create("public_9_bg26");
            // itemBg2.width = this.width-80;
            // itemBg2.height = this.height-25;
            // itemBg2.x =  this.width/2 - itemBg2.width/2 + 20;
            // itemBg2.y = this.height/2 - itemBg2.height/2;
            // this.addChild(itemBg2);
            this._itemBg = BaseBitmap.create("childview_bg3");
            this._itemBg.width = this.width;
            this._itemBg.height = this.height;
            this._itemBg.x = this.width / 2 - this._itemBg.width / 2;
            this._itemBg.y = this.height / 2 - this._itemBg.height / 2;
            this._itemBg.name = "bg1";
            this.addChild(this._itemBg);
            var idleTfSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
            if (PlatformManager.checkIsViSp()) {
                idleTfSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            }
            var idleTf = ComponentManager.getTextField(LanguageManager.getlocal("childItemPosIdle"), idleTfSize, TextFieldConst.COLOR_BROWN);
            idleTf.x = 190;
            if (PlatformManager.checkIsViSp()) {
                idleTf.x = 165;
            }
            idleTf.y = this.height / 2 - idleTf.height / 2 + 20;
            this.addChild(idleTf);
        }
        else {
            this._itemBg = BaseBitmap.create("childview_bg4");
            this._itemBg.width = this.width;
            this._itemBg.height = this.height;
            this._itemBg.x = this.width / 2 - this._itemBg.width / 2;
            this._itemBg.y = this.height / 2 - this._itemBg.height / 2;
            this.addChild(this._itemBg);
            // let extendTf  = ComponentManager.getTextField(LanguageManager.getlocal("childExtendItem"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // extendTf.x = this.width/2;
            // extendTf.y = this.height/2;
            // extendTf.anchorOffsetX = extendTf.width/2;
            // extendTf.anchorOffsetY = extendTf.height/2;
            // this.addChild(extendTf);
            var addIcon = BaseBitmap.create("childview_addicon");
            addIcon.x = this.width / 2 - addIcon.width / 2;
            addIcon.y = this.height / 2 - addIcon.height / 2;
            this.addChild(addIcon);
            // egret.Tween.get(addIcon, {
            // 	loop: true,//设置循环播放
            // }).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);
            this._itemBg.addTouch(this.eventHandler, this, null);
        }
    };
    ChildScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
        }
    };
    ChildScrollItem.prototype.refreshData = function (index) {
        this._childIndex = index;
        var childVoList = Api.childVoApi.getChildrenVoList();
        var childInfoVo = childVoList[index];
        var childName = childInfoVo.name;
        var nameColor = TextFieldConst.COLOR_BROWN_NEW;
        if (childName == "") {
            childName = LanguageManager.getlocal("childNeedName");
            nameColor = TextFieldConst.COLOR_BROWN_NEW;
        }
        else {
            if (childInfoVo.sex == 2) {
                nameColor = TextFieldConst.COLOR_QUALITY_RED_NEW;
            }
            else {
                nameColor = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
            }
        }
        this._nameTF.textColor = nameColor;
        this._nameTF.text = childName;
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        var levelStr = LanguageManager.getlocal("servant_infoLv") + "：" + childInfoVo.level + "/" + childCfg.lv;
        // this._levelTF.textColor = nameColor;
        this._levelTF.text = levelStr;
        var vigour = Api.childVoApi.getChildrenVigourById(childInfoVo.id);
        var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
        var statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour + "/" + maxV;
        if (childInfoVo.level >= childCfg.lv) {
            statelStr = LanguageManager.getlocal("childWaitGrowup");
        }
        // this._stateTF.textColor = nameColor;
        this._stateTF.text = statelStr;
        // if(this._child_Icon.texture == ){
        this._child_Icon.setload(Api.childVoApi.getChildPic(childInfoVo.id));
        // }
    };
    ChildScrollItem.prototype.tick = function () {
        if (this.parent) {
            var childVoList = Api.childVoApi.getChildrenVoList();
            var childInfoVo = childVoList[this._childIndex];
            if (childInfoVo) {
                var childVoList_1 = Api.childVoApi.getChildrenVoList();
                var childInfoVo_1 = childVoList_1[this._childIndex];
                var vigour = Api.childVoApi.getChildrenVigourById(childInfoVo_1.id);
                var maxV = Api.vipVoApi.getCurLevelVipCfg().maxVigour;
                var statelStr = LanguageManager.getlocal("childVigour") + "：" + vigour + "/" + maxV;
                var childCfg = GameConfig.config.childCfg[childInfoVo_1.quality.toString()];
                if (childInfoVo_1.level >= childCfg.lv) {
                    statelStr = LanguageManager.getlocal("childWaitGrowup");
                }
                // this._stateTF.textColor = nameColor;
                this._stateTF.text = statelStr;
            }
        }
    };
    ChildScrollItem.prototype.addTick = function () {
        TickManager.addTick(this.tick, this);
    };
    ChildScrollItem.prototype.removeTick = function () {
        TickManager.removeTick(this.tick, this);
    };
    // public getSpaceX():number
    // {
    // 	return 5;
    // }
    ChildScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ChildScrollItem.prototype.dispose = function () {
        // 名字文本
        this._nameTF = null;
        // 等级文本
        this._levelTF = null;
        // 状态文本
        this._stateTF = null;
        this._childIndex = null;
        this._child_Icon = null;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this);
        if (this._itemBg) {
            this._itemBg.removeTouch();
            this._itemBg = null;
        }
        _super.prototype.dispose.call(this);
    };
    return ChildScrollItem;
}(ScrollListItem));
__reflect(ChildScrollItem.prototype, "ChildScrollItem");
