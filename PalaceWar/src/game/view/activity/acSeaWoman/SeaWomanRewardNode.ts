/**
  * 海滨伊人 次数领奖
  * @author shaoliang
  * date 2020/7/9
  * @class SeaWomanRewardNode
  */


class SeaWomanRewardNode extends BaseDisplayObjectContainer 
{   
    private _cfg:Config.AcCfg.SeaWomanChessNumItemCfg = null;
    private _code:string = null;
    private _timeText: BaseTextField = null;
    private _showtype:number = 1;//1 不能领奖 。2.能领奖 。3，已领奖
    private _clip:CustomMovieClip = null;


    public constructor() 
	{
		super();
	}

    public init(data:any,code:string,f:Function,o:any):void
    {
        this._cfg = data;
        this._code = code;

        let rewardbg1 = BaseBitmap.create("seawoman_reawardbg1-"+code);
        rewardbg1.setPosition(0,35);
        this.addChild(rewardbg1);

        let rewardbg2 = BaseBitmap.create("seawoman_reawardbg2-"+code);
        rewardbg2.setPosition(rewardbg1.width/2-rewardbg2.width/2,0);
        this.addChild(rewardbg2);

        let timeText = ComponentManager.getTextField(String(data.needNum), 18, TextFieldConst.COLOR_WHITE);
        timeText.width = 50;
        timeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeText, rewardbg2);
        this.addChild(timeText);

        this.addTouchTap(()=>{
            f.apply(o,[this._cfg.id]);
        },this);
    }

    public setShowType(type:number):void
    {
        if (type == this._showtype)
        {
            return;
        }
        this._showtype = type
        if (this._clip)
        {
            this._clip.dispose();
            this._clip = null;
        }
        
        if (type == 2)
        {
            let clip = ComponentManager.getCustomMovieClip("seawoman_effect_haixing",15,80);
            clip.setPosition(-10,20);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
            this.addChildAt(clip,1);
            this._clip = clip;
        }
        else  if (type == 3)
        {
            App.DisplayUtil.changeToGray(this);
        }

    }

    public dispose():void
	{	
        this._cfg = null;
        this._code = null;
        this._timeText = null;
        this._clip = null;
        this._showtype = 1;

		super.dispose();
	}
}