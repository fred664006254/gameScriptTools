/**
 * 名称框
 * @author shaoliang
 * data 2019/7/5
 * @class NameLabel
 */

class NameLabel extends BaseDisplayObjectContainer
{
    /** 背景 */
	private _bg:BaseLoadBitmap = null;
     /** 背景 */
	private _name:BaseTextField = null;

    public constructor() {
		super();
	}
    
    public init(name:string,bgtype:string,size:number,color:number):void
	{   
        let resName:string = "public_label_"+bgtype;
        this._bg = BaseLoadBitmap.create(resName);
        this.addChild(this._bg);

        this._name = ComponentManager.getTextField(name,size,color);
        this.addChild(this._name);

        let scale9:string = Scale9gridCfg.getScale9gridCfg(resName);
        let sArray:string[] = scale9.split(",");

        let nameWidth:number = this._name.width > 80 ? this._name.width : 80;
        this._bg.width = Number(sArray[0])*2 + nameWidth;
        this._name.setPosition(this._bg.width/2-this._name.width/2, Number(sArray[1])-this._name.height/2);
    }


    public dispose():void
	{
		this._bg = null;
		this._name = null;

		super.dispose();
	}
}
