class AcCrossServerTaskScrollItem extends ScrollListItem
{
	private _itemData:any= null;
	private _itemParam:{aid:string,code:string,uiCode:string,specialIconId:string,requestEvent:string} = null;
	private _countText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	private get cfg():any
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
	}
	private get aid(): string {
		return this._itemParam.aid;
	}
	private get code(): string {
		return this._itemParam.code;
	}
	protected get uiCode(): string {
		return this._itemParam.uiCode;
	}
	protected get specialIconId(): string {
		return this._itemParam.specialIconId;
	}
	protected get requestEvent():string {
		return this._itemParam.requestEvent;
	}

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this.width = 620;
		// this.height = 180;
		this._itemData = data;
		this._itemParam = itemParam;

		
		let innerbg = BaseBitmap.create("public_scrollitembg");
		innerbg.width = this.width - 20;
		innerbg.height = 180;
        innerbg.x = 10;
        innerbg.y = 0;
        this.addChild(innerbg); 

 		let namebg = BaseBitmap.create("activity_charge_red");
		namebg.x = innerbg.x - 3;
        namebg.y = innerbg.y;

		let txtStr = LanguageManager.getlocal("acCrossServerHegemony_taskDesc"+this._itemData.questType, [""+this._itemData.value]);
		let txt = ComponentManager.getTextField(txtStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = namebg.x + 20;
        txt.y = namebg.y + namebg.height/2 - txt.height/2;
		
		// namebg.width =txt.width < 139 ? 239 : txt.width + 100;
		this.addChild(namebg);
		this.addChild(txt);

		let reward = "";
		if(data.special1){
			reward = `1049_0_${data.special1}_${this.uiCode}`;
		}
		let rewardArr =  GameData.formatRewardItem(reward);
        let itemicon = null;
        let baseWidth = 106;
        let spaceX = 5;
		let scale = 0.75;
        let startX = 15;
        let startY = 60;

		// rewardArr = rewardArr.concat(rewardArr);
		let rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = innerbg.width - 165;
        this.addChild(rewardBg);
		// rewardBg.height = Math.ceil(rewardArr.length /4) * (106 * 0.8 + 6) + 6;
		rewardBg.height = baseWidth * scale + 16;
        rewardBg.setPosition(innerbg.x + 12, startY + 2);

		// rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr)
		let rewardContainer = new BaseDisplayObjectContainer();
        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
			itemicon.x = i * (baseWidth * scale + spaceX) + 3;
			itemicon.y = 6;
            rewardContainer.addChild(itemicon);

		}
		rewardContainer.height = baseWidth * scale;

		// let scrollReward = ComponentManager.getScrollView(rewardContainer,new egret.Rectangle(0,0,455,100))
		// this.addChild(scrollReward);
		// scrollReward.setPosition(rewardBg.x + startX,startY);
		this.addChild(rewardContainer);
		rewardContainer.setPosition(rewardBg.x + 5, rewardBg.y);

		let vo = <any>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.getTaskNum(this._itemData.questType);
		let newTaskNum = this._itemData.value;
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTaskValue",[taskNum+"",newTaskNum+""]),22);
		this._countText.anchorOffsetX = this._countText.width/2;
		this._countText.x = innerbg.x + innerbg.width - 80;
		this._countText.y = 52;
		this.addChild(this._countText);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this,null,null,null,TextFieldConst.COLOR_BLACK);
		this._reviceBtn.x = innerbg.x + innerbg.width - this._reviceBtn.width - 10;
		this._reviceBtn.y = innerbg.y + innerbg.height - this._reviceBtn.height - 40;
		this.addChild(this._reviceBtn);

		this._goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,"taskGoBtn",this.goBtnClick,this,null,null,null,TextFieldConst.COLOR_BLACK);
		this._goBtn.x = innerbg.x + innerbg.width - this._goBtn.width - 10;
		this._goBtn.y = innerbg.y + innerbg.height - this._goBtn.height - 40;
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.setScale(0.7);
		this._reviceBM.x = innerbg.x + innerbg.width - this._reviceBM.width * 0.7 - 10;
		this._reviceBM.y = innerbg.y + innerbg.height - this._reviceBM.height * 0.7 - 20;
		this.addChild(this._reviceBM);


		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid,this._itemParam.code);
        if(!vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		let activityId = this._itemParam.aid + "-" + this._itemParam.code
		if (this.requestEvent){
			NetManager.request(this.requestEvent,{"activeId":activityId,"taskId":this._itemData.id});
		}else{
			App.LogUtil.warn("---AcCommonTask--- 未传入领取请求事件,无法领取任务奖励");
		}
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <any>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
		let cfg = <any>Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.getTaskNum(this._itemData.questType);
		
		let newTaskNum = this._itemData.value;
		// this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])

		if(openType)
		{	
			
			if(taskNum >= newTaskNum)
			{
				this._goBtn.setVisible(false);
				this._reviceBtn.setVisible(true);
			}
			else
			{
				this._goBtn.setVisible(true);
				this._reviceBtn.setVisible(false);
			}
		}
		else
		{

			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(true);
			if(taskNum >= newTaskNum)
			{
				this._reviceBtn.setEnable(true);
			}
			else
			{
				this._reviceBtn.setEnable(false);
			}
		}
		if(vo.getTaskStatus(this._itemData))
		{
			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(false);
			this._reviceBM.setVisible(true);
		}
		else
		{
			this._reviceBM.setVisible(false);
		}
		if (!vo.isInMatchActicityTime()){
			this._goBtn.setGray(true);
		}
		if (!vo.isStart){
			this._reviceBtn.setGray(true);
		}
	}
	/**
	 * 前往的Click
	 */
	private goBtnClick()
	{
		let vo = <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid,this._itemParam.code);
        if(!vo.isInMatchActicityTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
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

	/**
	 * 获得
	 */
	private getTitleStr(type:number):string
	{
		let strTop:string = null;
		let valueStr = String(this._itemData.value);
		switch(Number(this._itemData.questType))
		{
			case 1:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType1",[valueStr]);
				break;
			}
			case 2:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType2",[valueStr]);
				break;
			}
			case 301:
			{	
				if(Api.switchVoApi.checkCloseText())
				{
					strTop = LanguageManager.getlocal("acJadeTaksTitleType3_1",[valueStr]);
				}
				else
				{
					strTop = LanguageManager.getlocal("acJadeTaksTitleType3_2",[valueStr]);
				}
				
				break;
			}
			case 402:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType4",[valueStr]);
				break;
			}
			case 303:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType5",[valueStr]);
				break;
			}
			case 601:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType6",[valueStr]);
				break;
			}
			case 104:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType7",[valueStr]);
				break;
			}
			case 10001:
			{
				strTop = LanguageManager.getlocal("betheking_task_questType10001",[valueStr]);
				break;
			}
			case 90001: //灯火元宵活动，Code1 地图下一关任务 ： 探索完奇景{1}可领取
			{

				strTop = LanguageManager.getlocal("acDiscorveryTaskType90001",[valueStr]);
				break;
			}
			default:
			{
				App.LogUtil.log("未支持的类型");
			}
		}
		return strTop;
	}
	
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
	{
		this._itemData = null;
		this._itemParam = null;
		this._reviceBtn = null;
		this._goBtn = null;
		this._reviceBM = null;
		this._countText = null;
		super.dispose();
	}
}