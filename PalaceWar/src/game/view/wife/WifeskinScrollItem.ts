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
	public initItem(index:number,wifeSkinItemCfg:Config.WifeSkinItemCfg):void
	{
		this.width = 130+ this.getSpaceX()
		this.height = 110 ;

		let bg = BaseBitmap.create("public_alphabg");
		bg.width = this.width;
		bg.height = this.height;
		this.addChild(bg);

		let iconBg:BaseBitmap = BaseBitmap.create("tailor_iconBtn");
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
		icon.setScale(0.5);

		// icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);

		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x0000ff);
		circle.graphics.drawCircle(55,44,44);
		circle.graphics.endFill();
		this.addChild(circle);
		icon.mask = circle;
		this.cacheAsBitmap = true;
		
		this.addChild(icon);

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
			if(wifeSkinItemCfg.canAtHome){
				let homeimg = BaseBitmap.create("wifehome1");
				this.addChild(homeimg);
				homeimg.x = 70;
				homeimg.y = 60;
			}
			
		}
		else{
			skillDotSp.visible = false;
			let cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId)
			if(cfg.canAtHome){
				let homeimg = BaseBitmap.create("wifehome1");
				this.addChild(homeimg);
				homeimg.x = 70;
				homeimg.y = 60;
			}
		}	

		if (wifeSkinItemCfg){
			let skinTitle = App.CommonUtil.getWifeSkinFlagById(wifeSkinItemCfg.id);
			if (skinTitle){
				skinTitle.setScale(0.8);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTitle, iconBg, [0, 0]);
				this.addChild(skinTitle);
			}
		}
		
	}

	public getSpaceX():number
	{
		return 10;
	}

	public dispose():void
	{

		super.dispose();
	}
}