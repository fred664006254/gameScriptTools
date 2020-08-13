/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 端午活动 节日任务itemrender
 */
class PlayerReturnViewTab2ScrollItem  extends ScrollListItem
{
 
	private _data = null; 
	private _lqBtn : BaseButton = null;
	private _lqImg : BaseBitmap = null;
	private _goBtn : BaseButton = null; 
	private _needTxt : BaseTextField = null;

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}
	private get cfg(){
        return Config.PlayerreturnCfg;
    }

    private get api(){
        return Api.playerReturnVoApi;
    }
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
		let view = this;
        view._code = itemparam;
		view.width = 608;
		view.height = 165 + 10;
		view._data = data;
		view._curIdx = index;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let wordsBg : BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height - 10; 
		view.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, view);
		view.addChild(wordsBg); 

		let topbg : BaseBitmap = BaseBitmap.create("acmidautumnview_titlebg");  
		view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, wordsBg, [0,5]);
		view.addChild(topbg); 

		let line : BaseBitmap = BaseBitmap.create("public_line3");  
		line.width = 466;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, topbg);
		view.addChild(line); 

				
		let datTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		if(data.questType==1)
		{
			datTxt.text =LanguageManager.getlocal("acSpringceleBrationLand1",[data.value+""]);
		}
		else if(data.questType==2)
		{
			datTxt.text =LanguageManager.getlocal("acSpringceleBrationquestType2",[data.value+""]);
		}
		else
		{
			datTxt.text =LanguageManager.getlocal("acSpringceleBrationquestType"+data.questType,[data.value+""]); 
		}
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datTxt, line);
		view.addChild(datTxt); 

		//创建奖励列表
		let rewardArr : Array<RewardItemVo> = GameData.formatRewardItem(`${data.getReward}`);
		let scroStartY = 45;
		let tmpX = 15;
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,false);
			iconItem.setScale(0.9);
			iconItem.x = tmpX;
			iconItem.y = scroStartY;
			tmpX += (iconItem.width * iconItem.scaleX + 10);
			if (tmpX > (15 + 4 * 108 * iconItem.scaleX + 4 * 10))
			{
				tmpX = 15;
				scroStartY += iconItem.height * iconItem.scaleY + 10;
				iconItem.x = tmpX;
				iconItem.y = scroStartY;
				tmpX += (iconItem.width * iconItem.scaleX + 10);
			}
			view.addChild(iconItem);
		}
		scroStartY += (108 * 0.9);
        wordsBg.height = scroStartY + 10;
		view.height = wordsBg.height;

		//当前进度（0／1）
		let jinduTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		jinduTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]);
		if(data.questType==1){	
			jinduTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]); 
		}
		view.setLayoutPosition(LayoutConst.righttop, jinduTxt, view, [70,50]);
		view.addChild(jinduTxt);
		view._needTxt = jinduTxt;

		//领取
		let lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.collectHandler, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, lqBtn, jinduTxt, [0, jinduTxt.textHeight + 10]);
		view.addChild(lqBtn);
		view._lqBtn = lqBtn;

		let lqimg = BaseBitmap.create(`signin_had_get`);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
		view.addChild(lqimg);
		view._lqImg = lqimg;

		//前往
		view._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",view.collectHandler,view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view._goBtn, lqBtn);
		view._goBtn.visible =false;
		view.addChild(view._goBtn);
		view.update();
		if(!view.api.isInActTime()){
			lqBtn.setEnable(false);
			view._goBtn.setEnable(false);
		}
	} 

	private collectHandler(evt:egret.TouchEvent):void
	{
		let view = this;
		let api = view.api; 
		if(!api)
		{
			return;
		}
		let taskNum = api.getTask(view._data.questType);
		// if(vo.isStart==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	return;
		// }   
		if(view.api.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(taskNum >= view._data.value)
		{	
			view.api.setClickIdx(view._curIdx);
			NetManager.request(NetRequestConst.REBACK_GETTASKREWARD,{
				"keyid" : view._data.key
			});
			// PlayerReturnViewTab2ScrollItem._lastReqIdx = this._curIdx;
    		// PlayerReturnViewTab2ScrollItem._lastPos = this._needTxt.localToGlobal(this._needTxt.width, 20);
			// NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBTASK,{"activeId":this.acTivityId, "taskId":""+this._data.key});
		} 
		else
		{	
			if(view._data.questType==2)
			{
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
				return; 
			}

			if(!view._data.openType)
			{
				return; 
			}

			let openType = this._data.openType;
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

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		// let rData = event.data.data.data;
		// if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
        // if ( PlayerReturnViewTab2ScrollItem._lastReqIdx != this._curIdx)
        // {
        //     return;
        // }
        // PlayerReturnViewTab2ScrollItem._lastReqIdx = null;
        // this.update();
		// let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos = PlayerReturnViewTab2ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

	public update():void
	{	
		let view = this;
		let api = view.api; 
		if(!api){
			return;
		}

		let taskNum = api.getTask(view._data.questType);
		if(view._needTxt){	
			if(taskNum >= view._data.value)
			{
				view._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[taskNum+"",view._data.value+""]); 
			}
			else
			{
				view._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2",[taskNum+"",view._data.value+""]); 
			}
			view.setLayoutPosition(LayoutConst.righttop, view._needTxt, view, [70,50]);
		}
		
		if(view._lqBtn){
			if(taskNum >= view._data.value){	
				view._lqImg.visible = view.api.isGetTaskReward(view._data.key);
				view._goBtn.visible = false;
				view._lqBtn.visible = view._needTxt.visible = !view._lqImg.visible;
			}
			else{	
				view._needTxt.visible = true;
				view._lqImg.visible = false;
				view._lqBtn.visible = view._data.questType == 1;
				view._goBtn.visible = !view._lqBtn.visible;
				view._lqBtn.setGray(true);
			} 
		}
	} 
   

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		let view = this;
		view._lqBtn = null;
		view._lqImg = null;
		view._goBtn = null; 
		view._needTxt = null;
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBTASK),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}