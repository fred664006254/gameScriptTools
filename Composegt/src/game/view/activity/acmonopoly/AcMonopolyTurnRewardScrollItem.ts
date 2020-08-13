
/**
 * author yanyuling
 */
class AcMonopolyTurnRewardScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _collectFlag:BaseBitmap;
    private _collectBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
   
    private _totalVo:AcMonopolyVo = undefined;
    private _goBtn:BaseButton;
    private _taskTxt:BaseTextField;
    private _taskValueTxt:BaseTextField;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this._totalVo = <AcMonopolyVo>Api.acVoApi.getActivityVoByAidAndCode("monopoly");
        this._uiData = data;// this._totalVo.config.turnReward[data];

        let bg = BaseBitmap.create("public_listbg");
        bg.width = 620;
        bg.height = 246;
        this.addChild(bg);

        let namebg = BaseBitmap.create("acchristmasview_1_red");
		namebg.x = 3;
        namebg.y = 5;

        this._taskTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._taskTxt.text = LanguageManager.getlocal("acMonopoly_turnreward_txt",["" + this._uiData.id]);
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
        this._collectBtn.y = bg.y + bg.height/2 - this._collectBtn.height * this._collectBtn.scaleY / 2  + 20;
        this.addChild(this._collectBtn);

        this._taskValueTxt =  ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        this._taskValueTxt.text =  (this._totalVo.theturn-1)  +"/"+this._uiData.id  ;
        this._taskValueTxt.x = this._collectBtn.x+ this._collectBtn.width/2 - this._taskValueTxt.width/2;
        this._taskValueTxt.y = this._collectBtn.y -25;
        this.addChild(this._taskValueTxt);

        this.refreshBtnStatus();
    }
   

    protected collectHandler()
    {
        if(!this._totalVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(! this._totalVo.isTurnRewardCollectEnable(this._uiData.id)){
             App.CommonUtil.showTip(LanguageManager.getlocal('acMonopoly_nettip1'));
           return;
        }else{
            this.doRequest()
        }
    }

    private doRequest()
    {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A,this.refreshUI,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A,{activeId:this._totalVo.aidAndCode,turnId:this._uiData.id})
    }

    protected refreshBtnStatus()
    {   
		//任务进度
		let flag = this._totalVo.getTurnFlag(this._uiData.id);
        if(flag){
			this._collectBtn.setVisible(false);
			this.createCollectFlag();
            this._taskValueTxt.text = "";
		}else{
            this._collectBtn.visible = true;
            if(! this._totalVo.isTurnRewardCollectEnable(this._uiData.id)){
                 App.DisplayUtil.changeToGray(this._collectBtn);
             }else{
                 App.DisplayUtil.changeToNormal(this._collectBtn);
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


    protected refreshUI(event:egret.Event)
    {         
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A,this.refreshUI,this);
        if(event){
			if(event.data&&event.data.ret){
                let data = event.data.data.data;
                let rewards = data.rewards;
                let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                this.refreshBtnStatus();
			}
		}
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
        
        super.dispose();
    }
}
