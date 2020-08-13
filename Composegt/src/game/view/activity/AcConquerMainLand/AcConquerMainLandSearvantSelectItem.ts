/**
 * 出战选择门客item
 * author qianjun
 * date 2017/10/12
 */
class AcConquerMainLandSearvantSelectItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    public _servantInfoVo:ServantInfoVo;
    public _data : any;
    private _Index : number = 0;
    private _cardbg : BaseLoadBitmap = null;
    private _icon : BaseLoadBitmap = null;
    private _deleteBtn : BaseButton = null;
    private _costIcon : BaseLoadBitmap = null;
	private _costTxt : BaseTextField = null;
    private _costButton : BaseButton = null;
    private _freeTxt : BaseTextField = null;
    private _mask : BaseBitmap = null;
    private _flag : BaseBitmap = null;
    private _selected : boolean = false;

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
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        let view = this;
        view._code = itemparam;
        view._data = data;
        view._Index = index;
        view.width = 108+6;
        view.height = 108+6+25;
        view._servantInfoVo = data.data;
        view.initServantIcon(data);
    }

	private initServantIcon(data:any):void{	
        let view = this;
        let code = view.getUiCode();
        let servantInfoVo : ServantInfoVo = data.data;
        let temW:number = 108;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;
        view._cardbg = iconBgBt;

		let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
        iconBt.scaleY = (temW-10)/177;
        view._icon = iconBt;
        //兵力数目
        let numbg:BaseBitmap = BaseBitmap.create("mainland_servantitem_numbg");
        numbg.width = 100;
        numbg.setPosition(2, 80);
        this.addChild(numbg);

        let total = servantInfoVo.total;
        let numTxt : BaseTextField = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
        this.addChild(numTxt); 

        let icon2 = BaseLoadBitmap.create(`itemicon1`);
		icon2.width = icon2.height = 33;
		view.addChild(icon2);
		view._costIcon = icon2;

        let costObj = view.vo.getServantCost(servantInfoVo.servantId);
		let costTxt = ComponentManager.getTextField(`${costObj.cost}`, 18, TextFieldConst.COLOR_QUALITY_GREEN_NEW)
		view.addChild(costTxt);
		view._costTxt = costTxt;

		let tmpx = (temW - icon2.width - 3 - costTxt.textWidth) / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, icon2, view, [tmpx, 0], true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, icon2, [icon2.width + 3,0]);

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandArmyFree-${code}`, [costObj.freeNum.toString()]), 18, TextFieldConst.COLOR_BROWN_NEW)
		view.addChild(freeTxt);
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, freeTxt, view, [0, 10]);

        costTxt.visible = icon2.visible = costObj.freeNum <= 0;
        freeTxt.visible = costObj.freeNum > 0;
        // let selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        // view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        // view.addChild(selectBtn);
        // view._deleteBtn = selectBtn;
        // view._deleteBtn.visible = view._data.select && !view._data.empty;
        let mask = BaseBitmap.create(`public_9_black`);
        mask.width = temW-4;
        mask.height = temW-4;
        view.addChild(mask);
        mask.alpha = 0.8;
        mask.setPosition(iconBgBt.x,iconBgBt.y);
        view._mask = mask;
        
        let attend = view.vo.getServantAttend(servantInfoVo.servantId);
        let flag = BaseBitmap.create(attend == data.army ? `mlservant_selectitem_inselect-${view.getUiCode()}`: `mlservant_selectitem_inbattle-${view.getUiCode()}`);
        view.addChild(flag);
        view._flag= flag;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,view._flag,view._mask);

        
        mask.visible = flag.visible = attend > 0;
        view._selected = attend == data.army;
        view.addTouchTap(view.clickSelect, view, null);
    }

    //数据刷新
    public refreshData(data?:any){
        let view = this;
        let servantInfoVo = view._servantInfoVo;
        let costObj = view.vo.getServantCost(servantInfoVo.servantId);
		view._costTxt.text = `${costObj.cost}`;

		let tmpx = (108- view._costIcon.width - 3 - view._costTxt.textWidth) / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, view._costIcon, view, [tmpx, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._costTxt, view._costIcon, [view._costIcon.width + 3,0]);
        
        view._freeTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyFree-${view.getUiCode()}`, [costObj.freeNum.toString()]);

        view._costTxt.visible = view._costIcon.visible = costObj.freeNum <= 0;
        view._freeTxt.visible = costObj.freeNum > 0;
        //mlservantselected
    }

    //切换选中状态
    public clickSelect():void{
        let view = this;
        let servantInfoVo = view._servantInfoVo;
        let attend = view.vo.getServantAttend(servantInfoVo.servantId);
        if(attend > 0 && attend != view._data.army){
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,{
            type :  view._selected ?  `delete` : `add`,
            servantId : servantInfoVo.servantId,
            idx : view._Index
        });
    }

    public checkSelect(bool : number = 0):void{
        let view = this;
        let attend = view.vo.getServantAttend(view._servantInfoVo.servantId);
        if(attend > 0 && attend != view._data.army){
            view._selected = true;
            view._flag.setRes(`mlservant_selectitem_inbattle-${this.getUiCode()}`);
            view._mask.visible = view._flag.visible = view._selected;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,view._flag,view._mask);
            return;
        }
        if(bool == 1){
            view._selected = true;
        }
        else if(bool == 2){
            view._selected = false;
        }
        else{
            view._selected = !view._selected;
        }
        view._flag.setRes(`mlservant_selectitem_inselect-${view.getUiCode()}`);
        view._mask.visible = view._flag.visible = view._selected;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,view._flag,view._mask);

    }

	public getSpaceX():number{
		return 0;
    }
    public getSpaceY():number{
		return 10;
	}

    public dispose():void{
        let view = this;
        BaseLoadBitmap.release(view._icon);
        BaseLoadBitmap.release(view._cardbg);
        view._servantInfoVo = null;
        view._icon = null;
        view._cardbg = null;
        view._deleteBtn = null;
        view._costIcon = null;
        view._costTxt = null;
        view._costButton = null;
        view._freeTxt = null;
        view._mask = null;
        view._flag = null;
        view._selected = false;
        view.removeTouchTap();
		super.dispose();
	}
}