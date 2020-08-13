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
 * 	圣诞活动奖励奖池
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
var AcChristmasRewardPoolPopupView = (function (_super) {
    __extends(AcChristmasRewardPoolPopupView, _super);
    // private _pos
    function AcChristmasRewardPoolPopupView() {
        var _this = _super.call(this) || this;
        /**位置信息 */
        _this._posList = [];
        /**reward 信息 */
        _this._containerList = [];
        /** 需要改变位置 */
        _this._startPosX = 0;
        /** 对象池 */
        _this._reward = {};
        /** 滑动的 */
        _this._container = null;
        /** 奖励index */
        _this._index = 0;
        /** 每层的奖励 */
        _this._floorRewardList = [];
        /** 滑动位置index */
        _this._slideIndex = 0;
        _this._isUsePool = false;
        _this._showContainerNum = 9;
        /**快速循环的次数 */
        _this._fastLoop = 0;
        /**快速循环的次数 */
        _this._slowLoop = 0;
        _this._isChange = false;
        _this._changeLoop = 0;
        _this._endPosX = 0;
        _this._slowChangeLoop = 0;
        _this._slowTimer = 0;
        _this._lastItemId = null;
        _this._isStop = false;
        _this._rewards = null;
        _this._isHaveNew = false;
        _this._lastItemIdTmp = null;
        _this._closeTip = null;
        return _this;
    }
    AcChristmasRewardPoolPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcChristmasRewardPoolPopupView.prototype.initView = function () {
        this._floorRewardList = this.param.data.floorRewardList;
        this._lastItemId = this.param.data.lastItemId;
        this._rewards = this.param.data.rewards;
        var bgStr = "acchristmasview_rewardbg";
        if (this.isValentines()) {
            bgStr = "acchristmasview_rewardbg_" + this.isValentines();
        }
        else if (this.getUiCode()) {
            bgStr = "acchristmasview_rewardbg_" + this.getUiCode();
        }
        else if (this.isMagpiesBridge()) {
            bgStr = "acchristmasview_rewardbg_" + this.isMagpiesBridge();
        }
        else if (this.getTypeCode() == "8") {
            bgStr = "acchristmasview_rewardbg_" + this.getTypeCode();
        }
        var bg = BaseBitmap.create(bgStr);
        // bg.width = 628;
        // bg.height = 258;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2 - this.getContainerY());
        this.addChildToContainer(bg);
        this._container = new BaseDisplayObjectContainer();
        this._container.width = 558;
        this._container.height = 116;
        this._container.mask = new egret.Rectangle(0, 0, 558, 116);
        this._container.setPosition(bg.x + bg.width / 2 - this._container.width / 2, bg.y + 105);
        this.addChildToContainer(this._container);
        if (this.getTypeCode() == "8") {
            this._container.y = bg.y + 95;
        }
        if (this._floorRewardList.length > this._showContainerNum) {
            this._isUsePool = true;
            this._lastItemIdTmp = String(this._floorRewardList.length * 1000);
            for (var i = 0; i < this._floorRewardList.length; i++) {
                var reward = this.getRewardContainer(this._floorRewardList[i]);
                reward.setVisible(false);
            }
        }
        else {
            this._isUsePool = false;
            this._showContainerNum = (Math.floor(this._showContainerNum / this._floorRewardList.length) + 1) * this._floorRewardList.length;
        }
        var offestWidth = 0;
        for (var i = 0; i < this._showContainerNum; i++) {
            var scaleVale = 0.8;
            var rewardContainer = void 0;
            var floorReward = this._floorRewardList[i % this._floorRewardList.length];
            if (this._isUsePool) {
                rewardContainer = this.getRewardContainer(floorReward);
                rewardContainer.setVisible(true);
            }
            else {
                var rewardVo = GameData.formatRewardItem(floorReward.reward)[0];
                rewardContainer = GameData.getItemIcon(rewardVo);
                rewardContainer.name = floorReward.id;
                this._container.addChild(rewardContainer);
            }
            if (i == 4) {
                scaleVale = 1;
                rewardContainer.setScale(scaleVale);
                rewardContainer.setPosition(rewardContainer.width * (i - 2) + 20 - 9, this._container.height / 2 - rewardContainer.height * scaleVale / 2);
                this._endPosX = rewardContainer.x;
            }
            else {
                scaleVale = 0.8;
                rewardContainer.setScale(scaleVale);
                rewardContainer.setPosition(rewardContainer.width * (i - 2) + 20, this._container.height / 2 - rewardContainer.height * scaleVale / 2);
            }
            if (i == 0) {
                this._startPosX = rewardContainer.x;
            }
            var visible = i == 0 || i == this._showContainerNum - 1 ? false : true;
            var pos = { x: rewardContainer.x, y: rewardContainer.y, scale: scaleVale, visible: visible };
            this._containerList.push(rewardContainer);
            this._posList.push(pos);
            this._index++;
        }
        var bgMask = BaseBitmap.create("acchristmasview_rewardbgmask");
        // bgMask.width = 558;
        // bgMask.height = 116;
        bgMask.setPosition(bg.x + bg.width / 2 - bgMask.width / 2, bg.y + 105);
        this.addChildToContainer(bgMask);
        if (this.getTypeCode() == "8") {
            bgMask.y = bg.y + 88;
        }
        var topArcher = BaseBitmap.create("acchristmasview_archer");
        topArcher.setPosition(bgMask.x + bgMask.width / 2 - topArcher.width / 2, bgMask.y - topArcher.height);
        this.addChildToContainer(topArcher);
        var buttomArcher = BaseBitmap.create("acchristmasview_archer");
        buttomArcher.anchorOffsetX = buttomArcher.width / 2;
        buttomArcher.anchorOffsetY = buttomArcher.height / 2;
        buttomArcher.rotation = 180;
        buttomArcher.setPosition(bgMask.x + bgMask.width / 2, bgMask.y + bgMask.height + buttomArcher.height / 2);
        this.addChildToContainer(buttomArcher);
        //close tip
        var closeTip = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasCloseTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        closeTip.setPosition(bg.x + bg.width / 2 - closeTip.width / 2, bg.y + bg.height + 15);
        this.addChildToContainer(closeTip);
        closeTip.visible = false;
        this._closeTip = closeTip;
        //120
        var waittime = 0;
        if (this._isUsePool) {
            this._fastLoop = this._floorRewardList.length * 1;
            this._slowLoop = this._floorRewardList.length * 2;
            this._slowChangeLoop = Math.floor(this._floorRewardList.length / 2);
            waittime = 15;
        }
        else {
            this._fastLoop = this._showContainerNum * 1;
            this._slowLoop = this._showContainerNum * 2;
            this._slowChangeLoop = Math.floor(this._showContainerNum / 2);
            waittime = 0;
        }
        this.movePos(60, waittime);
    };
    /**
     * 位置移动
     */
    AcChristmasRewardPoolPopupView.prototype.movePos = function (time, waitTime) {
        var _this = this;
        if (this._isChange) {
            var rewardVo = GameData.formatRewardItem(this._rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            this._closeTip.visible = true;
            this.addTouchTap(this.hide, this);
            // if (this.param.data.code == "2" && this.param.data.replacerewards) {
            // 	let oldReward = "";
            // 	let newReward = "";
            // 	let replacerewards = this.param.data.replacerewards;
            // 	for (let key in replacerewards[0]) {
            // 		if (key && replacerewards[0][key]) {
            // 			oldReward = String(key);
            // 			newReward = replacerewards[0][key];
            // 		}
            // 	}
            // 	let rewardName = Config.WifeskinCfg.getWifeCfgById(GameData.formatRewardItem(oldReward)[0].id).name;
            // 	ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": rewardName, "touch": newReward, "message": "changeOtherRewardTip" });
            // }
            if (this.param.data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: this.param.data.replacerewards });
            }
            return;
        }
        this._slideIndex++;
        var _loop_1 = function (i) {
            var movePos = this_1._posList[(i - (this_1._slideIndex % this_1._posList.length) + this_1._posList.length) % this_1._posList.length];
            var timetmp = time;
            if (this_1._containerList[i].x == this_1._startPosX) {
                if (this_1._isUsePool && this_1._isHaveNew == false) {
                    var floorReward = this_1._floorRewardList[this_1._index % this_1._floorRewardList.length];
                    if (this_1._isStop) {
                        this_1._isHaveNew = true;
                        floorReward = this_1.getStopId();
                        floorReward.id = this_1._lastItemIdTmp;
                    }
                    this_1._containerList[i] = this_1.getRewardContainer(floorReward);
                    this_1._containerList[i].visible = false;
                }
            }
            egret.Tween.get(this_1._containerList[i]).to({ x: movePos.x, y: movePos.y, scaleX: movePos.scale, scaleY: movePos.scale, visible: movePos.visible }, time).call(function () {
                egret.Tween.removeTweens(_this._containerList[i]);
                if (_this._isStop && _this._containerList[i].x == _this._endPosX) {
                    if (_this._isUsePool) {
                        if (_this._containerList[i].name == _this._lastItemIdTmp) {
                            _this._isChange = true;
                        }
                    }
                    else {
                        if (_this._containerList[i].name == _this._lastItemId) {
                            _this._isChange = true;
                        }
                    }
                }
                if (i == _this._posList.length - 1) {
                    egret.Tween.get(_this).wait(0).call(function () {
                        egret.Tween.removeTweens(_this);
                        _this._index++;
                        _this._changeLoop++;
                        if (_this._changeLoop >= _this._fastLoop) {
                            _this._slowTimer++;
                            if (_this._slowTimer > _this._slowChangeLoop) {
                                _this._isStop = true;
                            }
                            time += 10;
                            waitTime += 10;
                            _this.movePos(time, waitTime);
                        }
                        else {
                            _this.movePos(time, waitTime);
                        }
                    }, _this);
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this._posList.length; i++) {
            _loop_1(i);
        }
    };
    AcChristmasRewardPoolPopupView.prototype.getStopId = function () {
        for (var key in this._floorRewardList) {
            if (this._floorRewardList[key].id == this._lastItemId) {
                return this._floorRewardList[key];
            }
        }
    };
    AcChristmasRewardPoolPopupView.prototype.getRewardContainer = function (item) {
        if (this._reward[item.id]) {
            return this._reward[item.id];
        }
        else {
            var rewardVo = GameData.formatRewardItem(item.reward)[0];
            this._reward[item.id] = GameData.getItemIcon(rewardVo);
            this._reward[item.id].name = item.id;
            this._container.addChild(this._reward[item.id]);
            return this._reward[item.id];
        }
    };
    /**是否情人节 */
    AcChristmasRewardPoolPopupView.prototype.isValentines = function () {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    };
    AcChristmasRewardPoolPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "5") {
            return "5";
        }
        return null;
    };
    //是否为鹊桥相会
    AcChristmasRewardPoolPopupView.prototype.isMagpiesBridge = function () {
        if (this.param.data.code == "6" || this.param.data.code == "7") {
            return "6";
        }
        return null;
    };
    AcChristmasRewardPoolPopupView.prototype.getTypeCode = function () {
        if (this.param.data.code == "9" || this.param.data.code == "10") {
            return "8";
        }
        return this.param.data.code;
    };
    AcChristmasRewardPoolPopupView.prototype.getResourceList = function () {
        var list = [];
        if (this.isValentines()) {
            list = ["acchristmasview_rewardbg_" + this.isValentines()];
        }
        if (this.getUiCode()) {
            list.push("acchristmasview_rewardbg_" + this.getUiCode());
        }
        if (this.isMagpiesBridge()) {
            list.push("acchristmasview_rewardbg_" + this.isMagpiesBridge());
        }
        if (this.getTypeCode() == "8") {
            list.push("acchristmasview_rewardbg_" + this.getTypeCode());
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_rewardbg", "acchristmasview_rewardbgmask"
        ]).concat(list);
    };
    AcChristmasRewardPoolPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcChristmasRewardPoolPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcChristmasRewardPoolPopupView.prototype.getBgName = function () {
        return null;
    };
    AcChristmasRewardPoolPopupView.prototype.dispose = function () {
        for (var key in this._reward) {
            egret.Tween.removeTweens(this._reward[key]);
            this._reward[key].dispose();
        }
        egret.Tween.removeTweens(this);
        this._reward = {};
        this._posList = [];
        this._index = 0;
        this._floorRewardList = [];
        this._slideIndex = 0;
        this._container.dispose();
        this._container = null;
        this._startPosX = 0;
        for (var key in this._containerList) {
            egret.Tween.removeTweens(this._containerList[key]);
            this._containerList[key].dispose();
        }
        this._containerList = [];
        this._isUsePool = false;
        this._showContainerNum = 9;
        this._fastLoop = 0;
        this._slowLoop = 0;
        this._changeLoop = 0;
        this._isChange = false;
        this._endPosX = 0;
        this._slowChangeLoop = 0;
        this._slowTimer = 0;
        this._isStop = false;
        this._rewards = null;
        this._isHaveNew = false;
        this._lastItemIdTmp = null;
        this._lastItemId = null;
        this._closeTip = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasRewardPoolPopupView;
}(PopupView));
__reflect(AcChristmasRewardPoolPopupView.prototype, "AcChristmasRewardPoolPopupView");
//# sourceMappingURL=AcChristmasRewardPoolPopupView.js.map