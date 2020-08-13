/**
 * 皮肤升级
 * author yanyuling
 * date 2018/08/13
 * @class SkinLevelupView
 */

class SkinLevelupView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _titleId:string = undefined;
	private _wifeSkinId:undefined;
	private _serSkinId:undefined;
	public constructor() {
		super();
	}

	public initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);

		this._titleId = this.param.data.titleId;
		this._wifeSkinId = this.param.data.skinId;
		let procfg = undefined;
		//称号升级
		if(this._titleId)
		{
			procfg = this.getTitleProcfg();
		}else if(this._wifeSkinId) //皮肤升级，目前只有红颜皮肤会升级
		{
			procfg = this.getWifeSkinProcfg();
		}else if(this._serSkinId){
			//TODO
		}


		let bg = BaseBitmap.create("public_9_wordbg");
		bg.height = 712;
		bg.y = GameConfig.stageHeigth/2 - bg.height/2;
		this._nodeContainer.addChild(bg);

		let skin_lvup_light = BaseBitmap.create("skin_lvup_light");
		skin_lvup_light.x = GameConfig.stageWidth/2 - skin_lvup_light.width/2;
		skin_lvup_light.y = bg.y - skin_lvup_light.height/2;
		this._nodeContainer.addChild(skin_lvup_light);
		
		let skin_lvup_word = BaseBitmap.create("skin_lvup_word");
		skin_lvup_word.x = GameConfig.stageWidth/2 - skin_lvup_word.width/2;
		skin_lvup_word.y = bg.y - skin_lvup_word.height/2 - 15;
		this._nodeContainer.addChild(skin_lvup_word);

		let skincfg = undefined;
		let skinlv = 0;
		if(this._serSkinId){
			 skincfg = Config.ServantskinCfg.getServantSkinItemById(this._serSkinId);
			 skinlv = Api.servantVoApi.getServantSkinLV(skincfg.id);
		}else{
			skincfg = Config.WifeskinCfg.getWifeCfgById(this._wifeSkinId);
			skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skincfg.id);
		}

		let skinHeadBg:BaseBitmap = BaseBitmap.create("tailor_iconBtn_down");
		skinHeadBg.x = GameConfig.stageWidth/2 - skinHeadBg.width/2;
		skinHeadBg.y = bg.y + 50;
		this._nodeContainer.addChild(skinHeadBg);

		let icon = BaseLoadBitmap.create(skincfg.icon);
		icon.setScale(0.5);
		
		let skinHead =  BaseLoadBitmap.create(skincfg.icon);
		skinHead.width = 205*0.5;
        skinHead.height = 196*0.5;
		skinHead.x = skinHeadBg.x + skinHeadBg.width/2 - skinHead.width/2;
		skinHead.y = skinHeadBg.y + skinHeadBg.height/2 - skinHead.height/2;
		
        let tailor_headmask = BaseBitmap.create("tailor_headmask");
        let container = new BaseDisplayObjectContainer();
        container.addChild(tailor_headmask);
        this._nodeContainer.addChild(container);
        container.x = skinHeadBg.x + skinHeadBg.width/2 - tailor_headmask.width/2;
        container.y = skinHeadBg.y + skinHeadBg.height/2 - tailor_headmask.height/2 -5;
        skinHead.mask = tailor_headmask;
		this._nodeContainer.addChild(skinHead);
		
		let tipTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt1.text = LanguageManager.getlocal("skinLvupTiptxt1",[skincfg.name,""+skinlv]);
        tipTxt1.x = GameConfig.stageWidth/2 - tipTxt1.width/2;
        tipTxt1.y = skinHeadBg.y + skinHeadBg.height + 10;
        this._nodeContainer.addChild(tipTxt1);

		let lineSp = BaseBitmap.create("skin_lvup_line");
		lineSp.width = 600;
		lineSp.x = GameConfig.stageWidth/2 - lineSp.width/2;
		lineSp.y = tipTxt1.y + 32;
		this._nodeContainer.addChild(lineSp);

		let innerbg = BaseBitmap.create("dinner_list_bg");
		innerbg.width = 580;
		innerbg.x = GameConfig.stageWidth/2 - innerbg.width/2;
		innerbg.y = lineSp.y + 15;
		this._nodeContainer.addChild(innerbg);
		
		let startY = innerbg.y + 15;
		for (var index = 0; index < procfg.length; index++) {
			let Txt1 = ComponentManager.getTextField("",20);
			let textK = procfg[index].txtKey;
			Txt1.text = LanguageManager.getlocal(textK);
			Txt1.x = innerbg.x + 50;
			Txt1.y = startY;
			this._nodeContainer.addChild(Txt1);

			let Txt2 = ComponentManager.getTextField("",20);
			Txt2.x = Txt1.x + 180;
			Txt2.y = Txt1.y ;
			this._nodeContainer.addChild(Txt2);

			let arrowSp =  BaseBitmap.create("servant_arrow");
			arrowSp.x = Txt1.x + 270;
			arrowSp.y = Txt1.y + Txt1.height/2 -  arrowSp.height/2;
			this._nodeContainer.addChild(arrowSp);

			let Txt3 = ComponentManager.getTextField("",20,0x21eb39);
			Txt3.x = Txt1.x + 390;
			Txt3.y = Txt1.y ;
			this._nodeContainer.addChild(Txt3);
			if(index > 0)
			{
				Txt2.text = "+" + procfg[index].value;
				Txt3.text = "+" +(procfg[index].value + 1) ;
				Txt2.x -= 30;
				Txt3.x -= 30;
			}else{
				Txt2.text = "" + procfg[index].value;
				Txt3.text = "" +(procfg[index].value + 1) ;
			}
			// startY += 30;
			if(index < procfg.length -1){
				let lineSp = BaseBitmap.create("rankinglist_line");
				lineSp.x = GameConfig.stageWidth/2 - lineSp.width/2;
				lineSp.y = Txt1.y + 30;
				this._nodeContainer.addChild(lineSp);
				startY += 15;
			}
			startY += 30;

		}

		innerbg.height = startY - innerbg.y + 10;

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2"),20,TextFieldConst.COLOR_WARN_YELLOW);
		tipTxt2.multiline = true;
		tipTxt2.lineSpacing = 10;
		tipTxt2.width = 540;
		// tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt2.x = GameConfig.stageWidth/2 - tipTxt2.width/2;
        tipTxt2.y = innerbg.y + innerbg.height + 20;
        this._nodeContainer.addChild(tipTxt2);
        // this.cacheAsBitmap = true;

		let okBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"skinLvupOkBtn",this.hide,this);
        okBtn.x = GameConfig.stageWidth/2 - okBtn.width/2;
        okBtn.y = bg.y + bg.height + 10;
        this._nodeContainer.addChild(okBtn);
    }

	public getTitleProcfg()
	{
		let titlecfg = Config.TitleCfg.getTitleCfgById(this._titleId);
		let lv = 0;
		let addV1 = 0;
		let addV2 = 0;
		if(titlecfg.effect1)
		{
			addV1 += titlecfg.effect1;
		}
		if(titlecfg.effect2)
		{
			addV2 += titlecfg.effect2;
		}

		if(titlecfg.lvUpEffect1)
		{
			addV1 += titlecfg.lvUpEffect1;
		}
		if(titlecfg.lvUpEffect2)
		{
			addV2 += titlecfg.lvUpEffect1;
		}
			 
		return [{
				txtKey:"skinLvuptxt1",
				value:lv,
			},
			{
				txtKey:"skinLvuptxt2",
				value: addV1 ,
			},
			{
				txtKey:"skinLvuptxt3",
				value: addV1,
			},
			{
				txtKey:"skinLvuptxt4",
				value: addV1,
			},
			{
				txtKey:"skinLvuptxt5",
				value: addV1,
			},
			{
				txtKey:"skinLvuptxt2",
				value: addV2,
			},
			{
				txtKey:"skinLvuptxt3",
				value: addV2,
			},
			{
				txtKey:"skinLvuptxt4",
				value: addV2,
			},
			{
				txtKey:"skinLvuptxt5",
				value: addV2,
			},
		]
	}

	public getWifeSkinProcfg()
	{
		let titlecfg = Config.TitleCfg.getTitleCfgById(this._titleId);
		let skininfo:WifeskinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeSkinId);
		let skincfg = Config.WifeskinCfg.getWifeCfgById(this._wifeSkinId);
		let lv = Api.wifeSkinVoApi.getWifeSkinLV(this._wifeSkinId);
		let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(this._wifeSkinId);
		return [
			{
				txtKey:"skinLvuptxt1",
				value:lv,
			},
			{
				txtKey:"skinLvuptxt2",
				value: addValues[0] ,
			},
			{
				txtKey:"skinLvuptxt3",
				value: addValues[1] ,
			},
			{
				txtKey:"skinLvuptxt4",
				value: addValues[2] ,
			},
			{
				txtKey:"skinLvuptxt5",
				value: addValues[3] ,
			},
			{
				txtKey:"skinLvuptxt6",
				value: addValues[4] ,
			},
			{
				txtKey:"skinLvuptxt7",
				value: addValues[5] ,
			},
			// {
			// 	txtKey:"skinLvupTxt2",
			// 	value: addValues[6]  ,
			// },
			// {
			// 	txtKey:"skinLvupTxt3",
			// 	value: addValues[7] ,
			// },
			// {
			// 	txtKey:"skinLvupTxt4",
			// 	value: addValues[8] ,
			// },
			// {
			// 	txtKey:"skinLvupTxt5",
			// 	value: addValues[9] ,
			// },
		]
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"skin_lvup_word","rankinglist_line","dinner_list_bg","servant_arrow",
			"tailor_headmask","tailor_iconBtn_down","skin_lvup_light","skin_lvup_line",
		]);
	}

    public dispose()
    {
		this._nodeContainer = null;
		this._titleId = null;
	 	this._wifeSkinId = null;
	 	this._serSkinId = null;
        super.dispose();
    }
}