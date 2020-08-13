/**
 * 定军中原出战门客item
 * author qianjun
 * date 2017/10/12
 */
class AcConquerMainLandServantVsItem extends ScrollListItem
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
            default:
                code = `1`;
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
        view._data = data;
		let servantinfo = Config.ServantCfg.getServantItemById(data.servantId);
        view._code = itemparam;
        view.width = 86;
		view.height = 86 + 5;

        let temW:number = 86;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(`servant_cardbg_${data.clv}`);
		iconBgBt.x = 0;
		iconBgBt.y = 0;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;

		let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(data.skin && data.skin != `` ? `skin_half_${data.skin}` : servantinfo.halfIcon);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
        iconBt.scaleY = (temW-10)/177;
    }
    
    public refresh(func : any, object : any):void{
        let view = this;
        //播放闪光
        let loopClip = ComponentManager.getCustomMovieClip(`mainlandflash1-`,14,70);
        loopClip.width = 175;
        loopClip.height = 173;
        loopClip.anchorOffsetX = loopClip.width / 2;
        loopClip.anchorOffsetY = loopClip.height / 2;
        loopClip.setScale(1.1);
        loopClip.x = 42;
        loopClip.y = 40;

        loopClip.setEndCallBack(()=>{
            loopClip.dispose();
            loopClip = null;
            func.apply(object);
        }, view);
        loopClip.playWithTime(1);
        view.addChild(loopClip);


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