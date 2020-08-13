/**
 * 	储值宝箱皮肤奖励预览
 * author 钱竣
 */
class AcRechargeBoxSkinPopupView extends PopupView {
	public constructor() {
		super();
	}
	private get cfg() : Config.AcCfg.RechargeBoxCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRechargeBoxVo{
        return <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid():string{
		return this.param.data.aid;
	}
	
	private get code():string{
		return this.param.data.code;
	}

	private get newCode():string{
		let code = ``;
		switch(Number(this.code)){
			case 6:
				code = `3`;
				break;
			case 5:
				code = `1`; 
				break;
			case 7:
				code = `4`;
				break;
			case 8:
			case 9:
			case 10:
			case 11:
				code = `5`;
				break;
			case 12:
			case 13:
			case 14:
			case 15:
				code = `12`;
				break;
			case 17:
				code = `16`;
				break;
			case 21:
				code = `20`;
				break;
			case 23:
				code = `22`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

	protected initView(): void {
		let view = this;
		let obj = {
			3 : 'wife'
		};
		let isWifeskin = obj[this.newCode] == `wife`;
		if(isWifeskin){
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.getSkin(view.newCode));
			let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);

			let bg = BaseLoadBitmap.create(`luckdrawshowbg-${1}`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
			this.addChildToContainer(bg);


			let rect = new egret.Rectangle(0,0,544,364-1);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 364;
			maskContan.mask =rect;
			maskContan.setPosition(0,bg.y + 30);
			this.addChildToContainer(maskContan);

			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				wife.width = 354;
				wife.height = 611;
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
			topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
			this.addChildToContainer(topbg);

			let needCharge = view.cfg.getBoxListData();
			let num = 0;
			for(let i in needCharge){
				if(needCharge[i].getReward.indexOf(view.cfg.getSkin(view.newCode)) > -1){
					let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(needCharge[i].needGem);
					if(cfg){
						num = cfg.gemCost;
					}
					break;
				}
			}
			
			let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(`acRechargeBoxSkinTip`,[num.toString(),wifecfg.name, Config.WifeskinCfg.getWifeCfgById(view.cfg.getSkin(view.newCode)).name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			this.addChildToContainer(topDesc);

			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			this.addChildToContainer(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			this.addChildToContainer(skinNameTxt);

			let servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			this.addChildToContainer(servantNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 216;
			buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChildToContainer(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChildToContainer(buttomBg2);

			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			this.addChildToContainer(skinTipTxt);

			// let addAbility = skinCfg.addAbility;
			// for (let index = 0; index < addAbility.length; index++) {
			// 	let bnode = new ServantSkinBookScrollItem();
			// 	bnode.init(skinCfg.id, index, skinCfg.servantId, 450);
			// 	bnode.setPosition(skinTipTxt.x + 15, skinTipTxt.y + skinTipTxt.height + 15);
			// 	this.addChildToContainer(bnode);
			// }
			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 505;
			descBg.height = 90;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
			this.addChildToContainer(descBg);

			let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(view.cfg.getSkin(view.newCode), true);
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
				this.addChildToContainer(tipTxt);
			}

			let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
			this.addChildToContainer(buttomTipTxt);
		}
		else{
			let view = this;
			let acCfg = this.cfg;
			let skinid = acCfg.getSkin(view.newCode);
			let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
			let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
	
			let bg = BaseLoadBitmap.create(`luckdrawshowbg-${view.newCode}`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
			this.addChildToContainer(bg);
	
	
			let rect = new egret.Rectangle(0, 0, 544, 364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 364;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChildToContainer(maskContan);
	
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.scaleY = 0.9;
				droWifeIcon.scaleX = -0.9;
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
			topbg.width = 544;
			topbg.height = 36;
			topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
			this.addChildToContainer(topbg);
	
			// let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawAwardTip1-` + this.code, [view.cfg.getTotalProgress().toString(), view.cfg.getSkinName(view.code)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			// topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			// this.addChildToContainer(topDesc);
	
			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			this.addChildToContainer(skinnamebg);
	
			let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			this.addChildToContainer(skinNameTxt);
	
			let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			this.addChildToContainer(servantNameTxt);
	
			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 275+20;
			buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChildToContainer(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 269+20;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChildToContainer(buttomBg2);
	
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			this.addChildToContainer(skinTipTxt);
	
			let addAbility = skinCfg.addAbility;
			for (let index = 0; index < addAbility.length; index++) {
				let bnode = new ServantChangeSkinBookItem();
				bnode.initItem(index,addAbility[index], [skinCfg.id]);
				bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
				this.addChildToContainer(bnode);
			}
		
			// let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpServantSkinRewardPopupViewButtomDesc-1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			// buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
			// this.addChildToContainer(buttomTipTxt);
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg","servant_star",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
		]);
	}

	protected getTitleStr(): string {
		return "dailyTaskRewardPreviewPopuiViewTitle";
	}

	// protected getShowHeight() {
	// 	return 760;
	// }

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose(): void {
		super.dispose();
	}
}