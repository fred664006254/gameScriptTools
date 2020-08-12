class BoxExtendTip extends BaseDisplayObjectContainer{
    public constructor() {
		super();
	}

    public init(id : string, cardtype : number, point : egret.Point):void{
		let view = this;
		let boxCfg = Config.BoxCfg.getBoxCfgById(id);
		let pool = boxCfg.getCardPool(cardtype);
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		let mask = BaseBitmap.create(`public_alpha`);
		mask.width = view.width;
		mask.height = view.height;
		view.addChild(mask);
		mask.addTouchTap(()=>{
			view.dispose();
			view = null;
		},view);

		let bubbleGroup = new BaseDisplayObjectContainer();
		view.addChild(bubbleGroup);

		let bubblebg = BaseBitmap.create(`boxrewardbulltebg`);//`public_bubblebg`);
		bubbleGroup.addChild(bubblebg);

		let random = boxCfg.getCardRatioShow(cardtype);
		let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(random ? `shopboxrandomget` : `shopboxget${pool.length>1?"1":""}`), TextFieldConst.SIZE_18, ColorEnums.white);
		tipTxt.bold = true;
		tipTxt.stroke = 1;
		tipTxt.strokeColor = 0;
		bubbleGroup.addChild(tipTxt);

		let poolGroup = new BaseDisplayObjectContainer();
		bubbleGroup.addChild(poolGroup);

		// let arrow = BaseBitmap.create(`public_bubblearrow`);
		// view.addChild(arrow);
		let tmpX = 0;
		let len = pool.length;
		let scale = 0.6;
		for(let i = 0; i < len; ++ i){
			let id = `100_${pool[i]}_1`;
			let rewardvo = GameData.formatRewardItem(id)[0];
			
			let iconbg = BaseBitmap.create(`bird_team_item_${Config.DiceCfg.getCfgById(rewardvo.id).quality}`);
			poolGroup.addChild(iconbg);
			iconbg.setScale(scale);

			let name = ComponentMgr.getTextField('11', TextFieldConst.SIZE_16, GameConfig.getQualityColor(Config.DiceCfg.getCfgById(rewardvo.id).quality));
			poolGroup.addChild(name);
			name.text = rewardvo.name;
			name.textAlign = egret.HorizontalAlign.CENTER;
			name.stroke = 1;
			name.strokeColor = 0;
			name.width = iconbg.width * scale;

			let icon = GameData.getItemIcon(rewardvo);
			// icon.width = icon.height = 86;
			poolGroup.addChild(icon);
			icon.setScale(scale);

			iconbg.x = tmpX;
			name.x = iconbg.x;
			name.y = iconbg.y + iconbg.height * scale + 5;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg, [0,0]);
			tmpX += (iconbg.width*iconbg.scaleX+15);
		}
		poolGroup.width = len * 108 * scale + (len - 1) * 15;
		poolGroup.height = 108 * scale;

		// bubblebg.width = Math.max(poolGroup.width, tipTxt.width) + 40;
		// bubblebg.height = 5 + tipTxt.height + 5 + poolGroup.height + 15 + 35;

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,bubblebg,bubbleGroup,[0,0],true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,bubblebg,[0,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,poolGroup,tipTxt,[0,tipTxt.textHeight+10]);

		point.x -= 80;
		let posX = point.x - (bubbleGroup.width / 2);
		if(posX < 0){
			posX = 0;
		}
		else if((posX + bubbleGroup.width) > view.width){
			posX = view.width - bubbleGroup.width - 30;
		}

		let posY = point.y - bubbleGroup.height;
		bubbleGroup.setPosition(posX + 40, posY);

		// arrow.x = point.x - (arrow.width / 2);
		// arrow.y = bubbleGroup.y + bubbleGroup.height - 2;
	}

	public dispose():void{
		super.dispose();
	}
}