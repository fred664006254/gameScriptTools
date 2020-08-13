//管家一键事务
//shaoliang 2020.4.22

class WelfareViewHousekeeper extends WelfareViewTab{
	
	private _hasDate:BaseTextField = null;
	private _openText:BaseTextField = null;
	private _openbitmap:BaseButton = null;
	
	public constructor() {
			super();
	}


    protected init():void
    {
		super.init();

		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);

		// let bigframe = BaseLoadBitmap.create("commonview_bigframe");
		// bigframe.height = GameConfig.stageHeigth - 91;
		// bigframe.scaleX = 495/640;
		// this.addChild(bigframe);

		let bg2 = BaseLoadBitmap.create("housekeeper_bg2");
		bg2.width = 492;
		bg2.height = GameConfig.stageHeigth-100;
		bg2.setPosition(5,5);
		this.addChild(bg2);

		let frame = BaseLoadBitmap.create("housekeeper_frame");
		frame.width = 378;
		frame.height = GameConfig.stageHeigth-700;
		frame.setPosition(bg2.x+52,bg2.y+290);
		this.addChild(frame);

		let posy = frame.y+10;
		let offsety = (frame.height-20)/4;

		let rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(Api.housekeeperVoApi.rechargeId);
		for (let i=1; i<=4; i++)
		{
				let flower = BaseLoadBitmap.create("housekeeper_flower");
				flower.width = 18;
				flower.height = 18;
				flower.setPosition(frame.x+16, posy+offsety*(i-0.5)-flower.height/2);
				this.addChild(flower);


				let desc = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_desc"+i,[String(rechargecfg.gemCost)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
				desc.width = 326;
				desc.lineSpacing =4;
				desc.setPosition(flower.x+flower.width, posy+offsety*(i-0.5)-desc.height/2);
				this.addChild(desc);

				if (i < 4)
				{
						let line = BaseLoadBitmap.create("housekeeper_line");
						line.width = 343;
						line.height = 6;
						line.setPosition(frame.x+frame.width/2-line.width/2, posy+offsety*i-line.height/2);
						this.addChild(line);
				}
		}

		let hasDate = ComponentManager.getTextField(" ",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		hasDate.setPosition(150,frame.y+frame.height+4);
		this.addChild(hasDate);
		this._hasDate = hasDate;

		let detail = BaseLoadBitmap.create("housekeeper_detail");
		detail.width = 138;
		detail.height = 39;
		detail.setPosition(frame.x+frame.width-detail.width,frame.y+frame.height+34);
		this.addChild(detail);
		detail.addTouchTap(this.detailHandle,this);

		let detailtext = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		detailtext.textFlow = new Array<egret.ITextElement>(
			{ text: LanguageManager.getlocal("housekeeper_detail"), style: { "underline": true} }
			);
		detailtext.setPosition(detail.x+20,detail.y+8);
		this.addChild(detailtext);

		let open = ComponentManager.getButton("housekeeper_open","",this.gotoHousekeeper,this,null,1);
		open.width = 230;
		open.height = 120;
		open.setPosition(frame.x+frame.width-open.width+27,frame.y+frame.height+72);
		this.addChild(open);
		// open.addTouchTap();
		this._openbitmap = open;

		let opentext = ComponentManager.getTextField("@",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		
		if (Api.shopVoApi.ifBuyButler())
		{
			hasDate.text = LanguageManager.getlocal("housekeeper_date",[App.DateUtil.getFormatBySecond(Api.shopVoApi.getButleret(),6)])
			opentext.text = LanguageManager.getlocal("housekeeper_goto");
		}
		else
		{
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(Api.housekeeperVoApi.rechargeId);
			opentext.text = (PlatformManager.checkisLocalPrice()&&rechargeItemCfg.platFullPrice)?rechargeItemCfg.platFullPrice:App.CommonUtil.getMoneyString(rechargeItemCfg.cost);
		}
		


		opentext.setPosition(open.x+open.width/2-opentext.width/2+8,open.y+42);
		this.addChild(opentext);
		this._openText = opentext;

		let role = BaseLoadBitmap.create("housekeeper_role");
		role.width = 235;
		role.height = 376;
		role.setPosition(5,bg2.y+bg2.height-role.height+8);
		this.addChild(role);
    }

	private detailHandle():void
	{	
		let rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(Api.housekeeperVoApi.rechargeId);

		let parms = [String(rechargecfg.gemCost)];
		if (Api.switchVoApi.checkOpenConquest())
		{
			parms.push(LanguageManager.getlocal("housekeeper_rule_part1"));
		}
		else
		{
			parms.push("");
		}
		if (Api.switchVoApi.checkOpenTrade())
		{
			parms.push(LanguageManager.getlocal("housekeeper_rule_part2"));
		}
		else
		{
			parms.push("");
		}
		if (Api.switchVoApi.checkZhenQiFangOpen())
		{
			parms.push(LanguageManager.getlocal("housekeeper_rule_part3"));
		}
		else
		{
			parms.push("");
		}

		let msg = LanguageManager.getlocal("housekeeper_rule",parms);


		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,msg);
	}

	private gotoHousekeeper():void
	{	
		if (Api.shopVoApi.ifBuyButler())
		{
			ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERVIEW,{});
		}
		else
		{
			PlatformManager.checkPay(Api.housekeeperVoApi.rechargeId);
		}
	}

    protected getResPreName():string
	{
		return "housekeeper";
	}


	protected receivePushData(event: egret.Event): void {
        let data: { ret: boolean, data: any } = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
           
            if (data.data.data.rewards) {
                let itemid = data.data.data.rewards;
				let rList = GameData.formatRewardItem(itemid);
				App.CommonUtil.playRewardFlyAction(rList);                
            }
			this.resetText();
        }
    }

	private resetText():void
	{
		if (Api.shopVoApi.ifBuyButler())
		{
			this._hasDate.text = LanguageManager.getlocal("housekeeper_date",[App.DateUtil.getFormatBySecond(Api.shopVoApi.getButleret(),6)])
			this._openText.text = LanguageManager.getlocal("housekeeper_goto");
		}
		else
		{	
			this._hasDate.text = "";
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(Api.housekeeperVoApi.rechargeId);
			this._openText.text = (PlatformManager.checkisLocalPrice()&&rechargeItemCfg.platFullPrice)?rechargeItemCfg.platFullPrice:App.CommonUtil.getMoneyString(rechargeItemCfg.cost);
		}
		this._openText.setPosition(this._openbitmap.x+this._openbitmap.width/2-this._openText.width/2+8,this._openbitmap.y+42);
	}


    public dispose():void{

		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);

		this._hasDate = null;
		this._openText = null;
		this._openbitmap = null;

		super.dispose();
	}
}