/**
 * 开启副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossOpenPopupView
 */
class AllianceBossOpenPopupView extends PopupView
{
	// 滑动列表
	private _nodeContainer:BaseDisplayObjectContainer;
	private _topTipTF:BaseTextField;
	private _data:any = null;
	private _isElite:boolean  = false;
	private _needAsset:any = null;
	private _needGem:any = null;
	public constructor() 
	{
		super();
	}
	public initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		this._data = this.param.data;
		if(String(this._data).indexOf("e") >= 0)
		{
			this._isElite = true;
		}
		let bossName = LanguageManager.getlocal("allianceBoss_monsterName"+this._data);
		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip",[bossName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._topTipTF.x = 30+GameData.popupviewOffsetX;
		this._topTipTF.y = 20;
		this._nodeContainer.addChild(this._topTipTF);
		
		let bg1= BaseBitmap.create("public_9_bg4");
        bg1.width = 520;
        bg1.height = 290;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = this._topTipTF.x + 20;
        this._nodeContainer.addChild(bg1);

		if(this._isElite)
		{
			let bossCfg = <Config.AllianceEliteBossItemCfg>Config.AllianceelitebossCfg.getAllianceCfgByLv(this._data);
			this._needAsset = bossCfg.eliteNeedAsset;
			this._needGem =  bossCfg.eliteNeedGem;
			bg1.height = 310;
			let eliteTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip7"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED)
			eliteTF.setPosition(bg1.x + bg1.width / 2 - eliteTF.width / 2,bg1.y + bg1.height - eliteTF.height - 10);
			this._nodeContainer.addChild(eliteTF);
		}
		else
		{
			let bossCfg = <Config.AllianceBossItemCfg>Config.AlliancebossCfg.getAllianceCfgByLv(this._data);
			this._needAsset = bossCfg.needAsset;
			this._needGem =  bossCfg.needGem;
		}
		 
		this._needAsset
		let txtCfg=[
			{
				iconStr:"1_0_0",
				txt1:LanguageManager.getlocal("allianceBossOpen_txt1"),
				txt2:LanguageManager.getlocal("allianceBossOpen_txt2",[String(this._needAsset)]),
				txt3:LanguageManager.getlocal("allianceBossOpen_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
			},
			{
				iconStr:"1_0_0",
				txt1:LanguageManager.getlocal("allianceBossOpen_txt4"),
				txt2:LanguageManager.getlocal("allianceBossOpen_txt5",[String(this._needGem)]),
				txt3:LanguageManager.getlocal("allianceBossOpen_txt6",[String(Api.playerVoApi.getPlayerGem())]),
			},
		]

		let startX =  bg1.x +  10;
		let startY = bg1.y + 10;
		for (var index = 0; index < txtCfg.length; index++) {
			let element = txtCfg[index];

			let bg = BaseBitmap.create("public_9_probiginnerbg");
			bg.width = 500;
			bg.height = 126;
			bg.y = startY;
			bg.x = startX;
			this._nodeContainer.addChild(bg);
			startY += bg.height+10;

			let icon:BaseBitmap|BaseDisplayObjectContainer;
			if(index == 0)
			{
				icon = BaseBitmap.create("allianceview_treasure");
			}
			else
			{
				icon = GameData.getRewardItemIcons(element.iconStr)[0];
			}
			icon.x = bg.x+10;
			icon.y = bg.y+10;
			this._nodeContainer.addChild(icon);
			 
			

			let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"useBtn",this.openBtnHandler,this,[index+1]);
			openBtn.x = bg.x + bg.width -openBtn.width - 20;
			openBtn.y = bg.y + bg.height/2 -openBtn.height/2;
			this._nodeContainer.addChild(openBtn);

			let tmpX = icon.x + icon.width + 10;
			let tmpY= icon.y;
			for (var index2 = 1; index2 <= 3; index2++) {
				let txt = ComponentManager.getTextField(element["txt"+index2],20);
				txt.x = tmpX;
				txt.y = tmpY;
				tmpY += txt.height + 10;
				this._nodeContainer.addChild(txt);
				if(index2 == 2)
				{
					if(index == 0 && this._needAsset > Api.allianceVoApi.getAllianceVo().wealth)
					{
						txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1",[String(this._needAsset)]);
					}
					if(index == 1 && this._needGem > Api.playerVoApi.getPlayerGem())
					{
						txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1",[String(this._needGem)]);
					}
				}
			}
		}
	}

	protected openBtnHandlerCallBack(event:egret.Event)
	{
		if (!event.data.ret){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			this.hide();
			return;
		}
		let rdata = event.data.data;
		if (rdata.data.allianceFlag == 1 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			this.hide();
			return;
		}
		if(rdata.ret == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip6"));
			this.hide();
		}
	}
	protected openBtnHandler(params:any)
	{
		let myAllVo = Api.allianceVoApi.getMyAllianceVo();
		let allVo = Api.allianceVoApi.getAllianceVo();
		// let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._data )

		if(params == 1)
		{
			if(myAllVo.po > 2)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
				return;
			}
			if(allVo.wealth < this._needAsset)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
				return;
			}
		}else
		{
			if(myAllVo.po > 3)
			{				
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip4"));
				return;
			}

			if(Api.playerVoApi.getPlayerGem() < this._needGem)
			{				
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
				return;
			}

			let limitBossId = Api.allianceVoApi.getLimitlessBossId();
			if (String(this._data) == limitBossId && (Api.allianceVoApi.checkLimitlessBossIsEnd() || !Api.allianceVoApi.checkOpenLimitlessBoss())){
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
				return ;
			}
			/**
			 * 元宝消耗确认框
			 */

			let rewardStr = LanguageManager.getlocal("allianceBossOpen_costTip",[""+this._needGem]);
			// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:rewardStr,
				callback:this.doOPenReq,
				handler:this,
				needCancel:true
			});
			return;
		}
		let limitBossId = Api.allianceVoApi.getLimitlessBossId();
		if (String(this._data) == limitBossId && (Api.allianceVoApi.checkLimitlessBossIsEnd() || !Api.allianceVoApi.checkOpenLimitlessBoss())){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
			return ;
		}
		
		this.doOPenReq(params);
	}

	protected doOPenReq(params)
	{
		
		if( typeof(params) != "number" ){
			params =  2;
		}
		
		if(this._isElite)
		{
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS,{bossId:this._data, openType:params,elite:1});
		}
		else
		{
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS,{bossId:this._data, openType:params});
		}
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);

		this._nodeContainer = null;
		this._topTipTF = null;
		this._data = null;
		this._isElite = false;
		this._needAsset = null;
		this._needGem = null;

		super.dispose();
	}
}