/**
 * 姻缘签奖励
 * author ycg
 * date 2020.1.7
 * @class AcTravelWithBeautyPlayRewardView
 */
class AcTravelWithBeautyPlayRewardView extends CommonView{
    private _currMaskH:number = 0;
    private _rewardArrList:any = [];
    private _count:number = 0;
    private _rewardBg:BaseBitmap = null;
    private _bg:BaseBitmap = null;

    public constructor(){
        super();
    }

    public initView():void{
        let bg = BaseLoadBitmap.create("actravelwithbeauty_marrybg-"+this.getTypeCode());
        bg.width = 572;
        bg.height = 860;
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        this.addChildToContainer(bg);
        this._bg = bg;

        let infoNum = App.MathUtil.getRandom(1, 6);
        let infoBg = BaseLoadBitmap.create("actravelwithbeauty_marrybg_"+infoNum+"-"+this.getTypeCode());
        infoBg.width = 572;
        infoBg.height = 860;
        infoBg.setPosition(bg.x + bg.width/2 - infoBg.width/2, bg.y + bg.height/2 - infoBg.height/2);
        this.addChildToContainer(infoBg);
        infoBg.alpha = 0;

        let title = BaseBitmap.create("actravelwithbeauty_marrybgtitle-"+this.getTypeCode());
        title.setPosition(bg.x + bg.width/2 - title.width/2, bg.y + 10);
        this.addChildToContainer(title);

        let textNum = App.MathUtil.getRandom(1, 11);
        let info = BaseLoadBitmap.create("actravelwithbeauty_marryflag_"+textNum+"-"+this.getTypeCode());
        let isNeedAni = true;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()){
            info.width = 519;
            info.height = 85;
            info.setPosition(bg.x + bg.width/2 - info.width/2, bg.y + 560 - info.height);
            isNeedAni = false;
        }
        else{
            info.width = 86;
            info.height = 515;
            info.setPosition(bg.x + bg.width - info.width - 30, bg.y + 70);
            let mask = new egret.Rectangle(0, 0, info.width, 0);
            info.mask = mask;
            this._currMaskH = 0;
        }
        this.addChildToContainer(info);
        
        this.container.setScale(0.3);
        let pos = this.param.data.pos;
        this.container.setPosition(pos.x - 50, pos.y + 40);
        egret.Tween.get(this.container).wait(100).to({x: 0, y: 0, scaleX: 1, scaleY:1}, 500).call(()=>{
            if (isNeedAni){
                egret.Tween.get(infoBg).wait(100).to({alpha: 1}, 500).call(this.playInfoAni, this, [info]);
            }
            else{
                egret.Tween.get(infoBg).wait(100).to({alpha: 1}, 500).call(this.playRewardAni, this);
            }
        });
    }

    public playInfoAni(obj:BaseBitmap):void{
        egret.Tween.get(obj).call(()=>{
            if (this._currMaskH < obj.height){
                this._currMaskH += 10;
                let mask = new egret.Rectangle(0, 0, obj.width, this._currMaskH);
                obj.mask = mask;
            } 
            else{
                egret.Tween.removeTweens(obj);
                this.playRewardAni();
            }   
        }).wait(20).call(()=>{this.playInfoAni(obj)});
    }

    public playRewardAni():void{
        let rewards = this.param.data.rewards;
        if (rewards){
            let rewardArrList = GameData.formatRewardItem(rewards);
            this._rewardArrList = rewardArrList;
            let bg = BaseBitmap.create("public_9_bg96");
            bg.width = 520;
            this.addChildToContainer(bg);
            this._rewardBg = bg;
            let maxNum = Math.ceil(rewardArrList.length / 5)
            if (rewardArrList.length > 1 && rewardArrList.length < 5){
                bg.height = 120;
            }
            else{
                bg.height = maxNum > 2 ? maxNum * 110 : 220;
            }
            bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, this._bg.y + this._bg.height - 77 - bg.height);
            TimerManager.doTimer(100,this._rewardArrList.length, this.playAni, this);
        }
        
    }

    public playAni():void{
        this.createItem(this._count);
    }

    public showEnterBtn():void{
        let enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.enterBtnCallback, this);
        enterBtn.setPosition(this._bg.x + this._bg.width/2 - enterBtn.width/2, this._bg.y + this._bg.height - enterBtn.height - 10);
        this.addChildToContainer(enterBtn);
    }

    public enterBtnCallback():void{
        if (this.param.data.callback && this.param.data.obj){
            this.param.data.callback.apply(this.param.data.obj);
        }
        this.hide();
    }

    /**
     * 实例化 Item
     */
    private createItem(count:number)
    {
        let rewardDB = GameData.getItemIcon(this._rewardArrList[count],true,true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        let maxLength = 5;
        let scale = 0.8;
        let offX = 10;
        let startX = (this._rewardBg.width - (rewardDB.width * scale + offX) * maxLength + offX)/2;
        let posX = this._rewardBg.x + startX + rewardDB.width  * scale / 2 + count % maxLength * (rewardDB.width * scale + offX);
        let posY = this._rewardBg.y + 15 + rewardDB.height  * scale / 2 + Math.floor(count / maxLength) * (rewardDB.height  * scale + 15);
        if (this._rewardArrList.length == 1){
            posX = this._rewardBg.x + this._rewardBg.width/2;
            posY = this._rewardBg.y + this._rewardBg.height/2;
        }
        rewardDB.setPosition(posX, posY);
		this.addChildToContainer(rewardDB);
        rewardDB.setScale(0);
        egret.Tween.get(rewardDB,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:0.8,scaleY:0.8},50);
        this._count ++;
        if (this._count == this._rewardArrList.length){
            this.showEnterBtn();
        } 
    }

    public getTypeCode():string{
        let code = this.param.data.code;
        if (code == "4"){
            return "3";
        }
        return this.param.data.code;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected getBgName():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            // "actravelwithbeauty_marryflag_1-3", "actravelwithbeauty_marryflag_2-3","actravelwithbeauty_marryflag_3-3","actravelwithbeauty_marryflag_4-3","actravelwithbeauty_marryflag_5-3","actravelwithbeauty_marryflag_6-3","actravelwithbeauty_marryflag_7-3","actravelwithbeauty_marryflag_8-3","actravelwithbeauty_marryflag_9-3","actravelwithbeauty_marryflag_10-3", 
            "actravelwithbeauty_marrybgtitle-"+this.getTypeCode(), "actravelwithbeauty_marrybg-"+this.getTypeCode()
        ]);
    }

    public dispose():void{
        this._currMaskH = 0;
        this._rewardArrList = [];
        this._rewardBg = null;
        this._count = 0;
        this._bg = null;
        super.dispose();
    }
}