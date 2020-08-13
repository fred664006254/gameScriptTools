/*
    author : shaoliang
    date : 2019.10.21
    desc : 选择门客的图标
*/

class LadderTeamServantIcon extends BaseDisplayObjectContainer
{   
    private _iconBg:BaseLoadBitmap = null;
    private _servantIcon:BaseLoadBitmap = null;
    private _emptyIcon:BaseLoadBitmap = null;
    private _deleteIcon:BaseLoadBitmap = null;

    private _idx:number = 0;
    private _fuction:Function = null;
    private _obj:any = null;

    public _servantId:string = null;
    private _buffClip:CustomMovieClip = null;
    private _numbg:BaseBitmap = null;
    private _numText = null;

    public constructor(){
        super();
    }

    public init(idx:number,f:Function,o:any):void
    {  
        this._idx= idx;
        this._fuction = f;
        this._obj = o;

        this._iconBg = BaseLoadBitmap.create("itembg_1");
        this._iconBg.width = 95;
        this._iconBg.height = 95;
        this.addChild(this._iconBg);

        this._servantIcon = BaseLoadBitmap.create("");
        this._servantIcon.width = 89;
        this._servantIcon.height = 89;
        this._servantIcon.setPosition(3,3);
        this.addChild(this._servantIcon);

        this._emptyIcon = BaseLoadBitmap.create("servant_half_empty");
        this._emptyIcon.width = 89;
        this._emptyIcon.height = 89;
        this._emptyIcon.setPosition(3,3);
        this.addChild(this._emptyIcon);

        this._deleteIcon = BaseLoadBitmap.create("button_del1");
        this._deleteIcon.width = 25;
        this._deleteIcon.height = 25;
        this._deleteIcon.x = this._iconBg.width-this._deleteIcon.width;
        this.addChild(this._deleteIcon);
        this._deleteIcon.visible = false;

        this._numbg = BaseBitmap.create("ladderteam_numbg");
        this._numbg.setPosition(this._iconBg.width-this._numbg.width,this._iconBg.height-this._numbg.height);
        this.addChild(this._numbg);

        this._numText = ComponentManager.getBitmapText(String(idx),"activity_fnt");
        this._numText.setScale(0.5);
        this._numText.setPosition(this._numbg.x+this._numbg.width/2-this._numText.width/4,this._numbg.y+this._numbg.height/2-this._numText.height/4);
        this.addChild(this._numText);
        // this._numText.visible = false;

        this._deleteIcon.addTouchTap(this.clickIcon,this);
    }

    public setServant(sid:string,anim:boolean=true):void
    {
        if (sid == this._servantId)
        {
            return;
        }

        if (sid)
        {   
            // this._numText.visible = true;
            this._servantId = sid;
            let servantvo = <ServantInfoVo>Api.servantVoApi.getServantObj(sid);
            let lv = servantvo.clv+1;
            if (lv>8)
            {
                lv = 8;
            }
            this._iconBg.setload("itembg_"+lv);
            this._servantIcon.visible = true;
            this._servantIcon.setload(servantvo.halfImgPath);
            this._emptyIcon.visible = false;
            this._deleteIcon.visible = true;

            if (this._buffClip)
            {
                this._buffClip.visible = true;
            }
        }
        else
        {   
            // this._numText.visible = false;
            this._servantId = null;
            this._iconBg.setload("itembg_1");
            this._servantIcon.visible = false;
            this._emptyIcon.visible = true;
            this._deleteIcon.visible = false;
            if (this._buffClip)
            {
                this._buffClip.visible = false;
            }
        }

        // if (anim)
        // {
        //     let clip = ComponentManager.getCustomMovieClip(`zqfsaoguang`, 7, 80);
        //     this.addChild(clip);
        //     clip.setScale(0.88);
        //     clip.x = -16;
        //     clip.y = -6;
        //     clip.setEndCallBack(()=>{
        //         clip.dispose();
        //     },this)
        //     clip.playWithTime(1);
        // }

    }

    public setBuff():void
    {   
        if (!this._buffClip)
        {
            let clip = ComponentManager.getCustomMovieClip(`ladder_ef_servant`, 8, 100);
            this.addChild(clip);
            clip.x = 0;
            clip.y = 0;
            clip.playWithTime(0);
            this._buffClip = clip;
            if (!this._servantId)
            {
                this._buffClip.visible = false;
            }
        }


    } 

    private clickIcon():void
    {
        this._fuction.apply(this._obj,[this._idx]);
    }

    public dispose() 
    {   
        this._idx = 0;
        this._fuction = null;
        this._obj = null;

        this._iconBg = null;
        this._servantIcon = null;
        this._emptyIcon = null;
        this._deleteIcon  = null;
        this._servantId = null;
        this._buffClip = null;
        this._numText = null;
        this._numbg = null;

        super.dispose();
    }
}