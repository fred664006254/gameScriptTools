class WifebattleResultView extends BaseView
{
	private _callback:Function = null;
	private _target:any = null;
    
	public constructor() 
	{
		super();
	}
	protected isTouchMaskClose():boolean
	{
		return true;
	}
	protected initView():void
	{
		
        let winflag = 1;//1胜利 0失败
        // this.addTouchTap(this.hide,this);
		if (this.param.data && this.param.data.target && this.param.data.callback)
		{
			this._target = this.param.data.target;
			this._callback = this.param.data.callback;
		}
        winflag = this.param.data.winflag;
        let point = this.param.data.point;
        let rewardnum = this.param.data.rewardnum;
        let isReview = this.param.data.isReview;

        let tip:BaseTextField = null;
         
        // type = 1;
        if(winflag == 1){
            if(App.CommonUtil.check_dragon() && RES.hasRes("shengli_ske")){
                let bg = App.DragonBonesUtil.getLoadDragonBones("shengli",-1,"appear")
                // let bg = App.DragonBonesUtil.getLoadDragonBones("shengli",{callback:()=>{
                //     bg.playAnimBehindAnim("appear","idle",0);
                   
                // },callbackThisObj:this});     

                bg.playDragonMovie('appear',1);
                bg.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    bg.playDragonMovie('idle',0);
                }, this);         
				bg.x = GameConfig.stageWidth/2 - bg.width/2;
				// bg.y = 420;
                bg.y = GameConfig.stageHeigth/2 - 60;
                // bg.stop();
				this.addChildToContainer(bg);
            } else {
                let bg = BaseLoadBitmap.create("wifebattlewin_bg");
                bg.width = 640;
                bg.height = 270;
                bg.x = GameConfig.stageWidth/2 - bg.width/2;
                // bg.y = 320;
                bg.y = GameConfig.stageHeigth/2 - 160;

   
                this.addChildToContainer(bg);

                let icon = BaseLoadBitmap.create("wifebattlewin_icon");
                icon.width = 640;
                icon.height = 210;
                icon.x = GameConfig.stageWidth/2 - icon.width/2;
                icon.y = bg.y - icon.height + 75;
                this.addChildToContainer(icon);

                let txt = BaseLoadBitmap.create("wifebattlewin_txt");
                txt.width = 310;
                txt.height = 178;
                txt.x = GameConfig.stageWidth/2 - txt.width/2;
                txt.y = icon.y + 15
                
                this.addChildToContainer(txt);
            }

            tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultWinTip"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        } else{
            if(App.CommonUtil.check_dragon() && RES.hasRes("shibai_ske")){
                let bg = App.DragonBonesUtil.getLoadDragonBones("shibai",-1,'appear');
                // let bg = App.DragonBonesUtil.getLoadDragonBones("shibai",{callback:()=>{
                //     bg.playAnimBehindAnim("appear","idle",0);
                // },callbackThisObj:this});
                
                bg.playDragonMovie('appear',1);
                bg.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    bg.playDragonMovie('idle',0);
                }, this);
                
				bg.x = GameConfig.stageWidth/2 - bg.width/2 + 15;
				bg.y = GameConfig.stageHeigth/2 - 60;
                // bg.stop();
				this.addChildToContainer(bg);
            } else {
                let bg = BaseLoadBitmap.create("wifebattlefail_bg");
                bg.width = 640;
                bg.height = 264;
                bg.x = GameConfig.stageWidth/2 - bg.width/2;
                bg.y = GameConfig.stageHeigth/2 - 160;
    
                this.addChildToContainer(bg);
                
                let icon = BaseLoadBitmap.create("wifebattlefail_icon");
                icon.width = 606;
                icon.height = 198;
                icon.x = GameConfig.stageWidth/2 - icon.width/2;
                icon.y = bg.y - icon.height + 70;
                this.addChildToContainer(icon);

                let txt = BaseLoadBitmap.create("wifebattlefail_txt");
                txt.width = 330;
                txt.height = 186;
                txt.x = GameConfig.stageWidth/2 - txt.width/2;
                txt.y = icon.y + 15
                this.addChildToContainer(txt);

            }
            tip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultFailTip"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        tip.x = GameConfig.stageWidth/2 - tip.width/2;
        tip.y = GameConfig.stageHeigth/2 - 90;// 400;
        this.addChildToContainer(tip);

        let scoreTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultScoreTip",[String(point),String(rewardnum)]),24,0x17f925);
        scoreTip.x = GameConfig.stageWidth/2 - scoreTip.width/2;
        scoreTip.y = tip.y + tip.height + 5;
        this.addChildToContainer(scoreTip);
        let expTip = null;
        // if(!isReview){
        //     let exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp:0;
        //     expTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleResultPlusExp",[String(exp)]),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        //     expTip.x = GameConfig.stageWidth/2 - expTip.width/2;
        //     expTip.y = scoreTip.y + scoreTip.height + 5;
        //     this.addChildToContainer(expTip);

        // }

        let rankBtn = ComponentManager.getButton(`btn_wintab`,"sysConfirm",this.hide,this);
        rankBtn.setColor(TextFieldConst.COLOR_BROWN);
        rankBtn.x = GameConfig.stageWidth/2 - rankBtn.width/2;
        if(expTip){
            rankBtn.y = expTip.y + expTip.height + 10;
        } else {
            rankBtn.y = scoreTip.y + scoreTip.height + 20;
        }
        

        this.addChildToContainer(rankBtn);

	}

	protected getTitleStr():string
	{
		return null;
	}

    // private rankBtnHandler():void
    // {

    // }

	protected getResourceList():string[]
	{
        return super.getResourceList().concat([

        ]);
	}

	public hide()
	{
		if (this._target && this._callback) {
			this._callback.apply(this._target);
		}
		super.hide();
	}

	public dispose():void
	{	
		this._callback = null;
		this._target = null;

		super.dispose();
	}
}