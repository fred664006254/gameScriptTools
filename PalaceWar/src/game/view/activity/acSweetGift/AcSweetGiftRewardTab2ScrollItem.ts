/**
  * 月夜仙缘充值奖励item
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab2ScrollItem
  */
 class AcSweetGiftRewardTab2ScrollItem extends ScrollListItem {
	private _itemData:any= null;
	private _aidAndCode: { "aid": string; "code": string} = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index:number, data:any, itemParam:any):void {
		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 520;
		this.addChild(itembg);

		let titleBg:BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.y = 7;
		titleBg.x = 5;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftquestType"+data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);
        
		let rewards = this._itemData.getReward;
		// if (this._itemData.specialGift) {
		// 	rewards = "1023_0_" + this._itemData.specialGift + "_" + this._aidAndCode.code + "|" + this._itemData.getReward;
		// }
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;

        this.height = itembg.height;

        let currNum = vo.getTaskNumByType(data.questType);
        let needStrKey = "sweetgiftTaskNeedStr2";
        if (currNum >= data.value){
            needStrKey = "sweetgiftTaskNeedStr1";
        }
        let needText = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey, [""+currNum, ""+data.value]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        needText.setPosition(50, 50);
        this.addChild(needText);

        if (currNum >= data.value){
            if (vo.isGetTaskById(data.id)){ 
                //已领取
                let collectflag = BaseBitmap.create("collectflag");
                collectflag.setScale(0.7);
                collectflag.setPosition(itembg.x + itembg.width - collectflag.width * 0.7 - 5, itembg.y + itembg.height - collectflag.height * 0.7);
                this.addChild(collectflag); 
                needText.visible = false; 
            }
            else{
                //可领取 未领取
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETTASK, { activeId: vo.aidAndCode, taskId: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                needText.setPosition(reviceBtn.x + reviceBtn.width/2 - needText.width/2, reviceBtn.y - 25);
            }
        }
        else{
            //未完成
            if (data.questType == 1004){
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                reviceBtn.setEnable(false);
                needText.setPosition(reviceBtn.x + reviceBtn.width/2 - needText.width/2, reviceBtn.y - 25);
            }
            else{
                let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 15, itembg.y + itembg.height - goBtn.height - 15);
                this.addChild(goBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
                needText.setPosition(goBtn.x + goBtn.width/2 - needText.width/2, goBtn.y - 25);
            }
        } 
    }

    public taskGoBtnHandler():void{
        let vo = <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(!this._itemData.openType){
            return; 
        }
        let openType = this._itemData.openType;
        if(openType == "")
        {
            PlayerBottomUI.getInstance().show();
        } 
        else
        {
            let viewName = App.StringUtil.firstCharToUper(openType);
            if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
            {
                let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
                if(!isShowNpc)
                {
                    let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
                    return;
                }
            }
            if (egret.getDefinitionByName(viewName + "View"))
            {
                ViewController.getInstance().openView(viewName+ "View"); 
                
            }else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
            {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else
            {
                if(openType=="recharge")
                {
                    ViewController.getInstance().openView(viewName+"Vip"+ "View");
                }
            } 
        } 
    }
	
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}