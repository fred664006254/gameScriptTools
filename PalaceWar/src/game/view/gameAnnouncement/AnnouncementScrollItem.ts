
class AnnouncementScrollItem extends ScrollListItem {


	private bg1: BaseBitmap = null;
	private bg2: BaseBitmap = null; 
	private _titleText: BaseTextField = null;
	private _contentText: BaseTextField = null;
	private currData: any = {};
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any) {

		this.currData = data; 
		this.bg1 = BaseBitmap.create("announcement_itembg1");
		// this.bg1.width = 360;
		this.addChild(this.bg1); 
		let leftItemTopLine:BaseBitmap = BaseBitmap.create("public_line3_halfshort");
		this.addChild(leftItemTopLine);
		
		let rightItemTopLine:BaseBitmap = BaseBitmap.create("public_line3_halfshort");
		rightItemTopLine.scaleX=-1;
		this.addChild(rightItemTopLine);
		
		if(GameAnnouncementView.currNum ==index)
		{ 
			this.showDes();
		}  
		this.showText();
		let minX:number=this._titleText.x-leftItemTopLine.width-5;
		let maxX:number=this._titleText.x+this._titleText.width+5+rightItemTopLine.width;
		if(minX<0 || (maxX>this.bg1.width))
		{
			leftItemTopLine.visible=false;
			rightItemTopLine.visible=false;
		}
		else
		{
			leftItemTopLine.setPosition(minX,this.bg1.y+(this.bg1.height-leftItemTopLine.height)/2);
			rightItemTopLine.setPosition(maxX,this.bg1.y+(this.bg1.height-rightItemTopLine.height)/2);
		}
	}
	public showText(): void {
		this._titleText = ComponentManager.getTextField(this.currData.title , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._titleText.setPosition(this.bg1.x+(this.bg1.width-this._titleText.width)/2,this.bg1.y+(this.bg1.height-this._titleText.height)/2);
		this.addChild(this._titleText);
	}
	public showDes(): void {

		this.bg2 = BaseBitmap.create("public_9_managebg");//"public_9_probiginnerbg");
		this.bg2.width = this.bg1.width;
		this.bg2.height = 220;
		this.bg2.x=this.bg1.x;
		this.bg2.y = this.bg1.y;
		this.addChild(this.bg2);
		this.setChildIndex(this.bg2,0);

		this._contentText = ComponentManager.getTextField(this.currData.content, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._contentText.x = this.bg1.x + 15;
		this._contentText.y = this.bg1.y + this.bg1.height+10;
		this._contentText.lineSpacing =6;
		this._contentText.width = this.bg2.width - 30; 
		this.addChild(this._contentText);
		this.bg2.height =this._contentText.y+this._contentText.height+10;
		
	} 
	public getSpaceY(): number {
		return 5;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		this.bg1 = null;
		this.bg2 = null;
		this._titleText = null;
		this._contentText = null
		super.dispose();
	}
}