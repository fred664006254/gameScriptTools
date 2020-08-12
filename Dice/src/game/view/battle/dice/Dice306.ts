/**
 * --原名称：齿轮 现在：回音
 * 连接数提升百分比攻击
*/
class Dice306 extends BaseDice{
    private _isLine : boolean = false;
    public isTouch : any = {};

    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }
    public checkLine():void{
        //检测
        super.checkLine();
        let x = this.getPos().x;
        let y = this.getPos().y;
        let list = BattleStatus.scene.getDiceList(this.checkIsMe());
        let isGear = false;
        for(let i = 1 ; i < 5; ++ i){
            let posx = x;
            let posy = y;
            if(i == 1){
                posy -= 1;
            }
            else if(i == 2){
                posy += 1;
            }
            else if(i == 3){
                posx -= 1;
            }
            else if(i == 4){
                posx += 1;
            }
            let dice : any = list[`${posx}_${posy}`];
            if(dice){
                let data = dice.getDiceData();
                if(data.checkIsGearDice()){
                    this._isLine = true;
                    if(!dice.getIsLine()){
                        dice.checkLine();
                    }
                }
            }
        }
        for(let i in list){
            if(list[i].getDiceData().checkIsGearDice()){
                let unit = <Dice306>list[i];
                if(unit.getIsLine()){
                    unit.setGearDamage();
                }
            }
        }
    }

    public getLineNum(pos:string):number{
        let num = 0;
        if(this._isLine){
            let dicelist = BattleStatus.scene.getDiceList(this.checkIsMe());
            this.setLineNum(pos);

            for(let i in dicelist){
                if(dicelist[i].getDiceData().checkIsGearDice()){
                    let unit = <Dice306>dicelist[i];
                    if(unit.getIsLine() && unit.isTouch[pos]){
                        delete unit.isTouch[pos];
                        ++ num;
                    }
                }
            }
        }
        return num;
    }

    public setLineNum(pos:string):void{
        if(this._isLine && !this.isTouch[pos]){
            let dicelist = BattleStatus.scene.getDiceList(this.checkIsMe());
            let x = this.getPos().x;
            let y = this.getPos().y;
            this.isTouch[pos] = 1;
            for(let i = 1 ; i < 5; ++ i){
                let posx = x;
                let posy = y;
                if(i == 1){
                    posy -= 1;
                }
                else if(i == 2){
                    posy += 1;
                }
                else if(i == 3){
                    posx -= 1;
                }
                else if(i == 4){
                    posx += 1;
                }
                let dice : any = dicelist[`${posx}_${posy}`];
                if(dice && dice.getDiceData().checkIsGearDice()){
                    let data = dice.getDiceData();
                    if(dice.getIsLine()){
                        dice.setLineNum(pos);
                        dice.isTouch[pos] = 1;
                    }
                }
            }
        }
    }

    public getIsLine():boolean{
        return this._isLine;
    }

    public setIsLine(bool:boolean):void{
        this._isLine = bool;
    }

    public checkBuff():boolean{
        super.checkBuff();
        //周围是否有链接
        let x = this.getPos().x;
        let y = this.getPos().y;

        let list = BattleStatus.scene.getDiceList(this.checkIsMe());
        let isGear = false;
        for(let i = 1 ; i < 5; ++ i){
            let posx = x;
            let posy = y;
            if(i == 1){
                posy -= 1;
            }
            else if(i == 2){
                posy += 1;
            }
            else if(i == 3){
                posx -= 1;
            }
            else if(i == 4){
                posx += 1;
            }
            let dice = list[`${posx}_${posy}`];
            if(dice){
                let data = dice.getDiceData();
                if(data.checkIsGearDice()){
                    isGear = true;
                    this._isLine = true;
                }
            }
        }
        let eff = <CustomMovieClip>this.getChildByName(`gearbuff`);
        if(isGear){
            this.showGeareff();
        }
        else{
            this.hideGeareff();
        }
        return isGear;
    }

    public showGeareff():void{
        let eff = <CustomMovieClip>this._extraGroup.getChildByName(`gearbuff`);
        if(!eff){
            let criteff = ComponentMgr.getCustomMovieClip(`adddice306`, null, 70,BattleBaseEffect);
            criteff.anchorOffsetX = 128 / 2;
            criteff.anchorOffsetY = 128 / 2;
            criteff.y = -85;
            criteff.playWithTime(-1);
            criteff.name = `gearbuff`;
            this._extraGroup.addChild(criteff);
        }
        else if(eff){
            // egret.Tween.removeTweens(eff);
            // eff.stop();
            // eff.goToAndPlay(0);
            // eff.playWithTime(1);
            // egret.Tween.get(eff).wait(740).call(()=>{
            //     eff.playWithTime(1);
            //     egret.Tween.removeTweens(eff);
            // },this)
        }
    }

    public hideGeareff():void{
        let eff = <CustomMovieClip>this._extraGroup.getChildByName(`gearbuff`);
        if(eff){
            eff.alpha = 0;
            eff.dispose();
            eff = null;
        }
    }

    public setGearDamage():void{
        let data = this.getDiceData();
        let cfg=Config.DiceCfg.getCfgById(data.id);
        let pwadd=cfg.getPowerAtkByLv(data.pwlv);
        data.property1=cfg.getProperty1ByLv(data.lv)+cfg.getPowerProperty1ByLv(data.pwlv);
        data.property2=cfg.getProperty2ByLv(data.lv)+cfg.getPowerProperty2ByLv(data.pwlv);

        let linenum = this.getLineNum(`${data.x}_${data.y}`);
        data.damage=data.initdamage * (1 + (linenum - 1) * data.property1)+pwadd;
    }

    public checkIsEffectAround():boolean{
        return true;
    }


    public beComposed():void
    {
        //被合成、被暗杀、被boss打、变化
        this._isLine = false;
        this.checkLine();
        super.beComposed();
    }

    public dispose():void{
        this._isLine = false;
        this.isTouch = {};
        super.dispose();
    }
}