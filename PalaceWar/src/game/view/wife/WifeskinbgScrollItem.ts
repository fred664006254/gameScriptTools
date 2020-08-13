/**
 * 
 * author qianjun
 * @class WifeskinNewScrollItem
 */
class WifeskinbgScrollItem extends ScrollListItem 
{
	private _group : BaseDisplayObjectContainer = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,wifeSkinItemCfg:Config.WifeSkinItemCfg):void
	{
		this.width = 266;
		this.height = 190;

		let group = new BaseDisplayObjectContainer();
		group.width = this.width;
		group.height = this.height;
		this.addChild(group);
		this._group = group;

		let bgitem = BaseBitmap.create(`wifebgitem`);
		group.addChild(bgitem);
		
		let nameTxt = ComponentManager.getTextField(`场景${index + 1}`, 20);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, bgitem, [0,8]);
		group.addChild(nameTxt);
	}

	public setSelect(index : number):void{
		let view = this;
		view._group.setScale(view._index == index ? 1 : 0.9);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._group, view, [0,0], true);
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
		this._group = null;
		super.dispose();
	}
}