/**
 * 皮肤头像
 * author dky
 * date 2018/3/5
 * @class WifeskinScrollItem
 */
class WifeskinScrollItem extends ScrollListItem 
{
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,wifeSkinItemCfg:Config.WifeSkinItemCfg):void
	{
		this.width = 115+ this.getSpaceX()
		this.height = 110 ;
		let lv = 1;
		if(wifeSkinItemCfg){
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeSkinItemCfg.wifeId);
			if(wifeSkinVo){
				lv = wifeSkinVo.getLvBySkinId(wifeSkinItemCfg.id);
			}
			
		}


		let iconBg:BaseBitmap = BaseBitmap.create("wifeview_hongyantyouxiang1");
		// nameBg.width = this.width;
		iconBg.name = "bg2";
		this.addChild(iconBg);

		let iconStr = ""
		if(wifeSkinItemCfg)
		{
			iconStr = wifeSkinItemCfg.icon
		}
		else{
			let cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId)
			iconStr = cfg.icon;
		}
		let icon = BaseLoadBitmap.create(iconStr);
		icon.width=205;
		icon.height=192;
		icon.setScale(0.5);

		// icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);

		// var circle:egret.Shape = new egret.Shape();
		// circle.graphics.beginFill(0x0000ff);
		// circle.graphics.drawCircle(50,44,40);
		// circle.graphics.endFill();
		let iconMask = BaseBitmap.create("wifeview_iconmask");
		
		this.addChild(iconMask);
		icon.mask = iconMask;
		this.cacheAsBitmap = true;
		
		this.addChild(icon);
		//显示等级
		if(Api.switchVoApi.checkOpenWifeskinLvup()&& wifeSkinItemCfg && wifeSkinItemCfg.canLvup){
			let lvBg = BaseBitmap.create("public_lvupbigbg");
			lvBg.x = iconBg.x + iconBg.width/2 - lvBg.width/2;
			lvBg.y = iconBg.y + iconBg.height - lvBg.height/2;
			this.addChild(lvBg);

			let lvTxt = ComponentManager.getTextField("Lv."+lv,16,TextFieldConst.COLOR_LIGHT_YELLOW);
			lvTxt.x = lvBg.x + lvBg.width/2 - lvTxt.width/2;
			lvTxt.y = lvBg.y + lvBg.height/2 - lvTxt.height/2;
			this.addChild(lvTxt);
		}
		

		let skillDotSp = BaseBitmap.create("public_dot2");
		skillDotSp.x = 80 ;
		skillDotSp.y = 5;
		skillDotSp.name = "redsp";
		this.addChild(skillDotSp);
		if(wifeSkinItemCfg)
		{
			if(!Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId,wifeSkinItemCfg.id))
			{
				skillDotSp.visible = false;
			}
			
		}
		else{
			skillDotSp.visible = false;
		}
		
		
	}

	public getSpaceX():number
	{
		return 0;
	}

	public dispose():void
	{

		super.dispose();
	}
}