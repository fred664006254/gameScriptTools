
/**
 * author yanyuling
 */
class AcFlipCardTaskScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _collectFlag:BaseBitmap;
    private _collectBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
   
    private _totalVo:AcFlipCardVo = undefined;
    private _goBtn:BaseButton;
    private _taskTxt:BaseTextField;
    private _taskValueTxt:BaseTextField;

    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {

        this._uiData = data;
        this._curIdx = index;
        this._totalVo = <AcFlipCardVo>Api.acVoApi.getActivityVoByAidAndCode("flipCard");
        let cfgObj = this._totalVo.config;

        let bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 246;
        this.addChild(bg);

        let namebg = BaseBitmap.create("acchristmasview_1_red");
		namebg.x = 3;
        namebg.y = 5;

        this._taskTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._taskTxt.text = this.getTitleStr();
        this._taskTxt.x = namebg.x+ 10;
        this._taskTxt.name = "Txt1";
        this._taskTxt.y = namebg.y + namebg.height/2 - this._taskTxt.height/2;
        

		namebg.width = this._taskTxt.width < 139 ? 239 : this._taskTxt.width + 100;
		this.addChild(namebg);
        this.addChild(this._taskTxt);
		

        let rewardArr =  GameData.formatRewardItem(this._uiData.getReward);
		let scroStartY = namebg.y + namebg.height + 15;
        let tmpX = 10;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = 20;
                scroStartY += iconItem.height*0.8 + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width* iconItem.scaleX+7);
            }
			this.addChild(iconItem);
		}
        scroStartY += 90;
        bg.height = scroStartY + 10;
        this.height = bg.height+5;

        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
        this._collectBtn.x = bg.x + bg.width - 145;
        this._collectBtn.y = bg.y + bg.height/2 - this._collectBtn.height * this._collectBtn.scaleY / 2 ;
        this.addChild(this._collectBtn);

        this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"taskGoBtn",this.goHandler,this);
        this._goBtn.x = this._collectBtn.x;
        this._goBtn.y = this._collectBtn.y;
        this.addChild(this._goBtn);
        this._goBtn.visible = (this._uiData.openType && this._uiData.openType != "") ;

        this._taskValueTxt =  ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        this._taskValueTxt.text = "0";
        this._taskValueTxt.x = this._collectBtn.x+ this._collectBtn.width/2;
        this._taskValueTxt.y = this._goBtn.y -25;
        this.addChild(this._taskValueTxt);

        this.refreshBtnStatus();
    }
    protected goHandler()
    {
         let openType = this._uiData.openType;
        let viewName = App.StringUtil.firstCharToUper(openType) ;

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

    protected collectHandler()
    {

		let openType = this._uiData.openType;
		//任务进度
		let taskNum = this._totalVo.gettTaskNum(this._uiData.questType);
		let newTaskNum = this._uiData.value;
        if(taskNum < newTaskNum){
           return
        }else{
            this.doRequest()
        }
    }

    private doRequest()
    {
        if(!this._totalVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,this.refreshUI,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,{activeId:this._totalVo.aidAndCode,taskId:this._uiData.id})
    }

    protected refreshBtnStatus()
    {   
		let cfg = <Config.AcCfg.FlipCardCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._totalVo.aid, this._totalVo.code);
		let openType = this._uiData.openType;
		//任务进度
		let taskNum = this._totalVo.gettTaskNum(this._uiData.questType);
		let newTaskNum = this._uiData.value;
        this._taskValueTxt.text =  taskNum + "/"+newTaskNum;
        this._taskValueTxt.anchorOffsetX = this._taskValueTxt.width/2;

		if(openType){	
			if(taskNum >= newTaskNum){
				this._goBtn.setVisible(false);
				this._collectBtn.setVisible(true);
			}else{
				this._goBtn.setVisible(true);
				this._collectBtn.setVisible(false);
			}
		}else{
			this._goBtn.setVisible(false);
			this._collectBtn.setVisible(true);
			if(taskNum >= newTaskNum){
				this._collectBtn.setEnable(true);
			}else{
				this._collectBtn.setEnable(false);
			}
		}

        if(this._totalVo.getTaskStatus( "" + (this._uiData.id) )){
			this._goBtn.setVisible(false);
			this._collectBtn.setVisible(false);
			this.createCollectFlag();
            this._taskValueTxt.text = "";
		}else{
		}
       
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
            this.addChild(this._collectFlag);
        }
    }


    protected refreshUI(event:egret.Event)
    {         
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,this.refreshUI,this);
        if(event){
			if(event.data&&event.data.ret){
                let data = event.data.data.data;
                let rewards = data.rewards;
                let cfrewards = data.cfrewards;
                let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);

                if(rewards != cfrewards){
                    let rewardItemvo:RewardItemVo[] = GameData.formatRewardItem(cfrewards);
                    for (var index = 0; index < rewardItemvo.length; index++) {
                        var element = rewardItemvo[index];
                        if(element.type == 8){
                            let sercfg = Config.ServantCfg.getServantItemById(element.id);
                            if(sercfg.exchange){
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":sercfg.name,"touch":sercfg.exchange,"message":"changeOtherRewardTip"});
                                break;
                            }
                        }else if(element.type == 10) {
                            let wifecfg = Config.WifeCfg.getWifeCfgById(element.id);
                            if(wifecfg.exchange){
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":wifecfg.name,"touch":wifecfg.exchange,"message":"changeOtherRewardTip"});
                                break;
                            }
                        }
                    }
                }

                let colflag = this._totalVo.getTaskStatus("" + (this._uiData.id));
                this._collectBtn.visible = (colflag == null);
                /**
                 * 展示已领取
                 */
                if (!this._collectFlag && colflag){
                    this.createCollectFlag();
                    this._collectFlag.visible = false;
                    this._collectFlag.setScale(1.3);
                    this._collectFlag.visible = true;
                    egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:1,scaleY:1},300);
                }
                this.refreshBtnStatus();
			}
		}
    }
    
	private getTitleStr():string
	{
		let strTop:string = null;
		let valueStr = String(this._uiData.value);
		switch(Number(this._uiData.questType))
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
		return strTop;
	}

    public getSpaceX():number
	{
		return 10;
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
        this._uiData = null;
        this._collectFlag = null;
        this._collectBtn = null;
        this._curIdx = 0;
        this._lastReqIdx  = null;
        this._totalVo = null;
        this._goBtn = null;
        this._taskTxt = null;
        this._taskValueTxt = null;

        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,this.refreshUI,this);

        super.dispose();
    }
}
