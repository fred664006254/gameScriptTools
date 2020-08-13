class AcThreeKingdomsWarResultView extends BaseView
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
    
    protected getTitleStr():string
	{
		return null;
	}

	protected getResourceList():string[]
	{
        return super.getResourceList().concat([
            `ladder_formation`
        ]);
	}

	protected initView():void
	{
		
		this._target = this.param.data.o;
        this._callback = this.param.data.f;
        

        egret.Tween.get(this.container).wait(160).call(this.showAnim,this);

    }
    
    private showAnim():void
    {
        let view =this;
        let param = view.param.data;
        //1胜利 2失败
        let point = param.point;
        let rewardnum = param.rewardnum;
        let winflag = param.winflag;
        if(winflag == 1){
            if(App.CommonUtil.check_dragon() && RES.hasRes("ladder_shengli_ske")){
                let bg = App.DragonBonesUtil.getLoadDragonBones("ladder_shengli",-1,"appear");
                bg.playDragonMovie('appear',1);
                bg.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    bg.playDragonMovie('idle',0);
                }, this);         
                bg.x = GameConfig.stageWidth/2 - bg.width/2;
                bg.y = GameConfig.stageHeigth/2 - 60;
                this.addChildToContainer(bg);
                
                //文字
                let shengliNode = new BaseDisplayObjectContainer();
                this.addChildToContainer(shengliNode);
                shengliNode.x = 230;
                shengliNode.y = 150;

                let shengli1 = BaseBitmap.create("ladder_result_win1");
                shengli1.setPosition(-500,90.31);
                shengli1.alpha=0;
                shengli1.setScale(8);
                shengliNode.addChild(shengli1);

                let shengli1_2 = BaseBitmap.create("ladder_result_win1");
                shengli1_2.setPosition(-82.62,86.96);
                shengli1_2.blendMode = egret.BlendMode.ADD;
                shengliNode.addChild(shengli1_2);
                shengli1_2.alpha = 0;

                egret.Tween.get(shengli1_2).to({alpha:1},170);
                egret.Tween.get(shengli1).to({x:-82.62,y:86.96,scaleX:1,scaleY:1,alpha:1},170).call(()=>{
                    egret.Tween.get(shengli1_2).to({scaleX:1.6,scaleY:1.6},200);
                    egret.Tween.get(shengli1_2).to({alpha:0},250);
                }).wait(340).to({x:-78.03,y:96.82,scaleX:1.04,scaleY:1.04},170)
                .to({x:-82.62,y:86.96,scaleX:1,scaleY:1},140);


                let shengli2 = BaseBitmap.create("ladder_result_win2");
                shengli2.setPosition(500,86.96);
                shengli2.alpha=0;
                shengli2.setScale(8);
                shengliNode.addChild(shengli2);

                let shengli2_2 = BaseBitmap.create("ladder_result_win2");
                shengli2_2.setPosition(87.97,90.31);
                shengli2_2.blendMode = egret.BlendMode.ADD;
                shengliNode.addChild(shengli2_2);
                shengli2_2.alpha = 0;

                egret.Tween.get(shengli2_2).wait(170).to({alpha:1},170);
                egret.Tween.get(shengli2).wait(170).to({x:87.97,y:90.31,scaleX:1,scaleY:1,alpha:1},170).call(()=>{
                    egret.Tween.get(shengli2_2).to({scaleX:1.76,scaleY:1.76,},200);
                    egret.Tween.get(shengli2_2).to({alpha:0},230);
                }).wait(170).to({x:120.9,y:100,scaleX:1.04,scaleY:1.04},170)
                .to({x:87.97,y:90.31,scaleX:1,scaleY:1},140);

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

        } else{
            if(App.CommonUtil.check_dragon() && RES.hasRes("ladder_shibai_ske")){
                let bg = App.DragonBonesUtil.getLoadDragonBones("ladder_shibai",-1,'appear');
                bg.playDragonMovie('appear',1);
                bg.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                    bg.playDragonMovie('idle',0);
                }, this);
                
                bg.x = GameConfig.stageWidth/2 - bg.width/2 + 15;
                bg.y = GameConfig.stageHeigth/2 - 60;
                this.addChildToContainer(bg);

                //文字
                let shibai1 = BaseBitmap.create("ladder_result_lose1");
                shibai1.setPosition(113.6,169);
                shibai1.alpha=0;
                shibai1.scaleX = 0.88;
                this.addChildToContainer(shibai1);

                let shibai2 = BaseBitmap.create("ladder_result_lose2");
                shibai2.setPosition(363.5,169);
                shibai2.alpha=0;
                shibai1.scaleX = 0.88;
                this.addChildToContainer(shibai2);

                egret.Tween.get(shibai1).to({x:158.7,alpha:1,scaleX:1},1510);
                egret.Tween.get(shibai2).to({x:318.9,alpha:1,scaleX:1},1510);

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
            
        }

        let textNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(textNode);

        let tip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsbattletip"+winflag),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        if(param.tip){
            tip.text = param.tip;
        }
        tip.x = GameConfig.stageWidth/2 - tip.width/2;
        tip.y = GameConfig.stageHeigth/2 - 35;
        if (winflag!=1)
        {
            tip.y = GameConfig.stageHeigth/2 - 95;
        }
        textNode.addChild(tip);

        if(point){
            let scoreTip = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsbattletip${param.iscenter ? 4 : 3}`,[String(point)]),22,0x17f925);
            scoreTip.x = GameConfig.stageWidth/2 - scoreTip.width/2;
            scoreTip.y = tip.y + tip.height + 5;
            textNode.addChild(scoreTip);
        }

        let rankBtn = ComponentManager.getButton(`btn_wintab`,"sysConfirm",this.hide,this);
        rankBtn.setColor(TextFieldConst.COLOR_BROWN);
        rankBtn.x = GameConfig.stageWidth/2 - rankBtn.width/2;
        rankBtn.y = tip.y + tip.height + 5 + 22 + 30;
        textNode.addChild(rankBtn);

        textNode.visible = false;
        egret.Tween.get(textNode).wait(300).call(()=>{
            textNode.visible = true;
        });
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