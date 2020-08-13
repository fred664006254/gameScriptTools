/**
 * 恭喜获得奖励的通用弹板
 * @param rewards  获得的奖励列表 
 * @param otherRewards  获得的其他奖励列表 指 额外获得的奖励列表 
 * @param isPlayAni  是否播放动画 
 */

class AcThrowArrowGetRewardPopupView extends BaseView {

    // private _scrollList: ScrollList;
    private _rewardArrList: RewardItemVo[] = [];

    private _count: number = 0;
    private _buttomBg: BaseBitmap = null;
    private _isPlayAni: any = null;
    private _otherContainer: BaseDisplayObjectContainer = null;
    private _otherRewardHeigth: number = 0;
    private _callBack: Function = null;
    public constructor() {
        super();
    }


    protected initView(): void {

        this.titleTF.visible = false;
        this._isPlayAni = true;

        let rewards_data = this.param.data.rewards;
        this._callBack = this.param.data.callback;

        if (rewards_data) {
            this._rewardArrList = GameData.formatRewardItem(rewards_data);
        }
        this.showInitView();

        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);

        let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2, this._buttomBg.y + + this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if (this._isPlayAni) {
            this._count = 0;
            this._otherContainer.alpha = 0;
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
        else {
            this.noPlayAni();
        }
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

        let wordBM = BaseBitmap.create(this.getTitleResName());
        wordBM.anchorOffsetX = wordBM.width / 2;
        wordBM.anchorOffsetY = wordBM.height / 2;
        wordBM.x = GameConfig.stageWidth / 2;
        wordBM.y = light.y;
        if (this._isPlayAni) {
            wordBM.setScale(0);
            egret.Tween.get(wordBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(wordBM);

        let arrowTypeBM = BaseBitmap.create("acthrowarrowview_itemtitle_" + this.param.data.type + "-" + this.getUiCode());
        arrowTypeBM.anchorOffsetX = arrowTypeBM.width / 2;
        arrowTypeBM.anchorOffsetY = arrowTypeBM.height / 2;
        arrowTypeBM.setPosition(GameConfig.stageWidth / 2, wordBM.y + wordBM.height / 2 + 30);

        if (this._isPlayAni) {
            arrowTypeBM.setScale(0);
            egret.Tween.get(arrowTypeBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(arrowTypeBM);


        this._buttomBg = BaseBitmap.create("public_9_wordbg2");
        this._buttomBg.height = 180;
        this._buttomBg.x = this.viewBg.x + this.viewBg.width / 2 - this._buttomBg.width / 2;
        this._buttomBg.y = arrowTypeBM.y + arrowTypeBM.height / 2 + 20;
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
        let posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + (Math.floor((count) / 5) * (rewardDB.height + 35));
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
    }

    protected getUiCode(): string {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    }

    private getTitleResName():string
    {
        if (this.getUiCode()=="3")
        {
            return "tailor_get_word";
        }
        return "acthrowarrowview_common_rewardtip";
    }

    protected getResourceList(): string[] {
        
        return super.getResourceList().concat([

            'public_9_wordbg2', "tailor_get_light",
            this.getTitleResName(), "acthrowarrowview_itemtitle_" + this.param.data.type + "-" + this.getUiCode(),
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
        this._count = 0;
        this._buttomBg = null;
        this._isPlayAni = null;
        this._otherContainer = null;
        this._otherRewardHeigth = null;
        super.dispose()
    }
}