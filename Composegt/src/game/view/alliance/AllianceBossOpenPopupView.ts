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

	public constructor() 
	{
		super();
	}
	public initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bossName = LanguageManager.getlocal("allianceBoss_monsterName"+this.param.data);
		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossOpen_tip",[bossName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._topTipTF.x = 50;
		this._topTipTF.y = 20;
		this._nodeContainer.addChild(this._topTipTF);
		
		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 520;
        bg1.height = 280;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = this._topTipTF.x + 20;
        this._nodeContainer.addChild(bg1);

		let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this.param.data);
		let txtCfg=[
			{
				iconStr:"1_0_0",
				txt1:LanguageManager.getlocal("allianceBossOpen_txt1"),
				txt2:LanguageManager.getlocal("allianceBossOpen_txt2",[String(bossCfg.needAsset)]),
				txt3:LanguageManager.getlocal("allianceBossOpen_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
			},
			{
				iconStr:"1_0_0",
				txt1:LanguageManager.getlocal("allianceBossOpen_txt4"),
				txt2:LanguageManager.getlocal("allianceBossOpen_txt5",[String(bossCfg.needGem)]),
				txt3:LanguageManager.getlocal("allianceBossOpen_txt6",[String(Api.playerVoApi.getPlayerGem())]),
			},
		]

		let startX =  bg1.x +  10;
		let startY = bg1.y + 10;
		for (var index = 0; index < txtCfg.length; index++) {
			let element = txtCfg[index];

			let bg = BaseBitmap.create("public_tc_bg03");
			bg.width = 500;
			bg.height = 126;
			bg.y = startY;
			bg.x = startX;
			this._nodeContainer.addChild(bg);
			startY += bg.height+10;

			let icon = GameData.getRewardItemIcons(element.iconStr)[0];
			icon.x = bg.x+15;
			icon.y = bg.y+10;
			this._nodeContainer.addChild(icon);

			let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"useBtn",this.openBtnHandler,this,[index+1]);
			openBtn.x = bg.x + bg.width -openBtn.width - 20;
			openBtn.y = bg.y + bg.height/2 -openBtn.height/2;
			this._nodeContainer.addChild(openBtn);

			let tmpX = icon.x + icon.width + 10;
			let tmpY= icon.y + 10;
			for (var index2 = 1; index2 <= 3; index2++) {
				let txt = ComponentManager.getTextField(element["txt"+index2],20);
				txt.setColor(TextFieldConst.COLOR_BROWN);
				txt.x = tmpX;
				txt.y = tmpY;
				tmpY += txt.height + 15;
				this._nodeContainer.addChild(txt);
				if(index2 == 2)
				{
					if(index == 0 && bossCfg.needAsset > Api.allianceVoApi.getAllianceVo().wealth)
					{
						txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1",[String(bossCfg.needAsset)]);
					}
					if(index == 1 && bossCfg.needGem > Api.playerVoApi.getPlayerGem())
					{
						txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1",[String(bossCfg.needGem)]);
					}
				}
			}
		}
	}

	protected openBtnHandlerCallBack(event:egret.Event)
	{
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
		let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this.param.data )

		if(params == 1)
		{
			if(myAllVo.po > 2)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
				return;
			}
			if(allVo.wealth < bossCfg.needAsset)
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

			if(Api.playerVoApi.getPlayerGem() < bossCfg.needGem)
			{				
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
				return;
			}
		}
		AllianceBossPopupView.bossType=this.param.data
		NetManager.request(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS,{bossId:this.param.data, openType:params});
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

		super.dispose();
	}
}