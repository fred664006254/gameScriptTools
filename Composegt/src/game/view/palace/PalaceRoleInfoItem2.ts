/**
 * 皇宫
 * author yanyuling
 * date 2018/03/27
 * @class PalaceRoleInfoItem2
 */
class PalaceRoleInfoItem2 extends ScrollListItem
{
	private _curTitleId:string;
	// static buildingId:string = "";
	public constructor()
	{
		super();
	}
	protected initItem(index:number,data:any)
	{
		this._curTitleId = data;

		let bg = BaseBitmap.create("palace_perbg");
		// bg.addTouchTap(this.detailHandler,this);
		this.width = bg.width + this.getSpaceX();
		this.height = bg.height + this.getSpaceY();
		this.addChild(bg)

		let roleInfo = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId);
		let nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(roleInfo.name)
		{
			nameTxt.text = roleInfo.name ;
			nameTxt.size = 20;
			nameTxt.y = 14;
		}else{
			nameTxt.text = LanguageManager.getlocal("palace_titleTip_"+ this._curTitleId);
			nameTxt.size = 14;
			nameTxt.y = 16;
			// LanguageManager.getlocal("playerview_Nopo");
		}
		nameTxt.x = bg.width/2 - nameTxt.width/2;
		
		this.addChild(nameTxt);
		
		let roleImg = undefined;
		if(roleInfo.name)
		{
			roleImg = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId),roleInfo.pic );
			roleImg.anchorOffsetX = roleImg.width/2;
			roleImg.setScale(0.35);
		}else{
			roleImg = BaseLoadBitmap.create("palace_role_empty");
			roleImg.width = 382;
			roleImg.height = 712;
			roleImg.anchorOffsetX = roleImg.width/2;
			roleImg.setScale(0.35);
		}
		roleImg.x = bg.width/2;
		roleImg.y = 45;
		this.addChild(roleImg);


				


		let titleImg = BaseLoadBitmap.create("user_title_"+ this._curTitleId +"_2");

		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal()){
			titleImg.width = 129;
			titleImg.height = 53;
		
			titleImg.anchorOffsetX = titleImg.width/2;
			titleImg.anchorOffsetY = titleImg.height/2;
			titleImg.setScale(0.65);
			titleImg.x = this.width/2;
			titleImg.y = this.height - 85;
			
		} else {
			titleImg.width = 47;
			titleImg.height = 103;
			titleImg.x = 15;
			titleImg.y = roleImg.y;
		}
		this.addChild(titleImg)

		let hisBtn = ComponentManager.getButton("palace_hisBtn3","",this.hisBtnHandler,this);
		hisBtn.x = bg.width - hisBtn.width-10;
		hisBtn.y = bg.height - hisBtn.height-10;
		this.addChild(hisBtn);
    }

	private detailHandler()
	{
		// ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:this._curTitleId,buildingId:PalaceRoleInfoItem2.buildingId});
	}
	private hisBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW,{titleId:this._curTitleId});
	}
	public getSpaceX():number
	{
		return 3;
	}
	public getSpaceY():number
	{
		return 3;
	}

	public dispose():void
	{
		this._curTitleId = null;
		super.dispose();
	}
}