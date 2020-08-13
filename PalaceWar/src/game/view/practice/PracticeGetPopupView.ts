/**
 * 修身获得
 * author shaoliang
 * date 2018/04/23
 * @class PracticeGetPopupView
 */

class PracticeGetPopupView extends PopupView 
{	
	protected _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	public initView():void
	{
		let basecfg = GameConfig.config.practicebaseCfg;
		let pnum = Api.practiceVoApi.getRealSpd();
        
		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
		
		let descBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		descBg.width = 530;
		descBg.height = 310;
		descBg.x = this.viewBg.x +this.viewBg.width/2 - descBg.width/2;
        descBg.y = this.viewBg.y + 10;
		this._nodeContainer.addChild(descBg);

		let startY = descBg.y + 30;
		let startX = descBg.x + 70;
		
		let pvip = Api.playerVoApi.getPlayerVipLevel();
		let plv = Api.playerVoApi.getPlayerLevel();
		let vipAdd = basecfg.vip[pvip];
		let vipAdd2 = basecfg.vip[pvip+1];

		let levelAdd = basecfg.level[plv-1];
		let levelAdd2 = basecfg.level[plv];
		
		let ptextV2 = undefined;
		let pnode2 = undefined;
		if(plv < Config.LevelCfg.getMaxLevel())
		{
			ptextV2 = [ Api.playerVoApi.getPlayerOfficeByLevel(plv+1),String(levelAdd2)];
		}
		let pVipnode2 = undefined;
		let pVipText2 = undefined;
		if(pvip < Config.VipCfg.getMaxLevel())
		{
			pVipText2 = [String(pvip+1),(vipAdd2*100).toFixed(0)+"%"];
		}
		let uiList =[
			{
				node1:ComponentManager.getTextField(LanguageManager.getlocal("practice_getTxt2"),28),
				textKey:"practice_getTxt1",
				textV:[String(pnum)],
				textKey2:undefined,
				textV2:undefined,
			},
			{
				node1:ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt",0xfff000),
				textKey:"practice_officeAdd",
				// textKey2:"practice_officeAdd2",
				textV:[Api.playerVoApi.getPlayerOffice(),String(levelAdd)],
				// textV2:ptextV2,
				textKey2:undefined,
				textV2:undefined,
			},
			{
				node1:BaseLoadBitmap.create("vip_icon_" + Api.playerVoApi.getPlayerVipLevel()),
				textKey:"practice_vipAdd",
				// textKey2:"practice_vipAdd3",
				textV:[String((vipAdd*100).toFixed(0))+"%"],
				// textV2:pVipText2,
				textKey2:undefined,
				textV2:undefined,
			},
			{
				node1:BaseBitmap.create("monthcard_icon"),
				textKey:"practice_monthCardAdd",
				textKey2:undefined,
				textV:[(basecfg.monthCard * 100)+"%"],
				textV2:undefined,
			},
			{
				node1:BaseBitmap.create("yearcard_icon"),
				textKey:"practice_yearCardAdd",
				textKey2:undefined,
				textV:[(basecfg.yearCard * 100)+"%"],
				textV2:undefined,
			},
		]
		for (var index = 0; index < uiList.length; index++) {
			
			let cfg = uiList[index];
			let node1 = cfg.node1;

			let isShowBtn = false;
			if(index == 1)
			{
				isShowBtn = Api.playerVoApi.getPlayerLevel() < Config.LevelCfg.getMaxLevel();
			}else if(index == 2){
				isShowBtn = Api.playerVoApi.getPlayerVipLevel() < Config.VipCfg.getMaxLevel();
			}else if(index == 3){
				isShowBtn = !Api.shopVoApi.ifBuyMonthCard();
			}else if(index == 4){
				isShowBtn = !Api.shopVoApi.ifBuyYearCard();
			}

			if(index == 2)
			{
				node1.width = 80;
				node1.height = 35;
			}
			node1.anchorOffsetX = node1.width/2;
			node1.anchorOffsetY = node1.height/2;
			node1.x =startX;
			node1.y = startY;
			let btnStr = "practice_getBtnTxt1";
			if(index >2)
			{
				node1.setScale(0.8);
				btnStr = "practice_getBtnTxt2";
			}
			
			this._nodeContainer.addChild(node1);

			let addTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			
			if(index < 2 )
			{
				addTxt1.text = LanguageManager.getlocal(cfg.textKey,[].concat(cfg.textV));
			}else{
				if(index == 2 )
				{
					if(Api.playerVoApi.getPlayerVipLevel() == 0  && isShowBtn){
						addTxt1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
						addTxt1.text = LanguageManager.getlocal(cfg.textKey + "_1",cfg.textV);
					}else{
						addTxt1.text = LanguageManager.getlocal(cfg.textKey,[].concat(cfg.textV));
					}
				} 
				if(index > 2 )
				{
					if(isShowBtn)
					{
						addTxt1.text = "";
						addTxt1.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
						addTxt1.text = LanguageManager.getlocal(cfg.textKey + "_1",cfg.textV);
					}else{
						addTxt1.text = LanguageManager.getlocal(cfg.textKey,[].concat(cfg.textV));
					}
				}
			}
			

			addTxt1.anchorOffsetY = addTxt1.height/2;
			addTxt1.x = startX +  110;
			addTxt1.y = startY;
			this._nodeContainer.addChild(addTxt1);
			if (cfg.textV2)
			{
				addTxt1.y -= 25;
				let addTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_QUALITY_GRAY);
				addTxt2.text = LanguageManager.getlocal(cfg.textKey2,[].concat(cfg.textV2));
				addTxt2.anchorOffsetY = addTxt1.height/2;
				addTxt2.x = addTxt1.x;
				addTxt2.y = addTxt1.y + 30;
				this._nodeContainer.addChild(addTxt2);
			}
			
			if(isShowBtn)
			{
				let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnStr,this.btnHandler,this,[index]);
				btn.anchorOffsetY = btn.height/2;
				btn.x = descBg.x + descBg.width - btn.width - 20;
				btn.y = startY;
				this._nodeContainer.addChild(btn);
			}else
			{
				if(index > 0){
					let flagImg = "practice_max";
					if(index > 2)
					{
						 flagImg = "practice_active";
					}
					let  flag = BaseBitmap.create(flagImg);
					flag.anchorOffsetY = flag.height/2;
					flag.anchorOffsetX = flag.width/2;
					flag.x = descBg.x + descBg.width  - 80;
					flag.y = startY;
					this._nodeContainer.addChild(flag);
				}
			}
			startY += 25;
			if(index < uiList.length-1){
				let lineImg = BaseBitmap.create("public_line1");
				lineImg.width = descBg.width-20;
				lineImg.x = descBg.x + descBg.width/2 -lineImg.width/2;
				lineImg.y = startY;
				this._nodeContainer.addChild(lineImg);
			}

			startY += 35;
		}
		
		//按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.setPosition(descBg.x +descBg.width/2 - confirmBtn.width/2, descBg.y+descBg.height+15);
		this._nodeContainer.addChild(confirmBtn);
	}

	protected btnHandler(param:any)
	{
		if(param == 1)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
		}else if(param == 2)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}else if(param == 3)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
		}else if(param == 4)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		// return super.getResourceList().concat([
		// 	"progress3","progress3_bg","public_icon12","servant_detailBtn","servant_detailBtn_down",
        //     "practice_max","practice_plus_down","practice_plus",
		// ]);
		return super.getResourceList().concat([
				"dinner_list_bg","practice_active",
				"tailor_get_light","office_fnt","monthcard_icon","yearcard_icon","practice_get_word",
		]);
	}

	// protected getBgName():string
	// {
	// 	return "public_9_bg8";
	// }

	public dispose():void
	{	
		this._nodeContainer = null;
		super.dispose();
	}

}