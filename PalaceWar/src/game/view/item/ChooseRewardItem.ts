
class ChooseRewardItem extends ScrollListItem{
    private _bg : BaseBitmap = null;
    public oIdx:number = 0;
	public constructor() {
		super();
	}

	protected initItem(index:number,data:RewardItemVo):void{

        this.oIdx = data.originalIdx;

        let view = this;
        view.width = 178;
        view.height = 246;
        let bg = BaseBitmap.create(index == 0 ? `itemservantselect` : `itemservantbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0, 0], true);
        view._bg = bg;
        view.addChild(bg);

        let name = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name, bg, [0, 45]);
        view.addChild(name);
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()){
            name.visible = false;
        }

        let icon = GameData.getItemIcon(data, true);
        // icon.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, name, [0, name.textHeight + 10]);
        view.addChild(icon);

        bg.addTouchTap(()=>{
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK, data.originalIdx);
        }, view, null);
	}

	public update(index : number):void{
        let view = this;
        view._bg.setRes(index == view.oIdx ? `itemservantselect` : `itemservantbg`);
	}

	public getSpaceX():number{
		return 0;
	}

	public getSpaceY():number{
		return 0;
	}

	public dispose():void{	
        let view = this;
        view._bg.removeTouchTap();
        view._bg = null;
        this.oIdx = 0;
		super.dispose();
	}
}