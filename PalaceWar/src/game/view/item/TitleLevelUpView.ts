class TitleLevelUpView extends BaseView
{	

	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	public initView():void
	{
		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);



		let bg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		bg.y = 58;
		this._nodeContainer.addChild(bg);

		let skin_lvup_light:BaseBitmap = BaseBitmap.create("skin_lvup_light");
		skin_lvup_light.x = GameConfig.stageWidth/2 - skin_lvup_light.width/2;
		this._nodeContainer.addChild(skin_lvup_light);
		
		let skin_lvup_word:BaseBitmap = BaseBitmap.create("skin_lvup_word");
		skin_lvup_word.x = GameConfig.stageWidth/2 - skin_lvup_word.width/2;
		this._nodeContainer.addChild(skin_lvup_word);

		let light:BaseBitmap =  BaseBitmap.create("tailor_get_light");
		light.setScale(0.5);
        light.anchorOffsetX =  light.width/2;
        light.anchorOffsetY =  light.height/2;
        light.x = GameConfig.stageWidth/2;
        light.y = 40 + light.height / 2 - 105;
        egret.Tween.get(light,{loop:true}).to({rotation:360},5000);
        this._nodeContainer.addChild(light);

        let light2:BaseBitmap =  BaseBitmap.create("tailor_get_light");
		light2.setScale(0.5);
        light2.anchorOffsetX =  light2.width/2;
        light2.anchorOffsetY =  light2.height/2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2,{loop:true}).to({rotation:-360},5000);
        this._nodeContainer.addChild(light2)

		this.initHeadContainer();

		let congratulation:BaseTextField = ComponentManager.getTextField(this.getCongratulationString(),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        congratulation.width = 540;
		congratulation.x = GameConfig.stageWidth/2 - congratulation.width/2;
		congratulation.lineSpacing = 6;
        congratulation.y = 226;
		congratulation.textAlign = egret.HorizontalAlign.CENTER;
        this._nodeContainer.addChild(congratulation);

		let lineSp:BaseBitmap = BaseBitmap.create("skin_lvup_line");
		lineSp.width = 600;
		lineSp.x = GameConfig.stageWidth/2 - lineSp.width/2;
		lineSp.y = congratulation.y + congratulation.height+15;
		this._nodeContainer.addChild(lineSp);

		let innerbg:BaseBitmap = BaseBitmap.create("dinner_list_bg");
		innerbg.width = 584;
		innerbg.x = GameConfig.stageWidth/2 - innerbg.width/2;
		innerbg.y = lineSp.y + 18;
		this._nodeContainer.addChild(innerbg);
		
		let startY:number = innerbg.y + 20;

		let valueTab:any[] = this.getInfoTab();

		for (var index = 0; index < valueTab.length; index++) {

			let infoTab:any[] = valueTab[index];
			let Txt1 = ComponentManager.getTextField(infoTab[0],22,TextFieldConst.COLOR_QUALITY_GRAY);
			Txt1.x = innerbg.x + 50;
			Txt1.y = startY;
			this._nodeContainer.addChild(Txt1);

			let Txt2 = ComponentManager.getTextField(infoTab[1],20);
			Txt2.x = Txt1.x + 180;
			Txt2.y = Txt1.y ;
			this._nodeContainer.addChild(Txt2);

			let arrowSp =  BaseBitmap.create("servant_arrow");
			arrowSp.x = Txt1.x + 285;
			arrowSp.y = Txt1.y + Txt1.height/2 -  arrowSp.height/2;
			this._nodeContainer.addChild(arrowSp);

			let Txt3 = ComponentManager.getTextField(infoTab[2],20,0x21eb39);
			Txt3.x = Txt1.x + 375;
			Txt3.y = Txt1.y ;
			this._nodeContainer.addChild(Txt3);
			if(index > 0)
			{
				
				Txt2.x -= 30;
				Txt3.x -= 30;
			}
			if(index < valueTab.length -1){
				let lineSp = BaseBitmap.create("rankinglist_line");
				lineSp.x = GameConfig.stageWidth/2 - lineSp.width/2;
				lineSp.y = Txt1.y + 30;
				this._nodeContainer.addChild(lineSp);
				startY += 15;
			}
			startY += 30;

		}

		innerbg.height = startY - innerbg.y + 10;

		let tipTxt2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2"),20,TextFieldConst.COLOR_WARN_YELLOW);
		tipTxt2.multiline = true;
		tipTxt2.lineSpacing = 10;
		tipTxt2.width = 540;
        tipTxt2.x = GameConfig.stageWidth/2 - tipTxt2.width/2;
        tipTxt2.y = innerbg.y + innerbg.height + 20;
        this._nodeContainer.addChild(tipTxt2);

		bg.height = tipTxt2.y + tipTxt2.height + 30 - bg.y;

		let okBtn:BaseButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"skinLvupOkBtn",this.hide,this);
        okBtn.x = GameConfig.stageWidth/2 - okBtn.width/2;
        okBtn.y = bg.y + bg.height + 10;
        this._nodeContainer.addChild(okBtn);

		this._nodeContainer.y = GameConfig.stageHeigth/2 -  this._nodeContainer.height/2;
	}

	protected getTitleStr():string{
		return null;
	}

	protected getCongratulationString():string
	{	
		let titleId:number = Number(this.param.data.titleId);
		let lv:number = this.param.data.lv;
		return LanguageManager.getlocal("levelUpCongratulation",["",Api.itemVoApi.getTitleInfoVoById(titleId).name,String(lv)])
	}

	protected initHeadContainer():void
	{	
		let titleId:number = Number(this.param.data.titleId);
		let lv:number = this.param.data.lv;
		let titleInfo = Api.itemVoApi.getTitleInfoVoById(titleId);
		let playerHead:BaseDisplayObjectContainer | BaseBitmap;
		if (titleInfo.type == 4 && titleInfo.isTitle == 4)
        {	


			playerHead  = App.CommonUtil.getTitlePic(titleId, lv);// BaseLoadBitmap.create(titleInfo.titleIcon3);
            playerHead.x = this.viewBg.width/2 - 77;

			// playerHead  = App.CommonUtil.getTitlePic(titleInfo.id, lv);
            // playerHead.x = this.viewBg.width/2 - playerHead.width/2;
            playerHead.y = 131;
           	this._nodeContainer.addChild(playerHead);
        }
		else if (titleInfo.type == 4 && titleInfo.isTitle == 5)
		{
			playerHead = Api.playerVoApi.getPlayerCircleHead(titleInfo.id);
            playerHead.x = this.viewBg.width/2 - playerHead.width/2;
            playerHead.y = 110;
            this._nodeContainer.addChild(playerHead);
		}
		else if (titleInfo.type == 4 && titleInfo.isTitle == 6){
			playerHead  = BaseLoadBitmap.create(titleInfo.icon);
			playerHead.x = this.viewBg.width/2 - 50;
			playerHead.y = 110;
           	this._nodeContainer.addChild(playerHead);
		}
        else
        {
			
            playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),{ptitle:titleInfo.id, plv:lv});
		    playerHead.x = this.viewBg.width/2 - playerHead.width/2;
			playerHead.y = 110;
            this._nodeContainer.addChild(playerHead);
        }
		// let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleId);
		// playerHead.x = this.viewBg.width/2 - playerHead.width/2;
        // playerHead.y = 110;
		// this._nodeContainer.addChild(playerHead);
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.panelLayer;
	}

	protected getInfoTab():any[]
	{	
		let lv:number = this.param.data.lv;
		let titleId:number = Number(this.param.data.titleId);
		let titleInfo:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(titleId);

		let info:any[] = [];
		info.push([LanguageManager.getlocal("skinLvuptxt1"),String(lv-1),String(lv)]);
		let v1:number = titleInfo.lvUpEffect1;
		let v2:number = titleInfo.lvUpEffect2;
		let v3:number = titleInfo.atkEffect;

		let o1:number = titleInfo.effect1;
		let o2:number = titleInfo.effect2;
		let o3:number = titleInfo.atkEffect;

		if (o1)
        {	
            for (let i:number = 2; i<=5; i++)
            {	
				let value1:string = "+"+ (v1*(lv-2)+o1);
                let value2:string = "+"+ (v1*(lv-1)+o1);
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
        }
		if (o2)
        {	
            for (let i:number = 2; i<=5; i++)
            {	
				let value1:string = "+"+(v2*(lv-2)+o2)*100+"%";
                let value2:string = "+"+(v2*(lv-1)+o2)*100+"%";
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
		}
		if(o3){
			for (let i:number = 8; i<=8; i++)
            {	
				let value1:string = "+"+Math.round((v3*(lv-1))*100)+"%";
                let value2:string = "+"+Math.round((v3*lv)*100)+"%";
				info.push([LanguageManager.getlocal("skinLvuptxt"+i),value1,value2]);
            }
		}

		return info;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"skin_lvup_word","rankinglist_line","dinner_list_bg","servant_arrow","skin_lvup_light","skin_lvup_line","tailor_get_light",
		]);
	}

	public hide():void
	{
		super.hide();
		Api.itemVoApi.checkWaitingTitleLvUp();
	}

	public dispose()
    {
		this._nodeContainer = null;
        super.dispose();
    }
}