/**
 * 出战选择门客item
 * author qianjun
 * date 2017/10/12
 */
class AcThreeKingdomsTaskSelectServantItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    public _servantInfoVo:ServantInfoVo;
    public _data : any;
    private _Index : number = 0;
    private _cardbg : BaseLoadBitmap = null;
    private _icon : BaseLoadBitmap = null;
    private _mask : BaseBitmap = null;
    private _flag : BaseBitmap = null;
    private _selected : boolean = false;
    private _numTxt : BaseTextField = null;
    private flag:number = 0;
    private _isBegin = false;
    
    private cityid = 0;
    private _code = '';

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, this._code);
    }
	protected initItem(index:number, data:any, itemparam:any){	
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        let view = this;
        view._code = itemparam.code;
        view.cityid = itemparam.cityid;
        view._data = data;
        view._Index = index;
        view.width = 90 + 8;
        view.height = 90 + 10;
        view._servantInfoVo = data.data;
        view.initServantIcon(data);
    }

	private initServantIcon(data:any):void{	
        let view = this;

        let servantInfoVo : ServantInfoVo = data.data;
        let temW:number = 90;
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
        iconBt.addTouch(this.touchEmoticonHandler, this);
        //兵力数目
        let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
        numbg.width = 88;
        numbg.height = 24;
        numbg.setPosition(2 , 65);
        this.addChild(numbg);

        let total = servantInfoVo.getTotalBookValue(view.cityid - 1);
        let numTxt : BaseTextField = ComponentManager.getTextField(App.StringUtil.changeIntToText(total), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
        this.addChild(numTxt); 
        view._numTxt = numTxt;
        numTxt.textColor = total >= view._data.need ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED;

        // let selectBtn = ComponentManager.getButton('discussclose', '', view.deleteClick, view);
        // view.setLayoutPosition(LayoutConst.righttop, selectBtn, view);
        // view.addChild(selectBtn);
        // view._deleteBtn = selectBtn;
        // view._deleteBtn.visible = view._data.select && !view._data.empty;
        let mask = BaseBitmap.create(`mlservantmask-1`);
        mask.width = 95;
        mask.height = 95;
        view.addChild(mask);
        mask.setPosition(-3,-3);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, mask, view, [-5,-2]);
        view._mask = mask;
        
        let attend = view._data.isAttend;
        let flag = BaseBitmap.create(`awservantstate1`);//awservantstate1
        flag.setScale(83/flag.width);
        view.addChild(flag);
        view._flag= flag;
        flag.setPosition(6,20);
        
        mask.visible = flag.visible = attend;
        view._selected = false;
        view.addTouch(view.touchEmoticonHandler, view, null);

        this._timer = new egret.Timer(700, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
    }

    private timerCallFunc():void{
        if(this.flag == 1){
            this._isBegin = false;
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, this._servantInfoVo.servantId);
        }
    }

    //数据刷新
    public refreshData(data?:any){
        let view = this;
        let servantInfoVo = view._servantInfoVo;
        //mlservantselected
    }

    private _timer : egret.Timer = null;

    private tick():void{
        let view = this;
    }

    public touchEmoticonHandler(e:egret.TouchEvent){
        let view = this;
        if(e.type == egret.TouchEvent.TOUCH_BEGIN){
            view._timer.start();
            view.flag = 1;
            this._isBegin = true;
        }
        else if(e.type == egret.TouchEvent.TOUCH_END){
            view._timer.stop();
            view.flag = 0;
            if(this._isBegin){
                this._isBegin = false;
                this.clickSelect();
            }
        }
        else if(e.type == egret.TouchEvent.TOUCH_CANCEL){
            view._timer.stop();
            view.flag = 0;
        }
    }

    //切换选中状态
    public clickSelect():void{
        let view = this;
        let servantInfoVo = view._servantInfoVo;
        let attend = view._data.isAttend;
        if(attend){
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip9`, view._code)));
            return;
        }
        let sid = view._servantInfoVo.servantId;
        let bookvalue = view._servantInfoVo.getTotalBookValue(view.cityid - 1);
        if(Object.keys(view.vo.selectServant).length < 5){
            if(bookvalue >= view._data.need){
                view._selected = !view._selected;
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip8`, view._code)));
            }
        }
        else{
            if(view._selected){
                view._selected = !view._selected;
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip7`, view._code)));
                return;
            }
        }
        view._mask.visible = view._flag.visible = view._selected;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,{
            type :  view._selected ?  `add` : `delete`,
            servantId : servantInfoVo.servantId,
            idx : view._Index
        });
    }

    public checkSelect(bool : number = 0):void{
        let view = this;
        let attend = view.vo.getServantAttend(view._servantInfoVo.servantId);
        if(attend){
            view._selected = true;
            view._flag.setRes(`awservantstate1`);
            view._flag.setScale(83/view._flag.width);
            view._flag.setPosition(6,20);
            view._mask.visible = view._flag.visible = view._selected;
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
        view._flag.setRes(`mlservantselected-1`);
        view._flag.setScale(83/view._flag.width);
        view._flag.setPosition(6,20);
        view._mask.visible = view._flag.visible = view._selected;
    }

    public refresh():void{
        let view = this;
        let data = view._data;
        if(!data.empty){
            let servantinfo = data.data;
            let total = servantinfo.getTotalBookValue(view.cityid - 1);
            view._numTxt.text = App.StringUtil.changeIntToText(total);
            view._numTxt.x = (view.width - view._numTxt.textWidth) / 2;
            view._numTxt.textColor = total >= view._data.need ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED;
        }
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
        view._mask = null;
        view._flag = null;
        view._selected = false;
        view._numTxt = null;
        view.removeTouchTap();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
        this._timer.stop();
        this._timer = null;
        this.flag = 0;
        this._isBegin = false;
		super.dispose();
	}
}