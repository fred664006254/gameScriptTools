/**
 * 奖励详情
 * author ycg
 * date 2020.2.14
 * @class AcBlessingOfMammonRewardPopupView
 */
class AcBlessingOfMammonRewardPopupView extends PopupView{
    private _data:any;
    private _progress:ProgressBar = null;
    private _chargeBtn:BaseButton = null;
    private _collect:BaseBitmap = null;
    private _getBtn:BaseButton = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);
        let data = this.param.data.data;
        this._data = data;
        let rewards = null;
        if (data && data.getReward){
            rewards = data.getReward;
        }
        let rewardArr = GameData.getRewardItemIcons(rewards, true, true);
        let listbg = BaseBitmap.create(`public_9_bg94`);
        listbg.width = 510;
        listbg.setPosition(this.viewBg.x + this.viewBg.width/2 - listbg.width/2, 15);
        this.addChildToContainer(listbg);

        let arrLength = rewardArr.length;
        let scale = 0.8;
        let stX = listbg.x + (listbg.width - (5 * (rewardArr[0].width * scale + 10) - 10))/2;
        if (arrLength < 5){
            stX = listbg.x + (listbg.width - (arrLength * (rewardArr[0].width * scale + 10) - 10))/2;
        }
        let lastIndex = 0;
        let lastStX = 0;
        let lastLength = arrLength % 5;
        if (Math.ceil(arrLength/5) > 1 && lastLength > 0){
            lastIndex = arrLength - lastLength;
            lastStX  = listbg.x + (listbg.width - (lastLength * (rewardArr[0].width * scale + 10) - 10))/2;
        }
        for (let i=0; i < arrLength; i++){
            let item = rewardArr[i];
            item.setScale(scale);
            if (lastIndex != 0 && lastIndex <= i){
                item.x = lastStX + (item.width * scale + 10)*(i % 5);
            }
            else{
                item.x = stX + (item.width * scale + 10)*(i % 5);
            }
            item.y = listbg.y + 15 + Math.floor(i / 5) * (item.height * scale + 15);
            this.addChildToContainer(item);
        }

        let itemOffY = listbg.y + 10 + Math.floor((arrLength - 1) / 5) * (108 * scale + 15) + 108 * scale;
        let infoBg = BaseBitmap.create("public_infobg3");
        infoBg.alpha = 0.7;
        infoBg.setPosition(listbg.x + listbg.width/2 - infoBg.width/2, itemOffY + 20);
        this.addChildToContainer(infoBg);

        let infoText = BaseBitmap.create("acblessingofmammon_chargeinfotxt");
        this.addChildToContainer(infoText);

        //currNum
        let extraData = this.vo.getExtraRewardNum(data.id);
        let extraInfoStr = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupExtraInfo", [""+extraData.min, ""+extraData.max]);
        let currNum = ComponentManager.getBitmapText(""+extraInfoStr, "acblessingmammon_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG, false);
        currNum.anchorOffsetX = currNum.width/2;
        // currNum.setScale(0.6);
        infoText.width = infoText.width - 57 + currNum.width;
        infoText.setPosition(infoBg.x + infoBg.width/2 - infoText.width/2, infoBg.y + infoBg.height/2 - infoText.height/2);
        currNum.setPosition(infoText.x + 105 + (infoText.width - 105 - 64)/2, infoText.y + infoText.height/2 - currNum.height * currNum.scaleY/2);
        this.addChildToContainer(currNum);
        if(!Api.switchVoApi.checkOpenBMFont()){
            currNum.y = infoText.y + infoText.height/2 - currNum.height/2 + 4;
        }

        let progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 400);
        progress.setPosition(infoBg.x + infoBg.width/2 - progress.width/2, infoBg.y + infoBg.height + 10);
        this.addChildToContainer(progress);
        let currCharge = this.vo.getCurrRecharge();
        let proText = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupChargeInfo", [""+currCharge, data.needGem]);
        progress.setPercentage(currCharge/Number(data.needGem), proText);
        this._progress = progress;

        listbg.height = progress.y + progress.height - listbg.y + 15;
        
        let collectFlag = BaseBitmap.create("collectflag");
        collectFlag.setScale(0.7);
        collectFlag.setPosition(listbg.x + listbg.width/2 - collectFlag.width * collectFlag.scaleX /2, listbg.y + listbg.height + 15);
        this.addChildToContainer(collectFlag);
        this._collect = collectFlag;
        collectFlag.visible = false;

        let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "acBlessingOfMonmonRewardPopupChargeBtn", this.chargeBtnClick, this);
        chargeBtn.setPosition(listbg.x + listbg.width/2 - chargeBtn.width /2, listbg.y + listbg.height + 15);
        this.addChildToContainer(chargeBtn);
        this._chargeBtn = chargeBtn;
        chargeBtn.visible = false;

        let getBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "taskCollect", this.getRewardBtnClick, this);
        getBtn.setPosition(listbg.x + listbg.width/2 - getBtn.width /2, listbg.y + listbg.height + 15);
        this.addChildToContainer(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;

        this.refreshUI();
    }

    private refreshUI():void{
        let currCharge = this.vo.getCurrRecharge();
        let proText = LanguageManager.getlocal("acBlessingOfMonmonRewardPopupChargeInfo", [""+currCharge, this._data.needGem]);
        this._progress.setPercentage(currCharge/Number(this._data.needGem), proText);
        if (this.vo.isGetChargeRewardById(this._data.id)){
            this._collect.visible = true;
            this._chargeBtn.visible = false;
            this._getBtn.visible = false;
        }
        else{
            if (currCharge >= Number(this._data.needGem)){
                this._collect.visible = false;
                this._chargeBtn.visible = false;
                this._getBtn.visible = true;
            }
            else{
                this._collect.visible = false;
                this._chargeBtn.visible = true;
                this._getBtn.visible = false;
            }
        }
    }

    //前往充值
    private chargeBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    //领取奖励
    private getRewardBtnClick():void{
        if (!this.vo.isStart){
            this.vo.showAcEndTip();
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, { activeId: this.vo.aidAndCode, rkey: this._data.id});
    }

    private getRewardCallback(event:egret.Event){
        if (!event.data.ret){
            return;
        }
        let rData = event.data.data.data;
        // let rInfo = this.vo.getFormatRewards(rData.rewards);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "otherRewards":rData.otherrewards, "isPlayAni":true});
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private get cfg():Config.AcCfg.BlessingOfMammonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcBlessingOfMammonVo{
        return <AcBlessingOfMammonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "2"||this.code == "8"){
            return "1";
        }
        else if (this.code == "4"||this.code == "9"){
            return "3";
        }
        else if (this.code == "7"||this.code == "10"){
            return "6";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    protected getBgExtraHeight():number{
        return 0;
    }

    protected getTitleStr():string{
		return "acBlessingOfMonmonRewardPopupTitle";
	}

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
    }
    
    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "progress21_bg", "progress21", "collectflag", "acblessingofmammon_chargeinfotxt", "acblessingmammon_fnt"
		]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);

        this._data = null;
        this._progress = null;
        this._collect = null;
        this._chargeBtn = null;
        this._getBtn = null;
        super.dispose();
    }
}
