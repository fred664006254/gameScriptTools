/**
 * --原名称：太阳骰子  --新名称：凰炎
 * 149变太阳
 * 打同一名敵人時，傷害會逐漸增加，是唯二能無限疊加攻擊力的骰子  而且場上有1或4顆太陽骰時，太陽骰能變身，打出的攻擊會產生爆炸，爆炸的傷害也會疊   打BOSS時能順便打後方小怪，但被小怪超前時一樣會傷害重置
*/
class Dice411 extends BaseDice
{
    private _isSun : boolean = false;
    private _curmonstername = ``;
    private _sunGroup : BaseDisplayObjectContainer = null;

    public constructor(data:DiceData, appearEff?:string){
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void{
        super.init(data,appeareff);
        //App.DisplayUtil.changeToGray(this._bg)
        if(BattleStatus.scene){
            BattleStatus.scene.addSuns(data.isMe);
        }
    }

    protected createBullet(starIdx:number,findmonsterDataList:MonsterVo[]):void
    {
        let dicedata = this.getDiceData();
        let monstersList=dicedata.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let monstername = ``;
        if(findmonsterDataList[0]){
            monstername = findmonsterDataList[0].getName();
        }

        if(this._curmonstername != monstername){
            let monster = monstersList[this._curmonstername];
            if(monster){
                monster.removeBuff(`${dicedata.id}_${dicedata.posStr}_${dicedata.isMe?1:2}`);
            }
        }
        
        this._curmonstername = monstername;
        super.createBullet(starIdx, findmonsterDataList);
    }

    public setIsSun(bool : boolean):void{
        if(!this._sunGroup){
            let sungroup = new BaseDisplayObjectContainer();
            this._sunGroup = sungroup;
            sungroup.width = this._bg.width;
            sungroup.height = this._bg.height;
            sungroup.anchorOffsetX = sungroup.width / 2;
            sungroup.anchorOffsetY = sungroup.height / 2;
            sungroup.setPosition(this._bg.x + this._bg.width/2, this._bg.y+ this._bg.height/2);
            this.addChild(sungroup);
        }
        if(this._isSun == bool){
            if(!bool){
                if(this._sunGroup){
                    this._sunGroup.removeChildren();
                }
                //App.DisplayUtil.changeToGray(this._bg)
            }
            else{
                //App.DisplayUtil.changeToNormal(this._bg)
            }
            return;
        }
        let dicedata =  this.getDiceData();
        this._isSun = bool;
        dicedata.setDiceIsChangeSun(bool);
        if(bool){
            this.playAtkSound();
            //特效变化
            let clip = ComponentMgr.getCustomMovieClip(`adddice411`, null, 70,BattleBaseEffect);
            clip.anchorOffsetX = 75;
            clip.anchorOffsetY = 75;
            clip.name = `clip`;
            clip.y = -30;
            clip.setEndCallBack(()=>{
                if(this._isSun){
                    clip.dispose();
                    clip = null;
                    if(circle){
                        circle.alpha = 1;
                    }
                }
            },this);
            
            egret.Tween.get(clip).wait(5 * BattleStatus.timeparam).call(()=>{
                if(this._isSun){
                    if(this._sunGroup){
                        this._sunGroup.addChild(clip);
                    }
                    egret.Tween.removeTweens(clip);
                    clip.playWithTime(1);
                }
            },this);


            let circle = BaseLoadBitmap.create(`dice411wings`);
            circle.anchorOffsetX = 33;
            circle.anchorOffsetY = 29;
            circle.y = -40;
            circle.setScale(2);
            circle.name = `circle`;
            circle.alpha = 0;

            egret.Tween.get(circle).wait(10 * BattleStatus.timeparam).call(()=>{
                if(this._isSun){
                    //App.DisplayUtil.changeToNormal(this._bg);
                    if(this._sunGroup){
                        this._sunGroup.addChild(circle);
                    }
                    egret.Tween.get(circle, {loop : true}).to({rotation : -360}, 60 * BattleStatus.timeparam);
                }
            },this);
        }
        else{
            //移除特效
            //App.DisplayUtil.changeToGray(this._bg);
            if(this._sunGroup){
                let circle = <BaseLoadBitmap>this._sunGroup.getChildByName(`circle`);
                if(circle){
                    circle.alpha = 0;
                    egret.Tween.removeTweens(circle);
                    circle.dispose();
                    circle = null;
                }
            }
            //所有怪物移除叠加buff
            let monstersList=dicedata.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            for(let i in monstersList){
                let monster = monstersList[i];
                if(monster){
                    monster.removeBuff(`${dicedata.id}_${dicedata.posStr}_${dicedata.isMe?1:2}`);
                    monster.removeBuff(`${dicedata.id}_${dicedata.posStr}_${dicedata.isMe?1:2}_boom`);
                }
            }
        }
    }

    public dispose():void{
        let data = this.getDiceData();
        this._isSun = false;
        this._curmonstername = ``;
        if(BattleStatus.scene){
            BattleStatus.scene.removeSuns(data.isMe);
        }
        if(this._sunGroup){
            this._sunGroup.removeChildren();
            this._sunGroup.dispose();
            this._sunGroup = null;
        }
        super.dispose();
    }
}