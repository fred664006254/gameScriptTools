/**
 * author shaoliang
 * date 2019/11/5
 * @class LadderBattleWin
 */

class LadderBattleWin extends BaseView
{
    private _type:number = 0; 
    private _callbackF:Function = null;
	private _obj:any = null;
    private _winBg:BaseBitmap = null;
    private _fire_lizi:particle.GravityParticleSystem = null;

    public constructor() {
		super();
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

    private get result():number
    {
        return this.param.data.result;
    }

    protected getResourceList():string[]
	{
		let rewardPic:string[] = null;
		if (this.result == 1)
        {
            rewardPic =[
                    "battle_win_word",
                    "battle_win_light",
                    "fire_flake_json",
                    "fire_flake"
            ];
        }
        else
        {
            rewardPic =[
                    "battle_fail_word",
            ];
        }
        

        return rewardPic;
	}

    protected initView():void
    {   
        this.addTouchTap(this.touchTap,this);
        egret.Tween.get(this.container).wait(3000).call(this.touchTap,this);


        this._type = this.param.data.type;
        if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

        this._winBg = BaseBitmap.create("public_rule_bg");
		this._winBg.setPosition(GameConfig.stageWidth/2  - this._winBg.width,GameConfig.stageHeigth/2 - this._winBg.height/2);
		this.addChildToContainer(this._winBg);

		let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
		winBg2.scaleX = -1;
		winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1,GameConfig.stageHeigth/2 - winBg2.height/2);
		this.addChildToContainer(winBg2);

		let awardBg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		awardBg.width = 500;
		awardBg.height = 122;
		awardBg.setPosition(GameConfig.stageWidth/2  - awardBg.width/2, GameConfig.stageHeigth/2 - awardBg.height/2 + 2);
		this.addChildToContainer(awardBg);

        //描述文字
        let descstr:string;
        if (this._type == 1)
        {   
            descstr = LanguageManager.getlocal("acLadder_battle_win_desc"+this.result);
        }
        else
        {
            let score:number[] = this.param.data.score;
            descstr = LanguageManager.getlocal("acLadder_battle_win_des"+this.result,[String(score[0]),String(score[1])]);
        }

        let socreText:BaseTextField = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        socreText.width = 520;
        socreText.lineSpacing = 5;
        socreText.textAlign = egret.HorizontalAlign.CENTER;
        socreText.setPosition( GameConfig.stageWidth/2-socreText.width/2, awardBg.y + 30);
        this.addChildToContainer(socreText);

        // let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        // closeText.textAlign=egret.HorizontalAlign.CENTER;
        // closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,this._winBg.y+this._winBg.height);
        // this.addChildToContainer(closeText);

		this.container.anchorOffsetX = GameConfig.stageWidth/2;
		this.container.anchorOffsetY = GameConfig.stageHeigth/2;
		this.container.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
		this.container.scaleX = 0.1;
		this.container.scaleY = 1;

        if (this.result == 1)
        {
            egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120).call(this.showWordAnim,this).wait(80).call(this.showAnim,this); ;
		    SoundManager.playEffect(SoundConst.EFFECT_BATTLE_WIN);
        }
        else
        {   
            App.DisplayUtil.changeToGray(this._winBg);
			App.DisplayUtil.changeToGray(winBg2);

			let winText:BaseBitmap = BaseBitmap.create("battle_fail_word");
			winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, GameConfig.stageHeigth- 568 - this._winBg.height/2 -35);
			this.addChildToContainer(winText);

            egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
        }

		

    }

    private showWordAnim():void
	{	
		let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");

		let winLight:BaseBitmap = BaseBitmap.create("battle_win_light");
		winLight.scaleY = 0.5;
		winLight.setPosition(GameConfig.stageWidth/2  - winLight.width/2*winLight.scaleX,GameConfig.stageHeigth/2 - winBg.height/2 -5);
		this.addChildToContainer(winLight);

		this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
		this._fire_lizi.y = GameConfig.stageHeigth/2 -365;
		this.addChildToContainer(this._fire_lizi);

		let winText:BaseBitmap = BaseBitmap.create("battle_win_word");

		let scale1:number = 2.5;
		let scale2:number = 0.9;
		let tempsPos1:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2*scale1, GameConfig.stageHeigth/2 - winBg.height/2*scale1 -35+30);
		let tempsPos2:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2*scale2, GameConfig.stageHeigth/2 - winBg.height/2*scale2 -35);
		let realPos:egret.Point = egret.Point.create(GameConfig.stageWidth/2  - winText.width/2, GameConfig.stageHeigth/2 - winBg.height/2 -35);
		winText.setScale(scale1);
		winText.setPosition(tempsPos1.x, tempsPos1.y);
		this.addChildToContainer(winText);

		egret.Tween.get(winText).to({x:tempsPos2.x, y:tempsPos2.y, scaleX:scale2, scaleY:scale2 } ,120 ).to({x:realPos.x, y:realPos.y, scaleX:1, scaleY:1 } ,50);
		
		winLight.alpha = 0;
		egret.Tween.get(winLight).wait(100).to({alpha:1},100).wait(90).to({alpha:0},10);
	}

	private showAnim():void
	{	
	
		this._fire_lizi.start();
		let tmpthis  = this;
		egret.Tween.get(this._fire_lizi,{loop:false}).wait(500).to({alpha:0},200).call(function(){
				if (this._fire_lizi){
					tmpthis.removeChildFromContainer(this._fire_lizi);
					this._fire_lizi.dispose();
					this._fire_lizi = null;
				}
			});
	}

    private touchTap():void
	{
        if (this._obj && this._callbackF) 
        {
			this._callbackF.apply(this._obj);
		}
        this.hide();
	}

    public dispose():void
	{
		this._type = 1;
        this._winBg = null;
        this._callbackF = null;
		this._obj = null;
        this._fire_lizi = null;

		super.dispose();
	}
}