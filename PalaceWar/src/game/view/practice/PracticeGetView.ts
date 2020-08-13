/**
 * 修身获得
 * author shaoliang
 * date 2018/04/23
 * @class PracticeGetView
 */

class PracticeGetView extends BaseView 
{	
	public constructor() {
		super();
	}

	protected initView():void
	{
		let pnum:any = this.param.data.pnum;

		let basecfg = GameConfig.config.practicebaseCfg;
		let descBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		descBg.width = GameConfig.stageWidth;
		descBg.height = 560;
		descBg.setPosition(0, GameConfig.stageHeigth/2 - 180);

		let tailor_get_light = BaseBitmap.create("tailor_get_light");
		tailor_get_light.anchorOffsetX = tailor_get_light.width/2;
		tailor_get_light.anchorOffsetY = tailor_get_light.height/2;
		tailor_get_light.x = GameConfig.stageWidth/2;
		tailor_get_light.y = descBg.y - 30;
		egret.Tween.get(tailor_get_light,{loop:true}).to({rotation:360},15000);
		this.addChildToContainer(tailor_get_light);
		this.addChildToContainer(descBg);

		let finishWord:BaseBitmap = BaseBitmap.create("practice_get_word");
		finishWord.setPosition(GameConfig.stageWidth/2  - finishWord.width/2, descBg.y - finishWord.height);
		this.addChildToContainer(finishWord);

		let startY = descBg.y + 40;
		let startX = descBg.x + 30;

		let practice_getTxt1 =  ComponentManager.getTextField("",24,TextFieldConst.COLOR_WARN_YELLOW);
		practice_getTxt1.text = LanguageManager.getlocal("practice_getTxt1",[String(pnum)]);
		practice_getTxt1.x = startX;
		practice_getTxt1.y = startY;
		this.addChildToContainer(practice_getTxt1);
		startY += 40;

		let practice_getTxt2 =  ComponentManager.getTextField("",24,TextFieldConst.COLOR_WARN_YELLOW);
		practice_getTxt2.text = LanguageManager.getlocal("practice_getTxt2",[""]);
		practice_getTxt2.x = startX;
		practice_getTxt2.y = startY;
		this.addChildToContainer(practice_getTxt2);
		startY += 35;

		let listBg:BaseBitmap = BaseBitmap.create("dinner_list_bg");
		listBg.width = 584;
		listBg.height = 320;
		listBg.setPosition(GameConfig.stageWidth/2  - listBg.width/2, startY);
		this.addChildToContainer(listBg);
		
		startX += 90;
		startY += 50; 
		let pvip = Api.playerVoApi.getPlayerVipLevel();
		let plv = Api.playerVoApi.getPlayerLevel()
		let vipAdd = basecfg.vip[pvip-1];
		let vipAdd2 = basecfg.vip[pvip];
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
				node1:ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt",0xfff000),
				textKey:"practice_officeAdd",
				textKey2:"practice_officeAdd2",
				textV:[Api.playerVoApi.getPlayerOffice(),String(levelAdd)],
				textV2:ptextV2,
			},
			{
				node1:BaseLoadBitmap.create(Api.vipVoApi.getCurLevelVipCfg().icon),
				textKey:"practice_vipAdd",
				textKey2:"practice_vipAdd3",
				textV:[String(pvip),String((vipAdd*100).toFixed(0))+"%"],
				textV2:pVipText2,
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
			if(index == 1)
			{
				node1.width = 80;
				node1.height = 35;
			}
			node1.anchorOffsetX = node1.width/2;
			node1.anchorOffsetY = node1.height/2;
			node1.x =startX;
			node1.y = startY;
			let btnStr = "practice_getBtnTxt1";
			if(index >1)
			{
				node1.setScale(0.8);
				btnStr = "practice_getBtnTxt2";
			}
			
			this.addChildToContainer(node1);

			let addTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			addTxt1.text = LanguageManager.getlocal(cfg.textKey,[].concat(cfg.textV));
			addTxt1.anchorOffsetY = addTxt1.height/2;
			addTxt1.x = startX +  80;
			addTxt1.y = startY;
			this.addChildToContainer(addTxt1);
			if (cfg.textV2)
			{
				addTxt1.y -= 25;
				let addTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_QUALITY_GRAY);
				addTxt2.text = LanguageManager.getlocal(cfg.textKey2,[].concat(cfg.textV2));
				addTxt2.anchorOffsetY = addTxt1.height/2;
				addTxt2.x = addTxt1.x;
				addTxt2.y = addTxt1.y + 30;
				this.addChildToContainer(addTxt2);
			}
			let isShowBtn = false;
			if(index == 0)
			{
				isShowBtn = Api.playerVoApi.getPlayerLevel() < Config.LevelCfg.getMaxLevel();
			}else if(index == 1){
				isShowBtn = Api.playerVoApi.getPlayerVipLevel() < Config.VipCfg.getMaxLevel();
			}else if(index == 2){
				isShowBtn = !Api.shopVoApi.ifBuyMonthCard();
			}else if(index == 3){
				isShowBtn = !Api.shopVoApi.ifBuyYearCard();
			}
			if(isShowBtn)
			{
				let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnStr,this.btnHandler,this,[index]);
				btn.anchorOffsetY = btn.height/2;
				btn.x = startX + 370;
				btn.y = startY;
				btn.setScale(0.8);
				this.addChildToContainer(btn);
			}
			let lineImg = BaseBitmap.create("public_line1");
			lineImg.width = descBg.width-20;
			lineImg.x = descBg.x + descBg.width/2 -lineImg.width/2;
			lineImg.y = startY + 25;
			this.addChildToContainer(lineImg);

			startY += 74;
		}
		
		//按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.setPosition(GameConfig.stageWidth/2 - confirmBtn.width/2, listBg.y+listBg.height+40);
		this.addChildToContainer(confirmBtn);
	}

	protected btnHandler(param:any)
	{
		// egret.log("param >>>>>>");
		if(param == 0)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
		}else if(param == 1)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.VIPVIEW);
		}else if(param == 2)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
		}else if(param == 3)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"dinner_list_bg",
				"tailor_get_light","office_fnt","monthcard_icon","yearcard_icon","practice_get_word",
		]);
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	public dispose():void
	{	
		super.dispose();
	}

}