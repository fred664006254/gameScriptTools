/**
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskScrollItem
 */
class DailyTaskScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _collectFlag:BaseBitmap;
    private _collectBtn:BaseButton;
    private _goBtn:BaseButton;
    private _taskId="";
    private _curTaskStatus:number;
    private _lastRequestTaskId:string = null;
    private _achRedDotSp:BaseBitmap = null;
    private _taskAimTxt:BaseTextField;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.collectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.refreshUI,this);

        this._taskId = data;
        let taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
        this. _nodeContainer = new BaseDisplayObjectContainer();
        this.addChild( this. _nodeContainer);

        this.width = 600;
        this.height=148

        let bg = BaseBitmap.create("public_scrollitembg");       
        this._nodeContainer.addChild(bg);

        let iconBg:BaseBitmap = BaseBitmap.create("progress19_bg");
		iconBg.x = 7;
		iconBg.y = bg.height/2-iconBg.height/2;
        this._nodeContainer.addChild(iconBg);
        
        let iconCloud:BaseBitmap = BaseBitmap.create("progress19_cloud");
		iconCloud.x = 30;
		iconCloud.y = iconBg.y+iconBg.height-iconCloud.height;
		this._nodeContainer.addChild(iconCloud);

        let str = "achievementicon_" + taskcfg.icon;
        if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${str}_blueType`)){
            str = `${str}_blueType`;
        }        
		let taskIcon = BaseLoadBitmap.create(str);
		taskIcon.width = 88;
        taskIcon.height = 88;
        taskIcon.x = iconBg.x + iconBg.width/2 - 44;
		taskIcon.y = iconBg.y + iconBg.height/2 - 44;
		this._nodeContainer.addChild(taskIcon);
        
        let iconstr = "achievementname_" + taskcfg.icon;
        if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${iconstr}_blueType`)){
            iconstr = `${iconstr}_blueType`;
        }

        let nameIcon :BaseLoadBitmap = undefined;
        nameIcon =  BaseLoadBitmap.create(iconstr,null,{callback:(container:BaseDisplayObjectContainer)=>{
			if(nameIcon)
			{
				nameIcon.x = iconBg.x + iconBg.width/2 - nameIcon.width/2;
			}
		},callbackThisObj:this,callbackParams:[nameIcon]});
		nameIcon.y = 90;
		this._nodeContainer.addChild(nameIcon);

        let taskNameBg = BaseBitmap.create("public_titlebg");
        taskNameBg.width = 240;
		taskNameBg.x = 140;
		taskNameBg.y = 26;
        this._nodeContainer.addChild(taskNameBg);

        
        let taskNameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        taskNameTxt.text = LanguageManager.getlocal("dailyTaskName"+this._taskId);
        if(PlatformManager.checkIsTextHorizontal())
        {
            taskNameTxt.setPosition( taskNameBg.x + 15,taskIcon.y);
            taskNameBg.width = taskNameTxt.width + 30;
            taskNameBg.setPosition(taskNameTxt.x - 20, taskNameTxt.y - 5);

        }
        else{
            taskNameTxt.x =  taskNameBg.x + 15;
            taskNameTxt.y = taskNameBg.y + taskNameBg.height/2 - taskNameTxt.height/2;
        }

        this._nodeContainer.addChild(taskNameTxt);

        this._taskAimTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_BROWN);
        
        this._taskAimTxt.x = taskNameBg.x + 10;
        this._taskAimTxt.y = taskNameTxt.y + taskNameTxt.height +20;
        this._nodeContainer.addChild(this._taskAimTxt);

      
        var rewardStr = this.splitRewardsString(taskcfg.reward,taskcfg.liveness);
        if(Api.switchVoApi.checkOpenSeat()==false)
        {
            if(this._taskId=="13"||this._taskId=="14")
            { 
               var arr =taskcfg.reward.split("|");
               rewardStr = this.splitRewardsString(arr[0],taskcfg.liveness); 
            }
        }
        let tasRewardTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2 );
        tasRewardTxt.text = LanguageManager.getlocal("dailyTaskReward",[rewardStr]);  
        tasRewardTxt.x = this._taskAimTxt.x;
        tasRewardTxt.y = this._taskAimTxt.y + 30;
        this._nodeContainer.addChild(tasRewardTxt);

        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = iconBg.x + iconBg.width - this._achRedDotSp.width - 20 ;
        this._achRedDotSp.y = iconBg.y + 2;
        this._achRedDotSp.visible = false;
        this._nodeContainer.addChild(this._achRedDotSp);

        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
        this._collectBtn.x = 438;
        this._collectBtn.y = bg.y + bg.height/2 - this._collectBtn.height/2;
        this._collectBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(this._collectBtn);

        this._goBtn =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,"taskGoBtn",this.collectHandler,this);
        this._goBtn.x = this._collectBtn.x
        this._goBtn.y = this._collectBtn.y;
        this._nodeContainer.addChild(this._goBtn);
        /**
         * 0未完成 1已完成 2已领取
         */
        this.refreshUI();    
    }
    
    protected refreshUI()
    {
        let taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
        let FandV:DailyTaskAttrVo = Api.dailytaskVoApi.getTaskFandVByTaskId(this._taskId);
        this._curTaskStatus = Api.dailytaskVoApi.getTaskStatusByTaskId(this._taskId);
        if (FandV)
        {
            this._taskAimTxt.text = LanguageManager.getlocal("dailyTaskAin",[String(FandV.task_v),String(taskcfg.value)])
        }
        else
        {
            this._taskAimTxt.text = LanguageManager.getlocal("dailyTaskAin",["0",String(taskcfg.value)])
        }

        if (this._curTaskStatus < 2)
        {   
            // this._collectBtn.visible = true;
            // this._goBtn.visible = false;
            if (this._curTaskStatus == 0)
            {
                this._collectBtn.updateButtonImage(BaseButton.BTN_STATE3);
                // this._collectBtn.setEnable(false);
                this._achRedDotSp.visible = false;
                this._goBtn.visible = true;
                 this._collectBtn.visible = false;
            }else if (this._curTaskStatus == 1)
            {
                this._achRedDotSp.visible = true;
                this._goBtn.visible = false;
                this._collectBtn.visible = true;
            }
        }
        else
        {
            this._collectBtn.visible = false;
            this._goBtn.visible = false;
            this._achRedDotSp.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(0.7);
        }
    }
    protected splitRewardsString(reward:string,liveness:number)
    {
        let rData = GameData.formatRewardItem(reward);
        let rstr = LanguageManager.getlocal("dailyTask_liveness2",[String(liveness)]) ;
        let len = rData.length;
        let connectStr:string=", ";
        for (var index = 0; index < len; index++) {
            var element:RewardItemVo = rData[index];
            rstr  += connectStr+element.name + "+" + element.num;
        }
        return rstr
    }
    protected createCollectFlag()
    {
        if(!this._collectFlag)
        {
            this._collectFlag = BaseBitmap.create("collectflag")
            this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
            this._collectFlag.x = this._collectBtn.x +  this._collectBtn.width/2 ;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height/2;
            this._nodeContainer.addChild(this._collectFlag);
        }
    }
    
    protected collectHandlerCallBack(event:egret.Event)
    {
        if( this._lastRequestTaskId && this._lastRequestTaskId == this._taskId)
        {
            this._lastRequestTaskId = null;
            //飘奖励，盖章，然后刷新
            this._collectBtn.visible = false;
            let taskCfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
            let rewardList = [
                {
                    icon:"itemicon6",
                    tipMessage:"+" + taskCfg.liveness
                }
            ]
            rewardList.push(GameData.formatRewardItem(taskCfg.reward)[0]);
            if(GameData.formatRewardItem(taskCfg.reward)[1]&&Api.switchVoApi.checkOpenSeat())
            {
                rewardList.push(GameData.formatRewardItem(taskCfg.reward)[1]);
            }
          
            let pos = this._collectBtn.localToGlobal(this._collectBtn.width/2,this._collectBtn.height/2)
            App.CommonUtil.playRewardFlyAction(rewardList,pos);
            this._achRedDotSp.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(1.0);
            this._collectFlag.visible = false;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.75,scaleY:0.75},300);
        }
    }
    protected collectHandler()
    {
        if (this._curTaskStatus == 0)
        {
            let taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
            let openType = taskcfg.openType
            let viewName = App.StringUtil.firstCharToUper(openType) ;
            if(openType == "level" || openType == "arrival" || openType == "")
            {
                PlayerBottomUI.getInstance().show();
            }else if(openType == "welfare")
            {
                ViewController.getInstance().openView("WelfareView|" + taskcfg.openNeed)
            }else
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
                if(openType == "alliance")
                {
                    Api.allianceVoApi.openMainView();
                    return;
                }
                
                if(openType == "studyatk")
				{
					Api.studyatkVoApi.openMainView();
                    return;
				}
                if (taskcfg.questType == 951||taskcfg.questType == 952 ||taskcfg.questType == 961 || taskcfg.questType == 953) {
                    viewName = "Dailyboss";
                }
                if (Api.switchVoApi.checkNewPalace() && viewName == "Palace") {
                    viewName = "PalaceNew";
                }
                if (egret.getDefinitionByName(viewName + "View"))
                {
                    if (taskcfg.questType == 801)
                    {
                        ViewController.getInstance().openView(viewName+ "View|1");
                    }else if (taskcfg.questType == 802){
                        ViewController.getInstance().openView(viewName+ "View|2");
                    }else if (taskcfg.questType == 302){
                        let cfgValue = taskcfg.value;
                        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{cfgValue,handler:null});
                    }
                    else{
                        // if (Api.switchVoApi.checkNewPalace() && viewName == "Palace") {
                        //     viewName = "PalaceNew";
                        // }
                        ViewController.getInstance().openView(viewName+ "View");
                    }
                    
                }

                else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
                {
                    ViewController.getInstance().openView(viewName + "PopupView");
                }
            }
        }else
        {
            this._lastRequestTaskId = this._taskId;
            NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GET,{taskId:this._taskId});
        }
    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET),this.collectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.refreshUI,this);

        this._nodeContainer = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._taskId = null;
        this._lastRequestTaskId = null;
        this._goBtn = null;

        super.dispose();
    }
}