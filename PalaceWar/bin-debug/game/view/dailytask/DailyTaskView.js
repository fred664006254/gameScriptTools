/**
 * 任务
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskView
 */
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
var DailyTaskView = (function (_super) {
    __extends(DailyTaskView, _super);
    function DailyTaskView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._maxLivenessValue = 0;
        return _this;
    }
    Object.defineProperty(DailyTaskView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    DailyTaskView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    DailyTaskView.prototype.getContainerY = function () {
        return 0;
    };
    DailyTaskView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshProfress, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS), this.rewardBoxClickhandlerCallBack, this);
        this.setBigFameY(178);
        this.setBigFameCorner(2);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = 0;
        this._nodeContainer.addChild(topBg);
        //活跃度信息
        var livenessIcon = BaseBitmap.create("dailytask_liveness");
        livenessIcon.x = 25;
        livenessIcon.y = topBg.y + topBg.height / 2 - livenessIcon.height / 2 + 10;
        this._nodeContainer.addChild(livenessIcon);
        var numbg = BaseBitmap.create("public_9_bg80");
        numbg.width = 120;
        numbg.height = 32;
        numbg.alpha = 0.6;
        numbg.setPosition(livenessIcon.x + livenessIcon.width / 2 - numbg.width / 2 + 2, livenessIcon.y - 36);
        this._nodeContainer.addChild(numbg);
        var livenessTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        livenessTxt.text = LanguageManager.getlocal("dailyTask_todayliveness");
        livenessTxt.x = numbg.x + numbg.width / 2 - livenessTxt.width / 2;
        livenessTxt.y = numbg.y + 5;
        this._nodeContainer.addChild(livenessTxt);
        this._curLivenessTxt = ComponentManager.getBitmapText("0", "tip_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._curLivenessTxt.x = 63 - this._curLivenessTxt.width / 2;
        this._curLivenessTxt.y = livenessIcon.y + livenessIcon.height / 2 - this._curLivenessTxt.height / 2 - 1;
        this._nodeContainer.addChild(this._curLivenessTxt);
        this._progress = ComponentManager.getProgressBar("progress18", "progress18_bg", 488);
        this._progress.x = livenessIcon.x + livenessIcon.width + 5;
        this._progress.y = livenessIcon.y + livenessIcon.height / 2 - this._progress.height / 2;
        this._progress.setPercentage(this.getProgressPercent());
        this._nodeContainer.addChild(this._progress);
        //初始化宝箱
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        var perWidth = (488 + 5) / rkeys.length;
        var startX = this._progress.x;
        this._maxLivenessValue = rewardList[String(rkeys.length)].needLiveness;
        for (var index = 0; index < rkeys.length; index++) {
            var tmprcfg = rewardList[String(index + 1)];
            var perX = startX + (index + 1) * perWidth;
            if (index == 1) {
                perX += 4;
            }
            else if (index == 2) {
                perX += 6;
            }
            else if (index == 3) {
                perX += 10;
            }
            // let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
            var arrowImg = BaseBitmap.create("progress18_line");
            arrowImg.x = perX - arrowImg.width / 2 + 2;
            arrowImg.y = this._progress.y - 6;
            this._nodeContainer.addChildAt(arrowImg, 2);
            var rStatus = this.getBoxStatusById(rkeys[index]);
            var imgres = "dailytask_box1_";
            if (index > 2) {
                imgres = "dailytask_box2_";
            }
            var boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
            boxImg.anchorOffsetX = 53 / 2;
            boxImg.anchorOffsetY = 51 / 2;
            boxImg.name = "boxImg" + rkeys[index];
            boxImg.x = perX;
            boxImg.y = this._progress.y - 51 / 2 - 5;
            var lightImg = BaseLoadBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 67 / 2;
            lightImg.anchorOffsetY = 65 / 2;
            lightImg.x = perX;
            lightImg.name = "lightImg" + rkeys[index];
            lightImg.y = this._progress.y - 30;
            lightImg.visible = false;
            this._nodeContainer.addChild(lightImg);
            this._nodeContainer.addChild(boxImg);
            boxImg.addTouchTap(this.rewardBoxClickhandler, this, [rkeys[index]]);
            // let livenuseeBg =  BaseBitmap.create("dailytask_liveness_numbg");
            // livenuseeBg.width = 85;
            // livenuseeBg.x = perX - 40;
            // livenuseeBg.y = this._progress.y +35;
            // this._nodeContainer.addChild(livenuseeBg);
            var txtBg = BaseBitmap.create("public_numbg"); //"public_9_bg20");
            var getRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("shortGetReward"), 12, TextFieldConst.COLOR_WHITE);
            getRewardTxt.setPosition(boxImg.x + (boxImg.width - getRewardTxt.width) / 2, boxImg.y + boxImg.height + boxImg.anchorOffsetY - getRewardTxt.height);
            this._nodeContainer.addChild(txtBg);
            this._nodeContainer.addChild(getRewardTxt);
            getRewardTxt.name = "getRewardTxt" + rkeys[index];
            getRewardTxt.visible = false;
            txtBg.name = "txtBg" + rkeys[index];
            // txtBg.width=getRewardTxt.width+4;
            // txtBg.height=getRewardTxt.height+4;
            txtBg.scaleX = (getRewardTxt.width + 16) / txtBg.width;
            txtBg.scaleY = (getRewardTxt.height + 8) / txtBg.height;
            txtBg.setPosition(getRewardTxt.x + (getRewardTxt.width - txtBg.width * txtBg.scaleX) / 2, getRewardTxt.y + (getRewardTxt.height - txtBg.height * txtBg.scaleY) / 2);
            var numTxt = null;
            if (this.shieldCn()) {
                numTxt = ComponentManager.getTextField(tmprcfg.needLiveness + "", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            else {
                numTxt = ComponentManager.getTextField(tmprcfg.needLiveness + LanguageManager.getlocal("dailyTask_liveness"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            numTxt.x = perX - numTxt.width / 2;
            numTxt.y = this._progress.y + 42;
            this._nodeContainer.addChild(numTxt);
        }
        this.refreshProfress();
        //门客滚顶区域
        var scrollH = GameConfig.stageHeigth - 295;
        var rect = new egret.Rectangle(0, 0, 600, scrollH);
        var list = Api.dailytaskVoApi.getTaskIdListAfterSort();
        this._scrollList = ComponentManager.getScrollList(DailyTaskScrollItem, list, rect);
        this._scrollList.x = 20;
        this._scrollList.y = topBg.y + topBg.height + 13;
        this._nodeContainer.addChild(this._scrollList);
    };
    /**
     * 处理进度条进度值
     */
    DailyTaskView.prototype.getProgressPercent = function () {
        var curLiveness = Api.dailytaskVoApi.getCurLivenessValue();
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        // curLiveness = 140;
        if (curLiveness == 0)
            return 0;
        if (curLiveness >= rewardList[String(rkeys.length)].needLiveness)
            return 100;
        var perV = 1 / rkeys.length;
        for (var index = 1; index <= rkeys.length; index++) {
            if (curLiveness <= rewardList[String(index)].needLiveness) {
                var result = perV * (index - 1);
                var tmpV1 = 0;
                if (index > 1) {
                    tmpV1 = rewardList[String(index - 1)].needLiveness;
                }
                var tmpV2 = rewardList[String(index)].needLiveness;
                result += (curLiveness - tmpV1) / (tmpV2 - tmpV1) * perV;
                return result;
            }
        }
    };
    //每次领取奖励后，刷新进度条以及宝箱状态
    DailyTaskView.prototype.refreshProfress = function () {
        var newPro = this.getProgressPercent();
        var oldPro = this._progress.getPercent();
        egret.Tween.get(this._progress, { loop: false }).to({ percent: newPro }, (newPro - oldPro) * 5000);
        this._curLivenessTxt.text = String(Api.dailytaskVoApi.getCurLivenessValue());
        this._curLivenessTxt.x = 64 - this._curLivenessTxt.width / 2;
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        var rkeys = Object.keys(rewardList);
        var startX = this._progress.x;
        for (var index = 0; index < rkeys.length; index++) {
            var tmpK = String(rkeys[index]);
            var tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
            var boxImg = this._nodeContainer.getChildByName("boxImg" + tmpK);
            var lightImg = this._nodeContainer.getChildByName("lightImg" + tmpK);
            var getRewardTxt = this._nodeContainer.getChildByName("getRewardTxt" + tmpK);
            var txtBg = this._nodeContainer.getChildByName("txtBg" + tmpK);
            var rStatus = this.getBoxStatusById(tmpK);
            var imgres = "dailytask_box1_";
            if (index > 2) {
                imgres = "dailytask_box2_";
            }
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.texture = ResourceManager.getRes(imgres + rStatus);
            }
            if (rStatus == 2) {
                if (getRewardTxt) {
                    getRewardTxt.visible = true;
                }
                if (txtBg) {
                    txtBg.visible = true;
                }
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
            else {
                if (getRewardTxt) {
                    getRewardTxt.visible = false;
                }
                if (txtBg) {
                    txtBg.visible = false;
                }
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
    };
    DailyTaskView.prototype.getBoxStatusById = function (boxId) {
        var tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
        var rStatus = 1;
        if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId(boxId)) {
            rStatus = 3;
        }
        else {
            if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
                rStatus = 2;
        }
        return rStatus;
    };
    //宝箱奖励领取回调
    DailyTaskView.prototype.rewardBoxClickhandlerCallBack = function (event) {
        var data = event.data.data.data;
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        var boxImg = this._nodeContainer.getChildByName("boxImg" + this._curRewardBoxId);
        var pos = boxImg.localToGlobal(boxImg.width / 2, 50);
        App.CommonUtil.playRewardFlyAction(rList, pos);
        this.refreshProfress();
    };
    DailyTaskView.prototype.rewardBoxClickhandler = function (obj, param) {
        var boxRewardId = param;
        var status = this.getBoxStatusById(boxRewardId);
        /**
         *  1未完成 2可领取 3已领取
         */
        if (status == 2) {
            this._curRewardBoxId = boxRewardId;
            NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS, { liveKey: boxRewardId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { type: 'Daily', id: boxRewardId });
        }
    };
    DailyTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailytask_topbg", "dailytask_topbg",
            "dailytask_liveness", "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3", "dailytask_liveness_numbg",
            "dailytask_arrow", "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "public_scrollitembg", "progress17_bg", "progress17", "progress19_bg", "progress19_cloud",
            "public_titlebg", "progress18_bg", "progress18", "progress18_line", "acchristmasview_smalldescbg",
        ]);
    };
    /**
     * 需要屏蔽的cn字库
     */
    DailyTaskView.prototype.shieldCn = function () {
        return PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang();
    };
    DailyTaskView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshProfress, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS), this.rewardBoxClickhandlerCallBack, this);
        this._nodeContainer = null;
        this._scrollList = null;
        this._progress = null;
        this._curLivenessTxt = null;
        this._curRewardBoxId = null;
        _super.prototype.dispose.call(this);
    };
    return DailyTaskView;
}(CommonView));
__reflect(DailyTaskView.prototype, "DailyTaskView");
//# sourceMappingURL=DailyTaskView.js.map