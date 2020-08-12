/**
 * 选择列表item
 * author shaoliang
 */
class ChooseListItem extends ScrollListItem 
{   

    private _str:string = null;
    private _function:Function = null;
    private _obj :any = null;

    public constructor(){
		super();
    }

    protected initItem(index:number,data:any,itemParam?:any)
    {
        this._str = data;
        this._function = itemParam.f;
        this._obj = itemParam.o;

        let bg = BaseBitmap.create("common_select_frame2");
        bg.height = 28;
        bg.width = itemParam.w;
        this.addChild(bg);

        let text = ComponentMgr.getTextField(data,TextFieldConst.SIZE_CONTENT_COMMON);
        text.setPosition( bg.width/2-text.width/2, 14-text.height/2+2);
        this.addChild(text);

        this.addTouchTap(this.clickItem,this);
    }

    private clickItem():void
    {
        this._function.apply(this._obj,[this._str]);
    }

    public dispose():void{

        this._str = null;
        this._function = null;
        this._obj = null;
        
		super.dispose();
	}
}