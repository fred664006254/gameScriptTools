/**
  * 情定鹊桥 次数领奖
  * @author shaoliang
  * date 2020/7/16
  * @class BirdBridgeRewardNode
  */

class BirdBridgeRewardNode extends BaseDisplayObjectContainer 
{   
    private _cfg:Config.AcCfg.BirdBridgeAchievementOneItem = null;
    private _code:string = null;
    private _bg: BaseBitmap = null;
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

        let line = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_line",code));
        this.addChild(line);

        let rewardbg1 = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_crane2",code));
        rewardbg1.setPosition(0,25);
        this.addChild(rewardbg1);
        this._bg= rewardbg1;
        line.x = rewardbg1.width/2-line.width/2

        let rewardbg2 = BaseBitmap.create(App.CommonUtil.getResByCode("birdbridge_numbg",code));
        rewardbg2.setPosition(rewardbg1.x+rewardbg1.width/2-rewardbg2.width/2,rewardbg1.y+rewardbg1.height);
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
        //85 63
        if (type == 2)
        {
            let clip = ComponentManager.getCustomMovieClip("birdbridge_effect_crane",15,80);
            clip.setPosition(-24,-24);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
            this.addChild(clip);
            this._clip = clip;
        }
        else  if (type == 3)
        {
            this._bg.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("birdbridge_crane3",this._code));
        }

    }

    public dispose():void
	{	
        this._cfg = null;
        this._code = null;
        this._bg = null;
        this._clip = null;
        this._showtype = 1;

		super.dispose();
	}
}