class AcCrossServerPowerCheerViewScrollItem3 extends ScrollListItem
{
    private _aid:string = null;
    private _code:string = null;
	private _data:any= null;
	private _countText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	public constructor() 
	{
		super();
    }
    
	private get aid():string{
        return this._aid;
    }

    private get code():string{
        return this._code;
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	

	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this.width = 620;
        // this.height = 180;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;

		let bg = BaseBitmap.create("public_scrollitembg");
		bg.width = this.width - 20;
		bg.height = 180;
        bg.x = 10;
        this.addChild(bg); 

        let titleBg = BaseBitmap.create("accrosspower_tasktitlebg");
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y + 3;

		let titleStr = LanguageManager.getlocal("taskDesc"+this._data.questType, [""+this._data.value]);
		if (this._data.questType == 1003){
			titleStr = LanguageManager.getlocal("acRecoveryChargeItem", [""+this._data.value]);
		}
		let titleTxt = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 10;
        this.addChild(titleTxt);

		let reward = data.getReward;
		if(data.special1){
			reward = `1054_0_${data.special1}_${this.getUiCode()}`+ "|" +data.getReward;
		}
		let rewardArr =  GameData.formatRewardItem(reward);
        let itemicon = null;
        let baseWidth = 106;
        let spaceX = 5;
		let scale = 0.75;
        let startX = 15;
        let startY = 60;

		let rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 165;
        this.addChild(rewardBg);
		rewardBg.height = baseWidth * scale + 16;
        rewardBg.setPosition(bg.x + 12, startY + 2);

		// rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr)
        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
			itemicon.x = rewardBg.x + 5 + i * (baseWidth * scale + spaceX) + 3;
			itemicon.y = rewardBg.y + 6;
            this.addChild(itemicon);

		}

		let vo = <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		//任务进度
        let taskNum = vo.getTaskNum(this._data.questType);
		let newTaskNum = data.value;
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossserverPowerTaskValue",[taskNum+"",newTaskNum+""]),22);
		this._countText.anchorOffsetX = this._countText.width/2;
		this._countText.x = bg.x + bg.width - 80;
		this._countText.y = 72;
		this.addChild(this._countText);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this,null,null,null,TextFieldConst.COLOR_BLACK);
		this._reviceBtn.x = bg.x + bg.width - this._reviceBtn.width - 10;
		this._reviceBtn.y = bg.y + bg.height - this._reviceBtn.height - 40;
		this.addChild(this._reviceBtn);

		this._goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,"taskGoBtn",this.goBtnClick,this,null,null,null,TextFieldConst.COLOR_BLACK);
		this._goBtn.x = bg.x + bg.width - this._goBtn.width - 10;
		this._goBtn.y = bg.y + bg.height - this._goBtn.height - 40;
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.setScale(0.7);
		this._reviceBM.x = bg.x + bg.width - this._reviceBM.width * 0.7 - 10;
		this._reviceBM.y = bg.y + bg.height - this._reviceBM.height * 0.7 - 20;
        this.addChild(this._reviceBM);
        
		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let vo = <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if(!vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD, {activeId: vo.aidAndCode, rkey: this._data.id});	
    }
    
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.CrossServerPowerCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let openType = this._data.openType;
		//任务进度
		let taskNum = vo.getTaskNum(this._data.questType);
		let newTaskNum = this._data.value;
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
		if(vo.isGetTaskReward(this._data.id))
		{
			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(false);
			this._reviceBM.setVisible(true);
			this._countText.y = 52;
		}
		else
		{
			this._countText.y = 72;
			this._reviceBM.setVisible(false);
		}
		if (!vo.isStart){
			this._reviceBtn.setGray(true);
		}
		if (vo.isInAcPreTime()){
			this._goBtn.setGray(true);
		}
    }
    
	/**
	 * 前往的Click
	 */
	private goBtnClick()
	{
		let vo = <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if(!vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
		}
		if (vo.isInAcPreTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerPowerAcNotStart"));
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
		return 10;
	}
	
	public dispose():void
	{
		this._data = null;
		this._reviceBtn = null;
		this._goBtn = null;
		this._reviceBM = null;
		this._countText = null;
		super.dispose();
	}
}