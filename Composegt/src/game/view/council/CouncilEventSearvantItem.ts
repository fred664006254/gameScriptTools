/**
 * 议事门客item
 * author qianjun
 * date 2017/10/12
 */
class CouncilEventSearvantItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    protected _servantInfoVo:ServantInfoVo;
    public _data : any;
    private _Index : number = 0;
    private _cardbg : BaseLoadBitmap = null;
    private _icon : BaseLoadBitmap = null;
    private _deleteBtn : BaseButton = null;

	protected initItem(index:number,data:any)
    {
        let view = this;
        view._data = data;
        view._Index = index;
        view.width = view._data.select ? 104 : 90;
        view.height = view._data.select ? 104 : 90;
        view._servantInfoVo = data.data;
        view.initServantIcon(data.data);
    }
    
    public refreshData(data?:any){
        let view = this;
        if(data){
            let info : ServantInfoVo = Api.servantVoApi.getServantObj(data);
            view._servantInfoVo = info;
            view._cardbg.setload(info.qualityBoxImgPath);
            view._icon.setload(info.halfImgPath);
            view._deleteBtn.visible = true;
        }
        else{
            view._cardbg.setload('servant_cardbg_0');
            view._icon.setload('servant_half_empty');
            view._deleteBtn.visible = false;
        }
    }

	private initServantIcon(servantInfoVo:any):void
	{	
        let view = this;
        let temW:number = view._data.select ? 94 : 80;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
		iconBgBt.x = 10;
		iconBgBt.y = 0;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;
        view._cardbg = iconBgBt;

		let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
		iconBt.x = iconBgBt.x + 3;
		iconBt.y = iconBgBt.y + 3;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBt, iconBgBt);
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
        iconBt.scaleY = (temW-10)/177;
        view._icon = iconBt;

        let selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        view.addChild(selectBtn);
        view._deleteBtn = selectBtn;
        view._deleteBtn.visible = view._data.select && !view._data.empty;
    }
    
    private deleteClick():void{
        let view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, {type : 'delete', idx : view._Index, servantId :  view._servantInfoVo.servantId});
    }
    
	public getSpaceX():number{
		return 10;
	}

    public dispose():void{
        let view = this;
        BaseLoadBitmap.release(view._icon);
        BaseLoadBitmap.release(view._cardbg);
        view._icon = null;
        view._cardbg = null;
        view._deleteBtn = null;
		super.dispose();
	}
}