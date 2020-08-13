/**
  * 情定鹊桥 次数领奖
  * @author shaoliang
  * date 2020/7/16
  * @class MouseTreasureRewardNode
  */

class MouseTreasureRewardNode extends BaseDisplayObjectContainer 
{   
    private _cfg:Config.AcCfg.MouseTreasureAchievementItem = null;
    private _code:string = null;
    private _bg: BaseBitmap = null;
    private _showtype:number = 1;//1 不能领奖 。2.能领奖 。3，已领奖
    private _clip:CustomMovieClip = null;


    public constructor() 
	{
		super();
	}

    public init(data:Config.AcCfg.MouseTreasureAchievementItem,code:string,f:Function,o:any):void
    {
        this._cfg = data;
        this._code = code;

        
        let rewardbg1 = BaseBitmap.create(App.CommonUtil.getResByCode("mousetreasure_reward1",code));
        rewardbg1.setPosition(0,0);
        this.addChild(rewardbg1);
        this._bg= rewardbg1;

        let rewardbg2 = BaseBitmap.create(App.CommonUtil.getResByCode("mousetreasure_numbg",code));
        rewardbg2.setPosition(rewardbg1.x+rewardbg1.width/2-rewardbg2.width/2,rewardbg1.y+rewardbg1.height-25);
        this.addChild(rewardbg2);

        let timeText = ComponentManager.getTextField(String(data.needScore), 18, TextFieldConst.COLOR_WHITE);
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
            let clip = ComponentManager.getCustomMovieClip("ac_mouset_reward_ef",10,80);
            clip.setPosition(-65,-55);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
            this.addChild(clip);
            this._clip = clip;
        }
        else  if (type == 3)
        {
            this._bg.texture = ResourceManager.getRes(App.CommonUtil.getResByCode("mousetreasure_reward2",this._code));
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