/*
author : qinajun
desc : 衣装预览
*/
class AcDestroySamePopupViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _gemTxt : BaseTextField = null;
	private _gemTxt2 : BaseTextField = null;
	private _shopScrollList : ScrollList = null;

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
			case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;

		let cost = 0;
		for(let i in view.cfg.recharge){
			let unit : Config.AcCfg.DSRechargeItemCfg = view.cfg.recharge[i];
			if(unit.getReward.indexOf(view.cfg.coreReward) > -1){
				cost = unit.needGem;
				break;
			}
		}
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 545-10;
		Bg.height = 640;
        Bg.x = 27+5;
        Bg.y = 55;
		view.addChild(Bg);

		if(this.getUiCode() == `4`){
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DESTROYSAME_SHOPBUY, this.shopHandle, this);
			let itembg = BaseBitmap.create("acchristmasview_smalldescbg");
			itembg.setPosition(Bg.x + 90, Bg.y + 15);
			view.addChild(itembg);

			let itemGem = BaseBitmap.create("public_icon1");
			itemGem.setPosition(itembg.x, itembg.y + itembg.height / 2 - itemGem.height / 2);
			view.addChild(itemGem);

			view._gemTxt = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			itembg.width = view._gemTxt.width + 80;
			view._gemTxt.setPosition(itemGem.x + itemGem.width, itembg.y + itembg.height / 2 - this._gemTxt.height / 2)
			view.addChild(this._gemTxt);

			let needid = 2040;
			let numbg2 = BaseBitmap.create(`acchristmasview_smalldescbg`);
			let rectd2 = new egret.Rectangle(0,0,40,40);
			let icon2 = BaseBitmap.create(`zqfshopicon`);
			let numTxt2 = ComponentManager.getTextField(Api.itemVoApi.getItemNumInfoVoById(needid).toString(), 20);
			numbg2.width = numTxt2.width + 80;
			numbg2.setPosition(Bg.x + Bg.width - 90 - numbg2.width, Bg.y + 15);
			this.addChild(numbg2);

			icon2.setPosition(numbg2.x - 3, numbg2.y+numbg2.height/2-icon2.height/2);
			view.addChild(icon2);
			
			numTxt2.setPosition(icon2.x+icon2.width,icon2.y+icon2.height/2-numTxt2.height/2+2);
			view.addChild(numTxt2);
			view._gemTxt2 = numTxt2;

			let rect = new egret.Rectangle(0, 0, 515, Bg.height - 65);
			this._shopScrollList = ComponentManager.getScrollList(AcDestroySameShopScrollItem, view.cfg.getShopCfgList(), rect, { aid: this.param.data.aid, code: this.param.data.code });
			this._shopScrollList.setPosition(Bg.x + 15, Bg.y + 10 + 50);
			this._shopScrollList.bounces = false;
			this.addChild(this._shopScrollList);
		}
		else{
			let skinId = view.cfg.getSkin(this.code)
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
				let bg = BaseLoadBitmap.create(`luckdrawshowbg-1`);
				bg.width = 544;
				bg.height = 400;
				bg.setPosition(Bg.x + Bg.width / 2 - bg.width / 2, Bg.y + 5);
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
					// wife.mask = new egret.Rectangle(-354,-609,914,515);
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
				topbg.setPosition(Bg.x + Bg.width / 2 - topbg.width / 2, Bg.y + 5);
				this.addChild(topbg);
	
				let str = LanguageManager.getlocal(`acCommonSkinGet2`, [cost.toString(), skinCfg.name]);
				let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
				topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
				this.addChild(topDesc);
	
				let skinnamebg = BaseBitmap.create("skin_detail_namebg");
				skinnamebg.setPosition(bg.x, bg.y + 20);
				this.addChild(skinnamebg);
	
				let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
				skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
				this.addChild(skinNameTxt);

				let skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
				if (skinTitle){
					skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 10);
					this.addChild(skinTitle);
				}
	
				let servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
				servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
				this.addChild(servantNameTxt);
	
				let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
				buttomBg.width = 530;
				buttomBg.height = 216;
				buttomBg.setPosition(Bg.x + Bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
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
				bg.setPosition(Bg.x + Bg.width / 2 - bg.width / 2, 0);
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
					droWifeIcon.scaleY = 0.9;
					droWifeIcon.scaleX = 0.9;
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
				topbg.setPosition(Bg.x + Bg.width / 2 - topbg.width / 2, Bg.y + 5);
				this.addChild(topbg);
		
				let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(`acCommonSkinGet1`, [cost.toString(), skinCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
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
				buttomBg.setPosition(Bg.x + Bg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
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
	}

	private freshView():void{
		let view = this;
		if(view._shopScrollList){
			view._shopScrollList.refreshData(this.cfg.getShopCfgList(),{ aid: this.param.data.aid, code: this.param.data.code });
			let numTxt = view._gemTxt;
			numTxt.text = Api.playerVoApi.getPlayerGemStr();
			let needid = 2040;
			view._gemTxt2.text = Api.itemVoApi.getItemNumInfoVoById(needid).toString()
		}
	}

	/** 任务奖励返回 */
	private shopHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardVoList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList,this.vo.lastpos);
			this.vo.lastpos = null;
		}
	}


	public dispose():void{	
		this._nodeContainer =null;
		this._gemTxt = null;
		this._shopScrollList = null;
		this._gemTxt2 = null;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DESTROYSAME_SHOPBUY, this.shopHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
		super.dispose();
	}
}