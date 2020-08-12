/**
 * - --原名称：吸收骰子  --新名称：汲取
 * 从敌人身上吸收SP
 * SP吸收量是 星數+(遊戲內等級-1)x3
*/
class Bullet310 extends Bullet
{
    private _addsp : boolean = false;
    public constructor()
    {
        super();
    }

    public setAddSp():void{
        this._addsp = true;
    }

    protected damage():void{
        let self = this;
        let diceData = self.diceData;
        let mvo = self.mVoList[0];
        let nmDmgData = this.nmDmgData;

        let lost=false;
        if(!!nmDmgData)
        {
            if(!this.target.lost(this.diceData.isMe))
            {
                let damage=this.calDamageNum(this.target);
                if(this._addsp){
                    //吸能量
                    let cfg=Config.DiceCfg.getCfgById(diceData.id);
                    let num = diceData.star * cfg.getProperty1ByLv(diceData.lv) + cfg.getPowerProperty1ByLv(diceData.pwlv);

                    let txtImg = ComponentMgr.getTextField(`sp+${num}`, TextFieldConst.SIZE_20, 0xf4fffe);
                    txtImg.stroke = 2;
                    txtImg.strokeColor = 0x1ab186;
                    txtImg.anchorOffsetX = txtImg.width / 2;
                    txtImg.anchorOffsetY = txtImg.height / 2;
                    txtImg.alpha = 0;
                    if(this.target){
                        this.target.addChild(txtImg);
                    }
                    // this._extraGroup.addChild(txtImg);
                    let tmpy = -this.target.height/2;//this.target.y-this.target.height/2;
                    txtImg.x = 0;//this.target.x;
                    txtImg.y = tmpy;
            
                    let time = BattleStatus.timeparam;
                    egret.Tween.get(txtImg).to({alpha : 1, y : tmpy-20}, 12 * time).to({alpha : 1, y : tmpy-25}, 6 * time).to({alpha : 0, y : tmpy-30}, 3 * time).call(()=>{
                        egret.Tween.removeTweens(txtImg);
                        txtImg.dispose();
                        txtImg = null;
                    },this);
                    
                    let isMe = diceData.isMe;
                    Api.BattleVoApi.addSp(num,isMe);
                }
                this.target.beAtk({hp:damage,isMe:this.diceData.isMe,crit:nmDmgData.isCrit,addStatus:this.diceData.id});
                this.playAtkSound();
            }
            else
            {
                lost=true;
            }
        }
    }

    public reset():void
    {
        this._addsp = false;
        super.reset();
    }

    public dispose():void{
        this._addsp = false;
        super.dispose();
    }
}