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
 * 主线任务引导
 * author hyd
 * date 2019/09/15
 * @class MainTaskGuideNode
 */
var MainTaskGuideNode = (function (_super) {
    __extends(MainTaskGuideNode, _super);
    function MainTaskGuideNode() {
        var _this = _super.call(this) || this;
        _this._showUIName = "";
        _this._completeAni = undefined;
        _this._posCfg = null;
        return _this;
        // this.show();
    }
    MainTaskGuideNode.prototype.init = function () {
        this._posCfg = Config.MaintaskguideposCfg.poscfg;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE, this.refreshUIInfo, this);
        var rbg = BaseBitmap.create("public_maintask_guidebg");
        rbg.setPosition(0, -rbg.height / 2);
        this.addChild(rbg);
        rbg.addTouchTap(this.bgHandler, this);
        this._rbg = rbg;
        var icon = BaseBitmap.create("public_maintask_guideicon");
        icon.x = rbg.x;
        icon.y = rbg.y + rbg.height / 2 - icon.height / 2 - 5;
        this.addChild(icon);
        this._taskDescTxt = ComponentManager.getTextField("00", 20, 0xfff8e8);
        this._taskDescTxt.multiline = true;
        this._taskDescTxt.lineSpacing = 3;
        // this._taskDescTxt.width = 230;
        this._taskDescTxt.textAlign = egret.HorizontalAlign.LEFT;
        this._taskDescTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._taskDescTxt.x = rbg.x + 80;
        this._taskDescTxt.y = rbg.y + rbg.height / 2 + 3;
        this.addChild(this._taskDescTxt);
        this._taskAimTxt = ComponentManager.getTextField("0", 20, 0xfa0606);
        this._taskAimTxt.y = this._taskDescTxt.y - this._taskDescTxt.height / 2;
        this.addChild(this._taskAimTxt);
        var closeBtn = ComponentManager.getButton("public_maintask_guideclose", "", this.hide, this);
        this._closeBtn = closeBtn;
        this._closeBtn.x = rbg.x + 330;
        closeBtn.y = rbg.y + rbg.height / 2 - closeBtn.height / 2;
        this.addChild(closeBtn);
        TickManager.addTick(this.tick, this);
        this.refreshUIInfo();
    };
    MainTaskGuideNode.prototype.refreshUIInfo = function () {
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var cfg = this._posCfg[taskCfg.openType];
        if (this._showUIName && this._showUIName != "") {
            cfg = this._posCfg[this._showUIName];
        }
        this.x = cfg.x;
        this.y = cfg.y;
        if (!this._taskId || !taskCfg) {
            return;
        }
        var tarColor = 0xfa0606;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = 0x0fdb36;
        }
        this._taskAimTxt.textColor = tarColor;
        if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
            this._taskAimTxt.text = LanguageManager.getlocal("mainTask_complete");
            this.showAni();
        }
        else {
            this._taskAimTxt.text = "(" + Api.mainTaskVoApi.getCurMainTaskValue() + "/" + taskCfg.value + ")";
            this.hideAni();
        }
        var nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[1];
        this._taskDescTxt.text = nameAndDesc.split(":")[1];
        if (this._taskDescTxt.x + this._taskDescTxt.textWidth > 400) {
            this._taskDescTxt.width = 400 - this._taskDescTxt.x;
        }
        this._taskDescTxt.anchorOffsetY = this._taskDescTxt.height / 2;
        this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth + 5;
        this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 70;
        this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width + 20;
        // this._closeBtn.x = this._rbg.x + this._rbg.width - this._closeBtn.width - 20;
        if (cfg.x <= 0) {
            this.x = GameConfig.stageWidth / 2 - this.width / 2;
        }
    };
    MainTaskGuideNode.prototype.showAni = function () {
        if (!this._completeAni) {
            this._completeAni = ComponentManager.getCustomMovieClip("maintask_guide", 7, 150);
            // this._completeAni.blendMode = egret.BlendMode.ADD;
            this._completeAni.x = -23;
            this._completeAni.y = -70;
            this.addChildAt(this._completeAni, 1);
            this._completeAni.playWithTime(0);
        }
        this._completeAni.visible = true;
    };
    MainTaskGuideNode.prototype.hideAni = function () {
        this._completeAni ? this._completeAni.visible = false : "";
    };
    MainTaskGuideNode.prototype.resetUIPos = function (uiName) {
        var _this = this;
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        uiName = uiName || taskCfg.openType;
        if (this._posCfg) {
            var cfg = this._posCfg[uiName];
            this.x = cfg.x;
            this.y = cfg.y;
            if (cfg.x <= 0) {
                this.x = GameConfig.stageWidth / 2 - this.width / 2;
            }
        }
        egret.setTimeout(function () {
            if (_this && _this.parent) {
                var idx1 = _this.parent.getChildIndex(_this);
                var idx2 = _this.parent.numChildren - 1;
                if (idx1 < idx2) {
                    _this.parent.swapChildrenAt(idx1, idx2);
                }
            }
        }, this, 300);
    };
    MainTaskGuideNode.prototype.resetUIPos2 = function (uiName) {
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        uiName = uiName || taskCfg.openType;
        var cfg = this._posCfg[uiName];
        this.x = cfg.x;
        this.y = cfg.y;
    };
    MainTaskGuideNode.prototype.isShowOpenAni = function () {
        return false;
    };
    MainTaskGuideNode.prototype.bgHandler = function () {
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            Api.mainTaskVoApi.isKeepGuide = false;
            ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
            var pchildren = this.parent.$children;
            var mindex = this.parent.getChildIndex(this);
            for (var index = mindex - 1; index >= 0; index--) {
                if (pchildren[index]) {
                    var child = pchildren[index];
                    if (child instanceof BaseView) {
                        child.hide();
                    }
                    else if (child instanceof PlayerBottomUI) {
                        PlayerBottomUI.getInstance().hide(true);
                    }
                }
            }
        }
    };
    MainTaskGuideNode.prototype.tick = function () {
        var tarColor = 0xfa0606;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = 0x0fdb36;
        }
        this._taskAimTxt.textColor = tarColor;
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[1];
        this._taskDescTxt.text = nameAndDesc.split(":")[1];
        this._taskDescTxt.anchorOffsetY = this._taskDescTxt.height / 2;
        this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth + 5;
        if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
            this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth;
            this._taskAimTxt.text = LanguageManager.getlocal("mainTask_complete");
            this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 60;
            this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width;
            this.showAni();
        }
        else {
            this.hideAni();
            this._taskAimTxt.text = "(" + Api.mainTaskVoApi.getCurMainTaskValue() + "/" + taskCfg.value + ")";
            this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 70;
            this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width + 20;
        }
    };
    MainTaskGuideNode.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE, this.refreshUIInfo, this);
        this._rbg = null;
        this._closeBtn = null;
        this._taskId = null;
        this._taskDescTxt = null;
        this._taskAimTxt = null;
        this._showUIName = "";
        MainTaskGuideNode._instance = null;
        this._completeAni = null;
        this._posCfg = null;
        _super.prototype.dispose.call(this);
    };
    MainTaskGuideNode.prototype.getResourceList = function () {
        return [];
    };
    MainTaskGuideNode.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    MainTaskGuideNode.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    MainTaskGuideNode.prototype.show = function (data) {
        this._showUIName = data;
        _super.prototype.show.call(this, data);
    };
    MainTaskGuideNode.getInstance = function () {
        if (!MainTaskGuideNode._instance) {
            MainTaskGuideNode._instance = new MainTaskGuideNode();
        }
        return MainTaskGuideNode._instance;
    };
    //实例是否可用
    MainTaskGuideNode.hasInstance = function () {
        if (MainTaskGuideNode._instance) {
            return true;
        }
        return false;
    };
    MainTaskGuideNode.hideInstance = function () {
        if (MainTaskGuideNode._instance) {
            MainTaskGuideNode._instance.hide();
        }
    };
    MainTaskGuideNode.resetInstance = function () {
        if (MainTaskGuideNode._instance) {
            MainTaskGuideNode._instance.refreshUIInfo();
        }
    };
    MainTaskGuideNode.showGuideInstance = function (uiname) {
        var ins = new MainTaskGuideNode();
        ins.show();
        ins.resetUIPos2(uiname);
        MainTaskGuideNode._instanceList.push(ins);
    };
    MainTaskGuideNode.hideGuideInstance = function () {
        var ins = MainTaskGuideNode._instanceList.pop();
        if (ins) {
            ins.hide();
        }
        if (MainTaskGuideNode._instanceList.length == 0) {
            Api.mainTaskVoApi.isGoExcuting = false;
        }
    };
    MainTaskGuideNode._instance = undefined;
    MainTaskGuideNode._instanceList = [];
    return MainTaskGuideNode;
}(BaseLoadDisplayObjectContiner));
__reflect(MainTaskGuideNode.prototype, "MainTaskGuideNode");
//# sourceMappingURL=MainTaskGuideNode.js.map