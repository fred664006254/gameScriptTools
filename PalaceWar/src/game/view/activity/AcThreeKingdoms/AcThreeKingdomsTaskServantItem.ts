/**
 * 定军中原出战门客item
 * author qianjun
 * date 2017/10/12
 */
class AcThreeKingdomsTaskServantItem extends ScrollListItem
{
    private _data : any = null;
    private _numTxt : BaseTextField = null;
    private _cityid = 0;
    public _sid = '';
	public constructor() {
		super();
    }

	protected initItem(index:number, data:any, itemparam:any){	
        let view = this;
        view._data = data;
        view.width = 90 + 6;
		view.height = 90;
        let temW:number = 90;
        let cityid = itemparam;
        view._cityid = cityid;
        if(data.empty){
            let iconBgBt = BaseBitmap.create(`mlservantempty-1`);
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW/194;
            iconBgBt.scaleY = temW/192;
        }        
        else{
            let servantinfo : ServantInfoVo = Api.servantVoApi.getServantObj(data.data.servantId);
            view._sid = String(data.data.servantId);
            let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(servantinfo.qualityBoxImgPath);
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW/194;
            iconBgBt.scaleY = temW/192;

            let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantinfo.halfImgPath);
            iconBt.x = iconBgBt.x + 5;
            iconBt.y = iconBgBt.y + 5;
            this.addChild(iconBt);
            iconBt.scaleX = (temW-10)/180;
            iconBt.scaleY = (temW-10)/177;

            let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
            numbg.width = 88;
            numbg.height = 24;
            numbg.setPosition(2, 65);
            this.addChild(numbg);

            //2武3知4政5魅1全属性
            let total = servantinfo.getTotalBookValue(cityid - 1);
            let numTxt : BaseTextField = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
            numTxt.x = (view.width - numTxt.textWidth) / 2;
            this.addChild(numTxt); 
            view._numTxt = numTxt;
            
            view.addTouchTap(()=>{
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE, {type : 'delete', servantId :  servantinfo.servantId});
            },view,null);
        }
    }
    
    public refresh():void{
        let view = this;
        let data = view._data;
        if(!data.empty){
            let servantinfo = data.data;
            let total = servantinfo.getTotalBookValue(view._cityid - 1);
            view._numTxt.text = App.StringUtil.changeIntToText(total);
            view._numTxt.x = (view.width - view._numTxt.textWidth) / 2;
        }
    }

	public getSpaceX():number{
		return 0;
	}

	public getSpaceY():number{
		return 0;
	}
	
    public dispose():void{
		let view = this;
        view.removeTouchTap();
        view._numTxt = null;
        view._sid = '';
		super.dispose();
	}
}