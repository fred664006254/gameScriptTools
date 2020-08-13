/**
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
class MainTaskPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _rewardContainer:BaseDisplayObjectContainer;
	private _taskId:string;
	private _taskDescTxt:BaseTextField;
	private _taskAimTxt:BaseTextField;
	private _taskNameTxt:BaseTextField;
	private _goBtn:BaseButton;
	private _collectFlag:BaseBitmap;
	private _collectEnable:Boolean;

	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doCollectCallback,this);

		Api.rookieVoApi.checkNextStep();

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg93");
		bg.width = 520;
		bg.height = 310;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg);
		bg.alpha = 0;
		
		let rbg:BaseBitmap = BaseBitmap.create("public_9_bg94");
		rbg.width = bg.width-20;
		rbg.height = 160;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
		this._nodeContainer.addChild(rbg);

		this._rewardContainer = new BaseDisplayObjectContainer();
		this._nodeContainer.addChild(this._rewardContainer);

		
		let deltaY = 33;
		let taskNameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN3);
		taskNameTxt.x = 70;
		taskNameTxt.y = 25;
		this._nodeContainer.addChild(taskNameTxt);
		this._taskNameTxt = taskNameTxt;

		let taskDescTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		taskDescTxt.x = taskNameTxt.x;
		taskDescTxt.y = taskNameTxt.y + deltaY;
		this._nodeContainer.addChild(taskDescTxt);
		this._taskDescTxt = taskDescTxt;

		let taskAimTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		taskAimTxt.x = taskNameTxt.x;
		taskAimTxt.y = taskDescTxt.y + 27;
		this._nodeContainer.addChild(taskAimTxt);
		this._taskAimTxt = taskAimTxt;

		let taskRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskReward"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		taskRewardTxt.x = taskNameTxt.x;
		taskRewardTxt.y = taskAimTxt.y + 27;
		this._nodeContainer.addChild(taskRewardTxt);

		//奖励物资,还有特效
		this._rewardContainer.y = taskRewardTxt.y + deltaY+5;
		this._rewardContainer.x = taskNameTxt.x ;
		rbg.y = this._rewardContainer.y-10;

		let goBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"taskGoBtn",this.goHandler,this);
		goBtn.x = bg.x + bg.width/2 - goBtn.width/2;
		goBtn.y = bg.y + bg.height + 15;
		goBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(goBtn);
		this._goBtn = goBtn;

		this.refreshUIInfo();
		Api.rookieVoApi.checkNextStep();
	}
	
	protected refreshUIInfo()
	{

		this._taskId = Api.mainTaskVoApi.getCurMainTaskId() //this.param.itemId ? this.param.itemId : "101001";
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
		/**
		 * 完成所有的任务，不需要继续刷新
		 */
		if (!this._taskId || !taskCfg)
		{   
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_END);
			this.hide();
			return;
		}
		if(this._collectFlag)
		{
			this._collectFlag.visible = false;
		}
		this._goBtn.visible = true;

	
		let nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt();
		this._taskDescTxt.text = nameAndDesc[1];
		this._taskNameTxt.text = nameAndDesc[0];
		let tarColor = TextFieldConst.COLOR_WARN_RED;
		if (Api.mainTaskVoApi.isCurTaskReach())
		{
			tarColor = TextFieldConst.COLOR_WARN_GREEN4;
		}
		this._taskAimTxt.text = LanguageManager.getlocal( "taskAim",[String(tarColor),String(Api.mainTaskVoApi.getCurMainTaskValue()) + "/"+  String(taskCfg.value)]);

		let rewardArr =  GameData.formatRewardItem(taskCfg.reward);
		this._rewardContainer.removeChildren();
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
			iconItem.x =   index * (iconItem.width+10)+20;
			iconItem.y = 15;
			this._rewardContainer.addChild(iconItem);
		}

		//可领取
		if( Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value)
		{
			this._goBtn.setText("taskCollect");
			this._collectEnable = true; 
		}
		else
		{
			this._goBtn.setText("taskGoBtn")
			this._collectEnable = false; 
		}
	}

	
	protected doCollectCallback(evt : egret.Event):void
	{

		let rData = evt.data;
        if(!rData.ret){
            return;
        }

		//飘奖励，盖章，然后刷新
		this._goBtn.visible = false;

		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
		let rewardList =  GameData.formatRewardItem(taskCfg.reward);
		
		// let list = [];
		// for(let i = 0;i < rewardList.length;i++)
		// {
		// 	let rewardItemVo:RewardItemVo = rewardList[i];
		// 	list.push({"icon":rewardItemVo.icon,"message":rewardItemVo.name + "+" + rewardItemVo.num});
		// }
		App.CommonUtil.playRewardFlyAction(rewardList);
		
		if(this._collectFlag == null)
		{
			this._collectFlag = BaseBitmap.create("collectflag")
			this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
			this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
			this._collectFlag.x = this._goBtn.x + this._collectFlag.anchorOffsetX ;
			this._collectFlag.y = this._goBtn.y + this._collectFlag.anchorOffsetY-30 ;
			this._nodeContainer.addChild(this._collectFlag);
		}
		
		this._collectFlag.setScale(1.3);
		this._collectFlag.visible = true;
		let tmpThis = this;
		egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.8,scaleY:0.8},400).wait(600).call(()=>{
			if(Api.switchVoApi.checkOpenForcedShare()&&this._taskId == "1")
			{
				let shareVo = Api.otherInfoVoApi.getGeneralShareInfo();
				if(shareVo && shareVo.sharenum < Config.GameprojectCfg.rewardAllNum && shareVo.et <= GameData.serverTime)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.SHAREPOPUPVIEW,{"isTask":1});
				}
				
			}
			
			tmpThis.refreshUIInfo();//领取成功之后刷新
		},this);
	}

	//需要针对每个任务处理跳转关系
	protected goHandler()
	{
		if(String(this._taskId)=="1")
		{
			let reportValue:string="mtask_"+this._taskId+"_1";
			StatisticsHelper.reportLoadData(reportValue);
		}
		if( this._collectEnable)
		{
			//请求网络,领取奖励
			NetManager.request(NetRequestConst.REQUEST_TASK_GETMAINTASK,{taskId :this._taskId});
			return
		}
		let cfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId)
		let questType = cfg.questType;
		let cfgValue = cfg.value;
		let openType = cfg.openType;
		Api.mainTaskVoApi.isGoExcuting = true;
		Api.mainTaskVoApi.goExcutingUiName = openType;
		switch (questType) {
			case 105://官品等级----官品等级达到X
				let curLv = Api.playerVoApi.getPlayerLevel()
				let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
				if (Api.playerVoApi.getPlayerExp()  <  nextLvCfg.exp)
				{	
					ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
				}
				else
				{
					PlayerBottomUI.getInstance().show();
				}
				// ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
				break;
			case 107:
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW_TAB2,Api.servantVoApi.getIdOfTotalMax());
				break;
			case 110:

				let _childInfoVoList = Api.childVoApi.getChildrenVoList();
				let _mainTaskHandChoosedChild;
				if (_childInfoVoList[0]) {
					_mainTaskHandChoosedChild = _childInfoVoList[0].id;
					for (var index = 0; index < _childInfoVoList.length; index++) {
						var childVo = _childInfoVoList[index];
						let childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
						if (childVo.level < childCfg.lv) {
							_mainTaskHandChoosedChild = childVo.id;
							break;
						}
					}
				}
				ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW,{childId:_mainTaskHandChoosedChild});
				break;
			case 201://{门客ID}将领达到X级----华安等级达到10级

				let view = ViewController.getInstance().getView(ViewConst.COMMON.SERVANTINFOVIEW);
				if (view)
				{
					view.hide();
					Api.mainTaskVoApi.isGoExcuting = true;
				}

				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW,cfg.need);
				break;
			case 202://升级门客----至少1名门客等级达到40级
				let serView = ViewController.getInstance().getView(ViewConst.COMMON.SERVANTINFOVIEW);
				if (serView){
					serView.hide();
					Api.mainTaskVoApi.isGoExcuting = true;
				}
				let taskServantId = Api.servantVoApi.getMainTaskNeedServant(202);
				if (!taskServantId){
					taskServantId = Api.servantVoApi.getServantMinId();
				}
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, taskServantId);
				break;
			case 204:
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW,Api.servantVoApi.getIdOfTotalMax());
				break;
			case 205:
				let skillSerId = Api.servantVoApi.getMainTaskNeedServant(205);
				if (skillSerId){
					ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW,skillSerId);
				}
				else{
					ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
				}
				break;
			case 206:
				let serId = Api.servantVoApi.getMainTaskNeedServant(206);
				if (!serId){
					ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
				}
				else{
					ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW,serId);
				}
				break;
			// case 301://随机传唤次数----随机传唤X次
			// 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
			// 	break;
			case 302://宠幸红颜次数----宠幸红颜次数达到X次 
			case 305://红颜技能
				ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id:Api.wifeVoApi.getMainTaskIntimacyMax(),handler:null});
				break;
			case 306://赏赐红颜
				ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id:Api.wifeVoApi.getIdOfIntimacyMax(),handler:null});
				break;
			default:
			
				let openType = cfg.openType
				if(openType == "alliance")
				{
					Api.allianceVoApi.openMainView();
				}else if(openType == "studyatk")
				{
					Api.studyatkVoApi.openMainView();
				}else if(openType == "welfare")
				{
					ViewController.getInstance().openView("WelfareView|" + cfg.openNeed)
				}else if(openType == "level" || openType == "arrival" || openType == "" )
				{
					PlayerBottomUI.getInstance().show();
				}else if (openType == "rank"){
					ViewController.getInstance().openView(ViewConst.COMMON.RANKSINGLEVIEW);
				}else
				{
					let viewName = App.StringUtil.firstCharToUper(openType) ;
					if (Api.switchVoApi.checkNewPalace() && viewName == "Palace") {
						viewName = "PalaceNew";
					}
					if (egret.getDefinitionByName(viewName + "View"))
					{

						ViewController.getInstance().openView(viewName+ "View", {isMainTask: 1});

					}else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
					{
						ViewController.getInstance().openView(viewName + "PopupView");
					}
				}
				break;
		}
		this.hide();
	}

	protected closeHandler():void
	{
		if(String(this._taskId)=="1")
		{
			let reportValue:string="mtask_"+this._taskId+"_0";
			StatisticsHelper.reportLoadData(reportValue);
		}
		this.hide();
	}



	protected getBgExtraHeight():number
	{
		return 30;
	}


	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doCollectCallback,this);
		this._nodeContainer = null;
		this._rewardContainer = null;
		this._taskId = null;
		this._taskDescTxt  = null;
		this._taskAimTxt  = null;
		this._taskNameTxt  = null;
		this._goBtn  = null;
		this._collectEnable  = false;
		this._collectFlag = null;

		super.dispose();
	}
}