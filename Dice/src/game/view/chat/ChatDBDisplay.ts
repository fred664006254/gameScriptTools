/*
 *@description: 表情龙骨播放
 *@author: hwc 
 *@date: 2020-04-22 14:10:09
 *@version 0.0.1
 */

class ChatDBDisplay extends BaseDisplayObjectContainer{
    private bg:BaseBitmap = null;
    private type:number = 1;
    public db: BaseLoadDragonBones = null;
    private num:number = 0;
    private cb:Function = null;
    dispose(){
        this.db&&this.db.dispose();
        this.bg.dispose();
        super.dispose();
    }

    public init(type:number, cb?:Function){
        let view = this;
        this.cb = cb;
        let mask = BaseBitmap.create("public_alphabg");
        mask.height = 80;
        mask.width = 150;
        this.addChild(mask);
        mask.x = -10;
        mask.y = 100;
        mask.addTouchTap(()=>{}, view);
        this.type = type;
        let url = (this.type == 1) ? "chatview_exp_bg1" : "chatview_exp_bg2";
        let bg = BaseBitmap.create(url);
        this.addChild(bg);
        this.bg = bg;
        this.touchEnabled = false;
        this.touchChildren = false;
        // mask.width = bg.width + 20;
        // mask.height = bg.height + 30;
    }

    public displayDB(url:string){
        let soundEffectName = this.getEffectName(url);
        soundEffectName &&  SoundMgr.playEffect(soundEffectName);
        let db = App.DragonBonesUtil.getLoadDragonBones(url);
        db.width = 81;
        db.height = 103;
        db.x = 50;
        db.y = (this.type == 1) ? 70 : 90;
        this.addChild(db);
        db.playDragonMovie("idle", 1);
        this.db = db;
        this.num = 0
        db.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.DBListener,this)
    }

    private getEffectName(url:string):string
    {
        switch(url)
        {
            case "dianzan":return SoundConst.EFFECT_EMOJI_1001
            case "fennu":return SoundConst.EFFECT_EMOJI_1002
            case "daku":return SoundConst.EFFECT_EMOJI_1003
            case "daxiao":return SoundConst.EFFECT_EMOJI_1004
            case "koubizi":return SoundConst.EFFECT_EMOJI_1005
            case "kaixin":return SoundConst.EFFECT_EMOJI_2001
            case "juqi":return SoundConst.EFFECT_EMOJI_2002
            case "leile":return SoundConst.EFFECT_EMOJI_2003
            case "wanku":return SoundConst.EFFECT_EMOJI_2004
            case "xuanyao":return SoundConst.EFFECT_EMOJI_2005
            default :return null;
        }
    }

    private DBListener(){
        if(this.num > 3){
            this.cb && this.cb();
            this.removeChild(this.db);
            this.db.dispose();
            this.db = null;
            // this.visible =false;
            this.parent.removeChild(this);
       }
       this.num++;
    }
}