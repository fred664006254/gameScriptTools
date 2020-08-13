/**
 * 新版升级皮肤头像
 * author qianjun
 * @class WifeskinNewScrollItem
 */
class WifeskinNewScrollItem extends ScrollListItem 
{
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,wifeSkinItemCfg:Config.WifeSkinItemCfg):void
	{
		this.width = 100+ this.getSpaceX()
		this.height = index == 0 ?  157 : 120;
		
		let tmpY = 0;
		if(index == 0){
			let top = BaseBitmap.create(`wifeskinropetop`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top, this, [0,0], true);
			this.addChild(top);
			tmpY = top.height;
		}
		let line = BaseBitmap.create(`wifeskinrope`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, this, [0,tmpY], true);
		this.addChild(line);


		let iconBg:BaseBitmap = BaseBitmap.create("tailor_iconBtn");
		// nameBg.width = this.width;
		iconBg.setScale(0.85);
		iconBg.name = "bg2";
		this.addChild(iconBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBg, line, [0,line.height]);

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
		icon.setScale(0.42);
		icon.x = 0;
		icon.y = 40 + tmpY;
		// icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);

		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x0000ff);
		circle.graphics.drawCircle(47,36,36);
		circle.graphics.endFill();
		circle.y = icon.y+2;
		circle.x = 4;
		this.addChild(circle);
		icon.mask = circle;
		this.cacheAsBitmap = true;
		
		this.addChild(icon);

		let skillDotSp = BaseBitmap.create("public_dot2");
		skillDotSp.x = 60 ;
		skillDotSp.y = 35;
		skillDotSp.name = "redsp";
		this.addChild(skillDotSp);

		if(wifeSkinItemCfg)
		{
			if(!Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId,wifeSkinItemCfg.id))
			{
				skillDotSp.visible = false;
			}
			if(wifeSkinItemCfg.canAtHome){
				let homeimg = BaseBitmap.create("wifehome3");
				this.addChild(homeimg);
				// homeimg.x = 50;
				// homeimg.y = 85;
				homeimg.x = 3;
				homeimg.y = 42;
			}
		}
		else{
			skillDotSp.visible = false;
			let cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId)
			if(cfg.canAtHome){
				let homeimg = BaseBitmap.create("wifehome3");
				this.addChild(homeimg);
				// homeimg.x = 50;
				// homeimg.y = 86;
				homeimg.x = 3;
				homeimg.y = 74;
			}
		}
		
		if (wifeSkinItemCfg){
			let skinTitle = App.CommonUtil.getWifeSkinFlagById(wifeSkinItemCfg.id);
			if (skinTitle){
				skinTitle.setScale(0.7);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTitle, this, [0, -3]);
				this.addChild(skinTitle);
			}
		}
	}

	public getSpaceX():number
	{
		return 0;
	}

	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{

		super.dispose();
	}
}