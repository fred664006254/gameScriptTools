/**
 * 2048 item
 * author yangtao
 * date 2020.6.10
 * @class AcWeaponHouseItem
 */
class AcWeaponHouseItem extends BaseDisplayObjectContainer
{
    private _aid:string;//等级
    private _code:string;//
    public _icon0:BaseBitmap;
    private _bg:BaseBitmap;//背景
    private _levelField:BaseTextField;//级别显示
    private _levelbg:BaseBitmap;//等级样式
    private _itemNode:BaseDisplayObjectContainer = null;
    private iconWidth = 108;
	public constructor(param?:any) 
	{
        super();
        if (param && param.aid){
            this._aid = param.aid;
            this._code = param.code;
            if(this._aid<String(1)){
                this._aid = String(1);
            }
        }
        this.createItem();
    }
    
    private getTypeCode():string{
        if (this._code == "2"){
            return "1";
        }
        return this._code;
    }

    private createItem(){
        this._itemNode = new BaseDisplayObjectContainer();
        this._itemNode.width = this._itemNode.height= this.iconWidth;
        this.addChild(this._itemNode);
        this._bg = BaseBitmap.create(App.CommonUtil.getResByCode(`ac_weaponhouse_${this._aid}`, this.getTypeCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bg, this._itemNode);
        this.width = this._itemNode.width;
        this.height = this._itemNode.height;
        this._itemNode.anchorOffsetX = this.iconWidth/2;
        this._itemNode.anchorOffsetY = this.iconWidth/2;

        this._icon0 = BaseBitmap.create(App.CommonUtil.getResByCode(`ac_weaponhouse_icon${this._aid}`, this.getTypeCode()));
        this._itemNode.addChild(this._icon0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._icon0, this._bg);

        this._levelField = ComponentManager.getTextField(this._aid, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._levelField, this._bg);

        this._levelbg = BaseBitmap.create(App.CommonUtil.getResByCode(`ac_weaponhouse_level_${this._aid}`, this.getTypeCode()));
        this._itemNode.addChild(this._levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._levelbg, this._bg,[5,10]);

    }


    public resetItem(aid:string):void
    {
        this._bg.setRes(App.CommonUtil.getResByCode(`ac_weaponhouse_${aid}`, this.getTypeCode()));
        this._icon0.setRes(App.CommonUtil.getResByCode(`ac_weaponhouse_icon${aid}`, this.getTypeCode()));
        this._levelbg.setRes(App.CommonUtil.getResByCode(`ac_weaponhouse_level_${aid}`, this.getTypeCode()));
        this._levelField.text = aid;
    }

	public dispose():void
	{
        this._aid = null;
        this._code = null;
        this._icon0 = null;
        this._levelbg = null;

		super.dispose();
	}
}