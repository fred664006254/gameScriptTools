//元素
class Dice413 extends BaseDice{
    public constructor(data:DiceData, appearEff?:string){
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void{
        super.init(data,appeareff);
        let len = data.star;//;
        for(let i = 1; i <= len; ++ i){
            this.createObstacle(0);
        }
        this.makeRound();
    }

    public refresh(data:DiceData,appeareff?:string):void
    {
        super.refresh(data, appeareff);
        if(data.star < this._obs.length){
            let len = this._obs.length - data.star;
            for(let i = 1; i <= len; ++ i){
                this._obs[i].dispose();
                this._obs[i] = null;
            }
        }
        else if(data.star > this._obs.length){
            let len = data.star - this._obs.length;
            for(let i = 1; i <= len; ++ i){
                this.createObstacle(0);
            }
        }
        this.makeRound();
    }

    protected createObstacle(starIdx:number):void
    {
        // this.playAtkAction();
        
        let fpos = {x:this.x,y:this.y};
        let obstacle = <Obstacle413>Obstacle.createObstacle(this.getDiceData(),fpos,`Obstacle413`,null,true);
        this._extraGroup.addChild(obstacle);
        this._obs.push(obstacle);
    }

    private makeRound():void{
        let rotation = 360 / this._obs.length;
        let rad = Math.PI / 180;
        let radius = 120;
        let centerX = 0;
        let centerY = -30;

        let speed = 0.02;
        
        for(let i = 0; i < this._obs.length; ++ i){
            let unit = this._obs[i];
            egret.Tween.removeTweens(this._obs[i]);
            //计算角度
            let angle = (rotation) * i * rad;

            let xielv = 1 / Math.tan(angle);

            unit.x = centerX + radius *  Math.cos(angle);
            unit.y = centerY + radius *  Math.sin(angle);
            egret.Tween.get(unit, {loop : true, onChange : ()=>{
                angle += speed;
                unit.x = centerX + radius *  Math.cos(angle);
                unit.y = centerY + radius *  Math.sin(angle);
            }, onChangeObj : this}).to({alpha : 1}, 360 / speed);
        }
    }

    public dispose():void{
        for(let i = 0; i < this._obs.length; ++ i){
            egret.Tween.removeTweens(this._obs[i]);
            this._obs[i].dispose();
            this._obs[i] = null;
        }
        this._obs = [];
        super.dispose();
    }
}