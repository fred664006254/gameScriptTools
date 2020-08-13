/**
 * author yanyuling
 */
class AcXingcunTaskScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _collectFlag:BaseBitmap;
    private _collectBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
   
    private _totalVo:AcXingcunVo = undefined;
    private _goBtn:BaseButton;
    private _taskTxt:BaseTextField;

    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH,this.refreshBtnStatus,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH,this.refreshBtnStatus,this);

        this._uiData = data;
        this._curIdx = index;
        this._totalVo = <AcXingcunVo>Api.acVoApi.getActivityVoByAidAndCode("xingcun");
        let cfgObj = this._totalVo.config;

        let bg = BaseBitmap.create("xingcun_contentbg1");
        bg.width = 560;
        bg.height = 246;
        this.addChild(bg);

        let charge_redBg = BaseBitmap.create("xingcun_titlebg1");
        charge_redBg.x = 15;
        charge_redBg.y = 15;
        this.addChild(charge_redBg);

        
        let Txt0 = ComponentManager.getTextField("",30);
        Txt0.text =LanguageManager.getlocal("xingcun_dayTaskTxt"+(index+1));
        Txt0.x = charge_redBg.x+20;
        Txt0.y = charge_redBg.y + charge_redBg.height/2 - Txt0.height/2;
        this.addChild(Txt0);


        this._taskTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        if(data.questType == 1001){
            this._taskTxt.text =LanguageManager.getlocal("xingcun_dayTask_type"+data.questType);
        }else{
            let num1 = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY,this._uiData.questType);
            this._taskTxt.text =LanguageManager.getlocal("acNewYearquestType"+data.questType,[num1+"",data.value]);
        }
        this._taskTxt.x = Txt0.x+ Txt0.width + 20;
        this._taskTxt.name = "Txt1";
        this._taskTxt.y = charge_redBg.y + charge_redBg.height/2 - this._taskTxt.height/2;
        this.addChild(this._taskTxt);


        // let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(rechargeItem.showGem + "", "recharge_fnt");
		// numLb.x = bg.x + bg.width - 50 - numLb.width/2 ;
		// numLb.y = bg.y + 50;
        // this.addChild(numLb);
		

        let rewardArr =  GameData.formatRewardItem(this._uiData.reward);
		let scroStartY = charge_redBg.y + charge_redBg.height + 15;
        let tmpX = 20;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width+7);
            if (tmpX > bg.width-8)
            {
                tmpX = 20;
                scroStartY += iconItem.height*0.8 + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width+7);
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
        
        let num1 = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY,this._uiData.questType);
        if(num1 < this._uiData.value && AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday && this._uiData.questType != "1001"){
            if(Api.playerVoApi.getPlayerGem() < this._uiData.mendCost){
                App.CommonUtil.showTip(LanguageManager.getlocal("xingcun_dayTask_tip4"));
                return;
            }
            let rewardStr = LanguageManager.getlocal("xingcun_dayTask_tip3",[this._uiData.mendCost]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					msg:rewardStr,
                    callback:this.doRequest,
					handler:this,
					needCancel:true
				});
        }else{
            if (num1 < this._uiData.value){
                App.CommonUtil.showTip(LanguageManager.getlocal("xingcun_dayTask_tip1"));
                return;
            }
            this.doRequest()
        }
    }
    private doRequest()
    {
         let _ftype = 1;
        if(AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday  && this._uiData.questType != "1001"){
            _ftype = 2;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM,{activeId:this._totalVo.aidAndCode,taskId:this._uiData.id,thedays:AcXingcunTaskPopupView.THEDAY,ftype:_ftype})
    }
    protected refreshBtnStatus()
    {
        let tmpVo = this._totalVo;
        if(tmpVo == null )
        {
            return;
        }

        let stat = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY,this._uiData.questType);
       
        if(this._uiData.questType == 1001){
            this._taskTxt.text =LanguageManager.getlocal("xingcun_dayTask_type"+this._uiData.questType);
        }else{
            this._taskTxt.text =LanguageManager.getlocal("acNewYearquestType"+this._uiData.questType,[stat+"",this._uiData.value]);
        }
       
        let colflag = this._totalVo.getCollectFlag(AcXingcunTaskPopupView.THEDAY,this._uiData.id);
        if (colflag){
            this.createCollectFlag();
            this._collectBtn.visible = this._goBtn.visible = false;
        }else{
            if(AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday ){ //&& this._uiData.questType != "1001"
                if(stat >= this._uiData.value){
                     this._collectBtn.setText("xingcunBtnTxt2");
                }else{
                     this._collectBtn.setText("xingcunBtnTxt4");
                }
                this._collectBtn.visible = true;
                this._goBtn.visible = false;
            }else{
                if(stat >= this._uiData.value){
                    this._collectBtn.visible = true;
                    this._goBtn.visible = false;
                }else{
                    this._goBtn.visible = (this._uiData.openType && this._uiData.openType != "") ;
                    this._collectBtn.visible = !this._goBtn.visible ;
                }
            }
            if(this._totalVo.isTaskCollectEnable(AcXingcunTaskPopupView.THEDAY,this._uiData.id)){
                App.CommonUtil.addIconToBDOC(this._collectBtn);
            }else{
                App.CommonUtil.removeIconFromBDOC(this._collectBtn);
            }
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

    protected refreshUI()
    { 
        let colflag = this._totalVo.getCollectFlag(AcXingcunTaskPopupView.THEDAY,this._uiData.id);
        this.getChildByName("collectBtn").visible = (colflag == null);
        
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH,this.refreshBtnStatus,this);
        this._uiData = null;
        this._collectFlag = null;
        this._collectBtn = null;
        this._curIdx = 0;
        this._lastReqIdx  = null;
        this._totalVo = null;
        this._goBtn = null;
        this._taskTxt = null;

        super.dispose();
    }
}
