/**
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
class AcDiscountView extends AcCommonView
{
	private _scrollList:ScrollList;
	private _activeCfgList:Array<any> = [];
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = -50;

		//描述 
		let desckey:string = null;
		desckey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&App.DeviceUtil.isWXgame()?"acDiscount_newdesc":"acDiscount_desc"
		let acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(acDescTxt);
		acDescTxt.x = 30;
		acDescTxt.y = 20;
		acDescTxt.width = 550;
		
		let startY = 115;

		// vip折扣
		let acBasevo = Api.acVoApi.checkIsVipDiscount();
		if (acBasevo) {
			//vip背景图片
			let vipBg: BaseBitmap = BaseBitmap.create("acdiscountviewbg1");
			this.addChildToContainer(vipBg);
			vipBg.y = startY;

			//倒计时文本 
			let acCDTxtStr = Api.acVoApi.getActivityVoByAidAndCode(this.aid,"1")?Api.acVoApi.getActivityVoByAidAndCode(this.aid,"1").getAcLocalTime(false):Api.acVoApi.getActivityVoByAidAndCode(this.aid,"4").getAcLocalTime(false);
			let acCDTxt = ComponentManager.getTextField(acCDTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			this.addChildToContainer(acCDTxt);
			acCDTxt.x = 30;
			acCDTxt.y = vipBg.y + 227;

			//vip描述 
			let acVipDescTxtKey = "";
			if(acBasevo.code ==1)
			{
				acVipDescTxtKey = "acDiscount_vipDesc";
			}
			else
			{
				acVipDescTxtKey = "acDiscount_vipDesc-"+acBasevo.code;
			}
			let acVipDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(acVipDescTxtKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(acVipDescTxt);
			acVipDescTxt.x = 30;
			acVipDescTxt.y = vipBg.y + 270;
			acVipDescTxt.width = 420;

			// 前往vip
			let goVipBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"acDiscount_goVip",this.goVipHandler ,this);        
			goVipBtn.x = 473;
			goVipBtn.y = vipBg.y +265;
			goVipBtn.name = "goVipBtn";
			this.addChildToContainer(goVipBtn);

			//vip 1折
			let vip1zheBg: BaseBitmap = BaseBitmap.create(PlatformManager.checkIsZjlySp() ? "acdiscount4zhe" : "acdiscount1zhe");
			this.addChildToContainer(vip1zheBg);
			vip1zheBg.x = 563;
			vip1zheBg.y = vipBg.y + 213;
			if (acBasevo.code == 4 ) {
				vip1zheBg.setRes( "acdiscount5zhe");
				vip1zheBg.x = 560;
			}

			startY = vipBg.y + vipBg.height;
		}

		//------------------------------------------------
		var divo3 = Api.acVoApi.getActivityVoByAidAndCode("discount","3");
		var divo2 = Api.acVoApi.getActivityVoByAidAndCode("discount","2")
		// 终身卡打折
		if ( divo2&& divo2.isStart||divo3&& divo3.isStart) {
			//终身卡背景图片
			let yearCardBg: BaseBitmap = BaseBitmap.create("acdiscountviewbg2");
			this.addChildToContainer(yearCardBg);
			yearCardBg.y = startY;

			//倒计时文本 
			let acCDTxt =null;
		
			if(divo3)
			{	 
				acCDTxt = ComponentManager.getTextField(divo3.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			}
			else
			{
				acCDTxt = ComponentManager.getTextField(divo2.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			}
			this.addChildToContainer(acCDTxt);
			acCDTxt.x = 30;
			acCDTxt.y = yearCardBg.y + 227;

			//终身卡描述 
			let yearkey:string = null;
			yearkey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&App.DeviceUtil.isWXgame()?"acDiscount_newyearcardDesc":"acDiscount_yearcardDesc";
			let param:string[]=[];
			
			// 终身卡配置
			var gStr ="";
			let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, "2");
			let cfg2 = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, "3");
			if(cfg)
			{
				gStr = 	cfg.getRecharge();
			}

			if(cfg2)
			{
				gStr = 	cfg2.getRecharge();
			} 
			Api.rechargeVoApi.formatThHwMoneyInfo(param,gStr);
			let acYearCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(yearkey,param), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(acYearCardDescTxt);
			acYearCardDescTxt.x = 30;
			acYearCardDescTxt.y = yearCardBg.y + 270;
			acYearCardDescTxt.width = 420;
			

			// 前往福利
			let goYearCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"acDiscount_goYearCard",this.goYearCardHandler ,this);        
			goYearCardBtn.x = 473;
			goYearCardBtn.y = yearCardBg.y +265;
			goYearCardBtn.name = "goYearCardBtn";
			this.addChildToContainer(goYearCardBtn);

			//终身卡价格
			let yearStr:string = null;
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&App.DeviceUtil.isWXgame())
			{
				yearStr = "acdiscount_zhongshenkajiage_newdiscount";
			}
			else
			{
				yearStr = PlatformManager.checkIsXlSp()?"acdiscount_zhongshenkajiage_xianlaiType":"acdiscount_zhongshenkajiage"
			}
			// 享乐园
			if(PlatformManager.checkIsXlSp())
			{
				yearStr = "acdiscount_zhongshenkajiage";
				if(divo3)
				{
					yearStr = "acdiscount_zhongshenkajiage3";
				} 
				acYearCardDescTxt.text = LanguageManager.getlocal("acDiscount_newyearcardDesc3");


				//享乐园特色提示
				let xlyTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("buyyeardesvip1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
				this.addChildToContainer(xlyTipTxt);
				xlyTipTxt.x = 30;
				xlyTipTxt.y = acYearCardDescTxt.y+acYearCardDescTxt.height+5;
			}

			let yearcardJiage: BaseBitmap = BaseBitmap.create(yearStr);
			this.addChildToContainer(yearcardJiage);
			yearcardJiage.x = 553;
			yearcardJiage.y = yearCardBg.y + 204;

			startY = yearCardBg.y + yearCardBg.height;
		}

		//月卡打折活动 -- 这种写法真坑
		let acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
		if (acMouthBasevo) {
			let mouthCfg = <Config.AcCfg.DiscountCfg>Config.AcCfg.getCfgByActivityIdAndCode(acMouthBasevo.aid, acMouthBasevo.code);
			let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(mouthCfg.recharge);
			let mouthCardBg: BaseBitmap = BaseBitmap.create("acdiscountview_mouthbg-" + acMouthBasevo.code);
			this.addChildToContainer(mouthCardBg);
			mouthCardBg.y = startY;

			let mouthCost = BaseBitmap.create("acdiscount_mouthcost-" + acMouthBasevo.code);
			mouthCost.setPosition(mouthCardBg.x + 585 - mouthCost.width / 2, mouthCardBg.y + 185 + mouthCost.height / 2);
			this.addChildToContainer(mouthCost);

			let acCDTxt = ComponentManager.getTextField(acMouthBasevo.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
			this.addChildToContainer(acCDTxt);
			acCDTxt.x = 30;
			acCDTxt.y = mouthCardBg.y + 227;

			let acMouthCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_mouthCardDesc-" + acMouthBasevo.code, [String(rechargeCfg.cost)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(acMouthCardDescTxt);
			acMouthCardDescTxt.x = 30;
			acMouthCardDescTxt.y = mouthCardBg.y + 270;
			acMouthCardDescTxt.width = 420;

			let goMouthCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goMouthCard-" + acMouthBasevo.code, this.goMouthCardHandler, this);
			goMouthCardBtn.x = 473;
			goMouthCardBtn.y = mouthCardBg.y + 265;
			this.addChildToContainer(goMouthCardBtn);


			startY = mouthCardBg.y + mouthCardBg.height;
		}
	}

	private goVipHandler() 
	{		
		if(!Api.acVoApi.checkIsVipDiscount())
        {
			//活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }	
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}
	private goYearCardHandler() 
	{		
		var disVo2 =  Api.acVoApi.getActivityVoByAidAndCode(this.aid,"2");
		var disVo3 =  Api.acVoApi.getActivityVoByAidAndCode(this.aid,"3");
		
        if(disVo2&&disVo2.isStart==false||disVo3&&disVo3.isStart==false)
        {
			//活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }	
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
	}
	/**月卡相关 */
	private goMouthCardHandler() {
		let acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
		if (acMouthBasevo && acMouthBasevo.isStart == false) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
	}
	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}


	protected getResourceList():string[]
	{
		let diconut:string = null;
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&App.DeviceUtil.isWXgame())
		{
			diconut = "acdiscount_zhongshenkajiage_newdiscount"
		}
		else
		{
			diconut =(PlatformManager.checkIsXlSp()?"acdiscount_zhongshenkajiage_xianlaiType":"acdiscount_zhongshenkajiage")
		}
		let resArr:string[]=[];
		let acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
		if(acMouthBasevo)
		{
			resArr = [
				"acdiscountview_mouthbg-"+acMouthBasevo.code,
				"acdiscount_mouthcost-"+acMouthBasevo.code,
			]
		}
		return super.getResourceList().concat([
			"acdiscount_zhongshenkajiage3","acdiscount5zhe",
			"forpeople_top","acdiscountviewbg1",(PlatformManager.checkIsZjlySp()?"acdiscount4zhe":"acdiscount1zhe"),"acdiscountviewbg2",diconut
					]).concat(resArr);
	}

	private useCallback(event:egret.Event):void
	{
		for(let i=0;i<this._activeCfgList.length;i++)
		{
			let acLimitedRewardScrollItem = <AcLimitedRewardScrollItem>this._scrollList.getItemByIndex(i);
			if(acLimitedRewardScrollItem)
			{
				acLimitedRewardScrollItem.checkBtnState();
			}
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD),this.useCallback,this);
		this._scrollList = null;
		this._activeCfgList = null;
		super.dispose();
	}
}