/**
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskDetailScrollItem
 */
class AllianceTaskDetailScrollItem extends BaseDisplayObjectContainer// 
{
	private _servantId:string;
	private _nodeContainer:BaseDisplayObjectContainer;
	private _selectedBox:BaseBitmap;
    private _statusTxt:BaseTextField;
    private _taskId:string;
	public constructor() 
	{
		super();
	}

	public initItem(data:any,taskId:string,isAni:boolean=false):void
	{
        let deltaScaleV = 0.8;
        if(!isAni){
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_SERVANT,this.refreshTaskSelHandler,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.refreshSerPkStr,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA),this.refreshSerPkStr,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_RESET_SERVANT,this.refreshSerPkStr,this);
        }
		 //门客配置id
        this._servantId= data;
        this._taskId = taskId;
        //门客相关信息
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        let tmpCfg =Config.ServantCfg.getServantItemById(this._servantId); 
              
        this._nodeContainer = new BaseDisplayObjectContainer()
		this.addChild(this._nodeContainer);
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194 ; 
        cardbg.height = 192; 
        cardbg.name = "cardbg";
        cardbg.setScale(deltaScaleV);
		this._nodeContainer.addChild(cardbg);
        cardbg.touchEnabled = true;
        this.width = cardbg.width * deltaScaleV;
        this.height = cardbg.height * deltaScaleV;

        this._selectedBox = BaseBitmap.create("servant_cardbg_selected");
        this._selectedBox.setScale( deltaScaleV);
        this._selectedBox.x = cardbg.width/2 *deltaScaleV -  this._selectedBox.width/2  *deltaScaleV;
        this._selectedBox.y = cardbg.height/2 *deltaScaleV -  this._selectedBox.height/2 *deltaScaleV;
        this._selectedBox.visible = false;        
        if( this._servantId == Api.allianceTaskVoApi.getAllianceTaskSelectedServantId() ){
            this._selectedBox.visible = true;   
        }
		this._nodeContainer.addChild(this._selectedBox);
        this.addTouch(this.eventHandler,this,null,true);
        
        let servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath );
        servantImg.width = 180*deltaScaleV;
        servantImg.height = 177*deltaScaleV;
        // servantImg.setScale(deltaScaleV );
        servantImg.x = cardbg.x + cardbg.width/2*deltaScaleV -servantImg.width/2  ;
        servantImg.y = cardbg.y+ cardbg.height/2*deltaScaleV -servantImg.height/2 -2;
        this._nodeContainer.addChild(servantImg);

        if (servantInfoObj.isServantExile()) {
            let exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setScale(deltaScaleV);
            exileBM.setPosition(cardbg.x + cardbg.width * deltaScaleV - exileBM.width * deltaScaleV, cardbg.y);
            this._nodeContainer.addChild(exileBM);
        }

		 let lvBg = BaseBitmap.create("servant_lvbg");
        lvBg.x = 5;
        lvBg.y = 5;
        this._nodeContainer.addChild(lvBg);

        let lvTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        lvTxt.text = LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
        lvTxt.x = 17;
        lvTxt.y = lvBg.y + lvBg.height/2 - lvTxt.height/2;
        this._nodeContainer.addChild( lvTxt);
        
		let statusTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
        this._statusTxt = statusTxt;
        statusTxt.x = cardbg.x + cardbg.width/2 *deltaScaleV;
        statusTxt.y = cardbg.y+ cardbg.height *deltaScaleV - 35;
        this._nodeContainer.addChild( statusTxt);
        
        let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        let protype = taskcfg.type;
        let proTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        let limitlessTaskId = Api.allianceTaskVoApi.getLimitlessTaskId();
		if (limitlessTaskId == this._taskId){
			proTxt.text = LanguageManager.getlocal("servantInfo_speciality7") + App.StringUtil.changeIntToText(Api.servantVoApi.getServantProByType(this._servantId, 0)) ;
        }
        else{
            proTxt.text = LanguageManager.getlocal("servantInfo_speciality" + protype) + App.StringUtil.changeIntToText(Api.servantVoApi.getServantProByType(this._servantId,protype)) ;
        }
        proTxt.x = cardbg.x + cardbg.width/2 *deltaScaleV-proTxt.width/2;
        proTxt.y = cardbg.y+ cardbg.height *deltaScaleV + 2;
        this._nodeContainer.addChild( proTxt);

        this.setScale(deltaScaleV);
        if(!isAni){
            this.refreshSerPkStr();
        }
	}

    public getSerid()
    {
        return this._servantId;
    }
    public getPkTimes()
    {
        return Api.allianceVoApi.getAllianceTaskPKTimes(this._servantId);;
    }
    protected refreshSerPkStr()
    {
        let pkt = this.getPkTimes();
        let mask:BaseLoadBitmap = <BaseLoadBitmap>this._nodeContainer.getChildByName("mask");
        if(pkt >= 1 )
        {
            this._statusTxt.text =  LanguageManager.getlocal("allianceTaskSendBtnTxt"+pkt);
            this._statusTxt.anchorOffsetX = this._statusTxt.width/2;
            if(pkt == 2){
                this._statusTxt.textColor = TextFieldConst.COLOR_QUALITY_RED;
            }else{
                this._statusTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            }
            if(!mask){
                mask = BaseLoadBitmap.create( "servant_card_mask");
                mask.setScale(this.scaleX);
                mask.name = "mask";
                this._nodeContainer.addChildAt(mask,3);
            }
            mask.visible = true;
        }else{
            this._statusTxt.text = "";
            this._statusTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            if(mask)
            {
                mask.visible = false;
            }
        }
    }

    public setMaskVisible(isvisible:boolean)
    {
        if(this._nodeContainer.getChildByName("mask"))
        {
            this._nodeContainer.getChildByName("mask").visible = isvisible;
        }
    }
	protected eventHandler(event:egret.TouchEvent)
    {
        if(this._selectedBox.visible)
        {
            return;
        }
        if (event)
        {
            Api.allianceTaskVoApi.setAllianceTaskSelectedServantId(this._servantId);
        }
        
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TASK_SERVANT)
    }

    protected doRecoverHander()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TASK_BUY_AND_SEND);
    }
    protected refreshTaskSelHandler()
    {
        if(this._servantId == Api.allianceTaskVoApi.getAllianceTaskSelectedServantId() )   
        {
            this._selectedBox.visible = true;
        }else{
            this._selectedBox.visible = false;
        }
    }
	protected buyBtnHandler()
	{

	}

	public getSpaceY():number
	{
		return 2;
	}

	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_SERVANT,this.refreshTaskSelHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT),this.refreshSerPkStr,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_EXTRA),this.refreshSerPkStr,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_TASK_RESET_SERVANT,this.refreshSerPkStr,this);

        this._servantId = "";
        this._nodeContainer = null;;
        this._selectedBox = null;;
        this._statusTxt = null;;
        this._taskId = null;
		super.dispose();
	}
}