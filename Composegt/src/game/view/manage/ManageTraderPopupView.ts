class ManageTraderPopupView extends PopupView
{
    public constructor() 
	{
		super();
	}
	private _buyBtnList = [];
	protected initView():void
	{
        let getCrit = Config.ManageCfg.getCrit;
		let supplyManNum =  Config.ManageCfg.supplyManNum;
    	let supplyManBase=  Config.ManageCfg.supplyManBase;
		let supplyMan=  Config.ManageCfg.supplyMan;

		let bg = BaseBitmap.create("manage_traderbg");
		bg.x = this.viewBg.x +  this.viewBg.width/2 - bg.width/2;
		bg.y = 5;
		this.addChildToContainer(bg);

		let resIcons = [
			"public_icon2",
			"public_icon3",
			"public_icon4"
		];
		let manageNUms=[
			supplyManBase + Api.manageVoApi.getReapGold() * supplyManNum,
			supplyManBase + Api.manageVoApi.getReapFood() * supplyManNum,
			supplyManBase + Api.manageVoApi.getReapSoldier() * supplyManNum,
		];
		let posX=[
			bg.x+80,bg.x+bg.width/2, bg.x + bg.width-80
		]

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("manageTrader_todayget"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.setPosition(bg.x+bg.width/2-tipTxt.width/2 ,bg.y+440);
		this.addChildToContainer(tipTxt);
		
		let buyinfo = Api.manageVoApi.getBuyInfo();
		let keys = Object.keys(supplyMan).sort();
		for (let index = 0; index < keys.length; index++) {
			let key = keys[index];
			let element = supplyMan[key];
			let resbg = BaseBitmap.create("public_hb_bg01");
			resbg.x = posX[index] - resbg.width/2;
			resbg.y = bg.y + 480;
			this.addChildToContainer(resbg);

			let resIcon:BaseBitmap=BaseBitmap.create(resIcons[index]);
			resIcon.x = resbg.x-3;
			resIcon.y = resbg.y +resbg.height/2 -resIcon.height/2;
			this.addChildToContainer(resIcon);

			let numTxt=ComponentManager.getTextField(""+manageNUms[index],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTxt.setPosition(resbg.x+45,resbg.y+(resbg.height-numTxt.height)/2);
			this.addChildToContainer(numTxt);

			let goldIcon = BaseBitmap.create("public_icon1");
			goldIcon.x = posX[index] - goldIcon.width/2 - 30;
			goldIcon.y = bg.y + bg.height + 10;
			goldIcon.setScale(0.7);
			this.addChildToContainer(goldIcon);

			let goldnumTxt=ComponentManager.getTextField(""+element.needGem,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			goldnumTxt.x = goldIcon.x + goldIcon.width-5;
			goldnumTxt.y = goldIcon.y + 10;
			this.addChildToContainer(goldnumTxt);

			let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"manageTrader_buyBtn"+index,this.buyHandler,this,[index]);
			buyBtn.x = posX[index] - buyBtn.width/2;
			buyBtn.y = goldIcon.y + goldIcon.height -9;
			buyBtn.name = "buyBtn"+index;
			this.addChildToContainer(buyBtn);
			this._buyBtnList.push(buyBtn);

			let buyTipTxt = ComponentManager.getTextField("",17,TextFieldConst.COLOR_BROWN);
			buyTipTxt.text = LanguageManager.getlocal("manageTrader_buyTip",[ "" + (element.effect * 100)]);
			buyTipTxt.x = posX[index] - buyTipTxt.width/2;
			buyTipTxt.y = buyBtn.y + buyBtn.height + 7;
			this.addChildToContainer(buyTipTxt);
		}
		this.refreshBtnStatus();

		let tipbg = BaseBitmap.create("public_tc_bg02");
		tipbg.x = this.viewBg.x + this.viewBg.width/2 - tipbg.width/2;
		tipbg.y = this.getShowHeight() - 135;
		this.addChildToContainer(tipbg);

		let tipTxt2 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt2.text = LanguageManager.getlocal("manageTrader_Tip");
		tipTxt2.x = tipbg.x + tipbg.width/2  - tipTxt2.width/2;
		tipTxt2.y = tipbg.y + tipbg.height/2 - tipTxt2.height/2;
		this.addChildToContainer(tipTxt2);

    }

	protected refreshBtnStatus()
	{
		let buyinfo = Api.manageVoApi.getBuyInfo();
		let supplyMan=  Config.ManageCfg.supplyMan;
		let keys = Object.keys(supplyMan).sort();
		for (let index = 0; index < keys.length; index++) {
			let key = keys[index];
			let element = supplyMan[key];
			let buyBtn = this._buyBtnList[index];
			let sidx = String(index+1);
			let bnum = buyinfo[sidx];
			let limit = element.limit ;
			if(bnum && bnum >= limit){
				App.DisplayUtil.changeToGray(buyBtn);
			}else{
				App.DisplayUtil.changeToNormal(buyBtn);
			}		
		}
	}

	protected buyHandler(param:any)
	{
		let buyinfo = Api.manageVoApi.getBuyInfo();
		let bnum = buyinfo["" + param];
		let supplyMan = Config.ManageCfg.supplyMan["" + param];
		let limit =supplyMan.limit ;
		if( (bnum && bnum >= limit) || !Api.manageVoApi.isShowTraderRed()){
			App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_timesTip"));
			return;
		}
		if( Api.playerVoApi.getPlayerGem() < supplyMan.needGem){
			App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
			return;
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE),this.buyCallback,this);
		NetManager.request(NetRequestConst.REQUEST_MANAGE_BUYFINANCE,{supplyid:param+1});
	}
	protected buyCallback(event:egret.Event)
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE),this.buyCallback,this);
		let ret = event.data.data.ret;
		if(ret == 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_success"));
			this.refreshBtnStatus();
			let rList = GameData.formatRewardItem(event.data.data.data.rewards);
			App.CommonUtil.playRewardFlyAction(rList);
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_fail"));
        }
        // this.hide();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "manage_traderbg",
		]);
	}

    protected getShowHeight():number
	{
		return 840;
	}

	public dispose():void
	{
		this._buyBtnList = [];
		super.dispose();
	}
}