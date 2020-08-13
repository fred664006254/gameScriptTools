/**
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBuffScrollItem
 */
class AllianceTaskBuffScrollItem extends ScrollListItem
{
	private _requsting:boolean = false;
	private _buffId:string;
	private _buyBtn:BaseButton;
	private _curCostV:number = 0;
	private _taskCostTxt:BaseTextField;
	private _taskNameTxt:BaseTextField;
	private _taskDescTxt:BaseTextField
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF),this.buyCallBack,this);

		this._buffId = data;
		let buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
		let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 524;
        bg.height= 125
        bg.x = 3;
        this.addChild(bg);

		let taskIcon = BaseLoadBitmap.create("alliance_taskIcon"+this._buffId);
		taskIcon.width = 88;
        taskIcon.height = 88;
        taskIcon.x = bg.x + 12;
		taskIcon.y = bg.y + bg.height/2 - taskIcon.height/2;
		this.addChild(taskIcon);

		let taskNameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_BROWN);
        taskNameTxt.text = LanguageManager.getlocal("allianceTaskBuffName"+this._buffId);
		taskNameTxt.x = bg.x + 110 ;
		taskNameTxt.y = bg.y + 20;
        this.addChild(taskNameTxt);
		this._taskNameTxt = taskNameTxt;

		let taskDescTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_BROWN);
		this._taskDescTxt = taskDescTxt;
		taskDescTxt.x = taskNameTxt.x
		taskDescTxt.y = taskNameTxt.y + 30;
        this.addChild(taskDescTxt);
		
		let taskCostTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_BROWN);
        this._taskCostTxt = taskCostTxt;
		
		taskCostTxt.x = taskNameTxt.x;
		taskCostTxt.y = taskDescTxt.y + 30;
        this.addChild(taskCostTxt);
		

		let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnBuy",this.buyBtnHandler,this);
        buyBtn.x = bg.x + bg.width - 148;
        buyBtn.y = bg.y + bg.height/2 - buyBtn.height/2;
		this._buyBtn = buyBtn ;
        this.addChild(buyBtn);
		this.refreshBtnStatus();
	}

	protected refreshBtnStatus()
	{
		let buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
		let bnum = Api.allianceTaskVoApi.getBuffBuyTimes(this._buffId);
		let costV = 0;

		let addV = (buffcfg.value * 100);
		if(bnum > 0)
		{
			addV *= bnum ;
			this._taskNameTxt.text = LanguageManager.getlocal("allianceTaskBuffName"+this._buffId) + LanguageManager.getlocal("allianceTask_buffLV",[""+bnum]);
		}

		let addStr = "";
		if(buffcfg.type.length == 1)
		{
			addStr = LanguageManager.getlocal("servantInfo_speciality" + buffcfg.type[0]);
		}else{
			addStr = LanguageManager.getlocal("servantInfo_speciality7");
		}
	    
		if(bnum < buffcfg.costAsset.length){
			costV = buffcfg.costAsset[bnum];
			this._taskDescTxt.text = LanguageManager.getlocal("allianceTaskBuffDesc",[addStr,(addV).toFixed(1)]);
			this._taskCostTxt.text = LanguageManager.getlocal("allianceTaskBuffCost",[""+costV]);
		}else{
			costV = buffcfg.costAsset[buffcfg.costAsset.length -1];
			// this._taskDescTxt.text = LanguageManager.getlocal("allianceTask_buffTopLv");
			this._taskDescTxt.text = LanguageManager.getlocal("allianceTaskBuffDesc",[addStr,(addV).toFixed(1)]);
			this._taskCostTxt.text = LanguageManager.getlocal("allianceTaskBuffCost2");
		}
		this._curCostV = costV;
			
		let curId = Api.allianceTaskVoApi.getCurrentBuffId();
		let po = Api.allianceVoApi.getMyAllianceVo().po;
		if(po > 2 || (curId && curId!= this._buffId))
		{
			App.DisplayUtil.changeToGray(this._buyBtn);
			// this._buyBtn.setEnable(false);
		}else{
			App.DisplayUtil.changeToNormal(this._buyBtn);
			// this._buyBtn.setEnable(true);
		}
	}
	protected buyCallBack(event:egret.Event)
	{
		if (event && event.data && !event.data.ret && event.data.data){
			if(this._requsting)
			{
				let ret = event.data.data.ret;
				if(ret == 0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskBuffBuyTip2"));
				}else{
					App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
				}
			}
		}
		this.refreshBtnStatus();
		this._requsting = false;
	}
	protected buyBtnHandler()
	{
		let curId = Api.allianceTaskVoApi.getCurrentBuffId();
		if(curId && curId!= this._buffId){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_buyBuffTip2"));
			return;
		}
		if(this._curCostV > Api.allianceVoApi.getAllianceVo().wealth)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnTip1"));
			return;
		}
		if(Api.allianceVoApi.getMyAllianceVo().po > 2){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskBuffBuyTip"));
			return;
		}
		let tws = App.DateUtil.getWeeTs(GameData.serverTime);
		if(GameData.serverTime + 1800 >= tws + 86400 )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
			return;
		}

		let buffcfg = Config.AlliancetaskCfg.getAllianceTaskBuffById(this._buffId);
		let bnum = Api.allianceTaskVoApi.getBuffBuyTimes(this._buffId);
		if(bnum >= buffcfg.costAsset.length){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliancetask_buyBuffTip1"));
			return;
		}

		this._requsting = true;
		NetManager.request(NetRequestConst.REQUEST_ALLIANCETASK_BUFF,{buffid:this._buffId});
	}

	public getSpaceY():number
	{
		return 2;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF),this.buyCallBack,this);

		this._buffId = null;
		this._requsting = false;
		this._buyBtn = null;
		this._curCostV = null;
		this._taskCostTxt = null;
		this._taskNameTxt = null;
		this._taskDescTxt = null;

		super.dispose();
	}
}