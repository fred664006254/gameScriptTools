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
var AcCarnivalNightTaskScrollItem2 = (function (_super) {
    __extends(AcCarnivalNightTaskScrollItem2, _super);
    function AcCarnivalNightTaskScrollItem2() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._reviceBM = null;
        _this._type = '';
        return _this;
    }
    Object.defineProperty(AcCarnivalNightTaskScrollItem2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcCarnivalNightTaskScrollItem2.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        this._type = "batHP";
        if (this._itemData.typeId.indexOf("batHP") > -1) {
            this._type = "batHP";
        }
        else {
            this._type = "bigPrize";
        }
        // this.width = 608;
        // this.height = 185;
        var innerbg = BaseBitmap.create("public_listbg");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var namebg = BaseBitmap.create("acmoonlight_red-1");
        // namebg.width = 260
        // namebg.x = this.width/2 - namebg.width/2;
        namebg.x = 3;
        namebg.y = 5;
        var txt = ComponentManager.getTextField(this.getTitleStr(this._itemData.typeId), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 30;
        txt.y = namebg.y + namebg.height / 2 - txt.height / 2;
        namebg.width = txt.width < 139 ? 239 : txt.width + 100;
        this.addChild(namebg);
        this.addChild(txt);
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        var itemicon = null;
        var baseWidth = 106;
        var baseHeight = 106;
        var spaceX = 5;
        var spaceY = 5;
        var scale = 0.8;
        var startX = 10;
        var startY = 50;
        var lastY = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            // if(rewardArr[i].type == 23){
            // 	itemicon = GameData.getItemIcon(rewardArr[i],false,true);
            // } else {
            // 	itemicon = GameData.getItemIcon(rewardArr[i],true,true);
            // }
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = startX + (i % 4) * (baseWidth * scale + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if (i == rewardArr.length - 1) {
                lastY = itemicon.y;
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        //let openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getAcTaskNum(this._itemData.typeId);
        var newTaskNum = this._itemData.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.x = 520 - this._countText.width / 2 - 80;
        this._countText.y = 40 - 8;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        this._reviceBtn.x = 460 - 80;
        this._reviceBtn.y = this._countText.y + this._countText.height;
        this.addChild(this._reviceBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.x = 480 - 80;
        this._reviceBM.y = this._countText.y + this._countText.height;
        this.addChild(this._reviceBM);
        innerbg.height = 163;
        this.height = innerbg.height;
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcCarnivalNightTaskScrollItem2.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        if (this._type == 'batHP') {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMA, { "activeId": activityId, "turnId": this._itemData.id });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMU, { "activeId": activityId, "useId": this._itemData.id });
        }
    };
    /**
     * 刷新UI
     */
    AcCarnivalNightTaskScrollItem2.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        //任务进度
        var taskNum = vo.getAcTaskNum(this._itemData.typeId);
        var newTaskNum = this._itemData.value;
        // this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])
        this._reviceBtn.setVisible(true);
        if (taskNum >= newTaskNum) {
            this._reviceBtn.setEnable(true);
        }
        else {
            this._reviceBtn.setEnable(false);
        }
        if (vo.getAcTaskStatus(this._itemData.typeId)) {
            this._reviceBtn.setVisible(false);
            this._reviceBM.setVisible(true);
        }
        else {
            this._reviceBM.setVisible(false);
        }
    };
    /**
     * 获得
     */
    AcCarnivalNightTaskScrollItem2.prototype.getTitleStr = function (typeId) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        if (this._type == 'batHP') {
            strTop = LanguageManager.getlocal("acCarnivalNightTaskItemStr1", [valueStr]);
        }
        else {
            strTop = LanguageManager.getlocal("acCarnivalNightTaskItemStr2", [valueStr]);
        }
        return strTop;
    };
    AcCarnivalNightTaskScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcCarnivalNightTaskScrollItem2.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        this._reviceBtn = null;
        this._reviceBM = null;
        this._countText = null;
        this._type = '';
        _super.prototype.dispose.call(this);
    };
    return AcCarnivalNightTaskScrollItem2;
}(ScrollListItem));
__reflect(AcCarnivalNightTaskScrollItem2.prototype, "AcCarnivalNightTaskScrollItem2");
