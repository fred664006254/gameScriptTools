/*
    author : shaoliang
    date : 2019.10.21
    desc : 选择队伍的图标
*/
class LadderTeamIcon extends BaseDisplayObjectContainer
{   
    private _idx:number = 0;
    private _arrow:BaseLoadBitmap = null;
    private _word:BaseBitmap = null;
    private _fuction:Function = null;
    private _obj:any = null;
    private _clip:CustomMovieClip|BaseLoadBitmap = null;
    private _buffclip:CustomMovieClip = null;

    private _isFull:boolean = null;

    public constructor(){
        super();
    }

    public init(idx:number,f:Function,o:any,isFull:boolean):void
    {   
        this._idx= idx;
        this._fuction = f;
        this._obj = o;

        this.setTeamFull(isFull);

        this._buffclip = ComponentManager.getCustomMovieClip("ladder_ef_team",10,150);
        this._buffclip.y = 130;
        this._buffclip.x = 50;
        this._buffclip.playWithTime(0);
        this.addChild(this._buffclip);
        this._buffclip.visible = false;

        this.addTouchTap(this.iconClick,this);
    }

    private iconClick():void
    {
        this._fuction.apply(this._obj,[this._idx]);
    }

    public setTeamFull(b:boolean):void
    {   
        if (b== this._isFull)
        {
            return;
        }
        this._isFull = b;

        if (this._clip)
        {
            this._clip.dispose();
            this._clip = null;
        }

        if (b)
        {
            if (this._arrow)
            {
                this._arrow.dispose();
                this._arrow = null;
            }
            if (this._word)
            {
                this._word.dispose();
                this._word = null;
            }

            this._clip = ComponentManager.getCustomMovieClip("ladder_soldiers_stand"+this._idx+"_",4,150);
            this._clip.y = 100;
            this._clip.playWithTime(0);
            this.addChild(this._clip);

        }
        else
        {
            this._clip = BaseLoadBitmap.create("ladder_soldiers_empty1");
            this._clip.y = 100;
            this.addChild(this._clip);

            let arrow = BaseLoadBitmap.create("ladder_arrow"); 
            arrow.width = 83;
            arrow.height = 123;
            arrow.setPosition(50,30);
            this.addChild(arrow);
            this._arrow = arrow;
            egret.Tween.get(arrow,{loop:true}).to({y:arrow.y+20},400).to({y:arrow.y},400);
    
            let word = BaseBitmap.create("ladderview_dispatch");
            word.setPosition(arrow.x+arrow.width/2-word.width/2+20, arrow.y+arrow.height+35);
            this.addChild(word);
            this._word = word; 
        }
    }

    public setBuff(b:boolean):void
    {
        this._buffclip.visible = b;
    }

    public dispose() 
    {   
        this._idx = 0;
        this._arrow = null;
        this._fuction = null;
        this._obj = null;
        this._isFull = null;
        this._word = null;
        this._clip = null;
        this._buffclip = null;

        super.dispose();
    }
}