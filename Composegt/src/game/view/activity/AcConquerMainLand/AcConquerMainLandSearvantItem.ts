/**
 * 定军中原出战门客item
 * author qianjun
 * date 2017/10/12
 */
class AcConquerMainLandSearvantItem extends ScrollListItem
{
    private  _data : any = null;
    private _numTxt : BaseTextField = null;
	public constructor() {
		super();
    }
    private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';

	protected initItem(index:number, data:any, itemparam:any){	
        let view = this;
        view._data = data;
		let servantinfo = data.data;
        view._code = itemparam;
        view.width = 108 + 6;
		view.height = 108 + 6;
        let temW:number = 108;

        if(data.empty){
            let iconBgBt = BaseBitmap.create(`servant_cardbg_0`);
            iconBgBt.x = 0;
            iconBgBt.y = 0;
            this.addChild(iconBgBt);
            iconBgBt.scaleX = temW/184;
            iconBgBt.scaleY = temW/184;
        }        
        else{
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

            let numbg:BaseBitmap = BaseBitmap.create("mainland_servantitem_numbg");
            numbg.width = 100;
            numbg.setPosition(2, 80);
            this.addChild(numbg);

            let total = view.vo.getServantAcPower(servantinfo.servantId);
            let numTxt : BaseTextField = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
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
            let total = view.vo.getServantAcPower(servantinfo.servantId);;
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
		super.dispose();
	}
}