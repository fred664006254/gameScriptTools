class AcBattlePassRewardPopupViewTab4 extends CommonViewTab
{
    private _downNode:BaseDisplayObjectContainer = null;
    private _itemNUm:BaseTextField = null;
    private _desc:BaseTextField = null;
    private _bg2:BaseBitmap = null;

    public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected get uicode():string{
        let code = ``;
        switch(Number(this.code)){
            case 2:
                code = '1';
				break;
			case 7:
				code = '4';
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }


    protected initView():void{   
        let view = this;
        view.height = 780;
        view.width = 544;
        let index = 4;
        let baseview : any = ViewController.getInstance().getView(ViewConst.POPUP.ACBATTLEPASSREWARDPOPUPVIEW);
        let tabarr = baseview.getTabbarTextArr();
        let tabcfg = tabarr[index - 1].split(`_`);
        let type = Number(tabcfg[1]);
        //门客预览//红颜预览
        let rewardvo = GameData.formatRewardItem(view.cfg.showDetail[index - 1])[0];
        if(type == 8 || type == 10){
            view.initServantWife(rewardvo.id);
        }
        //红颜皮肤、门客皮肤
        else if(type == 16 || type == 19){
            view.initSkin(rewardvo.id.toString());
        }
        else if(type == 11){
			view.initTitle(rewardvo.id);
			 // //头像框
			 // if(Number(tabcfg[2]) == 2){
 
			 // }
			 // //称号
			 // else if(Number(tabcfg[2]) == 1 || (Number(tabcfg[2]) == 4)){
 
			 // }
		}
		else if(type == 1025 || type == 1026){
			view.initUnlockPos();
		}

        let topbg = BaseBitmap.create(`battlepassrewardwordbg`);
    }

	private initSkin(skinId : string):void{
		let view  = this;
		let need = 0;
		let reward = view.cfg.show1.reward;
		for(let i in reward){
			let vo = GameData.formatRewardItem(reward[i][0])[0];
			if(vo.id == Number(skinId)){
				need = reward[i][1];
				break;
			}
		}
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

			let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlockwifetip`, this.uicode), [need.toString(), skinCfg.name]);
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
	
			let bg = BaseLoadBitmap.create(`luckdrawshowbg-1`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(12,55);
			this.addChild(bg);
	
	
			let rect = new egret.Rectangle(0, 0, 544, 364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
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
			topbg.width = 544;
			topbg.height = 36;
			topbg.setPosition(bg.x + bg.width / 2 - topbg.width / 2, bg.y);
			this.addChild(topbg);
	
			let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlockservanttip`, this.uicode), [need, skinCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
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
			buttomBg.width = 530;
			buttomBg.height = 275+20;
			buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 269+20;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);
	
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
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

	private initServantWife(wifeId):void{
        let view = this;
        let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        let isWife = false;
        if(wifeCfg){
            isWife = true;
		}
		let need = 0;
		let reward = view.cfg.show1.reward;
		for(let i in reward){
			let vo = GameData.formatRewardItem(reward[i][0])[0];
			if(vo.id == Number(wifeId)){
				need = reward[i][1];
				break;
			}
		}
		if (isWife){
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
			let bg = BaseLoadBitmap.create(`sevendayssignupview_infobg_7`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2 + 13, 90);
			this.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 544, 368);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 368;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let wife = null;
			if (wifeCfg && wifeCfg.bone) {
				boneName = wifeCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
				wife.width = 354;
				wife.height = 611;
				wife.mask = new egret.Rectangle(-354, -800, 914, 700);
				wife.setScale(0.7);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 468]);
			}
			else {
				wife = BaseLoadBitmap.create(wifeCfg.body);
				wife.setScale(0.5);
				wife.mask = new egret.Rectangle(0, 0, 640, 700);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 49]);
			}
			view.addChild(wife);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 13, 56);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 544;
			topbgLine.setPosition(topbg.x, topbg.y - 2);
			this.addChild(topbgLine);
			
			let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlockwifetip`, this.uicode), [need.toString(), wifeCfg.name]);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('wife') , TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 13, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			//初始魅力
			let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
			let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(initialCharmTxt);
			//加成门客
			let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
			let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
			this.addChild(servantAddTxt);

			let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
			let wifeDescTxt = ComponentManager.getTextField(wifeDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			wifeDescTxt.lineSpacing = 3;
			wifeDescTxt.width = descBg.width - 50;
			wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(wifeDescTxt);
		}
		else {
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeId);
			let dagonBonesName = `servant_full2_${wifeId}`;

			let bg = BaseLoadBitmap.create(`acchristmasview_rewardmidbg`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2 + 13, 90);
			this.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 544, 368);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 368;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let servant = null;
			if (servantCfg && dagonBonesName) {
				boneName = dagonBonesName + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				// servant.width = 354;
				// servant.height = 611;
				// wife.setAnchorOffset(-138.5, -610);
				// if(PlatformManager.checkIsThSp())
				// {
				//     wife.setAnchorOffset(-138.5, -650);
				// }
				servant.mask = new egret.Rectangle(-354, -609, 914, 580);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [300, 419]);
			}
			else {
				servant  = BaseLoadBitmap.create(servantCfg.fullIcon);
				servant.width = 405;
				servant.height = 467;
				servant.setScale(0.8);
				servant.mask = new egret.Rectangle(0, 0, 405, 467);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [110, 20]);
			}
			view.addChild(servant);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 13, 56);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 544;
			topbgLine.setPosition(topbg.x, topbg.y - 2);
			this.addChild(topbgLine);
			let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlockservanttip`, this.uicode),[String(need), servantCfg.name]);
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('servant'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);


			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 13, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);


			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//综合资质
			let aptitudeStr = LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [Api.servantVoApi.getServantAptitude(wifeId)+'']);
			let aptitudeTxt = ComponentManager.getTextField(aptitudeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			aptitudeTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(aptitudeTxt);
			//门客特长
			let speciality = servantCfg.speciality;
			let specialityStr = "";
			for (let i = 0; i < speciality.length; i++) {
				specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
			}
			let servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr.substr(0, specialityStr.length - 1)]);
			let servantTF = ComponentManager.getTextField(servantTFStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			//let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantTF.setPosition(buttomBg.x + 30, aptitudeTxt.y + 30);
			this.addChild(servantTF);

			let servantDescStr = servantCfg.story;
			let servantDescTxt = ComponentManager.getTextField(servantDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantDescTxt.lineSpacing = 3;
			servantDescTxt.width = descBg.width - 50;
			servantDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(servantDescTxt);
		}
	}
	
	private initTitle(titleid):void{
		let view = this;
		let tcfg = Config.TitleCfg.getTitleCfgById(titleid);
		let pos = {
			1 : {
				scale : 0.7, layout : LayoutConst.rightbottom, dis : [50,70], arrowx : -20, arrowy : 15, rotaion : 120, 
			},
			2 : {
				scale : 0.7, layout : LayoutConst.horizontalCenterbottom, dis : [0,140], arrowx : -25, arrowy : -5, rotaion : 120, 
			},
			3 : {
				scale : 0.8, layout : LayoutConst.leftbottom, dis : [20,250], arrowx : 135, arrowy : 0, rotaion : -120, 
			},
			4 : {
				scale : 0.9, layout : LayoutConst.horizontalCenterbottom, dis : [-15,370],arrowx : 145, arrowy : 30, rotaion : -120, 
			},
			5 : {
				scale : 1, layout : LayoutConst.rightbottom, dis : [25,460]
			},
		}

		if(tcfg.changePic){
			let bigbg = BaseBitmap.create(`battlepassrewardbg`);
			bigbg.height = 668;
			bigbg.setPosition(12, 55);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bigbg, view);
			view.addChild(bigbg);
	
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bigbg);
			view.addChild(topbg);

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktitletip`, this.uicode), [LanguageManager.getlocal(`battlepassreward_11_${tcfg.isTitle}`)]),20);
			tipTxt.lineSpacing = 5;
			tipTxt.textAlign = egret.HorizontalAlign.CENTER;
			topbg.height = tipTxt.textHeight + 30;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,10]);
			view.addChild(tipTxt);
			for(let i in tcfg.changePic){
				let unit = tcfg.changePic[i];
				let idx = Number(i) + 1;
				let poscfg = pos[idx];
				let group = new BaseDisplayObjectContainer();
				view.addChild(group);
				group.setScale(poscfg.scale);

				let ishead = tcfg.isTitle == 2;
				let headbg = BaseBitmap.create(`battlepassrewardbg${ishead ? 2 : 1}`);
				group.addChild(headbg);

				let headcircle = ishead ? App.CommonUtil.getHeadPic(tcfg.id, unit) : App.CommonUtil.getTitlePic(tcfg.id, unit);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headcircle, headbg, [0,ishead?5:50]);
				group.addChild(headcircle);

				let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_lv`, [unit.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, levelTxt, headbg, [0,7]);
				group.addChild(levelTxt);

				App.DisplayUtil.setLayoutPosition(poscfg.layout, group, bigbg, poscfg.dis);

				if(poscfg.arrowx){
					let arrow = BaseBitmap.create(`studyatk_arrow`);
					arrow.anchorOffsetX = arrow.width / 2;
					arrow.anchorOffsetY = arrow.height / 2;
					arrow.setScale(0.6);
					arrow.x = group.x + poscfg.arrowx;
					arrow.y = group.y + poscfg.arrowy;

					arrow.rotation = poscfg.rotaion;
					view.addChild(arrow);
				}
			}
		}
		else{
			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.setPosition(12, 55);
			view.addChild(topbg);

			let bg = BaseLoadBitmap.create("acgiftreturnview_common_titlebg");
			bg.width = 544;
			bg.height = 204;
			bg.setPosition(12, 100);
			this.addChild(bg);

			let headCntainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), tcfg.id);
			headCntainer.setPosition(bg.x + bg.width / 2 - headCntainer.width / 2, bg.y + bg.height / 2 - headCntainer.height / 2 - 10);
			this.addChild(headCntainer);

			let need = 0;
			let reward = view.cfg.show1.reward;
			for(let i in reward){
				let vo = GameData.formatRewardItem(reward[i][0])[0];
				if(vo.id == Number(titleid)){
					need = reward[i][1];
					break;
				}
			}

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktitletip2`, this.uicode), [need.toString(), tcfg.name]),20);
			tipTxt.lineSpacing = 5;
			tipTxt.textAlign = egret.HorizontalAlign.CENTER;
			topbg.height = tipTxt.textHeight + 30;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,10]);
			view.addChild(tipTxt);

			let titleNameTF = ComponentManager.getTextField(tcfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			titleNameTF.setPosition(bg.x + bg.width / 2 - titleNameTF.width / 2, bg.y + 172 - titleNameTF.height / 2);
			this.addChild(titleNameTF);


			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 526;
			buttomBg2.height = 206;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let titleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("headEffect" + tcfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
			titleTipTxt.width = 480;
			titleTipTxt.lineSpacing = 3;
			titleTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - titleTipTxt.width / 2, buttomBg2.y + 20);
			this.addChild(titleTipTxt);

			let infoBg = BaseBitmap.create("public_9_managebg")
			infoBg.width = 510;
			infoBg.height = 74;
			infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, titleTipTxt.y + titleTipTxt.height + 13);
			this.addChild(infoBg);

			for (let index = 0; index < 4; index++) {
				let desc = ComponentManager.getTextField(LanguageManager.getlocal("acTailAttrAdd" + String(index + 1), [String(tcfg.effect1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
				let posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
				let posY = index > 1 ? infoBg.y + 41 : infoBg.y + 13;
				desc.setPosition(posX, posY);
				this.addChild(desc);
			}

			let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonTitlePopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
			this.addChild(buttomTipTxt);
		}
	}

	private initUnlockPos():void{
		let view = this;
		let bigbg = BaseBitmap.create(`battlepassrewardbg`);
		bigbg.height = 668;
		bigbg.setPosition(12, 55);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bigbg, view);
		view.addChild(bigbg);

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bigbg);
		view.addChild(topbg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlepassunlockpostip`, [String(TextFieldConst.COLOR_WARN_YELLOW)]),20);
		tipTxt.lineSpacing = 5;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		topbg.height = tipTxt.textHeight + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,10]);
		view.addChild(tipTxt);

		let tipimg = BaseLoadBitmap.create(`functionPreview15`);
		tipimg.width = 492;
		tipimg.height = 222;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipimg, topbg, [0,topbg.height+25]);
		view.addChild(tipimg);

		let kuangbg = BaseBitmap.create(`public_9_bg67`);
		kuangbg.width = tipimg.width + 10;
		kuangbg.height = tipimg.height + 6;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuangbg, tipimg);
		view.addChild(kuangbg);

		let numbg = BaseBitmap.create(`qingyuanitemtitlebg`);
		view.addChild(numbg);

		let total1 = 0;
		let total2 = 0;
		let pos1 = `1025_${this.code}`;
		let pos2 = `1026_${this.code}`;
		for(let i in view.cfg.battlePass){
			let unit = view.cfg.battlePass[i];
			if(unit.intermediate){
				for(let j in unit.intermediate){
					if(unit.intermediate[j][0].indexOf(pos1) > -1){
						++ total1;
					}
					if(unit.intermediate[j][0].indexOf(pos2) > -1){
						++ total2;
					}
				}
			}
		}
		let numtxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlepassunlockposnum`, [view.vo.getServantBanPos().toString(),total1.toString()]), 20);
		numbg.width = numtxt.textWidth + 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numbg, tipimg, [0,10]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numtxt, numbg);
		view.addChild(numtxt);

		let tipimg2 = BaseLoadBitmap.create(`functionPreview16`);
		tipimg2.width = 492;
		tipimg2.height = 222;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipimg2, tipimg, [0,tipimg.height+40]);
		view.addChild(tipimg2);

		let kuangbg2= BaseBitmap.create(`public_9_bg67`);
		kuangbg2.width = tipimg2.width + 10;
		kuangbg2.height = tipimg2.height + 6;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuangbg2, tipimg2);
		view.addChild(kuangbg2);

		let numbg2 = BaseBitmap.create(`qingyuanitemtitlebg`);
		view.addChild(numbg2);

		let numtxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`battlepassunlockposnum`, [view.vo.getWifeBanPos().toString(),total2.toString()]), 20);
		numbg2.width = numtxt2.textWidth + 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numbg2, tipimg2, [0,10]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numtxt2, numbg2);
		view.addChild(numtxt2);
		
	}

    public dispose():void{
		super.dispose();
	}
}