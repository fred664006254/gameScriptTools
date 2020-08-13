/*
    author : shaoliang
    date : 2019.10.29
    desc : 战斗队伍的图标
*/

class LadderBattleTeamIcon extends BaseDisplayObjectContainer
{   
    private _type:number = 0;//1我放 2敌方
    private _idx:number = 0;
    private _clip:CustomMovieClip = null;
    private _resKeys:string[] = [];
    private _clipBao:CustomMovieClip = null;

    public constructor(){
        super();
    }

    public init(idx:number,type:number):void
    {
        this._type = type;
        this._idx = idx;


        if (this._idx == 1)
        {   
            let prekey = "ladder_general"+this._type;
            this._resKeys = [prekey+"_stand_",prekey+"_win_",prekey+"_fight_"];

            this._clip = ComponentManager.getCustomMovieClip(this._resKeys[0],4,150);
		    this._clip.playWithTime(0);
            this.addChild(this._clip);
        }
        else
        {   
            let prekey :string;
            if (this._type==1)
            {
                prekey =  "ladder_soldiers_";
            }
            else
            {
                prekey =  "ladder_soldiers2_";
            }
           
            this._resKeys = [prekey+"stand"+(this._idx-1)+"_",prekey+"move"+(this._idx-1)+"_"];

            this._clip = ComponentManager.getCustomMovieClip(this._resKeys[0],4,150);
            this._clip.playWithTime(0);
            this.addChild(this._clip);
        }

       

    }
    // r 1,胜利 2失败
    public setResult(r:number):void
    {
        let icon = BaseBitmap.create("ladder_formation_icon"+r);
        
        if (this._idx == 1)
        {
            if (this._type==1)
            {
                icon.setPosition(0,-30);
            }
            else
            {
                icon.setPosition(4,-34);
            }
        }
        else
        {
            icon.setPosition(44,-34);
        }
        this.addChild(icon);

        let clip;
        if (r != 1)
        {
            clip = ComponentManager.getCustomMovieClip("ladder_ef_battle_lose",10,100);
            clip.setPosition( icon.x-100+icon.width/2,icon.y-100+icon.height/2);
           
        }
        else
        {
            clip = ComponentManager.getCustomMovieClip("ladder_ef_battle_win",10,100);
            clip.setPosition( icon.x-120+icon.width/2,icon.y-120+icon.height/2);
            clip.blendMode = egret.BlendMode.ADD;

            if (this._idx == 1)
            {
                this._clip.playFrameByNamePre(this._resKeys[1],5);
                this._clip.playWithTime(0);
            }
            else
            {
                this._clip.playFrameByNamePre(this._resKeys[1],3);
                this._clip.playWithTime(0);
            }

            
        }
        this.addChild(clip);
        clip.playWithTime(1);
    }

    public showBattle():void
    {
        if (this._idx == 1)
        {
            this._clip.playFrameByNamePre(this._resKeys[2],4);
            this._clip.playWithTime(0);

            this._clipBao = ComponentManager.getCustomMovieClip("ladder_ef_collision",6,80);
            this._clipBao.playWithTime(0);
            this._clipBao.setScale(2);
            this._clipBao.blendMode = egret.BlendMode.ADD;
            this.addChild(this._clipBao);
            if (this._type ==1)
            {
                this._clipBao.setPosition(-210,100);
                this._clipBao.rotation = -30;
            }
            else{
                this._clipBao.scaleX = -1;
                this._clipBao.setPosition(70,-65);
                this._clipBao.rotation = -30;
            }
        }
        else
        {
            this._clip.playFrameByNamePre(this._resKeys[1],3);
            this._clip.playWithTime(0);
        }
    }

    public stopClipBao():void
    {
        if (this._clipBao)
        {
            this._clipBao.dispose();
            this._clipBao = null;
            this._clip.stop();
        }
    }

    public showStand():void
    {
        if (this._idx == 1)
        {   
            this._clip.playFrameByNamePre(this._resKeys[0],4);
            this._clip.playWithTime(0);
        }
        else
        {
            this._clip.playFrameByNamePre(this._resKeys[0],4);
            this._clip.playWithTime(0);
        }
    }

    public showPowerUp():void
    {
        let powerup = BaseBitmap.create("ladder_formation_up");
        powerup.setPosition(0,100);
        this.addChild(powerup);
        egret.Tween.get(powerup).to({y:-50},400).call(()=>{
            powerup.dispose();
        });
    }

    public dispose() 
    {   
        this._type = 0;
        this._idx = 0;
        this._clip = null;
        this._resKeys.length = 0;
        this._clipBao = null;

        super.dispose();
    }
}