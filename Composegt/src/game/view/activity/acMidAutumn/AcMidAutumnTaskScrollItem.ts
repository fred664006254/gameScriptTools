/**
  * 中秋活动的任务item
  * author 张朝阳
  * date 2018/8/29
  * @class AcMidAutumnTaskScrollItem
  */
class AcMidAutumnTaskScrollItem extends ScrollListItem
{
	private _itemData:Config.AcCfg.MidAutumnTaskItemCfg = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	private _taskValueTxt:BaseTextField;
	public constructor() 
	{
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this._itemData = data;
		this._aidAndCode = itemParam;
		this.width = 608;
		this.height = 185;
		
        let itembg = BaseBitmap.create("activity_db_01");
        itembg.width = this.width;
        itembg.height = this.height-5;
        this.addChild(itembg);

		let listbg = BaseBitmap.create("public_listshotbg");
        listbg.width = this.width;
        listbg.height = 125;
		listbg.y =itembg.y+40;
        this.addChild(listbg); 

		let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2 ,itembg.y + 5);
		this.addChild(titleBg);
		titleBg.visible =false;

		let titleTF = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2,titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine:BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2,titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);
		for(let i = 0;i < rewardArr.length;i++)
		{

			let rewardItem = GameData.getItemIcon(rewardArr[i],true);
			rewardItem.setScale(0.95);
			rewardItem.setPosition(20 + (rewardItem.width + 8) * i,titleBg.y + titleBg.height + 10);
			this.addChild(rewardItem);
		}

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this);
	 	this.addChild(this._reviceBtn);
		this.setLayoutPosition(LayoutConst.verticalCenter,this._reviceBtn,listbg);
		this._reviceBtn.x =460;
	
		
		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",this.goBtnClick,this);
	 	this.addChild(this._goBtn);
		this.setLayoutPosition(LayoutConst.verticalCenter,this._goBtn,listbg,[460,0]);
		this._goBtn.x = 460;

		this._reviceBM = BaseBitmap.create("collectflag");
		this.addChild(this._reviceBM);
		this.setLayoutPosition(LayoutConst.verticalCenter,this._reviceBM,listbg);
		this._reviceBM.x = 460;

		this._taskValueTxt =  ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        this._taskValueTxt.text = "0";
        this._taskValueTxt.x = this._reviceBtn.x+ this._reviceBtn.width/2;
        this._taskValueTxt.y = this._goBtn.y -25;
        this.addChild(this._taskValueTxt);

		this.refreshView();


	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code
		NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB,{"activeId":activityId,"taskId":this._itemData.id});
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.gettTaskNum(this._itemData.questType);
		
		let newTaskNum = this._itemData.value;


        this._taskValueTxt.text =  taskNum + "/"+newTaskNum;
        this._taskValueTxt.anchorOffsetX = this._taskValueTxt.width/2;

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
		if(vo.getTaskStatus(this._itemData.id))
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
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType1",[valueStr]);
				break;
			}
			case 2:
			{
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType2",[valueStr]);
				break;
			}
			case 301:
			{	
				if(Api.switchVoApi.checkCloseText())
				{
					strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType3_1",[valueStr]);
				}
				else
				{
					strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType3_2",[valueStr]);
				}
				
				break;
			}
			case 402:
			{
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType4",[valueStr]);
				break;
			}
			case 303:
			{
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType5",[valueStr]);
				break;
			}
			case 601:
			{
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType6",[valueStr]);
				break;
			}
			case 104:
			{
				strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType7",[valueStr]);
				break;
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
		this._taskValueTxt = null;
		this._itemData = null;
		this._goBtn = null;
		this._reviceBtn = null;
		this._reviceBM = null;
		super.dispose();
	}
}