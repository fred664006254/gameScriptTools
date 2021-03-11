/**
 * 门客战主界面门客item
 * author qianjun
 * date 2017/10/12
 */
class CountryWayServantItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    protected _servantInfoVo:ServantInfoVo;
    public _data : any;
    private _Index : number = 0;

	protected initItem(index:number,data:any,itemParam: any)
    {
        let view = this;
        view._data = data;
        view._Index = index;
        view.width = 78;
        view.height = 78 + 10;
        if(itemParam&&itemParam.width&&itemParam.height)
        {
            this.width = itemParam.width;
            this.height = itemParam.height;
        }
        view._servantInfoVo = data.servantItemCfg;
        view.initServantIcon(data.servantItemCfg,itemParam);
    }

	private initServantIcon(servantInfoVo:any,itemParam: any):void
	{	
        let view = this;
        let temW:number = 78;
        if(itemParam&&itemParam.temW)
        {
            temW = itemParam.temW;
        }
        let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create('servant_cardbg_0',null,{callback : ()=>{
            iconBgBt.scaleX = temW/194;
            iconBgBt.scaleY = temW/192;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBgBt, view, [0,0], true);

            let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfIcon : 'servant_half_empty',null,{callback : ()=>{
                iconBt.scaleX = (temW-10)/180;
                iconBt.scaleY = (temW-10)/177;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBt, iconBgBt);
                view.addChild(iconBt);

                if(!Api.servantVoApi.getServantObj(servantInfoVo.id)){
                    App.DisplayUtil.changeToGray(iconBt);
                    let mask = BaseBitmap.create(`public_9_bg20`);
                    mask.width = itemParam ? 110 : 78;
                    mask.height = itemParam ? 110 : 78;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,mask,iconBgBt);
                    view.addChild(mask);

                    let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarNoServant'), itemParam ? 20 : 17, TextFieldConst.COLOR_WARN_RED3);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,iconBgBt);
                    view.addChild(tipTxt);
                }
                
                let namebg = BaseBitmap.create(`countrywarservantnamebg`);
                namebg.setScale(temW/108);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, iconBgBt, [0,3]);
                view.addChild(namebg);
    
                let nameSize = 14;
                if(itemParam&&itemParam.temW)
                {
                    nameSize = itemParam.nameSize;
                }
                let nameTxt = ComponentManager.getTextField(servantInfoVo.name,nameSize);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, iconBgBt, [0,4]);
                view.addChild(nameTxt);

                let numbg = BaseBitmap.create(`countrywarservantnumbg`);
                view.addChild(numbg);
                
                let numTxtScale = 0.7;
                if(itemParam&&itemParam.temW)
                {
                    numTxtScale = itemParam.numTxtScale;
                }
                let numTxt = ComponentManager.getBitmapText(`+${Math.round(view._data.powerUp * 100)}%`,TextFieldConst.FONTNAME_ITEMTIP);
                numTxt.setScale(numTxtScale);

                numbg.setScale(temW/108);
                if(!itemParam){
                    numbg.width = numTxt.width + 67;
                    numbg.height = 110;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numbg, iconBgBt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numTxt, iconBgBt, [5,0]);
                view.addChild(numTxt);
            },callbackThisObj : view});

        }, callbackThisObj : view});
		view.addChild(iconBgBt);		
    }
    
	public getSpaceY():number{
		return 10;
	}

    public dispose():void{
        let view = this;
		super.dispose();
	}
}