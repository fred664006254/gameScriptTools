class AcJadeViewTaskScrollItem extends ScrollListItem
{
	private _itemData:Config.AcCfg.JadeTaskItemCfg = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	private _progress:ProgressBar = null;
	public constructor() 
	{
		super();
	}
	private get cfg()
	{
		return <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);

	}

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this._itemData = data;
		this._aidAndCode = itemParam;
		// this.width = 608;
		// this.height = 185;
		
		let innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 

 		let line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 260
        // line1.x = this.width/2 - line1.width/2;
        line1.y = 30-line1.height/2;


		let txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        txt.x = this.width / 2 - txt.width/2;
        txt.textAlign ="center";
        txt.y = 30 - txt.height/2;
		
		line1.width =txt.width < 160 ? 260 : txt.width + 100;
		line1.x = this.width/2 - line1.width/2;
		this.addChild(line1);
		this.addChild(txt);

		if(this._itemData.getReward.indexOf(`21_0001`) == -1){
			this._itemData.getReward = (`21_0001_${this.cfg.getTaskList()[index].jadeGet}_${this._aidAndCode.code}|`) + this._itemData.getReward;
		}


		let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);

        let itemicon = null;
        let baseWidth = 106;
        let baseHeight = 106;
        let spaceX = 10;
        let spaceY = 10;
        let startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        let startY = 55;
        let lastY = 0;

        for(let i = 0; i < rewardArr.length; i++)
        {
            itemicon = GameData.getItemIcon(rewardArr[i],true,false);
            itemicon.x = startX + (i % 5) * (baseWidth + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if(i == rewardArr.length-1){
                lastY = itemicon.y;
            }
        }

		this._progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",400);
        this._progress.setPosition(20,lastY + baseHeight + 10);
        this.addChild(this._progress);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.x =460;
		this._reviceBtn.y = this._progress.y-5;
		this.addChild(this._reviceBtn);
		
		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",this.goBtnClick,this);
		this._goBtn.x = 460;
		this._goBtn.y = this._progress.y-5;
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.x = 480;
		this._reviceBM.y = this._progress.y-25;
		this.addChild(this._reviceBM);

       	innerbg.height = this._progress.y + this._progress.height + 45;
		this.height = innerbg.height;

		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let vo = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid,this._aidAndCode.code);
        let deltaT = vo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code



		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA,{"activeId":activityId,"taskId":this._itemData.id});
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
		
		this._progress.setText(taskNum + "/" + newTaskNum);
		this._progress.setPercentage(taskNum / newTaskNum);
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
		this._aidAndCode = null;
		this._reviceBtn = null;
		this._goBtn = null;
		this._reviceBM = null;
		this._progress = null;
		super.dispose();
	}
}