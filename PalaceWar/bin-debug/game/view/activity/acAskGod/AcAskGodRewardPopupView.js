/**
 * @param rewards  获得的奖励列表
 * @param otherRewards  获得的其他奖励列表 指 额外获得的奖励列表
 * @param isPlayAni  是否播放动画
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcAskGodRewardPopupView = /** @class */ (function (_super) {
    __extends(AcAskGodRewardPopupView, _super);
    function AcAskGodRewardPopupView() {
        var _this = _super.call(this) || this;
        // private _scrollList: ScrollList;
        _this._rewardArrList = [];
        _this._otherRewardArrList = [];
        _this._count = 0;
        _this._buttomBg = null;
        _this._isPlayAni = null;
        _this._otherContainer = null;
        _this._otherRewardHeigth = 0;
        _this._callBack = null;
        _this._tipMsgStr = null;
        _this._tipMsg = null;
        _this._isSameAdd = false;
        _this._isSameOtherAdd = false;
        _this._isTen = false;
        _this._paramObj = null;
        return _this;
    }
    // protected getBgName():string
    // {
    //     return "public_9_wordbg";
    // }
    AcAskGodRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAskGodRewardPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcAskGodRewardPopupView.prototype.initView = function () {
        this.titleTF.visible = false;
        var re_data = this.param.data;
        var rewards_data = this.param.data.rewards;
        var otherRewards_data = this.param.data.otherRewards;
        this._isPlayAni = this.param.data.isPlayAni;
        this._callBack = this.param.data.callback;
        this._tipMsgStr = this.param.data.tipMsg;
        this._isSameAdd = this.param.data.isSameAdd;
        this._isSameOtherAdd = this.param.data.isSameOtherAdd;
        this._isTen = this.param.data.isTen;
        this._paramObj = this.param.data.paramObj;
        var specialId = this.param.data.specialId;
        if (rewards_data) {
            this._rewardArrList = GameData.formatRewardItem(rewards_data, this._isSameAdd);
        }
        else {
            if (re_data) {
                if (typeof (re_data) == "string") {
                    this._rewardArrList = GameData.formatRewardItem(re_data, this._isSameAdd);
                }
                else {
                    this._rewardArrList = re_data;
                }
            }
        }
        if (this._rewardArrList) {
            this._rewardArrList.sort(function (a, b) {
                if (a.id == specialId && b.id != specialId) {
                    return -1;
                }
                if (a.id != specialId && b.id == specialId) {
                    return 1;
                }
            });
        }
        this.showInitView();
        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);
        if (otherRewards_data) {
            this.getOtherReward(otherRewards_data);
        }
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2, this._buttomBg.y + +this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if (this._isPlayAni) {
            this._count = 0;
            this._otherContainer.alpha = 0;
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
        else {
            this.noPlayAni();
        }
        // let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        // let l:number=this._rewardArrList.length;
        // let scaleNum:number=0.88;
        // var newnum :number =0;
        // for(let i:number=0;i<l;i++)
        // {
        //     let icon:BaseDisplayObjectContainer=GameData.getItemIcon(this._rewardArrList[i]);
        //      var num= i%5;
        //     icon.setPosition((icon.width+20)*num,(icon.height+20)*Math.floor(i/5));
        //     icon.scaleX =scaleNum;
        //     icon.scaleY =scaleNum;
        //     itemContainer.addChild(icon);
        //     newnum =(icon.height+20)*Math.floor(i/5);
        // }
        // itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,50);
        // this.addChildToContainer(itemContainer);
    };
    /**
     * 显示初始化View
     */
    AcAskGodRewardPopupView.prototype.showInitView = function () {
        var light = BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.x = GameConfig.stageWidth / 2;
        light.y = 40 + light.height / 2;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChildToContainer(light);
        var light2 = BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChildToContainer(light2);
        var wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.anchorOffsetX = wordBM.width / 2;
        wordBM.anchorOffsetY = wordBM.height / 2;
        wordBM.x = GameConfig.stageWidth / 2;
        wordBM.y = light.y;
        if (this._isPlayAni) {
            wordBM.setScale(0);
            egret.Tween.get(wordBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(wordBM);
        if (!this._isTen) {
            wordBM.visible = false;
            var top1 = BaseBitmap.create("acaskgod_tip-1");
            top1.x = GameConfig.stageWidth / 2 - top1.width / 2;
            top1.y = wordBM.y - 120;
            this.addChildToContainer(top1);
            var top2Str = "";
            for (var key in this._paramObj) {
                if (parseInt(key) == 1) {
                    top2Str = "acaskgod_qian1-1";
                }
                else if (parseInt(key) == 2) {
                    top2Str = "acaskgod_qian2-1";
                }
                else if (parseInt(key) == 3) {
                    top2Str = "acaskgod_qian3-1";
                }
                else {
                    top2Str = "acaskgod_qian4-1";
                }
            }
            var top2 = BaseBitmap.create(top2Str);
            top2.x = GameConfig.stageWidth / 2 - top2.width / 2;
            top2.y = top1.y + top1.height + 10;
            this.addChildToContainer(top2);
        }
        this._buttomBg = BaseBitmap.create("public_9_wordbg2");
        this._buttomBg.height = 180;
        this._buttomBg.x = this.viewBg.x + this.viewBg.width / 2 - this._buttomBg.width / 2;
        this._buttomBg.y = wordBM.y + wordBM.height;
        this.addChildToContainer(this._buttomBg);
        if (this._tipMsgStr) {
            var tipBg = BaseBitmap.create("public_9_bg81");
            this.addChildToContainer(tipBg);
            var tipMsg = ComponentManager.getTextField(this._tipMsgStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipMsg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - tipMsg.width / 2, this._buttomBg.y + 20);
            this.addChildToContainer(tipMsg);
            tipBg.width = tipMsg.width + 60;
            tipBg.setPosition(tipMsg.x - (tipBg.width / 2 - tipMsg.width / 2), tipMsg.y + tipMsg.height / 2 - tipBg.height / 2);
            this._tipMsg = tipMsg;
            this._buttomBg.height += tipBg.height + 10;
        }
        var offestNum = 0;
        if (this._rewardArrList.length < 11) {
            offestNum = Math.floor((this._rewardArrList.length) / (6));
        }
        else if (this._rewardArrList.length >= 11) {
            offestNum = 2;
        }
        this._buttomBg.height += offestNum * (135);
    };
    /**
     * 播放动画
     */
    AcAskGodRewardPopupView.prototype.playAni = function () {
        this.createItem(this._count);
    };
    /**
     * 不播放动画
     */
    AcAskGodRewardPopupView.prototype.noPlayAni = function () {
        for (var i = 0; i < this._rewardArrList.length; i++) {
            this.createItem(i);
        }
    };
    /**
     * 实例化 Item
     */
    AcAskGodRewardPopupView.prototype.createItem = function (count) {
        var rewardDB = GameData.getItemIcon(this._rewardArrList[count], true, true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        var rewardDBWidth = rewardDB.width;
        var maxLength = this._rewardArrList.length > 5 ? 6 : this._rewardArrList.length + 1;
        var startWidth = (this._buttomBg.width - rewardDBWidth * (maxLength - 1)) / (maxLength);
        var posX = this._buttomBg.x + startWidth + 6 + rewardDB.width / 2 + (((count) % 5) * (rewardDBWidth + startWidth));
        var posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + (Math.floor((count) / 5) * (rewardDB.height + 35));
        if (this._tipMsg) {
            posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + (Math.floor((count) / 5) * (rewardDB.height + 35)) + this._tipMsg.height + 20;
        }
        rewardDB.setPosition(posX, posY);
        this.addChildToContainer(rewardDB);
        if (this._isPlayAni) {
            rewardDB.setScale(0);
            egret.Tween.get(rewardDB, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            this._count++;
            if (this._count == this._rewardArrList.length) {
                egret.Tween.get(this._otherContainer).to({ alpha: 1 }, 500);
            }
        }
    };
    /**
    * 获得额外的奖励
    */
    AcAskGodRewardPopupView.prototype.getOtherReward = function (otherData) {
        this._otherRewardArrList = GameData.formatRewardItem(otherData, this._isSameOtherAdd);
        //127--59
        var otherRewardBg = BaseBitmap.create("public_9_bg47");
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherContainer.addChild(otherRewardBg);
        // extraRewardBg.add
        var rewardIconWidth = 0;
        var otherRewardDesWidth = 0;
        var otherRewardNumWidth = 0;
        for (var i = 0; i < this._otherRewardArrList.length; i++) {
            var rewardIcon = BaseLoadBitmap.create(this._otherRewardArrList[i].icon);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.setPosition(otherRewardBg.x + otherRewardBg.width / 2 - rewardIcon.width / 2 + 40, otherRewardBg.y + 9 + (i * (rewardIcon.height)));
            this._otherContainer.addChild(rewardIcon);
            rewardIconWidth = rewardIcon.width > rewardIconWidth ? rewardIcon.width : rewardIconWidth;
            var extraRewardDes = ComponentManager.getTextField(LanguageManager.getlocal("extraRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            extraRewardDes.setPosition(rewardIcon.x - extraRewardDes.width - 5, rewardIcon.y + rewardIcon.height / 2 - extraRewardDes.height / 2);
            this._otherContainer.addChild(extraRewardDes);
            otherRewardDesWidth = extraRewardDes.width > otherRewardDesWidth ? extraRewardDes.width : otherRewardDesWidth;
            var extraRewardNum = ComponentManager.getTextField("x" + String(this._otherRewardArrList[0].num), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
            extraRewardNum.setPosition(rewardIcon.x + rewardIcon.width + 5, rewardIcon.y + rewardIcon.height / 2 - extraRewardNum.height / 2);
            this._otherContainer.addChild(extraRewardNum);
            otherRewardNumWidth = extraRewardNum.width > otherRewardNumWidth ? extraRewardNum.width : otherRewardNumWidth;
        }
        var con = new BaseDisplayObjectContainer();
        if (this._isTen) {
            var arr = [];
            for (var key in this._paramObj) {
                arr.push({ key: parseInt(key), value: this._paramObj[key] });
            }
            arr.sort(function (a, b) {
                return a.key - b.key;
            });
            var preTtx = null;
            for (var i = 0; i < arr.length; i++) {
                var txt = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodTips" + arr[i].key, ["" + arr[i].value]), 20, TextFieldConst.COLOR_WHITE);
                if (preTtx) {
                    txt.x = preTtx.x + preTtx.width + 10;
                }
                else {
                    txt.x = 0;
                }
                preTtx = txt;
                con.addChild(txt);
            }
        }
        otherRewardBg.width = rewardIconWidth + otherRewardNumWidth + otherRewardDesWidth + 200;
        otherRewardBg.height += (this._otherRewardArrList.length - 1) * 42;
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherRewardHeigth = otherRewardBg.height + 20;
        this._buttomBg.height += this._otherRewardHeigth;
        if (this._isTen) {
            con.x = GameConfig.stageWidth / 2 - con.width / 2;
            con.y = otherRewardBg.y + otherRewardBg.height + 10;
            this._otherContainer.addChild(con);
            this._otherRewardHeigth += 40;
            this._buttomBg.height += 40;
        }
    };
    // protected resetBgSize():void
    // {
    //     super.resetBgSize();
    //     let  common_reward=BaseBitmap.create("common_reward");
    //     common_reward.setPosition(this.viewBg.x+(this.viewBg.width-common_reward.width)/2,this.viewBg.y-common_reward.height/2);
    //     this.addChild(common_reward);
    // }
    // private touchHandler():void
    // {
    //     ViewController.getInstance().hideView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW);
    // }
    AcAskGodRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "common_reward",
            'public_9_wordbg2', "tailor_get_light",
            "tailor_get_word",
        ]);
    };
    AcAskGodRewardPopupView.prototype.dispose = function () {
        // this._scrollList =null;
        TimerManager.remove(this.playAni, this);
        if (this._callBack) {
            this._callBack.apply(this.param.data.handler);
        }
        this._callBack = null;
        this._rewardArrList = [];
        this._otherRewardArrList = [];
        this._otherRewardArrList = [];
        this._count = 0;
        this._buttomBg = null;
        this._isPlayAni = null;
        this._otherContainer = null;
        this._otherRewardHeigth = null;
        this._tipMsgStr = null;
        this._tipMsg = null;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodRewardPopupView;
}(BaseView));
//# sourceMappingURL=AcAskGodRewardPopupView.js.map