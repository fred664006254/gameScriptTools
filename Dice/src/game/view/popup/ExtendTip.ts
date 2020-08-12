class ExtendTip extends BaseDisplayObjectContainer{
	private _res = ``;
	public bg:BaseBitmap = null;
    public constructor(res?:string) {
		super();
		if(res){
			this._res = res;
		}
		else{
			this._res = `public_update_bg`;
		}
	}

    public init(str : string, point : egret.Point, top : boolean, width?:number, textAlign?:string, hideTime?:number):void{
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		let mask = BaseBitmap.create(`public_alpha`);
		mask.width = view.width;
		mask.height = view.height;
		view.addChild(mask);

		if(hideTime){
			view.alpha = 0;
			egret.Tween.get(view).to({alpha : 1}, 1000).wait(hideTime).to({alpha : 0}, 1000).call(()=>{
				view.dispose();
			},view);
		}
		else{
			mask.addTouchTap(()=>{
				view.dispose();
				view = null;
			},view);
		}
		

		let bubbleGroup = new BaseDisplayObjectContainer();
		view.addChild(bubbleGroup);

		let bubblebg = BaseBitmap.create(this._res);
		this.bg = bubblebg;
		bubbleGroup.addChild(bubblebg);

		let tipTxt = ComponentMgr.getTextField(str, TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.black);
		if(width && width > 0){
			tipTxt.width = width;
			tipTxt.wordWrap = true;
		}
		bubbleGroup.addChild(tipTxt);
		tipTxt.lineSpacing = 2;
		tipTxt.textAlign = textAlign || egret.HorizontalAlign.CENTER;

		let arrow = BaseBitmap.create(`public_triangle`);
		arrow.anchorOffsetX = arrow.width / 2;
		arrow.anchorOffsetY = arrow.height / 2;
		arrow.scaleY = top ? 1 : -1;
		if(this._res == `public_update_bg`){
			bubbleGroup.addChild(arrow);
			bubblebg.width = tipTxt.width + 40;
			bubblebg.height = tipTxt.height + 20;
			bubbleGroup.width = bubblebg.width;
			bubbleGroup.height = bubblebg.height + arrow.height;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,bubblebg,bubbleGroup,[0,0],true);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,bubblebg, [4,-3]);
		}
		else{
			bubblebg.width = tipTxt.width + 60;
			bubblebg.height = tipTxt.height + 60;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,bubblebg,bubbleGroup,[0,0],true);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,bubblebg, [4,-10]);
		}
		
		

		

		let posX = point.x - (bubbleGroup.width / 2);
		if(posX < 0){
			posX = 0;
		}
		else if((posX + bubbleGroup.width) > view.width){
			posX = view.width - bubbleGroup.width - 5;
		}


		let posY = top ? (point.y + 10) : (point.y - bubbleGroup.height + 10);
		if(posY < 0){
			posY = 0;
		}
		else if(posY + bubbleGroup.height > GameConfig.stageHeigth){
			posY = GameConfig.stageHeigth - bubbleGroup.height;
		}
		bubbleGroup.setPosition(posX, posY);

		arrow.x = point.x - bubbleGroup.x;//point.x - ();
		arrow.y = top ? (bubblebg.y - arrow.anchorOffsetY + 1) : (bubblebg.y + bubblebg.height - 6 + arrow.anchorOffsetY);
	}

	public dispose():void{
		this._res = ``;
		this.bg = null;
		super.dispose();
	}
}