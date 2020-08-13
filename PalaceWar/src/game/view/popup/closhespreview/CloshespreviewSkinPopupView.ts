/**
 * 衣装预览 皮肤
 * @author shaoliang
 * date 2019/5/7
 * @class CloshespreviewSkinPopupView
 */

class CloshespreviewSkinPopupView extends PopupView {

	public constructor() {
		super();
	}


	protected initView(): void {
		let view = this;
		
        let skinId:string = this.param.data.sid;


			let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);

			let bg:BaseLoadBitmap;
			if (skinId == "2111" || skinId == "2022")
			{	
				bg = BaseLoadBitmap.create(`acthrowarrowview_wifeskinbg`);
			}
			else
			{
				bg = BaseLoadBitmap.create(`luckdrawshowbg-1`);
			}
			
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
			topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
			this.addChildToContainer(topbg);

			let topDesc = ComponentManager.getTextField(this.param.data.title, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
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

			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 505;
			descBg.height = 90;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
			this.addChildToContainer(descBg);

			let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
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

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}

	protected getTitleStr(): string {
		return "acWealthCarpServantSkinRewardPopupViewTitle-1";
	}

	protected getShowHeight() {
		return 720;
	}

	public dispose(): void {
		super.dispose();
	}
}