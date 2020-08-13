/**
* 国庆活动 任务item
* author yangchengguo
* date 2019.9.10
* @class AcNationalDayTaskScrollItem
*/
class AcNationalDayTaskScrollItem  extends ScrollListItem
{
	private _data=null;
	private _code:string = "";
	private _aid:string = "";
	private _currDay:number=0;
	private _tmpVo:AcNationalDayVo = null;
	public constructor() 
	{
		super();
	} 

	protected initItem(index:number, data:any, itemParam?:any)
    {	
		this._data = data;
		this._aid = itemParam.aid;
		this._code = itemParam.code;
		this._currDay = itemParam.currDay;
	 	let tmpVo = <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code); 
		this._tmpVo =  tmpVo;
	 
		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		itemBg.width = 590;
		this.addChild(itemBg); 

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = itemBg.width;
		titleBg.height = 35;
		titleBg.setPosition(itemBg.x + itemBg.width / 2 - itemBg.width / 2, itemBg.y + 10);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayQuestType"+data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		//任务红色标签
		let taskFlag:BaseBitmap = BaseBitmap.create("acnewyear_bottom2");  
		taskFlag.y = titleBg.y + titleBg.height;
		this.addChild(taskFlag); 
		
		let num = index+1;
		let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTask"+num),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
			taskTxt.x = taskFlag.x + taskFlag.width/2 - taskTxt.width/2;
			taskTxt.y = taskFlag.y + taskFlag.height/2 - taskTxt.height/2;
		}
		else{
			taskTxt.width=30;
			taskTxt.x = taskFlag.x + taskFlag.width/2 - taskTxt.width/2;
			taskTxt.y = taskFlag.y + 25;
			taskTxt.lineSpacing =5;
		}
		this.addChild(taskTxt);

		//奖励背景
		let rewardBg = BaseBitmap.create("public_9_bg21");
		rewardBg.width = itemBg.width - 20 - taskFlag.width;
		rewardBg.setPosition(taskFlag.x + taskFlag.width + 5, titleBg.y + titleBg.height + 5);
		this.addChild(rewardBg);

		//奖励物品
		let rewards = data.getReward;
		if (data.specialReward) {
			rewards = "1028_0_" + data.specialReward + "_" + this._code + "|" + rewards;
		}
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 15) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itemBg.height += offsetH - 20;

		rewardBg.height = offsetH + 10;
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 360);
		itemBg.height += progress.height + 25;
		progress.setPosition(rewardBg.x + 5, itemBg.y + itemBg.height - progress.height - 25);
		this.addChild(progress);
		let currNum = tmpVo.getTaskNumByType(this._currDay, data.questType);
		progress.setPercentage(currNum / data.value, currNum + "/" + data.value, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.height = itemBg.height;

		//按钮
		let status = tmpVo.getTaskCompleteStatus(this._currDay, data.questType);
		if (status == 2){ 
			//已领取
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.setScale(0.55);
			collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.55 - 5, itemBg.y + itemBg.height - collectflag.height * 0.55);
			this.addChild(collectflag); 
		}
		else if (status == 1){
			//可领取 未领取
			let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
				if ((!tmpVo.isStart)) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_GET_TASK_REWARD);
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, { activeId: tmpVo.aidAndCode, questType: data.questType, diffday: this._currDay, ftype:1 });
			}, this);
			reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
			this.addChild(reviceBtn);
			App.CommonUtil.addIconToBDOC(reviceBtn);
		}
		else if (status == 0){
			if (data.questType == "1004"){
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if (!tmpVo.isInActivity()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					if (tmpVo.getDay() < this._currDay){
						App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskNotStart"));
						return;
					}
					if (tmpVo.getDay() > this._currDay){
						App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskEnd"));
						return;
					}
				}, this);
				reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
				reviceBtn.setGray(true);
				// reviceBtn.setEnable(false);
			}
			else{
				let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
				goBtn.setPosition(itemBg.x + itemBg.width - goBtn.width - 15, itemBg.y + itemBg.height - goBtn.height - 15);
				this.addChild(goBtn);
				if (tmpVo.getDay() != this._currDay || !tmpVo.isInActivity()) {
					goBtn.setGray(true);
				}
			}
		}
    }

    public taskGoBtnHandler():void{
        let vo = <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
		}
		if (vo.getDay() < this._currDay){
			App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskNotStart"));
			return;
		}
		if (vo.getDay() > this._currDay){
			App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskEnd"));
			return;
		}
        if(!this._data.openType){
            return; 
        }
        let openType = this._data.openType;
        if(openType == "")
        {
            PlayerBottomUI.getInstance().show();
        } 
        else
        {
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
			let viewName = App.StringUtil.firstCharToUper(openType);
			if (openType == "alliance"){
				let allid = Api.playerVoApi.getPlayerAllianceId();
				if(!allid || allid <= 0){
					viewName = `AllianceCreate`;
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
	 
	public getSpaceY():number
	{
		return 0;
	}
	
	public dispose():void
    {
		this._tmpVo = null;
		this._code = null;
		this._aid = null;
		this._data = null;
		this._currDay = 0;
		super.dispose();
	}
}