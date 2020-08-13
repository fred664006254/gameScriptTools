/**
 * 拉霸机获得奖励弹框
 * 只适用于拉霸机活动
 * @author 张朝阳
 * date 2018/12/28
 * @class AcArcadeGameGetRewardPopupView
 */
class AcArcadeGameGetRewardPopupView extends BaseView {

    private _rewardArrList: RewardItemVo[] = [];
    private _otherRewardArrList: RewardItemVo[] = [];
    private _count: number = 0;
    private _buttomBg: BaseBitmap = null;
    private _isPlayAni: any = null;
    private _otherContainer: BaseDisplayObjectContainer = null;
    private _otherRewardHeigth: number = 0;
    private _buffersHeight: number = 0;
    private _buffersContainer: BaseDisplayObjectContainer = null;
    private _callBack: Function = null;
    public constructor() {
        super();
    }

    protected getCloseBtnName(): string {
        return null;
    }

    protected isTouchMaskClose(): boolean {
        return true;
    }
	protected getCnCode(): string {
		let code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }

    protected initView(): void {

        this.titleTF.visible = false;

        let re_data = this.param.data;
        let rewards_data = this.param.data.rewards;
        let otherRewards_data = this.param.data.otherRewards;
        this._isPlayAni = this.param.data.isPlayAni;
        this._callBack = this.param.data.callback;
        let buffers = this.param.data.buffers;
        if (rewards_data) {
            this._rewardArrList = GameData.formatRewardItem(rewards_data);
        }
        else {
            if (re_data) {
                if (typeof (re_data) == "string") {
                    this._rewardArrList = GameData.formatRewardItem(re_data);
                }
                else {
                    this._rewardArrList = re_data;
                }
            }
        }
        this.showInitView();
        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);
        if (otherRewards_data) {
            this.getOtherReward(otherRewards_data);
        }
        this._buffersContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._buffersContainer);
        if (buffers) {
            this.initBuffers(buffers)
        }
        let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2, this._buttomBg.y + + this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if (this._isPlayAni) {
            this._count = 0;
            this._otherContainer.alpha = 0;
            this._buffersContainer.alpha = 0;
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
        else {
            this.noPlayAni();
        }

    }
    /**buff 相关 */
    private initBuffers(buffers: any) {
        let cyhtNum = buffers["1"] ? buffers["1"] : 0; //一种一样
        let tjhcNum = buffers["2"] ? buffers["2"] : 0; //2个一样
        let csjdNum = buffers["3"] ? buffers["3"] : 0; //三个一样
        let wealthLuckTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardViewBufferType1-" + this.getCnCode(), [String(cyhtNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        wealthLuckTxt1.setPosition(this._buttomBg.x + 20, this._buttomBg.y + this._otherRewardHeigth + 15);
        this._buffersContainer.addChild(wealthLuckTxt1);
        let wealthLuckTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardViewBufferType2-" + this.getCnCode(), [String(tjhcNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        wealthLuckTxt2.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - wealthLuckTxt2.width / 2, wealthLuckTxt1.y);
        this._buffersContainer.addChild(wealthLuckTxt2);
        let wealthLuckTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardViewBufferType3-" + this.getCnCode(), [String(csjdNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        wealthLuckTxt3.setPosition(this._buttomBg.x + this._buttomBg.width - wealthLuckTxt3.width - 20, wealthLuckTxt1.y);
        this._buffersContainer.addChild(wealthLuckTxt3);
        this._buffersHeight = wealthLuckTxt3.height + 5;
        this._buttomBg.height += this._buffersHeight;
    }
    /**
     * 显示初始化View
     */
    private showInitView() {
        let light = BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.x = GameConfig.stageWidth / 2;
        light.y = 40 + light.height / 2;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChildToContainer(light)

        let light2 = BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChildToContainer(light2)

        let wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.anchorOffsetX = wordBM.width / 2;
        wordBM.anchorOffsetY = wordBM.height / 2;
        wordBM.x = GameConfig.stageWidth / 2;
        wordBM.y = light.y;
        if (this._isPlayAni) {
            wordBM.setScale(0);
            egret.Tween.get(wordBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(wordBM);

        this._buttomBg = BaseBitmap.create("public_9_wordbg2");
        this._buttomBg.height = 180;
        this._buttomBg.x = this.viewBg.x + this.viewBg.width / 2 - this._buttomBg.width / 2;
        this._buttomBg.y = wordBM.y + wordBM.height;
        this.addChildToContainer(this._buttomBg);
        let offestNum = 0;
        if (this._rewardArrList.length < 11) {
            offestNum = Math.floor((this._rewardArrList.length) / (6));
        }
        else if (this._rewardArrList.length >= 11) {
            offestNum = 2;
        }
        this._buttomBg.height += offestNum * (135);
    }
    /**
     * 播放动画
     */
    private playAni() {
        this.createItem(this._count);

    }
    /**
     * 不播放动画
     */
    private noPlayAni() {
        for (let i = 0; i < this._rewardArrList.length; i++) {
            this.createItem(i);
        }

    }
    /**
     * 实例化 Item
     */
    private createItem(count: number) {
        let rewardDB = GameData.getItemIcon(this._rewardArrList[count], true, true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        let rewardDBWidth = rewardDB.width;
        let maxLength = this._rewardArrList.length > 5 ? 6 : this._rewardArrList.length + 1;
        let startWidth = (this._buttomBg.width - rewardDBWidth * (maxLength - 1)) / (maxLength);
        let posX = this._buttomBg.x + startWidth + 6 + rewardDB.width / 2 + (((count) % 5) * (rewardDBWidth + startWidth));
        let posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + this._buffersHeight + (Math.floor((count) / 5) * (rewardDB.height + 35));
        rewardDB.setPosition(posX, posY);
        this.addChildToContainer(rewardDB);
        if (this._isPlayAni) {
            rewardDB.setScale(0);
            egret.Tween.get(rewardDB, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            this._count++;
            if (this._count == this._rewardArrList.length) {
                egret.Tween.get(this._otherContainer).to({ alpha: 1 }, 500);
                if (this.param.data.buffers && Object.keys(this.param.data.buffers).length > 0) {
                    egret.Tween.get(this._buffersContainer).to({ alpha: 1 }, 500);
                }
            }

        }

    }
    /**
    * 获得额外的奖励
    */
    private getOtherReward(otherData: any) {
        this._otherRewardArrList = GameData.formatRewardItem(otherData);
        let otherRewardBg = BaseBitmap.create("atkrace_arrest_bg_di");
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherContainer.addChild(otherRewardBg);
        let rewardIconWidth = 0;
        let otherRewardDesWidth = 0;
        let otherRewardNumWidth = 0;
        for (let i = 0; i < this._otherRewardArrList.length; i++) {
            let rewardIcon = BaseLoadBitmap.create(this._otherRewardArrList[i].icon);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.setPosition(otherRewardBg.x + otherRewardBg.width / 2 - rewardIcon.width / 2, otherRewardBg.y + 9 + (i * (rewardIcon.height)));
            this._otherContainer.addChild(rewardIcon);
            rewardIconWidth = rewardIcon.width > rewardIconWidth ? rewardIcon.width : rewardIconWidth;

            let extraRewardDes = ComponentManager.getTextField(LanguageManager.getlocal("extraRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            extraRewardDes.setPosition(rewardIcon.x - extraRewardDes.width - 5,rewardIcon.y + rewardIcon.height / 2 - extraRewardDes.height / 2 - 2)
            // extraRewardDes.setPosition(rewardIcon.x - extraRewardDes.width - 5, otherRewardBg.y + otherRewardBg.height / 2 - extraRewardDes.height / 2 )
            this._otherContainer.addChild(extraRewardDes);
            otherRewardDesWidth = extraRewardDes.width > otherRewardDesWidth ? extraRewardDes.width : otherRewardDesWidth;

            let extraRewardNum = ComponentManager.getTextField("x" + String(this._otherRewardArrList[0].num), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
            extraRewardNum.setPosition(rewardIcon.x + rewardIcon.width + 5, extraRewardDes.y );
            this._otherContainer.addChild(extraRewardNum);
            otherRewardNumWidth = extraRewardNum.width > otherRewardNumWidth ? extraRewardNum.width : otherRewardNumWidth;
        }

        otherRewardBg.width = rewardIconWidth + otherRewardNumWidth + otherRewardDesWidth + 200;
        otherRewardBg.height += (this._otherRewardArrList.length - 1) * 42;
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherRewardHeigth = otherRewardBg.height + 20;
        this._buttomBg.height += this._otherRewardHeigth;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            'public_9_wordbg2', "tailor_get_light",
            "tailor_get_word","atkrace_arrest_bg_di",
        ]);
    }



    public dispose() {
        // this._scrollList =null;
        TimerManager.remove(this.playAni, this);
        if (this._callBack) {
            this._callBack.apply(this.param.data.handler)
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
        this._buffersHeight = 0;
        this._buffersContainer = null;
        super.dispose()
    }
}