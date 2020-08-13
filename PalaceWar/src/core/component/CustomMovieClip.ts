/**
 * Created by Saco on 2015/5/27.
 */
class CustomMovieClip extends BaseBitmap
{
    private _frameImages:string[] = [];
    private _frameRate:number = 60;
    private _timeRate:number = 0.001;//按时间播放
    private _playingIndex:number = 0;
    private _playCount:number = 0;
    public isPlaying:boolean = false;
    private _endFunc:Function=null;
    private _endObj:any;
    private _frameFunc:Function[]=[];
    private _frameObj:any;
    private _removeStop: boolean = false;
    private _autoDispose:boolean=false;

    private _playFrameTime:number = 0; //上次回调总时间
    private _playFrameSpace:number = 100; //回调间隔时间，控制帧频。(单位毫秒)
    private _playFrame:number[] = [];//帧数
    private _groupName:string;
    public imageNamePre:string=""; //资源前缀


    
    /**
     * @autoDispose 是否支持从舞台移除时候自动释放对象，默认不释放
     */
    public constructor()
    {
        super();
    }

    public set sheetName(sheetName:string){
        this._frameImages = RES["configInstance"].keyMap[sheetName].subkeys;
    }

    public set frameImages(textureNames:string[]){
        this._frameImages = textureNames;
        if (this.imageNamePre == "itemeffect" && textureNames && textureNames[0])
        {
            if (textureNames[0].indexOf("itemeffect") < 0)
            {
                this.imageNamePre="";
            }
            else
            {
                if(ResourceManager.getRes("itemeffect1"))
                {
                    return;
                }
            }
        }
        if(this._groupName)
        {
            ResourceManager.destroyRes(this._groupName);
            this._groupName=null;
        }
        this._groupName = ResourceManager.loadResources(textureNames,[],()=>{},null,this);
    }

    public set frameRate(rate:number){
        this._frameRate = rate;
        this.stop();
    }

    /**
     *
     * @param rate 满帧60，间隔时间
     */
    public set playFrameRate(rate:number)
    {   
        if (rate) {
            this._playFrameSpace = rate;
        }
    }

    public setFrameEvent(r:number,f:Function,o:any):void {
        this._playFrame.push(r);
        this._frameFunc.push(f);
        this._frameObj=o;
    }

     public removeFrameEvent():void {
        this._playFrame.length = 0;
        this._frameFunc.length = 0

    }

    // public retain():void{
    //     this.stop();
    //     this.play(1);
    // }

    public setStopFrame(frame : number):void{
        this.texture = ResourceManager.getRes(this._frameImages[frame]);
    }
    
    private frameEnd = 0;

    public setEndFrameAndPlay(num : number):void{
        this.frameEnd = num;
    }

    private updateFrame(timeStamp:number):boolean
    {
        // App.LogUtil.log("QAZ ",this.name);
        if (timeStamp < this._playFrameTime)
        {   
            return false;
        }
        this._playFrameTime =  timeStamp + this._playFrameSpace;
        
        let endNum = this.frameEnd ? this.frameEnd : this._frameImages.length;
        if(this._playingIndex >= endNum){
            this._playingIndex = 0;
            this._playCount--;
        }
        if(this._playCount <= 0){
            this.stop();
            if (this._endFunc && this._endObj) {
                this._endFunc.apply(this._endObj,[this]);
            }
            return false;
        }

        this.texture = ResourceManager.getRes(this._frameImages[this._playingIndex]);
        if(this["anchorX"])
        {
            this.anchorOffsetX = this.texture.textureWidth * this["anchorX"];
        }
        if (this["anchorY"])
        {
            this.anchorOffsetY = this.texture.textureHeight * this["anchorY"];
        }
        //
        //if(this.texture==null)
        //{
        //    Log.show("QAZ 缺少图片资源::" + this._frameImages[this._playingIndex]);
        //}

        this._playingIndex++;
        for(let i in this._playFrame){
            let unit = this._playFrame[i];
            if(unit == this._playingIndex){
                if (this._frameFunc[i] && this._frameObj) {
                    this._frameFunc[i].apply(this._frameObj,[this]);
                }
            }
        }
        return false;
    }

    public goToAndPlay(frame:number):void{
        this._playingIndex = frame < 0 ? 0 : frame;
    }

    public stop():void{
        this.isPlaying = false;
        egret.stopTick(this.updateFrame,this);
        // App.TimerManager.remove(this.updateFrame, this);
    }

    private onAddToStage():void{
        if(this._removeStop)
        {
            this.playWithTime(this._playCount);
        }
    }

    private onRemoveFromStage():void{
        this.stop();
        this._removeStop = true;
        if(this._autoDispose)
        {
            this.dispose();
        }
    }

    public setPosition(pointOrX:any,yOrNull?:number):void 
    {
        var firstParamIsPoint: boolean = false;
        if(pointOrX!=null)
        {
            if(typeof pointOrX=="number")
            {
                if(this.x!=pointOrX)
                {
                    this.x = pointOrX;
                }
            }
            else
            {
                firstParamIsPoint = true;
                if(this.x!=pointOrX.x || this.y!=pointOrX.y)
                {
                    this.x = pointOrX.x;
                    this.y = pointOrX.y;
                }
            }
        }
        if(firstParamIsPoint==false && yOrNull!=null && this.y!=yOrNull)
        {
            this.y = yOrNull;
        }
    }
    
    public setScale(s:number):void {
        this.scaleX = s;
        this.scaleY = s;
    }
    public setEndCallBack(f:Function,o:any):void {
        this._endFunc=f;
        this._endObj=o;
    }

    //根据时间播放动画
    //
    public set timeRate(rate:number){
        this._timeRate = rate;
        this.stop();
        //this.play(this._playCount);
    }

    /**
     * @param count 动画播放次数   <=0 循环播放 
     */
    public playWithTime(count:number=0):void{

        if (this.isPlaying == false) {
            this.isPlaying = true;
            this._playCount = count <= 0 ? 99999 : count;
            egret.startTick(this.updateFrame,this);
        }

    }

    public playFrameByNamePre(imageNamePre:string,frameCount:number):void
    {   
        this._playCount = 0;
        this.stop();
        var resArr:string[]=[];
        for(var i:number=1;i<=frameCount;i++)
        {
            resArr.push(imageNamePre+i);
        }
        this.frameImages = resArr;
    }

    public dispose():void
    {
        
        this.stop();
        if(this._groupName)
        {
            if (this.imageNamePre != "itemeffect")
            {
                ResourceManager.destroyRes(this._groupName);
            }
			this._groupName=null;
        }
        this.imageNamePre="";
        this._frameImages=[];
        this._frameRate = 60;
        this._timeRate = 0.001;//按时间播放
        this._playingIndex = 0;
        this._playCount = 0;
        this.isPlaying = false;
        this._endFunc=null;
        this._endObj=null;
        this._removeStop = false;
        this.texture=null;
        this._playFrameTime = 0;
        this._playFrameSpace = 50;
        this.frameEnd = 0;
        super.dispose();
    }

}
