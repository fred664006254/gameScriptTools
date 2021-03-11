class AcBeatXiongNuRewardViewTab4 extends CommonViewTab{  

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.BeatXiongNuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBeatXiongNuVo{
        return <AcBeatXiongNuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
		return `${this.param.data.aid}`;
	}
  
	private get code() : string{
		return `${this.param.data.code}`;
	}
  
	protected getUiCode():string{
		let code = '';
		switch(Number(this.code)){
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

    protected initView():void{
		let view = this;
		view.height = 660;
		view.width = 532;

		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 537;
		Bg.height = 695;
		Bg.x = 22;
        Bg.y = 74;
		view.addChild(Bg);

		// view.initSkin(this.cfg.show.toString());

		
        let code = view.getUiCode();
        let viewClass = `AcCommonRewardClothesView`;
        let tabveiwClass:any = egret.getDefinitionByName(viewClass);
        let wifeId = this.cfg.show;
        let wifeTopMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip2`, view.code),[view.cfg.getGemNeed().toString(), view.cfg.getSkinName(view.code)]);
        let wifeBg = "acthreekingdomrecharge_skinbg";
        // let data = [
        //     {id:""+wifeId, type:"wife", topMsg:wifeTopMsg, bgName:wifeBg,scale:0.6},
        //     {id:""+servantSkinId, type:"servant", topMsg:servantTopMsg, bgName:servantBg,scale:0.8},
        // ];
        // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONCLOTHESPOPUPVIEW, data);
        let wifeType = Config.ServantskinCfg.formatRewardItemVoStr(wifeId);
        let data = {data:[
            {idType:wifeType, topMsg:wifeTopMsg, bgName:wifeBg, scale:0.9, listbg:`beatxiongnulistbg`},
        ]};
        let tabview = new tabveiwClass(data.data[0]);
        tabview.show();
        tabview.setScale(528/540);
        tabview.x = 26;
        tabview.y = 78;
        view.addChild(tabview);
	}

	private initSkin(skinId : string):void{
		let view  = this;
		let need = view.cfg.getGemNeed();
        let skinCfg : any = Config.WifeskinCfg.getWifeCfgById(skinId);
        let isWifeskin = false;
        if(skinCfg){
            isWifeskin = true;
        }
        else{
            skinCfg =  Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
		if(isWifeskin){
			let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);

			let bg = BaseLoadBitmap.create(`acthrowarrowview_wifeskinbg`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(12,55);
			this.addChild(bg);

			let rect = new egret.Rectangle(0,0,544,364-1);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 364;
			maskContan.mask =rect;
			maskContan.setPosition(0,bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				wife.width = 354;
				wife.height = 611;
				// wife.setAnchorOffset(-138.5, -610);
				// if(PlatformManager.checkIsThSp())
				// {
				//     wife.setAnchorOffset(-138.5, -650);
				// }
				// wife.mask = new egret.Rectangle(-354,-609,914,510);
				wife.setScale(0.7);  
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270,460+3]);
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.setScale(0.5);
				// wife.mask = new egret.Rectangle(0,0,640,700);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125,40]);
			}
			maskContan.addChild(wife);
			
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 36;
			topbg.setPosition(bg.x + bg.width / 2 - topbg.width / 2, bg.y);
			this.addChild(topbg);

			let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip2`, view.code),[view.cfg.getGemNeed().toString(), view.cfg.getSkinName(view.code)]);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			this.addChild(topDesc);

			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			this.addChild(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			this.addChild(skinNameTxt);

			let servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			this.addChild(servantNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 216;
			buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			this.addChild(skinTipTxt);

			// let addAbility = skinCfg.addAbility;
			// for (let index = 0; index < addAbility.length; index++) {
			// 	let bnode = new ServantSkinBookScrollItem();
			// 	bnode.init(skinCfg.id, index, skinCfg.servantId, 450);
			// 	bnode.setPosition(skinTipTxt.x + 15, skinTipTxt.y + skinTipTxt.height + 15);
			// 	this.addChild(bnode);
			// }
			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 505;
			descBg.height = 90;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
			this.addChild(descBg);

			let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			//getWifeSkinProAdd
			let txt = [
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
			];
			for(let i in txt){
				let tmp = txt[i];
				let str = String(tmp.value);
				if(Number(i) < 4 && tmp.value == 0){
					str = addValues[Number(i) + 6] * 100 + "%";
				}
				let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${tmp.txtKey}`)+`：<font color=0x3e9b00>+${str}</font>`, 18, TextFieldConst.COLOR_BLACK);
				tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
				tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 18 + (Math.floor(Number(i) / 2) + 1) * 10;
				this.addChild(tipTxt);
			}

			let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
			this.addChild(buttomTipTxt);
		}
		else{
			let view = this;
			let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
	
			let bg = BaseLoadBitmap.create(`acthrowstone_servant_preview_bg`);
			bg.width = 510;
			bg.height = 400;
			bg.setPosition(55,55);
			this.addChild(bg);
	
	
			let rect = new egret.Rectangle(0, 0, bg.width, 364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = bg.width;
			maskContan.height = 364;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);
	
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.anchorOffsetY = droWifeIcon.height;
				droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
				droWifeIcon.x = maskContan.width / 2;
				droWifeIcon.y = maskContan.y + maskContan.height - 5;
				maskContan.addChild(droWifeIcon);
			}
			else {
				let skinImg = BaseLoadBitmap.create(skinCfg.body);
				skinImg.width = 405;
				skinImg.height = 467;
				skinImg.anchorOffsetY = skinImg.height;
				skinImg.anchorOffsetX = skinImg.width / 2;
				skinImg.setScale(0.87);
				skinImg.x = maskContan.width / 2;
				skinImg.y = maskContan.y + maskContan.height - 5;
				maskContan.addChild(skinImg);
			}
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = bg.width;
			topbg.height = 36;
			topbg.setPosition(bg.x + bg.width / 2 - topbg.width / 2, bg.y);
			this.addChild(topbg);
	
			let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acbeatxiongnutip2`, view.code),[view.cfg.getGemNeed().toString(), view.cfg.getSkinName(view.code)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			this.addChild(topDesc);
	
			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			this.addChild(skinnamebg);
	
			let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			this.addChild(skinNameTxt);
	
			let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			this.addChild(servantNameTxt);
	
			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = bg.width - 10;
			buttomBg.height = 275+20;
			buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = bg.width - 15;
			buttomBg2.height = 269+20;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);
	
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = bg.width - 60;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			this.addChild(skinTipTxt);
	
			let addAbility = skinCfg.addAbility;
			for (let index = 0; index < addAbility.length; index++) {
				let bnode = new ServantChangeSkinBookItem();
				bnode.initItem(index,addAbility[index], [skinCfg.id]);
				bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
				this.addChild(bnode);
			}

			// let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyServantSkinPopupViewButtomDesc-1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			// buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
			// this.addChild(buttomTipTxt);
		}
    }

	
    public dispose(): void {
		let view = this;
		super.dispose();
	}
}