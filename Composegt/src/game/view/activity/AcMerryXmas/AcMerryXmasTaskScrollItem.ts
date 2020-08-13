class AcMerryXmasTaskScrollItem extends ScrollListItem
{
	private _itemData:Config.AcCfg.MerryXmasTaskItemCfg= null;
	private _itemParam:{aid:string,code:string,uiCode:string,specialIconId:string,requsetEvent:string} = null;
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
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this.width = 530;
		this.height = 163
		this._itemData = data;
		this._itemParam = itemParam;

		
		let innerbg = BaseBitmap.create("public_listbg3");
		innerbg.width = this.width;
		innerbg.height = this.height;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 

 		let namebg = BaseBitmap.create("accommontask_itemtitlebg");
		namebg.x = 4;
        namebg.y = 10;


		let txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 25;
        txt.y = namebg.y + namebg.height/2 - txt.height/2;
		
		namebg.width =txt.width < 139 ? 239 : txt.width + 100;
		this.addChild(namebg);
		this.addChild(txt);


		let reward = this._itemData.getReward;
		if(this.specialIconId && data.specialGift){
			reward = `${this.specialIconId}_0_${data.specialGift}_${this.uiCode}|` + reward;

		}

		let rewardArr =  GameData.formatRewardItem(reward);
        let itemicon = null;
        let baseWidth = 106;
        let spaceX = 5;
		let scale = 0.8;
        let startX = 15;
        let startY = 50;

		let rewardContainer = new BaseDisplayObjectContainer();
        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
			itemicon.x = i * (baseWidth * scale + spaceX);
			itemicon.y = 2;
            rewardContainer.addChild(itemicon);

		}
		if(rewardArr.length<=4){
			rewardContainer.width = 358;
		}
		rewardContainer.height = baseWidth * scale;

		let scrollReward = ComponentManager.getScrollView(rewardContainer,new egret.Rectangle(0,0,358,90))
		this.addChild(scrollReward);
		scrollReward.setPosition(startX,startY);

		let vo = <AcMerryXmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.getTaskNum(this._itemData.questType);
		let newTaskNum = this._itemData.value;
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""]),22);
		this._countText.x = 520 - this._countText.width/2 - 80;
		this._countText.y = 52;
		this.addChild(this._countText);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.x =460 - 80;
		this._reviceBtn.y = this._countText.y + this._countText.height + 10;
		this.addChild(this._reviceBtn);

		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",this.goBtnClick,this);
		this._goBtn.x = 460- 80;
		this._goBtn.y = this._countText.y + this._countText.height + 10;
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.x = 460- 80;
		this._reviceBM.y = this._countText.y + this._countText.height;
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

		let activityId = this._itemParam.aid + "-" + this._itemParam.code;
		if(this._itemData.progress == 'progress'){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD,{"activeId":activityId,"gid":this._itemData.id});
		}else{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD,{"activeId":activityId,"taskId":this._itemData.id});

		}

	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcMerryXmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
		let cfg = <Config.AcCfg.MerryXmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
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
	}
	/**
	 * 前往的Click
	 */
	private goBtnClick()
	{
		let vo = <AcMerryXmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid,this._itemParam.code);
        if(!vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		let openType = this._itemData.openType;
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
		if(openType == "wife")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
		}
		else if(openType == "child")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
		}
		else if(openType == "search")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		}
		else if(openType == "atkrace")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
		}
		else if(openType == "affair")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
		}
		else if(openType == "recharge")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
	}

	/**
	 * 获得
	 */
	private getTitleStr(type:number):string
	{
		let strTop:string = null;
		let valueStr = String(this._itemData.value);
		if(this._itemData.progress == 'progress'){
			strTop = LanguageManager.getlocal("acChristmasTaskTitleType8",[valueStr]);
		}else{
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
				default:
				{
					App.LogUtil.log("未支持的类型");
				}
			}
		}

		return strTop;
	}
	
	public getSpaceY():number
	{
		return 5;
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