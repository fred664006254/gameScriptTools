/*
    author : shaoliang
    date : 2019.10.25
    desc : 天下至尊-阵型
*/

class LadderFormationView extends CommonView
{
    private _leftIcons:LadderBattleTeamIcon[] = [];
    private _rightIcons:LadderBattleTeamIcon[] = [];
    //第几场
    private _curType:number = 0;

    private _skipBtn:BaseButton = null;
    private _skip = false;
    


    public constructor(){
        super();
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
            "ladder_formation","dinner_line","dinner_black_circle",
            "ladder_formation_up","ladder_formation_icon1","ladder_formation_icon2",
            "ladder_formation_btn",
            "ladder_general1","ladder_general2",
            "ladder_soldiers_stand1","ladder_soldiers_stand2","ladder_soldiers_stand3","ladder_soldiers_stand4",
            "ladder_soldiers2_stand1","ladder_soldiers2_stand2","ladder_soldiers2_stand3","ladder_soldiers2_stand4",
        ]);
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "ladderview_title";
	}

    protected getTitleStr():string
	{
		return null;
    }
    
    protected getBgName():string{
		return `ladder_battlebg`;
    }

    protected getCloseBtnName():string
	{
		return null;
	}

    public initView()
    {
        // let line = BaseBitmap.create("dinner_line");
        // line.width = 1060;
        // line.rotation = 60;
        // line.setPosition(18,-5);
        // this.addChildToContainer(line);
        this.titleBgShadow.visible = false;

        let posTab = [
            {x:135+50,y:542-50},
            {x:0,y:424-20},
            {x:-45,y:548+20-20},
            {x:51,y:598+20},
            {x:225,y:632+20}
        ];
        let posTab2 = [
            {x:368+70-50,y:433-50},
            {x:294+35-30,y:328-20-30},
            {x:418+35-15,y:328-20-35},
            {x:504+35,y:380-20},
            {x:502+35,y:497-20}
        ];
        let offsetY = (GameConfig.stageHeigth-1136)/2;

        for (let i = 0 ;i <5 ; i++)
        {
            let leftIcon = new LadderBattleTeamIcon();
            leftIcon.init(i+1,1);
            leftIcon.setPosition(posTab[i].x,posTab[i].y+offsetY);
            this.addChildToContainer(leftIcon);

            let rightIcon = new LadderBattleTeamIcon();
            rightIcon.init(i+1,2);
            rightIcon.setPosition(posTab2[i].x,posTab2[i].y+offsetY);
            this.addChildToContainer(rightIcon);

            if (i == 0)
            {
                leftIcon.setScale(1.2);
                rightIcon.setScale(1.2);
            }

            this._rightIcons.push(rightIcon);
            this._leftIcons.push(leftIcon);
            //test code
            // leftIcon.setResult(1);
            // rightIcon.setResult(2);
        }

        this.removeChildFromContainer(this._rightIcons[0]);
        this.addChildToContainer(this._rightIcons[0]);

        this._curType = 1;
        egret.Tween.get(this.container).wait(800).call(this.showRound,this);

        this._skip = false;
		this._skipBtn = ComponentManager.getButton("ladder_formation_btn",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,GameConfig.stageHeigth - 145);
		this.addChild(this._skipBtn);
    } 

    private skipBattle():void
	{
		if (this._curType <=5 && this._skip!=true) {
            this.showLoadingMask();
            this._skip = true;
            this._curType = 6;
            this.showResult();
		}
	}

    private showRound():void
    {
        let idx = this._curType;
        let leftIcon = this._leftIcons[idx-1];
        let rightIcon = this._rightIcons[idx-1];

        if (!leftIcon || !rightIcon)
        {
            return;
        }

        // this.removeChildFromContainer(rightIcon);
        // this.addChildToContainer(rightIcon);

        // this.removeChildFromContainer(leftIcon);
        // this.addChildToContainer(leftIcon);

        let view = this;
        if (this._curType == 1)
        {   
            let targetPos = [(leftIcon.x+rightIcon.x)/2,(leftIcon.y+rightIcon.y)/2];
            leftIcon.showBattle();
            rightIcon.showBattle();

            let oldpox1 = leftIcon.x;
            let oldpox2 = rightIcon.x;
            let oldpoy1 = leftIcon.y;
            let oldpoy2 = rightIcon.y;

            let baoclip = ComponentManager.getCustomMovieClip("ladder_ef_blast",18,80);
            baoclip.setScale(2);
            baoclip.blendMode = egret.BlendMode.ADD;
            baoclip.setPosition(targetPos[0]-210,targetPos[1]-110);
            baoclip.setEndCallBack(()=>{
                if (view._curType == 1)
                {
                    view.showBattle(()=>{
                        leftIcon.setPosition(oldpox1,oldpoy1);
                        rightIcon.setPosition(oldpox2,oldpoy2);
                        leftIcon.showStand();
                        rightIcon.showStand();
                    },view);
                }
                
            },this);
            
            this.addChild(baoclip);
            


            egret.Tween.get(leftIcon).to({x:targetPos[0]-10,y:targetPos[1]+8},500).wait(0).call(()=>{

                leftIcon.stopClipBao();
                rightIcon.stopClipBao();
                baoclip.playWithTime(1);
                
            });
            egret.Tween.get(rightIcon).to({x:targetPos[0]+10,y:targetPos[1]-8},500);
        }
        else
        {
            leftIcon.showBattle();
            rightIcon.showBattle();

            egret.Tween.get(leftIcon).wait(500).call(()=>{
                this.showBattle();
                leftIcon.showStand();
                rightIcon.showStand();
            });
        }
        
    }

    private showWinAnim():void
    {
        let winIcon:LadderBattleTeamIcon;
        let loseIcon:LadderBattleTeamIcon;
        if (Api.laddertournamentVoApi.reportVoApi.getBattleWinByType(this._curType))
        {
            winIcon = this._leftIcons[this._curType-1];
            loseIcon = this._rightIcons[this._curType-1];
        }
        else
        {
            winIcon = this._rightIcons[this._curType-1];
            loseIcon = this._leftIcons[this._curType-1];
        }
        winIcon.setResult(1);
        loseIcon.setResult(2);
       
        if (this._curType == 1)
        {
            if (Api.laddertournamentVoApi.reportVoApi.getBattleWinByType(this._curType))
            {
                for (let i=1; i<5; i++)
                {
                    this._leftIcons[i].showPowerUp();
                }
            }
            else
            {
                for (let i=1; i<5; i++)
                {
                    this._rightIcons[i].showPowerUp();
                }
            }
        }
        egret.Tween.get(this.container).wait(1200).call(this.showNextBattle,this);
    }

    private showBattle(ff?:Function,oo?:any):void
    {   
        if (this._skip!=true)
        {
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERBATTLEVIEW,{f2:ff,o2:oo,type:this._curType,f:this.battleCallback,o:this});
        }
    }

    private showResult():void
    {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERBATTLRESULTEVIEW,{
            f:this.hide,
            o:this
        
        });
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK,{activeId:Api.laddertournamentVoApi.aidAndCode});
    }

    private battleCallback()
    {   
        this.showWinAnim();
    }

    private showNextBattle():void
    {
        this._curType++;

        if (this._curType>5)
        {
            this.showResult();
        }
        else
        {
            this.showRound();
        }
    }

    public dispose() 
    {   
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LATTERT_BATTLE_END);
        this._leftIcons.length = 0;
        this._rightIcons.length = 0;
        this._curType = 0;
        this._skip = false;
        this._skipBtn = null;

        super.dispose();
    }
}