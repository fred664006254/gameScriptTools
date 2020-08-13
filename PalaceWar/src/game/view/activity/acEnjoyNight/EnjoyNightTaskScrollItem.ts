class EnjoyNightTaskScrollItem  extends ScrollListItem
{
	private _itemData: Config.AcCfg.EnjoyNightTaskItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string ,"uicode": string } = null;
	private _reviceBtn: BaseButton = null;
	private _goBtn: BaseButton = null;
	private _reviceBM: BaseBitmap = null;
	private tempStr="";
	public constructor() {
		super();
	}
	

	private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid,this._aidAndCode.code); 
		 return  springCelebrateVo;
	} 

	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		this.width = 608;
		this.height = 165;
		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = this.width;
		itembg.height = this.height;
		this.addChild(itembg);

		let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2, itembg.y + 5);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		
		let rewarStr = data.getReward; 
		if(data.specialGift)
		{
			let newrewarStr = "1019_0_"+data.specialGift+"_"+this._aidAndCode.uicode+''+"|"+rewarStr;
			rewarStr =newrewarStr;
		}
		this.tempStr = rewarStr;
		let rewardArr = GameData.formatRewardItem(rewarStr);
		for (let i = 0; i < rewardArr.length; i++) {

			let rewardItem = GameData.getItemIcon(rewardArr[i], true);
			rewardItem.setScale(0.95);
			rewardItem.setPosition(20 + (rewardItem.width + 8) * i, titleBg.y + titleBg.height + 5);
			this.addChild(rewardItem);
		}

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.reviceBtnClick, this);
		this._reviceBtn.setPosition(itembg.x + itembg.width - this._reviceBtn.width - 15, itembg.y + itembg.height - this._reviceBtn.height - 20);
		this.addChild(this._reviceBtn);

		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.goBtnClick, this);
		this._goBtn.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - this._goBtn.width / 2, this._reviceBtn.y + this._reviceBtn.height / 2 - this._goBtn.height / 2);
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.anchorOffsetX = this._reviceBM.width / 2;
		this._reviceBM.anchorOffsetY = this._reviceBM.height / 2;
		this._reviceBM.setScale(0.7);
		this._reviceBM.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2, this._reviceBtn.y + this._reviceBtn.height / 2);
		this.addChild(this._reviceBM);
		let scheduleNum = vo.getTaskNum(this._itemData.questType);
		let scheduleStr = LanguageManager.getlocal("AcMazeViewTaskPlan", [scheduleNum < data.value ? "<font color=0xce1515>" + scheduleNum + "</font>" : "<font color="+TextFieldConst.COLOR_WARN_GREEN2+">" + scheduleNum + "</font>", String(this._itemData.value)])

		let scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		scheduleTF.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
		this.addChild(scheduleTF);
		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick() {
		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.uicode;
		this.vo.tmpReward = this.tempStr;
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETTASK, { "activeId": activityId, "rkey": this._itemData.taskId });
	}
	/**
	 * 刷新UI
	 */
	private refreshView() {
		let vo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.getTaskNum(this._itemData.questType);

		let newTaskNum = this._itemData.value;

		if (openType) {

			if (taskNum >= newTaskNum) {
				this._goBtn.setVisible(false);
				this._reviceBtn.setVisible(true);
			}
			else {
				this._goBtn.setVisible(true);
				this._reviceBtn.setVisible(false);
			}
		}
		else {

			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(true);
			if (taskNum >= newTaskNum) {
				this._reviceBtn.setEnable(true);
			}
			else {
				this._reviceBtn.setEnable(false);
			}
		}
		if (vo.getTaskFlag(this._itemData.taskId)) {
			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(false);
			this._reviceBM.setVisible(true);
		}
		else {
			this._reviceBM.setVisible(false);
		}

		if(this._goBtn){
			if(!vo.isInActivity()){
				App.DisplayUtil.changeToGray(this._goBtn);
			}
		}
	}
	/**
	 * 前往的Click
	 */
	private goBtnClick() {
		let vo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let openType = this._itemData.openType;
		if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
			let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
			if (!isShowNpc) {
				let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
				App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
				return;
			}
		}
		if (openType == "wife") {
			ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
		}
		else if (openType == "child") {
			ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
		}
		else if (openType == "search") {
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		}
		else if (openType == "atkrace") {
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
		}
		else if (openType == "affair") {
			ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
		}
		else
		{
			let viewName = App.StringUtil.firstCharToUper(openType) ;
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
	}

	/**
	 * 获得
	 */
	private getTitleStr(type: number): string {
		let strTop: string = null;
		let valueStr = String(this._itemData.value);
		let strTopKey: string = null;
		switch (Number(this._itemData.questType)) {
			case 1:
				{
					strTopKey = "acHotelTaksTitleType1";
					break;
				}
			case 2:
				{
					strTopKey = "acHotelTaksTitleType2";
					break;
				}
			case 301:
				{
					strTopKey = "acHotelTaksTitleType3";
					break;
				}
			case 402:
				{
					strTopKey = "acHotelTaksTitleType4";
					break;
				}
			case 303:
				{
					strTopKey = "acHotelTaksTitleType5";
					break;
				}
			case 601:
				{
					strTopKey = "acHotelTaksTitleType6" ;
					break;
				}
			case 104:
				{
					strTopKey ="acHotelTaksTitleType7" ;
					break;
				}
			case 1002:
				{
					strTopKey = "taskDesc1002";
					break;
				}
		}
		if (!strTopKey)
		{
			strTopKey ="acSpringceleBrationquestType"+this._itemData.questType; 
		}

		strTop = LanguageManager.getlocal(strTopKey, [valueStr]);
		return strTop;
	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		this._goBtn = null;
		this._reviceBtn = null;
		this._reviceBM = null;
		this._aidAndCode = null;
		this.tempStr = null;
		super.dispose();
	}
}